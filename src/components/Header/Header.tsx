import { useEffect, useState, useRef } from 'react';
import './Header.scss';
import Logo from '../Logo/Logo';
import Hamburger from '../Hamburger/Hamburger';
import HeaderMenu from './HeaderMenu/HeaderMenu';

const Header = () => {
  const isFirstRender = useRef(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = (close: boolean) => {
    if (close) {
      return setIsMenuOpen(false);
    }
    if (!isAnimating) {
      setIsMenuOpen(!isMenuOpen);
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }
  };

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <header className="header">
      <Logo toggleMenu={toggleMenu} />
      <Hamburger
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
        isAnimating={isAnimating}
      />
      <HeaderMenu isFirstRender={isFirstRender} isMenuOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
