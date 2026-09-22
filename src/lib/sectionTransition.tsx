import { createContext, useContext, useRef, useState, type ReactNode } from 'react'

interface SectionTransitionContextValue {
  transitioning: boolean
  label: string
  navigateTo: (id: string, label: string) => void
}

const SectionTransitionContext = createContext<SectionTransitionContextValue | null>(null)

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function SectionTransitionProvider({ children }: { children: ReactNode }) {
  const [transitioning, setTransitioning] = useState(false)
  const [label, setLabel] = useState('')
  const busy = useRef(false)

  async function navigateTo(id: string, nextLabel: string) {
    if (busy.current) return
    const target = document.getElementById(id)
    if (!target) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    busy.current = true
    setLabel(nextLabel)
    setTransitioning(true)

    await wait(420)
    target.scrollIntoView({ behavior: 'instant', block: 'start' })
    await wait(450)

    setTransitioning(false)
    busy.current = false
  }

  return (
    <SectionTransitionContext.Provider value={{ transitioning, label, navigateTo }}>
      {children}
    </SectionTransitionContext.Provider>
  )
}

export function useSectionTransition() {
  const ctx = useContext(SectionTransitionContext)
  if (!ctx) throw new Error('useSectionTransition must be used within SectionTransitionProvider')
  return ctx
}
