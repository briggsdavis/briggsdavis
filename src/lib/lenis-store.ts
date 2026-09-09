import type Lenis from "lenis"

let instance: Lenis | null = null

export const registerLenis = (l: Lenis) => {
  instance = l
}
export const unregisterLenis = () => {
  instance = null
}

export const scrollToTop = () => {
  if (instance) {
    ;(instance as Lenis).scrollTo(0, { immediate: true })
  } else {
    window.scrollTo(0, 0)
  }
}
