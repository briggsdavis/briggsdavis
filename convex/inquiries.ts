import { paginationOptsValidator, paginationResultValidator } from "convex/server"
import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"
import schema from "./schema"

export const create = mutation({
  args: schema.doc("inquiries").omit("_id", "_creationTime", "archived").fields,
  returns: v.id("inquiries"),
  handler: async (ctx, args) => {
    const name = args.name.trim()
    const email = args.email.trim()
    const idea = args.idea.trim()

    if (!name || name.length > 120) throw new ConvexError("Enter a name under 120 characters.")
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new ConvexError("Enter a valid email address.")
    if (!idea || idea.length > 10000)
      throw new ConvexError("Enter your idea under 10,000 characters.")

    return await ctx.db.insert("inquiries", { name, email, type: args.type, idea })
  },
})

export const list = query({
  args: { archived: v.boolean(), paginationOpts: paginationOptsValidator },
  returns: paginationResultValidator(schema.doc("inquiries")),
  handler: async (ctx, { archived, paginationOpts }) => {
    if (!(await ctx.auth.getUserIdentity())) {
      throw new ConvexError("Log in to view inquiries.")
    }

    return await ctx.db
      .query("inquiries")
      .withIndex("by_archived", (q) => q.eq("archived", archived ? true : undefined))
      .order("desc")
      .paginate({
        ...paginationOpts,
        numItems: Math.min(50, Math.max(1, paginationOpts.numItems)),
      })
  },
})

export const archive = mutation({
  args: { id: v.id("inquiries"), archived: v.boolean() },
  returns: v.null(),
  handler: async (ctx, { id, archived }) => {
    if (!(await ctx.auth.getUserIdentity())) {
      throw new ConvexError("Log in to manage inquiries.")
    }

    const inquiry = await ctx.db.get("inquiries", id)
    if (!inquiry) throw new ConvexError("Inquiry not found.")

    await ctx.db.patch("inquiries", id, { archived: archived ? true : undefined })

    return null
  },
})
