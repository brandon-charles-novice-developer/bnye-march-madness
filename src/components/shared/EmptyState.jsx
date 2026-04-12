export default function EmptyState({ message = 'No data available', icon = '\u25E6' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <span className="text-3xl" style={{ color: '#4D4176' }}>{icon}</span>
      <p className="text-sm" style={{ color: '#AFADAD' }}>{message}</p>
    </div>
  )
}
