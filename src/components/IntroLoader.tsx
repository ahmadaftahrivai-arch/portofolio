import { useEffect, useMemo, useRef, useState } from 'react'
import { IntroParticles } from './IntroParticles'
import { profile } from '../data/profile'

interface IntroLoaderProps {
  onDone: () => void
}

const DURATION_MS = 4000
// Particles start converging into the headline, then the real text takes over.
const ASSEMBLE_AT_MS = 500
const REVEAL_AT_MS = 1800

export function IntroLoader({ onDone }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const welcomeRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const textTargets = useMemo(() => [welcomeRef, nameRef], [])

  useEffect(() => {
    const id = window.setTimeout(() => setTextVisible(true), REVEAL_AT_MS)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      onDone()
      return
    }

    const start = performance.now()
    let raf = 0

    function step(now: number) {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / DURATION_MS) * 100))
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(step)
      } else {
        setLeaving(true)
        window.setTimeout(onDone, 400)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  function skip() {
    setLeaving(true)
    window.setTimeout(onDone, 200)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-space-950/40 backdrop-blur-[1px] transition-opacity duration-500 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
    >
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-screen"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/video/lightning.webm" type="video/webm" />
        <source src="/video/lightning.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[1]">
        <IntroParticles
          targets={textTargets}
          assembleAtMs={ASSEMBLE_AT_MS}
          revealAtMs={REVEAL_AT_MS}
        />
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute right-6 top-6 z-10 text-xs text-ink-500 underline-offset-4 hover:text-ink-300 hover:underline"
      >
        Skip
      </button>

      <div
        className={`relative z-[2] flex flex-col items-center gap-1 text-center transition-all duration-700 ease-out ${
          textVisible ? 'opacity-100 blur-none' : 'opacity-0 blur-md'
        }`}
      >
        <p ref={welcomeRef} className="font-display text-4xl font-bold text-ink-100 sm:text-5xl">
          Welcome To My
        </p>
        <p ref={nameRef} className="font-display text-4xl font-bold text-accent-500 sm:text-5xl">
          {profile.name === 'TODO: Nama Lengkap Kamu' ? 'Portfolio Website' : `${profile.name}'s Portfolio`}
        </p>
      </div>

      <div className="relative z-[2] flex w-72 items-center gap-3 text-xs font-medium tracking-wider text-ink-300">
        <span>Loading</span>
        <span className="h-0.5 flex-1 rounded-full bg-white/10">
          <span
            className="block h-0.5 rounded-full bg-white transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </span>
        <span className="tabular-nums">{progress}%</span>
      </div>
    </div>
  )
}
