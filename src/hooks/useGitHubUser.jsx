// src/hooks/useGitHubUser.js
import { useState, useEffect } from 'react';

export const useGitHubUser = (username) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const API_KEY = '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'; // INSERT YOUR GITHUB API KEY HERE
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: 'application/vnd.github.v3+json'
          }
        });
        
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { userData, loading, error };
};