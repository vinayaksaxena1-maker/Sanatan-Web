/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangExtendedYogas.tsx
 * Section: अतिरिक्त योग व सूक्ष्म काल
 * आनन्दादि २८ योग, रवि/सर्वार्थ/अमृत सिद्धि, पुष्कर योग, निशीथ, सन्ध्या काल, वर्ज्यम्, गंडमूल
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangExtendedYogas: React.FC<Props> = ({ data }) => {
  const { panchang, deepAnalysis } = data;
  const { anandadiYoga, shubhYogas, pushkarYog, varjyam, gandMool, dagdaTithi } = panchang;
  const { nishitaMuhurta, pratahSandhya, sayahnaSandhya } = deepAnalysis;

  return (
    <section className="bg-gradient-to-br from-[#fffdf8] via-[#fbf7ee] to-[#f7f0e1] rounded-3xl p-6 sm:p-8 border border-[#d97706]/25 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#d97706]/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f59e0b] to-[#ea580c] text-white flex items-center justify-center font-bold text-xl shadow-md">
            ✨
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#451a03] font-serif tracking-wide">
              अतिरिक्त योग व सूक्ष्म काल (Special Yogas & Micro-Timings)
            </h2>
            <p className="text-xs sm:text-sm text-[#78350f]/80">
              आनन्दादि महायोग, रवि/सर्वार्थ सिद्धि, पुष्कर योग, निशीथ काल एवं वर्ज्यम्
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-semibold bg-[#f59e0b]/15 text-[#9a3412] border border-[#f59e0b]/30">
          शुभ-अशुभ योग विचार
        </span>
      </div>

      {/* Grid of Special Yogas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Anandadi 28 Yoga */}
        <div className={`p-4 rounded-2xl border ${
          anandadiYoga?.isAuspicious
            ? 'bg-emerald-50/70 border-emerald-500/25'
            : 'bg-amber-50/70 border-amber-500/25'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9a3412]">
              आनन्दादि २८ महायोग
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              anandadiYoga?.isAuspicious ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
            }`}>
              {anandadiYoga?.isAuspicious ? '✓ शुभ योग' : '⚠ सामान्य / मध्यम'}
            </span>
          </div>
          <h3 className="font-bold font-serif text-base text-[#451a03]">
            {anandadiYoga?.nameHindi || 'आनन्द योग'} ({anandadiYoga?.name || 'Ananda'})
          </h3>
          <p className="text-xs text-[#78350f]/80 mt-1">
            {anandadiYoga?.description || 'आनन्दादि चक्र का विशिष्ट योग जो दिन के कार्यों में सफलता या बाधा दर्शाता है।'}
          </p>
          {anandadiYoga?.endTime && (
            <span className="text-[11px] font-mono font-medium text-[#b45309] block mt-2">
              समाप्ति: {anandadiYoga.endTime}
            </span>
          )}
        </div>

        {/* 2. Special Siddhi & Ravi Yogas */}
        <div className="p-4 rounded-2xl border bg-white/80 border-[#d97706]/20">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9a3412] block mb-1.5">
            सिद्धि व रवि योग
          </span>
          {shubhYogas && shubhYogas.length > 0 ? (
            <div className="space-y-2">
              {shubhYogas.map((sy, i) => (
                <div key={i} className="flex items-center justify-between bg-emerald-50/80 p-2 rounded-lg border border-emerald-500/20">
                  <span className="text-xs font-bold text-emerald-950 font-serif">
                    ✓ {sy.hindiName}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-800">
                    {sy.start} – {sy.end}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#78350f]/80 mt-1">
              आज कोई विशेष सर्वार्थ सिद्धि अथवा अमृत सिद्धि योग सक्रिय नहीं है। सामान्य शुभ मुहूर्तों का अनुसरण करें।
            </p>
          )}
        </div>

        {/* 3. Pushkar Yoga */}
        <div className={`p-4 rounded-2xl border ${
          pushkarYog?.active
            ? 'bg-purple-50/70 border-purple-500/30 text-purple-950'
            : 'bg-white/80 border-[#d97706]/20'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9a3412]">
              पुष्कर योग विचार
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              pushkarYog?.active ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {pushkarYog?.active ? pushkarYog.hindiName : 'सक्रिय नहीं'}
            </span>
          </div>
          <h3 className="font-bold font-serif text-base text-[#451a03]">
            {pushkarYog?.active ? pushkarYog.hindiName : 'द्विपुष्कर / त्रिपुष्कर योग'}
          </h3>
          <p className="text-xs text-[#78350f]/80 mt-1">
            {pushkarYog?.description || 'पुष्कर योग में किए गए शुभ कार्य २ या ३ गुना फल प्रदान करते हैं, ऋण लेन-देन वर्जित है।'}
          </p>
        </div>
      </div>

      {/* Subtle Kaal Matrix: Nishita, Sandhya, Varjyam, Gand Mool */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Nishita Kaal */}
        <div className="bg-white/85 p-3.5 rounded-xl border border-[#d97706]/20">
          <div className="flex items-center justify-between text-xs text-[#9a3412] font-bold">
            <span>निशीथ मुहूर्त (मध्यरात्रि)</span>
            <span>🌙</span>
          </div>
          <span className="text-sm font-bold font-mono text-[#451a03] block mt-1">
            {nishitaMuhurta.start} – {nishitaMuhurta.end}
          </span>
          <span className="text-[11px] text-[#78350f]/75 block mt-0.5">
            तांत्रिक साधना, महालक्ष्मी व कालरात्रि पूजा काल
          </span>
        </div>

        {/* Sandhya Kaal */}
        <div className="bg-white/85 p-3.5 rounded-xl border border-[#d97706]/20">
          <div className="flex items-center justify-between text-xs text-[#9a3412] font-bold">
            <span>सन्ध्या काल (उभय)</span>
            <span>🌅</span>
          </div>
          <span className="text-xs font-mono text-[#451a03] block mt-1">
            प्रातः: {pratahSandhya.start} – {pratahSandhya.end}
          </span>
          <span className="text-xs font-mono text-[#451a03] block mt-0.5">
            सायं: {sayahnaSandhya.start} – {sayahnaSandhya.end}
          </span>
        </div>

        {/* Varjyam */}
        <div className="bg-white/85 p-3.5 rounded-xl border border-[#d97706]/20">
          <div className="flex items-center justify-between text-xs text-[#9a3412] font-bold">
            <span>वर्ज्यम् (त्याज्य काल)</span>
            <span>⛔</span>
          </div>
          {varjyam && varjyam.length > 0 ? (
            <span className="text-sm font-bold font-mono text-rose-700 block mt-1">
              {varjyam[0].start} – {varjyam[0].end}
            </span>
          ) : (
            <span className="text-sm font-bold text-emerald-700 block mt-1">कोई वर्ज्यम् नहीं</span>
          )}
          <span className="text-[11px] text-[#78350f]/75 block mt-0.5">
            नक्षत्र का विष घटी काल, नवीन कार्य न करें
          </span>
        </div>

        {/* Gand Mool & Dagda Tithi */}
        <div className="bg-white/85 p-3.5 rounded-xl border border-[#d97706]/20">
          <div className="flex items-center justify-between text-xs text-[#9a3412] font-bold">
            <span>गंडमूल व दग्ध विचार</span>
            <span>🌿</span>
          </div>
          <span className="text-xs font-bold text-[#451a03] block mt-1">
            {gandMool?.isGandMool ? `गंडमूल: ${gandMool.nakshatraHindiName}` : '✓ गंडमूल दोष नहीं'}
          </span>
          <span className="text-[11px] text-[#78350f]/75 block mt-0.5">
            {dagdaTithi?.isDagda ? '⚠ आज दग्ध तिथि है' : '✓ तिथि निर्दोष है'}
          </span>
        </div>
      </div>
    </section>
  );
};
