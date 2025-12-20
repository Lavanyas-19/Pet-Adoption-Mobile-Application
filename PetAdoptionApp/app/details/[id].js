import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'; // Import Animatable
import { petImages } from '../../imageMap';

export default function PetDetails() {
  const { id, name, breed, age, image } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image with FadeIn */}
        <View style={styles.imageContainer}>
          <Animatable.Image 
            animation="fadeIn"
            duration={1000}
            source={petImages[image]} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Slide Name in from the Left */}
          <Animatable.Text 
            animation="slideInLeft" 
            duration={800} 
            style={styles.name}
          >
            {name}
          </Animatable.Text>

          <Animatable.Text 
            animation="fadeIn" 
            delay={300} 
            style={styles.breedText}
          >
            {breed} • {age}
          </Animatable.Text>
          
          {/* Fade Description up */}
          <Animatable.View animation="fadeInUp" delay={500} duration={800}>
            <Text style={styles.description}>
              {name} is a wonderful {breed} looking for a loving home. 
              They are currently {age} old, fully vaccinated, friendly with children, 
              and very playful. This pet is waiting for a forever family!
            </Text>
          </Animatable.View>
          
          {/* Info Boxes with ZoomIn effect */}
          <View style={styles.infoRow}>
             <Animatable.View animation="zoomIn" delay={700} style={styles.infoBox}>
               <Text style={styles.infoLabel}>Weight</Text>
               <Text style={styles.infoValue}>5 kg</Text>
             </Animatable.View>
             <Animatable.View animation="zoomIn" delay={900} style={styles.infoBox}>
               <Text style={styles.infoLabel}>Sex</Text>
               <Text style={styles.infoValue}>Male</Text>
             </Animatable.View>
             <Animatable.View animation="zoomIn" delay={1100} style={styles.infoBox}>
               <Text style={styles.infoLabel}>Age</Text>
               <Text style={styles.infoValue}>{age}</Text>
             </Animatable.View>
          </View>
        </View>
      </ScrollView>

      {/* Footer with a Bounce Entrance */}
      <Animatable.View animation="bounceInUp" delay={1200} style={styles.footer}>
        <TouchableOpacity style={styles.chatBtn}>
           <Ionicons name="chatbubble-outline" size={24} color="#6C63FF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.adoptBtn} 
          onPress={() => router.push({
            pathname: '/details/adopt_form',
            params: { id, name } // Passing data to the form
          })}
        >
           <Text style={styles.adoptText}>Adopt Me</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

// ... styles remain the same as your previous version ...

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  imageContainer: { width: '100%', height: 400 },
  heroImage: { width: '100%', height: '100%' },
  backBtn: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    width: 40, 
    height: 40, 
    backgroundColor: 'white', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  content: { 
    padding: 25, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    marginTop: -30, 
    backgroundColor: 'white' 
  },
  name: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  breedText: { fontSize: 18, color: '#6C63FF', fontWeight: '600', marginTop: 5 },
  description: { color: '#666', marginTop: 15, lineHeight: 24, fontSize: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  infoBox: { 
    padding: 15, 
    backgroundColor: '#F5F7F9', 
    borderRadius: 15, 
    width: '30%', 
    alignItems: 'center' 
  },
  infoLabel: { color: '#888', fontSize: 12, marginBottom: 5 },
  infoValue: { fontWeight: 'bold', fontSize: 14 },
  footer: { 
    padding: 20, 
    flexDirection: 'row', 
    gap: 15, 
    borderTopWidth: 1, 
    borderColor: '#eee',
    backgroundColor: 'white'
  },
  chatBtn: { 
    width: 60, 
    height: 60, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#6C63FF', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  adoptBtn: { 
    flex: 1, 
    backgroundColor: '#6C63FF', 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 3
  },
  adoptText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});