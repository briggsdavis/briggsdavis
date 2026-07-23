import { ArrowRight, ArrowDown } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import { openProjectWithMorph } from "@/lib/project-transition"

const Projects = () => {
  const listRef = useRef<HTMLDivElement>(null)
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const [scales, setScales] = useState<number[]>(projects.map(() => 1))
  const rafRef = useRef<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const windowHeight = window.innerHeight
      const screenCenter = windowHeight / 2
      const newScales = imageRefs.current.map((ref) => {
        if (!ref) return 1
        const rect = ref.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const distance = Math.abs(center - screenCenter)
        const maxDistance = windowHeight * 0.6
        // 1 at viewport center, easing toward 0 at maxDistance
        const raw = 1 - Math.min(distance / maxDistance, 1)
        const progress = raw * raw // quadratic ease for a snappier center focus
        // Scale from 1.0 at the edges to 1.15 at the center.
        return 1 + progress * 0.15
      })
      setScales(newScales)
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const cards = listRef.current?.querySelectorAll<HTMLElement>("[data-project-card]")
    cards?.forEach((card, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSet((prev) => new Set(prev).add(i))
            observer.disconnect()
          }
        },
        { threshold: 0.1 },
      )
      observer.observe(card)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollToWork = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth" })
  }

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
    <div>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="font-eyebrow mb-8 animate-fade-in-up text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 delay-100">
          Case Studies
        </span>

        <h1 className="animate-fade-in-up opacity-0 delay-200">
          <span className="block text-6xl leading-[0.95] font-semibold tracking-tight text-foreground md:text-8xl lg:text-9xl">
            Portfolio
          </span>
          <span className="mt-3 block font-display text-5xl text-muted-foreground italic md:text-7xl lg:text-8xl">
            Our Curated Work
          </span>
        </h1>

        <p className="mx-auto mt-10 max-w-lg animate-fade-in-up text-lg text-muted-foreground opacity-0 delay-300">
          Precision-built digital experiences for businesses across real estate, e-commerce, health,
          engineering, and advisory sectors, spanning three continents.
        </p>

        <div className="mt-12 flex animate-fade-in-up flex-col items-center gap-6 opacity-0 delay-400">
          <div className="flex flex-wrap justify-center gap-3">
            {["Web Design", "E-Commerce", "Branding", "CMS", "Real Estate", "Advisory"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/40 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-muted-foreground/60 uppercase"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={scrollToWork}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 animate-fade-in-up flex-col items-center gap-2 text-muted-foreground/40 opacity-0 transition-colors duration-300 [animation-delay:900ms] hover:text-muted-foreground"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </button>
      </section>

      {/* ── Project list ── */}
      <div ref={listRef} className="mx-auto max-w-6xl px-6 pt-8 pb-32">
        <div className="flex flex-col gap-16">
          {projects.map((project, i) => (
            <div
              key={project.id}
              data-project-card
              className="opacity-0 transition-all duration-700 ease-out"
              style={
                visibleSet.has(i)
                  ? { opacity: 1, transform: "translateY(0)" }
                  : { opacity: 0, transform: "translateY(40px)" }
              }
            >
              <div className="grid items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
                {/* Left: title, tags, CTA */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 px-4 py-1.5 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-3xl leading-tight font-semibold text-foreground md:text-4xl">
                    {project.name}
                  </h2>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.shortDescription ?? project.description}
                  </p>

                  <Link
                    to={`/project/${project.id}`}
                    onClick={(event) => openProject(event, project.id, i)}
                  >
                    <Button variant="nav" size="lg" className="glass glint group w-fit">
                      <span>View Details</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                {/* Right: image */}
                <Link
                  to={`/project/${project.id}`}
                  onClick={(event) => openProject(event, project.id, i)}
                  className="block overflow-hidden transition-transform duration-150 ease-out will-change-transform"
                  style={{ transform: `scale(${scales[i] ?? 1})` }}
                >
                  <img
                    ref={(el) => {
                      imageRefs.current[i] = el
                    }}
                    src={project.image}
                    alt={project.name}
                    className="w-full transition-transform duration-500 hover:scale-105"
                  />
                </Link>
              </div>

              {i < projects.length - 1 && <div className="mt-16 h-px bg-border/30" />}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Projects
