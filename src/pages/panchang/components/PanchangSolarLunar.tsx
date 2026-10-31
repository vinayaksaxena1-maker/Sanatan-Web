/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangSolarLunar
 * Section: २. सूर्य व चन्द्र खगोलीय चक्र (Solar Arc & Lunar Tracker)
 * Box-free, pure typographic layout with clear Normal Headings
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { SuryaChandra3DIcon } from './VedicSection3DIcons';

export interface PanchangSolarLunarProps {
  data: UsePanchangDataResult;
}

export const PanchangSolarLunar: React.FC<PanchangSolarLunarProps> = ({ data }) => {
  const { panchang, deepAnalysis } = data;
  const hd = panchang.hinduDate;

  const solarRows = [
    {
      label: 'प्रातः सूर्योदय काल',
      value: panchang.sunrise,
      highlight: true,
    },
    {
      label: 'सायं सूर्यास्त काल',
      value: panchang.sunset,
      highlight: true,
    },
    {
      label: 'मध्याह्न काल',
      value: deepAnalysis.madhyahnaTime,
    },
    {
      label: 'सूर्य नक्षत्र',
      value: `${panchang.suryaNakshatra?.hindiName || panchang.suryaNakshatra?.nameHindi || 'चित्रा'} पद ${panchang.suryaNakshatra?.pada || 3}`,
    },
    {
      label: 'दिवाकाल (दिनमान अवधि)',
      value: deepAnalysis.dinamanaFormatted,
    },
  ];

  const lunarRows = [
    {
      label: 'चंद्रोदय समय',
      value: panchang.moonrise || '१०:३२ PM',
      highlight: true,
    },
    {
      label: 'चंद्रास्त समय',
      value: panchang.moonset || '११:५४ AM',
    },
    {
      label: 'चंद्र राशि एवं नक्षत्र',
      value: `${panchang.chandraNakshatra?.nameHindi || panchang.chandraNakshatra?.hindiName || 'मिथुन'} (${hd.nakshatra?.hindiName || 'आर्द्रा'} पद ${hd.nakshatra?.pada || 2})`,
    },
    {
      label: 'चन्द्र अवस्था व कला',
      value: hd.paksha === 'Shukla' ? 'शुक्ल पक्षीय वर्धमान चन्द्र' : 'कृष्ण पक्षीय चन्द्र कला',
    },
    {
      label: 'जन्म / दैनिक पाया',
      value: panchang.paya?.hindiName ? `${panchang.paya.hindiName} पाया` : 'रजत पाया',
    },
    {
      label: 'रात्रिमान अवधि (निशाकाल)',
      value: deepAnalysis.ratrimanaFormatted,
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
          <SuryaChandra3DIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>१. सूर्योदय एवं चन्द्रोदय</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          सूर्योदय, सूर्यास्त, चन्द्रोदय, चन्द्रास्त, प्रकाश प्रतिशत एवं सौर-चांद्र राशि संचरण
        </p>
      </div>

      {/* 2. 5% Outer Gap - 40% सूर्य Box - 10% Inner Gap - 40% चन्द्र Box - 5% Outer Gap */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
        {/* Box 1: सूर्य खगोलीय संचरण (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fffdf9] via-[#fefaf3] to-[#fbf2e3] border border-amber-300/70 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-amber-300/60 pb-2">
            <h3 className="text-base font-bold text-[#451a03] flex items-center gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-amber-200 via-orange-500 to-amber-900 shadow-[0_2px_6px_rgba(234,88,12,0.4)] ring-1 ring-white/90 shrink-0"></span>
              <span>सूर्य खगोलीय संचरण</span>
            </h3>
            <span className="text-[11px] text-[#b45309] font-semibold">
              ☀️ प्रत्यक्ष सौर क्रांति
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {solarRows.map((item, idx) => (
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

        {/* Box 2: चन्द्र खगोलीय संचरण (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fcfcff] via-[#f7f8fd] to-[#eef2ff] border border-indigo-200/80 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-indigo-200/80 pb-2">
            <h3 className="text-base font-bold text-[#1e1b4b] flex items-center gap-2">
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-white via-slate-200 to-slate-400 shadow-[0_2px_6px_rgba(100,116,139,0.3)] ring-1 ring-white/90 shrink-0"></span>
              <span>चन्द्र खगोलीय संचरण</span>
            </h3>
            <span className="text-[11px] text-indigo-900 font-semibold">
              🌙 चांद्र कला एवं गोचर
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {lunarRows.map((item, idx) => (
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

export default PanchangSolarLunar;
