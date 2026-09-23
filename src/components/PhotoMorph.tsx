import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Placeholder } from './ui/Placeholder'

interface PhotoMorphProps {
  primaryUrl: string | null
  altUrl: string | null
  alt: string
}

const LENS_RADIUS = 110

// Idle auto-swap cycle (ms): rest on real photo -> reveal alt -> hold -> hide.
const REST = 3500
const GROW = 900
const HOLD = 2200
const SHRINK = 900
const CYCLE = REST + GROW + HOLD + SHRINK

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

/** Returns reveal amount 0..1 and a red "aura" strength 0..1 for time t in the cycle. */
function idlePhase(t: number) {
  const c = t % CYCLE
  if (c < REST) {
    // Red aura builds up during the last second before the swap.
    const aura = Math.max(0, (c - (REST - 1000)) / 1000)
    return { reveal: 0, aura }
  }
  if (c < REST + GROW) {
    const p = easeInOut((c - REST) / GROW)
    return { reveal: p, aura: 1 - p * 0.6 }
  }
  if (c < REST + GROW + HOLD) return { reveal: 1, aura: 0.4 }
  const p = easeInOut((c - REST - GROW - HOLD) / SHRINK)
  return { reveal: 1 - p, aura: 0.4 * (1 - p) }
}

/**
 * Real photo with the aligned alt image (Spider-Man suit) revealed through a
 * soft radial mask. Idle: auto-swaps on a loop with a red aura build-up.
 * Hover: the mask becomes a lens that follows the pointer.
 */
export function PhotoMorph({ primaryUrl, altUrl, alt }: PhotoMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const primaryRef = useRef<HTMLImageElement>(null)
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
    const start = performance.now()

    function tick(now: number) {
      if (!el) return
      const { width, height } = el.getBoundingClientRect()
      const c = current.current
      let tx: number
      let ty: number
      let tr: number
      let aura = 0

      if (hovering.current) {
        tx = target.current.x
        ty = target.current.y
        tr = LENS_RADIUS
      } else {
        tx = width / 2
        ty = height * 0.35
        const phase = reduceMotion ? { reveal: 0, aura: 0 } : idlePhase(now - start)
        tr = phase.reveal * Math.hypot(width, height)
        aura = phase.aura
      }

      c.x += (tx - c.x) * 0.22
      c.y += (ty - c.y) * 0.22
      c.r += (tr - c.r) * (hovering.current ? 0.25 : 1)

      el.style.setProperty('--lx', `${c.x}px`)
      el.style.setProperty('--ly', `${c.y}px`)
      el.style.setProperty('--lr', `${Math.max(0, c.r)}px`)
      if (primaryRef.current) {
        primaryRef.current.style.filter = aura
          ? `drop-shadow(0 0 ${6 + aura * 18}px rgba(220, 38, 38, ${0.25 + aura * 0.55}))`
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
    hovering.current = true
    target.current = pointerPos(e)
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
    'radial-gradient(circle var(--lr) at var(--lx) var(--ly), #000 40%, transparent 100%)'

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
