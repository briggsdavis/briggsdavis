import { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';

const contacts = [
  {
    name: 'Maxwell Briggs',
    email: 'maxwell.alexander.briggs@gmail.com',
    whatsapp: '+251 94 482 5058',
  },
  {
    name: 'Nathaniel Davis',
    email: 'nate@qstreet.org',
    whatsapp: '+1 202 494 9466',
  },
];

const Footer = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="py-20 px-6 border-t border-border/30"
    >
      <div className="max-w-6xl mx-auto">
        {/* Contact Cards - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contacts.map((contact, index) => (
            <div
              key={contact.name}
              className={`opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{
                animationDelay: `${100 + index * 150}ms`,
                animationFillMode: 'forwards',
              }}
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                {contact.name}
              </h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm md:text-base">{contact.email}</span>
                </a>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm md:text-base">{contact.whatsapp}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30 opacity-0 ${
            isVisible ? 'animate-fade-in-up' : ''
          }`}
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Briggs Davis Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold tracking-tight text-foreground">BRIGGS</span>
            <span className="font-light tracking-tight text-muted-foreground">DAVIS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Briggs Davis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;