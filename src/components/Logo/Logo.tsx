import { useNavigate } from 'react-router-dom';
import { WiDayCloudy } from 'react-icons/wi';
import './Logo.scss';

const Logo = ({ toggleMenu }: { toggleMenu: (close: boolean) => void }) => {
  const navigate = useNavigate();
  return (
    <button
      className="no-styles-button logo-button"
      data-testid="logo"
      aria-label="Enhanced Weather home"
      onClick={() => {
        toggleMenu(true);
        navigate('/');
      }}
    >
      <span className="logo__mark" aria-hidden="true">
        <WiDayCloudy />
      </span>
      <span className="logo__copy">
        <strong>Weather</strong>
        <small>close to home</small>
      </span>
    </button>
  );
};

export default Logo;
