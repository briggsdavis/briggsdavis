import { ConvexError, type Value } from "convex/values"

export function adminProfile(params: Record<string, Value | undefined>) {
  const email = typeof params.email === "string" ? params.email.trim().toLowerCase() : ""

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ConvexError("Enter a valid email address.")
  }

  if (params.flow === "signUp") {
    const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean)

    if (!allowedEmails.includes(email)) {
      throw new ConvexError("This email is not approved for admin access.")
    }
  }

  return { email }
}
