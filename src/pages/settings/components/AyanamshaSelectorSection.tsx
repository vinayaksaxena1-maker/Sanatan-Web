/**
 * Sanatan Web (सनातन घड़ी)
 * Component: AyanamshaSelectorSection
 * Ephemeris Ayanamsha System Selector (Lahiri, KP, Raman) with Real-Time DMS Readout
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseSettingsDataResult } from '../hooks/useSettingsData';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { Compass, CheckCircle2, Award, Info } from 'lucide-react';

interface AyanamshaSelectorSectionProps {
  data: UseSettingsDataResult;
}

export const AyanamshaSelectorSection: React.FC<AyanamshaSelectorSectionProps> = ({ data }) => {
  const { ayanamsha, setAyanamsha, todayAyanamshaDms, ayanamshaPresets } = data;

  return (
    <section className="bg-white/95 dark:bg-stone-900/95 rounded-3xl p-6 sm:p-8 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-4">
        <div className="flex items-center gap-2.5">
          <VedicIcon3D name="sun" size={22} className="text-amber-600" />
          <div>
            <h2 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
              १. अयनांश चयन प्रणाली (Ephemeris Ayanamsha)
            </h2>
            <p className="text-xs text-stone-500">
              अयनांश बदलने पर संपूर्ण ग्रह स्पष्ट, लग्न, नक्षत्र एवं दशा का मान स्वतः पुनः परिकलित होता है।
            </p>
          </div>
        </div>

        {/* Live Today's Ayanamsha Readout */}
        <div className="p-2.5 px-4 rounded-2xl bg-amber-50/80 dark:bg-stone-800 border border-amber-300/80 flex items-center gap-3">
          <div>
            <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
              आज का प्रत्यक्ष अयनांश ({ayanamsha})
            </span>
            <span className="text-base font-extrabold font-serif text-amber-950 dark:text-amber-100 font-mono">
              {todayAyanamshaDms}
            </span>
          </div>
          <Compass className="w-5 h-5 text-amber-600 shrink-0" />
        </div>
      </div>

      {/* 3 Ayanamsha Systems Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ayanamshaPresets.map((preset) => {
          const isSelected = ayanamsha === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setAyanamsha(preset.id)}
              className={`p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 ${
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

                  {preset.isGovernmentStandard ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <Award className="w-3 h-3 text-emerald-700" />
                      <span>भारत सरकार मानक</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                      विशिष्ट शोध मानक
                    </span>
                  )}
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

              <div className="pt-3 border-t border-amber-200/60 dark:border-stone-800 w-full text-[11px]">
                <div className="text-stone-500">प्रमाणिक सूत्र:</div>
                <div className="font-semibold text-amber-900 dark:text-amber-200 font-mono">
                  {preset.offsetFormula}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Shastric Guidance Note */}
      <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-stone-800/60 border border-amber-200/50 flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>सुझाव:</strong> यदि आप सामान्य वैदिक पंचांग, दैनिक व्रत-त्योहार अथवा पारंपरिक जन्मपत्रिका देख रहे हैं, तो <strong>लाहिड़ी (चित्रपक्ष)</strong> को ही चयनित रखें। यदि आप कृष्णमूर्ति पद्धति (KP) के उप-स्वामी आधारित सटीक घटना समय का शोध कर रहे हैं, तभी <strong>के. पी.</strong> का चयन करें।
        </p>
      </div>
    </section>
  );
};
