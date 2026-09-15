import { Link } from "react-router"
import { routes } from "@/app/routes"
import { Reveal } from "@/components/reveal"

const services = [
  {
    title: "Web Development",
    href: routes.webDevelopment,
    detail: "Sites, platforms, commerce, booking, and digital tools.",
  },
  {
    title: "App Development",
    href: routes.appDevelopment,
    detail: "Mobile products, connected systems, and companion experiences.",
  },
]

const Services = () => (
  <section id="services" className="py-28">
    <Reveal className="site-frame border-t border-border/50">
      {services.map((service) => (
        <Link
          key={service.title}
          to={service.href}
          className="group grid min-h-44 items-end gap-6 border-b border-border/50 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 md:grid-cols-12 md:py-9"
        >
          <h2 className="text-[clamp(2.75rem,6vw,6rem)] leading-none font-semibold tracking-[-0.055em] text-foreground transition-transform duration-400 ease-out group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none md:col-span-8">
            <span className="relative inline-block pb-2 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
              {service.title}
            </span>
          </h2>
          <p className="translate-y-4 text-base leading-relaxed text-muted-foreground opacity-0 transition-[translate,opacity] duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none md:col-span-4">
            {service.detail}
          </p>
        </Link>
      ))}
    </Reveal>
  </section>
)

export default Services
