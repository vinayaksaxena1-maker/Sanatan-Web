/**
 * Sanatan Web (सनातन घड़ी)
 * Component: ChoghadiyaLiveHero
 * Box-Free Pure Typographic Real-time Active Choghadiya & Compact Countdown
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { CHOGHADIYA_INFO, type UseChoghadiyaDataResult } from '../hooks/useChoghadiyaData';

export interface ChoghadiyaLiveHeroProps {
  data: UseChoghadiyaDataResult;
}

export const ChoghadiyaLiveHero: React.FC<ChoghadiyaLiveHeroProps> = ({ data }) => {
  const { activeChoghadiya, countdownFormatted, progressPercent } = data;

  const chogType = activeChoghadiya?.type || 'Amrit';
  const meta = CHOGHADIYA_INFO[chogType] || CHOGHADIYA_INFO.Amrit;
  const isAuspicious = meta.isAuspicious;

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs font-serif">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* ================= 1. ACTIVE CHOGHADIYA (8 Cols) ================= */}
        <div className="md:col-span-8 space-y-3 md:pr-8 md:border-r border-[#dec9ab]/60">
          {/* Live Status Pill with Radar Wave */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isAuspicious ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isAuspicious ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              />
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${
                isAuspicious
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              तात्कालिक सक्रिय चौघड़िया
            </span>
            <span className="text-xs text-[#735641]">| वर्तमान काल</span>
          </div>

          {/* Title & Badge */}
          <div className="flex flex-wrap items-baseline gap-2.5 pt-0.5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b] tracking-tight">
              {activeChoghadiya?.hindiName || activeChoghadiya?.name || 'अमृत'} चौघड़िया
            </h2>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                isAuspicious
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {meta.statusLabel}
            </span>
          </div>

          {/* Timings & Lord */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#735641]">
            <div className="flex items-center gap-1.5 font-mono font-bold text-[#c2410c] text-sm sm:text-base">
              <VedicIcon3D name="clock" size="xs" />
              <span>{activeChoghadiya?.startTime || '०६:१४'} - {activeChoghadiya?.endTime || '०७:४१'}</span>
            </div>
            <span>•</span>
            <span className="font-semibold text-[#b45309]">स्वामी: {meta.lord}</span>
          </div>

          {/* Guidance Suggestion */}
          <p className="text-xs sm:text-sm text-[#5a3822] leading-relaxed border-l-2 border-[#ea580c]/60 pl-3 pt-0.5">
            <strong className="text-[#c2410c]">शुभ परामर्श:</strong> {meta.significance}
          </p>
        </div>

        {/* ================= 2. LIVE COMPACT COUNTDOWN (4 Cols) ================= */}
        <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center text-center md:text-right space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#735641] font-semibold flex items-center gap-1">
              <span>⏳</span>
              <span>काल शेष:</span>
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#c2410c] font-mono tabular-nums">
              {countdownFormatted}
            </span>
            <span className="text-[11px] text-[#735641]">मिनट</span>
          </div>

          {/* Sleek Minimal Progress Bar */}
          <div className="w-44 space-y-0.5">
            <div className="w-full bg-amber-100/80 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-[#c2410c] h-full rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#735641] font-mono">
              <span>{progressPercent}% व्यतीत</span>
              <span>समाप्त</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChoghadiyaLiveHero;
