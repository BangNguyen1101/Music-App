import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useStorage } from '../context/StorageContext';

export default function LoginScreen({ navigation }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [notRobot, setNotRobot] = useState(false);
  const [success, setSuccess] = useState('');
  const { users, addUser, setLoginUser } = useStorage();

  const handleLogin = () => {
    if (email && password) {
      const found = users.find(u => u.email === email && u.password === password);
      if (found) {
        setError('');
        setLoginUser(found);
        navigation.replace('MainApp');
      } else {
        setError('Sai tên đăng nhập hoặc mật khẩu');
      }
    } else {
      setError('Vui lòng nhập email và mật khẩu');
    }
  };

  const handleSignUp = () => {
    if (email && password && name && notRobot) {
      if (users.some(u => u.email === email)) {
        setError('Email đã được đăng ký');
        return;
      }
      const newUser = { email, password, name };
      addUser(newUser);
      setSuccess('Đăng ký thành công!');
      setIsSignUp(false);
      setError('');
    } else {
      setError('Vui lòng điền đầy đủ thông tin và xác minh bạn không phải là robot');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign up' : 'Sign in'}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success && !isSignUp ? <Text style={styles.success}>{success}</Text> : null}
      {isSignUp && (
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={name}
            onChangeText={setName}
          />
        </View>
      )}
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      {isSignUp && (
        <TouchableOpacity
          style={styles.robotBox}
          onPress={() => setNotRobot(!notRobot)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, notRobot && styles.checkboxChecked]}>
            {notRobot && <Text style={{ color: '#fff', fontWeight: 'bold' }}>✓</Text>}
          </View>
          <Text style={styles.robotText}>Tôi không phải là robot</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={isSignUp ? handleSignUp : handleLogin}
      >
        <Text style={styles.loginText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 18 }}
        onPress={() => {
          setError('');
          setSuccess('');
          setIsSignUp(!isSignUp);
        }}
      >
        <Text style={{ color: '#333', fontWeight: 'bold' }}>
          {isSignUp ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
          <Text style={{ color: '#A259FF', fontWeight: 'bold' }}>
            {isSignUp ? 'Đăng nhập' : 'Đăng ký'}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6E0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#B23A48',
    marginBottom: 24,
  },
  error: {
    color: '#B23A48',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  success: {
    color: '#4CAF50',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  inputBox: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    elevation: 2,
  },
  input: {
    fontSize: 16,
    color: '#B23A48',
    paddingVertical: 10,
  },
  loginBtn: {
    backgroundColor: '#B23A48',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 48,
    marginTop: 12,
    elevation: 2,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  robotBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: -8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#A259FF',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#A259FF',
    borderColor: '#A259FF',
  },
  robotText: {
    color: '#6B3E26',
    fontSize: 15,
    fontWeight: 'bold',
  },
}); 