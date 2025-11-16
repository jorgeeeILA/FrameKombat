import React from 'react'

export default function MechanicsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Mechanics</h2>
      <div className="space-y-4 text-slate-300">
        <p>Explicaciones de mecánicas centrales: shimmy, footsies, spacing, neutral, frame traps y whiff punishes.</p>

        <section className="mk-card p-4 rounded">
          <h3 className="font-semibold">Shimmy</h3>
          <p className="text-sm">Técnica para castigar el bloqueo del oponente usando un falso avance y luego una salida rápida que aprovecha su intento de bloquear. Funciona mejor cuando tu oponente usa mucha defensa y suele tirar reversals o techs.</p>
        </section>

        <section className="mk-card p-4 rounded">
          <h3 className="font-semibold">Footsies</h3>
          <p className="text-sm">Juego de neutral basado en pokes y posicionamiento. El objetivo es controlar el espacio con ataques seguros y reaccionar a los intentos del oponente para crear oportunidades de castigo.</p>
        </section>

        <section className="mk-card p-4 rounded">
          <h3 className="font-semibold">Spacing</h3>
          <p className="text-sm">Posicionarte a la distancia adecuada para que tus ataques tengan ventaja o sean seguros. Distancias comunes: max range de poke, rango de whiff punish, rango de anti-air.</p>
        </section>

        <section className="mk-card p-4 rounded">
          <h3 className="font-semibold">Neutral</h3>
          <p className="text-sm">Estado en el que ninguno de los jugadores está en ventaja clara; el objetivo es forzar al oponente a cometer un error o ganar espacio para iniciar la ofensiva.</p>
        </section>

        <section className="mk-card p-4 rounded">
          <h3 className="font-semibold">Frame Traps</h3>
          <p className="text-sm">Secuencias de ataques donde dejas pequeños espacios de recuperación para provocar que el oponente intente presionar y así poder castigar con un ataque más rápido.</p>
        </section>

        <section className="mk-card p-4 rounded">
          <h3 className="font-semibold">Whiff Punish</h3>
          <p className="text-sm">Castigar un ataque fallido (whiff) del oponente con un movimiento de mayor alcance o más rápido. Requiere buena lectura de distancia y tiempos.</p>
        </section>
      </div>
    </section>
  )
}
