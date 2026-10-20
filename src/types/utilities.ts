/**
 * Sanatan Ghadi (सनातन घड़ी)
 * 19 Vedic Astrology & Life Utilities Domain Types
 */

import type { BilingualLabel } from './i18n';
import type { CityLocation } from './location';
import type { TimeRange, MuhuratCategory } from './muhurat';

export type UtilityId =
  | 'sade-sati'
  | 'guna-milan'
  | 'ratna'
  | 'rudraksha'
  | 'manglik'
  | 'kaal-sarp'
  | 'pitra-dosha'
  | 'baby-names'
  | 'shani-dhaiya'
  | 'purpose-muhurat'
  | 'vastu'
  | 'gochar-transit'
  | 'numerology'
  | 'varshphal'
  | 'panchak-shanti'
  | 'gandmool-check'
  | 'daily-mantra'
  | 'dasha-countdown'
  | 'vrat-planner';

export interface UtilityMeta {
  id: UtilityId;
  title: BilingualLabel;
  tagline: BilingualLabel;
  iconName: string;
  category: 'Astrology' | 'Dharmic' | 'Remedies' | 'Calculators';
  badgeHindi?: string;
}

// 1. Sade Sati Calculator
export interface SadeSatiPhase {
  phaseName: 'Rising' | 'Peak' | 'Setting' | 'None';
  phaseNameHindi: 'चढ़ती' | 'मध्य (शिखर)' | 'उतरती' | 'मुक्त';
  startDate: string;
  endDate: string;
  shaniSignHindi: string;
  effectsSummaryHindi: string;
}

export interface SadeSatiReport {
  moonSign: string;
  moonSignHindi: string;
  currentStatus: 'Active' | 'NotActive';
  currentPhase?: SadeSatiPhase;
  allPhases: SadeSatiPhase[];
  remediesHindi: string[];
}

// 2. Kundli Milan (36 Guna Match)
export interface AshtakootItem {
  kootName: 'Varna' | 'Vashya' | 'Tara' | 'Yoni' | 'Maitri' | 'Gana' | 'Bhakoot' | 'Nadi';
  kootHindi: string;
  maxPoints: number;
  obtainedPoints: number;
  brideAttribute: string;
  groomAttribute: string;
  descriptionHindi: string;
  isDoshPresent: boolean;
}

export interface GunaMilanReport {
  groomName: string;
  brideName: string;
  totalScore: number; // 0 to 36
  minimumRequired: number; // 18
  isRecommended: boolean;
  verdictHindi: string;
  kootBreakdown: AshtakootItem[];
  doshaExceptionsHindi: string[];
}

// 3. Ratna / Gemstone Recommendation
export interface RatnaRecommendation {
  primaryGemstone: BilingualLabel;
  substituteGemstones: BilingualLabel[];
  rulingPlanet: BilingualLabel;
  metalHindi: string;
  fingerHindi: string;
  wearingDayHindi: string;
  auspiciousTithiHindi: string;
  mantra: string;
  precautionsHindi: string[];
}

// 4. Rudraksha Recommendation
export interface RudrakshaRecommendation {
  recommendedMukhi: number; // 1 to 21
  mukhiTitleHindi: string;
  deity: BilingualLabel;
  rulingPlanet: BilingualLabel;
  spiritualBenefitsHindi: string[];
  wearingProcedureHindi: string;
}

// 5. Manglik Dosha Analysis
export interface ManglikAnalysis {
  isManglik: boolean;
  intensity: 'High' | 'Low' | 'Cancelled' | 'None';
  marsHouse: number;
  marsSignHindi: string;
  cancellationReasonsHindi: string[];
  marriageGuidanceHindi: string;
}

// 6. Kaal Sarp Dosha Check
export interface KaalSarpAnalysis {
  hasKaalSarp: boolean;
  yogaName?: string;
  yogaHindi?: string;
  rahuHouse?: number;
  ketuHouse?: number;
  direction?: 'Udit' | 'Anudit';
  effectsHindi: string;
  remediesHindi: string[];
}

// 7. Pitra Dosha Check
export interface PitraDoshaAnalysis {
  hasDosha: boolean;
  severity: 'Severe' | 'Moderate' | 'Mild' | 'None';
  planetaryCausesHindi: string[];
  remediesHindi: string[];
}

// 8. Baby Name Finder by Nakshatra Pada
export interface BabyNameRecommendation {
  nakshatra: string;
  nakshatraHindi: string;
  pada: number;
  startingSyllables: string[]; // e.g. ["चू", "चे", "चो", "ला"]
  recommendedNamesBoy: string[];
  recommendedNamesGirl: string[];
  zodiacSignHindi: string;
}

// 9. Shani Dhaiya Period
export interface ShaniDhaiyaReport {
  isUnderDhaiya: boolean;
  shaniPositionSignHindi: string;
  dhaiyaType: '4th House' | '8th House' | 'None';
  dhaiyaTypeHindi: 'चतुर्थ (कंटक)' | 'अष्टम' | 'कोई नहीं';
  startDate?: string;
  endDate?: string;
  remediesHindi: string[];
}

// 10. Shubh Muhurat Purpose Finder
export interface PurposeMuhuratFinderQuery {
  category: MuhuratCategory;
  city: CityLocation;
  dateRange: { start: string; end: string };
}

// 11. Vastu Compass & Direction Guide
export interface VastuDirectionGuide {
  directionName: 'North' | 'North-East' | 'East' | 'South-East' | 'South' | 'South-West' | 'West' | 'North-West';
  directionHindi: 'उत्तर' | 'ईशान' | 'पूर्व' | 'आग्नेय' | 'दक्षिण' | 'नैऋत्य' | 'पश्चिम' | 'वायव्य';
  deityHindi: string;
  rulingPlanetHindi: string;
  idealRoomsHindi: string[];
  strictlyProhibitedHindi: string[];
  colorHarmonyHex: string;
}

// 12. Graha Gochar / Transit Radar
export interface GocharTransitItem {
  planet: string;
  planetHindi: string;
  transitSign: string;
  transitSignHindi: string;
  transitHouseFromMoon: number;
  nature: 'Auspicious' | 'Inauspicious' | 'Neutral';
  effectsSummaryHindi: string;
}

export interface GocharTransitReport {
  moonSign: string;
  moonSignHindi: string;
  currentDate: string;
  transits: GocharTransitItem[];
}

// 13. Numerology / Ank Jyotish
export interface NumerologyReport {
  mulank: number;     // Birth date sum (1 to 9)
  bhagyank: number;   // Full date of birth sum (1 to 9)
  namank: number;     // Name letter sum
  rulingPlanetHindi: string;
  luckyDaysHindi: string[];
  luckyColorsHindi: string[];
  compatibleNumbers: number[];
  incompatibleNumbers: number[];
  generalCharacteristicsHindi: string;
}

// 14. Varshphal / Annual Solar Return Chart
export interface VarshphalReport {
  yearOfAge: number;
  solarReturnDate: string;
  munthaSignHindi: string;
  munthaHouse: number;
  varshapatiPlanetHindi: string;
  annualPredictionSummaryHindi: string;
}

// 15. Panchak Shanti Guidance
export interface PanchakGuidance {
  isPanchakActive: boolean;
  panchakTypeHindi: string; // e.g. "रोग पंचक", "अग्नि पंचक", "राज पंचक", "चोर पंचक", "मृत्यु पंचक"
  nakshatraHindi: string;
  prohibitedActionsHindi: string[];
  shantiRemediesHindi: string[];
}

// 16. Gandmool Dosha Check
export interface GandmoolCheck {
  isGandmool: boolean;
  nakshatraName: string;
  nakshatraHindi: string;
  pada: number;
  padaImpactHindi: string;
  shantiDayInfoHindi: string; // 27th day shanti vidhi
}

// 17. Daily Mantra & Stotra Generator
export interface DailyMantraStotra {
  dayLordHindi: string;
  primaryDeityHindi: string;
  mantraDevanagari: string;
  mantraMeaningHindi: string;
  stotraDevanagari?: string;
  chantingCount: number; // typically 108 or 11
  audioSampleUrl?: string;
}

// 18. Dasha Period Countdown
export interface DashaCountdown {
  mahaDashaLordHindi: string;
  antarDashaLordHindi: string;
  endDate: string;
  daysRemaining: number;
  transitionMessageHindi: string;
}

// 19. Fasting & Vrat Planner
export interface VratPlannerItem {
  id: string;
  vratName: BilingualLabel;
  date: string;
  tithiHindi: string;
  foodRulesHindi: string[];
  paranaTiming: TimeRange;
  isObservedByUser: boolean;
}
