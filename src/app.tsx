import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/components/layout"
import SmoothScroll from "@/components/smooth-scroll"
import Index from "./pages/index"

const NotFound = lazy(() => import("./pages/not-found"))
const ProjectDetail = lazy(() => import("./pages/project-detail"))
const Projects = lazy(() => import("./pages/projects"))
const ServicesPage = lazy(() => import("./pages/services-page"))
const ProcessPage = lazy(() => import("./pages/process-page"))
const ContactPage = lazy(() => import("./pages/contact-page"))

const App = () => (
  <BrowserRouter>
    <SmoothScroll>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </SmoothScroll>
  </BrowserRouter>
)

export default App
