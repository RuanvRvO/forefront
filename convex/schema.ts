import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  numbers: defineTable({
    value: v.number(),
  }),
  meetings: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    type: v.union(v.literal("Online"), v.literal("In-Person")),
    leader: v.optional(v.string()), // Meeting leader (admin-only)
    codaId: v.optional(v.string()), // For tracking the source from Coda
  }).index("by_date", ["date"]),
  emailSubscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(), // Timestamp
    source: v.optional(v.string()), // Where they subscribed from (e.g., "landing_page")
  }).index("by_email", ["email"]),
  // Admin access approval system
  pendingUsers: defineTable({
    userId: v.id("users"), // Reference to the auth user
    email: v.string(),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
    requestedAt: v.number(), // Timestamp
    reviewedAt: v.optional(v.number()), // Timestamp when approved/declined
    approvalToken: v.string(), // Secure token for approve/decline links
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"])
    .index("by_approvalToken", ["approvalToken"])
    .index("by_status", ["status"]),
});
