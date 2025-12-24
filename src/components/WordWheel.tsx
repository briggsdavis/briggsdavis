import { useRef, useEffect, useCallback } from 'react';

const words = [
  "Scalable", "Creative", "Dynamic", "Reliable", "Intuitive",
  "Seamless", "Adaptive", "Strategic", "Polished", "Efficient"
];

interface WordElement {
  container: HTMLDivElement;
  wordEl: HTMLDivElement;
  baseAngle: number;
}

const WordWheel = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const wordElementsRef = useRef<WordElement[]>([]);

  const getRadius = useCallback(() => {
    if (typeof window === 'undefined') return 280;
    return window.innerWidth <= 768 ? 180 : 280;
  }, []);

  const updateWheel = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const radius = getRadius();

    // Calculate progress specifically within this section
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
    const radius = getRadius();

    words.forEach((word, index) => {
      const angle = (index / words.length) * 2 * Math.PI;
      const container = document.createElement('div');
      container.className = 'word-wrapper';
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
      wordEl.className = 'wheel-text';
      wordEl.style.cssText = `
        font-size: clamp(1.8rem, 5vw, 3.5rem);
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
  }, [getRadius, updateWheel]);

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
    <section
      ref={sectionRef}
      className="word-wheel-section relative w-full"
      style={{ height: '300vh' }}
    >
      <div
        className="word-wheel-viewport sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden pointer-events-none"
        style={{ perspective: '2000px' }}
      >
        <div
          ref={wheelRef}
          className="wheel-container relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        />
      </div>
    </section>
  );
};

export default WordWheel;
