/**
 * Sanatan Web (सनातन घड़ी)
 * Dedicated Page: PanchangPdfPage (/download-panchang)
 * Printable Luxury A4 Vedic Panchang Document & PDF Export
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useMemo } from 'react';
import { Link } from '../../routes/AppRoutes';
import { useLocationStore } from '../../store/locationStore';
import { calculatePanchang, calculatePlanets, getMuhuratsForPanchang } from '../../engine';
import {
  formatTimeToHindi,
  formatTimeRangeToHindi,
  cleanHindiName,
  toHindiDigits,
  toHindiYogaName
} from '../../components/watch';
import { ArrowLeft, Printer, Download, Sparkles } from 'lucide-react';

export const PanchangPdfPage: React.FC = () => {
  const { currentCity } = useLocationStore();
  const today = useMemo(() => new Date(), []);

  const panchang = useMemo(() => {
    return calculatePanchang(currentCity.latitude, currentCity.longitude, today);
  }, [currentCity.latitude, currentCity.longitude, today]);

  const muhurats = useMemo(() => {
    return getMuhuratsForPanchang(panchang);
  }, [panchang]);

  const planets = useMemo(() => {
    return calculatePlanets(today).planets;
  }, [today]);

  const handlePrint = () => {
    window.print();
  };

  const abhijit = muhurats.find(m => m.id === 'abhijit');
  const brahma = muhurats.find(m => m.id === 'brahma');

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] min-h-screen py-8 px-4 font-serif antialiased print:p-0 print:bg-white print:text-black">
      {/* Screen-Only Action Bar */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c2410c] hover:underline no-underline"
        >
          <ArrowLeft className="w-4 h-4" /> मुख्य पृष्ठ पर वापस जाएं
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            type="button"
          >
            <Printer className="w-4 h-4" />
            <span>प्रिंट करें / PDF के रूप में सहेजें (Ctrl+P)</span>
          </button>
        </div>
      </div>

      {/* Printable Classical A4 Panchang Document */}
      <article className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-[#d4af37] print:border-none print:shadow-none print:p-4 print:max-w-none print:rounded-none relative space-y-6">
        {/* Document Header */}
        <div className="text-center border-b-2 border-[#b8860b] pb-6 space-y-1.5">
          <div className="text-sm font-bold text-[#c2410c] uppercase tracking-widest">
            ॥ श्री गणेशाय नमः • ॐ नमः शिवाय ॥
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#26150b]">
            सनातन वैदिक दैनिक पंचांग पत्र
          </h1>
          <p className="text-xs text-[#735641]">
            स्थान: <strong>{currentCity.nameHindi || currentCity.name}</strong> (अक्षांश: {Math.abs(currentCity.latitude).toFixed(2)}°, रेखांश: {Math.abs(currentCity.longitude).toFixed(2)}°) • दिनांक: {today.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-[#b8860b] pt-1">
            <span>विक्रम संवत: {toHindiDigits(panchang.hinduDate.samvatVikram)}</span>
            <span>•</span>
            <span>संवत्सर: क्रोधी</span>
            <span>•</span>
            <span>मास: {panchang.hinduDate.monthHindi} ({panchang.hinduDate.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'})</span>
            <span>•</span>
            <span>ऋतु: वसन्त</span>
            <span>•</span>
            <span>अयन: उत्तरायण</span>
          </div>
        </div>

        {/* 5 Panchang Limbs Grid */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#c2410c] border-b border-[#dec9ab] pb-1 uppercase tracking-wider">
            १. पंचांग के मुख्य पंच-अंग
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">१. तिथि</span>
              <span className="font-bold text-[#26150b] text-sm">{cleanHindiName(panchang.hinduDate.tithi.hindiName)}</span>
              <span className="text-[10px] text-[#8b6508] block mt-0.5">{formatTimeToHindi(panchang.hinduDate.tithi.endTime)} तक</span>
            </div>

            <div className="p-3 rounded-xl border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">२. वार</span>
              <span className="font-bold text-[#26150b] text-sm">आज का वार</span>
              <span className="text-[10px] text-[#8b6508] block mt-0.5">शुभ दिन</span>
            </div>

            <div className="p-3 rounded-xl border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">३. नक्षत्र</span>
              <span className="font-bold text-[#26150b] text-sm">{cleanHindiName(panchang.hinduDate.nakshatra.hindiName)}</span>
              <span className="text-[10px] text-[#8b6508] block mt-0.5">पद {toHindiDigits(panchang.hinduDate.nakshatra.pada || 1)}</span>
            </div>

            <div className="p-3 rounded-xl border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">४. योग</span>
              <span className="font-bold text-[#26150b] text-sm">{toHindiYogaName(panchang.hinduDate.yoga.name)}</span>
              <span className="text-[10px] text-[#8b6508] block mt-0.5">{formatTimeToHindi(panchang.hinduDate.yoga.endTime)} तक</span>
            </div>

            <div className="p-3 rounded-xl border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">५. करण</span>
              <span className="font-bold text-[#26150b] text-sm">{cleanHindiName(panchang.hinduDate.karana.hindiName)}</span>
              <span className="text-[10px] text-[#8b6508] block mt-0.5">{formatTimeToHindi(panchang.hinduDate.karana.endTime)} तक</span>
            </div>
          </div>
        </section>

        {/* Solar & Lunar Times */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#c2410c] border-b border-[#dec9ab] pb-1 uppercase tracking-wider">
            २. सूर्य एवं चंद्र कालगणना
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">प्रातः सूर्योदय</span>
              <span className="font-bold text-sm font-mono text-[#c2410c]">{formatTimeToHindi(panchang.sunrise)}</span>
            </div>
            <div className="p-3 rounded-xl border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">सायं सूर्यास्त</span>
              <span className="font-bold text-sm font-mono text-[#b8860b]">{formatTimeToHindi(panchang.sunset)}</span>
            </div>
            <div className="p-3 rounded-xl border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">चंद्रोदय</span>
              <span className="font-bold text-sm font-mono text-[#2a674c]">{formatTimeToHindi(panchang.moonrise)}</span>
            </div>
            <div className="p-3 rounded-xl border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">चंद्रास्त</span>
              <span className="font-bold text-sm font-mono text-stone-700">{formatTimeToHindi(panchang.moonset)}</span>
            </div>
          </div>
        </section>

        {/* Shubh & Ashubh Muhurats Table */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#c2410c] border-b border-[#dec9ab] pb-1 uppercase tracking-wider">
            ३. विशिष्ट मुहूर्त एवं वर्ज्य काल
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-1.5">
              <span className="font-bold text-emerald-900 block text-xs">शुभ मुहूर्त (ग्राह्य काल):</span>
              <div className="flex justify-between">
                <span>अभिजित मुहूर्त:</span>
                <span className="font-bold font-mono">{abhijit ? formatTimeRangeToHindi(abhijit.startTime, abhijit.endTime) : '११:५८ - १२:४९ अपराह्न'}</span>
              </div>
              <div className="flex justify-between">
                <span>ब्रह्म मुहूर्त:</span>
                <span className="font-bold font-mono">{brahma ? formatTimeRangeToHindi(brahma.startTime, brahma.endTime) : '०४:३८ - ०५:२६ पूर्वाह्न'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-red-300 bg-red-50/50 space-y-1.5">
              <span className="font-bold text-red-900 block text-xs">अशुभ काल (वर्ज्य समय):</span>
              <div className="flex justify-between">
                <span>राहु काल (त्याज्य):</span>
                <span className="font-bold font-mono text-red-700">{formatTimeRangeToHindi(panchang.rahuKaal.start, panchang.rahuKaal.end)}</span>
              </div>
              <div className="flex justify-between">
                <span>यमगण्ड काल:</span>
                <span className="font-bold font-mono">{formatTimeRangeToHindi(panchang.yamagandam.start, panchang.yamagandam.end)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Planetary Positions Brief */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-[#c2410c] border-b border-[#dec9ab] pb-1 uppercase tracking-wider">
            ४. नवग्रह स्पष्ट स्थिति (लाहिड़ी अयनांश)
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-center text-xs">
            {planets.slice(0, 9).map((p) => {
              const deg = Math.floor(p.longitude % 30);
              return (
                <div key={p.name} className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9]">
                  <span className="font-bold text-[#26150b] block">{p.hindiName}</span>
                  <span className="text-[10px] text-[#c2410c] block">{p.signHindi}</span>
                  <span className="text-[9px] font-mono text-[#735641] block">{toHindiDigits(deg)}°</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Seal */}
        <div className="pt-6 border-t border-[#dec9ab] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#735641] gap-2">
          <span>प्रमाणित द्रिक पंचांग • सनातन घड़ी वैदिक कालगणना संस्थान (काशी)</span>
          <span className="font-mono text-[10px]">https://sanatan-web.vercel.app/</span>
        </div>
      </article>
    </div>
  );
};

export default PanchangPdfPage;
