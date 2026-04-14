import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import MetricCard from '../shared/MetricCard'
import SectionLabel from '../shared/SectionLabel'
import StatusBadge from '../shared/StatusBadge'
import TrendLine from '../shared/TrendLine'
import { useCountUp } from '../../hooks/useCountUp'
import { useFadeIn } from '../../hooks/useFadeIn'
import { brand, accent, semantic, tooltipStyle, seedColors } from '../../tokens/colors'
import leaderboard from '../../data/leaderboard'

/* ── derived metrics (immutable) ── */

const ROUNDS = ['R64', 'R32', 'S16', 'E8', 'F4', 'Championship']

const standings = leaderboard.standings
const leader = standings[0]
const runnerUp = standings[1]
const margin = leader.totalPoints - runnerUp.totalPoints

const totalPoolPoints = standings.reduce((sum, s) => sum + s.totalPoints, 0)
const avgPoints = Math.round(totalPoolPoints / standings.length)

const closestRace = standings
  .slice(0, -1)
  .reduce((best, s, i) => {
    const gap = s.totalPoints - standings[i + 1].totalPoints
    return gap < best.gap ? { gap, upper: s.manager, lower: standings[i + 1].manager } : best
  }, { gap: Infinity, upper: '', lower: '' })

const roundProgressData = ROUNDS.map((round) => ({
  round: round === 'Championship' ? 'Champ' : round,
  ...Object.fromEntries(standings.slice(0, 5).map((s) => [s.manager, s.roundTotals[round] || 0])),
}))

/* ── helpers ── */

function formatNumber(v) {
  return Math.round(v).toLocaleString()
}

function seedTier(seed) {
  if (seed <= 4) return 'top'
  if (seed <= 8) return 'mid'
  if (seed <= 12) return 'low'
  return 'cindy'
}

/* ── KPI Scoreboard ── */

function KpiScoreboard() {
  const fade = useFadeIn()
  const leaderPts = useCountUp({ target: leader.totalPoints, format: formatNumber })
  const poolPts = useCountUp({ target: totalPoolPoints, delay: 100, format: formatNumber })
  const avgPts = useCountUp({ target: avgPoints, delay: 200, format: formatNumber })

  return (
    <div ref={fade.ref} className={fade.className}>
      <SectionLabel>Tournament Complete</SectionLabel>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Champion"
          value={leader.manager}
          delta={`${leaderPts} pts`}
          deltaPositive
          sublabel={`Won by ${margin} pts`}
        />
        <MetricCard
          label="Closest Race"
          value={`${closestRace.gap} pts`}
          sublabel={`${closestRace.upper} vs ${closestRace.lower}`}
        />
        <MetricCard
          label="Total Pool Points"
          value={poolPts}
          sublabel={`${standings.length} managers`}
        />
        <MetricCard
          label="Avg Score"
          value={avgPts}
          sublabel="per manager"
        />
      </div>
    </div>
  )
}

/* ── Round Progression Chart ── */

function RoundProgression() {
  const fade = useFadeIn()
  const top5 = standings.slice(0, 5)
  const colors = [brand.primary, accent.cyan, accent.lilac, semantic.caution, semantic.positive]

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="glass-card rounded-card p-5">
        <SectionLabel>Round-by-Round Scoring (Top 5)</SectionLabel>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={roundProgressData} margin={{ left: 10, right: 10 }}>
            <XAxis
              dataKey="round"
              tick={{ fill: '#FFFFFF', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#FFFFFF', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            {top5.map((s, i) => (
              <Bar
                key={s.manager}
                dataKey={s.manager}
                fill={colors[i]}
                radius={[4, 4, 0, 0]}
                barSize={14}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/* ── Player Row (expandable detail) ── */

function PlayerRow({ player }) {
  const isActive = player.status === 'active'
  const tier = seedTier(player.seed)
  const roundData = ROUNDS.map((r) => player.roundScores[r] || 0)

  return (
    <tr
      className="border-t border-white/5"
      style={{ opacity: isActive ? 1 : 0.6 }}
    >
      <td className="py-2 pl-10 pr-3 text-xs text-white">{player.name}</td>
      <td className="py-2 px-3 text-xs" style={{ color: '#FFFFFF' }}>{player.team}</td>
      <td className="py-2 px-3 text-xs">
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold"
          style={{
            backgroundColor: `${seedColors[tier]}20`,
            color: seedColors[tier],
          }}
        >
          {player.seed}
        </span>
      </td>
      <td className="py-2 px-3 text-xs text-white font-medium">{player.totalPoints}</td>
      <td className="py-2 px-3">
        <TrendLine data={roundData} color={isActive ? brand.primary : '#FFFFFF'} width={100} height={24} />
      </td>
      <td className="py-2 px-3">
        <StatusBadge status={isActive ? 'active' : 'eliminated'} size="xs" />
      </td>
    </tr>
  )
}

/* ── Manager Row (expandable) ── */

function ManagerRow({ standing, rank }) {
  const [expanded, setExpanded] = useState(false)
  const roundData = ROUNDS.map((r) => standing.roundTotals[r] || 0)
  const isFirst = rank === 1

  return (
    <>
      <tr
        className="row-hover"
        style={{ borderLeft: isFirst ? `3px solid ${brand.primary}` : '3px solid transparent' }}
        onClick={() => setExpanded(!expanded)}
      >
        <td className="py-3 pl-4 pr-3">
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
            style={{
              backgroundColor: isFirst ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.05)',
              color: isFirst ? brand.primary : '#FFFFFF',
            }}
          >
            {rank}
          </span>
        </td>
        <td className="py-3 px-3 text-sm font-semibold text-white">
          {standing.manager}
          {isFirst && (
            <span className="ml-2 text-[10px] uppercase tracking-wider" style={{ color: brand.primary }}>
              Champion
            </span>
          )}
        </td>
        <td className="py-3 px-3 text-sm font-bold text-white tabular-nums">
          {standing.totalPoints}
        </td>
        <td className="py-3 px-3 text-xs" style={{ color: '#FFFFFF' }}>
          {standing.activePlayers}/{standing.totalPlayers}
        </td>
        <td className="py-3 px-3">
          <TrendLine data={roundData} color={brand.primary} />
        </td>
        <td className="py-3 px-3 text-xs" style={{ color: '#FFFFFF' }}>
          <span
            className="inline-block transition-transform duration-200"
            style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            ▸
          </span>
        </td>
      </tr>
      {expanded && [...standing.players]
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((player) => (
          <PlayerRow key={player.name} player={player} />
        ))}
    </>
  )
}

/* ── Standings Table ── */

function StandingsTable() {
  const fade = useFadeIn()
  const [sortKey, setSortKey] = useState('totalPoints')
  const [sortAsc, setSortAsc] = useState(false)

  const sorted = [...standings].sort((a, b) => {
    const va = a[sortKey]
    const vb = b[sortKey]
    if (typeof va === 'string') return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va)
    return sortAsc ? va - vb : vb - va
  })

  function handleSort(key) {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(false)
    }
  }

  function SortHeader({ label, field, width }) {
    const isActive = sortKey === field
    return (
      <th
        className="py-2 px-3 text-left cursor-pointer select-none"
        style={{ width, color: isActive ? brand.primary : '#FFFFFF' }}
        onClick={() => handleSort(field)}
      >
        <span className="text-[11px] uppercase tracking-widest font-semibold">
          {label} {isActive ? (sortAsc ? '↑' : '↓') : ''}
        </span>
      </th>
    )
  }

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="glass-card rounded-card overflow-hidden">
        <div className="p-5 pb-0">
          <SectionLabel>Final Standings</SectionLabel>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/8">
                <th className="py-2 pl-4 pr-3 w-12">
                  <span className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: '#FFFFFF' }}>#</span>
                </th>
                <SortHeader label="Manager" field="manager" />
                <SortHeader label="Points" field="totalPoints" width="80px" />
                <SortHeader label="Active" field="activePlayers" width="70px" />
                <th className="py-2 px-3" style={{ width: '100px' }}>
                  <span className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: '#FFFFFF' }}>Trend</span>
                </th>
                <th className="py-2 px-3 w-8" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((standing, i) => (
                <ManagerRow key={standing.manager} standing={standing} rank={i + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── main view ── */

export default function Leaderboard() {
  return (
    <div className="py-6 flex flex-col gap-8">
      <KpiScoreboard />
      <RoundProgression />
      <StandingsTable />
    </div>
  )
}
