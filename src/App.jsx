import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Leaderboard from './components/views/Leaderboard'
import DraftBoard from './components/views/DraftBoard'
import GameCenter from './components/views/GameCenter'
import Commentary from './components/views/Commentary'
import ScoringEngine from './components/views/ScoringEngine'

function AppInner() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/draft" element={<DraftBoard />} />
        <Route path="/games" element={<GameCenter />} />
        <Route path="/commentary" element={<Commentary />} />
        <Route path="/scoring" element={<ScoringEngine />} />
      </Routes>
    </AppShell>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppInner />
    </BrowserRouter>
  )
}
