import SectionLabel from '../shared/SectionLabel'
import { useFadeIn } from '../../hooks/useFadeIn'
import { brand, accent, semantic, roundColors } from '../../tokens/colors'
import commentary from '../../data/commentary'

/* ── Commentary Entry Card ── */

function CommentaryCard({ entry, index }) {
  const fade = useFadeIn()
  const roundColor = roundColors[entry.round] || brand.primary
  const isFirst = index === 0

  return (
    <div ref={fade.ref} className={fade.className}>
      <div
        className="glass-card rounded-card overflow-hidden"
        style={{
          borderTop: isFirst ? `2px solid ${brand.primary}` : undefined,
        }}
      >
        {/* Round Header */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{
            background: `linear-gradient(135deg, ${roundColor}15 0%, transparent 60%)`,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${roundColor}20`, color: roundColor }}
            >
              {entry.round}
            </span>
            <h3 className="text-base font-bold text-white">{entry.title}</h3>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Hot Take */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-block w-1 h-4 rounded-full"
                style={{ backgroundColor: brand.primary }}
              />
              <span className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: brand.primary }}>
                Hot Take
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {entry.hotTake}
            </p>
          </div>

          {/* Bust Roast */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-block w-1 h-4 rounded-full"
                style={{ backgroundColor: semantic.negative }}
              />
              <span className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: semantic.negative }}>
                Bust Roast
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {entry.bustRoast}
            </p>
          </div>

          {/* Manager Highlights */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-block w-1 h-4 rounded-full"
                style={{ backgroundColor: accent.cyan }}
              />
              <span className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: accent.cyan }}>
                Manager Highlights
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {entry.managerHighlights.map((mh) => (
                <div
                  key={mh.manager}
                  className="rounded-lg p-3"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span className="text-xs font-semibold text-white block mb-1">{mh.manager}</span>
                  <p className="text-xs leading-relaxed" style={{ color: semantic.muted }}>{mh.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── main view ── */

export default function Commentary() {
  return (
    <div className="py-6 flex flex-col gap-8">
      <SectionLabel>
        Tournament Commentary — {commentary.length} Rounds
      </SectionLabel>

      {commentary.map((entry, i) => (
        <CommentaryCard key={entry.round} entry={entry} index={i} />
      ))}
    </div>
  )
}
