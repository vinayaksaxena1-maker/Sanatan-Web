/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Geographic & Location Domain Types
 */

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  altitudeMeters?: number;
  timezone?: string;
}

export interface CityLocation {
  id: string;
  name: string;
  nameHindi: string;
  nameSanskrit?: string;
  state: string;
  stateHindi: string;
  country: string;
  countryHindi: string;
  latitude: number;
  longitude: number;
  timezone: string; // e.g. "Asia/Kolkata", "America/New_York"
  elevationMeters?: number;
  isCapital?: boolean;
  tier?: 1 | 2 | 3;
  isDefaultFallback?: boolean; // Ujjain Prime Meridian (23.1765° N, 75.7885° E)
}

export interface NominatimSearchResult {
  placeId: number | string;
  osmId?: number | string;
  displayName: string;
  latitude: number;
  longitude: number;
  type: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
    county?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
}

export interface LocationSearchState {
  query: string;
  isLoading: boolean;
  results: CityLocation[];
  error?: string | null;
}

export interface UserLocationState {
  currentCity: CityLocation;
  isUsingGPS: boolean;
  isLoading: boolean;
  error?: string | null;
  savedFavoriteCities: CityLocation[];
  recentCities: CityLocation[];
}

export interface TimezoneOffsetDetails {
  timezone: string;
  rawOffsetHours: number;
  dstOffsetHours: number;
  totalOffsetHours: number;
  isDstActive: boolean;
  formattedOffset: string; // e.g. "+05:30", "-04:00"
}
