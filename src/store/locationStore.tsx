/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Location Store & Ujjain Prime Meridian Fallback System
 * Guaranteed 0 crash on GPS permission denial (Instant Ujjain Mahakal fallback)
 */

import { useState, useCallback, createContext, useContext, type ReactNode } from 'react';
import type { CityLocation } from '../types/location';
import majorCitiesData from '../data/majorCities250.json';
import { searchCitiesDatabase } from '../engine/citiesDatabase';

export const majorCities = majorCitiesData as CityLocation[];

// Ujjain Prime Meridian Fallback Definition (23.1765° N, 75.7885° E)
export const UJJAIN_DEFAULT_FALLBACK: CityLocation = majorCities.find(
  (c) => c.isDefaultFallback || c.id === 'ujjain'
) || {
  id: 'ujjain',
  name: 'Ujjain (Avantika)',
  nameHindi: 'उज्जैन (अवन्तिका)',
  state: 'Madhya Pradesh',
  stateHindi: 'मध्य प्रदेश',
  country: 'India',
  countryHindi: 'भारत',
  latitude: 23.1765,
  longitude: 75.7885,
  timezone: 'Asia/Kolkata',
  isDefaultFallback: true,
  tier: 1,
};

const STORAGE_LOCATION_KEY = 'sanatan_selected_city';
const STORAGE_RECENTS_KEY = 'sanatan_recent_cities';
const STORAGE_FAVORITES_KEY = 'sanatan_favorite_cities';

function toRad(val: number): number {
  return (val * Math.PI) / 180;
}

export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function findNearestBundledCity(latitude: number, longitude: number): CityLocation {
  let closest: CityLocation = majorCities[0] || UJJAIN_DEFAULT_FALLBACK;
  let minDistance = Infinity;

  for (const city of majorCities) {
    const dist = calculateDistanceKm(latitude, longitude, city.latitude, city.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closest = city;
    }
  }

  return closest;
}

export interface LocationStoreValue {
  currentCity: CityLocation;
  isLocating: boolean;
  hasGpsPermission: boolean | null;
  error: string | null;
  recentCities: CityLocation[];
  favoriteCities: CityLocation[];
  setCity: (city: CityLocation) => void;
  detectDeviceLocation: () => Promise<CityLocation>;
  searchCities: (query: string) => CityLocation[];
  searchTownsAsync: (query: string, includeGlobal?: boolean) => Promise<CityLocation[]>;
  toggleFavorite: (city: CityLocation) => void;
  isFavorite: (cityId: string) => boolean;
}

const LocationContext = createContext<LocationStoreValue | null>(null);

export interface LocationProviderProps {
  children: ReactNode;
  initialCity?: CityLocation;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
  initialCity,
}) => {
  const [currentCity, setCurrentCityState] = useState<CityLocation>(() => {
    if (initialCity) return initialCity;
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_LOCATION_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.latitude && parsed.longitude) {
            return parsed;
          }
        }
      } catch {
        // storage disabled
      }
    }
    return UJJAIN_DEFAULT_FALLBACK;
  });

  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [hasGpsPermission, setHasGpsPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [recentCities, setRecentCities] = useState<CityLocation[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_RECENTS_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [UJJAIN_DEFAULT_FALLBACK];
  });

  const [favoriteCities, setFavoriteCities] = useState<CityLocation[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [UJJAIN_DEFAULT_FALLBACK];
  });

  const setCity = useCallback((city: CityLocation) => {
    setCurrentCityState(city);
    setError(null);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_LOCATION_KEY, JSON.stringify(city));
        setRecentCities((prev) => {
          const filtered = prev.filter((c) => c.id !== city.id);
          const updated = [city, ...filtered].slice(0, 10);
          localStorage.setItem(STORAGE_RECENTS_KEY, JSON.stringify(updated));
          return updated;
        });
      } catch {
        // ignore
      }
    }
  }, []);

  /**
   * Device Geolocation Detector
   * On permission denial or failure, instantly sets Ujjain Mahakal fallback with 0 crash
   */
  const detectDeviceLocation = useCallback(async (): Promise<CityLocation> => {
    setIsLocating(true);
    setError(null);

    return new Promise<CityLocation>((resolve) => {
      if (typeof navigator === 'undefined' || !navigator.geolocation) {
        setIsLocating(false);
        setHasGpsPermission(false);
        setError('ब्राउज़र द्वारा जीपीएस समर्थित नहीं है। डिफ़ॉल्ट उज्जैन सेट किया गया।');
        setCity(UJJAIN_DEFAULT_FALLBACK);
        resolve(UJJAIN_DEFAULT_FALLBACK);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = parseFloat(position.coords.latitude.toFixed(4));
          const lon = parseFloat(position.coords.longitude.toFixed(4));

          const nearest = findNearestBundledCity(lat, lon);
          const userCity: CityLocation = {
            ...nearest,
            id: `gps-${lat}-${lon}`,
            name: `${nearest.name} (GPS)`,
            nameHindi: `${nearest.nameHindi} (जीपीएस)`,
            latitude: lat,
            longitude: lon,
          };

          setIsLocating(false);
          setHasGpsPermission(true);
          setCity(userCity);
          resolve(userCity);
        },
        (geoError) => {
          // GPS Permission Denied (code 1) or Timeout
          setIsLocating(false);
          setHasGpsPermission(false);
          const errNotice =
            geoError.code === 1
              ? 'स्थान अनुमति अस्वीकृत। प्राचीन याम्योत्तर उज्जैन (अवन्तिका) पर स्विच किया गया।'
              : 'स्थान का पता नहीं चल सका। डिफ़ॉल्ट उज्जैन (अवन्तिका) सेट किया गया।';
          setError(errNotice);
          setCity(UJJAIN_DEFAULT_FALLBACK);
          resolve(UJJAIN_DEFAULT_FALLBACK);
        },
        {
          timeout: 10000,
          maximumAge: 60000,
          enableHighAccuracy: false,
        }
      );
    });
  }, [setCity]);

  /**
   * Fast In-Memory Fuzzy Search against 250+ Major Cities
   */
  const searchCities = useCallback((query: string): CityLocation[] => {
    if (!query || query.trim() === '') {
      return majorCities.slice(0, 30);
    }

    const clean = query.trim().toLowerCase();
    return majorCities
      .filter((city) => {
        const matchName = city.name.toLowerCase().includes(clean);
        const matchHindi = city.nameHindi.includes(query.trim());
        const matchState = city.state.toLowerCase().includes(clean);
        const matchStateHindi = city.stateHindi.includes(query.trim());
        return matchName || matchHindi || matchState || matchStateHindi;
      })
      .slice(0, 30);
  }, []);

  const toggleFavorite = useCallback((city: CityLocation) => {
    setFavoriteCities((prev) => {
      const exists = prev.some((c) => c.id === city.id);
      let updated: CityLocation[];
      if (exists) {
        updated = prev.filter((c) => c.id !== city.id);
      } else {
        updated = [...prev, city];
      }
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
      }
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (cityId: string) => favoriteCities.some((c) => c.id === cityId),
    [favoriteCities]
  );

  const searchTownsAsync = useCallback(
    async (query: string, includeGlobal: boolean = false): Promise<CityLocation[]> => {
      return searchCitiesDatabase(query, { includeGlobalNominatim: includeGlobal });
    },
    []
  );

  return (
    <LocationContext.Provider
      value={{
        currentCity,
        isLocating,
        hasGpsPermission,
        error,
        recentCities,
        favoriteCities,
        setCity,
        detectDeviceLocation,
        searchCities,
        searchTownsAsync,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export function useLocationStore(): LocationStoreValue {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationStore must be used within a LocationProvider');
  }
  return context;
}
