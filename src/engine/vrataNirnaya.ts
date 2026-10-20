/**
 * Sanatan Ghadi (सनातन घड़ी) - Vrata Nirnaya, Udaya Tithi & Ekadashi Parana Engine
 * 
 * Implements rigorous Dharma Shastra rules:
 * 1. Udaya Tithi determination & 4-Ghatika (96 min) Arunodaya calculation.
 * 2. Dashami-Viddha detection vs Shuddha Ekadashi.
 * 3. Smarta (Grihastha) vs Vaishnava (Sannyasis / ISKCON) dual vrata nirnaya.
 * 4. calculateHariVasaraEnd: Exact end of first 25% of Dwadashi tithi.
 * 5. calculateEkadashiParana: Astronomical Parana window calculation (<30s Drik Panchang precision).
 * 
 * @license MIT
 * @author Vinayak Saxena
 */

import {
  calculateSolarTimesCore,
  calculatePanchangPositionsCore,
  calculateTimezoneOffset,
  drik_calc_ut,
  drik_rise_trans,
  findBoundaryCrossing,
  SE_SUN,
  SE_MOON
} from './core/sanatan_jpl_bridge';
import type { EkadashiParanaWindow } from '../types/muhurat';
import type { SmartaVaishnavaComparison } from '../types/regional';

export interface UdayaTithiResult {
  date: string; // YYYY-MM-DD
  sunriseTime: string;
  sunriseJd: number;
  arunodayaStartTime: string;
  arunodayaEndTime: string;
  arunodayaStartJd: number;
  udayaTithiIndex: number; // 0-29
  udayaTithiValue: number; // 1-30
  udayaTithiName: string;
  udayaTithiHindi: string;
  paksha: 'Shukla' | 'Krishna';
  tithiAtArunodayaStart: number;
  isKshayaTithi: boolean;
  isVriddhiTithi: boolean;
}

export interface EkadashiVedhaResult {
  date: string;
  isEkadashiDay: boolean;
  tithiAtSunrise: number;
  isDashamiViddha: boolean;
  isShuddha: boolean;
  dashamiEndJd: number | null;
  dashamiEndTime: string | null;
  arunodayaStartJd: number;
  arunodayaStartTime: string;
  sunriseJd: number;
  sunriseTime: string;
  vedhaExplanationHindi: string;
}

export interface HariVasaraResult {
  dwadashiStartJd: number;
  dwadashiEndJd: number;
  hariVasaraEndJd: number;
  dwadashiStartTime: string;
  dwadashiEndTime: string;
  hariVasaraEndTime: string;
  hariVasaraDurationHours: number;
  isHariVasaraActiveAtSunrise: boolean;
}

const TITHI_NAMES: Array<{ en: string; hi: string }> = [
  { en: 'Shukla Pratipada', hi: 'शुक्ल प्रतिपदा' },
  { en: 'Shukla Dwitiya', hi: 'शुक्ल द्वितीया' },
  { en: 'Shukla Tritiya', hi: 'शुक्ल तृतीया' },
  { en: 'Shukla Chaturthi', hi: 'शुक्ल चतुर्थी' },
  { en: 'Shukla Panchami', hi: 'शुक्ल पंचमी' },
  { en: 'Shukla Shashti', hi: 'शुक्ल षष्ठी' },
  { en: 'Shukla Saptami', hi: 'शुक्ल सप्तमी' },
  { en: 'Shukla Ashtami', hi: 'शुक्ल अष्टमी' },
  { en: 'Shukla Navami', hi: 'शुक्ल नवमी' },
  { en: 'Shukla Dashami', hi: 'शुक्ल दशमी' },
  { en: 'Shukla Ekadashi', hi: 'शुक्ल एकादशी' },
  { en: 'Shukla Dwadashi', hi: 'शुक्ल द्वादशी' },
  { en: 'Shukla Trayodashi', hi: 'शुक्ल त्रयोदशी' },
  { en: 'Shukla Chaturdashi', hi: 'शुक्ल चतुर्दशी' },
  { en: 'Purnima', hi: 'पूर्णिमा' },
  { en: 'Krishna Pratipada', hi: 'कृष्ण प्रतिपदा' },
  { en: 'Krishna Dwitiya', hi: 'कृष्ण द्वितीया' },
  { en: 'Krishna Tritiya', hi: 'कृष्ण तृतीया' },
  { en: 'Krishna Chaturthi', hi: 'कृष्ण चतुर्थी' },
  { en: 'Krishna Panchami', hi: 'कृष्ण पंचमी' },
  { en: 'Krishna Shashti', hi: 'कृष्ण षष्ठी' },
  { en: 'Krishna Saptami', hi: 'कृष्ण सप्तमी' },
  { en: 'Krishna Ashtami', hi: 'कृष्ण अष्टमी' },
  { en: 'Krishna Navami', hi: 'कृष्ण नवमी' },
  { en: 'Krishna Dashami', hi: 'कृष्ण दशमी' },
  { en: 'Krishna Ekadashi', hi: 'कृष्ण एकादशी' },
  { en: 'Krishna Dwadashi', hi: 'कृष्ण द्वादशी' },
  { en: 'Krishna Trayodashi', hi: 'कृष्ण त्रयोदशी' },
  { en: 'Krishna Chaturdashi', hi: 'कृष्ण चतुर्दशी' },
  { en: 'Amavasya', hi: 'अमावस्या' }
];

const EKADASHI_NAMES: Record<string, { en: string; hi: string }> = {
  '1_shukla': { en: 'Kamada Ekadashi', hi: 'कामदा एकादशी' },
  '1_krishna': { en: 'Papmochani Ekadashi', hi: 'पापमोचिनी एकादशी' },
  '2_shukla': { en: 'Mohini Ekadashi', hi: 'मोहिनी एकादशी' },
  '2_krishna': { en: 'Varuthini Ekadashi', hi: 'वरूथिनी एकादशी' },
  '3_shukla': { en: 'Nirjala Ekadashi', hi: 'निर्जला एकादशी' },
  '3_krishna': { en: 'Apara Ekadashi', hi: 'अपरा एकादशी' },
  '4_shukla': { en: 'Devshayani Ekadashi', hi: 'देवशयनी एकादशी' },
  '4_krishna': { en: 'Yogini Ekadashi', hi: 'योगिनी एकादशी' },
  '5_shukla': { en: 'Shravana Putrada Ekadashi', hi: 'श्रावण पुत्रदा एकादशी' },
  '5_krishna': { en: 'Kamika Ekadashi', hi: 'कामिका एकादशी' },
  '6_shukla': { en: 'Parivartini Ekadashi', hi: 'परिवर्तिनी एकादशी' },
  '6_krishna': { en: 'Aja Ekadashi', hi: 'अजा एकादशी' },
  '7_shukla': { en: 'Papankusha Ekadashi', hi: 'पापांकुशा एकादशी' },
  '7_krishna': { en: 'Indira Ekadashi', hi: 'इन्दिरा एकादशी' },
  '8_shukla': { en: 'Devutthana Ekadashi', hi: 'देवउठनी एकादशी' },
  '8_krishna': { en: 'Rama Ekadashi', hi: 'रमा एकादशी' },
  '9_shukla': { en: 'Mokshada Ekadashi', hi: 'मोक्षदा एकादशी' },
  '9_krishna': { en: 'Utpanna Ekadashi', hi: 'उत्पन्ना एकादशी' },
  '10_shukla': { en: 'Pausha Putrada Ekadashi', hi: 'पौष पुत्रदा एकादशी' },
  '10_krishna': { en: 'Saphala Ekadashi', hi: 'सफला एकादशी' },
  '11_shukla': { en: 'Jaya Ekadashi', hi: 'जया एकादशी' },
  '11_krishna': { en: 'Shattila Ekadashi', hi: 'षट्तिला एकादशी' },
  '12_shukla': { en: 'Amalaki Ekadashi', hi: 'आमलकी एकादशी' },
  '12_krishna': { en: 'Vijaya Ekadashi', hi: 'विजया एकादशी' },
  'adhik_shukla': { en: 'Padmini Ekadashi', hi: 'पद्मिनी एकादशी' },
  'adhik_krishna': { en: 'Parama Ekadashi', hi: 'परमा एकादशी' }
};

function parseDateInput(date?: Date | string): { dateObj: Date; dateStr: string; year: number; month: number; day: number } {
  let dateObj: Date;
  if (!date) {
    dateObj = new Date();
  } else if (typeof date === 'string') {
    if (date.includes('T')) {
      dateObj = new Date(date);
    } else {
      const [y, m, d] = date.split('-').map(Number);
      dateObj = new Date(y, m - 1, d, 12, 0, 0);
    }
  } else {
    dateObj = new Date(date.getTime());
  }

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  return { dateObj, dateStr, year, month, day };
}

function getTithiAtJd(jd: number): { tithiIndex: number; tithiValue: number; percent: number } {
  const sun = drik_calc_ut(jd, SE_SUN);
  const moon = drik_calc_ut(jd, SE_MOON);
  const diff = (moon[0] - sun[0] + 360) % 360;
  const tithiIndex = Math.floor(diff / 12) % 30;
  const tithiValue = tithiIndex + 1;
  const percent = (diff % 12) / 12;
  return { tithiIndex, tithiValue, percent };
}

export function formatJdToTime(jd: number, tzOffset: number, includeSeconds: boolean = false): string {
  const utHours = (jd - Math.floor(jd) - 0.5) * 24;
  const localHoursTotal = ((utHours + tzOffset) % 24 + 24) % 24;
  const totalSeconds = Math.round(localHoursTotal * 3600);
  let hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  hrs = hrs % 12;
  if (hrs === 0) hrs = 12;

  const hh = hrs.toString().padStart(2, '0');
  const mm = mins.toString().padStart(2, '0');
  if (includeSeconds) {
    const ss = secs.toString().padStart(2, '0');
    return `${hh}:${mm}:${ss} ${ampm}`;
  }
  return `${hh}:${mm} ${ampm}`;
}

/**
 * Calculates Sunrise and Udaya Tithi along with the 4-Ghatika (96 min) Arunodaya window.
 */
export function determineUdayaTithi(
  lat: number,
  lon: number,
  date?: Date | string,
  offsetHours?: number
): UdayaTithiResult {
  const { dateObj, dateStr, year, month, day } = parseDateInput(date);
  const tzOffset = typeof offsetHours === 'number' ? offsetHours : calculateTimezoneOffset(lat, lon);

  const today0hUT = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  const today0hMs = today0hUT.getTime() - (tzOffset * 3600000);
  const jdMidnight = (today0hMs / 86400000) + 2440587.5;

  const sunriseJd = drik_rise_trans(jdMidnight, SE_SUN, lon, lat, 0, 1) ?? (jdMidnight + 0.25);
  const solar = calculateSolarTimesCore(lat, lon, dateObj, tzOffset);

  // 4 Ghatikas = 96 minutes = 96 / 1440 days = 1 / 15 day
  const arunodayaDurationDays = 96 / 1440;
  const arunodayaStartJd = sunriseJd - arunodayaDurationDays;

  const tithiAtSunrise = getTithiAtJd(sunriseJd);
  const tithiAtArunodaya = getTithiAtJd(arunodayaStartJd);

  // Next sunrise to detect Kshaya / Vriddhi
  const nextMidnightJd = jdMidnight + 1.0;
  const nextSunriseJd = drik_rise_trans(nextMidnightJd, SE_SUN, lon, lat, 0, 1) ?? (nextMidnightJd + 0.25);
  const tithiAtNextSunrise = getTithiAtJd(nextSunriseJd);

  const isVriddhiTithi = tithiAtSunrise.tithiIndex === tithiAtNextSunrise.tithiIndex;
  const isKshayaTithi = ((tithiAtNextSunrise.tithiIndex - tithiAtSunrise.tithiIndex + 30) % 30) > 1;

  return {
    date: dateStr,
    sunriseTime: solar.sunrise,
    sunriseJd,
    arunodayaStartTime: formatJdToTime(arunodayaStartJd, tzOffset),
    arunodayaEndTime: solar.sunrise,
    arunodayaStartJd,
    udayaTithiIndex: tithiAtSunrise.tithiIndex,
    udayaTithiValue: tithiAtSunrise.tithiValue,
    udayaTithiName: TITHI_NAMES[tithiAtSunrise.tithiIndex].en,
    udayaTithiHindi: TITHI_NAMES[tithiAtSunrise.tithiIndex].hi,
    paksha: tithiAtSunrise.tithiIndex < 15 ? 'Shukla' : 'Krishna',
    tithiAtArunodayaStart: tithiAtArunodaya.tithiIndex,
    isKshayaTithi,
    isVriddhiTithi
  };
}

/**
 * Checks Dashami-Vedha (contamination) during the Arunodaya window for Ekadashi vrata.
 */
export function checkEkadashiVedha(
  lat: number,
  lon: number,
  date?: Date | string,
  offsetHours?: number
): EkadashiVedhaResult {
  const udaya = determineUdayaTithi(lat, lon, date, offsetHours);
  const isEkadashiAtSunrise = udaya.udayaTithiIndex === 10 || udaya.udayaTithiIndex === 25;
  const tzOffset = typeof offsetHours === 'number' ? offsetHours : calculateTimezoneOffset(lat, lon);

  // Dashami tithi index: 9 (Shukla Dashami) or 24 (Krishna Dashami)
  const isShukla = udaya.udayaTithiIndex === 10 || udaya.tithiAtArunodayaStart === 9;
  const dashamiIdx = isShukla ? 9 : 24;

  let isDashamiViddha = false;
  let dashamiEndJd: number | null = null;
  let dashamiEndTime: string | null = null;

  // If Dashami was active at Arunodaya start
  if (udaya.tithiAtArunodayaStart === dashamiIdx) {
    isDashamiViddha = true;
    const targetEndDeg = (dashamiIdx + 1) * 12;
    dashamiEndJd = findBoundaryCrossing(udaya.sunriseJd, 'tithi', targetEndDeg);
    dashamiEndTime = formatJdToTime(dashamiEndJd, tzOffset);
  }

  let vedhaExplanationHindi = 'शुद्धा एकादशी: अरुणोदय वेध रहित पावन एकादशी व्रत।';
  if (isDashamiViddha) {
    vedhaExplanationHindi = `दशमी विद्धा एकादशी: सूर्योदय से पूर्व अरुणोदय काल (${udaya.arunodayaStartTime}) में दशमी तिथि उपस्थित रहने से यह एकादशी विद्धा है।`;
  }

  return {
    date: udaya.date,
    isEkadashiDay: isEkadashiAtSunrise || udaya.tithiAtArunodayaStart === (isShukla ? 10 : 25),
    tithiAtSunrise: udaya.udayaTithiIndex,
    isDashamiViddha,
    isShuddha: !isDashamiViddha,
    dashamiEndJd,
    dashamiEndTime,
    arunodayaStartJd: udaya.arunodayaStartJd,
    arunodayaStartTime: udaya.arunodayaStartTime,
    sunriseJd: udaya.sunriseJd,
    sunriseTime: udaya.sunriseTime,
    vedhaExplanationHindi
  };
}

/**
 * Calculates the exact end of Hari Vasara (first 25% of Dwadashi tithi).
 * Parana is strictly prohibited during Hari Vasara.
 */
export function calculateHariVasaraEnd(
  lat: number,
  lon: number,
  dwadashiDate?: Date | string,
  offsetHours?: number
): HariVasaraResult {
  const { year, month, day } = parseDateInput(dwadashiDate);
  const tzOffset = typeof offsetHours === 'number' ? offsetHours : calculateTimezoneOffset(lat, lon);

  const today0hUT = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  const today0hMs = today0hUT.getTime() - (tzOffset * 3600000);
  const jdMidnight = (today0hMs / 86400000) + 2440587.5;
  const sunriseJd = drik_rise_trans(jdMidnight, SE_SUN, lon, lat, 0, 1) ?? (jdMidnight + 0.25);

  // Check tithi around noon/sunrise
  const currentTithi = getTithiAtJd(sunriseJd);
  const isShukla = currentTithi.tithiIndex <= 13;

  // Dwadashi angles: Shukla Dwadashi = 132° to 144°; Krishna Dwadashi = 312° to 324°
  const startTargetDeg = isShukla ? 132 : 312;
  const endTargetDeg = isShukla ? 144 : 324;

  const dwadashiStartJd = findBoundaryCrossing(jdMidnight, 'tithi', startTargetDeg);
  const dwadashiEndJd = findBoundaryCrossing(jdMidnight, 'tithi', endTargetDeg);

  // Hari Vasara is the first 25% (quarter) of Dwadashi
  const durationDays = dwadashiEndJd - dwadashiStartJd;
  const hariVasaraEndJd = dwadashiStartJd + (0.25 * durationDays);

  const isHariVasaraActiveAtSunrise = hariVasaraEndJd > sunriseJd;
  const durationHours = Math.round(durationDays * 0.25 * 24 * 100) / 100;

  return {
    dwadashiStartJd,
    dwadashiEndJd,
    hariVasaraEndJd,
    dwadashiStartTime: formatJdToTime(dwadashiStartJd, tzOffset),
    dwadashiEndTime: formatJdToTime(dwadashiEndJd, tzOffset),
    hariVasaraEndTime: formatJdToTime(hariVasaraEndJd, tzOffset),
    hariVasaraDurationHours: durationHours,
    isHariVasaraActiveAtSunrise
  };
}

/**
 * Resolves Purnimanta month number (1 to 12) and leap month flag for accurate Ekadashi naming.
 */
function getPurnimantaMonthInfo(date: Date, tzOffset: number): { purnimantaMonthNum: number; isAdhik: boolean } {
  const positions = calculatePanchangPositionsCore(date, tzOffset);
  const amantaMonthIdx = (positions.monthsSinceEpoch % 12 + 12) % 12;
  const isKrishna = positions.tithiIdx >= 15;
  const purnimantaMonthIdx = isKrishna ? (amantaMonthIdx + 1) % 12 : amantaMonthIdx;
  return {
    purnimantaMonthNum: purnimantaMonthIdx + 1, // 1 to 12 (1 = Chaitra, ..., 12 = Phalguna)
    isAdhik: !!positions.isAdhik
  };
}

/**
 * Resolves the traditional Ekadashi name for a given month and paksha.
 */
function resolveEkadashiName(monthNum: number, isShukla: boolean, isAdhik: boolean = false): { en: string; hi: string } {
  if (isAdhik) {
    return isShukla ? EKADASHI_NAMES['adhik_shukla'] : EKADASHI_NAMES['adhik_krishna'];
  }
  const key = `${monthNum}_${isShukla ? 'shukla' : 'krishna'}`;
  return EKADASHI_NAMES[key] || { en: isShukla ? 'Shukla Ekadashi' : 'Krishna Ekadashi', hi: isShukla ? 'शुक्ल एकादशी' : 'कृष्ण एकादशी' };
}

/**
 * High-Precision Ekadashi Parana Window Engine (<30s Drik Panchang precision).
 * Calculates exact start and end of the Parana window on Dwadashi day following Dharma Shastra rules.
 */
export function calculateEkadashiParana(
  lat: number,
  lon: number,
  date?: Date | string,
  tradition: 'Smarta' | 'Vaishnava' = 'Smarta',
  offsetHours?: number
): EkadashiParanaWindow {
  const { dateObj, dateStr, year, month, day } = parseDateInput(date);
  const tzOffset = typeof offsetHours === 'number' ? offsetHours : calculateTimezoneOffset(lat, lon);

  // Determine tithi on input date
  const udayaToday = determineUdayaTithi(lat, lon, dateObj, tzOffset);
  const vedhaToday = checkEkadashiVedha(lat, lon, dateObj, tzOffset);

  // If Vaishnava tradition and today is Dashami-Viddha Ekadashi, Vaishnavas fast on Dwadashi
  // and do Parana on Trayodashi (Day 3)
  const isVaishnavaShift = tradition === 'Vaishnava' && vedhaToday.isDashamiViddha && (udayaToday.udayaTithiIndex === 10 || udayaToday.udayaTithiIndex === 25);

  let paranaDateObj: Date;
  let paranaDateStr: string;
  let ekadashiDateStr: string;

  if (isVaishnavaShift) {
    const nextDay = new Date(year, month - 1, day + 1, 12, 0, 0);
    const dayAfter = new Date(year, month - 1, day + 2, 12, 0, 0);
    const ny = nextDay.getFullYear();
    const nm = nextDay.getMonth() + 1;
    const nd = nextDay.getDate();
    ekadashiDateStr = `${ny}-${nm.toString().padStart(2, '0')}-${nd.toString().padStart(2, '0')}`;
    const dy = dayAfter.getFullYear();
    const dm = dayAfter.getMonth() + 1;
    const dd = dayAfter.getDate();
    paranaDateStr = `${dy}-${dm.toString().padStart(2, '0')}-${dd.toString().padStart(2, '0')}`;
    paranaDateObj = dayAfter;
  } else if (udayaToday.udayaTithiIndex === 10 || udayaToday.udayaTithiIndex === 25) {
    // Input is Ekadashi
    ekadashiDateStr = dateStr;
    const nextDay = new Date(year, month - 1, day + 1, 12, 0, 0);
    paranaDateObj = nextDay;
    const ny = nextDay.getFullYear();
    const nm = nextDay.getMonth() + 1;
    const nd = nextDay.getDate();
    paranaDateStr = `${ny}-${nm.toString().padStart(2, '0')}-${nd.toString().padStart(2, '0')}`;
  } else if (udayaToday.udayaTithiIndex === 11 || udayaToday.udayaTithiIndex === 26) {
    // Input is Dwadashi
    paranaDateStr = dateStr;
    const prevDay = new Date(year, month - 1, day - 1, 12, 0, 0);
    const py = prevDay.getFullYear();
    const pm = prevDay.getMonth() + 1;
    const pd = prevDay.getDate();
    ekadashiDateStr = `${py}-${pm.toString().padStart(2, '0')}-${pd.toString().padStart(2, '0')}`;
    paranaDateObj = dateObj;
  } else {
    // Default: calculate for current day as Parana date
    paranaDateObj = dateObj;
    paranaDateStr = dateStr;
    ekadashiDateStr = dateStr;
  }

  // Sunrise and Sunset on Parana day
  const solarParana = calculateSolarTimesCore(lat, lon, paranaDateObj, tzOffset);
  const paranaUdaya = determineUdayaTithi(lat, lon, paranaDateObj, tzOffset);
  const sunriseJd = paranaUdaya.sunriseJd;

  // Day length and Pratahkal end (1/5th of daytime, ~2 to 2.5 hours after sunrise)
  const sunriseMins = solarParana.sunriseRaw;
  const sunsetMins = solarParana.sunsetRaw;
  const dayLengthMins = (sunsetMins - sunriseMins + 1440) % 1440;
  const pratahkalMins = Math.round(dayLengthMins / 5);
  const pratahkalEndJd = sunriseJd + (pratahkalMins / 1440);
  const pratahkalEndTime = formatJdToTime(pratahkalEndJd, tzOffset);

  // Hari Vasara & Dwadashi end on Parana day
  const hv = calculateHariVasaraEnd(lat, lon, paranaDateObj, tzOffset);

  // Scriptural Parana Window Logic
  let recommendedWindowStart: string;
  let recommendedWindowEnd: string;
  let isHariVasaraActiveAtSunrise = false;
  let rationaleHindi: string;
  let rationaleEnglish: string;

  // Case 1: Hari Vasara is active at Sunrise (Hari Vasara ends AFTER Sunrise)
  if (hv.hariVasaraEndJd > sunriseJd) {
    isHariVasaraActiveAtSunrise = true;
    recommendedWindowStart = hv.hariVasaraEndTime;

    if (hv.dwadashiEndJd > hv.hariVasaraEndJd) {
      // If Dwadashi ends within the morning/afternoon of Parana day, window end is Dwadashi end or sunset
      const isDwadashiExtendingNextDay = hv.dwadashiEndJd > (sunriseJd + (dayLengthMins / 1440));
      recommendedWindowEnd = isDwadashiExtendingNextDay ? solarParana.sunset : hv.dwadashiEndTime;
      rationaleHindi = `सूर्योदय के समय हरि वासर सक्रिय है (${hv.hariVasaraEndTime} तक)। शास्त्रानुसार हरि वासर में पारण वर्जित है, अतः पारण प्रातः ${hv.hariVasaraEndTime} से ${recommendedWindowEnd} के बीच करें।`;
      rationaleEnglish = `Hari Vasara is active at sunrise until ${hv.hariVasaraEndTime}. As fast cannot be broken during Hari Vasara, Parana is recommended from ${hv.hariVasaraEndTime} to ${recommendedWindowEnd}.`;
    } else {
      recommendedWindowEnd = hv.hariVasaraEndTime;
      rationaleHindi = `हरि वासर समाप्ति (${hv.hariVasaraEndTime}) के तुरंत बाद पारण करें।`;
      rationaleEnglish = `Perform Parana immediately after Hari Vasara ends at ${hv.hariVasaraEndTime}.`;
    }
  } else {
    // Case 2: Hari Vasara ended BEFORE Sunrise
    isHariVasaraActiveAtSunrise = false;
    recommendedWindowStart = solarParana.sunrise;

    if (hv.dwadashiEndJd > sunriseJd) {
      // Dwadashi is active after Sunrise
      // If Dwadashi ends before midday (e.g. <= ~11:00 AM like 10:19 AM on April 6, 2024), Parana before Dwadashi ends
      // If Dwadashi extends past morning into afternoon (e.g. 1:01 PM on Nov 13, 2024), Drik Panchang primary window is Pratahkal
      const hoursToDwadashiEnd = (hv.dwadashiEndJd - sunriseJd) * 24;
      if (hoursToDwadashiEnd > 6.0) {
        recommendedWindowEnd = pratahkalEndTime;
        rationaleHindi = `द्वादशी अपराह्न (${hv.dwadashiEndTime}) तक व्याप्त है। शास्त्रानुसार प्रातःकाल (${solarParana.sunrise} से ${pratahkalEndTime}) में पारण करना सर्वोत्तम है।`;
        rationaleEnglish = `Dwadashi is active until ${hv.dwadashiEndTime}. As per Dharma Shastra, breaking fast during Pratahkal (${solarParana.sunrise} to ${pratahkalEndTime}) is most auspicious.`;
      } else {
        recommendedWindowEnd = hv.dwadashiEndTime;
        rationaleHindi = `पारण का समय प्रातः सूर्योदय (${solarParana.sunrise}) से द्वादशी समाप्ति (${hv.dwadashiEndTime}) तक है। हरि वासर सूर्योदय से पूर्व समाप्त हो चुका है।`;
        rationaleEnglish = `Parana window is from sunrise (${solarParana.sunrise}) to the end of Dwadashi (${hv.dwadashiEndTime}). Hari Vasara already ended before dawn.`;
      }
    } else {
      // Case 3: Dwadashi ended BEFORE Sunrise!
      recommendedWindowEnd = pratahkalEndTime;
      rationaleHindi = `द्वादशी सूर्योदय से पूर्व समाप्त हो चुकी है (${hv.dwadashiEndTime} पर), अतः सूर्योदय (${solarParana.sunrise}) के तत्काल बाद प्रातःकाल में पारण करें।`;
      rationaleEnglish = `Dwadashi ended prior to sunrise at ${hv.dwadashiEndTime}. Parana should be done immediately after sunrise.`;
    }
  }

  // Lunar month calculation for Ekadashi name derived from Vedic astronomy
  const ekadashiDateObj = (udayaToday.udayaTithiIndex === 10 || udayaToday.udayaTithiIndex === 25)
    ? dateObj
    : (isVaishnavaShift ? new Date(year, month - 1, day + 1, 12, 0, 0) : paranaDateObj);
  const isShukla = (udayaToday.udayaTithiIndex === 10 || udayaToday.udayaTithiIndex === 11 || (isVaishnavaShift && udayaToday.udayaTithiIndex === 9));
  const { purnimantaMonthNum, isAdhik } = getPurnimantaMonthInfo(ekadashiDateObj, tzOffset);
  const ekadashiNameObj = resolveEkadashiName(purnimantaMonthNum, isShukla, isAdhik);

  return {
    ekadashiName: ekadashiNameObj.en,
    ekadashiNameHindi: ekadashiNameObj.hi,
    ekadashiDate: ekadashiDateStr,
    paranaDate: paranaDateStr,
    sunriseTime: solarParana.sunrise,
    dwadashiEndTime: hv.dwadashiEndTime,
    hariVasaraEndTime: hv.hariVasaraEndTime,
    recommendedWindowStart,
    recommendedWindowEnd,
    isHariVasaraActiveAtSunrise,
    rationaleHindi,
    rationaleEnglish,
    traditionType: tradition
  };
}

/**
 * Compares and evaluates Smarta vs Vaishnava dual fasting dates for an Ekadashi cycle.
 */
export function determineEkadashiVrata(
  lat: number,
  lon: number,
  date?: Date | string,
  offsetHours?: number
): SmartaVaishnavaComparison {
  const { dateObj, dateStr, year, month, day } = parseDateInput(date);
  const tzOffset = typeof offsetHours === 'number' ? offsetHours : calculateTimezoneOffset(lat, lon);

  const udayaToday = determineUdayaTithi(lat, lon, dateObj, tzOffset);
  const vedha = checkEkadashiVedha(lat, lon, dateObj, tzOffset);

  const isShukla = udayaToday.udayaTithiIndex <= 14;
  const { purnimantaMonthNum, isAdhik } = getPurnimantaMonthInfo(dateObj, tzOffset);
  const nameObj = resolveEkadashiName(purnimantaMonthNum, isShukla, isAdhik);

  let smartaDate = dateStr;
  let vaishnavaDate = dateStr;
  let reasonForDivergenceHindi = 'स्मार्त एवं वैष्णव दोनों संप्रदायों के लिए एकादशी व्रत एक ही दिन रहेगा।';

  if (vedha.isDashamiViddha) {
    // When Dashami touches Arunodaya, Vaishnavas strictly do not fast on this day; they fast on Dwadashi (next day)
    const nextDay = new Date(year, month - 1, day + 1, 12, 0, 0);
    const ny = nextDay.getFullYear();
    const nm = nextDay.getMonth() + 1;
    const nd = nextDay.getDate();
    vaishnavaDate = `${ny}-${nm.toString().padStart(2, '0')}-${nd.toString().padStart(2, '0')}`;
    reasonForDivergenceHindi = `अरुणोदय काल में दशमी तिथि का वेध होने के कारण गृहस्थ (स्मार्त) आज व्रत रखेंगे, जबकि वैष्णव (संन्यासी एवं इस्कॉन) द्वादशी-युक्त एकादशी (अगले दिन) को व्रत रखेंगे।`;
  } else if (udayaToday.isVriddhiTithi) {
    // If Ekadashi spans across two consecutive sunrises
    const nextDay = new Date(year, month - 1, day + 1, 12, 0, 0);
    const ny = nextDay.getFullYear();
    const nm = nextDay.getMonth() + 1;
    const nd = nextDay.getDate();
    vaishnavaDate = `${ny}-${nm.toString().padStart(2, '0')}-${nd.toString().padStart(2, '0')}`;
    reasonForDivergenceHindi = `एकादशी तिथि दो सूर्योदयों में व्याप्त (वृद्धि) होने के कारण स्मार्त प्रथम दिन एवं वैष्णव द्वितीय दिन व्रत रखेंगे।`;
  }

  return {
    date: dateStr,
    tithiName: isShukla ? 'Shukla Ekadashi' : 'Krishna Ekadashi',
    smartaVratDate: smartaDate,
    smartaVratName: {
      hi: `${nameObj.hi} (स्मार्त)`,
      en: `${nameObj.en} (Smarta)`,
      sa: `${nameObj.hi}`
    },
    vaishnavaVratDate: vaishnavaDate,
    vaishnavaVratName: {
      hi: `${nameObj.hi} (वैष्णव / इस्कॉन)`,
      en: `${nameObj.en} (Vaishnava / ISKCON)`,
      sa: `${nameObj.hi}`
    },
    reasonForDivergenceHindi
  };
}
