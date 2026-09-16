import { useEffect, useRef } from "react"

type ReactiveFieldProps = {
  mode: "cta" | "footer"
  active?: boolean
}

const ReactiveField = ({ mode, active = true }: ReactiveFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const surface = canvas?.parentElement
    const context = canvas?.getContext("2d")
    if (!canvas || !surface || !context) return
    const interactionSurface = mode === "footer" ? surface.parentElement : surface
    if (!interactionSurface) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, pull: 0, targetPull: 0 }
    let width = 1
    let height = 1
    let elapsed = 0
    let previous: number | null = null
    let lastDraw = 0
    let frame = 0

    const resize = () => {
      const bounds = surface.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.35)
      width = Math.max(bounds.width, 1)
      height = Math.max(bounds.height, 1)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const move = (event: PointerEvent) => {
      if (reducedMotion.matches || (event.pointerType === "touch" && event.buttons === 0)) return
      const bounds = surface.getBoundingClientRect()
      pointer.tx = (event.clientX - bounds.left) / bounds.width
      pointer.ty = (event.clientY - bounds.top) / bounds.height
      pointer.targetPull = 1
    }

    const leave = () => {
      pointer.tx = 0.5
      pointer.ty = 0.5
      pointer.targetPull = 0
    }

    const drawCta = () => {
      const cx = width * (0.5 + (pointer.x - 0.5) * 0.035 * pointer.pull)
      const cy = height * (0.5 + (pointer.y - 0.5) * 0.035 * pointer.pull)
      const size = Math.min(width, height)

      for (let ring = 0; ring < 12; ring += 1) {
        const radius = size * (0.13 + ring * 0.023)
        context.beginPath()
        for (let point = 0; point <= 72; point += 1) {
          const angle = (point / 72) * Math.PI * 2
          const pulse = Math.sin(angle * 3 + elapsed * 0.45 + ring * 0.22) * size * 0.018
          const pinch = Math.cos(angle * 2 - elapsed * 0.22) * size * 0.035
          const x = cx + Math.cos(angle) * (radius + pulse) + Math.sin(angle) * pinch
          const y = cy + Math.sin(angle) * (radius * 0.72 + pulse) + Math.cos(angle) * pinch * 0.45
          if (point === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.globalAlpha = 0.16 + ring * 0.036
        context.stroke()
      }

      for (let dot = 0; dot < 7; dot += 1) {
        const angle = elapsed * (0.08 + dot * 0.006) + dot * 0.9
        const radius = size * (0.25 + (dot % 3) * 0.065)
        const x = cx + Math.cos(angle) * radius + (pointer.x - 0.5) * size * 0.05 * pointer.pull
        const y =
          cy + Math.sin(angle) * radius * 0.65 + (pointer.y - 0.5) * size * 0.035 * pointer.pull
        context.globalAlpha = 0.25 + dot * 0.055
        context.beginPath()
        context.arc(x, y, 2 + (dot % 3) * 1.25, 0, Math.PI * 2)
        context.fill()
      }
    }

    const drawFooter = () => {
      const lines = 22
      for (let line = 0; line < lines; line += 1) {
        context.beginPath()
        for (let point = 0; point <= 90; point += 1) {
          const progress = point / 90
          const baseY = height * (0.15 + (line / (lines - 1)) * 0.7)
          const dx = progress * width - pointer.x * width
          const influence = Math.exp(-(dx * dx) / (width * width * 0.045)) * pointer.pull
          const wave =
            Math.sin(progress * Math.PI * 3 + line * 0.24 + elapsed * 0.18) * height * 0.018
          const lift = (pointer.y * height - baseY) * influence * 0.11
          const x = progress * width
          const y = baseY + wave + lift
          if (point === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.globalAlpha = 0.035 + line * 0.002
        context.stroke()
      }
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.strokeStyle = mode === "cta" ? "#173d2e" : "#0d2f22"
      context.fillStyle = context.strokeStyle
      context.lineWidth = 1
      context.lineCap = "round"
      if (mode === "cta") drawCta()
      else drawFooter()
      context.globalAlpha = 1
    }

    const animate = (time: number) => {
      const delta = previous === null ? 0 : Math.min((time - previous) / 1000, 0.05)
      previous = time
      elapsed += delta
      const ease = 1 - Math.exp(-delta * 2.15)
      pointer.x += (pointer.tx - pointer.x) * ease
      pointer.y += (pointer.ty - pointer.y) * ease
      pointer.pull += (pointer.targetPull - pointer.pull) * ease
      if (time - lastDraw >= 32) {
        draw()
        lastDraw = time
      }
      frame = requestAnimationFrame(animate)
    }

    const sync = () => {
      cancelAnimationFrame(frame)
      previous = null
      lastDraw = 0
      resize()
      draw()
      if (active && !reducedMotion.matches && !document.hidden)
        frame = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(sync)
    resizeObserver.observe(surface)
    reducedMotion.addEventListener("change", sync)
    document.addEventListener("visibilitychange", sync)
    interactionSurface.addEventListener("pointermove", move)
    interactionSurface.addEventListener("pointerleave", leave)
    sync()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      reducedMotion.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", sync)
      interactionSurface.removeEventListener("pointermove", move)
      interactionSurface.removeEventListener("pointerleave", leave)
    }
  }, [active, mode])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-pan-y" />
}

export default ReactiveField
