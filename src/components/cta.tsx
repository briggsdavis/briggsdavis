import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { routes } from "@/app/routes"
import ReactiveField from "@/components/reactive-field"

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting)
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
    <section ref={sectionRef} className="site-frame py-24 md:py-32">
      <div className="relative grid min-h-[34rem] overflow-hidden border-y border-black/10 md:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-between py-10 pr-8 md:col-span-7 md:py-16 md:pr-16">
          <p className="text-xs font-medium tracking-[0.18em] text-foreground/50 uppercase">
            Start something useful
          </p>
          <div className="mt-24 md:mt-32">
            <h2 className="max-w-2xl text-[clamp(3rem,6vw,6rem)] leading-[0.92] font-semibold tracking-[-0.055em]">
              Make the next move count.
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-foreground/65">
              Bring us the idea. We&apos;ll shape the product, build it properly, and get it into
              people&apos;s hands.
            </p>
            <div
              className={`mt-9 opacity-0 [animation-delay:300ms] ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              <Link to={routes.contact} className="button text-foreground">
                Start a project
              </Link>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={`relative min-h-80 transition-[opacity,filter,transform] duration-1000 md:col-span-5 md:min-h-full ${
            isVisible ? "blur-0 scale-100 opacity-100" : "scale-105 opacity-0 blur-xl"
          }`}
        >
          <ReactiveField mode="cta" active={isActive} />
        </div>
      </div>
    </section>
  )
}

export default CTA
