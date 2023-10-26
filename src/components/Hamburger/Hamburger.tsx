import './Hamburger.scss';

const Hamburger = ({
  toggleMenu,
  isAnimating,
}: {
  toggleMenu: () => void;
  isAnimating: boolean;
}) => {
  return (
    <button
      disabled={isAnimating}
      className="hamburger__container"
      onClick={toggleMenu}
    >
      <div className="hamburger"></div>
    </button>
  );
};

export default Hamburger;
