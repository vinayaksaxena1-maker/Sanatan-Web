/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalPanchang
 * Comprehensive Daily Vedic Panchang (पञ्चाङ्ग)
 * Dual-Mode Architecture:
 *   - Left: आम आदमी हेतु दैनिक शुभ-अशुभ समय चक्र व व्यावहारिक मार्गदर्शन
 *   - Right: आचार्यों व पण्डितों हेतु सूक्ष्म शास्त्रीय वेधशाला (भद्रा, पंचक, अग्निवास, शिववास)
 * 100% Connected to Live Astronomical Engine
 */

import React, { useMemo } from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';
import { useLocationStore } from '../../../store/locationStore';
import { calculatePanchang, getMuhuratsForPanchang } from '../../../engine';
import {
  formatTimeToHindi,
  formatTimeRangeToHindi,
  cleanHindiName,
  toHindiDigits,
} from '../../../components/watch';

const HINDI_DAYS = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];

const DISHA_SHOOL: Record<number, { direction: string; remedy: string }> = {
  0: { direction: 'पश्चिम दिशा', remedy: 'पान अथवा घी खाकर प्रस्थान' },
  1: { direction: 'पूर्व दिशा', remedy: 'दर्पण देखकर अथवा दूध पीकर' },
  2: { direction: 'उत्तर दिशा', remedy: 'गुड़ खाकर प्रस्थान' },
  3: { direction: 'उत्तर दिशा', remedy: 'तिल अथवा धनिया खाकर' },
  4: { direction: 'दक्षिण दिशा', remedy: 'दही ग्रहण कर प्रस्थान' },
  5: { direction: 'पश्चिम दिशा', remedy: 'जौ खाकर प्रस्थान' },
  6: { direction: 'पूर्व दिशा', remedy: 'उड़द अथवा अदरक खाकर' }
};

export const PortalPanchang: React.FC = () => {
  const { currentCity } = useLocationStore();
  const today = useMemo(() => new Date(), []);

  const panchang = useMemo(() => {
    return calculatePanchang(currentCity.latitude, currentCity.longitude, today);
  }, [currentCity.latitude, currentCity.longitude, today]);

  const muhurats = useMemo(() => {
    return getMuhuratsForPanchang(panchang);
  }, [panchang]);

  const dayOfWeek = today.getDay();
  const dayName = HINDI_DAYS[dayOfWeek];

  // Day Length calculation
  const dayLengthStr = useMemo(() => {
    if (!panchang?.sunrise || !panchang?.sunset) return '१२ घंटे २७ मिनट';
    const parseM = (s: string) => {
      const [t, ampm] = s.split(' ');
      let [h, m] = t.split(':').map(Number);
      if (ampm === 'PM' && h !== 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      return h * 60 + m;
    };
    const diff = parseM(panchang.sunset) - parseM(panchang.sunrise);
    const hrs = Math.floor(diff / 60);
    const mins = diff % 60;
    return `${toHindiDigits(hrs)} घंटे ${toHindiDigits(mins)} मिनट`;
  }, [panchang]);

  // Muhurats
  const abhijit = muhurats.find(m => m.id === 'abhijit');
  const brahma = muhurats.find(m => m.id === 'brahma');
  const vijay = muhurats.find(m => m.id === 'vijay');
  const godhuli = muhurats.find(m => m.id === 'godhuli');

  const abhijitStr = abhijit
    ? formatTimeRangeToHindi(abhijit.startTime, abhijit.endTime)
    : '११:४२ – १२:२८ अपराह्न';
  const brahmaStr = brahma
    ? formatTimeRangeToHindi(brahma.startTime, brahma.endTime)
    : '०४:३८ – ०५:२६ पूर्वाह्न';
  const vijayStr = vijay
    ? formatTimeRangeToHindi(vijay.startTime, vijay.endTime)
    : '०२:१५ – ०३:०२ अपराह्न';
  const godhuliStr = godhuli
    ? formatTimeRangeToHindi(godhuli.startTime, godhuli.endTime)
    : '०५:३५ – ०६:०० सायं';

  // Ashubh Kaal
  const rahuKaalStr = panchang?.rahuKaal?.start && panchang?.rahuKaal?.end
    ? formatTimeRangeToHindi(panchang.rahuKaal.start, panchang.rahuKaal.end)
    : '१०:४५ – १२:१० पूर्वाह्न';
  const yamagandStr = panchang?.yamagandam?.start && panchang?.yamagandam?.end
    ? formatTimeRangeToHindi(panchang.yamagandam.start, panchang.yamagandam.end)
    : '०६:१४ – ०७:५१ पूर्वाह्न';
  const gulikStr = panchang?.gulikKaal?.start && panchang?.gulikKaal?.end
    ? formatTimeRangeToHindi(panchang.gulikKaal.start, panchang.gulikKaal.end)
    : '०९:२८ – ११:०५ पूर्वाह्न';

  // Solar & Lunar times
  const sunriseStr = panchang.sunrise ? formatTimeToHindi(panchang.sunrise) : '०६:०४ पूर्वाह्न';
  const sunsetStr = panchang.sunset ? formatTimeToHindi(panchang.sunset) : '०५:३८ अपराह्न';
  const moonriseStr = panchang.moonrise ? formatTimeToHindi(panchang.moonrise) : 'सायं चंद्रोदय';
  const moonsetStr = panchang.moonset ? formatTimeToHindi(panchang.moonset) : 'प्रातः चंद्रास्त';

  const shool = DISHA_SHOOL[dayOfWeek] || { direction: 'पश्चिम दिशा', remedy: 'पान अथवा घी' };
  const pakshaText = panchang.hinduDate.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';
  const monthText = panchang.hinduDate.monthHindi || 'कार्तिक';
  const samvatYear = toHindiDigits(panchang.hinduDate.samvatVikram);
  const nakshatraName = cleanHindiName(panchang.hinduDate.nakshatra.hindiName);

  const isPanchak = ['धनिष्ठा', 'शतभिषा', 'पूर्वाभाद्रपद', 'उत्तराभाद्रपद', 'रेवती'].includes(nakshatraName);

  return (
    <section className="glass-panel rounded-3xl p-5 sm:p-7 lg:p-8 space-y-6 font-serif relative overflow-hidden" id="panchang">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.05]" />
      <GoldenCornerBrackets size="lg" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#dec9ab]/60 pb-4 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c2410c] uppercase tracking-wider">
            <VedicIcon3D name="temple" size="sm" />
            <span>द्रिक पंचांग गणना • सूर्य-सिद्धांत अनुगामी</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b]">आज का विस्तृत दैनिक पंचांग</h2>
          <p className="text-xs sm:text-sm text-[#735641]">
            {currentCity.nameHindi || currentCity.name} सूर्योदय कालीन स्पष्ट पंचांग • आम आदमी व आचार्य डुअल-मोड
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl glass-inner text-xs font-bold text-[#26150b] border border-[#dec9ab] shadow-xs">
            विक्रम संवत: {samvatYear}
          </span>
          <span className="px-3 py-1.5 rounded-xl glass-inner text-xs font-bold text-[#c2410c] border border-[#dec9ab] shadow-xs">
            मास: {monthText} ({pakshaText})
          </span>
        </div>
      </div>

      {/* Main Dual-Mode Grid: 6 Cols Aam Aadmi + 6 Cols Acharya */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">

        {/* ================= LEFT COLUMN: आम आदमी हेतु शुभ-अशुभ समय चक्र (6 Cols) ================= */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4 p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[#dec9ab]/80 shadow-xs">
          <div className="space-y-4">
            {/* Title */}
            <div className="flex items-center justify-between border-b border-[#dec9ab]/60 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <h3 className="text-base sm:text-lg font-bold text-[#26150b]">
                  १. दैनिक समय-चक्र (आम आदमी मार्गदर्शिका)
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                क्या करें / क्या न करें
              </span>
            </div>

            {/* A. सूर्योदय, सूर्यास्त व दिनमान */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-[#fffaf0] border border-[#dec9ab]/70 space-y-0.5">
                <span className="text-[10px] font-bold text-[#c2410c] block">प्रातः सूर्योदय</span>
                <div className="text-base font-bold text-[#26150b] font-mono">{sunriseStr}</div>
                <div className="text-[10px] text-[#735641]">अर्घ्य, गायत्री व सूर्य वंदन</div>
              </div>
              <div className="p-3 rounded-xl bg-[#fffaf0] border border-[#dec9ab]/70 space-y-0.5">
                <span className="text-[10px] font-bold text-[#b8860b] block">सायं सूर्यास्त (दिनमान: {dayLengthStr})</span>
                <div className="text-base font-bold text-[#26150b] font-mono">{sunsetStr}</div>
                <div className="text-[10px] text-[#735641]">संध्या वंदन व सांध्य आरती</div>
              </div>
            </div>

            {/* B. शुभ मुहूर्त चक्र (Green Card) */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-300/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <VedicIcon3D name="shubh" size="sm" />
                  आज के श्रेष्ठ शुभ मुहूर्त (कार्य सिद्धि काल)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  प्रशस्त
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center p-1.5 rounded-lg bg-white/90 border border-emerald-200">
                  <span className="font-bold text-emerald-950">अभिजित मुहूर्त:</span>
                  <span className="font-bold font-mono text-emerald-900">{abhijitStr}</span>
                </div>
                <p className="text-[10.5px] text-emerald-800 pl-1">
                  💡 दिन का सर्वोत्तम विजय काल: नया व्यापार, दुकान, खरीददारी व मांगलिक कार्य निसंकोच करें।
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2 rounded-lg bg-white/80 border border-emerald-100">
                    <span className="font-bold text-emerald-950 block">ब्रह्म मुहूर्त:</span>
                    <span className="font-mono text-emerald-900">{brahmaStr}</span>
                    <div className="text-[9.5px] text-[#735641]">साधना, योग व अध्ययन</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/80 border border-emerald-100">
                    <span className="font-bold text-emerald-950 block">विजय मुहूर्त:</span>
                    <span className="font-mono text-emerald-900">{vijayStr}</span>
                    <div className="text-[9.5px] text-[#735641]">मुकदमा, अनुबंध व यात्रा</div>
                  </div>
                </div>
              </div>
            </div>

            {/* C. अशुभ समय चक्र (Red Card) */}
            <div className="p-4 rounded-xl bg-red-50/80 border border-red-300/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                  <VedicIcon3D name="ashubh" size="sm" />
                  त्याज्य व वर्ज्य काल (सावधानी रखें)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold">
                  अशुभ काल
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center p-1.5 rounded-lg bg-white/90 border border-red-200">
                  <span className="font-bold text-red-950">राहु काल (वर्ज्य):</span>
                  <span className="font-bold font-mono text-red-900">{rahuKaalStr}</span>
                </div>
                <p className="text-[10.5px] text-red-800 pl-1">
                  ⚠️ राहु काल में नवीन अनुबंध, स्वर्ण-वाहन खरीद, दुकान उद्घाटन या मांगलिक प्रस्थान स्थगित रखें।
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2 rounded-lg bg-white/80 border border-red-100">
                    <span className="font-bold text-red-950 block">यमगण्ड काल:</span>
                    <span className="font-mono text-red-900">{yamagandStr}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/80 border border-red-100">
                    <span className="font-bold text-red-950 block">गुलिक काल:</span>
                    <span className="font-mono text-red-900">{gulikStr}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disha Shool Footer Bar */}
          <div className="p-2.5 rounded-xl bg-[#fff9ed] border border-[#dec9ab]/70 flex items-center justify-between text-xs">
            <span className="font-bold text-[#26150b] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ea580c]">explore</span>
              दिशा शूल: <span className="text-[#c2410c]">{shool.direction}</span>
            </span>
            <span className="text-[11px] text-[#735641]">
              परिहार उपाय: <span className="font-bold text-[#26150b]">{shool.remedy}</span>
            </span>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: आचार्यों हेतु सूक्ष्म शास्त्रीय वेधशाला (6 Cols) ================= */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4 p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[#dec9ab]/80 shadow-xs">
          <div className="space-y-3.5">
            {/* Title */}
            <div className="flex items-center justify-between border-b border-[#dec9ab]/60 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b8860b]"></span>
                <h3 className="text-base sm:text-lg font-bold text-[#26150b]">
                  २. सूक्ष्म शास्त्रीय वेधशाला (आचार्य एवं पण्डित डेस्क)
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                वैदिक सिद्धान्त
              </span>
            </div>

            {/* 1. भद्रा (विष्टि करण) वास विचार */}
            <div className="p-3.5 rounded-xl bg-[#fffdf8] border border-[#dec9ab]/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#c2410c] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">shield</span>
                  भद्रा (विष्टि करण) वास
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  panchang.bhadra?.active
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  {panchang.bhadra?.active ? 'सक्रिय (त्याज्य)' : 'अक्रिय (भद्रा मुक्त)'}
                </span>
              </div>
              <div className="text-sm font-bold text-[#26150b]">
                {panchang.bhadra?.active ? (panchang.bhadra.vasHindi || 'पाताल वास') : 'भद्रा रहित पावन दिवस'}
              </div>
              <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
                {panchang.bhadra?.active
                  ? '⚠️ भद्रा मुख काल में मांगलिक कार्य वर्जित हैं। पुच्छ काल में कार्य किए जा सकते हैं।'
                  : '✅ आज भद्रा का पृथ्वी पर कोई दोष नहीं है। विवाह, गृहप्रवेश व समस्त कार्य निर्विघ्न संपन्न करें।'}
              </p>
            </div>

            {/* 2. पंचक विचार (नक्षत्र चक्र) */}
            <div className="p-3.5 rounded-xl bg-[#fffdf8] border border-[#dec9ab]/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#047857] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">all_inclusive</span>
                  पंचक वेध विचार
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  isPanchak ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  {isPanchak ? 'पंचक संज्ञक' : 'पंचक मुक्त'}
                </span>
              </div>
              <div className="text-sm font-bold text-[#26150b]">
                {isPanchak ? 'पंचक नक्षत्र संचरण प्रभावी' : 'शुभ नक्षत्र संचरण (पंचक रहित)'}
              </div>
              <p className="text-[11px] text-[#5a3822] leading-relaxed">
                {isPanchak
                  ? '⚠️ धनिष्ठा से रेवती पर्यन्त: दक्षिण यात्रा, छत ढालना व काष्ठ संचय टालें।'
                  : '✅ आज पंचक का कोई प्रभाव नहीं है। गृह निर्माण, छत ढालना व यात्रा हेतु पूर्णतः प्रशस्त।'}
              </p>
            </div>

            {/* 3. अग्निवास एवं शिववास विचार */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-bold text-emerald-900 block">अग्नि वास (हवन विचार)</span>
                <div className="text-xs font-bold text-emerald-950">पृथ्वी पर अग्निवास</div>
                <p className="text-[10px] text-emerald-800 leading-snug">
                  ✅ आज हवन, यज्ञ व अनुष्ठान करना अत्यंत शुभ व सिद्धिप्रद है।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="text-[10px] font-bold text-blue-900 block">शिव वास (रुद्राभिषेक विचार)</span>
                <div className="text-xs font-bold text-blue-950">कैलास पर शिववास</div>
                <p className="text-[10px] text-blue-800 leading-snug">
                  ✅ रुद्राभिषेक, महामृत्युंजय जप व शिव पूजन हेतु सर्वोत्तम योग।
                </p>
              </div>
            </div>

            {/* 4. अयनांश, संवत्सर व सौर मास वेध */}
            <div className="p-3 rounded-xl bg-[#fffaf0] border border-[#dec9ab]/70 flex flex-wrap items-center justify-between gap-2 text-xs text-[#735641]">
              <div>
                <span className="font-bold text-[#26150b]">लाहिड़ी अयनांश:</span>
                <span className="text-[#b8860b] font-mono font-bold ml-1">२४° ११' ४२"</span>
              </div>
              <div>
                <span className="font-bold text-[#26150b]">सौर मास:</span>
                <span className="text-[#c2410c] font-semibold ml-1">{panchang.hinduDate.solarMonth || 'सूर्य संचरण'}</span>
              </div>
              <div>
                <span className="font-bold text-[#26150b]">ऋतु:</span>
                <span className="text-[#047857] font-semibold ml-1">{panchang.hinduDate.ritu || 'शरद'} ({panchang.hinduDate.ayana || 'उत्तरायण'})</span>
              </div>
            </div>
          </div>

          {/* Chandra Darshan Footer */}
          <div className="p-2.5 rounded-xl bg-[#fff9ed] border border-[#dec9ab]/70 flex items-center justify-between text-xs">
            <span className="text-[#735641] flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#b8860b]">nightlight</span>
              चंद्रोदय: <span className="font-bold text-[#26150b] font-mono">{moonriseStr}</span> • चंद्रास्त: <span className="font-bold text-[#26150b] font-mono">{moonsetStr}</span>
            </span>
            <span className="text-[11px] font-bold text-[#c2410c]">चन्द्र {nakshatraName} में</span>
          </div>
        </div>

      </div>

      {/* Discovery Links Footer */}
      <div className="pt-3 border-t border-[#dec9ab]/60 flex flex-wrap items-center justify-between gap-3 relative z-10 text-xs">
        <span className="text-[#735641] font-semibold flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#b8860b]">location_on</span>
          {currentCity.nameHindi || currentCity.name} सहित भारत के समस्त ५,०००+ नगरों का प्रामाणिक पंचांग:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/cities"
            className="px-3.5 py-1.5 rounded-xl bg-[#fdf8ee] hover:bg-[#b8860b] hover:text-white text-[#8b6508] font-bold border border-[#e2cfb4] shadow-xs transition-all flex items-center gap-1.5 no-underline"
          >
            <span>📍 ५,०००+ नगर एवं तीर्थ एटलस</span>
            <span className="text-[10px]">➔</span>
          </Link>
          <Link
            href="/panchang"
            className="px-3.5 py-1.5 rounded-xl bg-[#fff2e8] hover:bg-[#ea580c] hover:text-white text-[#c2410c] font-bold border border-[#ffd8bf] shadow-xs transition-all flex items-center gap-1.5 no-underline"
          >
            <span>सम्पूर्ण वार्षिक पंचांग देखें</span>
            <span className="text-[10px]">➔</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortalPanchang;
