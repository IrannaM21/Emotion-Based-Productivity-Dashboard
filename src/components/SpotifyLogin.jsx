// src/components/SpotifyLogin.jsx
import React from 'react';

const CLIENT_ID = '27108992e6d447d08eea4be9d0806a30';
// const REDIRECT_URI = 'https://emotionbasedproductivity.vercel.app/';
const REDIRECT_URI = 'http://localhost:3000/';

const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = 'playlist-read-private';

const SpotifyLogin = () => {
  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;

  return (
    <div style={styles.container}>
      <h3>🎵 Login to Spotify</h3>
      <a href={loginUrl} style={styles.button}>Login with Spotify</a>
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
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default SpotifyLogin;
