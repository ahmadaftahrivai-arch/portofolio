import { ArrowRightIcon } from './icons'

interface StatCardProps {
  label: string
  value: number
  description: string
  onClick: () => void
}

export function StatCard({ label, value, description, onClick }: StatCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition-colors hover:border-accent-400/50"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-3xl font-semibold text-ink-100">{value}</span>
        <ArrowRightIcon className="text-ink-500 transition-colors group-hover:text-accent-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-ink-100">{label}</p>
        <p className="text-xs text-ink-500">{description}</p>
      </div>
    </button>
  )
}
