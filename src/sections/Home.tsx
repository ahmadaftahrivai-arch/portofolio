import { Button } from '../components/ui/Button'
import { Reveal } from '../components/Reveal'
import { Typewriter } from '../components/Typewriter'
import { ArrowRightIcon, GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from '../components/icons'
import { profile } from '../data/profile'
import { music } from '../data/music'
import { useSectionTransition } from '../lib/sectionTransition'

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  email: MailIcon,
}

export function Home() {
  const { navigateTo } = useSectionTransition()

  return (
    <section
      id="home"
      className="mx-auto flex min-h-screen max-w-6xl scroll-mt-8 flex-col justify-center gap-12 px-6 pt-32 pb-16 lg:flex-row lg:items-center"
    >
      <Reveal delayMs={350} className="flex-1">
        <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
          <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
            {profile.tagline || 'Turning Ideas'}
          </span>
          <br />
          <span className="text-ink-100">Into Reality</span>
        </h1>

        <p className="mt-4 text-sm font-medium uppercase tracking-widest text-accent-400">
          <Typewriter words={profile.roles} />
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-300">
          {profile.bioHome}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="#portfolio" onClick={(e) => {
            e.preventDefault()
            navigateTo('portfolio', 'My Portfolio')
          }}>
            Project <ArrowRightIcon />
          </Button>
          <Button
            variant="outline"
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              navigateTo('contact', "Let's Talk")
            }}
          >
            Contact Me
          </Button>
        </div>

        <div className="mt-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-500">
            Find Me
          </p>
          <div className="flex gap-3">
            {profile.socials.map((social) => {
              const Icon = iconMap[social.icon]
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-300 transition-colors hover:border-accent-400 hover:text-accent-400"
                >
                  <Icon width={18} height={18} />
                </a>
              )
            })}
          </div>
        </div>
      </Reveal>

      <Reveal delayMs={500} className="w-full max-w-sm shrink-0">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-space-800/60 shadow-xl transition-all duration-300 hover:border-accent-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]">
          <div className="flex flex-col gap-2 p-5 pb-4">
            <p className="font-display text-2xl font-bold text-ink-100">Daily Rotation</p>
            <p className="text-sm text-ink-500">
              A curated collection of tracks that keep me in the zone and inspired while coding.
            </p>
          </div>

          {music.enabled && music.embedUrl ? (
            <iframe
              title="Currently listening to"
              src={music.embedUrl}
              width="100%"
              height="352"
              style={{ border: 0 }}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          ) : (
            <div className="px-5 pb-5">
              <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-center">
                <p className="text-xs text-ink-500">
                  Belum terhubung ke Spotify. Isi{' '}
                  <code className="text-ink-300">embedUrl</code> asli di{' '}
                  <code className="text-ink-300">src/data/music.ts</code> dan set{' '}
                  <code className="text-ink-300">enabled: true</code> untuk menampilkan
                  playlist beneran di sini.
                </p>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}
