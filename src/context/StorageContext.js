import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageContext = createContext();

export function StorageProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);
  const [users, setUsers] = useState([]); // Danh sách tài khoản
  const [currentUser, setCurrentUser] = useState(null); // Tài khoản đang đăng nhập

  // Load dữ liệu khi app khởi động
  useEffect(() => {
    loadData();
  }, []);

  // Load dữ liệu từ AsyncStorage
  const loadData = async () => {
    try {
      const playlistsData = await AsyncStorage.getItem('playlists');
      const usersData = await AsyncStorage.getItem('users');
      const currentUserData = await AsyncStorage.getItem('currentUser');
      
      if (playlistsData) {
        setPlaylists(JSON.parse(playlistsData));
      }
      if (usersData) {
        setUsers(JSON.parse(usersData));
      }
      if (currentUserData) {
        setCurrentUser(JSON.parse(currentUserData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Lưu danh sách playlist
  const savePlaylists = async (newPlaylists) => {
    try {
      await AsyncStorage.setItem('playlists', JSON.stringify(newPlaylists));
      setPlaylists(newPlaylists);
    } catch (error) {
      console.error('Error saving playlists:', error);
    }
  };

  // Thêm tài khoản mới
  const addUser = async (userData) => {
    try {
      const updatedUsers = [...users, userData];
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Đăng nhập: lưu user hiện tại
  const setLoginUser = async (userData) => {
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error saving current user:', error);
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setCurrentUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <StorageContext.Provider value={{
      playlists,
      users,
      currentUser,
      savePlaylists,
      addUser,
      setLoginUser,
      logout,
    }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
} 