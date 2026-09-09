import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "@/app/routes"
import Layout from "@/components/layout"
import SmoothScroll from "@/components/smooth-scroll"
import Index from "./pages/index"
import ProjectDetail from "./pages/project-detail"

const NotFound = lazy(() => import("./pages/not-found"))
const Projects = lazy(() => import("./pages/projects"))
const ServicesPage = lazy(() => import("./pages/services-page"))
const WebDevelopmentPage = lazy(() => import("./pages/web-development-page"))
const AppDevelopmentPage = lazy(() => import("./pages/app-development-page"))
const ContactPage = lazy(() => import("./pages/contact-page"))

const App = () => (
  <BrowserRouter>
    <SmoothScroll>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.home} element={<Index />} />
            <Route path={routes.services} element={<ServicesPage />} />
            <Route path={routes.webDevelopment} element={<WebDevelopmentPage />} />
            <Route path={routes.appDevelopment} element={<AppDevelopmentPage />} />
            <Route path={routes.projects} element={<Projects />} />
            <Route path="/work/:id" element={<ProjectDetail />} />
            <Route path={routes.contact} element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </SmoothScroll>
  </BrowserRouter>
)

export default App
