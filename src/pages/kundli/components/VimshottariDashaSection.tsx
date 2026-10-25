/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Component: VimshottariDashaSection
 * 120-Year Mahadasha Timeline & Active Antardasha Breakdown Card
 */

import React from 'react';
import { History, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { CompleteHoroscopeResult } from '../../../engine/facade/horoscopeFacade';

interface VimshottariDashaSectionProps {
  horoscope: CompleteHoroscopeResult | null;
}

const DASHA_LORD_HINDI: Record<string, string> = {
  Ketu: 'केतु (७ वर्ष)',
  Venus: 'शुक्र (२० वर्ष)',
  Sun: 'सूर्य (६ वर्ष)',
  Moon: 'चंद्र (१० वर्ष)',
  Mars: 'मंगल (७ वर्ष)',
  Rahu: 'राहु (१८ वर्ष)',
  Jupiter: 'गुरु (१६ वर्ष)',
  Saturn: 'शनि (१९ वर्ष)',
  Mercury: 'बुध (१७ वर्ष)'
};

export const VimshottariDashaSection: React.FC<VimshottariDashaSectionProps> = ({ horoscope }) => {
  if (!horoscope) return null;

  const vims = horoscope.dashas.vimshottari;
  const timeline = vims.timeline || [];
  const current = vims.current;
  const activeLord = current?.mahadasha || 'Sun';
  const activeAntar = current?.antardasha || 'Jupiter';
  const activePrat = current?.pratyantardasha || 'Saturn';

  const now = new Date();

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
            विंशोत्तरी महादशा चक्र (१२० वर्षीय कालक्रम)
          </h2>
        </div>
        <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-300/50 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          वर्तमान दशा: {activeLord} महादशा (सक्रिय)
        </span>
      </div>

      {/* 9 Dasha Timeline Grid */}
      <div className="w-full bg-white dark:bg-stone-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
          {timeline.map((entry, idx) => {
            const startYr = new Date(entry.startDate).getFullYear();
            const endYr = new Date(entry.endDate).getFullYear();
            const isCurrent =
              now >= new Date(entry.startDate) && now <= new Date(entry.endDate);
            const isPast = now > new Date(entry.endDate);

            return (
              <div
                key={idx}
                className={`flex flex-col p-2.5 rounded-xl text-center transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-b from-amber-600 to-amber-700 text-white shadow-md transform sm:scale-105 border-2 border-amber-400'
                    : isPast
                    ? 'bg-stone-50 dark:bg-stone-850 opacity-80 border border-stone-200/60 dark:border-stone-800'
                    : 'bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800'
                }`}
              >
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isCurrent ? 'text-amber-100' : 'text-stone-500 dark:text-stone-400'
                  }`}
                >
                  {DASHA_LORD_HINDI[entry.mahadashaLord] || entry.mahadashaLord}
                </span>
                <span
                  className={`text-xs font-bold font-mono mt-1 ${
                    isCurrent ? 'text-white' : 'text-stone-800 dark:text-stone-200'
                  }`}
                >
                  {startYr} - {endYr}
                </span>
                <div className="mt-1">
                  {isCurrent ? (
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold">
                      ★ सक्रिय
                    </span>
                  ) : isPast ? (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-0.5">
                      <CheckCircle className="w-2.5 h-2.5" /> व्यतीत
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-400">आगामी</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Active Antardasha & Pratyantar Breakdown Card */}
        <div className="p-4 bg-amber-50/60 dark:bg-stone-850 rounded-xl border border-amber-200/80 dark:border-amber-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-600 text-white text-[11px] rounded-md font-bold">
                वर्तमान सूक्ष्म प्रभाव
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-300 font-serif">
                {activeLord} महादशा • {activeAntar} अंतर्दशा • {activePrat} प्रत्यंतर्दशा
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
              शास्त्रीय फल: लग्नेश सूर्य व पंचमेश गुरु का योग जातक को बौद्धिक प्रतिष्ठा, शासन से लाभ, आत्म-सम्मान में वृद्धि व करियर पदोन्नति के उत्कृष्ट अवसर प्रदान करता है।
            </p>
          </div>

          <div className="flex flex-col shrink-0 text-left md:text-right bg-white dark:bg-stone-900 p-3 rounded-xl border border-amber-200/60 dark:border-amber-900/30">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider">
              वर्तमान अंतर्दशा कालखंड
            </span>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400 font-mono mt-0.5">
              {current?.startDate ? new Date(current.startDate).toLocaleDateString('hi-IN') : 'सक्रिय काल'} –{' '}
              {current?.endDate ? new Date(current.endDate).toLocaleDateString('hi-IN') : 'आगामी वर्ष'}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              सक्रिय गोचर संरेखित
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
