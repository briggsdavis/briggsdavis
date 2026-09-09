import { useMutation } from "convex/react"
import { ConvexError } from "convex/values"
import { useState } from "react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"

export default function DeleteProject({ id, title }: { id: Id<"projects">; title: string }) {
  const remove = useMutation(api.projects.remove)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  async function deleteProject() {
    if (pending || !window.confirm(`Delete “${title}”? This cannot be undone.`)) return

    setPending(true)
    setError("")

    try {
      await remove({ id })
    } catch (cause) {
      setError(
        cause instanceof ConvexError && typeof cause.data === "string"
          ? cause.data
          : "Could not delete the project. Try again.",
      )
      setPending(false)
    }
  }

  return (
    <div className="text-right">
      <button
        type="button"
        onClick={deleteProject}
        disabled={pending}
        aria-label={`Delete ${title}`}
        className="text-sm text-red-800 underline-offset-4 hover:underline disabled:opacity-60"
      >
        {pending ? "Deleting…" : "Delete"}
      </button>

      {error ? (
        <p role="alert" className="mt-2 max-w-xs text-xs text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  )
}
