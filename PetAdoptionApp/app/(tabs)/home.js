import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';

// FIXED: Using cloud links and local data to ensure it works in the office
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

export default function Home() {
  const router = useRouter();

  const categories = [
    { name: 'Dogs', icon: 'paw', color: '#FFEDEA' },
    { name: 'Cats', icon: 'logo-octocat', color: '#E7F5FF' },
    { name: 'Birds', icon: 'paw', color: '#F0FFF4' },
    { name: 'Others', icon: 'grid', color: '#FFF9DB' },
  ];

  const renderPetCard = ({ item, index }) => (
    <Animatable.View 
      animation="fadeInUp" 
      delay={index * 150} 
      duration={800}
      style={{ flex: 0.5 }}
    >
      <TouchableOpacity 
        style={styles.premiumCard} 
        activeOpacity={0.8}
        onPress={() => router.push({
          pathname: `/details/${item.id}`,
          params: { ...item } 
        })}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.cardImg}
          resizeMode="cover"
        />
        
        <View style={styles.cardBody}>
          <Animatable.Text 
            animation="slideInLeft" 
            duration={1000} 
            style={styles.pName}
          >
            {item.name}
          </Animatable.Text>
          
          <Text style={styles.pBreed}>{item.breed}</Text>
          
          <View style={styles.cardFooter}>
             <Text style={styles.ageTag}>{item.age}</Text>
             <Animatable.View animation="pulse" iterationCount="infinite" duration={1500}>
               <Ionicons name="heart-outline" size={20} color="#6C63FF" />
             </Animatable.View>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.main}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topHeader}>
          <View>
            <Text style={styles.greet}>Find your best friend</Text>
            <View style={styles.locBox}>
              <Ionicons name="location" size={18} color="#6C63FF" />
              <Text style={styles.locName}>India</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/(tabs)/profile')}>
            <Ionicons name="person-circle" size={45} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput 
                placeholder="Search puppies, kittens..." 
                placeholderTextColor="#999999" // FIXED: Visible placeholder
                style={styles.input} 
            />
            <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
                <Ionicons name="options" size={20} color="#6C63FF" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}>
          {categories.map((c, i) => (
            <TouchableOpacity key={i} style={[styles.chip, {backgroundColor: c.color}]}>
              <Ionicons name={c.icon} size={22} color="#333" />
              <Text style={styles.chipText}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Nearby Rescues</Text>
           <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
              <Text style={styles.viewAll}>View All</Text>
           </TouchableOpacity>
        </View>

        <FlatList
          data={PETS_DATA}
          renderItem={renderPetCard}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#FFF', paddingHorizontal: 20 },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 60, alignItems: 'center' },
  greet: { fontSize: 14, color: '#888' },
  locBox: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locName: { fontWeight: 'bold', fontSize: 20 },
  searchSection: { marginTop: 25 },
  searchBar: { flexDirection: 'row', backgroundColor: '#F5F7F9', padding: 15, borderRadius: 18, alignItems: 'center' },
  input: { 
    flex: 1, 
    marginLeft: 10, 
    color: '#000000', // FIXED: Typed text is now BLACK
    fontSize: 16 
  },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 30, marginBottom: 15 },
  catRow: { flexDirection: 'row' },
  chip: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 15, marginRight: 15, alignItems: 'center' },
  chipText: { marginLeft: 10, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewAll: { color: '#6C63FF', fontWeight: 'bold' },
  listContainer: { paddingBottom: 100 },
  premiumCard: { flex: 0.5, backgroundColor: '#FFF', margin: 5, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#F0F0F0' },
  cardImg: { width: '100%', height: 150, backgroundColor: '#F5F7F9' }, 
  cardBody: { padding: 12 },
  pName: { fontSize: 18, fontWeight: 'bold' },
  pBreed: { color: '#888', fontSize: 13, marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ageTag: { backgroundColor: '#F0EFFF', color: '#6C63FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 11, fontWeight: 'bold' }
});