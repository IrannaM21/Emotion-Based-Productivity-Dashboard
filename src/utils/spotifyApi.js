// utils/spotifyApi.js
export async function fetchPlaylistsByEmotion(token, emotion) {
  const query = emotion === 'happy' ? 'happy' : emotion; // add logic for other emotions
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data.playlists?.items || [];
}
