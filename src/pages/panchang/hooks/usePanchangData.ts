/**
 * Sanatan Web (सनातन घड़ी)
 * Custom Hook: usePanchangData
 * Decoupled, Reactive, Real Astronomical Math from src/engine/
 * Strict < 300 lines modular standard
 */

import { useState, useMemo, useCallback } from 'react';
import { useLocationStore } from '../../../store/locationStore';
import { calculatePanchang } from '../../../engine';
import type { PanchangInfo } from '../../../engine/types';
import { calculateDeepPanchang, type DeepPanchangAnalysis } from '../services/panchangDeepService';

export const HINDI_DAYS = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
export const HINDI_DAY_RULERS = [
  'सूर्य देव (रवि वासर)',
  'चन्द्र देव (सोम वासर)',
  'मंगल देव (भौम वासर)',
  'बुध देव (सौम्य वासर)',
  'देवगुरु बृहस्पति (गुरु वासर)',
  'शुक्र देव (भृगु वासर)',
  'शनि देव (मन्द वासर)',
];

export const HINDI_MONTHS = [
  'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
  'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
];

export function toDevanagariNumerals(num: number | string): string {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (w) => devanagariDigits[+w]);
}

export function formatHindiDate(d: Date): string {
  const dayName = HINDI_DAYS[d.getDay()];
  const dateNum = toDevanagariNumerals(d.getDate());
  const monthName = HINDI_MONTHS[d.getMonth()];
  const yearNum = toDevanagariNumerals(d.getFullYear());
  return `${dateNum} ${monthName} ${yearNum} (${dayName})`;
}

export const YOGA_HINDI_MAP: Record<string, string> = {
  Vishkumbha: 'विष्कम्भ',
  Preeti: 'प्रीति',
  Ayushman: 'आयुष्मान',
  Saubhagya: 'सौभाग्य',
  Shobhana: 'शोभन',
  Atiganda: 'अतिगण्ड',
  Sukarma: 'सुकर्मा',
  Dhriti: 'धृति',
  Shoola: 'शूल',
  Ganda: 'गण्ड',
  Vriddhi: 'वृद्धि',
  Dhruva: 'ध्रुव',
  Vyaghata: 'व्याघात',
  Harshana: 'हर्षण',
  Vajra: 'वज्र',
  Siddhi: 'सिद्धि',
  Vyatipata: 'व्यतीपात',
  Variyan: 'वरीयान',
  Parigha: 'परिघ',
  Shiva: 'शिव',
  Siddha: 'सिद्ध',
  Sadhya: 'साध्य',
  Shubha: 'शुभ',
  Shukla: 'शुक्ल',
  Brahma: 'ब्रह्म',
  Indra: 'इन्द्र',
  Vaidhriti: 'वैधृति',
};

export function cleanYogaHindi(rawName?: string): string {
  if (!rawName) return 'शुभ योग';
  const base = rawName.split(' ')[0].replace(/[^a-zA-Z]/g, '');
  return YOGA_HINDI_MAP[base] || rawName;
}

export const KARANA_HINDI_MAP: Record<string, string> = {
  Bava: 'बव',
  Balava: 'बालव',
  Kaulava: 'कौलव',
  Taitila: 'तैतिल',
  Garija: 'गर',
  Vanija: 'वणिज',
  Vishti: 'विष्टि (भद्रा)',
  Shakuni: 'शकुनि',
  Chatuspada: 'चतुष्पाद',
  Chatushpada: 'चतुष्पाद',
  Naga: 'नाग',
  Kimstughna: 'किस्तुघ्न',
};

export function cleanKaranaHindi(rawName?: string): string {
  if (!rawName) return 'कौलव';
  const base = rawName.split(' ')[0].replace(/[^a-zA-Z]/g, '');
  return KARANA_HINDI_MAP[base] || rawName;
}

export const RITU_HINDI_MAP: Record<string, string> = {
  Vasanta: 'वसन्त ऋतु',
  Grishma: 'ग्रीष्म ऋतु',
  Varsha: 'वर्षा ऋतु',
  Sharad: 'शरद ऋतु',
  Hemanta: 'हेमन्त ऋतु',
  Shishira: 'शिशिर ऋतु',
};

export function cleanRituHindi(rawRitu?: string): string {
  if (!rawRitu) return 'शरद ऋतु';
  const base = rawRitu.split(' ')[0].replace(/[^a-zA-Z]/g, '');
  return RITU_HINDI_MAP[base] || 'शरद ऋतु';
}

export function formatEndTime(timeStr?: string): string {
  if (!timeStr) return '';
  let cleaned = timeStr.trim();
  cleaned = cleaned.replace(/\(\+1\s*day\)/gi, '(अगले दिन)');
  cleaned = cleaned.replace(/^तक\s*/g, '').replace(/\s*तक$/g, '');
  return `(तक ${cleaned})`;
}

export interface UsePanchangDataResult {
  currentCity: ReturnType<typeof useLocationStore>['currentCity'];
  selectedDate: Date;
  panchang: PanchangInfo;
  dayName: string;
  dayRuler: string;
  formattedDate: string;
  isToday: boolean;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
  goToToday: () => void;
  setSelectedDate: (d: Date) => void;
  solarProgressPercent: number;
  deepAnalysis: DeepPanchangAnalysis;
}

export function usePanchangData(initialDate: Date = new Date()): UsePanchangDataResult {
  const { currentCity } = useLocationStore();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const lat = currentCity.latitude;
  const lon = currentCity.longitude;

  // Real astronomical computation from src/engine/
  const panchang = useMemo(() => {
    return calculatePanchang(lat, lon, selectedDate);
  }, [lat, lon, selectedDate]);

  const deepAnalysis = useMemo(() => {
    return calculateDeepPanchang(panchang, lat, lon, selectedDate);
  }, [panchang, lat, lon, selectedDate]);

  const dayIndex = selectedDate.getDay();
  const dayName = HINDI_DAYS[dayIndex];
  const dayRuler = HINDI_DAY_RULERS[dayIndex];
  const formattedDate = useMemo(() => formatHindiDate(selectedDate), [selectedDate]);

  const isToday = useMemo(() => {
    const now = new Date();
    return (
      now.getFullYear() === selectedDate.getFullYear() &&
      now.getMonth() === selectedDate.getMonth() &&
      now.getDate() === selectedDate.getDate()
    );
  }, [selectedDate]);

  const goToPreviousDay = useCallback(() => {
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 1);
      return next;
    });
  }, []);

  const goToNextDay = useCallback(() => {
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      return next;
    });
  }, []);

  const goToToday = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  // Compute Solar Progress Percentage (from sunrise to sunset for today)
  const solarProgressPercent = useMemo(() => {
    if (!panchang.sunrise || !panchang.sunset) return 50;
    try {
      const [srH, srM] = panchang.sunrise.split(':').map(Number);
      const [ssH, ssM] = panchang.sunset.split(':').map(Number);
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const riseMinutes = srH * 60 + srM;
      const setMinutes = ssH * 60 + ssM;

      if (currentMinutes <= riseMinutes) return 0;
      if (currentMinutes >= setMinutes) return 100;
      const pct = Math.round(((currentMinutes - riseMinutes) / (setMinutes - riseMinutes)) * 100);
      return Math.min(100, Math.max(0, pct));
    } catch {
      return 50;
    }
  }, [panchang.sunrise, panchang.sunset]);

  return {
    currentCity,
    selectedDate,
    panchang,
    dayName,
    dayRuler,
    formattedDate,
    isToday,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    setSelectedDate,
    solarProgressPercent,
    deepAnalysis,
  };
}
