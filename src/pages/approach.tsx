import Signal from "@/components/signal"

const ApproachPage = () => (
  <div className="min-h-svh px-4 pt-40 pb-8 sm:px-6 md:pt-48">
    <div className="mx-auto w-full max-w-[1200px]">
      <header className="mx-auto max-w-3xl px-2 text-center">
        <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Give the idea shape.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          We start by understanding what needs to work. Then we design, build, and refine with you,
          turning the early questions into something people can use.
        </p>
      </header>
      <div className="mt-8 md:mt-12">
        <Signal />
      </div>
    </div>
  </div>
)

export default ApproachPage
