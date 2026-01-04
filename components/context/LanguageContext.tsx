import React, { createContext, useState, useContext } from 'react';

// The Dictionary: All text here
const translations = {
  en: {
    appTitle: "Black Pepper Variety Identification",
    appDesc: "Scan a leaf to instantly identify the pepper variety.",
    scanBtn: "Identify Leaf",
    camera: "Take Photo",
    gallery: "Choose from Gallery",
    cancel: "Cancel",
    history: "Scan History",
    info: "Varieties Info",
    profile: "Profile",
    home: "Home",
    language: "Language",
    sriLankaPepper: "Ceylon Black Pepper",
    infoDesc: "Pepper is the most widely used spice in the world and known as “King of the Spices”. Pepper crop is native to South Asia and historical records reveal that pepper is originated in South India. Peppercorns were a much-prized trade good often referred to also as “black gold” and used by as a form of commodity money. Until well after the Middle age, virtually all of the black pepper found in Europe, the Middle East, and North Africa traveled there from India’s Malabar region. It was some part of the preciousness of these spices that led to the European efforts to find a sea route to India and consequently to the European Colonial occupation of the country as well as European discovery and colonization of America/s. Vietnam, Indonesia, Malaysia, India, and Brazil are the main pepper producers in the world.",
    visitGov: "Visit Dept. of Export Agriculture",
    noHistory: "No scans yet.",
    variety: "Variety",
    confidence: "Confidence",
    welcome: "Welcome User",
    researcher: "Research Project 2026"
  },
  si: {
    appTitle: "ගම්මිරිස් ප්‍රභේද හඳුනාගැනීම",
    appDesc: "ගම්මිරිස් ප්‍රභේදය හඳුනා ගැනීමට කොළයක් ස්කෑන් කරන්න.",
    scanBtn: "කොළය හඳුනාගන්න",
    camera: "ඡායාරූපයක් ගන්න",
    gallery: "ගැලරියෙන් තෝරන්න",
    cancel: "අවලංගු කරන්න",
    history: "ඉතිහාසය",
    info: "තොරතුරු",
    profile: "ගිණුම",
    home: "මුල් පිටුව",
    language: "භාෂාව",
    sriLankaPepper: "ලංකා ගම්මිරිස්",
    infoDesc: "ශ්‍රී ලංකාවේ ගම්මිරිස් එහි ඇති ඉහළ පයිපරින් ප්‍රතිශතය නිසා ලොව පුරා ප්‍රචලිතය.",
    visitGov: "අපනයන කෘෂිකර්ම දෙපාර්තමේන්තුව",
    noHistory: "තවම දත්ත නොමැත.",
    variety: "ප්‍රභේදය",
    confidence: "විශ්වසනීයත්වය",
    welcome: "ආයුබෝවන්",
    researcher: "පර්යේෂණ ව්‍යාපෘතිය 2026"
  }
};

type Language = 'en' | 'si';

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);