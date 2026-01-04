import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground, //  Import ImageBackground
} from "react-native";
import { useLanguage } from "../../components/context/LanguageContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
      {/* ScrollView sits ON TOP of the image */}
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: insets.top + 20 }
        ]}
      >
        <View style={styles.glassCard}>
          <Text style={styles.header}>{t.sriLankaPepper}</Text>
          <Text style={styles.text}>{t.infoDesc}</Text>

          <Text style={styles.subHeader}>Sri Lankan Varieties:</Text>
          
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

        {/* Extra padding at bottom so card doesn't touch edge */}
        <View style={{height: 40}} /> 
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Fills the whole screen
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    padding: 20,
    // We removed 'backgroundColor: white' from here so the image shows through
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)', // 92% opaque white (The "Glass" effect)
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Shadow for Android
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1B5E20", // Darker green for contrast
    marginBottom: 15,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 25,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5,
  },
  text: { 
    fontSize: 16, 
    lineHeight: 26, 
    color: "#444",
    textAlign: 'justify' // Makes paragraphs look cleaner
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#F1F8E9', // Very light green background for items
    padding: 12,
    borderRadius: 10,
  },
  bullet: { 
    fontSize: 17, 
    color: "#333", 
    marginLeft: 10,
    fontWeight: '500'
  },
  linkBtn: {
    flexDirection: "row",
    backgroundColor: "#1976D2",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30, // Pill shape
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  linkText: { 
    color: "white", 
    fontWeight: "bold", 
    marginLeft: 10,
    fontSize: 16 
  },
});