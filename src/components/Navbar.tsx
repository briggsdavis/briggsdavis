import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const navItems = [
  { label: 'SERVICES', href: '#services' },
  { label: 'PROCESS', href: '#process' },
  { label: 'PORTFOLIO', href: '#portfolio' },
  { label: 'ABOUT', href: '#about' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? 'top-4' : 'top-6'
      }`}
    >
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 glass ${
          scrolled
            ? 'shadow-lg shadow-black/20'
            : ''
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 px-4 py-2 text-foreground hover:opacity-80 transition-opacity duration-300"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src="/images/logo.png" alt="Briggs Davis Logo" className="w-6 h-6 object-contain" />
          <span className="font-bold tracking-tight">BRIGGS</span>
          <span className="font-light tracking-tight text-muted-foreground">DAVIS</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1 ml-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className={`px-4 py-2 text-xs font-medium tracking-widest transition-all duration-300 relative ${
                activeSection === item.href.slice(1)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-foreground rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Contact Button */}
        <Button
          variant="nav"
          size="nav"
          className="ml-4 group"
          onClick={() => scrollToSection('#contact')}
        >
          CONTACT
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
