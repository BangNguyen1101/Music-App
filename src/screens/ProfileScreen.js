import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStorage } from '../context/StorageContext';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { currentUser, logout, updateUser } = useStorage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedAvatar, setEditedAvatar] = useState('');

  useEffect(() => {
    if (currentUser) {
      setEditedName(currentUser.name);
      setEditedAvatar(currentUser.avatar || 'https://cdn2.tuoitre.vn/zoom/700_525/471584752817336320/2025/4/16/jack-2-1744777392408827992167-84-0-447-694-crop-17447774526891071202926.jpg');
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    if (editedName.trim() === '') {
      Alert.alert('Lỗi', 'Tên không được để trống');
      return;
    }
    try {
      const updatedUser = {
        ...currentUser,
        name: editedName,
        avatar: editedAvatar
      };
      await updateUser(updatedUser);
      setIsEditing(false);
      Alert.alert('Thành công', 'Cập nhật thông tin thành công');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Lỗi', 'Cần quyền truy cập thư viện ảnh');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setEditedAvatar(result.assets[0].uri);
    }
  };

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text>Vui lòng đăng nhập</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={isEditing ? pickImage : null}>
          <Image
            source={{ uri: isEditing ? editedAvatar : currentUser.avatar || editedAvatar }} 
            style={styles.profileImage}
          />
          {isEditing && (
            <View style={styles.editAvatarOverlay}>
              <Ionicons name="camera" size={24} color="#fff" />
              <Text style={styles.editAvatarText}>Thay đổi ảnh</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.userInfo}>
          {isEditing ? (
            <View style={styles.nameInputContainer}>
              <TextInput
                style={styles.nameInput}
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Nhập tên mới"
                placeholderTextColor="#A259FF"
              />
              <Ionicons name="pencil" size={20} color="#A259FF" style={styles.inputIcon} />
            </View>
          ) : (
            <Text style={styles.userName}>{currentUser.name}</Text>
          )}
          <Text style={styles.userEmail}>{currentUser.email}</Text>
        </View>
      </View>

      {/* Edit/Save Button */}
      <View style={styles.editButtonContainer}>
        <TouchableOpacity
          style={[styles.editButton, isEditing && styles.saveButton]}
          onPress={isEditing ? handleSaveProfile : handleEditProfile}
        >
          <Ionicons 
            name={isEditing ? "checkmark" : "create-outline"} 
            size={20} 
            color="#fff" 
            style={styles.buttonIcon}
          />
          <Text style={styles.editButtonText}>
            {isEditing ? 'Lưu thay đổi' : 'Chỉnh sửa thông tin'}
          </Text>
        </TouchableOpacity>
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
    padding: 20,
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 16,
    elevation: 5,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#A259FF',
    marginRight: 20,
  },
  editAvatarOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  editAvatarText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6B3E26',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#A259FF',
  },
  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A259FF',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  nameInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B3E26',
    paddingVertical: 8,
  },
  inputIcon: {
    marginLeft: 8,
  },
  editButtonContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#A259FF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonIcon: {
    marginRight: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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