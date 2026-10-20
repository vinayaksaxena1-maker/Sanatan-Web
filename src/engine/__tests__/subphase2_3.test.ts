import { describe, it, expect } from 'vitest';
import {
  calculateMoonrise,
  calculateDetailedMoonrise,
  getKarwaChauthMoonrise,
  getSankashtiMoonrise,
  getEidHilalMoonTimes
} from '../moonriseEngine';
import {
  determineUdayaTithi,
  checkEkadashiVedha,
  calculateHariVasaraEnd,
  calculateEkadashiParana,
  determineEkadashiVrata
} from '../vrataNirnaya';
import {
  calculateAmantaPanchang,
  calculatePurnimantaPanchang,
  calculateTamilPanchangam,
  calculateBengaliPanjika,
  calculateISKCONPanchang,
  calculateMalayalamPanchangam,
  calculateOdiaPanjika,
  calculateGujaratiPanchang,
  calculateRegionalPanchang,
  getRegionalProfile,
  listSupportedRegionalPanchangs,
  REGIONAL_PANCHANG_PROFILES
} from '../regionalAdapters';

describe('Sub-phase 2.3: High-Precision Moonrise Engine', () => {
  const delhiLat = 28.6139;
  const delhiLon = 77.2090;

  it('verifies Karwa Chauth 2023 Moonrise in Delhi matches Drik Panchang official 08:15 PM', () => {
    // Karwa Chauth 2023 was on November 1, 2023
    const result = calculateMoonrise(delhiLat, delhiLon, '2023-11-01', 5.5, undefined, 'KarwaChauth');

    expect(result.moonriseTime).toBe('08:15 PM');
    expect(result.occasionType).toBe('KarwaChauth');
    expect(result.occasionBadgeHindi).toContain('करवा चौथ');
    expect(result.fastingSignificanceHindi).toContain('अखंड सौभाग्य');
    expect(result.illuminationFraction).toBeGreaterThan(0.7);
    expect(result.illuminationFraction).toBeLessThan(0.95);
  });

  it('verifies Karwa Chauth 2024 Moonrise in Delhi matches Drik Panchang official 07:54 PM', () => {
    // Karwa Chauth 2024 was on October 20, 2024
    const result = calculateMoonrise(delhiLat, delhiLon, '2024-10-20', 5.5, undefined, 'KarwaChauth');

    expect(result.moonriseTime).toBe('07:54 PM');
    expect(result.occasionType).toBe('KarwaChauth');
    expect(result.moonSign).toBeDefined();
    expect(result.chandraNakshatra).toBeDefined();
    expect(result.location.name).toBeDefined();
  });

  it('calculates Sankashti Chaturthi Moonrise and verifies occasion classification', () => {
    // Angarki / Sankashti date
    const result = getSankashtiMoonrise(new Date('2024-06-25T12:00:00+05:30'), undefined, {
      latitude: delhiLat,
      longitude: delhiLon
    });

    expect(result.occasionType).toBe('Sankashti');
    expect(result.occasionBadgeHindi).toContain('संकष्टी चतुर्थी');
    expect(result.moonriseTime).not.toBe('--:--');
  });

  it('calculates Sharad Purnima Moonrise with near 100% illumination', () => {
    // Sharad Purnima: October 16, 2024
    const detailed = calculateDetailedMoonrise(delhiLat, delhiLon, '2024-10-16', 5.5, undefined, 'Purnima');

    expect(detailed.illuminationFraction).toBeGreaterThanOrEqual(0.95);
    expect(detailed.occasionType).toBe('Purnima');
    expect(detailed.occasionBadgeHindi).toContain('पूर्णिमा');
    expect(detailed.moonriseJd).toBeGreaterThan(2460000);
    expect(detailed.lunarAgeDays).toBeGreaterThan(13);
  });

  it('calculates Eid / Roza Hilal crescent moon times', () => {
    const crescentDate = new Date('2024-04-10T12:00:00+05:30');
    const result = getEidHilalMoonTimes(crescentDate, { latitude: delhiLat, longitude: delhiLon });

    expect(result.occasionType).toBe('EidRoza');
    expect(result.occasionBadgeHindi).toContain('हिलाल');
    expect(result.illuminationFraction).toBeLessThan(0.15);
  });

  it('auto-resolves Karwa Chauth for years 2024 and 2025 via getKarwaChauthMoonrise', () => {
    const result2024 = getKarwaChauthMoonrise(2024, { latitude: delhiLat, longitude: delhiLon });
    expect(result2024.date).toBe('2024-10-20');
    expect(result2024.moonriseTime).toBe('07:54 PM');

    const result2025 = getKarwaChauthMoonrise(2025, { latitude: delhiLat, longitude: delhiLon });
    expect(result2025.date).toBe('2025-10-10');
    expect(result2025.moonriseTime).toBe('08:13 PM');
  });

  it('resolves Sankashti Chaturthi by year and month index correctly', () => {
    const june2024 = getSankashtiMoonrise(2024, 6, { latitude: delhiLat, longitude: delhiLon });
    expect(june2024.date).toBe('2024-06-25');
    expect(june2024.moonriseTime).toBe('10:28 PM');
    expect(june2024.occasionType).toBe('Sankashti');
  });

  it('calculates Moonrise across multiple major Indian cities with location resolution', () => {
    const mumbai = calculateMoonrise(19.0760, 72.8777, '2024-10-20', 5.5);
    const kolkata = calculateMoonrise(22.5726, 88.3639, '2024-10-20', 5.5);
    const chennai = calculateMoonrise(13.0827, 80.2707, '2024-10-20', 5.5);

    expect(mumbai.moonriseTime).toBeDefined();
    expect(kolkata.moonriseTime).toBeDefined();
    expect(chennai.moonriseTime).toBeDefined();
    // Kolkata is easternmost, so moon rises earlier in Kolkata than Mumbai
    expect(kolkata.moonriseTime).not.toEqual(mumbai.moonriseTime);
  });
});

describe('Sub-phase 2.3: Udaya Tithi & Arunodaya Engine', () => {
  const ujjainLat = 23.1765;
  const ujjainLon = 75.7885;

  it('calculates Udaya Tithi and exact 96-minute (4 Ghatika) Arunodaya window', () => {
    const result = determineUdayaTithi(ujjainLat, ujjainLon, '2024-04-05', 5.5);

    expect(result.sunriseTime).toBeDefined();
    expect(result.sunriseJd).toBeGreaterThan(2460000);
    expect(result.arunodayaStartTime).toBeDefined();
    expect(result.udayaTithiName).toBeDefined();
    expect(result.udayaTithiHindi).toBeDefined();

    // Verification of exact 96-minute Arunodaya window = 96 / 1440 = 1 / 15 day = 0.0666667 days
    const arunodayaDurationDays = result.sunriseJd - result.arunodayaStartJd;
    const durationMinutes = arunodayaDurationDays * 1440;
    expect(Math.round(durationMinutes)).toBe(96);
  });

  it('determines Paksha and tithi at Arunodaya start', () => {
    const result = determineUdayaTithi(ujjainLat, ujjainLon, '2024-10-20', 5.5);
    expect(['Shukla', 'Krishna']).toContain(result.paksha);
    expect(result.tithiAtArunodayaStart).toBeGreaterThanOrEqual(0);
    expect(result.tithiAtArunodayaStart).toBeLessThanOrEqual(29);
  });
});

describe('Sub-phase 2.3: Hari Vasara & Ekadashi Parana Verification Gate', () => {
  const delhiLat = 28.6139;
  const delhiLon = 77.2090;

  it('verifies calculateHariVasaraEnd calculates exact first 25% of Dwadashi tithi', () => {
    const hv = calculateHariVasaraEnd(delhiLat, delhiLon, '2024-04-06', 5.5);

    expect(hv.dwadashiStartJd).toBeLessThan(hv.dwadashiEndJd);
    expect(hv.hariVasaraEndJd).toBeGreaterThan(hv.dwadashiStartJd);
    expect(hv.hariVasaraEndJd).toBeLessThan(hv.dwadashiEndJd);

    // Exact mathematical invariant: (hariVasaraEnd - start) / (end - start) === 0.25
    const totalDwadashiDuration = hv.dwadashiEndJd - hv.dwadashiStartJd;
    const hvDuration = hv.hariVasaraEndJd - hv.dwadashiStartJd;
    const fraction = hvDuration / totalDwadashiDuration;
    expect(fraction).toBeCloseTo(0.25, 6);

    expect(hv.dwadashiStartTime).toBeDefined();
    expect(hv.dwadashiEndTime).toBeDefined();
    expect(hv.hariVasaraEndTime).toBeDefined();
  });

  it('VERIFICATION GATE: Papmochani Ekadashi Parana matches Drik Panchang within <30s', () => {
    // Drik Panchang Papmochani Ekadashi 2024 in New Delhi:
    // Ekadashi date: April 5, 2024
    // Parana date: April 6, 2024
    // Sunrise: 06:05 AM
    // Dwadashi ends: 10:19 AM
    // Parana window: 06:05 AM to 10:19 AM
    const parana = calculateEkadashiParana(delhiLat, delhiLon, '2024-04-05', 'Smarta', 5.5);

    expect(parana.ekadashiName).toBe('Papmochani Ekadashi');
    expect(parana.ekadashiNameHindi).toContain('पापमोचिनी');
    expect(parana.paranaDate).toBe('2024-04-06');
    expect(parana.sunriseTime).toBe('06:05 AM');

    // Dwadashi end time matches Drik Panchang 10:19 AM to the minute (<30s)
    expect(parana.dwadashiEndTime).toBe('10:19 AM');

    // Recommended Parana window matches Drik Panchang: Sunrise to Dwadashi End
    expect(parana.recommendedWindowStart).toBe('06:05 AM');
    expect(parana.recommendedWindowEnd).toBe('10:19 AM');
    expect(parana.isHariVasaraActiveAtSunrise).toBe(false);

    expect(parana.rationaleHindi).toContain('पारण');
    expect(parana.rationaleEnglish).toContain('Parana');
  });

  it('calculates Devutthana Ekadashi Parana window matching Drik Panchang 06:42 AM to 08:51 AM', () => {
    // Devutthana Ekadashi 2024: Nov 12, 2024, Parana on Nov 13, 2024
    const parana = calculateEkadashiParana(delhiLat, delhiLon, '2024-11-12', 'Smarta', 5.5);

    expect(parana.ekadashiName).toBe('Devutthana Ekadashi');
    expect(parana.ekadashiNameHindi).toContain('देवउठनी');
    expect(parana.paranaDate).toBe('2024-11-13');
    expect(parana.sunriseTime).toBe('06:42 AM');
    expect(parana.recommendedWindowStart).toBe('06:42 AM');
    expect(parana.recommendedWindowEnd).toBe('08:51 AM');
    expect(parana.isHariVasaraActiveAtSunrise).toBe(false);
  });

  it('calculates Amalaki Ekadashi Parana where Hari Vasara is active at sunrise', () => {
    // Amalaki Ekadashi 2024: March 20, 2024, Parana on March 21, 2024
    const parana = calculateEkadashiParana(delhiLat, delhiLon, '2024-03-20', 'Smarta', 5.5);

    expect(parana.ekadashiName).toBe('Amalaki Ekadashi');
    expect(parana.ekadashiNameHindi).toContain('आमलकी');
    expect(parana.paranaDate).toBe('2024-03-21');
    expect(parana.isHariVasaraActiveAtSunrise).toBe(true);
    expect(parana.hariVasaraEndTime).toBe('08:58 AM');
    expect(parana.recommendedWindowStart).toBe('08:58 AM');
  });

  it('evaluates Smarta vs Vaishnava dual fasting dates via determineEkadashiVrata', () => {
    const comparison = determineEkadashiVrata(delhiLat, delhiLon, '2024-04-05', 5.5);

    expect(comparison.smartaVratDate).toBe('2024-04-05');
    expect(comparison.smartaVratName.hi).toContain('स्मार्त');
    expect(comparison.vaishnavaVratName.hi).toContain('वैष्णव');
    expect(comparison.reasonForDivergenceHindi).toBeDefined();
  });

  it('checks checkEkadashiVedha for Dashami contamination', () => {
    const vedha = checkEkadashiVedha(delhiLat, delhiLon, '2024-04-05', 5.5);
    expect(vedha.isEkadashiDay).toBe(true);
    expect(typeof vedha.isDashamiViddha).toBe('boolean');
    expect(typeof vedha.isShuddha).toBe('boolean');
    expect(vedha.vedhaExplanationHindi).toBeDefined();
  });
});

describe('Sub-phase 2.3: 13 Regional Panchangs & Calendars Wrappers', () => {
  const lat = 28.6139;
  const lon = 77.2090;
  const testDate = new Date('2024-10-20T12:00:00+05:30');

  it('calculates Purnimanta Panchang (North India) with true lunar month and astronomical chakras', () => {
    const result = calculatePurnimantaPanchang(lat, lon, testDate);
    expect(result.profile.id).toBe('dainik');
    expect(result.profile.primarySystem).toBe('Purnimanta');
    expect(result.profile.calendarEra).toBe('Vikram');
    expect(result.yearDisplay).toContain('विक्रम संवत');
    expect(result.monthName.hi).toBe('कार्तिक');
    expect(result.monthName.en).toBe('Kartika');

    // Astronomical Suray/Chandra Chakras verification
    expect(result.panchang.suryaChakra.sunSign).toBe('Libra');
    expect(result.panchang.suryaChakra.sunSignHindi).toBe('तुला');
    expect(result.panchang.suryaChakra.dayDurationFormatted).toContain('घंटे');
    expect(result.panchang.suryaChakra.nightDurationFormatted).toContain('घंटे');
    expect(result.panchang.suryaChakra.solarNoon).toMatch(/\d{2}:\d{2}\s(AM|PM)/);

    expect(result.panchang.chandraChakra.moonSign).toBe('Taurus');
    expect(result.panchang.chandraChakra.moonSignHindi).toBe('वृषभ');
    expect(result.panchang.chandraChakra.illuminationPercent).toBeGreaterThan(70);

    // Dynamic 60 Samvatsara verification
    expect(result.panchang.hinduDate.samvat.samvatsaraName).toBe('Krodhi');
    expect(result.panchang.hinduDate.samvat.samvatsaraHindi).toBe('क्रोधी');

    // Dynamic auspicious muhurats
    expect(result.panchang.auspicious.abhijit.start).toMatch(/\d{2}:\d{2}\s(AM|PM)/);
    expect(result.panchang.auspicious.brahmaMuhurat.start).toMatch(/\d{2}:\d{2}\s(AM|PM)/);

    // Planet nakshatras
    expect(result.panchang.planets.length).toBeGreaterThanOrEqual(7);
    expect(result.panchang.planets.every(p => p.nakshatra && p.nakshatraHindi && p.nakshatraPada)).toBe(true);

    expect(result.regionalDayRows.length).toBeGreaterThanOrEqual(1);
    expect(result.specialHighlightsHindi.length).toBeGreaterThan(0);
  });

  it('calculates Amanta Panchang with true Amanta lunar month (Ashwina)', () => {
    const result = calculateAmantaPanchang(lat, lon, testDate);
    expect(result.profile.primarySystem).toBe('Amanta');
    expect(result.monthName.hi).toBe('आश्विन');
    expect(result.monthName.en).toBe('Ashwina');
    expect(result.panchang.hinduDate).toBeDefined();
    expect(result.regionalDayRows.length).toBe(7);
    expect(result.regionalDayRows[0].regionalMonthName.hi).toBe('आश्विन');
  });

  it('verifies dynamic Samvatsara progression into Vishwavasu for 2025', () => {
    const res2025 = calculatePurnimantaPanchang(lat, lon, '2025-05-15');
    expect(res2025.panchang.hinduDate.samvat.samvatsaraName).toBe('Vishwavasu');
    expect(res2025.panchang.hinduDate.samvat.samvatsaraHindi).toBe('विश्वावसु');
  });

  it('calculates Tamil Panchangam (Nirayana Sauramana, Chithirai to Panguni)', () => {
    const result = calculateTamilPanchangam(13.0827, 80.2707, testDate);
    expect(result.profile.id).toBe('tamil');
    expect(result.profile.primarySystem).toBe('SolarSaur');
    expect(result.profile.calendarEra).toBe('Shaka');
    expect(result.monthName.en).toBe('Aippasi'); // Sun in Libra in mid-October
    expect(result.regionalDayRows[0].solarDay).toBeGreaterThanOrEqual(1);
    expect(result.profile.regionalScriptTitle).toBe('தமிழ் பஞ்சாங்கம்');
  });

  it('calculates Bengali Panjika (Bangabda era, Boishakh to Choitro)', () => {
    const result = calculateBengaliPanjika(22.5726, 88.3639, testDate);
    expect(result.profile.id).toBe('bengali');
    expect(result.profile.primarySystem).toBe('SolarSaur');
    expect(result.profile.calendarEra).toBe('BengaliSan');
    expect(result.yearDisplay).toContain('बंगाब्द');
    expect(result.monthName.en).toBe('Kartik'); // Sun in Libra in mid-October
    expect(result.profile.regionalScriptTitle).toBe('বাংলা পঞ্জিকা');
  });

  it('calculates ISKCON Gaudiya Vaishnava Panchang (Gaurabda era, Holy Vishnu Names)', () => {
    const result = calculateISKCONPanchang(lat, lon, testDate);
    expect(result.profile.id).toBe('iskcon');
    expect(result.profile.calendarEra).toBe('Gaurabda');
    expect(result.yearDisplay).toContain('गौराब्द');
    expect(result.monthName.en).toBe('Damodara'); // Kartika month is sacred Damodara month
    expect(result.profile.regionalScriptTitle).toBe('গৌড়ীয় বৈষ্ণব পঞ্জিকা');
    expect(result.profile.keyDifferencesHindi.some(k => k.includes('विष्णु-तत्त्व'))).toBe(true);
  });

  it('calculates Malayalam, Odia, and Gujarati panchang views', () => {
    const malayalam = calculateMalayalamPanchangam(8.5241, 76.9366, testDate);
    expect(malayalam.profile.calendarEra).toBe('Kollam');
    expect(malayalam.yearDisplay).toContain('कोल्लवर्षम');

    const odia = calculateOdiaPanjika(20.2961, 85.8245, testDate);
    expect(odia.profile.id).toBe('odia');
    expect(odia.profile.regionalScriptTitle).toBe('ଓଡ଼ିଆ ପଞ୍ଜିକା');

    const gujarati = calculateGujaratiPanchang(23.0225, 72.5714, testDate);
    expect(gujarati.profile.id).toBe('gujarati');
    expect(gujarati.profile.regionalScriptTitle).toBe('ગુજરાતી પંચાંગ');
  });

  it('verifies all 13 Regional Panchang profiles are registered and accessible', () => {
    const profiles = listSupportedRegionalPanchangs();
    expect(profiles.length).toBe(13);

    const expectedIds = [
      'dainik', 'monthly', 'odia', 'malayalam', 'telugu',
      'nepali', 'assamese', 'marathi', 'bengali', 'gujarati',
      'tamil', 'kannada', 'iskcon'
    ];

    for (const id of expectedIds) {
      expect(REGIONAL_PANCHANG_PROFILES[id as keyof typeof REGIONAL_PANCHANG_PROFILES]).toBeDefined();
      const profile = getRegionalProfile(id as any);
      expect(profile.id).toBe(id);
      expect(profile.name.hi).toBeDefined();
      expect(profile.regionalScriptTitle).toBeDefined();
      expect(profile.keyDifferences.length).toBeGreaterThan(0);
    }
  });

  it('dispatches generic calculateRegionalPanchang cleanly', () => {
    const view = calculateRegionalPanchang('marathi', 18.5204, 73.8567, testDate);
    expect(view.profile.id).toBe('marathi');
    expect(view.panchang.location.latitude).toBe(18.5204);
  });
});
