import React, { useEffect, useState } from 'react'
import { sampleCharacters, type Character } from '../data/characters'

type Props = {
  onOpenFrameData?: (id: string) => void
}

type Combo = {
  id: string
  title: string
  characterId?: string | null
  notes: string
}

const STORAGE_KEY = 'fk:combos'

export default function CombosPage({ onOpenFrameData }: Props) {
  const [combos, setCombos] = useState<Combo[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setCombos(JSON.parse(raw))
      else
        setCombos([
          { id: 'c1', title: 'Default Combo', characterId: undefined, notes: '1, 1, 3, F+4' },
          { id: 'c2', title: 'Corner BnB', characterId: undefined, notes: 'D+2, D+2, 3 xx EX' },
        ])
    } catch (e) {
      setCombos([])
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(combos))
    } catch (e) {}
  }, [combos])

  function updateCombo(id: string, patch: Partial<Combo>) {
    setCombos((c) => c.map((x) => (x.id === id ? { ...x, ...patch } : x)))
  }

  function addCombo() {
    const id = `c${Date.now()}`
    setCombos((s) => [...s, { id, title: 'Nuevo Combo', characterId: undefined, notes: '' }])
  }

  function removeCombo(id: string) {
    setCombos((s) => s.filter((c) => c.id !== id))
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Combos</h2>
      <p className="text-slate-300 mb-4">Guarda y consulta combos por personaje. Usa notación B/D/F/U y botones 1-4 (1=□,2=△,3=✕,4=○). Asocia un combo a un personaje para abrir su Frame Data.</p>

      <div className="mb-4">
        <button className="px-3 py-1 mk-nav-button rounded" onClick={addCombo}>Añadir combo</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {combos.map((combo) => (
          <div key={combo.id} className="p-4 mk-card rounded">
            <input className="w-full p-1 mb-2 bg-[var(--card)] rounded" value={combo.title} onChange={(e) => updateCombo(combo.id, { title: e.target.value })} />

            <div className="mb-2">
              <label className="text-sm text-slate-300">Personaje:</label>
              <select className="w-full p-1 bg-[var(--card)] rounded mt-1" value={combo.characterId ?? ''} onChange={(e) => updateCombo(combo.id, { characterId: e.target.value || undefined })}>
                <option value="">— Ninguno —</option>
                {sampleCharacters.map((s: Character) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <textarea className="w-full p-2 bg-[var(--card)] rounded mb-2" rows={4} value={combo.notes} onChange={(e) => updateCombo(combo.id, { notes: e.target.value })} />

            <div className="flex gap-2">
              <button className="px-3 py-1 mk-nav-button rounded" onClick={() => removeCombo(combo.id)}>Eliminar</button>
              {combo.characterId && onOpenFrameData && (
                <button
                  className="px-3 py-1 rounded bg-[var(--mk-red)] text-black font-semibold"
                  onClick={() => combo.characterId && onOpenFrameData?.(combo.characterId)}
                >
                  Ver Frame Data
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

