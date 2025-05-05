import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDownload } from '../context/DownloadContext';

export default function DownloadScreen({ navigation }) {
  const { downloads, removeDownload } = useDownload();
  const [search, setSearch] = useState('');
  const filteredDownloads = downloads.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Bài hát đã tải</Text>
      <TextInput
        style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginBottom: 16,
          fontSize: 16,
          color: '#6B3E26',
        }}
        placeholder="Tìm kiếm bài hát hoặc nghệ sĩ..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#A259FF"
      />
      {filteredDownloads.length === 0 ? (
        <Text style={styles.emptyText}>Không tìm thấy bài hát phù hợp</Text>
      ) : (
        filteredDownloads.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.songItem}
            onPress={() => navigation.navigate('Player', { song: item })}
          >
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.artist} numberOfLines={1}>{item.artist}</Text>
            </View>
            <TouchableOpacity onPress={() => removeDownload(item.id)}>
              <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6E0',
    padding: 16,
    paddingTop: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B3E26',
    marginBottom: 16,
  },
  emptyText: {
    color: '#6B3E26',
    textAlign: 'center',
    marginTop: 24,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 8,
    marginBottom: 10,
    elevation: 1,
  },
  cover: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#FFD6E0',
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
}); 