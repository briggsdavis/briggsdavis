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

      <div className="mx-auto max-w-5xl px-6 py-16 pt-32">
        {/* Hero media */}
        <div className="mb-12 animate-fade-in-up overflow-hidden rounded-2xl border border-border/30 opacity-0 delay-200">
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

        {/* Content */}
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="mb-6 animate-fade-in-up text-4xl font-semibold text-foreground opacity-0 delay-300 md:text-5xl">
              {project.name}
            </h1>
            <p className="mb-8 animate-fade-in-up text-lg leading-relaxed text-muted-foreground opacity-0 delay-400">
              {project.description}
            </p>

            {project.link && (
              <div className="animate-fade-in-up opacity-0 delay-500">
                <Button variant="nav" size="lg" className="glass glint" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-6 animate-fade-in-up text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 delay-400">
              Key Features
            </h3>
            <ul className="space-y-4">
              {project.features.map((feature, i) => (
                <li
                  key={feature}
                  className="flex animate-fade-in-up items-start gap-3 text-sm text-foreground/80 opacity-0"
                  style={{ animationDelay: `${500 + i * 100}ms` }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProjectDetail
