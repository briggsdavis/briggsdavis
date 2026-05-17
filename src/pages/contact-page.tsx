import { ArrowRight, Mail, MessageCircle } from "lucide-react"
import { useEffect } from "react"
import maxwellImg from "@/assets/maxwell-briggs.webp"
import nathanielImg from "@/assets/nathaniel-davis.jpg"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"

const team = [
  {
    name: "Maxwell Briggs",
    role: "Marketing & Strategy",
    email: "maxwell.alexander.briggs@gmail.com",
    whatsapp: "+251 94 482 5058",
    image: maxwellImg,
    credentials: [
      "Certified in Business Value Creation",
      "SEO and digital marketing specialist",
      "Scaled ventures across Europe, Africa, and the Americas",
      "Expertise in organizational strategy and communications",
      "Proven track record in KPI-driven marketing campaigns",
    ],
  },
  {
    name: "Nathaniel Davis",
    role: "Development & Engineering",
    email: "nate@qstreet.org",
    whatsapp: "+1 202 494 9466",
    image: nathanielImg,
    credentials: [
      "10+ years of software development experience",
      "Expert in TypeScript, Rust, and Python",
      "Built applications serving 30,000+ users",
      "Software developer for the U.S. Department of State",
      "Extensive freelance portfolio across international markets",
    ],
  },
]

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="px-6 pt-32 pb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">Get in Touch</h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          Ready to start your next project? Reach out to either of us directly.
        </p>
        <Button variant="heroPrimary" size="hero" className="group" asChild>
          <a href="https://calendly.com/ntedvs/website" target="_blank" rel="noopener noreferrer">
            Book a Call
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
      </section>

      {/* Contact Cards */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
          {team.map((person) => (
            <div key={person.name} className="flex flex-col gap-4">
              {/* Contact Card */}
              <div className="glass flex flex-col items-center rounded-2xl p-8 text-center">
                <img
                  src={person.image}
                  alt={person.name}
                  className="mb-6 h-32 w-32 rounded-full border-2 border-border object-cover"
                />
                <h2 className="text-2xl font-semibold text-foreground">{person.name}</h2>
                <p className="mb-6 text-sm text-muted-foreground">{person.role}</p>

                <div className="w-full space-y-3">
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center justify-center gap-3 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="text-sm">{person.email}</span>
                  </a>
                  <a
                    href={`https://wa.me/${person.whatsapp.replace(/\s+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">{person.whatsapp}</span>
                  </a>
                </div>
              </div>

              {/* Credentials Card */}
              <div className="glass rounded-2xl p-6">
                <h3 className="mb-4 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
                  Background
                </h3>
                <ul className="space-y-3">
                  {person.credentials.map((cred) => (
                    <li key={cred} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
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
  )
}

export default ContactPage
