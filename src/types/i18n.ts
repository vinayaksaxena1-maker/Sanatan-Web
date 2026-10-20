/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Multilingual & i18n Domain Types
 */

export type LanguageCode = 'hi' | 'en' | 'sa' | 'hinglish';

export interface BilingualLabel {
  hi: string;
  en: string;
  sa?: string;
  hinglish?: string;
}

export interface LanguageInfo {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  fontClass: string;
  isRtl?: boolean;
}

export interface VedicInfoTooltip {
  id: string;
  term: BilingualLabel;
  shortMeaning: BilingualLabel;
  detailedContext?: BilingualLabel;
  relevanceInDailyLife?: BilingualLabel;
}

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  getLabel: (label: BilingualLabel) => string;
  isHindi: boolean;
  isEnglish: boolean;
}
