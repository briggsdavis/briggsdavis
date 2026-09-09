import { useEffect, useRef, useState } from "react"
import { canUseNavigationRipples, NavigationRipples } from "@/lib/navigation-ripples"

type NavigationRipplePanelProps = {
  active: boolean
}

export const NavigationRipplePanel = ({ active }: NavigationRipplePanelProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ripplesRef = useRef<NavigationRipples | null>(null)
  const stopTimeoutRef = useRef<number | null>(null)
  const dropTimeoutRef = useRef<number | null>(null)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (
      !canvas ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !canUseNavigationRipples()
    ) {
      setSupported(false)
      return
    }

    try {
      ripplesRef.current = new NavigationRipples(canvas, {
        resolution: window.matchMedia("(max-width: 640px)").matches ? 192 : 256,
        dropRadius: 26,
        perturbance: 0.052,
      })
    } catch {
      setSupported(false)
    }

    return () => {
      if (stopTimeoutRef.current) window.clearTimeout(stopTimeoutRef.current)
      if (dropTimeoutRef.current) window.clearTimeout(dropTimeoutRef.current)
      ripplesRef.current?.destroy()
      ripplesRef.current = null
    }
  }, [])

  useEffect(() => {
    const ripples = ripplesRef.current
    if (!ripples) return

    if (stopTimeoutRef.current) {
      window.clearTimeout(stopTimeoutRef.current)
      stopTimeoutRef.current = null
    }

    if (active) {
      ripples.start()
      dropTimeoutRef.current = window.setTimeout(() => {
        const canvas = canvasRef.current
        if (!canvas || !ripplesRef.current) return

        ripples.drop(canvas.clientWidth * 0.42, canvas.clientHeight * 0.5, 64, 0.2)
      }, 220)
    } else {
      stopTimeoutRef.current = window.setTimeout(() => ripples.stop(), 900)
    }
  }, [active])

  return (
    <span
      aria-hidden="true"
      data-ripple-supported={supported}
      className={`absolute inset-0 block origin-center opacity-100 will-change-[filter,scale] [transition:filter_700ms_ease,scale_700ms_cubic-bezier(0.76,0,0.24,1)] motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:blur-none motion-reduce:brightness-100 motion-reduce:transition-none ${
        active
          ? "scale-100 blur-none brightness-100"
          : "scale-[1.055] blur-[20px] brightness-[0.76]"
      }`}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 size-full touch-none ${supported ? "" : "hidden"}`}
      />
      <span
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_38%,rgb(30_27_25_/_0.13),transparent_11%),radial-gradient(circle_at_68%_61%,rgb(97_93_90_/_0.1),transparent_18%),repeating-radial-gradient(ellipse_at_54%_46%,rgb(65_61_58_/_0.05)_0_1px,transparent_2px_19px),linear-gradient(135deg,#fcfcfc_0%,#eeedeb_52%,#e4e3e1_100%)] ${
          supported ? "opacity-0" : "opacity-100"
        }`}
      />
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255_/_0.18),transparent_18%),radial-gradient(circle_at_50%_48%,transparent_42%,rgb(255_255_255_/_0.28)_100%)]" />
    </span>
  )
}
