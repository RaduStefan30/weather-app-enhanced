import { useNavigate } from 'react-router-dom';
import './Search.scss';
import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';
import { updateSearchesFromLocalStorage } from '../../utils/utils';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchTerm) {
      updateSearchesFromLocalStorage(searchTerm);
      navigate(`details/${searchTerm}`);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <div className="search-container">
      <button onClick={handleSearch} className="search-button">
        <LiaSearchSolid />
      </button>
      <input
        ref={inputRef}
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={(e) => handleInputKeyPress(e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button
        onClick={() => setSearchTerm('')}
        className="search-button search-cancel"
      >
        <AiOutlineClose
          className={`icon ${searchTerm ? 'visible' : 'hidden'}`}
        />
      </button>
      <div className={`search-dropdown ${isFocused ? 'show' : ''}`}>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
        <p>Item 4</p>
      </div>
    </div>
  );
};

export default Search;
