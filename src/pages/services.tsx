import { Link } from "react-router"
import { routes } from "@/app/routes"
import Footer from "@/components/footer"

const services = [
  {
    label: "Web Development",
    href: routes.webDevelopment,
    detail: "Websites, digital platforms, commerce, booking, and tools built to move quickly.",
  },
  {
    label: "App Development",
    href: routes.appDevelopment,
    detail: "Focused mobile products with the interfaces and systems needed to make them useful.",
  },
]

const ServicesPage = () => (
  <div className="min-h-screen">
    <section
      className="grid min-h-[calc(100svh-1px)] border-b border-border/50 pt-24 md:grid-cols-2"
      aria-label="Development services"
    >
      {services.map((service, index) => (
        <Link
          key={service.label}
          to={service.href}
          className={`group flex min-h-[calc(50svh-3rem)] flex-col justify-end overflow-hidden px-6 py-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] md:min-h-0 md:px-10 md:py-14 ${
            index === 0 ? "border-b border-border/50 md:border-r md:border-b-0" : ""
          }`}
        >
          <p className="mb-5 max-w-sm translate-y-5 text-base leading-relaxed text-muted-foreground opacity-0 transition-[transform,opacity] duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
            {service.detail}
          </p>
          <h1 className="text-[clamp(3rem,7vw,7.25rem)] leading-[0.88] font-semibold tracking-[-0.065em] text-foreground transition-transform duration-400 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transition-none">
            {service.label.split(" ")[0]}
            <br />
            Development
          </h1>
        </Link>
      ))}
    </section>
    <Footer />
  </div>
)

export default ServicesPage
