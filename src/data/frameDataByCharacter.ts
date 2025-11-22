import type { MoveFrameData } from '../components/FrameDataViewer'

// Per-character framedata imports 
import cassie from './FrameData/cassie'
import dvorah from './FrameData/dvorah'
import ermac from './FrameData/ermac'
import erron from './FrameData/erron'
import ferra_torr from './FrameData/ferra_torr'
import goro from './FrameData/goro'
import jacqui from './FrameData/jacqui'
import jax from './FrameData/jax'
import johnny from './FrameData/johnny'
import kano from './FrameData/kano'
import kenshi from './FrameData/kenshi'
import kitana from './FrameData/kitana'
import kotal from './FrameData/kotal'
import kung_jin from './FrameData/kung_jin'
import kung_lao from './FrameData/kung_lao'
import liu from './FrameData/liu'
import mileena from './FrameData/mileena'
import quan from './FrameData/quan'
import raiden from './FrameData/raiden'
import reptile from './FrameData/reptile'
import scorpion from './FrameData/scorpion'
import shinnok from './FrameData/shinnok'
import sonya from './FrameData/sonya'
import subzero from './FrameData/subzero'
import takeda from './FrameData/takeda'
import jason from './FrameData/jason'
import predator from './FrameData/predator'
import tanya from './FrameData/tanya'
import tremor from './FrameData/tremor'
import alien from './FrameData/alien'
import bo_rai_cho from './FrameData/bo_rai_cho'
import leatherface from './FrameData/leatherface'
import cibersmoke from './FrameData/cibersmoke'
import cibersubzero from './FrameData/cibersubzero'
import sektor from './FrameData/sektor'
import cirax from './FrameData/cirax'

export const frameDataByCharacter: Record<string, MoveFrameData[]> = {
  cassie,
  dvorah,
  ermac,
  erron,
  ferra_torr,
  goro,
  jacqui,
  jax,
  johnny,
  kano,
  kenshi,
  kitana,
  kotal,
  kung_jin,
  kung_lao,
  liu,
  mileena,
  quan,
  raiden,
  reptile,
  scorpion,
  shinnok,
  sonya,
  subzero,
  takeda,
  jason,
  predator,
  tanya,
  tremor,
  alien,
  bo_rai_cho,
  leatherface,
  cibersmoke,
  cibersubzero,
  sektor,
  cirax,
}

// Mini-biografías por personaje.
export const frameDataBios: Record<string, string> = {
  cassie: 'Hija de Sonya y Johnny, soldado con carisma y estilo, experta en presión y combos rápidos.',
  dvorah: 'Insectoide híbrido aliado a fuerzas oscuras; controla el espacio con trampas y proyectiles.',
  ermac: 'Guerrero telequinético formado por almas fusionadas; teleport y mix-ups sorpresivos.',
  erron: 'Pistolero del desierto, experto en zonal y control con armas y trampas.',
  ferra_torr: 'Pareja brutal: Ferra dirige ataques rápidos mientras Torr hace de muro de fuerza.',
  goro: 'Semidiós Shokan y jefe legendario; fuerza bruta y alcance devastador.',
  jacqui: 'Miembro militar con ataques rápidos y buenas opciones de combo.',
  jax: 'Soldado con brazos cibernéticos; peso pesado en presión y daño.',
  johnny: 'Actor estrella convertido en luchador; estilo ofensivo y herramientas de zoning.',
  kano: 'Forajido con cuchillo y carisma brutal; mezcla de agarres y presión.',
  kenshi: 'Luchador ciego y samurái telequinético; control del espacio y set-ups.',
  kitana: 'Princesa con abanicos mortales; zoning, keepaway y punición desde rango.',
  kotal: 'Guerrero gobernante con poderes solares y golpes pesados.',
  kung_jin: 'Arquero preso de combos y trampas; estilo de zonal y mix-ups.',
  kung_lao: 'Monje veloz con sombrero arrojadizo; movimiento de teleport y presión.',
  liu: 'Clásico héroe equilibrado y técnico; golpes limpios y recursos variados.',
  mileena: 'Agresiva y mortal, usa dientes y engaños para cerrar el oponente.',
  quan: 'Nigromante táctico que manipula espacio y set-ups oscuros.',
  raiden: 'Deidad del trueno con control del espacio y herramientas de zoneo.',
  reptile: 'Luchador ágil con camuflaje y ataques mixtos cuerpo a cuerpo.',
  scorpion: 'Vengador espectral con teleports y el icónico "get over here".',
  shinnok: 'Dios oscuro con poderes mágicos y herramientas de mix/zone.',
  sonya: 'Oficial militar con ofensiva técnica y presion constante.',
  subzero: 'Maestro del hielo que controla el terreno y congela opciones rivales.',
  takeda: 'Joven guerrero con látigos y mix-ups rápidos; técnica y presión.',
  jason: 'Slasher implacable; gran daño físico y peso en pantalla (DLC boss).',
  predator: 'Cazador alienígena con gadgets y ataques a distancia.',
  tanya: 'Luchadora ágil con movimientos impredecibles y ofensiva rápida.',
  tremor: 'Controla elementos y sacude el suelo con golpes contundentes.',
  alien: 'Xenomorfo salvaje; ataques feroces cuerpo a cuerpo y presión brutal.',
  bo_rai_cho: 'Maestro borracho y entrenador, estilo impredecible y fuerte en combate cuerpo a cuerpo.',
  leatherface: 'Hacha y brutalidad; daño masivo y presión descontrolada.',
  cibersmoke: 'Versión cibernética de Smoke; mezcla de clones y ataques técnicos.',
  cibersubzero: 'Sub-Zero con mejoras cibernéticas; control y herramientas mejoradas.',
  sektor: 'Cyborg especializado en lanzadores y zona con misiles.',
  cirax: 'Cyborg experto en bombas y gadgets para controlar el ritmo del combate',
}

export default frameDataByCharacter
