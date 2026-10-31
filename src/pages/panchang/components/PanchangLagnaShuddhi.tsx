/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangLagnaShuddhi
 * Section: ८. मुहूर्त व लग्न शुद्धि
 * Box 1: १२ उदय लग्न व पंचक शुद्धि
 * Box 2: चन्द्रबल एवं ताराबल परीक्षण
 * 5% - 40% - 10% - 40% - 5% Balanced Layout matching Section 1, 2, 3
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { UdayaLagna3DIcon, ChandraTaraBalam3DIcon } from './VedicSection3DIcons';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangLagnaShuddhi: React.FC<Props> = ({ data }) => {
  const { deepAnalysis } = data;
  const { udayaLagnas, chandrabalamList, tarabalamSummary } = deepAnalysis;

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs font-serif space-y-4">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      {/* 1. Main Section Heading */}
      <div className="border-b border-amber-300/50 pb-3 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b] flex items-center gap-2.5">
          <UdayaLagna3DIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>८. मुहूर्त व लग्न शुद्धि</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          १२ उदय लग्न, पंचक रहित मुहूर्त, चन्द्रबल एवं ताराबल परीक्षण
        </p>
      </div>

      {/* 2. 5% Outer Gap - 40% उदय लग्न Box - 10% Inner Gap - 40% चन्द्रबल व ताराबल Box - 5% Outer Gap */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
        {/* Box 1: १२ उदय लग्न व पंचक शुद्धि (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fffdf9] via-[#fefaf3] to-[#fbf2e3] border border-amber-300/70 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-amber-300/60 pb-2">
            <h3 className="text-base font-bold text-[#451a03] flex items-center gap-2">
              <UdayaLagna3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>१२ उदय लग्न व पंचक शुद्धि</span>
            </h3>
            <span className="text-[11px] text-[#b45309] font-semibold">
              ✨ दैनिक लग्न चक्र
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30 max-h-[460px] overflow-y-auto pr-1">
            {udayaLagnas.map((lagna, idx) => (
              <div
                key={idx}
                className="py-1 flex items-center justify-between gap-2 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-bold text-[#26150b] truncate">
                    {idx + 1}. {lagna.rashiHindi} लग्न
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      lagna.isPanchakaShubh
                        ? 'bg-emerald-100/70 text-emerald-800'
                        : 'bg-amber-100/70 text-amber-900'
                    }`}
                  >
                    {lagna.panchakaType}
                  </span>
                </div>
                <span className="font-bold font-mono text-[#c2410c] text-xs shrink-0">
                  {lagna.startTime} – {lagna.endTime}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Box 2: चन्द्रबल एवं ताराबल परीक्षण (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fcfcff] via-[#f7f8fd] to-[#eef2ff] border border-indigo-200/80 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-indigo-200/70 pb-2">
            <h3 className="text-base font-bold text-[#1e1b4b] flex items-center gap-2">
              <ChandraTaraBalam3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>चन्द्रबल एवं ताराबल परीक्षण</span>
            </h3>
            <span className="text-[11px] text-indigo-700 font-semibold">
              🌙 राशि व नक्षत्र शुद्धि
            </span>
          </div>

          {/* Sub A: चन्द्रबल (१२ राशियां) */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-indigo-900 border-b border-indigo-100 pb-1">
              गोचर चन्द्रबल (१२ राशियां)
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
              {chandrabalamList.map((item, idx) => (
                <div
                  key={idx}
                  className="py-0.5 flex items-center justify-between border-b border-[#dec9ab]/20 text-[11px] sm:text-xs"
                >
                  <span className="font-medium text-[#26150b]">{item.rashi}</span>
                  <span
                    className={`font-semibold ${
                      item.isShubh ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {item.isShubh ? '✓ शुभ' : '✗ अनिष्ट'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sub B: ताराबल (२७ नक्षत्र) */}
          <div className="pt-2 border-t border-indigo-100 space-y-1 text-xs">
            <div className="text-[11px] font-bold text-indigo-900">
              दैनिक ताराबल शुद्धि
            </div>
            <div className="space-y-1 text-[11px] sm:text-xs">
              <div className="flex items-start gap-1">
                <span className="font-bold text-emerald-800 shrink-0">✓ शुभ:</span>
                <span className="text-[#5c4033] leading-relaxed">
                  {tarabalamSummary.shubhTaras.join(', ')}
                </span>
              </div>
              <div className="flex items-start gap-1">
                <span className="font-bold text-rose-800 shrink-0">⚠ त्याज्य:</span>
                <span className="text-[#5c4033] leading-relaxed">
                  {tarabalamSummary.ashubhTaras.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanchangLagnaShuddhi;
