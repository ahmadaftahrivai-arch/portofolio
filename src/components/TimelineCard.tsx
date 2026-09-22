import type { TimelineEntry } from '../data/types'

export function TimelineCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-space-800 text-xs font-semibold text-accent-400">
        {entry.logoUrl ? (
          <img src={entry.logoUrl} alt="" className="h-full w-full rounded-full object-cover" />
        ) : (
          entry.title.slice(0, 1)
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink-100">{entry.title}</p>
        <p className="truncate text-xs text-ink-500">{entry.subtitle}</p>
      </div>
      <span className="ml-auto shrink-0 text-xs text-ink-500">{entry.period}</span>
    </div>
  )
}
