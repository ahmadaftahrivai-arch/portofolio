import { useState } from 'react'
import { Starfield } from './components/Starfield'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { IntroLoader } from './components/IntroLoader'
import { Home } from './sections/Home'
import { About } from './sections/About'
import { Portfolio } from './sections/Portfolio'
import { Contact } from './sections/Contact'
import { PortfolioTabProvider } from './lib/portfolioTab'
import { profile } from './data/profile'

function App() {
  const [introDone, setIntroDone] = useState(false)
  const [canHover] = useState(
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )

  return (
    <PortfolioTabProvider>
      <Starfield />
      {canHover && <CustomCursor />}
      {!introDone && <IntroLoader onDone={() => setIntroDone(true)} />}

      <Navbar />

      <main>
        <Home />
        <About />
        <Portfolio />
        <Contact />
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} {profile.name}. Built with React, Vite & Tailwind CSS.
      </footer>
    </PortfolioTabProvider>
  )
}

export default App
