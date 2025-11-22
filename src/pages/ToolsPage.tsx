import React, { useState } from 'react'

export default function ToolsPage() {
  const [oppRecovery, setOppRecovery] = useState<number | ''>('')
  const [myStartup, setMyStartup] = useState<number | ''>('')
  const [result, setResult] = useState<string | null>(null)

  function calculate() {
    if (oppRecovery === '' || myStartup === '') return setResult('Introduce valores válidos')
    const punishFrames = Number(oppRecovery) - Number(myStartup)
    if (punishFrames > 0) setResult(`Punishable: puedes castigar por ${punishFrames} frame(s)`)
    else if (punishFrames === 0) setResult('Justo en timing: tienes 0 frames para castigar')
    else setResult('No es punishable con ese startup')
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Tools</h2>
      <p className="text-slate-300 mb-4">Utilities to help test and calculate frame interactions. Notation used across tools: directions <strong>B/D/F/U</strong> and buttons <strong>1 2 3 4</strong> (1=□, 2=△, 3=✕, 4=○).</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 mk-card rounded">
          <div className="font-semibold mb-2">Frame Calculator</div>
          <div className="text-sm text-slate-300 mb-3">Calculador simple: dado el recovery del movimiento del oponente y el startup de tu movimiento, te dice si puedes castigar.</div>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-slate-300">Opponent recovery (frames)</label>
              <input type="number" className="w-full p-1 mt-1 rounded bg-[var(--card)]" value={oppRecovery as any} onChange={(e) => setOppRecovery(e.target.value === '' ? '' : Number(e.target.value))} />
            </div>
            <div>
              <label className="text-sm text-slate-300">Your move startup (frames)</label>
              <input type="number" className="w-full p-1 mt-1 rounded bg-[var(--card)]" value={myStartup as any} onChange={(e) => setMyStartup(e.target.value === '' ? '' : Number(e.target.value))} />
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 mk-nav-button rounded" onClick={calculate}>Calcular</button>
              <button className="px-3 py-1 rounded" onClick={() => { setOppRecovery(''); setMyStartup(''); setResult(null) }}>Limpiar</button>
            </div>
            {result && <div className="mt-2 text-slate-200">{result}</div>}
          </div>
        </div>

        <div className="p-4 mk-card rounded">
          <div className="font-semibold">Blockstring Tester</div>
          <div className="text-sm text-slate-300">Simula cadenas y verifica frames. (Herramienta minimal por ahora)</div>
        </div>
      </div>
    </section>
  )
}
