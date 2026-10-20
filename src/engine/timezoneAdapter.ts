/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Native Intl Daylight Saving Time (DST) & NRI Timezone Adapter
 *
 * Implements high-precision timezone offset resolution using the native
 * ECMAScript Intl.DateTimeFormat API. Zero third-party dependencies.
 * Defends against 1-hour DST drift across USA, UK, Europe, Australia, and Middle East.
 *
 * @license MIT
 * @author Vinayak Saxena
 */

import type { CityLocation, TimezoneOffsetDetails } from '../types/location';

const DEFAULT_TIMEZONE = 'Asia/Kolkata';

/**
 * Validates and normalizes a timezone string, falling back to Asia/Kolkata if invalid.
 */
export function normalizeTimezone(tzOrCity?: string | CityLocation | null): string {
  if (!tzOrCity) return DEFAULT_TIMEZONE;
  const rawTz = typeof tzOrCity === 'object' ? tzOrCity.timezone : tzOrCity;
  if (!rawTz || typeof rawTz !== 'string') return DEFAULT_TIMEZONE;
  const tz = rawTz.trim();
  if (!tz) return DEFAULT_TIMEZONE;

  try {
    // Check if supported by Intl
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return tz;
  } catch {
    return DEFAULT_TIMEZONE;
  }
}

/**
 * Returns the exact difference in minutes between wall-clock time in the given timezone
 * and UTC for a specific moment in time.
 * Positive = East of UTC (e.g. +330 for India).
 * Negative = West of UTC (e.g. -300 for New York EST, -240 for New York EDT).
 */
export function getTimezoneOffsetMinutes(timezone: string, date: Date = new Date()): number {
  const validTz = normalizeTimezone(timezone);
  const safeDate = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();

  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: validTz,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hourCycle: 'h23',
    });

    const parts = formatter.formatToParts(safeDate);
    const partMap: Record<string, string> = {};
    for (const p of parts) {
      partMap[p.type] = p.value;
    }

    const targetYear = parseInt(partMap.year, 10);
    const targetMonth = parseInt(partMap.month, 10) - 1;
    const targetDay = parseInt(partMap.day, 10);
    const targetHour = parseInt(partMap.hour, 10);
    const targetMinute = parseInt(partMap.minute, 10);
    const targetSecond = parseInt(partMap.second, 10);

    const targetAsUtc = Date.UTC(
      targetYear,
      targetMonth,
      targetDay,
      targetHour,
      targetMinute,
      targetSecond
    );

    const diffMs = targetAsUtc - safeDate.getTime();
    return Math.round(diffMs / 60000);
  } catch {
    // Asia/Kolkata fallback: UTC + 5:30
    return 330;
  }
}

/**
 * Formats a minute offset into standard ISO 8601 offset notation (e.g. "+05:30", "-04:00", "+00:00").
 */
export function formatTimezoneOffset(totalMinutes: number): string {
  if (isNaN(totalMinutes)) return '+05:30';
  const sign = totalMinutes >= 0 ? '+' : '-';
  const absMin = Math.abs(totalMinutes);
  const hours = Math.floor(absMin / 60);
  const minutes = absMin % 60;
  return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Computes standard (raw) offset and daylight saving time (DST) offset for any city or IANA timezone.
 * Uses native Intl.DateTimeFormat with zero dependencies.
 *
 * Verification: New York shifts from -05:00 (EST) to -04:00 (EDT) with exact 1-hour DST offset.
 */
export function getTimezoneOffsetWithDST(
  cityOrTimezone: CityLocation | string,
  date: Date = new Date()
): TimezoneOffsetDetails {
  const tz = normalizeTimezone(cityOrTimezone);
  const safeDate = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  const currentMinutes = getTimezoneOffsetMinutes(tz, safeDate);

  // In standard DST regimes, standard time is the minimum offset over the year
  // (because DST always adds an offset, moving the clock forward).
  const year = safeDate.getUTCFullYear();
  const janDate = new Date(Date.UTC(year, 0, 15, 12, 0, 0));
  const julDate = new Date(Date.UTC(year, 6, 15, 12, 0, 0));

  const janMinutes = getTimezoneOffsetMinutes(tz, janDate);
  const julMinutes = getTimezoneOffsetMinutes(tz, julDate);

  const standardMinutes = Math.min(janMinutes, julMinutes);
  const dstMinutes = Math.max(0, currentMinutes - standardMinutes);
  const isDstActive = dstMinutes > 0;

  return {
    timezone: tz,
    rawOffsetHours: standardMinutes / 60,
    dstOffsetHours: dstMinutes / 60,
    totalOffsetHours: currentMinutes / 60,
    isDstActive,
    formattedOffset: formatTimezoneOffset(currentMinutes),
  };
}

/**
 * Returns total decimal offset hours for a given city and date (e.g. 5.5 for IST, -4.0 for EDT).
 */
export function getTimezoneOffsetHours(
  cityOrTimezone: CityLocation | string,
  date: Date = new Date()
): number {
  const tz = normalizeTimezone(cityOrTimezone);
  return getTimezoneOffsetMinutes(tz, date) / 60;
}

/**
 * Checks if Daylight Saving Time (DST) is active for a given city and date.
 */
export function isDaylightSavingTime(
  cityOrTimezone: CityLocation | string,
  date: Date = new Date()
): boolean {
  return getTimezoneOffsetWithDST(cityOrTimezone, date).isDstActive;
}

/**
 * Returns the short timezone abbreviation (e.g. "IST", "EDT", "EST", "BST", "GMT")
 */
export function getTimezoneAbbr(
  cityOrTimezone: CityLocation | string,
  date: Date = new Date()
): string {
  const tz = normalizeTimezone(cityOrTimezone);
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'short',
    });
    const parts = formatter.formatToParts(date);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    return tzPart?.value || formatTimezoneOffset(getTimezoneOffsetMinutes(tz, date));
  } catch {
    return 'IST';
  }
}
