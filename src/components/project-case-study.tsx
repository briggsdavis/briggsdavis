import { ExternalLink, Plus } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { routes } from "@/app/routes"
import Footer from "@/components/footer"
import type { Project } from "@/data/projects"

const FeatureList = ({ project }: { project: Project }) => {
  const [openFeatures, setOpenFeatures] = useState<Set<number>>(() => new Set())

  const toggleFeature = (index: number) => {
    setOpenFeatures((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="lg:sticky lg:top-1/2 lg:self-start lg:-translate-y-1/2">
      <p className="mb-5 text-sm font-medium tracking-wide text-muted-foreground uppercase">
        Features
      </p>
      <div className="border-t border-border/50">
        {project.features.map((feature, index) => {
          const isOpen = openFeatures.has(index)
          const panelId = `${project.id}-feature-${index}`
          return (
            <div key={feature.title} className="border-b border-border/50">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleFeature(index)}
                className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left text-base font-medium text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <span>{feature.title}</span>
                <Plus
                  className={`mt-1 h-4 w-4 shrink-0 transition-transform duration-400 motion-reduce:transition-none ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
              <div
                id={panelId}
                aria-hidden={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="max-w-lg pb-6 text-base leading-relaxed text-muted-foreground">
                    {feature.detail}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const ProjectCaseStudy = ({ project }: { project: Project }) => {
  const gallery = [...project.caseStudyImages, ...(project.postFeatureImages ?? [])]

  return (
    <div className="min-h-screen">
      <article>
        <header className="site-frame grid min-h-[58svh] content-end gap-10 pt-36 pb-14 md:grid-cols-12 md:pb-20">
          <div className="md:col-span-8">
            <p className="mb-5 text-sm text-muted-foreground">
              {project.year} · {project.tags.join(" / ")}
            </p>
            <h1 className="text-[clamp(3.5rem,8vw,8rem)] leading-[0.88] font-semibold tracking-[-0.065em] text-foreground">
              {project.name}
            </h1>
          </div>
          <div className="self-end md:col-span-4">
            <p className="text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4"
              >
                Visit website
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </header>

        <figure className="site-frame">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} website`}
              className="group block overflow-hidden bg-card shadow-[0_12px_34px_rgba(0,0,0,0.07)] focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
            >
              <img
                src={project.image}
                alt={`${project.name} project overview`}
                data-project-morph-target={project.id}
                className="max-h-[92svh] min-h-[50svh] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01] motion-reduce:transition-none"
              />
            </a>
          ) : (
            <div className="overflow-hidden bg-card shadow-[0_12px_34px_rgba(0,0,0,0.07)]">
              <img
                src={project.image}
                alt={`${project.name} project overview`}
                data-project-morph-target={project.id}
                className="max-h-[92svh] min-h-[50svh] w-full object-cover object-top"
              />
            </div>
          )}
        </figure>

        <section className="site-frame py-24 md:py-32">
          <div className="grid gap-10 md:grid-cols-12">
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase md:col-span-3">
              The project
            </p>
            <div className="space-y-10 md:col-span-8 md:col-start-5">
              <p className="text-2xl leading-snug font-medium tracking-tight text-foreground md:text-4xl">
                {project.description}
              </p>
              <div className="grid gap-8 border-t border-border/50 pt-8 sm:grid-cols-3">
                {project.problem ? (
                  <div>
                    <h2 className="mb-3 text-sm font-medium text-foreground">Problem</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
                  </div>
                ) : null}
                {project.solution ? (
                  <div>
                    <h2 className="mb-3 text-sm font-medium text-foreground">Solution</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
                  </div>
                ) : null}
                {project.businessValue ? (
                  <div>
                    <h2 className="mb-3 text-sm font-medium text-foreground">Business value</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.businessValue}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/50 py-20 md:py-28">
          <div className="site-frame grid gap-14 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.7fr)] lg:gap-20">
            <FeatureList project={project} />

            <div className="space-y-8 md:space-y-12" aria-label={`${project.name} project views`}>
              {gallery.map((image, index) => (
                <figure
                  key={image}
                  className="overflow-hidden bg-card shadow-[0_12px_34px_rgba(0,0,0,0.07)]"
                >
                  <img
                    src={image}
                    alt={`${project.name} website view ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover object-top"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/50 px-6 py-24 text-center md:py-32">
          <h2 className="mx-auto max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-foreground md:text-6xl">
            Have a project in mind?
          </h2>
          <Link to={routes.contact} className="button mt-8">
            Start a conversation
          </Link>
        </section>
      </article>
      <Footer />
    </div>
  )
}
