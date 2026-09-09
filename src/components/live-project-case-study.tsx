import type { FunctionReturnType } from "convex/server"
import { ExternalLink } from "lucide-react"
import Footer from "@/components/footer"
import type { api } from "../../convex/_generated/api"

export default function LiveProjectCaseStudy({
  project,
}: {
  project: NonNullable<FunctionReturnType<typeof api.projects.single>>
}) {
  return (
    <>
      <article className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <div className="mb-12 flex flex-wrap items-start justify-between gap-8 md:mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{project.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground">{project.summary}</p>
          </div>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-3 rounded-full border border-border/40 px-6 text-sm transition-colors hover:bg-card"
            >
              Visit website <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          ) : null}
        </div>

        {project.coverUrl ? (
          <img
            src={project.coverUrl}
            alt={project.title}
            data-project-morph-target={project.slug}
            className="w-full"
          />
        ) : null}

        <div className="mx-auto my-20 max-w-2xl text-lg leading-relaxed wrap-anywhere whitespace-pre-wrap">
          {project.content}
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-2 md:gap-8">
          {project.galleryUrls.map((url, index) =>
            url ? (
              <img
                key={`${project.gallery[index]}-${index}`}
                src={url}
                alt={`${project.title}, detail ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full"
              />
            ) : null,
          )}
        </div>
      </article>
      <Footer />
    </>
  )
}
