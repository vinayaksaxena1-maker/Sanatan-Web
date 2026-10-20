/**
 * Sanatan Ghadi (सनातन घड़ी) - 13 Regional Panchangs & Calendars Engine
 * 
 * Implements high-precision regional calculation wrappers and domain adaptations:
 * 1. calculateAmantaPanchang: Gujarat, Maharashtra, Karnataka, Andhra, Telangana.
 * 2. calculatePurnimantaPanchang: North & Central India, Rajasthan, UP, Bihar, MP.
 * 3. calculateTamilPanchangam: Nirayana Sauramana, Chithirai to Panguni, Nalla Neram.
 * 4. calculateBengaliPanjika: Bangabda era, Boishakh to Choitro, Baro Bela / Kaalbela.
 * 5. calculateISKCONPanchang: Gaurabda era, 12 Vishnu-Tattva holy month names.
 * 6. Regional dispatchers and profiles for Malayalam, Odia, Gujarati, Marathi, etc.
 * 
 * @license MIT
 * @author Vinayak Saxena
 */

import {
  getPanchangForDate,
  getMuhuratsForPanchang,
  NAKSHATRA_DETAILS
} from './panchangCalc';
import {
  drik_calc_ut,
  drik_get_ayanamsa_ut,
  SE_SUN
} from './core/sanatan_jpl_bridge';
import { getFestivalsForDay } from './festivalEngine';
import { findClosestCity } from './geocoder';
import type {
  RegionalPanchangType,
  RegionalPanchangProfile,
  RegionalPanchangViewData,
  RegionalDayRow
} from '../types/regional';
import type { PanchangData, HinduDayDetails, SuryaChakraDetail, ChandraDetail, InauspiciousPeriods, AuspiciousPeriods, PlanetPosition, PanchangFestivalSummary } from '../types/panchang';
import type { BilingualLabel } from '../types/i18n';
import type { CityLocation } from '../types/location';
import type { PanchangInfo } from './types';

export interface RegionalOptions {
  includeMonthRows?: boolean;
  cityLocation?: Partial<CityLocation>;
  offsetHours?: number;
}

export const REGIONAL_PANCHANG_PROFILES: Record<RegionalPanchangType, RegionalPanchangProfile> = {
  dainik: {
    id: 'dainik',
    name: { hi: 'दैनिक पंचांग (उत्तर भारत)', en: 'Dainik Panchang (North India)', sa: 'दैनिक पञ्चाङ्गम्' },
    regionalScriptTitle: 'दैनिक पंचांग',
    primarySystem: 'Purnimanta',
    calendarEra: 'Vikram',
    newYearName: { hi: 'चैत्र शुक्ल प्रतिपदा', en: 'Chaitra Shukla Pratipada', sa: 'चैत्र शुक्ल प्रतिपदा' },
    associatedStates: ['Delhi', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Bihar', 'Haryana', 'Himachal Pradesh'],
    keyDifferences: [
      'Purnimanta lunar month ends at Full Moon (Purnima).',
      'Krishna Paksha belongs to the upcoming month.',
      'Vikram Samvat calendar era.'
    ],
    keyDifferencesHindi: [
      'पूर्णिमांत मास व्यवस्था: पूर्णिमा पर मास समाप्त होता है।',
      'कृष्ण पक्ष आगामी मास का प्रथम पखवाड़ा माना जाता है।',
      'विक्रम संवत काल गणना।'
    ]
  },
  monthly: {
    id: 'monthly',
    name: { hi: 'मासिक पंचांग (कालनिर्णय)', en: 'Monthly Panchang', sa: 'मासिक पञ्चाङ्गम्' },
    regionalScriptTitle: 'मासिक पंचांग',
    primarySystem: 'Amanta',
    calendarEra: 'Vikram',
    newYearName: { hi: 'चैत्र शुक्ल प्रतिपदा (गुड़ी पड़वा)', en: 'Chaitra Shukla Pratipada', sa: 'चैत्र शुक्ल प्रतिपदा' },
    associatedStates: ['All India'],
    keyDifferences: [
      'Monthly calendar grid view.',
      'Amanta lunar months ending at Amavasya.',
      'Synchronized with traditional wall calendars.'
    ],
    keyDifferencesHindi: [
      'मासिक कैलेंडर दृश्य।',
      'अमांत मास व्यवस्था (अमावस्यांत)।',
      'पारंपरिक भित्ति पंचांगों के अनुरूप।'
    ]
  },
  odia: {
    id: 'odia',
    name: { hi: 'ओड़िया कोहिनूर पंजिका', en: 'Odia Kohinoor Panjika', sa: 'ओड़िया पञ्जिका' },
    regionalScriptTitle: 'ଓଡ଼ିଆ ପଞ୍ଜିକା',
    primarySystem: 'SolarSaur',
    calendarEra: 'Shaka',
    newYearName: { hi: 'महा विशुव संक्रांति (पणा संक्रांति)', en: 'Maha Vishuva Sankranti (Pana Sankranti)', sa: 'महाविषुवसंक्रान्तिः' },
    associatedStates: ['Odisha'],
    keyDifferences: [
      'Solar month begins with Sankranti.',
      'Follows Kohinoor and Radharaman panjika traditions.',
      'Shaka Samvat civil reckoning.'
    ],
    keyDifferencesHindi: [
      'सौर मास संक्रांति से आरंभ होता है।',
      'कोहिनूर एवं राधारमण पंजिका परंपरा का पालन।',
      'शालिवाहन शक संवत।'
    ]
  },
  malayalam: {
    id: 'malayalam',
    name: { hi: 'मलयालम पंचांगम (कोल्लम)', en: 'Malayalam Panchangam (Kollam Era)', sa: 'मलयाळ पञ्चाङ्गम्' },
    regionalScriptTitle: 'മലയാള പഞ്ചാംഗം',
    primarySystem: 'SolarSaur',
    calendarEra: 'Kollam',
    newYearName: { hi: 'विशु / चिंगम 1', en: 'Vishu / 1st Chingam', sa: 'विषुवत्' },
    associatedStates: ['Kerala', 'Lakshadweep'],
    keyDifferences: [
      'Kollam Era calendar (started 825 CE).',
      'Year begins with Chingam (Simha Rashi) in August.',
      'Solar months named after 12 Rashis (Chingam to Karkidakam).'
    ],
    keyDifferencesHindi: [
      'कोल्लवर्षम युग गणना (825 ई. से आरंभ)।',
      'वर्षारंभ चिंगम (सिंह संक्रांति) से अगस्त में।',
      '12 राशियों के नाम पर सौर मास (चिंगम से कर्कटकम)।'
    ]
  },
  telugu: {
    id: 'telugu',
    name: { hi: 'तेलुगु पंचांगम', en: 'Telugu Panchangam', sa: 'तेलुगु पञ्चाङ्गम्' },
    regionalScriptTitle: 'తెలుగు పంచాంగం',
    primarySystem: 'Amanta',
    calendarEra: 'Shaka',
    newYearName: { hi: 'उगादि (चैत्र शुद्ध पाद्यमि)', en: 'Ugadi (Chaitra Suddha Padyami)', sa: 'युगादिः' },
    associatedStates: ['Andhra Pradesh', 'Telangana'],
    keyDifferences: [
      'Amanta lunar months ending on Amavasya.',
      'Year starts with Ugadi in Chaitra.',
      'Shaka Samvat era.'
    ],
    keyDifferencesHindi: [
      'अमांत मास व्यवस्था (अमावस्या को मास अंत)।',
      'वर्षारंभ उगादि (चैत्र शुक्ल प्रतिपदा) से।',
      'शालिवाहन शक संवत।'
    ]
  },
  nepali: {
    id: 'nepali',
    name: { hi: 'नेपाली पात्रो', en: 'Nepali Patro', sa: 'नेपाली पात्रम्' },
    regionalScriptTitle: 'नेपाली पात्रो',
    primarySystem: 'SolarSaur',
    calendarEra: 'Vikram',
    newYearName: { hi: 'नेपाली नयाँ वर्ष (बैशाख १)', en: 'Nepali New Year (1st Baishakh)', sa: 'नववर्षम्' },
    associatedStates: ['Nepal', 'Sikkim', 'Uttarakhand'],
    keyDifferences: [
      'Bikram Sambat official solar calendar.',
      'Year starts on 1st Baishakh (approx April 14).',
      'National calendar of Nepal.'
    ],
    keyDifferencesHindi: [
      'नेपाल का आधिकारिक विक्रम संवत सौर पंचांग।',
      'वर्षारंभ 1 वैशाख (मध्य अप्रैल) से।',
      'नेपाली राष्ट्रीय त्योहारों एवं पर्वों का समन्वय।'
    ]
  },
  assamese: {
    id: 'assamese',
    name: { hi: 'असमिया पंजिका', en: 'Assamese Panjika', sa: 'असमिया पञ्जिका' },
    regionalScriptTitle: 'অসমীয়া পঞ্জিকা',
    primarySystem: 'SolarSaur',
    calendarEra: 'Shaka',
    newYearName: { hi: 'बोहाग बिहू (रंगाली बिहू)', en: 'Bohag Bihu (Rongali Bihu)', sa: 'विषुवत्' },
    associatedStates: ['Assam'],
    keyDifferences: [
      'Solar Sauramana calendar beginning with Bohag Bihu.',
      'Shaka Samvat reckoning.',
      'Solar months Bohag, Jeth, Ahar, Shaun, etc.'
    ],
    keyDifferencesHindi: [
      'सौर सौरमान पंचांग बोहाग बिहू से आरंभ।',
      'शक संवत गणना।',
      'असमिया सौर मास (बोहाग, जेठ, आहार आदि)।'
    ]
  },
  marathi: {
    id: 'marathi',
    name: { hi: 'मराठी पंचांग', en: 'Marathi Panchang', sa: 'मराठी पञ्चाङ्गम्' },
    regionalScriptTitle: 'मराठी पंचांग',
    primarySystem: 'Amanta',
    calendarEra: 'Shaka',
    newYearName: { hi: 'गुढी पाडवा (चैत्र शुद्ध प्रतिपदा)', en: 'Gudi Padwa', sa: 'गुढीपाडवा' },
    associatedStates: ['Maharashtra', 'Goa'],
    keyDifferences: [
      'Amanta lunar months ending on Amavasya.',
      'New year celebrated with sacred Gudi Padwa.',
      'Shaka Samvat era.'
    ],
    keyDifferencesHindi: [
      'अमांत मास व्यवस्था (अमावस्या को मास समाप्ति)।',
      'गुढी पाडवा से नववर्ष का शुभारंभ।',
      'शालिवाहन शक संवत।'
    ]
  },
  bengali: {
    id: 'bengali',
    name: { hi: 'बंगाली पंजिका (गुप्तप्रेस / विशुद्धसिद्धांत)', en: 'Bengali Panjika', sa: 'वङ्ग पञ्जिका' },
    regionalScriptTitle: 'বাংলা পঞ্জিকা',
    primarySystem: 'SolarSaur',
    calendarEra: 'BengaliSan',
    newYearName: { hi: 'पहेला बैशाख (पोइला बोइशाख)', en: 'Pohela Boishakh', sa: 'वर्षप्रतिपदा' },
    associatedStates: ['West Bengal', 'Tripura', 'Assam (Barak Valley)'],
    keyDifferences: [
      'Bangabda (Bengali San) solar era (started 593 CE).',
      'Year starts on Pohela Boishakh (mid-April).',
      'Includes Baro Bela, Kal Bela, Kaalratri, and Amrita Jog.'
    ],
    keyDifferencesHindi: [
      'बंगाब्द (बंगाली सन) सौर संवत (593 ई. से आरंभ)।',
      'वर्षारंभ पोइला बोइशाख (मध्य अप्रैल) से।',
      'बारो बेला, काल बेला, कालरात्रि एवं अमृत योग का समावेश।'
    ]
  },
  gujarati: {
    id: 'gujarati',
    name: { hi: 'गुजराती पंचांग', en: 'Gujarati Panchang', sa: 'गौर्जर पञ्चाङ्गम्' },
    regionalScriptTitle: 'ગુજરાતી પંચાંગ',
    primarySystem: 'Amanta',
    calendarEra: 'Vikram',
    newYearName: { hi: 'बेस्तु वरस (कार्तिक शुक्ल प्रतिपदा)', en: 'Bestu Varas (1st Kartik)', sa: 'नूतनवर्षम्' },
    associatedStates: ['Gujarat'],
    keyDifferences: [
      'Amanta lunar months ending on Amavasya.',
      'Vikram Samvat year begins on Bestu Varas (day after Diwali in Kartik).',
      'Chopda Pujan and Labh Pancham timings.'
    ],
    keyDifferencesHindi: [
      'अमांत मास व्यवस्था (अमावस्यांत)।',
      'विक्रम संवत वर्षारंभ दिवाली के अगले दिन "बेस्तु वरस" (कार्तिक मास) से।',
      'चोपड़ा पूजन एवं लाभ पांचम मुहूर्त।'
    ]
  },
  tamil: {
    id: 'tamil',
    name: { hi: 'तमिल पंचांगम (थिरुकनिधम / पाकियाम)', en: 'Tamil Panchangam', sa: 'तमिऴ् पञ्चाङ्गम्' },
    regionalScriptTitle: 'தமிழ் பஞ்சாங்கம்',
    primarySystem: 'SolarSaur',
    calendarEra: 'Shaka',
    newYearName: { hi: 'पुथांडु (चित्तिरई 1)', en: 'Puthandu (1st Chithirai)', sa: 'वर्षपिरप्पु' },
    associatedStates: ['Tamil Nadu', 'Puducherry'],
    keyDifferences: [
      'Nirayana Solar calendar (Chithirai to Panguni).',
      '60-year Jovian Prabhava cycle (Krodhi, Viswavasu, etc.).',
      'Includes Nalla Neram, Gowri Panchangam, and Rahu/Kethu times.'
    ],
    keyDifferencesHindi: [
      'निरयण सौर पंचांग (चित्तिरई से पंगुनी)।',
      '60 संवत्सर चक्र (प्रभव, विभव, क्रोधी आदि)।',
      'नल्ला नेरम (शुभ समय), गौरी पंचांगम एवं कुलिकाई।'
    ]
  },
  kannada: {
    id: 'kannada',
    name: { hi: 'कन्नड़ पंचांग', en: 'Kannada Panchanga', sa: 'कन्नड पञ्चाङ्गम्' },
    regionalScriptTitle: 'ಕನ್ನಡ ಪಂಚಾಂಗ',
    primarySystem: 'Amanta',
    calendarEra: 'Shaka',
    newYearName: { hi: 'युगादि (चैत्र शुद्ध पाड्य)', en: 'Yugadi (Chaitra Suddha Padya)', sa: 'युगादिः' },
    associatedStates: ['Karnataka'],
    keyDifferences: [
      'Amanta lunar months ending on Amavasya.',
      'Shalivahana Shaka Samvat era.',
      'Yugadi marks the start of the year.'
    ],
    keyDifferencesHindi: [
      'अमांत मास व्यवस्था।',
      'शालिवाहन शक संवत गणना।',
      'युगादि पर्व से नववर्ष का आरंभ।'
    ]
  },
  iskcon: {
    id: 'iskcon',
    name: { hi: 'इस्कॉन गौड़ीय वैष्णव पंचांग', en: 'ISKCON Gaudiya Vaishnava Panchang', sa: 'गौडीय वैष्णव पञ्चाङ्गम्' },
    regionalScriptTitle: 'গৌড়ীয় বৈষ্ণব পঞ্জিকা',
    primarySystem: 'Amanta',
    calendarEra: 'Gaurabda',
    newYearName: { hi: 'गौर पूर्णिमा (श्री चैतन्य महाप्रभु आविर्भाव)', en: 'Gaura Purnima', sa: 'गौरपूर्णिमा' },
    associatedStates: ['Global', 'Mayapur', 'Vrindavan'],
    keyDifferences: [
      'Gaurabda Era (began 1486 CE with Lord Chaitanya).',
      '12 Holy names of Vishnu for months (Madhusudana, Trivikrama, etc.).',
      'Strict Arunodaya Dashami-vedha rejection for Ekadashi and Maha-Dwadashi fasting.'
    ],
    keyDifferencesHindi: [
      'गौराब्द संवत (1486 ई. श्री चैतन्य महाप्रभु के आविर्भाव से आरंभ)।',
      'मासों के 12 विष्णु-तत्त्व नाम (मधुसूदन, त्रिविक्रम, दामोदर आदि)।',
      'एकादशी व्रत में अरुणोदय दशमी-वेध का कड़ाई से त्याग एवं महाद्वादशी पारण।'
    ]
  }
};

const LUNAR_MONTHS: Array<{ en: string; hi: string; sa: string }> = [
  { en: 'Chaitra', hi: 'चैत्र', sa: 'चैत्रः' },
  { en: 'Vaishakha', hi: 'वैशाख', sa: 'वैशाखः' },
  { en: 'Jyeshtha', hi: 'ज्येष्ठ', sa: 'ज्येष्ठः' },
  { en: 'Ashadha', hi: 'आषाढ़', sa: 'आषाढः' },
  { en: 'Shravana', hi: 'श्रावण', sa: 'श्रावणः' },
  { en: 'Bhadrapada', hi: 'भाद्रपद', sa: 'भाद्रपदः' },
  { en: 'Ashwina', hi: 'आश्विन', sa: 'आश्विनः' },
  { en: 'Kartika', hi: 'कार्तिक', sa: 'कार्तिकः' },
  { en: 'Margashirsha', hi: 'मार्गशीर्ष', sa: 'मार्गशीर्षः' },
  { en: 'Pausha', hi: 'पौष', sa: 'पौषः' },
  { en: 'Magha', hi: 'माघ', sa: 'माघः' },
  { en: 'Phalguna', hi: 'फाल्गुन', sa: 'फाल्गुनः' }
];

const TAMIL_MONTHS: Array<{ en: string; hi: string; sa: string }> = [
  { en: 'Chithirai', hi: 'चित्तिरई', sa: 'चित्तिरै' },
  { en: 'Vaikasi', hi: 'वैकासी', sa: 'वैगासि' },
  { en: 'Aani', hi: 'आनी', sa: 'आनि' },
  { en: 'Aadi', hi: 'आडी', sa: 'आडि' },
  { en: 'Avani', hi: 'आवनि', sa: 'आवण्णि' },
  { en: 'Purattasi', hi: 'पुरट्टासी', sa: 'पुरट्टासि' },
  { en: 'Aippasi', hi: 'ऐप्पासी', sa: 'ऐप्पसि' },
  { en: 'Karthigai', hi: 'कार्त्तिगई', sa: 'कार्त्तिगै' },
  { en: 'Margazhi', hi: 'मार्गऴी', sa: 'मार्गळि' },
  { en: 'Thai', hi: 'थाई', sa: 'तै' },
  { en: 'Maasi', hi: 'मासी', sa: 'मासि' },
  { en: 'Panguni', hi: 'पंगुनी', sa: 'पङ्गुनि' }
];

const BENGALI_MONTHS: Array<{ en: string; hi: string; sa: string }> = [
  { en: 'Boishakh', hi: 'बैशाख', sa: 'वैशाखः' },
  { en: 'Joishtho', hi: 'ज्यैष्ठ', sa: 'ज्येष्ठः' },
  { en: 'Asharh', hi: 'आषाढ़', sa: 'आषाढः' },
  { en: 'Srabon', hi: 'श्रावण', sa: 'श्रावणः' },
  { en: 'Bhadro', hi: 'भाद्र', sa: 'भाद्रः' },
  { en: 'Ashwin', hi: 'आश्विन', sa: 'आश्विनः' },
  { en: 'Kartik', hi: 'कार्तिक', sa: 'कार्तिकः' },
  { en: 'Ogrohayon', hi: 'अग्रहायण', sa: 'मार्गशीर्षः' },
  { en: 'Poush', hi: 'पौष', sa: 'पौषः' },
  { en: 'Magh', hi: 'माघ', sa: 'माघः' },
  { en: 'Falgun', hi: 'फाल्गुन', sa: 'फाल्गुनः' },
  { en: 'Choitro', hi: 'चैत्र', sa: 'चैत्रः' }
];

const ISKCON_MONTHS: Array<{ en: string; hi: string; sa: string }> = [
  { en: 'Vishnu', hi: 'विष्णु मास', sa: 'विष्णुमासः' },
  { en: 'Madhusudana', hi: 'मधुसूदन मास', sa: 'मधुसूदनमासः' },
  { en: 'Trivikrama', hi: 'त्रिविक्रम मास', sa: 'त्रिविक्रममासः' },
  { en: 'Vamana', hi: 'वामन मास', sa: 'वामनमासः' },
  { en: 'Shridhara', hi: 'श्रीधर मास', sa: 'श्रीधरमासः' },
  { en: 'Hrishikesha', hi: 'हृषीकेश मास', sa: 'हृषीकेशमासः' },
  { en: 'Padmanabha', hi: 'पद्मनाभ मास', sa: 'पद्मनाभमासः' },
  { en: 'Damodara', hi: 'दामोदर मास', sa: 'दामोदरमासः' },
  { en: 'Keshava', hi: 'केशव मास', sa: 'केशवमासः' },
  { en: 'Narayana', hi: 'नारायण मास', sa: 'नारायणमासः' },
  { en: 'Madhava', hi: 'माधव मास', sa: 'माधवमासः' },
  { en: 'Govinda', hi: 'गोविन्द मास', sa: 'गोविन्दमासः' }
];

const SAMVATSARAS: Array<{ en: string; hi: string }> = [
  { en: 'Prabhava', hi: 'प्रभव' }, { en: 'Vibhava', hi: 'विभव' }, { en: 'Shukla', hi: 'शुक्ल' }, { en: 'Pramoda', hi: 'प्रमोद' },
  { en: 'Prajapati', hi: 'प्रजापति' }, { en: 'Angira', hi: 'अंगिरा' }, { en: 'Shrimukha', hi: 'श्रीमुख' }, { en: 'Bhava', hi: 'भाव' },
  { en: 'Yuva', hi: 'युवा' }, { en: 'Dhatri', hi: 'धाता' }, { en: 'Ishvara', hi: 'ईश्वर' }, { en: 'Bahudhanya', hi: 'बहुधान्य' },
  { en: 'Pramathi', hi: 'प्रमाथी' }, { en: 'Vikrama', hi: 'विक्रम' }, { en: 'Vrisha', hi: 'वृष' }, { en: 'Chitrabhanu', hi: 'चित्रभानु' },
  { en: 'Subhanu', hi: 'सुभानु' }, { en: 'Tarana', hi: 'तारण' }, { en: 'Parthiva', hi: 'पार्थिव' }, { en: 'Vyaya', hi: 'व्यय' },
  { en: 'Sarvajit', hi: 'सर्वजित्' }, { en: 'Sarvadhari', hi: 'सर्वधारी' }, { en: 'Virodhi', hi: 'विरोधी' }, { en: 'Vikrita', hi: 'विकृत' },
  { en: 'Khara', hi: 'खर' }, { en: 'Nandana', hi: 'नंदन' }, { en: 'Vijaya', hi: 'विजय' }, { en: 'Jaya', hi: 'जय' },
  { en: 'Manmatha', hi: 'मन्मथ' }, { en: 'Durmukha', hi: 'दुर्मुख' }, { en: 'Hemalamba', hi: 'हेमलम्ब' }, { en: 'Vilamba', hi: 'विलम्ब' },
  { en: 'Vikari', hi: 'विकारी' }, { en: 'Sharvari', hi: 'शार्वरी' }, { en: 'Plava', hi: 'प्लव' }, { en: 'Shubhakrit', hi: 'शुभकृत्' },
  { en: 'Shobhana', hi: 'शोभन' }, { en: 'Krodhi', hi: 'क्रोधी' }, { en: 'Vishwavasu', hi: 'विश्वावसु' }, { en: 'Parabhava', hi: 'पराभव' },
  { en: 'Plavanga', hi: 'प्लवंग' }, { en: 'Kilaka', hi: 'कीलक' }, { en: 'Saumya', hi: 'सौम्य' }, { en: 'Sadharana', hi: 'साधारण' },
  { en: 'Virodhikrit', hi: 'विरोधकृत्' }, { en: 'Paridhavi', hi: 'परिधावी' }, { en: 'Pramadicha', hi: 'प्रमादी' }, { en: 'Ananda', hi: 'आनंद' },
  { en: 'Rakshasa', hi: 'राक्षस' }, { en: 'Anala', hi: 'अनल' }, { en: 'Pingala', hi: 'पिंगल' }, { en: 'Kalayukta', hi: 'कालयुक्त' },
  { en: 'Siddharthi', hi: 'सिद्धार्थी' }, { en: 'Raudra', hi: 'रौद्र' }, { en: 'Durmati', hi: 'दुर्मति' }, { en: 'Dundubhi', hi: 'दुंदुभि' },
  { en: 'Rudhirodgari', hi: 'रुधिरोद्गारी' }, { en: 'Raktaksha', hi: 'रक्ताक्ष' }, { en: 'Krodhana', hi: 'क्रोधन' }, { en: 'Kshaya', hi: 'क्षय' }
];

function resolveCityLocation(lat: number, lon: number, override?: Partial<CityLocation>): CityLocation {
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

function parseInputDate(input?: Date | string): { dateObj: Date; dateStr: string; year: number; month: number; day: number } {
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
 * Transforms AstroEngine PanchangInfo into the strict PanchangData UI domain contract.
 */
function transformToPanchangData(
  info: PanchangInfo,
  location: CityLocation,
  dateStr: string
): PanchangData {
  const hinduDate: HinduDayDetails = {
    tithi: {
      value: info.hinduDate.tithi.value,
      name: info.hinduDate.tithi.name,
      hindiName: info.hinduDate.tithi.hindiName,
      paksha: info.hinduDate.paksha,
      startTime: info.hinduDate.tithi.startTime,
      endTime: info.hinduDate.tithi.endTime,
      percentPassed: info.hinduDate.tithi.percentPassed,
      lord: info.hinduDate.tithi.lord,
      lordHindi: info.hinduDate.tithi.lord,
      deity: info.hinduDate.tithi.deity,
      deityHindi: info.hinduDate.tithi.deity
    },
    nakshatra: {
      value: info.hinduDate.nakshatra.value,
      name: info.hinduDate.nakshatra.name,
      hindiName: info.hinduDate.nakshatra.hindiName,
      endTime: info.hinduDate.nakshatra.endTime,
      pada: info.hinduDate.nakshatra.pada ?? 1,
      lord: info.hinduDate.nakshatra.lord,
      lordHindi: info.hinduDate.nakshatra.lord,
      deity: info.hinduDate.nakshatra.deity,
      deityHindi: info.hinduDate.nakshatra.deity,
      symbol: info.hinduDate.nakshatra.symbol
    },
    yoga: {
      value: info.hinduDate.yoga.value,
      name: info.hinduDate.yoga.name,
      hindiName: info.hinduDate.yoga.hindiName,
      endTime: info.hinduDate.yoga.endTime,
      isAuspicious: !!info.hinduDate.yoga.isAuspicious,
      type: info.hinduDate.yoga.isAuspicious ? 'Shubh' : 'Ashubh'
    },
    karana: {
      value: info.hinduDate.karana.value,
      name: info.hinduDate.karana.name,
      hindiName: info.hinduDate.karana.hindiName,
      endTime: info.hinduDate.karana.endTime,
      nature: info.hinduDate.karana.nature === 'Fixed' ? 'Fixed' : 'Movable',
      natureHindi: info.hinduDate.karana.nature === 'Fixed' ? 'स्थिर' : 'चर',
      classification: info.hinduDate.karana.classification === 'Ashubh' ? 'Ashubh' : 'Shubh'
    },
    paksha: info.hinduDate.paksha,
    samvat: {
      vikramSamvat: info.hinduDate.samvatVikram,
      shakaSamvat: info.hinduDate.samvatShaka,
      gujaratiSamvat: info.hinduDate.samvatGujarati,
      samvatsaraName: (() => {
        const shaka = info.hinduDate.samvatShaka;
        const samvatIdx = ((shaka + 11) % 60 + 60) % 60;
        return SAMVATSARAS[samvatIdx]?.en || 'Krodhi';
      })(),
      samvatsaraHindi: (() => {
        const shaka = info.hinduDate.samvatShaka;
        const samvatIdx = ((shaka + 11) % 60 + 60) % 60;
        return SAMVATSARAS[samvatIdx]?.hi || 'क्रोधी';
      })(),
      amantaMonth: (() => {
        const amantaHi = info.hinduDate.monthAmantaHindi || info.hinduDate.monthHindi;
        const lm = LUNAR_MONTHS.find(m => amantaHi.includes(m.hi));
        return lm?.en || info.hinduDate.month;
      })(),
      amantaMonthHindi: info.hinduDate.monthAmantaHindi || info.hinduDate.monthHindi,
      purnimantaMonth: (() => {
        const purnHi = info.hinduDate.monthPurnimantaHindi || info.hinduDate.monthHindi;
        const lm = LUNAR_MONTHS.find(m => purnHi.includes(m.hi));
        return lm?.en || info.hinduDate.month;
      })(),
      purnimantaMonthHindi: info.hinduDate.monthPurnimantaHindi || info.hinduDate.monthHindi,
      solarMonth: info.hinduDate.solarMonth,
      solarMonthHindi: info.hinduDate.solarMonth,
      isLeapMonth: info.hinduDate.isLeapMonth
    },
    dayLord: (() => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dt = new Date(y, m - 1, d, 12, 0, 0);
      const dayLords = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
      return dayLords[dt.getDay()] || 'Sun';
    })(),
    dayLordHindi: (() => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dt = new Date(y, m - 1, d, 12, 0, 0);
      const dayLordsHi = ['सूर्य', 'चन्द्र', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
      return dayLordsHi[dt.getDay()] || 'सूर्य';
    })()
  };

  const parseTimeToMin = (tStr: string): number => {
    if (!tStr || !tStr.includes(':')) return 360;
    const [time, period] = tStr.split(' ');
    const [h, min] = time.split(':').map(Number);
    let hrs = h % 12;
    if (period === 'PM') hrs += 12;
    return hrs * 60 + min;
  };

  const sunPlanet = info.planets?.find(p => p.name === 'Sun');
  const moonPlanet = info.planets?.find(p => p.name === 'Moon');

  const sMin = parseTimeToMin(info.sunrise);
  const eMin = parseTimeToMin(info.sunset);
  const dayDurMin = (eMin - sMin + 1440) % 1440;
  const nightDurMin = 1440 - dayDurMin;
  const dayH = Math.floor(dayDurMin / 60);
  const dayM = dayDurMin % 60;
  const nightH = Math.floor(nightDurMin / 60);
  const nightM = nightDurMin % 60;

  const noonMin = Math.round((sMin + eMin) / 2);
  const noonH = Math.floor(noonMin / 60) % 12 || 12;
  const noonM = noonMin % 60;
  const noonPeriod = Math.floor(noonMin / 60) >= 12 ? 'PM' : 'AM';
  const solarNoon = `${noonH.toString().padStart(2, '0')}:${noonM.toString().padStart(2, '0')} ${noonPeriod}`;

  const suryaChakra: SuryaChakraDetail = {
    sunrise: info.sunrise,
    sunset: info.sunset,
    solarNoon,
    dayDurationFormatted: `${dayH} घंटे ${dayM} मिनट`,
    nightDurationFormatted: `${nightH} घंटे ${nightM} मिनट`,
    sunSign: sunPlanet?.sign || 'Aries',
    sunSignHindi: sunPlanet?.signHindi || 'मेष',
    suryaNakshatra: info.suryaNakshatra?.name || 'Ashwini',
    suryaNakshatraHindi: info.suryaNakshatra?.hindiName || 'अश्विनी',
    suryaPada: info.suryaNakshatra?.pada || 1,
    ayana: (info.hinduDate.ayana as 'Uttarayana' | 'Dakshinayana') || 'Uttarayana',
    ayanaHindi: info.hinduDate.ayana === 'Dakshinayana' ? 'दक्षिणायन' : 'उत्तरायण',
    solarRitu: info.hinduDate.ritu,
    solarRituHindi: info.hinduDate.ritu
  };

  const sunLon = sunPlanet ? ((sunPlanet.longitude % 360) + 360) % 360 : 0;
  const moonLon = moonPlanet ? ((moonPlanet.longitude % 360) + 360) % 360 : 0;
  const elongation = ((moonLon - sunLon) % 360 + 360) % 360;
  const illuminationPercent = Math.round((1 - Math.cos((elongation * Math.PI) / 180)) * 50);
  const lunarAgeDays = Number(((elongation / 360) * 29.53059).toFixed(1));

  let phaseName = 'Waxing Crescent';
  let phaseNameHindi = 'शुक्ल पक्ष';
  if (elongation >= 170 && elongation <= 190) {
    phaseName = 'Full Moon';
    phaseNameHindi = 'पूर्णिमा';
  } else if (elongation >= 350 || elongation <= 10) {
    phaseName = 'New Moon';
    phaseNameHindi = 'अमावस्या';
  } else if (elongation < 90) {
    phaseName = 'Waxing Crescent';
    phaseNameHindi = 'शुक्ल पक्ष';
  } else if (elongation < 180) {
    phaseName = 'Waxing Gibbous';
    phaseNameHindi = 'शुक्ल पक्ष';
  } else if (elongation < 270) {
    phaseName = 'Waning Gibbous';
    phaseNameHindi = 'कृष्ण पक्ष';
  } else {
    phaseName = 'Waning Crescent';
    phaseNameHindi = 'कृष्ण पक्ष';
  }

  const chandraChakra: ChandraDetail = {
    moonrise: info.moonrise,
    moonset: info.moonset,
    moonSign: moonPlanet?.sign || 'Taurus',
    moonSignHindi: moonPlanet?.signHindi || 'वृषभ',
    chandraNakshatra: info.chandraNakshatra?.name || info.hinduDate.nakshatra.name,
    chandraNakshatraHindi: info.chandraNakshatra?.hindiName || info.hinduDate.nakshatra.hindiName,
    chandraPada: info.chandraNakshatra?.pada || info.hinduDate.nakshatra.pada || 1,
    illuminationPercent,
    phaseName,
    phaseNameHindi,
    lunarAgeDays
  };

  const inauspicious: InauspiciousPeriods = {
    rahuKaal: { start: info.rahuKaal?.start || '10:30 AM', end: info.rahuKaal?.end || '12:00 PM' },
    gulikKaal: { start: info.gulikKaal?.start || '07:30 AM', end: info.gulikKaal?.end || '09:00 AM' },
    yamagandam: { start: info.yamagandam?.start || '01:30 PM', end: info.yamagandam?.end || '03:00 PM' },
    durmuhurat: info.durmuhurat || [],
    varjyam: info.varjyam || []
  };

  const muhurats = getMuhuratsForPanchang(info);
  const abhijitItem = muhurats.find(m => m.id === 'abhijit');
  const brahmaItem = muhurats.find(m => m.id === 'brahma');

  const auspicious: AuspiciousPeriods = {
    abhijit: abhijitItem ? { start: abhijitItem.startTime, end: abhijitItem.endTime } : { start: '11:50 AM', end: '12:40 PM' },
    brahmaMuhurat: brahmaItem ? { start: brahmaItem.startTime, end: brahmaItem.endTime } : { start: '04:30 AM', end: '05:15 AM' }
  };

  const festivalsRaw = getFestivalsForDay(info);
  const festivals: PanchangFestivalSummary[] = festivalsRaw.map(f => ({
    id: f.id,
    name: { hi: f.hindiName, en: f.name, sa: f.hindiName },
    isMajor: f.type === 'Major' || f.type === 'Ekadashi',
    fastingNote: f.type === 'Ekadashi' ? { hi: 'एकादशी उपवास', en: 'Ekadashi Fast', sa: 'एकादशीव्रतम्' } : undefined
  }));

  const planets: PlanetPosition[] = (info.planets || []).map(p => {
    const rawLon = ((p.longitude % 360) + 360) % 360;
    const signIndex = Math.floor(rawLon / 30);
    const degreeInSign = rawLon % 30;
    const dDeg = Math.floor(degreeInSign);
    const dMin = Math.floor((degreeInSign - dDeg) * 60);
    const formattedDegree = `${dDeg}° ${dMin}'`;
    const naksIdx = Math.max(0, Math.min(26, Math.floor(rawLon / 13.333333333333334)));
    const naksObj = NAKSHATRA_DETAILS[naksIdx] || NAKSHATRA_DETAILS[0];
    const naksPada = Math.floor((rawLon % 13.333333333333334) / 3.3333333333333335) + 1;

    return {
      id: p.name.toLowerCase(),
      name: p.name,
      hindiName: p.hindiName,
      sanskritName: p.hindiName,
      longitude: p.longitude,
      dailyMotionSpeed: p.speed,
      signIndex,
      signName: p.sign,
      signHindi: p.signHindi,
      house: signIndex + 1,
      degreeInSign,
      formattedDegree,
      nakshatra: naksObj.name,
      nakshatraHindi: naksObj.hindiName,
      nakshatraPada: naksPada,
      isRetrograde: p.isRetrograde,
      isCombust: false
    };
  });

  return {
    date: dateStr,
    location,
    hinduDate,
    suryaChakra,
    chandraChakra,
    inauspicious,
    auspicious,
    choghadiyaDay: [],
    choghadiyaNight: [],
    horaDay: [],
    horaNight: [],
    planets,
    festivals,
    calculationTimestamp: Date.now()
  };
}

/**
 * Calculates a list of regional day rows for the calendar view.
 */
function generateRegionalDayRows(
  baseDate: Date,
  lat: number,
  lon: number,
  profile: RegionalPanchangProfile,
  daysCount: number = 7
): RegionalDayRow[] {
  const rows: RegionalDayRow[] = [];
  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth();
  const baseDay = baseDate.getDate();

  for (let i = 0; i < daysCount; i++) {
    const rowDate = new Date(baseYear, baseMonth, baseDay + i, 12, 0, 0);
    const ry = rowDate.getFullYear();
    const rm = rowDate.getMonth() + 1;
    const rd = rowDate.getDate();
    const rDateStr = `${ry}-${rm.toString().padStart(2, '0')}-${rd.toString().padStart(2, '0')}`;

    const info = getPanchangForDate(lat, lon, rowDate);

    // Solar calculation
    const jd = (rowDate.getTime() / 86400000) + 2440587.5;
    const sunPos = drik_calc_ut(jd, SE_SUN);
    const ayanamsa = drik_get_ayanamsa_ut(jd);
    const sunSidereal = ((sunPos[0] - ayanamsa) % 360 + 360) % 360;
    const solarRashiIdx = Math.floor(sunSidereal / 30);
    const solarDay = Math.floor(sunSidereal % 30) + 1;

    let monthName: BilingualLabel;
    let dayNum: number | string = rd;

    if (profile.primarySystem === 'SolarSaur') {
      if (profile.id === 'tamil') {
        monthName = { en: TAMIL_MONTHS[solarRashiIdx].en, hi: TAMIL_MONTHS[solarRashiIdx].hi, sa: TAMIL_MONTHS[solarRashiIdx].sa };
        dayNum = solarDay;
      } else if (profile.id === 'bengali') {
        monthName = { en: BENGALI_MONTHS[solarRashiIdx].en, hi: BENGALI_MONTHS[solarRashiIdx].hi, sa: BENGALI_MONTHS[solarRashiIdx].sa };
        dayNum = solarDay;
      } else {
        monthName = { en: LUNAR_MONTHS[solarRashiIdx].en, hi: LUNAR_MONTHS[solarRashiIdx].hi, sa: LUNAR_MONTHS[solarRashiIdx].sa };
        dayNum = solarDay;
      }
    } else if (profile.id === 'iskcon') {
      const monthHindi = info.hinduDate.monthPurnimantaHindi || info.hinduDate.monthHindi;
      const lIdx = LUNAR_MONTHS.findIndex(m => monthHindi.includes(m.hi));
      const iskconIdx = lIdx >= 0 ? lIdx : (solarRashiIdx + 1) % 12;
      monthName = { en: ISKCON_MONTHS[iskconIdx].en, hi: ISKCON_MONTHS[iskconIdx].hi, sa: ISKCON_MONTHS[iskconIdx].sa };
      dayNum = info.hinduDate.tithi.value;
    } else if (profile.primarySystem === 'Purnimanta') {
      const purnHi = info.hinduDate.monthPurnimantaHindi || info.hinduDate.monthHindi;
      const purnObj = LUNAR_MONTHS.find(m => purnHi.includes(m.hi))
        || { en: info.hinduDate.month, hi: purnHi, sa: purnHi };
      monthName = { en: purnObj.en, hi: purnHi, sa: purnObj.sa };
      dayNum = info.hinduDate.tithi.value;
    } else {
      const amanHi = info.hinduDate.monthAmantaHindi || info.hinduDate.monthHindi;
      const amanObj = LUNAR_MONTHS.find(m => amanHi.includes(m.hi))
        || { en: info.hinduDate.month, hi: amanHi, sa: amanHi };
      monthName = { en: amanObj.en, hi: amanHi, sa: amanObj.sa };
      dayNum = info.hinduDate.tithi.value;
    }

    const tithiDetail: PanchangData['hinduDate']['tithi'] = {
      value: info.hinduDate.tithi.value,
      name: info.hinduDate.tithi.name,
      hindiName: info.hinduDate.tithi.hindiName,
      paksha: info.hinduDate.paksha,
      startTime: info.hinduDate.tithi.startTime,
      endTime: info.hinduDate.tithi.endTime,
      percentPassed: info.hinduDate.tithi.percentPassed,
      lord: info.hinduDate.tithi.lord,
      lordHindi: info.hinduDate.tithi.lord,
      deity: info.hinduDate.tithi.deity,
      deityHindi: info.hinduDate.tithi.deity
    };

    const nakshatraDetail: PanchangData['hinduDate']['nakshatra'] = {
      value: info.hinduDate.nakshatra.value,
      name: info.hinduDate.nakshatra.name,
      hindiName: info.hinduDate.nakshatra.hindiName,
      endTime: info.hinduDate.nakshatra.endTime,
      pada: info.hinduDate.nakshatra.pada ?? 1,
      lord: info.hinduDate.nakshatra.lord,
      lordHindi: info.hinduDate.nakshatra.lord,
      deity: info.hinduDate.nakshatra.deity,
      deityHindi: info.hinduDate.nakshatra.deity,
      symbol: info.hinduDate.nakshatra.symbol
    };

    const isEkadashi = info.hinduDate.tithi.value === 11 || info.hinduDate.tithi.value === 26;
    const fastingNote: BilingualLabel | undefined = isEkadashi
      ? { hi: 'एकादशी उपवास', en: 'Ekadashi Fast', sa: 'एकादशीव्रतम्' }
      : undefined;

    rows.push({
      date: rDateStr,
      regionalDayNumber: dayNum,
      regionalMonthName: monthName,
      tithi: tithiDetail,
      nakshatra: nakshatraDetail,
      solarDay,
      fastingNote,
      isHoliday: false
    });
  }

  return rows;
}

/**
 * Universal Regional Panchang calculation dispatcher.
 */
export function calculateRegionalPanchang(
  type: RegionalPanchangType,
  lat: number,
  lon: number,
  date?: Date | string,
  options?: RegionalOptions
): RegionalPanchangViewData {
  const profile = REGIONAL_PANCHANG_PROFILES[type] || REGIONAL_PANCHANG_PROFILES.dainik;
  const { dateObj, dateStr, year } = parseInputDate(date);
  const location = resolveCityLocation(lat, lon, options?.cityLocation);

  const info = getPanchangForDate(lat, lon, dateObj);
  const panchang = transformToPanchangData(info, location, dateStr);

  // Solar calculation for month & era
  const jd = (dateObj.getTime() / 86400000) + 2440587.5;
  const sunPos = drik_calc_ut(jd, SE_SUN);
  const ayanamsa = drik_get_ayanamsa_ut(jd);
  const sunSidereal = ((sunPos[0] - ayanamsa) % 360 + 360) % 360;
  const solarRashiIdx = Math.floor(sunSidereal / 30);

  let monthName: BilingualLabel;
  let yearDisplay: string;

  // Era determination
  if (profile.calendarEra === 'Kollam') {
    const kollamYear = year - 825;
    yearDisplay = `${kollamYear} कोल्लवर्षम (${kollamYear} Kollam)`;
  } else if (profile.calendarEra === 'BengaliSan') {
    const bengaliYear = year - 593;
    yearDisplay = `${bengaliYear} बंगाब्द (${bengaliYear} Bangabda)`;
  } else if (profile.calendarEra === 'Gaurabda') {
    const gaurabdaYear = year - 1486;
    yearDisplay = `${gaurabdaYear} गौराब्द (${gaurabdaYear} Gaurabda)`;
  } else if (profile.calendarEra === 'Shaka') {
    const shakaYear = info.hinduDate.samvatShaka || (year - 78);
    yearDisplay = `${shakaYear} शक संवत (${shakaYear} Shaka)`;
  } else {
    // Vikram Samvat
    const vikramYear = info.hinduDate.samvatVikram || (year + 57);
    yearDisplay = `${vikramYear} विक्रम संवत (${vikramYear} Vikram)`;
  }

  // Month determination
  if (profile.primarySystem === 'SolarSaur') {
    if (profile.id === 'tamil') {
      monthName = { en: TAMIL_MONTHS[solarRashiIdx].en, hi: TAMIL_MONTHS[solarRashiIdx].hi, sa: TAMIL_MONTHS[solarRashiIdx].sa };
    } else if (profile.id === 'bengali') {
      monthName = { en: BENGALI_MONTHS[solarRashiIdx].en, hi: BENGALI_MONTHS[solarRashiIdx].hi, sa: BENGALI_MONTHS[solarRashiIdx].sa };
    } else {
      monthName = { en: LUNAR_MONTHS[solarRashiIdx].en, hi: LUNAR_MONTHS[solarRashiIdx].hi, sa: LUNAR_MONTHS[solarRashiIdx].sa };
    }
  } else if (profile.id === 'iskcon') {
    const monthHindi = info.hinduDate.monthPurnimantaHindi || info.hinduDate.monthHindi;
    const lIdx = LUNAR_MONTHS.findIndex(m => monthHindi.includes(m.hi));
    const iskconIdx = lIdx >= 0 ? lIdx : (solarRashiIdx + 1) % 12;
    monthName = { en: ISKCON_MONTHS[iskconIdx].en, hi: ISKCON_MONTHS[iskconIdx].hi, sa: ISKCON_MONTHS[iskconIdx].sa };
  } else if (profile.primarySystem === 'Purnimanta') {
    const purnHi = info.hinduDate.monthPurnimantaHindi || info.hinduDate.monthHindi;
    const purnObj = LUNAR_MONTHS.find(m => purnHi.includes(m.hi))
      || { en: info.hinduDate.month, hi: purnHi, sa: purnHi };
    monthName = { en: purnObj.en, hi: purnHi, sa: purnObj.sa };
  } else {
    // Amanta (monthly, marathi, gujarati, telugu, kannada, etc.)
    const amanHi = info.hinduDate.monthAmantaHindi || info.hinduDate.monthHindi;
    const amanObj = LUNAR_MONTHS.find(m => amanHi.includes(m.hi))
      || { en: info.hinduDate.month, hi: amanHi, sa: amanHi };
    monthName = { en: amanObj.en, hi: amanHi, sa: amanObj.sa };
  }

  const regionalDayRows = options?.includeMonthRows !== false
    ? generateRegionalDayRows(dateObj, lat, lon, profile, 7)
    : [];

  const specialHighlightsHindi = [
    `क्षेत्रीय प्रणाली: ${profile.name.hi} (${profile.calendarEra} संवत)`,
    `मास पद्धति: ${profile.primarySystem === 'Purnimanta' ? 'पूर्णिमांत (पूर्णिमा पर मास समाप्ति)' : profile.primarySystem === 'Amanta' ? 'अमांत (अमावस्या पर मास समाप्ति)' : 'सौर सौरमान (संक्रांति आधारित)'}`,
    `वर्तमान मास: ${monthName.hi} | संवत: ${yearDisplay}`,
    ...profile.keyDifferencesHindi
  ];

  return {
    profile,
    currentDate: dateStr,
    monthName,
    yearDisplay,
    panchang,
    regionalDayRows,
    specialHighlightsHindi
  };
}

/**
 * High-Level Wrapper: Amanta Panchang (Maharashtra, Gujarat, Karnataka, Andhra, Telangana).
 */
export function calculateAmantaPanchang(
  lat: number,
  lon: number,
  date?: Date | string,
  options?: RegionalOptions
): RegionalPanchangViewData {
  return calculateRegionalPanchang('monthly', lat, lon, date, options);
}

/**
 * High-Level Wrapper: Purnimanta Panchang (North India, Rajasthan, UP, Bihar, MP).
 */
export function calculatePurnimantaPanchang(
  lat: number,
  lon: number,
  date?: Date | string,
  options?: RegionalOptions
): RegionalPanchangViewData {
  return calculateRegionalPanchang('dainik', lat, lon, date, options);
}

/**
 * High-Level Wrapper: Tamil Panchangam (Nirayana Sauramana, Chithirai to Panguni).
 */
export function calculateTamilPanchangam(
  lat: number,
  lon: number,
  date?: Date | string,
  options?: RegionalOptions
): RegionalPanchangViewData {
  return calculateRegionalPanchang('tamil', lat, lon, date, options);
}

/**
 * High-Level Wrapper: Bengali Panjika (Bangabda era, Boishakh to Choitro).
 */
export function calculateBengaliPanjika(
  lat: number,
  lon: number,
  date?: Date | string,
  options?: RegionalOptions
): RegionalPanchangViewData {
  return calculateRegionalPanchang('bengali', lat, lon, date, options);
}

/**
 * High-Level Wrapper: ISKCON Gaudiya Vaishnava Panchang (Gaurabda era, 12 Vishnu Names).
 */
export function calculateISKCONPanchang(
  lat: number,
  lon: number,
  date?: Date | string,
  options?: RegionalOptions
): RegionalPanchangViewData {
  return calculateRegionalPanchang('iskcon', lat, lon, date, options);
}

/**
 * Additional Helper Wrappers
 */
export function calculateMalayalamPanchangam(lat: number, lon: number, date?: Date | string, options?: RegionalOptions): RegionalPanchangViewData {
  return calculateRegionalPanchang('malayalam', lat, lon, date, options);
}

export function calculateOdiaPanjika(lat: number, lon: number, date?: Date | string, options?: RegionalOptions): RegionalPanchangViewData {
  return calculateRegionalPanchang('odia', lat, lon, date, options);
}

export function calculateGujaratiPanchang(lat: number, lon: number, date?: Date | string, options?: RegionalOptions): RegionalPanchangViewData {
  return calculateRegionalPanchang('gujarati', lat, lon, date, options);
}

export function calculateMarathiPanchang(lat: number, lon: number, date?: Date | string, options?: RegionalOptions): RegionalPanchangViewData {
  return calculateRegionalPanchang('marathi', lat, lon, date, options);
}

export function calculateTeluguPanchangam(lat: number, lon: number, date?: Date | string, options?: RegionalOptions): RegionalPanchangViewData {
  return calculateRegionalPanchang('telugu', lat, lon, date, options);
}

export function calculateKannadaPanchangam(lat: number, lon: number, date?: Date | string, options?: RegionalOptions): RegionalPanchangViewData {
  return calculateRegionalPanchang('kannada', lat, lon, date, options);
}

export function getRegionalProfile(type: RegionalPanchangType): RegionalPanchangProfile {
  return REGIONAL_PANCHANG_PROFILES[type] || REGIONAL_PANCHANG_PROFILES.dainik;
}

export function listSupportedRegionalPanchangs(): RegionalPanchangProfile[] {
  return Object.values(REGIONAL_PANCHANG_PROFILES);
}
