/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangSamvatsaraMandala
 * Section: ७. संवत्सर व मन्त्री मण्डल (Samvatsara & Governance Mandala)
 * Box-free, pure typographic layout with clear Normal Headings
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
    <section className="font-serif py-4 border-b border-[#dec9ab]/70 space-y-6">
      {/* 1. Main Section Heading (No Box) */}
      <div className="border-b border-[#dec9ab]/50 pb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b]">
          ३. संवत्सर व मन्त्री मण्डल
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          ६० बृहस्पति संवत्सर चक्र एवं विक्रम संवत् का आकाशीय मन्त्री मण्डल
        </p>
      </div>

      {/* 2. Samvatsara Overview Rows */}
      <div className="divide-y divide-[#dec9ab]/40">
        <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-[#b45309] uppercase">
              विक्रम एवं शक संवत्सर चक्र
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#26150b] mt-0.5">
              विक्रम संवत्सर: <span className="text-[#c2410c]">{brihaspatiSamvatsara.vikramSamvatsara}</span> ({samvatVikram}) | शक संवत्सर: <span className="text-[#26150b]">{brihaspatiSamvatsara.shakaSamvatsara}</span> ({samvatShaka})
            </h3>
            <p className="text-xs text-[#735641] mt-0.5">
              उत्तर भारतीय बृहस्पति चक्र के अनुसार संवत्सर संख्या #{brihaspatiSamvatsara.index + 1} | दक्षिण भारतीय व शक गणना अनुसार {brihaspatiSamvatsara.shakaSamvatsara} संवत्सर।
            </p>
          </div>
          <span className="text-xs font-bold text-[#c2410c] shrink-0">
            ६० संवत्सर चक्र
          </span>
        </div>

        <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-[#b45309] uppercase">
              वर्ष का आकाशीय शासनाध्यक्ष
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#26150b] mt-0.5">
              राजा: देवगुरु बृहस्पति 👑 | मन्त्री: मंगल देव ⚔️
            </h3>
            <p className="text-xs text-[#735641] mt-0.5">
              बृहस्पति का राजा होना ज्ञान, धर्म, न्याय व शिक्षा की वृद्धि दर्शाता है; मंगल का मन्त्रित्व रक्षा व सैन्य शक्ति को बल देता है।
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 shrink-0">
            शुभ शासी परिषद
          </span>
        </div>
      </div>

      {/* 3. The 10 Planetary Portfolios (Clean Normal List, No Boxes) */}
      <div className="space-y-3 pt-2">
        <div className="border-b border-[#dec9ab]/40 pb-1.5">
          <h3 className="text-lg font-bold text-[#26150b]">
            वर्ष का मन्त्री मण्डल
          </h3>
          <p className="text-xs text-[#735641] mt-0.5">
            संवत्सर के विभिन्न प्राकृतिक, सामाजिक व आर्थिक विभागों के ग्रहीय अधिपति:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-3 text-xs py-1">
          {mantriMandala.map((item, idx) => (
            <div key={idx} className="py-1.5 border-b border-[#dec9ab]/25 flex flex-col justify-between">
              <div>
                <span className="text-[#735641] block text-[11px]">
                  {item.icon} {item.portfolioHindi}
                </span>
                <span className="text-sm font-bold text-[#26150b] block mt-0.5 font-serif">
                  {item.planetHindi}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PanchangSamvatsaraMandala;
