const nodes = [
  {
    id: 'ncaa-api',
    type: 'custom',
    data: {
      label: 'NCAA API',
      description: 'Live game scores & box scores from ncaa-api.henrygd.me',
      category: 'api',
      file: 'ncaa_api.py',
    },
    position: { x: 0, y: 120 },
  },
  {
    id: 'scraper',
    type: 'custom',
    data: {
      label: 'Game Scraper',
      description: 'Polls scoreboard per round, fetches box scores for final games',
      category: 'processing',
      file: 'cli.py',
    },
    position: { x: 260, y: 120 },
  },
  {
    id: 'box-score',
    type: 'custom',
    data: {
      label: 'Box Score Parser',
      description: 'Extracts per-player stats: points, minutes, FG, 3P, FT, rebounds',
      category: 'processing',
      file: 'ncaa_api.py',
    },
    position: { x: 520, y: 120 },
  },
  {
    id: 'matcher',
    type: 'custom',
    data: {
      label: 'Player Matcher',
      description: 'Fuzzy-matches box score names to 80 drafted players (handles Jr/Sr, Cam/Cameron)',
      category: 'matching',
      file: 'score_store.py',
    },
    position: { x: 780, y: 120 },
  },
  {
    id: 'accumulator',
    type: 'custom',
    data: {
      label: 'Score Accumulator',
      description: 'Sums points per player per round, separates live vs final, rolls up to manager totals',
      category: 'accumulation',
      file: 'score_store.py',
    },
    position: { x: 1040, y: 120 },
  },
  {
    id: 'feed-builder',
    type: 'custom',
    data: {
      label: 'Feed Builder',
      description: 'Generates leaderboard, game highlights, and pool metadata JSON feeds',
      category: 'output',
      file: 'feed_builder.py',
    },
    position: { x: 1300, y: 120 },
  },
  {
    id: 'leaderboard-out',
    type: 'custom',
    data: {
      label: 'Leaderboard',
      description: 'Final ranked standings with round breakdowns, active players, and projections',
      category: 'output',
      file: 'leaderboard.json',
    },
    position: { x: 1560, y: 120 },
  },
]

const edges = [
  { id: 'e1', source: 'ncaa-api', target: 'scraper', animated: true, style: { stroke: '#00E5FF' } },
  { id: 'e2', source: 'scraper', target: 'box-score', animated: true, style: { stroke: '#E91E8E' } },
  { id: 'e3', source: 'box-score', target: 'matcher', animated: true, style: { stroke: '#E91E8E' } },
  { id: 'e4', source: 'matcher', target: 'accumulator', animated: true, style: { stroke: '#C4B5FD' } },
  { id: 'e5', source: 'accumulator', target: 'feed-builder', animated: true, style: { stroke: '#F59E0B' } },
  { id: 'e6', source: 'feed-builder', target: 'leaderboard-out', animated: true, style: { stroke: '#22C55E' } },
]

export { nodes, edges }
export default { nodes, edges }
