import { ArrowDown, ArrowRight, Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import CapabilityStaircase from "@/components/capability-staircase"
import Footer from "@/components/footer"
import { Reveal } from "@/components/reveal"
import { ServiceVisual } from "@/components/service-visuals"
import type { ServiceDetailConfig } from "@/data/service-types"
import { bookingUrl } from "@/data/site"

const scrollToServiceProcess = () => {
  document.querySelector("#service-process")?.scrollIntoView({ behavior: "smooth" })
}

const ServiceDetailPage = ({ config }: { config: ServiceDetailConfig }) => {
  const [introVisible, setIntroVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(true), 60)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const index = Number((visible.target as HTMLElement).dataset.processIndex)
        if (!Number.isNaN(index)) setActiveStep(index)
      },
      { rootMargin: "-28% 0px -42% 0px", threshold: [0.15, 0.4, 0.7] },
    )

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step)
    })
    return () => observer.disconnect()
  }, [config.steps])

  const selectStep = (index: number) => {
    setActiveStep(index)
    stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const currentStep = config.steps[activeStep] ?? config.steps[0]

  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-screen items-end overflow-hidden px-6 pt-36 pb-20 md:pb-24">
        <div className="absolute inset-x-6 top-28 z-20">
          <div className="mx-auto flex max-w-6xl justify-end">
            <Link
              to={config.relatedService.to}
              className={`group inline-flex items-center gap-2 border-b border-border/70 pb-2 font-eyebrow text-xs tracking-widest text-muted-foreground uppercase opacity-0 transition-colors [animation-delay:220ms] hover:text-foreground ${introVisible ? "animate-fade-in-up" : ""}`}
            >
              {config.relatedService.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-end gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
          <div>
            <p
              className={`mb-9 font-eyebrow text-xs font-medium tracking-widest text-muted-foreground uppercase opacity-0 ${introVisible ? "animate-fade-in-up" : ""}`}
            >
              {config.eyebrow}
            </p>
            <h1 className="max-w-5xl font-display text-4xl tracking-tighter text-foreground md:text-5xl lg:text-6xl xl:text-7xl">
              <span
                className={`block opacity-0 [animation-delay:80ms] ${introVisible ? "animate-fade-in-up" : ""}`}
              >
                {config.title}
              </span>
              <span
                className={`block pl-[7%] text-muted-foreground italic opacity-0 [animation-delay:160ms] ${introVisible ? "animate-fade-in-up" : ""}`}
              >
                {config.titleAccent}
              </span>
            </h1>
          </div>

          <div
            className={`border-l border-border/60 pl-6 opacity-0 [animation-delay:260ms] md:pl-8 ${introVisible ? "animate-fade-in-up" : ""}`}
          >
            <p className="mb-8 text-lg text-muted-foreground">{config.intro}</p>
            <div className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-7 text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={scrollToServiceProcess}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border/60 bg-white/60 px-7 text-xs font-medium tracking-widest text-foreground uppercase backdrop-blur-xl transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Our Process
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/40 bg-white/45 px-6 py-24 backdrop-blur-sm">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <p className="mb-5 font-eyebrow text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Built for more
            </p>
            <h2 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
              {config.promise}
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/50 sm:grid-cols-2">
            {config.capabilities.map((capability, index) => (
              <Reveal
                key={capability}
                delay={index * 55}
                className="flex min-h-24 items-center gap-4 bg-white/90 p-6"
              >
                <span className="font-mono text-xs text-muted-foreground/60 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium text-foreground">{capability}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {config.companion && (
        <section className="px-6 py-24">
          <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border/50 bg-black text-white">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-9 md:p-14">
                <p className="mb-6 font-eyebrow text-xs tracking-widest text-white/50 uppercase">
                  {config.companion.eyebrow}
                </p>
                <h2 className="mb-6 max-w-xl font-display text-4xl md:text-5xl">
                  {config.companion.title}
                </h2>
                <p className="mb-9 max-w-xl text-white/65">{config.companion.description}</p>
                <Link
                  to={config.companion.linkTo}
                  className="group inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase"
                >
                  {config.companion.linkLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="relative min-h-80 overflow-hidden border-t border-white/15 lg:border-t-0 lg:border-l">
                <div className="absolute top-1/2 left-[12%] h-44 w-24 -translate-y-1/2 rounded-[1.75rem] border border-white/30 bg-white/8 p-2 shadow-2xl">
                  <div className="h-full rounded-[1.3rem] border border-white/10 bg-white/8" />
                </div>
                <div className="absolute top-1/2 right-[10%] h-40 w-[58%] -translate-y-1/2 rounded-xl border border-white/25 bg-white/8 p-3 shadow-2xl">
                  <div className="flex h-full flex-col rounded-md border border-white/10 p-4">
                    <div className="mb-5 flex gap-1.5">
                      <span className="size-1.5 rounded-full bg-white/35" />
                      <span className="size-1.5 rounded-full bg-white/20" />
                      <span className="size-1.5 rounded-full bg-white/10" />
                    </div>
                    <div className="h-2 w-2/3 rounded-full bg-white/20" />
                    <div className="mt-3 h-12 rounded-md bg-white/8" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-[34%] h-px w-[18%] bg-white/30" />
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section id="service-process" className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-20 max-w-3xl">
            <p className="mb-5 font-eyebrow text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {config.processEyebrow}
            </p>
            <h2 className="mb-7 font-display text-4xl font-semibold text-foreground md:text-6xl">
              {config.processTitle}
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">{config.processIntro}</p>
          </Reveal>

          <div className="grid gap-14 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="mb-7 flex items-end justify-between">
                  <p className="font-eyebrow text-xs tracking-widest text-muted-foreground uppercase">
                    Active phase
                  </p>
                  <p className="font-mono text-xs text-muted-foreground/60">
                    {currentStep.number} / {String(config.steps.length).padStart(2, "0")}
                  </p>
                </div>
                <div className="h-80 overflow-hidden rounded-3xl border border-border/50 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
                  <ServiceVisual visualKey={currentStep.visualKey} isActive />
                </div>
                <div className="mt-7 grid gap-2">
                  {config.steps.map((step, index) => (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => selectStep(index)}
                      aria-current={activeStep === index ? "step" : undefined}
                      className={`flex items-center gap-4 border-l px-4 py-2.5 text-left transition-colors duration-300 ${
                        activeStep === index
                          ? "border-foreground text-foreground"
                          : "border-border/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="w-5 font-mono text-xs tabular-nums">{step.number}</span>
                      <span className="text-sm font-medium">{step.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {config.steps.map((step, index) => (
                <article
                  key={step.number}
                  ref={(element) => {
                    stepRefs.current[index] = element
                  }}
                  data-process-index={index}
                  className="flex min-h-[68vh] scroll-mt-32 items-center border-t border-border/50 py-16 first:border-t-0 lg:min-h-[78vh]"
                >
                  <div className="w-full">
                    <div className="mb-9 flex items-center justify-between gap-4">
                      <span className="font-mono text-sm text-muted-foreground/50">
                        {step.number}
                      </span>
                      <span className="font-eyebrow text-xs tracking-widest text-muted-foreground uppercase">
                        {step.label}
                      </span>
                    </div>
                    <div className="mb-9 h-64 overflow-hidden rounded-2xl border border-border/50 bg-white/70 p-3 lg:hidden">
                      <ServiceVisual visualKey={step.visualKey} isActive={activeStep === index} />
                    </div>
                    <h3 className="mb-6 font-display text-4xl font-semibold text-foreground md:text-5xl">
                      {step.title}
                    </h3>
                    <p className="mb-9 max-w-2xl text-lg text-muted-foreground">
                      {step.description}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {step.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-start gap-3 rounded-xl bg-white/55 p-4"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                          <p className="text-sm text-muted-foreground">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="service-capabilities"
        className="border-y border-border/40 bg-white/50 px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 font-eyebrow text-xs tracking-widest text-muted-foreground uppercase">
                {config.systemsLabel}
              </p>
              <h2 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
                Built around what the product needs.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Every scope is assembled around the product, its users, and the systems it needs to
              connect with.
            </p>
          </Reveal>
          {config.systemsLayout === "staircase" ? (
            <CapabilityStaircase items={config.systems} />
          ) : (
            <div className="flex flex-wrap gap-3">
              {config.systems.map((system, index) => (
                <Reveal
                  key={system}
                  delay={(index % 5) * 45}
                  className="rounded-full border border-border/60 bg-white/70 px-5 py-3 text-sm text-foreground"
                >
                  {system}
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-28">
        <Reveal className="mx-auto max-w-5xl rounded-3xl border border-border/50 bg-white/65 p-10 text-center shadow-sm backdrop-blur-xl md:p-20">
          <p className="mb-5 font-eyebrow text-xs tracking-widest text-muted-foreground uppercase">
            Start a conversation
          </p>
          <h2 className="mx-auto mb-6 max-w-3xl font-display text-4xl font-semibold text-foreground md:text-6xl">
            {config.ctaTitle}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">{config.ctaBody}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-8 text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-black/85"
            >
              {config.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              to="/projects"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border/60 bg-white/60 px-8 text-xs font-medium tracking-widest text-foreground uppercase transition-colors hover:bg-white"
            >
              View Our Work
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  )
}

export default ServiceDetailPage
