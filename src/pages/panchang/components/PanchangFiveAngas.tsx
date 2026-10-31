/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangFiveAngas
 * Section: २. पंचांग के ५ मुख्य अंग
 * Box 1: पंचांग के ५ अंग (तिथि, वार, नक्षत्र, योग, करण)
 * Box 2: संवत् एवं चांद्र मास (विक्रम, शक, कलि, प्रविष्टे, मास, पक्ष)
 * 5% - 40% - 10% - 40% - 5% Balanced Layout matching Section 1
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';
import {
  toDevanagariNumerals,
  cleanYogaHindi,
  cleanKaranaHindi,
  cleanRituHindi,
  formatEndTime,
} from '../hooks/usePanchangData';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { Panchang5Angas3DIcon } from './Panchang5Angas3DIcon';
import { SamvatChandraMasa3DIcon } from './SamvatChandraMasa3DIcon';

export interface PanchangFiveAngasProps {
  data: UsePanchangDataResult;
}

export const PanchangFiveAngas: React.FC<PanchangFiveAngasProps> = ({ data }) => {
  const { panchang, dayName, deepAnalysis } = data;
  const hd = panchang.hinduDate;
  const tithi = hd.tithi;
  const nakshatra = hd.nakshatra;
  const yoga = hd.yoga;
  const karana = hd.karana;
  const karana2 = hd.karana2;

  const angaRows = [
    {
      label: 'तिथि',
      value: `${tithi.hindiName || tithi.name} ${formatEndTime(tithi.endTime)}`.trim(),
      highlight: true,
    },
    {
      label: 'वार',
      value: dayName,
      highlight: true,
    },
    {
      label: 'नक्षत्र',
      value: `${nakshatra.hindiName || nakshatra.name} ${formatEndTime(nakshatra.endTime)}`.trim(),
      highlight: true,
    },
    {
      label: 'योग',
      value: `${cleanYogaHindi(yoga.hindiName || yoga.name)} ${formatEndTime(yoga.endTime)}`.trim(),
    },
    {
      label: 'प्रथम करण',
      value: `${cleanKaranaHindi(karana.hindiName || karana.name)} ${formatEndTime(karana.endTime)}`.trim(),
    },
    {
      label: 'द्वितीय करण',
      value: `${cleanKaranaHindi(karana2?.hindiName || karana2?.name)} ${formatEndTime(karana2?.endTime)}`.trim(),
    },
    {
      label: 'पक्ष',
      value: hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
    },
  ];

  const samvatRows = [
    {
      label: 'विक्रम संवत',
      value: toDevanagariNumerals(hd.samvatVikram),
      highlight: true,
    },
    {
      label: 'शक संवत',
      value: toDevanagariNumerals(hd.samvatShaka),
    },
    {
      label: 'कलि संवत',
      value: toDevanagariNumerals(deepAnalysis.kaliyugaYear),
    },
    {
      label: 'प्रविष्टे / गते',
      value: `${toDevanagariNumerals(deepAnalysis.pravishte.gate)} प्रविष्टे`,
      highlight: true,
    },
    {
      label: 'मास (पूर्णिमान्त)',
      value: hd.monthPurnimantaHindi || hd.monthHindi,
    },
    {
      label: 'मास (अमान्त)',
      value: hd.monthAmantaHindi || hd.monthHindi,
    },
    {
      label: 'ऋतु एवं अयन',
      value: `${cleanRituHindi(hd.ritu)} (${hd.ayana === 'Dakshinayana' ? 'दक्षिणायन' : 'उत्तरायण'})`,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs font-serif space-y-4">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      {/* 1. Main Section Heading */}
      <div className="border-b border-amber-300/50 pb-3 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b] flex items-center gap-2.5">
          <Panchang5Angas3DIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>२. पंचांग के ५ मुख्य अंग</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          संवत्, तिथि, वार, नक्षत्र, योग एवं करण — काल-विधान के मूल आधार
        </p>
      </div>

      {/* 2. 5% Outer Gap - 40% पंचांग Box - 10% Inner Gap - 40% संवत् Box - 5% Outer Gap */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
        {/* Box 1: पंचांग के ५ अंग (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fffdf9] via-[#fefaf3] to-[#fbf2e3] border border-amber-300/70 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-amber-300/60 pb-2">
            <h3 className="text-base font-bold text-[#451a03] flex items-center gap-2">
              <Panchang5Angas3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>पंचांग के ५ अंग</span>
            </h3>
            <span className="text-[11px] text-[#b45309] font-semibold">
              🚩 मूल काल-विधान
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {angaRows.map((item, idx) => (
              <div
                key={idx}
                className="py-1 flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <span className="text-[#5c4033] font-medium">
                  {item.label}
                </span>
                <span
                  className={`font-bold font-mono text-right shrink-0 ${
                    item.highlight ? 'text-[#c2410c]' : 'text-[#26150b]'
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Box 2: संवत् एवं चांद्र मास (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fcfcff] via-[#f7f8fd] to-[#eef2ff] border border-indigo-200/80 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-indigo-200/80 pb-2">
            <h3 className="text-base font-bold text-[#1e1b4b] flex items-center gap-2">
              <SamvatChandraMasa3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>संवत् एवं चांद्र मास</span>
            </h3>
            <span className="text-[11px] text-indigo-900 font-semibold">
              📜 संवत्सर चक्र
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {samvatRows.map((item, idx) => (
              <div
                key={idx}
                className="py-1 flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <span className="text-[#5c4033] font-medium">
                  {item.label}
                </span>
                <span
                  className={`font-bold font-mono text-right shrink-0 ${
                    item.highlight ? 'text-indigo-900' : 'text-[#26150b]'
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanchangFiveAngas;
