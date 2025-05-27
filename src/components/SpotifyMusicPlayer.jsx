// src/components/SpotifyMusicPlayer.jsx
import React, { useEffect, useState, useContext } from 'react';
import { EmotionContext } from '../context/EmotionContext';
import { fetchPlaylistsByEmotion } from '../utils/spotifyApi';

const SpotifyMusicPlayer = () => {
  const { emotion } = useContext(EmotionContext);
  const [playlists, setPlaylists] = useState([]);
  const token = localStorage.getItem('spotify_access_token');

  useEffect(() => {
    if (token && emotion) {
      fetchPlaylistsByEmotion(token, emotion).then(setPlaylists);
    }
  }, [token, emotion]);

  if (!token) {
    return (
      <div style={styles.container}>
        <h3>Spotify Playlists</h3>
        <p>Please login with Spotify to see playlists.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3>🎧 Mood-Based Music for: <span style={styles.emotion}>{emotion}</span></h3>
      <div style={styles.playerList}>
        {playlists.map(pl => (
          <div key={pl.id} style={styles.player}>
            <iframe
              title={pl.name}
              src={`https://open.spotify.com/embed/playlist/${pl.id}`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    padding: '1rem',
    marginTop: '2rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  emotion: {
    color: '#1DB954',
    textTransform: 'capitalize',
  },
  playerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  player: {
    width: '100%',
  },
};

export default SpotifyMusicPlayer;
