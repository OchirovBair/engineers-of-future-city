import bgCatastrophe from '../assets/images/bg-catastrophe.png';
import bgCrisis from '../assets/images/bg-crisis.png';
import bgStrong from '../assets/images/bg-strong.png';
import bgExemplary from '../assets/images/bg-exemplary.png';
import type { ResourceCode } from './resources';

export interface Outcome {
  title: string;
  description: string;
  /** URL картинки для полноэкранного модала */
  image: string;
  /** Показывать заголовок красным цветом */
  danger?: boolean;
}

/** Автопровал — критический ресурс обнулён */
export const FAILURE_OUTCOME: Outcome = {
  title: 'Катастрофа',
  description:
    'Один из критически важных показателей достиг нуля, город разрушен.',
  image: bgCatastrophe,
  danger: true,
};

const КАТАСТРОФА: Outcome = {
  title: 'Катастрофа',
  description: 'Финальный рейтинг критически низок. Город не смог выстоять.',
  image: bgCatastrophe,
  danger: true,
};

const ГЛУБОКИЙ_КРИЗИС: Outcome = {
  title: 'Город в глубоком кризисе',
  description: 'Городу удалось избежать краха, но ситуация остаётся крайне тяжёлой.',
  image: bgCrisis,
};

const СИЛЬНЫЙ_ГОРОД: Outcome = {
  title: 'Сильный город',
  description: 'Город устоял. Ключевые показатели под контролем, есть основа для развития.',
  image: bgStrong,
};

const ОБРАЗЦОВЫЙ_ГОРОД: Outcome = {
  title: 'Образцовый город',
  description: 'Все системы работают в штатном режиме. Инженеры будущего справились с вызовами!',
  image: bgExemplary,
};

/**
 * Выбирает исход по итоговому рейтингу.
 *
 * Образцовый город:       final ≥ 28
 * Сильный город:          final 21–27
 * Город в глубоком кризисе: final 10–20
 * Катастрофа:             final ≤ 9 (или автопровал — см. FAILURE_OUTCOME)
 */
export function selectRangeOutcome(
  final: number,
  _values: Record<ResourceCode, number>,
  _katInput: number
): Outcome {
  if (final <= 9)  return КАТАСТРОФА;
  if (final <= 20) return ГЛУБОКИЙ_КРИЗИС;
  if (final <= 27) return СИЛЬНЫЙ_ГОРОД;
  return ОБРАЗЦОВЫЙ_ГОРОД;
}
