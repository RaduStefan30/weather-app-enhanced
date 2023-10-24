import { useNavigate } from 'react-router-dom';
import './Search.scss';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';
import { AiOutlineClose } from 'react-icons/ai';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm) {
      updateLocalStorage();
      navigate(`details/${searchTerm}`);
    }
  };

  const updateLocalStorage = () => {
    const maxItems = 5;
    const searches = JSON.parse(localStorage.getItem('searches') || '[]');
    if (!searches.includes(searchTerm)) {
      searches.unshift(searchTerm);
      if (searches.length > maxItems) {
        searches.pop();
      }
      localStorage.setItem('searches', JSON.stringify(searches));
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

  return (
    <div className="search-container">
      <button onClick={handleSearch} className="search-button">
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
