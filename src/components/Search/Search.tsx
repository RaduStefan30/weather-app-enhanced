import { useNavigate } from 'react-router-dom';
import './Search.scss';
import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';
import { updateSearchesFromLocalStorage } from '../../utils/utils';
import { fetchSuggestions } from '../../api/api';
import { Suggestion } from '../../types';
import LocationName from '../LocationName/LocationName';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const activeDropDownClass = isFocused && suggestions.length ? 'show' : '';

  const handleSearch = (search: string) => {
    if (search) {
      updateSearchesFromLocalStorage(search);
      navigate(`details/${search}`);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCancel = () => {
    setSearchTerm('');
    setSuggestions([]);
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
      <button
        onClick={() => handleSearch(searchTerm)}
        className={`search-button ${activeDropDownClass}`}
      >
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
        onClick={handleCancel}
        className={`search-button search-cancel ${activeDropDownClass}`}
      >
        <AiOutlineClose
          className={`icon ${searchTerm ? 'visible' : 'hidden'}`}
        />
      </button>
      <div className={`search-dropdown ${activeDropDownClass}`}>
        {suggestions?.map((suggestion) => (
          <button
            className="no-styles-button"
            key={suggestion.id}
            onClick={() => handleSearch(suggestion.url)}
          >
            <LocationName
              name={suggestion.name}
              region={suggestion.region}
              country={suggestion.country}
              classNames="search-location no-wrap"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;
