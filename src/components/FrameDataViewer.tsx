import React from 'react'

export type MoveFrameData = {
  name: string
  startup: number
  active: number
  recovery: number
  advantageOnHit: number
  notes?: string
}

type Props = {
  moves: MoveFrameData[]
}

export default function FrameDataViewer({ moves }: Props) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-3">Frame Data</h2>
      <div className="space-y-3">
        {moves.map((m) => (
          <div key={m.name} className="p-3 bg-slate-700 rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{m.name}</div>
                {m.notes && <div className="text-sm text-slate-300">{m.notes}</div>}
              </div>
              <div className="text-right text-sm text-slate-200">
                <div>Start: {m.startup}</div>
                <div>Active: {m.active}</div>
                <div>Recover: {m.recovery}</div>
                <div>Hit adv: {m.advantageOnHit}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
