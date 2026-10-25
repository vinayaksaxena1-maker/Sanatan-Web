/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MatchmakingScoreSummary
 * Prominent 36-Guna Score Card, Astrological Verdict & Essential Dosha Indicators
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseMatchmakingDataResult } from '../hooks/useMatchmakingData';
import { toDevanagariNumerals } from '../hooks/useMatchmakingData';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

interface MatchmakingScoreSummaryProps {
  data: UseMatchmakingDataResult;
}

export const MatchmakingScoreSummary: React.FC<MatchmakingScoreSummaryProps> = ({ data }) => {
  const { milanReport, manglikHarmony, hindiVerdict, groom, bride } = data;
  const score = milanReport.totalScore;
  const maxScore = milanReport.maxScore;
  const scorePercent = hindiVerdict.scorePercent;

  // Nadi Dosha Status Pill
  const nadiKoota = milanReport.kootas.find((k) => k.koota === 'Nadi');
  const isNadiPerfect = nadiKoota ? nadiKoota.obtainedPoints === 8 : false;
  const isNadiCancelled = milanReport.isNadiDoshaCancelled;

  // Bhakoot Dosha Status Pill
  const bhakootKoota = milanReport.kootas.find((k) => k.koota === 'Bhakoot');
  const isBhakootPerfect = bhakootKoota ? bhakootKoota.obtainedPoints === 7 : false;
  const isBhakootCancelled = milanReport.isBhakootDoshaCancelled;

  return (
    <section className="bg-gradient-to-br from-[#fff7ed] via-[#fef3c7]/20 to-[#fffbeb] rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-[0_4px_20px_rgb(180,120,40,0.04)] space-y-6">
      {/* Top Main Score & Verdict Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Big Radial Gauge / Score Display (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-5 p-5 bg-white/90 dark:bg-stone-900/90 rounded-2xl border border-amber-200/70 dark:border-amber-900/40 shadow-xs">
          {/* Circular Score Badge */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-lg shadow-amber-900/20 p-2">
            <div className="w-full h-full rounded-full border-2 border-dashed border-amber-200/60 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold font-serif tracking-tight leading-none">
                {score}
              </span>
              <span className="text-[10px] text-amber-100 font-mono mt-0.5">
                / {maxScore} गुण
              </span>
            </div>
          </div>

          {/* Quick Score Commentary */}
          <div className="space-y-1.5 text-center sm:text-left">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${hindiVerdict.colorClass} border`}>
              {hindiVerdict.grade}
            </span>
            <div className="text-xs text-stone-600 dark:text-stone-400 font-medium">
              अनुकूलता अनुपात: <strong className="text-amber-900 dark:text-amber-200 font-mono">{scorePercent}%</strong>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
              शास्त्रानुसार विवाह हेतु न्यूनतम १८ गुण आवश्यक माने गए हैं।
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Verdict & Meaning (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <VedicIcon3D name="kalash" size={20} className="text-amber-600" />
              <h3 className="text-lg font-bold font-serif text-[#26150b] dark:text-stone-100">
                शास्त्रीय मिलान संस्तुति एवं निर्णय
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#735641] dark:text-stone-300 leading-relaxed font-serif">
              {hindiVerdict.recommendationHindi}
            </p>
          </div>

          {/* Linear Visual Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-semibold text-stone-600 dark:text-stone-400">
              <span>प्राप्त गुण: {toDevanagariNumerals(score)}</span>
              <span>अधिकतम: {toDevanagariNumerals(maxScore)} गुण</span>
            </div>
            <div className="w-full h-2.5 bg-amber-100 dark:bg-stone-800 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  score >= 28 ? 'bg-emerald-600' : score >= 18 ? 'bg-amber-600' : 'bg-rose-600'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, scorePercent))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Critical Pillar Indicator Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-amber-900/10">
        {/* 1. Nadi Status */}
        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-amber-200/50 dark:border-stone-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              नाड़ी कूट (८ गुण)
            </span>
            {isNadiPerfect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : isNadiCancelled ? (
              <ShieldCheck className="w-4 h-4 text-amber-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
          </div>
          <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
            {isNadiPerfect
              ? 'दोष मुक्त (८/८ पूर्ण)'
              : isNadiCancelled
              ? 'दोष परिहार सिद्ध (८/८)'
              : 'नाड़ी दोष उपस्थित (०/८)'}
          </div>
          <p className="text-[10px] text-stone-500 leading-tight">
            {isNadiPerfect
              ? 'वर व कन्या की नाड़ी भिन्न है, आनुवंशिक दृष्टि से उत्तम।'
              : isNadiCancelled
              ? 'भिन्न राशि अथवा नक्षत्र चरण होने से नाड़ी दोष निरस्त।'
              : 'समान नाड़ी होने पर शास्त्रानुसार शांति अनुष्ठान अपेक्षित।'}
          </p>
        </div>

        {/* 2. Bhakoot Status */}
        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-amber-200/50 dark:border-stone-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              भकूट कूट (७ गुण)
            </span>
            {isBhakootPerfect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : isBhakootCancelled ? (
              <ShieldCheck className="w-4 h-4 text-amber-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
          </div>
          <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
            {isBhakootPerfect
              ? 'दोष मुक्त (७/७ पूर्ण)'
              : isBhakootCancelled
              ? 'भकूट परिहार सिद्ध (७/७)'
              : 'भकूट दोष (०/७)'}
          </div>
          <p className="text-[10px] text-stone-500 leading-tight">
            {isBhakootPerfect
              ? 'राशियों का परस्पर षडाष्टक अथवा द्विर्द्वादश संबंध नहीं है।'
              : isBhakootCancelled
              ? 'राशि स्वामियों की परस्पर मित्रता होने से भकूट दोष निरस्त।'
              : 'आपसी समझ व ग्रह शांति से दांपत्य सामान्य रह सकता है।'}
          </p>
        </div>

        {/* 3. Manglik Harmony Status */}
        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-amber-200/50 dark:border-stone-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              मांगलिक सामंजस्य
            </span>
            {manglikHarmony.isCompatible ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            )}
          </div>
          <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
            {manglikHarmony.status}
          </div>
          <p className="text-[10px] text-stone-500 leading-tight">
            {manglikHarmony.description}
          </p>
        </div>
      </div>
    </section>
  );
};
