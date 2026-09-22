import type { TimelineEntry } from '../data/types'

export function TimelineCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-space-800 text-sm font-semibold text-accent-400">
        {entry.logoUrl ? (
          <img src={entry.logoUrl} alt="" className="h-full w-full rounded-full object-cover" />
        ) : (
          entry.title.slice(0, 1)
        )}
      </div>
      <div className="min-w-0">
        <p className="text-base font-semibold text-ink-100">{entry.title}</p>
        <p className="mt-0.5 text-sm text-ink-400">{entry.subtitle}</p>
        <p className="mt-1.5 text-sm text-ink-500">{entry.period}</p>
      </div>
    </div>
  )
}
