import { useEffect, useRef, useState } from "react"
import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from "react"

type RevealProps<T extends ElementType> = {
  /** Element/component to render. Defaults to a div. */
  as?: T
  /** Animation delay in ms, applied once the element scrolls into view. */
  delay?: number
  /** IntersectionObserver threshold. */
  threshold?: number
} & Omit<ComponentPropsWithoutRef<T>, "as">

/**
 * Wraps content so it fades + slides into view the first time it enters the
 * viewport. Reuses the site's `fade-in-up` animation; reveals once, then stops
 * observing.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  threshold = 0.15,
  className = "",
  style,
  children,
  ...rest
}: RevealProps<T>) {
  // Polymorphic `as` makes precise ref typing awkward; the runtime behavior is sound.
  const Tag = (as ?? "div") as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      className={`opacity-0 ${visible ? "animate-fade-in-up" : ""} ${className}`.trim()}
      style={{ ...(style as CSSProperties), animationDelay: delay ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
