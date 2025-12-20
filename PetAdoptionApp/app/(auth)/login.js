import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  // State to hold user input
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleLogin = () => {
    // Navigate to tabs and pass the user info as parameters
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
        style={styles.input} 
        onChangeText={setName} 
      />
      <TextInput 
        placeholder="Email Address" 
        style={styles.input} 
        onChangeText={setEmail} 
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin}>

        <Text style={styles.guestText}>                         Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}
// ... keep your existing styles ...

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff', justifyContent: 'center' },
  welcome: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  input: { backgroundColor: '#F5F7F9', padding: 15, borderRadius: 12, marginBottom: 15 },
  loginBtn: { backgroundColor: '#6C63FF', padding: 18, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  or: { textAlign: 'center', marginVertical: 20, color: '#999' },
  guestBtn: { borderWidth: 1, borderColor: '#6C63FF', padding: 18, borderRadius: 12, alignItems: 'center' },
  welcome: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  guestText: { fontSize:20 , color: '#6C63FF', fontWeight: 'bold' }
});