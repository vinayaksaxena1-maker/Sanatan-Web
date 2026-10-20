/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Core Multilingual i18n Context & Provider
 * Default Language: Shuddh Devanagari Hindi ('hi')
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { LanguageCode, BilingualLabel } from '../types/i18n';
import hiTranslations from './locales/hi.json';
import enTranslations from './locales/en.json';

const STORAGE_KEY = 'sanatan_language_pref';

interface TranslationObject {
  [key: string]: string | TranslationObject;
}

const translations: Record<LanguageCode, TranslationObject> = {
  hi: hiTranslations as TranslationObject,
  en: enTranslations as TranslationObject,
  hinglish: hiTranslations as TranslationObject, // Fallback to Hindi with phonetic elements
  sa: hiTranslations as TranslationObject,       // Sanskrit retains sacred Hindi roots
};

export interface I18nContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  getLabel: (label: BilingualLabel) => string;
  isHindi: boolean;
  isEnglish: boolean;
  isHinglish: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(obj: TranslationObject, path: string): string | null {
  const parts = path.split('.');
  let current: any = obj;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }

  return typeof current === 'string' ? current : null;
}

export interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: LanguageCode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage,
}) => {
  // Shuddh Devanagari Hindi ('hi') is the mandated default language
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (initialLanguage) return initialLanguage;
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
        if (saved && (saved === 'hi' || saved === 'en' || saved === 'hinglish')) {
          return saved;
        }
      } catch {
        // Fallback silently if localStorage is restricted
      }
    }
    return 'hi';
  });

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // Storage unavailable
      }
    }
  }, []);

  // Update HTML document lang attribute dynamically
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
    }
  }, [language]);

  /**
   * Dot-notation translation helper with seamless English/Hindi fallback
   * e.g., t('panchang.tithi')
   */
  const t = useCallback(
    (key: string, fallback?: string): string => {
      const activeDict = translations[language] || translations.hi;
      const translated = getNestedValue(activeDict, key);

      if (translated) return translated;

      // Fallback to Hindi if English dictionary misses a key
      if (language !== 'hi') {
        const hindiFallback = getNestedValue(translations.hi, key);
        if (hindiFallback) return hindiFallback;
      }

      // Fallback to provided string or the key itself
      return fallback !== undefined ? fallback : key;
    },
    [language]
  );

  /**
   * Resolves a BilingualLabel object into current language string
   */
  const getLabel = useCallback(
    (label: BilingualLabel): string => {
      if (!label) return '';
      if (language === 'en') {
        return label.en || label.hi;
      }
      if (language === 'hinglish' && label.hinglish) {
        return label.hinglish;
      }
      return label.hi || label.en;
    },
    [language]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t,
      getLabel,
      isHindi: language === 'hi',
      isEnglish: language === 'en',
      isHinglish: language === 'hinglish',
    }),
    [language, setLanguage, t, getLabel]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useTranslation(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

export { I18nContext };
