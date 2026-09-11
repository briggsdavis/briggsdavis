import { flushSync } from "react-dom"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"

const TRANSITION_DURATION = 720

const freezeSnapshotState = (sourceRoot: HTMLElement, cloneRoot: HTMLElement) => {
  const sourceElements = [sourceRoot, ...sourceRoot.querySelectorAll<HTMLElement>("*")]
  const cloneElements = [cloneRoot, ...cloneRoot.querySelectorAll<HTMLElement>("*")]
  const preservedProperties = [
    "opacity",
    "transform",
    "filter",
    "visibility",
    "background-color",
    "color",
    "border-color",
    "box-shadow",
  ]

  sourceElements.forEach((element, index) => {
    const clone = cloneElements[index]
    if (!clone) return

    const computed = window.getComputedStyle(element)
    clone.style.setProperty("animation", "none", "important")
    clone.style.setProperty("transition", "none", "important")
    preservedProperties.forEach((property) => {
      clone.style.setProperty(property, computed.getPropertyValue(property))
    })
  })

  const sourceCanvases = sourceRoot.querySelectorAll<HTMLCanvasElement>("canvas")
  const cloneCanvases = cloneRoot.querySelectorAll<HTMLCanvasElement>("canvas")
  sourceCanvases.forEach((canvas, index) => {
    const clone = cloneCanvases[index]
    if (!clone) return
    clone.width = canvas.width
    clone.height = canvas.height
    clone.getContext("2d")?.drawImage(canvas, 0, 0)
  })
}

const createRouteSnapshot = () => {
  const root = document.querySelector<HTMLElement>("#root")
  if (!root) return null

  const layer = document.createElement("div")
  const content = root.cloneNode(true) as HTMLElement
  freezeSnapshotState(root, content)
  content.removeAttribute("id")
  content
    .querySelectorAll("[data-route-transition-overlay], [data-project-morph-target]")
    .forEach((element) => element.removeAttribute("data-project-morph-target"))

  layer.className =
    "pointer-events-none fixed inset-0 z-[300] overflow-hidden bg-background will-change-[clip-path,filter,transform]"
  layer.setAttribute("aria-hidden", "true")
  layer.dataset.routeTransitionOverlay = ""
  content.className = "absolute top-0 left-0 w-full"
  content.style.transform = `translateY(-${window.scrollY}px)`
  layer.appendChild(content)
  document.body.appendChild(layer)
  void layer.offsetWidth
  return layer
}

const PageTransition = () => {
  const navigate = useNavigate()
  const active = useRef(false)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return

      if (active.current) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      const target = event.target
      const anchor = target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null
      if (!anchor || anchor.target || anchor.download || anchor.dataset.noPageTransition !== undefined)
        return

      const destination = new URL(anchor.href, window.location.href)
      if (
        destination.origin !== window.location.origin ||
        (destination.pathname === window.location.pathname &&
          destination.search === window.location.search)
      )
        return

      event.preventDefault()
      event.stopPropagation()
      const href = `${destination.pathname}${destination.search}${destination.hash}`

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        navigate(href)
        return
      }

      const snapshot = createRouteSnapshot()
      if (!snapshot) {
        navigate(href)
        return
      }

      active.current = true
      document.documentElement.classList.add("page-blur-enter")
      flushSync(() => navigate(href))
      window.scrollTo(0, 0)

      const animation = snapshot.animate(
        [
          { clipPath: "inset(0 0 0 0)", filter: "blur(0px)", transform: "translateX(0)" },
          {
            clipPath: "inset(0 24% 0 0)",
            filter: "blur(9px)",
            transform: "translateX(-1%)",
            offset: 0.42,
          },
          {
            clipPath: "inset(0 100% 0 0)",
            filter: "blur(22px)",
            transform: "translateX(-4%)",
          },
        ],
        {
          duration: TRANSITION_DURATION,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
        },
      )

      void animation.finished
        .catch(() => undefined)
        .finally(() => {
          snapshot.remove()
          active.current = false
          document.documentElement.classList.remove("page-blur-enter")
        })
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [navigate])

  return null
}

export default PageTransition
