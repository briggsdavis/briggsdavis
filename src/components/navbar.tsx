import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router"
import { routes } from "@/app/routes"
import { useHeroIntro } from "@/lib/hero-intro"

const introClass =
  "hero-element-intro opacity-0 will-change-[opacity,filter,translate] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:blur-none motion-reduce:translate-x-0"

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  "py-3 after:absolute after:right-0 after:bottom-2.5 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.76,0,0.24,1)] hover:after:scale-x-100 focus-visible:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:after:transition-none " +
  (isActive && "after:scale-x-100")

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
          playHeroIntro ? `${introClass} [animation-delay:2300ms]` : ""
        }`}
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <nav data-site-navigation className="pointer-events-none fixed inset-x-0 top-0 z-90 h-24">
        <Link
          to={routes.home}
          aria-label="Briggs Davis home"
          className={`group/logo pointer-events-auto absolute top-7 left-[calc(var(--site-gutter)-0.225rem)] [perspective:500px] md:top-9 ${
            playHeroIntro ? `${introClass} [animation-delay:2300ms]` : ""
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
            className="pointer-events-auto relative flex h-10 items-center text-xs font-medium tracking-wide sm:text-sm"
          >
            <NavLink
              to={routes.work}
              className={({ isActive }) =>
                `absolute right-full mr-2 sm:mr-6 md:mr-8 ${getNavLinkClass({ isActive })} ${
                  playHeroIntro ? `${introClass} [animation-delay:2390ms]` : ""
                }`
              }
            >
              Work
            </NavLink>
            <NavLink
              to={routes.services}
              className={({ isActive }) =>
                `relative ${getNavLinkClass({ isActive })} ${
                  playHeroIntro ? `${introClass} [animation-delay:2480ms]` : ""
                }`
              }
            >
              Services
            </NavLink>
            <NavLink
              to={routes.approach}
              className={({ isActive }) =>
                `absolute left-full ml-2 sm:ml-6 md:ml-8 ${getNavLinkClass({ isActive })} ${
                  playHeroIntro ? `${introClass} [animation-delay:2570ms]` : ""
                }`
              }
            >
              Approach
            </NavLink>
          </div>
        </div>

        <div className="absolute top-4 right-[var(--site-gutter)] flex h-14 items-center md:top-6">
          <Link
            to={routes.contact}
            className={`button pointer-events-auto shrink-0 max-sm:px-2 max-sm:text-xs ${
              playHeroIntro ? `${introClass} [animation-delay:2660ms]` : ""
            }`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
