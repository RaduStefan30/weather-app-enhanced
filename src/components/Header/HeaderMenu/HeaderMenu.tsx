import { RefObject, useEffect } from 'react';
import './HeaderMenu.scss';
import Toggle from '../../Toggle/Toggle';
import { useTranslation } from 'react-i18next';

const HeaderMenu = ({
  isFirstRender,
  isMenuOpen,
}: {
  isFirstRender: RefObject<boolean>;
  isMenuOpen: boolean;
}) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  return (
    <>
      <div
        data-testid="header-menu"
        className={`header-menu__overlay ${
          !isFirstRender.current && (isMenuOpen ? 'open' : 'closed')
        }`}
      ></div>
      <div className={`header-menu__items ${isMenuOpen ? 'open' : 'closed'}`}>
        <h2 className="header-menu__units">{t('units')}</h2>
        <div className="header-menu__toggle-container">
          <Toggle unit={'temp'} />
          <Toggle unit={'distance'} />
          <Toggle unit={'quantity'} />
        </div>
        <h2 className="header-menu__units">{t('languages')}</h2>
        <div className="header-menu__languages">
          <button onClick={() => changeLanguage('en')}>
            <img src="/uk.svg" alt="uk flag" />
          </button>
          <button onClick={() => changeLanguage('ro')}>
            <img src="/ro.svg" alt="romanian flag" />
          </button>
          <button onClick={() => changeLanguage('es')}>
            <img src="/es.svg" alt="spanish flag" />
          </button>
          <button onClick={() => changeLanguage('fr')}>
            <img src="/fr.svg" alt="french flag" />
          </button>
          <button onClick={() => changeLanguage('de')}>
            <img src="/de.svg" alt="german flag" />
          </button>
          <button onClick={() => changeLanguage('nl')}>
            <img src="/nl.svg" alt="netherlands flag" />
          </button>
          <button onClick={() => changeLanguage('it')}>
            <img src="/it.svg" alt="italian flag" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
