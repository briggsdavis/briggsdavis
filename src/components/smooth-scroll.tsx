import Lenis from "lenis"
import { useEffect } from "react"
import { RESET_SCROLL_TO_TOP_EVENT } from "@/lib/scroll-position"

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.125,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    const resetScrollToTop = () => {
      lenis.scrollTo(0, { immediate: true, force: true })
    }

    document.addEventListener(RESET_SCROLL_TO_TOP_EVENT, resetScrollToTop)
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener(RESET_SCROLL_TO_TOP_EVENT, resetScrollToTop)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
