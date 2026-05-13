import { ArrowRight, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "SERVICES", href: "/services" },
  { label: "PROCESS", href: "/process" },
  { label: "PORTFOLIO", href: "/projects" },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Scroll progress bar - thin line at top of viewport */}
      <div
        className="fixed top-0 left-0 z-[60] h-px bg-foreground/30 transition-none"
        style={{ width: `${scrollProgress * 100}%` }}
      />
      <nav
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
          scrolled ? "top-4" : "top-6"
        }`}
      >
        <div
          className={`glass flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-500 ${
            scrolled ? "shadow-lg shadow-black/20" : ""
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-foreground transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src="/images/logo.png"
              alt="Briggs Davis Logo"
              className="h-6 w-6 object-contain"
            />
            <span className="font-bold tracking-tight">BRIGGS</span>
            <span className="font-light tracking-tight text-muted-foreground">DAVIS</span>
          </Link>

          {/* Nav Links */}
          <div className="ml-8 hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`relative px-4 py-2 text-xs font-medium tracking-widest transition-all duration-300 ${
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {location.pathname === item.href && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground" />
                )}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <Link to="/contact">
            <Button variant="nav" size="nav" className="group ml-4 hidden md:flex">
              CONTACT
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="ml-4 p-2 text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="glass mt-2 flex animate-fade-in flex-col gap-2 rounded-2xl p-4 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`rounded-lg px-4 py-3 text-xs font-medium tracking-widest transition-all duration-300 ${
                  location.pathname === item.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="rounded-lg px-4 py-3 text-left text-xs font-medium tracking-widest text-muted-foreground transition-all duration-300 hover:bg-secondary/50 hover:text-foreground"
            >
              CONTACT
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
