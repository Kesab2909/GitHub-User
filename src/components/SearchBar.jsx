// src/components/SearchBar.jsx
import { useState } from 'react';

export default function SearchBar({ onSearch, addToRecentSearches }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      if (addToRecentSearches) {
        addToRecentSearches(input.trim());
      }
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter GitHub username"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}