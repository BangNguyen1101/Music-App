import { SOUNDCLOUD_CONFIG, SOUNDCLOUD_API } from '../config/soundcloud';

export const searchTracks = async (query) => {
  try {
    const response = await fetch(
      `${SOUNDCLOUD_API.search}?q=${encodeURIComponent(query)}&client_id=${SOUNDCLOUD_CONFIG.clientId}`
    );
    const data = await response.json();
    return data.map(track => ({
      id: track.id,
      title: track.title,
      artist: track.user.username,
      cover: track.artwork_url || track.user.avatar_url,
      url: `${SOUNDCLOUD_API.stream.replace('{trackId}', track.id)}?client_id=${SOUNDCLOUD_CONFIG.clientId}`,
    }));
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};

export const getStreamUrl = (trackId) => {
  return `${SOUNDCLOUD_API.stream.replace('{trackId}', trackId)}?client_id=${SOUNDCLOUD_CONFIG.clientId}`;
}; 