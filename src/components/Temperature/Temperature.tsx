import { useContext } from 'react';
import './Temperature.scss';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';

const Temperature = ({
  classNames,
  tempC,
  tempF,
}: {
  classNames: string;
  tempC: number;
  tempF: number;
}) => {
  const { units } = useContext(WeatherStateContext);
  const { temp } = units;
  const isCelsius = temp === 'celsius';
  return (
    <h2 className={classNames}>
      {Math.floor(isCelsius ? tempC : tempF)}
      &#176;{isCelsius ? 'C' : 'F'}
    </h2>
  );
};

export default Temperature;
