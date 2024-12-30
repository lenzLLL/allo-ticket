import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { DURATIONS, TICKETT_STATUS, WAITING_LIST_STATUST } from "./constants";

export const getUserTicketForTravel = query({
  args: {
    travelId: v.id("travel"),
    userId: v.string(),
  },
  handler: async (ctx, { travelId, userId }) => {
    const ticket = await ctx.db
      .query("ticketst")
      .withIndex("by_user_travel", (q) =>
        q.eq("userId", userId).eq("travelId", travelId)
      )
      .first();

    return ticket;
  },
});

export const checkAvailabilityTravel = query({
  args: { travelId: v.id("travel") },
  handler: async (ctx, { travelId }) => {
    const travel = await ctx.db.get(travelId);
    if (!travel) throw new Error("Travel not found");

    // Count total purchased tickets
    const purchasedCount = await ctx.db
      .query("ticketst")
      .withIndex("by_travel", (q) => q.eq("travelId", travelId))
      .collect()
      .then(
        (tickets) =>
          tickets.filter(
            (t) =>
              (t.status === TICKETT_STATUS.VALID ||
              t.status === TICKETT_STATUS.USED) 
          ).length
      );
      const totalTickets = await ctx.db
      .query("ticketst")
      .withIndex("by_travel", (q) => q.eq("travelId", travelId))
      .collect()
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

    const availableSpots = totalTickets.length - (purchasedCount + activeOffers);

    return {
      available: availableSpots > 0,
      availableSpots,
      totalTickets: totalTickets.length,
      purchasedCount,
      activeOffers,
    };
  },
});


