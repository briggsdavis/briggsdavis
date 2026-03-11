import { useParams, Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const projectVideos: Record<string, string> = {
  oderum: '/videos/oderum.mp4',
  'anne-silver': '/videos/anne-silver.mp4',
  'ease-engineering': '/videos/ease-engineering.mp4',
  'africa-growth-axis': '/videos/africa-growth-axis.mp4',
  'hormone-vitality-coaching': '/videos/hormone-vitality-coaching.mp4',
  refenti: '/videos/refent.mp4',
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-foreground mb-4">Project not found</h1>
          <Link to="/#portfolio">
            <Button variant="outline">Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const videoSrc = projectVideos[project.id];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16 pt-32">
        {/* Hero media */}
        <div className="rounded-2xl overflow-hidden mb-12 border border-border/30 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full object-cover object-top"
              autoPlay
              muted
              playsInline
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                }
              }}
            />
          ) : (
            <img
              src={project.image}
              alt={project.name}
              className="w-full object-cover object-top"
            />
          )}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              {project.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              {project.description}
            </p>

            {project.link && (
              <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                <Button variant="nav" size="lg" className="glass glint" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              Key Features
            </h3>
            <ul className="space-y-4">
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground/80 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${500 + i * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
