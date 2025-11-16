import React from 'react'

export default function CombosPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Combos</h2>
      <p className="text-slate-300 mb-4">Guarda y consulta combos por personaje. (UI minimal por ahora)</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 mk-card rounded">
          <div className="font-semibold">Default Combo</div>
          <div className="text-sm text-slate-300">LP, LP, HP, Special</div>
        </div>
        <div className="p-4 mk-card rounded">
          <div className="font-semibold">Corner BnB</div>
          <div className="text-sm text-slate-300">cr.MK, cr.MP, HP xx EX Special</div>
        </div>
      </div>
    </section>
  )
}
