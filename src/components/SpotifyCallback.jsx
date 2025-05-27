// components/SpotifyCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const clientId = '27108992e6d447d08eea4be9d0806a30';
const redirectUri = 'https://emotionbasedproductivity.vercel.app/callback';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAccessToken() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      const storedVerifier = localStorage.getItem('code_verifier');

      if (!code) {
        navigate('/');
        return;
      }

      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: storedVerifier,
      });

      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        });

        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem('spotify_access_token', data.access_token);
          // Redirect to homepage or dashboard after login
          navigate('/');
        } else {
          console.error('Failed to get access token:', data);
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
        navigate('/');
      }
    }

    fetchAccessToken();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default SpotifyCallback;
