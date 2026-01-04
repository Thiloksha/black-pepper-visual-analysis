import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

    const formData = new FormData();
    // @ts-ignore
    formData.append("file", { uri: uri, name: "leaf.jpg", type: "image/jpeg" });

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
      saveToHistory(response.data, uri);
    } catch (error) {
      Alert.alert("Error", "Backend not connected.");
    } finally {
      setLoading(false);
    }
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

  // Helper to get number from string "98.5%" -> 98.5
  const getConfidenceValue = (confStr: string) => {
    return parseFloat(confStr.replace("%", "")) || 0;
  };

  if (splashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Ionicons name="leaf" size={100} color="white" />
        <Text style={styles.splashText}>Black Pepper AI</Text>
        <ActivityIndicator
          size="large"
          color="white"
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F6F8" }}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: insets.top + 20, paddingBottom: 100 },
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ flex: 1, marginRight: 10 }}>
            {/* Added flex: 1 and margin so text wraps instead of pushing the icon */}
            <Text style={styles.welcomeText}>Welcome Researcher,</Text>
            <Text style={styles.title}>{t.appTitle}</Text>
          </View>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={20} color="white" />
          </View>
        </View>

        {/* MAIN IMAGE CARD */}
        <View style={styles.card}>
          {image ? (
            <Image source={{ uri: image }} style={styles.preview} />
          ) : (
            <TouchableOpacity
              style={styles.placeholder}
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="scan-outline" size={40} color="#2E7D32" />
              </View>
              <Text style={styles.placeholderText}>Tap to Scan Leaf</Text>
              <Text style={styles.placeholderSubText}>Camera or Gallery</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* LOADING INDICATOR */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2E7D32" />
            <Text style={styles.loadingText}>Analyzing Leaf Features...</Text>
          </View>
        )}

        {/* RESULT CARD */}
        {result && !loading && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
              <Text style={styles.resultTitle}>Analysis Complete</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.varietyLabel}>{t.variety}</Text>
            <Text style={styles.varietyName}>{result.class.toUpperCase()}</Text>

            {/* Visual Confidence Bar */}
            <View style={styles.confidenceContainer}>
              <View style={styles.confidenceRow}>
                <Text style={styles.confidenceLabel}>{t.confidence}</Text>
                <Text style={styles.confidenceValue}>{result.confidence}</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${getConfidenceValue(result.confidence)}%` },
                  ]}
                />
              </View>
            </View>

            <View style={styles.infoBadge}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#1565C0"
              />
              <Text style={styles.infoText}>
                This variety is identified based on leaf vein patterns and
                shape.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* FLOATING ACTION BUTTON (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="camera" size={28} color="white" />
        <Text style={styles.fabText}>{t.scanBtn}</Text>
      </TouchableOpacity>

      {/* SELECTION MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select Image Source</Text>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => pickImage(true)}
            >
              <View style={[styles.optionIcon, { backgroundColor: "#E8F5E9" }]}>
                <Ionicons name="camera" size={24} color="#2E7D32" />
              </View>
              <Text style={styles.optionText}>{t.camera}</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => pickImage(false)}
            >
              <View style={[styles.optionIcon, { backgroundColor: "#E3F2FD" }]}>
                <Ionicons name="images" size={24} color="#1976D2" />
              </View>
              <Text style={styles.optionText}>{t.gallery}</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

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
  // Splash
  splashContainer: {
    flex: 1,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
  },
  splashText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
    letterSpacing: 1,
  },

  // Layout
  scrollContainer: {
    paddingHorizontal: 20,
  },

  // Header
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#A5D6A7",
    justifyContent: "center",
    alignItems: "center",
  },

  // Main Card (Image Preview)
  card: {
    width: "100%",
    aspectRatio: 1, // Keep it square
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
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
    backgroundColor: "#fff",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F1F8E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  placeholderSubText: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },

  // Loading
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontWeight: "500",
  },

  // Result Card
  resultCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    marginBottom: 20,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
  varietyLabel: {
    fontSize: 14,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  varietyName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#333",
    marginTop: 5,
    marginBottom: 20,
  },
  confidenceContainer: {
    marginBottom: 20,
  },
  confidenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  confidenceLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  confidenceValue: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "bold",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2E7D32",
    borderRadius: 4,
  },
  infoBadge: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    color: "#1565C0",
    fontSize: 13,
    lineHeight: 18,
  },

  // Floating Button (FAB)
  fab: {
    position: "absolute",
    bottom: 25,
    alignSelf: "center",
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  fabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  cancelButton: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  cancelText: {
    color: "#FF5252",
    fontSize: 16,
    fontWeight: "600",
  },
});
