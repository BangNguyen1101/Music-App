import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlaylistDetailScreen({ route, navigation }) {
  const { playlist } = route.params;

  const handlePlaySong = (song) => {
    navigation.navigate('Player', { song });
  };

  return (
    <LinearGradient colors={['#3a185a', '#2b0a3d']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Playlist</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.playlistInfo}>
        <Image source={{ uri: playlist.cover }} style={styles.playlistCover} />
        <Text style={styles.playlistTitle}>{playlist.title}</Text>
        <Text style={styles.playlistAuthor}>{playlist.author}</Text>
      </View>

      <FlatList
        data={playlist.songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.songItem}
            onPress={() => handlePlaySong(item)}
          >
            <Image source={{ uri: item.cover }} style={styles.songCover} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        style={styles.songList}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 32,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playlistInfo: {
    alignItems: 'center',
    padding: 16,
  },
  playlistCover: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  playlistAuthor: {
    color: '#b39ddb',
    fontSize: 16,
  },
  songList: {
    flex: 1,
    padding: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  songCover: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    color: '#b39ddb',
    fontSize: 14,
  },
});