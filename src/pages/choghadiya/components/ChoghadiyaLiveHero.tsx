/**
 * Sanatan Web (सनातन घड़ी)
 * Component: ChoghadiyaLiveHero
 * Real-time Active Choghadiya, Dynamic Live Countdown & Current Active Hora
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
  const { activeChoghadiya, countdownFormatted, progressPercent, activeHora } = data;

  const chogType = activeChoghadiya?.type || 'Amrit';
  const meta = CHOGHADIYA_INFO[chogType] || CHOGHADIYA_INFO.Amrit;
  const isAuspicious = meta.isAuspicious;

  return (
    <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#fffdfa] via-[#fbf5eb] to-[#f7eedc] border border-[#dec9ab]/80 shadow-[0_8px_30px_rgb(180,120,40,0.06)] font-serif">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
      <GoldenCornerBrackets size="lg" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ================= 1. ACTIVE CHOGHADIYA (5 Cols) ================= */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab] shadow-xs">
          <div className="space-y-3">
            {/* Live Status Pill with Radar Wave */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isAuspicious ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isAuspicious ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                ></span>
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
            <div className="flex flex-wrap items-baseline gap-2 pt-1">
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
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#735641]">
              <div className="flex items-center gap-1 font-mono font-bold text-[#c2410c] text-sm bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                <VedicIcon3D name="clock" size="sm" />
                <span>{activeChoghadiya?.startTime || '०६:१४'} - {activeChoghadiya?.endTime || '०७:४१'}</span>
              </div>
              <span>•</span>
              <span className="font-semibold text-[#b45309]">स्वामी: {meta.lord}</span>
            </div>

            {/* Guidance Suggestion */}
            <p className="text-xs text-[#5a3822] leading-relaxed bg-[#fff9eb] p-3 rounded-xl border border-[#dec9ab]/70">
              <strong className="text-[#c2410c]">वैदिक परामर्श:</strong> {meta.significance}
            </p>
          </div>
        </div>

        {/* ================= 2. LIVE DYNAMIC COUNTDOWN (3 Cols) ================= */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-white/95 to-[#fffaf0] border border-[#dec9ab] shadow-xs text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#735641] uppercase tracking-wider font-semibold">
            <span>⏳</span>
            <span>वर्तमान काल शेष</span>
          </div>

          {/* Big Devanagari Countdown Display */}
          <div className="text-3xl sm:text-4xl font-bold text-[#c2410c] tabular-nums font-mono tracking-tight drop-shadow-xs">
            {countdownFormatted}
          </div>

          <span className="text-[11px] text-[#735641]">मिनट एवं सेकंड शेष</span>

          {/* Real-time Progress Bar */}
          <div className="w-full space-y-1 pt-1">
            <div className="w-full bg-[#f5ebd7] rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-amber-500 to-[#c2410c] h-full rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#735641] font-mono">
              <span>आरंभ</span>
              <span>{progressPercent}% व्यतीत</span>
              <span>समाप्त</span>
            </div>
          </div>
        </div>

        {/* ================= 3. ACTIVE HORA SNAPSHOT (4 Cols) ================= */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3 p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab] shadow-xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#dec9ab]/60 pb-2">
              <span className="text-xs font-bold text-[#b45309] flex items-center gap-1.5">
                <VedicIcon3D name="sun" size="sm" />
                <span>वर्तमान सक्रिय होरा</span>
              </span>
              <span className="text-[11px] font-mono text-[#735641] bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                {activeHora?.startTime || '०६:१४'} - {activeHora?.endTime || '०७:१२'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fef08a] via-[#f59e0b] to-[#b45309] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                {activeHora?.lordHindi || 'सूर्य'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#26150b]">
                  {activeHora?.lordHindi || 'सूर्य'} ग्रह होरा
                </h3>
                <span className="text-xs font-bold text-emerald-700">
                  {activeHora?.qualityHindi || 'अति शुभ एवं श्रेष्ठ'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5a3822] leading-relaxed bg-[#fff9eb] p-2.5 rounded-xl border border-[#dec9ab]/60">
              <strong className="text-[#26150b]">प्रशस्त कार्य:</strong> {activeHora?.benefits || 'राजकीय कार्य, पदभार ग्रहण, औषधि निर्माण, पिता का आशीर्वाद एवं नया संकल्प।'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChoghadiyaLiveHero;
