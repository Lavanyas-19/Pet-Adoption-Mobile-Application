// login.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleLogin = () => {
    router.replace({
      pathname: '/(tabs)/home',
      params: { userName: name || "Guest User", userEmail: email || "guest@adoption.com" }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      
      <TextInput 
        placeholder="Full Name" 
        placeholderTextColor="#999" 
        style={styles.input} 
        onChangeText={setName} 
        value={name}
      />
      <TextInput 
        placeholder="Email Address" 
        placeholderTextColor="#999" 
        style={styles.input} 
        onChangeText={setEmail} 
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.guestBtn} onPress={handleLogin}>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff', justifyContent: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
  input: { 
    backgroundColor: '#F5F7F9', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15,
    color: '#000000', // Forces black text
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0' // Visible border for clarity
  },
  loginBtn: { backgroundColor: '#6C63FF', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  guestBtn: { padding: 10, alignItems: 'center' },
  guestText: { fontSize: 18, color: '#6C63FF', fontWeight: 'bold', textAlign: 'center' }
});