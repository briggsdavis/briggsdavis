import type { ComponentType } from "react"
import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router"
import { routes } from "@/app/routes"
import Layout from "@/components/layout"
import SmoothScroll from "@/components/smooth-scroll"
import Home from "@/pages/home"
import WorkDetail from "@/pages/work-detail"

const lazyComponent = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
})

const lazyAuth = (flow: "signIn" | "signUp") => async () => {
  const { default: AuthPage } = await import("@/pages/auth-page")
  return { Component: () => <AuthPage flow={flow} /> }
}

const RouterRoot = () => (
  <SmoothScroll>
    <Outlet />
    <ScrollRestoration />
  </SmoothScroll>
)

export const router = createBrowserRouter([
  {
    Component: RouterRoot,
    children: [
      {
        path: routes.admin,
        lazy: lazyComponent(() => import("@/components/admin-layout")),
        children: [
          { index: true, lazy: lazyComponent(() => import("@/pages/admin-projects")) },
          {
            path: routes.adminNewProject,
            lazy: lazyComponent(() => import("@/pages/admin-project-editor")),
          },
          {
            path: routes.adminEditProject(":slug"),
            lazy: lazyComponent(() => import("@/pages/admin-project-editor")),
          },
          {
            path: routes.adminInquiries,
            lazy: lazyComponent(() => import("@/pages/admin-inquiries")),
          },
        ],
      },
      {
        Component: Layout,
        children: [
          { index: true, Component: Home },
          { path: routes.services, lazy: lazyComponent(() => import("@/pages/services")) },
          { path: routes.approach, lazy: lazyComponent(() => import("@/pages/approach")) },
          {
            path: routes.webDevelopment,
            lazy: lazyComponent(() => import("@/pages/web-development")),
          },
          {
            path: routes.appDevelopment,
            lazy: lazyComponent(() => import("@/pages/app-development")),
          },
          { path: routes.work, lazy: lazyComponent(() => import("@/pages/work")) },
          { path: routes.project(":id"), Component: WorkDetail },
          { path: routes.contact, lazy: lazyComponent(() => import("@/pages/contact")) },
          { path: routes.login, lazy: lazyAuth("signIn") },
          { path: routes.signup, lazy: lazyAuth("signUp") },
          { path: "*", lazy: lazyComponent(() => import("@/pages/not-found")) },
        ],
      },
    ],
  },
])
