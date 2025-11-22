import React, { useState } from 'react'
import logoSrc from './assets/MkFondo_Small.png'
import Navbar from './components/Navbar'
import FrameDataPage from './pages/FrameDataPage'
import DetailsPage from './pages/DetailsPage'
import MechanicsPage from './pages/MechanicsPage'
import ExtrasPage from './pages/ExtrasPage'
import CharactersPage from './pages/CharactersPage'
import CombosPage from './pages/CombosPage'
import ToolsPage from './pages/ToolsPage'

export default function App() {
  const [active, setActive] = useState<'framedata' | 'details' | 'mechanics' | 'extras' | 'characters' | 'combos' | 'tools'>('characters')

  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#030204] text-slate-100">
      <header className="py-8">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex items-center gap-3">
            <a href="/" className="block">
              <img
                src={logoSrc}
                alt="MK logo"
                className="w-20 h-20 md:w-28 md:h-28 object-contain bg-white/5 p-1 rounded-md shadow-md"
              />
            </a>
            <div className="text-left">
              <h1 className="mk-title text-5xl md:text-8xl leading-tight">FRAMEKOMBAT</h1>
              <div className="mt-2 md:mt-3 flex items-center gap-3">
                <div className="mk-drip" aria-hidden>
                  <span className="drop" />
                  <span className="drop" />
                  <span className="drop" />
                </div>
                <p className="text-sm text-slate-300">MORTAL KOMBAT XL — Explorador de framedata y técnicas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navbar full width */}
      <Navbar selected={active} onSelect={(k) => setActive(k)} />

      <div className="max-w-5xl mx-auto p-6">
        <main className="space-y-6">
          {active === 'framedata' && <FrameDataPage selectedId={selectedCharacter} />}
          {active === 'details' && <DetailsPage />}
          {active === 'mechanics' && <MechanicsPage />}
          {active === 'extras' && <ExtrasPage />}
          {active === 'characters' && (
            <CharactersPage
              onSelectCharacter={(c) => {
                setSelectedCharacter(c.id)
                setActive('framedata')
              }}
            />
          )}
          {active === 'combos' && (
            <CombosPage
              onOpenFrameData={(id: string) => {
                setSelectedCharacter(id)
                setActive('framedata')
              }}
            />
          )}
          {active === 'tools' && <ToolsPage />}
        </main>
      </div>
    </div>
  )
}
