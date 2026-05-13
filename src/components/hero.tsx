import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
      {/* Video Background - oversized vertically to allow parallax without gaps */}
      <div
        className="absolute z-0 w-full will-change-transform"
        style={{
          top: "-15%",
          height: "130%",
          transform: `translateY(${scrollY * 0.35}px)`,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Badge */}
      <div
        className={`relative z-10 mb-8 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
        style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
      >
        <span className="inline-block rounded-full border border-border px-6 py-2 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
          Digital Architecture
        </span>
      </div>

      {/* Headline */}
      <h1
        className={`relative z-10 mb-6 text-center opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
        style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
      >
        <span className="block text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          Precision
        </span>
        <span className="mt-2 block font-display text-5xl text-muted-foreground italic md:text-7xl lg:text-8xl">
          in Design.
        </span>
      </h1>

      {/* Subheadline */}
      <p
        className={`relative z-10 mx-auto mb-12 max-w-xl text-center text-lg text-muted-foreground opacity-0 md:text-xl ${
          isVisible ? "animate-fade-in-up" : ""
        }`}
        style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
      >
        Precision websites that elevate your brand, justify your prices,
        <br />
        and grow your business.
      </p>

      {/* CTAs */}
      <div
        className={`relative z-10 flex flex-col items-center gap-4 opacity-0 sm:flex-row ${
          isVisible ? "animate-fade-in-up" : ""
        }`}
        style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
      >
        <Button
          variant="heroPrimary"
          size="hero"
          className="group"
          onClick={() => scrollToSection("#contact")}
        >
          Start the Journey
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
        <Button variant="hero" size="hero" onClick={() => scrollToSection("#portfolio")}>
          Our Work
        </Button>
      </div>
    </section>
  )
}

export default Hero
