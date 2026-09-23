import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Placeholder } from './ui/Placeholder'

interface PhotoMorphProps {
  primaryUrl: string | null
  altUrl: string | null
  alt: string
}

// Lens radius as a fraction of the photo width — roughly head-sized.
const LENS_RATIO = 0.3
const FOLLOW = 0.12

// Idle "spider-sense" pulse (ms): rest -> red tint rises -> hold -> fades.
const REST = 4000
const RISE = 900
const HOLD = 1300
const FALL = 900
const CYCLE = REST + RISE + HOLD + FALL

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function pulseAt(t: number) {
  const c = t % CYCLE
  if (c < REST) return 0
  if (c < REST + RISE) return easeInOut((c - REST) / RISE)
  if (c < REST + RISE + HOLD) return 1
  return 1 - easeInOut((c - REST - RISE - HOLD) / FALL)
}

/**
 * Real photo; hovering opens a soft lens that glides after the pointer and
 * reveals the aligned alt image (Spider-Man suit) beneath. While idle, the
 * silhouette periodically picks up a faint red tint and edge glow.
 */
export function PhotoMorph({ primaryUrl, altUrl, alt }: PhotoMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const primaryRef = useRef<HTMLImageElement>(null)
  const tintRef = useRef<HTMLDivElement>(null)
  const hovering = useRef(false)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0, r: 0 })
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const el = containerRef.current
    if (!altUrl || !el) return
    let raf = 0
    let idleSince = performance.now()

    function tick(now: number) {
      if (!el) return
      const width = el.clientWidth
      const c = current.current

      if (hovering.current) {
        c.x += (target.current.x - c.x) * FOLLOW
        c.y += (target.current.y - c.y) * FOLLOW
        c.r += (width * LENS_RATIO - c.r) * 0.1
        idleSince = now
      } else {
        // Lens stays where it was and shrinks away instead of snapping off.
        c.r += (0 - c.r) * 0.08
      }

      el.style.setProperty('--lx', `${c.x}px`)
      el.style.setProperty('--ly', `${c.y}px`)
      el.style.setProperty('--lr', `${Math.max(0, c.r)}px`)

      const pulse = hovering.current || reduceMotion ? 0 : pulseAt(now - idleSince)
      if (tintRef.current) tintRef.current.style.opacity = String(pulse * 0.28)
      if (primaryRef.current) {
        primaryRef.current.style.filter = pulse
          ? `drop-shadow(0 0 ${3 + pulse * 7}px rgba(220, 38, 38, ${pulse * 0.55}))`
          : 'none'
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [altUrl, reduceMotion])

  function pointerPos(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function handleEnter(e: PointerEvent<HTMLDivElement>) {
    const p = pointerPos(e)
    // Start the lens under the pointer rather than sweeping in from 0,0.
    if (current.current.r < 1) current.current = { ...p, r: 0 }
    target.current = p
    hovering.current = true
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

  const lensMask =
    'radial-gradient(circle var(--lr) at var(--lx) var(--ly), #000 30%, rgba(0,0,0,0.6) 60%, transparent 100%)'
  const silhouetteMask = primaryUrl ? `url(${primaryUrl})` : undefined

  return (
    <div
      ref={containerRef}
      onPointerEnter={altUrl ? handleEnter : undefined}
      onPointerMove={altUrl ? (e) => (target.current = pointerPos(e)) : undefined}
      onPointerLeave={altUrl ? () => (hovering.current = false) : undefined}
      style={{ ['--lr' as string]: '0px' }}
      className={`relative aspect-[3/4] w-full max-w-sm overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] ${
        altUrl ? 'cursor-crosshair' : ''
      }`}
    >
      {primaryUrl ? (
        <img
          ref={primaryRef}
          src={primaryUrl}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <Placeholder className="absolute inset-0" label="photoUrl belum diisi" />
      )}
      {altUrl && silhouetteMask && (
        // Red wash clipped to the person's silhouette for the idle pulse.
        <div
          ref={tintRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-red-500 opacity-0 mix-blend-color"
          style={{
            maskImage: silhouetteMask,
            WebkitMaskImage: silhouetteMask,
            maskSize: 'cover',
            WebkitMaskSize: 'cover',
            maskPosition: 'top',
            WebkitMaskPosition: 'top',
          }}
        />
      )}
      {altUrl && (
        <img
          src={altUrl}
          alt=""
          aria-hidden="true"
          style={{ maskImage: lensMask, WebkitMaskImage: lensMask }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
        />
      )}
    </div>
  )
}
