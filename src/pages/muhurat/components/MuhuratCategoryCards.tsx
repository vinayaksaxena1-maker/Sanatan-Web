/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratCategoryCards
 * 8 Major Vedic Ceremony Tabs & Detailed Astrological Muhurat Bento Cards
 * Standardized Sacred Vedic Container with Golden Brackets & Watermark
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D, type VedicIcon3DType } from '../../vedic-portal/components/VedicIcon3D';
import type { UseMuhuratDataResult, MuhuratCategory } from '../hooks/useMuhuratData';

export interface MuhuratCategoryCardsProps {
  data: UseMuhuratDataResult;
}

const CATEGORIES: {
  id: MuhuratCategory;
  label: string;
  icon: VedicIcon3DType;
  badge?: string;
}[] = [
  { id: 'vivah', label: 'विवाह मुहूर्त', icon: 'shubh', badge: '१४ लग्न' },
  { id: 'grihaPravesh', label: 'गृह प्रवेश', icon: 'temple', badge: 'स्थिर लग्न' },
  { id: 'vahan', label: 'वाहन क्रय', icon: 'clock' },
  { id: 'vyapar', label: 'व्यापार व दुकान', icon: 'sun' },
  { id: 'bhumi', label: 'भूमि पूजन व नींव', icon: 'temple' },
  { id: 'mundan', label: 'मुंडन / चूड़ाकर्म', icon: 'clock' },
  { id: 'namkaran', label: 'नामकरण संस्कार', icon: 'kundli' },
  { id: 'gold', label: 'स्वर्ण / आभूषण क्रय', icon: 'shubh' },
];

export const MuhuratCategoryCards: React.FC<MuhuratCategoryCardsProps> = ({ data }) => {
  const { activeCategory, setActiveCategory, categoryCards } = data;

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs font-serif space-y-4">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dec9ab]/60 pb-3">
        <div className="flex items-center gap-2.5">
          <VedicIcon3D name="temple" size="sm" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#26150b]">
              ३. संस्कार एवं कार्यवार मुहूर्त चयन (८ प्रमुख श्रेणियां)
            </h3>
            <p className="text-xs text-[#735641]">
              विवाह, गृह प्रवेश, व्यापार, वाहन एवं षोडश संस्कारों हेतु आगामी श्रेष्ठ मुहूर्त
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#b45309] bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
          ८ प्रमुख संस्कार श्रेणियां
        </span>
      </div>

      {/* 8 Categories Tab Selector Bar */}
      <div className="relative z-10 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
        <div className="flex items-center gap-2 min-w-max p-1 bg-[#f4ecd9] rounded-xl text-xs font-bold">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#c2410c] shadow-xs'
                    : 'text-[#735641] hover:text-[#26150b]'
                }`}
              >
                <VedicIcon3D name={cat.icon} size="xs" />
                <span>{cat.label}</span>
                {cat.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] font-semibold ${
                      isActive
                        ? 'bg-amber-100 text-[#b45309]'
                        : 'bg-amber-200/50 text-[#735641]'
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
        {categoryCards.map((card, idx) => {
          const isFeatured = idx === 0;

          return (
            <div
              key={card.id}
              className={`relative overflow-hidden rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between space-y-3.5 ${
                isFeatured
                  ? 'bg-gradient-to-br from-[#fffdfa] via-[#fbf7ee] to-[#f8f0e1] border-amber-400/80 shadow-[0_8px_25px_rgba(217,119,6,0.14)] ring-1 ring-amber-300/40 hover:-translate-y-1'
                  : 'bg-white/90 border-[#dec9ab]/80 shadow-2xs hover:bg-white hover:border-[#d4af37] hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.25)] hover:-translate-y-1'
              }`}
            >
              <div className="space-y-3">
                {/* Header Date & Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-950 font-bold rounded-md text-[10px]">
                        {card.primaryBadge}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold rounded-md text-[10px]">
                        {card.secondaryBadge}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-[#26150b] pt-1">
                      {card.dateStr}
                    </h4>
                    <p className="text-xs font-semibold text-[#c2410c]">
                      {card.tithiStr}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-300 flex items-center justify-center text-amber-900 shrink-0">
                    <VedicIcon3D name={isFeatured ? 'shubh' : 'sun'} size="sm" />
                  </div>
                </div>

                {/* Highlighted Muhurat Window Box */}
                <div className="p-3 rounded-xl bg-[#fff9eb] border border-[#dec9ab]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-[#735641] font-medium block">
                      शुभ संस्कार काल वेला:
                    </span>
                    <p className="text-base sm:text-lg font-bold font-mono text-[#c2410c] tracking-tight">
                      {card.timeWindow}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[11px] text-emerald-800 font-bold block">
                      कुल शुभ अवधि:
                    </span>
                    <p className="text-sm sm:text-base font-bold text-[#26150b] font-mono">
                      {card.duration}
                    </p>
                  </div>
                </div>

                {/* Astrological Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-stone-50/80 rounded-lg border border-stone-200/60">
                    <span className="text-[#8c7166] text-[10px] block font-medium">नक्षत्र:</span>
                    <span className="font-bold text-[#26150b] block truncate">{card.nakshatra}</span>
                    <span className="text-emerald-800 text-[10px] block font-semibold">{card.nakshatraType}</span>
                  </div>

                  <div className="p-2 bg-stone-50/80 rounded-lg border border-stone-200/60">
                    <span className="text-[#8c7166] text-[10px] block font-medium">तिथि व योग:</span>
                    <span className="font-bold text-[#26150b] block truncate">{card.tithiYoga}</span>
                    <span className="text-amber-800 text-[10px] block font-semibold">शुभ संयोग</span>
                  </div>

                  <div className="p-2 bg-stone-50/80 rounded-lg border border-stone-200/60">
                    <span className="text-[#8c7166] text-[10px] block font-medium">लग्न शुद्धि:</span>
                    <span className="font-bold text-[#26150b] block truncate">{card.lagnaShuddhi}</span>
                    <span className="text-[#735641] text-[10px] block truncate">{card.lagnaDesc}</span>
                  </div>

                  <div className="p-2 bg-stone-50/80 rounded-lg border border-stone-200/60">
                    <span className="text-[#8c7166] text-[10px] block font-medium">त्रिबल विचार:</span>
                    <span className="font-bold text-[#26150b] block truncate">{card.tribalaShuddhi}</span>
                    <span className="text-[#735641] text-[10px] block truncate">{card.tribalaDesc}</span>
                  </div>
                </div>
              </div>

              {/* Warning Note Footer */}
              {card.warningNote && (
                <div className="pt-2 border-t border-[#dec9ab]/40 text-[11px] text-[#b45309] font-medium flex items-center gap-1.5">
                  <span>ℹ️</span>
                  <span className="truncate">{card.warningNote}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MuhuratCategoryCards;
