import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../components/context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

export default function VarietiesScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const bgImage = require('../assets/images/background.jpg');

  // State to hold the data for the modal (null means modal is closed)
  const [selectedVariety, setSelectedVariety] = useState<any>(null);

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage} resizeMode="cover">
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 10 }]}>
        
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.glassCard}>
          <Text style={styles.header}>{t.varietiesTitle}</Text>
          <Text style={styles.text}>{t.varietiesIntro}</Text>

          <View style={styles.separator} />
          
          <Text style={styles.subHeader}>Select a variety for details:</Text>

          {/* Button 1: Dingi Rala */}
          <TouchableOpacity style={styles.varietyBtn} onPress={() => setSelectedVariety(t.varietyDetails.dingirala)}>
            <Ionicons name="leaf" size={20} color="#2E7D32" />
            <Text style={styles.varietyBtnText}>{t.varietyDetails.dingirala.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          {/* Button 2: Kohukumbure Rala */}
          <TouchableOpacity style={styles.varietyBtn} onPress={() => setSelectedVariety(t.varietyDetails.kohu)}>
            <Ionicons name="leaf" size={20} color="#2E7D32" />
            <Text style={styles.varietyBtnText}>{t.varietyDetails.kohu.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          {/* Button 3: Bootawe Rala */}
          <TouchableOpacity style={styles.varietyBtn} onPress={() => setSelectedVariety(t.varietyDetails.bootawe)}>
            <Ionicons name="leaf" size={20} color="#2E7D32" />
            <Text style={styles.varietyBtnText}>{t.varietyDetails.bootawe.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

        </View>
        <View style={{height: 40}} /> 
      </ScrollView>

      {/* THE MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedVariety} // Show if data exists
        onRequestClose={() => setSelectedVariety(null)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                {selectedVariety && (
                    <>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{selectedVariety.name}</Text>
                            <TouchableOpacity onPress={() => setSelectedVariety(null)}>
                                <Ionicons name="close-circle" size={30} color="#666" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                            
                            <Text style={styles.sectionTitle}>🧬 Parentage & Breeding</Text>
                            <Text style={styles.modalText}>{selectedVariety.parentage}</Text>

                            <Text style={styles.sectionTitle}>🌾 Agronomic Traits</Text>
                            <Text style={styles.modalText}>{selectedVariety.agronomy}</Text>

                            <Text style={styles.sectionTitle}>🔬 Quality Attributes</Text>
                            <Text style={styles.modalText}>{selectedVariety.quality}</Text>

                            <View style={styles.summaryBox}>
                                <Text style={styles.summaryText}>{selectedVariety.summary}</Text>
                            </View>

                        </ScrollView>
                    </>
                )}
            </View>
        </View>
      </Modal>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  scrollContent: { padding: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  backText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 5, textShadowRadius: 5, textShadowColor: 'black' },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 20,
    textAlign: 'center',
  },
  text: { fontSize: 16, lineHeight: 26, color: "#444", textAlign: 'justify' },
  separator: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 20 },
  subHeader: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 10 },
  
  // Variety Buttons
  varietyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9'
  },
  varietyBtnText: { flex: 1, marginLeft: 10, fontSize: 18, fontWeight: '500', color: '#2E7D32' },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', borderRadius: 20, padding: 20, maxHeight: '85%', elevation: 10 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20', marginTop: 15, marginBottom: 5 },
  modalText: { fontSize: 15, lineHeight: 24, color: '#444' },
  summaryBox: { backgroundColor: '#E8F5E9', padding: 15, borderRadius: 10, marginTop: 20 },
  summaryText: { fontStyle: 'italic', color: '#2E7D32', textAlign: 'center' }
});