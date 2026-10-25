/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratInstantCards
 * 4 Actionable Today's Instant Muhurat Bento Cards (Abhijit, Vijaya, Godhuli, Brahma)
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseMuhuratDataResult } from '../hooks/useMuhuratData';

export interface MuhuratInstantCardsProps {
  data: UseMuhuratDataResult;
}

export const MuhuratInstantCards: React.FC<MuhuratInstantCardsProps> = ({ data }) => {
  const { instantMuhurats } = data;

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-6 bg-[#c2410c] rounded-full"></span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#26150b]">
            आज के दैनिक शुभ मुहूर्त (तत्काल निर्णय)
          </h2>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>प्रत्यक्ष खगोलीय वेला</span>
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {instantMuhurats.map((muh, idx) => {
          const iconNames = ['shubh', 'sun', 'clock', 'signal'] as const;
          const currentIcon = iconNames[idx % iconNames.length];

          return (
            <div
              key={muh.id}
              className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(217,119,6,0.16)] flex flex-col justify-between ${
                muh.isActive
                  ? 'bg-gradient-to-br from-[#fffdfa] via-[#fbf7ee] to-[#f7eedc] border-amber-500/40 shadow-[0_8px_25px_rgba(217,119,6,0.12)]'
                  : 'bg-white/80 backdrop-blur-md border-[#dec9ab]/60 shadow-[0_4px_20px_rgb(180,120,40,0.04)]'
              }`}
            >
              {muh.isActive && <GoldenCornerBrackets size="sm" />}

              <div className="space-y-3">
                {/* Top Badge & Icon */}
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-600/20 flex items-center justify-center shrink-0">
                    <VedicIcon3D name={currentIcon} size={22} />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${muh.tagColor}`}>
                    {muh.tag}
                  </span>
                </div>

                {/* Title & Time Range */}
                <div>
                  <h3 className="text-base font-bold font-serif text-[#26150b]">
                    {muh.name}
                  </h3>
                  <p className="text-lg font-bold text-[#c2410c] font-mono tabular-nums tracking-tight mt-1">
                    {muh.timeRange}
                  </p>
                  <span className="text-[11px] text-[#735641] font-medium block">
                    अवधि: {muh.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#735641] leading-relaxed line-clamp-3">
                  {muh.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-amber-900/10 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  {muh.badge}
                </span>
                <span className="text-[#8c7166] text-[11px] font-medium">
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
