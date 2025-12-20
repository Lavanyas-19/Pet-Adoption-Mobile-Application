// app/index.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LottieView
        source={{ uri: 'https://assets5.lottiefiles.com/packages/lf20_syqnfe7c.json' }} 
        autoPlay loop style={styles.animation}
      />
      <View style={styles.textGroup}>
        <Text style={styles.title}>Adopt. Don’t Shop.</Text>
        <Text style={styles.subtitle}>Find verified pets near you and give them a forever home.</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(auth)/login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-around', padding: 20 },
  animation: { width: 300, height: 300 },
  textGroup: { alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#6C63FF' },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#666', marginTop: 10, paddingHorizontal: 20 },
  button: { backgroundColor: '#6C63FF', paddingVertical: 18, paddingHorizontal: 80, borderRadius: 35 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});