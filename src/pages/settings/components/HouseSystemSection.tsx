/**
 * Sanatan Web (सनातन घड़ी)
 * Component: HouseSystemSection
 * House Cusps System Selector (Sripati, Placidus, Equal House)
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseSettingsDataResult } from '../hooks/useSettingsData';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { CheckCircle2, ShieldCheck, Layers, Info } from 'lucide-react';

interface HouseSystemSectionProps {
  data: UseSettingsDataResult;
}

export const HouseSystemSection: React.FC<HouseSystemSectionProps> = ({ data }) => {
  const { houseSystem, setHouseSystem, houseSystemPresets } = data;

  return (
    <section className="bg-white/95 dark:bg-stone-900/95 rounded-3xl p-6 sm:p-8 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-4">
        <div className="flex items-center gap-2.5">
          <Layers className="w-6 h-6 text-amber-600" />
          <div>
            <h2 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
              २. भाव गणना प्रणाली (House Cusps System)
            </h2>
            <p className="text-xs text-stone-500">
              द्वादश भावों (१२ घरों) के विस्तार, भाव मध्य एवं भाव संधि निर्धारण की गणितीय विधि।
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
          सक्रिय पद्धति: {houseSystem === 'Sripati' ? 'श्रीपति (Sripati)' : houseSystem === 'Placidus' ? 'प्लेसिडस (Placidus)' : 'समान भाव (Equal)'}
        </span>
      </div>

      {/* 3 House Systems Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {houseSystemPresets.map((preset) => {
          const isSelected = houseSystem === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setHouseSystem(preset.id)}
              className={`p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-amber-100/80 dark:bg-amber-950/70 border-2 border-amber-600 ring-2 ring-amber-400/30 shadow-md scale-[1.01]'
                  : 'bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 hover:border-amber-400 hover:bg-amber-50/50'
              }`}
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      isSelected
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : 'border-stone-300 dark:border-stone-600'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </span>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    preset.id === 'Sripati'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300'
                  }`}>
                    {preset.id === 'Sripati' ? 'पारंपरिक वैदिक' : preset.id === 'Placidus' ? 'KP स्टेलर' : 'सरल पद्धति'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
                    {preset.nameHindi}
                  </h3>
                  <span className="text-[11px] text-stone-500 font-mono block">
                    {preset.nameEnglish}
                  </span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                  {preset.descriptionHindi}
                </p>
              </div>

              <div className="pt-2.5 border-t border-amber-200/60 dark:border-stone-800 w-full text-[11px] text-amber-950 dark:text-amber-200 font-medium">
                {preset.usageHindi}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sripati Explanation */}
      <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-stone-800/60 border border-amber-200/50 flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>श्रीपति भाव संधि का महत्व:</strong> वैदिक ज्योतिष में प्रत्येक भाव का मध्य बिंदु (Bhava Madhya) उसका सबसे प्रभावशाली बिंदु होता है, और दो भावों के मिलन को 'भाव संधि' कहते हैं। चलित कुण्डली में ग्रह अपनी संधि के अनुसार भाव बदलते हैं।
        </p>
      </div>
    </section>
  );
};
