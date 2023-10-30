import { getIconPathByCode } from '../../utils/codeToIcon';
import './WeatherIcon.scss';

const WeatherIcon = ({
  code,
  alt,
  className,
  isDay,
}: {
  code: number;
  alt: string;
  className: string;
  isDay: boolean;
}) => {
  const path = getIconPathByCode(code, isDay);
  return <img src={path} alt={alt} className={className} />;
};

export default WeatherIcon;
