import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { useAudio } from '../context/AudioContext';

const { width } = Dimensions.get('window');

export default function PlayerScreen({ route, navigation }) {
  const { song } = route.params;
  const { currentSong, isPlaying, isLoading, play, pause, resume, position, duration, progress, seekTo } = useAudio();
  const [isFavorite, setIsFavorite] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (!currentSong || currentSong.title !== song.title) {
      play(song);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);

  const setupAudio = async () => {
    try {
      setIsLoading(true);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      });

      if (!song.url) {
        Alert.alert('Lỗi', 'Không tìm thấy URL bài hát');
        return;
      }

      let source;
      // Nếu là require local asset (kiểu số), dùng trực tiếp
      if (typeof song.url === 'number') {
        source = song.url;
      } else if (typeof song.url === 'string') {
        source = { uri: song.url };
      } else if (song.url && song.url.uri) {
        source = song.url;
      } else {
        Alert.alert('Lỗi', 'Định dạng URL bài hát không hợp lệ');
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
    } catch (error) {
      console.log('Error loading sound:', error);
      Alert.alert('Lỗi', 'Không thể phát bài hát này');
    } finally {
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
      setProgress(status.positionMillis / status.durationMillis);
    }
  };

  const togglePlay = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await resume();
    }
  };

  const onSliderValueChange = async (value) => {
    await seekTo(value * duration);
  };

  const formatTime = (millis) => {
    if (!millis) return '0:00';
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <LinearGradient colors={['#FFD6E0', '#FFB6C1']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down" size={30} color="#6B3E26" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đang phát</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#6B3E26" />
        </TouchableOpacity>
      </View>

      <View style={styles.songInfo}>
        <Image source={{ uri: song.cover }} style={styles.cover} />
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>

      <View style={styles.controls}>
        <Slider
          style={styles.progressBar}
          value={progress}
          onValueChange={onSliderValueChange}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#A259FF"
          maximumTrackTintColor="#FFB6C1"
          thumbTintColor="#A259FF"
          disabled={isLoading}
        />
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="shuffle" size={24} color="#6B3E26" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="play-skip-back" size={24} color="#6B3E26" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.playButton, isLoading && styles.disabledButton]} 
            onPress={togglePlay}
            disabled={isLoading}
          >
            {isLoading ? (
              <Ionicons name="reload" size={40} color="#FFF" />
            ) : (
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={40} 
                color="#FFF" 
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="play-skip-forward" size={24} color="#6B3E26" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="repeat" size={24} color="#6B3E26" />
          </TouchableOpacity>
        </View>
        <View style={styles.extraControls}>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#FF5A7E" : "#6B3E26"} 
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={24} color="#6B3E26" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    color: '#6B3E26',
    fontWeight: 'bold',
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  cover: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6B3E26',
    marginBottom: 8,
  },
  artist: {
    fontSize: 16,
    color: '#A259FF',
  },
  controls: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  timeText: {
    color: '#6B3E26',
    fontSize: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    padding: 10,
  },
  playButton: {
    width: 60,
    height: 60,
    backgroundColor: '#A259FF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  extraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
}); 