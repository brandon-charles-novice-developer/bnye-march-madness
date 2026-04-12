// March Madness Agent — design tokens (magenta/cyan accent)

export const bg = {
  base:    '#1E1A2E',
  card:    '#252040',
  hover:   '#2D2750',
  divider: 'rgba(255, 255, 255, 0.06)',
}

export const brand = {
  primary: '#E91E8E',
  deep:    '#C2177A',
}

export const accent = {
  magenta: '#E91E8E',
  cyan:    '#00E5FF',
  lilac:   '#C4B5FD',
}

export const semantic = {
  positive: '#22C55E',
  negative: '#EF4444',
  caution:  '#F59E0B',
  muted:    '#AFADAD',
  text:     '#FFFFFF',
}

export const chart = {
  primary:   '#E91E8E',
  secondary: '#00E5FF',
  tertiary:  '#C4B5FD',
  positive:  '#22C55E',
  caution:   '#F59E0B',
}

export const glass = {
  card:           'rgba(255, 255, 255, 0.05)',
  cardHover:      'rgba(255, 255, 255, 0.08)',
  cardBorder:     'rgba(255, 255, 255, 0.10)',
  cardBorderHover:'rgba(255, 255, 255, 0.15)',
  headerBg:       'rgba(30, 26, 46, 0.70)',
  zone1:          'rgba(30, 26, 46, 0.60)',
  zone2:          'rgba(233, 30, 142, 0.12)',
  zone3:          'rgba(37, 32, 64, 0.50)',
  blur:           'blur(14px)',
}

export const tooltipStyle = {
  backgroundColor: 'rgba(30, 26, 46, 0.85)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.10)',
  borderRadius: 12,
  fontSize: 12,
  color: '#FFFFFF',
  padding: '8px 12px',
}

// Tournament status colors
export const statusColors = {
  active:     { bg: 'rgba(34, 197, 94, 0.15)',   color: '#22C55E' },
  eliminated: { bg: 'rgba(239, 68, 68, 0.15)',   color: '#EF4444' },
  champion:   { bg: 'rgba(233, 30, 142, 0.15)',  color: '#E91E8E' },
}

// Round accent colors
export const roundColors = {
  R64:          '#AFADAD',
  R32:          '#C4B5FD',
  S16:          '#00E5FF',
  E8:           '#E91E8E',
  F4:           '#F59E0B',
  Championship: '#22C55E',
}

// Seed tier colors
export const seedColors = {
  top:    '#E91E8E',    // 1-4 seeds
  mid:    '#00E5FF',    // 5-8 seeds
  low:    '#C4B5FD',    // 9-12 seeds
  cindy:  '#F59E0B',    // 13-16 seeds (Cinderellas)
}

// Scoring flow node colors
export const nodeColors = {
  'api':          '#00E5FF',
  'processing':   '#E91E8E',
  'matching':     '#C4B5FD',
  'accumulation': '#F59E0B',
  'output':       '#22C55E',
}
