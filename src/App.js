import React, { useEffect, useState } from "react";
import EmotionDetector from "./components/EmotionDetector";
import ToDoList from "./components/ToDoList";
import SpotifyLogin from "./components/SpotifyLogin";
import SpotifyMusicPlayer from "./components/SpotifyMusicPlayer";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [emotion, setEmotion] = useState("happy");  // Default emotion or empty

  useEffect(() => {
    const hash = window.location.hash;
    let _token = window.localStorage.getItem("spotify_access_token");

    if (!_token && hash) {
      const params = new URLSearchParams(hash.substring(1));
      _token = params.get("access_token");

      if (_token) {
        localStorage.setItem("spotify_access_token", _token);
        setToken(_token);
        window.location.hash = "";
      }
    } else {
      setToken(_token);
    }
  }, []);


  return (
    <div style={{ display: "flex", gap: "30px", padding: "20px", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            width: "300px",
            border: "2px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2 style={{ textAlign: "center" }}>📝 ToDo List</h2>
          <ToDoList />
        </div>

        <div
          style={{
            width: "300px",
            border: "2px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2 style={{ textAlign: "center" }}>🎵 Music Playlist</h2>
          {!token ? <SpotifyLogin /> : <SpotifyMusicPlayer emotion={emotion} />}
        </div>
      </div>

      {/* Pass setEmotion so EmotionDetector updates state */}
      <EmotionDetector setEmotion={setEmotion} />
    </div>
  );
};

export default Dashboard;
