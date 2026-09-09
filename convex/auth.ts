import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server"
import { ConvexError } from "convex/values"
import { adminProfile } from "./model/admin"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile: adminProfile,

      validatePasswordRequirements(password) {
        if (typeof password !== "string" || password.length < 8) {
          throw new ConvexError("Use a password with at least 8 characters.")
        }
      },
    }),
  ],
})
