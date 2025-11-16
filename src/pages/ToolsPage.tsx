import React from 'react'

export default function ToolsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Tools</h2>
      <p className="text-slate-300 mb-4">Utilities to help test and calculate frame interactions.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 mk-card rounded">
          <div className="font-semibold">Frame Calculator</div>
          <div className="text-sm text-slate-300">Calcular advantage, block/hit scenarios.</div>
        </div>
        <div className="p-4 mk-card rounded">
          <div className="font-semibold">Blockstring Tester</div>
          <div className="text-sm text-slate-300">Simula cadenas y verifica frames.</div>
        </div>
      </div>
    </section>
  )
}
