import { RefObject } from 'react';
import './HeaderMenu.scss';
import Toggle from '../../Toggle/Toggle';

const HeaderMenu = ({
  isFirstRender,
  isMenuOpen,
}: {
  isFirstRender: RefObject<boolean>;
  isMenuOpen: boolean;
}) => {
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
      </div>
    </>
  );
};

export default HeaderMenu;
