import { internalMutation, mutation, query } from "@/convex/_generated/server";
import { DURATIONS, TICKETT_STATUS, WAITING_LIST_STATUST } from "@/convex/constants";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const processQueue = mutation({
  args: {
    travelId: v.id("travel"),
  },
  handler: async (ctx, { travelId }) => {
    const travel = await ctx.db.get(travelId);
    if (!travel) throw new Error("Travel not found");

    // Calculate available spots
    const totalTickets = await ctx.db
    .query("ticketst")
    .withIndex("by_travel", (q) =>
      q.eq("travelId", travelId)
    )
    .collect()
    const { availableSpots } = await ctx.db
      .query("travel")
      .filter((q) => q.eq(q.field("_id"), travelId))
      .first()
      .then(async (travel) => {
        if (!travel) throw new Error("travel not found");

        const purchasedCount = await ctx.db
          .query("ticketst")
          .withIndex("by_travel", (q) => q.eq("travelId", travelId))
          .collect()
          .then(
            (tickets) =>
              tickets.filter(
                (t) =>
                  t.status === TICKETT_STATUS.VALID ||
                  t.status === TICKETT_STATUS.USED
              ).length
          );

        const now = Date.now();
        const activeOffers = await ctx.db
          .query("waitingListT")
          .withIndex("by_travel_status", (q) =>
            q.eq("travelId", travelId).eq("status", WAITING_LIST_STATUST.OFFERED)
          )
          .collect()
          .then(
            (entries) =>
              entries.filter((e) => (e.offerExpiresAt ?? 0) > now).length
          );

        return {
          availableSpots: totalTickets.length - (purchasedCount + activeOffers),
        };
      });

    if (availableSpots <= 0) return;

    // Get next users in line
    const waitingUsers = await ctx.db
      .query("waitingListT")
      .withIndex("by_travel_status", (q) =>
        q.eq("travelId", travelId).eq("status", WAITING_LIST_STATUST.WAITING)
      )
      .order("asc")
      .take(availableSpots);

    // Create time-limited offers for selected users
    const now = Date.now();
    for (const user of waitingUsers) {
      // Update the waiting list entry to OFFERED status
      await ctx.db.patch(user._id, {
        status: WAITING_LIST_STATUST.OFFERED,
        offerExpiresAt: now + DURATIONS.TICKET_TRAVEL_OFFER,
      });

      // Schedule expiration job for this offer
      await ctx.scheduler.runAfter(
        DURATIONS.TICKET_OFFER,
        internal.WaitingListT.expireOffer,
        {
          waitingListId: user._id,
          travelId,
        }
      );
    }
  },
});
export const expireOffer = internalMutation({
  args: {
    waitingListId: v.id("waitingListT"),
    travelId: v.id("travel"),
  },
  handler: async (ctx, { waitingListId, travelId }) => {
    const offer = await ctx.db.get(waitingListId);
    if (!offer || offer.status !== WAITING_LIST_STATUST.OFFERED) return;

    await ctx.db.patch(waitingListId, {
      status: WAITING_LIST_STATUST.EXPIRED,
    });

    await processQueue(ctx, { travelId });
  },
});
export const getQueuePosition = query({
    args: {
      travelId: v.id("travel"),
      userId: v.string(),
    },
    handler: async (ctx, { travelId, userId }) => {
      // Get entry for this specific user and event combination
      const entry = await ctx.db
        .query("waitingListT")
        .withIndex("by_user_travel", (q) =>
          q.eq("userId", userId).eq("travelId", travelId)
        )
        .filter((q) => q.neq(q.field("status"), WAITING_LIST_STATUST.EXPIRED))
        .first();
  
      if (!entry) return null;
  
      // Get total number of people ahead in line
      const peopleAhead = await ctx.db
        .query("waitingListT")
        .withIndex("by_travel_status", (q) => q.eq("travelId", travelId))
        .filter((q) =>
          q.and(
            q.lt(q.field("_creationTime"), entry._creationTime),
            q.or(
              q.eq(q.field("status"), WAITING_LIST_STATUST.WAITING),
              q.eq(q.field("status"), WAITING_LIST_STATUST.OFFERED)
            )
          )
        )
        .collect()
        .then((entries) => entries.length);
  
      return {
        ...entry,
        position: peopleAhead + 1,
      };
    },
});
export const releaseTicket = mutation({
  args: {
    travelId: v.id("travel"),
    waitingListId: v.id("waitingListT"),
  },
  handler: async (ctx, { travelId, waitingListId }) => {
    const entry = await ctx.db.get(waitingListId);
    if (!entry || entry.status !== WAITING_LIST_STATUST.OFFERED) {
      throw new Error("No valid ticket offer found");
    }

    // Mark the entry as expired
    await ctx.db.patch(waitingListId, {
      status: WAITING_LIST_STATUST.EXPIRED,
    });

    // Process queue to offer ticket to next person
     await processQueue(ctx, { travelId });
  },
});