import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from './icons'
import type { SocialLink } from '../data/types'

const display: Record<
  SocialLink['icon'],
  { Icon: typeof GithubIcon; title: string; subtitle: (s: SocialLink) => string; badge: string }
> = {
  linkedin: {
    Icon: LinkedinIcon,
    title: "Let's Connect",
    subtitle: () => 'on LinkedIn',
    badge: 'bg-[#0A66C2] text-white',
  },
  instagram: {
    Icon: InstagramIcon,
    title: 'Instagram',
    subtitle: (s) => s.handle ?? s.label,
    badge: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white',
  },
  github: {
    Icon: GithubIcon,
    title: 'GitHub',
    subtitle: (s) => s.handle ?? s.label,
    badge: 'bg-[#171515] text-white',
  },
  email: {
    Icon: MailIcon,
    title: 'Email',
    subtitle: (s) => s.handle ?? 'Send an email',
    badge: 'bg-accent-500 text-space-950',
  },
}

export function SocialCard({ social }: { social: SocialLink }) {
  const { Icon, title, subtitle, badge } = display[social.icon]

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-accent-400/40"
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${badge}`}>
        <Icon width={20} height={20} />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink-100">{title}</p>
        <p className="text-xs text-ink-500">{subtitle(social)}</p>
      </div>
    </a>
  )
}
