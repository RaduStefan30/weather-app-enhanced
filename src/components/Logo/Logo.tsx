import { useNavigate } from 'react-router-dom';
import './Logo.scss';

const Logo = ({ toggleMenu }: { toggleMenu: (close: boolean) => void }) => {
  const navigate = useNavigate();
  return (
    <img
      role="button"
      tabIndex={0}
      className="logo"
      src="/logo.png"
      alt="Logo"
      onClick={() => {
        toggleMenu(true);
        navigate('');
      }}
    />
  );
};

export default Logo;
