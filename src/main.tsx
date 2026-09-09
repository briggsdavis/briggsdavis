import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { createRoot } from "react-dom/client"
import App from "./app.tsx"
import { convex } from "./convex"
import "@fontsource-variable/dm-sans/wght.css"
import "@fontsource-variable/dm-sans/wght-italic.css"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <ConvexAuthProvider client={convex}>
    <App />
  </ConvexAuthProvider>,
)
