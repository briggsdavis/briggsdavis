import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { primaryNavigation, routes } from "@/app/routes"
import { NavLogoBackground } from "@/components/nav-logo-background"
import { NavigationRipplePanel } from "@/components/navigation-ripple-panel"
import { useHeroIntro } from "@/lib/hero-intro"

const heroIntroClass =
  "animate-hero-intro opacity-0 will-change-[opacity,filter,translate] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:blur-none motion-reduce:translate-y-0"
const menuLineClass =
  "absolute left-1/2 block h-px origin-center bg-current [transition:width_350ms_cubic-bezier(0.76,0,0.24,1),translate_500ms_cubic-bezier(0.76,0,0.24,1),rotate_500ms_cubic-bezier(0.76,0,0.24,1),top_500ms_cubic-bezier(0.76,0,0.24,1)] group-focus-visible/menu:bg-black group-focus-visible/menu:shadow-[0_0_8px_rgb(0_0_0_/_0.35)] motion-reduce:translate-x-0 motion-reduce:rotate-0 motion-reduce:transition-none"

const Navbar = () => {
  const playHeroIntro = useHeroIntro()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)
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
    document.documentElement.toggleAttribute("data-navigation-menu-open", menuOpen)
    return () => document.documentElement.removeAttribute("data-navigation-menu-open")
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const initialFocusTimer = window.setTimeout(() => {
      menuPanelRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus()
    }, 100)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== "Tab") return

      const focusable = Array.from(
        menuPanelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.clearTimeout(initialFocusTimer)
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const toggleMenu = () => setMenuOpen((isOpen) => !isOpen)

  return (
    <>
      <div
        data-site-navigation
        className={`fixed top-0 left-0 z-[100] h-px bg-foreground/30 transition-none ${
          playHeroIntro ? `${heroIntroClass} [animation-delay:1150ms]` : ""
        }`}
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <nav data-site-navigation className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-24">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={toggleMenu}
          className={`group/menu pointer-events-auto absolute top-6 left-6 h-11 w-11 text-foreground outline-none md:top-8 md:left-8 ${
            playHeroIntro ? `${heroIntroClass} [animation-delay:1220ms]` : ""
          }`}
        >
          <span
            className={`${menuLineClass} ${
              menuOpen
                ? "top-[21px] w-5.5 -translate-x-1/2 rotate-45"
                : "top-[17px] w-5.5 -translate-x-1/2 group-hover/menu:w-3.5 group-hover/menu:-translate-x-[22%]"
            }`}
          />
          <span
            className={`${menuLineClass} ${
              menuOpen
                ? "top-[21px] w-5.5 -translate-x-1/2 -rotate-45"
                : "top-[25px] w-3.5 -translate-x-[78%] group-hover/menu:w-5.5 group-hover/menu:-translate-x-1/2"
            }`}
          />
        </button>

        <Link
          to={routes.home}
          aria-label="Briggs Davis home"
          className={`group/logo pointer-events-auto absolute top-7 left-1/2 -translate-x-1/2 [perspective:500px] md:top-9 ${
            playHeroIntro ? `${heroIntroClass} [animation-delay:1290ms]` : ""
          }`}
        >
          <img
            src="/brand/logo.png"
            alt=""
            className="h-8 w-8 object-contain [transform-style:preserve-3d] [transition:transform_520ms_cubic-bezier(0.76,0,0.24,1)] group-hover/logo:[transform:rotateY(360deg)_scale(1.15)] motion-reduce:transform-none motion-reduce:transition-none"
          />
        </Link>

        <Link
          to={routes.contact}
          className={`group pointer-events-auto absolute top-6 right-6 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border/30 bg-card/60 px-6 text-xs font-medium tracking-wide text-foreground uppercase shadow-lg shadow-black/10 backdrop-blur-[20px] transition-colors hover:bg-secondary/50 focus-visible:outline-2 focus-visible:outline-offset-2 md:top-8 md:right-8 ${
            playHeroIntro ? `${heroIntroClass} [animation-delay:1360ms]` : ""
          }`}
        >
          CONTACT
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </nav>

      <div
        id="site-menu"
        ref={menuPanelRef}
        data-site-navigation
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[80] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform ${
          menuOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none -translate-x-full"
        }`}
      >
        <div className="absolute inset-y-0 left-0 w-[72%] bg-white sm:w-[62%] lg:w-1/2">
          <NavLogoBackground active={menuOpen} />
          <div className="absolute inset-0 bg-white/78" aria-hidden="true" />
          <div className="relative z-10 flex h-full items-center px-8 pt-16 sm:px-14 lg:px-[8vw]">
            <div className="group/menu-links flex flex-col items-start gap-3 md:gap-4">
              {primaryNavigation.map((item) => {
                const active = location.pathname === item.href
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    tabIndex={menuOpen ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={`origin-left -translate-x-6.5 scale-100 font-display text-[2.125rem] leading-[1.05] font-medium text-black opacity-0 [transition:opacity_125ms_ease,color_0ms,translate_125ms_cubic-bezier(0.76,0,0.24,1),scale_145ms_cubic-bezier(0.76,0,0.24,1)] group-hover/menu-links:opacity-20 hover:translate-x-2.5 hover:scale-[1.045] hover:text-black hover:opacity-100 group-hover/menu-links:hover:opacity-100 focus-visible:translate-x-2.5 focus-visible:scale-[1.045] focus-visible:text-black focus-visible:opacity-100 group-hover/menu-links:focus-visible:opacity-100 motion-reduce:translate-x-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none md:text-[2.625rem] lg:text-[3.15rem] ${
                      menuOpen
                        ? active
                          ? "translate-x-0 opacity-100"
                          : "translate-x-0 opacity-70"
                        : ""
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
          aria-label="Dismiss navigation"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
          className="absolute inset-y-0 right-0 block w-[28%] cursor-pointer overflow-hidden bg-transparent motion-reduce:transition-none sm:w-[38%] lg:w-1/2"
        >
          <NavigationRipplePanel active={menuOpen} />
        </button>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 left-[calc(72%-2px)] z-2 bg-[linear-gradient(90deg,rgb(255_255_255_/_0.98)_0%,rgb(255_255_255_/_0.86)_16%,rgb(255_255_255_/_0.58)_42%,rgb(255_255_255_/_0.28)_68%,rgb(255_255_255_/_0.08)_86%,transparent_100%)] motion-reduce:transition-none sm:left-[calc(62%-2px)] sm:bg-[linear-gradient(90deg,rgb(255_255_255_/_0.98)_0%,rgb(255_255_255_/_0.86)_12%,rgb(255_255_255_/_0.58)_30%,rgb(255_255_255_/_0.28)_48%,rgb(255_255_255_/_0.08)_62%,transparent_72%)] lg:left-[calc(50%-2px)] lg:bg-[linear-gradient(90deg,rgb(255_255_255_/_0.98)_0%,rgb(255_255_255_/_0.86)_10%,rgb(255_255_255_/_0.58)_22%,rgb(255_255_255_/_0.28)_34%,rgb(255_255_255_/_0.08)_42%,transparent_48%)]"
        />
      </div>
    </>
  )
}

export default Navbar
