import { Link, useParams } from "react-router"
import { routes } from "@/app/routes"
import { ProjectCaseStudy } from "@/components/project-case-study"
import { getProject } from "@/data/projects"

const WorkDetail = () => {
  const { id } = useParams<{ id: string }>()
  const project = getProject(id)

  if (!project) {
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

  return <ProjectCaseStudy project={project} />
}

export default WorkDetail
