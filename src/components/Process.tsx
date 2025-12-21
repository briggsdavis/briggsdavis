import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const processSteps = [
  {
    number: '01',
    title: 'Prototype',
    description:
      'We build a prototype based on your business profile and current online presence to give you a concrete vision of the possibilities.',
    image: '/images/process-1.jpg',
  },
  {
    number: '02',
    title: 'Initial Meeting',
    description:
      "We come to you in our meeting with a product ready to go and then find out your specific pain points, desires and needs for your website solution so we can fully understand your context.",
    image: '/images/process-2.jpg',
  },
  {
    number: '03',
    title: 'Implement',
    description:
      'We implement the changes, revisions or complete redesign of the initial prototype according to the information you provide in the meeting.',
    image: '/images/process-3.jpg',
  },
  {
    number: '04',
    title: 'Final Consultation',
    description:
      'We check in with you with the finished product to see if we have satisfied your requirements and get any last minute feedback from you to be able to perfect the website completely.',
    image: '/images/process-4.jpg',
  },
];

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % processSteps.length);
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentStep = processSteps[activeStep];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url(${currentStep.image})`,
            filter: 'grayscale(100%)',
          }}
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-32 pb-16">
        <div className="max-w-6xl mx-auto w-full">
          {/* Section Header */}
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

          {/* Process Step Content */}
          <div className="flex-1 flex flex-col justify-end">
            {/* Step Number */}
            <div
              key={`number-${activeStep}`}
              className="flex items-center gap-4 mb-6 animate-fade-in"
            >
              <span className="text-5xl md:text-6xl font-light text-muted-foreground/30">
                {currentStep.number}
              </span>
              <div className="w-16 h-0.5 bg-muted-foreground/30" />
            </div>

            {/* Step Title */}
            <h3
              key={`title-${activeStep}`}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-in-up"
            >
              {currentStep.title}
            </h3>

            {/* Step Description */}
            <p
              key={`desc-${activeStep}`}
              className="text-muted-foreground text-lg max-w-xl mb-10 animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              {currentStep.description}
            </p>

            {/* Navigation Button */}
            <div
              key={`btn-${activeStep}`}
              className="animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              {activeStep < processSteps.length - 1 ? (
                <Button
                  variant="process"
                  size="hero"
                  className="group"
                  onClick={nextStep}
                >
                  Go to Next Step
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              ) : (
                <Button
                  variant="process"
                  size="hero"
                  className="group"
                  onClick={scrollToContact}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex gap-2 mt-16">
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeStep
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

export default Process;
