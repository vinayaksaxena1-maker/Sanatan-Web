/**
 * Sanatan Web (सनातन घड़ी)
 * Component: ChoghadiyaLiveHero
 * 2-Box Divided Architecture identical to PanchangSolarLunar (१. सूर्योदय एवं चन्द्रोदय)
 * 5% Outer - 40% वर्तमान सक्रिय चौघड़िया - 10% Gap - 40% काल शेष एवं आगामी मुहूर्त - 5% Outer
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
  const {
    activeChoghadiya,
    activeChoghadiyaIndex,
    countdownFormatted,
    progressPercent,
    panchang,
  } = data;

  const chogType = activeChoghadiya?.type || 'Amrit';
  const meta = CHOGHADIYA_INFO[chogType] || CHOGHADIYA_INFO.Amrit;
  const isAuspicious = meta.isAuspicious;

  // Next Upcoming Choghadiya
  const allChoghadiyas = panchang.choghadiya || [];
  const nextIndex =
    allChoghadiyas.length > 0
      ? (Math.max(0, activeChoghadiyaIndex) + 1) % allChoghadiyas.length
      : 0;
  const nextChoghadiya = allChoghadiyas[nextIndex] || null;
  const nextType = nextChoghadiya?.type || 'Shubh';
  const nextMeta = CHOGHADIYA_INFO[nextType] || CHOGHADIYA_INFO.Shubh;

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs font-serif space-y-4">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      {/* 1. Main Section Heading */}
      <div className="border-b border-amber-300/50 pb-3 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b] flex items-center gap-2.5">
          <VedicIcon3D name="clock" size="sm" className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>तात्कालिक सक्रिय एवं आगामी चौघड़िया</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          वर्तमान में चल रहा चौघड़िया, शेष काल एवं इसके उपरांत प्रारंभ होने वाला आगामी मुहूर्त
        </p>
      </div>

      {/* 2. 5% Outer Gap - 40% Box 1 - 10% Inner Gap - 40% Box 2 - 5% Outer Gap */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
        {/* Box 1: वर्तमान सक्रिय चौघड़िया (44.44% of 90% = 40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fffdf9] via-[#fefaf3] to-[#fbf2e3] border border-amber-300/70 shadow-xs space-y-2 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-amber-300/60 pb-1.5">
            <h3 className="text-base font-bold text-[#451a03] flex items-center gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-amber-200 via-orange-500 to-amber-900 shadow-[0_2px_6px_rgba(234,88,12,0.4)] ring-1 ring-white/90 shrink-0" />
              <span>वर्तमान सक्रिय चौघड़िया</span>
            </h3>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isAuspicious
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : meta.colorClass === 'amber'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {meta.statusLabel}
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">सक्रिय मुहूर्त</span>
              <span className="font-bold text-[#c2410c] text-sm sm:text-base">
                {activeChoghadiya?.hindiName || activeChoghadiya?.name || 'अमृत'} चौघड़िया
              </span>
            </div>
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">समय अवधि</span>
              <span className="font-bold font-mono text-right text-[#26150b]">
                {activeChoghadiya?.startTime || '०६:१४'} - {activeChoghadiya?.endTime || '०७:४१'}
              </span>
            </div>
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">वार / ग्रह स्वामी</span>
              <span className="font-bold text-[#b45309]">{meta.lord}</span>
            </div>
            <div className="pt-1 pb-0.5 flex flex-col gap-0.5 text-xs">
              <span className="text-[#5c4033] font-semibold">शुभ परामर्श एवं निर्देश:</span>
              <p className="text-[#5a3822] leading-relaxed border-l-2 border-[#ea580c]/60 pl-2.5">
                {meta.significance}
              </p>
            </div>
          </div>
        </div>

        {/* Box 2: वर्तमान काल शेष एवं आगामी चौघड़िया (44.44% of 90% = 40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fcfcff] via-[#f7f8fd] to-[#eef2ff] border border-indigo-200/80 shadow-xs space-y-2 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-indigo-200/80 pb-1.5">
            <h3 className="text-base font-bold text-[#1e1b4b] flex items-center gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-indigo-300 via-indigo-600 to-indigo-950 shadow-[0_2px_6px_rgba(79,70,229,0.3)] ring-1 ring-white/90 shrink-0" />
              <span>काल शेष एवं आगामी मुहूर्त</span>
            </h3>
            <span className="text-[11px] text-indigo-900 font-semibold flex items-center gap-1">
              <span>⏳</span>
              <span>लाइव गणना</span>
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {/* Remaining Time & Progress */}
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">वर्तमान काल शेष</span>
              <span className="font-bold font-mono text-right text-[#c2410c] text-sm sm:text-base">
                {countdownFormatted} <span className="text-[11px] text-[#735641]">मिनट</span>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="py-1 space-y-1">
              <div className="w-full bg-indigo-100/70 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-[#c2410c] h-full rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#735641] font-mono">
                <span>आरंभ</span>
                <span>{progressPercent}% व्यतीत</span>
                <span>समाप्त</span>
              </div>
            </div>

            {/* Upcoming (आने वाला) Choghadiya Info */}
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">आगामी (अगला) मुहूर्त</span>
              <span className="font-bold text-[#1e1b4b]">
                {nextChoghadiya?.hindiName || nextChoghadiya?.name || 'शुभ'} चौघड़िया
              </span>
            </div>
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">आगामी समय अवधि</span>
              <span className="font-bold font-mono text-right text-[#26150b]">
                {nextChoghadiya?.startTime || '०७:४१'} - {nextChoghadiya?.endTime || '०९:०८'}
              </span>
            </div>
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">आगामी फल प्रभाव</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  nextMeta.isAuspicious
                    ? 'bg-emerald-100 text-emerald-800'
                    : nextMeta.colorClass === 'amber'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {nextMeta.statusLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {nextMeta.statusLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChoghadiyaLiveHero;
