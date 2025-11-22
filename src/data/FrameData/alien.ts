import type { MoveFrameData } from '../../components/FrameDataViewer'

const data: MoveFrameData[] = [
  { name: 'Alien - Claw', startup: 8, active: 2, recovery: 14, advantageOnHit: 1, notes: 'Ferocious close-range.' },
  { name: 'Alien - Heavy', startup: 14, active: 4, recovery: 24, advantageOnHit: -10, notes: 'High damage primal hit.' },
  { name: 'Alien - Pounce', startup: 12, active: 3, recovery: 18, advantageOnHit: -4, notes: 'Gap-closer and pressure.' },
  { name: 'Alien - EX Pounce', startup: 9, active: 3, recovery: 12, advantageOnHit: 0, notes: 'EX improves frames.' },
]

export default data
