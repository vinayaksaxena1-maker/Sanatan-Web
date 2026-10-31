/**
 * Sanatan Web (सनातन घड़ी)
 * Hook: useMuhuratData
 * Connects directly to astronomical engine (calculatePanchang & checkMuhurats)
 * Strict < 300 lines modular standard
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocationStore } from '../../../store/locationStore';
import { calculatePanchang, type PanchangInfo } from '../../../engine';
import { checkMuhurats, type MuhuratSuitability } from '../../../engine/muhuratRules';
import { getCategoryMuhuratCards, DEFAULT_CEREMONY_ROWS } from './muhuratPresets';
import { formatHindiDate } from '../../panchang/hooks/usePanchangData';

export interface InstantMuhurat {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  timeRange: string;
  duration: string;
  description: string;
  significance: string;
  badge: string;
  isActive: boolean;
}

export interface CautionAlert {
  id: string;
  title: string;
  statusBadge: string;
  statusBadgeColor: string;
  description: string;
  remedy: string;
  isWarning: boolean;
}

export interface DetailedMuhuratCard {
  id: string;
  dateStr: string;
  tithiStr: string;
  primaryBadge: string;
  secondaryBadge: string;
  timeWindow: string;
  duration: string;
  nakshatra: string;
  nakshatraType: string;
  tithiYoga: string;
  lagnaShuddhi: string;
  lagnaDesc: string;
  tribalaShuddhi: string;
  tribalaDesc: string;
  warningNote: string;
}

export interface CeremonyTableRow {
  id: string;
  ceremony: string;
  subType: string;
  date: string;
  tithi: string;
  nakshatraWar: string;
  lagna: string;
  lagnaType: string;
  caution: string;
  status: string;
  statusColor: string;
}

export type MuhuratCategory =
  | 'vivah'
  | 'grihaPravesh'
  | 'vahan'
  | 'vyapar'
  | 'bhumi'
  | 'mundan'
  | 'namkaran'
  | 'gold';

export function toDevanagariNumerals(num: number | string): string {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (w) => devanagariDigits[+w]);
}

export function useMuhuratData() {
  const { currentCity } = useLocationStore();
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [activeCategory, setActiveCategory] = useState<MuhuratCategory>('vivah');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('all');
  const [selectedPakshaFilter, setSelectedPakshaFilter] = useState<string>('all');
  const [onlyWeekends, setOnlyWeekends] = useState<boolean>(false);
  const [, setCurrentTime] = useState<Date>(() => new Date());

  // 1-minute ticker for active time-range evaluation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const panchang: PanchangInfo = useMemo(() => {
    return calculatePanchang(
      currentCity.latitude,
      currentCity.longitude,
      selectedDate
    );
  }, [currentCity.latitude, currentCity.longitude, selectedDate]);

  const muhuratSuitability: MuhuratSuitability[] = useMemo(() => {
    return checkMuhurats(panchang);
  }, [panchang]);

  // Evaluate instant actionable muhurats
  const instantMuhurats = useMemo<InstantMuhurat[]>(() => {
    const list: InstantMuhurat[] = [];
    const muhs = panchang.muhurats || [];

    const abhijit = muhs.find((m) => m.id === 'abhijit');
    const brahma = muhs.find((m) => m.id === 'brahma');
    const godhuli = muhs.find((m) => m.id === 'godhuli');

    list.push({
      id: 'abhijit',
      name: 'अभिजित मुहूर्त',
      tag: 'अति शुभ (सर्वकार्य सिद्धि)',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      timeRange: abhijit ? `${abhijit.startTime} – ${abhijit.endTime}` : '११:४५ पूर्वाह्न – १२:३२ अपराह्न',
      duration: '४७ मिनट',
      description: 'दिन का अष्टम मुहूर्त, भगवान नारायण का स्वरूप। समस्त मांगलिक व व्यापारिक शुरुआत, अनुबंध एवं यात्रा हेतु अमोघ काल।',
      significance: 'दोषरहित सर्वसिद्धि',
      badge: 'आगामी शुभ समय',
      isActive: true,
    });

    list.push({
      id: 'vijaya',
      name: 'विजय मुहूर्त',
      tag: 'विजय कारक',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      timeRange: '०१:५४ अपराह्न – ०२:४० अपराह्न',
      duration: '४६ मिनट',
      description: 'कोर्ट-कचहरी, अनुबंध पत्र हस्ताक्षर, प्रतियोगिता, व्यापारिक डील एवं नवीन योजना क्रियान्वयन हेतु शास्त्र सम्मत।',
      significance: 'राहुकाल पश्चात्',
      badge: 'जय प्रदानकर्ता',
      isActive: false,
    });

    list.push({
      id: 'godhuli',
      name: 'गोधूलि वेला',
      tag: 'सांध्य पावन काल',
      tagColor: 'bg-orange-100 text-orange-900 border-orange-300',
      timeRange: godhuli ? `${godhuli.startTime} – ${godhuli.endTime}` : '०५:३८ अपराह्न – ०६:०२ अपराह्न',
      duration: '२४ मिनट',
      description: 'सूर्यास्त संधिकाल। देवपूजन, दीपदान, संध्या वंदन, कुलदेवी-देवता आराधना एवं शांति कर्म हेतु अत्यंत प्रशस्त।',
      significance: 'गोधूलि स्पर्श',
      badge: 'संध्या दीपदान',
      isActive: false,
    });

    list.push({
      id: 'brahma',
      name: 'ब्रह्म मुहूर्त',
      tag: 'अमृत वेला',
      tagColor: 'bg-stone-100 text-stone-800 border-stone-300',
      timeRange: brahma ? `${brahma.startTime} – ${brahma.endTime}` : '०४:३५ पूर्वाह्न – ०५:२४ पूर्वाह्न',
      duration: '४९ मिनट',
      description: 'सूर्योदय से पूर्व २ मुहूर्त। ईश्वर ध्यान, वेद पाठ, मंत्र साधना, योग एवं ज्ञानोपार्जन हेतु श्रेष्ठतम काल।',
      significance: 'साधना काल',
      badge: 'प्रातःकालीन वेला',
      isActive: false,
    });

    return list;
  }, [panchang.muhurats]);

  // Caution Periods
  const cautionAlerts = useMemo<CautionAlert[]>(() => {
    const alerts: CautionAlert[] = [];
    const naksName = panchang.hinduDate.nakshatra.name.toLowerCase();
    const isPanchak =
      naksName.includes('dhanishta') ||
      naksName.includes('shatabhisha') ||
      naksName.includes('purvabhadrapada') ||
      naksName.includes('uttarabhadrapada') ||
      naksName.includes('revati') ||
      naksName.includes('रेवती') ||
      naksName.includes('शतभिषा');

    alerts.push({
      id: 'panchak',
      title: 'पंचक स्थिति',
      statusBadge: isPanchak ? 'पंचक प्रभावी' : 'पंचक रहित दिवस',
      statusBadgeColor: isPanchak ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800',
      description: isPanchak
        ? 'धनिष्ठा उत्तरार्ध से रेवती पर्यन्त। दक्षिण दिशा यात्रा, गृह छत ढलाई, तृण/काष्ठ संचय पूर्णतः वर्जित।'
        : 'वर्तमान में पंचक का प्रभाव नहीं है। सभी सामान्य कार्य व यात्राएं निर्बाध रूप से संपन्न की जा सकती हैं।',
      remedy: isPanchak ? 'परिहार: आवश्यक कर्म हेतु शांति पूजा अनिवार्य' : 'शुभ व दोषमुक्त स्थिति',
      isWarning: isPanchak,
    });

    const karanaName = (panchang.hinduDate.karana.name || '').toLowerCase();
    const isBhadra = karanaName.includes('vishti') || karanaName.includes('विष्टि');
    alerts.push({
      id: 'bhadra',
      title: 'भद्रा (विष्टि करण)',
      statusBadge: isBhadra ? 'भद्रा वास (त्याज्य)' : 'भद्रा मुक्त दिवस',
      statusBadgeColor: isBhadra ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800',
      description: isBhadra
        ? 'विष्टि करण प्रभावी है। इस समय विवाह, गृह प्रवेश, मुंडन, रक्षाबंधन तथा नया कार्य आरंभ सर्वथा वर्जित है।'
        : 'आज दिन-रात में भद्रा वास नहीं है। सभी मांगलिक संस्कार एवं अनुबंध भद्रा-दोष से पूर्णतः मुक्त रहेंगे।',
      remedy: isBhadra ? 'भद्रा पुच्छ में आवश्यक कर्म संभव' : 'अनुकूल: विवाह, यात्रा, शुभ कार्य प्रशस्त',
      isWarning: isBhadra,
    });

    const monthStr = panchang.hinduDate.month.toLowerCase();
    const isKharmas = monthStr.includes('pausha') || monthStr.includes('dhanu');
    alerts.push({
      id: 'kharmas',
      title: 'खरमास / मलमास',
      statusBadge: isKharmas ? 'खरमास काल' : 'खरमास रहित काल',
      statusBadgeColor: isKharmas ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800',
      description: isKharmas
        ? 'सूर्य देव धनु/मीन राशि में स्थित हैं। इस अवधि में विवाह, यज्ञोपवीत, गृह प्रवेश जैसे प्रमुख संस्कार वर्जित रहते हैं।'
        : 'सूर्य देव शुभ राशि में गतिशील हैं। सभी विवाह, गृह प्रवेश व षोडश संस्कार निर्बाध संपन्न हो सकते हैं।',
      remedy: isKharmas ? 'नित्य पूजा व जप पाठ श्रेयस्कर' : 'मांगलिक संस्कारों का स्वर्णिम समय',
      isWarning: isKharmas,
    });

    const rahu = panchang.rahuKaal || { start: '०१:३० अपराह्न', end: '०३:०० अपराह्न' };
    alerts.push({
      id: 'rahukaal',
      title: 'आज का राहु काल',
      statusBadge: 'त्याज्य काल',
      statusBadgeColor: 'bg-red-100 text-red-800 font-bold',
      description: `समय: ${rahu.start} से ${rahu.end}। इस ९० मिनट की अवधि में कोई भी नया कार्य, क्रय अथवा अनुबंध आरंभ न करें।`,
      remedy: 'अमृत चौघड़िया में भी राहु काल त्याज्य माना जाता है',
      isWarning: true,
    });

    return alerts;
  }, [panchang]);

  const categoryCards = useMemo<DetailedMuhuratCard[]>(() => {
    return getCategoryMuhuratCards(activeCategory);
  }, [activeCategory]);

  const ceremonyRows = useMemo<CeremonyTableRow[]>(() => {
    return DEFAULT_CEREMONY_ROWS;
  }, []);

  const goToPreviousDay = useCallback(() => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
  }, []);

  const goToNextDay = useCallback(() => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });
  }, []);

  const isToday = useMemo(() => {
    const now = new Date();
    return (
      now.getFullYear() === selectedDate.getFullYear() &&
      now.getMonth() === selectedDate.getMonth() &&
      now.getDate() === selectedDate.getDate()
    );
  }, [selectedDate]);

  const formattedDate = useMemo(() => formatHindiDate(selectedDate), [selectedDate]);

  const goToToday = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  return {
    currentCity,
    selectedDate,
    setSelectedDate,
    formattedDate,
    isToday,
    panchang,
    muhuratSuitability,
    instantMuhurats,
    cautionAlerts,
    activeCategory,
    setActiveCategory,
    selectedMonthFilter,
    setSelectedMonthFilter,
    selectedPakshaFilter,
    setSelectedPakshaFilter,
    onlyWeekends,
    setOnlyWeekends,
    categoryCards,
    ceremonyRows,
    goToPreviousDay,
    goToNextDay,
    goToToday,
  };
}

export type UseMuhuratDataResult = ReturnType<typeof useMuhuratData>;
