import { Plus } from "lucide-react"
import { useCallback, useId, useState, type MouseEvent } from "react"
import type { ProjectFeature } from "@/lib/project-features"

type GalleryImage = { id: string; url: string }

export default function ProjectFeatures({
  features,
  images,
  title,
}: {
  features: ProjectFeature[]
  images: GalleryImage[]
  title: string
}) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const sectionId = useId()
  const toggleFeature = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.dataset.featureIndex)
    setExpanded((current) => (current === index ? null : index))
  }, [])

  return (
    <section
      data-project-morph-reveal
      className="project-content-frame project-features"
      aria-labelledby={`${sectionId}-heading`}
    >
      <aside className="project-features-panel">
        <div className="w-full" data-no-text-reveal>
          <h2
            id={`${sectionId}-heading`}
            className="mb-8 text-sm font-medium tracking-[0.12em] uppercase"
          >
            Features
          </h2>
          {features.map((feature, index) => {
            const open = expanded === index
            const detailId = `${sectionId}-${index}-detail`
            const buttonId = `${sectionId}-${index}-button`
            return (
              <div
                key={feature.title}
                className="project-feature"
                data-open={open ? "" : undefined}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={detailId}
                    data-feature-index={index}
                    onClick={toggleFeature}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-left text-xl font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-xs font-normal text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {feature.title}
                    </span>
                    <Plus aria-hidden="true" size={18} className="project-feature-icon shrink-0" />
                  </button>
                </h3>
                <section
                  id={detailId}
                  aria-labelledby={buttonId}
                  aria-hidden={!open}
                  className="project-feature-details"
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="project-feature-copy pb-6 pl-8 text-base leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </section>
              </div>
            )
          })}
        </div>
      </aside>
      <div className="project-feature-gallery">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={`${title}, detail ${index + 1}`}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        ))}
      </div>
    </section>
  )
}
