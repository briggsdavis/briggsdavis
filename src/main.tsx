// oxlint-disable import/no-unassigned-import
import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./app.tsx"
import { convex } from "./convex"
import "@fontsource-variable/dm-sans/wght.css"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>
  </StrictMode>,
)
