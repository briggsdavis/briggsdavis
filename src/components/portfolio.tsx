import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { routes } from "@/app/routes"
import { featuredProjectIds, projects } from "@/data/projects"
import { openProjectWithMorph } from "@/lib/project-transition"

const featuredProjects = featuredProjectIds.map((id) =>
  projects.find((project) => project.id === id)!,
)
const featuredDelayClasses = [
  "[animation-delay:500ms]",
  "[animation-delay:650ms]",
  "[animation-delay:800ms]",
  "[animation-delay:950ms]",
]

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const [scales, setScales] = useState<number[]>(featuredProjects.map(() => 0.85))
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
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const rafRef = useRef<number>(0)

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const newScales = itemRefs.current.map((ref) => {
        if (!ref) return 0.88
        const rect = ref.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const center = rect.top + rect.height / 2
        const screenCenter = windowHeight / 2
        const distance = Math.abs(center - screenCenter)
        const maxDistance = windowHeight * 0.6
        // Smooth easing curve
        const raw = 1 - Math.min(distance / maxDistance, 1)
        const progress = raw * raw // quadratic ease for snappier center focus
        // Scale from 0.88 to 1.05 - slight overshoot for magnifying feel
        return 0.88 + progress * 0.17
      })
      setScales(newScales)
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

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
    <section id="portfolio" ref={sectionRef} className="px-6 pt-16 pb-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 max-w-5xl">
          <span
            className={`mb-4 block font-eyebrow text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 [animation-delay:100ms] ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Case Studies
          </span>
          <h2
            className={`mb-6 text-4xl font-semibold text-foreground opacity-0 [animation-delay:200ms] md:text-5xl ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Selected Work
          </h2>
          <div
            className={`mb-6 h-0.5 w-12 bg-muted-foreground opacity-0 [animation-delay:300ms] ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          />
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
          {featuredProjects.map((item, index) => (
            <div
              key={item.id}
              className={`opacity-0 ${featuredDelayClasses[index]} ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              <Link
                to={routes.project(item.id)}
                className="block"
                onClick={(event) => openProject(event, item.id, index)}
              >
                <article
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  data-details-side={index % 2 === 0 ? "right" : "left"}
                  className="group relative cursor-pointer bg-transparent transition-transform duration-150 ease-out will-change-transform lg:aspect-[2.47/1]"
                  style={{ transform: `scale(${scales[index]})` }}
                >
                  <div
                    className={`relative z-1 aspect-video overflow-hidden motion-reduce:translate-x-0 motion-reduce:transition-none lg:absolute lg:inset-y-0 lg:aspect-auto lg:w-[72%] lg:will-change-[translate] lg:[transition:translate_1400ms_cubic-bezier(0.65,0,0.35,1)] ${
                      index % 2 === 0
                        ? "lg:right-0 lg:group-focus-within:-translate-x-[38.8889%] lg:group-hover:-translate-x-[38.8889%]"
                        : "lg:left-0 lg:group-focus-within:translate-x-[38.8889%] lg:group-hover:translate-x-[38.8889%]"
                    }`}
                  >
                    <img
                      ref={(el) => {
                        imageRefs.current[index] = el
                      }}
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div
                    className={`flex flex-col justify-center bg-transparent p-7 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none lg:absolute lg:inset-y-0 lg:w-[28%] lg:translate-y-11 lg:opacity-0 lg:will-change-[opacity,translate] lg:[transition:opacity_650ms_ease_300ms,translate_950ms_cubic-bezier(0.22,1,0.36,1)_250ms] lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 ${
                      index % 2 === 0 ? "lg:right-0" : "lg:left-0"
                    }`}
                  >
                    <h3 className="mb-3 text-2xl leading-tight font-semibold text-foreground lg:text-3xl">
                      {item.name}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {item.shortDescription ?? item.description}
                    </p>

                    <div className="mb-7 flex items-center justify-between border-t border-border/70 pt-4 font-eyebrow text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      <span>Year</span>
                      <span className="text-foreground">{item.year}</span>
                    </div>

                    <span className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-full border border-border/30 bg-card/60 px-6 text-xs font-medium tracking-wide text-foreground uppercase shadow-lg shadow-black/10 backdrop-blur-[20px] transition-colors group-hover:bg-secondary/50">
                      <span>Project Details</span>
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>

        {/* See Full Portfolio Button */}
        <div
          className={`mt-16 flex justify-center opacity-0 [animation-delay:1100ms] ${isVisible ? "animate-fade-in-up" : ""}`}
        >
          <Link
            to={routes.projects}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border/30 bg-card/60 px-8 text-xs font-medium tracking-wide text-foreground uppercase backdrop-blur-[20px] transition-colors hover:bg-secondary/50 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span>See Full Portfolio</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
