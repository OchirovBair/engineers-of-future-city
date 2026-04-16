import './ResourceTile.css'
import type { ResourceDef } from '../config/resources'
import { useLanguage } from '../i18n/LanguageContext'

interface Props {
  resource: ResourceDef
  value: number
  disabled: boolean
  onDelta: (delta: 1 | -1) => void
}

export function ResourceTile({ resource, value, disabled, onDelta }: Props) {
  const { t } = useLanguage()
  const isZero = value === 0
  const isCriticalZero = resource.critical && isZero
  const name = t(resource.nameKey)

  const tileClass = [
    'tile',
    isCriticalZero ? 'critical-zero' : '',
    disabled && !isCriticalZero ? 'disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={tileClass}>
      {resource.critical && <span className="tile__badge">{t('resourceCritBadge')}</span>}
      <img className="tile__icon" src={resource.icon} alt={name} />
      <span className="tile__label">{name}</span>
      <span className={`tile__value${isZero ? ' tile__value--zero' : ''}`}>
        {value}
      </span>
      <div className="tile__controls">
        <button
          className="tile__btn"
          onClick={() => onDelta(-1)}
          disabled={disabled || value === 0}
          aria-label={`${t('resourceDecrease')} ${name}`}
        >
          −
        </button>
        <button
          className="tile__btn"
          onClick={() => onDelta(1)}
          disabled={disabled}
          aria-label={`${t('resourceIncrease')} ${name}`}
        >
          +
        </button>
      </div>
    </div>
  )
}
