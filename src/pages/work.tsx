import { usePaginatedQuery } from "convex/react"
import { useRef } from "react"
import { Link, useNavigate } from "react-router"
import { routes } from "@/app/routes"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import { openProjectWithMorph } from "@/lib/project-transition"
import { api } from "../../convex/_generated/api"

interface WorkProject {
  slug: string
  title: string
  summary: string
  coverUrl: string | null
}

const ProjectRow = ({ project, index }: { project: WorkProject; index: number }) => {
  const navigate = useNavigate()
  const imageRef = useRef<HTMLImageElement>(null)
  const imageFirst = index % 2 === 1

  const openProject = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return

    event.preventDefault()
    openProjectWithMorph({ navigate, projectId: project.slug, source: imageRef.current })
  }

  return (
    <article className="border-b border-border/40 px-6 py-12 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-12 md:items-end md:gap-10">
        <div
          className={`flex flex-col justify-between md:min-h-52 ${
            imageFirst ? "md:order-2 md:col-span-4 md:pl-4" : "md:col-span-4 md:pr-4"
          }`}
        >
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {project.title}
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">{project.summary}</p>
          </div>

          <Link
            to={routes.project(project.slug)}
            onClick={openProject}
            className="button mt-8 self-start"
          >
            View project
          </Link>
        </div>

        <div
          className={`aspect-[16/9] overflow-hidden bg-card ${
            imageFirst ? "md:order-1 md:col-span-8" : "md:col-span-8"
          }`}
        >
          {project.coverUrl ? (
            <img
              ref={imageRef}
              src={project.coverUrl}
              alt={project.title}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-2xl text-muted-foreground">
              {project.title}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

const Work = () => {
  const { results: projectCards, status } = usePaginatedQuery(
    api.projects.all,
    {},
    { initialNumItems: 50 },
  )

  return (
    <div className="min-h-screen">
      <header className="mx-auto grid max-w-7xl gap-10 px-6 pt-40 pb-20 md:grid-cols-12 md:items-end md:pt-48 md:pb-28">
        <h1 className="col-span-8 text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.065em] text-foreground">
          Work, in practice.
        </h1>
        <div className="col-span-4 md:pb-1">
          <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
            Websites, applications, and mobile products shaped around the businesses that use them.
          </p>
        </div>
      </header>

      <section className="border-t border-border/40" aria-label="Selected projects">
        {status === "LoadingFirstPage" ? (
          <output className="mx-auto block max-w-7xl px-6 py-20 text-sm text-muted-foreground">
            Loading work…
          </output>
        ) : projectCards.length === 0 ? (
          <p className="mx-auto max-w-7xl px-6 py-20 text-sm text-muted-foreground">
            More work is coming soon.
          </p>
        ) : null}
        {projectCards.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </section>

      <CTA />
      <Footer />
    </div>
  )
}

export default Work
