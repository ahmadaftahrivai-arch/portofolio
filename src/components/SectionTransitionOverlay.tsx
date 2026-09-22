import { useSectionTransition } from '../lib/sectionTransition'

/**
 * Big centered label ("About Me", "Portfolio", ...) shown while navigating
 * between sections via the navbar, echoing the reference site's page
 * transition instead of an instant jump-scroll.
 */
export function SectionTransitionOverlay() {
  const { transitioning, label } = useSectionTransition()

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-30 flex items-center justify-center transition-opacity duration-500 ${
        transitioning ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <span className="font-display text-4xl font-bold text-ink-100 sm:text-5xl">{label}</span>
    </div>
  )
}
