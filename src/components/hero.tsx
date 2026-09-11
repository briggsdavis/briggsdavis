import Matrix from "./matrix"
import { useHeroIntro } from "@/lib/hero-intro"

const matrixColors = ["#e4eddd", "#657560", "#254a38"]

const Hero = () => {
  const playHeroIntro = useHeroIntro()

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-10 md:pt-32">
      <div className="site-frame">
        <div
          aria-hidden="true"
          className="relative h-[62svh] min-h-[28rem] overflow-hidden border border-foreground/10 bg-background md:h-[66svh]"
        >
          <div
            className={`hero-pattern absolute inset-0 ${playHeroIntro ? "hero-pattern-intro" : ""}`}
          >
            <Matrix
              back="transparent"
              colors={matrixColors}
              frequency={2.8}
              speed={2.2}
              cellSize={15}
              gamma={4.5}
              paletteBias={-1.8}
            />
          </div>
        </div>

        <p
          className={`max-w-md pt-8 text-left text-xl leading-snug font-bold tracking-wide text-foreground uppercase md:text-2xl ${
            playHeroIntro ? "hero-copy-intro" : ""
          }`}
        >
          We design and build websites, web applications, and mobile products that turn big ideas
          into useful digital experiences.
        </p>
      </div>
    </section>
  )
}

export default Hero
