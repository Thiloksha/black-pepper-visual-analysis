import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useLanguage } from "../../components/context/LanguageContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from "expo-router"; 

export default function InfoScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const bgImage = require('../../assets/images/background.jpg');

  return (
    <ImageBackground 
      source={bgImage} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: insets.top + 20 }
        ]}
      >
        <View style={styles.glassCard}>
          <Text style={styles.header}>{t.sriLankaPepper}</Text>
          <Text style={styles.text}>{t.infoDesc}</Text>

          {/* 2. Update Button to Navigate to the new Page */}
          <TouchableOpacity 
            style={styles.historyButton} 
            onPress={() => router.push('/varieties')} 
          >
            <View style={{flex: 1}}>
                <Text style={styles.historyBtnTitle}>{t.varietiesTitle}</Text>
                <Text style={styles.historyBtnSub}>Click to read full history</Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={32} color="white" />
          </TouchableOpacity>
          
          <View style={styles.separator} />

          <Text style={styles.subHeader}>Common Varieties:</Text>

          <View style={styles.listItem}>
            <Ionicons name="leaf-outline" size={18} color="#2E7D32" />
            <Text style={styles.bullet}>Dingirala</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="leaf-outline" size={18} color="#2E7D32" />
            <Text style={styles.bullet}>Kohukuburerala</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="leaf-outline" size={18} color="#2E7D32" />
            <Text style={styles.bullet}>Butawerala</Text>
          </View>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => Linking.openURL("https://dea.gov.lk/")}
          >
            <Ionicons name="globe-outline" size={20} color="white" />
            <Text style={styles.linkText}>{t.visitGov}</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 40}} /> 
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  scrollContent: { padding: 20 },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 15,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 10,
    marginBottom: 10,
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
    marginVertical: 15,
  },
  historyButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 3,
  },
  historyBtnTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  historyBtnSub: { color: '#E8F5E9', fontSize: 12 },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#F1F8E9',
    padding: 12,
    borderRadius: 10,
  },
  bullet: { fontSize: 17, color: "#333", marginLeft: 10, fontWeight: '500' },
  linkBtn: {
    flexDirection: "row",
    backgroundColor: "#1976D2",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  linkText: { color: "white", fontWeight: "bold", marginLeft: 10, fontSize: 16 },
});