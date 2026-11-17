import './Footer.scss';
import { FaGithub, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer__inner">
        <p className="footer__attribution">
          <span>{t('provided')}</span>
          <a
            href="https://www.weatherapi.com/"
            title="Free Weather API"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WeatherAPI.com"
          >
            <img
              src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
              alt="WeatherAPI.com Logo"
            />
          </a>
        </p>
        <p className="footer__copyright">
          © {new Date().getFullYear()} Ranzascu Radu
        </p>
        <div className="footer__personal-links">
          <a
            href="mailto:radustefan3010@gmail.com"
            aria-label="Email Ranzascu Radu"
          >
            <FaEnvelope aria-hidden="true" />
          </a>
          <a
            href="https://github.com/RaduStefan30"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ranzascu Radu on GitHub"
          >
            <FaGithub aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
