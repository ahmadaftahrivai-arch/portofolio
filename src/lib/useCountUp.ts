import { useEffect, useRef, useState } from 'react'

/**
 * Counts up from 0 to `target` once the returned ref scrolls into view.
 * Skips straight to the final value under prefers-reduced-motion.
 */
export function useCountUp<T extends HTMLElement>(target: number, durationMs = 900) {
  const ref = useRef<T>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let rafId = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        function tick(now: number) {
          const progress = Math.min(1, (now - start) / durationMs)
          setValue(Math.round(progress * target))
          if (progress < 1) rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [target, durationMs])

  return { ref, value }
}
