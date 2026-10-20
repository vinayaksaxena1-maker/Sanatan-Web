/**
 * Sanatan Ghadi (सनातन घड़ी) - Background Web Worker Engine
 * 
 * Offloads heavy mathematical calculations from the UI thread to guarantee 60 FPS
 * on low-spec (2GB RAM) mobile devices:
 * 1. 365-day full year Panchang & festival matrices
 * 2. 120-year multi-level Vimshottari Dasha hierarchy (MD, AD, PD)
 * 3. 1-year bulk festival & vrat calendars
 * 4. Multi-month Panchang range batches
 * 
 * @license MIT
 * @author Vinayak Saxena
 */

import {
  calculatePanchang,
  calculateNatalChart,
  calculateAllDashas,
  getFestivalsForYear,
  getFestivalsForDay,
  type PanchangInfo
} from '../engine';

export interface WorkerMessageRequest {
  id: string;
  type:
    | 'CALCULATE_YEARLY_PANCHANG'
    | 'CALCULATE_120_YEAR_VIMSHOTTARI'
    | 'CALCULATE_YEARLY_FESTIVALS'
    | 'CALCULATE_RANGE_PANCHANG'
    | 'PING';
  payload?: any;
}

export interface WorkerMessageResponse {
  id: string;
  success: boolean;
  type: string;
  payload?: any;
  error?: string;
  durationMs: number;
}

export interface YearlyPanchangDaySummary {
  date: string;
  tithiNumber: number;
  tithiName: string;
  tithiHindi: string;
  tithiEndTime: string;
  paksha: string;
  nakshatraName: string;
  nakshatraHindi: string;
  nakshatraPada: number;
  nakshatraEndTime: string;
  yogaHindi: string;
  karanaHindi: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  festivals: string[];
}

/**
 * Generates an efficient 365/366-day Panchang summary matrix for an entire year.
 */
function computeYearlyPanchang(year: number, lat: number, lon: number): YearlyPanchangDaySummary[] {
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const totalDays = isLeap ? 366 : 365;
  const results: YearlyPanchangDaySummary[] = [];

  const startDate = new Date(Date.UTC(year, 0, 1, 12, 0, 0));

  for (let d = 0; d < totalDays; d++) {
    const curDate = new Date(startDate.getTime() + d * 86400000);
    const dateStr = curDate.toISOString().split('T')[0];
    
    // Core panchang calculation for the day
    const panchang = calculatePanchang(lat, lon, curDate);
    const dayFestivals = getFestivalsForDay(panchang).map(f => f.hindiName || f.name);

    results.push({
      date: dateStr,
      tithiNumber: panchang.hinduDate.tithi.value,
      tithiName: panchang.hinduDate.tithi.name,
      tithiHindi: panchang.hinduDate.tithi.hindiName,
      tithiEndTime: panchang.hinduDate.tithi.endTime,
      paksha: panchang.hinduDate.paksha,
      nakshatraName: panchang.hinduDate.nakshatra.name,
      nakshatraHindi: panchang.hinduDate.nakshatra.hindiName,
      nakshatraPada: panchang.hinduDate.nakshatra.pada || 1,
      nakshatraEndTime: panchang.hinduDate.nakshatra.endTime,
      yogaHindi: panchang.hinduDate.yoga.hindiName,
      karanaHindi: panchang.hinduDate.karana.hindiName,
      sunrise: panchang.sunrise,
      sunset: panchang.sunset,
      moonrise: panchang.moonrise,
      festivals: dayFestivals
    });
  }

  return results;
}

/**
 * Computes complete 120-year Vimshottari, Yogini, Ashtottari, and Chara Dasha hierarchies.
 */
function compute120YearVimshottari(birthDateStr: string | Date, lat: number, lon: number) {
  const birthDate = typeof birthDateStr === 'string' ? new Date(birthDateStr) : birthDateStr;
  const chart = calculateNatalChart(birthDate, lat, lon);
  return calculateAllDashas(chart, new Date());
}

/**
 * Computes all festivals across a full year.
 */
function computeYearlyFestivals(year: number, lat: number, lon: number) {
  return getFestivalsForYear(year, lat, lon);
}

/**
 * Computes raw PanchangInfo array for an arbitrary date range.
 */
function computeRangePanchang(startDateStr: string, endDateStr: string, lat: number, lon: number): PanchangInfo[] {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const diffDays = Math.max(1, Math.min(60, Math.round((end.getTime() - start.getTime()) / 86400000) + 1));
  const results: PanchangInfo[] = [];

  for (let i = 0; i < diffDays; i++) {
    const curDate = new Date(start.getTime() + i * 86400000);
    results.push(calculatePanchang(lat, lon, curDate));
  }

  return results;
}

// Self-listening Web Worker Message Event Handler
self.onmessage = (event: MessageEvent<WorkerMessageRequest>) => {
  const { id, type, payload } = event.data;
  const startTime = performance.now();

  try {
    let resultPayload: any;

    switch (type) {
      case 'PING':
        resultPayload = { pong: true, timestamp: Date.now() };
        break;

      case 'CALCULATE_YEARLY_PANCHANG': {
        const { year, lat = 28.6139, lon = 77.2090 } = payload || {};
        resultPayload = computeYearlyPanchang(year || new Date().getFullYear(), lat, lon);
        break;
      }

      case 'CALCULATE_120_YEAR_VIMSHOTTARI': {
        const { birthDate = new Date().toISOString(), lat = 28.6139, lon = 77.2090 } = payload || {};
        resultPayload = compute120YearVimshottari(birthDate, lat, lon);
        break;
      }

      case 'CALCULATE_YEARLY_FESTIVALS': {
        const { year, lat = 28.6139, lon = 77.2090 } = payload || {};
        resultPayload = computeYearlyFestivals(year || new Date().getFullYear(), lat, lon);
        break;
      }

      case 'CALCULATE_RANGE_PANCHANG': {
        const { startDate, endDate, lat = 28.6139, lon = 77.2090 } = payload || {};
        resultPayload = computeRangePanchang(startDate, endDate, lat, lon);
        break;
      }

      default:
        throw new Error(`Unsupported worker task type: ${type}`);
    }

    const durationMs = Math.round((performance.now() - startTime) * 100) / 100;
    const response: WorkerMessageResponse = {
      id,
      success: true,
      type,
      payload: resultPayload,
      durationMs
    };

    self.postMessage(response);
  } catch (err: unknown) {
    const durationMs = Math.round((performance.now() - startTime) * 100) / 100;
    const response: WorkerMessageResponse = {
      id,
      success: false,
      type,
      error: err instanceof Error ? err.message : String(err),
      durationMs
    };

    self.postMessage(response);
  }
};
