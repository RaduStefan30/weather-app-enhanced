import { useEffect } from 'react';
import './HeaderMenu.scss';
import Toggle from '../../Toggle/Toggle';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English', flag: '/uk.svg' },
  { code: 'ro', label: 'Română', flag: '/ro.svg' },
  { code: 'es', label: 'Español', flag: '/es.svg' },
  { code: 'fr', label: 'Français', flag: '/fr.svg' },
  { code: 'de', label: 'Deutsch', flag: '/de.svg' },
  { code: 'nl', label: 'Nederlands', flag: '/nl.svg' },
  { code: 'it', label: 'Italiano', flag: '/it.svg' },
  { code: 'zh', label: '中文', flag: '/zh.svg' },
];

const HeaderMenu = ({
  isMenuOpen,
  onClose,
}: {
  isMenuOpen: boolean;
  onClose: () => void;
}) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    void i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMenuOpen, onClose]);

  return (
    <>
      <button
        type="button"
        data-testid="header-menu"
        className={`header-menu__overlay ${isMenuOpen ? 'open' : 'closed'}`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
      />
      <section
        id="header-settings"
        className={`header-menu__items ${isMenuOpen ? 'open' : 'closed'}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        aria-labelledby="settings-title"
      >
        <p className="header-menu__eyebrow">{t('settings')}</p>
        <h2 id="settings-title" className="header-menu__title">
          {t('units')}
        </h2>
        <div className="header-menu__toggle-container">
          <Toggle unit={'temp'} />
          <Toggle unit={'distance'} />
          <Toggle unit={'quantity'} />
        </div>
        <h2 className="header-menu__title">{t('languages')}</h2>
        <div className="header-menu__languages">
          {languages.map((language) => (
            <button
              type="button"
              key={language.code}
              aria-label={language.label}
              aria-pressed={i18n.resolvedLanguage?.startsWith(language.code)}
              onClick={() => changeLanguage(language.code)}
            >
              <img src={language.flag} alt="" />
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default HeaderMenu;
