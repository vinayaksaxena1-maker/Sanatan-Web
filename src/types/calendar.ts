/**
 * Sanatan Ghadi (सनातन घड़ी)
 * 15 Regional & Festival Calendars Domain Types
 */

import type { BilingualLabel } from './i18n';

export type CalendarSystemType =
  | 'hindu_lunar'
  | 'indian_civil'
  | 'tamil'
  | 'malayalam'
  | 'bengali'
  | 'gujarati'
  | 'marathi'
  | 'telugu'
  | 'odia'
  | 'sankranti'
  | 'diwali'
  | 'durga_puja'
  | 'chaitra_navratri'
  | 'shardiya_navratri'
  | 'iskcon';

export type FestivalCategory =
  | 'major'
  | 'ekadashi'
  | 'purnima'
  | 'amavasya'
  | 'pradosh'
  | 'sankashti'
  | 'jayanti'
  | 'regional'
  | 'national';

export interface FestivalEvent {
  id: string;
  name: BilingualLabel;
  date: string; // YYYY-MM-DD
  tithi: string;
  tithiHindi: string;
  paksha: 'Shukla' | 'Krishna';
  month: string;
  monthHindi: string;
  category: FestivalCategory;
  isFastingDay: boolean;
  smartaDate?: string;
  vaishnavaDate?: string;
  description: BilingualLabel;
  pujaShubhTime?: string;
  pujaVidhiSummaryHindi?: string;
  mantraList?: string[];
}

export interface CalendarDayCell {
  date: string; // "YYYY-MM-DD"
  gregorianDay: number;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  dayOfWeekHindi: string;
  lunarTithiName: string;
  lunarTithiHindi: string;
  paksha: 'Shukla' | 'Krishna';
  monthHindi: string;
  festivals: FestivalEvent[];
  isEkadashi: boolean;
  isPurnima: boolean;
  isAmavasya: boolean;
  isPradosh: boolean;
  isSankranti: boolean;
  isToday: boolean;
  isSelected?: boolean;
}

export interface CalendarMonthGrid {
  year: number;
  month: number; // 1 to 12
  system: CalendarSystemType;
  systemName: BilingualLabel;
  monthName: BilingualLabel;
  eraName: string;
  yearInEra: number;
  weeks: CalendarDayCell[][];
  festivalsThisMonth: FestivalEvent[];
}

export interface CalendarFilterOptions {
  system: CalendarSystemType;
  category?: FestivalCategory;
  onlyFasting?: boolean;
  year: number;
  month?: number;
}
