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

const outcomes = [
  { label: 'Stronger Brand Perception', note: 'Sites that signal credibility and quality.' },
  { label: 'Increased Business', note: 'Built to attract, convert, and retain.' },
  { label: 'Marketing & Ops Fit', note: 'Tools that work as hard as you do.' },
  { label: 'Global Reach', note: 'Designed for diverse contexts and audiences.' },
];

const contexts = [
  'Africa', 'Europe', 'Americas', 'E-Commerce', 'Real Estate',
  'Professional Services', 'Healthcare', 'Engineering', 'Advisory',
  'SMEs', 'Enterprise', 'Hospitality', 'Finance',
];

const ServicesPage = () => {
  const [introVisible, setIntroVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIntroVisible(true), 60);
    return () => clearTimeout(timer);
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

      {/* ── Dynamic Intro Section ── */}
      <section className="pt-32 pb-0 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">

          {/* Overline */}
          <span
            className={`block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-16 opacity-0 ${introVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            What We Build
          </span>

          {/* Editorial headline — two staggered lines */}
          <div className="mb-20">
            <div
              className={`opacity-0 ${introVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: '80ms', animationFillMode: 'forwards' }}
            >
              <p className="text-[clamp(2.8rem,8vw,6.5rem)] font-semibold text-foreground leading-[0.95] tracking-tight">
                Unique solutions
              </p>
            </div>
            <div
              className={`opacity-0 ${introVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: '180ms', animationFillMode: 'forwards' }}
            >
              <p className="text-[clamp(2.8rem,8vw,6.5rem)] font-display italic text-muted-foreground leading-[0.95] tracking-tight pl-[8%] md:pl-[18%]">
                built to perform.
              </p>
            </div>
          </div>

          {/* Thin rule with side caption */}
          <div
            className={`flex items-center gap-6 mb-20 opacity-0 ${introVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '280ms', animationFillMode: 'forwards' }}
          >
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-mono tracking-[0.22em] text-muted-foreground uppercase shrink-0">
              Every market. Every context.
            </span>
          </div>

          {/* Two-column body */}
          <div className="grid md:grid-cols-[1fr_300px] gap-12 md:gap-20 items-start">

            {/* Left: copy */}
            <div
              className={`opacity-0 ${introVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: '380ms', animationFillMode: 'forwards' }}
            >
              <p className="text-2xl text-foreground leading-relaxed font-light mb-6">
                We craft digital experiences that function as{' '}
                <span className="font-display italic">marketing engines</span> and operational
                tools — not just websites.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Whether you're a professional services firm, a direct-to-consumer operator, or a
                growth-stage enterprise entering new markets, we build for your specific context —
                your customer, your industry, your business environment. No templates.
                No guesswork. Precision from brief to launch.
              </p>
            </div>

            {/* Right: outcomes */}
            <div
              className={`opacity-0 ${introVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: '480ms', animationFillMode: 'forwards' }}
            >
              <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase mb-5">
                What You Get
              </p>
              <div className="divide-y divide-border/50">
                {outcomes.map((item) => (
                  <div key={item.label} className="py-4 first:pt-0">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Marquee — full-bleed */}
        <div
          className={`mt-24 overflow-hidden border-t border-b border-border/40 py-4 opacity-0 ${introVisible ? 'animate-fade-in-up' : ''}`}
          style={{ animationDelay: '580ms', animationFillMode: 'forwards' }}
        >
          <div className="animate-marquee">
            {[...contexts, ...contexts].map((ctx, i) => (
              <span
                key={i}
                className="text-xs font-mono tracking-[0.22em] text-muted-foreground uppercase shrink-0 px-6"
              >
                {ctx}
                <span className="ml-6 text-border">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services List ── */}
      <section ref={sectionRef} className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className={`mb-12 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationFillMode: 'forwards' }}
          >
            <span className="block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-4">
              Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Our Services
            </h2>
          </div>

          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={service.number}
                className={`border-t border-border/30 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${200 + index * 60}ms`, animationFillMode: 'forwards' }}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full flex items-center gap-6 py-8 text-left group transition-all duration-300 hover:pl-2"
                >
                  <span className="text-sm font-light text-muted-foreground/40 tabular-nums w-8 shrink-0">
                    {service.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{service.tagline}</p>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border border-border/50 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isExpanded ? 'rotate-45 bg-foreground' : 'group-hover:border-foreground'
                    }`}
                  >
                    <span
                      className={`text-lg leading-none transition-colors duration-300 ${
                        isExpanded ? 'text-background' : 'text-foreground'
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isExpanded ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'
                  }`}
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

      {/* ── CTA ── */}
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
              <Link to="/projects">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
