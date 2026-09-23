import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { Placeholder } from './ui/Placeholder'

interface PhotoMorphProps {
  primaryUrl: string | null
  altUrl: string | null
  alt: string
}

const LENS_RADIUS = 110

/**
 * Shows the primary photo, with a soft circular "x-ray lens" that follows
 * the pointer and reveals the aligned alt image (e.g. the Spider-Man suit)
 * underneath. Falls back to an honest placeholder when images are missing.
 */
export function PhotoMorph({ primaryUrl, altUrl, alt }: PhotoMorphProps) {
  const [active, setActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  // Ease the lens toward the pointer so it glides instead of snapping.
  useEffect(() => {
    if (!active) return
    let raf = 0
    function tick() {
      const c = current.current
      const t = target.current
      c.x += (t.x - c.x) * 0.22
      c.y += (t.y - c.y) * 0.22
      containerRef.current?.style.setProperty('--lx', `${c.x}px`)
      containerRef.current?.style.setProperty('--ly', `${c.y}px`)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  function pointerPos(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function handleEnter(e: PointerEvent<HTMLDivElement>) {
    const p = pointerPos(e)
    target.current = p
    current.current = { ...p }
    containerRef.current?.style.setProperty('--lx', `${p.x}px`)
    containerRef.current?.style.setProperty('--ly', `${p.y}px`)
    setActive(true)
  }

  if (!primaryUrl && !altUrl) {
    return (
      <Placeholder
        className="aspect-[3/4] w-full max-w-sm"
        label="Foto profil belum diisi"
        hint="Taruh foto di src/assets/, import di data/profile.ts (photoUrl) dan opsional photoMorphUrl untuk efek hover."
      />
    )
  }

  const lensMask = `radial-gradient(circle ${LENS_RADIUS}px at var(--lx) var(--ly), #000 40%, transparent 100%)`
  const lensStyle: CSSProperties = { maskImage: lensMask, WebkitMaskImage: lensMask }

  return (
    <div
      ref={containerRef}
      onPointerEnter={altUrl ? handleEnter : undefined}
      onPointerMove={altUrl ? (e) => (target.current = pointerPos(e)) : undefined}
      onPointerLeave={altUrl ? () => setActive(false) : undefined}
      className={`relative aspect-[3/4] w-full max-w-sm overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] ${
        altUrl ? 'cursor-crosshair' : ''
      }`}
    >
      {primaryUrl ? (
        <img
          src={primaryUrl}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <Placeholder className="absolute inset-0" label="photoUrl belum diisi" />
      )}
      {altUrl && (
        <img
          src={altUrl}
          alt=""
          aria-hidden="true"
          style={lensStyle}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}
