import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { DURATIONS, TICKETT_STATUS, WAITING_LIST_STATUST } from "./constants";
import {  components, internal } from "./_generated/api";
import { checkAvailabilityTravel } from "./ticketst";
import RateLimiter, { MINUTE } from "@convex-dev/rate-limiter";
export const get = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    return await ctx.db
      .query("travel")
      .filter((q) => q.eq(q.field("is_cancelled"), false))
      .collect()
  },
});
export const getTravelAvailability = query({
  args: { travelId: v.id("travel") },
  handler: async (ctx, { travelId }) => {
    const event = await ctx.db.get(travelId);
    if (!event) throw new Error("Travel not found");
    const bus = await ctx.db.get(event.busId)
    const agence = await ctx.db.get(event.agenceId)
    
    // Count total purchased tickets
    const purchasedCount = await ctx.db
      .query("ticketst")
      .withIndex("by_travel", (q) => q.eq("travelId", travelId))
      .collect()
      .then(
        (tickets) =>(
          {used: tickets.filter(
            (t) =>
              t.status === TICKETT_STATUS.VALID ||
              t.status === TICKETT_STATUS.USED
          ).length,
          total:tickets.length
        }
        )
      
      );
  
    // Count current valid offers
    const now = Date.now();
    const activeOffers = await ctx.db
      .query("waitingListT")
      .withIndex("by_travel_status", (q) =>
        q.eq("travelId", travelId).eq("status", WAITING_LIST_STATUST.OFFERED)
      )
      .collect()
      .then(
        (entries) => entries.filter((e) => (e.offerExpiresAt ?? 0) > now).length
      );
    const totalReserved = purchasedCount.used + activeOffers;
    return {
      isSoldOut: totalReserved >= purchasedCount.total,
      totalTickets: purchasedCount.total? purchasedCount.total:0,
      purchasedCount:purchasedCount.used? purchasedCount.used:0,
      activeOffers,
      bus:bus?.brand,
      remainingTickets: Math.max(0, purchasedCount.total - totalReserved),
      agence:agence
    };
  },
});
export const getSeats = query({
  args: { travelId: v.id("travel") },
  handler: async (ctx, { travelId }) => {
    const travel = await ctx.db.get(travelId);
    if (!travel) throw new Error("Travel not found");
    const bus = await ctx.db.get(travel.busId)
    const agence = await ctx.db.get(travel.agenceId)
    // Count total purchased tickets
    const Seats = await ctx.db
      .query("seat")
      .withIndex("by_bus", (q) => q.eq("busId",travel.busId))
      .collect()
    const tickets = await ctx.db
      .query("ticketst")
      .withIndex("by_travel", (q) => q.eq("travelId",travel._id))
      .collect()
    // Count current valid offers
    return {
      seats:Seats,
      bus:bus,
      agence:agence,
      travel:travel,
      tickets
    };
  },
});
const rateLimiter = new RateLimiter(components.rateLimiter, {
  queueJoin: {
    kind: "fixed window",
    rate: 3, // 3 joins allowed
    period: 30 * MINUTE, // in 30 minutes
  },
});
export const joinWaitingList = mutation({
  // Function takes an event ID and user ID as arguments
  args: { travelId: v.id("travel"), userId: v.string(),num:v.array(v.string()) },
  handler: async (ctx, { travelId, userId,num }) => {
    // Rate limit check
     const status = await rateLimiter.limit(ctx, "queueJoin", { key: userId });
     if (!status.ok) {
       throw new ConvexError(
         `You've joined the waiting list too many times. Please wait ${Math.ceil(
           status.retryAfter / (60 * 1000)
         )} minutes before trying again.`
       );
     }

    // First check if user already has an active entry in waiting list for this event
    // Active means any status except EXPIRED
     const existingEntry = await ctx.db
       .query("waitingListT")
       .withIndex("by_user_travel", (q) =>
         q.eq("userId", userId).eq("travelId", travelId)
       )
       .filter((q) => q.neq(q.field("status"), WAITING_LIST_STATUST.EXPIRED))
       .first();
    // // Don't allow duplicate entries
     if (existingEntry) {
       throw new Error("Already in waiting list for this travel");
     }

    // Verify the event exists
    const travel = await ctx.db.get(travelId);
    if (!travel) throw new Error("Travel not found");

    // Check if there are any available tickets right now
    const { available } = await checkAvailabilityTravel(ctx, { travelId });

    const now = Date.now();

    if (available) {
      // If tickets are available, create an offer entry
      const waitingListId = await ctx.db.insert("waitingListT", {
        travelId,
        num:num,
        userId,
        status: WAITING_LIST_STATUST.OFFERED, // Mark as offered
        offerExpiresAt: now + DURATIONS.TICKET_TRAVEL_OFFER, // Set expiration time
      });

      // Schedule a job to expire this offer after the offer duration
      await ctx.scheduler.runAfter(
        DURATIONS.TICKET_OFFER,
        internal.WaitingListT.expireOffer,
        {
          waitingListId,
          travelId,
        }
      );
    } else {
      // If no tickets available, add to waiting list
      await ctx.db.insert("waitingListT", {
        travelId,
        userId,
        num,
        status: WAITING_LIST_STATUST.WAITING, // Mark as waiting
      });
    }

    // Return appropriate status message
    return {
      success: true,
      status: available
        ? WAITING_LIST_STATUST.OFFERED // If available, status is offered
        : WAITING_LIST_STATUST.WAITING, // If not available, status is waiting
      message: available
        ? `Billet proposé - vous avez ${DURATIONS.TICKET_OFFER / (60 * 1000)} minutes pour l'acheter.`
        : "Ajouté à la liste d'attente - vous serez notifié lorsqu'un billet deviendra disponible.",
    };
  },
});
export const getById = query({
  args: { travelId: v.id("travel") },
  handler: async (ctx, { travelId }) => {
    return await ctx.db.get(travelId);
  },
});
