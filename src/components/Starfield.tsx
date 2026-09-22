import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinkleSpeed: number
  phase: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  length: number
  life: number
  maxLife: number
}

/**
 * Fixed full-viewport canvas starfield, mounted once at the app root so it
 * persists behind every section (matches the reference site's background).
 * Skips animation entirely under prefers-reduced-motion.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let stars: Star[] = []
    let shootingStars: ShootingStar[] = []
    let nextShootingStarAt = 0
    let width = 0
    let height = 0
    let rafId = 0

    function resize() {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round((width * height) / 9000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function drawStatic() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const star of stars) {
        ctx.globalAlpha = star.baseAlpha
        ctx.fillStyle = '#e6ecff'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function spawnShootingStar(now: number) {
      const dirAngle = (Math.PI * 3) / 4 + (Math.random() * 0.3 - 0.15) // ~down-left
      const speed = 7 + Math.random() * 5
      shootingStars.push({
        x: width * (0.45 + Math.random() * 0.5),
        y: height * Math.random() * 0.35,
        vx: Math.cos(dirAngle) * speed,
        vy: Math.sin(dirAngle) * speed,
        length: 90 + Math.random() * 60,
        life: 0,
        maxLife: 45 + Math.random() * 20,
      })
      nextShootingStarAt = now + 5000 + Math.random() * 7000
    }

    function drawShootingStars() {
      if (!ctx) return
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        s.x += s.vx
        s.y += s.vy
        s.life += 1

        const speed = Math.hypot(s.vx, s.vy) || 1
        const tailX = s.x - (s.vx / speed) * s.length
        const tailY = s.y - (s.vy / speed) * s.length
        const fade = Math.max(0, 1 - s.life / s.maxLife)

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
        grad.addColorStop(0, `rgba(230,236,255,${0.9 * fade})`)
        grad.addColorStop(1, 'rgba(230,236,255,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()

        ctx.fillStyle = `rgba(230,236,255,${fade})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2)
        ctx.fill()

        if (s.life > s.maxLife || s.x < -120 || s.x > width + 120 || s.y > height + 120) {
          shootingStars.splice(i, 1)
        }
      }
    }

    function tick(t: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const star of stars) {
        const alpha = star.baseAlpha + Math.sin(t * star.twinkleSpeed + star.phase) * 0.25
        ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha))
        ctx.fillStyle = '#e6ecff'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (t > nextShootingStarAt) spawnShootingStar(t)
      drawShootingStars()

      rafId = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduceMotion) {
      drawStatic()
    } else {
      nextShootingStarAt = performance.now() + 2000 + Math.random() * 3000
      rafId = requestAnimationFrame(tick)
    }

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
