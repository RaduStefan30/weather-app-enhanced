import './Header.scss';
import Logo from '../Logo/Logo';
import Hamburger from '../Hamburger/Hamburger';

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <Hamburger />
    </div>
  );
};

export default Header;
