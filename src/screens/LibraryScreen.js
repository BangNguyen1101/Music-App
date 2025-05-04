import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import { Ionicons } from '@expo/vector-icons';
import { useFavorite } from '../context/FavoriteContext';
import { useDownload } from '../context/DownloadContext';
import { useNavigation } from '@react-navigation/native';
import PlaylistItem from '../components/PlaylistItem';
import { useStorage } from '../context/StorageContext';

export default function LibraryScreen() {
  const navigation = useNavigation();
  const { playlists, savePlaylists } = useStorage();
  const [localPlaylists, setLocalPlaylists] = useState([]);
  const { favorites } = useFavorite();
  const { downloads } = useDownload();

  useEffect(() => {
    setLocalPlaylists(playlists);
  }, [playlists]);

  const handleCreatePlaylist = () => {
    navigation.navigate('CreatePlaylist', {
      onCreate: (newPlaylist) => {
        const updatedPlaylists = [...localPlaylists, newPlaylist];
        setLocalPlaylists(updatedPlaylists);
        savePlaylists(updatedPlaylists);
      }
    });
  };

  const handleDeletePlaylist = (index) => {
    const updatedPlaylists = localPlaylists.filter((_, i) => i !== index);
    setLocalPlaylists(updatedPlaylists);
    savePlaylists(updatedPlaylists);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Thư viện </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentRow}>
        <View style={styles.row}>
          <LibraryBox 
            title="Yêu thích" 
            count={favorites.length} 
            onPress={() => navigation.navigate('FavoriteScreen')} 
          />
          <LibraryBox 
            title="Đã tải" 
            count={downloads.length} 
            onPress={() => navigation.navigate('DownloadScreen')} 
          />
          <LibraryBox title="Upload" count={0}/>
          <LibraryBox title="MV" count={0}/>
          <LibraryBox title="Nghệ sĩ" count={0}/>  
        </View>
      </ScrollView>
      <Text style={styles.sectionTitle}>Nghe gần đây</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentRow}>
        <RecentBox 
          title="Simple Love" 
          artist="Obito, Seachains, Davis"
          image="https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/3/3/4/3/33431183ea49c8791e6c625be4009b39.jpg"
          navigation={navigation}
        />
        <RecentBox 
          title="Chúng Ta Của Hiện Tại" 
          artist="Sơn Tùng M-TP"
          image="https://avatar-ex-swe.nixcdn.com/song/2024/03/15/4/c/b/d/1710493302970_640.jpg"
          navigation={navigation}
        />
        <RecentBox 
          title="Đom Đóm" 
          artist="Jack"
          image="https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/f/e/9/8/fe9875941d98fbbcb8aedc8960ccbc94.jpg"
          navigation={navigation}
        />
        <RecentBox 
          title="Chạm đáy nỗi đau" 
          artist="ERIK"
          image="https://doanhnhanonline.com.vn/wp-content/uploads/2023/12/6-4.jpg"
          navigation={navigation}
        />
      </ScrollView>
      <View style={styles.tabRow}>
        <Text style={[styles.tab, styles.tabActive]}>Playlist</Text>
        <Text style={styles.tab}>Album</Text>
      </View>
      <TouchableOpacity style={styles.createButton} onPress={handleCreatePlaylist}>
        <Text style={styles.createButtonText}>Tạo playlist mới</Text>
      </TouchableOpacity>
      {localPlaylists.map((pl, idx) => (
        <PlaylistItem 
          key={pl.id} 
          title={pl.title} 
          author={pl.author} 
          cover={pl.cover} 
          songs={pl.songs}
          onDelete={() => handleDeletePlaylist(idx)}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
}

function LibraryBox({ title, count, onPress }) {
  const getIcon = () => {
    switch (title) {
      case 'Yêu thích':
        return <Ionicons name="heart" size={24} color="#FF5A7E" />;
      case 'Đã tải':
        return <Ionicons name="download" size={24} color="#FF5A7E" />;
      case 'Upload':
        return <Ionicons name="cloud-upload" size={24} color="#FF5A7E" />;
      case 'MV':
        return <Ionicons name="videocam" size={24} color="#FF5A7E" />;
      case 'Nghệ sĩ':
        return <Ionicons name="people" size={24} color="#FF5A7E" />;
      default:
        return <Ionicons name="heart" size={24} color="#FF5A7E" />;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.libraryBox}>
      {getIcon()}
      <Text style={styles.libraryBoxTitle}>{title}</Text>
      {count !== undefined && <Text style={styles.libraryBoxCount}>{count}</Text>}
    </TouchableOpacity>
  );
}

function RecentBox({ title, image, artist, navigation }) {
  return (
    <TouchableOpacity 
      style={styles.recentBoxContainer}
      onPress={() => navigation.navigate('Player', {
        song: {
          title: title,
          artist: artist,
          cover: image
        }
      })}
    >
      <View style={styles.recentBox}>
        <Image 
          source={{ uri: image }} 
          style={styles.recentBoxImage} 
          resizeMode="cover"
        />
      </View>
      <Text style={styles.recentBoxTitle} numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6E0',
    padding: 16,
    paddingTop: 48,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6B3E26',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  libraryBox: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    alignItems: 'center',
    padding: 8,
    width: 72,
    elevation: 2,
    marginRight: 12,
  },
  libraryBoxIcon: {
    fontSize: 24,
    color: '#FF5A7E',
    marginBottom: 4,
  },
  libraryBoxTitle: {
    fontWeight: 'bold',
    color: '#6B3E26',
  },
  libraryBoxCount: {
    color: '#A259FF',
    fontSize: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#6B3E26',
  },
  recentRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  recentBoxContainer: {
    marginRight: 12,
    alignItems: 'center',
  },
  recentBox: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: 120,
    height: 120,
    elevation: 1,
    overflow: 'hidden',
  },
  recentBoxImage: {
    width: '100%',
    height: '100%',
  },
  recentBoxTitle: {
    fontSize: 13,
    color: '#6B3E26',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
    width: 120,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tab: {
    fontSize: 16,
    color: '#6B3E26',
    marginRight: 24,
    paddingBottom: 4,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#A259FF',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  createButtonText: {
    color: '#A259FF',
    fontWeight: 'bold',
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  playlistThumb: {
    width: 48,
    height: 48,
    backgroundColor: '#FFD6E0',
    borderRadius: 12,
    marginRight: 12,
  },
  playlistThumbImg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
    resizeMode: 'cover',
  },
  playlistTitle: {
    fontWeight: 'bold',
    color: '#6B3E26',
  },
  playlistAuthor: {
    color: '#A259FF',
    fontSize: 12,
  },
}); 