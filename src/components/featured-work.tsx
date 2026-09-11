import { useRef } from "react"
import { Link, useNavigate } from "react-router"
import { routes } from "@/app/routes"
import { featuredProjectIds, projects } from "@/data/projects"
import { openProjectWithMorph } from "@/lib/project-transition"
import { Reveal } from "@/components/reveal"

const featured = featuredProjectIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project) => project !== undefined)

const FeaturedWork = () => {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const navigate = useNavigate()

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
    <section id="featured-work" className="pt-16 pb-32">
      <div className="site-frame">
        <Reveal className="mb-16 max-w-5xl">
          <h2 className="mb-6 text-4xl font-semibold text-foreground md:text-5xl">
            Selected Work
          </h2>
          <p className="max-w-md text-muted-foreground">
            Real businesses that used a stronger online presence to elevate their brand and grow.
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          {featured.map((project, index) => (
            <Reveal key={project.id}>
              <article className="group overflow-hidden lg:grid lg:grid-cols-3 lg:items-center">
                <Link
                  to={routes.project(project.id)}
                  data-no-page-transition
                  onClick={(event) => openProject(event, project.id, index)}
                  aria-label={`View ${project.name}`}
                  className={`relative z-1 aspect-video overflow-hidden bg-background transition-transform duration-900 ease-[cubic-bezier(0.76,0,0.24,1)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] motion-reduce:transition-none lg:col-span-2 lg:row-start-1 lg:group-hover:translate-x-0 lg:group-focus-within:translate-x-0 ${
                    index % 2 === 0
                      ? "lg:col-start-1 lg:translate-x-1/2"
                      : "lg:col-start-2 lg:-translate-x-1/2"
                  }`}
                >
                  <img
                    ref={(element) => {
                      imageRefs.current[index] = element
                    }}
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </Link>

                <div
                  className={`flex flex-col justify-center p-7 lg:row-start-1 ${
                    index % 2 === 0
                      ? "items-start lg:col-start-3"
                      : "items-end text-right lg:col-start-1"
                  }`}
                >
                  <p className="mb-3 text-sm text-muted-foreground">{project.year}</p>
                  <h3 className="mb-3 text-2xl font-semibold text-foreground lg:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {project.shortDescription ?? project.description}
                  </p>
                  <Link
                    to={routes.project(project.id)}
                    data-no-page-transition
                    onClick={(event) => openProject(event, project.id, index)}
                    className="text-sm font-medium text-foreground underline underline-offset-4"
                  >
                    Project details
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link to={routes.work} className="button">
            See all work
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork
