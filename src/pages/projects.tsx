import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { projects, Project } from "@/data/projects"

const ProjectRow = ({ project }: { project: Project }) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      if (!rowRef.current) return
      const rect = rowRef.current.getBoundingClientRect()
      const viewportH = window.innerHeight
      const centerY = rect.top + rect.height / 2

      // Reveal starts when the row's center enters the bottom of the viewport.
      // Reveal completes when the row's center reaches 42% from the top.
      const startPoint = viewportH
      const endPoint = viewportH * 0.42
      const p = Math.max(0, Math.min(1, (startPoint - centerY) / (startPoint - endPoint)))
      setProgress(p)
    }

    // If the element is already visible on page load, reveal it immediately.
    if (rowRef.current) {
      const rect = rowRef.current.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setProgress(1)
        // Still add scroll listener so partially-in-view items can continue animating
      }
    }

    window.addEventListener("scroll", updateProgress, { passive: true })
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  // Image: unravel left-to-right - right inset shrinks from 80% to 0%
  const clipRight = (1 - progress) * 80

  // Text: blur 12px → 0px, opacity 0 → 1
  const textBlur = (1 - progress) * 12
  const textOpacity = progress

  return (
    <Link to={`/project/${project.id}`} className="group block">
      <div
        ref={rowRef}
        className="flex min-h-[540px] flex-col items-center gap-10 border-b border-border py-16 md:flex-row md:gap-16"
      >
        {/* Left: text - blur/opacity driven by scroll */}
        <div
          className="flex min-h-[320px] w-full flex-col justify-between [will-change:filter,opacity] md:min-h-[400px] md:flex-1"
          style={{ filter: `blur(${textBlur.toFixed(2)}px)`, opacity: textOpacity }}
        >
          <div>
            {/* Tags - white */}
            <div className="mb-8 flex flex-wrap gap-x-4 gap-y-1">
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="font-mono text-xs tracking-[0.22em] text-foreground uppercase"
                >
                  {tag}
                  {i < project.tags.length - 1 ? " &" : ""}
                </span>
              ))}
            </div>

            {/* Project name */}
            <h2 className="text-5xl leading-tight font-semibold text-foreground md:text-6xl lg:text-7xl">
              {project.name}
            </h2>
          </div>

          {/* Bottom: category + year */}
          <div className="mt-12">
            <div className="flex items-center justify-between border-t border-border/60 pt-5">
              <span className="text-sm tracking-wide text-foreground/60">{project.tags[0]}</span>
              <span className="text-sm text-foreground/60 tabular-nums">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Right: image - horizontal unravel left-to-right via clip-path */}
        <div className="w-full shrink-0 md:w-[48%]">
          <div
            className="overflow-hidden rounded-2xl [will-change:clip-path]"
            style={{ clipPath: `inset(0 ${clipRight.toFixed(2)}% 0 0 round 1.25rem)` }}
          >
            <img
              src={project.image}
              alt={project.name}
              className="h-[300px] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] md:h-[400px]"
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="px-6 py-32">
        <div className="mx-auto max-w-6xl">
          {/* Back */}
          <div className="mb-8 animate-fade-in-up opacity-0">
            <Link to="/#portfolio">
              <Button variant="ghost" className="group text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-20">
            <span className="mb-4 block animate-fade-in-up text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 delay-100">
              Case Studies
            </span>
            <h1 className="mb-6 animate-fade-in-up text-4xl font-semibold text-foreground opacity-0 delay-200 md:text-5xl">
              Full Portfolio
            </h1>
            <div className="h-0.5 w-12 animate-fade-in-up bg-muted-foreground opacity-0 delay-300" />
          </div>

          {/* Rows */}
          <div>
            {projects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Projects
