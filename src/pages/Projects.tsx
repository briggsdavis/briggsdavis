import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { projects, Project } from '@/data/projects';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const ProjectRow = ({ project }: { project: Project }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!rowRef.current) return;
      const rect = rowRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const centerY = rect.top + rect.height / 2;

      // Reveal starts when the row's center enters the bottom of the viewport.
      // Reveal completes when the row's center reaches 42% from the top.
      const startPoint = viewportH;
      const endPoint = viewportH * 0.42;
      const p = Math.max(0, Math.min(1, (startPoint - centerY) / (startPoint - endPoint)));
      setProgress(p);
    };

    // If the element is already visible on page load, reveal it immediately.
    if (rowRef.current) {
      const rect = rowRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setProgress(1);
        // Still add scroll listener so partially-in-view items can continue animating
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Image: unravel left-to-right — right inset shrinks from 80% → 0%
  const clipRight = (1 - progress) * 80;

  // Text: blur 12px → 0px, opacity 0 → 1
  const textBlur = (1 - progress) * 12;
  const textOpacity = progress;

  return (
    <Link to={`/project/${project.id}`} className="block group">
      <div
        ref={rowRef}
        className="flex flex-col md:flex-row items-center min-h-[540px] border-b border-border py-16 gap-10 md:gap-16"
      >
        {/* Left: text — blur/opacity driven by scroll */}
        <div
          className="w-full md:flex-1 flex flex-col justify-between min-h-[320px] md:min-h-[400px]"
          style={{
            filter: `blur(${textBlur.toFixed(2)}px)`,
            opacity: textOpacity,
            willChange: 'filter, opacity',
          }}
        >
          <div>
            {/* Tags — white */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-8">
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="text-xs font-mono tracking-[0.22em] text-foreground uppercase"
                >
                  {tag}{i < project.tags.length - 1 ? ' &' : ''}
                </span>
              ))}
            </div>

            {/* Project name */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight">
              {project.name}
            </h2>
          </div>

          {/* Bottom: category + year */}
          <div className="mt-12">
            <div className="border-t border-border/60 pt-5 flex items-center justify-between">
              <span className="text-sm text-foreground/60 tracking-wide">
                {project.tags[0]}
              </span>
              <span className="text-sm tabular-nums text-foreground/60">
                {project.year}
              </span>
            </div>
          </div>
        </div>

        {/* Right: image — horizontal unravel left-to-right via clip-path */}
        <div className="w-full md:w-[48%] shrink-0">
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              clipPath: `inset(0 ${clipRight.toFixed(2)}% 0 0 round 1.25rem)`,
              willChange: 'clip-path',
            }}
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-[300px] md:h-[400px] object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Back */}
          <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
            <Link to="/#portfolio">
              <Button variant="ghost" className="group text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Back
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-20">
            <span
              className="block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              Case Studies
            </span>
            <h1
              className="text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              Full Portfolio
            </h1>
            <div
              className="w-12 h-0.5 bg-muted-foreground opacity-0 animate-fade-in-up"
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            />
          </div>

          {/* Rows */}
          <div>
            {projects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Projects;
