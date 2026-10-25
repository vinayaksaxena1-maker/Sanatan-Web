/**
 * Sanatan Web (सनातन घड़ी)
 * Component: HoraTable
 * 24-Hour Planetary Hora Wheel & Table (वैदिक ग्रहीय होरा सारिणी)
 * Real engine calculation with active hora highlight & Vedic Beej Mantras
 * Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { HORA_MANTRAS, type UseChoghadiyaDataResult } from '../hooks/useChoghadiyaData';
import { toDevanagariNumerals } from '../../panchang/hooks/usePanchangData';
import type { HoraInterval } from '../../../engine/types';

export interface HoraTableProps {
  data: UseChoghadiyaDataResult;
}

export const HoraTable: React.FC<HoraTableProps> = ({ data }) => {
  const { allHoras, dayHoras, nightHoras, activeHora } = data;
  const [filter, setFilter] = useState<'all' | 'day' | 'night'>('all');

  const displayedHoras = filter === 'day' ? dayHoras : filter === 'night' ? nightHoras : allHoras;

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case 'Auspicious':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Inauspicious':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#fffdfa] via-[#fdf9f2] to-[#fbf2e3] border border-[#dec9ab]/70 shadow-[0_8px_30px_rgb(180,120,40,0.06)] font-serif space-y-6">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
      <GoldenCornerBrackets size="lg" />

      {/* Header & Theory Insight */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#dec9ab]/60 pb-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c2410c] uppercase tracking-wider">
            <span>🪐</span>
            <span>ग्रह काल निर्णय • Planetary Hora Watch</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#26150b]">
            २४ होरा चक्र (वैदिक ग्रहीय होरा सारिणी)
          </h2>
          <p className="text-xs text-[#735641] leading-relaxed">
            प्रत्येक होरा लगभग एक घंटे (६० मिनट) की होती है। दिन की प्रथम होरा उस दिन के वार स्वामी ग्रह की होती है। इसके उपरांत मंद गति से तीव्र गति के ग्रह क्रम (शनि, गुरु, मंगल, सूर्य, शुक्र, बुध, चंद्र) में निरंतर चक्र चलता है।
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex items-center gap-1 bg-[#f4ecd9] p-1 rounded-xl text-xs font-bold self-start lg:self-end">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filter === 'all' ? 'bg-white text-[#c2410c] shadow-xs' : 'text-[#735641] hover:text-[#26150b]'
            }`}
          >
            समस्त २४ होरा
          </button>
          <button
            onClick={() => setFilter('day')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filter === 'day' ? 'bg-white text-[#c2410c] shadow-xs' : 'text-[#735641] hover:text-[#26150b]'
            }`}
          >
            दिन की (१२)
          </button>
          <button
            onClick={() => setFilter('night')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filter === 'night' ? 'bg-white text-[#c2410c] shadow-xs' : 'text-[#735641] hover:text-[#26150b]'
            }`}
          >
            रात्रि की (१२)
          </button>
        </div>
      </div>

      {/* Table Surface */}
      <div className="relative z-10 w-full overflow-x-auto rounded-2xl border border-[#dec9ab]/70 shadow-xs bg-white/90 backdrop-blur-md">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-[#fff9eb] border-b border-[#dec9ab]/70 text-[#735641] text-xs font-bold uppercase tracking-wider">
              <th className="py-3 px-4">क्र.सं.</th>
              <th className="py-3 px-4">समय अवधि (IST)</th>
              <th className="py-3 px-4">होरा स्वामी</th>
              <th className="py-3 px-4">बीज मंत्र</th>
              <th className="py-3 px-4">प्रशस्त एवं अनुशंसित कार्य</th>
              <th className="py-3 px-4 text-right">फल प्रभाव</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dec9ab]/40 text-xs text-[#26150b]">
            {displayedHoras.map((h: HoraInterval) => {
              const isActive = activeHora?.number === h.number;
              const mantra = HORA_MANTRAS[h.lordHindi] || HORA_MANTRAS[h.lord] || 'ॐ सूर्याय नमः';

              return (
                <tr
                  key={`hora-${h.number}`}
                  className={`transition-colors ${
                    isActive
                      ? 'bg-amber-100/70 font-semibold'
                      : h.isDay
                      ? 'hover:bg-amber-50/50'
                      : 'hover:bg-indigo-50/40 bg-stone-50/30'
                  }`}
                >
                  {/* Number */}
                  <td className="py-3 px-4 font-mono font-bold text-[#c2410c]">
                    {toDevanagariNumerals(String(h.number).padStart(2, '0'))}
                  </td>

                  {/* Time */}
                  <td className="py-3 px-4 font-mono font-bold">
                    <div className="flex items-center gap-1.5">
                      <span>{h.startTime} - {h.endTime}</span>
                      {isActive && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#ea580c] text-white">
                          वर्तमान
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Lord */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-200/60 border border-amber-300 text-[#b45309] font-bold flex items-center justify-center text-[11px]">
                        {h.lordHindi.slice(0, 1)}
                      </span>
                      <span className="font-bold text-[#26150b]">{h.lordHindi} ग्रह</span>
                    </div>
                  </td>

                  {/* Beej Mantra */}
                  <td className="py-3 px-4 font-mono text-[11px] text-[#735641]">
                    {mantra}
                  </td>

                  {/* Benefits */}
                  <td className="py-3 px-4 text-[#5a3822] max-w-xs">
                    {h.benefits || 'मांगलिक संवाद, विद्या पठन, शुभ संकल्प।'}
                  </td>

                  {/* Quality Badge */}
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${getQualityBadge(
                        h.quality
                      )}`}
                    >
                      {h.qualityHindi || 'शुभ'}
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

export default HoraTable;
