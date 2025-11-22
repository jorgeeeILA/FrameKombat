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
    <div className="bg-blue-950 p-4 rounded-lg mk-elevated">
      <h2 className="text-2xl font-bold mb-3 text-blue-100">Frame Data</h2>
      <div className="space-y-3">
        {moves.map((m) => (
          <div key={m.name} className="p-3 bg-blue-900 rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-blue-50">{m.name}</div>
                {m.notes && <div className="text-sm text-blue-200">{m.notes}</div>}
              </div>
              <div className="text-right text-sm text-blue-100">
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
