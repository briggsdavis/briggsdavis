import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const portfolioItems = projects;

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const rows: typeof portfolioItems[] = [];
  for (let i = 0; i < portfolioItems.length; i += 2) {
    rows.push(portfolioItems.slice(i, i + 2));
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section
        ref={sectionRef}
        className="py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}>
            <Link to="/#portfolio">
              <Button variant="ghost" className="group text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Back
              </Button>
            </Link>
          </div>

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
              Full Portfolio
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
              Excellence across industries, focused on performance and aesthetics.
            </p>
          </div>

          {/* Portfolio Grid - 2 columns per row */}
          <div className="flex flex-col gap-4">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-4">
                {row.map((item, colIndex) => {
                  const isLeft = colIndex === 0;
                  const isHovered = hoveredId === item.id;
                  const siblingHovered = hoveredId !== null && hoveredId !== item.id && row.some(r => r.id === hoveredId);
                  
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`group relative rounded-2xl overflow-hidden opacity-0 transition-all duration-500 ease-out ${
                        isVisible ? 'animate-fade-in-up' : ''
                      }`}
                      style={{
                        animationDelay: `${500 + (rowIndex * 2 + colIndex) * 100}ms`,
                        animationFillMode: 'forwards',
                        flex: isHovered ? '1.8' : siblingHovered ? '0.6' : '1',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500"
                      />
                      <div 
                        className={`absolute inset-0 bg-background/90 transition-opacity duration-500 flex flex-col justify-center p-8 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        } ${isLeft ? 'items-start text-left' : 'items-end text-right'}`}
                      >
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {item.name}
                        </h3>
                        <p className={`text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm ${isLeft ? '' : 'ml-auto'}`}>
                          {item.description}
                        </p>
                        <Button
                          variant="nav"
                          size="sm"
                          className="glass glint"
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link to={`/project/${item.id}`}>
                            <span>Project Details</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Projects;
