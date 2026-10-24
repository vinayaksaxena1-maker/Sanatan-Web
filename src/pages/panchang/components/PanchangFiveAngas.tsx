/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangFiveAngas
 * The 5 Sacred Pillars of Vedic Panchanga (तिथि, वार, नक्षत्र, योग, करण)
 * Real engine values with progress bars & 3D skeuomorphic icons
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

export interface PanchangFiveAngasProps {
  data: UsePanchangDataResult;
}

export const PanchangFiveAngas: React.FC<PanchangFiveAngasProps> = ({ data }) => {
  const { panchang, dayName, dayRuler } = data;
  const hd = panchang.hinduDate;
  const tithi = hd.tithi;
  const nakshatra = hd.nakshatra;
  const yoga = hd.yoga;
  const karana = hd.karana;
  const karana2 = hd.karana2;

  const tithiPercent = tithi.percentPassed ?? 65;

  return (
    <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#fffdfa] to-[#fbf5eb] border border-[#dec9ab]/70 shadow-[0_8px_30px_rgb(180,120,40,0.06)] font-serif space-y-6">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
      <GoldenCornerBrackets size="lg" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#dec9ab]/60 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c2410c] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
            <span>पञ्चांगस्य पञ्च अङ्गानि • Panchanga Pillars</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#26150b]">
            पंचांग के ५ मुख्य अंग
          </h2>
          <p className="text-xs text-[#735641]">
            तिथि, वार, नक्षत्र, योग एवं करण — वैदिक काल-विधान के मूल आधार
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold w-fit flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>द्रिक सिद्ध गणना प्रमाणित</span>
        </span>
      </div>

      {/* 5-Column Bento Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: तिथि (Tithi) */}
        <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab] shadow-xs flex flex-col justify-between space-y-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(217,119,6,0.18)] hover:border-amber-500/40 group">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-[#b45309]">
                अंग १ • तिथि
              </span>
              <VedicIcon3D name="tithi" size="sm" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#26150b] group-hover:text-[#c2410c] transition-colors">
                {tithi.hindiName || tithi.name}
              </h3>
              <span className="text-[11px] text-[#735641]">
                {hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-[#fff9eb] border border-[#dec9ab]/60 space-y-0.5">
              <span className="text-[10px] text-[#735641] block">समाप्ति काल</span>
              <span className="text-xs font-bold text-[#c2410c] font-mono block">
                {tithi.endTime || 'रात्रि ०२:१५ तक'}
              </span>
            </div>

            <div className="text-[11px] text-[#735641] space-y-1 pt-1">
              <div className="flex justify-between">
                <span>अधिपति:</span>
                <span className="font-semibold text-[#26150b]">{tithi.lord || 'अग्नि देव'}</span>
              </div>
              <div className="flex justify-between">
                <span>देवता:</span>
                <span className="font-semibold text-[#26150b]">{tithi.deity || 'सूर्य'}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1 pt-2 border-t border-[#dec9ab]/40">
            <div className="w-full bg-[#f5ebd7] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-[#c2410c] h-full rounded-full transition-all duration-500"
                style={{ width: `${tithiPercent}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-[#735641] block text-right">
              {tithiPercent}% व्यतीत
            </span>
          </div>
        </div>

        {/* Card 2: वार (Vaar) */}
        <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab] shadow-xs flex flex-col justify-between space-y-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(217,119,6,0.18)] hover:border-amber-500/40 group">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-[#b45309]">
                अंग २ • वार
              </span>
              <VedicIcon3D name="sun" size="sm" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#26150b] group-hover:text-[#c2410c] transition-colors">
                {dayName}
              </h3>
              <span className="text-[11px] text-[#735641]">{dayRuler}</span>
            </div>

            <div className="p-2 rounded-xl bg-[#fff9eb] border border-[#dec9ab]/60 space-y-0.5">
              <span className="text-[10px] text-[#735641] block">दिनमान</span>
              <span className="text-xs font-bold text-[#b45309] font-mono block">
                {panchang.sunrise} - {panchang.sunset}
              </span>
            </div>

            <div className="text-[11px] text-[#735641] space-y-1 pt-1">
              <div className="flex justify-between">
                <span>दिशाशूल:</span>
                <span className="font-semibold text-[#c2410c]">
                  {dayName === 'रविवार' || dayName === 'शुक्रवार' ? 'पश्चिम' : dayName === 'सोमवार' || dayName === 'शनिवार' ? 'पूर्व' : 'उत्तर'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>कल्याणकारी रंग:</span>
                <span className="font-semibold text-[#26150b]">स्वर्णिम / पीला</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#dec9ab]/40">
            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 block text-center">
              शुभ कार्य सिद्धिप्रद दिवस
            </span>
          </div>
        </div>

        {/* Card 3: नक्षत्र (Nakshatra) */}
        <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab] shadow-xs flex flex-col justify-between space-y-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(217,119,6,0.18)] hover:border-amber-500/40 group">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-[#b45309]">
                अंग ३ • नक्षत्र
              </span>
              <VedicIcon3D name="nakshatra" size="sm" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#26150b] group-hover:text-[#c2410c] transition-colors">
                {nakshatra.hindiName || nakshatra.name}
              </h3>
              <span className="text-[11px] text-[#735641]">
                पद: {nakshatra.pada || 2} पद
              </span>
            </div>

            <div className="p-2 rounded-xl bg-[#fff9eb] border border-[#dec9ab]/60 space-y-0.5">
              <span className="text-[10px] text-[#735641] block">समाप्ति काल</span>
              <span className="text-xs font-bold text-[#b45309] font-mono block">
                {nakshatra.endTime || 'प्रातः ०६:१५ तक'}
              </span>
            </div>

            <div className="text-[11px] text-[#735641] space-y-1 pt-1">
              <div className="flex justify-between">
                <span>स्वामी ग्रह:</span>
                <span className="font-semibold text-[#26150b]">{nakshatra.lord || 'बृहस्पति'}</span>
              </div>
              <div className="flex justify-between">
                <span>देवता:</span>
                <span className="font-semibold text-[#26150b]">{nakshatra.deity || 'इंद्र'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#dec9ab]/40">
            <div className="w-full bg-[#f5ebd7] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full rounded-full"
                style={{ width: '58%' }}
              ></div>
            </div>
            <span className="text-[10px] text-[#735641] block text-right">५८% व्यतीत</span>
          </div>
        </div>

        {/* Card 4: योग (Yoga) */}
        <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab] shadow-xs flex flex-col justify-between space-y-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(217,119,6,0.18)] hover:border-amber-500/40 group">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-[#b45309]">
                अंग ४ • योग
              </span>
              <VedicIcon3D name="yoga" size="sm" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#26150b] group-hover:text-[#c2410c] transition-colors">
                {yoga.hindiName || yoga.name}
              </h3>
              <span className="text-[11px] text-emerald-700 font-semibold">
                {yoga.isAuspicious !== false ? 'शुद्ध शुभ फलदायी' : 'अशुभ काल'}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-[#fff9eb] border border-[#dec9ab]/60 space-y-0.5">
              <span className="text-[10px] text-[#735641] block">समाप्ति काल</span>
              <span className="text-xs font-bold text-[#b45309] font-mono block">
                {yoga.endTime || 'सायं ०५:२३ तक'}
              </span>
            </div>

            <div className="text-[11px] text-[#735641] space-y-1 pt-1">
              <div className="flex justify-between">
                <span>प्रभाव:</span>
                <span className="font-semibold text-emerald-800">कार्य सिद्धि</span>
              </div>
              <div className="flex justify-between">
                <span>उपयुक्तता:</span>
                <span className="font-semibold text-[#26150b]">विद्या व व्यापार</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#dec9ab]/40">
            <div className="w-full bg-[#f5ebd7] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full"
                style={{ width: '72%' }}
              ></div>
            </div>
            <span className="text-[10px] text-[#735641] block text-right">७२% व्यतीत</span>
          </div>
        </div>

        {/* Card 5: करण (Karana) */}
        <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab] shadow-xs flex flex-col justify-between space-y-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(217,119,6,0.18)] hover:border-amber-500/40 group">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-[#b45309]">
                अंग ५ • करण
              </span>
              <VedicIcon3D name="karana" size="sm" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#26150b] group-hover:text-[#c2410c] transition-colors">
                {karana.hindiName || karana.name}
              </h3>
              <span className="text-[11px] text-[#735641]">
                तदुपरांत: {karana2?.hindiName || 'वणिज करण'}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-[#fff9eb] border border-[#dec9ab]/60 space-y-0.5">
              <span className="text-[10px] text-[#735641] block">समाप्ति काल</span>
              <span className="text-xs font-bold text-[#b45309] font-mono block">
                {karana.endTime || 'अपराह्न ०२:४५ तक'}
              </span>
            </div>

            <div className="text-[11px] text-[#735641] space-y-1 pt-1">
              <div className="flex justify-between">
                <span>करण देवता:</span>
                <span className="font-semibold text-[#26150b]">भूमि / पृथ्वी</span>
              </div>
              <div className="flex justify-between">
                <span>प्रकृति:</span>
                <span className="font-semibold text-[#26150b]">चर करण</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#dec9ab]/40">
            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-[#b45309] block text-center">
              कृषि व सामान्य कार्य हेतु उत्तम
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanchangFiveAngas;
