/**
 * Sanatan Web (सनातन घड़ी)
 * Component: ChoghadiyaDayNightGrid
 * Unified Single-Container Choghadiya Wheel with Filter Switcher in Header
 * Day (8), Night (8), or Combined (16) Tabular View — Zero Duplicate Containers
 * Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { CHOGHADIYA_INFO, type UseChoghadiyaDataResult } from '../hooks/useChoghadiyaData';
import type { ChoghadiyaInterval } from '../../../engine/types';

export interface ChoghadiyaDayNightGridProps {
  data: UseChoghadiyaDataResult;
}

const PEHAR_NAMES = [
  '१. प्रथम पहर',
  '२. द्वितीय पहर',
  '३. तृतीय पहर',
  '४. चतुर्थ पहर',
  '५. पंचम पहर',
  '६. षष्ठ पहर',
  '७. सप्तम पहर',
  '८. अष्टम पहर',
];

export const ChoghadiyaDayNightGrid: React.FC<ChoghadiyaDayNightGridProps> = ({ data }) => {
  const { dayChoghadiya, nightChoghadiya, activeChoghadiya, dayName } = data;
  const [activeTab, setActiveTab] = useState<'both' | 'day' | 'night'>('both');

  // Compute displayed slots based on selected filter
  const displayedSlots: ChoghadiyaInterval[] =
    activeTab === 'day'
      ? dayChoghadiya
      : activeTab === 'night'
      ? nightChoghadiya
      : [...dayChoghadiya, ...nightChoghadiya];

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs space-y-4 font-serif">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      {/* Header Row with Title, Description, and Integrated Filter Switcher */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#dec9ab]/60 pb-3">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <VedicIcon3D name={activeTab === 'night' ? 'moon' : 'sun'} size="sm" />
            <h3 className="text-lg sm:text-xl font-bold text-[#26150b]">
              {dayName} का चौघड़िया चक्र (
              {activeTab === 'both' ? '१६ पहर' : activeTab === 'day' ? 'दिन के ८ पहर' : 'रात्रि के ८ पहर'}
              )
            </h3>
          </div>
          <p className="text-xs text-[#735641]">
            {activeTab === 'day'
              ? 'सूर्योदय से सूर्यास्त तक कुल ८ पहर काल • अवधि: प्रति चौघड़िया लगभग १ घंटा २६ मिनट'
              : activeTab === 'night'
              ? 'सूर्यास्त से अगले सूर्योदय तक कुल ८ पहर काल • रात्रि कालीन मांगलिक निर्णय'
              : 'दिन (सूर्योदय से सूर्यास्त) एवं रात्रि (सूर्यास्त से अगले सूर्योदय) के सम्पूर्ण १६ पहरों की संयुक्त सारणी'}
          </p>
        </div>

        {/* Filter Switcher directly in the header */}
        <div className="flex items-center gap-1.5 bg-[#f4ecd9] p-1 rounded-xl text-xs font-bold shrink-0 self-start lg:self-end">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'both' ? 'bg-white text-[#c2410c] shadow-xs' : 'text-[#735641] hover:text-[#26150b]'
            }`}
          >
            दिन व रात (१६)
          </button>
          <button
            onClick={() => setActiveTab('day')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'day' ? 'bg-white text-[#c2410c] shadow-xs' : 'text-[#735641] hover:text-[#26150b]'
            }`}
          >
            ☀️ दिन का (८)
          </button>
          <button
            onClick={() => setActiveTab('night')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'night' ? 'bg-white text-[#c2410c] shadow-xs' : 'text-[#735641] hover:text-[#26150b]'
            }`}
          >
            🌙 रात का (८)
          </button>
        </div>
      </div>

      {/* Dynamic Unified Table Surface */}
      <div className="relative z-10 w-full overflow-x-auto rounded-xl border border-amber-200/90 shadow-xs bg-white/95 backdrop-blur-md">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="bg-[#fff9eb] border-b border-amber-200/80 text-[#735641] text-xs font-bold uppercase tracking-wider">
              <th className="py-3 px-4">पहर</th>
              <th className="py-3 px-4">चौघड़िया मुहूर्त</th>
              <th className="py-3 px-4">समय अवधि (IST)</th>
              <th className="py-3 px-4">ग्रह स्वामी</th>
              <th className="py-3 px-4">प्रशस्त कार्य एवं निर्देश</th>
              <th className="py-3 px-4 text-right">फल प्रभाव</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100/80 text-xs text-[#26150b]">
            {displayedSlots.map((slot, idx) => {
              const meta = CHOGHADIYA_INFO[slot.type] || CHOGHADIYA_INFO.Amrit;
              const isAuspicious = meta.isAuspicious;
              const isActive = activeChoghadiya?.name === slot.name && activeChoghadiya?.startTime === slot.startTime;
              const peharIndex = idx % 8;

              return (
                <tr
                  key={`${slot.name}-${slot.startTime}-${idx}`}
                  className={`transition-colors ${
                    isActive
                      ? 'bg-amber-100/80 font-semibold'
                      : slot.isDay
                      ? 'hover:bg-amber-50/60'
                      : 'hover:bg-indigo-50/40 bg-stone-50/20'
                  }`}
                >
                  {/* Pehar Name & Day/Night Indicator */}
                  <td className="py-3 px-4 font-mono font-bold text-[#735641]">
                    {activeTab === 'both' ? (
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            slot.isDay
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                          }`}
                        >
                          {slot.isDay ? 'दिन' : 'रात'}
                        </span>
                        <span>{PEHAR_NAMES[peharIndex]}</span>
                      </div>
                    ) : (
                      <span>{PEHAR_NAMES[peharIndex]}</span>
                    )}
                  </td>

                  {/* Choghadiya Name & Icon */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-lg font-bold flex items-center justify-center text-[11px] ${
                          isAuspicious
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : meta.colorClass === 'amber'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {(slot.hindiName || slot.name).slice(0, 1)}
                      </span>
                      <span className="font-bold text-[#26150b] text-sm">
                        {slot.hindiName || slot.name}
                      </span>
                    </div>
                  </td>

                  {/* Time Interval */}
                  <td className="py-3 px-4 font-mono font-bold">
                    <div className="flex items-center gap-1.5 text-[#c2410c]">
                      <span>{slot.startTime} - {slot.endTime}</span>
                      {isActive && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ea580c] text-white flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          <span>सक्रिय काल</span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Lord */}
                  <td className="py-3 px-4 font-medium text-[#735641]">
                    {meta.lord}
                  </td>

                  {/* Guidance / Significance */}
                  <td className="py-3 px-4 text-[#5a3822] max-w-sm">
                    {meta.significance}
                  </td>

                  {/* Quality Badge */}
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                        isAuspicious
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : meta.colorClass === 'amber'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {meta.statusLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ChoghadiyaDayNightGrid;
