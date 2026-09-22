import { useEffect, useState } from 'react'
import { LightningBolt } from './LightningBolt'
import { profile } from '../data/profile'

interface IntroLoaderProps {
  onDone: () => void
}

const DURATION_MS = 1800

export function IntroLoader({ onDone }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

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
      <button
        type="button"
        onClick={skip}
        className="absolute right-6 top-6 text-xs text-ink-500 underline-offset-4 hover:text-ink-300 hover:underline"
      >
        Skip
      </button>

      <LightningBolt className="h-64 w-auto opacity-90" />

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-display text-2xl text-ink-100">Welcome To My</p>
        <p className="font-display text-3xl font-semibold text-accent-400">
          {profile.name === 'TODO: Nama Lengkap Kamu' ? 'Portfolio Website' : `${profile.name}'s Portfolio`}
        </p>
      </div>

      <div className="flex w-56 items-center gap-3 text-xs text-ink-500">
        <span>Loading</span>
        <span className="h-px flex-1 bg-white/10">
          <span
            className="block h-px bg-accent-400 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </span>
        <span className="tabular-nums">{progress}%</span>
      </div>
    </div>
  )
}
