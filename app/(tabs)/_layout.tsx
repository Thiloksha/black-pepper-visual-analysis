import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LanguageProvider, useLanguage } from '../../components/context/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

function TabLayout() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets(); // 2. Get the safe area dimensions

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { 
          // 3. Dynamically adjust height: 60px base + the height of system buttons
          height: 60 + insets.bottom, 
          // 4. Add padding so icons don't touch the system buttons
          paddingBottom: insets.bottom + 5, 
          paddingTop: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t.home,
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: t.info,
          tabBarIcon: ({ color }) => <Ionicons name="leaf" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t.history,
          tabBarIcon: ({ color }) => <Ionicons name="time" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t.profile,
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function Layout() {
  return (
    <LanguageProvider>
      <TabLayout />
    </LanguageProvider>
  );
}