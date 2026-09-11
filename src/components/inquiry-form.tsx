import { useMutation } from "convex/react"
import { ConvexError } from "convex/values"
import { ChevronDown } from "lucide-react"
import { useState, type FormEvent } from "react"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"

const inputClass =
  "w-full rounded-none border-0 border-b border-foreground/35 bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-foreground"
const inquiryTypes = [
  "A new website",
  "A website redesign",
  "A digital product",
  "Something else",
] as const satisfies readonly Doc<"inquiries">["type"][]

export default function InquiryForm() {
  const create = useMutation(api.inquiries.create)
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    const data = new FormData(form)
    const type = inquiryTypes.find((value) => value === data.get("type"))
    if (!type) return

    setPending(true)
    setSent(false)
    setError("")
    try {
      await create({
        name: String(data.get("name")),
        email: String(data.get("email")),
        type,
        idea: String(data.get("idea")),
      })
      form.reset()
      const idea = form.elements.namedItem("idea")
      if (idea instanceof HTMLTextAreaElement) idea.style.height = "auto"
      setSent(true)
    } catch (cause) {
      setError(
        cause instanceof ConvexError && typeof cause.data === "string"
          ? cause.data
          : "Could not send your inquiry. Please try again.",
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit} aria-label="Project inquiry" aria-busy={pending}>
      <fieldset disabled={pending} className="grid gap-10 disabled:opacity-60">
        <div className="grid gap-10 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-medium">
            Name
            <input
              name="name"
              autoComplete="name"
              maxLength={120}
              required
              className={inputClass}
            />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              className={inputClass}
            />
          </label>
        </div>
        <label className="grid gap-1 text-sm font-medium">
          What are we making?
          <span className="relative">
            <select name="type" className={`${inputClass} appearance-none pr-10`}>
              {inquiryTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </span>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Your idea
          <textarea
            name="idea"
            rows={1}
            maxLength={10000}
            required
            onInput={(event) => {
              event.currentTarget.style.height = "auto"
              event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`
            }}
            className={`${inputClass} min-h-12 resize-none overflow-hidden leading-relaxed`}
          />
        </label>
        <button
          type="submit"
          className="min-h-12 justify-self-start rounded-full bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-wait"
        >
          {pending ? "Sending…" : "Send inquiry"}
        </button>
      </fieldset>
      {error ? (
        <p role="alert" className="mt-5 text-sm text-red-800">
          {error}
        </p>
      ) : null}
      <output className="mt-5 block text-sm text-muted-foreground">
        {sent ? "Received. We’ll be in touch by email." : ""}
      </output>
    </form>
  )
}
