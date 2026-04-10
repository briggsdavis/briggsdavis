import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProcessStepProps {
  step: {
    number: string;
    title: string;
    description: string;
    video?: string;
    image: string;
  };
  index: number;
  isLast: boolean;
  nextStepId: string;
}

const ProcessStep = ({ step, index, isLast, nextStepId }: ProcessStepProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToNext = () => {
    const element = document.querySelector(`#${nextStepId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id={`process-step-${index}`}
      ref={sectionRef}
      className="relative min-h-screen flex flex-col"
    >
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        {step.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={step.video} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{
              backgroundImage: `url(${step.image})`,
              filter: 'grayscale(100%)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-32 pb-16">
        <div className="max-w-6xl mx-auto w-full">
          {/* Section Header - Only on first step */}
          {index === 0 && (
            <div className="mb-24">
              <span
                className={`block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-4 opacity-0 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
              >
                Methodology
              </span>
              <h2
                className={`text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
              >
                The Evolution
              </h2>
              <div
                className={`w-12 h-0.5 bg-muted-foreground mb-6 opacity-0 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
              />
              <p
                className={`text-muted-foreground opacity-0 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
              >
                Our rigorous four-step development lifecycle.
              </p>
            </div>
          )}

          {/* Process Step Content */}
          <div className="flex-1 flex flex-col justify-end">
            {/* Step Number */}
            <div
              className={`flex items-center gap-4 mb-6 opacity-0 ${
                isVisible ? 'animate-fade-in' : ''
              }`}
              style={{ animationDelay: index === 0 ? '500ms' : '100ms', animationFillMode: 'forwards' }}
            >
              <span className="text-5xl md:text-6xl font-light text-muted-foreground/30">
                {step.number}
              </span>
              <div className="w-16 h-0.5 bg-muted-foreground/30" />
            </div>

            {/* Step Title */}
            <h3
              className={`text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 opacity-0 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: index === 0 ? '600ms' : '200ms', animationFillMode: 'forwards' }}
            >
              {step.title}
            </h3>

            {/* Step Description */}
            <p
              className={`text-muted-foreground text-lg max-w-xl mb-10 opacity-0 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: index === 0 ? '700ms' : '300ms', animationFillMode: 'forwards' }}
            >
              {step.description}
            </p>

            {/* Navigation Button */}
            <div
              className={`opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: index === 0 ? '800ms' : '400ms', animationFillMode: 'forwards' }}
            >
              {isLast ? (
                <Button variant="process" size="hero" className="group" asChild>
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <Button variant="process" size="hero" className="group" onClick={scrollToNext}>
                  Go to Next Step
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex gap-2 mt-16">
            {[0, 1, 2, 3].map((stepIndex) => (
              <button
                key={stepIndex}
                onClick={() => {
                  const element = document.querySelector(`#process-step-${stepIndex}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  stepIndex === index
                    ? 'bg-foreground w-8'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessStep;
