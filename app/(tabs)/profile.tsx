import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { useLanguage } from '../../components/context/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { t, setLang, lang } = useLanguage();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive" }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 1. GREEN HEADER BACKGROUND */}
      <View style={[styles.headerBg, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>{t.profile}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. FLOATING PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
               <Ionicons name="person" size={45} color="#2E7D32" />
            </View>
            <View style={styles.onlineBadge} />
          </View>
          <Text style={styles.name}>{t.welcome}</Text>
          <Text style={styles.role}>{t.researcher}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.stat}>
                <Text style={styles.statNum}>12</Text>
                <Text style={styles.statLabel}>Scans</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
                <Text style={styles.statNum}>3</Text>
                <Text style={styles.statLabel}>Varieties</Text>
            </View>
          </View>
        </View>

        {/* 3. SETTINGS SECTION */}
        <Text style={styles.sectionHeader}>SETTINGS</Text>
        
        <View style={styles.menuCard}>
          {/* LANGUAGE SWITCHER */}
          <View style={styles.menuItem}>
            <View style={styles.menuIconBox}>
                <Ionicons name="language" size={22} color="#2E7D32" />
            </View>
            <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{t.language}</Text>
                <Text style={styles.menuSub}>{lang === 'en' ? 'English' : 'සිංහල'}</Text>
            </View>
            
            <View style={styles.langToggle}>
                <TouchableOpacity 
                    style={[styles.toggleBtn, lang === 'en' && styles.activeToggle]} 
                    onPress={() => setLang('en')}>
                    <Text style={[styles.toggleText, lang === 'en' && styles.activeToggleText]}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.toggleBtn, lang === 'si' && styles.activeToggle]} 
                    onPress={() => setLang('si')}>
                    <Text style={[styles.toggleText, lang === 'si' && styles.activeToggleText]}>සිං</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* DUMMY NOTIFICATION TOGGLE */}
          <View style={styles.menuItem}>
            <View style={[styles.menuIconBox, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="notifications" size={22} color="#1976D2" />
            </View>
            <Text style={styles.menuTitle}>Notifications</Text>
            <Switch 
                value={true} 
                trackColor={{ false: "#767577", true: "#A5D6A7" }}
                thumbColor={"#2E7D32"}
            />
          </View>
        </View>

        {/* 4. SUPPORT SECTION */}
        <Text style={styles.sectionHeader}>SUPPORT</Text>
        <View style={styles.menuCard}>
            
            <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconBox, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="help-circle" size={22} color="#F57C00" />
                </View>
                <Text style={styles.menuTitle}>Help & FAQ</Text>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIconBox, { backgroundColor: '#F3E5F5' }]}>
                    <Ionicons name="information-circle" size={22} color="#7B1FA2" />
                </View>
                <Text style={styles.menuTitle}>About App</Text>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#FF5252" />
            <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  
  // Header
  headerBg: {
    backgroundColor: '#2E7D32',
    paddingBottom: 50, // Extra space for overlapping card
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  scrollContent: {
    paddingHorizontal: 20,
    marginTop: -40, // Pull content up to overlap header
  },

  // Profile Card
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 25,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
    elevation: 5,
  },
  onlineBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderWidth: 3,
    borderColor: 'white',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  stat: { alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32' },
  statLabel: { fontSize: 12, color: '#888' },
  statDivider: { width: 1, height: '100%', backgroundColor: '#f0f0f0' },

  // Menus
  sectionHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 10,
    marginLeft: 10,
    letterSpacing: 1,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    marginBottom: 25,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  menuIconBox: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuTextContainer: { flex: 1 },
  menuTitle: { fontSize: 16, fontWeight: '500', color: '#333' },
  menuSub: { fontSize: 12, color: '#888', marginTop: 2 },
  divider: {
    height: 1,
    backgroundColor: '#f5f5f5',
    marginLeft: 65, // Align with text
  },

  // Language Toggle
  langToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 2,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: 'white',
    elevation: 2,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  activeToggleText: {
    color: '#2E7D32',
  },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFEBEE',
    borderRadius: 15,
    marginBottom: 20,
  },
  logoutText: {
    color: '#FF5252',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});