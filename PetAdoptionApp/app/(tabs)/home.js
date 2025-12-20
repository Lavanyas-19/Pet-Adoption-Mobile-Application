import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';

export default function Home() {
  const router = useRouter();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.4:8000/pets')
      .then(res => res.json())
      .then(data => {
        console.log("Data fetched successfully");
        setPets(data);
      })
      .catch(err => console.log("Fetch Error:", err));
  }, []);

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
        {/* Standard Image with error logging to find the bug */}
        <Image 
          source={{ uri: item.image }} 
          style={styles.cardImg}
          resizeMode="cover"
          onLoad={() => console.log(`Successfully loaded image for: ${item.name}`)}
          onError={(e) => console.log(`Error loading image for ${item.name}:`, e.nativeEvent.error)}
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
             
             <Animatable.View 
               animation="pulse" 
               iterationCount="infinite" 
               duration={1500}
             >
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
            <TextInput placeholder="Search puppies, kittens..." style={styles.input} />
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
          data={pets}
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
  input: { flex: 1, marginLeft: 10 },
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