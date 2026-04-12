import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

export default function TrendLine({ data, color = '#E91E8E', width = 80, height = 32 }) {
  const normalized = data.map((v, i) => ({ i, v }))

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={normalized}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(30, 26, 46, 0.85)',
            WebkitBackdropFilter: 'blur(12px)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            borderRadius: 8,
            fontSize: 11,
            color: '#FFFFFF',
            padding: '4px 8px',
          }}
          formatter={(v) => [typeof v === 'number' ? v.toFixed(0) : v, '']}
          labelFormatter={() => ''}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
