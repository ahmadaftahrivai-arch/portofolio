import { useLayoutEffect, useRef, useState } from 'react'

interface IndicatorRect {
  left: number
  width: number
}

/**
 * Measures the active item's position relative to a container so a
 * background "pill" can slide/resize to it with a CSS transition, instead
 * of each item's background snapping on/off independently.
 */
export function useSlidingIndicator<Container extends HTMLElement>(activeId: string) {
  const containerRef = useRef<Container>(null)
  const itemRefs = useRef<Record<string, HTMLElement | null>>({})
  const [rect, setRect] = useState<IndicatorRect | null>(null)

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current
      const item = itemRefs.current[activeId]
      if (!container || !item) return
      const containerRect = container.getBoundingClientRect()
      const itemRect = item.getBoundingClientRect()
      setRect({ left: itemRect.left - containerRect.left, width: itemRect.width })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeId])

  function register(id: string) {
    return (el: HTMLElement | null) => {
      itemRefs.current[id] = el
    }
  }

  return { containerRef, register, rect }
}
