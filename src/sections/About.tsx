import { Button } from '../components/ui/Button'
import { Reveal } from '../components/Reveal'
import { PhotoMorph } from '../components/PhotoMorph'
import { TimelineCard } from '../components/TimelineCard'
import { StatCard } from '../components/StatCard'
import { CodeIcon, FileTextIcon } from '../components/icons'
import { profile } from '../data/profile'
import { education, experience } from '../data/timeline'
import { projects } from '../data/projects'
import { usePortfolioTab } from '../lib/portfolioTab'
import type { PortfolioTab } from '../lib/portfolioTab.types'

export function About() {
  const { setTab } = usePortfolioTab()

  function goToPortfolio(tab: PortfolioTab) {
    setTab(tab)
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_24rem_1fr]">
        <Reveal>
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              <span className="text-accent-400">Hi, I'm</span>
              <br />
              <span className="bg-gradient-to-b from-ink-100 to-ink-500 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h2>
            <div className="mt-6">
              {profile.resumeUrl ? (
                <Button href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <FileTextIcon width={18} height={18} /> View Resume
                </Button>
              ) : (
                <Button variant="outline" disabled title="Tambahkan resumeUrl di data/profile.ts">
                  <FileTextIcon width={18} height={18} /> View Resume
                </Button>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={180}>
          <PhotoMorph
            primaryUrl={profile.photoUrl}
            altUrl={profile.photoMorphUrl}
            alt={profile.name}
          />
        </Reveal>

        <Reveal delayMs={360}>
          <div>
            <p className="text-base leading-relaxed text-ink-300">{profile.bioAbout}</p>
            <div className="mt-6">
              <Button variant="outline" onClick={() => goToPortfolio('projects')}>
                View Projects
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-ink-500">
            Education
          </h3>
          <div className="flex flex-col gap-3">
            {education.map((entry, i) => (
              <Reveal key={entry.id} delayMs={i * 80}>
                <TimelineCard entry={entry} />
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-ink-500">
            Experience & Organizations
          </h3>
          <div className="flex flex-col gap-3">
            {experience.map((entry, i) => (
              <Reveal key={entry.id} delayMs={i * 80}>
                <TimelineCard entry={entry} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-xs">
        <Reveal>
          <StatCard
            icon={CodeIcon}
            label="Projects"
            value={projects.length}
            description="Innovative solutions crafted"
            onClick={() => goToPortfolio('projects')}
          />
        </Reveal>
      </div>
    </section>
  )
}
