import { useNavigate } from 'react-router-dom';
import './Logo.scss';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      className="logo"
      src="/logo.png"
      alt="Logo"
      onClick={() => navigate('')}
    />
  );
};

export default Logo;
