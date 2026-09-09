export const routes = {
  home: "/",
  services: "/services",
  webDevelopment: "/services/web-development",
  appDevelopment: "/services/app-development",
  projects: "/work",
  project: (id: string) => `/work/${id}`,
  contact: "/contact",
} as const

export const primaryNavigation = [
  { label: "Home", href: routes.home },
  { label: "Services", href: routes.services },
  { label: "Work", href: routes.projects },
  { label: "Contact", href: routes.contact },
] as const
