import './LanguageSwitcher.css';
import { useLanguage } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/translations';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const handle = (next: Lang) => () => setLang(next);

  return (
    <div className="lang-switcher" role="group" aria-label="Смена языка / Хэлээ солих">
      <button
        className={`lang-switcher__btn${lang === 'ru' ? ' lang-switcher__btn--active' : ''}`}
        onClick={handle('ru')}
        aria-pressed={lang === 'ru'}
      >
        РУС
      </button>
      <span className="lang-switcher__sep" aria-hidden="true">/</span>
      <button
        className={`lang-switcher__btn${lang === 'mn' ? ' lang-switcher__btn--active' : ''}`}
        onClick={handle('mn')}
        aria-pressed={lang === 'mn'}
      >
        МОН
      </button>
    </div>
  );
}
