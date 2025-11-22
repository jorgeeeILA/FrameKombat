import React from 'react'
import SonicFox from '../assets/SonicFox.jpg'
import Rewind from '../assets/Rewind.jpg'
import Raylakers from '../assets/Raylakers.jpg'
import UnbearableSkill from '../assets/UnbearableSkill.jpg'
import DestroyerFGC from '../assets/DestroyerFGC.png'
import LaVidaManca from '../assets/LaVidaManca.jpeg'
import Moe from '../assets/Moe.jpg'
import NinjaKillah from '../assets/NinjaKillah.png'
import Deoxys from '../assets/Deoxys.jpg'

export default function ExtrasPage() {
  const personalities = [
    { id: 'sonicfox', name: 'SonicFox', img: SonicFox, desc: 'SonicFox, cuyo nombre real es Dominique McLean, es un jugador profesional de esports estadounidense conocido por su éxito en varios juegos de lucha. Es un jugador muy versátil que ha ganado múltiples torneos importantes como el Evolution Championship Series (EVO) y es considerado una de las mayores leyendas del mundo de los esports. Además, es conocido por competir utilizando un disfraz de zorro antropomórfico azul y blanco, su fursona llamada SonicFox. ' },
    { id: 'rewind', name: 'Rewind', img: Rewind, desc: 'Rewind, nombre real Curtis McCall, es uno de los jugadores profesionales más reconocidos en la escena competitiva de Mortal Kombat y otros títulos de NetherRealm Studios. Debutó en EVO 2016 con Mortal Kombat X, donde empezó a llamar la atención por su capacidad para adaptarse rápidamente y su estilo de juego basado en el control del espacio y la solidez en footsies. Su mayor logro llegó en EVO 2018, al coronarse campeón de Injustice 2, consolidándose como uno de los mejores jugadores del mundo.' },
    { id: 'raylakers', name: 'Raylakers', img: Raylakers, desc: 'Es conocido por su precisión, capacidad para castigar errores mínimos y su lectura constante del oponente. Raylakers combina un neutral fuerte con presión inteligente, lo que lo convierte en un rival muy difícil de abrir. Su desempeño en MKX lo ha consolidado como uno de los jugadores más sólidos de la escena moderna del juego, y su evolución continúa llamando la atención tanto en torneos nacionales como internacionales. Fue ganador del combo breaker 2025 y otros torneos onlines.' },
    { id: 'unbearable', name: 'UnbearableSkill', img: UnbearableSkill, desc: 'UnbearableSkill es uno de los jugadores más temidos del competitivo de Mortal Kombat, especialmente en juegos anteriores como MKX. Famoso por su dominio de personajes de grappler y su habilidad para castigar errores mínimos, destaca por su lectura mental superior y su capacidad para imponer presión constante. Su nombre no es casualidad: su estilo defensivo-analítico combinado con ráfagas de agresión lo convierte en un oponente extremadamente difícil de superar.' },
    { id: 'destroyer', name: 'DestroyerFGC', img: DestroyerFGC, desc: 'DestroyerFGC es una figura destacada en la comunidad de Mortal Kombat, particularmente en el rol de organizador y presentador de torneos. Ha creado y dirigido varias series de torneos muy reconocidas, como Champions of the Realms, que ha tenido múltiples ediciones para diferentes entregas de MK. Además de organizar, actúa como anfitrión (“host”) en sus transmisiones: comenta, genera contenido en Twitch y YouTube, y participa activamente en la producción del evento.Aunque en el pasado también ha participado como jugador en algunos torneos, su reputación y valor en la comunidad han crecido mucho más por su labor de promotear el competitivo, proporcionar plataforma a jugadores y generar contenido de alta calidad' },
    { id: 'lavida', name: 'LaVidaManca', img: LaVidaManca, desc: 'LaVidaManca se ha convertido en una figura clave dentro de la comunidad latinoamericana de Mortal Kombat, destacándose no solo por su pasión y carisma, sino por su compromiso en hacer crecer la escena competitiva. En menos de un año, ha organizado múltiples torneos que han reunido a jugadores de toda la región, fomentando la competencia, la camaradería y el entusiasmo por el juego. Su labor ha sido un puente entre los jugadores casuales y los más competitivos, ofreciendo contenido entretenido, accesible y educativo, y creando espacios donde la comunidad puede reunirse, mejorar y celebrar juntos el espíritu de Mortal Kombat. LaVidaManca ha demostrado que con dedicación, creatividad y amor por el juego, se puede inspirar a toda una generación de jugadores y fortalecer la escena latinoamericana.' },
    { id: 'ld_moderns', name: 'LD_Moderns', img: Moe, desc: 'LD_Moderns, originario de Perú, es un talento puro de la escena latinoamericana de Mortal Kombat. Aunque su presencia pueda parecer la de un jugador casual, su nivel competitivo lo sitúa en la cúspide de la jerarquía de alto nivel en LATAM ,Reconocido como la mejor Kitana de la región, LD_Moderns combina un dominio absoluto de su personaje con un mind game y juego neutro que intimida a cualquier oponente. Cada movimiento suyo, cada anticipación y cada decisión estratégica demuestran una precisión y creatividad que desafían los límites de lo posible en combate. Su capacidad para leer al rival, adaptarse y ejecutar con maestría convierte cada partida en un espectáculo de técnica, estrategia y control total.Su presencia inspira respeto, temor y admiración, y deja claro que, cuando entra al escenario, está listo para desafiar a cualquiera y marcar la historia.' },
    { id: 'ninjakillah', name: 'NinjaKillah', img: NinjaKillah, desc: 'NinjaKilla212 es considerado, por gran parte de la comunidad competitiva, como el mejor jugador de Mortal Kombat X de la historia. Su dominio del juego es tan absoluto que redefinió lo que se consideraba posible en ejecución, neutral y optimización dentro de MKX. Con un estilo basado en precisión quirúrgica, reacciones sobrehumanas y una comprensión total del ritmo del combate, NinjaKilla alcanzó un nivel que muy pocos jugadores han logrado igualar. Se hizo legendario con personajes como Liu Kang, demostrando una presión perfecta, combos optimizados en cualquier situación y una capacidad única para controlar cada decisión del oponente. Su nivel mecánico, junto con su disciplina competitiva, lo convirtieron en un jugador prácticamente imbatible tanto en torneos como en sets de larga duración.' },
    { id: 'deoxys', name: 'Deoxys', img: Deoxys, desc: 'Deoxys es un jugador de élite en varios títulos de NetherRealm, famoso por su velocidad de reacción, creatividad en combo routes y su estilo hiperagresivo. En Mortal Kombat 11 fue uno de los mejores Sonya y Jacqui Briggs del mundo, logrando resultados importantes en la Pro Kompetition. Su capacidad para presionar sin descanso, adaptar estrategias y aprovechar cada apertura lo convierten en uno de los jugadores más espectaculares y explosivos del competitivo. actualmente es considerada la mejor kitana del mundo y posiblemente el mejor jugador del momento.' },
  ]

  const tournaments = [
    { name: 'ComboBreaker', link: 'https://www.combo-breaker.com/', note: 'Evento anual con fuerte presencia de juegos de lucha.' },
    { name: 'EVO', link: 'https://evo.shoryuken.com/', note: 'Uno de los torneos de juegos de lucha más grandes del mundo.' },
    { name: 'DreamHack', link: 'https://dreamhack.com/', note: 'Festival de esports con torneos variados, incluido fighting games.' },
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Extras — Comunidad y Recursos</h2>

      <div className="mb-6">
        <h3 className="font-semibold">Enlaces útiles</h3>
        <ul className="ml-6 list-disc text-slate-300">
          <li><a className="text-blue-300 underline" href="https://www.reddit.com/r/MortalKombat/" target="_blank" rel="noopener noreferrer">Foro Reddit — r/MortalKombat</a></li>
          <li><a className="text-blue-300 underline" href="https://www.mortalkombat.com/en-us" target="_blank" rel="noopener noreferrer">Sitio oficial — Mortal Kombat</a></li>
          <li><a className="text-blue-300 underline" href="https://www.youtube.com/user/MortalKombat" target="_blank" rel="noopener noreferrer">Canal oficial de YouTube</a></li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Torneos recomendados</h3>
        <div className="space-y-3 mt-3">
          {tournaments.map((t) => (
            <div key={t.name} className="mk-card p-3 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-slate-300">{t.note}</div>
                </div>
                <a className="text-blue-300 underline" href={t.link} target="_blank" rel="noopener noreferrer">Visitar</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Jugadores / Figuras reconocidas</h3>
        <p className="text-sm text-slate-300">Fotos añadidas desde `src/assets`. Rellena las descripciones cuando quieras.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
          {personalities.map((p) => (
            <div key={p.id} className="p-3 bg-[var(--card)] rounded mk-elevated">
              <div className="flex flex-col items-center gap-3">
                <img src={p.img} alt={p.name} className="w-28 h-28 object-cover rounded" />
                <div className="text-center">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-slate-300">{p.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
