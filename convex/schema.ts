import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  ...authTables,
  inquiries: defineTable({
    name: v.string(),
    email: v.string(),
    type: v.union(
      v.literal("A new website"),
      v.literal("A website redesign"),
      v.literal("A digital product"),
      v.literal("Something else"),
    ),
    idea: v.string(),
    archived: v.optional(v.literal(true)),
  }).index("by_archived", ["archived"]),
  projects: defineTable({
    slug: v.string(),
    title: v.string(),
    summary: v.string(),
    featured: v.boolean(),
    cover: v.id("_storage"),
    url: v.optional(v.string()),
    content: v.string(),
    gallery: v.array(v.id("_storage")),
  })
    .index("by_slug", ["slug"])
    .index("by_featured", ["featured"]),
})
