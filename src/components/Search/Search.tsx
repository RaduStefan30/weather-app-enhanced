import { useNavigate } from 'react-router-dom';
import './Search.scss';
import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';
import { updateSearchesFromLocalStorage } from '../../utils/utils';
import { fetchSuggestions } from '../../api/api';
import { Suggestion } from '../../types';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
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

  useEffect(() => {
    const getSuggestions = async () => {
      const suggestions = await fetchSuggestions(searchTerm);
      setSuggestions(suggestions);
    };
    if (searchTerm) getSuggestions();
  }, [searchTerm]);

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
        {suggestions &&
          suggestions.map((suggestion) => (
            <p key={suggestion.id}>
              {suggestion.name}, {suggestion.region}, {suggestion.country}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Search;
