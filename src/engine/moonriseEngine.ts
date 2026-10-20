/**
 * Sanatan Ghadi (सनातन घड़ी) - High-Precision Moonrise Calculation Engine
 * 
 * Provides local Moonrise and Moonset determination calibrated against official
 * ephemeris standards for Karwa Chauth, Sankashti Chaturthi, Roza Iftar / Eid,
 * and Sharad Purnima across 5,000+ Indian and global locations.
 * 
 * @license MIT
 * @author Vinayak Saxena
 */

import {
  calculateMoonTimesCore,
  calculateTimezoneOffset,
  drik_calc_ut,
  drik_get_ayanamsa_ut,
  drik_rise_trans,
  findBoundaryCrossing,
  formatRawMin,
  jdToLocalMinutes,
  SE_SUN,
  SE_MOON
} from './core/sanatan_jpl_bridge';
import { findClosestCity } from './geocoder';
import type { MoonriseData } from '../types/regional';
import type { CityLocation } from '../types/location';

export interface DetailedMoonriseResult extends MoonriseData {
  moonriseJd: number | null;
  moonsetJd: number | null;
  moonriseRawMinutes: number;
  moonsetRawMinutes: number;
  isPolar: boolean;
  phaseAngleDeg: number;
  lunarAgeDays: number;
}

const RASHI_NAMES: Array<{ en: string; hi: string }> = [
  { en: 'Aries', hi: 'मेष' },
  { en: 'Taurus', hi: 'वृषभ' },
  { en: 'Gemini', hi: 'मिथुन' },
  { en: 'Cancer', hi: 'कर्क' },
  { en: 'Leo', hi: 'सिंह' },
  { en: 'Virgo', hi: 'कन्या' },
  { en: 'Libra', hi: 'तुला' },
  { en: 'Scorpio', hi: 'वृश्चिक' },
  { en: 'Sagittarius', hi: 'धनु' },
  { en: 'Capricorn', hi: 'मकर' },
  { en: 'Aquarius', hi: 'कुंभ' },
  { en: 'Pisces', hi: 'मीन' }
];

const NAKSHATRA_NAMES: Array<{ en: string; hi: string }> = [
  { en: 'Ashwini', hi: 'अश्विनी' },
  { en: 'Bharani', hi: 'भरणी' },
  { en: 'Krittika', hi: 'कृत्तिका' },
  { en: 'Rohini', hi: 'रोहिणी' },
  { en: 'Mrigashirsha', hi: 'मृगशिरा' },
  { en: 'Ardra', hi: 'आर्द्रा' },
  { en: 'Punarvasu', hi: 'पुनर्वसु' },
  { en: 'Pushya', hi: 'पुष्य' },
  { en: 'Ashlesha', hi: 'आश्लेषा' },
  { en: 'Magha', hi: 'मघा' },
  { en: 'Purva Phalguni', hi: 'पूर्वा फाल्गुनी' },
  { en: 'Uttara Phalguni', hi: 'उत्तरा फाल्गुनी' },
  { en: 'Hasta', hi: 'हस्त' },
  { en: 'Chitra', hi: 'चित्रा' },
  { en: 'Swati', hi: 'स्वाति' },
  { en: 'Vishakha', hi: 'विशाखा' },
  { en: 'Anuradha', hi: 'अनुराधा' },
  { en: 'Jyeshtha', hi: 'ज्येष्ठा' },
  { en: 'Mula', hi: 'मूल' },
  { en: 'Purva Ashadha', hi: 'पूर्वाषाढ़ा' },
  { en: 'Uttara Ashadha', hi: 'उत्तराषाढ़ा' },
  { en: 'Shravana', hi: 'श्रवण' },
  { en: 'Dhanishta', hi: 'धनिष्ठा' },
  { en: 'Shatabhisha', hi: 'शतभिषा' },
  { en: 'Purva Bhadrapada', hi: 'पूर्वाभाद्रपद' },
  { en: 'Uttara Bhadrapada', hi: 'उत्तराभाद्रपद' },
  { en: 'Revati', hi: 'रेवती' }
];

function resolveLocation(lat: number, lon: number, override?: Partial<CityLocation>): CityLocation {
  const closest = findClosestCity(lat, lon);
  return {
    id: override?.id || `loc_${lat.toFixed(4)}_${lon.toFixed(4)}`,
    name: override?.name || closest.name || 'Local City',
    nameHindi: override?.nameHindi || closest.name || 'स्थानीय नगर',
    state: override?.state || closest.state || 'India',
    stateHindi: override?.stateHindi || closest.state || 'भारत',
    country: override?.country || 'India',
    countryHindi: override?.countryHindi || 'भारत',
    latitude: lat,
    longitude: lon,
    timezone: override?.timezone || 'Asia/Kolkata',
    elevationMeters: override?.elevationMeters || 0
  };
}

function parseTargetDate(input?: Date | string): { dateObj: Date; dateStr: string; year: number; month: number; day: number } {
  let dateObj: Date;
  if (!input) {
    dateObj = new Date();
  } else if (typeof input === 'string') {
    if (input.includes('T')) {
      dateObj = new Date(input);
    } else {
      const [y, m, d] = input.split('-').map(Number);
      dateObj = new Date(y, m - 1, d, 12, 0, 0);
    }
  } else {
    dateObj = new Date(input.getTime());
  }

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  return { dateObj, dateStr, year, month, day };
}

/**
 * Calculates high-precision Moonrise and Moonset for a given geographic location and date.
 * Returns formatted times, illumination fraction, Chandra Rashi, Nakshatra, and religious occasion tags.
 */
export function calculateMoonrise(
  lat: number,
  lon: number,
  date?: Date | string,
  offsetHours?: number,
  locationOverride?: Partial<CityLocation>,
  occasionHint?: 'KarwaChauth' | 'Sankashti' | 'Purnima' | 'EidRoza' | 'General'
): MoonriseData {
  const detailed = calculateDetailedMoonrise(lat, lon, date, offsetHours, locationOverride, occasionHint);
  return {
    date: detailed.date,
    location: detailed.location,
    moonriseTime: detailed.moonriseTime,
    moonsetTime: detailed.moonsetTime,
    illuminationFraction: detailed.illuminationFraction,
    moonSign: detailed.moonSign,
    moonSignHindi: detailed.moonSignHindi,
    chandraNakshatra: detailed.chandraNakshatra,
    chandraNakshatraHindi: detailed.chandraNakshatraHindi,
    occasionType: detailed.occasionType,
    occasionBadgeHindi: detailed.occasionBadgeHindi,
    fastingSignificanceHindi: detailed.fastingSignificanceHindi
  };
}

/**
 * Detailed Moonrise calculator including Julian Days and raw minutes for astronomical analysis.
 */
export function calculateDetailedMoonrise(
  lat: number,
  lon: number,
  date?: Date | string,
  offsetHours?: number,
  locationOverride?: Partial<CityLocation>,
  occasionHint?: 'KarwaChauth' | 'Sankashti' | 'Purnima' | 'EidRoza' | 'General'
): DetailedMoonriseResult {
  const { dateObj, dateStr, year, month, day } = parseTargetDate(date);
  const location = resolveLocation(lat, lon, locationOverride);
  const tzOffset = typeof offsetHours === 'number' ? offsetHours : calculateTimezoneOffset(lat, lon);

  // Local midnight Julian Day UT
  const today0hUT = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  const today0hMs = today0hUT.getTime() - (tzOffset * 3600000);
  const jdMidnight = (today0hMs / 86400000) + 2440587.5;

  // Search rise and set from local midnight using proprietary JPL DE405 bridge
  const moonriseJd = drik_rise_trans(jdMidnight, SE_MOON, lon, lat, location.elevationMeters || 0, 1);
  const moonsetJd = drik_rise_trans(jdMidnight, SE_MOON, lon, lat, location.elevationMeters || 0, 2);

  // Core timings calculation
  const timesCore = calculateMoonTimesCore(lat, lon, dateObj, tzOffset);

  // Reference JD for Moon position & illumination (at Moonrise if available, else local noon)
  const refJd = moonriseJd ?? (jdMidnight + 0.5);

  const sunPos = drik_calc_ut(refJd, SE_SUN);
  const moonPos = drik_calc_ut(refJd, SE_MOON);
  const ayanamsa = drik_get_ayanamsa_ut(refJd);

  const moonSidereal = ((moonPos[0] - ayanamsa) % 360 + 360) % 360;
  const elongation = (moonPos[0] - sunPos[0] + 360) % 360;

  // Standard illuminated fraction of Moon: k = (1 - cos(D)) / 2
  const illuminationFraction = Math.round(((1 - Math.cos((elongation * Math.PI) / 180)) / 2) * 1000) / 1000;

  // Chandra Rashi & Nakshatra
  const signIndex = Math.min(11, Math.max(0, Math.floor(moonSidereal / 30)));
  const nakshatraIndex = Math.min(26, Math.max(0, Math.floor(moonSidereal / (360 / 27))));

  const moonSign = RASHI_NAMES[signIndex].en;
  const moonSignHindi = RASHI_NAMES[signIndex].hi;
  const chandraNakshatra = NAKSHATRA_NAMES[nakshatraIndex].en;
  const chandraNakshatraHindi = NAKSHATRA_NAMES[nakshatraIndex].hi;

  // Tithi calculation at reference JD
  const tithiIndex = Math.floor(elongation / 12); // 0 to 29
  const lunarAgeDays = Math.round((elongation / 360) * 29.530589 * 10) / 10;

  // Occasion classification
  let occasionType: 'KarwaChauth' | 'Sankashti' | 'Purnima' | 'EidRoza' | 'General' = occasionHint || 'General';
  let occasionBadgeHindi = '🌙 दैनिक चंद्रोदय एवं चंद्रास्त';
  let fastingSignificanceHindi = 'दैनिक चंद्र दर्शन एवं अर्घ्य समय।';

  if (occasionHint === 'KarwaChauth' || (!occasionHint && tithiIndex === 18 && (month === 10 || month === 11))) {
    // Krishna Chaturthi in Kartika/Ashwina
    occasionType = 'KarwaChauth';
    occasionBadgeHindi = '🌕 करवा चौथ चंद्रोदय अर्घ्य समय';
    fastingSignificanceHindi = 'अखंड सौभाग्य व पति की दीर्घायु हेतु सुहागिन महिलाएं चंद्रमा को अर्घ्य देकर व्रत का पारण करती हैं।';
  } else if (occasionHint === 'Sankashti' || (!occasionHint && tithiIndex === 18)) {
    occasionType = 'Sankashti';
    occasionBadgeHindi = '🐘 संकष्टी चतुर्थी चंद्रोदय समय';
    fastingSignificanceHindi = 'विघ्नहर्ता भगवान श्री गणेश के संकष्टी व्रत में रात्रि चंद्र दर्शन व अर्घ्य अनिवार्य है।';
  } else if (occasionHint === 'Purnima' || (!occasionHint && tithiIndex === 14)) {
    occasionType = 'Purnima';
    occasionBadgeHindi = '🌕 पूर्णिमा चंद्रोदय';
    fastingSignificanceHindi = 'श्री सत्यनारायण पूजन, पवित्र स्नान एवं पूर्ण चंद्र दर्शन का परम पुण्यदायी समय।';
  } else if (occasionHint === 'EidRoza' || (!occasionHint && (tithiIndex === 0 || tithiIndex === 1))) {
    occasionType = 'EidRoza';
    occasionBadgeHindi = '🌙 हिलाल / ईद / रोज़ा इफ्तार चंद्र दर्शन';
    fastingSignificanceHindi = 'नवीन अर्धचंद्र (हिलाल) दीदार एवं रोज़ा इफ्तार का पावन समय।';
  }

  const moonriseFormatted = (moonriseJd !== null)
    ? formatRawMin(jdToLocalMinutes(moonriseJd, tzOffset))
    : timesCore.moonrise;
  const moonsetFormatted = (moonsetJd !== null)
    ? formatRawMin(jdToLocalMinutes(moonsetJd, tzOffset))
    : timesCore.moonset;

  return {
    date: dateStr,
    location,
    moonriseTime: moonriseFormatted,
    moonsetTime: moonsetFormatted,
    illuminationFraction,
    moonSign,
    moonSignHindi,
    chandraNakshatra,
    chandraNakshatraHindi,
    occasionType,
    occasionBadgeHindi,
    fastingSignificanceHindi,
    moonriseJd,
    moonsetJd,
    moonriseRawMinutes: timesCore.moonriseRaw,
    moonsetRawMinutes: timesCore.moonsetRaw,
    isPolar: !!timesCore.isPolar,
    phaseAngleDeg: elongation,
    lunarAgeDays
  };
}

/**
 * Returns exact Karwa Chauth Moonrise for a given year and city.
 * Auto-resolves the exact date of Karwa Chauth for that year.
 */
export function getKarwaChauthMoonrise(
  year: number,
  city?: Partial<CityLocation> | { latitude: number; longitude: number }
): MoonriseData {
  const lat = city?.latitude ?? 28.6139; // Default New Delhi
  const lon = city?.longitude ?? 77.2090;
  const tzOffset = 5.5;

  // Karwa Chauth occurs on Kartika Krishna Chaturthi during Moonrise (Chandrodaya-vyapini Chaturthi)
  // Search the window between Oct 5 and Nov 15 (Sun in Kanya/Tula, ~180° to 240°)
  const startJd = ((new Date(Date.UTC(year, 9, 5, 0, 0, 0)).getTime()) / 86400000) + 2440587.5;
  let chaturthiStartJd = 0;

  for (let d = 0; d < 42; d++) {
    const jd = startJd + d;
    const sun = drik_calc_ut(jd, SE_SUN);
    const moon = drik_calc_ut(jd, SE_MOON);
    const diff = (moon[0] - sun[0] + 360) % 360;
    // Approaching Krishna Chaturthi (216°) with Sun in late Virgo or Libra
    if (diff >= 195 && diff <= 245 && sun[0] > 185 && sun[0] < 240) {
      chaturthiStartJd = findBoundaryCrossing(jd, 'tithi', 216);
      break;
    }
  }

  let bestDate = `${year}-10-20`;
  if (chaturthiStartJd) {
    const localMs = (chaturthiStartJd - 2440587.5) * 86400000 + (tzOffset * 3600000);
    const dObj = new Date(localMs);
    const candDates: string[] = [];
    for (let offset = -1; offset <= 1; offset++) {
      const d = new Date(dObj.getFullYear(), dObj.getMonth(), dObj.getDate() + offset);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      candDates.push(`${y}-${m}-${day}`);
    }

    bestDate = candDates[1]; // default day of Chaturthi start
    // Check if Chaturthi is active during Moonrise
    for (const dateStr of candDates) {
      const mr = calculateDetailedMoonrise(lat, lon, dateStr, tzOffset);
      if (mr.moonriseJd) {
        const sun = drik_calc_ut(mr.moonriseJd, SE_SUN);
        const moon = drik_calc_ut(mr.moonriseJd, SE_MOON);
        const diff = (moon[0] - sun[0] + 360) % 360;
        const tithi = Math.floor(diff / 12);
        if (tithi === 18) {
          bestDate = dateStr;
          break;
        }
      }
    }
  }

  return calculateMoonrise(lat, lon, bestDate, tzOffset, city as Partial<CityLocation>, 'KarwaChauth');
}

/**
 * Returns exact Sankashti Chaturthi Moonrise for a given month and city.
 */
export function getSankashtiMoonrise(
  dateOrYear: number | Date,
  monthIndex?: number,
  city?: Partial<CityLocation> | { latitude: number; longitude: number }
): MoonriseData {
  const lat = city?.latitude ?? 28.6139;
  const lon = city?.longitude ?? 77.2090;

  if (dateOrYear instanceof Date) {
    return calculateMoonrise(lat, lon, dateOrYear, 5.5, city as Partial<CityLocation>, 'Sankashti');
  }

  const year = dateOrYear;
  const m = typeof monthIndex === 'number' ? monthIndex : new Date().getMonth() + 1;
  const daysInMonth = new Date(year, m, 0).getDate();

  let targetDate = `${year}-${String(m).padStart(2, '0')}-15`;

  // Scan across the days of the calendar month to find Krishna Chaturthi (tithi 18)
  for (let d = 1; d <= daysInMonth; d++) {
    for (let h = 0; h < 24; h += 6) {
      const jd = ((new Date(Date.UTC(year, m - 1, d, h, 0, 0)).getTime()) / 86400000) + 2440587.5;
      const sun = drik_calc_ut(jd, SE_SUN);
      const moon = drik_calc_ut(jd, SE_MOON);
      const diff = (moon[0] - sun[0] + 360) % 360;
      const tithi = Math.floor(diff / 12);
      if (tithi === 18) {
        targetDate = `${year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        break;
      }
    }
  }

  return calculateMoonrise(lat, lon, targetDate, 5.5, city as Partial<CityLocation>, 'Sankashti');
}

/**
 * Returns Hilal (Crescent Moon) visibility and timings for Roza / Eid.
 */
export function getEidHilalMoonTimes(
  date: Date,
  city?: Partial<CityLocation> | { latitude: number; longitude: number }
): MoonriseData {
  const lat = city?.latitude ?? 28.6139;
  const lon = city?.longitude ?? 77.2090;
  return calculateMoonrise(lat, lon, date, 5.5, city as Partial<CityLocation>, 'EidRoza');
}
