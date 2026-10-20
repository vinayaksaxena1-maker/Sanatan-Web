/**
 * Sanatan Ghadi (सनातन घड़ी)
 * 13 Regional Panchangs, Moonrise & Regional Calendar Domain Types
 */

import type { BilingualLabel } from './i18n';
import type { CityLocation } from './location';
import type { PanchangData, TithiDetail, NakshatraDetail } from './panchang';

export type RegionalPanchangType =
  | 'dainik'
  | 'monthly'
  | 'odia'
  | 'malayalam'
  | 'telugu'
  | 'nepali'
  | 'assamese'
  | 'marathi'
  | 'bengali'
  | 'gujarati'
  | 'tamil'
  | 'kannada'
  | 'iskcon';

export type CalendarEra =
  | 'Vikram'     // Northern & Western India
  | 'Shaka'      // National Civil & Southern/Eastern India
  | 'Kollam'     // Kerala / Malayalam
  | 'BengaliSan' // Bengal / Tripura / Assam
  | 'Fasli'      // Deccan
  | 'Gaurabda';  // Gaudiya Vaishnava / ISKCON

export type LunarMonthSystem = 'Amanta' | 'Purnimanta' | 'SolarSaur';

export interface RegionalPanchangProfile {
  id: RegionalPanchangType;
  name: BilingualLabel;
  regionalScriptTitle: string; // Native regional script e.g. "ওড়িয়া পঞ্জিকা", "தமிழ் பஞ்சாங்கம்"
  primarySystem: LunarMonthSystem;
  calendarEra: CalendarEra;
  newYearName: BilingualLabel;
  associatedStates: string[];
  keyDifferences: string[];
  keyDifferencesHindi: string[];
}

export interface RegionalDayRow {
  date: string;
  regionalDayNumber: number | string;
  regionalMonthName: BilingualLabel;
  tithi: TithiDetail;
  nakshatra: NakshatraDetail;
  solarDay?: number;
  fastingNote?: BilingualLabel;
  isHoliday?: boolean;
}

export interface RegionalPanchangViewData {
  profile: RegionalPanchangProfile;
  currentDate: string;
  monthName: BilingualLabel;
  yearDisplay: string;
  panchang: PanchangData;
  regionalDayRows: RegionalDayRow[];
  specialHighlightsHindi: string[];
}

/**
 * Dedicated Moonrise Calculation Model
 * Used for Karwa Chauth, Sankashti Chaturthi, Eid/Iftar & Sharad Purnima
 */
export interface MoonriseData {
  date: string; // YYYY-MM-DD
  location: CityLocation;
  moonriseTime: string; // "HH:MM AM/PM"
  moonsetTime: string;  // "HH:MM AM/PM"
  illuminationFraction: number; // 0.00 to 1.00
  moonSign: string;
  moonSignHindi: string;
  chandraNakshatra: string;
  chandraNakshatraHindi: string;
  occasionType?: 'KarwaChauth' | 'Sankashti' | 'Purnima' | 'EidRoza' | 'General';
  occasionBadgeHindi?: string; // e.g. "🌕 करवा चौथ चंद्रोदय अर्घ्य समय"
  fastingSignificanceHindi?: string;
}

export interface SmartaVaishnavaComparison {
  date: string;
  tithiName: string;
  smartaVratDate: string;
  smartaVratName: BilingualLabel;
  vaishnavaVratDate: string;
  vaishnavaVratName: BilingualLabel;
  reasonForDivergenceHindi: string;
}
