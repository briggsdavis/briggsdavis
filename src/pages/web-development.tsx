import { Link } from "react-router"
import { routes } from "@/app/routes"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

const WebDevelopmentPage = () => (
  <div className="min-h-screen">
    <header className="site-frame grid min-h-[88svh] content-between gap-16 pt-40 pb-16 md:grid-cols-12 md:pt-48 md:pb-20">
      <h1 className="col-span-10 text-[clamp(4rem,9vw,8.5rem)] leading-[0.86] font-semibold tracking-[-0.07em] text-foreground">
        The web should feel immediate.
      </h1>

      <div className="col-span-5 col-start-8 md:self-end">
        <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
          We design and build fast, exact websites and web applications. Clear to use. Easy to run.
          Ready to grow.
        </p>
        <Link to={routes.contact} className="button mt-8">
          Build for the web
        </Link>
      </div>
    </header>

    <section className="overflow-hidden border-y border-border/60 py-12 md:py-20">
      <p
        aria-hidden="true"
        className="text-center text-[clamp(7rem,25vw,24rem)] leading-[0.72] font-black tracking-[-0.09em] whitespace-nowrap text-foreground"
      >
        WEB
      </p>
    </section>

    <section className="site-frame py-28 md:py-40">
      <div className="grid gap-14 md:grid-cols-12">
        <h2 className="col-span-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          What we build.
        </h2>

        <div className="col-span-7 col-start-6 border-t border-border/60">
          <article className="grid gap-4 border-b border-border/60 py-8 sm:grid-cols-5">
            <h3 className="text-xl font-semibold text-foreground sm:col-span-2">Marketing sites</h3>
            <p className="leading-relaxed text-muted-foreground sm:col-span-3">
              Clear stories, quick pages, and content systems people will actually use.
            </p>
          </article>
          <article className="grid gap-4 border-b border-border/60 py-8 sm:grid-cols-5">
            <h3 className="text-xl font-semibold text-foreground sm:col-span-2">
              Web applications
            </h3>
            <p className="leading-relaxed text-muted-foreground sm:col-span-3">
              Complex work reduced to a precise, useful interface.
            </p>
          </article>
          <article className="grid gap-4 border-b border-border/60 py-8 sm:grid-cols-5">
            <h3 className="text-xl font-semibold text-foreground sm:col-span-2">
              Commerce &amp; booking
            </h3>
            <p className="leading-relaxed text-muted-foreground sm:col-span-3">
              Fewer steps between intent and action.
            </p>
          </article>
          <article className="grid gap-4 border-b border-border/60 py-8 sm:grid-cols-5">
            <h3 className="text-xl font-semibold text-foreground sm:col-span-2">Internal tools</h3>
            <p className="leading-relaxed text-muted-foreground sm:col-span-3">
              Purpose-built software for the work behind the work.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section className="border-y border-border/60 py-24 md:py-36">
      <div className="site-frame">
        <p className="max-w-5xl text-[clamp(2.75rem,6vw,6.5rem)] leading-[0.98] font-semibold tracking-[-0.055em] text-foreground">
          Fast is a feature. Clarity is infrastructure.
        </p>
        <p className="mt-8 max-w-md leading-relaxed text-muted-foreground md:ml-auto">
          Strategy, interface, engineering, launch, and support. One team throughout.
        </p>
      </div>
    </section>

    <CTA />
    <Footer />
  </div>
)

export default WebDevelopmentPage
