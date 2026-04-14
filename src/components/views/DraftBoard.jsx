import SectionLabel from '../shared/SectionLabel'
import { useFadeIn } from '../../hooks/useFadeIn'
import { brand, accent, semantic, seedColors } from '../../tokens/colors'
import draft from '../../data/draft'

/* ── derived data ── */

const managers = draft.managers
const rounds = [1, 2, 3, 4, 5, 6, 7, 8]

// Build grid: picks[round][managerIndex]
const grid = rounds.map((round) => {
  const roundPicks = draft.picks.filter((p) => p.round === round)
  const isSerpentineReverse = round % 2 === 0
  const ordered = isSerpentineReverse ? [...roundPicks].reverse() : roundPicks
  return ordered
})

function seedTier(seed) {
  if (seed <= 4) return 'top'
  if (seed <= 8) return 'mid'
  if (seed <= 12) return 'low'
  return 'cindy'
}

/* ── Draft Cell ── */

function DraftCell({ pick }) {
  const isEliminated = pick.status === 'eliminated'
  const tier = seedTier(pick.seed)
  const tierColor = seedColors[tier]

  return (
    <div
      className="glass-card rounded-lg p-2.5 flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        opacity: isEliminated ? 0.5 : 1,
        borderLeft: `2px solid ${tierColor}`,
        minWidth: 120,
      }}
    >
      <span
        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold flex-shrink-0"
        style={{ backgroundColor: `${tierColor}20`, color: tierColor }}
      >
        {pick.seed}
      </span>
      <span
        className="text-xs font-semibold text-white leading-tight truncate"
        style={{ textDecoration: isEliminated ? 'line-through' : 'none' }}
      >
        {pick.player}
      </span>
    </div>
  )
}

/* ── Round Row ── */

function RoundRow({ round, picks }) {
  const isReverse = round % 2 === 0
  const fade = useFadeIn()

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="flex items-center gap-3 mb-2">
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold"
          style={{
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            color: brand.primary,
          }}
        >
          R{round}
        </span>
        <span className="text-xs font-medium" style={{ color: semantic.muted }}>
          {isReverse ? 'Reverse order' : 'Standard order'}
        </span>
        {isReverse && (
          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(52, 211, 153, 0.15)', color: accent.cyan }}>
            SERPENTINE
          </span>
        )}
      </div>

      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${managers.length}, minmax(120px, 1fr))` }}>
        {picks.map((pick) => (
          <DraftCell key={pick.overall} pick={pick} />
        ))}
      </div>
    </div>
  )
}

/* ── Manager Header Row ── */

function ManagerHeaders() {
  return (
    <div
      className="grid gap-2 mb-2 sticky top-0 z-10 py-2"
      style={{
        gridTemplateColumns: `repeat(${managers.length}, minmax(120px, 1fr))`,
        backgroundColor: 'rgba(18, 24, 40, 0.85)',
        backdropFilter: 'blur(12px)',
        marginLeft: '44px',
      }}
    >
      {managers.map((name) => (
        <div key={name} className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: semantic.muted }}>
            {name.split(' ')[0]}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Legend ── */

function SeedLegend() {
  const tiers = [
    { label: '1-4 Seed', key: 'top' },
    { label: '5-8 Seed', key: 'mid' },
    { label: '9-12 Seed', key: 'low' },
    { label: '13-16 Seed', key: 'cindy' },
  ]

  return (
    <div className="flex items-center gap-4">
      {tiers.map(({ label, key }) => (
        <div key={key} className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: seedColors[key] }}
          />
          <span className="text-[10px]" style={{ color: semantic.muted }}>{label}</span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 ml-4">
        <span className="text-[10px] line-through" style={{ color: semantic.muted }}>Eliminated</span>
      </div>
    </div>
  )
}

/* ── main view ── */

export default function DraftBoard() {
  return (
    <div className="py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <SectionLabel>
          Serpentine Draft — {draft.picks.length} Picks
        </SectionLabel>
        <SeedLegend />
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: managers.length * 132 }}>
          <ManagerHeaders />
          <div className="flex flex-col gap-6 pl-11">
            {grid.map((picks, i) => (
              <RoundRow key={rounds[i]} round={rounds[i]} picks={picks} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
