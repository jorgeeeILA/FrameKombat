import React, { useMemo, useState, useEffect } from 'react'
import { sampleCharacters, type Character } from '../data/characters'
import CharacterModal from '../components/CharacterModal'

type Props = {
  onSelectCharacter?: (c: Character) => void
}

export default function CharactersPage({ onSelectCharacter }: Props) {
  const [q, setQ] = useState('')
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})
  const [activeArchetype, setActiveArchetype] = useState<string | null>(null)
  const [modalCharacter, setModalCharacter] = useState<Character | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('fk:favs')
      if (raw) setFavorites(JSON.parse(raw))
    } catch (e) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('fk:favs', JSON.stringify(favorites))
    } catch (e) {}
  }, [favorites])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    let list = sampleCharacters
    if (activeArchetype) list = list.filter((c) => (c.archetype ?? '').toLowerCase().includes(activeArchetype.toLowerCase()))
    if (!term) return list
    return list.filter((c) => {
      const nameMatch = c.name.toLowerCase().includes(term)
      const arche = c.archetype ?? ''
      const archeMatch = arche.toLowerCase().includes(term)
      return nameMatch || archeMatch
    })
  }, [q, activeArchetype])

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Characters</h2>
      <div className="mb-4 flex gap-3 flex-col md:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search characters or archetype..."
          className="w-full p-2 rounded bg-[var(--card)] border border-white/5 text-slate-100"
        />
        <div className="flex gap-2 items-center">
          <label className="text-sm text-slate-300">Filter:</label>
          <select className="p-2 rounded bg-[var(--card)]" value={activeArchetype ?? ''} onChange={(e) => setActiveArchetype(e.target.value || null)}>
            <option value="">All</option>
            {[...new Set(sampleCharacters.map((s) => s.archetype).filter(Boolean))].map((a) => (
              <option key={a} value={a as string}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((c: Character) => (
          <div
            key={c.id}
            role="button"
            tabIndex={0}
            onClick={() => {
              setModalCharacter(c)
              setModalOpen(true)
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                setModalCharacter(c)
                setModalOpen(true)
              }
            }}
            className="group text-center p-4 bg-[var(--card)] rounded-lg transform transition-all hover:scale-105 hover:shadow-2xl focus:scale-105 focus:outline-none border border-white/5 mk-elevated"
          >
            <div className="flex flex-col items-center gap-3">
                <div className="w-36 h-36 bg-white/5 rounded-md flex items-center justify-center overflow-hidden relative mk-topography mk-portrait-ring">
                {/* try public/characters/<id>.png first, fallback to remote c.image */}
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img
                  src={`/characters/${c.id}.png`}
                  alt={`${c.name} portrait`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement
                    if (c.image && img.src !== c.image) img.src = c.image as string
                  }}
                />
              </div>
              <div>
                <div className="mk-title font-semibold text-xl md:text-2xl flex items-center justify-center gap-2">
                  <span>{c.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setFavorites((s) => ({ ...s, [c.id]: !s[c.id] }))
                    }}
                    className="text-sm"
                    aria-pressed={!!favorites[c.id]}
                  >
                    {favorites[c.id] ? '♥' : '♡'}
                  </button>
                </div>
                <div className="text-sm text-slate-300">{c.archetype}</div>
                {c.notes && <div className="text-xs text-slate-400 mt-1">{c.notes}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <CharacterModal
        character={modalCharacter}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onToggleFavorite={(id) => setFavorites((s) => ({ ...s, [id]: !s[id] }))}
        isFavorite={(id) => !!favorites[id]}
        onViewFrameData={(id) => {
          if (onSelectCharacter && modalCharacter) onSelectCharacter(modalCharacter)
        }}
      />
    </section>
  )
}
