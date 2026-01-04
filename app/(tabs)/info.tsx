import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../../components/context/LanguageContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function InfoScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <Text style={styles.header}>{t.sriLankaPepper}</Text>
      <Text style={styles.text}>{t.infoDesc}</Text>

      <Text style={styles.subHeader}>Common Varieties:</Text>
      <View style={styles.item}>
        <Text style={styles.bullet}>• Dingirala</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.bullet}>• Kohukuburerala</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.bullet}>• Butawerala</Text>
      </View>

      <TouchableOpacity
        style={styles.linkBtn}
        onPress={() => Linking.openURL("http://www.dea.gov.lk/")}
      >
        <Ionicons name="globe-outline" size={20} color="white" />
        <Text style={styles.linkText}>{t.visitGov}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  text: { fontSize: 16, lineHeight: 24, color: "#444" },
  item: { paddingVertical: 5 },
  bullet: { fontSize: 16, color: "#555" },
  linkBtn: {
    flexDirection: "row",
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: { color: "white", fontWeight: "bold", marginLeft: 10 },
});
