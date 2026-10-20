/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Core Vedic Panchang Domain Models
 */

import type { BilingualLabel } from './i18n';
import type { CityLocation } from './location';
import type {
  TimeRange,
  ChoghadiyaSlot,
  HoraSlot,
  ShubhYogDetail,
} from './muhurat';

export type PakshaType = 'Shukla' | 'Krishna';

export interface TithiDetail {
  value: number; // 1 to 30 (1-15 Shukla, 16-30 Krishna)
  name: string;
  hindiName: string;
  sanskritName?: string;
  paksha: PakshaType;
  startTime?: string;
  endTime: string;
  percentPassed?: number; // 0 to 100%
  lord: string;
  lordHindi: string;
  deity: string;
  deityHindi: string;
  isKshaya?: boolean;
  isVriddhi?: boolean;
  infoTip?: string;
}

export interface NakshatraDetail {
  value: number; // 1 to 27 (Ashwini to Revati)
  name: string;
  hindiName: string;
  sanskritName?: string;
  startTime?: string;
  endTime: string;
  pada: number; // 1 to 4
  padaEndTime?: string;
  lord: string;
  lordHindi: string;
  deity: string;
  deityHindi: string;
  symbol: string;
  gana?: 'Deva' | 'Manushya' | 'Rakshasa';
  ganaHindi?: string;
  yoni?: string;
  yoniHindi?: string;
  nadi?: 'Adi' | 'Madhya' | 'Antya';
  nadiHindi?: string;
  nature?: string;
  natureHindi?: string;
  isGandMool?: boolean;
  suitableActivities?: string[];
  avoidActivities?: string[];
  infoTip?: string;
}

export interface YogaDetail {
  value: number; // 1 to 27 (Vishkambha to Vaidhriti)
  name: string;
  hindiName: string;
  sanskritName?: string;
  startTime?: string;
  endTime: string;
  isAuspicious: boolean;
  type: 'Shubh' | 'Ashubh';
  meaning?: string;
  meaningHindi?: string;
  infoTip?: string;
}

export interface KaranaDetail {
  value: number; // 1 to 60 (or repeating 1 to 11: Bava to Kimstughna)
  name: string;
  hindiName: string;
  sanskritName?: string;
  startTime?: string;
  endTime: string;
  nature: 'Movable' | 'Fixed';
  natureHindi: 'चर' | 'स्थिर';
  classification: 'Shubh' | 'Ashubh';
  isVishtiBhadra?: boolean;
  bhadraResidence?: 'Swarga' | 'Bhumi' | 'Patala';
  bhadraResidenceHindi?: 'स्वर्ग' | 'पृथ्वी' | 'पाताल';
  infoTip?: string;
}

export interface BhadraDetail {
  active: boolean;
  startTime?: string;
  endTime?: string;
  vas: 'Swarga' | 'Bhumi' | 'Patala';
  vasHindi: 'स्वर्ग' | 'पृथ्वी' | 'पाताल';
  mukha?: string;
  puchha?: string;
  isAuspicious: boolean;
  impactDescription: string;
  impactDescriptionHindi: string;
}

export interface PlanetPosition {
  id: string; // 'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn' | 'rahu' | 'ketu'
  name: string;
  hindiName: string;
  sanskritName: string;
  longitude: number; // 0.00 to 359.99°
  latitude?: number;
  dailyMotionSpeed: number; // deg/day
  signIndex: number; // 0 to 11 (Aries to Pisces)
  signName: string;
  signHindi: string;
  house: number; // 1 to 12
  degreeInSign: number; // 0.00 to 29.99°
  formattedDegree: string; // e.g. "14° 32' 18\""
  nakshatra: string;
  nakshatraHindi: string;
  nakshatraPada: number; // 1 to 4
  isRetrograde: boolean;
  isCombust: boolean;
  angularDistanceToSun?: number;
}

export interface SuryaChakraDetail {
  sunrise: string;
  sunset: string;
  solarNoon: string;
  dayDurationFormatted: string;
  nightDurationFormatted: string;
  sunSign: string;
  sunSignHindi: string;
  suryaNakshatra: string;
  suryaNakshatraHindi: string;
  suryaPada: number;
  ayana: 'Uttarayana' | 'Dakshinayana';
  ayanaHindi: 'उत्तरायण' | 'दक्षिणायन';
  solarRitu: string;
  solarRituHindi: string;
}

export interface ChandraDetail {
  moonrise: string;
  moonset: string;
  moonSign: string;
  moonSignHindi: string;
  chandraNakshatra: string;
  chandraNakshatraHindi: string;
  chandraPada: number;
  illuminationPercent: number; // 0 to 100%
  phaseName: string;
  phaseNameHindi: string;
  lunarAgeDays: number;
}

export interface SamvatDetail {
  vikramSamvat: number;
  shakaSamvat: number;
  gujaratiSamvat?: number;
  samvatsaraName: string;
  samvatsaraHindi: string;
  amantaMonth: string;
  amantaMonthHindi: string;
  purnimantaMonth: string;
  purnimantaMonthHindi: string;
  solarMonth?: string;
  solarMonthHindi?: string;
  isLeapMonth?: boolean; // Adhik Maas
}

export interface PanchakDetail {
  active: boolean;
  name: string;
  hindiName: string;
  type: string;
  typeHindi: string;
  description: string;
  descriptionHindi: string;
}

export interface GandMoolDetail {
  isGandMool: boolean;
  nakshatraName: string;
  nakshatraHindiName: string;
  rulingPlanet: string;
  rulingPlanetHindi: string;
  description: string;
  descriptionHindi: string;
}

export interface AgniVaasDetail {
  residence: 'Earth' | 'Sky' | 'Netherworld';
  residenceHindi: 'पृथ्वी' | 'आकाश' | 'पाताल';
  isAuspicious: boolean;
  description: string;
}

export interface ShivaVaasDetail {
  residence: 'Kailash' | 'Gauri' | 'Vrishabha' | 'Sabha' | 'Bhojan' | 'Kreeda' | 'Shmashan';
  residenceHindi: 'कैलाश' | 'गौरी के साथ' | 'वृषभ पर' | 'सभा में' | 'भोजन में' | 'क्रीड़ा में' | 'श्मशान में';
  isAuspicious: boolean;
  description: string;
}

export interface PushkarYogDetail {
  active: boolean;
  name: string;
  hindiName: string;
  type: 'Dwipushkar' | 'Tripushkar' | 'None';
  description: string;
  suitability: string;
}

export interface InauspiciousPeriods {
  rahuKaal: TimeRange;
  gulikKaal: TimeRange;
  yamagandam: TimeRange;
  durmuhurat: TimeRange[];
  varjyam: TimeRange[];
  bhadra?: BhadraDetail;
  panchak?: PanchakDetail;
  gandMool?: GandMoolDetail;
}

export interface AuspiciousPeriods {
  abhijit: TimeRange;
  brahmaMuhurat: TimeRange;
  amritKaal?: TimeRange[];
  vijayMuhurat?: TimeRange;
  godhuli?: TimeRange;
  shubhYogas?: ShubhYogDetail[];
  pushkarYog?: PushkarYogDetail;
}

export interface HinduDayDetails {
  tithi: TithiDetail;
  tithiNext?: TithiDetail; // If tithi ends during the day
  nakshatra: NakshatraDetail;
  nakshatraNext?: NakshatraDetail;
  yoga: YogaDetail;
  yogaNext?: YogaDetail;
  karana: KaranaDetail;
  karanaNext?: KaranaDetail;
  paksha: PakshaType;
  samvat: SamvatDetail;
  dayLord: string;
  dayLordHindi: string;
}

export interface PanchangFestivalSummary {
  id: string;
  name: BilingualLabel;
  isMajor: boolean;
  fastingNote?: BilingualLabel;
}

/**
 * Master Panchang Data Contract
 * Read-only contract consumed by UI components from AstroEngine
 */
export interface PanchangData {
  date: string; // ISO format "YYYY-MM-DD"
  location: CityLocation;
  hinduDate: HinduDayDetails;
  suryaChakra: SuryaChakraDetail;
  chandraChakra: ChandraDetail;
  inauspicious: InauspiciousPeriods;
  auspicious: AuspiciousPeriods;
  choghadiyaDay: ChoghadiyaSlot[];
  choghadiyaNight: ChoghadiyaSlot[];
  horaDay: HoraSlot[];
  horaNight: HoraSlot[];
  planets: PlanetPosition[];
  festivals: PanchangFestivalSummary[];
  agniVaas?: AgniVaasDetail;
  shivaVaas?: ShivaVaasDetail;
  calculationTimestamp: number;
}
