import { useMutation } from "convex/react"
import { ConvexError } from "convex/values"
import { Archive, ChevronDown, Undo2 } from "lucide-react"
import { useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" })

export default function Inquiry({ inquiry }: { inquiry: Doc<"inquiries"> }) {
  const archive = useMutation(api.inquiries.archive)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  async function changeArchive() {
    if (pending) return
    setPending(true)
    setError("")

    try {
      await archive({ id: inquiry._id, archived: !inquiry.archived })
    } catch (cause) {
      setError(
        cause instanceof ConvexError && typeof cause.data === "string"
          ? cause.data
          : "Could not update the inquiry. Try again.",
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <details className="group py-6">
      <summary className="cursor-pointer list-none rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-6">
          <span className="text-xl font-medium tracking-tight wrap-anywhere sm:text-2xl">
            {inquiry.name}
          </span>
          <ChevronDown
            aria-hidden="true"
            className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
          />
        </span>
        <span className="mt-2 flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
          <span>{inquiry.type}</span>
          <time dateTime={new Date(inquiry._creationTime).toISOString()}>
            {dateFormat.format(inquiry._creationTime)}
          </time>
        </span>
      </summary>

      <div className="pt-6">
        <a
          href={`mailto:${inquiry.email}`}
          className="text-sm wrap-anywhere underline underline-offset-4"
        >
          {inquiry.email}
        </a>
        <p className="mt-5 max-w-3xl leading-relaxed wrap-anywhere whitespace-pre-wrap">
          {inquiry.idea}
        </p>
        <button
          type="button"
          onClick={changeArchive}
          disabled={pending}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-border/40 px-5 text-sm transition-colors hover:bg-card disabled:cursor-wait disabled:opacity-50"
        >
          {inquiry.archived ? (
            <Undo2 aria-hidden="true" className="size-4" />
          ) : (
            <Archive aria-hidden="true" className="size-4" />
          )}
          {pending ? "Saving…" : inquiry.archived ? "Restore" : "Archive"}
        </button>
        {error ? (
          <p role="alert" className="mt-4 text-sm text-red-800">
            {error}
          </p>
        ) : null}
      </div>
    </details>
  )
}
