import { RefObject } from 'react';
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
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <div
        data-testid="header-menu"
        className={`header-menu__overlay ${
          !isFirstRender.current && (isMenuOpen ? 'open' : 'closed')
        }`}
      ></div>
      <div className={`header-menu__items ${isMenuOpen ? 'open' : 'closed'}`}>
        <div className="header-menu__toggle-container">
          <Toggle unit={'temp'} />
          <Toggle unit={'distance'} />
          <Toggle unit={'quantity'} />
        </div>
        <div className="header-menu__languages">
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('ro')}>Romanian</button>
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
