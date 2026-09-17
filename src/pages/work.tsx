import { usePaginatedQuery } from "convex/react"
import { useRef } from "react"
import { Link, useNavigate } from "react-router"
import { routes } from "@/app/routes"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import { openProjectWithMorph } from "@/lib/project-transition"
import { api } from "../../convex/_generated/api"

const Work = () => {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const navigate = useNavigate()
  const {
    results: projects,
    status,
    loadMore,
  } = usePaginatedQuery(api.projects.all, {}, { initialNumItems: 50 })

  const openProject = (
    event: React.MouseEvent<HTMLAnchorElement>,
    projectId: string,
    index: number,
  ) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return
    event.preventDefault()
    openProjectWithMorph({ navigate, projectId, source: imageRefs.current[index] })
  }

  return (
    <div className="work-page min-h-screen">
      <header className="site-frame grid gap-10 pt-40 pb-20 md:grid-cols-12 md:items-end md:pt-48 md:pb-28">
        <h1 className="col-span-8 text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.065em] text-foreground">
          Work, in practice.
        </h1>
        <p className="col-span-4 max-w-sm text-justify text-lg leading-relaxed text-muted-foreground md:pb-1">
          Websites and digital products shaped around the businesses that use them.
        </p>
      </header>

      <section className="border-t border-border/40" aria-label="Selected projects">
        {projects.map((project, index) => {
          const imageFirst = index % 2 === 1
          return (
            <article
              key={project.slug}
              className="group overflow-hidden border-b border-border/40 py-12 md:py-20"
            >
              <div className="site-frame grid md:grid-cols-3 md:items-center">
                <div
                  className={`flex min-h-64 flex-col justify-center p-7 md:row-start-1 ${
                    imageFirst
                      ? "items-start md:col-start-3"
                      : "items-end text-right md:col-start-1"
                  }`}
                >
                  {project.category ? (
                    <p className="mb-3 text-sm text-muted-foreground">{project.category}</p>
                  ) : null}
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <Link
                    to={routes.project(project.slug)}
                    data-no-page-transition
                    onClick={(event) => openProject(event, project.slug, index)}
                    className="button mt-8"
                  >
                    View project
                  </Link>
                </div>

                <Link
                  to={routes.project(project.slug)}
                  data-no-page-transition
                  onClick={(event) => openProject(event, project.slug, index)}
                  aria-label={`View ${project.title}`}
                  className={`relative z-1 aspect-[16/9] overflow-hidden bg-card transition-transform duration-900 ease-[cubic-bezier(0.76,0,0.24,1)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] motion-reduce:transition-none md:col-span-2 md:row-start-1 md:group-focus-within:translate-x-0 md:group-hover:translate-x-0 ${
                    imageFirst
                      ? "md:col-start-1 md:translate-x-1/2"
                      : "md:col-start-2 md:-translate-x-1/2"
                  }`}
                >
                  {project.coverUrl ? (
                    <img
                      ref={(element) => {
                        imageRefs.current[index] = element
                      }}
                      src={project.coverUrl}
                      alt={project.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  ) : null}
                </Link>
              </div>
            </article>
          )
        })}
        {status === "LoadingFirstPage" ? (
          <p className="site-frame py-20 text-muted-foreground">Loading projects…</p>
        ) : null}
        {status === "Exhausted" && projects.length === 0 ? (
          <p className="site-frame py-20 text-muted-foreground">No projects yet.</p>
        ) : null}
        {status === "CanLoadMore" || status === "LoadingMore" ? (
          <div className="site-frame flex justify-center py-12">
            <button
              type="button"
              className="button"
              disabled={status === "LoadingMore"}
              onClick={() => loadMore(50)}
            >
              {status === "LoadingMore" ? "Loading…" : "Load more"}
            </button>
          </div>
        ) : null}
      </section>

      <CTA />
      <Footer />
    </div>
  )
}

export default Work
