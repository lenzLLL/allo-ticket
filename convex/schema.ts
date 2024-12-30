import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    name: v.string(),
    description: v.string(),
    location: v.string(),
    eventDate: v.number(),
    price: v.number(),
    totalTickets: v.number(),
    userId: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    is_cancelled: v.optional(v.boolean()),
  }),
  tickets: defineTable({
    eventId: v.id("events"),
    userId: v.string(),
    purchasedAt: v.number(),
    status: v.union(
      v.literal("valid"),
      v.literal("used"),
      v.literal("refunded"),
      v.literal("cancelled")
    ),
    paymentIntentId: v.optional(v.string()),
    amount: v.optional(v.number()),
  })
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_user_event", ["userId", "eventId"])
    .index("by_payment_intent", ["paymentIntentId"]),

  waitingList: defineTable({
    eventId: v.id("events"),
    userId: v.string(),
    status: v.union(
      v.literal("waiting"),
      v.literal("offered"),
      v.literal("purchased"),
      v.literal("expired")
    ),
    offerExpiresAt: v.optional(v.number()),
  })
    .index("by_event_status", ["eventId", "status"])
    .index("by_user_event", ["userId", "eventId"])
    .index("by_user", ["userId"]),

  users: defineTable({
    name: v.string(),
    location:v.optional(v.string()),
    email: v.string(),
    userId: v.string(),
    stripeConnectId: v.optional(v.string()),
  })
    .index("by_user_id", ["userId"])
    .index("by_email", ["email"]),
    agence:defineTable({
      name:v.string(),
      address:v.string(),
      tel1:v.string(),
      tel2:v.optional(v.string()),
      admins:v.optional(v.array(v.string()))
    }),
    bus:defineTable({
      type:v.string(),
      brand:v.optional(v.string()),
      agenceId:v.id("agence"),
      rows:v.number(),
      cols:v.number(),
      separator:v.optional(v.number())
    }),
    seat:defineTable({
      num:v.string(),
      busId:v.string(),
      col:v.string(),
      row:v.string()
    })
    .index("by_bus", ["busId"]),
    travel:defineTable({
      depart:v.number(),
      arrivate:v.optional(v.number()),
      agenceId:v.id("agence"),
      from:v.string(),
      to:v.string(),
      busId:v.id("bus"),
      price:v.number(),
      class: v.union(
        v.literal("VIP"),
        v.literal("SEMI-VIP"),
        v.literal("CLASSIQUE"),
        v.literal("BUSINESS")
      ),
      wifi:v.boolean(),
      foods:v.boolean(),
      electricity:v.boolean(),
      tv:v.boolean(),
      is_cancelled:v.boolean(),
      duration:v.number()
    }),
    ticketst:defineTable({
      num:v.string(),
      userId:v.optional(v.string()),
      travelId:v.id("travel"),
      amount:v.number(),
      paymentIntentId: v.optional(v.string()),
      status:v.union(
        v.literal("waiting"),
        v.literal("valid"),
        v.literal("used"),
        v.literal("refunded"),
        v.literal("cancelled")
      ), 
      cni:v.optional(v.string()),
      is_cancelled: v.optional(v.boolean()),
    })
    .index("by_travel", ["travelId"])
    .index("by_user_travel", ["userId", "travelId"])
    .index("by_travel_status", ["travelId", "status"])

    ,
    waitingListT: defineTable({
      travelId: v.id("travel"),
      userId: v.string(),
      status: v.union(
        v.literal("waiting"),
        v.literal("offered"),
        v.literal("purchased"),
        v.literal("expired")
      ),
      offerExpiresAt: v.optional(v.number()),
      num:v.array(v.string())
    })
    .index("by_travel_status", ["travelId", "status"])
    .index("by_user_travel", ["userId", "travelId"]),

});
