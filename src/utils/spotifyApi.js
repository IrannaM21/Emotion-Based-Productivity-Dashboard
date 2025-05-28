// utils/spotifyApi.js

export async function fetchPlaylistsByEmotion(token, emotion) {
  if (!token || !emotion) {
    console.warn("Missing token or emotion");
    return [];
  }

  try {
    const query = mapEmotionToQuery(emotion);
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Spotify API Error:", errorData);
      return [];
    }

    const data = await response.json();
    return data.playlists?.items || [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}

function mapEmotionToQuery(emotion) {
  switch (emotion.toLowerCase()) {
    case 'happy':
      return 'happy vibes';
    case 'sad':
      return 'sad songs';
    case 'angry':
      return 'calm down';
    case 'neutral':
      return 'chill playlist';
    case 'surprised':
      return 'feel good music';
    case 'disgusted':
      return 'uplifting tunes';
    case 'fearful':
      return 'soothing instrumental';
    default:
      return emotion;
  }
}



export async function validateSpotifyToken(token) {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.warn("Invalid or expired token");
      return false;
    }

    const data = await response.json();
    console.log("Valid token for user:", data.display_name || data.id);
    return true;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
}
