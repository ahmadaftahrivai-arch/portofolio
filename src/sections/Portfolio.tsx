import { usePortfolioTab } from '../lib/portfolioTab'
import type { PortfolioTab } from '../lib/portfolioTab.types'
import { useSlidingIndicator } from '../lib/useSlidingIndicator'
import { projects } from '../data/projects'
import { certificates } from '../data/certificates'
import { awards } from '../data/awards'
import { techStack } from '../data/techStack'
import { ProjectCard } from '../components/ProjectCard'
import { Placeholder } from '../components/ui/Placeholder'
import { Reveal } from '../components/Reveal'

const tabs: { id: PortfolioTab; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'awards', label: 'Awards' },
  { id: 'techStack', label: 'Tech Stack' },
]

const STAGGER_MS = 70

export function Portfolio() {
  const { tab, setTab } = usePortfolioTab()
  const { containerRef: tabsRef, register, rect: pillRect } = useSlidingIndicator<HTMLDivElement>(tab)

  return (
    <section id="portfolio" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <Reveal>
        <h2 className="text-center font-display text-4xl font-semibold text-ink-100">
          Portfolio
        </h2>

        <div
          ref={tabsRef}
          className="relative mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5"
        >
          {pillRect && (
            <span
              className="absolute inset-y-1.5 rounded-full bg-accent-500 transition-all duration-300 ease-out"
              style={{ left: pillRect.left, width: pillRect.width }}
              aria-hidden="true"
            />
          )}
          {tabs.map((t) => (
            <button
              key={t.id}
              ref={register(t.id)}
              type="button"
              onClick={() => setTab(t.id)}
              className={`relative flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? 'text-space-950' : 'text-ink-300 hover:text-ink-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div key={tab} className="mt-10">
        {tab === 'projects' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.id} delayMs={i * STAGGER_MS}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}

        {tab === 'certificates' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c, i) => (
              <Reveal key={c.id} delayMs={i * STAGGER_MS}>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40">
                  <div className="aspect-[4/3] w-full">
                    {c.imageUrl ? (
                      <img src={c.imageUrl} alt={c.title} className="h-full w-full object-cover" />
                    ) : (
                      <Placeholder
                        className="h-full w-full rounded-none border-0"
                        label="Sertifikat belum diisi"
                        hint={`imageUrl di data/certificates.ts (${c.id})`}
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-ink-100">{c.title}</p>
                    <p className="text-xs text-ink-500">
                      {c.issuer} · {c.date}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {tab === 'awards' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((a, i) => (
              <Reveal key={a.id} delayMs={i * STAGGER_MS}>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40">
                  <p className="text-sm font-semibold text-ink-100">{a.title}</p>
                  <p className="mt-1 text-xs text-ink-500">
                    {a.issuer} · {a.date}
                  </p>
                  <p className="mt-3 text-sm text-ink-300">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {tab === 'techStack' && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {techStack.map((item, i) => (
              <Reveal key={item.name} delayMs={i * STAGGER_MS}>
                <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/10 text-sm font-semibold text-accent-400">
                    {item.name.slice(0, 2)}
                  </div>
                  <p className="text-sm text-ink-100">{item.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
