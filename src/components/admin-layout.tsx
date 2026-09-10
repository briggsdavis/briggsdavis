import { useAuthActions } from "@convex-dev/auth/react"
import { useConvexAuth } from "convex/react"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, Navigate, NavLink, Outlet, useLocation } from "react-router"
import { routes } from "@/app/routes"

const navigation = [
  { label: "Projects", to: routes.admin },
  { label: "Inquiries", to: routes.adminInquiries },
]

export default function AdminLayout() {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const { signOut } = useAuthActions()
  const { pathname } = useLocation()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    document.getElementById("admin-content")?.focus({ preventScroll: true })
  }, [pathname, isAuthenticated])

  async function logout() {
    if (pending) return
    setPending(true)
    setError("")

    try {
      await signOut()
    } catch {
      setError("Could not log out. Try again.")
    } finally {
      setPending(false)
    }
  }

  if (isLoading) {
    return (
      <output className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
        One moment…
      </output>
    )
  }
  if (!isAuthenticated) return <Navigate to={routes.login} replace />

  return (
    <div className="min-h-svh bg-background">
      <meta name="robots" content="noindex, nofollow" />
      <a
        href="#admin-content"
        className="fixed top-4 left-4 z-50 -translate-y-24 rounded-full bg-black px-5 py-3 text-sm text-white focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="border-b border-border/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 px-6 pt-6 sm:px-10 md:h-24 md:flex-nowrap md:py-0">
          <Link
            to={routes.admin}
            className="flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
            aria-label="Briggs Davis studio"
          >
            <img src="/brand/logo.png" alt="" className="size-8 object-contain" />
            <span className="text-lg font-semibold tracking-tight">Studio</span>
          </Link>

          <nav
            aria-label="Admin"
            className="order-last mt-6 flex w-full gap-1 pb-3 md:order-none md:mt-0 md:w-auto md:pb-0"
          >
            {navigation.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === routes.admin && !pathname.startsWith(`${routes.admin}/projects/`)}
                className={({ isActive }) =>
                  `rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${isActive ? "bg-black text-white" : "text-muted-foreground hover:bg-card hover:text-foreground"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5 text-sm">
            <Link
              to={routes.home}
              className="inline-flex min-h-11 items-center gap-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              View site <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </Link>
            <button
              type="button"
              onClick={logout}
              disabled={pending}
              className="min-h-11 font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50"
            >
              {pending ? "Logging out…" : "Log out"}
            </button>
          </div>
        </div>
      </header>

      <main
        id="admin-content"
        tabIndex={-1}
        className="mx-auto max-w-7xl px-6 py-12 outline-none sm:px-10 sm:py-20"
      >
        {error ? (
          <p role="alert" className="mb-8 text-sm text-red-800">
            {error}
          </p>
        ) : null}
        <Outlet />
      </main>
    </div>
  )
}
