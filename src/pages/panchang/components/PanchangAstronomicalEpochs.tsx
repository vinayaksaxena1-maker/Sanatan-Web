/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangAstronomicalEpochs
 * Section: ४. खगोलीय मान, दिनमान व पंचांग प्रणालियां
 * Box 1: दिवा-निशा मान व ऋतु काल
 * Box 2: खगोलीय युग मान व अहर्गण
 * 5% - 40% - 10% - 40% - 5% Balanced Layout matching Section 1, 2, 3
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { DinaRatriMana3DIcon, KhagoliyaYuga3DIcon } from './VedicSection3DIcons';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangAstronomicalEpochs: React.FC<Props> = ({ data }) => {
  const { panchang, deepAnalysis } = data;
  const { rituDetails, hinduDate } = panchang;
  const {
    dinamanaFormatted,
    ratrimanaFormatted,
    madhyahnaTime,
    kaliyugaYear,
    kaliAhargana,
    julianDay,
    modifiedJulianDay,
    rataDie,
    nationalCivilDate,
    festivals,
  } = deepAnalysis;

  const solarRows = [
    { label: 'दिनमान (दिन की कुल अवधि)', value: dinamanaFormatted, highlight: true },
    { label: 'रात्रिमान (रात्रि की कुल अवधि)', value: ratrimanaFormatted },
    { label: 'मध्याह्न काल (सूर्य शिरोबिंदु)', value: madhyahnaTime, highlight: true },
    { label: 'दृक ऋतु', value: rituDetails?.solarRituHindi || 'शरद ऋतु' },
    { label: 'चांद्र ऋतु', value: rituDetails?.lunarRituHindi || 'शरद ऋतु' },
    { label: 'अयन', value: hinduDate?.ayana === 'Dakshinayana' ? 'दक्षिणायन' : 'उत्तरायण' },
    {
      label: 'प्रविष्टे / गते',
      value: `${deepAnalysis.pravishte.formatted} (${deepAnalysis.pravishte.solarMonth})`,
    },
  ];

  const epochRows = [
    { label: 'कलि संवत्', value: `${kaliyugaYear} वर्ष`, highlight: true },
    { label: 'कलि अहर्गण', value: `${kaliAhargana} दिन`, highlight: true },
    { label: 'जूलियन डे (JD)', value: String(julianDay) },
    { label: 'संशोधित जूलियन डे (MJD)', value: String(modifiedJulianDay) },
    { label: 'राटा डाई (Rata Die)', value: String(rataDie) },
    { label: 'राष्ट्रीय सिविल दिनांक', value: nationalCivilDate },
    { label: 'युग गणना इपोक', value: '३१०२ ई.पू. (प्रारंभ)' },
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
          <DinaRatriMana3DIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>४. खगोलीय मान, दिनमान व पंचांग प्रणालियां</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          दिनमान, रात्रिमान, कलि संवत्, अहर्गण, जूलियन डे, प्रविष्टे एवं सौर चक्र
        </p>
      </div>

      {/* 2. 5% Outer Gap - 40% दिवा-निशा Box - 10% Inner Gap - 40% खगोलीय मान Box - 5% Outer Gap */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
        {/* Box 1: दिवा-निशा मान व ऋतु काल (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fffdf9] via-[#fefaf3] to-[#fbf2e3] border border-amber-300/70 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-amber-300/60 pb-2">
            <h3 className="text-base font-bold text-[#451a03] flex items-center gap-2">
              <DinaRatriMana3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>दिवा-निशा मान व ऋतु काल</span>
            </h3>
            <span className="text-[11px] text-[#b45309] font-semibold">
              ☀️ सौर क्रांति चक्र
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {solarRows.map((item, idx) => (
              <div
                key={idx}
                className="py-1 flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <span className="text-[#5c4033] font-medium">{item.label}</span>
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

        {/* Box 2: खगोलीय युग मान व अहर्गण (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fcfcff] via-[#f7f8fd] to-[#eef2ff] border border-indigo-200/80 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-indigo-200/70 pb-2">
            <h3 className="text-base font-bold text-[#1e1b4b] flex items-center gap-2">
              <KhagoliyaYuga3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>खगोलीय युग मान व अहर्गण</span>
            </h3>
            <span className="text-[11px] text-indigo-700 font-semibold">
              🪐 ३१०२ ई.पू. युग
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {epochRows.map((item, idx) => (
              <div
                key={idx}
                className="py-1 flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <span className="text-[#5c4033] font-medium">{item.label}</span>
                <span
                  className={`font-bold font-mono text-right shrink-0 ${
                    item.highlight ? 'text-[#4338ca]' : 'text-[#26150b]'
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Day Festivals & Vrats (if any) */}
      {festivals && festivals.length > 0 && (
        <div className="w-[90%] mx-auto rounded-xl p-3 sm:p-4 bg-gradient-to-r from-amber-50/80 via-orange-50/60 to-amber-50/80 border border-amber-300/60 mt-3 relative z-10">
          <div className="flex items-center gap-2 border-b border-amber-300/50 pb-2 mb-2">
            <span className="text-base">🚩</span>
            <h3 className="text-sm sm:text-base font-bold text-[#451a03]">
              आज के व्रत, पर्व एवं उत्सव
            </h3>
          </div>
          <div className="divide-y divide-[#dec9ab]/30">
            {festivals.map((fest) => (
              <div
                key={fest.id}
                className="py-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
              >
                <div>
                  <h4 className="font-bold text-sm text-[#451a03]">{fest.hindiName}</h4>
                  <p className="text-[#735641] mt-0.5">{fest.description}</p>
                </div>
                <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded shrink-0 self-start sm:self-center">
                  {fest.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default PanchangAstronomicalEpochs;
