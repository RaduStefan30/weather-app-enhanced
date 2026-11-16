import './Hamburger.scss';

const Hamburger = ({
  toggleMenu,
  isMenuOpen,
  isAnimating,
}: {
  toggleMenu: (arg0: boolean) => void;
  isMenuOpen: boolean;
  isAnimating: boolean;
}) => {
  return (
    <button
      disabled={isAnimating}
      data-testid="hamburger"
      className={`hamburger__container ${isMenuOpen ? 'open' : ''}`}
      aria-label={isMenuOpen ? 'Close settings' : 'Open settings'}
      aria-expanded={isMenuOpen}
      aria-controls="header-settings"
      onClick={() => toggleMenu(false)}
    >
      <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}></div>
    </button>
  );
};

export default Hamburger;
