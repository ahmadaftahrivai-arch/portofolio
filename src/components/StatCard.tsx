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
      className="group relative flex w-full flex-col gap-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1f47] via-[#0b1633] to-[#070e22] p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-accent-400/50"
    >
      {/* Slow diagonal light beams sweeping across the glass */}
      <div
        className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-2/5 animate-beam bg-gradient-to-r from-transparent via-white/30 to-transparent blur-lg motion-reduce:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-1/3 animate-beam-slow bg-gradient-to-r from-transparent via-accent-300/30 to-transparent blur-xl motion-reduce:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-3 left-5 h-px w-0 bg-accent-400 transition-all duration-500 group-hover:w-1/3"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-accent-400">
          <Icon width={18} height={18} />
        </span>
        <span className="font-display text-4xl font-bold text-ink-100">{displayValue}</span>
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
