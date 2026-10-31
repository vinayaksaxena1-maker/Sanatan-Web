/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangRitualShuddhi
 * Section: ७. निवास, चक्र एवं अनुष्ठान विचार
 * Box 1: अनुष्ठान एवं शुद्धि विचार
 * Box 2: दिशा वास एवं चक्र विचार
 * 5% - 40% - 10% - 40% - 5% Balanced Layout matching Section 1, 2, 3
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { RitualShuddhi3DIcon, DishaChakra3DIcon } from './VedicSection3DIcons';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangRitualShuddhi: React.FC<Props> = ({ data }) => {
  const { panchang, deepAnalysis, selectedDate } = data;
  const { shivaVaas, agniVaas, bhadra } = panchang;
  const { chandraVasa, rahuVasa, kumbhaChakra, netrama, jeevanama, homahuti, bhadraMicroBreakup } = deepAnalysis;

  const day = selectedDate.getDay();
  const dishaShoolMap = [
    { dir: 'पश्चिम', parihar: 'घी या पान खाकर प्रस्थान करें।' },
    { dir: 'पूर्व', parihar: 'दर्पण देखकर या तिल खाकर प्रस्थान करें।' },
    { dir: 'उत्तर', parihar: 'गुड़ खाकर प्रस्थान करें।' },
    { dir: 'उत्तर', parihar: 'तिल या धनिया खाकर प्रस्थान करें।' },
    { dir: 'दक्षिण', parihar: 'दही खाकर प्रस्थान करें।' },
    { dir: 'पश्चिम', parihar: 'जौ खाकर प्रस्थान करें।' },
    { dir: 'पूर्व', parihar: 'अदरक या उड़द खाकर प्रस्थान करें।' },
  ];
  const dishaShool = dishaShoolMap[day] || dishaShoolMap[0];

  const ritualRows = [
    {
      label: 'रुद्राभिषेक विचार (शिववास)',
      value: `${shivaVaas?.residenceHindi || 'कैलाश पर'} (${shivaVaas?.isAuspicious ? 'शुभ फलदायी' : 'सावधानी'})`,
      highlight: shivaVaas?.isAuspicious,
    },
    {
      label: 'हवन / यज्ञ विचार (अग्निवास)',
      value: `${agniVaas?.residenceHindi || 'पृथ्वी पर'} (${agniVaas?.isAuspicious ? 'हवन शुभ' : 'हवन वर्जित'})`,
      highlight: agniVaas?.isAuspicious,
    },
    {
      label: 'भद्रा (विष्टि) स्थिति',
      value: bhadra?.active || bhadraMicroBreakup.active ? '⚠ भद्रा सक्रिय' : '✓ भद्रा रहित (निर्दोष)',
      highlight: !(bhadra?.active || bhadraMicroBreakup.active),
    },
    {
      label: 'भद्रा निवास लोक',
      value: bhadraMicroBreakup.vasHindi,
    },
    {
      label: 'भद्रा मुख काल (वर्जित)',
      value: `${bhadraMicroBreakup.mukhaWindow.start} – ${bhadraMicroBreakup.mukhaWindow.end}`,
    },
    {
      label: 'भद्रा पुच्छ काल (सिद्धिप्रद)',
      value: `${bhadraMicroBreakup.puchhaWindow.start} – ${bhadraMicroBreakup.puchhaWindow.end}`,
      highlight: true,
    },
  ];

  const dishaRows = [
    {
      label: 'चन्द्र वास (शुभ सम्मुख)',
      value: `${chandraVasa.directionHindi} दिशा`,
      highlight: true,
    },
    {
      label: 'राहु वास (सम्मुख त्याज्य)',
      value: `${rahuVasa.directionHindi} दिशा`,
    },
    {
      label: 'दिशा शूल',
      value: `${dishaShool.dir} दिशा (यात्रा वर्जित)`,
    },
    {
      label: 'दिशाशूल परिहार',
      value: dishaShool.parihar,
    },
    {
      label: 'होमाहुति अधिष्ठाता',
      value: `${homahuti.planetHindi} देव`,
    },
    {
      label: 'कुम्भ चक्र स्थिति',
      value: kumbhaChakra,
    },
    {
      label: 'नेत्र व जीवन विचार',
      value: `${netrama} • ${jeevanama}`,
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
          <RitualShuddhi3DIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>७. निवास, चक्र एवं अनुष्ठान विचार</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          रुद्राभिषेक, हवन, भद्रा शुद्धि, दिशा शूल एवं दिशा वास का शास्त्रीय निर्णय
        </p>
      </div>

      {/* 2. 5% Outer Gap - 40% अनुष्ठान Box - 10% Inner Gap - 40% दिशा वास Box - 5% Outer Gap */}
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
        {/* Box 1: अनुष्ठान एवं शुद्धि विचार (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fffdf9] via-[#fefaf3] to-[#fbf2e3] border border-amber-300/70 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-amber-300/60 pb-2">
            <h3 className="text-base font-bold text-[#451a03] flex items-center gap-2">
              <RitualShuddhi3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>अनुष्ठान एवं शुद्धि विचार</span>
            </h3>
            <span className="text-[11px] text-[#b45309] font-semibold">
              🔱 शिव-अग्नि वास
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {ritualRows.map((item, idx) => (
              <div
                key={idx}
                className="py-1 flex items-center justify-between gap-2 text-xs sm:text-sm"
              >
                <span className="text-[#5c4033] font-medium shrink-0">{item.label}</span>
                <span
                  className={`font-bold font-mono text-right leading-tight max-w-[65%] ${
                    item.highlight ? 'text-[#c2410c]' : 'text-[#26150b]'
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Box 2: दिशा वास एवं चक्र विचार (40%) */}
        <div className="w-full md:w-[44.44%] rounded-xl p-4 sm:p-5 bg-gradient-to-br from-[#fcfcff] via-[#f7f8fd] to-[#eef2ff] border border-indigo-200/80 shadow-xs space-y-3 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37]">
          <div className="flex items-center justify-between border-b border-indigo-200/70 pb-2">
            <h3 className="text-base font-bold text-[#1e1b4b] flex items-center gap-2">
              <DishaChakra3DIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span>दिशा वास एवं चक्र विचार</span>
            </h3>
            <span className="text-[11px] text-indigo-700 font-semibold">
              🧭 आकाशीय चक्र
            </span>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {dishaRows.map((item, idx) => (
              <div
                key={idx}
                className="py-1 flex items-center justify-between gap-2 text-xs sm:text-sm"
              >
                <span className="text-[#5c4033] font-medium shrink-0">{item.label}</span>
                <span
                  className={`font-bold font-mono text-right leading-tight max-w-[65%] ${
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

export default PanchangRitualShuddhi;
