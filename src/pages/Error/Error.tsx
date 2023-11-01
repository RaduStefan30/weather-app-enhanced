import './Error.scss';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-number">404</div>
      <div className="error-message">Oops! Page not found.</div>
      <Link className="error-home-link" to={'/'}>
        Go Home
      </Link>
    </div>
  );
};

export default Error;
