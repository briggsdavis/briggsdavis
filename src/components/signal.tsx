import { useEffect, useRef } from "react"

const lineCount = 72
const lines = Array.from({ length: lineCount }, (_, index) => ({
  offset: (index / lineCount) * 2 - 1,
  opacity: 0.3 + (index / lineCount) * 0.65,
}))

const Signal = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const paths = svgRef.current!.querySelectorAll("path")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let elapsed = 0
    let previousTime: number | null = null

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
          d += `${x === 0 ? "M" : "L"}${x},${y.toFixed(1)}`
        }

        path.setAttribute("d", d)
      })
    }

    const animate = (time: number) => {
      if (previousTime !== null) elapsed += Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time
      draw()
      frame = requestAnimationFrame(animate)
    }

    const syncMotion = () => {
      cancelAnimationFrame(frame)
      previousTime = null
      if (!reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(animate)
    }

    draw()
    syncMotion()
    reducedMotion.addEventListener("change", syncMotion)
    document.addEventListener("visibilitychange", syncMotion)

    return () => {
      cancelAnimationFrame(frame)
      reducedMotion.removeEventListener("change", syncMotion)
      document.removeEventListener("visibilitychange", syncMotion)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="relative h-[450px] w-full overflow-hidden rounded-xl mask-x-from-120 sm:h-[600px]"
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
