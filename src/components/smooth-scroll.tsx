import Lenis from "lenis"
import { useEffect } from "react"
import { registerLenis, unregisterLenis } from "@/lib/lenis-store"

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    registerLenis(lenis)

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      unregisterLenis()
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
