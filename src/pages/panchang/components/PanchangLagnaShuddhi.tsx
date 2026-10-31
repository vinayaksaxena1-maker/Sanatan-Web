/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangLagnaShuddhi
 * Section: ८. मुहूर्त व लग्न शुद्धि (Lagna & Muhurta Depth)
 * Box-free, pure typographic layout with clear Normal Headings
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangLagnaShuddhi: React.FC<Props> = ({ data }) => {
  const { deepAnalysis } = data;
  const { udayaLagnas, chandrabalamList, tarabalamSummary } = deepAnalysis;

  return (
    <section className="font-serif py-4 border-b border-[#dec9ab]/70 space-y-6">
      {/* 1. Main Section Heading (No Box) */}
      <div className="border-b border-[#dec9ab]/50 pb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b]">
          ८. मुहूर्त व लग्न शुद्धि
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          १२ उदय लग्न, पंचक रहित मुहूर्त, चन्द्रबल एवं ताराबल परीक्षण
        </p>
      </div>

      {/* 2. Sub-Section A: १२ उदय लग्न तालिका एवं पंचक शुद्धि */}
      <div className="space-y-3">
        <div className="border-b border-[#dec9ab]/40 pb-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h3 className="text-lg sm:text-xl font-bold text-[#26150b]">
            उदय लग्न तालिका एवं पंचक रहित शुद्धि
          </h3>
          <span className="text-xs text-[#735641]">
            सूत्र: (तिथि + वार + नक्षत्र + लग्न) % ९ | हरित: निष्पंचक (शुभ), अन्य: दोष पंचक
          </span>
        </div>

        <div className="divide-y divide-[#dec9ab]/30">
          {udayaLagnas.map((lagna, idx) => (
            <div
              key={idx}
              className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs"
            >
              <div>
                <span className="font-bold text-[#26150b] text-sm">
                  {idx + 1}. {lagna.rashiHindi} लग्न
                </span>
                <span className="text-[#735641] ml-2">
                  अवधि: <strong className="font-mono text-[#c2410c]">{lagna.startTime} – {lagna.endTime}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#735641]">{lagna.panchakaDesc}</span>
                <span
                  className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                    lagna.isPanchakaShubh
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {lagna.panchakaType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Sub-Section B: चन्द्रबल (Chandrabalam for 12 Rashis) */}
      <div className="space-y-2 pt-2">
        <div className="border-b border-[#dec9ab]/40 pb-1.5">
          <h3 className="text-lg font-bold text-[#26150b]">
            चन्द्रबल विचार (१२ राशियां)
          </h3>
          <p className="text-xs text-[#735641] mt-0.5">
            गोचर चन्द्रमा के आधार पर १२ राशियों की अनुकूलता (४, ८, १२वें चन्द्रमा में कार्य वर्जित):
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 text-xs py-1">
          {chandrabalamList.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-[#dec9ab]/25">
              <span className="font-bold text-[#26150b]">{item.rashi} राशि</span>
              <span className={`font-semibold ${item.isShubh ? 'text-emerald-800' : 'text-rose-800'}`}>
                {item.isShubh ? '✓ ' : '✗ '} {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Sub-Section C: ताराबल (Tarabalam for 27 Nakshatras) */}
      <div className="space-y-2 pt-2">
        <div className="border-b border-[#dec9ab]/40 pb-1.5">
          <h3 className="text-lg font-bold text-[#26150b]">
            ताराबल विचार (२७ नक्षत्र)
          </h3>
          <p className="text-xs text-[#735641] mt-0.5">
            दैनिक नक्षत्र के अनुसार जन्म नक्षत्रों के ९ भेद:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs py-1">
          <div>
            <span className="font-bold text-emerald-900 block mb-1">
              ✓ शुभ ताराबल:
            </span>
            <p className="text-[#735641] leading-relaxed">
              {tarabalamSummary.shubhTaras.join(', ')} — इन नक्षत्रों में जन्मे जातकों के लिए आज का दिन कार्यसिद्धि व लाभप्रद है।
            </p>
          </div>

          <div>
            <span className="font-bold text-amber-900 block mb-1">
              ⚠ सावधानी ताराबल:
            </span>
            <p className="text-[#735641] leading-relaxed">
              {tarabalamSummary.ashubhTaras.join(', ')} — विपत्, प्रत्यरि व वध तारा में जोखिम व विवाद से बचें।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanchangLagnaShuddhi;
