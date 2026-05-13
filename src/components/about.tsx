import { useEffect, useRef, useState } from "react"
import maxAvatar from "@/assets/maxwell-briggs.webp"
import nateAvatar from "@/assets/nathaniel-davis.jpg"

const founders = [
  {
    name: "Maxwell Briggs",
    title: "PRINCIPAL STRATEGIST",
    avatar: maxAvatar,
    skills: [
      "Marketing expert with proven KPI achievement",
      "Certified in Business Value Creation and SEO",
      "Scaled ventures across marketing channels",
      "Facilitated organizational communication",
      "Strategic website optimization expert",
    ],
  },
  {
    name: "Nathaniel Davis",
    title: "TECHNICAL ARCHITECT",
    avatar: nateAvatar,
    skills: [
      "10+ years of development experience",
      "Expert in TypeScript, Rust, and Python",
      "Built applications serving 30,000+ users",
      "Software developer for the U.S. Department of State",
      "Extensive freelance development portfolio",
    ],
  },
]

const About = () => {
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
    <section id="about" ref={sectionRef} className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16">
          <span
            className={`mb-4 block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 delay-100 ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Founders
          </span>
          <h2
            className={`mb-6 text-4xl font-semibold text-foreground opacity-0 delay-200 md:text-5xl ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Our Identity
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
            Business strategy and technical execution. Your website does more than look good. It
            works.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`group rounded-2xl border border-border/50 bg-card p-8 opacity-0 transition-all duration-500 hover:border-border ${
                index === 0 ? "[animation-delay:500ms]" : "[animation-delay:650ms]"
              } ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              {/* Avatar */}
              <div className="mb-6 h-16 w-16 overflow-hidden rounded-full transition-all duration-500">
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="mb-2 text-2xl font-semibold text-foreground">{founder.name}</h3>
              <p className="mb-6 text-xs font-medium tracking-[0.2em] text-muted-foreground">
                {founder.title}
              </p>

              {/* Skills */}
              <ul className="space-y-3">
                {founder.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
