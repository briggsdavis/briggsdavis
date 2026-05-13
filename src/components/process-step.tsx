import { ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface ProcessStepProps {
  step: {
    number: string
    title: string
    description: string
    video?: string
    image: string
  }
  index: number
  isLast: boolean
  nextStepId: string
}

const scrollToStep = (event: React.MouseEvent<HTMLButtonElement>) => {
  const stepIndex = event.currentTarget.dataset.step
  const element = document.querySelector(`#process-step-${stepIndex}`)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

const ProcessStep = ({ step, index, isLast, nextStepId }: ProcessStepProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToNext = () => {
    const element = document.querySelector(`#${nextStepId}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id={`process-step-${index}`}
      ref={sectionRef}
      className="relative flex min-h-screen flex-col"
    >
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        {step.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={step.video} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center grayscale transition-opacity duration-700"
            style={{ backgroundImage: `url(${step.image})` }}
          />
        )}
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col px-6 pt-32 pb-16">
        <div className="mx-auto w-full max-w-6xl">
          {/* Section Header - Only on first step */}
          {index === 0 && (
            <div className="mb-24">
              <span
                className={`mb-4 block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase opacity-0 delay-100 ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
              >
                Methodology
              </span>
              <h2
                className={`mb-6 text-4xl font-semibold text-foreground opacity-0 delay-200 md:text-5xl ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
              >
                The Evolution
              </h2>
              <div
                className={`mb-6 h-0.5 w-12 bg-muted-foreground opacity-0 delay-300 ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
              />
              <p
                className={`text-muted-foreground opacity-0 delay-400 ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
              >
                Our rigorous four-step development lifecycle.
              </p>
            </div>
          )}

          {/* Process Step Content */}
          <div className="flex flex-1 flex-col justify-end">
            {/* Step Number */}
            <div
              className={`mb-6 flex items-center gap-4 opacity-0 ${
                index === 0 ? "delay-500" : "delay-100"
              } ${isVisible ? "animate-fade-in" : ""}`}
            >
              <span className="text-5xl font-light text-muted-foreground/30 md:text-6xl">
                {step.number}
              </span>
              <div className="h-0.5 w-16 bg-muted-foreground/30" />
            </div>

            {/* Step Title */}
            <h3
              className={`mb-6 text-4xl font-semibold text-foreground opacity-0 md:text-5xl lg:text-6xl ${
                index === 0 ? "delay-600" : "delay-200"
              } ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              {step.title}
            </h3>

            {/* Step Description */}
            <p
              className={`mb-10 max-w-xl text-lg text-muted-foreground opacity-0 ${
                index === 0 ? "[animation-delay:700ms]" : "delay-300"
              } ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              {step.description}
            </p>

            {/* Navigation Button */}
            <div
              className={`opacity-0 ${index === 0 ? "[animation-delay:800ms]" : "delay-400"} ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
            >
              {isLast ? (
                <Button variant="process" size="hero" className="group" asChild>
                  <a
                    href="https://calendly.com/ntedvs/website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              ) : (
                <Button variant="process" size="hero" className="group" onClick={scrollToNext}>
                  Go to Next Step
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Step Indicators */}
          <div className="mt-16 flex gap-2">
            {[0, 1, 2, 3].map((stepIndex) => (
              <button
                key={stepIndex}
                data-step={stepIndex}
                onClick={scrollToStep}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  stepIndex === index
                    ? "w-8 bg-foreground"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessStep
