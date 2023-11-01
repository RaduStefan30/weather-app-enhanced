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
      onClick={() => toggleMenu(false)}
    >
      <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}></div>
    </button>
  );
};

export default Hamburger;
