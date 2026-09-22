import type { ComponentType } from 'react'
import { ArrowRightIcon, type IconProps } from './icons'
import { useCountUp } from '../lib/useCountUp'

interface StatCardProps {
  icon: ComponentType<IconProps>
  label: string
  value: number
  description: string
  onClick: () => void
}

export function StatCard({ icon: Icon, label, value, description, onClick }: StatCardProps) {
  const { ref, value: displayValue } = useCountUp<HTMLButtonElement>(value)

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/10 bg-space-800 p-5 text-left transition-colors hover:border-accent-400/50"
    >
      {/* Glossy light blobs, matching the reference cards' sheen */}
      <div
        className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-accent-500/25 blur-3xl transition-opacity duration-300 group-hover:opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-12 bottom-0 h-28 w-28 rounded-full bg-accent-400/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-accent-400">
          <Icon width={18} height={18} />
        </span>
        <span className="font-display text-4xl font-semibold text-ink-100">{displayValue}</span>
      </div>

      <div className="relative flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold text-ink-100">{label}</p>
          <p className="text-xs text-ink-500">{description}</p>
        </div>
        <ArrowRightIcon
          className="shrink-0 -rotate-45 text-ink-500 transition-colors group-hover:text-accent-400"
          width={16}
          height={16}
        />
      </div>
    </button>
  )
}
