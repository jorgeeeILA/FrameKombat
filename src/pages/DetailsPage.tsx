import React from 'react'

export default function DetailsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Mortal Kombat XL — Details</h2>
      <p className="text-slate-300">Información y notas específicas para Mortal Kombat XL edition. Aquí puedes poner:</p>
      <ul className="list-disc ml-6 mt-3 text-slate-300">
        <li>Versiones y parches relevantes</li>
        <li>Notas de balance y cambios por personaje</li>
        <li>Atajos y referencias de comandos</li>
        <li>Links a recursos oficiales y comunidad</li>
      </ul>
    </section>
  )
}
