import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'SERVICES', href: '/services' },
  { label: 'PROCESS', href: '/process' },
  { label: 'PORTFOLIO', href: '/projects' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);


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
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 text-foreground hover:opacity-80 transition-opacity duration-300"
        >
          <img src="/images/logo.png" alt="Briggs Davis Logo" className="w-6 h-6 object-contain" />
          <span className="font-bold tracking-tight">BRIGGS</span>
          <span className="font-light tracking-tight text-muted-foreground">DAVIS</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1 ml-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`px-4 py-2 text-xs font-medium tracking-widest transition-all duration-300 relative ${
                location.pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
              {location.pathname === item.href && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-foreground rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Contact Button */}
        <Link to="/contact">
          <Button
            variant="nav"
            size="nav"
            className="ml-4 group hidden md:flex"
          >
            CONTACT
            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden ml-4 p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 rounded-2xl glass p-4 flex flex-col gap-2 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`px-4 py-3 text-xs font-medium tracking-widest rounded-lg transition-all duration-300 ${
                location.pathname === item.href
                  ? 'text-foreground bg-secondary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={scrollToContact}
            className="px-4 py-3 text-xs font-medium tracking-widest text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/50 transition-all duration-300 text-left"
          >
            CONTACT
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
