import { useEffect, useRef } from 'react'

/**
 * Minimal ring cursor that scales up over interactive elements. Only
 * mounted on fine-pointer/hover-capable devices (see App.tsx); native
 * cursor is hidden for those via index.css.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ringX = 0
    let ringY = 0
    let targetX = 0
    let targetY = 0
    let rafId = 0

    function onMove(e: PointerEvent) {
      targetX = e.clientX
      targetY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`
      }
    }

    function onOver(e: PointerEvent) {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, textarea')
      ringRef.current?.classList.toggle('scale-150', Boolean(interactive))
    }

    function tick() {
      ringX += (targetX - ringX) * 0.2
      ringY += (targetY - ringY) * 0.2
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-400/60 transition-transform duration-150 ease-out"
        aria-hidden="true"
      />
    </>
  )
}
