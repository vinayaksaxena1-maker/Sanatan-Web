/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangAstronomicalEpochs.tsx
 * Section: खगोलीय मान व पंचांग प्रणालियां
 * दिनमान, रात्रिमान, मध्याह्न, कलि संवत्, अहर्गण, जूलियन डे, राष्ट्रीय सिविल दिनांक, दैनिक व्रत-पर्व
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

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

  return (
    <section className="bg-gradient-to-br from-[#fffdf8] via-[#fcf7ec] to-[#f8f1de] rounded-3xl p-6 sm:p-8 border border-[#d97706]/25 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#d97706]/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0284c7] to-[#0369a1] text-white flex items-center justify-center font-bold text-xl shadow-md">
            🔭
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#451a03] font-serif tracking-wide">
              खगोलीय मान व पंचांग प्रणालियां (Astronomical Epochs & Calendars)
            </h2>
            <p className="text-xs sm:text-sm text-[#78350f]/80">
              दिनमान, रात्रिमान, कलि संवत्, अहर्गण, जूलियन डे एवं दैनिक व्रत-त्योहार
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0284c7]/15 text-[#0369a1] border border-[#0284c7]/30">
          खगोलीय एवं गणितीय गणना
        </span>
      </div>

      {/* 1. Dinamana, Ratrimana & Madhyahna Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dinamana */}
        <div className="p-4 rounded-2xl bg-white/85 border border-[#d97706]/20">
          <div className="flex items-center justify-between text-xs text-[#9a3412] font-bold mb-1">
            <span>दिनमान (Dinamana)</span>
            <span>☀️</span>
          </div>
          <span className="text-base font-bold font-serif text-[#451a03] block">
            {dinamanaFormatted}
          </span>
          <span className="text-[11px] text-[#78350f]/75 block mt-0.5">
            सूर्योदय से सूर्यास्त तक का प्रत्यक्ष दिवाकाल
          </span>
        </div>

        {/* Ratrimana */}
        <div className="p-4 rounded-2xl bg-white/85 border border-[#d97706]/20">
          <div className="flex items-center justify-between text-xs text-[#9a3412] font-bold mb-1">
            <span>रात्रिमान (Ratrimana)</span>
            <span>🌌</span>
          </div>
          <span className="text-base font-bold font-serif text-[#451a03] block">
            {ratrimanaFormatted}
          </span>
          <span className="text-[11px] text-[#78350f]/75 block mt-0.5">
            सूर्यास्त से अगले सूर्योदय तक का निशाकाल
          </span>
        </div>

        {/* Madhyahna */}
        <div className="p-4 rounded-2xl bg-white/85 border border-[#d97706]/20">
          <div className="flex items-center justify-between text-xs text-[#9a3412] font-bold mb-1">
            <span>मध्याह्न काल (Solar Noon)</span>
            <span>🕛</span>
          </div>
          <span className="text-base font-bold font-serif text-[#451a03] block">
            {madhyahnaTime}
          </span>
          <span className="text-[11px] text-[#78350f]/75 block mt-0.5">
            सूर्य का स्थानीय याम्योत्तर (ख-मध्य) संचरण
          </span>
        </div>
      </div>

      {/* 2. Ritu & Ayana Split (Drik vs Vedic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white/80 rounded-xl border border-[#d97706]/15">
          <span className="text-[11px] font-bold text-[#b45309] block uppercase">दृक ऋतु</span>
          <span className="text-sm font-bold text-[#451a03] block mt-0.5">
            {rituDetails?.solarRituHindi || 'शरद ऋतु'}
          </span>
          <span className="text-[10px] text-[#78350f]/70 block">सौर क्रांति चक्र आधारित</span>
        </div>

        <div className="p-3.5 bg-white/80 rounded-xl border border-[#d97706]/15">
          <span className="text-[11px] font-bold text-[#b45309] block uppercase">वैदिक ऋतु</span>
          <span className="text-sm font-bold text-[#451a03] block mt-0.5">
            {rituDetails?.lunarRituHindi || 'शरद ऋतु'}
          </span>
          <span className="text-[10px] text-[#78350f]/70 block">चांद्र मास आधारित</span>
        </div>

        <div className="p-3.5 bg-white/80 rounded-xl border border-[#d97706]/15">
          <span className="text-[11px] font-bold text-[#b45309] block uppercase">अयन (Ayana)</span>
          <span className="text-sm font-bold text-[#451a03] block mt-0.5">
            {hinduDate?.ayana === 'Dakshinayana' ? 'दक्षिणायन' : 'उत्तरायण'}
          </span>
          <span className="text-[10px] text-[#78350f]/70 block">सूर्य की दक्षिण/उत्तर गति</span>
        </div>

        <div className="p-3.5 bg-white/80 rounded-xl border border-[#d97706]/15">
          <span className="text-[11px] font-bold text-[#b45309] block uppercase">राष्ट्रीय सौर तिथि</span>
          <span className="text-sm font-bold text-[#451a03] block mt-0.5">
            {nationalCivilDate}
          </span>
          <span className="text-[10px] text-[#78350f]/70 block">भारत का राष्ट्रीय कैलेंडर</span>
        </div>
      </div>

      {/* 3. Astronomical Epochs & Mathematical Benchmarks */}
      <div className="p-4 rounded-2xl bg-[#f5e6cc]/40 border border-[#d97706]/20">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#9a3412] mb-3">
          खगोलीय कालगणना व युग मान (Epoch Constants):
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/85 p-2.5 rounded-lg border border-[#d97706]/15">
            <span className="text-[10px] text-[#78350f] block font-bold">कलियुग वर्ष (Elapsed)</span>
            <span className="text-sm font-mono font-bold text-[#451a03] mt-0.5 block">{kaliyugaYear} वर्ष</span>
          </div>
          <div className="bg-white/85 p-2.5 rounded-lg border border-[#d97706]/15">
            <span className="text-[10px] text-[#78350f] block font-bold">कलि अहर्गण (Ahargana)</span>
            <span className="text-sm font-mono font-bold text-[#451a03] mt-0.5 block">{kaliAhargana} दिन</span>
          </div>
          <div className="bg-white/85 p-2.5 rounded-lg border border-[#d97706]/15">
            <span className="text-[10px] text-[#78350f] block font-bold">Julian Day (JD)</span>
            <span className="text-sm font-mono font-bold text-[#451a03] mt-0.5 block">{julianDay}</span>
          </div>
          <div className="bg-white/85 p-2.5 rounded-lg border border-[#d97706]/15">
            <span className="text-[10px] text-[#78350f] block font-bold">Modified JD (MJD)</span>
            <span className="text-sm font-mono font-bold text-[#451a03] mt-0.5 block">{modifiedJulianDay}</span>
          </div>
        </div>
      </div>

      {/* 4. Day Festivals & Vrats Strip */}
      {festivals && festivals.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-500/30">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
            <span>🚩</span> आज के व्रत, पर्व एवं उत्सव:
          </h4>
          <div className="space-y-2">
            {festivals.map((fest) => (
              <div key={fest.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 rounded-xl border border-amber-600/20 gap-2">
                <div>
                  <span className="font-bold text-sm text-[#451a03] font-serif block">
                    {fest.hindiName} ({fest.name})
                  </span>
                  <span className="text-xs text-[#78350f]/80 block mt-0.5">
                    {fest.description}
                  </span>
                </div>
                <span className="self-start sm:self-auto text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
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
