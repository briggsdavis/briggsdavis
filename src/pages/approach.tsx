import Footer from "@/components/footer"
import Signal from "@/components/signal"

const phases = [
  {
    number: "01",
    title: "Discovery",
    copy: "We begin with a discovery call to understand the idea, the people it needs to serve, and what success should look like. This gives the project a clear direction before design begins.",
  },
  {
    number: "02",
    title: "Prototype",
    copy: "We turn that direction into a working prototype early. You can see the structure, use the core flows, and react to something concrete rather than a long specification.",
  },
  {
    number: "03",
    title: "Revisions, fine-tuning & launch",
    copy: "We review the prototype together, gather your input, and work through focused revision rounds. Once every detail meets your specifications, we prepare, test, and launch the finished product.",
  },
]

const ApproachPage = () => (
  <div className="min-h-svh">
    <div className="px-4 pt-40 pb-8 sm:px-6 md:pt-48">
      <div className="mx-auto w-full max-w-[1200px]">
        <header className="mx-auto max-w-3xl px-2 text-center">
          <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Shape it together.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every project moves differently. The scope, pace, and number of revision rounds adapt to
            what we are making, but the collaboration follows a clear rhythm.
          </p>
        </header>
        <div className="mt-8 md:mt-12">
          <Signal />
        </div>
      </div>
    </div>

    <section className="border-y border-border/50" aria-label="Our process">
      <div className="site-frame">
        {phases.map((phase) => (
          <article
            key={phase.number}
            className="grid gap-5 border-b border-border/50 py-12 last:border-b-0 md:grid-cols-12 md:gap-10 md:py-16"
          >
            <p className="text-sm text-muted-foreground md:col-span-2">{phase.number}</p>
            <h2 className="text-3xl font-semibold tracking-tight md:col-span-4 md:text-4xl">
              {phase.title}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:col-span-6">
              {phase.copy}
            </p>
          </article>
        ))}
      </div>
    </section>

    <Footer />
  </div>
)

export default ApproachPage
