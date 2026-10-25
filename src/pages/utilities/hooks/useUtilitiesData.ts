/**
 * Sanatan Web (सनातन घड़ी)
 * Hook: useUtilitiesData
 * Connects to evaluateSadeSati, calculateIshtakala & Utilities Presets
 * Strict < 300 lines modular standard
 */

import { useState, useMemo } from 'react';
import { evaluateSadeSati, type SadeSatiEvaluation } from '../../../engine/synthesis/predictiveEngine';
import { calculateIshtakala } from '../../../engine/panchangCalc';
import {
  VEDIC_TIME_UNITS,
  LAGNA_REMEDIES,
  VASTU_DIRECTIONS,
  DISHA_SHOOL_DATA,
  type LagnaRemedyData,
  type VastuDirectionInfo,
  type DishaShoolDayInfo,
} from './utilitiesPresets';
import { RASHI_LIST } from '../../matchmaking/hooks/matchmakingPresets';

export type UtilitySuiteTab = 'sade_sati' | 'time_converter' | 'gemstone_rudraksha' | 'vastu_compass';

export function toDevanagariNumerals(num: number | string): string {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (w) => devanagariDigits[+w]);
}

export function useUtilitiesData() {
  const [activeTab, setActiveTab] = useState<UtilitySuiteTab>('sade_sati');

  // ==========================================
  // 1. शनि साढ़े साती एवं ढैया गणक State
  // ==========================================
  const [selectedMoonSignIndex, setSelectedMoonSignIndex] = useState<number>(10); // Default कुंभ (Aquarius)
  const currentSaturnSignIndex = 10; // Current Sidereal Saturn in Aquarius (कुंभ)

  const sadeSatiResult = useMemo<SadeSatiEvaluation>(() => {
    return evaluateSadeSati(selectedMoonSignIndex, currentSaturnSignIndex);
  }, [selectedMoonSignIndex, currentSaturnSignIndex]);

  const sadeSatiTone = useMemo(() => {
    if (sadeSatiResult.isSadeSatiActive) {
      if (sadeSatiResult.phase === '2nd Phase (Peak)') {
        return {
          title: 'शनि साढ़े साती (शिखर / द्वितीय चरण)',
          tone: 'rose' as const,
          badgeBg: 'bg-rose-600',
          colorClass: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-300',
          remedyPriority: 'उच्च (हनुमान साधना व छाया दान आवश्यक)',
        };
      }
      return {
        title: sadeSatiResult.phase === '1st Phase (Rising)' ? 'शनि साढ़े साती (उदय / प्रथम चरण)' : 'शनि साढ़े साती (अस्त / तृतीय चरण)',
        tone: 'amber' as const,
        badgeBg: 'bg-amber-600',
        colorClass: 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-300',
        remedyPriority: 'मध्यम (शनिवार दीप दान व मंत्र जप)',
      };
    }
    if (sadeSatiResult.isDhaiyaActive) {
      return {
        title: sadeSatiResult.dhaiyaType === 'Ashtama Shani (8th House)' ? 'अष्टम शनि ढैया (कंटक)' : 'चतुर्थ शनि ढैया',
        tone: 'amber' as const,
        badgeBg: 'bg-orange-600',
        colorClass: 'text-orange-800 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 border-orange-300',
        remedyPriority: 'सावधानी (स्वास्थ्य व कर्म शुद्धि)',
      };
    }
    return {
      title: 'साढ़े साती व ढैया से पूर्णतः मुक्त',
      tone: 'emerald' as const,
      badgeBg: 'bg-emerald-600',
      colorClass: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300',
      remedyPriority: 'अनुकूल (शनि देव का आशीर्वाद)',
    };
  }, [sadeSatiResult]);

  // ==========================================
  // 2. वैदिक कालगणना कन्वर्टर State
  // ==========================================
  const [modernSecondsInput, setModernSecondsInput] = useState<number>(1440); // 1440 sec = exactly 1 Ghati

  const convertedTimeUnits = useMemo(() => {
    const s = Math.max(0.0001, modernSecondsInput);
    return {
      seconds: s,
      minutes: Number((s / 60).toFixed(2)),
      hours: Number((s / 3600).toFixed(3)),
      truti: Number((s / 0.00003375).toFixed(0)),
      nimesha: Number((s / 0.030375).toFixed(1)),
      kashtha: Number((s / 0.455625).toFixed(2)),
      kala: Number((s / 13.66875).toFixed(2)),
      vighatiPala: Number((s / 24).toFixed(2)),
      ghati: Number((s / 1440).toFixed(3)),
      muhurat: Number((s / 2880).toFixed(3)),
      prahar: Number((s / 10800).toFixed(3)),
      ahoratra: Number((s / 86400).toFixed(4)),
    };
  }, [modernSecondsInput]);

  // Live Ishtakala from Engine
  const liveIshtakala = useMemo(() => {
    const now = new Date();
    // Default approx 06:15 AM sunrise in minutes
    return calculateIshtakala(now, 375);
  }, []);

  // ==========================================
  // 3. व्यक्तिगत रत्न एवं रुद्राक्ष परामर्श State
  // ==========================================
  const [selectedLagnaIndex, setSelectedLagnaIndex] = useState<number>(0); // Default मेष (Aries)
  const currentLagnaRemedy = useMemo<LagnaRemedyData>(() => {
    return LAGNA_REMEDIES[selectedLagnaIndex] || LAGNA_REMEDIES[0];
  }, [selectedLagnaIndex]);

  // ==========================================
  // 4. अष्टदिशा वास्तु कंपास एवं दिशाशूल State
  // ==========================================
  const [selectedDirectionIndex, setSelectedDirectionIndex] = useState<number>(6); // Default उत्तर (North)
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<number>(() => new Date().getDay());

  const currentDishaShool = useMemo<DishaShoolDayInfo>(() => {
    return DISHA_SHOOL_DATA[selectedDayOfWeek] || DISHA_SHOOL_DATA[0];
  }, [selectedDayOfWeek]);

  const activeVastuDirection = useMemo<VastuDirectionInfo>(() => {
    return VASTU_DIRECTIONS[selectedDirectionIndex] || VASTU_DIRECTIONS[0];
  }, [selectedDirectionIndex]);

  return {
    activeTab,
    setActiveTab,
    // Sade Sati
    selectedMoonSignIndex,
    setSelectedMoonSignIndex,
    sadeSatiResult,
    sadeSatiTone,
    currentSaturnSignIndex,
    rashiList: RASHI_LIST,
    // Time Converter
    modernSecondsInput,
    setModernSecondsInput,
    convertedTimeUnits,
    liveIshtakala,
    vedicTimeUnitsList: VEDIC_TIME_UNITS,
    // Gemstones & Rudraksha
    selectedLagnaIndex,
    setSelectedLagnaIndex,
    currentLagnaRemedy,
    // Vastu & Disha Shool
    selectedDirectionIndex,
    setSelectedDirectionIndex,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
    currentDishaShool,
    activeVastuDirection,
    vastuDirectionsList: VASTU_DIRECTIONS,
  };
}

export type UseUtilitiesDataResult = ReturnType<typeof useUtilitiesData>;
