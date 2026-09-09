import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { RouteMetadata } from "@/app/metadata"
import { routes } from "@/app/routes"
import { NavLogoBackground } from "@/components/nav-logo-background"
import Navbar from "@/components/navbar"
import { HeroIntroProvider } from "@/lib/hero-intro"
import { scrollToTop } from "@/lib/lenis-store"

const HERO_INTRO_SESSION_KEY = "briggs-davis-hero-intro-seen"

const Layout = () => {
  const location = useLocation()
  const [playHeroIntro, setPlayHeroIntro] = useState(
    () =>
      location.pathname === routes.home &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.sessionStorage.getItem(HERO_INTRO_SESSION_KEY) !== "true",
  )

  useEffect(() => {
    scrollToTop()
    document.getElementById("main-content")?.focus({ preventScroll: true })
  }, [location.key])

  useEffect(() => {
    if (location.pathname !== routes.home) setPlayHeroIntro(false)
  }, [location.pathname])

  useEffect(() => {
    window.sessionStorage.setItem(HERO_INTRO_SESSION_KEY, "true")
  }, [])

  return (
    <HeroIntroProvider value={playHeroIntro}>
      <RouteMetadata />
      <a
        href="#main-content"
        className="fixed top-4 left-4 z-[200] -translate-y-20 rounded-full bg-black px-5 py-3 text-xs font-medium tracking-widest text-white uppercase transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div
        className="site-background pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
        aria-hidden="true"
      >
        <NavLogoBackground mode="site" introActive={playHeroIntro} />
        <div
          className={`absolute inset-0 bg-white/78 ${
            playHeroIntro
              ? "animate-site-overlay-intro opacity-0 [animation-delay:800ms] motion-reduce:animate-none motion-reduce:opacity-100"
              : ""
          }`}
        />
      </div>

      <Navbar />
      <main id="main-content" tabIndex={-1} className="site-content relative z-1 outline-none">
        <Outlet />
      </main>
    </HeroIntroProvider>
  )
}

export default Layout
