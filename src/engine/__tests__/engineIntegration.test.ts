import { describe, it, expect } from 'vitest';
import {
  calculatePanchang,
  calculatePlanets,
  calculateAscendant,
  calculateKundli,
  calculateShadbala,
  calculateAshtakavarga
} from '../index';

describe('Clean-Room AstroEngine Source Integration (Sub-phase 2.1)', () => {
  const testDate = new Date('2026-10-20T06:00:00.000Z'); // 11:30 AM IST
  const delhiLat = 28.6139;
  const delhiLon = 77.2090;

  it('calculatePanchang returns valid panchang structure', () => {
    const panchang = calculatePanchang(delhiLat, delhiLon, testDate);
    expect(panchang).toBeDefined();
    expect(panchang.hinduDate).toBeDefined();
    expect(panchang.hinduDate.tithi).toBeDefined();
    expect(panchang.hinduDate.tithi.name).toBeTruthy();
    expect(panchang.hinduDate.nakshatra).toBeDefined();
    expect(panchang.hinduDate.nakshatra.name).toBeTruthy();
    expect(panchang.hinduDate.yoga).toBeDefined();
    expect(panchang.hinduDate.karana).toBeDefined();
    expect(typeof panchang.sunrise).toBe('string');
    expect(typeof panchang.sunset).toBe('string');
  });

  it('calculatePlanets calculates planetary positions', () => {
    const positions = calculatePlanets(testDate, 5.5);
    expect(positions).toBeDefined();
    expect(typeof positions.sunSidereal).toBe('number');
    expect(typeof positions.moonSidereal).toBe('number');
    expect(positions.sunSidereal).toBeGreaterThanOrEqual(0);
    expect(positions.sunSidereal).toBeLessThan(360);
    expect(positions.planets).toBeDefined();
    expect(positions.planets.length).toBeGreaterThanOrEqual(7);
  });

  it('calculateAscendant calculates Ascendant (Lagna) accurately', () => {
    const asc = calculateAscendant(delhiLat, delhiLon, testDate);
    expect(asc).toBeDefined();
    expect(typeof asc.longitude).toBe('number');
    expect(asc.longitude).toBeGreaterThanOrEqual(0);
    expect(asc.longitude).toBeLessThan(360);
    expect(typeof asc.degreeInSign).toBe('number');
    expect(asc.signIndex).toBeGreaterThanOrEqual(0);
    expect(asc.signIndex).toBeLessThan(12);
    expect(asc.signName).toBeTruthy();
  });

  it('calculateKundli generates full natal chart with 12 cusps and grahas', () => {
    const chart = calculateKundli(delhiLat, delhiLon, testDate);
    expect(chart).toBeDefined();
    expect(chart.cusps).toHaveLength(12);
    expect(chart.planets).toBeDefined();
    expect(chart.planets.length).toBeGreaterThanOrEqual(9);
    expect(chart.ascendant).toBeDefined();
  });

  it('calculateShadbala evaluates 6-fold planetary strength', () => {
    const chart = calculateKundli(delhiLat, delhiLon, testDate);
    const shadbala = calculateShadbala(chart);
    expect(shadbala).toBeDefined();
    expect(shadbala.planets).toBeDefined();
    expect(Object.keys(shadbala.planets).length).toBeGreaterThanOrEqual(7);
  });

  it('calculateAshtakavarga enforces classical SAV 337 sum invariant', () => {
    const chart = calculateKundli(delhiLat, delhiLon, testDate);
    const av = calculateAshtakavarga(chart);
    expect(av).toBeDefined();
    expect(av.totalSAVPoints).toBe(337);
    expect(av.isSAV337InvariantMet).toBe(true);
    expect(av.sav.signs).toHaveLength(12);
  });

  it('calculateAscendant supports Lahiri, KP, and Raman ayanamshas', () => {
    const lahiriAsc = calculateAscendant(delhiLat, delhiLon, testDate, 'Lahiri');
    const kpAsc = calculateAscendant(delhiLat, delhiLon, testDate, 'KP');
    const ramanAsc = calculateAscendant(delhiLat, delhiLon, testDate, 'Raman');

    expect(lahiriAsc.longitude).toBeGreaterThanOrEqual(0);
    expect(kpAsc.longitude).toBeGreaterThanOrEqual(0);
    expect(ramanAsc.longitude).toBeGreaterThanOrEqual(0);

    // KP is slightly lower longitude than Lahiri due to larger ayanamsa
    expect(Math.abs(lahiriAsc.longitude - kpAsc.longitude)).toBeLessThan(1.5);
  });

  it('calculateKundli supports Sripati, Placidus, and EqualHouse house systems', () => {
    const sripatiChart = calculateKundli(delhiLat, delhiLon, testDate, 'Sripati');
    const placidusChart = calculateKundli(delhiLat, delhiLon, testDate, 'Placidus');
    const equalChart = calculateKundli(delhiLat, delhiLon, testDate, 'EqualHouse');

    expect(sripatiChart.cusps).toHaveLength(12);
    expect(placidusChart.cusps).toHaveLength(12);
    expect(equalChart.cusps).toHaveLength(12);
  });

  it('calculatePanchang computes for Ujjain Prime Meridian coordinates', () => {
    const ujjainLat = 23.1765;
    const ujjainLon = 75.7885;
    const panchang = calculatePanchang(ujjainLat, ujjainLon, testDate);
    expect(panchang).toBeDefined();
    expect(panchang.sunrise).toBeTruthy();
    expect(panchang.sunset).toBeTruthy();
    expect(panchang.choghadiya.length).toBeGreaterThanOrEqual(16);
  });

  it('validates coordinate boundaries strictly', () => {
    expect(() => calculateAscendant(95, 77, testDate)).toThrow(/Invalid latitude/);
    expect(() => calculateAscendant(28, 190, testDate)).toThrow(/Invalid longitude/);
  });
});
