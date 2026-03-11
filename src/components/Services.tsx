import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'MOBILE FRIENDLY DESIGN',
    description: 'Websites that look perfect on every device, from desktop to mobile.',
  },
  {
    title: 'SEARCH ENGINE OPTIMIZATION',
    description: 'Improve your visibility and rank higher in search results.',
  },
  {
    title: 'RAPID DEVELOPMENT',
    description: 'Launch your website in as fast as one week without compromising quality.',
  },
  {
    title: 'CONTENT MANAGEMENT SYSTEMS',
    description: 'Easy-to-use systems that let you manage your own content.',
  },
  {
    title: 'ONGOING MAINTENANCE',
    description: 'Keep your website secure, updated, and running smoothly.',
  },
  {
    title: 'MULTI-LANGUAGE SUPPORT',
    description: 'Reach global audiences with professionally translated websites.',
  },
  {
    title: 'FACILITATE ONLINE PAYMENTS',
    description: 'Build secure e-commerce solutions that accept payments seamlessly.',
  },
  {
    title: 'UNIQUE SOLUTIONS',
    description: 'Every website is tailored to fit your business, marketing, and operational needs.',
  },
  {
    title: 'FLAWLESS PERFORMANCE',
    description: 'Lightning-fast loading times powered by high-quality, modern technology.',
  },
  {
    title: 'CLIENT INPUT',
    description: 'Continuous development through rapid response times and dedicated consultation rounds.',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span
            className={`block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-4 opacity-0 ${
              isVisible ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            Expertise
          </span>
          <h2
            className={`text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 ${
              isVisible ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Our Services
          </h2>
          <div
            className={`w-12 h-0.5 bg-muted-foreground mb-6 opacity-0 ${
              isVisible ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          />
          <p
            className={`text-muted-foreground max-w-md opacity-0 ${
              isVisible ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            High-end digital implementations crafted for stability and visual impact.
          </p>
        </div>

        {/* Services Grid - First Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
          {services.slice(0, 5).map((service, index) => (
            <div
              key={service.title}
              className={`group p-4 rounded-xl bg-card border border-border/50 hover:border-border hover:bg-secondary/50 transition-all duration-500 cursor-pointer opacity-0 hover:scale-110 hover:z-10 hover:shadow-xl hover:shadow-black/20 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{
                animationDelay: `${500 + index * 100}ms`,
                animationFillMode: 'forwards',
              }}
            >
              <h3 className="text-xs font-semibold text-foreground tracking-wide mb-2 group-hover:text-foreground transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Services Grid - Second Row (Centered) */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {services.slice(5).map((service, index) => (
              <div
                key={service.title}
                className={`group p-4 rounded-xl bg-card border border-border/50 hover:border-border hover:bg-secondary/50 transition-all duration-500 cursor-pointer opacity-0 hover:scale-110 hover:z-10 hover:shadow-xl hover:shadow-black/20 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{
                  animationDelay: `${500 + (index + 5) * 100}ms`,
                  animationFillMode: 'forwards',
                }}
              >
                <h3 className="text-xs font-semibold text-foreground tracking-wide mb-2 group-hover:text-foreground transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Services Button */}
        <div
          className={`mt-16 flex justify-center opacity-0 ${
            isVisible ? 'animate-fade-in-up' : ''
          }`}
          style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
        >
          <Button variant="nav" size="lg" className="glass glint" asChild>
            <Link to="/services">
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
