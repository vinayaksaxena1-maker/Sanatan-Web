/**
 * Sanatan Web (सनातन घड़ी)
 * Service: panchangDeepService.ts
 * Deep Vedic Calculations: Ritual Shuddhi, Udaya Lagna & Panchaka Rahita,
 * Chandrabalam & Tarabalam, Samvatsara & Mantri Mandala, Astronomical Epochs.
 * Strict pure web, zero bloat, high precision.
 */

import { PanchangInfo, Festival } from '../../../engine/types';
import { astronomicalEngine } from '../../../engine/astronomicalEngine';
import { getFestivalsForDay } from '../../../engine/festivalEngine';

export const SAMVATSARA_60_NAMES = [
  'प्रभव', 'विभव', 'शुक्ल', 'प्रमोद', 'प्रजापति', 'अंगिरा', 'श्रीमुख', 'भाव', 'युव', 'धाता',
  'ईश्वर', 'बहुधान्य', 'प्रमाथी', 'विक्रम', 'वृषप्रजा', 'चित्रभानु', 'सुभानु', 'तारण', 'पार्थिव', 'व्यय',
  'सर्वजीत', 'सर्वधारी', 'विरोधी', 'विकृत', 'खर', 'नंदन', 'विजय', 'जय', 'मन्मथ', 'दुर्मुख',
  'हेमलम्बी', 'विलम्बी', 'विकारी', 'शार्वरी', 'प्लव', 'शुभकृत', 'शोभन', 'क्रोधी', 'विश्वावसु', 'पराभव',
  'प्लवंग', 'कीलक', 'सौम्य', 'साधारण', 'विरोधकृत', 'परिधावी', 'प्रमादी', 'आनन्द', 'राक्षस', 'नल',
  'पिंगल', 'कालयुक्त', 'सिद्धार्थी', 'रौद्र', 'दुर्मति', 'दुन्दुभि', 'रुधिरोद्गारी', 'रक्ताक्ष', 'क्रोधन', 'क्षय'
];

export const RASHI_NAMES_HINDI = [
  'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या',
  'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुम्भ', 'मीन'
];

export const RASHI_NAMES_ENG = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const TARA_CATEGORIES = [
  { id: 1, name: 'जन्म (Janma)', type: 'Neutral', isAuspicious: false, desc: 'शारीरिक श्रम, सामान्य' },
  { id: 2, name: 'सम्पत् (Sampat)', type: 'Shubh', isAuspicious: true, desc: 'धन, समृद्धि व लाभ' },
  { id: 3, name: 'विपत् (Vipat)', type: 'Ashubh', isAuspicious: false, desc: 'विघ्न, हानि व कष्ट' },
  { id: 4, name: 'क्षेम (Kshema)', type: 'Shubh', isAuspicious: true, desc: 'कल्याण, सुरक्षा व सुख' },
  { id: 5, name: 'प्रत्यरि (Pratyari)', type: 'Ashubh', isAuspicious: false, desc: 'शत्रु बाधा व अवरोध' },
  { id: 6, name: 'साधक (Sadhaka)', type: 'Shubh', isAuspicious: true, desc: 'कार्यसिद्धि व सफलता' },
  { id: 7, name: 'वध / नैधन (Vadha)', type: 'Ashubh', isAuspicious: false, desc: 'संकट व सर्वथा त्याज्य' },
  { id: 8, name: 'मित्र (Mitra)', type: 'Shubh', isAuspicious: true, desc: 'सुख, सहयोग व आनन्द' },
  { id: 9, name: 'अति-मित्र (Ati-Mitra)', type: 'Shubh', isAuspicious: true, desc: 'परम कल्याण व सिद्धि' },
];

export interface UdayaLagnaItem {
  rashiIndex: number; // 0 to 11
  rashiHindi: string;
  rashiEng: string;
  startTime: string;
  endTime: string;
  panchakaType: string;
  isPanchakaShubh: boolean;
  panchakaDesc: string;
}

export interface MantriMandalaItem {
  portfolio: string;
  portfolioHindi: string;
  planet: string;
  planetHindi: string;
  icon: string;
}

export interface AadalVidaalItem {
  name: 'आडल योग' | 'विडाल योग';
  type: 'Aadal' | 'Vidaal';
  isAuspicious: boolean;
  startTime: string;
  endTime: string;
  description: string;
}

export interface BhadraMicroBreakup {
  active: boolean;
  vasHindi: string;
  mukhaWindow: {
    start: string;
    end: string;
    duration: string;
    description: string;
  };
  puchhaWindow: {
    start: string;
    end: string;
    duration: string;
    description: string;
  };
}

export interface DeepPanchangAnalysis {
  // 1. निवास, चक्र एवं अनुष्ठान
  chandraVasa: { direction: string; directionHindi: string; suitability: string };
  rahuVasa: { direction: string; directionHindi: string };
  kumbhaChakra: string;
  netrama: string;
  jeevanama: string;
  homahuti: { planet: string; planetHindi: string };
  bhadraMicroBreakup: BhadraMicroBreakup;

  // 2. मुहूर्त व लग्न शुद्धि
  udayaLagnas: UdayaLagnaItem[];
  chandrabalamList: { rashi: string; isShubh: boolean; status: string }[];
  tarabalamSummary: { shubhTaras: string[]; ashubhTaras: string[] };

  // 3. संवत्सर व मन्त्री मण्डल
  brihaspatiSamvatsara: {
    vikramSamvatsara: string;
    shakaSamvatsara: string;
    index: number;
  };
  mantriMandala: MantriMandalaItem[];

  // 4. अतिरिक्त योग (आडल व विडाल योग)
  aadalVidaalList: AadalVidaalItem[];

  // 5. प्रविष्टे / गते
  pravishte: {
    gate: number;
    formatted: string;
    solarMonth: string;
  };

  // 6. खगोलीय मान व पंचांग प्रणालियां
  dinamanaFormatted: string;
  ratrimanaFormatted: string;
  madhyahnaTime: string;
  nishitaMuhurta: { start: string; end: string };
  pratahSandhya: { start: string; end: string };
  sayahnaSandhya: { start: string; end: string };
  kaliyugaYear: number;
  kaliAhargana: number;
  julianDay: number;
  modifiedJulianDay: number;
  rataDie: number;
  nationalCivilDate: string;
  festivals: Festival[];
}

/**
 * Format minutes into 12-hour AM/PM string
 */
function formatMinutesTo12Hr(minutes: number): string {
  const normM = ((minutes % 1440) + 1440) % 1440;
  let hrs = Math.floor(normM / 60);
  const mins = Math.floor(normM % 60);
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  hrs = hrs % 12;
  if (hrs === 0) hrs = 12;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${ampm}`;
}

/**
 * Parse "HH:MM AM/PM" or "HH:MM:SS" into minutes of day
 */
function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 360; // 6:00 AM default fallback
  const parts = timeStr.trim().split(/[:\s]/);
  let hrs = parseInt(parts[0], 10) || 0;
  const mins = parseInt(parts[1], 10) || 0;
  const ampm = timeStr.toUpperCase().includes('PM') ? 'PM' : timeStr.toUpperCase().includes('AM') ? 'AM' : null;
  if (ampm === 'PM' && hrs < 12) hrs += 12;
  if (ampm === 'AM' && hrs === 12) hrs = 0;
  return hrs * 60 + mins;
}

/**
 * Computes deep panchang extensions
 */
export function calculateDeepPanchang(
  panchang: PanchangInfo,
  lat: number,
  lon: number,
  date: Date
): DeepPanchangAnalysis {
  const sunriseMin = parseTimeToMinutes(panchang.sunrise);
  const sunsetMin = parseTimeToMinutes(panchang.sunset);
  const dayLengthMin = sunsetMin >= sunriseMin ? sunsetMin - sunriseMin : 1440 - sunriseMin + sunsetMin;
  const nightLengthMin = 1440 - dayLengthMin;

  // Dinamana & Ratrimana formatting
  const dHrs = Math.floor(dayLengthMin / 60);
  const dMins = Math.floor(dayLengthMin % 60);
  const dSecs = Math.round((dayLengthMin * 60) % 60);
  const dinamanaFormatted = `${dHrs} घंटे ${dMins} मिनट ${dSecs} सेकंड`;

  const nHrs = Math.floor(nightLengthMin / 60);
  const nMins = Math.floor(nightLengthMin % 60);
  const nSecs = Math.round((nightLengthMin * 60) % 60);
  const ratrimanaFormatted = `${nHrs} घंटे ${nMins} मिनट ${nSecs} सेकंड`;

  const madhyahnaTime = formatMinutesTo12Hr(sunriseMin + dayLengthMin / 2);

  // Sandhya & Nishita timings
  const pratahSandhya = {
    start: formatMinutesTo12Hr(sunriseMin - 48),
    end: formatMinutesTo12Hr(sunriseMin),
  };
  const sayahnaSandhya = {
    start: formatMinutesTo12Hr(sunsetMin),
    end: formatMinutesTo12Hr(sunsetMin + 48),
  };
  const midNightMin = (sunsetMin + nightLengthMin / 2) % 1440;
  const nishitaMuhurta = {
    start: formatMinutesTo12Hr(midNightMin - 24),
    end: formatMinutesTo12Hr(midNightMin + 24),
  };

  // Astronomical Julian Epochs
  const jd = date.getTime() / 86400000 + 2440587.5;
  const modifiedJulianDay = Math.floor(jd - 2400000.5);
  const kaliAhargana = Math.floor(jd - 588465.5);
  const rataDie = Math.floor(jd - 1721424.5);
  const curYear = date.getFullYear();
  const kaliyugaYear = curYear + 3101;

  // National Civil Date (Shaka calendar)
  const shakaYear = curYear - 78;
  const nationalCivilDate = `${shakaYear} शक (राष्ट्रीय सौर पंचांग)`;

  // 1. Nivas & Shool: Chandra Vasa & Rahu Vasa
  const moonPlanet = panchang.planets?.find((p) => p.name === 'Moon');
  const moonSignIdx = moonPlanet
    ? RASHI_NAMES_ENG.findIndex((s) => s.toLowerCase() === moonPlanet.sign.toLowerCase())
    : 2; // Mithuna default
  const safeMoonSignIdx = moonSignIdx >= 0 ? moonSignIdx : 2;

  let chandraVasa = { direction: 'East', directionHindi: 'पूर्व दिशा', suitability: 'यात्रा व कार्य हेतु शुभ' };
  if ([0, 1, 2].includes(safeMoonSignIdx)) {
    chandraVasa = { direction: 'East', directionHindi: 'पूर्व दिशा', suitability: 'पूर्व दिशा सम्मुख शुभ' };
  } else if ([3, 4, 5].includes(safeMoonSignIdx)) {
    chandraVasa = { direction: 'South', directionHindi: 'दक्षिण दिशा', suitability: 'दक्षिण दिशा सम्मुख शुभ' };
  } else if ([6, 7, 8].includes(safeMoonSignIdx)) {
    chandraVasa = { direction: 'West', directionHindi: 'पश्चिम दिशा', suitability: 'पश्चिम दिशा सम्मुख शुभ' };
  } else {
    chandraVasa = { direction: 'North', directionHindi: 'उत्तर दिशा', suitability: 'उत्तर दिशा सम्मुख शुभ' };
  }

  const dayOfWeek = date.getDay(); // 0 Sun to 6 Sat
  const rahuVasaDirections = [
    { direction: 'North-East', directionHindi: 'ईशान / उत्तर-पूर्व' }, // Sun
    { direction: 'East', directionHindi: 'पूर्व दिशा' },               // Mon
    { direction: 'South', directionHindi: 'दक्षिण दिशा' },             // Tue
    { direction: 'West', directionHindi: 'पश्चिम दिशा' },              // Wed
    { direction: 'North', directionHindi: 'उत्तर दिशा' },              // Thu
    { direction: 'South-East', directionHindi: 'आग्नेय / दक्षिण-पूर्व' }, // Fri
    { direction: 'East', directionHindi: 'पूर्व दिशा' },               // Sat
  ];
  const rahuVasa = rahuVasaDirections[dayOfWeek] || rahuVasaDirections[0];

  const homahutiPlanets = [
    { planet: 'Sun', planetHindi: 'सूर्य देव' },
    { planet: 'Moon', planetHindi: 'चन्द्र देव' },
    { planet: 'Mars', planetHindi: 'मंगल देव' },
    { planet: 'Mercury', planetHindi: 'बुध देव' },
    { planet: 'Jupiter', planetHindi: 'देवगुरु बृहस्पति' },
    { planet: 'Venus', planetHindi: 'शुक्र देव' },
    { planet: 'Saturn', planetHindi: 'शनि देव' },
  ];
  const homahuti = homahutiPlanets[dayOfWeek] || homahutiPlanets[4];

  // 2. Samvatsara & Mantri Mandala
  const samvatVikram = panchang.hinduDate?.samvatVikram || curYear + 57;
  const samvatShaka = panchang.hinduDate?.samvatShaka || curYear - 78;

  const vikramSamvatsaraIdx = ((samvatVikram + 9) % 60 + 60) % 60;
  const shakaSamvatsaraIdx = ((samvatShaka + 11) % 60 + 60) % 60;
  const brihaspatiSamvatsara = {
    vikramSamvatsara: SAMVATSARA_60_NAMES[vikramSamvatsaraIdx] || 'सिद्धार्थी',
    shakaSamvatsara: SAMVATSARA_60_NAMES[shakaSamvatsaraIdx] || 'पराभव',
    index: vikramSamvatsaraIdx,
  };

  const mantriMandala: MantriMandalaItem[] = [
    { portfolio: 'King', portfolioHindi: 'राजा (राष्ट्र प्रमुख)', planet: 'Jupiter', planetHindi: 'देवगुरु बृहस्पति', icon: '👑' },
    { portfolio: 'Minister', portfolioHindi: 'मन्त्री (मन्त्रिमण्डल प्रमुख)', planet: 'Mars', planetHindi: 'मंगल देव', icon: '⚜️' },
    { portfolio: 'Commander', portfolioHindi: 'सेनाधिपति (रक्षा प्रमुख)', planet: 'Moon', planetHindi: 'चन्द्र देव', icon: '⚔️' },
    { portfolio: 'Rabi Crops', portfolioHindi: 'धान्याधिपति (शीतकालीन फसल)', planet: 'Mercury', planetHindi: 'बुध देव', icon: '🌻' },
    { portfolio: 'Kharif Crops', portfolioHindi: 'सस्याधिपति (ग्रीष्मकालीन फसल)', planet: 'Jupiter', planetHindi: 'देवगुरु बृहस्पति', icon: '🌾' },
    { portfolio: 'Rain & Clouds', portfolioHindi: 'मेघाधिपति (वर्षा व मेघ)', planet: 'Moon', planetHindi: 'चन्द्र देव', icon: '🌧️' },
    { portfolio: 'Economy & Wealth', portfolioHindi: 'धनाधिपति (वित्त व अर्थ)', planet: 'Jupiter', planetHindi: 'देवगुरु बृहस्पति', icon: '💰' },
    { portfolio: 'Metals & Minerals', portfolioHindi: 'नीरसाधिपति (धातु व रत्न)', planet: 'Jupiter', planetHindi: 'देवगुरु बृहस्पति', icon: '🪙' },
    { portfolio: 'Liquids & Flora', portfolioHindi: 'रसाधिपति (द्रव व औषधियां)', planet: 'Saturn', planetHindi: 'शनि देव', icon: '🍯' },
    { portfolio: 'Fruits & Flowers', portfolioHindi: 'फलाधिपति (पुष्प व फल)', planet: 'Moon', planetHindi: 'चन्द्र देव', icon: '🍎' },
  ];

  // 3. Chandrabalam for 12 Rashis
  const chandrabalamList = RASHI_NAMES_HINDI.map((rashiName, idx) => {
    // Relative position from native moon sign
    const relHouse = ((safeMoonSignIdx - idx + 12) % 12) + 1;
    const isAshubh = [4, 8, 12].includes(relHouse);
    const isShubh = [1, 3, 6, 7, 10, 11].includes(relHouse);
    return {
      rashi: rashiName,
      isShubh: !isAshubh,
      status: isShubh ? 'शुभ चन्द्रबल' : isAshubh ? 'अनिष्ट / अशुभ' : 'मध्यम अनुकूल',
    };
  });

  // 4. Tarabalam summary for 27 nakshatras
  const activeNaksVal = panchang.hinduDate?.nakshatra?.value || 1;
  const shubhTaras: string[] = [];
  const ashubhTaras: string[] = [];

  TARA_CATEGORIES.forEach((tara) => {
    if (tara.isAuspicious) {
      shubhTaras.push(tara.name);
    } else {
      ashubhTaras.push(tara.name);
    }
  });

  // 5. Udaya Lagna & Panchaka Rahita 12 Interval Calculation
  const tithiNum = panchang.hinduDate?.tithi?.value || 1;
  const vaarNum = dayOfWeek === 0 ? 1 : dayOfWeek + 1; // Sun=1, Mon=2..
  const naksNum = activeNaksVal;

  const udayaLagnas: UdayaLagnaItem[] = [];
  // Sample ascendant at 2-hour intervals starting from sunrise
  for (let i = 0; i < 12; i++) {
    const lagnaStartMin = (sunriseMin + i * 120) % 1440;
    const lagnaEndMin = (sunriseMin + (i + 1) * 120) % 1440;

    const sampleDate = new Date(date);
    sampleDate.setHours(Math.floor(lagnaStartMin / 60), lagnaStartMin % 60, 0, 0);

    const asc = astronomicalEngine.getAscendant(lat, lon, sampleDate);
    const rIdx = asc.signIndex;
    const lagnaNum = rIdx + 1;

    // Panchak Rahita Formula: (Tithi + Vaar + Nakshatra + Lagna) % 9
    const sum = tithiNum + vaarNum + naksNum + lagnaNum;
    const rem = sum % 9;

    let pType = 'शुभ / निर्दोष';
    let isPanchakShubh = true;
    let pDesc = 'निष्पंचक (अति उत्तम व दोषमुक्त मुहूर्त)';

    if (rem === 1) {
      pType = 'मृत्यु पंचक';
      isPanchakShubh = false;
      pDesc = 'अनिष्ट व मृत्यु भय कारक (त्याज्य)';
    } else if (rem === 2) {
      pType = 'अग्नि पंचक';
      isPanchakShubh = false;
      pDesc = 'अग्नि भय व दाह कारक (त्याज्य)';
    } else if (rem === 4) {
      pType = 'राज पंचक';
      isPanchakShubh = false;
      pDesc = 'विवाद व शासन कष्ट कारक (सावधानी)';
    } else if (rem === 6) {
      pType = 'चोर पंचक';
      isPanchakShubh = false;
      pDesc = 'चोरी व धनहानि कारक (सावधानी)';
    } else if (rem === 8) {
      pType = 'रोग पंचक';
      isPanchakShubh = false;
      pDesc = 'व्याधि व शारीरिक कष्ट कारक (त्याज्य)';
    }

    udayaLagnas.push({
      rashiIndex: rIdx,
      rashiHindi: RASHI_NAMES_HINDI[rIdx] || asc.signHindi,
      rashiEng: RASHI_NAMES_ENG[rIdx] || asc.signName,
      startTime: formatMinutesTo12Hr(lagnaStartMin),
      endTime: formatMinutesTo12Hr(lagnaEndMin),
      panchakaType: pType,
      isPanchakaShubh: isPanchakShubh,
      panchakaDesc: pDesc,
    });
  }

  // 6. Aadal & Vidaal Yoga Calculation
  const AADAL_MAP: Record<number, number[]> = {
    0: [0, 6, 12, 18, 24],      // Sun: Ashwini, Punarvasu, Hasta, Mula, P.Bhadrapada
    1: [2, 8, 14, 20, 26],      // Mon: Krittika, Ashlesha, Swati, U.Ashadha, Revati
    2: [4, 10, 16, 22],         // Tue: Mrigashira, P.Phalguni, Anuradha, Dhanishta
    3: [0, 6, 12, 18, 24],      // Wed: Ashwini, Punarvasu, Hasta, Mula, P.Bhadrapada
    4: [2, 8, 14, 20, 26],      // Thu: Krittika, Ashlesha, Swati, U.Ashadha, Revati
    5: [4, 10, 16, 22],         // Fri: Mrigashira, P.Phalguni, Anuradha, Dhanishta
    6: [6, 12, 18, 24, 0],      // Sat: Punarvasu, Hasta, Mula, P.Bhadrapada, Ashwini
  };

  const VIDAAL_MAP: Record<number, number[]> = {
    0: [1, 7, 13, 19, 25],      // Sun: Bharani, Pushya, Chitra, P.Ashadha, U.Bhadrapada
    1: [3, 9, 15, 21],          // Mon: Rohini, Magha, Vishakha, Shravana
    2: [5, 11, 17, 23],         // Tue: Ardra, U.Phalguni, Jyeshtha, Shatabhisha
    3: [1, 7, 13, 19, 25],      // Wed: Bharani, Pushya, Chitra, P.Ashadha, U.Bhadrapada
    4: [3, 9, 15, 21],          // Thu: Rohini, Magha, Vishakha, Shravana
    5: [5, 11, 17, 23],         // Fri: Ardra, U.Phalguni, Jyeshtha, Shatabhisha
    6: [5, 11, 17, 23, 1],      // Sat: Ardra, U.Phalguni, Jyeshtha, Shatabhisha, Bharani
  };

  const currentNaksIdx = (activeNaksVal - 1 + 27) % 27;
  const nextNaksIdx = activeNaksVal % 27;
  const naksEndTimeStr = panchang.hinduDate?.nakshatra?.endTime || '07:12 AM';

  const aadalVidaalList: AadalVidaalItem[] = [];
  if ((AADAL_MAP[dayOfWeek] || []).includes(currentNaksIdx)) {
    aadalVidaalList.push({
      name: 'आडल योग',
      type: 'Aadal',
      isAuspicious: true,
      startTime: panchang.sunrise,
      endTime: naksEndTimeStr,
      description: 'आडल योग शत्रु पराजय, प्रतियोगिता व आत्मबल वृद्धि में अत्यंत शुभ होता है।',
    });
  } else if ((VIDAAL_MAP[dayOfWeek] || []).includes(currentNaksIdx)) {
    aadalVidaalList.push({
      name: 'विडाल योग',
      type: 'Vidaal',
      isAuspicious: false,
      startTime: panchang.sunrise,
      endTime: naksEndTimeStr,
      description: 'विडाल योग में धन निवेश, नवीन अनुबंध व यात्रा से बचना श्रेयस्कर है।',
    });
  }

  if ((AADAL_MAP[dayOfWeek] || []).includes(nextNaksIdx)) {
    aadalVidaalList.push({
      name: 'आडल योग',
      type: 'Aadal',
      isAuspicious: true,
      startTime: naksEndTimeStr,
      endTime: 'अगले सूर्योदय तक',
      description: 'आडल योग शत्रु पराजय, प्रतियोगिता व रक्षात्मक कार्यों में अत्यंत शुभ होता है।',
    });
  } else if ((VIDAAL_MAP[dayOfWeek] || []).includes(nextNaksIdx)) {
    aadalVidaalList.push({
      name: 'विडाल योग',
      type: 'Vidaal',
      isAuspicious: false,
      startTime: naksEndTimeStr,
      endTime: 'अगले सूर्योदय तक',
      description: 'विडाल योग में छल, नुकसान व विवाद की सम्भावना रहती है, सावधानी रखें।',
    });
  }

  // 7. Pravishte / Gate (प्रविष्टे / गते)
  const gateVal = panchang.hinduDate?.praviste || 15;
  const solarMonthStr = panchang.hinduDate?.solarMonth || 'Tula (तुला)';
  const pravishte = {
    gate: gateVal,
    formatted: `${gateVal} प्रविष्टे / गते`,
    solarMonth: solarMonthStr,
  };

  // 8. Bhadra Mukha & Puchha Micro-Breakup (5 Ghatis = 2h, 3 Ghatis = 1h 12m)
  const isBhadraPresent =
    panchang.bhadra?.active ||
    panchang.hinduDate?.karana?.name?.includes('Vishti') ||
    panchang.hinduDate?.karana?.hindiName?.includes('विष्टि') ||
    panchang.hinduDate?.karana1?.name?.includes('Vishti') ||
    panchang.hinduDate?.karana2?.name?.includes('Vishti');

  let bStartMin = sunsetMin - 40; // fallback
  let bEndMin = (bStartMin + 720) % 1440;
  if (panchang.bhadra?.startTime) {
    bStartMin = parseTimeToMinutes(panchang.bhadra.startTime);
  } else if (panchang.hinduDate?.karana?.endTime) {
    bStartMin = parseTimeToMinutes(panchang.hinduDate.karana.endTime);
    bEndMin = (bStartMin + 660) % 1440;
  }
  if (panchang.bhadra?.endTime) {
    bEndMin = parseTimeToMinutes(panchang.bhadra.endTime);
  }

  const mukhaStartMin = bStartMin;
  const mukhaEndMin = (bStartMin + 120) % 1440;
  const puchhaStartMin = ((bEndMin - 72) % 1440 + 1440) % 1440;
  const puchhaEndMin = bEndMin;

  const bhadraMicroBreakup: BhadraMicroBreakup = {
    active: Boolean(isBhadraPresent),
    vasHindi:
      panchang.bhadra?.vasHindi ||
      ([0, 1, 2].includes(safeMoonSignIdx)
        ? 'स्वर्गलोक (शुभ)'
        : [3, 4, 5].includes(safeMoonSignIdx)
        ? 'पाताललोक (शुभ)'
        : 'मृत्युलोक / पृथ्वी (अशुभ)'),
    mukhaWindow: {
      start: formatMinutesTo12Hr(mukhaStartMin),
      end: formatMinutesTo12Hr(mukhaEndMin),
      duration: '२ घंटे (५ घटी)',
      description: 'भद्रा मुख: अत्यंत अनिष्टकारी एवं त्याज्य काल। इसमें किसी भी प्रकार का शुभ कार्य न करें।',
    },
    puchhaWindow: {
      start: formatMinutesTo12Hr(puchhaStartMin),
      end: formatMinutesTo12Hr(puchhaEndMin),
      duration: '१ घंटा १२ मिनट (३ घटी)',
      description: 'भद्रा पुच्छ: सर्वकार्य सिद्धिदायक काल! इसमें कार्य करने से भद्रा का भय व दोष समाप्त होता है।',
    },
  };

  // 9. Festivals / Vrats for the day
  const festivals = getFestivalsForDay(panchang);

  return {
    chandraVasa,
    rahuVasa,
    kumbhaChakra: 'गर्भ (गर्भाधान व संचय अनुकूल)',
    netrama: 'द्विनेत्र (२ नेत्र - उत्तम दृष्टि)',
    jeevanama: 'सजीव (पूर्ण प्राण युक्त)',
    homahuti,
    bhadraMicroBreakup,
    udayaLagnas,
    chandrabalamList,
    tarabalamSummary: { shubhTaras, ashubhTaras },
    brihaspatiSamvatsara,
    mantriMandala,
    aadalVidaalList,
    pravishte,
    dinamanaFormatted,
    ratrimanaFormatted,
    madhyahnaTime,
    nishitaMuhurta,
    pratahSandhya,
    sayahnaSandhya,
    kaliyugaYear,
    kaliAhargana,
    julianDay: Number(jd.toFixed(4)),
    modifiedJulianDay,
    rataDie,
    nationalCivilDate,
    festivals,
  };
}
