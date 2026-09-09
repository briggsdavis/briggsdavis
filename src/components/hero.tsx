import { ArrowRight } from "lucide-react"
import { useHeroIntro } from "@/lib/hero-intro"

const heroIntroClass =
  "animate-hero-intro opacity-0 will-change-[opacity,filter,translate] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:blur-none motion-reduce:translate-y-0"

const scrollToPortfolio = () => {
  const element = document.querySelector("#portfolio")
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

const Hero = () => {
  const playIntro = useHeroIntro()

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
      {/* Badge */}
      <div
        className={`relative z-10 mb-8 opacity-0 ${
          playIntro
            ? `${heroIntroClass} [animation-delay:1430ms]`
            : "animate-fade-in-up [animation-delay:100ms]"
        }`}
      >
        <span className="inline-block rounded-full border border-border px-6 py-2 font-eyebrow text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Digital Architecture
        </span>
      </div>

      {/* Headline */}
      <h1
        className={`relative z-10 mb-6 text-center ${
          playIntro ? "" : "animate-fade-in-up opacity-0 [animation-delay:200ms]"
        }`}
      >
        <span
          className={`block text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-8xl ${
            playIntro ? `${heroIntroClass} [animation-delay:1510ms]` : ""
          }`}
        >
          Precision
        </span>
        <span
          className={`mt-2 block font-display text-5xl text-muted-foreground italic md:text-7xl lg:text-8xl ${
            playIntro ? `${heroIntroClass} [animation-delay:1590ms]` : ""
          }`}
        >
          in Design.
        </span>
      </h1>

      {/* Subheadline */}
      <p
        className={`relative z-10 mx-auto mb-12 max-w-xl text-center text-lg text-muted-foreground opacity-0 md:text-xl ${
          playIntro
            ? `${heroIntroClass} [animation-delay:1670ms]`
            : "animate-fade-in-up [animation-delay:300ms]"
        }`}
      >
        Custom websites that clarify your offer, support your operations, and make it easier for
        customers to take action.
      </p>

      {/* CTAs */}
      <div
        className={`relative z-10 flex flex-col items-center gap-4 opacity-0 sm:flex-row ${
          playIntro
            ? `${heroIntroClass} [animation-delay:1750ms]`
            : "animate-fade-in-up [animation-delay:400ms]"
        }`}
      >
        <a
          href="https://calendly.com/ntedvs/website"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-8 text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Book a Discovery Call
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        <button
          type="button"
          onClick={scrollToPortfolio}
          className="inline-flex h-12 items-center justify-center rounded-full border border-border/30 bg-card/60 px-8 text-xs font-medium tracking-widest text-foreground uppercase backdrop-blur-[20px] transition-colors hover:bg-secondary/50 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Our Work
        </button>
      </div>
    </section>
  )
}

export default Hero
