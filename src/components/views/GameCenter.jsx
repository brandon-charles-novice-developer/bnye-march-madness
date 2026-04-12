import { useState } from 'react'
import SectionLabel from '../shared/SectionLabel'
import { useFadeIn } from '../../hooks/useFadeIn'
import { brand, accent, semantic, roundColors } from '../../tokens/colors'
import games from '../../data/games'

/* ── constants ── */

const ROUNDS = ['Championship', 'F4', 'E8', 'S16', 'R32', 'R64']
const ROUND_LABELS = {
  R64: 'Round of 64',
  R32: 'Round of 32',
  S16: 'Sweet 16',
  E8: 'Elite 8',
  F4: 'Final Four',
  Championship: 'Championship',
}

/* ── Game Card ── */

function GameCard({ game }) {
  const isChampionship = game.round === 'Championship'
  const awayWon = game.away.score > game.home.score
  const homeWon = game.home.score > game.away.score

  return (
    <div
      className="glass-card rounded-card p-4 flex flex-col gap-3"
      style={{
        borderTop: isChampionship ? `2px solid ${brand.primary}` : undefined,
      }}
    >
      <div>
        <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: roundColors[game.round] }}>
          {ROUND_LABELS[game.round]}
        </span>
      </div>

      {/* Matchup */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: semantic.muted }}
            >
              {game.away.seed}
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: awayWon ? '#fff' : semantic.muted }}
            >
              {game.away.name}
            </span>
          </div>
          <span
            className="text-sm font-bold tabular-nums"
            style={{ color: awayWon ? '#fff' : semantic.muted }}
          >
            {game.away.score}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: semantic.muted }}
            >
              {game.home.seed}
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: homeWon ? '#fff' : semantic.muted }}
            >
              {game.home.name}
            </span>
          </div>
          <span
            className="text-sm font-bold tabular-nums"
            style={{ color: homeWon ? '#fff' : semantic.muted }}
          >
            {game.home.score}
          </span>
        </div>
      </div>

      {/* Drafted Players */}
      {game.draftedPlayers.length > 0 && (
        <div className="border-t border-white/5 pt-2 flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: semantic.muted }}>
            Pool Players
          </span>
          {game.draftedPlayers.map((dp) => (
            <div key={`${dp.name}-${dp.manager}`} className="flex items-center justify-between text-xs">
              <span className="text-white">{dp.name}</span>
              <div className="flex items-center gap-2">
                <span style={{ color: semantic.muted }}>{dp.manager.split(' ')[0]}</span>
                <span className="font-bold" style={{ color: accent.cyan }}>{dp.points} pts</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Round Filter Tabs ── */

function RoundTabs({ active, onChange }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      <button
        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        style={{
          backgroundColor: active === 'all' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
          color: active === 'all' ? brand.primary : semantic.muted,
        }}
        onClick={() => onChange('all')}
      >
        All ({games.length})
      </button>
      {ROUNDS.map((round) => {
        const count = games.filter((g) => g.round === round).length
        return (
          <button
            key={round}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{
              backgroundColor: active === round ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
              color: active === round ? roundColors[round] : semantic.muted,
            }}
            onClick={() => onChange(round)}
          >
            {round === 'Championship' ? 'Champ' : round} ({count})
          </button>
        )
      })}
    </div>
  )
}

/* ── main view ── */

export default function GameCenter() {
  const [activeRound, setActiveRound] = useState('all')
  const fade = useFadeIn()

  const filtered = activeRound === 'all'
    ? games
    : games.filter((g) => g.round === activeRound)

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <SectionLabel>{filtered.length} Games</SectionLabel>
        <RoundTabs active={activeRound} onChange={setActiveRound} />
      </div>

      <div ref={fade.ref} className={fade.className}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((game) => (
            <GameCard key={game.gameId} game={game} />
          ))}
        </div>
      </div>
    </div>
  )
}
