import React from 'react'
import FrameDataViewer from '../components/FrameDataViewer'
import { sampleMoves } from '../data/sampleFD'
import { sampleCharacters } from '../data/characters'

type Props = {
  selectedId?: string | null
}

export default function FrameDataPage({ selectedId }: Props) {
  const selected = selectedId ? sampleCharacters.find((s) => s.id === selectedId) : null

  return (
    <section>
      {selected ? (
        <div className="mb-4 flex items-center gap-4">
          <div className="w-20 h-20 bg-white/5 rounded-md overflow-hidden">
            {/* try public/characters/<id>.png first then fallback to remote image */}
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              src={`/characters/${selected.id}.png`}
              alt={`${selected.name} portrait`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement
                if (selected.image && img.src !== selected.image) img.src = selected.image
              }}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{selected.name}</h2>
            <div className="text-sm text-slate-300">{selected.archetype}</div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-800 rounded">Selecciona un personaje en Characters para ver su framedata.</div>
      )}

      <FrameDataViewer moves={sampleMoves} />
    </section>
  )
}
