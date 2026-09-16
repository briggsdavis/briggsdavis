import { useCallback, useEffect, useRef, useState } from "react"
import type { MouseEvent } from "react"
import ApproachSelectedWork from "@/components/approach-selected-work"
import Footer from "@/components/footer"
import PhaseVisual from "@/components/phase-visual"
import Signal from "@/components/signal"

const phases = [
  {
    number: "01",
    title: "Discovery",
    visual: "discovery" as const,
    color: "#254a38",
    copy: "We begin with a discovery call to understand the idea, the people it needs to serve, and what success should look like. This gives the project a clear direction before design begins.",
  },
  {
    number: "02",
    title: "Prototype",
    visual: "prototype" as const,
    color: "#3f6250",
    copy: "We turn that direction into a working prototype early. You can see the structure, use the core flows, and react to something concrete rather than a long specification.",
  },
  {
    number: "03",
    title: "Revision",
    visual: "revision" as const,
    color: "#657560",
    copy: "You receive dedicated revision rounds to test, respond, and refine the work with us. We keep adjusting the details until you are happy with how the product looks, feels, and works.",
  },
  {
    number: "04",
    title: "Launch",
    visual: "launch" as const,
    color: "#406b63",
    copy: "Once every detail is approved, we prepare the finished product, test it across the right devices and environments, and launch it with a clear plan for what comes next.",
  },
]

const ApproachPage = () => {
  const [activePhase, setActivePhase] = useState(0)
  const processRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let frame = 0

    const updateActivePhase = () => {
      frame = 0
      const section = processRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(0.999, Math.max(0, -rect.top / travel))
      setActivePhase(Math.floor(progress * phases.length))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateActivePhase)
    }

    updateActivePhase()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const scrollToPhase = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.dataset.phaseIndex)
    const section = processRef.current
    if (!section) return
    const top = window.scrollY + section.getBoundingClientRect().top
    const travel = Math.max(section.offsetHeight - window.innerHeight, 1)
    window.scrollTo({
      top: top + travel * ((index + 0.2) / phases.length),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    })
  }, [])

  return (
    <div className="min-h-svh">
      <div className="px-4 pt-28 pb-3 sm:px-6 md:pt-32 md:pb-4">
        <div className="mx-auto w-full max-w-[1200px]">
          <header className="mx-auto max-w-3xl px-2 text-center">
            <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Shape it together.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Every project moves differently. The scope, pace, and number of revision rounds adapt
              to what we are making, but the collaboration follows a clear rhythm.
            </p>
          </header>
          <div className="mt-2 md:mt-4">
            <Signal />
          </div>
        </div>
      </div>

      <section
        ref={processRef}
        className="relative h-[400svh] border-y border-border/50"
        aria-label="Our process"
        data-no-text-reveal
      >
        <div className="sticky top-20 flex h-[calc(100svh-5rem)] items-center overflow-hidden bg-background">
          <div className="site-frame grid gap-8 py-8 md:grid-cols-12 md:gap-12 md:py-12">
            <div className="self-center md:col-span-5">
              {phases.map((phase, index) => {
                const active = activePhase === index
                return (
                  <article key={phase.number} className="border-b border-border/60 first:border-t">
                    <button
                      type="button"
                      data-phase-index={index}
                      onClick={scrollToPhase}
                      aria-expanded={active}
                      className="group flex w-full items-center gap-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 md:py-6"
                    >
                      <span className="w-7 shrink-0 text-xs text-muted-foreground">
                        {phase.number}
                      </span>
                      <h2
                        className={`text-[clamp(1.65rem,3vw,3rem)] leading-none font-semibold tracking-tight transition-colors duration-500 ${
                          active ? "text-foreground" : "text-muted-foreground/55"
                        }`}
                      >
                        {phase.title}
                      </h2>
                      <span
                        aria-hidden="true"
                        className={`ml-auto text-2xl font-light transition-transform duration-500 ${active ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-lg pr-8 pb-6 pl-12 leading-relaxed text-muted-foreground md:pb-8">
                          {phase.copy}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="relative aspect-[4/3] overflow-hidden md:col-span-7 md:aspect-auto md:h-[min(66svh,44rem)]">
              {phases.map((phase, index) => {
                const active = activePhase === index
                return (
                  <div
                    key={phase.number}
                    aria-hidden="true"
                    className={`absolute inset-0 overflow-hidden transition-[opacity,filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      active
                        ? "blur-0 pointer-events-auto scale-100 opacity-100"
                        : "pointer-events-none scale-[1.025] opacity-0 blur-xl"
                    }`}
                  >
                    <PhaseVisual variant={phase.visual} color={phase.color} active={active} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <ApproachSelectedWork />
      <Footer />
    </div>
  )
}

export default ApproachPage
