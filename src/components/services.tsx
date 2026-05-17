import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const serviceDelayClasses = [
  "[animation-delay:500ms]",
  "[animation-delay:600ms]",
  "[animation-delay:700ms]",
  "[animation-delay:800ms]",
  "[animation-delay:900ms]",
  "[animation-delay:1000ms]",
  "[animation-delay:1100ms]",
  "[animation-delay:1200ms]",
  "[animation-delay:1300ms]",
  "[animation-delay:1400ms]",
]

const services = [
  {
    title: "MOBILE FRIENDLY DESIGN",
    description: "Websites that look perfect on every device, from desktop to mobile.",
  },
  {
    title: "SEARCH ENGINE OPTIMIZATION",
    description: "Improve your visibility and rank higher in search results.",
  },
  {
    title: "RAPID DEVELOPMENT",
    description: "Launch your website in as fast as one week without compromising quality.",
  },
  {
    title: "CONTENT MANAGEMENT SYSTEMS",
    description: "Easy-to-use systems that let you manage your own content.",
  },
  {
    title: "ONGOING MAINTENANCE",
    description: "Keep your website secure, updated, and running smoothly.",
  },
  {
    title: "MULTI-LANGUAGE SUPPORT",
    description: "Reach global audiences with professionally translated websites.",
  },
  {
    title: "FACILITATE ONLINE PAYMENTS",
    description: "Build secure e-commerce solutions that accept payments seamlessly.",
  },
  {
    title: "UNIQUE SOLUTIONS",
    description:
      "Every website is tailored to fit your business, marketing, and operational needs.",
  },
  {
    title: "FLAWLESS PERFORMANCE",
    description: "Lightning-fast loading times powered by high-quality, modern technology.",
  },
  {
    title: "CLIENT INPUT",
    description:
      "Continuous development through rapid response times and dedicated consultation rounds.",
  },
]

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16">
          <span
            className={`mb-4 block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 delay-100 ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Expertise
          </span>
          <h2
            className={`mb-6 text-4xl font-semibold text-foreground opacity-0 delay-200 md:text-5xl ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Our Expertise
          </h2>
          <div
            className={`mb-6 h-0.5 w-12 bg-muted-foreground opacity-0 delay-300 ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          />
          <p
            className={`max-w-md text-muted-foreground opacity-0 delay-400 ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Websites built to grow your business, crafted to attract clients, communicate your
            value, and convert.
          </p>
        </div>

        {/* Services Grid - First Row */}
        <div className="mb-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {services.slice(0, 5).map((service, index) => (
            <div
              key={service.title}
              className={`group cursor-pointer rounded-xl border border-border/50 bg-card p-4 opacity-0 transition-all duration-500 hover:z-10 hover:scale-110 hover:border-border hover:bg-secondary/50 hover:shadow-xl hover:shadow-black/20 ${serviceDelayClasses[index]} ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
            >
              <h3 className="mb-2 text-xs font-semibold tracking-wide text-foreground transition-colors duration-300 group-hover:text-foreground">
                {service.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Services Grid - Second Row (Centered) */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {services.slice(5).map((service, index) => (
              <div
                key={service.title}
                className={`group cursor-pointer rounded-xl border border-border/50 bg-card p-4 opacity-0 transition-all duration-500 hover:z-10 hover:scale-110 hover:border-border hover:bg-secondary/50 hover:shadow-xl hover:shadow-black/20 ${serviceDelayClasses[index + 5]} ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
              >
                <h3 className="mb-2 text-xs font-semibold tracking-wide text-foreground transition-colors duration-300 group-hover:text-foreground">
                  {service.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Services Button */}
        <div
          className={`mt-16 flex justify-center opacity-0 [animation-delay:1500ms] ${isVisible ? "animate-fade-in-up" : ""}`}
        >
          <Button variant="nav" size="lg" className="glass glint" asChild>
            <Link to="/services">
              <span>Explore Our Expertise</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Services
