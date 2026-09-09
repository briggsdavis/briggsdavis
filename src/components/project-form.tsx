import { useMutation } from "convex/react"
import type { FunctionReturnType } from "convex/server"
import { ConvexError } from "convex/values"
import { useRef, useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { routes } from "@/app/routes"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import ProjectImages from "./project-images"

const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]
const inputClass =
  "w-full rounded-xl border border-border/60 bg-card/40 px-4 py-3.5 text-base outline-none transition-colors focus:border-foreground focus:bg-white"

export default function ProjectForm({
  project,
}: {
  project?: NonNullable<FunctionReturnType<typeof api.projects.single>>
}) {
  const create = useMutation(api.projects.create)
  const update = useMutation(api.projects.update)
  const generateUploadUrl = useMutation(api.projects.generateUploadUrl)
  const navigate = useNavigate()
  const uploads = useRef(new Map<File, Id<"_storage">>())

  const [cover, setCover] = useState<File[]>([])
  const [gallery, setGallery] = useState<File[]>([])
  const [existingGallery, setExistingGallery] = useState(project?.gallery ?? [])
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  async function upload(file: File) {
    const cached = uploads.current.get(file)
    if (cached) return cached

    const url = await generateUploadUrl()
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    })

    if (!response.ok) throw new Error("Upload failed")

    const result: { storageId: Id<"_storage"> } = await response.json()
    uploads.current.set(file, result.storageId)

    return result.storageId
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return

    const data = new FormData(event.currentTarget)
    const files = [...cover, ...gallery]

    if (!project && cover.length !== 1) {
      setError("Choose a cover image.")
      return
    }

    if (
      gallery.length + existingGallery.length > 20 ||
      files.some((file) => !imageTypes.includes(file.type) || file.size > 10 * 1024 * 1024)
    ) {
      setError(
        "Choose up to 20 gallery images. Use JPG, PNG, WebP, AVIF, or GIF files under 10 MB.",
      )
      return
    }

    setError("")
    setPending(true)

    try {
      const coverId = cover[0] ? await upload(cover[0]) : project?.cover
      if (!coverId) throw new Error("Missing cover")
      const galleryIds: Id<"_storage">[] = [...existingGallery]

      for (const file of gallery) galleryIds.push(await upload(file))

      const fields = {
        title: String(data.get("title")),
        summary: String(data.get("summary")),
        content: String(data.get("content")),
        url: String(data.get("url")) || undefined,
        featured: data.get("featured") === "on",
        cover: coverId,
        gallery: galleryIds,
      }

      if (project) {
        const { _id } = project
        await update({ _id, ...fields })
      } else {
        await create(fields)
      }

      navigate(routes.admin, {
        replace: true,
        state: { notice: project ? "Changes saved." : "Project created." },
      })
    } catch (cause) {
      setError(
        cause instanceof ConvexError && typeof cause.data === "string"
          ? cause.data
          : "Could not save the project. Try again.",
      )
      setPending(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl">
      <title>{`${project ? "Edit project" : "New project"} | Briggs Davis`}</title>

      {pending ? (
        <span className="text-sm text-muted-foreground">Projects</span>
      ) : (
        <Link className="text-sm underline-offset-4 hover:underline" to={routes.admin}>
          Projects
        </Link>
      )}

      <h1 className="mt-8 mb-12 text-4xl font-semibold tracking-tight sm:text-5xl">
        {project ? "Edit project" : "New project"}
      </h1>

      <form onSubmit={save} aria-busy={pending}>
        <fieldset disabled={pending} className="grid gap-10 disabled:opacity-60">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2 text-sm sm:col-span-2">
              Title
              <input
                className={inputClass}
                name="title"
                defaultValue={project?.title}
                maxLength={120}
                required
              />
            </label>

            <label className="grid gap-2 text-sm sm:col-span-2">
              Summary
              <textarea
                className={inputClass}
                name="summary"
                defaultValue={project?.summary}
                rows={2}
                maxLength={500}
                required
              />
            </label>

            <label className="grid gap-2 text-sm sm:col-span-2">
              Website
              <input className={inputClass} name="url" defaultValue={project?.url} type="url" />
            </label>
          </div>

          <div className="grid gap-6 border-t border-border/40 pt-8 sm:grid-cols-2">
            <div className="grid content-start gap-4">
              <label className="grid gap-3 text-sm">
                Cover
                <input
                  type="file"
                  accept={imageTypes.join(",")}
                  onChange={(event) => setCover(Array.from(event.target.files ?? []))}
                  className="w-full text-sm file:mr-4 file:rounded-full file:border file:border-border/40 file:bg-transparent file:px-4 file:py-2 file:text-foreground"
                  required={!project}
                />
              </label>

              {cover.length === 0 && project?.coverUrl ? (
                <img
                  src={project.coverUrl}
                  alt="Current cover"
                  className="aspect-video w-full rounded-lg object-cover"
                />
              ) : null}

              <ProjectImages files={cover} />
            </div>

            <div className="grid content-start gap-4">
              <label className="grid gap-3 text-sm">
                Gallery
                <input
                  type="file"
                  accept={imageTypes.join(",")}
                  multiple
                  onChange={(event) => setGallery(Array.from(event.target.files ?? []))}
                  className="w-full text-sm file:mr-4 file:rounded-full file:border file:border-border/40 file:bg-transparent file:px-4 file:py-2 file:text-foreground"
                />
              </label>

              {existingGallery.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {existingGallery.map((id) => {
                    const url = project?.galleryUrls[project.gallery.indexOf(id)]

                    return (
                      <div key={id} className="grid gap-2">
                        {url ? (
                          <img
                            src={url}
                            alt="Project detail"
                            className="aspect-video w-36 rounded-lg object-cover"
                          />
                        ) : null}

                        <button
                          type="button"
                          onClick={() =>
                            setExistingGallery((ids) => ids.filter((value) => value !== id))
                          }
                          className="text-xs underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  })}
                </div>
              ) : null}

              <ProjectImages files={gallery} />
            </div>
          </div>

          <label className="grid gap-3 border-t border-border/40 pt-8 text-sm">
            Content
            <span className="text-xs text-muted-foreground">
              Plain text. Paragraph breaks are preserved.
            </span>
            <textarea
              className={inputClass}
              name="content"
              defaultValue={project?.content}
              rows={10}
              maxLength={50000}
              required
            />
          </label>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project?.featured}
              className="size-4 accent-black"
            />
            Featured
          </label>

          <div className="flex items-center gap-6 border-t border-border/40 pt-8">
            <button
              type="submit"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:cursor-wait"
            >
              {pending ? "Saving…" : project ? "Save changes" : "Create project"}
            </button>

            {!pending ? (
              <Link className="text-sm underline-offset-4 hover:underline" to={routes.admin}>
                Cancel
              </Link>
            ) : null}
          </div>
        </fieldset>

        {error ? (
          <p role="alert" className="mt-6 text-sm text-red-800">
            {error}
          </p>
        ) : null}
      </form>
    </section>
  )
}
