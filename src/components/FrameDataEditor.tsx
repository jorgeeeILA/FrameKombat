import React, { useEffect, useState } from 'react'
import type { MoveFrameData } from './FrameDataViewer'

type MoveType = 'golpe' | 'especial' | 'fatality' | 'otro'

const storageKeyFor = (id: string) => `fk:framedata:${id}`
const lockKey = 'fk:fd:lock'
const passKey = 'fk:fd:pass'

function readStored(id: string): MoveFrameData[] | null {
  try {
    const raw = localStorage.getItem(storageKeyFor(id))
    if (!raw) return null
    return JSON.parse(raw) as MoveFrameData[]
  } catch (e) {
    return null
  }
}

export default function FrameDataEditor({ characterId }: { characterId: string }) {
  const [moves, setMoves] = useState<MoveFrameData[]>([])
  const [editingEnabled, setEditingEnabled] = useState(() => localStorage.getItem(lockKey) === '1')

  useEffect(() => {
    const stored = readStored(characterId)
    if (stored) setMoves(stored)
  }, [characterId])

  function save() {
    localStorage.setItem(storageKeyFor(characterId), JSON.stringify(moves))
    alert('Framedata guardada en localStorage para este personaje.')
  }

  function addMove() {
    setMoves((s) => [
      ...s,
      { name: 'New Move', startup: 10, active: 2, recovery: 20, advantageOnHit: 0, notes: '' },
    ])
  }

  function removeMove(idx: number) {
    if (!confirm('¿Eliminar este movimiento?')) return
    setMoves((s) => s.filter((_, i) => i !== idx))
  }

  function updateMove(idx: number, patch: Partial<MoveFrameData & { moveType?: MoveType }>) {
    setMoves((s) => s.map((m, i) => (i === idx ? { ...m, ...patch } : m)))
  }

  function exportJSON() {
    const data = JSON.stringify(moves, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${characterId}-framedata.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function importJSON(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as MoveFrameData[]
        setMoves(parsed)
        alert('Framedata importada en memoria. Recuerda guardar.')
      } catch (err) {
        alert('Error al importar JSON: archivo inválido')
      }
    }
    reader.readAsText(f)
  }

  function setLock(enabled: boolean) {
    if (enabled) {
      // enabling editing requires password
      const existing = localStorage.getItem(passKey)
      if (!existing) {
        const pass = prompt('Crea una contraseña para habilitar la edición (guárdala en un lugar seguro):')
        if (!pass) return
        localStorage.setItem(passKey, btoa(pass))
        localStorage.setItem(lockKey, '1')
        setEditingEnabled(true)
      } else {
        const pass = prompt('Ingresa la contraseña para habilitar la edición:')
        if (!pass) return
        if (btoa(pass) === existing) {
          localStorage.setItem(lockKey, '1')
          setEditingEnabled(true)
        } else {
          alert('Contraseña incorrecta')
        }
      }
    } else {
      // to disable, require password as well
      const existing = localStorage.getItem(passKey)
      if (!existing) {
        localStorage.removeItem(lockKey)
        setEditingEnabled(false)
        return
      }
      const pass = prompt('Ingresa la contraseña para deshabilitar la edición:')
      if (!pass) return
      if (btoa(pass) === existing) {
        localStorage.removeItem(lockKey)
        setEditingEnabled(false)
      } else {
        alert('Contraseña incorrecta')
      }
    }
  }

  if (!editingEnabled) {
    return (
      <div className="mt-4 p-4 bg-slate-800 rounded">
        <div className="flex items-center justify-between">
          <div className="text-slate-100">Edición deshabilitada para este navegador.</div>
          <div>
            <button
              className="px-3 py-1 bg-green-600 rounded text-white"
              onClick={() => setLock(true)}
            >
              Habilitar edición
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 p-4 bg-slate-800 rounded space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-slate-100 font-semibold">Editor de Frame Data (local)</div>
        <div className="flex items-center gap-2">
          <input type="file" accept="application/json" onChange={importJSON} className="hidden" id="import-fd" />
          <label htmlFor="import-fd" className="px-2 py-1 bg-blue-600 rounded text-white cursor-pointer">Importar JSON</label>
          <button className="px-3 py-1 bg-yellow-600 rounded text-white" onClick={exportJSON}>Exportar JSON</button>
          <button className="px-3 py-1 bg-red-600 rounded text-white" onClick={() => setLock(false)}>Deshabilitar edición</button>
        </div>
      </div>

      <div className="space-y-2">
        {moves.map((m, idx) => (
          <div key={`${m.name}-${idx}`} className="p-2 bg-slate-700 rounded grid grid-cols-6 gap-2 items-center">
            <input className="col-span-2 p-1 rounded" value={m.name} onChange={(e) => updateMove(idx, { name: e.target.value })} />
            <input className="p-1 rounded" type="number" value={m.startup} onChange={(e) => updateMove(idx, { startup: Number(e.target.value) })} />
            <input className="p-1 rounded" type="number" value={m.active} onChange={(e) => updateMove(idx, { active: Number(e.target.value) })} />
            <input className="p-1 rounded" type="number" value={m.recovery} onChange={(e) => updateMove(idx, { recovery: Number(e.target.value) })} />
            <input className="p-1 rounded" type="number" value={m.advantageOnHit} onChange={(e) => updateMove(idx, { advantageOnHit: Number(e.target.value) })} />
            <select className="p-1 rounded col-span-1" onChange={(e) => updateMove(idx, { notes: e.target.value })} value={m.notes ?? ''}>
              <option value="">Notas</option>
              <option value="golpe">golpe</option>
              <option value="especial">especial</option>
              <option value="fatality">fatality</option>
              <option value="otro">otro</option>
            </select>
            <div className="col-span-6 flex gap-2 mt-2">
              <input className="flex-1 p-1 rounded" value={m.notes ?? ''} onChange={(e) => updateMove(idx, { notes: e.target.value })} placeholder="Notas / Tipo" />
              <button className="px-2 py-1 bg-red-600 rounded text-white" onClick={() => removeMove(idx)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-1 bg-green-600 rounded text-white" onClick={addMove}>Agregar movimiento</button>
        <button className="px-3 py-1 bg-blue-600 rounded text-white" onClick={save}>Guardar framedata</button>
      </div>
    </div>
  )
}
