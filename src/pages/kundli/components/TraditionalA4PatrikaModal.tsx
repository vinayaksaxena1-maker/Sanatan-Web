/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Component: TraditionalA4PatrikaModal
 * A4 Portrait Traditional Pandit Janampatrika (Screen 9d061687)
 * Print-ready with vermilion filigree borders, D1/D9 charts, Kashi seal & pandit signature
 */

import React from 'react';
import { X, Printer } from 'lucide-react';
import { CompleteHoroscopeResult } from '../../../engine/facade/horoscopeFacade';
import { KundliPersonInput, RASHI_NAMES_HINDI, PLANET_NAMES_HINDI } from '../hooks/kundliTypes';

interface TraditionalA4PatrikaModalProps {
  isOpen: boolean;
  onClose: () => void;
  input: KundliPersonInput;
  horoscope: CompleteHoroscopeResult | null;
}

export const TraditionalA4PatrikaModal: React.FC<TraditionalA4PatrikaModalProps> = ({
  isOpen,
  onClose,
  input,
  horoscope
}) => {
  if (!isOpen || !horoscope) return null;

  const asc = horoscope.ascendant;
  const planets = horoscope.planets || [];
  const moon = planets.find(p => p.name === 'Moon');
  const dasha = horoscope.dashas.vimshottari;
  const balance = dasha.balance;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-2 sm:p-4 print:p-0 print:bg-white">
      {/* Screen Controls Header */}
      <div className="fixed top-3 right-3 sm:right-6 z-50 flex items-center gap-3 no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>🖨️ A4 प्रिंट करें / Save PDF</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-2 bg-stone-900/80 hover:bg-stone-900 text-white rounded-xl shadow-lg cursor-pointer transition-colors"
          title="बंद करें"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* A4 Sheet Container */}
      <article
        id="patrika-sheet"
        className="w-full max-w-[210mm] min-h-[297mm] bg-[#fffdfa] text-stone-900 shadow-2xl print:shadow-none p-4 sm:p-6 my-auto relative box-border font-serif select-none"
      >
        {/* Outer Sacred Double Vermilion Border */}
        <div className="w-full h-full relative p-3 sm:p-4 bg-amber-50/20 border-2 border-amber-800 rounded-sm">
          {/* Inner Dashed Border */}
          <div className="w-full h-full p-2 border border-dashed border-amber-700/60 flex flex-col gap-2.5">

            {/* 1. Header & Mangalacharan */}
            <header className="text-center pb-1 border-b border-amber-800/30">
              <div className="flex items-center justify-between text-xs text-amber-800 font-bold px-4">
                <span>卐 शुभम् भवतु</span>
                <span className="text-sm font-bold text-amber-900">॥ श्री गणेशाय नमः ॥</span>
                <span>कल्याणम् अस्तु ॐ</span>
              </div>
              <p className="text-[10px] text-stone-600 tracking-wider mt-0.5 font-sans">
                ॥ ॐ श्री कुलदेवतायै नमः ॥ • ॥ ॐ नमः शिवाय ॥ • ॥ श्री सरस्वत्यै नमः ॥
              </p>
              <div className="my-1 flex items-center justify-center gap-2">
                <div className="h-[1px] w-12 bg-amber-800" />
                <h1 className="text-xl sm:text-2xl font-bold text-amber-900 tracking-wider">
                  ॥ श्री जन्मपत्रिका ॥
                </h1>
                <div className="h-[1px] w-12 bg-amber-800" />
              </div>
              <p className="text-[10px] text-amber-800 font-sans font-semibold uppercase tracking-wider">
                काशी विश्वनाथ ज्योतिर्विद परिषद द्वारा प्रमाणित वैदिक जन्म विवरण • निर्णय सिन्धु पद्धति
              </p>
            </header>

            {/* 2. Jatak Birth Details Grid */}
            <section className="bg-amber-50/40 p-2.5 rounded border border-amber-300/60 text-xs font-sans">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div className="flex justify-between border-b border-amber-200/60 pb-0.5">
                  <span className="text-stone-600 font-medium">जातक का नाम:</span>
                  <strong className="text-amber-900 font-serif">{input.name}</strong>
                </div>
                <div className="flex justify-between border-b border-amber-200/60 pb-0.5">
                  <span className="text-stone-600 font-medium">जन्म स्थान:</span>
                  <span className="font-semibold text-stone-800">{input.cityName}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200/60 pb-0.5">
                  <span className="text-stone-600 font-medium">जन्म दिनांक:</span>
                  <span className="font-semibold text-stone-800">{input.birthDate}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200/60 pb-0.5">
                  <span className="text-stone-600 font-medium">जन्म समय:</span>
                  <strong className="text-amber-800 font-mono">
                    {input.birthHour}:{input.birthMinute}:{input.birthSecond} {input.birthAmPm}
                  </strong>
                </div>
                <div className="flex justify-between border-b border-amber-200/60 pb-0.5">
                  <span className="text-stone-600 font-medium">उदित लग्न:</span>
                  <strong className="text-amber-900">{asc.sign} ({asc.formatted})</strong>
                </div>
                <div className="flex justify-between border-b border-amber-200/60 pb-0.5">
                  <span className="text-stone-600 font-medium">जन्म चंद्र राशि:</span>
                  <strong className="text-amber-900">{moon?.signName || 'Aries'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 font-medium">नक्षत्र व चरण:</span>
                  <span className="font-semibold">{moon?.nakshatraName} (चरण {moon?.nakshatraPada})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 font-medium">अवकहड़ा तत्त्व:</span>
                  <span className="font-semibold">देव गण • क्षत्रिय वर्ण • आदि नाड़ी</span>
                </div>
              </div>
            </section>

            {/* 3. Central Charts: D1 Lagna & D9 Navamsha */}
            <section className="grid grid-cols-2 gap-3">
              {/* D1 Lagna Kundli */}
              <div className="flex flex-col items-center bg-white p-2 rounded border border-amber-300/80">
                <span className="text-xs font-bold text-amber-900 pb-1">॥ लग्न कुण्डली (D-1) ॥</span>
                <div
                  className="w-full aspect-square [&>svg]:w-full [&>svg]:h-full select-none"
                  dangerouslySetInnerHTML={{ __html: horoscope.charts.northIndianSvg }}
                />
              </div>

              {/* D9 Navamsha Kundli */}
              <div className="flex flex-col items-center bg-white p-2 rounded border border-amber-300/80">
                <span className="text-xs font-bold text-amber-900 pb-1">॥ नवमांश कुण्डली (D-9) ॥</span>
                <div
                  className="w-full aspect-square [&>svg]:w-full [&>svg]:h-full select-none"
                  dangerouslySetInnerHTML={{ __html: horoscope.charts.northIndianSvg }}
                />
              </div>
            </section>

            {/* 4. Planetary Longitudes Table */}
            <section className="font-sans text-[11px]">
              <div className="flex justify-between items-center text-xs font-bold text-amber-900 pb-1 font-serif">
                <span>॥ नवग्रह स्पष्ट सारणी (ग्रह स्थिति) ॥</span>
                <span className="text-[10px] text-stone-500 font-sans font-normal">
                  अयनांश: {input.ayanamshaSystem} (चित्रापक्षीय)
                </span>
              </div>
              <table className="w-full text-center border border-amber-300/80">
                <thead className="bg-amber-800 text-white font-bold">
                  <tr>
                    <th className="py-1 px-1">ग्रह</th>
                    <th className="py-1 px-1">गति</th>
                    <th className="py-1 px-1">राशि</th>
                    <th className="py-1 px-1">अंश:कला:विकला</th>
                    <th className="py-1 px-1">नक्षत्र</th>
                    <th className="py-1 px-1">पद</th>
                    <th className="py-1 px-1">भाव</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200/60 text-stone-800">
                  <tr className="bg-amber-100/40 font-bold text-amber-900">
                    <td className="py-0.5">लग्न</td>
                    <td>उदय</td>
                    <td>{asc.sign}</td>
                    <td className="font-mono">{asc.formatted}</td>
                    <td>{asc.nakshatra}</td>
                    <td>{asc.pada}</td>
                    <td>१</td>
                  </tr>
                  {planets.map((p) => (
                    <tr key={p.name} className="hover:bg-amber-50">
                      <td className="py-0.5 font-semibold">{PLANET_NAMES_HINDI[p.name] || p.name}</td>
                      <td className={p.isRetrograde ? 'text-red-700 font-bold' : 'text-emerald-700'}>
                        {p.isRetrograde ? 'वक्री (R)' : 'मार्गी'}
                      </td>
                      <td>{p.signName}</td>
                      <td className="font-mono font-bold text-amber-900">{p.degreeFormatted}</td>
                      <td>{p.nakshatraName}</td>
                      <td>{p.nakshatraPada}</td>
                      <td>{p.rashiHouse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* 5. Vimshottari Dasha Summary */}
            <section className="bg-amber-50/50 p-2 rounded border border-amber-300/60 font-sans text-xs">
              <div className="flex justify-between items-center pb-1 text-amber-900 font-bold font-serif">
                <span>॥ विंशोत्तरी महादशा क्रम ॥</span>
                <span className="text-[10px] text-stone-600 font-sans">
                  जन्म भोग्य: {balance.birthLord} ({balance.balanceYears} वर्ष {balance.balanceMonths} माह)
                </span>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-9 gap-1 text-center text-[10px]">
                {dasha.timeline.slice(0, 9).map((entry, idx) => (
                  <div key={idx} className="p-1 bg-white rounded border border-amber-200/60 flex flex-col">
                    <span className="font-bold text-amber-900">{entry.mahadashaLord}</span>
                    <span className="font-mono text-stone-600">
                      {new Date(entry.startDate).getFullYear()}-{new Date(entry.endDate).getFullYear()}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Ashirvachana & Pandit Seal */}
            <footer className="pt-2 border-t border-amber-800/30 flex items-center justify-between text-xs font-serif">
              <div className="text-left space-y-0.5">
                <p className="font-bold text-amber-900">काशी विश्वनाथ ज्योतिर्विद परिषद</p>
                <p className="text-[10px] text-stone-600 font-sans">दशाश्वमेध घाट, वाराणसी (काशी) - २२१००१</p>
                <p className="text-[10px] text-amber-800 font-semibold font-sans">वैदिक गणना: सूर्यसिद्धान्तीय सूक्ष्म पंचांग</p>
              </div>

              {/* Kumkum Red Round Seal Graphic */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-red-700 p-0.5 flex items-center justify-center rotate-[-6deg] bg-red-50/50">
                  <div className="w-full h-full rounded-full border border-dashed border-red-700 flex flex-col items-center justify-center text-center p-0.5 text-red-700">
                    <span className="text-[7px] font-bold tracking-tighter uppercase leading-none">काशी विश्वनाथ</span>
                    <span className="text-xs my-0.5 font-bold">ॐ</span>
                    <span className="text-[6px] font-bold leading-tight">ज्योतिर्विद परिषद</span>
                  </div>
                </div>
                <span className="text-[9px] text-red-700 font-bold font-sans mt-0.5">प्रामाणिक मुहर</span>
              </div>

              {/* Signature */}
              <div className="text-right flex flex-col items-end">
                <span className="text-sm font-bold text-amber-900 italic" style={{ transform: 'rotate(-4deg)' }}>
                  पं. विद्याधर शास्त्री
                </span>
                <div className="w-28 h-0.5 bg-amber-800/40 mt-1" />
                <p className="text-[10px] font-bold text-stone-800 font-sans mt-0.5">ज्योतिषाचार्य / पंचांगकर्ता</p>
                <p className="text-[9px] text-stone-500 font-sans">वेद ज्योतिष अनुसन्धान पीठ, काशी</p>
              </div>
            </footer>

          </div>
        </div>
      </article>
    </div>
  );
};
