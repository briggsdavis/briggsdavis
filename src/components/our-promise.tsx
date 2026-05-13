import { useRef, useEffect, useState, useCallback } from "react"

const words = [
  "Scalable",
  "Creative",
  "Dynamic",
  "Reliable",
  "Intuitive",
  "Seamless",
  "Adaptive",
  "Strategic",
  "Polished",
  "Efficient",
]

interface WordElement {
  container: HTMLDivElement
  wordEl: HTMLDivElement
  baseAngle: number
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

  const getRadius = useCallback(() => {
    if (typeof window === "undefined") return 180
    if (window.innerWidth <= 640) return 100
    if (window.innerWidth <= 768) return 130
    if (window.innerWidth <= 1024) return 150
    return 180
  }, [])

  const updateWheel = useCallback(() => {
    const section = sectionRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const sectionHeight = section.offsetHeight
    const radius = getRadius()

    let progress = -rect.top / (sectionHeight - window.innerHeight)
    progress = Math.max(0, Math.min(1, progress))

    // One full rotation (2 * PI)
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
  }, [getRadius])

  const init = useCallback(() => {
    const wheel = wheelRef.current
    if (!wheel) return

    wheel.innerHTML = ""
    wordElementsRef.current = []

    words.forEach((word, index) => {
      const angle = (index / words.length) * 2 * Math.PI
      const container = document.createElement("div")
      container.style.cssText = `
        position: absolute;
        transform-style: preserve-3d;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: auto;
        pointer-events: none;
      `

      const wordEl = document.createElement("div")
      wordEl.style.cssText = `
        font-size: clamp(1rem, 2.5vw, 1.75rem);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        white-space: nowrap;
        backface-visibility: visible;
        transition: color 0.3s ease, filter 0.3s ease;
        text-align: center;
        will-change: transform, opacity;
        color: hsl(var(--foreground));
        font-family: inherit;
      `
      wordEl.textContent = word

      container.appendChild(wordEl)
      wheel.appendChild(container)
      wordElementsRef.current.push({ container, wordEl, baseAngle: angle })
    })

    updateWheel()
  }, [updateWheel])

  useEffect(() => {
    init()

    const handleScroll = () => requestAnimationFrame(updateWheel)
    const handleResize = () => init()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [init, updateWheel])

  return (
    <section ref={sectionRef} id="promise" className="relative h-[200vh] w-full bg-background">
      {/* Sticky content container */}
      <div className="sticky top-0 left-0 flex h-screen w-full items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left side - Text content */}
            <div className="space-y-6">
              <span
                className={`mb-4 block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 delay-100 ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
              >
                Our Promise
              </span>
              <h2
                className={`mb-6 text-4xl font-semibold text-foreground opacity-0 delay-200 md:text-5xl ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
              >
                Your Website. A Business Asset.
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
                We build websites that establish authority, justify your prices, and actively grow
                your business. Trusted by clients from SMEs to global enterprises across three
                continents.
              </p>
            </div>

            {/* Right side - Word Wheel */}
            <div
              className={`relative flex h-[50vh] items-center justify-center opacity-0 delay-500 [perspective:2000px] lg:h-[60vh] ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
            >
              <div
                ref={wheelRef}
                className="relative flex h-full w-full items-center justify-center will-change-transform [transform-style:preserve-3d]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurPromise
