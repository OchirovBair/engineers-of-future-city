import { useState, useCallback } from 'react'
import { RESOURCES } from './config/resources'
import { useGameState } from './hooks/useGameState'
import { ResourceTile } from './components/ResourceTile'
import { KatTile } from './components/KatTile'
import { SummaryPanel } from './components/SummaryPanel'
import { CreditCounter } from './components/CreditCounter'
import { OutcomeDialog } from './components/OutcomeDialog'
import pageBg from './assets/images/page-bg.png'
import logo from './assets/images/logo.png'
import './styles/global.css'
import './App.css'

export default function App() {
  const game = useGameState()
  const [creditResetKey, setCreditResetKey] = useState(0)

  const handleReset = useCallback(() => {
    game.reset()
    setCreditResetKey((k) => k + 1)
  }, [game])

  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${pageBg})` }}
    >
      <header className="app__header">
        <img className="app__logo" src={logo} alt="Логотип" />
        <h1 className="app__title">Инженеры Будущего Города</h1>
      </header>

      <main className="app__main">
        <div className="app__grid">
          {RESOURCES.map((res) => (
            <ResourceTile
              key={res.code}
              resource={res}
              value={game.values[res.code]}
              disabled={game.failed}
              onDelta={(delta) => game.setValue(res.code, delta)}
            />
          ))}

          <KatTile
            katInput={game.katInput}
            katDisplay={game.katDisplay}
            disabled={game.failed}
            onDelta={game.setKatDelta}
          />
        </div>

        <SummaryPanel
          index={game.index}
          katDisplay={game.katDisplay}
          final={game.final}
          failed={game.failed}
          failedCode={game.failedCode}
          onShowResult={game.openResult}
          onReset={handleReset}
        />

        <CreditCounter key={creditResetKey} />
      </main>

      <OutcomeDialog
        open={game.showResult}
        outcome={game.outcome}
        onClose={game.closeResult}
      />
    </div>
  )
}
