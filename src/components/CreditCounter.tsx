import { useCallback, useState } from 'react';
import './CreditCounter.css';
import { useLanguage } from '../i18n/LanguageContext';

export function CreditCounter() {
  const [credits, setCredits] = useState(15);
  const { t } = useLanguage();

  const dec = useCallback(() => setCredits((v) => Math.max(0, v - 1)), []);
  const inc = useCallback(() => setCredits((v) => v + 1), []);

  return (
    <div className="credits">
      <span className="credits__label">{t('credits')}</span>
      <div className="credits__controls">
        <button
          className="credits__btn"
          onClick={dec}
          disabled={credits === 0}
          aria-label={t('creditsDecrease')}
        >
          −
        </button>
        <span className="credits__value">{credits}</span>
        <button
          className="credits__btn"
          onClick={inc}
          aria-label={t('creditsIncrease')}
        >
          +
        </button>
      </div>
    </div>
  );
}
