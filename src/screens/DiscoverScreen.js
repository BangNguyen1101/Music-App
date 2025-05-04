import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFavorite } from '../context/FavoriteContext';
import { useDownload } from '../context/DownloadContext';

const suggestions = [
  {
    title: "Chúng Ta Của Hiện Tại",
    artist: "Sơn Tùng M-TP",
    cover: "https://avatar-ex-swe.nixcdn.com/song/2024/03/15/4/c/b/d/1710493302970_640.jpg",
    url: require('../assets/music/ChungTaCuaHienTai.mp3')
  },
  {
    title: "Simple Love",
    artist: "Obito, Seachains, Davis",
    cover: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/3/3/4/3/33431183ea49c8791e6c625be4009b39.jpg",
    url: require('../assets/music/SimpleLove.mp3')
  },
  {
    title: "Đom Đóm",
    artist: "Jack",
    cover: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/f/e/9/8/fe9875941d98fbbcb8aedc8960ccbc94.jpg",
    url: require('../assets/music/DomDom.mp3')
  }
];

const hot = [
  {
    title: "Chạm đáy nỗi đau",
    artist: "ERIK",
    cover: "https://i.ytimg.com/vi/8BAdhoeabUM/maxresdefault.jpg",
    url: require('../assets/music/ChamDayNoiDau.mp3')
  },
  {
    title: "Hãy Trao Cho Anh",
    artist: "Sơn Tùng M-TP",
    cover: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/7/1/741911/Hay-Trao-Cho-Anh.jpg",
    url: require('../assets/music/HayTraoChoAnh.mp3')
  },
  {
    title: "Waiting For You",
    artist: "MONO",
    cover: "https://i.ytimg.com/vi/CHw1b_1LVBA/maxresdefault.jpg",
    url: require('../assets/music/WaitingForYou.mp3')
  }
];

const recommended = [
  {
    title: "Lạ Lùng",
    artist: "Vũ",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoxz_9BTv00_n0CGatdhMFz0l53Q6u3y-AA&s",
    url: require('../assets/music/LaLung.mp3')
  },
  {
    title: "Em Là",
    artist: "MONO, Onionn",
    cover: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/e/7/7/2/e772358978fef8a02eefd34f6a4ca6f3.jpg",
    url: require('../assets/music/EmLa.mp3')
  },
  {
    title: "Chúng Ta Của Tương Lai",
    artist: "Sơn Tùng M-TP",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw8rZvN_5A4d7c2AJbzVZMxk_zK6CdKunfqw&s",
    url: require('../assets/music/ChungTaCuaTuongLai.mp3')
  }
];

const chillPlaylists = [
  {
    title: "Hồng Nhan",
    artist: "Jack - J97",
    cover: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/3/2/7/f/327f68099674128289ba8a2e98232d68.jpg",
    url: require('../assets/music/HongNhan.mp3')
  },
  {
    title: "Bạc Phận",
    artist: "Jack - J97",
    cover: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/4/2/5/3/425334e6f252b8c34d74d16177a5eb9d.jpg",
    url: require('../assets/music/BacPhan.mp3')
  },
  {
    title: "Sóng Gió",
    artist: "Jack - J97",
    cover: "https://avatar-ex-swe.nixcdn.com/song/2023/05/08/4/a/3/1/1683539255051_640.jpg",
    url: require('../assets/music/SongGio.mp3')
  }
];

export default function DiscoverScreen({ navigation }) {
  const [suggestionsState, setSuggestionsState] = useState(suggestions);
  const [hotState, setHotState] = useState(hot);
  const [recommendedState, setRecommendedState] = useState(recommended);
  const [chillPlaylistsState, setChillPlaylistsState] = useState(chillPlaylists);
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();
  const { addDownload, removeDownload, isDownloaded } = useDownload();

  const handleFavorite = (song) => {
    if (isFavorite(song)) {
      removeFavorite(song);
    } else {
      addFavorite(song);
    }
  };

  const handleDownload = (song) => {
    if (isDownloaded(song)) {
      removeDownload(song);
    } else {
      addDownload(song);
    }
  };

  const renderHorizontalList = (title, items) => (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalRow}>
        {items.map((item, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={styles.hotBoxContainer}
            onPress={() => navigation.navigate('Player', { song: item })}
          >
            <View style={styles.hotBox}>
              <Image source={{ uri: item.cover }} style={styles.hotCover} resizeMode="cover" />
              <View style={styles.hotIconContainer}>
                <TouchableOpacity 
                  onPress={() => handleFavorite(item)} 
                  style={[styles.iconBtn, styles.hotIconBtn]}
                >
                  <Ionicons 
                    name={isFavorite(item) ? 'heart' : 'heart-outline'} 
                    size={22} 
                    color={isFavorite(item) ? '#FF5A7E' : '#FFF'} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleDownload(item)} 
                  style={[styles.iconBtn, styles.hotIconBtn]}
                >
                  <MaterialCommunityIcons 
                    name={isDownloaded(item) ? 'check-circle' : 'download-circle-outline'} 
                    size={24} 
                    color={isDownloaded(item) ? '#4CAF50' : '#FFF'} 
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.hotTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.hotArtist} numberOfLines={1}>{item.artist}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 140 }}>
      <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
      <View style={styles.suggestionRow}>
        {suggestionsState.map((item, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={styles.suggestionItem}
            onPress={() => navigation.navigate('Player', { song: item })}
          >
            <Image source={{ uri: item.cover }} style={styles.suggestionCover} />
            <View style={{ flex: 1 }}>
              <Text style={styles.suggestionTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.suggestionArtist} numberOfLines={1}>{item.artist}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleFavorite(item)} style={styles.iconBtn}>
                <Ionicons 
                  name={isFavorite(item) ? 'heart' : 'heart-outline'} 
                  size={22} 
                  color={isFavorite(item) ? '#FF5A7E' : '#6B3E26'} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDownload(item)} style={styles.iconBtn}>
                <MaterialCommunityIcons 
                  name={isDownloaded(item) ? 'check-circle' : 'download-circle-outline'} 
                  size={24} 
                  color={isDownloaded(item) ? '#4CAF50' : '#6B3E26'} 
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {renderHorizontalList("Nhạc hot thịnh hành", hotState)}
      {renderHorizontalList("Có thể bạn muốn nghe", recommendedState)}
      {renderHorizontalList("Playlist này chill phết", chillPlaylistsState)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6E0',
    padding: 16,
    paddingTop: 32,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#6B3E26',
    marginTop: 12,
    marginBottom: 8,
  },
  suggestionRow: {
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
    elevation: 1,
  },
  suggestionCover: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#FFD6E0',
  },
  suggestionTitle: {
    fontWeight: 'bold',
    color: '#6B3E26',
    fontSize: 15,
  },
  suggestionArtist: {
    color: '#A259FF',
    fontSize: 13,
  },
  horizontalRow: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 8,
  },
  hotBoxContainer: {
    marginRight: 12,
    alignItems: 'center',
    width: 120,
    marginBottom: 8,
  },
  hotBox: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: 120,
    height: 120,
    elevation: 1,
    overflow: 'hidden',
  },
  hotCover: {
    width: '100%',
    height: '100%',
  },
  hotTitle: {
    fontSize: 13,
    color: '#6B3E26',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
    width: 120,
  },
  hotArtist: {
    fontSize: 12,
    color: '#A259FF',
    textAlign: 'center',
    marginTop: 2,
    width: 120,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 6,
  },
  hotIconContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  hotIconBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
}); 