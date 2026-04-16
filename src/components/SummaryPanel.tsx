import './SummaryPanel.css'
import { RESOURCES } from '../config/resources'
import { useLanguage } from '../i18n/LanguageContext'

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
  const { t } = useLanguage()

  const failedResource = failedCode ? RESOURCES.find((r) => r.code === failedCode) : null
  const failedName = failedResource ? t(failedResource.nameKey) : (failedCode ?? '')

  return (
    <div className="summary">
      <div className="summary__title">{t('summaryTitle')}</div>

      {failed && failedCode && (
        <div className="summary__alert">
          {t('summaryAlertPrefix')}{failedName}{t('summaryAlertSuffix')}
        </div>
      )}

      <div className="summary__stats">
        <div className="summary__stat">
          <span className="summary__stat-label">{t('summaryIndexLabel')}</span>
          <span className="summary__stat-value">{index}</span>
        </div>
        <div className="summary__divider" />
        <div className="summary__stat">
          <span className="summary__stat-label">{t('summaryCatastrophe')}</span>
          <span className={`summary__stat-value${katDisplay > 0 ? ' summary__stat-value--danger' : ''}`}>
            {katDisplay}
          </span>
        </div>
        <div className="summary__divider" />
        <div className="summary__stat">
          <span className="summary__stat-label">{t('summaryFinal')}</span>
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
          {failed ? t('summaryBtnSeeResult') : t('summaryBtnShowResult')}
        </button>
        <button className="summary__btn summary__btn--reset" onClick={onReset}>
          {t('summaryBtnReset')}
        </button>
      </div>
    </div>
  )
}
