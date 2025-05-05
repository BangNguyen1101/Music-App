import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DownloadContext = createContext();

export function DownloadProvider({ children }) {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    loadDownloads();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('downloads', JSON.stringify(downloads));
  }, [downloads]);

  const loadDownloads = async () => {
    try {
      const data = await AsyncStorage.getItem('downloads');
      if (data) setDownloads(JSON.parse(data));
    } catch (e) {
      console.error('Error loading downloads', e);
    }
  };

  const addDownload = (song) => {
    const id = song.id || `${song.title}-${song.artist}`;
    setDownloads((prev) => {
      if (prev.some(item => item.id === id)) return prev;
      return [...prev, { ...song, id }];
    });
  };

  const removeDownload = (id) => {
    setDownloads((prev) => prev.filter((item) => item.id !== id));
  };

  const isDownloaded = (song) => {
    return downloads.some(item => item.title === song.title);
  };

  return (
    <DownloadContext.Provider value={{ downloads, addDownload, removeDownload, isDownloaded }}>
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownload() {
  return useContext(DownloadContext);
} 