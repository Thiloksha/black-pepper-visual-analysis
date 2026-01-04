import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../../components/context/LanguageContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { t } = useLanguage();
  
  const insets = useSafeAreaInsets();

  const [splashVisible, setSplashVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ⚠️ REPLACE WITH IP
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
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 30 },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t.appTitle}</Text>
        <Text style={styles.subtitle}>{t.appDesc}</Text>
      </View>

      <View style={styles.card}>
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={50} color="#ccc" />
          </View>
        )}
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#2E7D32"
          style={{ margin: 20 }}
        />
      )}

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.varietyLabel}>{t.variety}:</Text>
          <Text style={styles.varietyName}>{result.class.toUpperCase()}</Text>
          <Text style={styles.confidence}>
            {t.confidence}: {result.confidence}
          </Text>
          <Text style={styles.desc}>
            This is a common Sri Lankan variety known for its specific leaf
            shape and yield.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.scanBtn}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name="scan-circle"
          size={30}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.btnText}>{t.scanBtn}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => pickImage(true)}
            >
              <Ionicons name="camera" size={24} color="#2E7D32" />
              <Text style={styles.modalText}>{t.camera}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => pickImage(false)}
            >
              <Ionicons name="images" size={24} color="#2E7D32" />
              <Text style={styles.modalText}>{t.gallery}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: "red" }}>{t.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
  },
  splashText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
  }, // Removed fixed padding check here
  header: { alignItems: "center", marginBottom: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
  },
  subtitle: { color: "#666", textAlign: "center", marginTop: 5 },
  card: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 3,
  },
  preview: { width: 280, height: 280, borderRadius: 10 },
  placeholder: {
    width: 280,
    height: 280,
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: "#E8F5E9",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  varietyLabel: { fontSize: 14, color: "#555" },
  varietyName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginVertical: 5,
  },
  confidence: { fontSize: 14, color: "#888" },
  desc: { textAlign: "center", color: "#444", marginTop: 10 },
  scanBtn: {
    flexDirection: "row",
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 30,
    marginTop: 30,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { color: "white", fontSize: 18, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalBtn: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalText: { fontSize: 18, marginLeft: 15, color: "#333" },
});
