/**
 * Sanatan Ghadi (सनातन घड़ी)
 * OpenStreetMap Nominatim Live Autocomplete Service
 *
 * Provides free live reverse-geocoding and autocomplete for remote global villages,
 * NRI locations, and hamlets not present in the local database.
 * Complies with OSM Nominatim usage policy (1 request/sec limit, proper User-Agent).
 * Resilient offline fallback: never crashes or throws on network failure / airplane mode.
 *
 * @license MIT
 * @author Vinayak Saxena
 */

import type { CityLocation, NominatimSearchResult } from '../types/location';

export interface NominatimSearchOptions {
  limit?: number;
  countryCodes?: string[];
  signal?: AbortSignal;
  language?: string;
}

interface CacheEntry {
  timestamp: number;
  results: NominatimSearchResult[];
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, CacheEntry>();

/**
 * Clears the in-memory Nominatim cache.
 */
export function clearNominatimCache(): void {
  cache.clear();
}

/**
 * Heuristically guesses timezone name based on country and longitude.
 */
export function guessTimezone(country?: string | null, longitude: number = 0): string {
  const c = (country || '').trim().toLowerCase();
  if (!c) return 'Asia/Kolkata';

  if (c === 'india' || c === 'in' || c === 'भारत') return 'Asia/Kolkata';
  if (c === 'nepal' || c === 'नेपाल') return 'Asia/Kathmandu';
  if (c === 'sri lanka' || c === 'श्रीलंका') return 'Asia/Colombo';
  if (c === 'bangladesh' || c === 'बांग्लादेश') return 'Asia/Dhaka';
  if (c === 'pakistan' || c === 'पाकिस्तान') return 'Asia/Karachi';

  if (c === 'united states' || c === 'usa' || c === 'us' || c === 'america') {
    if (longitude < -115) return 'America/Los_Angeles'; // Pacific
    if (longitude < -100) return 'America/Denver';      // Mountain
    if (longitude < -85) return 'America/Chicago';      // Central
    return 'America/New_York';                         // Eastern
  }
  if (c === 'united kingdom' || c === 'uk' || c === 'great britain' || c === 'england' || c === 'scotland' || c === 'wales') return 'Europe/London';
  if (c === 'ireland') return 'Europe/Dublin';
  if (c === 'canada') {
    if (longitude < -115) return 'America/Vancouver';
    if (longitude < -85) return 'America/Winnipeg';
    return 'America/Toronto';
  }
  if (c === 'australia') {
    if (longitude > 140) return 'Australia/Sydney';
    if (longitude > 130) return 'Australia/Adelaide';
    return 'Australia/Perth';
  }
  if (c === 'new zealand' || c === 'nz') return 'Pacific/Auckland';
  if (c === 'united arab emirates' || c === 'uae' || c === 'dubai' || c === 'abu dhabi') return 'Asia/Dubai';
  if (c === 'saudi arabia') return 'Asia/Riyadh';
  if (c === 'qatar') return 'Asia/Qatar';
  if (c === 'kuwait') return 'Asia/Kuwait';
  if (c === 'bahrain') return 'Asia/Bahrain';
  if (c === 'oman') return 'Asia/Muscat';
  if (c === 'singapore') return 'Asia/Singapore';
  if (c === 'malaysia') return 'Asia/Kuala_Lumpur';
  if (c === 'thailand') return 'Asia/Bangkok';
  if (c === 'indonesia') return 'Asia/Jakarta';
  if (c === 'japan') return 'Asia/Tokyo';
  if (c === 'mauritius') return 'Indian/Mauritius';
  if (c === 'south africa') return 'Africa/Johannesburg';
  if (c === 'kenya') return 'Africa/Nairobi';

  // Major European destinations (CET / CEST)
  if (
    c === 'germany' || c === 'deutschland' ||
    c === 'france' ||
    c === 'italy' || c === 'italia' ||
    c === 'spain' || c === 'españa' ||
    c === 'netherlands' || c === 'holland' ||
    c === 'switzerland' || c === 'schweiz' ||
    c === 'belgium' ||
    c === 'austria' || c === 'österreich' ||
    c === 'sweden' ||
    c === 'norway' ||
    c === 'denmark' ||
    c === 'poland'
  ) {
    return 'Europe/Berlin';
  }

  return 'Asia/Kolkata';
}

/**
 * Converts a NominatimSearchResult into the standard CityLocation interface.
 */
export function convertNominatimToCityLocation(result: NominatimSearchResult): CityLocation {
  const addr = result.address || {};
  const rawName =
    addr.village ||
    addr.town ||
    addr.city ||
    addr.suburb ||
    addr.county ||
    result.displayName.split(',')[0].trim();

  const state = addr.state || addr.county || '';
  const country = addr.country || 'India';
  const lat = parseFloat(Number(result.latitude).toFixed(4));
  const lon = parseFloat(Number(result.longitude).toFixed(4));

  const safeId = `osm-${result.placeId || result.osmId || Math.abs(Math.round(lat * 1000 + lon * 1000))}`;

  return {
    id: safeId,
    name: rawName,
    nameHindi: rawName,
    state,
    stateHindi: state,
    country,
    countryHindi: country === 'India' ? 'भारत' : country,
    latitude: lat,
    longitude: lon,
    timezone: guessTimezone(country, lon),
    tier: 3,
    isCapital: false,
    isDefaultFallback: false,
  };
}

/**
 * Searches OpenStreetMap Nominatim for places matching the query.
 * Safe in offline environments: returns empty array on network failure.
 */
export async function searchNominatim(
  query: string,
  options: NominatimSearchOptions = {}
): Promise<NominatimSearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  const cacheKey = `${trimmed.toLowerCase()}__${options.limit || 5}__${(options.countryCodes || []).join(',')}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.results;
  }

  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', trimmed);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('limit', String(options.limit || 5));
  url.searchParams.set('accept-language', options.language || 'hi,en');

  if (options.countryCodes && options.countryCodes.length > 0) {
    url.searchParams.set('countrycodes', options.countryCodes.join(','));
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const signal = options.signal
      ? AbortSignal.any
        ? AbortSignal.any([options.signal, controller.signal])
        : controller.signal
      : controller.signal;

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (typeof window === 'undefined') {
      headers['User-Agent'] = 'SanatanGhadi/1.0 (https://sanatan-ghadi.org; contact@sanatan-ghadi.org)';
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
      signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      return [];
    }

    const results: NominatimSearchResult[] = data.map((item: any) => ({
      placeId: item.place_id,
      osmId: item.osm_id,
      displayName: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      type: item.type || item.category || 'place',
      address: item.address
        ? {
            city: item.address.city,
            town: item.address.town,
            village: item.address.village,
            suburb: item.address.suburb,
            county: item.address.county,
            state: item.address.state,
            country: item.address.country,
            postcode: item.address.postcode,
          }
        : undefined,
    }));

    cache.set(cacheKey, { timestamp: Date.now(), results });
    return results;
  } catch {
    // Graceful offline fallback: network error or timeout returns empty list
    return [];
  }
}

/**
 * Searches Nominatim and converts the results into CityLocation models.
 */
export async function searchGlobalVillages(
  query: string,
  limit: number = 5,
  options?: NominatimSearchOptions
): Promise<CityLocation[]> {
  const rawResults = await searchNominatim(query, { limit, ...options });
  return rawResults.map(convertNominatimToCityLocation);
}
