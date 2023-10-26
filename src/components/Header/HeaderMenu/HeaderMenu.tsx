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
        className={`header-menu__overlay ${
          !isFirstRender.current && (isMenuOpen ? 'open' : 'closed')
        }`}
        style={{
          width: isMenuOpen ? '200vw' : '0',
          height: isMenuOpen ? '200vh' : '0',
        }}
      ></div>
      <div className={`header-menu__items ${isMenuOpen ? 'open' : 'closed'}`}>
        <div className="header-menu__toggle-container">
          <Toggle unit={'temp'} reversedTheme={true} />
          <Toggle unit={'distance'} reversedTheme={false} />
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
