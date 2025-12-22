import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Badge */}
      <div
        className={`relative z-10 mb-8 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
        style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
      >
        <span className="inline-block px-6 py-2 text-xs font-medium tracking-[0.3em] text-muted-foreground border border-border rounded-full uppercase">
          Digital Architecture
        </span>
      </div>

      {/* Headline */}
      <h1
        className={`relative z-10 text-center mb-6 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
        style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
      >
        <span className="block text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground tracking-tight">
          Precision
        </span>
        <span className="block text-5xl md:text-7xl lg:text-8xl font-display italic text-muted-foreground mt-2">
          in Design.
        </span>
      </h1>

      {/* Subheadline */}
      <p
        className={`relative z-10 text-center text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-12 opacity-0 ${
          isVisible ? 'animate-fade-in-up' : ''
        }`}
        style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
      >
        We transform complex problems into minimal digital artifacts.
        <br />
        High-fidelity development for modern enterprise.
      </p>

      {/* CTAs */}
      <div
        className={`relative z-10 flex flex-col sm:flex-row items-center gap-4 opacity-0 ${
          isVisible ? 'animate-fade-in-up' : ''
        }`}
        style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
      >
        <Button
          variant="heroPrimary"
          size="hero"
          className="group"
          onClick={() => scrollToSection('#contact')}
        >
          Start the Journey
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
        <Button
          variant="hero"
          size="hero"
          onClick={() => scrollToSection('#portfolio')}
        >
          Our Work
        </Button>
      </div>
    </section>
  );
};

export default Hero;
