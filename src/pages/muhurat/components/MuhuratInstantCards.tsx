/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratInstantCards
 * 4 Actionable Today's Instant Muhurat Bento Cards (Abhijit, Vijaya, Godhuli, Brahma)
 * Standardized Sacred Vedic Container with Golden Brackets & Watermark
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseMuhuratDataResult } from '../hooks/useMuhuratData';

export interface MuhuratInstantCardsProps {
  data: UseMuhuratDataResult;
}

export const MuhuratInstantCards: React.FC<MuhuratInstantCardsProps> = ({ data }) => {
  const { instantMuhurats } = data;

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs font-serif space-y-4">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dec9ab]/60 pb-3">
        <div className="flex items-center gap-2.5">
          <VedicIcon3D name="clock" size="sm" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#26150b]">
              १. आज के प्रमुख दैनिक शुभ मुहूर्त (तत्काल निर्णय)
            </h2>
            <p className="text-xs text-[#735641]">
              अभिजीत, ब्रह्म, विजय एवं गोधूलि वेला — दैनिक कार्यों हेतु प्रत्यक्ष शुभ काल
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
          <span>प्रत्यक्ष खगोलीय वेला</span>
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        {instantMuhurats.map((muh, idx) => {
          const iconNames = ['shubh', 'sun', 'clock', 'signal'] as const;
          const currentIcon = iconNames[idx % iconNames.length];

          return (
            <div
              key={muh.id}
              className={`relative overflow-hidden rounded-xl p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                muh.isActive
                  ? 'bg-gradient-to-br from-[#fffdfa] via-[#fbf7ee] to-[#f7eedc] border-amber-500 shadow-[0_8px_25px_rgba(217,119,6,0.18)] ring-2 ring-amber-400/40 -translate-y-1'
                  : 'bg-white/90 border-[#dec9ab]/80 shadow-2xs hover:bg-white hover:border-[#d4af37] hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.25)] hover:-translate-y-1'
              }`}
            >
              <div className="space-y-2.5">
                {/* Top Badge & Icon */}
                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-100/70 border border-amber-300/80 flex items-center justify-center shrink-0">
                    <VedicIcon3D name={currentIcon} size={20} />
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${muh.tagColor}`}
                  >
                    {muh.tag}
                  </span>
                </div>

                {/* Title & Time Range */}
                <div>
                  <h3 className="text-base font-bold text-[#26150b]">
                    {muh.name}
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-[#c2410c] font-mono tabular-nums tracking-tight mt-0.5">
                    {muh.timeRange}
                  </p>
                  <span className="text-[11px] text-[#735641] font-medium block">
                    अवधि: {muh.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#5a3822] leading-relaxed line-clamp-3 bg-stone-50/70 p-2 rounded-lg border border-stone-200/50">
                  {muh.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-2.5 border-t border-[#dec9ab]/40 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-800 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {muh.badge}
                </span>
                <span className="text-[#8c7166] text-[10px] font-medium truncate max-w-[55%]">
                  {muh.significance}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MuhuratInstantCards;
