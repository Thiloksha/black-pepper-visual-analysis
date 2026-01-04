import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useLanguage } from '../../components/context/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <Text style={styles.header}>{t.history}</Text>
      {history.length === 0 ? (
        <Text style={styles.empty}>{t.noHistory}</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: any }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={styles.info}>
                <Text style={styles.variety}>{item.class}</Text>
                <Text style={styles.date}>{item.date} at {item.time}</Text>
                <Text style={styles.conf}>{t.confidence}: {item.confidence}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32', marginBottom: 15 },
  empty: { textAlign: 'center', marginTop: 50, color: '#888' },
  card: { flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 10, elevation: 2 },
  thumb: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  info: { flex: 1, justifyContent: 'center' },
  variety: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  date: { fontSize: 12, color: '#888', marginTop: 4 },
  conf: { fontSize: 12, color: '#2E7D32', fontWeight: 'bold' }
});