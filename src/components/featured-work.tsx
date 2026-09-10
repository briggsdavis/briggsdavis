import { useQuery } from "convex/react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router"
import { routes } from "@/app/routes"
import { openProjectWithMorph } from "@/lib/project-transition"
import { api } from "../../convex/_generated/api"

const FeaturedWork = () => {
  const featuredProjects = useQuery(api.projects.featured)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>("[data-project-card]")
    if (!featuredProjects?.length || !cards?.length) return

    let revealObserver: IntersectionObserver
    const viewportObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          revealObserver.observe(entry.target)
        } else {
          revealObserver.unobserve(entry.target)
          entry.target.removeAttribute("data-revealed")
        }
      }
    })

    const observe = () => {
      revealObserver?.disconnect()
      viewportObserver.disconnect()
      revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue
            entry.target.setAttribute("data-revealed", "true")
            revealObserver.unobserve(entry.target)
          }
        },
        {
          // Half the card crosses 65vh. Extend above the viewport for short screens.
          rootMargin: `${window.innerHeight}px 0px -${window.innerHeight * 0.35}px 0px`,
          threshold: 0.5,
        },
      )
      cards.forEach((card) => viewportObserver.observe(card))
    }

    observe()
    window.addEventListener("resize", observe)
    return () => {
      revealObserver.disconnect()
      viewportObserver.disconnect()
      window.removeEventListener("resize", observe)
    }
  }, [featuredProjects])

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
    <section id="featured-work" ref={sectionRef} className="px-6 pt-16 pb-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 max-w-5xl">
          <h2
            className={`mb-6 text-4xl font-semibold text-foreground opacity-0 [animation-delay:200ms] md:text-5xl ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Selected Work
          </h2>
          <p
            className={`max-w-md text-muted-foreground opacity-0 [animation-delay:400ms] ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Real businesses that used a stronger online presence to elevate their brand and grow.
          </p>
        </div>

        {/* Featured Projects - Stacked */}
        <div className="flex flex-col gap-8">
          {featuredProjects === undefined ? (
            <output className="text-sm text-muted-foreground">Loading selected work…</output>
          ) : featuredProjects.length === 0 ? (
            <p className="text-sm text-muted-foreground">More selected work coming soon.</p>
          ) : null}
          {featuredProjects?.map((item, index) => (
            <article
              key={item.slug}
              data-project-card
              data-details-side={index % 2 === 0 ? "right" : "left"}
              className="group lg:grid lg:grid-cols-3 lg:items-center"
            >
              <div
                className={`relative z-1 aspect-video overflow-hidden bg-background transition-transform duration-1200 ease-in-out motion-reduce:transition-none lg:col-span-2 lg:row-start-1 lg:group-data-revealed:translate-x-0 ${
                  index % 2 === 0
                    ? "lg:col-start-1 lg:translate-x-1/2"
                    : "lg:col-start-2 lg:-translate-x-1/2"
                }`}
              >
                {item.coverUrl ? (
                  <img
                    ref={(el) => {
                      imageRefs.current[index] = el
                    }}
                    src={item.coverUrl}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-card p-7 text-2xl text-muted-foreground">
                    {item.title}
                  </div>
                )}
              </div>

              <div
                className={`flex flex-col justify-center p-7 lg:row-start-1 ${
                  index % 2 === 0
                    ? "items-start lg:col-start-3"
                    : "items-end text-right lg:col-start-1"
                }`}
              >
                <h3 className="mb-3 text-2xl font-semibold text-foreground lg:text-3xl">
                  {item.title}
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">{item.summary}</p>

                <Link
                  to={routes.project(item.slug)}
                  className="text-sm font-medium text-foreground underline underline-offset-4"
                  onFocus={(event) => {
                    event.currentTarget
                      .closest<HTMLElement>("[data-project-card]")
                      ?.setAttribute("data-revealed", "true")
                  }}
                  onClick={(event) => openProject(event, item.slug, index)}
                >
                  Project details
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* All work link */}
        <div
          className={`mt-16 flex justify-center opacity-0 [animation-delay:1100ms] ${isVisible ? "animate-fade-in-up" : ""}`}
        >
          <Link to={routes.work} className="button">
            See all work
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork
