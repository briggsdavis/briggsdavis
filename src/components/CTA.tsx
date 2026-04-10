import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // Use universal link for mobile/tablet, web link for desktop
  const whatsappLink = isMobile
    ? 'https://wa.me/251944825058'
    : 'https://web.whatsapp.com/send?phone=251944825058';

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
              Let's build a website that works as hard as you do — one that elevates your brand,
              justifies your prices, and brings in more business.
            </p>
            <div
              className={`opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              <Button
                variant="cta"
                size="xl"
                className="group"
                asChild
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Contact Us
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
