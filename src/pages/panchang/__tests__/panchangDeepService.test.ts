import { describe, it, expect } from 'vitest';
import { calculatePanchang } from '../../../engine';
import { calculateDeepPanchang } from '../services/panchangDeepService';

describe('panchangDeepService calculations', () => {
  it('should compute deep panchang analysis correctly for a known date and location', () => {
    const lat = 28.6139; // New Delhi
    const lon = 77.209;
    const testDate = new Date('2026-10-31T06:00:00Z');

    const panchang = calculatePanchang(lat, lon, testDate);
    const deep = calculateDeepPanchang(panchang, lat, lon, testDate);

    // 1. Nivas & Shool
    expect(deep.chandraVasa).toBeDefined();
    expect(deep.chandraVasa.directionHindi).toBeDefined();
    expect(deep.rahuVasa).toBeDefined();
    expect(deep.homahuti).toBeDefined();
    expect(deep.bhadraMicroBreakup).toBeDefined();
    expect(deep.bhadraMicroBreakup.mukhaWindow.duration).toContain('घंटे');
    expect(deep.bhadraMicroBreakup.puchhaWindow.duration).toContain('घंटा');

    // 2. Lagna & Muhurta
    expect(deep.udayaLagnas).toHaveLength(12);
    expect(deep.udayaLagnas[0].panchakaType).toBeDefined();
    expect(deep.chandrabalamList).toHaveLength(12);
    expect(deep.tarabalamSummary.shubhTaras.length).toBeGreaterThan(0);

    // 3. Samvatsara & Governance
    expect(deep.brihaspatiSamvatsara.vikramSamvatsara).toBe('सिद्धार्थी');
    expect(deep.brihaspatiSamvatsara.shakaSamvatsara).toBe('पराभव');
    expect(deep.mantriMandala).toHaveLength(10);
    expect(deep.mantriMandala[0].portfolio).toBe('King');

    // 4. Aadal & Vidaal Yogas
    expect(deep.aadalVidaalList.length).toBeGreaterThan(0);
    expect(deep.aadalVidaalList[0].name).toMatch(/आडल योग|विडाल योग/);

    // 5. Pravishte / Gate
    expect(deep.pravishte.gate).toBeGreaterThanOrEqual(1);
    expect(deep.pravishte.formatted).toContain('प्रविष्टे / गते');

    // 6. Astronomical Epochs
    expect(deep.dinamanaFormatted).toContain('घंटे');
    expect(deep.ratrimanaFormatted).toContain('घंटे');
    expect(deep.kaliyugaYear).toBe(5127);
    expect(deep.kaliAhargana).toBeGreaterThan(1800000);
    expect(deep.julianDay).toBeGreaterThan(2460000);
  });
});
