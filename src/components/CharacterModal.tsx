import React, { useEffect } from 'react'
import type { Character } from '../data/characters'

type Props = {
  character: Character | null
  open: boolean
  onClose: () => void
  onToggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

export default function CharacterModal({ character, open, onClose, onToggleFavorite, isFavorite }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open || !character) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true">
      <div className="bg-[var(--card)] max-w-3xl w-full mx-4 rounded-lg p-6 mk-elevated">
        <div className="flex items-start gap-4">
          <div className="w-40 h-40 bg-white/5 rounded-md overflow-hidden mk-portrait-ring">
            <img src={character.image ?? `/characters/${character.id}.png`} alt={`${character.name} portrait`} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mk-title text-2xl">{character.name}</h2>
                <div className="text-sm text-slate-300">{character.archetype}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleFavorite(character.id)}
                  aria-pressed={isFavorite(character.id)}
                  className="px-3 py-1 rounded-md mk-nav-button"
                >
                  {isFavorite(character.id) ? '♥ Favorito' : '♡ Favorito'}
                </button>
                <button onClick={onClose} className="px-3 py-1 rounded-md bg-transparent border border-white/5">Cerrar</button>
              </div>
            </div>

            {character.notes && <p className="mt-3 text-slate-300 text-sm">{character.notes}</p>}

            <div className="mt-4">
              <button className="px-4 py-2 rounded-md bg-[var(--mk-red)] text-black font-semibold">Ver Frame Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
