import { useRef, useEffect, useState, useCallback } from 'react';
import WordWheel from './WordWheel';

const OurPromise = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
      ref={sectionRef}
      id="promise"
      className="relative w-full bg-background"
      style={{ height: '300vh' }}
    >
      {/* Sticky content container */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div
              className={`space-y-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Our Promise
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                Excellence in Every Detail
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                We are committed to delivering exceptional digital experiences that exceed expectations. 
                Every project we undertake is crafted with precision, passion, and an unwavering dedication to quality.
              </p>
            </div>

            {/* Right side - Word Wheel */}
            <div
              className="relative h-[60vh] lg:h-[80vh] flex items-center justify-center"
              style={{ perspective: '2000px' }}
            >
              <WordWheelInline />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Inline word wheel that syncs with parent section scroll
const words = [
  "Scalable", "Creative", "Dynamic", "Reliable", "Intuitive",
  "Seamless", "Adaptive", "Strategic", "Polished", "Efficient"
];

interface WordElement {
  container: HTMLDivElement;
  wordEl: HTMLDivElement;
  baseAngle: number;
}

const WordWheelInline = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const wordElementsRef = useRef<WordElement[]>([]);

  const getRadius = useCallback(() => {
    if (typeof window === 'undefined') return 200;
    if (window.innerWidth <= 640) return 120;
    if (window.innerWidth <= 768) return 150;
    return 200;
  }, []);

  const updateWheel = useCallback(() => {
    const section = document.getElementById('promise');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const radius = getRadius();

    let progress = -rect.top / (sectionHeight - window.innerHeight);
    progress = Math.max(0, Math.min(1, progress));

    const globalRotation = progress * Math.PI * 10;

    wordElementsRef.current.forEach((item) => {
      const currentAngle = item.baseAngle + globalRotation;
      const y = Math.sin(currentAngle) * radius;
      const z = Math.cos(currentAngle) * radius;
      const rotationDegrees = (currentAngle * 180 / Math.PI);

      item.container.style.transform = `translate3d(0, ${y}px, ${z}px) rotateX(${-rotationDegrees}deg)`;

      const normalizedZ = (z + radius) / (2 * radius);
      const finalScale = 0.75 + (normalizedZ * 0.35);
      item.wordEl.style.transform = `scale(${finalScale})`;
      item.wordEl.style.opacity = String(0.15 + (normalizedZ * 0.85));

      if (normalizedZ > 0.8) {
        item.wordEl.style.color = 'hsl(var(--foreground))';
        item.wordEl.style.filter = 'blur(0px)';
        item.wordEl.style.zIndex = '1000';
      } else if (normalizedZ > 0.3) {
        item.wordEl.style.color = 'hsl(var(--muted-foreground))';
        item.wordEl.style.filter = `blur(${(0.8 - normalizedZ) * 4}px)`;
        item.wordEl.style.zIndex = '500';
      } else {
        item.wordEl.style.color = 'hsl(var(--muted-foreground) / 0.5)';
        item.wordEl.style.filter = `blur(${(1 - normalizedZ) * 6}px)`;
        item.wordEl.style.zIndex = '10';
      }
    });
  }, [getRadius]);

  const init = useCallback(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    wheel.innerHTML = '';
    wordElementsRef.current = [];

    words.forEach((word, index) => {
      const angle = (index / words.length) * 2 * Math.PI;
      const container = document.createElement('div');
      container.style.cssText = `
        position: absolute;
        transform-style: preserve-3d;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: auto;
        pointer-events: none;
      `;

      const wordEl = document.createElement('div');
      wordEl.style.cssText = `
        font-size: clamp(1.2rem, 3vw, 2.5rem);
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        white-space: nowrap;
        backface-visibility: visible;
        transition: color 0.3s ease, filter 0.3s ease;
        text-align: center;
        will-change: transform, opacity;
        color: hsl(var(--foreground));
      `;
      wordEl.textContent = word;

      container.appendChild(wordEl);
      wheel.appendChild(container);
      wordElementsRef.current.push({ container, wordEl, baseAngle: angle });
    });

    updateWheel();
  }, [updateWheel]);

  useEffect(() => {
    init();

    const handleScroll = () => requestAnimationFrame(updateWheel);
    const handleResize = () => init();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [init, updateWheel]);

  return (
    <div
      ref={wheelRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    />
  );
};

export default OurPromise;
