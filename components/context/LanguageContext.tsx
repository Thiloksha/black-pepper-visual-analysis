import React, { createContext, useContext, useState } from "react";

const translations = {
  en: {
    appTitle: "Black Pepper Variety Identification",
    appDesc: "Scan a leaf to instantly identify the pepper variety.",
    scanBtn: "Identify Leaf",
    camera: "Take Photo",
    gallery: "Choose from Gallery",
    cancel: "Cancel",
    close: "Close",
    history: "Scan History",
    info: "Varieties Info",
    profile: "Profile",
    home: "Home",
    language: "Language",
    sriLankaPepper: "Black Pepper",
    visitGov: "Visit Dept. of Export Agriculture",
    noHistory: "No scans yet.",
    variety: "Variety",
    confidence: "Confidence",
    welcome: "Welcome User",
    researcher: "Research Project 2026",
    
    // INFO SCREEN
    infoDesc: "Pepper is the most widely used spice in the world and known as “King of the Spices”. Pepper crop is native to South Asia and historical records reveal that pepper is originated in South India. Peppercorns were a much-prized trade good often referred to also as “black gold” and used by as a form of commodity money. Until well after the Middle age, virtually all of the black pepper found in Europe, the Middle East, and North Africa traveled there from India’s Malabar region. It was some part of the preciousness of these spices that led to the European efforts to find a sea route to India and consequently to the European Colonial occupation of the country as well as European discovery and colonization of America/s. Vietnam, Indonesia, Malaysia, India, and Brazil are the main pepper producers in the world.",
    
    // BUTTONS
    btnViewVarieties: "View Sri Lankan Varieties",
    btnViewVarietiesSub: "History & Technical Specifications",

    // NEW PAGE TEXT
    varietiesTitle: "Sri Lankan Varieties",
    varietiesIntro: "Although the origin of black pepper is believed to be Malabar Coast of India, Sri Lanka too is a home to a number of wild pepper types. When considering the huge genetic variability of P. nigrum L. found in Sri Lanka and the presence of pepper wild relatives, it is believed that Sri Lanka also a place of origin of pepper. Some commercial black pepper varieties had also been introduced to Sri Lanka since the existence of commercial black pepper trade. High yielding pepper line called “Panniyur-1” from India and “Kuchin” from Malaysia was introduced in the 1970s but MB12 and GK 49 are high yielding and superior quality local selections which are popular among black pepper cultivators. Department of Export Agriculture has recently introduced three new hybrids – Dingi Rala, kohukumbure Rala and Bootawe Rala.",
    
    // VARIETY DATA FOR MODALS
    varietyDetails: {
      dingirala: {
        name: "Dingi Rala",
        parentage: "Cross: Panniyur-1 × GK 49\n\nThis hybrid brings together genetics from two well-known high-yielding parents:\nPanniyur-1: a popular Indian high-yield variety\nGK 49: a selection known for quality traits in Sri Lanka",
        agronomy: "Panicle length: ~12 cm\nFilling %: ~80%\nAnnual yield: ~2245 g per vine\n\nThese figures indicate a strong productive capacity and relatively good quality berry set.",
        quality: "Oleoresin: ~12.9%\nOil: ~2.8%\nPiperine: ~5.6%\n\nPiperine is the key compound that gives pepper its heat and pungency, so Dingi Rala has a respectable pungency, though slightly lower than some other hybrids.",
        summary: "Dingi Rala is a balanced, reliable hybrid for growers — combining good yield with decent spice quality and traditional robustness. It’s suitable for many soil types typical in Sri Lankan pepper gardens."
      },
      bootawe: {
        name: "Bootawe Rala",
        parentage: "Cross: Panniyur-1 × DM 7\n\nThis hybrid pairs Panniyur-1 with DM 7 — another local line with desirable agronomic performance.",
        agronomy: "Panicle length: ~14 cm (longer than the others)\nFilling %: ~80%\nAnnual yield: ~2724 g per vine\n\nThese figures make Bootawe Rala the highest yielder among the three main hybrids.",
        quality: "Oleoresin: ~12.9%\nOil: ~3.1%\nPiperine: ~6.3%\n\nBootawe Rala stands out here with both higher oil and higher piperine contents — which often translates to stronger aroma and heat in the dried black pepper.",
        summary: "Bootawe Rala is often viewed as a more premium hybrid choice, due to its higher yields and stronger spice characteristics. Its robust piperine and oil levels make it valuable for both culinary use and value-added spice products."
      },
      kohu: {
        name: "Kohukumbure Rala",
        parentage: "Cross: MW 21 × Panniyur-1\n\nThis hybrid uses a local selection (MW 21) crossed with the established Panniyur-1, aiming for improved performance under local growing conditions.",
        agronomy: "Panicle length: ~12 cm\nFilling %: ~80%\nAnnual yield: ~2340 g per vine\n\nThis puts Kohukumbure Rala in the middle range for yield among the three varieties.",
        quality: "Oleoresin: ~15.4%\nOil: ~3.6%\nPiperine: ~6%\n\nThe notably high oleoresin and oil content here may enhance flavor complexity and aromatic intensity in processed pepper products.",
        summary: "Kohukumbure Rala is a hybrid that combines good balance in yield with high aromatic and oleoresin content, making it appealing for spice markets that value intense aroma and essential oil richness."
      }
    }
  },
  si: {
    appTitle: "ගම්මිරිස් ප්‍රභේද හඳුනාගැනීම",
    appDesc: "ගම්මිරිස් ප්‍රභේදය හඳුනා ගැනීමට කොළයක් ස්කෑන් කරන්න.",
    scanBtn: "කොළය හඳුනාගන්න",
    camera: "ඡායාරූපයක් ගන්න",
    gallery: "ගැලරියෙන් තෝරන්න",
    cancel: "අවලංගු කරන්න",
    close: "වසන්න",
    history: "ඉතිහාසය",
    info: "තොරතුරු",
    profile: "ගිණුම",
    home: "මුල් පිටුව",
    language: "භාෂාව",
    sriLankaPepper: "ගම්මිරිස්",
    visitGov: "අපනයන කෘෂිකර්ම දෙපාර්තමේන්තුව",
    noHistory: "තවම දත්ත නොමැත.",
    variety: "ප්‍රභේදය",
    confidence: "විශ්වසනීයත්වය",
    welcome: "ආයුබෝවන්",
    researcher: "පර්යේෂණ ව්‍යාපෘතිය 2026",
    
    infoDesc: 'ගම්මිරිස් ලෝකයේ බහුලව භාවිතා වන කුළුබඩු වර්ගයක් වන අතර එය "කුළුබඩු වල රජු" ලෙස හැඳින්වේ. ගම්මිරිස් වගාව දකුණු ආසියාවට ආවේණික වන අතර ඓතිහාසික වාර්තාවලින් හෙළි වන්නේ ගම්මිරිස් දකුණු ඉන්දියාවේ ආරම්භ වූ බවයි. ගම්මිරිස් යනු බොහෝ විට "කළු රත්තරන්" ලෙසද හඳුන්වනු ලබන ඉතා වටිනා වෙළඳ භාණ්ඩයක් වූ අතර එය වෙළඳ භාණ්ඩ මුදල් ආකාරයක් ලෙස භාවිතා කරන ලදී. මධ්‍යතන යුගයෙන් බොහෝ කලකට පසු, යුරෝපයේ, මැදපෙරදිග සහ උතුරු අප්‍රිකාවේ දක්නට ලැබුණු කළු ගම්මිරිස් සියල්ලම පාහේ ඉන්දියාවේ මලබාර් ප්‍රදේශයෙන් එහි ගමන් කළේය. මෙම කුළුබඩු වල වටිනාකමේ කොටසක් නිසා ඉන්දියාවට මුහුදු මාර්ගයක් සොයා ගැනීමට යුරෝපීයයන් දැරූ උත්සාහයට සහ එහි ප්‍රතිඵලයක් ලෙස රට යුරෝපීය යටත් විජිතකරණයට මෙන්ම ඇමරිකාව/රටවල් සොයා ගැනීමට සහ යටත් විජිතකරණයට හේතු විය. වියට්නාමය, ඉන්දුනීසියාව, මැලේසියාව, ඉන්දියාව සහ බ්‍රසීලය ලෝකයේ ප්‍රධාන ගම්මිරිස් නිෂ්පාදකයින් වේ.',
    
    btnViewVarieties: "ශ්‍රී ලංකාවේ ප්‍රභේද බලන්න",
    btnViewVarietiesSub: "ඉතිහාසය සහ තාක්ෂණික තොරතුරු",

    varietiesTitle: "ශ්‍රී ලංකාවේ ප්‍රභේද",
    varietiesIntro: "කළු ගම්මිරිස්වල සම්භවය ඉන්දියාවේ මලබාර් වෙරළ තීරය යැයි විශ්වාස කෙරුණද, ශ්‍රී ලංකාව ද වන ගම්මිරිස් වර්ග රාශියකට නිවහනකි. ශ්‍රී ලංකාවේ දක්නට ලැබෙන P. nigrum L. හි විශාල ජානමය විචල්‍යතාවය සහ ගම්මිරිස් වන වගා ඥාතීන් සිටීම සලකා බලන විට ශ්‍රී ලංකාව ද ගම්මිරිස්වල සම්භවය වූ ස්ථානයක් බව විශ්වාස කෙරේ. වාණිජ කළු ගම්මිරිස් වෙළඳාම ආරම්භයේ සිටම සමහර වාණිජ කළු ගම්මිරිස් ප්‍රභේද ශ්‍රී ලංකාවට ද හඳුන්වා දී ඇත. ඉන්දියාවෙන් 'පැණියූර්-1' සහ මැලේසියාවෙන් 'කුචින්' යන ඉහළ අස්වැන්නක් ලබා දෙන ගම්මිරිස් වගාවන් 1970 දශකයේ දී හඳුන්වා දුන් නමුත් MB12 සහ GK 49 යනු කළු ගම්මිරිස් වගාකරුවන් අතර ජනප්‍රිය ඉහළ අස්වැන්නක් සහ උසස් තත්ත්වයේ දේශීය තේරීම් වේ. අපනයන කෘෂිකර්ම දෙපාර්තමේන්තුව විසින් මෑතකදී නව දෙමුහුන් වර්ග තුනක් හඳුන්වා දී ඇත - ඩිංගි රාළ, කොහුකුඹුරේ රාළ සහ බූටාවේ රාළ.",
    
    // Kept in English for now (you can add Sinhala translations here later)
    varietyDetails: {
      dingirala: {
        name: "ඩිංගි රාළ",
        parentage: "Cross: Panniyur-1 × GK 49\n\nThis hybrid brings together genetics from two well-known high-yielding parents.",
        agronomy: "Panicle length: ~12 cm\nFilling %: ~80%\nAnnual yield: ~2245 g per vine",
        quality: "Oleoresin: ~12.9%\nOil: ~2.8%\nPiperine: ~5.6%",
        summary: "Dingi Rala is a balanced, reliable hybrid for growers."
      },
      bootawe: {
        name: "බූටාවේ රාළ",
        parentage: "Cross: Panniyur-1 × DM 7",
        agronomy: "Panicle length: ~14 cm\nFilling %: ~80%\nAnnual yield: ~2724 g per vine",
        quality: "Oleoresin: ~12.9%\nOil: ~3.1%\nPiperine: ~6.3%",
        summary: "Bootawe Rala is the highest yielder among the three main hybrids."
      },
      kohu: {
        name: "කොහුකුඹුරේ රාළ",
        parentage: "Cross: MW 21 × Panniyur-1",
        agronomy: "Panicle length: ~12 cm\nFilling %: ~80%\nAnnual yield: ~2340 g per vine",
        quality: "Oleoresin: ~15.4%\nOil: ~3.6%\nPiperine: ~6%",
        summary: "Kohukumbure Rala has high aromatic and oleoresin content."
      }
    }
  },
};

type Language = "en" | "si";

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);