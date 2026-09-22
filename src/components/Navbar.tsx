import { useLayoutEffect, useRef, useState } from 'react'
import { useActiveSection } from '../lib/useActiveSection'
import { useSlidingIndicator } from '../lib/useSlidingIndicator'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
]

function GhostMascot() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="13" cy="13" r="12" fill="#f5f7fb" stroke="#60a5fa" strokeWidth="1" />
      <circle cx="9.5" cy="12.5" r="1.4" fill="#04050b" />
      <circle cx="16.5" cy="12.5" r="1.4" fill="#04050b" />
      <path
        d="M10.5 17c1 1 4 1 5 0"
        stroke="#04050b"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function Navbar() {
  const active = useActiveSection(links.map((l) => l.id))
  const headerRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [ghostX, setGhostX] = useState<number | null>(null)
  const { containerRef: navRef, register, rect: pillRect } = useSlidingIndicator<HTMLElement>(active)

  // Keeps the little ghost mascot centered above whichever nav link is
  // currently active, instead of tracking the raw mouse position.
  useLayoutEffect(() => {
    function measure() {
      const header = headerRef.current
      const link = linkRefs.current[active]
      if (!header || !link) return
      const headerRect = header.getBoundingClientRect()
      const linkRect = link.getBoundingClientRect()
      setGhostX(linkRect.left - headerRect.left + linkRect.width / 2)
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      {ghostX !== null && (
        <div
          className="pointer-events-none absolute -top-4 transition-[left] duration-500 ease-out"
          style={{ left: ghostX, transform: 'translateX(-50%)' }}
          aria-hidden="true"
        >
          <GhostMascot />
        </div>
      )}

      <nav
        ref={navRef}
        className="relative flex items-center gap-1 rounded-full border border-white/10 bg-space-900/70 p-1.5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      >
        {pillRect && (
          <span
            className="absolute inset-y-1.5 rounded-full bg-accent-500 transition-all duration-300 ease-out"
            style={{ left: pillRect.left, width: pillRect.width }}
            aria-hidden="true"
          />
        )}
        {links.map((link) => (
          <a
            key={link.id}
            ref={(el) => {
              linkRefs.current[link.id] = el
              register(link.id)(el)
            }}
            href={`#${link.id}`}
            onClick={(e) => handleClick(e, link.id)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              active === link.id ? 'text-space-950' : 'text-ink-300 hover:text-ink-100'
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
