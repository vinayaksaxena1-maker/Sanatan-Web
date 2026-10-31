/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangExtendedYogas
 * Section: ६. अतिरिक्त योग व सूक्ष्म काल
 * Box 1: आनन्दादि व महाशुभ योग
 * Box 2: सूक्ष्म काल व शुद्धि विचार
 * 5% - 40% - 10% - 40% - 5% Balanced Layout matching Section 1, 2, 3
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { AnandadiYoga3DIcon, SukshmaKala3DIcon } from './VedicSection3DIcons';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangExtendedYogas: React.FC<Props> = ({ data }) => {
  const { panchang, deepAnalysis } = data;
  const { anandadiYoga, shubhYogas, pushkarYog, varjyam, gandMool, dagdaTithi } = panchang;
  const { nishitaMuhurta, pratahSandhya, sayahnaSandhya, aadalVidaalList } = deepAnalysis;

  const yogaRows = [
    {
      label: 'आनन्दादि २८ महायोग',
      value: anandadiYoga?.nameHindi ? `${anandadiYoga.nameHindi} (${anandadiYoga.isAuspicious ? 'शुभ' : 'मध्यम'})` : 'आनन्द योग',
      highlight: anandadiYoga?.isAuspicious,
    },
    {
      label: 'सिद्धि व रवि योग',
      value: shubhYogas && shubhYogas.length > 0 ? shubhYogas.map((sy) => sy.hindiName).join(', ') : 'सक्रिय नहीं',
      highlight: Boolean(shubhYogas && shubhYogas.length > 0),
    },
    {
      label: 'आडल व विडाल योग',
      value: aadalVidaalList && aadalVidaalList.length > 0 ? aadalVidaalList[0].name : 'निर्दोष (सामान्य)',
    },
    {
      label: 'पुष्कर योग विचार',
      value: pushkarYog?.active ? pushkarYog.hindiName : 'सक्रिय नहीं',
    },
    {
      label: 'आनन्दादि योग प्रभाव',
      value: anandadiYoga?.isAuspicious ? 'सर्वकार्य सिद्धिप्रद' : 'सामान्य फलदायी',
      highlight: anandadiYoga?.isAuspicious,
    },
    {
      label: 'महाशुभ योग स्थिति',
      value: shubhYogas && shubhYogas.length > 0 ? 'शुभ कार्य प्रशस्त' : 'दैनिक नित्य कार्य',
    },
  ];

  const microTimeRows = [
    {
      label: 'प्रातः सन्ध्या काल',
      value: `${pratahSandhya.start} – ${pratahSandhya.end}`,
      highlight: true,
    },
    {
      label: 'सायं सन्ध्या काल',
      value: `${sayahnaSandhya.start} – ${sayahnaSandhya.end}`,
      highlight: true,
    },
    {
      label: 'निशीथ मुहूर्त (महानिशा)',
      value: `${nishitaMuhurta.start} – ${nishitaMuhurta.end}`,
    },
    {
      label: 'वर्ज्यम् काल (त्याज्य समय)',
      value: varjyam && varjyam.length > 0 ? `${varjyam[0].start} – ${varjyam[0].end}` : 'निर्दोष (कोई नहीं)',
    },
    {
      label: 'गंडमूल नक्षत्र विचार',
      value: gandMool?.isGandMool ? `गंडमूल: ${gandMool.nakshatraHindiName}` : 'दोष रहित',
    },
    {
      label: 'दग्ध तिथि विचार',
      value: dagdaTithi?.isDagda ? 'दग्ध तिथि (सावधानी)' : 'निर्दोष तिथि',
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
          <AnandadiYoga3DIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>६. अतिरिक्त योग व सूक्ष्म काल</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          आनन्दादि २८ महायोग, आडल-विडाल, सिद्धि व रवि योग, निशीथ एवं सन्ध्या काल
        </p>
      </div>

      {/* 2. 5% Outer Gap - 40% महायोग Box - 10% Inner Gap - 40% सूक्ष्म काल Box - 5% Outer Gap */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
        {/* Box 1: आनन्दादि व महाशुभ योग (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fffdf9] via-[#fefaf3] to-[#fbf2e3] border border-amber-300/70 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-amber-300/60 pb-2">
            <h3 className="text-base font-bold text-[#451a03] flex items-center gap-2">
              <AnandadiYoga3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>आनन्दादि व महाशुभ योग</span>
            </h3>
            <span className="text-[11px] text-[#b45309] font-semibold">
              ✨ सिद्धिप्रद महायोग
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {yogaRows.map((item, idx) => (
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

        {/* Box 2: सूक्ष्म काल व शुद्धि विचार (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fcfcff] via-[#f7f8fd] to-[#eef2ff] border border-indigo-200/80 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-indigo-200/70 pb-2">
            <h3 className="text-base font-bold text-[#1e1b4b] flex items-center gap-2">
              <SukshmaKala3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>सूक्ष्म काल व शुद्धि विचार</span>
            </h3>
            <span className="text-[11px] text-indigo-700 font-semibold">
              🛡️ दैनिक शुद्धि चक्र
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {microTimeRows.map((item, idx) => (
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
    </section>
  );
};

export default PanchangExtendedYogas;
