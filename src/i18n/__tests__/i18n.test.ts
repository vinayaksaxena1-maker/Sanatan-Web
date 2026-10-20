import { describe, it, expect } from 'vitest';
import hiTranslations from '../locales/hi.json';
import enTranslations from '../locales/en.json';

describe('Multilingual i18n Engine & Locales', () => {
  it('should ensure both Hindi and English translation keys match on primary hubs', () => {
    expect(hiTranslations.brand.name).toBe('सनातन घड़ी');
    expect(enTranslations.brand.name).toBe('Sanatan Ghadi');

    expect(hiTranslations.panchang.tithi).toBe('तिथि');
    expect(enTranslations.panchang.tithi).toBe('Tithi');

    expect(hiTranslations.choghadiya.shubh).toBe('शुभ');
    expect(enTranslations.choghadiya.shubh).toBe('Shubh');
  });

  it('should verify nested key completeness across hi and en dictionaries', () => {
    const hiKeys = Object.keys(hiTranslations);
    const enKeys = Object.keys(enTranslations);

    expect(hiKeys).toEqual(enKeys);

    for (const key of hiKeys) {
      const hiSection = (hiTranslations as any)[key];
      const enSection = (enTranslations as any)[key];

      expect(typeof hiSection).toBe('object');
      expect(typeof enSection).toBe('object');
      expect(Object.keys(hiSection).sort()).toEqual(Object.keys(enSection).sort());
    }
  });

  it('should verify dynamic translation lookup simulation', () => {
    function translate(dict: any, path: string): string {
      const parts = path.split('.');
      let current = dict;
      for (const part of parts) {
        if (current && part in current) {
          current = current[part];
        } else {
          return path;
        }
      }
      return current;
    }

    // Default Hindi
    expect(translate(hiTranslations, 'panchang.tithi')).toBe('तिथि');
    expect(translate(hiTranslations, 'bottomNav.panchang')).toBe('पंचांग');

    // Dynamic switch to English without refresh
    expect(translate(enTranslations, 'panchang.tithi')).toBe('Tithi');
    expect(translate(enTranslations, 'bottomNav.panchang')).toBe('Panchang');

    // Bilingual label resolution test
    const bilingualLabel = { hi: 'एकादशी पारणा', en: 'Ekadashi Parana' };
    const resolveLabel = (label: typeof bilingualLabel, lang: 'hi' | 'en') =>
      lang === 'en' ? label.en : label.hi;

    expect(resolveLabel(bilingualLabel, 'hi')).toBe('एकादशी पारणा');
    expect(resolveLabel(bilingualLabel, 'en')).toBe('Ekadashi Parana');
  });
});
