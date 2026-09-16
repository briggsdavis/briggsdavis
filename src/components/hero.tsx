import { lazy, Suspense } from "react"
import { useHeroIntro } from "@/lib/hero-intro"

const Matrix = lazy(() => import("./matrix"))

const matrixColors = ["#e4eddd", "#657560", "#254a38"]

const Hero = () => {
  const playHeroIntro = useHeroIntro()

  return (
    <section className="relative min-h-svh overflow-hidden pt-24 pb-6">
      <div className="site-frame">
        <div
          aria-hidden="true"
          className="relative h-[clamp(20rem,56svh,36rem)] overflow-hidden bg-background md:h-[calc(100svh-16rem)] md:max-h-[60rem] md:min-h-[32rem]"
        >
          <div
            className={`hero-pattern absolute inset-0 ${playHeroIntro ? "hero-pattern-intro" : ""}`}
          >
            <Suspense fallback={null}>
              <Matrix
                back="transparent"
                colors={matrixColors}
                frequency={2.8}
                speed={2.2}
                cellSize={15}
                gamma={4.5}
                paletteBias={-1.8}
              />
            </Suspense>
          </div>
        </div>

        <p
          className={`max-w-2xl pt-7 text-left text-xl leading-snug font-bold tracking-wide text-foreground uppercase md:text-2xl ${
            playHeroIntro ? "hero-copy-intro" : ""
          }`}
        >
          We’re a small team building websites, apps, and custom software. Work directly with us,
          from the first conversation to launch.
        </p>
      </div>
    </section>
  )
}

export default Hero
