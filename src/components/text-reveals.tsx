import { useLayoutEffect } from "react"

const TITLE_SELECTOR = "h1, h2, h3, h4, h5, h6, [data-text-title]"
const BODY_SELECTOR = "p:not([data-no-text-reveal])"
const SKIP_SELECTOR =
  "[data-no-text-reveal], [data-site-navigation], button, input, textarea, select, option, label, [role='alert']"

const wrapWords = (element: HTMLElement) => {
  if (element.dataset.textRevealReady !== undefined || element.closest(SKIP_SELECTOR)) return

  const type = element.matches(TITLE_SELECTOR) ? "title" : "body"
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []

  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    if (node.textContent?.trim() && !node.parentElement?.closest(SKIP_SELECTOR))
      textNodes.push(node)
  }

  if (!textNodes.length) return

  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment()
    const parts = node.textContent?.split(/(\s+)/) ?? []

    parts.forEach((part) => {
      if (!part.trim()) {
        fragment.append(part)
        return
      }

      const clip = document.createElement("span")
      const word = document.createElement("span")
      clip.className = "text-reveal-clip"
      word.className = "text-reveal-word"
      word.textContent = part
      clip.appendChild(word)
      fragment.appendChild(clip)
    })

    node.replaceWith(fragment)
  })

  element.dataset.textRevealReady = type
  const words = [...element.querySelectorAll<HTMLElement>(".text-reveal-word")]
  const lineTops: number[] = []

  words.forEach((word) => {
    const top = Math.round(word.getBoundingClientRect().top)
    let line = lineTops.findIndex((lineTop) => Math.abs(lineTop - top) <= 2)
    if (line === -1) {
      lineTops.push(top)
      line = lineTops.length - 1
    }
    word.style.setProperty("--text-line", String(line))
  })
}

const TextReveals = () => {
  useLayoutEffect(() => {
    let frame = 0
    let transitionFinished =
      !document.documentElement.classList.contains("page-transition-active") &&
      !document.documentElement.classList.contains("project-morph-active")
    const observed = new Set<Element>()
    const pending = new Set<HTMLElement>()

    const reveal = (element: HTMLElement) => {
      if (transitionFinished) element.classList.add("text-reveal-visible")
      else pending.add(element)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          reveal(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    )

    const prepare = () => {
      const root = document.querySelector<HTMLElement>(".site-content")
      if (!root) return

      root
        .querySelectorAll<HTMLElement>(`${TITLE_SELECTOR}, ${BODY_SELECTOR}`)
        .forEach((element) => {
          if (element.closest("nav, [data-no-text-reveal]") || observed.has(element)) return
          wrapWords(element)
          if (element.dataset.textRevealReady === undefined) return
          observed.add(element)
          observer.observe(element)
        })
    }

    const onTransitionComplete = () => {
      transitionFinished = true
      pending.forEach((element) => element.classList.add("text-reveal-visible"))
      pending.clear()
    }

    document.addEventListener("page-transition-complete", onTransitionComplete)
    prepare()

    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(prepare)
    })
    const root = document.querySelector(".site-content")
    if (root) mutations.observe(root, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(frame)
      mutations.disconnect()
      observer.disconnect()
      document.removeEventListener("page-transition-complete", onTransitionComplete)
    }
  }, [])

  return null
}

export default TextReveals
