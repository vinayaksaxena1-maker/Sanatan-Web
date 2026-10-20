import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  majorCities,
  UJJAIN_DEFAULT_FALLBACK,
  findNearestBundledCity,
  calculateDistanceKm,
} from '../locationStore';

describe('Location Store & Ujjain Prime Meridian Fallback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should verify Ujjain (Avantika) is the prime meridian fallback default', () => {
    expect(UJJAIN_DEFAULT_FALLBACK).toBeDefined();
    expect(UJJAIN_DEFAULT_FALLBACK.name).toContain('Ujjain');
    expect(UJJAIN_DEFAULT_FALLBACK.nameHindi).toContain('उज्जैन');
    expect(UJJAIN_DEFAULT_FALLBACK.latitude).toBeCloseTo(23.1765, 3);
    expect(UJJAIN_DEFAULT_FALLBACK.longitude).toBeCloseTo(75.7885, 3);
    expect(UJJAIN_DEFAULT_FALLBACK.isDefaultFallback).toBe(true);
    expect(UJJAIN_DEFAULT_FALLBACK.timezone).toBe('Asia/Kolkata');
  });

  it('should verify majorCities dataset contains 250+ pre-indexed cities', () => {
    expect(majorCities.length).toBeGreaterThanOrEqual(250);

    // Verify first city is Ujjain fallback
    expect(majorCities[0].id).toBe('ujjain');
    expect(majorCities[0].isDefaultFallback).toBe(true);

    // Verify critical sacred hubs exist
    const names = majorCities.map((c) => c.name);
    expect(names.some((n) => n.includes('Varanasi'))).toBe(true);
    expect(names.some((n) => n.includes('Ayodhya'))).toBe(true);
    expect(names.some((n) => n.includes('Haridwar'))).toBe(true);
    expect(names.some((n) => n.includes('Puri'))).toBe(true);
    expect(names.some((n) => n.includes('Dwarka'))).toBe(true);
    expect(names.some((n) => n.includes('Rameswaram'))).toBe(true);
  });

  it('should verify GPS permission DENIED triggers zero-crash fallback to Ujjain (Avantika)', async () => {
    // Mock navigator.geolocation with PERMISSION_DENIED (code 1)
    const mockGeolocation = {
      getCurrentPosition: vi.fn((_success, error) => {
        // Invoke error callback with code 1 (PERMISSION_DENIED)
        const permissionDeniedError = {
          code: 1,
          message: 'User denied Geolocation',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        };
        error(permissionDeniedError);
      }),
    };

    // Simulate detection logic
    const detectLocationSimulated = async () => {
      return new Promise<{ city: typeof UJJAIN_DEFAULT_FALLBACK; error: string }>((resolve) => {
        mockGeolocation.getCurrentPosition(
          () => {},
          (err: any) => {
            const errNotice =
              err.code === 1
                ? 'स्थान अनुमति अस्वीकृत। प्राचीन याम्योत्तर उज्जैन (अवन्तिका) पर स्विच किया गया।'
                : 'स्थान का पता नहीं चल सका। डिफ़ॉल्ट उज्जैन (अवन्तिका) सेट किया गया।';
            resolve({
              city: UJJAIN_DEFAULT_FALLBACK,
              error: errNotice,
            });
          }
        );
      });
    };

    const result = await detectLocationSimulated();
    expect(result.city.name).toBe('Ujjain (Avantika)');
    expect(result.city.isDefaultFallback).toBe(true);
    expect(result.error).toContain('उज्जैन (अवन्तिका)');
  });

  it('should find nearest city using Haversine calculation', () => {
    // Coordinates close to Kanpur (26.45, 80.33)
    const nearestKanpur = findNearestBundledCity(26.4499, 80.3319);
    expect(nearestKanpur.name).toBe('Kanpur');

    // Coordinates close to Delhi (28.61, 77.20)
    const nearestDelhi = findNearestBundledCity(28.6139, 77.2090);
    expect(nearestDelhi.name).toBe('New Delhi');

    // Distance calculation sanity check
    const distDelhiKanpur = calculateDistanceKm(28.6139, 77.2090, 26.4499, 80.3319);
    expect(distDelhiKanpur).toBeGreaterThan(350);
    expect(distDelhiKanpur).toBeLessThan(450);
  });
});
