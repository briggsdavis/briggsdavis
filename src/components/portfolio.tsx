import { useEffect, useRef, useState, useCallback } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { projects } from "@/data/projects"

const featuredIds = ["refenti", "africa-growth-axis", "hormone-vitality-coaching", "nordic-seafood"]
const featuredProjects = featuredIds.map((id) => projects.find((p) => p.id === id)!).filter(Boolean)

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [scales, setScales] = useState<number[]>(featuredProjects.map(() => 0.85))

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

  return (
    <section id="portfolio" ref={sectionRef} className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-16">
          <span
            className={`mb-4 block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            Case Studies
          </span>
          <h2
            className={`mb-6 text-4xl font-semibold text-foreground opacity-0 md:text-5xl ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Selected Work
          </h2>
          <div
            className={`mb-6 h-0.5 w-12 bg-muted-foreground opacity-0 ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          />
          <p
            className={`max-w-md text-muted-foreground opacity-0 ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            Real businesses that used a stronger online presence to elevate their brand and grow.
          </p>
        </div>

        {/* Featured Projects - Stacked */}
        <div className="flex flex-col gap-8">
          {featuredProjects.map((item, index) => (
            <div
              key={item.id}
              className={`opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
              style={{
                animationDelay: `${500 + index * 150}ms`,
                animationFillMode: "forwards",
              }}
            >
              <Link to={`/project/${item.id}`} className="block">
                <div
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl will-change-transform"
                  style={{
                    transform: `scale(${scales[index]})`,
                    transition: "transform 0.15s ease-out",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-[16/9] w-full object-cover object-top"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/0 p-8 text-center opacity-0 transition-all duration-500 group-hover:bg-background/80 group-hover:opacity-100">
                    <h3 className="mb-3 text-2xl font-semibold text-foreground">{item.name}</h3>
                    <p className="mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <Button variant="nav" size="sm" className="glass glint">
                      <span>Project Details</span>
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* See Full Portfolio Button */}
        <div
          className={`mt-16 flex justify-center opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
          style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
        >
          <Button variant="nav" size="lg" className="glass glint" asChild>
            <Link to="/projects">
              <span>See Full Portfolio</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
