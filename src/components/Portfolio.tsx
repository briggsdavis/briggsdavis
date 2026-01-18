import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

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
    link: 'https://africagrowthaxis.com',
  },
];

const Portfolio = () => {
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

  const handleClick = (link: string | null) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

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

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.link)}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden opacity-0 ${
                isVisible ? 'animate-fade-in-up' : ''
              } ${item.link ? 'cursor-pointer' : 'cursor-default'}`}
              style={{
                animationDelay: `${500 + index * 100}ms`,
                animationFillMode: 'forwards',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-[2] group-hover:object-center"
              />
              {/* Overlay - appears on hover */}
              <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>
                {item.link && (
                  <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-foreground">
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
