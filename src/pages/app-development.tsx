import { Link } from "react-router"
import { routes } from "@/app/routes"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

const AppDevelopmentPage = () => (
  <div className="min-h-screen">
    <header className="mx-auto grid min-h-[92svh] max-w-7xl items-center gap-16 px-6 pt-36 pb-20 md:grid-cols-12 md:pt-40">
      <div className="md:col-span-7">
        <h1 className="text-[clamp(4rem,8vw,8rem)] leading-[0.88] font-semibold tracking-[-0.07em] text-foreground">
          A place on the home screen is earned.
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
          We make mobile products with a reason to stay. Native, considered, and connected to the
          systems behind them.
        </p>
        <Link to={routes.contact} className="button mt-8">
          Build an app
        </Link>
      </div>

      <div className="flex justify-center md:col-span-4 md:col-start-9 md:justify-end">
        <div
          aria-hidden="true"
          className="relative aspect-[9/19] w-[min(72vw,19rem)] rounded-[3rem] border border-foreground/30 p-3"
        >
          <div className="flex h-full flex-col overflow-hidden rounded-[2.3rem] border border-border/60 bg-card p-6">
            <div className="mx-auto h-1.5 w-14 rounded-full bg-foreground/20" />
            <div className="flex flex-1 items-center justify-center">
              <span className="text-[clamp(5rem,12vw,8rem)] font-black tracking-[-0.1em] text-foreground">
                APP
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <span className="aspect-square rounded-full bg-foreground" />
              <span className="aspect-square rounded-full border border-border" />
              <span className="aspect-square rounded-full border border-border" />
              <span className="aspect-square rounded-full border border-border" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <section className="border-y border-border/60 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-5xl text-[clamp(3rem,6vw,6.5rem)] leading-[0.96] font-semibold tracking-[-0.06em] text-foreground">
          One product. Every layer.
        </h2>

        <div className="mt-20 grid border-t border-border/60 sm:grid-cols-2 lg:grid-cols-4">
          <article className="border-b border-border/60 py-7 sm:border-r lg:border-b-0 lg:px-6 lg:first:pl-0">
            <h3 className="text-xl font-semibold text-foreground">Product design</h3>
            <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
              Flows that make sense before a screen is drawn.
            </p>
          </article>
          <article className="border-b border-border/60 py-7 lg:border-r lg:border-b-0 lg:px-6">
            <h3 className="text-xl font-semibold text-foreground">iOS &amp; Android</h3>
            <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
              Native behavior, platform by platform.
            </p>
          </article>
          <article className="border-b border-border/60 py-7 sm:border-r lg:border-b-0 lg:px-6">
            <h3 className="text-xl font-semibold text-foreground">Backend systems</h3>
            <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
              Data, accounts, payments, notifications, and the logic between them.
            </p>
          </article>
          <article className="border-b border-border/60 py-7 lg:border-b-0 lg:pr-0 lg:pl-6">
            <h3 className="text-xl font-semibold text-foreground">Release &amp; support</h3>
            <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
              App stores handled. The next version already in view.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section className="px-6 py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <h2 className="col-span-6 text-4xl leading-tight font-semibold tracking-tight text-foreground md:text-6xl">
          Small screen. High standard.
        </h2>
        <div className="col-span-5 col-start-8 md:pt-3">
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Every tap has a cost. Every delay is felt. We refine the details until the product feels
            obvious in the hand.
          </p>
          <Link
            to={routes.webDevelopment}
            className="mt-8 inline-block text-sm font-medium text-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Looking for web development?
          </Link>
        </div>
      </div>
    </section>

    <CTA />
    <Footer />
  </div>
)

export default AppDevelopmentPage
