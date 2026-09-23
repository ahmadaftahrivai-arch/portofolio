import { useEffect, useState } from 'react'
import { NAV_SCROLL_EVENT } from './scrollToSection'

/**
 * Tracks which of the given section ids the reader is in, for navbar
 * active-state highlighting: the last section whose top has passed 40% of
 * the viewport (or the last one once the page bottom is reached). While a
 * nav click is scrolling, it holds the clicked section instead of flicking
 * through every section passed on the way.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join(',')

  useEffect(() => {
    const sectionIds = key.split(',')
    let navTarget: string | null = null
    let raf = 0

    function measure() {
      raf = 0
      if (navTarget) return
      const line = window.innerHeight * 0.4
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(atBottom ? sectionIds[sectionIds.length - 1] : current)
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(measure)
    }

    function onNavScroll(e: Event) {
      navTarget = (e as CustomEvent<string | null>).detail
      if (navTarget) setActive(navTarget)
      else schedule()
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener(NAV_SCROLL_EVENT, onNavScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener(NAV_SCROLL_EVENT, onNavScroll)
    }
  }, [key])

  return active
}
