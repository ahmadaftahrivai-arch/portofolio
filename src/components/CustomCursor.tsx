import { useEffect, useRef } from 'react'

/**
 * Small ghost-face cursor that trails the pointer with slight lag and
 * blinks over interactive elements, mirroring the reference site's custom
 * cursor. Only mounted on fine-pointer/hover-capable devices (see App.tsx);
 * native cursor is hidden for those via index.css.
 */
export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const eyesRef = useRef<SVGGElement>(null)

  useEffect(() => {
    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0
    let rafId = 0

    function onMove(e: PointerEvent) {
      targetX = e.clientX
      targetY = e.clientY
    }

    function onOver(e: PointerEvent) {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, textarea')
      wrapRef.current?.classList.toggle('scale-125', Boolean(interactive))
      eyesRef.current?.classList.toggle('translate-y-0.5', Boolean(interactive))
    }

    function tick() {
      x += (targetX - x) * 0.22
      y += (targetY - y) * 0.22
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${x}px, ${y}px)`
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
    <div
      ref={wrapRef}
      className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
      aria-hidden="true"
    >
      <svg width="26" height="26" viewBox="0 0 26 26">
        <circle cx="13" cy="13" r="12" fill="#f5f7fb" stroke="#60a5fa" strokeWidth="1" />
        <g ref={eyesRef} className="transition-transform duration-150">
          <circle cx="9.5" cy="12.5" r="1.4" fill="#04050b" />
          <circle cx="16.5" cy="12.5" r="1.4" fill="#04050b" />
          <path
            d="M10.5 17c1 1 4 1 5 0"
            stroke="#04050b"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  )
}
