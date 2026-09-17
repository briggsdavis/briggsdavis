import type { NavigateFunction } from "react-router"
import { routes } from "@/app/routes"

let morphNavigationActive = false

const MORPH_DURATION = 900
const PAGE_FADE_DURATION = 600

const canMorph = () =>
  window.innerWidth >= 1024 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches

const settleHoveredSource = async (source: HTMLImageElement) => {
  const scale = window.getComputedStyle(source).scale
  if (scale === "none" || scale === "1") return

  const animation = source.animate([{ scale }, { scale: "1" }], {
    duration: 300,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    fill: "forwards",
  })

  try {
    await animation.finished
  } catch {
    // A route interruption can cancel the settle without blocking navigation.
  }
}

const waitForTarget = (projectId: string) => {
  const selector = `[data-project-morph-target="${CSS.escape(projectId)}"]`
  const findTarget = () => document.querySelector<HTMLImageElement>(selector)
  const existingTarget = findTarget()
  if (existingTarget) return Promise.resolve(existingTarget)

  return new Promise<HTMLImageElement | null>((resolve) => {
    let timeoutId = 0
    const observer = new MutationObserver(() => {
      const target = findTarget()
      if (!target) return

      observer.disconnect()
      window.clearTimeout(timeoutId)
      resolve(target)
    })

    observer.observe(document.querySelector("#root") ?? document.body, {
      childList: true,
      subtree: true,
    })

    timeoutId = window.setTimeout(() => {
      observer.disconnect()
      resolve(findTarget())
    }, 1000)
  })
}

const finishMorph = (overlay: HTMLImageElement) => {
  document.documentElement.classList.remove("project-morph-active")
  overlay.remove()
  morphNavigationActive = false
  document.dispatchEvent(new Event("page-transition-complete"))

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  document.querySelectorAll<HTMLElement>("[data-project-morph-reveal]").forEach((element) => {
    element.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: PAGE_FADE_DURATION,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    })
  })
}

export const isProjectMorphNavigation = () => morphNavigationActive

export const openProjectWithMorph = async ({
  navigate,
  projectId,
  source,
}: {
  navigate: NavigateFunction
  projectId: string
  source: HTMLImageElement | null
}) => {
  if (morphNavigationActive) return

  const destination = routes.project(projectId)

  if (!source || !canMorph()) {
    await navigate(destination)
    return
  }

  await settleHoveredSource(source)

  const sourceRect = source.getBoundingClientRect()
  const overlay = source.cloneNode(false) as HTMLImageElement
  overlay.alt = ""
  overlay.className =
    "pointer-events-none fixed z-120 block max-w-none object-cover object-top will-change-[top,left,width,height]"
  Object.assign(overlay.style, {
    top: `${sourceRect.top}px`,
    left: `${sourceRect.left}px`,
    width: `${sourceRect.width}px`,
    height: `${sourceRect.height}px`,
  })

  morphNavigationActive = true
  document.documentElement.classList.add("project-morph-active")
  document.body.appendChild(overlay)

  try {
    await navigate(destination)
    const target = await waitForTarget(projectId)

    if (!target) {
      return
    }

    const targetRect = target.getBoundingClientRect()
    const animation = overlay.animate(
      [
        {
          top: `${sourceRect.top}px`,
          left: `${sourceRect.left}px`,
          width: `${sourceRect.width}px`,
          height: `${sourceRect.height}px`,
        },
        {
          top: `${targetRect.top}px`,
          left: `${targetRect.left}px`,
          width: `${targetRect.width}px`,
          height: `${targetRect.height}px`,
        },
      ],
      {
        duration: MORPH_DURATION,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        fill: "forwards",
      },
    )

    await animation.finished
  } finally {
    finishMorph(overlay)
  }
}
