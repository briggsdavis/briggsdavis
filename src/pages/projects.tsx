import { ArrowRight } from "lucide-react"
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

  return (
    <div className="bg-background">
      <Navbar />

      {/* Each project occupies 100vh of scroll distance */}
      <div ref={sectionRef} style={{ height: `${projects.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative h-full w-full">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24"
                style={{
                  opacity: opacities[i],
                  pointerEvents: opacities[i] > 0.5 ? "auto" : "none",
                }}
              >
                <div className="grid w-full items-center gap-12 pt-16 md:grid-cols-2 md:pt-20 lg:gap-24">
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

                    <h2 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl">
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

                  {/* Right: image */}
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="aspect-[4/3] w-full object-cover object-top"
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
