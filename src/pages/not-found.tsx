import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { routes } from "@/app/routes"

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-md text-center">
        <p className="mb-6 font-eyebrow text-xs font-medium tracking-widest text-muted-foreground uppercase">
          404 / Not Found
        </p>
        <h1 className="mb-5 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          This page isn&apos;t here.
        </h1>
        <p className="mx-auto mb-9 max-w-sm text-muted-foreground">
          It may have moved, or the link may no longer be valid.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={routes.home}
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-6 text-xs font-medium tracking-widest text-white uppercase"
          >
            Home
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to={routes.services}
            className="inline-flex h-11 items-center justify-center rounded-full border border-border/60 bg-white/60 px-6 text-xs font-medium tracking-widest text-foreground uppercase transition-colors hover:bg-white"
          >
            Services
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
