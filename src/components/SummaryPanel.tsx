import './SummaryPanel.css'

interface Props {
  index: number
  katDisplay: number
  final: number
  failed: boolean
  failedCode: string | null
  onShowResult: () => void
  onReset: () => void
}

export function SummaryPanel({ index, katDisplay, final, failed, failedCode, onShowResult, onReset }: Props) {
  return (
    <div className="summary">
      <div className="summary__title">Итоги города</div>

      {failed && failedCode && (
        <div className="summary__alert">
          ⚠ Критический ресурс «{failedCode}» обнулён — Провал!
        </div>
      )}

      <div className="summary__stats">
        <div className="summary__stat">
          <span className="summary__stat-label">Индекс успешности города</span>
          <span className="summary__stat-value">{index}</span>
        </div>
        <div className="summary__divider" />
        <div className="summary__stat">
          <span className="summary__stat-label">Катастрофа</span>
          <span className={`summary__stat-value${katDisplay > 0 ? ' summary__stat-value--danger' : ''}`}>
            {katDisplay}
          </span>
        </div>
        <div className="summary__divider" />
        <div className="summary__stat">
          <span className="summary__stat-label">Итог</span>
          <span className={`summary__stat-value${final < 6 ? ' summary__stat-value--danger' : ''}`}>
            {final}
          </span>
        </div>
      </div>

      <div className="summary__actions">
        <button
          className="summary__btn"
          onClick={onShowResult}
        >
          {failed ? 'Посмотреть итог' : 'Показать результат'}
        </button>
        <button className="summary__btn summary__btn--reset" onClick={onReset}>
          Сброс
        </button>
      </div>
    </div>
  )
}
