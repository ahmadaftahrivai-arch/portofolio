import { createContext, useContext, useState, type ReactNode } from 'react'
import type { PortfolioTab } from './portfolioTab.types'

interface PortfolioTabContextValue {
  tab: PortfolioTab
  setTab: (tab: PortfolioTab) => void
}

const PortfolioTabContext = createContext<PortfolioTabContextValue | null>(null)

export function PortfolioTabProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<PortfolioTab>('projects')
  return (
    <PortfolioTabContext.Provider value={{ tab, setTab }}>
      {children}
    </PortfolioTabContext.Provider>
  )
}

export function usePortfolioTab() {
  const ctx = useContext(PortfolioTabContext)
  if (!ctx) throw new Error('usePortfolioTab must be used within PortfolioTabProvider')
  return ctx
}
