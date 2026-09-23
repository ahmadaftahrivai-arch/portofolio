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
const LEAVE_MS = 600

// Idle auto-swap cycle (ms): rest on real photo -> red "spider-sense" aura
// builds -> suit spreads out from the chest -> hold -> suit retracts.
const REST = 3000
const AURA = 1000
const GROW = 1200
const HOLD = 2200
const SHRINK = 1200
const CYCLE = REST + AURA + GROW + HOLD + SHRINK

// Soft circle that shows a layer inside the lens / its inverse outside it.
const LENS_MASK =
  'radial-gradient(circle var(--lr) at var(--lx) var(--ly), #000 30%, rgba(0,0,0,0.6) 60%, transparent 100%)'
const INVERSE_MASK =
  'radial-gradient(circle var(--lr) at var(--lx) var(--ly), transparent 30%, rgba(0,0,0,0.4) 60%, #000 100%)'

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
    return { reveal: p, aura: 1 - p }
  }
  c -= GROW
  if (c < HOLD) return { reveal: 1, aura: 0 }
  c -= HOLD
  return { reveal: 1 - easeInOut(Math.min(1, c / SHRINK)), aura: 0 }
}

function setMask(el: HTMLElement | null, mask: string) {
  if (!el || el.dataset.mask === mask) return
  el.dataset.mask = mask
  el.style.maskImage = mask
  el.style.webkitMaskImage = mask
}

/**
 * Real photo that auto-swaps with the aligned alt image (Spider-Man suit):
 * a red aura builds, the suit spreads out from the chest, holds, retracts.
 * The first swap starts as soon as the photo scrolls into view. Hovering
 * opens a soft lens that reveals whichever image is *not* currently showing.
 */
export function PhotoMorph({ primaryUrl, altUrl, alt }: PhotoMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const primaryRef = useRef<HTMLImageElement>(null)
  const altRef = useRef<HTMLImageElement>(null)
  const tintRef = useRef<HTMLDivElement>(null)
  const hovering = useRef(false)
  const leftAt = useRef(-Infinity)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0, r: 0 })
  // True while the suit is the base image and the lens shows the real photo.
  const swapped = useRef(false)
  const reveal = useRef(0)
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const el = containerRef.current
    if (!altUrl || !el) return
    let raf = 0
    let visible = false
    let idleClock = 0 // advances only while visible and not hovered
    let last = performance.now()

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible
        visible = entry.isIntersecting
        // On scrolling into view, skip the resting phase so the swap starts now.
        if (visible && !wasVisible && idleClock % CYCLE < REST) {
          idleClock = Math.floor(idleClock / CYCLE) * CYCLE + REST
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(el)

    function tick(now: number) {
      if (!el) return
      const dt = now - last
      last = now
      const width = el.clientWidth
      const height = el.clientHeight
      const fullR = Math.hypot(width, height) * 2.6
      const c = current.current
      let aura = 0

      if (hovering.current) {
        c.x += (target.current.x - c.x) * FOLLOW
        c.y += (target.current.y - c.y) * FOLLOW
        c.r += (width * LENS_RATIO - c.r) * 0.1
      } else if (now - leftAt.current < LEAVE_MS) {
        // Just left: the lens shrinks away in place.
        c.r += (0 - c.r) * 0.1
      } else {
        if (swapped.current) {
          // Lens has closed over the suit; hand back to the idle cycle at
          // full coverage so nothing visibly jumps.
          swapped.current = false
          c.r = fullR
        }
        if (visible && !reduceMotion) idleClock += dt
        const phase = reduceMotion ? { reveal: 0, aura: 0 } : idlePhase(idleClock)
        reveal.current = phase.reveal
        aura = phase.aura
        c.x += (width * 0.5 - c.x) * 0.08
        c.y += (height * 0.42 - c.y) * 0.08
        c.r += (phase.reveal * fullR - c.r) * 0.25
      }

      el.style.setProperty('--lx', `${c.x}px`)
      el.style.setProperty('--ly', `${c.y}px`)
      el.style.setProperty('--lr', `${Math.max(0, c.r)}px`)

      setMask(primaryRef.current, swapped.current ? LENS_MASK : INVERSE_MASK)
      setMask(altRef.current, swapped.current ? INVERSE_MASK : LENS_MASK)

      if (tintRef.current) tintRef.current.style.opacity = String(aura * 0.25)
      if (primaryRef.current) {
        primaryRef.current.style.filter = aura
          ? `drop-shadow(0 0 ${3 + aura * 9}px rgba(220, 38, 38, ${aura * 0.6}))`
          : 'none'
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [altUrl, reduceMotion])

  function pointerPos(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function handleEnter(e: PointerEvent<HTMLDivElement>) {
    const p = pointerPos(e)
    target.current = p
    if (!swapped.current && reveal.current > 0.5) {
      // Suit is showing: flip roles so the lens reveals the real photo.
      swapped.current = true
      current.current = { ...p, r: 0 }
    } else if (current.current.r < 1) {
      current.current = { ...p, r: 0 }
    }
    hovering.current = true
  }

  function handleLeave() {
    hovering.current = false
    leftAt.current = performance.now()
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

  const silhouetteMask = primaryUrl ? `url(${primaryUrl})` : undefined

  return (
    <div
      ref={containerRef}
      onPointerEnter={altUrl ? handleEnter : undefined}
      onPointerMove={altUrl ? (e) => (target.current = pointerPos(e)) : undefined}
      onPointerLeave={altUrl ? handleLeave : undefined}
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
        // Red wash clipped to the person's silhouette for the aura build-up.
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
          ref={altRef}
          src={altUrl}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
        />
      )}
    </div>
  )
}
