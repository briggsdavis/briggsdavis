import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { routes } from "@/app/routes"

type ServiceChoice = "web" | "app"

const webTypes = ["Marketing sites", "Web applications", "Bookings", "CMS & business tools"]
const appTypes = ["Native iOS", "Native Android", "Connected backends", "Companion web apps"]

const ServicesPage = () => {
  const [introVisible, setIntroVisible] = useState(false)
  const [activeChoice, setActiveChoice] = useState<ServiceChoice | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = window.setTimeout(() => setIntroVisible(true), 60)
    return () => window.clearTimeout(timer)
  }, [])

  const webActive = activeChoice === "web"
  const appActive = activeChoice === "app"

  return (
    <main className="h-svh overflow-hidden">
      <div
        className={`flex h-full flex-col opacity-0 transition-opacity duration-700 md:flex-row ${introVisible ? "opacity-100" : ""}`}
        onMouseLeave={() => setActiveChoice(null)}
      >
        <Link
          to={routes.webDevelopment}
          onMouseEnter={() => setActiveChoice("web")}
          onFocus={() => setActiveChoice("web")}
          className={`group relative flex min-h-0 flex-1 items-center overflow-hidden border-b border-border/60 px-7 pt-24 transition-[flex,background-color] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 md:border-r md:border-b-0 md:px-[6vw] ${
            webActive ? "bg-white/65 md:flex-[1.08]" : appActive ? "md:flex-[0.92]" : "bg-white/30"
          }`}
        >
          <span className="pointer-events-none absolute right-4 bottom-[-0.18em] font-display text-9xl text-foreground/2.5 select-none md:right-8">
            01
          </span>
          <div className="relative z-10 w-full max-w-xl">
            <div className="mb-4 flex items-center justify-between md:mb-8">
              <span className="font-mono text-xs text-muted-foreground/60">01</span>
              <span className="font-eyebrow text-xs tracking-widest text-muted-foreground uppercase">
                Browser based
              </span>
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tighter text-foreground lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Web
              <span className="block text-muted-foreground italic">Development</span>
            </h1>
            <div
              className={`max-h-24 overflow-hidden opacity-100 transition-[max-height,opacity,margin] duration-500 md:max-h-0 md:opacity-0 ${webActive ? "mt-6 md:max-h-24 md:opacity-100" : "mt-4 md:mt-0"}`}
            >
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {webTypes.map((item) => (
                  <span key={item} className="text-xs text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-widest text-foreground uppercase md:mt-8">
              Explore Web
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        <Link
          to={routes.appDevelopment}
          onMouseEnter={() => setActiveChoice("app")}
          onFocus={() => setActiveChoice("app")}
          className={`group relative flex min-h-0 flex-1 items-center overflow-hidden px-7 transition-[flex,background-color] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 md:px-[6vw] md:pt-24 ${
            appActive ? "bg-white/65 md:flex-[1.08]" : webActive ? "md:flex-[0.92]" : "bg-white/30"
          }`}
        >
          <span className="pointer-events-none absolute right-4 bottom-[-0.18em] font-display text-9xl text-foreground/2.5 select-none md:right-8">
            02
          </span>
          <div className="relative z-10 w-full max-w-xl">
            <div className="mb-4 flex items-center justify-between md:mb-8">
              <span className="font-mono text-xs text-muted-foreground/60">02</span>
              <span className="font-eyebrow text-xs tracking-widest text-muted-foreground uppercase">
                Native mobile
              </span>
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tighter text-foreground lg:text-5xl xl:text-6xl 2xl:text-7xl">
              App
              <span className="block text-muted-foreground italic">Development</span>
            </h2>
            <div
              className={`max-h-24 overflow-hidden opacity-100 transition-[max-height,opacity,margin] duration-500 md:max-h-0 md:opacity-0 ${appActive ? "mt-6 md:max-h-24 md:opacity-100" : "mt-4 md:mt-0"}`}
            >
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {appTypes.map((item) => (
                  <span key={item} className="text-xs text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-widest text-foreground uppercase md:mt-8">
              Explore Apps
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </main>
  )
}

export default ServicesPage
