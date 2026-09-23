import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
  twinkle: number
  phase: number
  blue: boolean
}

// Box-Muller: clusters particles toward the center column like the reference.
function gaussian() {
  const u = 1 - Math.random()
  const v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/**
 * Dense field of tiny drifting, twinkling particles for the intro screen —
 * denser than the site-wide Starfield and clustered toward the middle.
 */
export function IntroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let rafId = 0

    function spawn(): Particle {
      return {
        x: width / 2 + gaussian() * width * 0.2,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.12,
        r: Math.random() * 0.9 + 0.35,
        alpha: Math.random() * 0.6 + 0.3,
        twinkle: Math.random() * 0.004 + 0.002,
        phase: Math.random() * Math.PI * 2,
        blue: Math.random() < 0.35,
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
      particles = Array.from({ length: Math.round((width * height) / 1400) }, spawn)
    }

    function tick(t: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -4) p.y = height + 4
        if (p.y > height + 4) p.y = -4
        if (p.x < -4) p.x = width + 4
        if (p.x > width + 4) p.x = -4

        const a = p.alpha + Math.sin(t * p.twinkle + p.phase) * 0.3
        ctx.globalAlpha = Math.max(0.05, Math.min(1, a))
        ctx.fillStyle = p.blue ? '#9ec5ff' : '#f2f6ff'
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
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

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
