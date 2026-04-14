import skullImg from '../assets/images/icon-skull.png'
import cardBg from '../assets/images/card-bg.png'
import pageBg from '../assets/images/page-bg.jpg'
import banner from '../assets/images/banner.png'

export interface Outcome {
  title: string
  description: string
  /** URL картинки для полноэкранного модала */
  image: string
}

export interface RangeOutcome extends Outcome {
  min: number
  max: number
}

/**
 * Исход при обнулении критичного ресурса (ЭКО/ЭНР/ПРВ).
 * TODO: замените image на нужную картинку
 */
export const FAILURE_OUTCOME: Outcome = {
  title: 'ПРОВАЛ',
  description: 'Критический ресурс города исчерпан. Город не выжил.',
  image: skullImg,
}

/**
 * Диапазоны ФИНАЛЬНОГО значения.
 * ФИНАЛ = ИНДЕКС − (КАТ × 2)
 * TODO: скорректируйте диапазоны и тексты под вашу игру.
 * TODO: замените image на нужные картинки.
 */
export const RANGE_OUTCOMES: RangeOutcome[] = [
  {
    min: -Infinity,
    max: 5,
    title: 'КАТАСТРОФА',
    description: 'Город разрушен. Ресурсы на исходе, надежды нет.',
    image: cardBg,
  },
  {
    min: 6,
    max: 10,
    title: 'ВЫЖИЛИ',
    description: 'Городу удалось устоять. Многое потеряно, но жизнь продолжается.',
    image: banner,
  },
  {
    min: 11,
    max: Infinity,
    title: 'ПРОЦВЕТАНИЕ',
    description: 'Город процветает! Инженеры будущего справились с вызовами.',
    image: pageBg,
  },
]
