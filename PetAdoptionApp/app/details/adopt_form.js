import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams
import { Ionicons } from '@expo/vector-icons';

export default function AdoptForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the pet ID from the URL
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    hasPets: '',
    houseType: ''
  });

  const handleApply = async () => {
    // 1. Validation
    if (!formData.name || !formData.phone || !formData.address || !formData.hasPets || !formData.houseType) {
      Alert.alert("Missing Info", "Please fill in all fields to proceed.");
      return;
    }

    // 2. Realistic Consent Flow
    Alert.alert(
      "Terms of Adoption",
      "Do you agree to a home visit and follow-up checks by our verified rescuers?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "I Agree", 
          onPress: async () => {
            try {
              // 3. SEND DATA TO FASTAPI
              const response = await fetch('http://192.168.1.4:8000/submit_adoption', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  user_name: formData.name,
                  phone: formData.phone,
                  address: formData.address,
                  pet_id: parseInt(id), // Convert ID to integer
                  has_pets: formData.hasPets,
                  house_type: formData.houseType
                }),
              });

              if (response.ok) {
                Alert.alert("Success! 🐾", "Your application is saved in our backend. The shelter will review it soon.");
                router.replace('/(tabs)/home');
              } else {
                Alert.alert("Error", "Failed to submit. Please try again.");
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Network Error", "Is your FastAPI server running at 192.168.1.4?");
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Application Form</Text>
        <Text style={styles.subtitle}>Applying for Pet ID: {id}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          placeholder="Enter your name" 
          style={styles.input} 
          onChangeText={(val) => setFormData({...formData, name: val})}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput 
          placeholder="+91 00000 00000" 
          style={styles.input} 
          keyboardType="phone-pad"
          onChangeText={(val) => setFormData({...formData, phone: val})}
        />

        <Text style={styles.label}>Current Address</Text>
        <TextInput 
          placeholder="Where will the pet stay?" 
          style={[styles.input, {height: 80}]} 
          multiline 
          onChangeText={(val) => setFormData({...formData, address: val})}
        />

        <Text style={styles.label}>Do you currently have other pets?</Text>
        <View style={styles.selectionRow}>
           {['Yes', 'No'].map(opt => (
             <TouchableOpacity 
              key={opt} 
              style={[styles.chip, formData.hasPets === opt && styles.activeChip]}
              onPress={() => setFormData({...formData, hasPets: opt})}
             >
               <Text style={formData.hasPets === opt ? styles.activeChipText : styles.chipText}>{opt}</Text>
             </TouchableOpacity>
           ))}
        </View>

        <Text style={styles.label}>Type of House</Text>
        <View style={styles.selectionRow}>
           {['Apartment', 'Independent House'].map(opt => (
             <TouchableOpacity 
              key={opt} 
              style={[styles.chip, formData.houseType === opt && styles.activeChip]}
              onPress={() => setFormData({...formData, houseType: opt})}
             >
               <Text style={formData.houseType === opt ? styles.activeChipText : styles.chipText}>{opt}</Text>
             </TouchableOpacity>
           ))}
        </View>
      </View>

      <View style={styles.noticeBox}>
        <Ionicons name="information-circle-outline" size={20} color="#6C63FF" />
        <Text style={styles.noticeText}>
          Submitting this form stores your data in our backend for shelter review.
        </Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleApply}>
        <Text style={styles.btnText}>Submit Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Keep your existing styles.create(...) below

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: '#fff' },
  header: { marginBottom: 30, marginTop: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#6C63FF', fontWeight: '600', marginTop: 5 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#F5F7F9', padding: 15, borderRadius: 12, fontSize: 16 },
  selectionRow: { flexDirection: 'row', gap: 10, marginTop: 5 },
  chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, borderWeight: 1, borderColor: '#eee', backgroundColor: '#F5F7F9' },
  activeChip: { backgroundColor: '#6C63FF' },
  chipText: { color: '#888' },
  activeChipText: { color: '#fff', fontWeight: 'bold' },
  noticeBox: { flexDirection: 'row', backgroundColor: '#F0EFFF', padding: 15, borderRadius: 12, marginVertical: 25, alignItems: 'center' },
  noticeText: { flex: 1, marginLeft: 10, fontSize: 13, color: '#6C63FF', lineHeight: 18 },
  btn: { backgroundColor: '#6C63FF', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 40 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});