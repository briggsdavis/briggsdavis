import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MessageCircle } from 'lucide-react';
import maxwellImg from '@/assets/maxwell-briggs.png';
import nathanielImg from '@/assets/nathaniel-davis.jpg';

const team = [
  {
    name: 'Maxwell Briggs',
    role: 'Marketing & Strategy',
    email: 'maxwell.alexander.briggs@gmail.com',
    whatsapp: '+251 94 482 5058',
    image: maxwellImg,
    credentials: [
      'Certified in Business Value Creation',
      'SEO and digital marketing specialist',
      'Scaled ventures across Europe, Africa, and the Americas',
      'Expertise in organizational strategy and communications',
      'Proven track record in KPI-driven marketing campaigns',
    ],
  },
  {
    name: 'Nathaniel Davis',
    role: 'Development & Engineering',
    email: 'nate@qstreet.org',
    whatsapp: '+1 202 494 9466',
    image: nathanielImg,
    credentials: [
      '10+ years of software development experience',
      'Expert in TypeScript, Rust, and Python',
      'Built applications serving 30,000+ users',
      'Software developer for the U.S. Department of State',
      'Extensive freelance portfolio across international markets',
    ],
  },
];

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Ready to start your next project? Reach out to either of us directly.
        </p>
      </section>

      {/* Contact Cards */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {team.map((person) => (
            <div key={person.name} className="flex flex-col gap-4">
              {/* Contact Card */}
              <div className="glass rounded-2xl p-8 flex flex-col items-center text-center">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-32 h-32 rounded-full object-cover mb-6 border-2 border-border"
                />
                <h2 className="text-2xl font-semibold text-foreground">{person.name}</h2>
                <p className="text-sm text-muted-foreground mb-6">{person.role}</p>

                <div className="space-y-3 w-full">
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{person.email}</span>
                  </a>
                  <a
                    href={`https://wa.me/${person.whatsapp.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{person.whatsapp}</span>
                  </a>
                </div>
              </div>

              {/* Credentials Card */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-4">
                  Background
                </h3>
                <ul className="space-y-3">
                  {person.credentials.map((cred) => (
                    <li key={cred} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
