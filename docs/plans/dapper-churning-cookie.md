# Engineers of Future City — веб-калькулятор

## Context

Пользователь делает настольную/карточную игру «Инженеры будущего города» (см. `disc.md`). Цель — одностраничный веб-калькулятор, оформленный в том же футуристическом стиле, что и карточка-пример «Глубокая шахта» (синий фон с голубыми огнями).

Механика из `disc.md`:
- **Старт**: 7 ресурсов (ЭКО=2, ЭНР=2, ИНФ=1, ЭКН=2, ПРВ=1, РЕС=3, ТЕХ=1).
- Пользователь меняет значения ресурсов кнопками `+` / `−`.
- **Критичные ресурсы — ЭКО, ЭНР, ПРВ**. Если любой из них становится равен 0 → **мгновенный провал**: автоматически открывается полноэкранный модал с исходом «Провал / конец игры», пользователь не может больше менять ресурсы до сброса.
- Для остальных ресурсов (ИНФ, ЭКН, РЕС, ТЕХ) обнуление даёт счётчик катастроф **КАТ + 1** (правило `НУЛИ: _ → КАТ + _`).
- **ИНДЕКС** = сумма всех ресурсов; **ФИНАЛ** = ИНДЕКС − (КАТ × 2).
- По нажатию «Показать результат» (если провала ещё нет) открывается полноэкранный модал с картинкой и текстом, выбранным по диапазону ФИНАЛ.

Разворачивается на GitHub Pages через GitHub Actions.

## Стек

- **React 18 + Vite + TypeScript**
- **@radix-ui/react-dialog** — модал с результатом
- CSS (обычные модули / файл на компонент). Без UI-фреймворков.
- Изображения из уже существующей папки `/images` переносятся в `src/assets/images/` и импортируются как ESM-модули (Vite корректно пропишет `base` для Pages).

## Структура проекта

```
/
├─ .github/workflows/deploy.yml       # автодеплой на Pages
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts                     # base: '/<repo-name>/'
├─ public/
│  └─ (favicon)
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx                         # композиция всего экрана
│  ├─ assets/images/                  # переносится из /images
│  ├─ components/
│  │  ├─ ResourceTile.tsx             # карточка одного ресурса с иконкой и +/−
│  │  ├─ ResourceTile.css
│  │  ├─ SummaryPanel.tsx             # ИНДЕКС, КАТ, ФИНАЛ + кнопка «Показать результат»
│  │  ├─ SummaryPanel.css
│  │  ├─ OutcomeDialog.tsx            # Radix Dialog с полноэкранной картинкой
│  │  └─ OutcomeDialog.css
│  ├─ config/
│  │  ├─ resources.ts                 # описание ресурсов: код, имя, иконка, стартовое значение
│  │  └─ outcomes.ts                  # диапазоны ФИНАЛА → { title, description, image }
│  ├─ hooks/
│  │  └─ useGameState.ts              # state + вычисления КАТ/ИНДЕКС/ФИНАЛ
│  ├─ styles/
│  │  └─ global.css                   # фон страницы, CSS-переменные, typography
│  └─ vite-env.d.ts
└─ docs/plans/dapper-churning-cookie.md  (этот файл)
```

## Ключевые файлы и содержимое

### `src/config/resources.ts`
Описание 7 ресурсов. Иконки берутся из `src/assets/images/` (`эко.png` → экология, `Энер.png` → энергия, `инфр.png` → инфраструктура, `эко.png`/`эколог.png`, `зако.png` → право, `ресур.png` → ресурсы, `техн.png` → технологии). Уточнение маппинга:

| Код | Название | Старт | Иконка |
|-----|----------|-------|--------|
| ЭКО | Экология | 2 | `эколог.png` (переработка) |
| ЭНР | Энергия | 2 | `Энер.png` (молния) |
| ИНФ | Инфраструктура | 1 | `инфр.png` (дом) |
| ЭКН | Экономика | 2 | `эко.png` (деньги) |
| ПРВ | Право | 1 | `зако.png` (весы) |
| РЕС | Ресурсы | 3 | `ресур.png` (кирка) |
| ТЕХ | Технологии | 1 | `техн.png` (шестерёнка) |

Экспорт:
```ts
export interface ResourceDef {
  code: 'ЭКО' | 'ЭНР' | 'ИНФ' | 'ЭКН' | 'ПРВ' | 'РЕС' | 'ТЕХ';
  name: string;
  start: number;
  icon: string;    // imported asset URL
  critical: boolean; // true для ЭКО/ЭНР/ПРВ — обнуление = мгновенный провал
}
export const RESOURCES: ResourceDef[] = [ ... ];
// ЭКО, ЭНР, ПРВ помечены critical: true
```

### `src/config/outcomes.ts`
Две сущности:
1. **`FAILURE_OUTCOME`** — отдельный исход «Провал / конец игры», который показывается при обнулении любого критичного ресурса (ЭКО/ЭНР/ПРВ). По умолчанию использует `Череп.png`.
2. **`RANGE_OUTCOMES`** — массив диапазонов ФИНАЛА `{ min, max, title, description, image }`. Я кладу 3 диапазона-заглушки (провал по очкам / выжили / процветание) со ссылками на существующие картинки — помечено комментарием `TODO: заменить`.

### `src/hooks/useGameState.ts`
- `values: Record<code, number>` — текущие значения, старт из `RESOURCES`.
- `setValue(code, delta)` — изменить на `+1` или `−1` (не ниже 0). Если `delta<0` приводит к `0` на критичном ресурсе — значение применяется, дальнейшие изменения блокируются флагом `failed`.
- `failed: boolean` — `true`, если какой-то из ЭКО/ЭНР/ПРВ сейчас равен 0.
- `showResult: boolean` / `openResult()` / `closeResult()` — управление модалом. При переходе `failed → true` `showResult` выставляется в `true` автоматически (useEffect).
- `reset()` — вернуть стартовые значения, снять флаги.
- Производные (через `useMemo`):
  - `index = sum(values)`
  - `kat = count(values, (v, def) => v === 0 && !def.critical)` — КАТ засчитывается только за обнулённые **некритичные** ресурсы (критичные сразу приводят к провалу, а не к КАТ).
  - `final = index - kat * 2`
  - `outcome = failed ? FAILURE_OUTCOME : RANGE_OUTCOMES.find(o => final >= o.min && final <= o.max)`

### `src/components/ResourceTile.tsx`
Плитка в стиле карточки-примера: иконка сверху, код ресурса, текущее значение крупно, кнопки `−` и `+`. Фон плитки — CSS-градиент имитирующий рамку из `Техническая карточка с голубыми огнями.png` (синяя текстура + голубое свечение). Для простоты фон — тёмно-синий градиент с box-shadow `0 0 20px rgba(100,200,255,.4)` и тонкой рамкой.

### `src/components/SummaryPanel.tsx`
Баннер в стиле `Футуристический баннер с голубым светом(1).png`. Три числа: ИНДЕКС, КАТ, ФИНАЛ. Кнопка «Показать результат» → открывает `OutcomeDialog`. Кнопка «Сброс» → `reset()`. При `failed` на панели подсвечивается предупреждение, кнопки ресурсов блокируются.

### `src/components/OutcomeDialog.tsx`
`@radix-ui/react-dialog`:
- `Dialog.Overlay` — затемнение на весь экран.
- `Dialog.Content` — полноэкранный блок `width:100vw;height:100vh`, фоновая картинка из `outcome.image` с `background-size:cover`.
- Заголовок (`outcome.title`) и описание (`outcome.description`) поверх картинки.
- Кнопка-крестик в правом верхнем углу (`Dialog.Close`).

### `src/styles/global.css`
- Фон body — текстура `Layer_7_resized_1000x1600.jpg` (или повторение `Техническая карточка…png`) с overlay тёмно-синего градиента для читаемости, `background-attachment: fixed`, `background-size: cover`.
- CSS-переменные: `--neon-blue: #4ec8ff`, `--panel-bg: rgba(18,38,70,.85)`, `--panel-border: #4ec8ff`.
- Шрифт — системный `system-ui` + `font-weight: 700` для цифр (кастомных шрифтов не добавляем).

### `vite.config.ts`
```ts
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? '/engineers-of-future-city/',
});
```
Имя репозитория подставляется в `base` — если другое, пользователь поменяет константу в `vite.config.ts` либо задаст `VITE_BASE` при сборке.

### `.github/workflows/deploy.yml`
Стандартный Pages workflow:
1. `actions/checkout@v4`
2. `actions/setup-node@v4` (Node 20)
3. `npm ci && npm run build`
4. `actions/upload-pages-artifact@v3` (`./dist`)
5. `actions/deploy-pages@v4`

Триггер: `push` в `main` + `workflow_dispatch`. Permissions: `pages: write`, `id-token: write`. Environment: `github-pages`.

## Данные — старт и формулы

Реализуем ровно по `disc.md:1-16`:
- Стартовые значения — как в строке 2 (`resources.ts`).
- Правило нулей и КАТ — в `useGameState.ts`.
- Формулы ИНДЕКС и ФИНАЛ — в `useGameState.ts`.
- Этапы (ПРОЕКТЫ / РИСКИ / СВЯЗКИ / КРИЗИС) в UI **не отображаются** (по уточнению — «всё вместе»).

## Изображения

Переносятся из `C:/Users/pactu/OneDrive/Desktop/engineers-of-future-city/images/` в `src/assets/images/`. Русские имена файлов сохраняем, но в импортах даём латинские алиасы:
```ts
import iconEco from '../assets/images/эколог.png';
import bgCard from '../assets/images/Техническая карточка с голубыми огнями.png';
// и т.д.
```
Vite корректно обрабатывает пути с кириллицей, но если возникнут проблемы — переименуем при переносе на латиницу.

## Зависимости (package.json)

```
dependencies:
  react ^18
  react-dom ^18
  @radix-ui/react-dialog ^1

devDependencies:
  @types/react, @types/react-dom
  @vitejs/plugin-react
  typescript
  vite
```

## Верификация

После установки:
1. `npm install`
2. `npm run dev` — открыть `http://localhost:5173/engineers-of-future-city/`.
3. **Старт**: убедиться что показаны 7 плиток со значениями 2,2,1,2,1,3,1 и ИНДЕКС=12, КАТ=0, ФИНАЛ=12.
4. **+/−**: кнопки изменяют значение; нельзя уйти ниже 0.
5. **КАТ**: обнулить ИНФ (некритичный) → КАТ=1, ФИНАЛ уменьшается на 2 по сравнению с ИНДЕКС. Обнулить ещё один некритичный → КАТ=2.
6. **Провал**: обнулить ЭКО (или ЭНР/ПРВ) → автоматически открывается модал «Провал»; кнопки ресурсов блокируются. После «Сброс» модал закрывается, значения возвращаются к старту.
7. **Модал по кнопке**: если провала нет, клик «Показать результат» → полноэкранный Radix Dialog с картинкой и текстом для соответствующего диапазона. Крестик закрывает.
8. **Сброс**: возвращает старт и снимает `failed`.
8. `npm run build` — собирается без ошибок, `dist/` содержит `index.html` с правильным `base`.
9. **Deploy**: пушим в `main` → GitHub Actions собирает и публикует; сайт открывается по `https://<user>.github.io/engineers-of-future-city/`.

## Что пользователь редактирует сам после реализации

- `src/config/outcomes.ts` — `FAILURE_OUTCOME` (картинка/текст для провала по ЭКО/ЭНР/ПРВ) и `RANGE_OUTCOMES` (диапазоны ФИНАЛА).
- Картинки исходов — кладёт в `src/assets/images/` и подключает в `outcomes.ts`.
- `vite.config.ts` — `base`, если имя репозитория отличается от `engineers-of-future-city`.
