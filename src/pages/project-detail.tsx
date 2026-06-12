import { ExternalLink } from "lucide-react"
import { useRef, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"

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
        <div className="mb-16 animate-fade-in-up overflow-hidden rounded-2xl border border-border/30 opacity-0 delay-200">
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
        </div>

        {/* Title + description */}
        <div className="mb-16 flex animate-fade-in-up flex-col gap-8 opacity-0 delay-300 md:flex-row md:items-start md:justify-between">
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
        </div>

        {/* Problem / Solution / Business Value */}
        {(project.problem || project.solution || project.businessValue) && (
          <div className="mb-16 grid gap-8 border-t border-border/40 pt-16 md:grid-cols-3">
            {project.problem && (
              <div className="animate-fade-in-up opacity-0 delay-400">
                <SectionLabel>Problem</SectionLabel>
                <p className="text-sm leading-relaxed text-foreground/80">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="animate-fade-in-up opacity-0 delay-500">
                <SectionLabel>Solution</SectionLabel>
                <p className="text-sm leading-relaxed text-foreground/80">{project.solution}</p>
              </div>
            )}
            {project.businessValue && (
              <div className="animate-fade-in-up opacity-0 delay-[600ms]">
                <SectionLabel>Business Value</SectionLabel>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {project.businessValue}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Key Features */}
        <div className="border-t border-border/40 pt-16">
          <SectionLabel>Key Features</SectionLabel>
          <ul className="space-y-3">
            {project.features.map((feature, i) => (
              <li
                key={feature.title}
                tabIndex={0}
                className="group/feat animate-fade-in-up cursor-default rounded-xl border border-border/40 px-5 py-4 opacity-0 transition-colors duration-300 hover:border-border focus:outline-none focus-visible:border-border"
                style={{ animationDelay: `${700 + i * 80}ms` }}
              >
                <div className="flex items-start gap-3 text-sm font-medium text-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground transition-colors duration-300 group-hover/feat:bg-foreground" />
                  {feature.title}
                </div>
                <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-hover/feat:grid-rows-[1fr] group-focus-within/feat:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-2 pl-[18px] text-sm leading-relaxed text-muted-foreground">
                      {feature.detail}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProjectDetail
