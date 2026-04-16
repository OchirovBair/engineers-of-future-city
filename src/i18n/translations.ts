export type Lang = 'ru' | 'mn';

export const translations = {
  ru: {
    // App
    appTitle: 'Инженеры нового мира',
    logoAlt: 'Логотип',
    // CreditCounter
    credits: 'Кредиты',
    creditsDecrease: 'Уменьшить кредиты',
    creditsIncrease: 'Увеличить кредиты',
    // SummaryPanel
    summaryTitle: 'Итоги города',
    summaryAlertPrefix: '⚠ Критический ресурс «',
    summaryAlertSuffix: '» обнулён — Провал!',
    summaryIndexLabel: 'Индекс успешности города',
    summaryCatastrophe: 'Катастрофа',
    summaryFinal: 'Итог',
    summaryBtnSeeResult: 'Посмотреть итог',
    summaryBtnShowResult: 'Показать результат',
    summaryBtnReset: 'Сброс',
    // KatTile
    katLabel: 'Катастрофа',
    katAlt: 'Катастрофа',
    katDecrease: 'Уменьшить катастрофы',
    katIncrease: 'Увеличить катастрофы',
    // ResourceTile
    resourceCritBadge: 'КРИТ',
    resourceDecrease: 'Уменьшить',
    resourceIncrease: 'Увеличить',
    // OutcomeDialog
    dialogClose: 'Закрыть',
    // Resource names
    resourceNameEco: 'Экология',
    resourceNameEnr: 'Энергетика',
    resourceNameInf: 'Инфраструктура',
    resourceNameEkn: 'Экономика',
    resourceNamePrv: 'Закон и порядок',
    resourceNameRes: 'Ресурсы',
    resourceNameTex: 'Технологии',
    // Outcome titles & descriptions
    outcomeFailureTitle: 'Катастрофа',
    outcomeFailureDesc: 'Один из критически важных показателей достиг нуля, город разрушен.',
    outcomeCatastropheTitle: 'Катастрофа',
    outcomeCatastropheDesc: 'Финальный рейтинг критически низок. Город не смог выстоять.',
    outcomeCrisisTitle: 'Город в глубоком кризисе',
    outcomeCrisisDesc: 'Городу удалось избежать краха, но ситуация остаётся крайне тяжёлой.',
    outcomeStrongTitle: 'Сильный город',
    outcomeStrongDesc: 'Город устоял. Ключевые показатели под контролем, есть основа для развития.',
    outcomeExemplaryTitle: 'Образцовый город',
    outcomeExemplaryDesc: 'Все системы работают в штатном режиме. Инженеры будущего справились с вызовами!',
    // Language switcher
    langRu: 'РУ',
    langMn: 'МН',
  },
  mn: {
    // App
    appTitle: 'Шинэ дэлхийн инженерүүд',
    logoAlt: 'Лого',
    // CreditCounter
    credits: 'Кредит',
    creditsDecrease: 'Кредит хасах',
    creditsIncrease: 'Кредит нэмэх',
    // SummaryPanel
    summaryTitle: 'Хотын дүгнэлт',
    summaryAlertPrefix: '⚠ Чухал нөөц «',
    summaryAlertSuffix: '» тэгт хүрсэн — Ялагдал!',
    summaryIndexLabel: 'Хотын амжилтын индекс',
    summaryCatastrophe: 'Гамшиг',
    summaryFinal: 'Нийт',
    summaryBtnSeeResult: 'Дүнг харах',
    summaryBtnShowResult: 'Үр дүнг харуулах',
    summaryBtnReset: 'Дахин эхлэх',
    // KatTile
    katLabel: 'Гамшиг',
    katAlt: 'Гамшиг',
    katDecrease: 'Гамшиг хасах',
    katIncrease: 'Гамшиг нэмэх',
    // ResourceTile
    resourceCritBadge: 'ЧУХАЛ',
    resourceDecrease: 'Хасах',
    resourceIncrease: 'Нэмэх',
    // OutcomeDialog
    dialogClose: 'Хаах',
    // Resource names
    resourceNameEco: 'Экологи',
    resourceNameEnr: 'Эрчим хүч',
    resourceNameInf: 'Дэд бүтэц',
    resourceNameEkn: 'Эдийн засаг',
    resourceNamePrv: 'Хууль дүрэм',
    resourceNameRes: 'Нөөц',
    resourceNameTex: 'Технологи',
    // Outcome titles & descriptions
    outcomeFailureTitle: 'Гамшиг',
    outcomeFailureDesc: 'Чухал үзүүлэлтүүдийн нэг тэг болж, хот сүйрлэд.',
    outcomeCatastropheTitle: 'Гамшиг',
    outcomeCatastropheDesc: 'Эцсийн рейтинг маш бага. Хот тэсвэрлэж чадсангүй.',
    outcomeCrisisTitle: 'Хот хямралд',
    outcomeCrisisDesc: 'Хот сүйрлээс аварч чадсан боловч байдал хэт хүнд хэвээр байна.',
    outcomeStrongTitle: 'Хүчирхэг хот',
    outcomeStrongDesc: 'Хот тэсвэрлэсэн. Гол үзүүлэлтүүд хяналтад байгаа.',
    outcomeExemplaryTitle: 'Үлгэр жишээ хот',
    outcomeExemplaryDesc: 'Бүх системүүд хэвийн ажиллаж байна. Ирээдүйн инженерүүд даалгавраа биелүүлсэн!',
    // Language switcher
    langRu: 'ОРУ',
    langMn: 'МОН',
  },
} as const;

export type TranslationKey = keyof typeof translations.ru;
