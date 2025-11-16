import React from 'react'

export type NavKey = 'framedata' | 'details' | 'mechanics' | 'extras'
export type NavKeyAll = NavKey | 'characters' | 'combos' | 'tools'

// eslint-disable-next-line no-unused-vars
type Props = {
  selected: NavKeyAll
  onSelect: (_key: NavKeyAll) => void
}

const items: { key: NavKeyAll; label: string }[] = [
  { key: 'characters', label: 'Characters' },
  { key: 'framedata', label: 'Frame Data' },
  { key: 'details', label: 'Details' },
  { key: 'mechanics', label: 'Mechanics' },
  { key: 'extras', label: 'Extras' },
  { key: 'combos', label: 'Combos' },
  { key: 'tools', label: 'Tools' },
]

export default function Navbar({ selected, onSelect }: Props) {
  return (
    <nav className="mk-navbar sticky top-0 z-40">
      <div className="w-full px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <ul className="flex gap-4 py-3 justify-center">
          {items.map((it) => (
            <li key={it.key}>
              <button
                className={
                  'px-4 py-2 rounded-md text-sm font-semibold transition-colors active-anim mk-card-interactive ' +
                  (selected === it.key
                    ? 'text-black bg-[var(--mk-red)]'
                    : 'text-slate-200 hover:bg-slate-800 hover:translate-y-[-2px]')
                }
                onClick={() => onSelect(it.key)}
              >
                {it.label}
              </button>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
