import { FMA_API } from '../config/fma';

export const searchTracks = async (query) => {
  try {
    const response = await fetch(
      `${FMA_API.baseUrl}${FMA_API.endpoints.tracks}?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    console.log('Search results:', data); // Debug log
    if (data && data.aTracks) {
      return data.aTracks.map(track => ({
        id: track.track_id,
        title: track.track_title,
        artist: track.artist_name,
        cover: track.album_image_file || 'https://freemusicarchive.org/images/default_album.png',
        url: track.track_file,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(
      `${FMA_API.baseUrl}${FMA_API.endpoints.genres}?api_key=${FMA_API.apiKey}`
    );
    const data = await response.json();
    return data.dataset;
  } catch (error) {
    console.error('Error getting genres:', error);
    return [];
  }
};

export const getTracksByGenre = async (genreName) => {
  try {
    // First, get the genre ID
    const genreResponse = await fetch(
      `${FMA_API.baseUrl}/genres.json?q=${encodeURIComponent(genreName)}`
    );
    const genreData = await genreResponse.json();
    console.log('Genre data:', genreData); // Debug log

    if (!genreData || !genreData.dataset || genreData.dataset.length === 0) {
      console.log('No genre found for:', genreName);
      return [];
    }

    const genreId = genreData.dataset[0].genre_id;
    
    // Then, get tracks by genre ID
    const tracksResponse = await fetch(
      `${FMA_API.baseUrl}/tracks.json?genre_id=${genreId}`
    );
    const tracksData = await tracksResponse.json();
    console.log('Tracks data:', tracksData); // Debug log

    if (tracksData && tracksData.dataset) {
      return tracksData.dataset.map(track => ({
        id: track.track_id,
        title: track.track_title,
        artist: track.artist_name,
        cover: track.album_image_file || 'https://freemusicarchive.org/images/default_album.png',
        url: track.track_file,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error getting tracks by genre:', error);
    return [];
  }
}; 