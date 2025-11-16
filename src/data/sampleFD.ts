import type { MoveFrameData } from '../components/FrameDataViewer'

export const sampleMoves: MoveFrameData[] = [
  {
    name: 'Standing Light Punch',
    startup: 4,
    active: 2,
    recovery: 7,
    advantageOnHit: 2,
    notes: 'Good quick poke, +2 on hit',
  },
  {
    name: 'Crouching Heavy Kick',
    startup: 12,
    active: 4,
    recovery: 20,
    advantageOnHit: -6,
    notes: 'High damage, unsafe on block',
  },
  {
    name: 'Forward Dash Attack',
    startup: 6,
    active: 3,
    recovery: 10,
    advantageOnHit: 1,
    notes: 'Use to close distance',
  },
]
