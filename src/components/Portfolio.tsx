import { useEffect, useRef, useState } from 'react';

const portfolioItems = [
  { id: 1, image: '/images/portfolio-1.jpg', alt: 'Traditional architecture' },
  { id: 2, image: '/images/portfolio-2.jpg', alt: 'Modern building' },
  { id: 3, image: '/images/portfolio-3.jpg', alt: 'Beach pier' },
  { id: 4, image: '/images/portfolio-4.jpg', alt: 'Classic cars' },
  { id: 5, image: '/images/portfolio-5.jpg', alt: 'Countryside' },
  { id: 6, image: '/images/portfolio-6.jpg', alt: 'Industrial architecture' },
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
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer opacity-0 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{
                animationDelay: `${500 + index * 100}ms`,
                animationFillMode: 'forwards',
              }}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
