export type Character = {
  id: string
  name: string
  archetype?: string
  notes?: string
  image?: string
}

// Mortal Kombat X (including Kombat Pack DLC and Mortal Kombat XL additions)
export const sampleCharacters: Character[] = [
  {
    id: 'cassie',
    name: 'Cassie Cage',
    archetype: 'Mix-up/Pressure',
    image: '/characters/cassie.png'
  },
  { id: 'dvorah', name: "D'Vorah", archetype: 'Zoning/Control' },
  { id: 'ermac', name: 'Ermac', archetype: 'Teleport/Pressure' },
  { id: 'erron', name: 'Erron Black', archetype: 'Zoner/Guns' },
  { id: 'ferra_torr', name: 'Ferra/Torr', archetype: 'Rushdown/Brawler' },
  { id: 'goro', name: 'Goro', archetype: 'Heavy/BOSS (preorder/DLC)' },
  { id: 'jacqui', name: 'Jacqui Briggs', archetype: 'Rushdown/Combo' },
  { id: 'jax', name: 'Jax', archetype: 'Pressure/Heavy' },
  {
    id: 'johnny',
    name: 'Johnny Cage',
    archetype: 'Mix-up/Zoner',
    image: '/characters/johnny.png'
  },
  { id: 'kano', name: 'Kano', archetype: 'Grapple/Pressure' },
  { id: 'kenshi', name: 'Kenshi', archetype: 'Space-Control' },
  { id: 'kitana', name: 'Kitana', archetype: 'Zoning/Keepaway' },
  {
    id: 'kotal',
    name: 'Kotal Kahn',
    archetype: 'Heavy/Pressure',
    image: '/characters/kotal.png'
  },
  { id: 'kung_jin', name: 'Kung Jin', archetype: 'Zoner/Trickster' },
  { id: 'kung_lao', name: 'Kung Lao', archetype: 'Rushdown/Teleport' },
  { id: 'liu', name: 'Liu Kang', archetype: 'Balanced' },
  {
    id: 'mileena',
    name: 'Mileena',
    archetype: 'Rushdown/Bait',
    image: '/characters/mileena.png'
  },
  { id: 'quan', name: 'Quan Chi', archetype: 'Trickster/Setup' },
  { id: 'raiden', name: 'Raiden', archetype: 'Zoner/Keepaway' },
  { id: 'reptile', name: 'Reptile', archetype: 'Rushdown/Setup' },
  {
    id: 'scorpion',
    name: 'Scorpion',
    archetype: 'Rushdown/Teleport',
    image: '/characters/scorpion.png'
  },
  { id: 'shinnok', name: 'Shinnok', archetype: 'Trick/Zone' },
  {
    id: 'sonya',
    name: 'Sonya Blade',
    archetype: 'Rushdown/Pressure',
    image: '/characters/sonya.png'
  },
  {
    id: 'subzero',
    name: 'Sub-Zero',
    archetype: 'Zoning/Control',
    image: '/characters/subzero.png'
  },
  {
    id: 'takeda',
    name: 'Takeda',
    archetype: 'Mix-up/Pressure',
    image: '/characters/takeda.png'
  },

  // Kombat Pack 1 / 2 and other DLC
  { id: 'jason', name: 'Jason Voorhees', archetype: 'Heavy/Boss (DLC)' },
  { id: 'predator', name: 'Predator', archetype: 'Zoner/Gadget (DLC)' },
  { id: 'tanya', name: 'Tanya', archetype: 'Rushdown (DLC)' },
  { id: 'tremor', name: 'Tremor', archetype: 'Elemental/Brawler (DLC)' },
  { id: 'alien', name: 'Alien (Xenomorph)', archetype: 'Mix/Boss (DLC)' },
  { id: 'bo_rai_cho', name: "Bo' Rai Cho", archetype: 'Support/Brawler (DLC)' },
  { id: 'leatherface', name: 'Leatherface', archetype: 'Heavy/Brawler (DLC)' },
  // Replaced Triborg with its cyber variants present in MKX/XL
  { id: 'cibersmoke', name: 'Cyber Smoke', archetype: 'Hybrid/Clone', image: '/characters/cibersmoke.png' },
  { id: 'cibersubzero', name: 'Cyber Sub-Zero', archetype: 'Hybrid/Clone', image: '/characters/cibersubzero.png' },
  { id: 'sektor', name: 'Sektor', archetype: 'Cyborg/Lancer', image: '/characters/sektor.png' },
  { id: 'cirax', name: 'Cyrax', archetype: 'Cyborg/Bomb', image: '/characters/cirax.png' },

  // Unplayable / cameo in story but present in MKX (listed for reference)
]
