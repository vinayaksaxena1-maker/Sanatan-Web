/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangShubhAshubh
 * Section: ५. शुभ मुहूर्त एवं अशुभ काल
 * Box 1: शुभ मुहूर्त एवं अमृत वेला
 * Box 2: अशुभ काल एवं राहुकाल
 * 5% - 40% - 10% - 40% - 5% Balanced Layout matching Section 1, 2, 3
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { ShubhMuhurta3DIcon, AshubhKaal3DIcon } from './VedicSection3DIcons';

export interface PanchangShubhAshubhProps {
  data: UsePanchangDataResult;
}

export const PanchangShubhAshubh: React.FC<PanchangShubhAshubhProps> = ({ data }) => {
  const { panchang, deepAnalysis, dayName } = data;
  const { varjyam } = panchang;
  const { nishitaMuhurta, sayahnaSandhya } = deepAnalysis;

  const rahuStart = panchang.rahuKaal?.start || '०९:१८ AM';
  const rahuEnd = panchang.rahuKaal?.end || '१०:४१ AM';
  const gulikStart = panchang.gulikKaal?.start || '०६:३२ AM';
  const gulikEnd = panchang.gulikKaal?.end || '०७:५५ AM';
  const yamaStart = panchang.yamagandam?.start || '०१:२८ PM';
  const yamaEnd = panchang.yamagandam?.end || '०२:५१ PM';
  const durmuhuratStart = panchang.durmuhurat?.[0]?.start || '०६:३२ AM';
  const durmuhuratEnd = panchang.durmuhurat?.[0]?.end || '०७:१६ AM';

  // Determine Disha Shool based on day of week
  const getDishaShool = () => {
    switch (dayName) {
      case 'रविवार':
      case 'शुक्रवार':
        return { dir: 'पश्चिम', remedy: 'घी या पान खाकर यात्रा करें।' };
      case 'सोमवार':
      case 'शनिवार':
        return { dir: 'पूर्व', remedy: 'दर्पण देखकर या तिल खाकर प्रस्थान करें।' };
      case 'मंगलवार':
      case 'बुधवार':
        return { dir: 'उत्तर', remedy: 'गुड़ या धनिया खाकर निकलें।' };
      case 'गुरुवार':
        return { dir: 'दक्षिण', remedy: 'दही या जीरा खाकर यात्रा करें।' };
      default:
        return { dir: 'पश्चिम', remedy: 'दही खाकर यात्रा करें।' };
    }
  };

  const disha = getDishaShool();

  const shubhRows = [
    { label: 'अभिजीत मुहूर्त', value: '११:४२ AM - १२:२७ PM', highlight: true },
    { label: 'ब्रह्म मुहूर्त', value: '०४:४९ AM - ०५:४१ AM', highlight: true },
    { label: 'अमृत काल', value: '०३:२४ AM - ०४:५४ AM' },
    { label: 'विजय मुहूर्त', value: '०१:५५ PM - ०२:४० PM' },
    { label: 'गोधूलि मुहूर्त', value: '०५:३७ PM - ०६:०३ PM' },
    {
      label: 'सायं सन्ध्या',
      value: `${sayahnaSandhya?.start || '०५:३७ PM'} - ${sayahnaSandhya?.end || '०६:५३ PM'}`,
    },
    {
      label: 'निशीथ काल (मध्यरात्रि)',
      value: `${nishitaMuhurta?.start || '११:३८ PM'} - ${nishitaMuhurta?.end || '१२:३० AM'}`,
    },
  ];

  const ashubhRows = [
    { label: 'राहुकाल (अति त्याज्य)', value: `${rahuStart} - ${rahuEnd}`, highlight: true, danger: true },
    { label: 'यमगण्ड काल', value: `${yamaStart} - ${yamaEnd}` },
    { label: 'गुलिक काल', value: `${gulikStart} - ${gulikEnd}` },
    { label: 'दुर्मुहूर्त', value: `${durmuhuratStart} - ${durmuhuratEnd}` },
    {
      label: 'वर्ज्यम् काल',
      value: varjyam && varjyam.length > 0 ? `${varjyam[0].start} - ${varjyam[0].end}` : 'निर्दोष (कोई नहीं)',
    },
    { label: 'दिशाशूल विचार', value: `${disha.dir} दिशा (वर्जित)`, danger: true },
    { label: 'दिशाशूल परिहार', value: disha.remedy },
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
          <ShubhMuhurta3DIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>५. शुभ मुहूर्त एवं अशुभ काल</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          अभिजित, ब्रह्म मुहूर्त एवं राहुकाल, यमगण्ड, गुलिक काल का दैनिक समय विभाजन
        </p>
      </div>

      {/* 2. 5% Outer Gap - 40% शुभ Box - 10% Inner Gap - 40% अशुभ Box - 5% Outer Gap */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
        {/* Box 1: शुभ मुहूर्त एवं अमृत वेला (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#f0fdf4] via-[#f7fee7] to-[#ecfdf5] border border-emerald-300/80 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-emerald-300/60 pb-2">
            <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
              <ShubhMuhurta3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>शुभ मुहूर्त एवं अमृत वेला</span>
            </h3>
            <span className="text-[11px] text-emerald-800 font-semibold">
              ✓ सर्वकार्य सिद्धि काल
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {shubhRows.map((item, idx) => (
              <div
                key={idx}
                className="py-1 flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <span className="text-[#3b4b3e] font-medium">{item.label}</span>
                <span
                  className={`font-bold font-mono text-right shrink-0 ${
                    item.highlight ? 'text-emerald-700' : 'text-[#26150b]'
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Box 2: अशुभ काल एवं राहुकाल (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fff1f2] via-[#fff5f5] to-[#fef2f2] border border-rose-300/80 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-rose-300/70 pb-2">
            <h3 className="text-base font-bold text-rose-950 flex items-center gap-2">
              <AshubhKaal3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>अशुभ काल एवं राहुकाल</span>
            </h3>
            <span className="text-[11px] text-rose-800 font-semibold">
              ⚠ शुभ कार्य वर्जित काल
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {ashubhRows.map((item, idx) => (
              <div
                key={idx}
                className="py-1 flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <span className="text-[#5c4033] font-medium">{item.label}</span>
                <span
                  className={`font-bold font-mono text-right shrink-0 ${
                    item.danger ? 'text-rose-700 font-extrabold' : 'text-[#26150b]'
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

export default PanchangShubhAshubh;
