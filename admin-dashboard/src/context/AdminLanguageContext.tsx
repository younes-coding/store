import React, { createContext, useContext, useEffect } from 'react';
import { ADMIN_TRANSLATIONS, type AdminLanguage } from '../data/adminTranslations';

interface AdminLanguageContextType {
  language: AdminLanguage;
  dir: 'rtl';
  setLanguage: (lang: AdminLanguage) => void;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const AdminLanguageContext = createContext<AdminLanguageContextType | undefined>(undefined);

export const AdminLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language: AdminLanguage = 'ar';
  const dir = 'rtl';

  useEffect(() => {
    localStorage.setItem('lumiere_admin_language', 'ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  const setLanguage = (_lang: AdminLanguage) => {};
  const toggleLanguage = () => {};

  const t = (key: string, params?: Record<string, string | number>): string => {
    const item = ADMIN_TRANSLATIONS[key];
    let val = item ? (item.ar || item.en || key) : key;

    if (params) {
      Object.entries(params).forEach(([pK, pV]) => {
        val = val.replace(`{${pK}}`, String(pV));
      });
    }

    return val;
  };

  return (
    <AdminLanguageContext.Provider value={{ language, dir, setLanguage, toggleLanguage, t }}>
      {children}
    </AdminLanguageContext.Provider>
  );
};

export const useAdminLanguage = () => {
  const ctx = useContext(AdminLanguageContext);
  if (!ctx) {
    throw new Error('useAdminLanguage must be used within an AdminLanguageProvider');
  }
  return ctx;
};
