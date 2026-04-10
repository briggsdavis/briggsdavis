import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';

const featuredIds = ['refenti', 'africa-growth-axis', 'hormone-vitality-coaching', 'nordic-seafood'];
const featuredProjects = featuredIds.map(id => projects.find(p => p.id === id)!).filter(Boolean);

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>(featuredProjects.map(() => 0.85));

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

  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const newScales = itemRefs.current.map((ref) => {
        if (!ref) return 0.88;
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const distance = Math.abs(center - screenCenter);
        const maxDistance = windowHeight * 0.6;
        // Smooth easing curve
        const raw = 1 - Math.min(distance / maxDistance, 1);
        const progress = raw * raw; // quadratic ease for snappier center focus
        // Scale from 0.88 to 1.05 - slight overshoot for magnifying feel
        return 0.88 + progress * 0.17;
      });
      setScales(newScales);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span
            className={`block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-4 opacity-0 ${
              isVisible ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            Case Studies
          </span>
          <h2
            className={`text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 ${
              isVisible ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Selected Work
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
            Real businesses that used a stronger online presence to elevate their brand and grow.
          </p>
        </div>

        {/* Featured Projects - Stacked */}
        <div className="flex flex-col gap-8">
          {featuredProjects.map((item, index) => (
            <div
              key={item.id}
              className={`opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{
                animationDelay: `${500 + index * 150}ms`,
                animationFillMode: 'forwards',
              }}
            >
              <Link to={`/project/${item.id}`} className="block">
                <div
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer will-change-transform"
                  style={{
                    transform: `scale(${scales[index]})`,
                    transition: 'transform 0.15s ease-out',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-[16/9] object-cover object-top"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/80 transition-all duration-500 flex flex-col justify-center items-center text-center p-8 opacity-0 group-hover:opacity-100">
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
                      {item.description}
                    </p>
                    <Button
                      variant="nav"
                      size="sm"
                      className="glass glint"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Project Details</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* See Full Portfolio Button */}
        <div
          className={`mt-16 flex justify-center opacity-0 ${
            isVisible ? 'animate-fade-in-up' : ''
          }`}
          style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}
        >
          <Button variant="nav" size="lg" className="glass glint" asChild>
            <Link to="/projects">
              <span>See Full Portfolio</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
