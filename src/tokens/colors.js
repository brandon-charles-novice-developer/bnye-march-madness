// March Madness Agent — design tokens (sky blue/emerald accent)

export const bg = {
  base:    '#121828',
  card:    '#182030',
  hover:   '#1E2840',
  divider: 'rgba(147, 197, 253, 0.06)',
}

export const brand = {
  primary: '#38BDF8',
  deep:    '#0EA5E9',
}

export const accent = {
  magenta: '#38BDF8',
  cyan:    '#34D399',
  lilac:   '#93C5FD',
}

export const semantic = {
  positive: '#34D399',
  negative: '#EF4444',
  caution:  '#FBBF24',
  muted:    '#FFFFFF',
  text:     '#FFFFFF',
}

export const chart = {
  primary:   '#38BDF8',
  secondary: '#34D399',
  tertiary:  '#93C5FD',
  positive:  '#34D399',
  caution:   '#FBBF24',
}

export const glass = {
  card:           'rgba(147, 197, 253, 0.04)',
  cardHover:      'rgba(147, 197, 253, 0.07)',
  cardBorder:     'rgba(147, 197, 253, 0.08)',
  cardBorderHover:'rgba(147, 197, 253, 0.12)',
  headerBg:       'rgba(18, 24, 40, 0.75)',
  zone1:          'rgba(18, 24, 40, 0.60)',
  zone2:          'rgba(56, 189, 248, 0.12)',
  zone3:          'rgba(24, 32, 48, 0.50)',
  blur:           'blur(12px)',
}

export const tooltipStyle = {
  backgroundColor: 'rgba(18, 24, 40, 0.85)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(147, 197, 253, 0.10)',
  borderRadius: 12,
  fontSize: 12,
  color: '#FFFFFF',
  padding: '8px 12px',
}

// Tournament status colors
export const statusColors = {
  active:     { bg: 'rgba(52, 211, 153, 0.15)',  color: '#34D399' },
  eliminated: { bg: 'rgba(239, 68, 68, 0.15)',   color: '#EF4444' },
  champion:   { bg: 'rgba(56, 189, 248, 0.15)',  color: '#38BDF8' },
}

// Round accent colors
export const roundColors = {
  R64:          '#93C5FD',
  R32:          '#93C5FD',
  S16:          '#38BDF8',
  E8:           '#0EA5E9',
  F4:           '#FBBF24',
  Championship: '#34D399',
}

// Seed tier colors
export const seedColors = {
  top:    '#38BDF8',    // 1-4 seeds
  mid:    '#34D399',    // 5-8 seeds
  low:    '#93C5FD',    // 9-12 seeds
  cindy:  '#FBBF24',    // 13-16 seeds (Cinderellas)
}

// Scoring flow node colors
export const nodeColors = {
  'api':          '#34D399',
  'processing':   '#38BDF8',
  'matching':     '#93C5FD',
  'accumulation': '#FBBF24',
  'output':       '#34D399',
}
