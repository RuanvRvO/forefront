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
    codaId: v.optional(v.string()), // For tracking the source from Coda
  }).index("by_date", ["date"]),
  emailSubscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(), // Timestamp
    source: v.optional(v.string()), // Where they subscribed from (e.g., "landing_page")
  }).index("by_email", ["email"]),
});
