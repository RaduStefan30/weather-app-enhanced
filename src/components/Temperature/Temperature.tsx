import './Temperature.scss';

const Temperature = ({
  classNames,
  temp,
  tempC,
  tempF,
}: {
  classNames: string;
  temp: string;
  tempC: number;
  tempF: number;
}) => {
  const isCelsius = temp === 'celsius';
  return (
    <h2 className={classNames}>
      {Math.floor(isCelsius ? tempC : tempF)}
      &#176;{isCelsius ? 'C' : 'F'}
    </h2>
  );
};

export default Temperature;
