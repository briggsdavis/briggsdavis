import { ArrowRight, Mail, MessageCircle } from "lucide-react"
import maxwellImg from "@/assets/maxwell-briggs.webp"
import nathanielImg from "@/assets/nathaniel-davis.jpg"
import Footer from "@/components/footer"
import { bookingUrl, contacts } from "@/data/site"

const team = contacts.map((person) => ({
  ...person,
  image: person.name === "Maxwell Briggs" ? maxwellImg : nathanielImg,
}))

const ContactPage = () => {
  return (
    <div className="min-h-screen text-foreground">
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">Get in Touch</h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          Ready to start your next project? Reach out to either of us directly.
        </p>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-8 text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Book a Call
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </section>

      {/* Contact Cards */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
          {team.map((person) => (
            <div
              key={person.name}
              className="flex flex-col items-center rounded-2xl border border-border/30 bg-card/60 p-8 text-center backdrop-blur-[20px]"
            >
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
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactPage
