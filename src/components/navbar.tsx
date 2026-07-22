import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Expertise", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Portfolio", href: "/projects" },
  { label: "Contact", href: "/contact" },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [menuOpen])

  return (
    <>
      <div
        data-site-navigation
        className="fixed top-0 left-0 z-[100] h-px bg-foreground/30 transition-none"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <nav data-site-navigation className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-24">
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className={`menu-toggle pointer-events-auto absolute top-6 left-6 h-11 w-11 text-foreground outline-none md:top-8 md:left-8 ${
            menuOpen ? "is-open" : ""
          }`}
        >
          <span />
          <span />
        </button>

        <Link
          to="/"
          aria-label="Briggs Davis home"
          className="nav-logo-link pointer-events-auto absolute top-7 left-1/2 -translate-x-1/2 md:top-9"
        >
          <img src="/images/logo.png" alt="" className="nav-logo-mark h-8 w-8 object-contain" />
        </Link>

        <Link
          to="/contact"
          className="pointer-events-auto absolute top-6 right-6 md:top-8 md:right-8"
        >
          <Button variant="nav" size="nav" className="group shadow-lg shadow-black/10">
            CONTACT
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </nav>

      <div
        id="site-menu"
        data-site-navigation
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[80] ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-y-0 left-0 w-full bg-black transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:w-1/2 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full items-center px-8 pt-16 sm:px-14 lg:px-[8vw]">
            <div className="menu-links flex flex-col items-start gap-3 md:gap-4">
              {navItems.map((item) => {
                const active = location.pathname === item.href
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    tabIndex={menuOpen ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={`menu-link text-[2.125rem] leading-[1.05] font-medium text-white md:text-[2.625rem] lg:text-[3.15rem] ${
                      active ? "is-active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Close navigation"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
          className={`liquid-glass-panel absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden lg:block ${
            menuOpen ? "is-visible" : ""
          }`}
        >
          <span className="liquid-glass-sheen" />
        </button>
      </div>
    </>
  )
}

export default Navbar
