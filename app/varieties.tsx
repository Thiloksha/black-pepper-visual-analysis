import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../components/context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

export default function VarietiesScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const bgImage = require('../assets/images/background.jpg');

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage} resizeMode="cover">
      
      {/* This hides the default header so your image looks good */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 10 }]}>
        
        {/* Custom Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.glassCard}>
          <Text style={styles.header}>{t.varietiesTitle}</Text>
          
          {/* Section 1: History */}
          <Text style={styles.sectionHeader}>History & Origins</Text>
          <Text style={styles.text}>{t.varietiesLongDesc}</Text>

          <View style={styles.separator} />

          {/* Section 2: Placeholder for your new content */}
          <Text style={styles.sectionHeader}>Scientific Classification</Text>
          <Text style={styles.text}>
            {/* You can add your new descriptions here later */}
            Kingdom: Plantae{"\n"}
            Family: Piperaceae{"\n"}
            Genus: Piper{"\n"}
            Species: P. nigrum
          </Text>

          {/* Add more sections here as you need! */}

        </View>

        <View style={{height: 40}} /> 
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  scrollContent: { padding: 20 },
  
  backBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  backText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginLeft: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },

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
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 15,
    marginBottom: 8,
  },
  text: { 
    fontSize: 16, 
    lineHeight: 26, 
    color: "#444",
    textAlign: 'justify'
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
});