import { useState } from "react"
import { Link } from "react-router-dom"
import { routes } from "@/app/routes"
import { Reveal } from "@/components/reveal"
// import { ServiceVisual } from "@/components/service-visuals"

type ServiceChoice = "web" | "app"

const serviceOptions = {
  web: {
    title: "Web Development",
    description:
      "Marketing sites, web applications, booking systems, content platforms, and digital tools built around the business.",
    href: routes.webDevelopment,
    cta: "Discover web development",
    visualKey: "cms" as const,
  },
  app: {
    title: "App Development",
    description:
      "Native iOS and Android products, connected backends, and companion web experiences delivered as one coherent system.",
    href: routes.appDevelopment,
    cta: "Discover app development",
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
            <h2 className="max-w-xl font-display text-2xl font-semibold text-foreground md:text-3xl">
              Two ways to build the right digital product.
            </h2>
          </div>
        </Reveal>

        <Reveal className="flex h-152 flex-col overflow-hidden border-y border-border/60 bg-white/25 md:h-120 md:flex-row">
          {(Object.keys(serviceOptions) as ServiceChoice[]).map((key, index) => {
            const service = serviceOptions[key]
            const active = activeService === key
            return (
              <div
                key={key}
                onMouseEnter={() => setActiveService(key)}
                onFocusCapture={() => setActiveService(key)}
                className={`group relative min-h-0 min-w-0 overflow-hidden transition-[flex-grow,background-color] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  active ? "flex-[1.45] bg-white/70" : "flex-[0.55] bg-transparent"
                } ${index === 0 ? "border-b border-border/60 md:border-r md:border-b-0" : ""}`}
              >
                <div className="relative z-10 flex h-full flex-col justify-end p-6 select-text md:p-8">
                  <h3 className="max-w-sm font-display text-3xl font-semibold text-foreground md:text-4xl">
                    <button
                      type="button"
                      onClick={() => setActiveService(key)}
                      aria-expanded={active}
                      className="text-left select-text focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      {service.title.split(" ")[0]}
                      <br />
                      Development
                    </button>
                  </h3>
                  <div
                    inert={!active}
                    aria-hidden={!active}
                    className={`grid [transition:grid-template-rows_800ms_cubic-bezier(0.22,1,0.36,1),opacity_400ms_ease] motion-reduce:transition-none ${
                      active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="mt-6 mb-5 max-w-md text-sm text-muted-foreground">
                        {service.description}
                      </p>
                      <Link
                        to={service.href}
                        className="inline-flex border-b border-foreground/40 pb-0.5 text-xs font-medium text-foreground"
                      >
                        {service.cta}
                      </Link>
                    </div>
                  </div>
                </div>

                {/*
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-[18%] right-[4%] hidden h-64 w-[44%] transition-[opacity,transform] duration-700 md:block ${
                    active ? "translate-x-0 opacity-45" : "translate-x-8 opacity-0"
                  }`}
                >
                  <ServiceVisual visualKey={service.visualKey} isActive={active} />
                </div>
                */}
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export default Services
