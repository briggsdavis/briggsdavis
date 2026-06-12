import { ArrowRight, ExternalLink } from "lucide-react"
import { useRef, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"

const BOOKING_URL = "https://calendly.com/ntedvs/website"

const projectVideos: Record<string, string> = {
  oderum: "/videos/oderum.mp4",
  "anne-silver": "/videos/anne-silver.mp4",
  "ease-engineering": "/videos/ease-engineering.mp4",
  "africa-growth-axis": "/videos/africa-growth-axis.mp4",
  "hormone-vitality-coaching": "/videos/hormone-vitality-coaching.mp4",
  refenti: "/videos/refent.mp4",
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-3 block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
    {children}
  </span>
)

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projects.find((p) => p.id === projectId)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-semibold text-foreground">Project not found</h1>
          <Link to="/#portfolio">
            <Button variant="outline">Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    )
  }

  const videoSrc = projectVideos[project.id]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Hero media */}
        <Reveal className="mb-16 overflow-hidden rounded-2xl border border-border/30">
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full object-cover object-top"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
            />
          ) : (
            <img
              src={project.image}
              alt={project.name}
              className="w-full object-cover object-top"
            />
          )}
        </Reveal>

        {/* Title + description */}
        <Reveal className="mb-16 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="mb-6 text-4xl font-semibold text-foreground md:text-5xl">
              {project.name}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>

          {project.link && (
            <div className="shrink-0 md:pt-2">
              <Button variant="nav" size="lg" className="glass glint" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </Reveal>

        {/* Problem / Solution / Business Value */}
        {(project.problem || project.solution || project.businessValue) && (
          <div className="mb-16 grid gap-8 border-t border-border/40 pt-16 md:grid-cols-3">
            {project.problem && (
              <Reveal>
                <SectionLabel>Problem</SectionLabel>
                <p className="text-sm leading-relaxed text-foreground/80">{project.problem}</p>
              </Reveal>
            )}
            {project.solution && (
              <Reveal delay={80}>
                <SectionLabel>Solution</SectionLabel>
                <p className="text-sm leading-relaxed text-foreground/80">{project.solution}</p>
              </Reveal>
            )}
            {project.businessValue && (
              <Reveal delay={160}>
                <SectionLabel>Business Value</SectionLabel>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {project.businessValue}
                </p>
              </Reveal>
            )}
          </div>
        )}

        {/* Key Features */}
        <Reveal className="border-t border-border/40 pt-16">
          <SectionLabel>Key Features</SectionLabel>
          <ul className="border-t border-border/40">
            {project.features.map((feature) => (
              <li
                key={feature.title}
                tabIndex={0}
                className="group/feat cursor-default border-b border-border/40 py-5 focus:outline-none"
              >
                <div className="text-sm font-medium text-foreground/90 transition-colors duration-300 group-hover/feat:text-foreground">
                  {feature.title}
                </div>
                <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-hover/feat:grid-rows-[1fr] group-focus-within/feat:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.detail}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Closing CTA — book a free discovery call */}
        <Reveal className="mt-24 rounded-2xl border border-border/40 px-8 py-16 text-center">
          <SectionLabel>Let's talk</SectionLabel>
          <h2 className="mx-auto mb-4 max-w-xl text-3xl font-semibold text-foreground md:text-4xl">
            Ready to build something like this?
          </h2>
          <p className="mx-auto mb-10 max-w-md text-muted-foreground">
            Book a free discovery call and we'll map out how to bring your project to life.
          </p>
          <Button variant="heroPrimary" size="hero" className="group" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a Free Discovery Call
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
        </Reveal>
      </div>

      <Footer />
    </div>
  )
}

export default ProjectDetail
