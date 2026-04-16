import './ResourceTile.css'
import './KatTile.css'
import skullIcon from '../assets/images/icon-skull.png'
import { useLanguage } from '../i18n/LanguageContext'

interface Props {
  katInput: number
  katDisplay: number
  disabled: boolean
  onDelta: (delta: 1 | -1) => void
}

export function KatTile({ katInput, katDisplay, disabled, onDelta }: Props) {
  const { t } = useLanguage()

  return (
    <div className={`tile tile--kat${disabled ? ' disabled' : ''}`}>
      <img className="tile__icon tile__icon--skull" src={skullIcon} alt={t('katAlt')} />
      <span className="tile__label tile__label--kat">{t('katLabel')}</span>

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
          aria-label={t('katDecrease')}
        >
          −
        </button>
        <button
          className="tile__btn tile__btn--kat"
          onClick={() => onDelta(1)}
          disabled={disabled}
          aria-label={t('katIncrease')}
        >
          +
        </button>
      </div>
    </div>
  )
}
