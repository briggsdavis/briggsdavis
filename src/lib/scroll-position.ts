export const RESET_SCROLL_TO_TOP_EVENT = "site-reset-scroll-to-top"

export const resetScrollToTop = () => {
  document.dispatchEvent(new Event(RESET_SCROLL_TO_TOP_EVENT))
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}
