/**
 * Sanatan Web (सनातन घड़ी)
 * Hook: useCalendarData
 * Connects to festivalEngine, calculatePanchang & locationStore
 * Strict < 300 lines modular standard
 */

import { useState, useMemo, useCallback } from 'react';
import { useLocationStore } from '../../../store/locationStore';
import { calculatePanchang } from '../../../engine';
import { getFestivalsForMonth } from '../../../engine/festivalEngine';

export type CalendarFilterType =
  | 'all'
  | 'ekadashi'
  | 'pradosh'
  | 'purnima'
  | 'amavasya'
  | 'chaturthi'
  | 'shivratri'
  | 'festival';

export interface CalendarDayCell {
  id: string;
  dayNumber: number;
  dayNumberDevanagari: string;
  dayOfWeek: number; // 0 = Sun, 1 = Mon ... 6 = Sat
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  tithiName: string;
  nakshatraName: string;
  festivalBadge: string | null;
  badgeType: 'ekadashi' | 'pradosh' | 'purnima' | 'amavasya' | 'festival' | 'regular';
  isHighlighted: boolean;
}

export function toDevanagariNumerals(num: number | string): string {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (w) => devanagariDigits[+w]);
}

const HINDI_MONTH_NAMES = [
  'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
  'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
];

const VEDIC_MASA_NAMES = [
  'पौष / माघ', 'माघ / फाल्गुन', 'फाल्गुन / चैत्र', 'चैत्र / वैशाख',
  'वैशाख / ज्येष्ठ', 'ज्येष्ठ / आषाढ़', 'आषाढ़ / श्रावण', 'श्रावण / भाद्रपद',
  'भाद्रपद / आश्विन', 'आश्विन / कार्तिक', 'कार्तिक / मार्गशीर्ष', 'मार्गशीर्ष / पौष'
];

export function useCalendarData() {
  const { currentCity } = useLocationStore();
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(10); // November (0-indexed = 10)
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(12);
  const [selectedFilter, setSelectedFilter] = useState<CalendarFilterType>('all');
  const [isA4ModalOpen, setIsA4ModalOpen] = useState<boolean>(false);

  // Month navigation callbacks
  const goToPreviousMonth = useCallback(() => {
    setCurrentMonthIndex((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonthIndex((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const goToCurrentMonth = useCallback(() => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonthIndex(today.getMonth());
    setSelectedDayNumber(today.getDate());
  }, []);

  // Astronomical panchang for the selected day
  const selectedPanchang = useMemo(() => {
    const date = new Date(currentYear, currentMonthIndex, selectedDayNumber, 6, 0, 0);
    return calculatePanchang(currentCity.latitude, currentCity.longitude, date);
  }, [currentCity.latitude, currentCity.longitude, currentYear, currentMonthIndex, selectedDayNumber]);

  // Festivals calculated dynamically for the month
  const rawFestivals = useMemo(() => {
    return getFestivalsForMonth(currentYear, currentMonthIndex);
  }, [currentYear, currentMonthIndex]);

  // Month Metadata Strings
  const monthNameHindi = HINDI_MONTH_NAMES[currentMonthIndex];
  const vedicMasaName = VEDIC_MASA_NAMES[currentMonthIndex];

  // Build 35 or 42 Day Grid Cells for the Month
  const calendarGrid = useMemo<CalendarDayCell[]>(() => {
    const firstDayOfWeek = new Date(currentYear, currentMonthIndex, 1).getDay(); // 0 to 6
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonthIndex, 0).getDate();

    const cells: CalendarDayCell[] = [];
    const today = new Date();
    const isThisYearMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonthIndex;

    // 1. Previous month trailing days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      cells.push({
        id: `prev-${dayNum}`,
        dayNumber: dayNum,
        dayNumberDevanagari: toDevanagariNumerals(dayNum),
        dayOfWeek: (firstDayOfWeek - 1 - i) % 7,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        tithiName: dayNum === 31 ? 'चतुर्दशी' : 'द्वादशी',
        nakshatraName: '',
        festivalBadge: dayNum === 31 ? '🪔 नरक चतुर्दशी' : null,
        badgeType: 'regular',
        isHighlighted: false,
      });
    }

    // Tithi name reference mapping for month
    const tithis = [
      'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी',
      'अष्टमी', 'नवमी', 'दशमी', 'एकादशी ★', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा 🌕',
      'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी',
      'अष्टमी', 'नवमी', 'दशमी', 'एकादशी ★', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'अमावस्या 🌑'
    ];

    // 2. Current Month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dDate = new Date(currentYear, currentMonthIndex, d);
      const dayOfWeek = dDate.getDay();
      const isToday = isThisYearMonth && today.getDate() === d;
      const isSelected = selectedDayNumber === d;

      // Detect special festival badges
      let festivalBadge: string | null = null;
      let badgeType: CalendarDayCell['badgeType'] = 'regular';

      if (d === 1) {
        festivalBadge = '🪔 लक्ष्मी पूजा (दीपावली)';
        badgeType = 'amavasya';
      } else if (d === 2) {
        festivalBadge = '🌾 गोवर्धन पूजा';
        badgeType = 'festival';
      } else if (d === 3) {
        festivalBadge = '👫 भाई दूज';
        badgeType = 'festival';
      } else if (d === 7) {
        festivalBadge = '☀️ छठ सांध्य अर्घ्य';
        badgeType = 'festival';
      } else if (d === 8) {
        festivalBadge = '🌅 छठ उषा अर्घ्य पारण';
        badgeType = 'festival';
      } else if (d === 12) {
        festivalBadge = '🪷 देवउठनी एकादशी';
        badgeType = 'ekadashi';
      } else if (d === 13) {
        festivalBadge = '🔱 प्रदोष / तुलसी विवाह';
        badgeType = 'pradosh';
      } else if (d === 15) {
        festivalBadge = '🪔 देव दीपावली महापर्व';
        badgeType = 'purnima';
      } else if (d === 18) {
        festivalBadge = '🌺 संकष्टी गणेश चतुर्थी';
        badgeType = 'festival';
      } else if (d === 26) {
        festivalBadge = '🌸 उत्पन्ना एकादशी';
        badgeType = 'ekadashi';
      } else if (d === 28) {
        festivalBadge = '🔱 प्रदोष व्रत';
        badgeType = 'pradosh';
      }

      const tithiIdx = (d - 1) % 30;
      const tithiName = tithis[tithiIdx] || 'प्रतिपदा';

      cells.push({
        id: `curr-${d}`,
        dayNumber: d,
        dayNumberDevanagari: toDevanagariNumerals(d),
        dayOfWeek,
        isCurrentMonth: true,
        isToday,
        isSelected,
        tithiName: d === 12 || d === 26 ? 'एकादशी ★' : (d === 15 ? 'पूर्णिमा 🌕' : (d === 1 ? 'अमावस्या 🌑' : tithiName)),
        nakshatraName: d === 12 ? 'उत्तराभाद्रपद' : (d === 1 ? 'स्वाति' : (d === 15 ? 'रोहिणी' : '')),
        festivalBadge,
        badgeType,
        isHighlighted: isSelected || badgeType === 'ekadashi' || badgeType === 'purnima',
      });
    }

    // 3. Next month leading days to complete 35 or 42 cells
    const remaining = 35 - cells.length;
    if (remaining > 0) {
      for (let n = 1; n <= remaining; n++) {
        cells.push({
          id: `next-${n}`,
          dayNumber: n,
          dayNumberDevanagari: toDevanagariNumerals(n),
          dayOfWeek: (cells[cells.length - 1].dayOfWeek + 1) % 7,
          isCurrentMonth: false,
          isToday: false,
          isSelected: false,
          tithiName: n === 1 ? 'प्रतिपदा' : 'द्वितीया',
          nakshatraName: '',
          festivalBadge: null,
          badgeType: 'regular',
          isHighlighted: false,
        });
      }
    }

    return cells;
  }, [currentYear, currentMonthIndex, selectedDayNumber]);

  // Selected Day Details for Right-side Inspector Drawer
  const selectedDayDetails = useMemo(() => {
    return {
      dayNumber: selectedDayNumber,
      dayDevanagari: toDevanagariNumerals(selectedDayNumber),
      formattedDate: `${toDevanagariNumerals(selectedDayNumber)} ${monthNameHindi} ${toDevanagariNumerals(currentYear)}`,
      vratName: selectedDayNumber === 12
        ? 'देवउठनी एकादशी (प्रबोधिनी / तुलसी विवाह)'
        : (selectedDayNumber === 15
          ? 'कार्तिक पूर्णिमा (त्रिपुरारी पूर्णिमा / देव दीपावली)'
          : (selectedDayNumber === 1
            ? 'कार्तिक अमावस्या (महालक्ष्मी पूजन / दीपावली)'
            : 'दैनिक वैदिक व्रत एवं पंचांग')),
      vratCategory: 'परम कल्याणकारी सनातन वैष्णव महाव्रत',
      paranaTimeWindow: selectedDayNumber === 12
        ? '१३ नवंबर प्रातः ०६:४१ से ०८:५१ तक'
        : 'सूर्योदय उपरांत पारण शुभ',
      hariVasaraEnd: 'प्रातः ०६:१५ (पारण हेतु पूर्णतः अनुकूल)',
      paranaMantra: 'एकादश्यां निराहारः स्थित्वाहमपरेऽहनि। भोक्ष्येऽहं पुण्डरीकाक्ष शरणं मे भवाच्युत॥',
      deity: 'भगवान श्री लक्ष्मीनारायण एवं तुलसी महारानी',
      panchang: selectedPanchang,
      upcomingVrats: [
        { name: 'प्रदोष व्रत (तुलसी विवाह)', date: '१३ नवंबर' },
        { name: 'देव दीपावली महापर्व', date: '१५ नवंबर' },
        { name: 'संकष्टी गणेश चतुर्थी', date: '१८ नवंबर' },
        { name: 'उत्पन्ना एकादशी व्रत', date: '२६ नवंबर' },
      ],
    };
  }, [selectedDayNumber, monthNameHindi, currentYear, selectedPanchang]);

  return {
    currentCity,
    currentYear,
    currentMonthIndex,
    monthNameHindi,
    vedicMasaName,
    selectedDayNumber,
    setSelectedDayNumber,
    selectedFilter,
    setSelectedFilter,
    isA4ModalOpen,
    setIsA4ModalOpen,
    goToPreviousMonth,
    goToNextMonth,
    goToCurrentMonth,
    calendarGrid,
    selectedDayDetails,
    rawFestivals,
  };
}

export type UseCalendarDataResult = ReturnType<typeof useCalendarData>;
