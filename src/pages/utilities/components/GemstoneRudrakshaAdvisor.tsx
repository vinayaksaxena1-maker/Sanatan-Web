/**
 * Sanatan Web (सनातन घड़ी)
 * Component: GemstoneRudrakshaAdvisor
 * Lagna-Based 3 Cardinal Gemstones (Life, Lucky, Punya) & Mukhi Rudraksha Recommendations
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseUtilitiesDataResult } from '../hooks/useUtilitiesData';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { Gem, ShieldAlert, Sparkles, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface GemstoneRudrakshaAdvisorProps {
  data: UseUtilitiesDataResult;
}

export const GemstoneRudrakshaAdvisor: React.FC<GemstoneRudrakshaAdvisorProps> = ({ data }) => {
  const {
    selectedLagnaIndex,
    setSelectedLagnaIndex,
    currentLagnaRemedy,
    rashiList,
  } = data;

  const { lifeGem, luckyGem, punyaGem, prohibitedGems, rudraksha } = currentLagnaRemedy;

  const renderGemCard = (
    categoryTitle: string,
    badgeText: string,
    gem: typeof lifeGem,
    accentBorder: string,
    badgeBg: string
  ) => {
    return (
      <div className={`p-5 rounded-2xl bg-white/95 dark:bg-stone-900/95 border ${accentBorder} shadow-xs space-y-3`}>
        <div className="flex items-center justify-between border-b border-amber-100 dark:border-stone-800 pb-2.5">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badgeBg}`}>
            {badgeText}
          </span>
          <span className="text-xs font-semibold text-stone-500">स्वामी: {gem.planet}</span>
        </div>

        <div>
          <h4 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
            {gem.nameHindi}
          </h4>
          <span className="text-[11px] text-amber-800 dark:text-amber-400 font-medium">
            {categoryTitle}
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
          <div className="flex justify-between">
            <span className="text-stone-400">उपयुक्त धातु:</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100">{gem.metal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">धारण अंगुली:</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100">{gem.finger}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">शुभ वार:</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100">{gem.day}</span>
          </div>
        </div>

        {/* Beej Mantra */}
        <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-stone-800/60 border border-amber-200/40 text-[11px]">
          <span className="text-[10px] font-bold text-amber-800 uppercase block">धारण बीज मंत्र</span>
          <p className="font-serif italic text-stone-800 dark:text-stone-200 mt-0.5">
            "{gem.mantra}"
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Lagna Selector */}
      <div className="bg-white/95 dark:bg-stone-900/95 rounded-2xl p-6 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-4">
          <div className="flex items-center gap-2">
            <VedicIcon3D name="kalash" size={20} className="text-amber-600" />
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                व्यक्तिगत वैदिक रत्न एवं रुद्राक्ष परामर्श
              </h2>
              <p className="text-xs text-stone-500">
                महर्षि पराशर अनुसार लग्न (शरीर), पंचमेश (पुण्य) एवं नवमेश (भाग्य) के त्रिकोण रत्नों का निर्धारण।
              </p>
            </div>
          </div>

          {/* Lagna Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 whitespace-nowrap">
              अपना जन्म लग्न चुनें:
            </label>
            <select
              value={selectedLagnaIndex}
              onChange={(e) => setSelectedLagnaIndex(Number(e.target.value))}
              className="py-2 px-3 rounded-xl border border-amber-300 dark:border-stone-700 bg-amber-50/40 dark:bg-stone-800 text-xs font-bold text-amber-950 dark:text-amber-200 focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {rashiList.map((r) => (
                <option key={r.index} value={r.index}>
                  {r.hindi} लग्न ({r.english})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Lagna Summary Strip */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-stone-600 dark:text-stone-400">
          <span>
            लग्न: <strong className="text-stone-900 dark:text-stone-100">{currentLagnaRemedy.lagnaHindi} लग्न</strong>
          </span>
          <span>
            लग्नेश: <strong className="text-amber-900 dark:text-amber-300">{currentLagnaRemedy.lagnaLord}</strong>
          </span>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
            ✓ त्रिकोण भाव (१, ५, ९) सदा शुभ फलदायी
          </span>
        </div>
      </div>

      {/* 2. 3 Cardinal Gemstones (Life, Lucky, Punya) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {renderGemCard(
          '१. लग्नेश रत्न (आरोग्य व यश)',
          'जीवन रत्न (Life Gem)',
          lifeGem,
          'border-amber-400/80',
          'bg-amber-600 text-white'
        )}
        {renderGemCard(
          '२. नवमेश रत्न (सौभाग्य व ऐश्वर्य)',
          'भाग्य रत्न (Lucky Gem)',
          luckyGem,
          'border-emerald-400/80',
          'bg-emerald-600 text-white'
        )}
        {renderGemCard(
          '३. पंचमेश रत्न (बुद्धि व संतति)',
          'कारक रत्न (Punya Gem)',
          punyaGem,
          'border-blue-400/80',
          'bg-blue-600 text-white'
        )}
      </div>

      {/* 3. Prohibited Gemstones Alert & Rudraksha Consultation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Prohibited Gemstones Alert */}
        <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-stone-900/90 border border-rose-300/70 space-y-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-600" />
            <h3 className="text-sm font-bold font-serif text-rose-950 dark:text-rose-200">
              {currentLagnaRemedy.lagnaHindi} लग्न हेतु वर्जित रत्न (Strict Warning)
            </h3>
          </div>
          <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
            शास्त्रानुसार ६, ८, १२ (त्रिक भाव) एवं २, ७ (मारक भाव) के स्वामियों के रत्न धारण करने से भारी हानि हो सकती है:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {prohibitedGems.map((gemName, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-white dark:bg-stone-800 text-rose-800 dark:text-rose-300 border border-rose-300 font-bold text-xs"
              >
                ✕ {gemName}
              </span>
            ))}
          </div>
        </div>

        {/* Rudraksha Recommendation */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#fff7ed] via-[#fef3c7]/20 to-[#fffbeb] border border-amber-900/10 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold font-serif text-[#26150b] dark:text-stone-100">
              अनुकूल मुखी रुद्राक्ष परामर्श
            </h3>
          </div>
          <div className="space-y-1">
            <div className="text-base font-bold text-amber-950 dark:text-amber-200">
              {rudraksha.mukhi}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400">
              आराध्य देव: <strong>{rudraksha.deity}</strong> • ग्रह: <strong>{rudraksha.planet}</strong>
            </div>
          </div>
          <p className="text-xs text-[#735641] leading-relaxed pt-1 border-t border-amber-900/10">
            {rudraksha.benefitHindi}
          </p>
        </div>
      </div>
    </div>
  );
};
