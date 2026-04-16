import bgCatastrophe from '../assets/images/bg-catastrophe.png';
import bgCrisis from '../assets/images/bg-crisis.png';
import bgStrong from '../assets/images/bg-strong.png';
import bgExemplary from '../assets/images/bg-exemplary.png';
import type { TranslationKey } from '../i18n/translations';
import type { ResourceCode } from './resources';

export interface Outcome {
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  /** URL картинки для полноэкранного модала */
  image: string;
  /** Показывать заголовок красным цветом */
  danger?: boolean;
}

/** Автопровал — критический ресурс обнулён */
export const FAILURE_OUTCOME: Outcome = {
  titleKey: 'outcomeFailureTitle',
  descriptionKey: 'outcomeFailureDesc',
  image: bgCatastrophe,
  danger: true,
};

const КАТАСТРОФА: Outcome = {
  titleKey: 'outcomeCatastropheTitle',
  descriptionKey: 'outcomeCatastropheDesc',
  image: bgCatastrophe,
  danger: true,
};

const ГЛУБОКИЙ_КРИЗИС: Outcome = {
  titleKey: 'outcomeCrisisTitle',
  descriptionKey: 'outcomeCrisisDesc',
  image: bgCrisis,
};

const СИЛЬНЫЙ_ГОРОД: Outcome = {
  titleKey: 'outcomeStrongTitle',
  descriptionKey: 'outcomeStrongDesc',
  image: bgStrong,
};

const ОБРАЗЦОВЫЙ_ГОРОД: Outcome = {
  titleKey: 'outcomeExemplaryTitle',
  descriptionKey: 'outcomeExemplaryDesc',
  image: bgExemplary,
};

/**
 * Выбирает исход по итоговому рейтингу.
 *
 * Образцовый город:       final ≥ 25
 * Сильный город:          final 19–24
 * Город в глубоком кризисе: final 10–19
 * Катастрофа:             final ≤ 9 (или автопровал — см. FAILURE_OUTCOME)
 */
export function selectRangeOutcome(
  final: number,
  _values: Record<ResourceCode, number>,
  _katInput: number,
): Outcome {
  if (final <= 10) return КАТАСТРОФА;
  if (final <= 19) return ГЛУБОКИЙ_КРИЗИС;
  if (final <= 24) return СИЛЬНЫЙ_ГОРОД;
  return ОБРАЗЦОВЫЙ_ГОРОД;
}
