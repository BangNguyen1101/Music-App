import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlaylistItem({ title, author, cover, songs, onDelete, navigation }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PlaylistDetail', { playlist: { title, author, cover, songs } })}
    >
      {cover ? (
        <Image source={{ uri: cover }} style={styles.cover} />
      ) : (
        <View style={styles.coverPlaceholder} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.count}>{songs?.length || 0} bài hát</Text>
      </View>
      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Ionicons name="trash" size={22} color="#FF5A7E" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
    resizeMode: 'cover',
  },
  coverPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#FFD6E0',
  },
  title: {
    fontWeight: 'bold',
    color: '#6B3E26',
    fontSize: 16,
  },
  author: {
    color: '#A259FF',
    fontSize: 13,
  },
  count: {
    color: '#6B3E26',
    fontSize: 12,
  },
  deleteBtn: {
    padding: 8,
  },
}); 