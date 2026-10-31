/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangSamvatsaraMandala
 * Section: ३. संवत्सर व मन्त्री मण्डल
 * Box 1: ६० बृहस्पति संवत्सर चक्र
 * Box 2: वर्ष का आकाशीय मन्त्री मण्डल
 * 5% - 40% - 10% - 40% - 5% Balanced Layout matching Section 1 & 2
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { Brihaspati3DIcon, MantriMandala3DIcon } from './VedicSection3DIcons';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangSamvatsaraMandala: React.FC<Props> = ({ data }) => {
  const { panchang, deepAnalysis } = data;
  const { samvatVikram, samvatShaka } = panchang.hinduDate || {};
  const { brihaspatiSamvatsara, mantriMandala } = deepAnalysis;

  const samvatsaraRows = [
    {
      label: 'विक्रम संवत्सर',
      value: `${brihaspatiSamvatsara.vikramSamvatsara} (${samvatVikram})`,
      highlight: true,
    },
    {
      label: 'शक संवत्सर',
      value: `${brihaspatiSamvatsara.shakaSamvatsara} (${samvatShaka})`,
    },
    {
      label: 'बृहस्पति चक्र क्रम',
      value: `६० में से #${brihaspatiSamvatsara.index + 1}`,
    },
    {
      label: 'वर्ष का राजा',
      value: 'देवगुरु बृहस्पति 👑',
      highlight: true,
    },
    {
      label: 'वर्ष का मन्त्री',
      value: 'मंगल देव ⚔️',
      highlight: true,
    },
    {
      label: 'वर्ष फल प्रभाव',
      value: 'ज्ञान, धर्म, रक्षा व सैन्य वृद्धि',
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
          <Brihaspati3DIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>३. संवत्सर व मन्त्री मण्डल</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          ६० बृहस्पति संवत्सर चक्र एवं विक्रम संवत् का आकाशीय मन्त्री मण्डल
        </p>
      </div>

      {/* 2. 5% Outer Gap - 40% संवत्सर Box - 10% Inner Gap - 40% मन्त्री मण्डल Box - 5% Outer Gap */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
        {/* Box 1: ६० बृहस्पति संवत्सर चक्र (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fffdf9] via-[#fefaf3] to-[#fbf2e3] border border-amber-300/70 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-amber-300/60 pb-2">
            <h3 className="text-base font-bold text-[#451a03] flex items-center gap-2">
              <Brihaspati3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>६० बृहस्पति संवत्सर चक्र</span>
            </h3>
            <span className="text-[11px] text-[#b45309] font-semibold">
              👑 आकाशीय शासनाध्यक्ष
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {samvatsaraRows.map((item, idx) => (
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

        {/* Box 2: वर्ष का मन्त्री मण्डल (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fcfcff] via-[#f7f8fd] to-[#eef2ff] border border-indigo-200/80 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-indigo-200/80 pb-2">
            <h3 className="text-base font-bold text-[#1e1b4b] flex items-center gap-2">
              <MantriMandala3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>वर्ष का मन्त्री मण्डल</span>
            </h3>
            <span className="text-[11px] text-indigo-900 font-semibold">
              🏛️ १० ग्रहीय विभाग
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {mantriMandala.slice(0, 6).map((item, idx) => (
              <div
                key={idx}
                className="py-1 flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <span className="text-[#5c4033] font-medium flex items-center gap-1.5">
                  <span>{item.icon}</span>
                  <span>{item.portfolioHindi}</span>
                </span>
                <span className="font-bold font-serif text-right text-indigo-900 shrink-0">
                  {item.planetHindi}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanchangSamvatsaraMandala;
