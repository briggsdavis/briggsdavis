import Matrix from "./matrix"

const matrixColors = ["#e4eddd", "#657560", "#254a38"]

const Hero = () => (
  <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[75svh] bg-background">
      <Matrix
        className="mask-b-from-80"
        back="transparent"
        colors={matrixColors}
        frequency={2.8}
        speed={2.2}
        cellSize={15}
        gamma={4.5}
        paletteBias={-1.8}
      />
    </div>

    <div className="absolute inset-x-6 top-[75svh] py-8">
      <p className="max-w-md text-justify text-xl leading-snug font-bold tracking-wide text-foreground uppercase md:text-2xl">
        We design and build websites, web applications, and mobile products that turn big ideas into
        useful digital experiences.
      </p>
    </div>
  </section>
)

export default Hero
