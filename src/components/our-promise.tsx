import { useRef, useEffect, useState, useCallback } from "react"

const words = [
  "Responsive Interfaces",
  "Payment Integrations",
  "User Authentication",
  "Content Management",
  "API Development",
  "Admin Dashboards",
  "Technical SEO",
  "Performance Tuning",
  "Ongoing Support",
]

interface WordElement {
  container: HTMLDivElement
  wordEl: HTMLDivElement
  baseAngle: number
}

const getRadius = () => {
  if (window.innerWidth <= 640) return 100
  if (window.innerWidth <= 768) return 130
  if (window.innerWidth <= 1024) return 150
  return 180
}

const OurPromise = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const wordElementsRef = useRef<WordElement[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const updateWheel = useCallback(() => {
    const section = sectionRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const sectionHeight = section.offsetHeight
    const radius = getRadius()

    let progress = -rect.top / (sectionHeight - window.innerHeight)
    progress = Math.max(0, Math.min(1, progress))

    // One full rotation over the section scroll distance.
    const globalRotation = progress * Math.PI * 2

    wordElementsRef.current.forEach((item) => {
      const currentAngle = item.baseAngle + globalRotation
      const y = Math.sin(currentAngle) * radius
      const z = Math.cos(currentAngle) * radius
      const rotationDegrees = (currentAngle * 180) / Math.PI

      item.container.style.transform = `translate3d(0, ${y}px, ${z}px) rotateX(${-rotationDegrees}deg)`

      const normalizedZ = (z + radius) / (2 * radius)
      const finalScale = 0.75 + normalizedZ * 0.35
      item.wordEl.style.transform = `scale(${finalScale})`
      item.wordEl.style.opacity = String(0.15 + normalizedZ * 0.85)

      if (normalizedZ > 0.8) {
        item.wordEl.style.color = "hsl(var(--foreground))"
        item.wordEl.style.filter = "blur(0px)"
        item.wordEl.style.zIndex = "1000"
      } else if (normalizedZ > 0.3) {
        item.wordEl.style.color = "hsl(var(--muted-foreground))"
        item.wordEl.style.filter = `blur(${(0.8 - normalizedZ) * 4}px)`
        item.wordEl.style.zIndex = "500"
      } else {
        item.wordEl.style.color = "hsl(var(--muted-foreground) / 0.5)"
        item.wordEl.style.filter = `blur(${(1 - normalizedZ) * 6}px)`
        item.wordEl.style.zIndex = "10"
      }
    })
  }, [])

  useEffect(() => {
    const wheel = wheelRef.current
    if (!wheel) return

    wordElementsRef.current = Array.from(wheel.children, (container, index) => ({
      container: container as HTMLDivElement,
      wordEl: container.firstElementChild as HTMLDivElement,
      baseAngle: (index / words.length) * 2 * Math.PI,
    }))
    updateWheel()

    window.addEventListener("scroll", updateWheel, { passive: true })
    window.addEventListener("resize", updateWheel)

    return () => {
      window.removeEventListener("scroll", updateWheel)
      window.removeEventListener("resize", updateWheel)
    }
  }, [updateWheel])

  return (
    <section ref={sectionRef} id="promise" className="relative h-[300vh] w-full">
      <div className="sticky top-0 left-0 flex h-screen w-full items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h2 className="mb-6 text-4xl font-semibold text-foreground md:text-5xl">
                The Features Your Business Needs.
              </h2>
              <p className="max-w-md text-muted-foreground">
                We design and build websites with the features you need, from simple content updates
                and secure payments to custom tools that make everyday tasks easier for you and your
                customers.
              </p>
            </div>

            <div
              className={`relative flex h-[50vh] items-center justify-center opacity-0 [animation-delay:500ms] perspective-[2000px] lg:h-[60vh] ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
            >
              <div
                ref={wheelRef}
                className="pointer-events-none relative flex h-full w-full items-center justify-center will-change-transform transform-3d"
              >
                {words.map((word) => (
                  <div
                    key={word}
                    className="absolute flex w-full items-center justify-center transform-3d"
                  >
                    <div className="text-center font-sans text-xl font-medium tracking-wide whitespace-nowrap text-foreground uppercase transition-[color,filter] duration-300 ease-[ease] will-change-[transform,opacity] backface-hidden md:text-2xl lg:text-3xl xl:text-4xl">
                      {word}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurPromise
