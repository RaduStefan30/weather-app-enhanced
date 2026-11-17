import './Hamburger.scss';
import { useTranslation } from 'react-i18next';

const Hamburger = ({
  toggleMenu,
  isMenuOpen,
  isAnimating,
}: {
  toggleMenu: (arg0: boolean) => void;
  isMenuOpen: boolean;
  isAnimating: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <button
      disabled={isAnimating}
      data-testid="hamburger"
      className={`hamburger__container ${isMenuOpen ? 'open' : ''}`}
      aria-label={isMenuOpen ? t('closeSettings') : t('openSettings')}
      aria-expanded={isMenuOpen}
      aria-controls="header-settings"
      onClick={() => toggleMenu(false)}
    >
      <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}></div>
    </button>
  );
};

export default Hamburger;
