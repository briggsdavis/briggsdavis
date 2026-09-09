import { usePaginatedQuery } from "convex/react"
import { Link, useLocation } from "react-router-dom"
import { routes } from "@/app/routes"
import { api } from "../../convex/_generated/api"
import DeleteProject from "../components/delete-project"

export default function AdminProjects() {
  const { state } = useLocation()
  const notice = typeof state?.notice === "string" ? state.notice : ""
  const { results, status, loadMore } = usePaginatedQuery(
    api.projects.adminList,
    {},
    { initialNumItems: 20 },
  )

  return (
    <section>
      <title>Projects | Briggs Davis</title>

      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Projects</h1>
          <p className="mt-4 text-muted-foreground">The studio’s work.</p>
        </div>
        <Link
          to={routes.adminNewProject}
          className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80"
        >
          New project
        </Link>
      </div>

      {notice ? (
        <p role="status" className="mb-6 text-sm text-muted-foreground">
          {notice}
        </p>
      ) : null}

      {status === "LoadingFirstPage" ? (
        <output className="block border-t border-border/40 py-10 text-sm text-muted-foreground">
          Loading projects...
        </output>
      ) : results.length === 0 ? (
        <p className="border-t border-border/40 py-12 text-muted-foreground">No projects yet.</p>
      ) : (
        <ul className="divide-y divide-border/40 border-y border-border/40">
          {results.map(({ _id, ...project }) => (
            <li key={_id} className="flex flex-wrap items-center gap-5 py-6 sm:gap-8">
              {project.coverUrl ? (
                <img
                  src={project.coverUrl}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-32 shrink-0 rounded-lg object-cover sm:w-44"
                />
              ) : (
                <div className="aspect-video w-32 shrink-0 rounded-lg bg-card sm:w-44" />
              )}

              <div className="min-w-0 flex-1 basis-40">
                <h2 className="truncate text-xl font-medium tracking-tight sm:text-2xl">
                  <Link
                    to={routes.adminEditProject(project.slug)}
                    className="underline-offset-4 hover:underline"
                  >
                    {project.title}
                  </Link>
                </h2>

                <Link
                  to={routes.project(project.slug)}
                  className="mt-1 block truncate text-sm text-muted-foreground hover:underline"
                >
                  /work/{project.slug}
                </Link>
              </div>

              {project.featured ? (
                <span className="rounded-full border border-border/40 px-3 py-1 text-xs">
                  Featured
                </span>
              ) : null}

              <DeleteProject id={_id} title={project.title} />
            </li>
          ))}
        </ul>
      )}

      {status === "CanLoadMore" || status === "LoadingMore" ? (
        <button
          type="button"
          onClick={() => loadMore(20)}
          disabled={status === "LoadingMore"}
          className="mt-8 rounded-full border border-border/40 px-6 py-3 text-sm transition-colors disabled:opacity-60"
        >
          {status === "LoadingMore" ? "Loading…" : "Load more"}
        </button>
      ) : null}
    </section>
  )
}
