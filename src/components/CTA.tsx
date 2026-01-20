import { useEffect, useRef, useState } from 'react';

const CTA = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative p-12 md:p-20 rounded-3xl bg-card border border-border/50 text-center overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent opacity-50" />
          
          {/* Content */}
          <div className="relative z-10">
            <h2
              className={`text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              Ready for deployment?
            </h2>
            <p
              className={`text-muted-foreground text-lg max-w-md mx-auto mb-10 opacity-0 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              Initiate a strategic partnership today. Let's build the digital future of your enterprise.
            </p>
            <p
              className={`text-white font-bold text-2xl tracking-wide opacity-0 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              Contact Us
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
