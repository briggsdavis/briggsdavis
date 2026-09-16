import { useQuery } from "convex/react"
import type { FunctionReturnType } from "convex/server"
import { useCallback, useEffect, useRef, useState } from "react"
import type { MouseEvent } from "react"
import { Link, useNavigate } from "react-router"
import { routes } from "@/app/routes"
import { openProjectWithMorph } from "@/lib/project-transition"
import { api } from "../../convex/_generated/api"

type FeaturedProject = FunctionReturnType<typeof api.projects.featured>[number]

const ProjectCard = ({ project }: { project: FeaturedProject }) => {
  const navigate = useNavigate()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const revealRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    const element = revealRef.current
    if (!element || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.18, rootMargin: "0px 0px -6%" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [visible])

  const openProject = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return
      event.preventDefault()
      openProjectWithMorph({ navigate, projectId: project.slug, source: imageRef.current })
    },
    [navigate, project.slug],
  )

  return (
    <article>
      <Link
        to={routes.project(project.slug)}
        data-no-page-transition
        onClick={openProject}
        aria-label={`View ${project.title}`}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <div
          ref={revealRef}
          className={`aspect-[4/3] overflow-hidden bg-card transition-[opacity,filter,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            visible ? "blur-0 scale-100 opacity-100" : "scale-[1.02] opacity-0 blur-xl"
          }`}
        >
          {project.coverUrl ? (
            <img
              ref={imageRef}
              src={project.coverUrl}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] motion-reduce:transition-none"
            />
          ) : null}
        </div>
      </Link>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        <Link
          to={routes.project(project.slug)}
          data-no-page-transition
          onClick={openProject}
          className="focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {project.title}
        </Link>
      </h3>
    </article>
  )
}

const ApproachSelectedWork = () => {
  const featured = useQuery(api.projects.featured)
  const projects = featured?.slice(0, 3) ?? []

  return (
    <section
      className="border-t border-border/50 py-24 md:py-32"
      aria-labelledby="approach-work-title"
    >
      <div className="site-frame">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
          <h2
            id="approach-work-title"
            className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
          >
            Selected work
          </h2>
          <Link to={routes.work} className="button shrink-0">
            Discover our work
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-12 md:grid-cols-3" aria-busy={featured === undefined}>
          {featured === undefined ? (
            <p className="text-muted-foreground">Loading projects…</p>
          ) : projects.length === 0 ? (
            <p className="text-muted-foreground">No featured projects yet.</p>
          ) : (
            projects.map((project) => <ProjectCard key={project.slug} project={project} />)
          )}
        </div>
      </div>
    </section>
  )
}

export default ApproachSelectedWork
