/**
 * Sanatan Web (सनातन घड़ी)
 * Component: HoraLiveHero
 * 2-Box Divided Architecture identical to ChoghadiyaLiveHero & PanchangSolarLunar
 * 5% Outer - 40% वर्तमान सक्रिय होरा - 10% Gap - 40% काल शेष एवं आगामी होरा - 5% Outer
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { HORA_MANTRAS, type UseChoghadiyaDataResult } from '../hooks/useChoghadiyaData';
import { toDevanagariNumerals } from '../../panchang/hooks/usePanchangData';

export interface HoraLiveHeroProps {
  data: UseChoghadiyaDataResult;
}

export const HoraLiveHero: React.FC<HoraLiveHeroProps> = ({ data }) => {
  const {
    activeHora,
    nextHora,
    horaCountdownFormatted,
    horaProgressPercent,
  } = data;

  const activeMantra =
    (activeHora && (HORA_MANTRAS[activeHora.lordHindi] || HORA_MANTRAS[activeHora.lord])) ||
    'ॐ सूर्याय नमः';

  const isAuspicious = activeHora?.quality === 'Auspicious';
  const isNeutral = activeHora?.quality === 'Neutral';

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs font-serif">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      {/* 1. Main Section Heading */}
      <div
        className="border-b border-amber-300/50 pb-[4px] relative z-10"
        style={{ paddingBottom: '4px' }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b] flex items-center gap-2.5">
          <VedicIcon3D name="sun" size="sm" className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>तात्कालिक सक्रिय एवं आगामी ग्रहीय होरा</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#735641]" style={{ marginTop: '2px' }}>
          वर्तमान में चल रही ग्रहीय होरा, शेष काल एवं इसके उपरांत प्रारंभ होने वाली आगामी होरा
        </p>
      </div>

      {/* 2. 5% Outer Gap - 40% Box 1 - 10% Inner Gap - 40% Box 2 - 5% Outer Gap */}
      <div
        className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10"
        style={{ marginTop: '4px' }}
      >
        {/* Box 1: वर्तमान सक्रिय होरा (44.44% of 90% = 40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 pb-[8px] sm:pb-[8px] bg-gradient-to-br from-[#fffdf9] via-[#fefaf3] to-[#fbf2e3] border border-amber-300/70 shadow-xs space-y-2 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-amber-300/60 pb-1.5">
            <h3 className="text-base font-bold text-[#451a03] flex items-center gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-900 shadow-[0_2px_6px_rgba(217,119,6,0.4)] ring-1 ring-white/90 shrink-0" />
              <span>वर्तमान सक्रिय होरा</span>
            </h3>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isAuspicious
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : isNeutral
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {activeHora?.qualityHindi || 'शुभ'}
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">सक्रिय होरा</span>
              <span className="font-bold text-[#c2410c] text-sm sm:text-base">
                {activeHora?.lordHindi || 'सूर्य'} ग्रह होरा ({toDevanagariNumerals(String(activeHora?.number || 1))}वीं होरा)
              </span>
            </div>
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">समय अवधि</span>
              <span className="font-bold font-mono text-right text-[#26150b]">
                {activeHora?.startTime || '०६:१४'} - {activeHora?.endTime || '०७:१२'}
              </span>
            </div>
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">होरा बीज मंत्र</span>
              <span className="font-bold font-mono text-[#b45309] text-[11px] sm:text-xs">
                {activeMantra}
              </span>
            </div>
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium shrink-0">प्रशस्त कार्य व फल</span>
              <span
                className="text-[#5a3822] text-right truncate font-medium"
                title={activeHora?.benefits}
              >
                {activeHora?.benefits || 'राजकीय कार्य, पदभार ग्रहण, औषधि निर्माण।'}
              </span>
            </div>
          </div>
        </div>

        {/* Box 2: होरा काल शेष एवं आगामी होरा (44.44% of 90% = 40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 pb-[8px] sm:pb-[8px] bg-gradient-to-br from-[#fcfcff] via-[#f7f8fd] to-[#eef2ff] border border-indigo-200/80 shadow-xs space-y-2 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-indigo-200/80 pb-1.5">
            <h3 className="text-base font-bold text-[#1e1b4b] flex items-center gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-indigo-300 via-indigo-600 to-indigo-950 shadow-[0_2px_6px_rgba(79,70,229,0.3)] ring-1 ring-white/90 shrink-0" />
              <span>होरा काल शेष एवं आगामी होरा</span>
            </h3>
            <span className="text-[11px] text-indigo-900 font-semibold flex items-center gap-1">
              <span>⏳</span>
              <span>लाइव गणना</span>
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {/* Remaining Time & Progress */}
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">वर्तमान होरा शेष</span>
              <span className="font-bold font-mono text-right text-[#c2410c] text-sm sm:text-base">
                {horaCountdownFormatted} <span className="text-[11px] text-[#735641]">मिनट</span>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="py-1 space-y-1">
              <div className="w-full bg-indigo-100/70 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-[#c2410c] h-full rounded-full transition-all duration-1000"
                  style={{ width: `${horaProgressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#735641] font-mono">
                <span>आरंभ</span>
                <span>{horaProgressPercent}% व्यतीत</span>
                <span>समाप्त</span>
              </div>
            </div>

            {/* Upcoming (आने वाली) Hora Info */}
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">आगामी (अगली) होरा</span>
              <span className="font-bold text-[#1e1b4b]">
                {nextHora?.lordHindi || 'चंद्र'} ग्रह होरा ({toDevanagariNumerals(String(nextHora?.number || 2))}वीं होरा)
              </span>
            </div>
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">आगामी समय अवधि</span>
              <span className="font-bold font-mono text-right text-[#26150b]">
                {nextHora?.startTime || '०७:१२'} - {nextHora?.endTime || '०८:१०'}
              </span>
            </div>
            <div className="py-0.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-[#5c4033] font-medium">आगामी फल प्रभाव</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  nextHora?.quality === 'Auspicious'
                    ? 'bg-emerald-100 text-emerald-800'
                    : nextHora?.quality === 'Neutral'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {nextHora?.qualityHindi || 'अति शुभ'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoraLiveHero;
