import React, { createContext, useContext, useEffect } from 'react';
import { TRANSLATIONS, type Language } from '../data/translations';

interface LanguageContextType {
  language: Language;
  dir: 'rtl';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language: Language = 'ar';
  const dir = 'rtl';

  useEffect(() => {
    localStorage.setItem('lumiere_language', 'ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  const setLanguage = (_lang: Language) => {};
  const toggleLanguage = () => {};

  const t = (key: string, params?: Record<string, string | number>): string => {
    const item = TRANSLATIONS[key];
    let text = item ? (item.ar || item.en || key) : key;
    if (params) {
      Object.keys(params).forEach(pKey => {
        text = text.replace(`{${pKey}}`, String(params[pKey]));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
