import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  {
    number: '01',
    title: 'Mobile Friendly Design',
    tagline: 'Every pixel, every device.',
    description: 'Websites that look perfect on every device, from desktop to mobile. We use responsive frameworks and rigorous cross-device testing to ensure your users get a flawless experience regardless of screen size.',
    features: ['Responsive layouts', 'Touch-optimized interactions', 'Cross-browser compatibility', 'Retina-ready assets'],
  },
  {
    number: '02',
    title: 'Search Engine Optimization',
    tagline: 'Visibility that drives growth.',
    description: 'Improve your visibility and rank higher in search results. We implement technical SEO best practices, structured data, and performance optimization to ensure search engines love your site as much as your users do.',
    features: ['Technical SEO audits', 'Structured data markup', 'Performance optimization', 'Analytics integration'],
  },
  {
    number: '03',
    title: 'Rapid Development',
    tagline: 'Launch in days, not months.',
    description: 'Launch your website in as fast as one week without compromising quality. Our streamlined development process and modern tooling allow us to deliver production-ready websites at unprecedented speed.',
    features: ['One-week delivery possible', 'Agile methodology', 'Modern tech stack', 'Iterative feedback loops'],
  },
  {
    number: '04',
    title: 'Content Management Systems',
    tagline: 'Your content, your control.',
    description: 'Easy-to-use systems that let you manage your own content. We build intuitive admin interfaces so your team can update text, images, and pages without touching a line of code.',
    features: ['Intuitive admin panels', 'Role-based access', 'Media management', 'Version history'],
  },
  {
    number: '05',
    title: 'Ongoing Maintenance',
    tagline: 'Always running, always secure.',
    description: 'Keep your website secure, updated, and running smoothly. We provide continuous monitoring, security patches, and performance tuning to keep your digital presence in peak condition.',
    features: ['24/7 monitoring', 'Security updates', 'Performance tuning', 'Regular backups'],
  },
  {
    number: '06',
    title: 'Multi-Language Support',
    tagline: "Speak every market's language.",
    description: 'Reach global audiences with professionally translated websites. We implement robust internationalization frameworks that make managing multiple languages seamless.',
    features: ['i18n frameworks', 'RTL support', 'Locale-aware formatting', 'Translation management'],
  },
  {
    number: '07',
    title: 'Facilitate Online Payments',
    tagline: 'Seamless transactions, built-in trust.',
    description: 'Build secure e-commerce solutions that accept payments seamlessly. From Stripe to local payment gateways, we integrate trusted payment processors with bulletproof security.',
    features: ['Payment gateway integration', 'Multi-currency support', 'Subscription billing', 'Invoice generation'],
  },
  {
    number: '08',
    title: 'Unique Solutions',
    tagline: 'Tailored to your vision.',
    description: 'Every website is tailored to fit your business, marketing, and operational needs. No templates. We architect custom solutions that solve your specific challenges.',
    features: ['Custom architecture', 'Business-aligned design', 'Scalable solutions', 'API integrations'],
  },
  {
    number: '09',
    title: 'Flawless Performance',
    tagline: 'Speed is a feature.',
    description: 'Lightning-fast loading times powered by high-quality, modern technology. We optimize every asset, lazy-load intelligently, and leverage CDNs to deliver sub-second page loads.',
    features: ['Sub-second loads', 'CDN deployment', 'Asset optimization', 'Core Web Vitals compliance'],
  },
  {
    number: '10',
    title: 'Client Input',
    tagline: 'Your voice shapes every decision.',
    description: 'Continuous development with rapid response times and dedicated consultation rounds. We keep you in the loop at every stage so the final product reflects your vision precisely.',
    features: ['Rapid response times', 'Consultation rounds', 'Continuous development', 'Transparent process'],
  },
  {
    number: '11',
    title: 'Generative Engine Optimization',
    tagline: 'Future-proof your discoverability.',
    description: 'Optimize your digital presence for AI-powered search and generative engines. As discovery shifts beyond traditional search, we ensure your brand surfaces accurately across AI assistants, chatbots, and next-generation platforms.',
    features: ['AI search optimization', 'Structured content strategy', 'Entity-based markup', 'LLM-friendly architecture'],
  },
  {
    number: '12',
    title: 'Global Client Experience',
    tagline: 'Trusted across continents.',
    description: 'We bring proven experience working with clients ranging from SMEs to multimillion-dollar enterprises across Europe, Africa, and the Americas. Our international perspective ensures solutions that resonate in any market.',
    features: ['Cross-continental delivery', 'Enterprise-grade solutions', 'SME to large-scale projects', 'Culturally informed design'],
  },
];

const ServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <span
            className={`block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-6 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            What We Do
          </span>
          <h1
            className={`text-5xl md:text-7xl font-semibold text-foreground mb-6 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Our <span className="font-display italic text-muted-foreground">Services</span>
          </h1>
          <p
            className={`text-lg text-muted-foreground max-w-xl mx-auto opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}
          >
            High-end digital solutions shaped by international experience across Europe, Africa, and the Americas.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section ref={sectionRef} className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={service.number}
                className={`border-t border-border/30 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${400 + index * 80}ms`, animationFillMode: 'forwards' }}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full flex items-center gap-6 py-8 text-left group transition-all duration-300 hover:pl-2"
                >
                  <span className="text-sm font-light text-muted-foreground/40 tabular-nums w-8 shrink-0">
                    {service.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-foreground transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{service.tagline}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-border/50 flex items-center justify-center shrink-0 transition-all duration-300 ${isExpanded ? 'rotate-45 bg-foreground' : 'group-hover:border-foreground'}`}>
                    <span className={`text-lg leading-none transition-colors duration-300 ${isExpanded ? 'text-background' : 'text-foreground'}`}>+</span>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${isExpanded ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pl-14 pr-8">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1 h-1 rounded-full bg-foreground shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-border/30" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl font-semibold text-foreground mb-6 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Ready to get started?
          </h2>
          <p
            className={`text-muted-foreground mb-10 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            See how we bring these services to life through our proven process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="heroPrimary" size="hero" className="group" asChild>
              <Link to="/process">
                Our Process
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="hero" size="hero" asChild>
              <Link to="/projects">
                View Portfolio
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
