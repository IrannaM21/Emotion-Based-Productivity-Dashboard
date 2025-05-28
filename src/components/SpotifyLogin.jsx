import React from 'react';

const CLIENT_ID = '27108992e6d447d08eea4be9d0806a30';
const REDIRECT_URI = 'https://emotiondetection-mu.vercel.app/';
const SCOPES = ['playlist-read-private', 'user-read-email'];

const SpotifyLogin = () => {
  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join('%20')}`;
    window.location.href = authUrl;
  };

  return (
    <div style={styles.container}>
      <button onClick={handleLogin} style={styles.button}>
        Login with Spotify
      </button>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#1DB954',
    color: 'white',
    borderRadius: '50px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
  },
};

export default SpotifyLogin;
