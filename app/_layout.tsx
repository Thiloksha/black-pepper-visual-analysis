import { Stack } from 'expo-router';
import React from 'react';
import { LanguageProvider } from '../components/context/LanguageContext';

export default function RootLayout() {
  return (
    // We wrap the ENTIRE app here so every page works
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* The Tabs (Home, History, etc.) */}
        <Stack.Screen name="(tabs)" />
        
        {/* Your New Page */}
        <Stack.Screen name="varieties" />
      </Stack>
    </LanguageProvider>
  );
}