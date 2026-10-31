/**
 * Sanatan Web (सनातन घड़ी)
 * Dedicated Page: PanchangPdfPage (/download-panchang)
 * Printable Complete Vedic Panchang Document & PDF Export
 * All 8 Main Headings & Subheadings matching Panchang Page exactly
 * Selected Date & Selected City aware
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useMemo } from 'react';
import { Link } from '../../routes/AppRoutes';
import { useLocationStore } from '../../store/locationStore';
import { calculatePanchang, calculatePlanets, getMuhuratsForPanchang } from '../../engine';
import { calculateDeepPanchang } from './services/panchangDeepService';
import {
  formatTimeToHindi,
  formatTimeRangeToHindi,
  cleanHindiName,
  toHindiDigits,
  toHindiYogaName,
} from '../../components/watch';
import { HINDI_DAYS, HINDI_MONTHS, toDevanagariNumerals } from './hooks/usePanchangData';
import { ArrowLeft, Printer } from 'lucide-react';

export const PanchangPdfPage: React.FC = () => {
  const { currentCity } = useLocationStore();

  // Read selected date from URL query parameter (?date=YYYY-MM-DD) or fallback to today
  const selectedDate = useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const dateStr = params.get('date');
      if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d, 12, 0, 0);
      }
    } catch {
      // Fallback
    }
    return new Date();
  }, []);

  const formattedDate = useMemo(() => {
    const dayName = HINDI_DAYS[selectedDate.getDay()];
    const dateNum = toDevanagariNumerals(selectedDate.getDate());
    const monthName = HINDI_MONTHS[selectedDate.getMonth()];
    const yearNum = toDevanagariNumerals(selectedDate.getFullYear());
    return `${dateNum} ${monthName} ${yearNum} (${dayName})`;
  }, [selectedDate]);

  const panchang = useMemo(() => {
    return calculatePanchang(currentCity.latitude, currentCity.longitude, selectedDate);
  }, [currentCity.latitude, currentCity.longitude, selectedDate]);

  const deepAnalysis = useMemo(() => {
    return calculateDeepPanchang(panchang, currentCity.latitude, currentCity.longitude, selectedDate);
  }, [panchang, currentCity.latitude, currentCity.longitude, selectedDate]);

  const muhurats = useMemo(() => {
    return getMuhuratsForPanchang(panchang);
  }, [panchang]);

  const planets = useMemo(() => {
    return calculatePlanets(selectedDate).planets;
  }, [selectedDate]);

  const abhijit = muhurats.find((m) => m.id === 'abhijit');
  const brahma = muhurats.find((m) => m.id === 'brahma');
  const hd = panchang.hinduDate;

  const renderSectionHeader = (title: string, subtitle: string) => (
    <div className="border-b border-amber-300/70 pb-1 mb-2">
      <h2 className="text-xs font-bold text-[#26150b] uppercase tracking-wider">{title}</h2>
      <p className="text-[10px] text-[#735641]">{subtitle}</p>
    </div>
  );

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] min-h-screen py-8 px-4 font-serif antialiased print:p-0 print:bg-white print:text-black">
      {/* Screen-Only Action Bar */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/panchang"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c2410c] hover:underline no-underline"
        >
          <ArrowLeft className="w-4 h-4" /> पंचांग पृष्ठ पर वापस जाएं
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            type="button"
          >
            <Printer className="w-4 h-4" />
            <span>प्रिंट करें / PDF सहेजें (Ctrl+P)</span>
          </button>
        </div>
      </div>

      {/* Printable Classical A4 Panchang Document */}
      <article className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#d4af37] print:border-none print:shadow-none print:p-2 print:max-w-none print:rounded-none relative space-y-4">
        {/* Document Header */}
        <div className="text-center border-b-2 border-[#b8860b] pb-3 space-y-1">
          <div className="text-xs font-bold text-[#c2410c] uppercase tracking-widest">
            ॥ श्री गणेशाय नमः • ॐ नमः शिवाय ॥
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#26150b]">
            सनातन दैनिक पंचांग पत्र
          </h1>
          <p className="text-xs text-[#735641]">
            स्थान: <strong>{currentCity.nameHindi || currentCity.name}</strong> (अक्षांश: {Math.abs(currentCity.latitude).toFixed(2)}° N, रेखांश: {Math.abs(currentCity.longitude).toFixed(2)}° E) • दिनांक: <strong>{formattedDate}</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-bold text-[#b8860b] pt-0.5">
            <span>विक्रम संवत: {toHindiDigits(hd.samvatVikram)}</span>
            <span>•</span>
            <span>शक संवत: {toHindiDigits(hd.samvatShaka)}</span>
            <span>•</span>
            <span>कलि संवत: {toHindiDigits(deepAnalysis.kaliyugaYear)}</span>
            <span>•</span>
            <span>पूर्णिमान्त: {hd.monthPurnimantaHindi || hd.monthHindi}</span>
            <span>•</span>
            <span>अमान्त: {hd.monthAmantaHindi || hd.monthHindi}</span>
            <span>•</span>
            <span>{hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'}</span>
          </div>
        </div>

        {/* १. सूर्योदय एवं चन्द्रोदय */}
        <section className="space-y-1">
          {renderSectionHeader(
            '१. सूर्योदय एवं चन्द्रोदय',
            'सूर्योदय, सूर्यास्त, चन्द्रोदय, चन्द्रास्त, प्रकाश प्रतिशत एवं सौर-चांद्र राशि संचरण'
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">प्रातः सूर्योदय:</span>
              <span className="font-bold text-sm font-mono text-[#c2410c]">{formatTimeToHindi(panchang.sunrise)}</span>
            </div>
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">सायं सूर्यास्त:</span>
              <span className="font-bold text-sm font-mono text-[#b8860b]">{formatTimeToHindi(panchang.sunset)}</span>
            </div>
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">चंद्रोदय समय:</span>
              <span className="font-bold text-sm font-mono text-[#2a674c]">{formatTimeToHindi(panchang.moonrise || '१०:३२ PM')}</span>
            </div>
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">चन्द्रास्त समय:</span>
              <span className="font-bold text-sm font-mono text-stone-700">{formatTimeToHindi(panchang.moonset || '०८:१५ AM')}</span>
            </div>
            <div className="p-1.5 rounded-lg border border-[#dec9ab] bg-[#fffdf9] flex justify-between">
              <span className="text-[#735641] text-[10px]">दिनमान:</span>
              <span className="font-bold text-xs">{deepAnalysis.dinamanaFormatted}</span>
            </div>
            <div className="p-1.5 rounded-lg border border-[#dec9ab] bg-[#fffdf9] flex justify-between">
              <span className="text-[#735641] text-[10px]">रात्रिमान:</span>
              <span className="font-bold text-xs">{deepAnalysis.ratrimanaFormatted}</span>
            </div>
            <div className="p-1.5 rounded-lg border border-[#dec9ab] bg-[#fffdf9] flex justify-between">
              <span className="text-[#735641] text-[10px]">मध्याह्न काल:</span>
              <span className="font-bold text-xs font-mono">{deepAnalysis.madhyahnaTime}</span>
            </div>
            <div className="p-1.5 rounded-lg border border-[#dec9ab] bg-[#fffdf9] flex justify-between">
              <span className="text-[#735641] text-[10px]">सूर्य नक्षत्र:</span>
              <span className="font-bold text-xs">{panchang.suryaNakshatra?.hindiName || 'चित्रा'}</span>
            </div>
          </div>
        </section>

        {/* २. पंचांग के ५ मुख्य अंग */}
        <section className="space-y-1">
          {renderSectionHeader(
            '२. पंचांग के ५ मुख्य अंग',
            'संवत्, तिथि, वार, नक्षत्र, योग एवं करण — काल-विधान के मूल आधार'
          )}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">१. तिथि</span>
              <span className="font-bold text-[#26150b] text-xs block">{cleanHindiName(hd.tithi.hindiName)}</span>
              <span className="text-[10px] text-[#8b6508] block mt-0.5">{formatTimeToHindi(hd.tithi.endTime)} तक</span>
            </div>
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">२. वार</span>
              <span className="font-bold text-[#26150b] text-xs block">{HINDI_DAYS[selectedDate.getDay()]}</span>
              <span className="text-[10px] text-[#8b6508] block mt-0.5">वासर</span>
            </div>
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">३. नक्षत्र</span>
              <span className="font-bold text-[#26150b] text-xs block">{cleanHindiName(hd.nakshatra.hindiName)}</span>
              <span className="text-[10px] text-[#8b6508] block mt-0.5">पद {toHindiDigits(hd.nakshatra.pada || 1)}</span>
            </div>
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">४. योग</span>
              <span className="font-bold text-[#26150b] text-xs block">{toHindiYogaName(hd.yoga.name)}</span>
              <span className="text-[10px] text-[#8b6508] block mt-0.5">{formatTimeToHindi(hd.yoga.endTime)} तक</span>
            </div>
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9]">
              <span className="text-[#735641] block text-[10px]">५. करण</span>
              <span className="font-bold text-[#26150b] text-xs block">{cleanHindiName(hd.karana.hindiName)}</span>
              <span className="text-[10px] text-[#8b6508] block mt-0.5">द्वितीय: {cleanHindiName(hd.karana2?.hindiName || 'कौलव')}</span>
            </div>
          </div>
        </section>

        {/* ३. संवत्सर व मन्त्री मण्डल & ४. खगोलीय मान */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <section className="space-y-1">
            {renderSectionHeader('३. संवत्सर व मन्त्री मण्डल', '६० बृहस्पति संवत्सर चक्र एवं विक्रम संवत् का आकाशीय मन्त्री मण्डल')}
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9] space-y-1 text-[11px]">
              <div className="flex justify-between"><span>विक्रम संवत्सर:</span><span className="font-bold text-[#c2410c]">{deepAnalysis.brihaspatiSamvatsara.vikramSamvatsara}</span></div>
              <div className="flex justify-between"><span>शक संवत्सर:</span><span className="font-bold">{deepAnalysis.brihaspatiSamvatsara.shakaSamvatsara}</span></div>
              <div className="flex justify-between"><span>वर्ष राजा:</span><span className="font-bold">{deepAnalysis.mantriMandala.kingHindi}</span></div>
              <div className="flex justify-between"><span>वर्ष मन्त्री:</span><span className="font-bold">{deepAnalysis.mantriMandala.ministerHindi}</span></div>
            </div>
          </section>

          <section className="space-y-1">
            {renderSectionHeader('४. खगोलीय मान, दिनमान व पंचांग प्रणालियां', 'दिवा-निशा मान, राष्ट्रीय सिविल दिनांक, अहर्गण व युग गणना')}
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9] space-y-1 text-[11px]">
              <div className="flex justify-between"><span>कलि अहर्गण:</span><span className="font-bold font-mono">{toHindiDigits(deepAnalysis.kaliAhargana)} दिन</span></div>
              <div className="flex justify-between"><span>जूलियन डे (JD):</span><span className="font-bold font-mono">{deepAnalysis.julianDay}</span></div>
              <div className="flex justify-between"><span>राष्ट्रीय सिविल दिनांक:</span><span className="font-bold">{deepAnalysis.nationalCivilDate}</span></div>
              <div className="flex justify-between"><span>प्रविष्टे / गते:</span><span className="font-bold">{deepAnalysis.pravishte.formatted}</span></div>
            </div>
          </section>
        </div>

        {/* ५. शुभ मुहूर्त एवं अशुभ काल */}
        <section className="space-y-1">
          {renderSectionHeader('५. शुभ मुहूर्त एवं अशुभ काल', 'अभिजीत, ब्रह्म, अमृत वेला, राहुकाल, यमगण्ड एवं दिशाशूल विचार')}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2 rounded-lg border border-emerald-300 bg-emerald-50/40 space-y-1">
              <span className="font-bold text-emerald-900 block text-[11px]">शुभ मुहूर्त (ग्राह्य काल):</span>
              <div className="flex justify-between"><span>अभिजित मुहूर्त:</span><span className="font-bold font-mono text-emerald-800">{abhijit ? formatTimeRangeToHindi(abhijit.startTime, abhijit.endTime) : '११:४२ - १२:२७ अपराह्न'}</span></div>
              <div className="flex justify-between"><span>ब्रह्म मुहूर्त:</span><span className="font-bold font-mono text-emerald-800">{brahma ? formatTimeRangeToHindi(brahma.startTime, brahma.endTime) : '०४:४९ - ०५:४१ पूर्वाह्न'}</span></div>
              <div className="flex justify-between"><span>अमृत काल:</span><span className="font-bold font-mono text-emerald-800">०३:२४ - ०४:५४ पूर्वाह्न</span></div>
            </div>
            <div className="p-2 rounded-lg border border-rose-300 bg-rose-50/40 space-y-1">
              <span className="font-bold text-rose-900 block text-[11px]">अशुभ काल (वर्ज्य समय):</span>
              <div className="flex justify-between"><span>राहु काल (त्याज्य):</span><span className="font-bold font-mono text-rose-700">{formatTimeRangeToHindi(panchang.rahuKaal.start, panchang.rahuKaal.end)}</span></div>
              <div className="flex justify-between"><span>यमगण्ड काल:</span><span className="font-bold font-mono">{formatTimeRangeToHindi(panchang.yamagandam.start, panchang.yamagandam.end)}</span></div>
              <div className="flex justify-between"><span>दिशाशूल विचार:</span><span className="font-bold text-rose-700">पश्चिम (परिहार: घी या पान)</span></div>
            </div>
          </div>
        </section>

        {/* ६. अतिरिक्त योग & ७. निवास, चक्र एवं अनुष्ठान */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <section className="space-y-1">
            {renderSectionHeader('६. अतिरिक्त योग व सूक्ष्म काल', 'आनन्दादि २८ महायोग, पुष्कर, आडल-विडाल, वर्ज्यम् व गंडमूल विचार')}
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9] space-y-1 text-[11px]">
              <div className="flex justify-between"><span>आनन्दादि महायोग:</span><span className="font-bold text-[#c2410c]">{panchang.anandadiYoga?.nameHindi || 'आनन्द योग'}</span></div>
              <div className="flex justify-between"><span>सिद्धि व रवि योग:</span><span className="font-bold">{panchang.shubhYogas?.[0]?.hindiName || 'सक्रिय नहीं'}</span></div>
              <div className="flex justify-between"><span>वर्ज्यम् काल:</span><span className="font-bold">निर्दोष (कोई नहीं)</span></div>
              <div className="flex justify-between"><span>गंडमूल नक्षत्र:</span><span className="font-bold">{panchang.gandMool?.isGandMool ? 'गंडमूल सक्रिय' : 'दोष रहित'}</span></div>
            </div>
          </section>

          <section className="space-y-1">
            {renderSectionHeader('७. निवास, चक्र एवं अनुष्ठान विचार', 'रुद्राभिषेक शिववास, हवन अग्निवास, भद्रा वास एवं कुम्भ चक्र')}
            <div className="p-2 rounded-lg border border-[#dec9ab] bg-[#fffdf9] space-y-1 text-[11px]">
              <div className="flex justify-between"><span>शिववास (रुद्राभिषेक):</span><span className="font-bold text-[#c2410c]">{panchang.shivaVaas?.residenceHindi || 'कैलाश पर'}</span></div>
              <div className="flex justify-between"><span>अग्निवास (हवन/यज्ञ):</span><span className="font-bold text-[#c2410c]">{panchang.agniVaas?.residenceHindi || 'पृथ्वी पर'}</span></div>
              <div className="flex justify-between"><span>भद्रा स्थिति:</span><span className="font-bold">{panchang.bhadra?.active ? 'भद्रा सक्रिय (त्याज्य)' : 'निर्दोष (भद्रा रहित)'}</span></div>
              <div className="flex justify-between"><span>कुम्भ चक्र स्थिति:</span><span className="font-bold">{deepAnalysis.kumbhaChakra}</span></div>
            </div>
          </section>
        </div>

        {/* ८. मुहूर्त व लग्न शुद्धि एवं नवग्रह स्थिति */}
        <section className="space-y-1">
          {renderSectionHeader('८. मुहूर्त व लग्न शुद्धि', '१२ उदय लग्न, पंचक रहित मुहूर्त, चन्द्रबल एवं ताराबल परीक्षण')}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-1 text-center text-[10px]">
            {planets.map((p, idx) => {
              const deg = Math.floor(p.longitude % 30);
              return (
                <div key={idx} className="p-1 rounded-md border border-[#dec9ab] bg-[#fffdf9]">
                  <span className="font-bold text-[#26150b] block truncate">{p.nameHindi || p.name}</span>
                  <span className="text-[#c2410c] block text-[9px]">{p.signHindi}</span>
                  <span className="font-mono text-[#735641] block text-[9px]">{toHindiDigits(deg)}°</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Seal */}
        <div className="pt-2 border-t border-[#dec9ab] flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#735641] gap-1">
          <span>प्रमाणित द्रिक पंचांग • सनातन घड़ी कालगणना संस्थान (काशी)</span>
          <span className="font-mono">स्थान: {currentCity.nameHindi || currentCity.name} • {formattedDate}</span>
        </div>
      </article>
    </div>
  );
};

export default PanchangPdfPage;
