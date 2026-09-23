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

// Idle auto-swap cycle (ms): rest on real photo -> red "spider-sense" aura
// builds -> suit spreads out from the chest -> hold -> suit retracts.
const REST = 3000
const AURA = 1000
const GROW = 1200
const HOLD = 2200
const SHRINK = 1200
const CYCLE = REST + AURA + GROW + HOLD + SHRINK

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/** reveal: 0..1 how much of the suit is shown; aura: 0..1 red glow strength. */
function idlePhase(t: number) {
  let c = t % CYCLE
  if (c < REST) return { reveal: 0, aura: 0 }
  c -= REST
  if (c < AURA) return { reveal: 0, aura: easeInOut(c / AURA) }
  c -= AURA
  if (c < GROW) {
    const p = easeInOut(c / GROW)
    return { reveal: p, aura: 1 - p * 0.7 }
  }
  c -= GROW
  if (c < HOLD) return { reveal: 1, aura: 0.3 }
  c -= HOLD
  const p = easeInOut(Math.min(1, c / SHRINK))
  return { reveal: 1 - p, aura: 0.3 * (1 - p) }
}

/**
 * Real photo; hovering opens a soft lens that glides after the pointer and
 * reveals the aligned alt image (Spider-Man suit) beneath. While idle it
 * auto-swaps: a red aura builds, then the suit spreads over the photo and
 * retracts again.
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

      const height = el.clientHeight
      let aura = 0

      if (hovering.current) {
        c.x += (target.current.x - c.x) * FOLLOW
        c.y += (target.current.y - c.y) * FOLLOW
        c.r += (width * LENS_RATIO - c.r) * 0.1
        idleSince = now
      } else if (reduceMotion || now - idleSince < 600) {
        // Just left: let the lens shrink away in place before auto-swap resumes.
        c.r += (0 - c.r) * 0.08
      } else {
        const phase = idlePhase(now - idleSince - 600)
        aura = phase.aura
        // Drift the reveal origin to the chest and spread out to full cover.
        c.x += (width * 0.5 - c.x) * 0.08
        c.y += (height * 0.42 - c.y) * 0.08
        const idleR = phase.reveal * Math.hypot(width, height) * 1.1
        c.r += (idleR - c.r) * 0.25
      }

      el.style.setProperty('--lx', `${c.x}px`)
      el.style.setProperty('--ly', `${c.y}px`)
      el.style.setProperty('--lr', `${Math.max(0, c.r)}px`)

      if (tintRef.current) tintRef.current.style.opacity = String(aura * 0.25)
      if (primaryRef.current) {
        primaryRef.current.style.filter = aura
          ? `drop-shadow(0 0 ${3 + aura * 9}px rgba(220, 38, 38, ${aura * 0.6}))`
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
