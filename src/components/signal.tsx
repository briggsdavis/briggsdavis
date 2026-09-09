import { useEffect, useRef } from "react"

const lineCount = 72
const lines = Array.from({ length: lineCount }, (_, index) => ({
  offset: (index / lineCount) * 2 - 1,
  opacity: 0.3 + (index / lineCount) * 0.65,
}))

const Signal = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current!
    const surface = svg.parentElement!
    const paths = svg.querySelectorAll("path")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let elapsed = 0
    let previousTime: number | null = null
    const pointer = { x: 600, y: 215, strength: 0 }
    const target = { ...pointer }

    const movePointer = (event: PointerEvent) => {
      if (reducedMotion.matches || (event.pointerType === "touch" && event.buttons === 0)) return
      const transform = svg.getScreenCTM()
      if (!transform) return
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(transform.inverse())
      target.x = point.x
      target.y = point.y
      target.strength = 1
      if (pointer.strength === 0) {
        pointer.x = point.x
        pointer.y = point.y
      }
    }

    const releasePointer = () => {
      target.strength = 0
    }

    const pressPointer = (event: PointerEvent) => {
      if (reducedMotion.matches) return
      if (event.pointerType === "touch") surface.setPointerCapture(event.pointerId)
      movePointer(event)
    }

    const draw = () => {
      const position = 0.5 + Math.sin(elapsed * 0.28) * 0.28
      const breath = 1 + Math.sin(elapsed * 0.42) * 0.08

      paths.forEach((path, index) => {
        const { offset } = lines[index]
        let d = ""

        for (let x = 0; x <= 1200; x += 10) {
          const distance = x - (position * 650 + 280)
          const envelope = Math.exp(-(distance * distance) / 85000)
          const wave = Math.sin(x / 155 + offset * 2.8 - elapsed * 0.45) * 30
          const y = 250 + offset * 100 - envelope * Math.cos(offset * 1.4) * 143 * breath + wave
          const dx = pointer.x - x
          const dy = pointer.y - y
          const pull = Math.exp(-(dx * dx + dy * dy) / (180 * 180)) * pointer.strength * 0.3
          d += `${x === 0 ? "M" : "L"}${(x + dx * pull).toFixed(1)},${(y + dy * pull).toFixed(1)}`
        }

        path.setAttribute("d", d)
      })
    }

    const animate = (time: number) => {
      const delta = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05)
      elapsed += delta
      previousTime = time
      const ease = 1 - Math.exp(-delta * 8)
      pointer.x += (target.x - pointer.x) * ease
      pointer.y += (target.y - pointer.y) * ease
      pointer.strength += (target.strength - pointer.strength) * ease
      draw()
      frame = requestAnimationFrame(animate)
    }

    const syncMotion = () => {
      cancelAnimationFrame(frame)
      previousTime = null
      releasePointer()
      pointer.strength = 0
      draw()
      if (!reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(animate)
    }

    draw()
    syncMotion()
    reducedMotion.addEventListener("change", syncMotion)
    document.addEventListener("visibilitychange", syncMotion)
    surface.addEventListener("pointermove", movePointer)
    surface.addEventListener("pointerdown", pressPointer)
    surface.addEventListener("pointerup", releasePointer)
    surface.addEventListener("pointerleave", releasePointer)
    surface.addEventListener("pointercancel", releasePointer)
    surface.addEventListener("lostpointercapture", releasePointer)

    return () => {
      cancelAnimationFrame(frame)
      reducedMotion.removeEventListener("change", syncMotion)
      document.removeEventListener("visibilitychange", syncMotion)
      surface.removeEventListener("pointermove", movePointer)
      surface.removeEventListener("pointerdown", pressPointer)
      surface.removeEventListener("pointerup", releasePointer)
      surface.removeEventListener("pointerleave", releasePointer)
      surface.removeEventListener("pointercancel", releasePointer)
      surface.removeEventListener("lostpointercapture", releasePointer)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="relative h-[450px] w-full touch-pan-y overflow-hidden rounded-xl mask-x-from-120 sm:h-[600px]"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1200 430"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-y-0 -left-[35%] h-full w-[170%] sm:left-0 sm:w-full"
        fill="none"
        stroke="#254a38"
        strokeWidth="1"
      >
        {lines.map(({ offset, opacity }) => (
          <path key={offset} opacity={opacity} stroke={offset < 0 ? "#657560" : "#254a38"} />
        ))}
      </svg>
    </div>
  )
}

export default Signal
