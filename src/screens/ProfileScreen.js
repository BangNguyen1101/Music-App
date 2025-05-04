import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStorage } from '../context/StorageContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useStorage();

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://cdn2.tuoitre.vn/zoom/700_525/471584752817336320/2025/4/16/jack-2-1744777392408827992167-84-0-447-694-crop-17447774526891071202926.jpg' }} 
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'No email'}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Quyền lợi của tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Gói của tôi</Text>
        </TouchableOpacity>
      </View>

      {/* Advanced Features */}
      <Text style={styles.sectionTitle}>Trải nghiệm nâng cao</Text>
      <View style={styles.featureRow}>
        <TouchableOpacity style={styles.featureBox}>
          <Text style={styles.featureText}>Tùy chỉnh giao diện ứng dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureBox}>
          <Text style={styles.featureText}>Âm thanh vượt trội (Lossless)</Text>
        </TouchableOpacity>
      </View>

      {/* Services */}
      <Text style={styles.sectionTitle}>Dịch vụ</Text>
      <View style={styles.serviceRow}>
        <Text style={styles.serviceText}>3G/4G: Tiết kiệm 3G/4G truy cập</Text>
        <Text style={styles.serviceText}>Nhập Code</Text>
      </View>

      {/* Personal */}
      <Text style={styles.sectionTitle}>Cá nhân</Text>
      <View style={styles.personalRow}>
        <Text style={styles.personalText}>Danh sách quan tâm</Text>
        <Text style={styles.personalText}>Danh sách chặn</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6E0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B3E26',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  userBadge: {
    backgroundColor: '#FFB6C1',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    width: '45%',
    elevation: 10,
  },
  buttonText: {
    color: '#6B3E26',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B3E26',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  featureBox: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    elevation: 2,
  },
  featureText: {
    color: '#6B3E26',
    textAlign: 'center',
    fontSize: 16,
  },
  serviceRow: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  serviceText: {
    color: '#6B3E26',
    marginVertical: 10,
    fontSize: 16,
  },
  personalRow: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  personalText: {
    color: '#6B3E26',
    marginVertical: 10,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#B23A48',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});