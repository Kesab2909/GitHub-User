// src/components/UserCard.jsx
export default function UserCard({ user }) {
    if (!user) return null;
  
    return (
      <div className="user-card">
        <img src={user.avatar_url} alt={user.login} className="user-avatar" />
        <h2>{user.name || user.login}</h2>
        <p>@{user.login}</p>
        <p>{user.bio}</p>
        <div className="user-stats">
          <span>Followers: {user.followers}</span>
          <span>Following: {user.following}</span>
          <span>Repos: {user.public_repos}</span>
        </div>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
      </div>
    );
  }