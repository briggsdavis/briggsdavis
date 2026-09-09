import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { routes } from "@/app/routes"
import { useHeroIntro } from "@/lib/hero-intro"

const heroIntroClass =
  "animate-hero-intro opacity-0 will-change-[opacity,filter,translate] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:blur-none motion-reduce:translate-y-0"

const Navbar = () => {
  const playHeroIntro = useHeroIntro()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div
        data-site-navigation
        className={`fixed top-0 left-0 z-100 h-px bg-foreground/30 transition-none ${
          playHeroIntro ? `${heroIntroClass} [animation-delay:1150ms]` : ""
        }`}
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <nav data-site-navigation className="pointer-events-none fixed inset-x-0 top-0 z-90 h-24">
        <Link
          to={routes.home}
          aria-label="Briggs Davis home"
          className={`group/logo pointer-events-auto absolute top-7 left-4 [perspective:500px] sm:left-6 md:top-9 md:left-8 ${
            playHeroIntro ? `${heroIntroClass} [animation-delay:1290ms]` : ""
          }`}
        >
          <img
            src="/brand/logo.png"
            alt=""
            className="h-8 w-8 object-contain [transform-style:preserve-3d] [transition:transform_520ms_cubic-bezier(0.76,0,0.24,1)] group-hover/logo:[transform:rotateY(360deg)_scale(1.15)] motion-reduce:transform-none motion-reduce:transition-none"
          />
        </Link>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 md:top-8">
          <div
            className={`pointer-events-auto relative flex h-10 items-center text-xs font-medium tracking-wide sm:text-sm ${
              playHeroIntro ? `${heroIntroClass} [animation-delay:1290ms]` : ""
            }`}
          >
            <Link
              to={routes.projects}
              className="absolute right-full mr-2 py-3 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 sm:mr-6 md:mr-8"
            >
              Work
            </Link>
            <Link
              to={routes.services}
              className="py-3 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Services
            </Link>
            <a
              href="/#promise"
              className="absolute left-full ml-2 py-3 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 sm:ml-6 md:ml-8"
            >
              Approaches
            </a>
          </div>
        </div>

        <div className="absolute top-4 right-2 flex h-14 w-20 items-center justify-center sm:right-4 sm:w-28 md:top-6 md:right-6">
          <Link
            to={routes.contact}
            className="button pointer-events-auto shrink-0 max-sm:px-2 max-sm:text-xs max-sm:hover:px-2.5"
          >
            Contact
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
