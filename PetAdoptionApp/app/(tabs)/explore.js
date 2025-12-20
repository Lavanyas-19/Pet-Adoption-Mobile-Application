import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { petImages } from '../../imageMap';

export default function Explore() {
  const [pets, setPets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://192.168.1.4:8000/pets') // Fetches the full database.py list
      .then(res => res.json())
      .then(data => setPets(data))
      .catch(err => console.log(err));
  }, []);

  const renderPetItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push({ pathname: `/details/${item.id}`, params: { ...item } })}
    >
      <Image source={petImages[item.image]} style={styles.petImg} />
      <View style={styles.cardContent}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petBreed}>{item.breed}</Text>
        <Text style={styles.petAge}>{item.age} • Verified ✔️</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore All Pets</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput placeholder="Search dogs, cats, puppies..." style={styles.input} />
      </View>
      
      <FlatList
        data={pets}
        renderItem={renderPetItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 60 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  searchBar: { flexDirection: 'row', backgroundColor: '#F5F7F9', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  input: { marginLeft: 10, flex: 1 },
  list: { paddingBottom: 100 },
  card: { flex: 0.5, backgroundColor: '#fff', margin: 8, borderRadius: 20, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  petImg: { width: '100%', height: 140 },
  cardContent: { padding: 12 },
  petName: { fontSize: 16, fontWeight: 'bold' },
  petBreed: { fontSize: 12, color: '#888' },
  petAge: { fontSize: 11, color: '#6C63FF', marginTop: 4, fontWeight: '600' }
});