import slugify from "@sindresorhus/slugify"
import { paginationOptsValidator, paginationResultValidator } from "convex/server"
import { ConvexError, v } from "convex/values"
import type { Doc } from "./_generated/dataModel"
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server"
import schema from "./schema"

const limit = 100
const project = schema.doc("projects")

async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  if (!(await ctx.auth.getUserIdentity())) {
    throw new ConvexError("Log in to manage projects.")
  }
}

export const adminList = query({
  args: { paginationOpts: paginationOptsValidator },
  returns: paginationResultValidator(
    project
      .pick("_id", "_creationTime", "title", "slug", "featured")
      .extend({ coverUrl: v.union(v.string(), v.null()) }),
  ),
  handler: async (ctx, { paginationOpts }) => {
    await requireAdmin(ctx)

    const result = await ctx.db
      .query("projects")
      .order("desc")
      .paginate({
        ...paginationOpts,
        numItems: Math.min(50, Math.max(1, paginationOpts.numItems)),
      })
    const page = await Promise.all(
      result.page.map(async ({ _id, _creationTime, title, slug, featured, cover }) => ({
        _id,
        _creationTime,
        title,
        slug,
        featured,
        coverUrl: await ctx.storage.getUrl(cover),
      })),
    )

    return { ...result, page }
  },
})

export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    await requireAdmin(ctx)

    return await ctx.storage.generateUploadUrl()
  },
})

type ProjectInput = Omit<Doc<"projects">, "_id" | "_creationTime" | "slug">

async function validateProject(ctx: MutationCtx, args: ProjectInput) {
  const title = args.title.trim()
  const summary = args.summary.trim()
  const content = args.content.trim()
  const url = args.url?.trim() || undefined

  if (!title || title.length > 120) throw new ConvexError("Enter a title under 120 characters.")
  if (!summary || summary.length > 500)
    throw new ConvexError("Enter a summary under 500 characters.")
  if (!content || content.length > 50000)
    throw new ConvexError("Enter content under 50,000 characters.")
  if (args.gallery.length > 20) throw new ConvexError("Choose up to 20 gallery images.")

  if (url) {
    try {
      if (!["https:", "http:"].includes(new URL(url).protocol)) throw new Error()
    } catch {
      throw new ConvexError("Enter a valid http or https website URL.")
    }
  }

  await Promise.all(
    [args.cover, ...args.gallery].map(async (id) => {
      const file = await ctx.db.system.get(id)

      if (
        !file ||
        !["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"].includes(
          file.contentType ?? "",
        ) ||
        file.size > 10 * 1024 * 1024
      ) {
        throw new ConvexError("Use JPG, PNG, WebP, AVIF, or GIF images under 10 MB.")
      }
    }),
  )

  return { ...args, title, summary, content, url }
}

export const create = mutation({
  args: project.omit("_id", "_creationTime", "slug").fields,
  returns: v.id("projects"),
  handler: async (ctx, args) => {
    await requireAdmin(ctx)

    const fields = await validateProject(ctx, args)
    const slug = slugify(fields.title).slice(0, 100).replace(/-$/, "")
    if (!slug) throw new ConvexError("Use a title that contains letters or numbers.")

    const existing = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique()
    if (existing)
      throw new ConvexError("That title produces an existing project URL. Choose another title.")

    return await ctx.db.insert("projects", { ...fields, slug })
  },
})

export const update = mutation({
  args: project.omit("_creationTime", "slug").fields,
  returns: v.null(),
  handler: async (ctx, { _id, ...args }) => {
    await requireAdmin(ctx)

    const existing = await ctx.db.get("projects", _id)
    if (!existing) throw new ConvexError("Project not found.")

    const fields = await validateProject(ctx, args)
    await ctx.db.patch("projects", _id, fields)

    return null
  },
})

export const remove = mutation({
  args: { id: v.id("projects") },
  returns: v.null(),
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx)

    const existing = await ctx.db.get("projects", id)
    if (existing) await ctx.db.delete("projects", id)

    return null
  },
})

const projectWithImages = project.extend({
  coverUrl: v.union(v.string(), v.null()),
  galleryUrls: v.array(v.union(v.string(), v.null())),
})

async function withImages(ctx: QueryCtx, item: Doc<"projects">) {
  const [coverUrl, galleryUrls] = await Promise.all([
    ctx.storage.getUrl(item.cover),
    Promise.all(item.gallery.map((id) => ctx.storage.getUrl(id))),
  ])

  return { ...item, coverUrl, galleryUrls }
}

const projectCard = project.pick("slug", "title", "summary").extend({
  coverUrl: v.union(v.string(), v.null()),
})

async function withCover(ctx: QueryCtx, { slug, title, summary, cover }: Doc<"projects">) {
  return { slug, title, summary, coverUrl: await ctx.storage.getUrl(cover) }
}

export const all = query({
  args: { paginationOpts: paginationOptsValidator },
  returns: paginationResultValidator(projectCard),
  handler: async (ctx, { paginationOpts }) => {
    const result = await ctx.db
      .query("projects")
      .order("desc")
      .paginate({
        ...paginationOpts,
        numItems: Math.min(50, Math.max(1, paginationOpts.numItems)),
      })
    const page = await Promise.all(result.page.map((item) => withCover(ctx, item)))

    return { ...result, page }
  },
})

export const featured = query({
  args: {},
  returns: v.array(projectCard),
  handler: async (ctx) => {
    const items = await ctx.db
      .query("projects")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .take(limit)

    return await Promise.all(items.map((item) => withCover(ctx, item)))
  },
})

export const single = query({
  args: { slug: v.string() },
  returns: v.union(projectWithImages, v.null()),
  handler: async (ctx, { slug }) => {
    const item = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique()

    return item ? await withImages(ctx, item) : null
  },
})
