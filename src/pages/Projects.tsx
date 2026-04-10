import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { projects, Project } from '@/data/projects';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const [revealed, setRevealed] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.15 }
    );
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Link to={`/project/${project.id}`} className="block group">
      <div
        ref={rowRef}
        className="flex flex-col md:flex-row items-center min-h-[540px] border-b border-border py-16 gap-10 md:gap-16"
      >
        {/* Left: project info */}
        <div className="w-full md:flex-1 flex flex-col justify-between min-h-[320px] md:min-h-[400px]">
          {/* Tags */}
          <div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-8">
              {project.tags.map((tag, i) => (
                <span key={tag} className="text-xs font-mono tracking-[0.22em] text-red-500 uppercase">
                  {tag}{i < project.tags.length - 1 ? ' &' : ''}
                </span>
              ))}
            </div>

            {/* Project name */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight group-hover:text-muted-foreground transition-colors duration-500">
              {project.name}
            </h2>
          </div>

          {/* Bottom row: divider + year */}
          <div className="mt-12">
            <div className="border-t border-border/60 pt-5 flex items-center justify-between">
              <span className="text-sm text-muted-foreground tracking-wide">
                {project.tags[0]}
              </span>
              <span className="text-sm tabular-nums text-muted-foreground">
                {project.year}
              </span>
            </div>
          </div>
        </div>

        {/* Right: image with right-to-left reveal */}
        <div className="w-full md:w-[48%] shrink-0">
          <div
            className="overflow-hidden rounded-2xl"
            style={{
              clipPath: revealed ? 'inset(0 0% 0 0%)' : 'inset(0 0% 0 100%)',
              transition: `clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
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
          {/* Back button */}
          <div
            className="mb-8 opacity-0 animate-fade-in-up"
            style={{ animationFillMode: 'forwards' }}
          >
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

          {/* Project rows */}
          <div>
            {projects.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Projects;
