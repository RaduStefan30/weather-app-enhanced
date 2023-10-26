import { ReactElement, useEffect, useState } from 'react';
import './Toggle.scss';
import { RiCelsiusLine, RiFahrenheitLine } from 'react-icons/ri';

const Toggle = ({
  unit,
  reversedTheme,
}: {
  unit: string;
  reversedTheme: boolean;
}) => {
  const [isDefaultUnit, setIsDefaultUnit] = useState(false);
  const [units, setUnits] = useState<Array<ReactElement | string>>([]);

  useEffect(() => {
    switch (unit) {
      case 'temp':
        setUnits([<RiCelsiusLine />, <RiFahrenheitLine />]);
        break;
      case 'distance':
        setUnits(['km', 'mi']);
        break;
      default:
        break;
    }
  }, [unit]);

  const toggleUnit = () => {
    setIsDefaultUnit((prev) => !prev);
  };

  const togglePosition = isDefaultUnit ? 'first' : 'second';

  const themeClass = reversedTheme ? 'reversed' : 'normal';

  return (
    <div
      className={`toggle ${togglePosition} ${themeClass}`}
      onClick={toggleUnit}
    >
      <div className={`slider ${togglePosition} ${themeClass}`}>
        <p className="toggle-unit">{isDefaultUnit ? units[0] : units[1]}</p>
      </div>
    </div>
  );
};

export default Toggle;
