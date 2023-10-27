import { useState, useEffect } from 'react';
import './Spinner.scss';

const Spinner = () => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <div className={`spinner-container ${!isMounted ? 'fade-out' : ''}`}>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
