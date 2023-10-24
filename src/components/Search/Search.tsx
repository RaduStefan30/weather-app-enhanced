import { useNavigate } from 'react-router-dom';
import './Search.scss';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (searchTerm && event.key === 'Enter') {
      navigate(`forecast/${searchTerm}`);
    }
  };

  const handleButtonClick = () => {
    if (searchTerm) {
      navigate(`forecast/${searchTerm}`);
    }
  };

  return (
    <div className="search-container">
      <button onClick={handleButtonClick} className="search-button">
        <LiaSearchSolid />
      </button>
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={(e) => handleInputKeyPress(e)}
      />
      <button onClick={() => setSearchTerm('')} className="search-button">
        <AiOutlineClose className={searchTerm ? 'visible' : 'hidden'} />
      </button>
    </div>
  );
};

export default Search;
