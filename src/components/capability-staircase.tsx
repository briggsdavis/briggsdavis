import { useEffect, useMemo, useRef, useState } from "react"

const START_X = 4
const START_Y = 8
const END_X = 96
const END_Y = 92

const CapabilityStaircase = ({ items }: { items: readonly string[] }) => {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.25 },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  const geometry = useMemo(() => {
    const count = Math.max(items.length, 1)
    const run = (END_X - START_X) / count
    const drop = (END_Y - START_Y) / count
    const points: string[] = [`${START_X},${START_Y}`]
    const labels = items.map((item, index) => {
      const x = START_X + index * run
      const y = START_Y + index * drop
      points.push(`${x + run},${y}`)
      if (index < count - 1) points.push(`${x + run},${y + drop}`)
      return { item, x, y }
    })
    return { labels, points: points.join(" "), run }
  }, [items])

  return (
    <div ref={hostRef} className="relative h-184 overflow-hidden md:h-208">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          className={`text-foreground/55 [stroke-dasharray:1] [stroke-dashoffset:1] motion-reduce:[stroke-dashoffset:0] ${visible ? "motion-safe:animate-staircase-draw" : ""}`}
          points={geometry.points}
          pathLength="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {geometry.labels.map(({ item, x, y }, index) => (
        <div
          key={item}
          className={`absolute flex translate-y-[10px] items-end gap-2 pb-2 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 ${visible ? "motion-safe:animate-staircase-label-in" : ""}`}
          style={{
            left: `${x + geometry.run * 0.1}%`,
            top: `${Math.max(0, y - 7.5)}%`,
            width: `${geometry.run * 1.7}%`,
            animationDelay: `${180 + index * 145}ms`,
          }}
        >
          <span className="font-mono text-xs text-muted-foreground/45 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xs font-medium text-foreground">{item}</span>
        </div>
      ))}
    </div>
  )
}

export default CapabilityStaircase
