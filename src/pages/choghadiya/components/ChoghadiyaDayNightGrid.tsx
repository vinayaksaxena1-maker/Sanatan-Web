/**
 * Sanatan Web (सनातन घड़ी)
 * Component: ChoghadiyaDayNightGrid
 * Day (8 पहर) & Night (8 पहर) Clean Tabular Rows (No Card Boxes)
 * Standardized Sacred Vedic Container with Golden Brackets & Watermark
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

  const renderChoghadiyaTable = (slots: ChoghadiyaInterval[]) => {
    return (
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
            {slots.map((slot, idx) => {
              const meta = CHOGHADIYA_INFO[slot.type] || CHOGHADIYA_INFO.Amrit;
              const isAuspicious = meta.isAuspicious;
              const isActive = activeChoghadiya?.name === slot.name && activeChoghadiya?.startTime === slot.startTime;

              return (
                <tr
                  key={`${slot.name}-${slot.startTime}-${idx}`}
                  className={`transition-colors ${
                    isActive
                      ? 'bg-amber-100/80 font-semibold'
                      : 'hover:bg-amber-50/60'
                  }`}
                >
                  {/* Pehar Name */}
                  <td className="py-3 px-4 font-mono font-bold text-[#735641]">
                    {PEHAR_NAMES[idx] || `${idx + 1}. पहर`}
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
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : meta.colorClass === 'amber'
                          ? 'bg-amber-100 text-amber-900 border-amber-200'
                          : 'bg-rose-100 text-rose-800 border-rose-200'
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
    );
  };

  return (
    <div className="space-y-[22px] font-serif">
      {/* Tab Filter Controller */}
      <div className="relative overflow-hidden rounded-2xl p-3 sm:p-4 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <GoldenCornerBrackets size="sm" />
        <div className="relative z-10 flex items-center gap-2">
          <VedicIcon3D name="temple" size="sm" />
          <span className="text-sm font-bold text-[#26150b]">
            {dayName} का चौघड़िया चक्र (१६ पहर)
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-1.5 bg-[#f4ecd9] p-1 rounded-xl text-xs font-bold">
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

      {/* ================= 1. DAY CHOGHADIYA (सूर्योदय से सूर्यास्त) ================= */}
      {(activeTab === 'both' || activeTab === 'day') && (
        <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs space-y-4">
          <GoldenCornerBrackets size="lg" />
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dec9ab]/60 pb-3">
            <div className="flex items-center gap-2.5">
              <VedicIcon3D name="sun" size="sm" />
              <div>
                <h3 className="text-lg font-bold text-[#26150b]">दिन का चौघड़िया (सूर्योदय से सूर्यास्त)</h3>
                <p className="text-xs text-[#735641]">कुल ८ पहर काल • अवधि: प्रति चौघड़िया लगभग १ घंटा २६ मिनट</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#b45309] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {dayName} विशिष्ट क्रम
            </span>
          </div>

          {renderChoghadiyaTable(dayChoghadiya)}
        </section>
      )}

      {/* ================= 2. NIGHT CHOGHADIYA (सूर्यास्त से अगले सूर्योदय) ================= */}
      {(activeTab === 'both' || activeTab === 'night') && (
        <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs space-y-4">
          <GoldenCornerBrackets size="lg" />
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dec9ab]/60 pb-3">
            <div className="flex items-center gap-2.5">
              <VedicIcon3D name="moon" size="sm" />
              <div>
                <h3 className="text-lg font-bold text-[#26150b]">रात्रि का चौघड़िया (सूर्यास्त से अगले सूर्योदय)</h3>
                <p className="text-xs text-[#735641]">कुल ८ पहर काल • रात्रि कालीन मांगलिक निर्णय</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#b45309] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              रात्रि कालीन क्रम
            </span>
          </div>

          {renderChoghadiyaTable(nightChoghadiya)}
        </section>
      )}
    </div>
  );
};

export default ChoghadiyaDayNightGrid;
