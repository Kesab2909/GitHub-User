// src/components/RecentSearches.jsx
import { useState, useEffect } from 'react';

export default function RecentSearches({ onSearch }) {
  const [searches, setSearches] = useState([]);

  // Load searches from localStorage on mount
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setSearches(storedSearches);
  }, []);

  // Function to add a new search and update localStorage
  const addSearch = (username) => {
    const updatedSearches = [username, ...searches.filter(s => s !== username)].slice(0, 5); // Keep last 5 unique searches
    setSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // Handle clicking a recent search
  const handleSearchClick = (username) => {
    onSearch(username);
  };

  // Expose addSearch to parent component via prop or context if needed
  // For simplicity, we'll pass it through the Home component

  return (
    <div className="recent-searches">
      <h3>Recent Searches</h3>
      {searches.length > 0 ? (
        <ul>
          {searches.map((username, index) => (
            <li key={index}>
              <button onClick={() => handleSearchClick(username)}>
                {username}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent searches</p>
      )}
    </div>
  );
}