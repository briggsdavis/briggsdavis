import { Link } from "react-router"
import { routes } from "@/app/routes"
import Footer from "@/components/footer"

const ServicesPage = () => (
  <div className="min-h-screen">
    <header className="mx-auto max-w-7xl px-6 pt-40 pb-16 md:pt-48 md:pb-20">
      <h1 className="max-w-4xl text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.065em] text-foreground">
        Choose what you&apos;re building.
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:mt-10 md:ml-auto">
        From focused marketing sites to full mobile products, we design and build digital
        experiences around what your business actually needs.
      </p>
    </header>

    <section className="border-y border-border/60" aria-label="Development services">
      <div className="mx-auto grid max-w-screen-2xl md:grid-cols-2">
        <Link
          to={routes.webDevelopment}
          className="group relative isolate flex min-h-[28rem] overflow-hidden border-b border-border/60 p-6 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] md:min-h-[40rem] md:border-r md:border-b-0 md:p-10"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-[0.05em] -bottom-[0.2em] -z-10 text-[clamp(10rem,29vw,34rem)] leading-none font-black tracking-[-0.1em] text-[#254a38]/8 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-focus-visible:-translate-y-3 motion-reduce:transition-none"
          >
            WEB
          </span>

          <div className="flex w-full flex-col justify-between">
            <h2 className="max-w-sm text-4xl leading-tight font-semibold tracking-tight text-foreground md:text-5xl">
              Web Development
            </h2>

            <div>
              <p className="mb-8 max-w-md leading-relaxed text-muted-foreground">
                Websites, web applications, booking systems, content platforms, and digital tools
                built around your business.
              </p>
              <span className="text-sm font-medium text-foreground underline underline-offset-4">
                Explore web development
              </span>
            </div>
          </div>
        </Link>

        <Link
          to={routes.appDevelopment}
          className="group relative isolate flex min-h-[28rem] overflow-hidden p-6 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] md:min-h-[40rem] md:p-10"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-[0.05em] -bottom-[0.2em] -z-10 text-[clamp(10rem,29vw,34rem)] leading-none font-black tracking-[-0.1em] text-[#24434c]/8 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-focus-visible:-translate-y-3 motion-reduce:transition-none"
          >
            APP
          </span>

          <div className="flex w-full flex-col justify-between">
            <h2 className="max-w-sm text-4xl leading-tight font-semibold tracking-tight text-foreground md:text-5xl">
              App Development
            </h2>

            <div>
              <p className="mb-8 max-w-md leading-relaxed text-muted-foreground">
                Native mobile products, connected backends, and companion web experiences delivered
                as one coherent system.
              </p>
              <span className="text-sm font-medium text-foreground underline underline-offset-4">
                Explore app development
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>

    <section className="px-6 py-24 text-center md:py-32">
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Not sure which direction fits?
      </h2>
      <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">
        Some products belong on both web and mobile. Tell us what needs to work, and we&apos;ll help
        you find the right shape for it.
      </p>
      <Link to={routes.contact} className="button mt-8">
        Start a conversation
      </Link>
    </section>

    <Footer />
  </div>
)

export default ServicesPage
