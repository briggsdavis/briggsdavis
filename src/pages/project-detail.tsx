import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ProjectCaseStudy } from "@/components/project-case-study"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import { getMorphProjectId } from "@/lib/project-transition"

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projects.find((item) => item.id === projectId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-semibold text-foreground">Project not found</h1>
          <Button variant="outline" asChild>
            <Link to="/projects">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    )
  }

  return <ProjectCaseStudy project={project} isMorphTarget={getMorphProjectId() === project.id} />
}

export default ProjectDetail
