import { useQuery } from "convex/react"
import { Link, useParams } from "react-router"
import { routes } from "@/app/routes"
import LiveProjectCaseStudy from "@/components/live-project-case-study"
import { api } from "../../convex/_generated/api"

const WorkDetail = () => {
  const { id } = useParams<{ id: string }>()
  const project = useQuery(api.projects.single, id ? { slug: id } : "skip")

  if (!id || project === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-semibold text-foreground">Project not found</h1>
          <Link to={routes.work} className="button">
            Back to work
          </Link>
        </div>
      </div>
    )
  }

  if (project === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading project…
      </div>
    )
  }

  return <LiveProjectCaseStudy project={project} />
}

export default WorkDetail
