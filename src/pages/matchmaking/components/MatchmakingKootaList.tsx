/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MatchmakingKootaList
 * Granular Ashtakoot 8-Pillars Scoring Breakdown & Classical Explanations
 * Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import type { UseMatchmakingDataResult } from '../hooks/useMatchmakingData';
import { KOOTAS_METADATA } from '../hooks/matchmakingPresets';
import { toDevanagariNumerals } from '../hooks/useMatchmakingData';
import { ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

interface MatchmakingKootaListProps {
  data: UseMatchmakingDataResult;
}

export const MatchmakingKootaList: React.FC<MatchmakingKootaListProps> = ({ data }) => {
  const { milanReport, groomRashi, groomNakshatra, brideRashi, brideNakshatra } = data;
  const [expandedKoota, setExpandedKoota] = useState<string | null>(null);

  const toggleExpand = (kootaKey: string) => {
    setExpandedKoota((prev) => (prev === kootaKey ? null : kootaKey));
  };

  // Specific values for Groom and Bride for each koota
  const getAttributes = (kootaKey: string) => {
    switch (kootaKey) {
      case 'Varna':
        return { groom: groomRashi.elementHindi, bride: brideRashi.elementHindi };
      case 'Vashya':
        return { groom: groomRashi.hindi, bride: brideRashi.hindi };
      case 'Tara':
        return { groom: groomNakshatra.hindi, bride: brideNakshatra.hindi };
      case 'Yoni':
        return { groom: `${groomNakshatra.yoniHindi} योनि`, bride: `${brideNakshatra.yoniHindi} योनि` };
      case 'Graha Maitri':
        return { groom: `स्वामी ${groomRashi.lordHindi}`, bride: `स्वामी ${brideRashi.lordHindi}` };
      case 'Gana':
        return { groom: `${groomNakshatra.ganaHindi} गण`, bride: `${brideNakshatra.ganaHindi} गण` };
      case 'Bhakoot':
        return { groom: `${groomRashi.hindi} राशि`, bride: `${brideRashi.hindi} राशि` };
      case 'Nadi':
        return { groom: `${groomNakshatra.nadiHindi} नाड़ी`, bride: `${brideNakshatra.nadiHindi} नाड़ी` };
      default:
        return { groom: '', bride: '' };
    }
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-amber-200/70 dark:border-amber-900/40 pb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold font-serif text-[#26150b] dark:text-stone-100">
            अष्टकूट ८ स्तम्भ विस्तृत गुण विभाजन (३६ गुण सारणी)
          </h3>
        </div>
        <span className="text-xs text-stone-500 font-mono hidden sm:inline">
          ८ कूट • ३६ अधिकतम अंक
        </span>
      </div>

      {/* 8 Kootas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {milanReport.kootas.map((k, idx) => {
          const meta = KOOTAS_METADATA[k.koota] || {
            name: k.koota,
            nameEnglish: k.koota,
            maxPoints: k.maxPoints,
            importanceHindi: k.description,
            sanskritVerse: '',
          };

          const isExpanded = expandedKoota === k.koota;
          const obtained = k.obtainedPoints;
          const max = k.maxPoints;
          const isFull = obtained === max;
          const isZero = obtained === 0;
          const attrs = getAttributes(k.koota);

          const statusBadge = isFull
            ? { text: 'शुभ (पूर्ण)', bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300' }
            : isZero
            ? { text: 'अशुभ (शून्य)', bg: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300' }
            : { text: 'मध्यम', bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300' };

          return (
            <div
              key={k.koota}
              className="bg-white/90 dark:bg-stone-900/90 rounded-2xl border border-amber-200/70 dark:border-amber-900/40 p-4 shadow-xs transition-all hover:border-amber-400"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-stone-800 text-amber-900 dark:text-amber-300 text-[10px] font-bold flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
                      {meta.name}
                    </h4>
                    <span className="text-[10px] text-stone-400">({meta.nameEnglish})</span>
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{k.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-bold font-serif text-amber-900 dark:text-amber-200">
                    {obtained}{' '}
                    <span className="text-xs text-stone-400 font-mono">/ {max}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${statusBadge.bg}`}>
                    {statusBadge.text}
                  </span>
                </div>
              </div>

              {/* Attributes Comparison */}
              <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-stone-600 dark:text-stone-400">
                  <span className="text-[10px] text-stone-400">वर:</span>
                  <span className="font-semibold text-amber-950 dark:text-amber-200">{attrs.groom}</span>
                </div>
                <div className="text-stone-300 dark:text-stone-600">⇄</div>
                <div className="flex items-center gap-1 text-stone-600 dark:text-stone-400">
                  <span className="text-[10px] text-stone-400">कन्या:</span>
                  <span className="font-semibold text-rose-950 dark:text-rose-200">{attrs.bride}</span>
                </div>
              </div>

              {/* Expandable Shastric Insight */}
              <button
                type="button"
                onClick={() => toggleExpand(k.koota)}
                className="mt-2.5 w-full flex items-center justify-between text-[11px] text-amber-700 dark:text-amber-400 font-medium hover:text-amber-900 cursor-pointer pt-1 border-t border-dashed border-amber-200/50"
              >
                <span>शास्त्रीय विवरण एवं प्रभाव</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isExpanded && (
                <div className="mt-2 p-2.5 rounded-xl bg-amber-50/70 dark:bg-stone-800/60 text-[11px] space-y-1.5 border border-amber-200/40">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
                    {meta.importanceHindi}
                  </p>
                  {meta.sanskritVerse && (
                    <div className="font-serif italic text-amber-900 dark:text-amber-300 text-[10px]">
                      "{meta.sanskritVerse}"
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
