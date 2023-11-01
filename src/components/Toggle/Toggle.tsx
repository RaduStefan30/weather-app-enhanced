import { useContext, useState, useEffect } from 'react';
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
  const { units } = useContext(WeatherStateContext);
  const dispatch = useContext(WeatherDispatchContext);
  const savedUnit = localStorage.getItem(unit);
  const isSavedDefaultUnit = savedUnit
    ? UNIT_VALUES[unit][0] === savedUnit
    : true;
  const [isDefaultUnit, setIsDefaultUnit] = useState(isSavedDefaultUnit);

  useEffect(() => {
    setIsDefaultUnit(UNIT_VALUES[unit][0] === units[unit]);
  }, [unit, units]);

  const toggleUnit = () => {
    const newValue = isDefaultUnit
      ? UNIT_VALUES[unit][1]
      : UNIT_VALUES[unit][0];
    dispatch({
      type: 'UPDATE_UNITS',
      payload: { ...units, [unit]: newValue },
    });
    setIsDefaultUnit((prev) => !prev);
    localStorage.setItem(unit, newValue);
  };

  const togglePosition = isDefaultUnit ? 'first' : 'second';

  return (
    <button
      className={`no-styles-button toggle ${togglePosition}`}
      onClick={toggleUnit}
    >
      <div className={`slider ${togglePosition}`}>
        <p className="toggle-unit">
          {isDefaultUnit ? unitIcons[unit][0] : unitIcons[unit][1]}
        </p>
      </div>
    </button>
  );
};

export default Toggle;
