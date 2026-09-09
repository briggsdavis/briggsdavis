import { ShieldCheck } from "lucide-react"
import { memo, useEffect, useRef, useState } from "react"

const toRad = (d: number) => (d * Math.PI) / 180

// ─── 01 Mobile Friendly Design ────────────────────────────────────────────
export const MobileVisual = memo(({ isActive }: { isActive: boolean }) => (
  <div className="flex h-full items-center justify-center">
    {/* iPhone shell */}
    <div className="relative h-50.5 w-26 overflow-hidden rounded-[22px] border border-black/20 bg-white/30">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 z-10 h-4 w-14 -translate-x-1/2 rounded-b-2xl bg-white/60" />
      {/* Scrolling site content */}
      <div className="absolute inset-x-0 top-3.5 bottom-0 overflow-hidden">
        <div
          style={{
            animation: isActive ? "svc-phone-scroll 4.5s ease-in-out infinite" : "none",
          }}
        >
          <div className="mx-2 mt-2 h-16 rounded-md bg-black/8" />
          <div className="mt-2 space-y-1 px-2">
            <div className="h-2 w-4/5 rounded bg-black/20" />
            <div className="h-2 w-3/5 rounded bg-black/10" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1 px-2">
            <div className="h-10 rounded bg-black/6" />
            <div className="h-10 rounded bg-black/6" />
          </div>
          <div className="mt-3 space-y-1 px-2">
            <div className="h-2 w-full rounded bg-black/15" />
            <div className="h-2 w-5/6 rounded bg-black/10" />
            <div className="h-2 w-4/5 rounded bg-black/8" />
          </div>
          <div className="mx-2 mt-3 h-14 rounded-md bg-black/6" />
          <div className="mt-3 space-y-1 px-2">
            <div className="h-2 w-full rounded bg-black/15" />
            <div className="h-2 w-3/4 rounded bg-black/10" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1 px-2">
            <div className="h-10 rounded bg-black/6" />
            <div className="h-10 rounded bg-black/6" />
          </div>
          <div className="mt-3 space-y-1 px-2">
            <div className="h-2 w-full rounded bg-black/15" />
            <div className="h-2 w-2/3 rounded bg-black/10" />
          </div>
        </div>
      </div>
      {/* Home bar */}
      <div className="absolute bottom-1.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-black/20" />
    </div>
  </div>
))

// ─── 02 Search Engine Optimisation ────────────────────────────────────────
export const SEOVisual = memo(({ isActive }: { isActive: boolean }) => {
  const [rank, setRank] = useState(7)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (!isActive && rank !== 7) setRank(7)

  useEffect(() => {
    if (!isActive) return
    let r = 7
    const tick = () => {
      r -= 1
      setRank(r)
      if (r > 1) {
        timerRef.current = setTimeout(tick, 420)
      } else {
        timerRef.current = setTimeout(() => {
          setRank(7)
          timerRef.current = setTimeout(() => {
            r = 7
            tick()
          }, 600)
        }, 2800)
      }
    }
    timerRef.current = setTimeout(tick, 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isActive])

  const pct = Math.round(((8 - rank) / 7) * 100)

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <p className="font-mono text-xs tracking-widest text-black/30 uppercase">Search Position</p>
      <p
        className={`text-6xl font-semibold tabular-nums transition-all duration-300 ${rank === 1 ? "text-black/90" : "text-black/40"}`}
      >
        #{rank}
      </p>
      <div className="relative h-px w-44 rounded bg-black/10">
        <div
          className="absolute inset-y-0 left-0 rounded bg-black/60 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="font-mono text-xs text-black/20">yourbrand.com</p>
    </div>
  )
})

// ─── 03 Rapid Development ─────────────────────────────────────────────────
const CODE_LINES = [
  { text: "$ git commit -m 'final polish'", className: "text-black/55" },
  { text: "$ npm run build", className: "text-black/55" },
  { text: "> compiled in 0.8s ✓", className: "text-black/40" },
  { text: "$ deploy --prod", className: "text-black/55" },
  { text: "✓ Live at yourbrand.com", color: "rgba(134,239,172,0.8)" },
]

export const RapidDevVisual = memo(({ isActive }: { isActive: boolean }) => {
  const [visible, setVisible] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (!isActive && visible !== 0) setVisible(0)

  useEffect(() => {
    if (!isActive) return
    const show = (i: number) => {
      setVisible(i + 1)
      if (i < CODE_LINES.length - 1) {
        timerRef.current = setTimeout(() => show(i + 1), 480)
      } else {
        timerRef.current = setTimeout(() => {
          setVisible(0)
          timerRef.current = setTimeout(() => show(0), 400)
        }, 2600)
      }
    }
    timerRef.current = setTimeout(() => show(0), 200)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isActive])

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="overflow-hidden rounded-lg border border-black/10 bg-white/60 p-3 font-mono"
        style={{ width: 245, height: 173 }}
      >
        <div className="mb-2.5 flex gap-1.5">
          {["close", "minimize", "maximize"].map((control) => (
            <div key={control} className="h-2 w-2 rounded-full bg-black/15" />
          ))}
        </div>
        <div className="space-y-2">
          {CODE_LINES.map((line, i) => (
            <p
              key={line.text}
              className={`text-xs transition-opacity duration-300 ${line.className ?? ""} ${i < visible ? "opacity-100" : "opacity-0"}`}
              style={{ color: line.color }}
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
})

// ─── 04 Content Management Systems ────────────────────────────────────────
const CMS_TITLES = ["Our Story", "Why Choose Us", "Latest Projects", "Meet the Team"]

export const CMSVisual = memo(({ isActive }: { isActive: boolean }) => {
  const [idx, setIdx] = useState(0)
  const [typing, setTyping] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  if (!isActive && (idx !== 0 || typing)) {
    setIdx(0)
    setTyping(false)
  }

  useEffect(() => {
    if (!isActive) return
    let transitionTimer: ReturnType<typeof setTimeout>
    timerRef.current = setInterval(() => {
      setTyping(true)
      transitionTimer = setTimeout(() => {
        setIdx((i) => (i + 1) % CMS_TITLES.length)
        setTyping(false)
      }, 380)
    }, 2000)
    return () => {
      clearTimeout(transitionTimer)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive])

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className="overflow-hidden rounded-lg border border-black/10 bg-white/40"
        style={{ width: 245, height: 173 }}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-black/10 px-3 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-black/25" />
          <span className="font-mono text-xs tracking-widest text-black/25 uppercase">
            Content Editor
          </span>
          <div className="ml-auto flex h-4 w-8 items-center justify-center rounded-sm border border-black/15 font-mono text-xs text-black/30">
            Edit
          </div>
        </div>
        {/* Body */}
        <div className="space-y-2 p-3">
          <div
            className={`border-b pb-1 text-xs font-semibold text-black transition-opacity duration-200 ${
              typing ? "border-black/40 opacity-40" : "border-transparent"
            }`}
          >
            {CMS_TITLES[idx]}
            {typing && (
              <span
                className="ml-0.5 inline-block h-3 w-px bg-black align-middle"
                style={{ animation: "svc-blink 0.55s step-end infinite" }}
              />
            )}
          </div>
          <div className="space-y-1">
            {["w-full", "w-4/5", "w-7/10"].map((width) => (
              <div key={width} className={`h-1.5 rounded bg-black/8 ${width}`} />
            ))}
          </div>
          <div className="mt-1 flex h-10 items-center justify-center rounded bg-black/5">
            <span className="font-mono text-xs text-black/15">[ image ]</span>
          </div>
        </div>
      </div>
    </div>
  )
})

// ─── 05 Ongoing Maintenance ───────────────────────────────────────────────
export const MaintenanceVisual = memo(({ isActive }: { isActive: boolean }) => (
  <div className="flex h-full items-center justify-center">
    <div
      className="relative overflow-hidden rounded-lg border border-black/10 bg-white/40"
      style={{ width: 245, height: 144 }}
    >
      <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
        <div
          className="h-1.5 w-1.5 rounded-full bg-green-400"
          style={{ animation: isActive ? "svc-pulse-dot 2s ease-in-out infinite" : "none" }}
        />
        <span className="font-mono text-xs tracking-widest text-black/30 uppercase">
          Uptime 100%
        </span>
      </div>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 204 120"
        preserveAspectRatio="none"
      >
        {/* dim background trace */}
        <polyline
          points="0,72 28,72 44,72 52,32 60,92 68,52 78,72 110,72 128,72 144,22 154,102 162,72 204,72"
          fill="none"
          stroke="black"
          strokeWidth="0.8"
          strokeOpacity="0.08"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* animated bright segment */}
        <polyline
          points="0,72 28,72 44,72 52,32 60,92 68,52 78,72 110,72 128,72 144,22 154,102 162,72 204,72"
          fill="none"
          stroke="black"
          strokeWidth="1.4"
          strokeOpacity="0.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="600"
          style={{
            strokeDasharray: "120 480",
            strokeDashoffset: 0,
            animation: isActive ? "svc-heartbeat 2.6s linear infinite" : "none",
          }}
        />
      </svg>
    </div>
  </div>
))

// ─── 06 Multi-Language Support ────────────────────────────────────────────
const LANGS = [
  { word: "Hello", code: "EN" },
  { word: "Bonjour", code: "FR" },
  { word: "Hola", code: "ES" },
  { word: "مرحبا", code: "AR" },
  { word: "こんにちは", code: "JA" },
  { word: "Ciao", code: "IT" },
]

export const LanguageVisual = memo(({ isActive }: { isActive: boolean }) => {
  const [idx, setIdx] = useState(0)
  const [show, setShow] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  if (!isActive && (idx !== 0 || !show)) {
    setIdx(0)
    setShow(true)
  }

  useEffect(() => {
    if (!isActive) return
    let transitionTimer: ReturnType<typeof setTimeout>
    timerRef.current = setInterval(() => {
      setShow(false)
      transitionTimer = setTimeout(() => {
        setIdx((i) => (i + 1) % LANGS.length)
        setShow(true)
      }, 340)
    }, 1900)
    return () => {
      clearTimeout(transitionTimer)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive])

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <p
          className={`text-5xl font-light text-black transition-all duration-300 ${show ? "translate-y-0 opacity-100" : "translate-y-1.75 opacity-0"}`}
        >
          {LANGS[idx].word}
        </p>
        <p
          className={`mt-2 font-mono text-xs tracking-widest text-black/30 uppercase transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}
        >
          {LANGS[idx].code}
        </p>
      </div>
    </div>
  )
})

// ─── 07 Online Payments ───────────────────────────────────────────────────
export const PaymentsVisual = memo(({ isActive }: { isActive: boolean }) => (
  <div className="flex h-full flex-col items-center justify-center gap-3">
    {/* Card */}
    <div
      className="relative h-27 w-44.5 rounded-xl border border-black/20 bg-gradient-to-br from-black/12 to-black/4 px-4 py-3 transform-3d"
      style={{
        animation: isActive ? "svc-card-flip 5.5s ease-in-out infinite" : "none",
      }}
    >
      <div className="mb-3 h-4 w-7 rounded-sm bg-black/30" />
      <div className="space-y-1">
        <div className="h-1.5 w-full rounded bg-black/10" />
        <div className="flex justify-between">
          <div className="h-1.5 w-16 rounded bg-black/10" />
          <div className="h-1.5 w-8 rounded bg-black/10" />
        </div>
      </div>
      {/* Shimmer */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-black/4 to-transparent" />
    </div>
    {/* Confirmed badge */}
    <div
      className="flex items-center gap-2 rounded-full border border-black/15 px-3 py-1.5"
      style={{ animation: isActive ? "svc-check-in 5.5s ease-in-out infinite" : "none" }}
    >
      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-green-400/50">
        <div className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
      </div>
      <span className="font-mono text-xs text-black/45">Payment Confirmed</span>
    </div>
  </div>
))

// ─── 08 Unique Solutions ─────────────────────────────────────────────────
export const UniqueVisual = memo(({ isActive }: { isActive: boolean }) => (
  <div className="flex h-full items-center justify-center">
    <div
      className="size-23 border border-black/25 bg-black/5"
      style={{
        boxShadow: isActive ? "0 0 28px rgba(0,0,0,0.08)" : "none",
        animation: isActive ? "svc-morph 7s ease-in-out infinite" : "none",
        transition: "box-shadow 0.6s ease",
      }}
    />
  </div>
))

// ─── 09 Flawless Performance ─────────────────────────────────────────────
export const PerformanceVisual = memo(({ isActive }: { isActive: boolean }) => {
  const [score, setScore] = useState(0)
  const handleRef = useRef<ReturnType<typeof setInterval> | null>(null)

  if (!isActive && score !== 0) setScore(0)

  useEffect(() => {
    if (!isActive) return
    let s = 0
    const run = () => {
      handleRef.current = setInterval(() => {
        s += 1
        setScore(s)
        if (s >= 100) {
          if (handleRef.current) clearInterval(handleRef.current)
          // pause at 100 (green), then reset and loop
          handleRef.current = setTimeout(() => {
            setScore(0)
            s = 0
            run()
          }, 2000) as unknown as ReturnType<typeof setInterval>
        }
      }, 42)
    }
    run()
    return () => {
      if (handleRef.current) clearInterval(handleRef.current)
    }
  }, [isActive])

  const complete = score === 100
  const R = 44
  const circumference = 2 * Math.PI * R
  const arc = circumference * 0.76
  const offset = arc - (score / 100) * arc
  const strokeColor = complete ? "rgb(74,222,128)" : "black"
  const textColor = complete ? "rgb(74,222,128)" : "black"

  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative">
        <svg width="168" height="168" viewBox="0 0 120 120">
          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeOpacity="0.08"
            strokeDasharray={`${arc} ${circumference - arc}`}
            strokeLinecap="round"
            transform="rotate(122 60 60)"
          />
          {/* Progress */}
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke={strokeColor}
            strokeWidth="3"
            strokeOpacity={complete ? 1 : 0.7}
            strokeDasharray={`${arc} ${circumference - arc}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(122 60 60)"
            style={{ transition: "stroke-dashoffset 0.04s linear, stroke 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-semibold tabular-nums transition-colors duration-500"
            style={{ color: textColor }}
          >
            {score}
          </span>
          <span className="font-mono text-xs tracking-widest text-black/25 uppercase">Score</span>
        </div>
      </div>
    </div>
  )
})

// ─── 10 Client Input ──────────────────────────────────────────────────────
const CHAT = [
  { side: "right", text: "Here's the first concept." },
  { side: "left", text: "Love it. Can we go darker?" },
  { side: "right", text: "Done. Pushed live." },
]

export const ClientInputVisual = memo(({ isActive }: { isActive: boolean }) => {
  const [count, setCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (!isActive && count !== 0) setCount(0)

  useEffect(() => {
    if (!isActive) return
    const show = (i: number) => {
      setCount(i + 1)
      if (i < CHAT.length - 1) {
        timerRef.current = setTimeout(() => show(i + 1), 1100)
      } else {
        timerRef.current = setTimeout(() => {
          setCount(0)
          timerRef.current = setTimeout(() => show(0), 450)
        }, 3200)
      }
    }
    timerRef.current = setTimeout(() => show(0), 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isActive])

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-64 space-y-2">
        {CHAT.map((msg, i) => (
          <div
            key={msg.text}
            className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"} ${i < count ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}`}
            style={{
              transition: "opacity 0.35s ease, translate 0.35s ease",
              transitionDelay: `${i * 30}ms`,
            }}
          >
            <div
              className={`max-w-[72%] rounded-xl px-3 py-1.5 text-xs ${
                msg.side === "right"
                  ? "rounded-tr-sm bg-black/15 text-black/80"
                  : "rounded-tl-sm border border-black/10 bg-black/5 text-black/50"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

// ─── 11 Generative Engine Optimisation ───────────────────────────────────
const GEO_NODES = [
  { x: 102, y: 32, label: "AI" },
  { x: 38, y: 82, label: "LLM" },
  { x: 166, y: 82, label: "GPT" },
  { x: 60, y: 152, label: "SEO" },
  { x: 144, y: 152, label: "SEM" },
  { x: 102, y: 108, label: "You" },
]
const GEO_EDGES = [
  [0, 1],
  [0, 2],
  [0, 5],
  [1, 3],
  [1, 5],
  [2, 4],
  [2, 5],
  [3, 5],
  [4, 5],
]

export const GEOVisual = memo(({ isActive }: { isActive: boolean }) => {
  const [activeEdge, setActiveEdge] = useState(-1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  if (!isActive && activeEdge !== -1) setActiveEdge(-1)

  useEffect(() => {
    if (!isActive) return
    timerRef.current = setInterval(() => {
      setActiveEdge((e) => (e + 1) % GEO_EDGES.length)
    }, 380)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive])

  return (
    <div className="flex h-full items-center justify-center">
      <svg width="245" height="226" viewBox="0 0 204 188">
        {GEO_EDGES.map(([a, b], i) => {
          const na = GEO_NODES[a],
            nb = GEO_NODES[b]
          const isLit = i === activeEdge
          return (
            <line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="black"
              strokeWidth={isLit ? 1.2 : 0.5}
              strokeOpacity={isLit ? 0.8 : 0.12}
              strokeDasharray={isLit ? "4 3" : undefined}
              style={{ transition: "stroke-opacity 0.25s, stroke-width 0.25s" }}
            />
          )
        })}
        {GEO_NODES.map((node) => {
          const isYou = node.label === "You"
          return (
            <g key={node.label}>
              <circle
                cx={node.x}
                cy={node.y}
                r={isYou ? 13 : 9}
                fill="none"
                stroke="black"
                strokeWidth={isYou ? 1.5 : 0.8}
                strokeOpacity={isYou ? 0.55 : 0.25}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={isYou ? 5 : 3}
                fill="black"
                fillOpacity={isYou ? 0.85 : 0.4}
              />
              <text
                x={node.x}
                y={node.y + (isYou ? 25 : 21)}
                textAnchor="middle"
                fill="black"
                fillOpacity="0.35"
                className="text-xs"
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
})

// ─── 12 Global Client Experience ─────────────────────────────────────────
const GLOBE_DOTS = [
  { x: 112, y: 46, label: "EU" },
  { x: 108, y: 90, label: "AF" },
  { x: 36, y: 64, label: "AM" },
]

export const GlobeVisual = memo(({ isActive }: { isActive: boolean }) => {
  const [rot, setRot] = useState(0)
  const rafRef = useRef<number>(0)
  const lastRef = useRef<number>(0)

  useEffect(() => {
    if (!isActive) return
    const spin = (t: number) => {
      if (lastRef.current) setRot((r) => (r + (t - lastRef.current) * 0.028) % 360)
      lastRef.current = t
      rafRef.current = requestAnimationFrame(spin)
    }
    rafRef.current = requestAnimationFrame(spin)
    return () => {
      cancelAnimationFrame(rafRef.current)
      lastRef.current = 0
    }
  }, [isActive])

  const rx = (offset: number) => Math.abs(Math.cos(toRad(rot + offset))) * 62

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className={isActive ? "scale-107" : "scale-100"}
        style={{ transition: "scale 0.9s ease" }}
      >
        <svg width="188" height="188" viewBox="0 0 160 160">
          {/* Globe outline */}
          <circle
            cx="80"
            cy="80"
            r="66"
            fill="none"
            stroke="black"
            strokeWidth="0.5"
            strokeOpacity="0.35"
          />
          {/* Latitude lines */}
          {[-36, -18, 0, 18, 36].map((off) => {
            const s = Math.cos(toRad(off * 1.8)) * 0.96
            return (
              <ellipse
                key={off}
                cx="80"
                cy={80 + off}
                rx={66 * s}
                ry={11 * s}
                fill="none"
                stroke="black"
                strokeWidth="0.5"
                strokeOpacity={off === 0 ? 0.22 : 0.1}
              />
            )
          })}
          {/* Rotating meridians */}
          {[0, 60, 120].map((offset, i) => (
            <ellipse
              key={offset}
              cx="80"
              cy="80"
              rx={rx(offset)}
              ry="66"
              fill="none"
              stroke="black"
              strokeWidth="0.5"
              strokeOpacity={0.2 - i * 0.04}
            />
          ))}
          {/* Client location dots */}
          {GLOBE_DOTS.map((dot) => (
            <g key={dot.label}>
              <circle
                cx={dot.x}
                cy={dot.y}
                r="6"
                fill="black"
                fillOpacity="0.06"
                style={{ animation: isActive ? "svc-pulse-dot 2.4s ease-in-out infinite" : "none" }}
              />
              <circle cx={dot.x} cy={dot.y} r="2.5" fill="black" fillOpacity="0.75" />
              <text
                x={dot.x}
                y={dot.y - 9}
                textAnchor="middle"
                fill="black"
                fillOpacity="0.3"
                className="text-xs"
              >
                {dot.label}
              </text>
            </g>
          ))}
          {/* Connection lines */}
          {GLOBE_DOTS.flatMap((a, i) =>
            GLOBE_DOTS.slice(i + 1).map((b) => (
              <line
                key={`${a.label}-${b.label}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="black"
                strokeWidth="0.5"
                strokeOpacity="0.14"
                strokeDasharray="3 5"
              />
            )),
          )}
        </svg>
      </div>
    </div>
  )
})

export const CybersecurityVisual = memo(({ isActive }: { isActive: boolean }) => (
  <div className="flex h-full items-center justify-center">
    <div className="w-52 rounded-lg border border-black/15 bg-white/30 p-5">
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-black/5 transition-transform duration-500 ${isActive ? "scale-100" : "scale-85"}`}
        >
          <ShieldCheck className="h-6 w-6 text-black/75" />
        </div>
        <div>
          <p className="font-mono text-xs tracking-widest text-black/30 uppercase">Status</p>
          <p className="mt-1 text-sm font-medium text-black/70">Protected</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {["TLS", "ACCESS", "UPDATES"].map((label, index) => (
          <div
            key={label}
            className="flex items-center justify-between border-t border-black/10 pt-2.5"
          >
            <span className="font-mono text-xs tracking-widest text-black/30">{label}</span>
            <span
              className={`h-1.5 w-1.5 rounded-full bg-green-300/70 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-25"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
))

export const VisualDesignVisual = memo(({ isActive }: { isActive: boolean }) => (
  <div className="flex h-full items-center justify-center">
    <div
      className={`w-56 overflow-hidden rounded-lg border border-black/15 bg-white/30 transition-transform duration-500 ${isActive ? "translate-y-0" : "translate-y-2"}`}
    >
      <div className="flex items-center gap-1.5 border-b border-black/10 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-black/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/10" />
      </div>
      <div className="grid grid-cols-[1fr_72px] gap-4 p-4">
        <div>
          <span className="font-display text-4xl text-black/75 italic">Aa</span>
          <div className="mt-3 h-1.5 w-full rounded bg-black/20" />
          <div className="mt-1.5 h-1.5 w-3/4 rounded bg-black/10" />
          <div className="mt-5 h-7 w-20 rounded-sm border border-black/20 bg-black/10" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["bg-black/70", "bg-emerald-300/50", "bg-amber-200/45", "bg-rose-300/40"].map(
            (color) => (
              <span key={color} className={`aspect-square rounded-sm ${color}`} />
            ),
          )}
        </div>
      </div>
    </div>
  </div>
))

const serviceVisuals = {
  mobile: MobileVisual,
  seo: SEOVisual,
  rapid: RapidDevVisual,
  language: LanguageVisual,
  payments: PaymentsVisual,
  cms: CMSVisual,
  maintenance: MaintenanceVisual,
  unique: UniqueVisual,
  performance: PerformanceVisual,
  "client-input": ClientInputVisual,
  geo: GEOVisual,
  globe: GlobeVisual,
  cybersecurity: CybersecurityVisual,
  "visual-design": VisualDesignVisual,
} as const

export type ServiceVisualKey = keyof typeof serviceVisuals

export const ServiceVisual = ({
  visualKey,
  isActive,
}: {
  visualKey: ServiceVisualKey
  isActive: boolean
}) => {
  const Visual = serviceVisuals[visualKey]
  return <Visual isActive={isActive} />
}
