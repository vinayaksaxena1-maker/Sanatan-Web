/**
 * Sanatan Web (सनातन घड़ी)
 * Custom Hook: useChoghadiyaData
 * Real Astronomical Calculation for 16 Choghadiya & 24 Hora Intervals
 * Decoupled from src/engine/ with live ticking countdown
 * Strict < 300 lines modular standard
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocationStore } from '../../../store/locationStore';
import { calculatePanchang } from '../../../engine';
import type { ChoghadiyaInterval, HoraInterval, PanchangInfo } from '../../../engine/types';
import {
  HINDI_DAYS,
  HINDI_DAY_RULERS,
  formatHindiDate,
  toDevanagariNumerals,
} from '../../panchang/hooks/usePanchangData';

export interface ChoghadiyaMeta {
  lord: string;
  significance: string;
  isAuspicious: boolean;
  statusLabel: string;
  colorClass: string;
}

export const CHOGHADIYA_INFO: Record<string, ChoghadiyaMeta> = {
  Amrit: {
    lord: 'चंद्र देव',
    significance: 'सर्वकार्य सिद्धि, नवीन व्यापार, शांति व मांगलिक कार्य।',
    isAuspicious: true,
    statusLabel: 'अति शुभ (ग्राह्य)',
    colorClass: 'emerald',
  },
  Shubh: {
    lord: 'देवगुरु बृहस्पति',
    significance: 'विवाह चर्चा, विद्यारंभ, धर्मानुष्ठान व गृहप्रवेश।',
    isAuspicious: true,
    statusLabel: 'उत्तम फलदायी',
    colorClass: 'emerald',
  },
  Labh: {
    lord: 'बुध देव',
    significance: 'वित्तीय लेन-देन, व्यापार, निवेश व लाभ प्राप्ति।',
    isAuspicious: true,
    statusLabel: 'उन्नतिकारक',
    colorClass: 'emerald',
  },
  Chal: {
    lord: 'शुक्र देव',
    significance: 'यात्रा, वाहन चालन, स्थानांतरण व गतिशील कार्य।',
    isAuspicious: true,
    statusLabel: 'मध्यम शुभ',
    colorClass: 'amber',
  },
  Rog: {
    lord: 'मंगल देव',
    significance: 'अशुभ काल। विवाद, लेन-देन व शल्यकर्म टालें।',
    isAuspicious: false,
    statusLabel: 'अशुभ (त्याज्य)',
    colorClass: 'rose',
  },
  Kaal: {
    lord: 'शनि देव',
    significance: 'हानि व विघ्न कारक। कोई भी नया कार्य न करें।',
    isAuspicious: false,
    statusLabel: 'अशुभ (त्याज्य)',
    colorClass: 'rose',
  },
  Udveg: {
    lord: 'सूर्य देव',
    significance: 'अशांति व चिंता काल। सरकारी या अनुबंध कार्य टालें।',
    isAuspicious: false,
    statusLabel: 'अशुभ (त्याज्य)',
    colorClass: 'rose',
  },
};

export const HORA_MANTRAS: Record<string, string> = {
  Sun: 'ॐ घृणिः सूर्याय नमः',
  सूर्य: 'ॐ घृणिः सूर्याय नमः',
  Moon: 'ॐ सों सोमाय नमः',
  चंद्र: 'ॐ सों सोमाय नमः',
  Mars: 'ॐ अं अंगारकाय नमः',
  मंगल: 'ॐ अं अंगारकाय नमः',
  Mercury: 'ॐ बुं बुधाय नमः',
  बुध: 'ॐ बुं बुधाय नमः',
  Jupiter: 'ॐ बृं बृहस्पतये नमः',
  गुरु: 'ॐ बृं बृहस्पतये नमः',
  Venus: 'ॐ शुं शुक्राय नमः',
  शुक्र: 'ॐ शुं शुक्राय नमः',
  Saturn: 'ॐ शं शनैश्चराय नमः',
  शनि: 'ॐ शं शनैश्चराय नमः',
};

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const clean = timeStr.trim().toUpperCase();
  const isPM = clean.includes('PM') || clean.includes('अपराह्न') || clean.includes('सायं') || clean.includes('रात्रि');
  const isAM = clean.includes('AM') || clean.includes('पूर्वाह्न') || clean.includes('प्रातः');
  const parts = clean.replace(/[^0-9:]/g, '').split(':');
  let h = parseInt(parts[0] || '0', 10);
  const m = parseInt(parts[1] || '0', 10);
  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;
  return h * 60 + m;
}

export interface UseChoghadiyaDataResult {
  currentCity: ReturnType<typeof useLocationStore>['currentCity'];
  selectedDate: Date;
  panchang: PanchangInfo;
  dayName: string;
  dayRuler: string;
  formattedDate: string;
  isToday: boolean;
  dayChoghadiya: ChoghadiyaInterval[];
  nightChoghadiya: ChoghadiyaInterval[];
  activeChoghadiya: ChoghadiyaInterval | null;
  activeChoghadiyaIndex: number;
  remainingMinutes: number;
  remainingSeconds: number;
  countdownFormatted: string;
  progressPercent: number;
  allHoras: HoraInterval[];
  dayHoras: HoraInterval[];
  nightHoras: HoraInterval[];
  activeHora: HoraInterval | null;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
  goToToday: () => void;
  setSelectedDate: (d: Date) => void;
}

export function useChoghadiyaData(initialDate: Date = new Date()): UseChoghadiyaDataResult {
  const { currentCity } = useLocationStore();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // 1-second live ticker
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const lat = currentCity?.latitude ?? 23.1765;
  const lon = currentCity?.longitude ?? 75.7885;

  const panchang = useMemo(() => {
    return calculatePanchang(lat, lon, selectedDate);
  }, [lat, lon, selectedDate]);

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
    setSelectedDate((p) => {
      const d = new Date(p);
      d.setDate(d.getDate() - 1);
      return d;
    });
  }, []);

  const goToNextDay = useCallback(() => {
    setSelectedDate((p) => {
      const d = new Date(p);
      d.setDate(d.getDate() + 1);
      return d;
    });
  }, []);

  const goToToday = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  // Split Choghadiyas into Day (8) & Night (8)
  const dayChoghadiya = useMemo(() => {
    return (panchang.choghadiya || []).filter((c) => c.isDay);
  }, [panchang.choghadiya]);

  const nightChoghadiya = useMemo(() => {
    return (panchang.choghadiya || []).filter((c) => !c.isDay);
  }, [panchang.choghadiya]);

  // Determine active Choghadiya based on current time
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const currentSecs = currentTime.getSeconds();

  const { activeChoghadiya, activeChoghadiyaIndex, remainingMinutes, remainingSeconds, progressPercent } = useMemo(() => {
    const all = panchang.choghadiya || [];
    let found: ChoghadiyaInterval | null = null;
    let foundIdx = -1;
    let remMin = 42;
    let remSec = 60 - currentSecs;
    let pct = 50;

    for (let i = 0; i < all.length; i++) {
      const c = all[i];
      const startM = parseTimeToMinutes(c.startTime);
      let endM = parseTimeToMinutes(c.endTime);
      if (endM < startM) endM += 1440; // Next day wrap
      let nowM = currentMinutes;
      if (nowM < startM && startM > 720) nowM += 1440;

      if (nowM >= startM && nowM < endM) {
        found = c;
        foundIdx = i;
        const totalDurationM = endM - startM;
        const elapsedM = nowM - startM;
        remMin = Math.max(0, endM - nowM - 1);
        pct = Math.min(100, Math.max(0, Math.round((elapsedM / (totalDurationM || 90)) * 100)));
        break;
      }
    }

    if (!found && all.length > 0) {
      found = all[0];
      foundIdx = 0;
    }

    return {
      activeChoghadiya: found,
      activeChoghadiyaIndex: foundIdx,
      remainingMinutes: remMin,
      remainingSeconds: remSec === 60 ? 0 : remSec,
      progressPercent: pct,
    };
  }, [panchang.choghadiya, currentMinutes, currentSecs]);

  const countdownFormatted = useMemo(() => {
    const mm = toDevanagariNumerals(String(remainingMinutes).padStart(2, '0'));
    const ss = toDevanagariNumerals(String(remainingSeconds).padStart(2, '0'));
    return `${mm}:${ss}`;
  }, [remainingMinutes, remainingSeconds]);

  // Horas: All (24), Day (12), Night (12)
  const allHoras = panchang.hora || [];
  const dayHoras = useMemo(() => allHoras.filter((h) => h.isDay), [allHoras]);
  const nightHoras = useMemo(() => allHoras.filter((h) => !h.isDay), [allHoras]);

  // Determine active Hora
  const activeHora = useMemo(() => {
    for (const h of allHoras) {
      const sM = parseTimeToMinutes(h.startTime);
      let eM = parseTimeToMinutes(h.endTime);
      if (eM < sM) eM += 1440;
      let nowM = currentMinutes;
      if (nowM < sM && sM > 720) nowM += 1440;
      if (nowM >= sM && nowM < eM) return h;
    }
    return allHoras[0] || null;
  }, [allHoras, currentMinutes]);

  return {
    currentCity,
    selectedDate,
    panchang,
    dayName,
    dayRuler,
    formattedDate,
    isToday,
    dayChoghadiya,
    nightChoghadiya,
    activeChoghadiya,
    activeChoghadiyaIndex,
    remainingMinutes,
    remainingSeconds,
    countdownFormatted,
    progressPercent,
    allHoras,
    dayHoras,
    nightHoras,
    activeHora,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    setSelectedDate,
  };
}
