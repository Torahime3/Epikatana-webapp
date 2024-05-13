import React from 'react';
import { BiSearch } from 'react-icons/bi'; 
import '../styles/SearchBar.css';
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
      <div className="search-bar-container">
        <div className="search-bar-input-container">
          <div className="search-icon-container"> {}
            <BiSearch className="search-icon" />
          </div>
          <input
            type="text"
            placeholder="Rechercher des produits..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="search-bar-input"
          />
        </div>
      </div>
    );
  };
  

export default SearchBar;
