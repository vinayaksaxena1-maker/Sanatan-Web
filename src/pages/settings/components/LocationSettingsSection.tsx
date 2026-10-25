/**
 * Sanatan Web (सनातन घड़ी)
 * Component: LocationSettingsSection
 * Active Location, Geographic Coordinates, Timezone & 5,000+ Town Database Trigger
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseSettingsDataResult } from '../hooks/useSettingsData';
import { MapPin, Navigation, RotateCcw, Search, Compass, Loader2 } from 'lucide-react';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';

interface LocationSettingsSectionProps {
  data: UseSettingsDataResult;
}

export const LocationSettingsSection: React.FC<LocationSettingsSectionProps> = ({ data }) => {
  const {
    currentCity,
    detectDeviceLocation,
    isLocating,
    setIsCityModalOpen,
    resetToUjjain,
  } = data;

  return (
    <section className="bg-white/95 dark:bg-stone-900/95 rounded-3xl p-6 sm:p-8 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-4">
        <div className="flex items-center gap-2.5">
          <MapPin className="w-6 h-6 text-amber-600" />
          <div>
            <h2 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
              ३. स्थान एवं समय क्षेत्र प्रबंधन (Location & Coordinates)
            </h2>
            <p className="text-xs text-stone-500">
              स्थानीय सूर्योदय, सूर्यास्त, लग्न एवं दिनमान की शत-प्रतिशत शुद्ध गणना हेतु भौगोलिक स्थान।
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>प्राइम मेरिडियन: उज्जैन रेखांश</span>
        </span>
      </div>

      {/* Active City Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left 7 Cols: City Info */}
        <div className="md:col-span-7 p-5 rounded-2xl bg-gradient-to-br from-[#fff7ed] via-[#fef3c7]/20 to-[#fffbeb] border border-amber-900/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
              सक्रिय नगर (Active City)
            </span>
            <span className="text-xs font-mono font-semibold text-stone-500">
              {currentCity.timezone || 'Asia/Kolkata (UTC +05:30)'}
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-serif text-amber-950 dark:text-amber-100">
              {currentCity.nameHindi || currentCity.name}
            </h3>
            <span className="text-xs text-[#735641] font-medium">
              {currentCity.name}, {currentCity.stateHindi || currentCity.state}, {currentCity.countryHindi || currentCity.country}
            </span>
          </div>

          {/* Coordinates Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-amber-900/10 text-xs">
            <div>
              <span className="text-[10px] text-stone-500 block">अक्षांश (Latitude):</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                {currentCity.latitude.toFixed(4)}° {currentCity.latitude >= 0 ? 'उत्तर (N)' : 'दक्षिण (S)'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">देशांतर (Longitude):</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                {currentCity.longitude.toFixed(4)}° {currentCity.longitude >= 0 ? 'पूर्व (E)' : 'पश्चिम (W)'}
              </span>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Actions */}
        <div className="md:col-span-5 flex flex-col gap-2.5">
          {/* Change City Button */}
          <button
            type="button"
            onClick={() => setIsCityModalOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-xs shadow-md shadow-amber-900/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
          >
            <Search className="w-4 h-4" />
            <span>नगर बदलें (५,०००+ भारतीय नगर)</span>
          </button>

          {/* GPS Auto-Detect Button */}
          <button
            type="button"
            onClick={detectDeviceLocation}
            disabled={isLocating}
            className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-stone-800 hover:bg-amber-50 text-stone-800 dark:text-stone-200 font-semibold text-xs border border-amber-300 dark:border-stone-700 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
          >
            {isLocating ? (
              <>
                <Loader2 className="w-4 h-4 text-amber-600 animate-spin" />
                <span>स्थान खोजा जा रहा है...</span>
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 text-amber-600" />
                <span>स्वचालित जीपीएस द्वारा खोजें</span>
              </>
            )}
          </button>

          {/* Reset to Default Ujjain */}
          <button
            type="button"
            onClick={resetToUjjain}
            className="w-full py-2 px-4 rounded-xl bg-stone-100 dark:bg-stone-800/60 hover:bg-stone-200 text-stone-600 dark:text-stone-400 font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>डिफ़ॉल्ट उज्जैन (महाकाल) करें</span>
          </button>
        </div>
      </div>
    </section>
  );
};
