import { usePaginatedQuery } from "convex/react"
import { useState } from "react"
import Inquiry from "@/components/inquiry"
import { api } from "../../convex/_generated/api"

export default function AdminInquiries() {
  const [archived, setArchived] = useState(false)
  const { results, status, loadMore } = usePaginatedQuery(
    api.inquiries.list,
    { archived },
    { initialNumItems: 20 },
  )

  return (
    <section aria-labelledby="admin-heading">
      <title>Inquiries • Briggs Davis</title>
      <div className="pb-10">
        <h1 id="admin-heading" className="text-5xl font-semibold tracking-tight sm:text-6xl">
          Inquiries
        </h1>
        <p className="mt-4 text-muted-foreground">The next conversation.</p>
      </div>

      <fieldset className="mb-8 flex gap-2">
        <legend className="sr-only">Inquiry status</legend>
        {[false, true].map((value) => (
          <button
            key={String(value)}
            type="button"
            aria-pressed={archived === value}
            onClick={() => setArchived(value)}
            className={`min-h-11 rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${archived === value ? "bg-black text-white" : "text-muted-foreground hover:bg-card hover:text-foreground"}`}
          >
            {value ? "Archived" : "Inbox"}
          </button>
        ))}
      </fieldset>

      {status === "LoadingFirstPage" ? (
        <output className="block border-t border-border/40 py-12 text-sm text-muted-foreground">
          Loading inquiries…
        </output>
      ) : results.length === 0 ? (
        <output className="block border-t border-border/40 py-12 text-sm text-muted-foreground">
          {archived ? "Nothing archived." : "All quiet. New inquiries will appear here."}
        </output>
      ) : (
        <ul className="divide-y divide-border/40 border-y border-border/40">
          {results.map((inquiry) => (
            <li key={inquiry._id}>
              <Inquiry inquiry={inquiry} />
            </li>
          ))}
        </ul>
      )}

      {status === "CanLoadMore" || status === "LoadingMore" ? (
        <button
          type="button"
          onClick={() => loadMore(20)}
          disabled={status === "LoadingMore"}
          className="mt-8 min-h-11 rounded-full border border-border/40 px-6 text-sm transition-colors hover:bg-card disabled:opacity-50"
        >
          {status === "LoadingMore" ? "Loading…" : "Load more"}
        </button>
      ) : null}
    </section>
  )
}
