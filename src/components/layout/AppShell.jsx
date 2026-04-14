import Header from './Header'
import GradientMesh from './GradientMesh'

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <GradientMesh />
      <Header />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-4 pb-2">
        <p className="text-xs leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          <span style={{ color: 'var(--text-tertiary)' }}>Why I built this — </span>
          Real-time data from external APIs arrives with inconsistent entity names and no guaranteed schema. I built an autonomous pipeline that ran for 6 weeks with zero manual intervention — 912 autonomous commits, 95% test coverage.
        </p>
      </div>
      <main
        className="flex-1 overflow-auto relative"
        style={{ zIndex: 1 }}
      >
        {children}
      </main>
    </div>
  )
}
