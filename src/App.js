import React from 'react';
import EmotionDetector from './components/EmotionDetector';
import ToDoList from './components/ToDoList';
import SpotifyLogin from './components/SpotifyLogin';
import SpotifyMusicPlayer from './components/SpotifyMusicPlayer';
const token = localStorage.getItem('spotify_access_token');
const Dashboard = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: '30px',
      padding: '20px',
      flexWrap: 'wrap',
    }}>
      {/* Sidebar container: ToDo List and Music Playlist vertically stacked */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* ToDo List Box */}
        <div style={{
          width: '300px',
          border: '2px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2 style={{ textAlign: 'center' }}>📝 ToDo List</h2>
          <ToDoList />
        </div>

        {/* Music Playlist Box */}
        <div style={{
          width: '300px',
          border: '2px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2 style={{ textAlign: 'center' }}>🎵 Music Playlist</h2>
          {!token ? <SpotifyLogin /> : <SpotifyMusicPlayer />}
        </div>
      </div>

      {/* Emotion Detector webcam on the right */}
      <EmotionDetector />
    </div>
  );
};

export default Dashboard;
