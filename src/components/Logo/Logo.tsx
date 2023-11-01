import { useNavigate } from 'react-router-dom';
import './Logo.scss';

const Logo = ({ toggleMenu }: { toggleMenu: (close: boolean) => void }) => {
  const navigate = useNavigate();
  return (
    <button
      className="no-styles-button logo-button"
      data-testid="logo"
      aria-label="Logo"
      onClick={() => {
        toggleMenu(true);
        navigate('/');
      }}
    >
      <img className="logo" src="/logo.png" alt="Logo" />
    </button>
  );
};

export default Logo;
