import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import { useAudio } from '../context/AudioContext';

const chartData = {
  labels: ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
  datasets: [
    {
      data: [1, 2, 1, 3, 2, 2, 1, 1, 2, 2, 1, 1],
      color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2],
      color: (opacity = 1) => `rgba(255, 0, 255, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3],
      color: (opacity = 1) => `rgba(255, 128, 0, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const songs = [
  {
    id: '1',
    title: 'Em Của Ngày Hôm Qua',
    artist: 'Sơn Tùng M-TP',
    cover: 'https://upload.wikimedia.org/wikipedia/vi/5/5d/Em_c%E1%BB%A7a_ng%C3%A0y_h%C3%B4m_qua.png',
    url: require('../assets/music/EmCuaNgayHomQua.mp3'),
    rank: 1,
    change: 0,
    suggest: false,
  },
  {
    id: '2',
    title: 'Ở trọ',
    artist: 'Thể Thiên, tlinh',
    cover: 'https://i.ytimg.com/vi/p4IyHCNFDV0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDXJfcf3peXZlvHH_dkIENDny7ZkA',
    url: require('../assets/music/OTro.mp3'),
    rank: 2,
    change: 25,
    suggest: false,
  },
  {
    id: '3',
    title: 'Cay',
    artist: 'Khắc Hưng, Jimmii Nguyễn',
    cover: 'https://i.ytimg.com/vi/5eYevf1PmcU/maxresdefault.jpg',
    url: require('../assets/music/Cay.mp3'),
    rank: 3,
    change: -1,
    suggest: false,
  },
  {
    id: '4',
    title: 'Bắc Bling (Bắc Ninh)',
    artist: 'Hòa Minzy, Xuân Hinh, Tuấn Cry, Masew',
    cover: 'https://i1.sndcdn.com/artworks-MB8Olhqn4KyKz34Q-AShOtQ-t500x500.jpg',
    url: require('../assets/music/EmCuaNgayHomQua.mp3'),
    rank: 4,
    change: -1,
    suggest: false,
  },
  {
    id: '5',
    title: 'Phim Ba Người',
    artist: 'Nguyễn Vĩ',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbSNq5p6JqFeCoh4qBN-dbuzBEkpqU5UzKUg&s',
    url: require('../assets/music/EmCuaNgayHomQua.mp3'),
    rank: 5,
    change: 0,
    suggest: false,
  },
  {
    id: '6',
    title: 'Em Gái Mưa',
    artist: 'Hương Tràm',
    cover: 'https://upload.wikimedia.org/wikipedia/vi/7/77/B%C3%ACa_%C4%91%C4%A9a_%C4%91%C6%A1n_Em_g%C3%A1i_m%C6%B0a_-_H%C6%B0%C6%A1ng_Tr%C3%A0m.png',
    url: require('../assets/music/EmCuaNgayHomQua.mp3'),
    rank: 6,
    change: 0,
    suggest: false,
  },
  {
    id: '7',
    title: 'Hồng Nhan',
    artist: 'Jack',
    cover: 'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/3/2/7/f/327f68099674128289ba8a2e98232d68.jpg',
    url: require('../assets/music/EmCuaNgayHomQua.mp3'),
    rank: 7,
    change: 0,
    suggest: false,
  },
  {
    id: '8',
    title: 'Bạc Phận',
    artist: 'Jack, K-ICM',
    cover: 'https://i.ytimg.com/vi/886d9rm_AFE/maxresdefault.jpg',
    url: require('../assets/music/EmCuaNgayHomQua.mp3'),
    rank: 8,
    change: 0,
    suggest: false,
  },
  {
    id: '9',
    title: 'Sóng Gió',
    artist: 'Jack, K-ICM',
    cover: 'https://i.ytimg.com/vi/j8U06veqxdU/maxresdefault.jpg',
    url: require('../assets/music/EmCuaNgayHomQua.mp3'),
    rank: 9,
    change: 0,
    suggest: false,
  },
  {
    id: '10',
    title: 'Một Bước Yêu Vạn Dặm Đau',
    artist: 'Mr. Siro',
    cover: 'https://i.ytimg.com/vi/7wr4I5p1XMw/maxresdefault.jpg',
    url: require('../assets/music/EmCuaNgayHomQua.mp3'),
    rank: 10,
    change: 0,
    suggest: false,
  },
];

const screenWidth = Dimensions.get('window').width;

export default function ZingChartScreen({ navigation }) {
  const { play, currentSong, isPlaying } = useAudio();

  const handlePlaySong = (song) => {
    play(song);
  };

  return (
    <LinearGradient colors={['#3a185a', '#2b0a3d']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={{ color: '#ff5a7e' }}>J</Text>
          <Text style={{ color: '#a259ff' }}>-chart</Text>
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="mic-outline" size={22} color="#fff" style={{ marginRight: 16 }} />
          <Ionicons name="search" size={22} color="#fff" />
        </View>
      </View>
      {/* Time */}
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>02.05.2025 • 20:00</Text>
        <Ionicons name="play-circle" size={35} color="#fff" />
      </View>
      {/* Chart */}
      <View style={styles.chartWrap}>
        <LineChart
          data={chartData}
          width={screenWidth - 62}
          height={160}
          chartConfig={{
            backgroundGradientFrom: 'transparent',
            backgroundGradientTo: 'transparent',
            color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
            labelColor: () => '#fff',
            propsForDots: { r: '3', strokeWidth: '2', stroke: '#fff' },
          }}
          bezier
          withVerticalLines={false}
          withHorizontalLines={false}
          withShadow={false}
          style={{ borderRadius: 16 }}
          contentInset={{ left: 16, right: 16, top: 8, bottom: 24 }}
        />
      </View>
      {/* Song List */}
      <ScrollView style={styles.songList}>
        {songs.map((song, index) => (
          <TouchableOpacity
            key={song.id}
            style={[
              styles.songItem,
              currentSong?.id === song.id && styles.activeSongItem
            ]}
            onPress={() => handlePlaySong(song)}
            activeOpacity={0.7}
          >
            <View style={styles.rankContainer}>
              <Text style={[
                styles.rank,
                currentSong?.id === song.id && styles.activeRank
              ]}>{index + 1}</Text>
              <View style={styles.rankChange}>
                {song.change > 0 && <Ionicons name="arrow-up" size={16} color="#4CAF50" />}
                {song.change < 0 && <Ionicons name="arrow-down" size={16} color="#FF5A7E" />}
                {song.change === 0 && <Ionicons name="remove" size={16} color="#A259FF" />}
              </View>
            </View>
            <Image 
              source={{ uri: song.cover }} 
              style={[
                styles.songCover,
                currentSong?.id === song.id && styles.activeSongCover
              ]} 
            />
            <View style={styles.songInfo}>
              <Text style={[
                styles.songTitle,
                currentSong?.id === song.id && styles.activeSongTitle
              ]} numberOfLines={1}>{song.title}</Text>
              <Text style={[
                styles.songArtist,
                currentSong?.id === song.id && styles.activeSongArtist
              ]} numberOfLines={1}>{song.artist}</Text>
            </View>
            <View style={styles.songActions}>
              {currentSong?.id === song.id && isPlaying ? (
                <Ionicons name="pause-circle" size={28} color="#A259FF" />
              ) : (
                <Ionicons name="play-circle" size={28} color="#A259FF" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartWrap: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  songList: {
    flex: 1,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
    transform: [{ scale: 1 }],
  },
  activeSongItem: {
    backgroundColor: 'rgba(162, 89, 255, 0.15)',
    transform: [{ scale: 1.02 }],
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  rank: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: -4,
  },
  activeRank: {
    color: '#A259FF',
  },
  songCover: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 10,
  },
  activeSongCover: {
    borderWidth: 2,
    borderColor: '#A259FF',
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 4,
  },
  activeSongTitle: {
    color: '#A259FF',
  },
  songArtist: {
    color: '#b39ddb',
    fontSize: 13,
    marginLeft: 4,
  },
  activeSongArtist: {
    color: '#A259FF',
  },
  rankChange: {
    marginTop: 4,
  },
  songActions: {
    padding: 8,
  },
}); 