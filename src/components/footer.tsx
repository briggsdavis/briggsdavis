import { useEffect, useRef, useState } from "react"

const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

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
    <footer
      ref={footerRef}
      id="contact"
      className="relative z-0 flex min-h-[82svh] items-stretch bg-background pt-44 shadow-[0_-72px_110px_rgba(0,0,0,0.1)] before:pointer-events-none before:absolute before:inset-x-0 before:-top-36 before:h-36 before:bg-gradient-to-b before:from-transparent before:to-black/[0.025] md:min-h-[78svh] md:pt-52"
    >
      <div aria-hidden="true" className="footer-shadow-breathe pointer-events-none absolute inset-x-0 bottom-0 h-[58%]" />

      <div className="site-frame relative z-10 flex min-h-0 flex-1 flex-col self-stretch">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <p className="text-lg text-foreground md:col-span-3 md:col-start-6 md:text-2xl">
            <a
              href="mailto:hello@briggsdavis.com"
              className="group relative inline-block pb-1 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.76,0,0.24,1)] hover:after:scale-x-100 focus-visible:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:after:transition-none"
            >
              hello@briggsdavis.com
            </a>
          </p>
          <p
            data-text-title
            className="max-w-md text-2xl leading-tight font-semibold tracking-tight text-foreground md:col-span-4 md:col-start-9 md:text-4xl"
          >
            Digital products built for your business
          </p>
        </div>

        <div
          data-no-text-reveal
          data-visible={visible ? "" : undefined}
          className="mt-auto w-full shrink-0 translate-y-full overflow-hidden pt-24 text-foreground opacity-0 transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] data-[visible]:translate-y-0 data-[visible]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
        >
          <svg
            viewBox="0 0 1200 190"
            preserveAspectRatio="none"
            className="block aspect-[1200/190] w-full fill-current"
          >
            <title>Briggs Davis</title>
            <text
              x="0"
              y="171"
              textLength="1200"
              lengthAdjust="spacingAndGlyphs"
              fontFamily="DM Sans Variable, sans-serif"
              fontSize="190"
              fontWeight="900"
            >
              BRIGGS DAVIS
            </text>
          </svg>
        </div>
      </div>
    </footer>
  )
}

export default Footer
