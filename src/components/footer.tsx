import { Mail, MessageCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const contacts = [
  {
    name: "Maxwell Briggs",
    email: "maxwell.alexander.briggs@gmail.com",
    whatsapp: "+251 94 482 5058",
  },
  {
    name: "Nathaniel Davis",
    email: "nate@qstreet.org",
    whatsapp: "+1 202 494 9466",
  },
]

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer id="contact" ref={sectionRef} className="border-t border-border/30 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Contact Cards - Side by Side */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {contacts.map((contact, index) => (
            <div
              key={contact.name}
              className={`opacity-0 ${index === 0 ? "delay-100" : "[animation-delay:250ms]"} ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              <h3 className="mb-6 text-2xl font-semibold text-foreground md:text-3xl">
                {contact.name}
              </h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-sm md:text-base">{contact.email}</span>
                </a>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\s+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm md:text-base">{contact.whatsapp}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div
          className={`flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 opacity-0 delay-400 md:flex-row ${
            isVisible ? "animate-fade-in-up" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Briggs Davis Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold tracking-tight text-foreground">BRIGGS</span>
            <span className="font-light tracking-tight text-muted-foreground">DAVIS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Briggs Davis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
