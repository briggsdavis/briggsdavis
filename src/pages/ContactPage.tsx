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
  },
  {
    name: 'Nathaniel Davis',
    role: 'Development & Engineering',
    email: 'nate@qstreet.org',
    whatsapp: '+1 202 494 9466',
    image: nathanielImg,
  },
];

const ContactPage = () => {
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
            <div
              key={person.name}
              className="glass rounded-2xl p-8 flex flex-col items-center text-center"
            >
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
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
