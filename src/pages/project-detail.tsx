import { Link, useParams } from "react-router-dom"
import { routes } from "@/app/routes"
import { ProjectCaseStudy } from "@/components/project-case-study"
import { getProject } from "@/data/projects"
import { getMorphProjectId } from "@/lib/project-transition"

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const project = getProject(projectId)

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-semibold text-foreground">Project not found</h1>
          <Link
            to={routes.projects}
            className="inline-flex h-10 items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  return <ProjectCaseStudy project={project} isMorphTarget={getMorphProjectId() === project.id} />
}

export default ProjectDetail
