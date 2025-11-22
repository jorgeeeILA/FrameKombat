import React, { useMemo, useState } from 'react'

type Mech = { id: string; title: string; desc: string }

const mechanicsByCategory: Record<string, Mech[]> = {
  Neutral: [
    { id: 'footsies', title: 'Footsies', desc: 'Juego de neutral basado en pokes y posicionamiento para controlar espacio y forzar errores.' },
    { id: 'spacing', title: 'Spacing', desc: 'Colocarse a la distancia donde tus ataques son efectivos o seguros; clave para whiff punish.' },
    { id: 'poke', title: 'Poke Out / Counterpoke', desc: 'Usar pokes seguros para castigar acercamientos del rival o salir de situaciones peligrosas.' },
    { id: 'zoning', title: 'Zoning', desc: 'Control del espacio con proyectiles y ataques de rango para mantener al rival lejos.' },
    { id: 'antiair', title: 'Anti-Air', desc: 'Movimientos para castigar saltos del oponente desde tierra.' },
    { id: 'aitoair', title: 'Air-to-Air', desc: 'Interacciones entre ataques aéreos para dominar el espacio vertical.' },
    { id: 'neutraljump', title: 'Neutral Jump Punch (NJP)', desc: 'Salto neutral con puñetazo para presionar o baitear anti-airs y ajustar spacing.' },
  ],
  Offense: [
    { id: 'mixups', title: 'Mixups', desc: 'Variar ataques altos/bajos/throws para confundir la defensa del rival.' },
    { id: '5050', title: '50/50', desc: 'Situación de mixup donde el rival debe elegir entre dos opciones con probabilidades similares (p. ej. high/low o throw/strike).' },
    { id: 'hilo', title: 'High/Low Mix', desc: 'Alternar altos y bajos para romper el bloqueo y forzar una lectura.' },
    { id: 'tickthrow', title: 'Tick Throw', desc: 'Pequeña presión seguida por throw para sorprender a quien bloquea.' },
    { id: 'frametrap', title: 'Frame Trap', desc: 'Dejar un pequeño espacio entre ataques para provocar que el rival presione y así castigarlo.' },
    { id: 'pressure', title: 'Pressure / Blockstring', desc: 'Mantener al rival en bloqueo con cadenas seguras para seguir la ofensiva.' },
    { id: 'meaty', title: 'Meaty / Safe Jump', desc: 'Ataques cronometrados al levantarse el rival para limitar sus opciones de wakeup.' },
    { id: 'setplay', title: 'Setplay / Vortex', desc: 'Setups replicables que crean decisiones difíciles (mixups) para el rival.' },
    { id: 'combos', title: 'Combos / Daño / Conversion', desc: 'Maximizar daño mediante hit-confirms, juggles, re-stands y conversions.' },
  ],
  Defense: [
    { id: 'blocking', title: 'Blocking / Defensa', desc: 'Mantener la guardia para reducir daño y evitar castigos; incluye high/low blocking.' },
    { id: 'backdash', title: 'Backdash / Escape', desc: 'Evadir presión con backdash o escapes para resetear neutral.' },
    { id: 'fuzzy', title: 'Fuzzy Guard', desc: 'Técnica para complicar la lectura de high/low del rival con timings variables.' },
    { id: 'trades', title: 'Trades', desc: 'Intercambio de golpes; algunas trades son favorables si conviertes a daño o ventaja.' },
    { id: 'armor', title: 'Armored Moves', desc: 'Movimientos con armor que absorben golpes para seguir atacando.' },
    { id: 'wakeups', title: 'Wakeups / Delayed Wake Up', desc: 'Opciones al levantarse: reversals, techs y tácticas de timing para evitar meaties.' },
  ],
  Advanced: [
    { id: 'os', title: 'Option Select (OS)', desc: 'Inputs que cubren múltiples respuestas del rival; técnica avanzada para seguridad.' },
    { id: 'runcancel', title: 'Run / Run Cancels', desc: 'Movilidad para cerrar distancia y cancelar en ataques para extender presión o combos.' },
    { id: 'interact', title: 'Interactables', desc: 'Objetos de escenario que se usan para posicionamiento o daño adicional.' },
    { id: 'variations', title: 'Variations', desc: 'Diferencias de kit por personaje que cambian el estilo de juego.' },
    { id: 'unblock', title: 'Unblockables', desc: 'Setups donde el rival no puede bloquear por orientación o timing; situacional y peligroso.' },
    { id: 'highlevel', title: 'Avanzadas / High Level', desc: 'Técnicas de alto nivel: reading, conditioning, setups complejos y optimizaciones.' },
  ],
  Aerial: [
    { id: 'jumpin', title: 'Jump-In', desc: 'Ataque desde el aire para iniciar presión; depende de timing y lectura.' },
    { id: 'crossup', title: 'Cross-Up', desc: 'Ataque que cruza la posición del rival al aterrizar, complicando el bloqueo.' },
    { id: 'divekick', title: 'Divekick', desc: 'Ataque aéreo rápido dirigido hacia abajo; herramienta de presión aérea.' },
    { id: 'airmob', title: 'Air Mobility / Air Special', desc: 'Movimientos y movilidad en aire para acercarse, presionar o evadir.' },
  ],
}

export default function MechanicsPage() {
  const categories = Object.keys(mechanicsByCategory)
  const [active, setActive] = useState<string>(categories[0] || 'Neutral')
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const list = useMemo(() => {
    const items = mechanicsByCategory[active] || []
    if (!q.trim()) return items
    const term = q.trim().toLowerCase()
    return items.filter((it) => it.title.toLowerCase().includes(term) || it.desc.toLowerCase().includes(term))
  }, [active, q])

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">Mechanics — Guía rápida</h2>

      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2 overflow-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-3 py-1 rounded-md ${active === c ? 'bg-[var(--mk-red)] text-black font-semibold' : 'bg-[var(--card)] text-slate-200'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar mecánica..."
            className="p-2 rounded bg-[var(--card)] border border-white/5 text-slate-100"
          />
          <button onClick={() => { setQ(''); setOpenId(null) }} className="px-3 py-1 rounded mk-nav-button">Limpiar</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((m) => (
          <article key={m.id} className="p-4 mk-card rounded transform transition-all hover:scale-105">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-lg">{m.title}</h3>
                <p className="text-sm text-slate-300 mt-1">{m.desc.slice(0, 120)}{m.desc.length > 120 ? '...' : ''}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => setOpenId((s) => (s === m.id ? null : m.id))} className="px-2 py-1 rounded bg-[var(--mk-red)] text-black">{openId === m.id ? 'Cerrar' : 'Ver'}</button>
              </div>
            </div>

            {openId === m.id && (
              <div className="mt-3 text-sm text-slate-200">
                <div className="mb-2">{m.desc}</div>
                <div className="text-xs text-slate-400">Consejo: edita o pide ejemplos más concretos para esta técnica.</div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
