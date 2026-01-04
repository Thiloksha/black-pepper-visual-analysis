import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../../components/context/LanguageContext";
import { router } from "expo-router"; // Import router

export default function InfoScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const bgImage = require("../../assets/images/background.jpg");

  return (
    <ImageBackground
      source={bgImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20 },
        ]}
      >
        <View style={styles.glassCard}>
          <Text style={styles.header}>{t.sriLankaPepper}</Text>
          <Text style={styles.text}>{t.infoDesc}</Text>

          <View style={styles.separator} />

          {/* THE NEW NAVIGATION BUTTON */}
          <TouchableOpacity 
            style={styles.navBtn} 
            onPress={() => router.push("/varieties")}
          >
            <View style={{flex: 1}}>
              <Text style={styles.navBtnTitle}>{t.btnViewVarieties}</Text>
              <Text style={styles.navBtnSub}>{t.btnViewVarietiesSub}</Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => Linking.openURL("https://dea.gov.lk/")}
          >
            <Ionicons name="globe-outline" size={20} color="white" />
            <Text style={styles.linkText}>{t.visitGov}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  scrollContent: { padding: 20 },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: "#444",
    textAlign: "justify",
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  // New Button Styles
  navBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  navBtnTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  navBtnSub: { color: '#E8F5E9', fontSize: 12 },
  
  linkBtn: {
    flexDirection: "row",
    backgroundColor: "#1976D2",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  linkText: { color: "white", fontWeight: "bold", marginLeft: 10, fontSize: 16 },
});