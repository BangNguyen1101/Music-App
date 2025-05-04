import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { allSongs } from '../data/allSongs';

const DEFAULT_COVER = 'https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg';

export default function CreatePlaylistScreen({ navigation, route }) {
  const [playlistName, setPlaylistName] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);

  const toggleSongSelection = (song) => {
    if (selectedSongs.includes(song.id)) {
      setSelectedSongs(selectedSongs.filter(id => id !== song.id));
    } else {
      setSelectedSongs([...selectedSongs, song.id]);
    }
  };

  const handleCreatePlaylist = () => {
    if (route.params && typeof route.params.onCreate === 'function') {
      route.params.onCreate({ id: Date.now().toString(), title: playlistName, author: 'Bạn', songs: allSongs.filter(song => selectedSongs.includes(song.id)), cover: DEFAULT_COVER });
    }
    navigation.goBack();
  };

  const renderSongItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.songItem}
      onPress={() => toggleSongSelection(item)}
    >
      <Image source={{ uri: item.cover }} style={styles.songCover} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
      </View>
      <Ionicons 
        name={selectedSongs.includes(item.id) ? 'checkbox' : 'square-outline'} 
        size={24} 
        color="#A259FF" 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#6B3E26" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo playlist mới</Text>
        <TouchableOpacity 
          onPress={handleCreatePlaylist}
          disabled={!playlistName || selectedSongs.length === 0}
        >
          <Text style={[
            styles.createButton,
            (!playlistName || selectedSongs.length === 0) && styles.createButtonDisabled
          ]}>
            Tạo
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên playlist"
          value={playlistName}
          onChangeText={setPlaylistName}
        />
      </View>

      <Text style={styles.sectionTitle}>Chọn bài hát</Text>
      <FlatList
        data={allSongs}
        renderItem={renderSongItem}
        keyExtractor={item => item.id}
        style={styles.songList}
        contentContainerStyle={{ paddingBottom: 130 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6E0',
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFB6C1',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B3E26',
  },
  createButton: {
    color: '#A259FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButtonDisabled: {
    color: '#CCCCCC',
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#6B3E26',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B3E26',
    marginLeft: 16,
    marginBottom: 8,
  },
  songList: {
    flex: 1,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B3E26',
  },
  songArtist: {
    fontSize: 14,
    color: '#A259FF',
  },
}); 