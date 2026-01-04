import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../components/context/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { t, setLang, lang } = useLanguage();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <View style={styles.avatar}>
           <Text style={{fontSize: 30}}>👤</Text>
        </View>
        <Text style={styles.name}>{t.welcome}</Text>
        <Text style={styles.role}>{t.researcher}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.language}</Text>
        <View style={styles.langRow}>
          <TouchableOpacity 
            style={[styles.langBtn, lang === 'en' && styles.activeBtn]} 
            onPress={() => setLang('en')}>
            <Text style={[styles.langText, lang === 'en' && styles.activeText]}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.langBtn, lang === 'si' && styles.activeBtn]} 
            onPress={() => setLang('si')}>
            <Text style={[styles.langText, lang === 'si' && styles.activeText]}>සිංහල</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40, marginTop: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  role: { fontSize: 14, color: '#666' },
  section: { backgroundColor: 'white', padding: 20, borderRadius: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#555' },
  langRow: { flexDirection: 'row', gap: 10 },
  langBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', alignItems: 'center' },
  activeBtn: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  langText: { color: '#333' },
  activeText: { color: 'white', fontWeight: 'bold' }
});