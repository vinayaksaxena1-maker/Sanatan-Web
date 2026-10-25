/**
 * Sanatan Web (सनातन घड़ी)
 * Hook: useSettingsData
 * Centralized State for Ephemeris Ayanamsha, House Systems, Location, i18n & Diagnostics
 * Strict < 300 lines modular standard
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import type { AyanamshaSystem } from '../../../engine/core/sanatan_jpl_bridge';
import { getAyanamshaForSystem, drik_julday } from '../../../engine/core/sanatan_jpl_bridge';
import { clearPanchangCache } from '../../../engine/panchangCalc';
import { useLocationStore, UJJAIN_DEFAULT_FALLBACK } from '../../../store/locationStore';
import { useTranslation } from '../../../i18n/i18nContext';
import { downloadBackupFile } from '../../../utils/backupRestore';
import { AYANAMSHA_PRESETS, HOUSE_SYSTEM_PRESETS, CHART_STYLE_PRESETS } from './settingsPresets';

const STORAGE_AYANAMSHA_KEY = 'sanatan_ayanamsha_pref';
const STORAGE_HOUSE_SYSTEM_KEY = 'sanatan_house_system_pref';
const STORAGE_CHART_STYLE_KEY = 'sanatan_chart_style_pref';
const STORAGE_NUMERALS_KEY = 'sanatan_numerals_pref';

export type ChartStyleType = 'north' | 'south' | 'east';
export type NumeralsStyleType = 'devanagari' | 'international';

export function formatDms(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  const s = Math.round(((deg - d) * 60 - m) * 60);
  return `${d}° ${m.toString().padStart(2, '0')}' ${s.toString().padStart(2, '0')}"`;
}

export function useSettingsData() {
  const { currentCity, setCity, detectDeviceLocation, isLocating } = useLocationStore();
  const { language, setLanguage, isHindi } = useTranslation();

  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // 1. Ephemeris Ayanamsha State
  const [ayanamsha, setAyanamshaState] = useState<AyanamshaSystem>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_AYANAMSHA_KEY);
      if (saved === 'KP' || saved === 'Raman' || saved === 'Lahiri') return saved;
    }
    return 'Lahiri';
  });

  const setAyanamsha = useCallback((sys: AyanamshaSystem) => {
    setAyanamshaState(sys);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_AYANAMSHA_KEY, sys);
    }
    clearPanchangCache(); // Invalidate cache so all ephemeris recalculates
    setToastMessage({ text: `अयनांश सफलतापूर्वक '${sys}' पर सेट हुआ। गणनाएं स्वतः अद्यतन हो गई हैं।`, type: 'success' });
  }, []);

  // 2. House System State
  const [houseSystem, setHouseSystemState] = useState<'Sripati' | 'Placidus' | 'EqualHouse'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_HOUSE_SYSTEM_KEY);
      if (saved === 'Placidus' || saved === 'EqualHouse' || saved === 'Sripati') return saved;
    }
    return 'Sripati';
  });

  const setHouseSystem = useCallback((sys: 'Sripati' | 'Placidus' | 'EqualHouse') => {
    setHouseSystemState(sys);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_HOUSE_SYSTEM_KEY, sys);
    }
    clearPanchangCache();
    setToastMessage({ text: `भाव गणना पद्धति '${sys}' पर सेट हुई।`, type: 'success' });
  }, []);

  // 3. Chart Style State
  const [chartStyle, setChartStyleState] = useState<ChartStyleType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_CHART_STYLE_KEY);
      if (saved === 'north' || saved === 'south' || saved === 'east') return saved;
    }
    return 'north';
  });

  const setChartStyle = useCallback((style: ChartStyleType) => {
    setChartStyleState(style);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_CHART_STYLE_KEY, style);
    }
    setToastMessage({ text: `कुण्डली प्रदर्शन शैली अद्यतन हुई।`, type: 'info' });
  }, []);

  // 4. Numerals Style State
  const [numeralsStyle, setNumeralsStyleState] = useState<NumeralsStyleType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_NUMERALS_KEY);
      if (saved === 'devanagari' || saved === 'international') return saved;
    }
    return 'devanagari';
  });

  const setNumeralsStyle = useCallback((numStyle: NumeralsStyleType) => {
    setNumeralsStyleState(numStyle);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_NUMERALS_KEY, numStyle);
    }
    setToastMessage({ text: `अंक प्रदर्शन '${numStyle === 'devanagari' ? 'देवनागरी (०१२३)' : 'अंतर्राष्ट्रीय (0123)'}' पर सेट हुआ।`, type: 'info' });
  }, []);

  // 5. Live Ephemeris Ayanamsha Readout for Today
  const todayAyanamshaDms = useMemo(() => {
    const today = new Date();
    const jd_ut = drik_julday(today.getFullYear(), today.getMonth() + 1, today.getDate(), 6.0);
    const deg = getAyanamshaForSystem(jd_ut, ayanamsha);
    return formatDms(deg);
  }, [ayanamsha]);

  // 6. Reset to Default Ujjain
  const resetToUjjain = useCallback(() => {
    setCity(UJJAIN_DEFAULT_FALLBACK);
    setToastMessage({ text: 'स्थान डिफ़ॉल्ट उज्जैन (महाकाल प्राइम मेरिडियन) पर रीसेट हुआ।', type: 'success' });
  }, [setCity]);

  // 7. Clear Engine Cache
  const handleClearCache = useCallback(() => {
    clearPanchangCache();
    setToastMessage({ text: 'इंजन का ऑफलाइन पंचांग एवं ग्रह कैश सफलतापूर्वक खाली किया गया।', type: 'success' });
  }, []);

  // 8. 1-Click Backup Export
  const handleExportBackup = useCallback(async () => {
    try {
      const filename = await downloadBackupFile();
      setToastMessage({ text: `बैकअप सफलतापूर्वक डाउनलोड हुआ: ${filename}`, type: 'success' });
    } catch (err: any) {
      setToastMessage({ text: `बैकअप में त्रुटि: ${err?.message || err}`, type: 'info' });
    }
  }, []);

  // 9. Reset All Factory Defaults
  const handleResetAll = useCallback(() => {
    setAyanamsha('Lahiri');
    setHouseSystem('Sripati');
    setChartStyle('north');
    setNumeralsStyle('devanagari');
    setLanguage('hi');
    setCity(UJJAIN_DEFAULT_FALLBACK);
    clearPanchangCache();
    setToastMessage({ text: 'सभी सिस्टम सेटिंग्स एवं ज्योतिषीय मानक फ़ैक्टरी डिफ़ॉल्ट पर रीसेट कर दिए गए हैं।', type: 'success' });
  }, [setAyanamsha, setHouseSystem, setChartStyle, setNumeralsStyle, setLanguage, setCity]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return {
    ayanamsha,
    setAyanamsha,
    houseSystem,
    setHouseSystem,
    chartStyle,
    setChartStyle,
    numeralsStyle,
    setNumeralsStyle,
    currentCity,
    setCity,
    detectDeviceLocation,
    isLocating,
    isCityModalOpen,
    setIsCityModalOpen,
    resetToUjjain,
    language,
    setLanguage,
    isHindi,
    todayAyanamshaDms,
    handleClearCache,
    handleExportBackup,
    handleResetAll,
    toastMessage,
    ayanamshaPresets: AYANAMSHA_PRESETS,
    houseSystemPresets: HOUSE_SYSTEM_PRESETS,
    chartStylePresets: CHART_STYLE_PRESETS,
  };
}

export type UseSettingsDataResult = ReturnType<typeof useSettingsData>;
