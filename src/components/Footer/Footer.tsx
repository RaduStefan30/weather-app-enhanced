import { useContext } from 'react';
import './Footer.scss';
import { FaGithub, FaEnvelope } from 'react-icons/fa';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';

const Footer = () => {
  const { loading, data } = useContext(WeatherStateContext);
  if (!loading && data)
    return (
      <footer className="footer">
        <p>
          Weather data provided by&nbsp;
          <a
            href="https://www.weatherapi.com/"
            title="Free Weather API"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="footer__image-wrapper">
              <img
                src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
                alt="WeatherAPI.com Logo"
              />
            </span>
          </a>
        </p>
        <p>© 2023 Ranzascu Radu</p>
        <div className="footer__personal-links">
          <a href="mailto:radustefan3010@gmail.com">
            <FaEnvelope />
          </a>
          &nbsp; | &nbsp;
          <a
            href="https://github.com/RaduStefan30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </footer>
    );
};

export default Footer;
