import React, { createContext, useContext, useState, useRef } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const soundRef = useRef(null);

  const play = async (song) => {
    try {
      setIsLoading(true);
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      let source;
      if (typeof song.url === 'number') {
        source = song.url;
      } else if (typeof song.url === 'string') {
        source = { uri: song.url };
      } else if (song.url && song.url.uri) {
        source = song.url;
      } else {
        throw new Error('Định dạng URL bài hát không hợp lệ');
      }
      const { sound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      soundRef.current = sound;
      setCurrentSong(song);
      setIsPlaying(true);
    } catch (e) {
      setIsPlaying(false);
      setCurrentSong(null);
    } finally {
      setIsLoading(false);
    }
  };

  const pause = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resume = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const stop = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setIsPlaying(false);
      setCurrentSong(null);
      setPosition(0);
      setDuration(0);
      setProgress(0);
    }
  };

  const seekTo = async (positionMillis) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(positionMillis);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setProgress(
        status.durationMillis ? (status.positionMillis / status.durationMillis) : 0
      );
      setIsPlaying(status.isPlaying);
    }
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ currentSong, isPlaying, isLoading, play, pause, resume, stop, position, duration, progress, seekTo }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
} 