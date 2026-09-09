import { createRoot } from "react-dom/client"
import App from "./app.tsx"
import "@fontsource-variable/dm-sans/wght.css"
import "@fontsource-variable/dm-sans/wght-italic.css"
import "./index.css"

createRoot(document.getElementById("root")!).render(<App />)
