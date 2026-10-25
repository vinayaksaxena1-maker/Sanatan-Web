/**
 * Sanatan Web (सनातन घड़ी)
 * Component: ChoghadiyaDayNightGrid
 * Day (8 पहर) & Night (8 पहर) Choghadiya Bento Grid
 * Real engine data with active slot live highlight & golden elevation
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

  const renderSlotCard = (slot: ChoghadiyaInterval, idx: number, isNight: boolean) => {
    const meta = CHOGHADIYA_INFO[slot.type] || CHOGHADIYA_INFO.Amrit;
    const isAuspicious = meta.isAuspicious;
    const isActive = activeChoghadiya?.name === slot.name && activeChoghadiya?.startTime === slot.startTime;

    return (
      <div
        key={`${slot.name}-${slot.startTime}-${idx}`}
        className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-3 relative overflow-hidden ${
          isActive
            ? 'bg-white border-2 border-amber-500 shadow-[0_12px_32px_rgba(217,119,6,0.22)] ring-2 ring-amber-400/40 -translate-y-1'
            : 'bg-white/85 hover:bg-white border-[#dec9ab]/70 hover:border-amber-400 hover:shadow-md hover:-translate-y-1'
        }`}
      >
        {/* Active Pill on top-right */}
        {isActive && (
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-[#c2410c] text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-xl shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            <span>सक्रिय काल</span>
          </div>
        )}

        <div className="space-y-2">
          {/* Slot Number & Auspicious Badge */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold text-[#735641]">
              {PEHAR_NAMES[idx] || `${idx + 1}. पहर`}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                isAuspicious
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : meta.colorClass === 'amber'
                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                  : 'bg-rose-100 text-rose-800 border border-rose-200'
              }`}
            >
              {slot.hindiName || slot.name}
            </span>
          </div>

          {/* Title & Lord */}
          <div className="flex items-baseline justify-between pt-1">
            <h4 className="text-base sm:text-lg font-bold text-[#26150b]">
              {slot.hindiName || slot.name} चौघड़िया
            </h4>
            <span className="text-xs text-[#735641] font-semibold">
              {meta.lord}
            </span>
          </div>

          {/* Time Interval */}
          <div className="text-xs sm:text-sm font-bold text-[#c2410c] font-mono flex items-center gap-1.5 bg-[#fff9eb] px-2.5 py-1 rounded-xl border border-[#dec9ab]/60">
            <VedicIcon3D name="clock" size="sm" />
            <span>{slot.startTime} - {slot.endTime}</span>
          </div>
        </div>

        {/* Guidance / Suitable Actions */}
        <p className="text-[11px] text-[#5a3822] leading-tight bg-stone-50/80 p-2 rounded-xl border border-stone-200/60">
          {meta.significance}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6 font-serif">
      {/* Tab Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-xl p-3 rounded-2xl border border-[#dec9ab]/70 shadow-xs">
        <div className="flex items-center gap-2">
          <VedicIcon3D name="temple" size="sm" />
          <span className="text-sm font-bold text-[#26150b]">
            {dayName} का चौघड़िया चक्र (१६ पहर)
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#f4ecd9] p-1 rounded-xl text-xs font-bold">
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
        <section className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#fffdfa] to-[#fbf5eb] border border-[#dec9ab]/70 shadow-[0_8px_30px_rgb(180,120,40,0.06)] space-y-4">
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
          <GoldenCornerBrackets size="lg" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dec9ab]/60 pb-3">
            <div className="flex items-center gap-2.5">
              <VedicIcon3D name="sun" size="md" />
              <div>
                <h3 className="text-lg font-bold text-[#26150b]">दिन का चौघड़िया (सूर्योदय से सूर्यास्त)</h3>
                <p className="text-xs text-[#735641]">कुल ८ पहर काल • अवधि: प्रति चौघड़िया लगभग १ घंटा २६ मिनट</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#b45309] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {dayName} विशिष्ट क्रम
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
            {dayChoghadiya.map((slot, idx) => renderSlotCard(slot, idx, false))}
          </div>
        </section>
      )}

      {/* ================= 2. NIGHT CHOGHADIYA (सूर्यास्त से अगले सूर्योदय) ================= */}
      {(activeTab === 'both' || activeTab === 'night') && (
        <section className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#fffdfa] via-[#f8f9fc] to-[#eff3fa] border border-[#cbd5e1] shadow-[0_8px_30px_rgb(50,80,140,0.06)] space-y-4">
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.05]" />
          <GoldenCornerBrackets size="lg" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#cbd5e1]/70 pb-3">
            <div className="flex items-center gap-2.5">
              <VedicIcon3D name="moon" size="md" />
              <div>
                <h3 className="text-lg font-bold text-[#1e293b]">रात्रि का चौघड़िया (सूर्यास्त से अगले सूर्योदय)</h3>
                <p className="text-xs text-[#64748b]">कुल ८ पहर काल • रात्रि कालीन मांगलिक निर्णय</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              रात्रि कालीन क्रम
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
            {nightChoghadiya.map((slot, idx) => renderSlotCard(slot, idx, true))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ChoghadiyaDayNightGrid;
