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
    // Check if keyPath is actually a JSON string from AI translations
    if (keyPath.startsWith('{') && keyPath.endsWith('}')) {
      try {
        const data = JSON.parse(keyPath);
        return data[language] || data['en'] || keyPath;
      } catch (e) {
        // Not a JSON string after all
      }
    }

    const keys = keyPath.split('.');
    let result: any = translations[language];
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