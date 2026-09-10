export const routes = {
  home: "/",
  services: "/services",
  approach: "/approach",
  webDevelopment: "/services/web-development",
  appDevelopment: "/services/app-development",
  work: "/work",
  project: (id: string) => `/work/${id}`,
  contact: "/contact",
  login: "/login",
  signup: "/signup",
  admin: "/admin",
  adminInquiries: "/admin/inquiries",
  adminNewProject: "/admin/projects/new",
  adminEditProject: (slug: string) => `/admin/projects/${slug}/edit`,
} as const

export const primaryNavigation = [
  { label: "Home", href: routes.home },
  { label: "Services", href: routes.services },
  { label: "Work", href: routes.work },
  { label: "Contact", href: routes.contact },
] as const
