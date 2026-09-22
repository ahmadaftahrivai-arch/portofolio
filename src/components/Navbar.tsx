import { useActiveSection } from '../lib/useActiveSection'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const active = useActiveSection(links.map((l) => l.id))

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-space-900/70 p-1.5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleClick(e, link.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              active === link.id
                ? 'bg-accent-500 text-space-950'
                : 'text-ink-300 hover:text-ink-100'
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
