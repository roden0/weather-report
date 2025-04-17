'use client';

import { createContext, useState, useContext, useMemo, type ReactNode } from 'react';
import enTranslations from '../i18n/en';
import esTranslations from '../i18n/es';

type Language = 'en' | 'es';

type TranslationKeys = keyof typeof enTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  const translations = useMemo(() => {
    return language === 'en' ? enTranslations : esTranslations;
  }, [language]);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  type TranslationKeys = keyof typeof enTranslations;

  const t = (key: TranslationKeys) => {
    return translations[key] || key;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage: handleSetLanguage,
      t,
    }),
    [language, translations],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
