import { useQuery } from "convex/react"
import { Link, useParams } from "react-router"
import { routes } from "@/app/routes"
import ProjectForm from "@/components/project-form"
import { api } from "../../convex/_generated/api"

export default function AdminProjectEditor() {
  const { slug } = useParams()
  const project = useQuery(api.projects.single, slug ? { slug } : "skip")

  if (!slug) return <ProjectForm key="new" />
  if (project === undefined)
    return <output className="text-sm text-muted-foreground">Loading project…</output>
  if (!project)
    return (
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Project not found.</h1>
        <Link to={routes.admin} className="mt-6 inline-block text-sm underline underline-offset-4">
          Back to projects
        </Link>
      </div>
    )

  return <ProjectForm key={project._id} project={project} />
}
