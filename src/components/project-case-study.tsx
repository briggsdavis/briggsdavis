import { ArrowRight, ExternalLink, Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import type { Project } from "@/data/projects"

const BOOKING_URL = "https://calendly.com/ntedvs/website"

const clamp = (value: number) => Math.min(1, Math.max(0, value))

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-4 block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
    {children}
  </span>
)

const useSequencedScroll = () => {
  const ref = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const desktop = window.matchMedia("(min-width: 1024px)")
    let target = 1
    let current = 1
    let frame = 0

    const animate = () => {
      const distance = target - current
      current = Math.abs(distance) < 0.001 ? target : current + distance * 0.13
      setProgress(current)

      if (current !== target) frame = window.requestAnimationFrame(animate)
      else frame = 0
    }

    const update = () => {
      if (!desktop.matches || reducedMotion.matches) {
        target = 1
      } else {
        const rect = element.getBoundingClientRect()
        target = clamp((window.innerHeight - rect.top) / (window.innerHeight * 0.85))
      }

      if (!frame) frame = window.requestAnimationFrame(animate)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    desktop.addEventListener("change", update)
    reducedMotion.addEventListener("change", update)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      desktop.removeEventListener("change", update)
      reducedMotion.removeEventListener("change", update)
    }
  }, [])

  return { ref, progress }
}

const ExpandingImage = ({
  src,
  alt,
  progress,
  className = "",
}: {
  src: string
  alt: string
  progress: number
  className?: string
}) => {
  const reveal = clamp(progress / 0.34)
  const expansion = clamp((progress - 0.34) / 0.66)
  const width = 35 + expansion * 65

  return (
    <div
      className={`aspect-[16/10] overflow-hidden ${className}`}
      style={{ width: `${width}%`, willChange: "width" }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{
          clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`,
          willChange: "clip-path",
        }}
      />
    </div>
  )
}

const FullWidthScrollImage = ({ src, alt }: { src: string; alt: string }) => {
  const { ref, progress } = useSequencedScroll()

  return (
    <>
      <section ref={ref} className="relative hidden aspect-[16/10] lg:block">
        <ExpandingImage src={src} alt={alt} progress={progress} />
      </section>
      <img src={src} alt={alt} className="aspect-[16/10] w-full object-cover lg:hidden" />
    </>
  )
}

const StickyStory = ({ project }: { project: Project }) => {
  const { ref, progress } = useSequencedScroll()
  const story = [
    { label: "Problem", copy: project.problem },
    { label: "Solution", copy: project.solution },
    { label: "Business Value", copy: project.businessValue },
  ].filter((item): item is { label: string; copy: string } => Boolean(item.copy))

  return (
    <>
      <section
        ref={ref}
        className="relative hidden grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:grid"
      >
        <div className="relative">
          <div className="sticky top-[12vh]">
            <ExpandingImage
              src={project.caseStudyImages[1]}
              alt={`${project.name} website detail`}
              progress={progress}
            />
          </div>
        </div>

        <div className="border-l border-border/40 px-6 lg:px-8">
          <div className="h-[20vh]" aria-hidden="true" />
          {story.map((item) => (
            <article
              key={item.label}
              className="flex min-h-[45vh] items-center border-t border-border/40"
            >
              <div className="py-10">
                <SectionLabel>{item.label}</SectionLabel>
                <p className="text-sm leading-relaxed text-foreground/80">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-12 lg:hidden">
        <img
          src={project.caseStudyImages[1]}
          alt={`${project.name} website detail`}
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="space-y-10">
          {story.map((item) => (
            <article key={item.label} className="border-t border-border/40 pt-8">
              <SectionLabel>{item.label}</SectionLabel>
              <p className="text-sm leading-relaxed text-foreground/80">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

const FeatureList = ({ project }: { project: Project }) => (
  <div>
    <SectionLabel>Key Features</SectionLabel>
    <div className="border-t border-border/40">
      {project.features.map((feature) => (
        <details key={feature.title} className="group border-b border-border/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm font-medium text-foreground/90 outline-none [&::-webkit-details-marker]:hidden">
            <span>{feature.title}</span>
            <Plus className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="max-w-xl pb-5 text-sm leading-relaxed text-muted-foreground">
            {feature.detail}
          </p>
        </details>
      ))}
    </div>
  </div>
)

const FeatureSection = ({ project }: { project: Project }) => {
  const { ref, progress } = useSequencedScroll()

  return (
    <section ref={ref} className="border-t border-border/40 pt-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <FeatureList project={project} />
        <div className="relative hidden lg:block">
          <ExpandingImage
            src={project.caseStudyImages[2]}
            alt={`${project.name} website feature`}
            progress={progress}
          />
        </div>
        <img
          src={project.caseStudyImages[2]}
          alt={`${project.name} website feature`}
          className="aspect-[16/10] w-full object-cover lg:hidden"
        />
      </div>
    </section>
  )
}

export const ProjectCaseStudy = ({
  project,
  isMorphTarget,
}: {
  project: Project
  isMorphTarget: boolean
}) => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
      <div
        className={`mb-16 overflow-hidden border border-border/30 ${
          isMorphTarget ? "opacity-100" : "animate-fade-in-up opacity-0"
        }`}
      >
        <img
          src={project.image}
          alt={project.name}
          data-project-morph-target={project.id}
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </div>

      <Reveal className="mb-20 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="mb-6 text-4xl font-semibold text-foreground md:text-5xl">
            {project.name}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.overview}
          </p>
        </div>

        <div className="shrink-0 md:pt-2">
          <Button variant="nav" size="lg" className="glass glint" asChild>
            <a href={project.link ?? undefined} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </Reveal>

      <FullWidthScrollImage
        src={project.caseStudyImages[0]}
        alt={`${project.name} website experience`}
      />

      <Reveal className="mx-auto mb-24 max-w-3xl border-t border-border/40 pt-16 lg:mb-40">
        <SectionLabel>The Website</SectionLabel>
        <p className="text-xl leading-relaxed text-foreground/85 md:text-2xl">
          {project.description}
        </p>
      </Reveal>

      <StickyStory project={project} />

      <div className="mt-24 lg:mt-40">
        <FeatureSection project={project} />
      </div>

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
    </main>

    <Footer />
  </div>
)
