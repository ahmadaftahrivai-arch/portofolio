import { useEffect, useRef, type RefObject } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
  twinkle: number
  phase: number
  color: string
  // Set once the particle is recruited to form a letter.
  target?: { x: number; y: number; color: string }
  startX?: number
  startY?: number
  delay?: number
}

interface IntroParticlesProps {
  /** Text elements the particles converge on to "write" before they appear. */
  targets: RefObject<HTMLElement | null>[]
  assembleAtMs: number
  revealAtMs: number
}

const ASSEMBLE_MS = 1100
const DISSOLVE_MS = 600
const SAMPLE_GAP = 4

// Box-Muller: clusters free particles toward the center column.
function gaussian() {
  const u = 1 - Math.random()
  const v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/** Rasterizes each target element's text off-screen and returns glyph points. */
function sampleTextPoints(elements: HTMLElement[]) {
  const points: { x: number; y: number; color: string }[] = []
  const off = document.createElement('canvas')
  off.width = window.innerWidth
  off.height = window.innerHeight
  const octx = off.getContext('2d', { willReadFrequently: true })
  if (!octx) return points

  for (const el of elements) {
    const rect = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    octx.clearRect(0, 0, off.width, off.height)
    octx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
    octx.textAlign = 'center'
    octx.textBaseline = 'middle'
    octx.fillStyle = '#fff'
    octx.fillText(el.textContent ?? '', rect.left + rect.width / 2, rect.top + rect.height / 2)

    const x0 = Math.max(0, Math.floor(rect.left))
    const y0 = Math.max(0, Math.floor(rect.top))
    const w = Math.min(off.width - x0, Math.ceil(rect.width))
    const h = Math.min(off.height - y0, Math.ceil(rect.height))
    if (w <= 0 || h <= 0) continue
    const data = octx.getImageData(x0, y0, w, h).data
    for (let y = 0; y < h; y += SAMPLE_GAP) {
      for (let x = 0; x < w; x += SAMPLE_GAP) {
        if (data[(y * w + x) * 4 + 3] > 128) {
          points.push({ x: x0 + x, y: y0 + y, color: cs.color })
        }
      }
    }
  }
  return points
}

/**
 * Dense drifting particle dust for the intro. At `assembleAtMs` a subset
 * flies into the shape of the target text; at `revealAtMs` the real text
 * takes over and those particles dissolve.
 */
export function IntroParticles({ targets, assembleAtMs, revealAtMs }: IntroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let rafId = 0
    let recruitStarted = false
    let assembleStart: number | null = null
    let cancelled = false
    const mountedAt = performance.now()

    function spawn(): Particle {
      return {
        x: width / 2 + gaussian() * width * 0.16,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.12,
        r: Math.random() < 0.12 ? Math.random() * 0.6 + 1.2 : Math.random() * 0.7 + 0.5,
        alpha: Math.random() * 0.5 + 0.5,
        twinkle: Math.random() * 0.004 + 0.002,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() < 0.35 ? '#9ec5ff' : '#f2f6ff',
      }
    }

    function resize() {
      if (!canvas || !ctx) return
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (particles.length === 0) {
        particles = Array.from({ length: Math.round((width * height) / 600) }, spawn)
      }
    }

    async function recruit() {
      await document.fonts.ready
      if (cancelled) return
      const elements = targets.map((t) => t.current).filter((el): el is HTMLElement => !!el)
      const points = sampleTextPoints(elements)
      while (particles.length < points.length) particles.push(spawn())

      // Random particles, so letters are built from dust all over the screen.
      const pool = [...particles].sort(() => Math.random() - 0.5)
      points.forEach((pt, i) => {
        const p = pool[i]
        p.target = pt
        p.startX = p.x
        p.startY = p.y
        p.delay = Math.random() * 300
      })
      assembleStart = performance.now()
    }

    function tick(now: number) {
      if (!ctx) return
      const elapsed = now - mountedAt
      if (!recruitStarted && elapsed >= assembleAtMs) {
        recruitStarted = true
        void recruit()
      }
      const dissolve = Math.min(1, Math.max(0, (elapsed - revealAtMs) / DISSOLVE_MS))

      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        let alpha = p.alpha + Math.sin(now * p.twinkle + p.phase) * 0.3
        let color = p.color

        if (p.target && assembleStart !== null) {
          const t = Math.min(1, Math.max(0, (now - assembleStart - (p.delay ?? 0)) / ASSEMBLE_MS))
          const e = easeInOutCubic(t)
          const sx = p.startX ?? p.x
          const sy = p.startY ?? p.y
          p.x = sx + (p.target.x - sx) * e
          p.y = sy + (p.target.y - sy) * e
          if (t > 0.6) color = p.target.color
          alpha = Math.max(alpha, 0.35 + 0.65 * e) * (1 - dissolve)
        } else {
          p.x += p.vx
          p.y += p.vy
          if (p.y < -4) p.y = height + 4
          if (p.y > height + 4) p.y = -4
          if (p.x < -4) p.x = width + 4
          if (p.x > width + 4) p.x = -4
          // Background dust thins out while the letters form.
          if (assembleStart !== null) alpha *= 0.55
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, alpha))
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [targets, assembleAtMs, revealAtMs])

  return (
    <>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-600/25 blur-[120px]"
        aria-hidden="true"
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
    </>
  )
}
