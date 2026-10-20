/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Kundli, Shodashvarga (D1-D60), Dasha & Vedic Astrology Domain Types
 */

import type { CityLocation } from './location';
import type { PlanetPosition } from './panchang';

export type ChartStyle = 'North' | 'South' | 'East';

export type AyanamshaSystem = 'Lahiri' | 'Raman' | 'KP' | 'TrueChitra';

export type DivisionalChartType =
  | 'D1'  // Rashi (General Life)
  | 'D2'  // Hora (Wealth)
  | 'D3'  // Drekkana (Siblings, Courage)
  | 'D4'  // Chaturthamsha (Destiny, Assets)
  | 'D7'  // Saptamsha (Children, Progeny)
  | 'D9'  // Navamsha (Dharma, Spouse, Inner Potential)
  | 'D10' // Dashamsha (Career, Profession)
  | 'D12' // Dwadashamsha (Parents, Lineage)
  | 'D16' // Shodashamsha (Vehicles, Pleasures)
  | 'D20' // Vimshamsha (Spiritual Progress)
  | 'D24' // Chaturvimshamsha (Higher Knowledge)
  | 'D27' // Saptavimshamsha (Strengths & Weaknesses)
  | 'D30' // Trimshamsha (Misfortunes, Arishta)
  | 'D40' // Khavedamsha (Auspicious Effects)
  | 'D45' // Akshavedamsha (General Well-being)
  | 'D60';// Shashtiamsha (All Matters, Past Karma)

export interface ZodiacSignInfo {
  index: number; // 0 to 11 (Mesha to Meena)
  name: string;
  hindiName: string;
  sanskritName: string;
  symbol: string;
  ruler: string;
  rulerHindi: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  elementHindi: 'अग्नि' | 'पृथ्वी' | 'वायु' | 'जल';
  modality: 'Chara' | 'Sthira' | 'Dwisvabhava';
  modalityHindi: 'चर' | 'स्थिर' | 'द्विस्वभाव';
}

export interface HouseCuspDetail {
  houseNumber: number; // 1 to 12
  signIndex: number;   // 0 to 11
  signName: string;
  signHindi: string;
  degree: number;      // 0 to 30
  formattedDegree: string;
  sandhiStartDegree: number;
  sandhiEndDegree: number;
  planetsPresent: string[]; // Planet names or IDs
  significationsHindi: string[];
}

export interface DivisionalPlanetPosition {
  name: string;
  hindiName: string;
  signIndex: number;
  signName: string;
  signHindi: string;
  house: number; // 1 to 12
  degreeInSign: number;
  formattedDegree: string;
  isRetrograde: boolean;
  isCombust?: boolean;
  isVargottama?: boolean; // When D1 and D9 sign match
  isPushkar?: boolean;
}

export interface DivisionalChart {
  type: DivisionalChartType;
  title: string;
  titleHindi: string;
  sanskritTitle: string;
  description: string;
  ascendantSignIndex: number;
  ascendantDegree: number;
  planets: DivisionalPlanetPosition[];
  houses: HouseCuspDetail[];
}

/**
 * Foolproof 3-Dropdown Birth Time Representation
 * Prevents 180° Inverted Lagna Trap
 */
export interface FoolproofBirthTime {
  hour12: number;       // 1 to 12
  minute: number;       // 0 to 59
  meridiem: 'AM' | 'PM';
  confirmationBannerHindi: string; // e.g., "✅ रात के 11:35 बजे (PM) — जन्म तिथि से अगला दिन नहीं"
  calculated24HourTime: string;    // "23:35:00"
}

export interface BirthInputDetails {
  personName: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string;    // "YYYY-MM-DD"
  birthTime: FoolproofBirthTime;
  birthCity: CityLocation;
}

export interface DashaPeriod {
  planet: string;
  planetHindi: string;
  startDate: string;
  endDate: string;
  durationYears: number;
}

export interface PratyantarDashaItem extends DashaPeriod {}

export interface AntarDashaItem extends DashaPeriod {
  pratyantar?: PratyantarDashaItem[];
}

export interface MahaDashaItem extends DashaPeriod {
  antarDasha: AntarDashaItem[];
}

export interface VimshottariDashaHierarchy {
  balanceAtBirth: {
    planet: string;
    planetHindi: string;
    balanceYears: number;
    balanceMonths: number;
    balanceDays: number;
  };
  currentMahaDasha: string;
  currentAntarDasha: string;
  currentPratyantarDasha: string;
  mahaDashas: MahaDashaItem[];
}

export interface AshtakavargaSignScores {
  signIndex: number; // 0 to 11
  signName: string;
  signHindi: string;
  scores: {
    sun: number;
    moon: number;
    mars: number;
    mercury: number;
    jupiter: number;
    venus: number;
    saturn: number;
    sarvashtakavarga: number; // Total points (invariable sum 337 across all 12 signs)
  };
}

export interface AshtakavargaSummary {
  signScores: AshtakavargaSignScores[];
  totalPoints: number; // Invariable invariant = 337
  is337SumVerified: boolean;
}

export interface ShadbalaItem {
  planet: string;
  planetHindi: string;
  totalVirupas: number;
  requiredVirupas: number;
  ratio: number; // Shadbala Pinda (total / required)
  rank: number;  // 1 to 7
  isStrong: boolean;
}

export interface ShadbalaSummary {
  planets: ShadbalaItem[];
  strongestPlanet: string;
  weakestPlanet: string;
}

export interface KundliYoga {
  id: string;
  name: string;
  hindiName: string;
  category: 'Raja' | 'Dhana' | 'Mahapurusha' | 'Viparita' | 'NeechaBhanga' | 'Ashubh';
  formingPlanets: string[];
  description: string;
  descriptionHindi: string;
  resultHindi: string;
  intensity: 'High' | 'Medium' | 'Low';
}

export interface KundliDoshas {
  manglik: {
    isManglik: boolean;
    type: 'None' | 'Anshik' | 'Poorna';
    reasonHindi: string;
    cancellationFactors: string[];
  };
  kaalSarp: {
    hasKaalSarp: boolean;
    type?: string;
    typeHindi?: string;
    direction?: 'Ascending' | 'Descending';
    descriptionHindi: string;
  };
  pitraDosha: {
    hasPitraDosha: boolean;
    intensity: 'High' | 'Moderate' | 'None';
    descriptionHindi: string;
  };
  gandmool: {
    isGandmool: boolean;
    nakshatraName?: string;
    descriptionHindi: string;
  };
}

export interface LalKitabRemedy {
  id: string;
  planet: string;
  planetHindi: string;
  title: string;
  titleHindi: string;
  simpleRemedyHindi: string;
  precautionsHindi: string[];
  category: 'Dan' | 'Pooja' | 'Lifestyle' | 'Dharan';
}

/**
 * Complete Royal Dharmic Kundli Suite Chart Model
 */
export interface KundliChart {
  id: string;
  birthDetails: BirthInputDetails;
  ayanamsha: {
    system: AyanamshaSystem;
    degrees: number;
    formatted: string;
  };
  ascendant: {
    signIndex: number;
    signName: string;
    signHindi: string;
    degreeInSign: number;
    formattedDegree: string;
    nakshatra: string;
    nakshatraHindi: string;
    pada: number;
  };
  planets: PlanetPosition[];
  houses: HouseCuspDetail[];
  charts: {
    [key in DivisionalChartType]?: DivisionalChart;
  };
  dashas: VimshottariDashaHierarchy;
  ashtakavarga: AshtakavargaSummary;
  shadbala: ShadbalaSummary;
  yogas: KundliYoga[];
  doshas: KundliDoshas;
  remedies: LalKitabRemedy[];
  createdTimestamp: number;
}
