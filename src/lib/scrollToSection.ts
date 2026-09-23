/** Fired with the section id when a nav scroll starts, and `null` when it ends. */
export const NAV_SCROLL_EVENT = 'nav-scroll'

let cancelCurrent: (() => void) | null = null

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function announce(id: string | null) {
  window.dispatchEvent(new CustomEvent<string | null>(NAV_SCROLL_EVENT, { detail: id }))
}

/**
 * Smooth-scrolls to a section, re-measuring its position every frame so it
 * still lands exactly even if content above it shifts mid-scroll (images,
 * fonts, embeds finishing loading). The native smooth scroll only measures
 * once and can stop short. Any wheel/touch/key input hands control back.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  cancelCurrent?.()

  function targetY() {
    const margin = parseFloat(getComputedStyle(el!).scrollMarginTop) || 0
    const max = document.documentElement.scrollHeight - window.innerHeight
    return Math.min(max, Math.max(0, el!.getBoundingClientRect().top + window.scrollY - margin))
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: targetY(), behavior: 'instant' })
    return
  }

  const startY = window.scrollY
  const duration = Math.min(1200, Math.max(500, Math.abs(targetY() - startY) * 0.35))
  const startedAt = performance.now()
  let raf = 0

  function stop() {
    cancelAnimationFrame(raf)
    window.removeEventListener('wheel', stop)
    window.removeEventListener('touchstart', stop)
    window.removeEventListener('keydown', stop)
    cancelCurrent = null
    announce(null)
  }

  function step(now: number) {
    const p = Math.min(1, (now - startedAt) / duration)
    const y = startY + (targetY() - startY) * easeInOutCubic(p)
    window.scrollTo({ top: y, behavior: 'instant' })
    if (p < 1) raf = requestAnimationFrame(step)
    else stop()
  }

  window.addEventListener('wheel', stop, { passive: true })
  window.addEventListener('touchstart', stop, { passive: true })
  window.addEventListener('keydown', stop)
  cancelCurrent = stop
  announce(id)
  raf = requestAnimationFrame(step)
}
