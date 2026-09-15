import { useHeroIntro } from "@/lib/hero-intro"
import Matrix from "./matrix"

const matrixColors = ["#e4eddd", "#657560", "#254a38"]

const Hero = () => {
  const playHeroIntro = useHeroIntro()

  return (
    <section className="relative min-h-svh overflow-hidden pt-24 pb-6">
      <div className="site-frame">
        <div
          aria-hidden="true"
          className="relative h-[clamp(20rem,56svh,36rem)] overflow-hidden bg-background"
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
          className={`max-w-md pt-5 text-left text-xl leading-snug font-bold tracking-wide text-foreground uppercase md:text-2xl ${
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
