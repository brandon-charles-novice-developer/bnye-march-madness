import { useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { nodes as rawNodes, edges as rawEdges } from '../../data/scoringFlow'
import { glass, semantic, nodeColors } from '../../tokens/colors'
import { useFadeIn } from '../../hooks/useFadeIn'

/* ── GlassNode (custom React Flow node) ── */

function GlassNode({ data }) {
  const color = nodeColors[data.category] ?? '#38BDF8'

  return (
    <div
      style={{
        width: 200,
        background: glass.card,
        backdropFilter: glass.blur,
        WebkitBackdropFilter: glass.blur,
        border: `1px solid ${glass.cardBorder}`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 10,
        padding: '12px 14px',
        cursor: 'pointer',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: color, width: 6, height: 6, border: 'none' }} />
      <Handle type="source" position={Position.Right} style={{ background: color, width: 6, height: 6, border: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span
          className="live-pulse"
          style={{
            display: 'inline-block',
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 6px ${color}99`,
            flexShrink: 0,
          }}
        />
        <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>{data.label}</span>
      </div>

      <p style={{ color: semantic.muted, fontSize: 10, lineHeight: 1.35, margin: 0 }}>
        {data.description}
      </p>

      <span
        style={{
          display: 'inline-block',
          marginTop: 6,
          fontSize: 9,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color,
          background: `${color}22`,
          padding: '2px 6px',
          borderRadius: 4,
        }}
      >
        {data.category}
      </span>
    </div>
  )
}

/* ── Must be defined OUTSIDE component (Phase 2 learning) ── */
const nodeTypes = { custom: GlassNode }

const defaultEdgeOptions = {
  style: { stroke: 'rgba(255,255,255,0.18)', strokeWidth: 1.5 },
}

/* ── Detail Panel ── */

function DetailPanel({ node, onClose }) {
  if (!node) return null
  const d = node.data
  const color = nodeColors[d.category] ?? '#38BDF8'

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 300,
        height: '100%',
        background: 'rgba(18,24,40,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderLeft: `1px solid ${glass.cardBorder}`,
        padding: '24px 20px',
        zIndex: 20,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: 0 }}>{d.label}</h3>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: '#fff',
            width: 28,
            height: 28,
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          X
        </button>
      </div>

      <p style={{ color: semantic.muted, fontSize: 13, lineHeight: 1.5, margin: 0 }}>{d.description}</p>

      <span
        style={{
          display: 'inline-block',
          width: 'fit-content',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color,
          background: `${color}22`,
          padding: '3px 8px',
          borderRadius: 4,
        }}
      >
        {d.category}
      </span>

      {d.file && (
        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source File</h4>
          <span
            style={{
              fontSize: 11,
              color: '#fff',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.10)',
              padding: '4px 8px',
              borderRadius: 4,
              fontFamily: 'monospace',
            }}
          >
            {d.file}
          </span>
        </div>
      )}
    </div>
  )
}

/* ── Main view ── */

export default function ScoringEngine() {
  const [nodes] = useNodesState(rawNodes)
  const [edges] = useEdgesState(rawEdges)
  const [selectedNode, setSelectedNode] = useState(null)
  const fade = useFadeIn()

  const handleNodeClick = useCallback((_event, node) => {
    setSelectedNode(node)
  }, [])

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  return (
    <div ref={fade.ref} className={fade.className} style={{ position: 'relative', height: 'calc(100vh - 80px)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={2}
      >
        <Background color="rgba(255,255,255,0.04)" gap={20} size={1} />
        <Controls
          showInteractive={false}
          style={{
            background: 'rgba(18,24,40,0.8)',
            border: `1px solid ${glass.cardBorder}`,
            borderRadius: 8,
            backdropFilter: 'blur(12px)',
          }}
        />
      </ReactFlow>
      <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  )
}
