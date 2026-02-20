
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => any;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mizgin_lang');
    return (saved as Language) || 'ku-ba';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mizgin_lang', lang);
  };

  const isRtl = translations[language].dir === 'rtl';

  useEffect(() => {
    document.documentElement.dir = translations[language].dir;
    document.documentElement.lang = language;
  }, [language]);

  const t = (keyPath: string) => {
    if (!keyPath) return '';
    
    // Check if keyPath is actually a JSON string from AI translations
    if (typeof keyPath === 'string' && keyPath.trim().startsWith('{') && keyPath.trim().endsWith('}')) {
      try {
        const data = JSON.parse(keyPath);
        // Case-insensitive lookup for language keys
        const targetLang = language.toLowerCase();
        const availableKeys = Object.keys(data);
        
        // Try exact match, then case-insensitive match, then fallback to English
        const bestKey = availableKeys.find(k => k.toLowerCase() === targetLang) || 
                         availableKeys.find(k => k.toLowerCase() === 'en') || 
                         availableKeys[0];
                         
        return data[bestKey] || keyPath;
      } catch (e) {
        // Not valid JSON, continue to normal lookup
      }
    }

    const keys = keyPath.split('.');
    let result: any = translations[language];
    
    // Safety check if we are just passing a raw string that isn't a key
    if (keys.length === 1 && (!result || result[keys[0]] === undefined)) {
      return keyPath;
    }

    for (const key of keys) {
      if (!result || result[key] === undefined) {
        // Fallback to English if key missing in current language
        let fallback: any = translations['en'];
        for (const fKey of keys) {
          if (!fallback || fallback[fKey] === undefined) return keyPath;
          fallback = fallback[fKey];
        }
        return fallback;
      }
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      <div dir={translations[language].dir}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
