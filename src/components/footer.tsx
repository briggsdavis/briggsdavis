import { useEffect, useId, useRef, useState } from "react"

const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle")
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tooltipId = useId()

  useEffect(
    () => () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current)
    },
    [],
  )

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@briggsdavis.com")
      setCopyStatus("copied")
    } catch {
      setCopyStatus("failed")
    }
    if (copyTimeout.current) clearTimeout(copyTimeout.current)
    copyTimeout.current = setTimeout(() => setCopyStatus("idle"), 2000)
  }

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.04 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} id="contact" className="relative z-0 flex items-stretch bg-background">
      <div className="site-frame [container-type:inline-size] relative z-10 flex min-h-0 flex-1 flex-col self-stretch">
        <div
          data-no-text-reveal
          data-visible={visible ? "" : undefined}
          className="mt-auto w-full shrink-0 translate-y-full text-foreground opacity-0 transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] data-[visible]:translate-y-0 data-[visible]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
        >
          <div className="mb-3 pt-8 pr-4 text-right text-lg text-foreground md:pt-12 md:text-2xl">
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              aria-describedby={tooltipId}
              className="group relative cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              hello@briggsdavis.com
              <span
                id={tooltipId}
                role="tooltip"
                className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 overflow-hidden rounded bg-foreground px-3 py-1.5 text-center text-xs font-medium whitespace-nowrap text-background transition-[width,opacity] duration-200 ease-out motion-reduce:transition-none ${copyStatus === "copied" ? "w-18" : copyStatus === "failed" ? "w-44" : "w-28"} ${copyStatus === "idle" ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-100"}`}
              >
                {copyStatus === "copied"
                  ? "Copied"
                  : copyStatus === "failed"
                    ? "Couldn’t copy. Try again."
                    : "Click to copy"}
              </span>
            </button>
            <output className="sr-only">
              {copyStatus === "copied"
                ? "Email copied"
                : copyStatus === "failed"
                  ? "Couldn’t copy email. Try again."
                  : ""}
            </output>
          </div>
          <p className="w-full text-center text-[14cqw] leading-none font-black whitespace-nowrap">
            BRIGGS DAVIS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
