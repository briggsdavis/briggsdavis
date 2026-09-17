import type { FunctionReturnType } from "convex/server"
import Footer from "@/components/footer"
import ProjectFeatures from "@/components/project-features"
import { getProjectFeatures } from "@/lib/project-features"
import type { api } from "../../convex/_generated/api"

export default function LiveProjectCaseStudy({
  project,
}: {
  project: NonNullable<FunctionReturnType<typeof api.projects.single>>
}) {
  return (
    <div className="project-page">
      <article className="project-content-frame pt-32">
        <div
          data-project-morph-reveal
          className="mb-12 flex flex-wrap items-start justify-between gap-8 md:mb-16"
        >
          <div className="max-w-2xl">
            {project.category ? (
              <p className="mb-5 text-sm text-muted-foreground">{project.category}</p>
            ) : null}
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{project.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground">{project.summary}</p>
          </div>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="button">
              Visit website
            </a>
          ) : null}
        </div>

        <div>
          {project.coverUrl ? (
            <img
              src={project.coverUrl}
              alt={project.title}
              data-project-morph-target={project.slug}
              className="w-full"
            />
          ) : null}

          <div
            data-project-morph-reveal
            className="my-20 text-justify text-lg leading-relaxed wrap-anywhere whitespace-pre-wrap"
          >
            {project.content}
          </div>
        </div>
      </article>
      <ProjectFeatures
        key={project.slug}
        title={project.title}
        features={getProjectFeatures(project.slug, project.content)}
        images={project.galleryUrls.flatMap((url, index) =>
          url ? [{ id: project.gallery[index], url }] : [],
        )}
      />
      <div data-project-morph-reveal>
        <Footer />
      </div>
    </div>
  )
}
