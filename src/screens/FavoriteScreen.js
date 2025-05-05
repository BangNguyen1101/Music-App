import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorite } from '../context/FavoriteContext';

export default function FavoriteScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavorite();
  const [search, setSearch] = useState('');
  const filteredFavorites = favorites.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Bài hát yêu thích</Text>
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
      {filteredFavorites.length === 0 ? (
        <Text style={styles.emptyText}>Không tìm thấy bài hát phù hợp</Text>
      ) : (
        filteredFavorites.map((item, idx) => (
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
            <TouchableOpacity onPress={() => removeFavorite(item.id)}>
              <Ionicons name="heart" size={22} color="#FF5A7E" />
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