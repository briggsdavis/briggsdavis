import { ArrowRight, Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Reveal } from "@/components/reveal"
import { ServiceVisual } from "@/components/service-visuals"
import { Button } from "@/components/ui/button"

const services = [
  {
    number: "01",
    visualKey: "geo",
    title: "Generative Engine Optimization",
    tagline: "Built for AI-assisted discovery.",
    description:
      "Structure content for AI-assisted discovery. We make brand and service information easier for AI systems to identify and cite across assistants, chatbots, and generative search platforms.",
    features: [
      "AI search optimization",
      "Structured content strategy",
      "Entity-based markup",
      "LLM-friendly architecture",
    ],
  },
  {
    number: "02",
    visualKey: "seo",
    title: "Search Engine Optimization",
    tagline: "Visibility that drives growth.",
    description:
      "Improve your visibility and rank higher in search results. We implement technical SEO, structured data, and performance optimization to help search engines crawl, understand, and index your site.",
    features: [
      "Technical SEO audits",
      "Structured data markup",
      "Performance optimization",
      "Analytics integration",
    ],
  },
  {
    number: "03",
    visualKey: "language",
    title: "Multi-Language Support",
    tagline: "Support every market's language.",
    description:
      "Support multiple languages and regional formats. We implement multilingual infrastructure that makes localized content straightforward to manage.",
    features: [
      "i18n frameworks",
      "RTL support",
      "Locale-aware formatting",
      "Translation management",
    ],
  },
  {
    number: "04",
    visualKey: "globe",
    title: "Global Client Experience",
    tagline: "Trusted across continents.",
    description:
      "We bring proven experience working with clients ranging from SMEs to multimillion-dollar enterprises across Europe, Africa, and the Americas. Our international perspective ensures solutions that resonate in any market.",
    features: [
      "Cross-continental delivery",
      "Enterprise-grade solutions",
      "SME to large-scale projects",
      "Culturally informed design",
    ],
  },
  {
    number: "05",
    visualKey: "cms",
    title: "Content Management Systems",
    tagline: "Your content, your control.",
    description:
      "Easy-to-use systems that let you manage your own content. We build intuitive admin interfaces so your team can update text, images, and pages without touching a line of code.",
    features: [
      "Intuitive admin panels",
      "Role-based access",
      "Media management",
      "Version history",
    ],
  },
  {
    number: "06",
    visualKey: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Security built into the foundation.",
    description:
      "We build secure websites using established security practices and provider-supported controls. Security considerations shape architecture, access, data handling, deployment, and ongoing maintenance.",
    features: [
      "Secure architecture",
      "Access controls",
      "Protected data handling",
      "Security updates",
    ],
  },
  {
    number: "07",
    visualKey: "visual-design",
    title: "Visually Engaging Design",
    tagline: "Beautiful, clear, and built for your brand.",
    description:
      "We create visually engaging websites with purposeful hierarchy, typography, imagery, and interaction. Every design is tailored to express your brand clearly and hold attention without getting in the way of the user.",
    features: [
      "Custom visual systems",
      "Typography and hierarchy",
      "Purposeful interaction",
      "Brand-aligned art direction",
    ],
  },
  {
    number: "08",
    visualKey: "mobile",
    title: "Mobile Friendly Design",
    tagline: "Responsive across common screen sizes.",
    description:
      "Websites that adapt to different screen sizes and are tested across current browsers and devices so users get a consistent experience wherever they visit.",
    features: [
      "Responsive layouts",
      "Touch-optimized interactions",
      "Cross-browser compatibility",
      "Retina-ready assets",
    ],
  },
  {
    number: "09",
    visualKey: "rapid",
    title: "Rapid Development",
    tagline: "Launch in days, not months.",
    description:
      "Launch your website in as fast as one week without compromising quality. Our streamlined development process and modern tooling allow us to deliver production-ready websites at unprecedented speed.",
    features: [
      "One-week delivery possible",
      "Agile methodology",
      "Modern tech stack",
      "Iterative feedback loops",
    ],
  },
  {
    number: "10",
    visualKey: "payments",
    title: "Facilitate Online Payments",
    tagline: "Payment flows using established providers.",
    description:
      "We build payment flows using established providers, from Stripe to local gateways, with provider-supported security controls.",
    features: [
      "Payment gateway integration",
      "Multi-currency support",
      "Subscription billing",
      "Invoice generation",
    ],
  },
  {
    number: "11",
    visualKey: "maintenance",
    title: "Ongoing Maintenance",
    tagline: "Monitoring, updates, and maintenance.",
    description:
      "We address security updates, backups, and performance issues to keep your website current and running smoothly.",
    features: ["Uptime monitoring", "Security updates", "Performance tuning", "Regular backups"],
  },
  {
    number: "12",
    visualKey: "unique",
    title: "Unique Solutions",
    tagline: "Tailored to your vision.",
    description:
      "Every website is tailored to fit your business, marketing, and operational needs. No templates. We architect custom solutions that solve your specific challenges.",
    features: [
      "Custom architecture",
      "Business-aligned design",
      "Scalable solutions",
      "API integrations",
    ],
  },
  {
    number: "13",
    visualKey: "performance",
    title: "Flawless Performance",
    tagline: "Speed is a feature.",
    description:
      "We optimize assets, loading behavior, caching, and delivery to improve website speed and responsiveness.",
    features: [
      "Performance targets",
      "CDN deployment",
      "Asset optimization",
      "Core Web Vitals testing",
    ],
  },
  {
    number: "14",
    visualKey: "client-input",
    title: "Client Input",
    tagline: "Your voice shapes every decision.",
    description:
      "Continuous development with rapid response times and dedicated consultation rounds. We keep you in the loop at every stage so the final product reflects your vision precisely.",
    features: [
      "Rapid response times",
      "Consultation rounds",
      "Continuous development",
      "Transparent process",
    ],
  },
]

const outcomes = [
  { label: "Stronger Brand Perception", note: "Sites that signal credibility and quality." },
  { label: "Increased Business", note: "Built to attract, convert, and retain." },
  {
    label: "Marketing & Ops Fit",
    note: "Tools aligned with your marketing and operational workflows.",
  },
  { label: "Global Reach", note: "Designed for diverse contexts and audiences." },
]

const contexts = [
  "Africa",
  "Europe",
  "Americas",
  "E-Commerce",
  "Real Estate",
  "Professional Services",
  "Healthcare",
  "Engineering",
  "Advisory",
  "SMEs",
  "Enterprise",
  "Hospitality",
  "Finance",
]

// Vertical gap between expertise items, in px. Must match the `mt-[...]` class
// on each item below; the scroll math reads it to size the hold/ease/buffer.
const ITEM_GAP = 224
// Scroll distance (px) where neither neighbouring panel is open — the buffer.
const DEAD_ZONE = 70
// Fraction of the open window spent fully open (hold) before the ease begins.
// Higher = stays fully expanded longer before it starts closing.
const HOLD_FRACTION = 0.45

const ServicesPage = () => {
  const [introVisible, setIntroVisible] = useState(false)
  // Per-service open amount (0 = collapsed, 1 = fully open), driven by scroll position.
  const [progresses, setProgresses] = useState<number[]>(() => services.map(() => 0))
  const headerRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const naturalHeights = useRef<number[]>([])
  // Scroll-derived targets vs. the eased values actually rendered. The displayed
  // values chase the targets over time so opening AND closing glide instead of
  // snapping to raw scroll position.
  const targetsRef = useRef<number[]>(services.map(() => 0))
  const displayedRef = useRef<number[]>(services.map(() => 0))
  const rafRef = useRef(0)
  const runningRef = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setIntroVisible(true), 60)
    return () => clearTimeout(timer)
  }, [])

  // Scroll-linked reveal: each service opens in proportion to how close its
  // header is to the vertical center of the viewport. A dead zone keeps a panel
  // fully closed until its header is well inside the center band, so the current
  // panel finishes collapsing before the next begins to open — one clear focus.
  // The rendered value is eased toward the scroll target each frame so both the
  // open and the close glide rather than snap.
  useEffect(() => {
    // Higher = snappier, lower = more gradual glide on open/close.
    const SMOOTHING = 0.08

    const computeTargets = () => {
      const screenCenter = window.innerHeight / 2
      // Collapsed header-to-header spacing (stride). The window of scroll in
      // which a panel can be open is the stride minus the dead zone, split
      // either side of center, so a real closed buffer sits between items.
      const headerHeight = headerRefs.current[0]?.offsetHeight ?? 120
      const stride = headerHeight + ITEM_GAP
      const influence = Math.max(40, (stride - DEAD_ZONE) / 2)
      const hold = influence * HOLD_FRACTION
      const ramp = influence - hold
      targetsRef.current = headerRefs.current.map((el, i) => {
        // Refresh natural height each frame so the px max-height is always exact.
        const content = contentRefs.current[i]
        if (content) naturalHeights.current[i] = content.scrollHeight
        if (!el) return 0
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const distance = Math.abs(center - screenCenter)
        if (distance <= hold) return 1
        if (distance >= hold + ramp) return 0
        const t = 1 - (distance - hold) / ramp
        return t * t * (3 - 2 * t) // smoothstep
      })
    }

    const tick = () => {
      const targets = targetsRef.current
      const displayed = displayedRef.current
      let settled = true
      const nextDisplayed = displayed.map((d, i) => {
        const target = targets[i] ?? 0
        const v = d + (target - d) * SMOOTHING
        if (Math.abs(target - v) > 0.0015) {
          settled = false
          return v
        }
        return target
      })
      displayedRef.current = nextDisplayed
      setProgresses(nextDisplayed)
      if (settled) {
        runningRef.current = false
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    const start = () => {
      if (!runningRef.current) {
        runningRef.current = true
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    const onScroll = () => {
      computeTargets()
      start()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    computeTargets()
    start()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(rafRef.current)
      runningRef.current = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Dynamic Intro Section ── */}
      <section className="overflow-hidden px-6 pt-32 pb-0">
        <div className="mx-auto max-w-6xl">
          {/* Overline */}
          <span
            className={`mb-16 block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 ${introVisible ? "animate-fade-in-up" : ""}`}
          >
            What We Build
          </span>

          {/* Editorial headline - two staggered lines */}
          <div className="mb-20">
            <div
              className={`opacity-0 [animation-delay:80ms] ${introVisible ? "animate-fade-in-up" : ""}`}
            >
              <p className="text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] font-semibold tracking-tight text-foreground">
                Unique solutions
              </p>
            </div>
            <div
              className={`opacity-0 [animation-delay:180ms] ${introVisible ? "animate-fade-in-up" : ""}`}
            >
              <p className="pl-[8%] font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-muted-foreground italic md:pl-[18%]">
                built to perform.
              </p>
            </div>
          </div>

          {/* Thin rule with side caption */}
          <div
            className={`mb-20 flex items-center gap-6 opacity-0 [animation-delay:280ms] ${introVisible ? "animate-fade-in-up" : ""}`}
          >
            <div className="h-px flex-1 bg-border" />
            <span className="shrink-0 font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
              Every market. Every context.
            </span>
          </div>

          {/* Two-column body */}
          <div className="grid items-start gap-12 md:grid-cols-[1fr_300px] md:gap-20">
            {/* Left: copy */}
            <div
              className={`opacity-0 [animation-delay:380ms] ${introVisible ? "animate-fade-in-up" : ""}`}
            >
              <p className="mb-6 text-2xl leading-relaxed font-light text-foreground">
                We craft digital experiences that function as{" "}
                <span className="font-display italic">marketing engines</span> and operational
                tools, not just websites.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Whether you're a professional services firm, a direct-to-consumer operator, or a
                growth-stage enterprise entering new markets, we build for your specific context:
                your customer, your industry, your business environment. No templates. No guesswork.
                Precision from brief to launch.
              </p>
            </div>

            {/* Right: outcomes */}
            <div
              className={`opacity-0 [animation-delay:480ms] ${introVisible ? "animate-fade-in-up" : ""}`}
            >
              <p className="mb-5 text-xs tracking-[0.22em] text-muted-foreground uppercase">
                What You Get
              </p>
              <div className="divide-y divide-border/50">
                {outcomes.map((item) => (
                  <div key={item.label} className="py-4 first:pt-0">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Marquee - full-bleed */}
        <div
          className={`mt-24 overflow-hidden border-t border-b border-border/40 py-4 opacity-0 [animation-delay:580ms] ${introVisible ? "animate-fade-in-up" : ""}`}
        >
          <div className="animate-marquee">
            {[
              ...contexts.map((ctx) => ({ ctx, copy: "a" })),
              ...contexts.map((ctx) => ({ ctx, copy: "b" })),
            ].map(({ ctx, copy }) => (
              <span
                key={`${copy}-${ctx}`}
                className="shrink-0 px-6 font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase"
              >
                {ctx}
                <span className="ml-6 text-border">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services List ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mb-12">
            <span className="mb-4 block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
              Capabilities
            </span>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              We make sites that are
            </h2>
          </Reveal>

          {services.map((service, index) => {
            const progress = progresses[index] ?? 0
            const isActive = progress > 0.5
            return (
              <Reveal
                key={service.number}
                className={`border-t border-border/30 ${index === 0 ? "" : "mt-56"}`}
              >
                <div
                  ref={(el) => {
                    headerRefs.current[index] = el
                  }}
                  className={`flex w-full items-center gap-6 py-8 text-left transition-[padding] duration-500 ease-out ${
                    isActive ? "pl-2" : ""
                  }`}
                >
                  <span className="w-8 shrink-0 text-sm font-light text-muted-foreground/40 tabular-nums">
                    {service.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-semibold text-foreground transition-colors duration-300 md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{service.tagline}</p>
                  </div>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out ${
                      isActive ? "rotate-45 border-foreground bg-foreground" : "border-border/50"
                    }`}
                  >
                    <Plus
                      className={`h-4 w-4 transition-colors duration-500 ${
                        isActive ? "text-background" : "text-foreground"
                      }`}
                    />
                  </div>
                </div>

                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: `${progress * (naturalHeights.current[index] ?? 0)}px`,
                    opacity: progress,
                  }}
                >
                  <div
                    ref={(el) => {
                      contentRefs.current[index] = el
                    }}
                    className="pr-8 pb-8 pl-14"
                  >
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      {/* Text */}
                      <div className="min-w-0">
                        <p className="mb-6 leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {service.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <span className="h-1 w-1 shrink-0 rounded-full bg-foreground" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Visual — half the dropdown width */}
                      <div className="hidden h-64 md:block">
                        <ServiceVisual visualKey={service.visualKey} isActive={progress > 0.05} />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
          <div className="border-t border-border/30" />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="h2" className="mb-6 text-3xl font-semibold text-foreground md:text-4xl">
            Ready to get started?
          </Reveal>
          <Reveal as="p" delay={100} className="mb-10 text-muted-foreground">
            See how we bring these services to life through our proven process.
          </Reveal>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="heroPrimary" size="hero" className="group" asChild>
              <Link to="/process">
                Our Process
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="hero" size="hero" asChild>
              <Link to="/projects">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ServicesPage
