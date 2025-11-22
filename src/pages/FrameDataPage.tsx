import React from 'react'
import FrameDataViewer from '../components/FrameDataViewer'
import { sampleMoves } from '../data/sampleFD'
import { sampleCharacters } from '../data/characters'
import { frameDataByCharacter, frameDataBios } from '../data/frameDataByCharacter'
import FrameDataEditor from '../components/FrameDataEditor'

type Props = {
  selectedId?: string | null
}

export default function FrameDataPage({ selectedId }: Props) {
  const selected = selectedId ? sampleCharacters.find((s) => s.id === selectedId) : null

  return (
    <section>
      {selected ? (
        <div className="mb-6 p-4 mk-elevated rounded-lg bg-blue-900">
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 bg-white/5 rounded-md overflow-hidden mk-portrait-ring">
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

            <div className="flex-1">
              <h2 className="mk-title text-3xl">{selected.name}</h2>
              <div className="text-sm text-blue-200">{selected.archetype}</div>
              <div className="mt-3 text-sm text-blue-100">{frameDataBios[selected.id]}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-blue-900 rounded mk-elevated text-blue-100">Selecciona un personaje en Characters para ver su framedata.</div>
      )}

      <FrameDataViewer moves={selectedId ? (localStorage.getItem(`fk:framedata:${selectedId}`)
        ? JSON.parse(String(localStorage.getItem(`fk:framedata:${selectedId}`)))
        : frameDataByCharacter[selectedId] ?? sampleMoves)
        : sampleMoves} />

      {selectedId && <FrameDataEditor characterId={selectedId} />}
    </section>
  )
}
