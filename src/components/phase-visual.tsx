import { useEffect, useRef } from "react"

type PhaseVisualProps = {
  variant: "discovery" | "prototype" | "revision" | "launch"
  color: string
  active: boolean
}

const PhaseVisual = ({ variant, color, active }: PhaseVisualProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const surface = canvas?.parentElement
    const context = canvas?.getContext("2d")
    if (!canvas || !surface || !context) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, strength: 0, target: 0 }
    let width = 1
    let height = 1
    let elapsed = 0
    let previousTime: number | null = null
    let frame = 0

    const resize = () => {
      const bounds = surface.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(bounds.width, 1)
      height = Math.max(bounds.height, 1)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const movePointer = (event: PointerEvent) => {
      if (reducedMotion.matches || (event.pointerType === "touch" && event.buttons === 0)) return
      const bounds = surface.getBoundingClientRect()
      pointer.targetX = (event.clientX - bounds.left) / bounds.width
      pointer.targetY = (event.clientY - bounds.top) / bounds.height
      pointer.target = 1
    }

    const releasePointer = () => {
      pointer.target = 0
    }

    const warp = (x: number, y: number, force = 0.18) => {
      const targetX = pointer.x * width
      const targetY = pointer.y * height
      const dx = targetX - x
      const dy = targetY - y
      const radius = Math.min(width, height) * 0.35
      const pull = Math.exp(-(dx * dx + dy * dy) / (radius * radius)) * pointer.strength * force
      return [x + dx * pull, y + dy * pull] as const
    }

    const drawDiscovery = () => {
      const centerX = width * 0.5
      const centerY = height * 0.5
      const maxRadius = Math.min(width, height) * 0.4
      for (let ring = 1; ring <= 14; ring += 1) {
        context.beginPath()
        const radius = (ring / 14) * maxRadius
        for (let point = 0; point <= 96; point += 1) {
          const angle = (point / 96) * Math.PI * 2
          const ripple = Math.sin(angle * 3 + elapsed * 0.7 + ring * 0.5) * (4 + ring * 0.15)
          const [x, y] = warp(
            centerX + Math.cos(angle) * (radius + ripple),
            centerY + Math.sin(angle) * (radius * 0.7 + ripple),
            0.3,
          )
          if (point === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.globalAlpha = 0.13 + ring * 0.035
        context.stroke()
      }
    }

    const drawPrototype = () => {
      const columns = 8
      const rows = 6
      const gap = Math.min(width / columns, height / rows) * 0.18
      const cellWidth = (width * 0.75) / columns
      const cellHeight = (height * 0.68) / rows
      const originX = (width - cellWidth * columns) / 2
      const originY = (height - cellHeight * rows) / 2

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = originX + column * cellWidth + cellWidth / 2
          const y = originY + row * cellHeight + cellHeight / 2
          const dx = x - pointer.x * width
          const dy = y - pointer.y * height
          const influence = Math.exp(-(dx * dx + dy * dy) / (Math.min(width, height) ** 2 * 0.1))
          const drift = Math.sin(elapsed * 0.55 + row * 0.8 + column * 0.45) * 2
          context.save()
          context.translate(x + dx * influence * pointer.strength * 0.12, y + dy * influence * pointer.strength * 0.12)
          context.rotate(influence * pointer.strength * 0.16 + drift * 0.005)
          context.globalAlpha = 0.12 + ((row + column) % 4) * 0.11
          context.strokeRect(
            -cellWidth / 2 + gap,
            -cellHeight / 2 + gap,
            cellWidth - gap * 2,
            cellHeight - gap * 2,
          )
          if ((row + column) % 5 === 0) {
            context.globalAlpha *= 0.24
            context.fillRect(
              -cellWidth / 2 + gap,
              -cellHeight / 2 + gap,
              cellWidth - gap * 2,
              cellHeight - gap * 2,
            )
          }
          context.restore()
        }
      }
    }

    const drawRevision = () => {
      for (let line = 0; line < 34; line += 1) {
        const offset = (line / 33 - 0.5) * height * 0.52
        context.beginPath()
        for (let point = 0; point <= 120; point += 1) {
          const progress = point / 120
          const angle = progress * Math.PI * 2
          const radiusX = width * (0.21 + line * 0.0032)
          const radiusY = height * (0.18 + line * 0.002)
          const rotation = elapsed * 0.08 + line * 0.018
          const rawX = Math.cos(angle + rotation) * radiusX
          const rawY = Math.sin(angle * 2 - elapsed * 0.22) * radiusY + offset * 0.28
          const [x, y] = warp(width * 0.5 + rawX, height * 0.5 + rawY, 0.26)
          if (point === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.globalAlpha = 0.12 + line * 0.014
        context.stroke()
      }
    }

    const drawLaunch = () => {
      const streams = 32
      for (let stream = 0; stream < streams; stream += 1) {
        const spread = (stream / (streams - 1) - 0.5) * width * 0.7
        context.beginPath()
        for (let point = 0; point <= 70; point += 1) {
          const progress = point / 70
          const taper = 1 - progress
          const wave = Math.sin(progress * 7 + elapsed * 0.7 + stream * 0.35) * 12 * taper
          const [x, y] = warp(
            width * 0.5 + spread * taper + wave,
            height * 0.87 - progress * height * 0.74,
            0.2,
          )
          if (point === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.globalAlpha = 0.12 + (stream / streams) * 0.45
        context.stroke()
      }

      for (let dot = 0; dot < 20; dot += 1) {
        const orbit = elapsed * 0.16 + dot * 2.4
        const radius = Math.min(width, height) * (0.15 + (dot % 7) * 0.035)
        const [x, y] = warp(
          width * 0.5 + Math.cos(orbit) * radius,
          height * 0.35 + Math.sin(orbit * 1.3) * radius * 0.55,
          0.24,
        )
        context.globalAlpha = 0.18 + (dot % 5) * 0.11
        context.beginPath()
        context.arc(x, y, 1.5 + (dot % 3), 0, Math.PI * 2)
        context.fill()
      }
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.strokeStyle = color
      context.fillStyle = color
      context.lineWidth = 1
      context.lineCap = "round"
      context.lineJoin = "round"
      context.globalAlpha = 1

      if (variant === "discovery") drawDiscovery()
      if (variant === "prototype") drawPrototype()
      if (variant === "revision") drawRevision()
      if (variant === "launch") drawLaunch()
      context.globalAlpha = 1
    }

    const animate = (time: number) => {
      const delta = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time
      elapsed += delta
      const ease = 1 - Math.exp(-delta * 8)
      pointer.x += (pointer.targetX - pointer.x) * ease
      pointer.y += (pointer.targetY - pointer.y) * ease
      pointer.strength += (pointer.target - pointer.strength) * ease
      draw()
      frame = requestAnimationFrame(animate)
    }

    const syncMotion = () => {
      cancelAnimationFrame(frame)
      previousTime = null
      releasePointer()
      resize()
      draw()
      if (active && !reducedMotion.matches && !document.hidden) {
        frame = requestAnimationFrame(animate)
      }
    }

    const resizeObserver = new ResizeObserver(syncMotion)
    resizeObserver.observe(surface)
    reducedMotion.addEventListener("change", syncMotion)
    document.addEventListener("visibilitychange", syncMotion)
    surface.addEventListener("pointermove", movePointer)
    surface.addEventListener("pointerdown", movePointer)
    surface.addEventListener("pointerleave", releasePointer)
    surface.addEventListener("pointerup", releasePointer)
    syncMotion()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      reducedMotion.removeEventListener("change", syncMotion)
      document.removeEventListener("visibilitychange", syncMotion)
      surface.removeEventListener("pointermove", movePointer)
      surface.removeEventListener("pointerdown", movePointer)
      surface.removeEventListener("pointerleave", releasePointer)
      surface.removeEventListener("pointerup", releasePointer)
    }
  }, [active, color, variant])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-pan-y" />
}

export default PhaseVisual
