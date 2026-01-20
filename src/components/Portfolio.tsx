import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const portfolioItems = [
  {
    id: 1,
    image: '/images/portfolio-oderum.png',
    name: 'Oderum',
    description: 'A minimalist fragrance platform featuring intuitive visual design and innovative rating methodologies for discerning scent enthusiasts.',
    link: 'https://oderum.com',
  },
  {
    id: 2,
    image: '/images/portfolio-2.jpg',
    name: 'Hormone Vitality Coaching',
    description: 'A wellness platform for a health coach, showcasing specialized services and expertise while expressing her unique personality through thoughtful visual design.',
    link: 'https://hormonevitalitycoaching.com',
  },
  {
    id: 3,
    image: '/images/portfolio-3.jpg',
    name: 'EASE Engineering',
    description: 'A professional showcase for a specialized engineering firm, highlighting services, capabilities, and portfolio across East African operations.',
    link: 'https://ease-int.com',
  },
  {
    id: 4,
    image: '/images/portfolio-annesilver.png',
    name: 'Anne Silver',
    description: 'A bespoke jewelry e-commerce platform featuring custom craft capabilities, curated collections, and an integrated CMS for seamless content management.',
    link: 'https://annesilver.com',
  },
  {
    id: 5,
    image: '/images/portfolio-5.jpg',
    name: 'Nordic Seafood',
    description: 'A specialized salmon delivery e-commerce platform for Addis Ababa, featuring customer and admin dashboards with order tracking and quality certification.',
    link: null,
  },
  {
    id: 6,
    image: '/images/portfolio-aga.png',
    name: 'Africa Growth Axis',
    description: 'A strategic advisory platform for international companies and investors entering African markets, featuring a comprehensive admin-managed content system.',
    link: 'https://aga-advisory.com/',
  },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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

  const handleClick = (link: string | null) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  // Split items into rows of 2
  const rows: typeof portfolioItems[] = [];
  for (let i = 0; i < portfolioItems.length; i += 2) {
    rows.push(portfolioItems.slice(i, i + 2));
  }

  return (
    <section
      id="portfolio"
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
                    onClick={() => handleClick(item.link)}
                    className={`group relative aspect-[4/3] rounded-2xl overflow-hidden opacity-0 transition-all duration-500 ease-out ${
                      isVisible ? 'animate-fade-in-up' : ''
                    } ${item.link ? 'cursor-pointer' : 'cursor-default'}`}
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
                    {/* Overlay - appears on hover */}
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
                      {item.link && (
                        <Button
                          variant="nav"
                          size="sm"
                          className="glass glint"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClick(item.link);
                          }}
                        >
                          <span>View Project</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
