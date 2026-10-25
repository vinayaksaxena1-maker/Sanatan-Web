/**
 * Sanatan Web (सनातन घड़ी)
 * Component: ChoghadiyaLegend
 * 7 Types of Choghadiya Reference Guide (४ शुभ एवं ३ त्याज्य चौघड़िया)
 * Strict < 300 lines modular standard
 */

import React from 'react';

const LEGEND_ITEMS = [
  {
    name: 'अमृत',
    nature: 'अति शुभ',
    lord: 'चंद्र देव',
    desc: 'सर्वकार्य सिद्धि, शांति, प्रतिष्ठा',
    colorBg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    badgeBg: 'bg-emerald-200 text-emerald-900',
  },
  {
    name: 'शुभ',
    nature: 'उत्तम',
    lord: 'देवगुरु बृहस्पति',
    desc: 'धर्म, विद्या, विवाह, गृहप्रवेश',
    colorBg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    badgeBg: 'bg-emerald-200 text-emerald-900',
  },
  {
    name: 'लाभ',
    nature: 'उन्नति',
    lord: 'बुध देव',
    desc: 'व्यापार, धन लाभ, नया निवेश',
    colorBg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    badgeBg: 'bg-emerald-200 text-emerald-900',
  },
  {
    name: 'चर',
    nature: 'मध्यम',
    lord: 'शुक्र देव',
    desc: 'यात्रा, वाहन, संचार, गतिशीलता',
    colorBg: 'bg-amber-50 border-amber-300 text-amber-950',
    badgeBg: 'bg-amber-200 text-amber-900',
  },
  {
    name: 'रोग',
    nature: 'हानि',
    lord: 'मंगल देव',
    desc: 'वाद-विवाद, कलह, शल्यकर्म',
    colorBg: 'bg-rose-50 border-rose-300 text-rose-950',
    badgeBg: 'bg-rose-200 text-rose-900',
  },
  {
    name: 'काल',
    nature: 'विनाशक',
    lord: 'शनि देव',
    desc: 'विघ्न, संकट, हानि की संभावना',
    colorBg: 'bg-rose-50 border-rose-300 text-rose-950',
    badgeBg: 'bg-rose-200 text-rose-900',
  },
  {
    name: 'उद्वेग',
    nature: 'अशांति',
    lord: 'सूर्य देव',
    desc: 'भय, मानसिक चिंता, विवाद',
    colorBg: 'bg-rose-50 border-rose-300 text-rose-950',
    badgeBg: 'bg-rose-200 text-rose-900',
  },
];

export const ChoghadiyaLegend: React.FC = () => {
  return (
    <section className="rounded-2xl p-5 sm:p-6 bg-white/80 backdrop-blur-xl border border-[#dec9ab]/70 shadow-xs font-serif space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/60 pb-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#26150b] flex items-center gap-2">
            <span>📖</span>
            <span>चौघड़िया फल निर्देशिका (७ मूल भेद)</span>
          </h3>
          <p className="text-xs text-[#735641]">
            वैदिक काल गणना में चार शुभ (ग्राह्य) एवं तीन अशुभ (त्याज्य) चौघड़िया होते हैं।
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            ✅ शुभ (ग्राह्य): ४
          </span>
          <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
            ❌ अशुभ (त्याज्य): ३
          </span>
        </div>
      </div>

      {/* 7 Badges Bento Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {LEGEND_ITEMS.map((item) => (
          <div
            key={item.name}
            className={`p-3 rounded-xl border shadow-2xs space-y-1 ${item.colorBg}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-bold">{item.name}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.badgeBg}`}>
                {item.nature}
              </span>
            </div>
            <span className="text-[10px] opacity-75 block font-semibold">
              स्वामी: {item.lord}
            </span>
            <p className="text-[11px] leading-tight opacity-90 truncate" title={item.desc}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChoghadiyaLegend;
