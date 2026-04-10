import { useEffect, useRef, useState } from 'react';
import nateAvatar from '@/assets/nathaniel-davis.jpg';
import maxAvatar from '@/assets/maxwell-briggs.png';

const founders = [
  {
    name: 'Maxwell Briggs',
    title: 'PRINCIPAL STRATEGIST',
    avatar: maxAvatar,
    skills: [
      'Marketing expert with proven KPI achievement',
      'Certified in Business Value Creation and SEO',
      'Scaled ventures across marketing channels',
      'Facilitated organizational communication',
      'Strategic website optimization expert',
    ],
  },
  {
    name: 'Nathaniel Davis',
    title: 'TECHNICAL ARCHITECT',
    avatar: nateAvatar,
    skills: [
      '10+ years of development experience',
      'Expert in TypeScript, Rust, and Python',
      'Built applications serving 30,000+ users',
      'Software developer for the U.S. Department of State',
      'Extensive freelance development portfolio',
    ],
  },
];

const About = () => {
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
      id="about"
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
            Founders
          </span>
          <h2
            className={`text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 ${
              isVisible ? 'animate-fade-in-up' : ''
            }`}
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Our Identity
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
            Business strategy and technical execution. Your website does more than look good. It works.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`group p-8 rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-500 opacity-0 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{
                animationDelay: `${500 + index * 150}ms`,
                animationFillMode: 'forwards',
              }}
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full overflow-hidden mb-6 transition-all duration-500">
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                {founder.name}
              </h3>
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground mb-6">
                {founder.title}
              </p>

              {/* Skills */}
              <ul className="space-y-3">
                {founder.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-1.5 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
