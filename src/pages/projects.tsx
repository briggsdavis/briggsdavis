import { ArrowRight, ArrowDown } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"

const FADE_ZONE = 0.22

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [opacities, setOpacities] = useState<number[]>(
    projects.map((_, i) => (i === 0 ? 1 : 0)),
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const scrolled = Math.max(0, -rect.top)
    const vh = window.innerHeight
    const maxScroll = (projects.length - 1) * vh
    const clamped = Math.min(scrolled, maxScroll)

    const rawIndex = clamped / vh
    const currentSlot = Math.floor(rawIndex)
    const slotProgress = rawIndex - currentSlot

    const newOpacities = projects.map((_, i) => {
      if (i === currentSlot) {
        if (slotProgress > 1 - FADE_ZONE) {
          return 1 - (slotProgress - (1 - FADE_ZONE)) / FADE_ZONE
        }
        return 1
      }
      if (i === currentSlot + 1) {
        if (slotProgress > 1 - FADE_ZONE) {
          return (slotProgress - (1 - FADE_ZONE)) / FADE_ZONE
        }
        return 0
      }
      return 0
    })

    setOpacities(newOpacities)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToWork = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="mb-8 animate-fade-in-up text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 delay-100">
          Case Studies
        </span>

        <h1 className="animate-fade-in-up opacity-0 delay-200">
          <span className="block text-6xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-8xl lg:text-9xl">
            Portfolio
          </span>
          <span className="mt-3 block font-display text-5xl italic text-muted-foreground md:text-7xl lg:text-8xl">
            Our Curated Work
          </span>
        </h1>

        <p className="mx-auto mt-10 max-w-lg animate-fade-in-up text-lg text-muted-foreground opacity-0 delay-300">
          Precision-built digital experiences for businesses across real estate, e-commerce, health, engineering, and advisory sectors, spanning three continents.
        </p>

        <div className="mt-12 flex animate-fade-in-up flex-col items-center gap-6 opacity-0 delay-400">
          <div className="flex flex-wrap justify-center gap-3">
            {["Web Design", "E-Commerce", "Branding", "CMS", "Real Estate", "Advisory"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/40 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-muted-foreground/60 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={scrollToWork}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40 transition-colors duration-300 hover:text-muted-foreground animate-fade-in-up opacity-0 [animation-delay:900ms]"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </button>
      </section>

      {/* ── Sticky project scroll ── */}
      <div ref={sectionRef} style={{ height: `${projects.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative h-full w-full">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="absolute inset-0 flex items-center px-8 md:px-12 lg:px-20"
                style={{
                  opacity: opacities[i],
                  pointerEvents: opacities[i] > 0.5 ? "auto" : "none",
                }}
              >
                <div className="grid w-full items-center gap-10 pt-16 md:grid-cols-[2fr_3fr] md:pt-20 lg:gap-16">
                  {/* Left: title, tags, CTA */}
                  <div className="flex flex-col gap-6 md:gap-8">
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

                    <h2 className="text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl xl:text-6xl">
                      {project.name}
                    </h2>

                    <Link
                      to={`/project/${project.id}`}
                      tabIndex={opacities[i] > 0.5 ? 0 : -1}
                    >
                      <Button variant="nav" size="lg" className="glass glint group w-fit">
                        <span>View Details</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>

                  {/* Right: image — 3fr column makes it ~60% wider than before */}
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Projects
