export const routes = {
  home: "/",
  services: "/services",
  webDevelopment: "/services/web-development",
  appDevelopment: "/services/app-development",
  projects: "/projects",
  project: (id: string) => `/project/${id}`,
  contact: "/contact",
} as const

export const primaryNavigation = [
  { label: "Home", href: routes.home },
  { label: "Services", href: routes.services },
  { label: "Portfolio", href: routes.projects },
  { label: "Contact", href: routes.contact },
] as const
