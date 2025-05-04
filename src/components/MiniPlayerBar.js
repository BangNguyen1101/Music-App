import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../context/AudioContext';
import { useNavigation } from '@react-navigation/native';

export default function MiniPlayerBar() {
  const { currentSong, isPlaying, isLoading, pause, resume } = useAudio();
  const navigation = useNavigation();

  if (!currentSong) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Player', { song: currentSong })} activeOpacity={0.9}>
      <Image source={{ uri: currentSong.cover }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{currentSong.artist}</Text>
      </View>
      <TouchableOpacity
        style={styles.playPauseBtn}
        onPress={e => {
          e.stopPropagation();
          if (isPlaying) pause(); else resume();
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Ionicons name="reload" size={28} color="#A259FF" />
        ) : (
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="#A259FF" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 70,
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#eee',
    elevation: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  cover: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#FFD6E0',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#6B3E26',
    fontSize: 15,
  },
  artist: {
    color: '#A259FF',
    fontSize: 13,
  },
  playPauseBtn: {
    padding: 8,
  },
}); 