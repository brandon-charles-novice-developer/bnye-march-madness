const variants = {
  active:      { bg: 'rgba(34, 197, 94, 0.15)',   color: '#22C55E',  label: 'Active' },
  eliminated:  { bg: 'rgba(239, 68, 68, 0.15)',   color: '#EF4444',  label: 'Eliminated' },
  champion:    { bg: 'rgba(56, 189, 248, 0.15)',  color: '#38BDF8',  label: 'Champion' },
  final:       { bg: 'rgba(148, 163, 184, 0.15)', color: '#FFFFFF',  label: 'Final' },
  positive:    { bg: 'rgba(34, 197, 94, 0.15)',   color: '#22C55E',  label: null },
  caution:     { bg: 'rgba(245, 158, 11, 0.15)',  color: '#F59E0B',  label: null },
  negative:    { bg: 'rgba(239, 68, 68, 0.15)',   color: '#EF4444',  label: null },
}

export default function StatusBadge({ status, label: labelOverride, size = 'sm' }) {
  const variant = variants[status] || variants.active
  const text = labelOverride ?? variant.label ?? status

  const padding = size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold uppercase tracking-wider ${padding}`}
      style={{
        backgroundColor: variant.bg,
        color: variant.color,
        WebkitBackdropFilter: 'blur(6px)',
        backdropFilter: 'blur(6px)',
      }}
    >
      {text}
    </span>
  )
}
