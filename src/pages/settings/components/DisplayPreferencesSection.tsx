/**
 * Sanatan Web (सनातन घड़ी)
 * Component: DisplayPreferencesSection
 * Language, Devanagari Numerals & Regional Kundli Chart Style Preferences
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseSettingsDataResult } from '../hooks/useSettingsData';
import { Globe, Type, Layout, Check } from 'lucide-react';

interface DisplayPreferencesSectionProps {
  data: UseSettingsDataResult;
}

export const DisplayPreferencesSection: React.FC<DisplayPreferencesSectionProps> = ({ data }) => {
  const {
    language,
    setLanguage,
    numeralsStyle,
    setNumeralsStyle,
    chartStyle,
    setChartStyle,
    chartStylePresets,
  } = data;

  return (
    <section className="bg-white/95 dark:bg-stone-900/95 rounded-3xl p-6 sm:p-8 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 border-b border-amber-100 dark:border-amber-900/40 pb-4">
        <Globe className="w-6 h-6 text-amber-600" />
        <div>
          <h2 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
            ४. भाषा, अंक एवं कुण्डली चार्ट शैली (Display Preferences)
          </h2>
          <p className="text-xs text-stone-500">
            वैदिक पंचांग की भाषा, अंकों का देवनागरी स्वरूप एवं पारंपरिक कुण्डली प्रदर्शन शैली।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Language Toggle */}
        <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-800/50 border border-amber-200/50 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-700" />
            <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
              प्राथमिक भाषा (Language)
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                language === 'hi'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 hover:bg-amber-100/50'
              }`}
            >
              {language === 'hi' && <Check className="w-3.5 h-3.5" />}
              <span>शुद्ध हिन्दी (Devanagari)</span>
            </button>

            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                language === 'en'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 hover:bg-amber-100/50'
              }`}
            >
              {language === 'en' && <Check className="w-3.5 h-3.5" />}
              <span>English (Vedic Terms)</span>
            </button>
          </div>
        </div>

        {/* 2. Numerals Format */}
        <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-800/50 border border-amber-200/50 space-y-3">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-amber-700" />
            <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
              अंक प्रदर्शन शैली (Numerals Format)
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setNumeralsStyle('devanagari')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                numeralsStyle === 'devanagari'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 hover:bg-amber-100/50'
              }`}
            >
              {numeralsStyle === 'devanagari' && <Check className="w-3.5 h-3.5" />}
              <span>देवनागरी अंक (०, १, २, ३)</span>
            </button>

            <button
              type="button"
              onClick={() => setNumeralsStyle('international')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                numeralsStyle === 'international'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 hover:bg-amber-100/50'
              }`}
            >
              {numeralsStyle === 'international' && <Check className="w-3.5 h-3.5" />}
              <span>अंतर्राष्ट्रीय अंक (0, 1, 2, 3)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Regional Kundli Chart Styles */}
      <div className="space-y-3 pt-2 border-t border-amber-100 dark:border-amber-900/40">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-amber-700" />
          <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
            कुण्डली प्रारूप (Regional Chart Style)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {chartStylePresets.map((preset) => {
            const isSelected = chartStyle === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setChartStyle(preset.id)}
                className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-100/80 dark:bg-amber-950/70 border-2 border-amber-600 ring-2 ring-amber-400/20 shadow-xs'
                    : 'bg-white dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 hover:border-amber-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold font-serif text-stone-900 dark:text-stone-100">
                      {preset.nameHindi}
                    </h4>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                    {preset.descriptionHindi}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
