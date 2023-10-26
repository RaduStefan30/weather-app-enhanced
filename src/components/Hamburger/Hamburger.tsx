import './Hamburger.scss';

const Hamburger = ({
  toggleMenu,
  isAnimating,
}: {
  toggleMenu: (arg0: boolean) => void;
  isAnimating: boolean;
}) => {
  return (
    <button
      disabled={isAnimating}
      className="hamburger__container"
      onClick={() => toggleMenu(false)}
    >
      <div className="hamburger"></div>
    </button>
  );
};

export default Hamburger;
