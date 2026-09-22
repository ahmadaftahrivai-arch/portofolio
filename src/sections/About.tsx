import { Button } from '../components/ui/Button'
import { Reveal } from '../components/Reveal'
import { PhotoMorph } from '../components/PhotoMorph'
import { TimelineCard } from '../components/TimelineCard'
import { StatCard } from '../components/StatCard'
import { CodeIcon, RibbonIcon, TrophyIcon } from '../components/icons'
import { profile } from '../data/profile'
import { education, experience } from '../data/timeline'
import { projects } from '../data/projects'
import { certificates } from '../data/certificates'
import { awards } from '../data/awards'
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
      <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-accent-400">
            Hi, I'm
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-ink-100">
            {profile.name}
          </h2>
          <div className="mt-6">
            {profile.resumeUrl ? (
              <Button href={profile.resumeUrl} target="_blank" rel="noreferrer">
                View Resume
              </Button>
            ) : (
              <Button variant="outline" disabled title="Tambahkan resumeUrl di data/profile.ts">
                View Resume
              </Button>
            )}
          </div>
        </div>

        <PhotoMorph
          primaryUrl={profile.photoUrl}
          altUrl={profile.photoMorphUrl}
          alt={profile.name}
        />

        <div>
          <p className="text-base leading-relaxed text-ink-300">{profile.bioAbout}</p>
          <div className="mt-6">
            <Button variant="outline" onClick={() => goToPortfolio('projects')}>
              View Projects
            </Button>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-ink-500">
            Education
          </h3>
          <div className="flex flex-col gap-3">
            {education.map((entry) => (
              <TimelineCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-ink-500">
            Experience & Organizations
          </h3>
          <div className="flex flex-col gap-3">
            {experience.map((entry) => (
              <TimelineCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={CodeIcon}
          label="Projects"
          value={projects.length}
          description="Innovative solutions crafted"
          onClick={() => goToPortfolio('projects')}
        />
        <StatCard
          icon={RibbonIcon}
          label="Certificates"
          value={certificates.length}
          description="Skills validated"
          onClick={() => goToPortfolio('certificates')}
        />
        <StatCard
          icon={TrophyIcon}
          label="Awards"
          value={awards.length}
          description="Achievements earned"
          onClick={() => goToPortfolio('awards')}
        />
      </Reveal>
    </section>
  )
}
