/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangSamvatsaraMandala.tsx
 * Section: संवत्सर व मन्त्री मण्डल (Samvatsara System)
 * ६० बृहस्पति संवत्सर, वर्ष का राजा/मन्त्री/सेनाधिपति मन्त्री मण्डल
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangSamvatsaraMandala: React.FC<Props> = ({ data }) => {
  const { panchang, deepAnalysis } = data;
  const { samvatVikram, samvatShaka } = panchang.hinduDate || {};
  const { brihaspatiSamvatsara, mantriMandala } = deepAnalysis;

  return (
    <section className="bg-gradient-to-br from-[#fffdf7] via-[#faf5e8] to-[#f5eed6] rounded-3xl p-6 sm:p-8 border border-[#d97706]/25 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#d97706]/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#b45309] to-[#78350f] text-white flex items-center justify-center font-bold text-xl shadow-md">
            👑
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#451a03] font-serif tracking-wide">
              संवत्सर व मन्त्री मण्डल (Samvatsara & Governance Mandala)
            </h2>
            <p className="text-xs sm:text-sm text-[#78350f]/80">
              ६० बृहस्पति संवत्सर चक्र एवं विक्रम संवत् का आकाशीय मन्त्री मण्डल
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-semibold bg-[#b45309]/15 text-[#78350f] border border-[#b45309]/30">
          वार्षिक खगोलीय परिषद
        </span>
      </div>

      {/* Samvatsara Identity Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Vikram Samvatsara */}
        <div className="p-4 rounded-2xl bg-white/85 border border-[#d97706]/20">
          <span className="text-xs font-bold uppercase text-[#9a3412] block">
            विक्रम संवत् {samvatVikram} संवत्सर
          </span>
          <h3 className="text-xl font-bold font-serif text-[#451a03] mt-1">
            {brihaspatiSamvatsara.vikramSamvatsara}
          </h3>
          <p className="text-xs text-[#78350f]/80 mt-1">
            उत्तर भारतीय बृहस्पति चक्र के अनुसार संवत्सर संख्या #{brihaspatiSamvatsara.index + 1}
          </p>
        </div>

        {/* Shaka Samvatsara */}
        <div className="p-4 rounded-2xl bg-white/85 border border-[#d97706]/20">
          <span className="text-xs font-bold uppercase text-[#9a3412] block">
            शक संवत् {samvatShaka} संvatsara
          </span>
          <h3 className="text-xl font-bold font-serif text-[#451a03] mt-1">
            {brihaspatiSamvatsara.shakaSamvatsara}
          </h3>
          <p className="text-xs text-[#78350f]/80 mt-1">
            दक्षिण भारतीय व शक परम्परा के अनुसार ६० संवत्सरों में स्थिति
          </p>
        </div>

        {/* Governance Synopsis */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#ea580c]/10 to-[#f59e0b]/15 border border-[#ea580c]/25">
          <span className="text-xs font-bold uppercase text-[#c2410c] block">
            वर्ष का आकाशीय शासनाध्यक्ष
          </span>
          <h3 className="text-lg font-bold font-serif text-[#451a03] mt-1">
            राजा: देवगुरु बृहस्पति 👑
          </h3>
          <p className="text-xs text-[#78350f]/85 mt-1">
            मन्त्री: मंगल देव ⚔️ | ज्ञान, धर्म, अर्थ एवं नीति की वृद्धि का काल
          </p>
        </div>
      </div>

      {/* Mantri Mandala 10 Portfolios Bento */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#9a3412] mb-3">
          वर्ष का मन्त्री मण्डल (The 10 Planetary Portfolios):
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {mantriMandala.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-white/80 rounded-xl border border-[#d97706]/15 hover:border-[#ea580c]/40 transition-all hover:shadow-xs"
            >
              <div className="flex items-center gap-1.5 text-base mb-1">
                <span>{item.icon}</span>
                <span className="text-xs font-bold text-[#451a03] truncate font-serif">
                  {item.portfolioHindi.split(' ')[0]}
                </span>
              </div>
              <span className="text-[11px] text-[#78350f]/80 block truncate">
                {item.portfolioHindi}
              </span>
              <span className="text-xs font-bold text-[#b45309] block mt-1 font-serif">
                {item.planetHindi}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
