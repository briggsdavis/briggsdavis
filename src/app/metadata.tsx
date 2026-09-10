import { useQuery } from "convex/react"
import { useEffect } from "react"
import { matchPath, useLocation } from "react-router"
import { routes } from "@/app/routes"
import { api } from "../../convex/_generated/api"

const siteName = "Briggs Davis"
const siteUrl = "https://briggsdavis.com"
const projectPath = routes.project(":id")
const defaultDescription =
  "Briggs Davis designs and builds distinctive websites, web applications, and native mobile products."

const routeMetadata: Record<string, { title: string; description: string }> = {
  [routes.home]: { title: siteName, description: defaultDescription },
  [routes.approach]: {
    title: `Approach • ${siteName}`,
    description: defaultDescription,
  },
  [routes.services]: {
    title: `Services • ${siteName}`,
    description:
      "Web development and native mobile app development, designed around the business behind the product.",
  },
  [routes.webDevelopment]: {
    title: `Web Development • ${siteName}`,
    description:
      "Websites, web applications, content systems, and business tools designed to work for the business.",
  },
  [routes.appDevelopment]: {
    title: `App Development • ${siteName}`,
    description:
      "Native iOS and Android products, connected services, and companion web experiences.",
  },
  [routes.work]: {
    title: `Work • ${siteName}`,
    description: "Selected digital products, platforms, and websites built by Briggs Davis.",
  },
  [routes.contact]: {
    title: `Contact • ${siteName}`,
    description: "Start a conversation with Briggs Davis about your next digital product.",
  },
  [routes.login]: {
    title: `Log in • ${siteName}`,
    description: "Team access to Briggs Davis.",
  },
  [routes.signup]: {
    title: `Create account • ${siteName}`,
    description: "Create your Briggs Davis team account.",
  },
}

const setMetaContent = (selector: string, content: string) => {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content)
}

export const RouteMetadata = () => {
  const location = useLocation()
  const slug = matchPath(projectPath, location.pathname)?.params.id
  const liveProject = useQuery(api.projects.single, slug ? { slug } : "skip")

  useEffect(() => {
    if (slug && liveProject === undefined) return

    const metadata =
      slug && liveProject
        ? { title: `${liveProject.title} • ${siteName}`, description: liveProject.summary }
        : (routeMetadata[location.pathname] ?? {
            title: `Page Not Found • ${siteName}`,
            description: "The page you are looking for is not available.",
          })
    const canonicalUrl = `${siteUrl}${location.pathname}`

    document.title = metadata.title
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", canonicalUrl)
    setMetaContent('meta[name="description"]', metadata.description)
    setMetaContent('meta[property="og:title"]', metadata.title)
    setMetaContent('meta[property="og:description"]', metadata.description)
    setMetaContent('meta[property="og:url"]', canonicalUrl)
    setMetaContent('meta[name="twitter:title"]', metadata.title)
    setMetaContent('meta[name="twitter:description"]', metadata.description)
    setMetaContent('meta[name="twitter:url"]', canonicalUrl)
  }, [location.pathname, liveProject, slug])

  return null
}
