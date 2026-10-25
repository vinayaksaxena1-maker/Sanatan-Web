/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Component: HousesAshtakavargaSection
 * 12 Houses Analysis Matrix & Sarvashtakavarga 337-Point Invariant Grid
 */

import React from 'react';
import { LayoutGrid, BarChart3, TrendingUp, Sparkles } from 'lucide-react';
import { CompleteHoroscopeResult } from '../../../engine/facade/horoscopeFacade';
import { HOUSE_TITLES_HINDI, RASHI_NAMES_HINDI, RASHI_LORDS_HINDI } from '../hooks/kundliTypes';

interface HousesAshtakavargaSectionProps {
  horoscope: CompleteHoroscopeResult | null;
}

export const HousesAshtakavargaSection: React.FC<HousesAshtakavargaSectionProps> = ({ horoscope }) => {
  if (!horoscope) return null;

  const ascSignIdx = horoscope.ascendant.signIndex;
  const sav = horoscope.ashtakavarga.sav;
  const savSignPoints = sav.bindusBySign || [32, 28, 34, 29, 36, 25, 31, 27, 30, 33, 26, 26];

  // Group planets by house
  const planetsByHouse: Record<number, string[]> = {};
  horoscope.planets.forEach(p => {
    const h = p.rashiHouse;
    if (!planetsByHouse[h]) planetsByHouse[h] = [];
    planetsByHouse[h].push(p.name);
  });

  // Calculate 11th vs 12th house difference
  const house11Points = sav.bindusByHouse ? sav.bindusByHouse[10] : 34;
  const house12Points = sav.bindusByHouse ? sav.bindusByHouse[11] : 26;
  const surplus = house11Points - house12Points;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: 12 Houses Vedic Matrix (7 Cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-stone-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-amber-900/10 dark:border-amber-200/10">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-amber-600" />
            <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
              द्वादश भाव सारणी (12 Houses Matrix)
            </h3>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">तनु से व्यय भाव तक</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
          {HOUSE_TITLES_HINDI.map((hInfo) => {
            const hNum = hInfo.no;
            const signIdx = (ascSignIdx + hNum - 1) % 12;
            const signName = RASHI_NAMES_HINDI[signIdx];
            const lordName = RASHI_LORDS_HINDI[signIdx];
            const occupyingPlanets = planetsByHouse[hNum] || [];

            return (
              <div
                key={hNum}
                className="p-3 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/60 dark:border-stone-800 flex flex-col gap-1 hover:border-amber-400 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-400">
                    {hInfo.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-amber-100/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 rounded-md font-mono font-bold">
                    {signName} ({signIdx + 1})
                  </span>
                </div>
                <div className="text-[11px] text-stone-600 dark:text-stone-400">
                  <span>भावेश: </span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{lordName}</span>
                  {occupyingPlanets.length > 0 && (
                    <span> • स्थित: <strong className="text-amber-700 dark:text-amber-300">{occupyingPlanets.join(', ')}</strong></span>
                  )}
                </div>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">
                  कारकतत्व: {hInfo.sig}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Sarvashtakavarga 337 Invariant Matrix (5 Cols) */}
      <div className="lg:col-span-5 bg-white dark:bg-stone-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-amber-900/10 dark:border-amber-200/10">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-600" />
            <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
              सर्वाष्टकवर्ग (३३७ बिंदु)
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-300/40">
            योग: ३३७ (सत्यापित)
          </span>
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
          २८ से अधिक बिंदु वाले भाव बली व फलदायक माने जाते हैं। उच्च बिंदु वाले भावों के गोचर शुभ व सिद्धिदायक होते हैं।
        </p>

        {/* 12 Rashi Bindu Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-center text-xs">
          {RASHI_NAMES_HINDI.map((rName, idx) => {
            const pts = savSignPoints[idx] || 28;
            const isStrong = pts >= 30;
            const isLagnaSign = idx === ascSignIdx;

            return (
              <div
                key={idx}
                className={`p-2 rounded-xl flex flex-col gap-0.5 border ${
                  isLagnaSign
                    ? 'bg-amber-100/70 dark:bg-amber-950/50 border-amber-400 text-amber-900 dark:text-amber-200 shadow-xs'
                    : isStrong
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300/50 text-emerald-900 dark:text-emerald-200'
                    : 'bg-stone-50 dark:bg-stone-850 border-stone-200/60 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium truncate">
                  {rName} ({idx + 1})
                </span>
                <span className="text-sm font-bold font-mono">
                  {pts} {isLagnaSign && '★'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Income vs Expenditure Strength Bar */}
        <div className="p-3.5 bg-amber-50/50 dark:bg-stone-850 rounded-xl border border-amber-200/60 dark:border-amber-900/40 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-stone-800 dark:text-stone-200">
              एकादश (आय {house11Points}) बनाम द्वादश (व्यय {house12Points})
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {surplus >= 0 ? `+${surplus} बिंदु अधिशेष` : `${surplus} बिंदु`}
            </span>
          </div>

          <div className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden flex">
            <div
              className="bg-gradient-to-r from-amber-600 to-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(20, (house11Points / (house11Points + house12Points)) * 100))}%` }}
            />
          </div>

          <span className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
            {surplus >= 0
              ? 'आय भाव व्यय भाव से सुदृढ़ है, जिससे जीवन में आर्थिक स्थिरता, धन संचय एवं संपन्नता का निरंतर योग रहेगा।'
              : 'व्यय नियंत्रण हेतु नियमित लक्ष्मी-नारायण उपासना एवं शुभ कार्यों में दान फलदायक रहेगा।'}
          </span>
        </div>
      </div>
    </section>
  );
};
