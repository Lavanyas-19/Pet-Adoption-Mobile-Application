import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PETS_DATA = [
    {"id": 1, "name": "Rocky", "breed": "Golden Retriever", "age": "2 Yrs", "image": "https://i.ibb.co/n854pS7v/dog1.jpg"},
    {"id": 2, "name": "Tiger", "breed": "Labrador Retriever", "age": "3 Yrs", "image": "https://i.ibb.co/W47967dZ/dog2.jpg"},
    {"id": 3, "name": "Luna", "breed": "Siamese", "age": "3 Yrs", "image": "https://i.ibb.co/XZcJPnvW/cat1.jpg"},
    {"id": 4, "name": "Jackie", "breed": "Schnauzer", "age": "1 Yrs", "image": "https://i.ibb.co/39jK81qL/schnauzer.jpg"},
    {"id": 5, "name": "Tommy", "breed": "Black Poodle dog", "age": "3 Yrs", "image": "https://i.ibb.co/VYTXs3bL/Black-Poodle-dog.jpg"},
    {"id": 6, "name": "Milo", "breed": "Ragdoll", "age": "2 Yrs", "image": "https://i.ibb.co/8CW9cjm/cat2.jpg"},
    {"id": 7, "name": "Jimmy", "breed": "Shih tzu", "age": "2 Yrs", "image": "https://i.ibb.co/kVTGnqnq/Shih-tzu-Dog.jpg"},
    {"id": 8, "name": "Snowy", "breed": "White Furry", "age": "1 Yrs", "image": "https://i.ibb.co/KjkBwpNt/White-Furry.jpg"},
    {"id": 9, "name": "Simba", "breed": "Golden retreiver", "age": "3 Yrs", "image": "https://i.ibb.co/Zb85H47/golden-retreiver.jpg"},
    {"id": 10, "name": "Chloe", "breed": "Indie cat", "age": "1 Yrs", "image": "https://i.ibb.co/DDBncyFJ/indie-cat.jpg"},
];

export default function Explore() {
  const router = useRouter();

  const renderPetItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push({ pathname: `/details/${item.id}`, params: { ...item } })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.petImg} 
        resizeMode="cover" 
      />
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
        <TextInput 
            placeholder="Search dogs, cats, puppies..." 
            placeholderTextColor="#999999" // FIXED: Visible placeholder
            style={styles.input} 
        />
      </View>
      
      <FlatList
        data={PETS_DATA}
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
  input: { 
    marginLeft: 10, 
    flex: 1,
    color: '#000000', // FIXED: Typed text is now BLACK
    fontSize: 16
  },
  list: { paddingBottom: 100 },
  card: { flex: 0.5, backgroundColor: '#fff', margin: 8, borderRadius: 20, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  petImg: { width: '100%', height: 140, backgroundColor: '#F5F7F9' }, 
  cardContent: { padding: 12 },
  petName: { fontSize: 16, fontWeight: 'bold' },
  petBreed: { fontSize: 12, color: '#888' },
  petAge: { fontSize: 11, color: '#6C63FF', marginTop: 4, fontWeight: '600' }
});