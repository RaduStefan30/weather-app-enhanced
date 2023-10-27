import { useContext, useState } from 'react';
import './Toggle.scss';
import { RiCelsiusLine, RiFahrenheitLine } from 'react-icons/ri';
import {
  WeatherDispatchContext,
  WeatherStateContext,
} from '../../contexts/WeatherContext/WeatherContext';
import { UNIT_VALUES } from '../../utils/constants';

const unitIcons = {
  temp: [<RiCelsiusLine />, <RiFahrenheitLine />],
  distance: ['km', 'mi'],
  quantity: ['mm', 'in'],
};

const Toggle = ({ unit }: { unit: 'temp' | 'distance' | 'quantity' }) => {
  const [isDefaultUnit, setIsDefaultUnit] = useState(true);
  const { units } = useContext(WeatherStateContext);
  const dispatch = useContext(WeatherDispatchContext);

  const toggleUnit = () => {
    const newValue = isDefaultUnit
      ? UNIT_VALUES[unit][1]
      : UNIT_VALUES[unit][0];
    dispatch({
      type: 'UPDATE_UNITS',
      payload: { ...units, [unit]: newValue },
    });
    setIsDefaultUnit((prev) => !prev);
  };

  const togglePosition = isDefaultUnit ? 'first' : 'second';

  return (
    <div className={`toggle ${togglePosition}`} onClick={toggleUnit}>
      <div className={`slider ${togglePosition}`}>
        <p className="toggle-unit">
          {isDefaultUnit ? unitIcons[unit][0] : unitIcons[unit][1]}
        </p>
      </div>
    </div>
  );
};

export default Toggle;
