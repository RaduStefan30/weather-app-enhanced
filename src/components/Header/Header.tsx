import './Header.scss';
import Logo from '../Logo/Logo';
import Hamburger from '../Hamburger/Hamburger';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Hamburger />
    </header>
  );
};

export default Header;
