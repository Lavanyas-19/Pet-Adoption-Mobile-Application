import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Add useLocalSearchParams

export default function Profile() {
  const router = useRouter();
  // Get the parameters passed from the login screen
  const { userName, userEmail } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={80} color="#6C63FF" />
        </View>
        {/* Dynamic Text: Uses passed data or falls back to Guest */}
        <Text style={styles.userName}>{userName || "Hello User!"}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Account Details</Text>
        <View style={styles.infoRow}><Text style={styles.label}>Status</Text><Text style={styles.value}>Verified Adopter ✔️</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Location</Text><Text style={styles.value}>Chennai, India</Text></View>
      </View>

      <TouchableOpacity 
        style={styles.logoutBtn} 
        onPress={() => router.replace('/(auth)/login')} // Redirects back to Login page
      >
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { backgroundColor: '#fff', alignItems: 'center', paddingVertical: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, elevation: 5 },
  avatarContainer: { marginBottom: 15 },
  userName: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  userEmail: { fontSize: 14, color: '#888', marginTop: 5 },
  infoSection: { padding: 25, marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#555' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  label: { color: '#888', fontSize: 16 },
  value: { color: '#333', fontWeight: '600', fontSize: 16 },
  logoutBtn: { backgroundColor: '#e74c4cff', margin: 25, padding: 18, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 4 },
  logoutText: { color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 10 }
});