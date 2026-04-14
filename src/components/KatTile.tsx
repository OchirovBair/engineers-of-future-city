import './ResourceTile.css'
import './KatTile.css'
import skullIcon from '../assets/images/icon-skull.png'

interface Props {
  katInput: number
  katDisplay: number
  disabled: boolean
  onDelta: (delta: 1 | -1) => void
}

export function KatTile({ katInput, katDisplay, disabled, onDelta }: Props) {
  return (
    <div className={`tile tile--kat${disabled ? ' disabled' : ''}`}>
      <img className="tile__icon tile__icon--skull" src={skullIcon} alt="Катастрофа" />
      <span className="tile__label tile__label--kat">Катастрофа</span>

      <div className="kat__equation">
        <span className="kat__input">{katInput}</span>
        <span className="kat__times">× 2 =</span>
        <span className="kat__display">{katDisplay}</span>
      </div>

      <div className="tile__controls">
        <button
          className="tile__btn tile__btn--kat"
          onClick={() => onDelta(-1)}
          disabled={disabled || katInput === 0}
          aria-label="Уменьшить катастрофы"
        >
          −
        </button>
        <button
          className="tile__btn tile__btn--kat"
          onClick={() => onDelta(1)}
          disabled={disabled}
          aria-label="Увеличить катастрофы"
        >
          +
        </button>
      </div>
    </div>
  )
}
