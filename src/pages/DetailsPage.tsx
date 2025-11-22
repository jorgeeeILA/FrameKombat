import React from 'react'

export default function DetailsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Mortal Kombat XL — Detalles</h2>
      <div className="space-y-4 text-slate-300">
        <section className="mk-card p-4 rounded">
          <h3 className="font-semibold">Versiones y Parches</h3>
          <p className="text-sm">Listado de versiones históricas relevantes para MKXL y notas resumidas de balance. Añade aquí cambios por parche, por ejemplo: mejoras/reducciones de prioridad, ajustes de daño o cambios a las propiedades de golpes especiales.</p>
          <ul className="list-disc ml-6 mt-2 text-slate-300">
            <li>MKXL base — Estabilidad y ajustes iniciales de personajes.</li>
            <li>Kombat Pack updates — Nuevos personajes y reequilibrio de kits.</li>
            <li>Parche comunitario (ejemplo) — Correcciones de hitboxes y frame data.</li>
          </ul>
        </section>

        <section className="mk-card p-4 rounded">
          <h3 className="font-semibold">Notas de balance por personaje</h3>
          <p className="text-sm">Aquí puedes poner notas cortas por personaje (seguro las copias desde tu framedata o notas de torneo):</p>
          <ul className="list-disc ml-6 mt-2 text-slate-300">
            <li><strong>Ejemplo:</strong> Sub-Zero — Mejoras en herramientas de zoning; algunos movimientos ahora otorgan ventaja en bloqueo.</li>
            <li><strong>Ejemplo:</strong> Scorpion — Teleport reducido en recovery, mantiene fuerte potencial de mix-up.</li>
          </ul>
        </section>

        <section className="mk-card p-4 rounded">
          <h3 className="font-semibold">Comandos y notación</h3>
          <p className="text-sm">Referencias de notación que usamos en esta app: direcciones en formato <strong>B/D/F/U</strong> y botones numéricos <strong>1 2 3 4</strong> (en tu pad: 1 = □, 2 = △, 3 = ✕, 4 = ○). Ejemplos de lectura: <em>B+1</em> (atrás + botón 1) o <em>D+2</em> (agachado + botón 2).</p>
          <ul className="ml-6 mt-2 text-slate-300">
            <li><strong>Direcciones:</strong> <strong>B</strong> = Back (atrás), <strong>D</strong> = Down (abajo), <strong>F</strong> = Forward (adelante), <strong>U</strong> = Up (arriba).</li>
            <li><strong>Botones:</strong> <strong>1</strong> = Cuadrado (□), <strong>2</strong> = Triángulo (△), <strong>3</strong> = Equis (✕), <strong>4</strong> = Círculo (○).</li>
            <li><strong>Diagonal:</strong> usar combinaciones como <em>DB</em> (diagonal abajo+atrás), <em>DF</em> (diagonal abajo+adelante).</li>
            <li><strong>Ejemplos:</strong> <em>D+2, D+2, 3 xx EX</em> significa agachado + botón 2, repetir, luego botón 3 y cancelar en especial EX.</li>
          </ul>
        </section>

        <section className="mk-card p-4 rounded">
          <h3 className="font-semibold">Recursos rápidos</h3>
          <p className="text-sm">Enlaces y referencias: páginas de frame data, foros y vídeos de ejemplos (usa la sección Extras para enlaces y gente relevante).</p>
          <ul className="ml-6 mt-2 text-slate-300">
            <li><a className="text-blue-300 underline" href="https://as.com/meristation/2015/04/14/guias/1429001820_144104.html" target="_blank" rel="noopener noreferrer">Guía de framedata (Meristation)</a> — recurso con explicación de conceptos y ejemplos útiles para interpretar framedata.</li>
          </ul>
        </section>
      </div>
    </section>
  )
}
