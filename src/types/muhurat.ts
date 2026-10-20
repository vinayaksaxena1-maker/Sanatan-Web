/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Muhurat, Choghadiya, Hora & Timing Domain Types
 */

import type { BilingualLabel } from './i18n';

export interface TimeRange {
  start: string; // "HH:MM" or ISO timestamp
  end: string;   // "HH:MM" or ISO timestamp
  durationMinutes?: number;
  isCurrent?: boolean;
}

export type ChoghadiyaType =
  | 'Amrit'
  | 'Shubh'
  | 'Labh'
  | 'Chal'
  | 'Rog'
  | 'Kaal'
  | 'Udveg';

export type ChoghadiyaQuality =
  | 'Amrit'
  | 'Shubh'
  | 'Labh'
  | 'Samanya'
  | 'Ashubh'
  | 'Ati-Ashubh';

export interface ChoghadiyaSlot {
  slotIndex: number; // 0 to 7 (8 slots per day/night)
  name: string;
  hindiName: string;
  type: ChoghadiyaType;
  quality: ChoghadiyaQuality;
  rulerPlanet: string;
  rulerPlanetHindi: string;
  start: string;
  end: string;
  isDay: boolean;
  isCurrent?: boolean;
  progressPercent?: number; // 0 to 100% elapsed for radial countdown ring
  remainingMinutes?: number;
  colorHex: string;
  activitiesSuggested: string[];
  activitiesAvoided: string[];
}

export interface HoraSlot {
  hourNumber: number; // 1 to 24 (starting from local sunrise)
  lord: string;
  lordHindi: string;
  start: string;
  end: string;
  isDay: boolean;
  quality: 'Auspicious' | 'Inauspicious' | 'Neutral';
  qualityHindi: string;
  benefits: string;
  colorClass: string;
  isCurrent?: boolean;
  remainingMinutes?: number;
}

export type ShubhYogType =
  | 'Sarvartha Siddhi'
  | 'Amrit Siddhi'
  | 'Dwipushkar'
  | 'Tripushkar'
  | 'Ravi Pushya'
  | 'Guru Pushya'
  | 'Ravi Yoga'
  | 'Pushkar Yoga';

export interface ShubhYogDetail {
  name: string;
  hindiName: string;
  type: ShubhYogType;
  start: string;
  end: string;
  description: string;
  benefits: string;
  isSpecialAuspicious: boolean;
}

export type MuhuratCategory =
  | 'Vivah'
  | 'GrihaPravesh'
  | 'VehiclePurchase'
  | 'PropertyPurchase'
  | 'Namkaran'
  | 'Mundan'
  | 'Upanayan'
  | 'VyaparArambh'
  | 'Annaprashan'
  | 'Karnavedha'
  | 'GeneralShubh';

export interface MuhuratCard {
  id: string;
  category: MuhuratCategory;
  title: BilingualLabel;
  date: string;
  timeRange: TimeRange;
  nakshatra: string;
  nakshatraHindi: string;
  tithi: string;
  tithiHindi: string;
  shubhScore: number; // 1 to 100 percentage rating
  guidanceNotes: string[];
  guidanceNotesHindi: string[];
  prohibitedReasons?: string[];
  isAuspicious: boolean;
}

/**
 * High-Precision Ekadashi Parana Window Model
 * Complies with strict Smarta & Vaishnava Hari Vasara rules
 */
export interface EkadashiParanaWindow {
  ekadashiName: string;
  ekadashiNameHindi: string;
  ekadashiDate: string; // YYYY-MM-DD
  paranaDate: string;   // YYYY-MM-DD (Dwadashi day)
  sunriseTime: string;  // Sunrise on Dwadashi
  dwadashiEndTime: string;
  hariVasaraEndTime: string; // End of 1st quarter (25%) of Dwadashi
  recommendedWindowStart: string;
  recommendedWindowEnd: string;
  isHariVasaraActiveAtSunrise: boolean;
  rationaleHindi: string;
  rationaleEnglish: string;
  traditionType: 'Smarta' | 'Vaishnava';
}

export interface MuhuratFilterCriteria {
  category?: MuhuratCategory;
  startDate?: string;
  endDate?: string;
  minimumScore?: number;
  onlyWeekend?: boolean;
}
