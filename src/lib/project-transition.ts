import { flushSync } from "react-dom"
import type { NavigateFunction } from "react-router-dom"
import { scrollToTop } from "@/lib/lenis-store"

let activeProjectId: string | null = null
let morphNavigationActive = false

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

const createRouteSnapshot = (source: HTMLImageElement) => {
  const root = document.querySelector<HTMLElement>("#root")
  if (!root) return null

  const layer = document.createElement("div")
  const content = root.cloneNode(true) as HTMLElement
  content.removeAttribute("id")
  layer.className = "project-route-snapshot"
  content.className = "project-route-snapshot-content"
  content.style.transform = `translateY(-${window.scrollY}px)`

  content
    .querySelectorAll("[data-site-navigation], [data-route-transition-overlay]")
    .forEach((el) => {
      el.remove()
    })

  const sourcePath = source.getAttribute("src")
  content.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
    if (image.getAttribute("src") === sourcePath) image.style.opacity = "0"
  })

  layer.appendChild(content)
  document.body.appendChild(layer)
  return layer
}

const finishMorph = (overlay: HTMLImageElement) => {
  overlay.remove()
  activeProjectId = null
  morphNavigationActive = false
  document.documentElement.classList.remove("project-morph-active")
}

export const getMorphProjectId = () => activeProjectId
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
  const destination = `/project/${projectId}`

  if (!source || !canMorph()) {
    navigate(destination)
    return
  }

  await settleHoveredSource(source)

  const sourceRect = source.getBoundingClientRect()
  const routeSnapshot = createRouteSnapshot(source)
  const overlay = source.cloneNode(false) as HTMLImageElement
  overlay.alt = ""
  overlay.className = "project-morph-overlay"
  Object.assign(overlay.style, {
    top: `${sourceRect.top}px`,
    left: `${sourceRect.left}px`,
    width: `${sourceRect.width}px`,
    height: `${sourceRect.height}px`,
  })

  activeProjectId = projectId
  morphNavigationActive = true
  document.documentElement.classList.add("project-morph-active")
  document.body.appendChild(overlay)

  if (routeSnapshot) {
    const fade = routeSnapshot.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 420,
      easing: "ease-out",
      fill: "forwards",
    })
    void fade.finished.finally(() => routeSnapshot.remove())
  }

  flushSync(() => navigate(destination))
  scrollToTop()
  const target = await waitForTarget(projectId)

  if (!target) {
    finishMorph(overlay)
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
      duration: 900,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
    },
  )

  try {
    await animation.finished
  } finally {
    finishMorph(overlay)
  }
}
