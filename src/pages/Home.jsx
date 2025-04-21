// src/pages/Home.jsx
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import RecentSearches from '../components/RecentSearches';
import { useGitHubUser } from '../hooks/useGitHubUser';

export default function Home() {
  const [username, setUsername] = useState('');
  const { userData, loading, error } = useGitHubUser(username);

  const addToRecentSearches = (newUsername) => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const updatedSearches = [newUsername, ...storedSearches.filter(s => s !== newUsername)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleSearch = (newUsername) => {
    setUsername(newUsername);
    addToRecentSearches(newUsername);
  };

  return (
    <div className="home">
      <h1>GitHub User Finder</h1>
      <SearchBar onSearch={handleSearch} addToRecentSearches={addToRecentSearches} />
      <RecentSearches onSearch={setUsername} />
      
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {userData && !loading && !error && <UserCard user={userData} />}
    </div>
  );
}