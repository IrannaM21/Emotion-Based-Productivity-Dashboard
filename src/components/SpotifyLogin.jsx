import React, { useEffect, useState } from 'react';
import { generateCodeChallenge, generateRandomString } from '../utils/pkce';

const CLIENT_ID = '27108992e6d447d08eea4be9d0806a30';
const REDIRECT_URI = 'https://emotiondetection-mu.vercel.app/';
const SCOPES = 'playlist-read-private';

const SpotifyLogin = () => {
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    async function generateAuthUrl() {
      const codeVerifier = generateRandomString(128);
      localStorage.setItem('code_verifier', codeVerifier);
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
        SCOPES
      )}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
      )}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

      setAuthUrl(url);
    }

    generateAuthUrl();
  }, []);

  return (
    <div style={styles.container}>
      <a href={authUrl} style={styles.button}>Login with Spotify</a>
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
