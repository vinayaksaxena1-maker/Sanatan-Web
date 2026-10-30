import { describe, it, expect, afterAll } from 'vitest';
import {
  computeYearlyPanchangAsync,
  compute120YearVimshottariAsync,
  computeYearlyFestivalsAsync,
  computeRangePanchangAsync,
  pingWorker,
  terminateWorker,
  isWorkerActive
} from '../workerBridge';

describe('Sub-phase 2.6: Web Worker Background Offloading Engine', () => {
  afterAll(() => {
    terminateWorker();
  });

  it('should successfully handle ping healthcheck', async () => {
    const isAlive = await pingWorker();
    expect(isAlive).toBe(true);
  });

  it('should offload 120-year Vimshottari Dasha calculation with zero millisecond gap', async () => {
    const birthDate = '1995-10-24T06:30:00Z';
    const report = await compute120YearVimshottariAsync(birthDate, 28.6139, 77.2090);

    expect(report).toBeDefined();
    expect(report.vimshottari).toBeDefined();
    expect(report.vimshottari.timeline).toHaveLength(9);
    expect(report.yogini.timeline).toHaveLength(8);
    expect(report.ashtottari.timeline).toHaveLength(8);
    expect(report.chara.timeline).toHaveLength(12);

    // Verify 0ms chronological continuity across all Mahadashas
    for (let i = 1; i < report.vimshottari.timeline.length; i++) {
      const prevEnd = new Date(report.vimshottari.timeline[i - 1].endDate).getTime();
      const currStart = new Date(report.vimshottari.timeline[i].startDate).getTime();
      expect(currStart).toBe(prevEnd);
    }
  });

  it('should compute full yearly festivals array without blocking', async () => {
    const festivals = await computeYearlyFestivalsAsync(2024, 28.6139, 77.2090);
    expect(Array.isArray(festivals)).toBe(true);
    expect(festivals.length).toBeGreaterThan(30);

    // Check presence of major festivals like Diwali, Holi
    const names = festivals.map((f: any) => f.name || f.nameHindi);
    expect(names.some((n: string) => n.includes('Diwali') || n.includes('दीपावली'))).toBe(true);
    expect(names.some((n: string) => n.includes('Holi') || n.includes('होली'))).toBe(true);
  });

  it('should compute Panchang range accurately', async () => {
    const range = await computeRangePanchangAsync('2024-11-01', '2024-11-05', 28.6139, 77.2090);
    expect(range).toHaveLength(5);
    expect(range[0].sunrise).toBeDefined();
    expect(range[0].hinduDate.tithi).toBeDefined();
  });

  it('should compute yearly panchang summary matrix for leap year 2024', async () => {
    // Leap year 2024 has 366 days
    const yearly = await computeYearlyPanchangAsync(2024, 28.6139, 77.2090);
    expect(yearly).toHaveLength(366);
    expect(yearly[0].date).toBe('2024-01-01');
    expect(yearly[365].date).toBe('2024-12-31');
    expect(yearly[0].tithiHindi).toBeDefined();
    expect(yearly[0].sunrise).toBeDefined();
  }, 15000);

  it('should safely terminate worker and reset status', () => {
    terminateWorker();
    expect(isWorkerActive()).toBe(false);
  });
});
