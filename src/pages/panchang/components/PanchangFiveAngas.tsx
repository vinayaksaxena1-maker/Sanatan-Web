/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangFiveAngas
 * Section: १. पंचांग के ५ मुख्य अंग (The 5 Sacred Pillars)
 * Includes Samvat & Cosmic Metadata + 5 Sacred Angas with clean Normal Headings (No Boxes)
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';
import { toDevanagariNumerals } from '../hooks/usePanchangData';

export interface PanchangFiveAngasProps {
  data: UsePanchangDataResult;
}

export const PanchangFiveAngas: React.FC<PanchangFiveAngasProps> = ({ data }) => {
  const { panchang, dayName, dayRuler, deepAnalysis } = data;
  const hd = panchang.hinduDate;
  const tithi = hd.tithi;
  const nakshatra = hd.nakshatra;
  const yoga = hd.yoga;
  const karana = hd.karana;
  const karana2 = hd.karana2;

  const samvatDetails = [
    { label: 'विक्रम संवत', value: toDevanagariNumerals(hd.samvatVikram), highlight: true },
    { label: 'शक संवत', value: toDevanagariNumerals(hd.samvatShaka) },
    { label: 'कलि संवत', value: toDevanagariNumerals(deepAnalysis.kaliyugaYear) },
    { label: 'प्रविष्टे / गते', value: `${toDevanagariNumerals(deepAnalysis.pravishte.gate)} प्रविष्टे`, highlight: true },
    { label: 'मास (पूर्णिमान्त)', value: hd.monthPurnimantaHindi || hd.monthHindi },
    { label: 'मास (अमान्त)', value: hd.monthAmantaHindi || hd.monthHindi },
    { label: 'पक्ष', value: hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष', highlight: true },
    { label: 'ऋतु', value: hd.ritu || 'शरद ऋतु' },
    { label: 'अयन', value: hd.ayana || 'दक्षिणायन' },
    { label: 'सूर्य नक्षत्र', value: panchang.suryaNakshatra?.nameHindi || 'चित्रा' },
    { label: 'सूर्योदय', value: panchang.sunrise, mono: true, highlight: true },
  ];

  const angasList = [
    {
      index: 'अंग १',
      name: 'तिथि',
      title: `${tithi.hindiName || tithi.name}`,
      paksha: hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
      endTime: tithi.endTime || 'रात्रि ०२:१५ तक',
      lord: tithi.lord || 'अग्नि देव',
      deity: tithi.deity || 'सूर्य',
      status: 'दैनिक तिथि मान',
      details: `अधिपति: ${tithi.lord || 'अग्नि देव'} | देवता: ${tithi.deity || 'सूर्य'} | पक्ष: ${hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'}`,
    },
    {
      index: 'अंग २',
      name: 'वार',
      title: `${dayName}`,
      paksha: dayRuler,
      endTime: `${panchang.sunrise} से ${panchang.sunset}`,
      lord: dayRuler,
      deity: 'सौर काल अधिष्ठाता',
      status: 'शुभ कार्य सिद्धिप्रद दिवस',
      details: `वासर: ${dayRuler} | सूर्योदय: ${panchang.sunrise} | सूर्यास्त: ${panchang.sunset}`,
    },
    {
      index: 'अंग ३',
      name: 'नक्षत्र',
      title: `${nakshatra.hindiName || nakshatra.name}`,
      paksha: `${nakshatra.pada || 2} पद`,
      endTime: nakshatra.endTime || 'प्रातः ०६:१५ तक',
      lord: nakshatra.lord || 'बृहस्पति',
      deity: nakshatra.deity || 'इंद्र',
      status: 'चन्द्र संचरण नक्षत्र',
      details: `चरण: ${nakshatra.pada || 2} पद | स्वामी ग्रह: ${nakshatra.lord || 'बृहस्पति'} | देवता: ${nakshatra.deity || 'इंद्र'}`,
    },
    {
      index: 'अंग ४',
      name: 'योग',
      title: `${yoga.hindiName || yoga.name}`,
      paksha: yoga.isAuspicious !== false ? 'शुभ योग' : 'अशुभ काल',
      endTime: yoga.endTime || 'सायं ०५:२३ तक',
      lord: '२७ खगोलीय योग',
      deity: 'कार्य सिद्धि',
      status: yoga.isAuspicious !== false ? 'शुभ योग' : 'अशुभ काल',
      details: `श्रेणी: ${yoga.isAuspicious !== false ? 'कार्यसिद्धि व समृद्धि' : 'सावधानी काल'} | उपयुक्तता: विद्या, अध्ययन व व्यापार`,
    },
    {
      index: 'अंग ५',
      name: 'करण',
      title: `${karana.hindiName || karana.name}`,
      paksha: karana.natureHindi ? `${karana.natureHindi} करण` : 'चर करण',
      endTime: karana.endTime || 'अपरान्ह ०३:२२ तक',
      lord: karana2 ? `द्वितीय करण: ${karana2.hindiName}` : 'अर्ध तिथि मान',
      deity: 'कर्म सिद्धि',
      status: karana.classification === 'Ashubh' ? 'अशुभ करण' : 'शुभ करण',
      details: karana2 ? `प्रथम करण: ${karana.hindiName} (${karana.endTime}) | द्वितीय करण: ${karana2.hindiName}` : 'दैनिक क्रियाकलाप व कर्म अनुकूल',
    },
  ];

  return (
    <section className="font-serif py-4 border-b border-[#dec9ab]/70 space-y-6">
      {/* 1. Main Section Heading (No Box) */}
      <div className="border-b border-[#dec9ab]/50 pb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b]">
          २. पंचांग के ५ मुख्य अंग
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          संवत्, तिथि, वार, नक्षत्र, योग एवं करण — वैदिक काल-विधान के मूल आधार
        </p>
      </div>

      {/* 2. Samvat & Cosmic Indicators Strip (Transferred from Top, Box-Free) */}
      <div className="py-2.5 px-1 border-b border-[#dec9ab]/40">
        <span className="text-xs font-bold uppercase tracking-wider text-[#9a3412] block mb-2">
          संवत् एवं दैनिक खगोलीय स्थिति:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-x-4 gap-y-2 text-xs">
          {samvatDetails.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[11px] text-[#735641]">{item.label}</span>
              <span
                className={`font-semibold mt-0.5 ${
                  item.highlight ? 'text-[#c2410c] font-bold' : 'text-[#26150b]'
                } ${item.mono ? 'font-mono' : ''}`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 5 Angas as Clean Normal Headings (No Boxes) */}
      <div className="divide-y divide-[#dec9ab]/40">
        {angasList.map((anga, idx) => (
          <div
            key={idx}
            className="py-3 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-4"
          >
            {/* Left: Normal Heading & Sub-details */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#26150b]">
                {anga.index} • {anga.name}: <span className="text-[#c2410c]">{anga.title}</span> <span className="text-xs font-normal text-[#735641]">({anga.paksha})</span>
              </h3>
              <p className="text-xs text-[#735641] mt-0.5">
                {anga.details}
              </p>
            </div>

            {/* Right: Timing & Status text (No Box) */}
            <div className="flex items-center gap-4 text-xs shrink-0 pt-1 md:pt-0">
              <div>
                <span className="text-[#735641]">समाप्ति काल: </span>
                <span className="font-bold font-mono text-[#c2410c]">{anga.endTime}</span>
              </div>
              <div className="border-l border-[#dec9ab]/60 pl-3">
                <span className="text-[#735641]">स्थिति: </span>
                <span className="font-semibold text-emerald-800">✓ {anga.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PanchangFiveAngas;
