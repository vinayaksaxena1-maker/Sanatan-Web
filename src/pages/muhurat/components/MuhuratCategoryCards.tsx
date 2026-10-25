/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratCategoryCards
 * Detailed Astrological Muhurat Bento Cards for Selected Ceremony
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseMuhuratDataResult } from '../hooks/useMuhuratData';

export interface MuhuratCategoryCardsProps {
  data: UseMuhuratDataResult;
}

export const MuhuratCategoryCards: React.FC<MuhuratCategoryCardsProps> = ({ data }) => {
  const { categoryCards } = data;

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {categoryCards.map((card, idx) => {
          const isFeatured = idx === 0;

          return (
            <div
              key={card.id}
              className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(217,119,6,0.18)] flex flex-col justify-between ${
                isFeatured
                  ? 'bg-gradient-to-br from-[#fffdfa] via-[#fbf7ee] to-[#f8f0e1] border-amber-500/40 shadow-[0_8px_30px_rgba(217,119,6,0.12)]'
                  : 'bg-white/85 backdrop-blur-md border-[#dec9ab]/70 shadow-[0_4px_20px_rgb(180,120,40,0.05)]'
              }`}
            >
              {isFeatured && <GoldenCornerBrackets size="sm" />}

              {/* Decorative Header Radiance */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500"></div>

              <div className="space-y-4">
                {/* Header Date & Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-amber-500/15 border border-amber-600/30 text-amber-950 font-bold rounded-full text-xs">
                        {card.primaryBadge}
                      </span>
                      <span className="px-2.5 py-0.5 bg-emerald-500/15 border border-emerald-600/30 text-emerald-950 font-bold rounded-full text-xs">
                        {card.secondaryBadge}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#26150b] pt-1">
                      {card.dateStr}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-[#c2410c]">
                      {card.tithiStr}
                    </p>
                  </div>

                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-600/20 flex items-center justify-center text-amber-900 shrink-0 shadow-xs">
                    <VedicIcon3D name={isFeatured ? 'shubh' : 'sun'} size={24} />
                  </div>
                </div>

                {/* Highlighted Muhurat Window Box */}
                <div className="p-4 rounded-2xl bg-[#fff7ed] border border-amber-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-[#735641] font-medium block">
                      पाणिग्रहण / शुभ संस्कार अवधि:
                    </span>
                    <p className="text-base sm:text-lg font-bold font-mono text-[#c2410c] tracking-tight">
                      {card.timeWindow}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[11px] text-emerald-800 font-bold block">
                      कुल शुभ वेला:
                    </span>
                    <p className="text-sm sm:text-base font-bold text-[#26150b] font-mono">
                      {card.duration}
                    </p>
                  </div>
                </div>

                {/* 4 Astrological Metric Boxes */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 bg-white/70 rounded-xl border border-amber-900/10">
                    <span className="text-[#8c7166] text-[10px] block font-medium">नक्षत्र:</span>
                    <span className="font-bold text-[#26150b] block">{card.nakshatra}</span>
                    <span className="text-emerald-800 text-[10px] block">{card.nakshatraType}</span>
                  </div>

                  <div className="p-2.5 bg-white/70 rounded-xl border border-amber-900/10">
                    <span className="text-[#8c7166] text-[10px] block font-medium">तिथि व योग:</span>
                    <span className="font-bold text-[#26150b] block truncate">{card.tithiYoga}</span>
                    <span className="text-amber-800 text-[10px] block">शुभ संयोग</span>
                  </div>

                  <div className="p-2.5 bg-white/70 rounded-xl border border-amber-900/10">
                    <span className="text-[#8c7166] text-[10px] block font-medium">लग्न शुद्धि:</span>
                    <span className="font-bold text-[#26150b] block truncate">{card.lagnaShuddhi}</span>
                    <span className="text-[#735641] text-[10px] block truncate">{card.lagnaDesc}</span>
                  </div>

                  <div className="p-2.5 bg-white/70 rounded-xl border border-amber-900/10">
                    <span className="text-[#8c7166] text-[10px] block font-medium">त्रिबल शुद्धि:</span>
                    <span className="font-bold text-emerald-800 block truncate">{card.tribalaShuddhi}</span>
                    <span className="text-[#735641] text-[10px] block truncate">{card.tribalaDesc}</span>
                  </div>
                </div>

                {/* Exclusion & Caution Note */}
                <div className="flex items-center gap-2 text-xs text-[#735641] bg-amber-50/70 p-2.5 rounded-xl border border-amber-900/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                  <span className="text-[11px] leading-tight">{card.warningNote}</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-5 pt-4 border-t border-amber-900/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="/kundli"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c2410c] hover:text-[#9a3412] transition-colors"
                >
                  <VedicIcon3D name="kundli" size={16} />
                  <span>लग्न चक्र विवरण देखें</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-white border border-[#dec9ab] hover:bg-amber-50 text-[#26150b] rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>मुहूर्त पत्रक PDF</span>
                  </button>
                  <button
                    type="button"
                    className="px-3.5 py-1.5 bg-[#c2410c] hover:bg-[#9a3412] text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    परामर्श
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MuhuratCategoryCards;
