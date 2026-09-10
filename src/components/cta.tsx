import { useEffect, useRef, useState } from "react"

const CTA = () => {
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
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-12 text-center md:p-20">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent opacity-50" />

          {/* Content */}
          <div className="relative z-10">
            <h2
              className={`mb-6 text-4xl font-semibold text-foreground opacity-0 [animation-delay:100ms] md:text-5xl ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
            >
              Ready for deployment?
            </h2>
            <p
              className={`mx-auto mb-10 max-w-md text-lg text-muted-foreground opacity-0 [animation-delay:200ms] ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
            >
              Let&apos;s build a digital product that earns its place in your business, on the web,
              in your customers&apos; hands, or across both.
            </p>
            <div
              className={`opacity-0 [animation-delay:300ms] ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              <a
                href="https://calendly.com/ntedvs/website"
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
