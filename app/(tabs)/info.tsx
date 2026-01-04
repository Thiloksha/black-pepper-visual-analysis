import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Modal, // 1. Import Modal
} from "react-native";
import { useLanguage } from "../../components/context/LanguageContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function InfoScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  
  // 2. State for controlling the popup
  const [modalVisible, setModalVisible] = useState(false);

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

          {/* 3. The New Interactive Button */}
          <TouchableOpacity 
            style={styles.historyButton} 
            onPress={() => setModalVisible(true)}
          >
            <View style={{flex: 1}}>
                <Text style={styles.historyBtnTitle}>{t.varietiesTitle}</Text>
                <Text style={styles.historyBtnSub}>Click to read history & origins</Text>
            </View>
            <Ionicons name="chevron-forward-circle" size={32} color="white" />
          </TouchableOpacity>
          
          <View style={styles.separator} />

          {/* List of Varieties */}
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

      {/* 4. The Modal (Popup Page) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{t.varietiesTitle}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Ionicons name="close-circle" size={30} color="#666" />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                    <Text style={styles.modalText}>{t.varietiesLongDesc}</Text>
                </ScrollView>
                
                <TouchableOpacity 
                    style={styles.closeBtn} 
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.closeBtnText}>{t.close}</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    padding: 20,
  },
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
  // STYLES FOR THE NEW BUTTON
  historyButton: {
    backgroundColor: '#2E7D32', // Green button
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 3,
  },
  historyBtnTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyBtnSub: {
    color: '#E8F5E9',
    fontSize: 12,
  },
  
  // Existing Styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#F1F8E9',
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
    borderRadius: 30,
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

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Dark background
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%', // Pop-up takes 80% of screen height
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    flex: 1,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#333',
    textAlign: 'justify',
  },
  closeBtn: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});