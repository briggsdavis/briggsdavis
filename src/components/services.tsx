import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { routes } from "@/app/routes"
import { Reveal } from "@/components/reveal"
import { ServiceVisual } from "@/components/service-visuals"

type ServiceChoice = "web" | "app"

const serviceOptions = {
  web: {
    number: "01",
    eyebrow: "Browser based",
    title: "Web Development",
    description:
      "Marketing sites, web applications, booking systems, content platforms, and digital tools built around the business.",
    capabilities: ["Websites", "Web apps", "CMS", "Business systems"],
    href: routes.webDevelopment,
    cta: "Discover Web Development",
    visualKey: "cms" as const,
  },
  app: {
    number: "02",
    eyebrow: "Native mobile",
    title: "App Development",
    description:
      "Native iOS and Android products, connected backends, and companion web experiences delivered as one coherent system.",
    capabilities: ["iOS", "Android", "Backends", "Companion web apps"],
    href: routes.appDevelopment,
    cta: "Discover App Development",
    visualKey: "mobile" as const,
  },
}

const Services = () => {
  const [activeService, setActiveService] = useState<ServiceChoice>("web")

  return (
    <section id="services" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-eyebrow text-[10px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Services
            </p>
            <h2 className="max-w-xl font-display text-2xl leading-tight font-semibold text-foreground md:text-3xl">
              Two ways to build the right digital product.
            </h2>
          </div>
          <Link
            to={routes.services}
            className="group inline-flex shrink-0 items-center gap-2 text-[10px] font-medium tracking-[0.2em] text-foreground uppercase"
          >
            Compare Services
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal className="flex h-[42rem] flex-col overflow-hidden border-y border-border/60 bg-white/25 md:h-[34rem] md:flex-row">
          {(Object.keys(serviceOptions) as ServiceChoice[]).map((key, index) => {
            const service = serviceOptions[key]
            const active = activeService === key
            return (
              <div
                key={key}
                onMouseEnter={() => setActiveService(key)}
                onFocusCapture={() => setActiveService(key)}
                className={`group relative min-h-0 overflow-hidden transition-[flex,background-color] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  active ? "flex-[1.45] bg-white/70" : "flex-[0.55] bg-transparent"
                } ${index === 0 ? "border-b border-border/60 md:border-r md:border-b-0" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveService(key)}
                  aria-expanded={active}
                  className="relative z-10 flex w-full items-center justify-between gap-6 px-6 pt-7 text-left md:px-8 md:pt-8"
                >
                  <span className="font-mono text-[10px] text-muted-foreground/50">
                    {service.number}
                  </span>
                  <span className="font-eyebrow text-[9px] tracking-[0.22em] text-muted-foreground uppercase">
                    {service.eyebrow}
                  </span>
                </button>

                <div className="relative z-10 flex h-[calc(100%-3.75rem)] flex-col justify-end p-6 md:p-8">
                  <h3 className="max-w-sm font-display text-3xl leading-none font-semibold text-foreground md:text-4xl">
                    {service.title}
                  </h3>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity,margin] duration-500 ${
                      active ? "mt-6 max-h-56 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="mb-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mb-7 flex flex-wrap gap-x-4 gap-y-2">
                      {service.capabilities.map((capability) => (
                        <span key={capability} className="text-xs text-muted-foreground">
                          {capability}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={service.href}
                      className="group/link inline-flex items-center gap-2 border-b border-foreground/40 pb-2 text-[10px] font-medium tracking-[0.18em] text-foreground uppercase"
                    >
                      {service.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-[18%] right-[4%] hidden h-64 w-[44%] transition-[opacity,transform] duration-700 md:block ${
                    active ? "translate-x-0 opacity-45" : "translate-x-8 opacity-0"
                  }`}
                >
                  <ServiceVisual visualKey={service.visualKey} isActive={active} />
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default Services
