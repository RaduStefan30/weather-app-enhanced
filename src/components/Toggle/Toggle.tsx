import { ReactElement, useEffect, useState } from 'react';
import './Toggle.scss';
import { RiCelsiusLine, RiFahrenheitLine } from 'react-icons/ri';

const Toggle = ({ unit }: { unit: string }) => {
  const [isDefaultUnit, setIsDefaultUnit] = useState(true);
  const [units, setUnits] = useState<Array<ReactElement | string>>([]);

  useEffect(() => {
    switch (unit) {
      case 'temp':
        setUnits([<RiCelsiusLine />, <RiFahrenheitLine />]);
        break;
      case 'distance':
        setUnits(['km', 'mi']);
        break;
      case 'quantity':
        setUnits(['mm', 'in']);
        break;
      default:
        break;
    }
  }, [unit]);

  const toggleUnit = () => {
    setIsDefaultUnit((prev) => !prev);
  };

  const togglePosition = isDefaultUnit ? 'first' : 'second';

  return (
    <div className={`toggle ${togglePosition} `} onClick={toggleUnit}>
      <div className={`slider ${togglePosition} `}>
        <p className="toggle-unit">{isDefaultUnit ? units[0] : units[1]}</p>
      </div>
    </div>
  );
};

export default Toggle;
