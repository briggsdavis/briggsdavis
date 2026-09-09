import { useQuery } from "convex/react"
import { useEffect } from "react"
import { matchPath, useLocation } from "react-router-dom"
import { getProject } from "@/data/projects"
import { api } from "../../convex/_generated/api"

const siteName = "Briggs Davis"
const siteUrl = "https://briggsdavis.com"
const defaultDescription =
  "Briggs Davis designs and builds distinctive websites, web applications, and native mobile products."

const routeMetadata: Record<string, { title: string; description: string }> = {
  "/": { title: siteName, description: defaultDescription },
  "/approach": {
    title: `Approach • ${siteName}`,
    description: defaultDescription,
  },
  "/services": {
    title: `Services • ${siteName}`,
    description:
      "Web development and native mobile app development, designed around the business behind the product.",
  },
  "/services/web-development": {
    title: `Web Development • ${siteName}`,
    description:
      "Websites, web applications, content systems, and business tools designed to work for the business.",
  },
  "/services/app-development": {
    title: `App Development • ${siteName}`,
    description:
      "Native iOS and Android products, connected services, and companion web experiences.",
  },
  "/work": {
    title: `Work • ${siteName}`,
    description: "Selected digital products, platforms, and websites built by Briggs Davis.",
  },
  "/contact": {
    title: `Contact • ${siteName}`,
    description: "Start a conversation with Briggs Davis about your next digital product.",
  },
  "/login": {
    title: `Log in • ${siteName}`,
    description: "Team access to Briggs Davis.",
  },
  "/signup": {
    title: `Create account • ${siteName}`,
    description: "Create your Briggs Davis team account.",
  },
}

const setMetaContent = (selector: string, content: string) => {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content)
}

export const RouteMetadata = () => {
  const location = useLocation()
  const slug = matchPath("/work/:id", location.pathname)?.params.id
  const liveProject = useQuery(api.projects.single, slug ? { slug } : "skip")

  useEffect(() => {
    const id = matchPath("/work/:id", location.pathname)?.params.id
    const project = getProject(id)
    const metadata = liveProject
      ? { title: `${liveProject.title} • ${siteName}`, description: liveProject.summary }
      : project
        ? {
            title: `${project.name} • ${siteName}`,
            description: project.shortDescription ?? project.description,
          }
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
  }, [location.pathname, liveProject])

  return null
}
