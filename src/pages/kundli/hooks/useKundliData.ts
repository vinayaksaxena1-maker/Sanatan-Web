/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Custom Hook: useKundliData
 * Centralized state, calculations, and engine bridge for Kundli Hub
 */

import { useState, useMemo, useCallback } from 'react';
import {
  calculateCompleteHoroscope,
  CompleteHoroscopeResult
} from '../../../engine/facade/horoscopeFacade';
import {
  KundliPersonInput,
  DEFAULT_NATIVE_INPUT,
  DivisionalVarga,
  KundliChartStyle
} from './kundliTypes';

function convertTo24Hour(hourStr: string, minStr: string, secStr: string, amPm: 'AM' | 'PM'): string {
  let h = parseInt(hourStr, 10) || 12;
  const m = (parseInt(minStr, 10) || 0).toString().padStart(2, '0');
  const s = (parseInt(secStr, 10) || 0).toString().padStart(2, '0');

  if (amPm === 'AM') {
    if (h === 12) h = 0;
  } else {
    if (h !== 12) h += 12;
  }
  return `${h.toString().padStart(2, '0')}:${m}:${s}`;
}

export function useKundliData() {
  const [input, setInput] = useState<KundliPersonInput>(() => {
    try {
      const saved = localStorage.getItem('sanatan_active_kundli_input');
      return saved ? JSON.parse(saved) : DEFAULT_NATIVE_INPUT;
    } catch {
      return DEFAULT_NATIVE_INPUT;
    }
  });

  const [selectedVarga, setSelectedVarga] = useState<DivisionalVarga>('D1');
  const [chartStyle, setChartStyle] = useState<KundliChartStyle>('North');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  // Form field state triggers
  const handleInputChange = useCallback((field: keyof KundliPersonInput, value: any) => {
    setInput(prev => {
      const updated = { ...prev, [field]: value };
      try {
        localStorage.setItem('sanatan_active_kundli_input', JSON.stringify(updated));
      } catch {
        // silent fallback
      }
      return updated;
    });
  }, []);

  // Compute Full Horoscope
  const horoscope: CompleteHoroscopeResult | null = useMemo(() => {
    try {
      const time24 = convertTo24Hour(
        input.birthHour,
        input.birthMinute,
        input.birthSecond,
        input.birthAmPm
      );

      return calculateCompleteHoroscope({
        date: input.birthDate,
        time: time24,
        latitude: input.latitude,
        longitude: input.longitude,
        timezoneOffset: input.timezoneOffset,
        ayanamshaSystem: input.ayanamshaSystem,
        houseSystem: input.houseSystem
      });
    } catch (err) {
      console.error('Horoscope calculation failed:', err);
      // Fallback to default Varanasi Aditya Sharma on erroneous input
      return calculateCompleteHoroscope({
        date: DEFAULT_NATIVE_INPUT.birthDate,
        time: '06:45:00',
        latitude: DEFAULT_NATIVE_INPUT.latitude,
        longitude: DEFAULT_NATIVE_INPUT.longitude,
        timezoneOffset: DEFAULT_NATIVE_INPUT.timezoneOffset,
        ayanamshaSystem: DEFAULT_NATIVE_INPUT.ayanamshaSystem,
        houseSystem: DEFAULT_NATIVE_INPUT.houseSystem
      });
    }
  }, [
    input.birthDate,
    input.birthHour,
    input.birthMinute,
    input.birthSecond,
    input.birthAmPm,
    input.latitude,
    input.longitude,
    input.timezoneOffset,
    input.ayanamshaSystem,
    input.houseSystem
  ]);

  // Reset to default sample native
  const resetToSample = useCallback(() => {
    setInput(DEFAULT_NATIVE_INPUT);
    setSelectedVarga('D1');
    try {
      localStorage.setItem('sanatan_active_kundli_input', JSON.stringify(DEFAULT_NATIVE_INPUT));
    } catch {
      // silent
    }
  }, []);

  return {
    input,
    handleInputChange,
    selectedVarga,
    setSelectedVarga,
    chartStyle,
    setChartStyle,
    isPrintModalOpen,
    setIsPrintModalOpen,
    isCityModalOpen,
    setIsCityModalOpen,
    horoscope,
    resetToSample
  };
}
