import { useContext } from 'react';
import './Measurement.scss';
import { WeatherStateContext } from '../../contexts/WeatherContext/WeatherContext';

const Measurement = ({
  className,
  metricValue,
  imperialValue,
  children,
  unitType,
}: {
  className: string;
  metricValue: number;
  imperialValue: number;
  children?: string;
  unitType: 'temperature' | 'distance' | 'quantity' | 'pressure' | '';
}) => {
  const { units } = useContext(WeatherStateContext);

  let symbol = '';
  let isMetric = false;

  switch (unitType) {
    case 'temperature':
      isMetric = units.temp === 'celsius';
      symbol = isMetric ? 'C' : 'F';
      break;
    case 'distance':
      isMetric = units.distance === 'km';
      symbol = isMetric ? 'km' : 'mi';
      break;
    case 'quantity':
      isMetric = units.quantity === 'mm';
      symbol = isMetric ? 'mm' : 'in';
      break;
    case 'pressure':
      isMetric = units.quantity === 'mm';
      symbol = isMetric ? 'mb' : 'in';
      break;
  }

  return (
    <p className={className}>
      {children}
      {Math.floor(isMetric ? metricValue : imperialValue)}
      {unitType === 'temperature'
        ? String.fromCharCode(176)
        : String.fromCharCode(32)}
      {symbol}
    </p>
  );
};

export default Measurement;
