import { useAuthActions } from "@convex-dev/auth/react"
import { useConvexAuth } from "convex/react"
import { ConvexError } from "convex/values"
import { Eye, EyeOff } from "lucide-react"
import { useState, type FormEvent } from "react"
import { Link, Navigate } from "react-router"
import { routes } from "@/app/routes"

const inputClass =
  "w-full rounded-xl border border-border/60 bg-card/40 px-4 py-3.5 text-base outline-none transition-colors focus:border-foreground focus:bg-white"
const buttonClass =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-50"

export default function AuthPage({ flow }: { flow: "signIn" | "signUp" }) {
  const { signIn } = useAuthActions()
  const { isLoading, isAuthenticated } = useConvexAuth()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const signup = flow === "signUp"

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return

    const data = new FormData(event.currentTarget)
    data.set("flow", flow)
    data.set("email", String(data.get("email")).trim().toLowerCase())
    setError("")
    setPending(true)

    try {
      await signIn("password", data)
    } catch (cause) {
      setError(
        cause instanceof ConvexError && typeof cause.data === "string"
          ? cause.data
          : signup
            ? "Could not create your account. Use your approved email, or log in if you already have an account."
            : "Could not log in. Check your email and password.",
      )
    } finally {
      setPending(false)
    }
  }

  if (!isLoading && isAuthenticated) return <Navigate to={routes.admin} replace />

  return (
    <section className="flex min-h-svh items-center justify-center px-6 pt-32 pb-16">
      <div className="w-full max-w-sm">
        {isLoading ? (
          <output className="block py-12 text-sm text-muted-foreground">One moment…</output>
        ) : (
          <>
            <h1 className="text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
              {signup ? "Join the studio." : "Welcome back."}
            </h1>
            <p className="mt-5 text-muted-foreground">
              {signup ? "For approved team members." : "Your studio. Behind the scenes."}
            </p>

            <form onSubmit={submit} className="mt-10" aria-busy={pending}>
              <fieldset disabled={pending} className="grid gap-6 disabled:opacity-60">
                <label className="grid gap-2.5 text-sm font-medium" htmlFor="auth-email">
                  Email
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                    className={inputClass}
                  />
                </label>

                <div className="grid gap-2.5">
                  <label htmlFor="auth-password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="auth-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={signup ? "new-password" : "current-password"}
                      minLength={signup ? 8 : undefined}
                      aria-describedby={signup ? "password-hint" : undefined}
                      required
                      className={`${inputClass} pr-14`}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute inset-y-1 right-1 flex w-11 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground focus-visible:outline-2"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  {signup ? (
                    <p id="password-hint" className="text-xs text-muted-foreground">
                      At least 8 characters.
                    </p>
                  ) : null}
                </div>

                <button type="submit" className={`${buttonClass} mt-2`}>
                  {pending ? "One moment…" : signup ? "Create account" : "Log in"}
                </button>
              </fieldset>
            </form>

            <p className="mt-8 border-t border-border/40 pt-6 text-sm text-muted-foreground">
              {signup ? "Already have an account? " : "New to the team? "}
              <Link
                to={signup ? routes.login : routes.signup}
                className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {signup ? "Log in" : "Create account"}
              </Link>
            </p>
          </>
        )}
        {error ? (
          <p role="alert" className="mt-5 text-sm text-red-800">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  )
}
