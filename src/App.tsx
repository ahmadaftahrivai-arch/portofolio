import { useState } from 'react'
import { Starfield } from './components/Starfield'
import { NebulaGlow } from './components/NebulaGlow'
import { Navbar } from './components/Navbar'
import { IntroLoader } from './components/IntroLoader'
import { SectionTransitionOverlay } from './components/SectionTransitionOverlay'
import { Home } from './sections/Home'
import { About } from './sections/About'
import { Portfolio } from './sections/Portfolio'
import { Contact } from './sections/Contact'
import { PortfolioTabProvider } from './lib/portfolioTab'
import { SectionTransitionProvider, useSectionTransition } from './lib/sectionTransition'
import { profile } from './data/profile'

function AppContent() {
  const { transitioning } = useSectionTransition()

  return (
    <>
      <Navbar />
      <SectionTransitionOverlay />

      <main
        className={`transition-all duration-500 ease-out ${
          transitioning ? 'opacity-0 blur-sm' : 'opacity-100 blur-none'
        }`}
      >
        <Home />
        <About />
        <Portfolio />
        <Contact />
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} {profile.name}. Built with React, Vite & Tailwind CSS.
      </footer>
    </>
  )
}

function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <PortfolioTabProvider>
      <SectionTransitionProvider>
        <NebulaGlow />
        <Starfield />

        {!introDone ? <IntroLoader onDone={() => setIntroDone(true)} /> : <AppContent />}
      </SectionTransitionProvider>
    </PortfolioTabProvider>
  )
}

export default App
