import Lenis from "lenis"
import { useLayoutEffect } from "react"
import { useLocation, useNavigation } from "react-router"

const SmoothScroll = () => {
  const { key } = useLocation()
  const { state } = useNavigation()

  // Dispose pending animation before React Router restores the destination position.
  useLayoutEffect(() => {
    if (state !== "idle") return
    const lenis = new Lenis({ autoRaf: true, duration: 1.125, allowNestedScroll: true })
    return () => lenis.destroy()
  }, [key, state])

  return null
}

export default SmoothScroll
