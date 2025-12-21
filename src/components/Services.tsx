import { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: 'RESPONSIVE DESIGN',
    description: 'Websites that look perfect on every device, from desktop to mobile.',
  },
  {
    title: 'SEARCH ENGINE OPTIMIZATION',
    description: 'Improve your visibility and rank higher in search results.',
  },
  {
    title: 'RAPID DEVELOPMENT',
    description: 'Fast turnaround times without compromising quality.',
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group p-8 rounded-2xl bg-card border border-border/50 hover:border-border hover:bg-secondary/50 transition-all duration-500 cursor-pointer opacity-0 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{
                animationDelay: `${500 + index * 100}ms`,
                animationFillMode: 'forwards',
              }}
            >
              <h3 className="text-sm font-semibold text-foreground tracking-wide mb-4 group-hover:text-foreground transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
