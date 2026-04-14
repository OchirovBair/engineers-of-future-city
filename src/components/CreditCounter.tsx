import { useState, useCallback } from 'react'
import './CreditCounter.css'

export function CreditCounter() {
  const [credits, setCredits] = useState(20)

  const dec = useCallback(() => setCredits((v) => Math.max(0, v - 1)), [])
  const inc = useCallback(() => setCredits((v) => v + 1), [])

  return (
    <div className="credits">
      <span className="credits__label">Кредиты</span>
      <div className="credits__controls">
        <button className="credits__btn" onClick={dec} disabled={credits === 0} aria-label="Уменьшить кредиты">−</button>
        <span className="credits__value">{credits}</span>
        <button className="credits__btn" onClick={inc} aria-label="Увеличить кредиты">+</button>
      </div>
    </div>
  )
}
