import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = '27108992e6d447d08eea4be9d0806a30';
const REDIRECT_URI = 'https://emotiondetection-mu.vercel.app/';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');

    const fetchAccessToken = async () => {
      try {
        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          code_verifier: codeVerifier,
        });

        const response = await axios.post(TOKEN_ENDPOINT, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const { access_token } = response.data;
        localStorage.setItem('spotify_access_token', access_token);

        // Redirect to home or any other component
        navigate('/');
      } catch (error) {
        console.error('Error getting Spotify access token:', error);
      }
    };

    if (code && codeVerifier) {
      fetchAccessToken();
    }
  }, [navigate]);

  return <div>Authorizing Spotify...</div>;
};

export default SpotifyCallback;
