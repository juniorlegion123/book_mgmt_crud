import React from 'react';

const SearchBar = ({ value, onSearch }) => {
  return (
    <div className="searchbar">
      <input
        type="search"
        placeholder="Search books by title..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
