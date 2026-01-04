import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useLanguage } from '../../components/context/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
  const { t } = useLanguage();
  const [history, setHistory] = useState([]);
  const insets = useSafeAreaInsets();

  // Reload history every time user opens this tab
  useFocusEffect(
    useCallback(() => {
      const loadHistory = async () => {
        const data = await AsyncStorage.getItem('scanHistory');
        if (data) setHistory(JSON.parse(data));
      };
      loadHistory();
    }, [])
  );

  // --- HELPER TO TRANSLATE NAMES ---
  const getDisplayVariety = (rawClass: string) => {
    // Safety check in case rawClass is undefined
    if (!rawClass) return "Unknown";
    
    const key = rawClass.toLowerCase();
    
    if (key.includes("dingirala")) {
        return t.varietyDetails.dingirala.name; // Returns Sinhala name if mode is 'si'
    }
    if (key.includes("bootawe")) {
        return t.varietyDetails.bootawe.name;
    }
    if (key.includes("kohu")) {
        return t.varietyDetails.kohu.name;
    }

    return rawClass.toUpperCase();
  };

  // Optional: Function to clear history (good for testing)
  const clearHistory = async () => {
    await AsyncStorage.removeItem('scanHistory');
    setHistory([]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      
      <View style={styles.headerRow}>
        <Text style={styles.header}>{t.history}</Text>
        {history.length > 0 && (
            <TouchableOpacity onPress={clearHistory}>
                <Ionicons name="trash-outline" size={24} color="#FF5252" />
            </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={80} color="#ccc" />
            <Text style={styles.empty}>{t.noHistory}</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }: { item: any }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={styles.info}>
                {/* USE THE HELPER FUNCTION HERE */}
                <Text style={styles.variety}>{getDisplayVariety(item.class)}</Text>
                
                <Text style={styles.date}>
                    <Ionicons name="calendar-outline" size={12} color="#888" /> {item.date} • {item.time}
                </Text>
                
                <View style={styles.confBadge}>
                    <Text style={styles.confText}>{t.confidence}: {item.confidence}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: '#F5F7FA' },
  
  headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20
  },
  header: { fontSize: 28, fontWeight: '800', color: '#2E7D32' },
  
  emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -50
  },
  empty: { textAlign: 'center', marginTop: 20, color: '#888', fontSize: 16 },
  
  card: { 
      flexDirection: 'row', 
      alignItems: 'center',
      backgroundColor: 'white', 
      padding: 15, 
      borderRadius: 15, 
      marginBottom: 12, 
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2}
  },
  thumb: { width: 70, height: 70, borderRadius: 12, marginRight: 15, backgroundColor: '#eee' },
  info: { flex: 1, justifyContent: 'center' },
  
  variety: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  
  date: { fontSize: 12, color: '#888', marginBottom: 8 },
  
  confBadge: {
      backgroundColor: '#E8F5E9',
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6
  },
  confText: { fontSize: 12, color: '#2E7D32', fontWeight: 'bold' }
});