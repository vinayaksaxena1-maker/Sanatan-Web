/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangAstronomicalEpochs
 * Section: ४. खगोलीय मान, दिनमान व पंचांग प्रणालियां (Astronomical Epochs & Calendars)
 * Box-free, pure typographic layout with clear Normal Headings
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
    <section className="font-serif py-4 border-b border-[#dec9ab]/70 space-y-6">
      {/* 1. Main Section Heading (No Box) */}
      <div className="border-b border-[#dec9ab]/50 pb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b]">
          ४. खगोलीय मान, दिनमान व पंचांग प्रणालियां
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          दिनमान, रात्रिमान, कलि संवत्, अहर्गण, जूलियन डे, प्रविष्टे एवं दैनिक व्रत-त्योहार
        </p>
      </div>

      {/* 2. Diwa-Nisha Mana & Mid-day (No Box) */}
      <div className="divide-y divide-[#dec9ab]/40">
        <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-[#b45309] uppercase">
              दिवा व निशा मान
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#26150b] mt-0.5">
              दिनमान: <span className="text-[#c2410c]">{dinamanaFormatted}</span> | रात्रिमान: <span className="text-[#26150b]">{ratrimanaFormatted}</span>
            </h3>
            <p className="text-xs text-[#735641] mt-0.5">
              प्रत्यक्ष सूर्योदय से सूर्यास्त तक का काल दिनमान और सूर्यास्त से अगले सूर्योदय तक का काल रात्रिमान कहलाता है।
            </p>
          </div>
          <div className="text-xs text-[#735641] shrink-0">
            मध्याह्न काल: <strong className="font-mono text-[#26150b]">{madhyahnaTime}</strong>
          </div>
        </div>

        {/* 3. Seasons & Calendar Systems */}
        <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-[#b45309] uppercase">
              ऋतु, अयन एवं राष्ट्रीय सौर तिथि
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#26150b] mt-0.5">
              दृक ऋतु: {rituDetails?.solarRituHindi || 'शरद'} | वैदिक ऋतु: {rituDetails?.lunarRituHindi || 'शरद'} | अयन: {hinduDate?.ayana === 'Dakshinayana' ? 'दक्षिणायन' : 'उत्तरायण'}
            </h3>
            <p className="text-xs text-[#735641] mt-0.5">
              प्रविष्टे / गते: {deepAnalysis.pravishte.formatted} ({deepAnalysis.pravishte.solarMonth}) | राष्ट्रीय सिविल: {nationalCivilDate}
            </p>
          </div>
          <span className="text-xs font-bold text-[#b45309] shrink-0">
            सौर क्रांति चक्र
          </span>
        </div>

        {/* 4. Astronomical Epoch Constants */}
        <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-[#b45309] uppercase">
              खगोलीय युग मान व अहर्गण
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#26150b] mt-0.5">
              कलि संवत्: {kaliyugaYear} वर्ष | कलि अहर्गण: {kaliAhargana} दिन
            </h3>
            <p className="text-xs text-[#735641] mt-0.5 font-mono">
              जूलियन डे: {julianDay} | संशोधित जूलियन डे: {modifiedJulianDay} | राटा डाई: {rataDie}
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 shrink-0">
            ३१०२ ई.पू. युग
          </span>
        </div>
      </div>

      {/* 5. Day Festivals & Vrats */}
      {festivals && festivals.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="border-b border-[#dec9ab]/40 pb-1.5">
            <h3 className="text-lg font-bold text-[#26150b] flex items-center gap-1.5">
              <span>🚩</span>
              <span>आज के व्रत, पर्व एवं उत्सव</span>
            </h3>
          </div>

          <div className="divide-y divide-[#dec9ab]/30">
            {festivals.map((fest) => (
              <div key={fest.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div>
                  <h4 className="font-bold text-sm text-[#451a03] font-serif">
                    {fest.hindiName}
                  </h4>
                  <p className="text-[#735641] mt-0.5">
                    {fest.description}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded shrink-0">
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
