import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../../components/context/LanguageContext";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const [splashVisible, setSplashVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // REPLACE WITH YOUR IP
  const API_URL = "http://192.168.1.X:8000/predict";

  useEffect(() => {
    setTimeout(() => setSplashVisible(false), 3000);
  }, []);

  const saveToHistory = async (scanResult: any, imageUri: string) => {
    try {
      const newRecord = {
        ...scanResult,
        image: imageUri,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      const existingHistory = await AsyncStorage.getItem("scanHistory");
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.unshift(newRecord);
      await AsyncStorage.setItem("scanHistory", JSON.stringify(history));
    } catch (e) {
      console.log("Error saving history", e);
    }
  };

  const processImage = async (uri: string) => {
    setModalVisible(false);
    setImage(uri);
    setLoading(true);
    setResult(null);

    // --- DEMO MODE START ---
    setTimeout(() => {
      const mockVarieties = [
        { class: "dingirala", confidence: "98.5%" },
        { class: "bootawe", confidence: "96.2%" },
        { class: "kohukuburerala", confidence: "94.8%" },
      ];
      const randomResult =
        mockVarieties[Math.floor(Math.random() * mockVarieties.length)];

      setResult(randomResult);
      saveToHistory(randomResult, uri);
      setLoading(false);
    }, 2500);
    // --- DEMO MODE END ---
  };

  const pickImage = async (useCamera: boolean) => {
    let result;
    if (useCamera) {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (!result.canceled) processImage(result.assets[0].uri);
  };

  //  Get the correct name based on language ---
  const getDisplayVariety = (rawClass: string) => {
    const key = rawClass.toLowerCase();
    
    // Check which variety it is and return the translated name from Context
    if (key.includes("dingirala")) {
        return t.varietyDetails.dingirala.name.toUpperCase();
    }
    if (key.includes("bootawe")) {
        return t.varietyDetails.bootawe.name.toUpperCase();
    }
    // Note: Model says "kohukuburerala", Context says "kohu"
    if (key.includes("kohu")) {
        return t.varietyDetails.kohu.name.toUpperCase();
    }

    // Fallback if unknown
    return rawClass.toUpperCase();
  };

  if (splashVisible) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.splashIconCircle}>
            <Ionicons name="leaf" size={80} color="#2E7D32" />
        </View>
        <Text style={styles.splashText}>Black Pepper AI</Text>
        <Text style={styles.splashSubText}>Research Assistant</Text>
        <ActivityIndicator size="large" color="white" style={{ marginTop: 40 }} />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER BACKGROUND */}
      <View style={[styles.headerBg, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
            <View>
                <Text style={styles.welcomeLabel}>Welcome,</Text>
                <Text style={styles.researcherName}>Research Partner</Text>
            </View>
            <TouchableOpacity style={styles.profileBtn}>
                <Ionicons name="person" size={20} color="#2E7D32" />
            </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* APP TITLE CARD */}
        <View style={styles.titleCard}>
            <Text style={styles.appTitle}>{t.appTitle}</Text>
            <Text style={styles.appDesc}>AI-Powered Identification System</Text>
        </View>

        {/* MAIN IMAGE SCANNER AREA */}
        <View style={styles.scannerContainer}>
            <View style={styles.scannerCard}>
            {image ? (
                <Image source={{ uri: image }} style={styles.preview} />
            ) : (
                <TouchableOpacity
                style={styles.placeholder}
                onPress={() => setModalVisible(true)}
                >
                <View style={styles.dashedCircle}>
                    <Ionicons name="camera-outline" size={40} color="#2E7D32" />
                </View>
                <Text style={styles.placeholderText}>Tap to Analyze Leaf</Text>
                </TouchableOpacity>
            )}
            </View>
            {/* Decorative corners for "Scanner" look */}
            <View style={[styles.corner, styles.tl]} />
            <View style={[styles.corner, styles.tr]} />
            <View style={[styles.corner, styles.bl]} />
            <View style={[styles.corner, styles.br]} />
        </View>

        {/* LOADING STATE */}
        {loading && (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#2E7D32" />
            <Text style={styles.loadingText}>Extracting Features...</Text>
            <Text style={styles.loadingSubText}>Analyzing vein patterns & morphology</Text>
          </View>
        )}

        {/* ANALYSIS REPORT CARD */}
        {result && !loading && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.resultBadge}>
                <Ionicons name="checkmark-sharp" size={16} color="white" />
                <Text style={styles.resultBadgeText}>CONFIRMED</Text>
              </View>
              <Text style={styles.timestamp}>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.label}>{t.variety}</Text>
            
            {/* --- UPDATED: Uses the helper function to show English/Sinhala correctly --- */}
            <Text style={styles.varietyName}>{getDisplayVariety(result.class)}</Text>

            <View style={styles.statRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>{t.confidence}</Text>
                    <Text style={styles.statValue}>{result.confidence}</Text>
                </View>
                {/* Visual Bar */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: result.confidence }]} />
                </View>
            </View>

            <View style={styles.infoBox}>
              <Ionicons name="bulb-outline" size={20} color="#1565C0" />
              <Text style={styles.infoText}>
                Identified based on leaf aspect ratio and vein density distinctive to Sri Lankan cultivars.
              </Text>
            </View>
          </View>
        )}

        <View style={{height: 100}} /> 
      </ScrollView>

      {/* FAB - FLOATING ACTION BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.9}
      >
        <Ionicons name="scan" size={24} color="white" />
        <Text style={styles.fabText}>{t.scanBtn}</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Input Source</Text>

            <View style={styles.modalRow}>
                <TouchableOpacity
                style={styles.modalOptionCard}
                onPress={() => pickImage(true)}
                >
                <View style={[styles.iconBox, {backgroundColor: '#E8F5E9'}]}>
                    <Ionicons name="camera" size={32} color="#2E7D32" />
                </View>
                <Text style={styles.optionText}>{t.camera}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.modalOptionCard}
                onPress={() => pickImage(false)}
                >
                <View style={[styles.iconBox, {backgroundColor: '#E3F2FD'}]}>
                    <Ionicons name="images" size={32} color="#1976D2" />
                </View>
                <Text style={styles.optionText}>{t.gallery}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>{t.cancel}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F7FA", // Light grey-blue for modern look
  },
  
  // Splash Screen
  splashContainer: {
    flex: 1,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
  },
  splashIconCircle: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      elevation: 10
  },
  splashText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  splashSubText: {
      color: "#A5D6A7",
      fontSize: 16,
      marginTop: 5,
      fontWeight: '500'
  },

  // Header
  headerBg: {
      backgroundColor: 'white',
      paddingBottom: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 10,
      zIndex: 10,
  },
  headerContent: {
      paddingHorizontal: 25,
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  welcomeLabel: {
      fontSize: 14,
      color: '#888',
      fontWeight: '600',
  },
  researcherName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333'
  },
  profileBtn: {
      width: 45,
      height: 45,
      borderRadius: 25,
      backgroundColor: '#F1F8E9',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#C8E6C9'
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // App Title Card
  titleCard: {
      marginBottom: 25,
      alignItems: 'center'
  },
  appTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: '#2E7D32',
      textAlign: 'center'
  },
  appDesc: {
      fontSize: 14,
      color: '#666',
      marginTop: 4
  },

  // Scanner Area
  scannerContainer: {
      position: 'relative',
      width: '100%',
      aspectRatio: 1,
      marginBottom: 25,
      padding: 10, // Space for corners
  },
  scannerCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: "hidden",
  },
  preview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  dashedCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#2E7D32",
    borderStyle: 'dashed',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  
  // Decorative Corners
  corner: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderColor: '#2E7D32',
      borderWidth: 4,
  },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 10 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 10 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 10 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 10 },

  // Loading
  loadingCard: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 15,
      alignItems: 'center',
      elevation: 2,
      marginBottom: 20
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingSubText: {
      marginTop: 5,
      color: '#888',
      fontSize: 12
  },

  // Result Card
  resultCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: "#2E7D32",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E8F5E9'
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  resultBadge: {
      flexDirection: 'row',
      backgroundColor: '#2E7D32',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      alignItems: 'center'
  },
  resultBadgeText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 10,
      marginLeft: 5
  },
  timestamp: {
      color: '#999',
      fontSize: 12
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F8E9",
    marginBottom: 15,
  },
  label: {
      fontSize: 12,
      color: '#888',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 5
  },
  varietyName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2E7D32",
    marginBottom: 20,
  },
  statRow: {
      marginBottom: 20
  },
  statItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8
  },
  statLabel: {
      fontSize: 14,
      color: '#555',
      fontWeight: '600'
  },
  statValue: {
      fontSize: 14,
      color: '#2E7D32',
      fontWeight: 'bold'
  },
  progressContainer: {
      height: 8,
      backgroundColor: '#E0E0E0',
      borderRadius: 4,
      overflow: 'hidden'
  },
  progressBar: {
      height: '100%',
      backgroundColor: '#2E7D32',
      borderRadius: 4
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    color: "#1565C0",
    fontSize: 13,
    lineHeight: 20,
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 40,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    letterSpacing: 0.5
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)", // Darker overlay
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20
  },
  modalOptionCard: {
      alignItems: 'center',
      width: 120
  },
  iconBox: {
      width: 70,
      height: 70,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10
  },
  optionText: {
    fontSize: 15,
    color: "#555",
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5'
  },
  cancelText: {
    color: "#FF5252",
    fontSize: 16,
    fontWeight: "600",
  },
});