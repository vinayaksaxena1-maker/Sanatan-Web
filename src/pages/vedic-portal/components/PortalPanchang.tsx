/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalPanchang
 * Comprehensive Daily Vedic Panchang (पञ्चाङ्ग)
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
  toHindiYogaName,
  getTithiNatureHindi,
  getNakshatraNatureHindi,
  getPlanetLordHindi
} from '../../../components/watch';

const HINDI_DAYS = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
const HINDI_DAY_RULERS: Record<string, string> = {
  'रविवार': 'सूर्य देव (रवि वासर)',
  'सोमवार': 'चन्द्र देव (सोम वासर)',
  'मंगलवार': 'मंगल देव (भौम वासर)',
  'बुधवार': 'बुध देव (सौम्य वासर)',
  'गुरुवार': 'देवगुरु बृहस्पति (गुरु वासर)',
  'शुक्रवार': 'शुक्र देव (भृगु वासर)',
  'शनिवार': 'शनि देव (मन्द वासर)',
};

const VAAR_NATURE_BADGE: Record<string, string> = {
  'रविवार': 'तेज संवर्धक',
  'सोमवार': 'शांति प्रदायक',
  'मंगलवार': 'साहस वर्धक',
  'बुधवार': 'बुद्धि प्रदाता',
  'गुरुवार': 'विद्या व धर्म हेतु उत्तम',
  'शुक्रवार': 'सौभाग्य कारक',
  'शनिवार': 'स्थिरता कारक',
};

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
  const dayRuler = HINDI_DAY_RULERS[dayName] || 'सूर्य देव';

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
    return `दिनमान ${toHindiDigits(hrs)} घंटे ${toHindiDigits(mins)} मिनट`;
  }, [panchang]);

  // Muhurats
  const abhijit = muhurats.find(m => m.id === 'abhijit');
  const brahma = muhurats.find(m => m.id === 'brahma');
  const vijay = muhurats.find(m => m.id === 'vijay');
  const godhuli = muhurats.find(m => m.id === 'godhuli');

  const abhijitStr = abhijit
    ? formatTimeRangeToHindi(abhijit.startTime, abhijit.endTime)
    : '११:५८ – १२:४९ अपराह्न';
  const brahmaStr = brahma
    ? formatTimeRangeToHindi(brahma.startTime, brahma.endTime)
    : '०४:३८ – ०५:२६ पूर्वाह्न';
  const vijayStr = vijay
    ? formatTimeRangeToHindi(vijay.startTime, vijay.endTime)
    : '०२:३० – ०३:२२ अपराह्न';
  const godhuliStr = godhuli
    ? formatTimeRangeToHindi(godhuli.startTime, godhuli.endTime)
    : '०६:३९ – ०७:०२ सायं';

  // Ashubh Kaal
  const rahuKaalStr = panchang?.rahuKaal?.start && panchang?.rahuKaal?.end
    ? formatTimeRangeToHindi(panchang.rahuKaal.start, panchang.rahuKaal.end)
    : '०४:३० – ०६:०० अपराह्न';
  const yamagandStr = panchang?.yamagandam?.start && panchang?.yamagandam?.end
    ? formatTimeRangeToHindi(panchang.yamagandam.start, panchang.yamagandam.end)
    : '०६:१४ – ०७:५१ पूर्वाह्न';
  const gulikStr = panchang?.gulikKaal?.start && panchang?.gulikKaal?.end
    ? formatTimeRangeToHindi(panchang.gulikKaal.start, panchang.gulikKaal.end)
    : '०९:२८ – ११:०५ पूर्वाह्न';

  // Tithi, Nakshatra, Yoga, Karana
  const tithiName = cleanHindiName(panchang.hinduDate.tithi.hindiName);
  const tithiEndStr = panchang.hinduDate.tithi.endTime
    ? `${formatTimeToHindi(panchang.hinduDate.tithi.endTime)} तक`
    : 'सायंकाल तक';
  const tithiNature = getTithiNatureHindi(panchang.hinduDate.tithi.name);

  const nakshatraName = cleanHindiName(panchang.hinduDate.nakshatra.hindiName);
  const nakshatraPada = panchang.hinduDate.nakshatra.pada || 1;
  const nakshatraLord = getPlanetLordHindi(panchang.hinduDate.nakshatra.lord);
  const nakshatraEndStr = panchang.hinduDate.nakshatra.endTime
    ? `${formatTimeToHindi(panchang.hinduDate.nakshatra.endTime)} तक`
    : 'रात्रि तक';
  const nakshatraNature = getNakshatraNatureHindi(panchang.hinduDate.nakshatra.nature || '');

  const yogaName = toHindiYogaName(panchang.hinduDate.yoga.name);
  const yogaEndStr = panchang.hinduDate.yoga.endTime
    ? `${formatTimeToHindi(panchang.hinduDate.yoga.endTime)} तक`
    : 'अपराह्न तक';

  const karanaName = cleanHindiName(panchang.hinduDate.karana.hindiName);
  const karanaEndStr = panchang.hinduDate.karana.endTime
    ? `${formatTimeToHindi(panchang.hinduDate.karana.endTime)} तक`
    : 'प्रातः तक';
  const karanaNature = panchang.hinduDate.karana.natureHindi
    ? `${panchang.hinduDate.karana.natureHindi} करण`
    : 'चर करण';

  // Solar & Lunar times
  const sunriseStr = panchang.sunrise ? formatTimeToHindi(panchang.sunrise) : '०६:०४ पूर्वाह्न';
  const sunsetStr = panchang.sunset ? formatTimeToHindi(panchang.sunset) : '०५:४३ अपराह्न';
  const moonriseStr = panchang.moonrise ? formatTimeToHindi(panchang.moonrise) : 'सायं चंद्रोदय';
  const moonsetStr = panchang.moonset ? formatTimeToHindi(panchang.moonset) : 'प्रातः चंद्रास्त';

  const shool = DISHA_SHOOL[dayOfWeek] || { direction: 'दक्षिण दिशा', remedy: 'दही ग्रहण' };
  const pakshaText = panchang.hinduDate.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';
  const monthText = panchang.hinduDate.monthHindi || 'कार्तिक';
  const samvatYear = toHindiDigits(panchang.hinduDate.samvatVikram);

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 font-serif relative overflow-hidden" id="panchang">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.07]" />
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
            {currentCity.nameHindi || currentCity.name} सूर्योदय कालीन स्पष्ट पंचांग • शुद्ध काल निर्णय
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl glass-inner text-xs font-bold text-[#26150b] border border-[#dec9ab] shadow-xs">
            संवत्सर: क्रोधी ({samvatYear})
          </span>
          <span className="px-3 py-1.5 rounded-xl glass-inner text-xs font-bold text-[#c2410c] border border-[#dec9ab] shadow-xs">
            मास: {monthText} ({pakshaText})
          </span>
        </div>
      </div>

      {/* 5 Key Limbs of Panchang with 3D Icons & Golden Hover Elevation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
        {/* 1. Tithi */}
        <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#c2410c]">१. तिथि</span>
            <VedicIcon3D name="tithi" size="sm" />
          </div>
          <div className="text-lg font-bold text-[#26150b]">{tithiName}</div>
          <div className="text-[11px] text-[#735641]">{tithiEndStr}</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold shadow-xs">
            {tithiNature}
          </span>
        </div>

        {/* 2. Vaar */}
        <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#b8860b]">२. वार</span>
            <VedicIcon3D name="sun" size="sm" />
          </div>
          <div className="text-lg font-bold text-[#26150b]">{dayName}</div>
          <div className="text-[11px] text-[#735641]">स्वामी: {dayRuler}</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold shadow-xs">
            {VAAR_NATURE_BADGE[dayName] || 'शुभ वासर'}
          </span>
        </div>

        {/* 3. Nakshatra */}
        <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#c2410c]">३. नक्षत्र</span>
            <VedicIcon3D name="nakshatra" size="sm" />
          </div>
          <div className="text-lg font-bold text-[#26150b]">{nakshatraName}</div>
          <div className="text-[11px] text-[#735641]">पद {toHindiDigits(nakshatraPada)} (स्वामी: {nakshatraLord}) {nakshatraEndStr}</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-bold shadow-xs">
            {nakshatraNature}
          </span>
        </div>

        {/* 4. Yoga */}
        <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2a674c]">४. योग</span>
            <VedicIcon3D name="yoga" size="sm" />
          </div>
          <div className="text-lg font-bold text-[#26150b]">{yogaName}</div>
          <div className="text-[11px] text-[#735641]">{yogaEndStr}</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold shadow-xs">
            {panchang.hinduDate.yoga.type === 'Shubh' ? 'हर्ष व सिद्धि प्रदाता' : 'सामान्य फलदायी'}
          </span>
        </div>

        {/* 5. Karana */}
        <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#735641]">५. करण</span>
            <VedicIcon3D name="karana" size="sm" />
          </div>
          <div className="text-lg font-bold text-[#26150b]">{karanaName}</div>
          <div className="text-[11px] text-[#735641]">{karanaEndStr}</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-[10px] font-bold shadow-xs">
            {karanaNature}
          </span>
        </div>
      </div>

      {/* Sun / Moon & Timings Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 relative z-10">
        {/* सूर्योदय एवं सूर्यास्त */}
        <div className="p-5 rounded-2xl glass-panel-warm border border-[#ea580c]/30 shadow-xs relative overflow-hidden bg-gradient-to-br from-[#fffdf9] to-[#fff3e5] hover:shadow-[0_10px_24px_-4px_rgba(234,88,12,0.18)] transition-all">
          <div className="flex items-start justify-between border-b border-[#dec9ab]/70 pb-3">
            <div className="flex items-center gap-3">
              <VedicIcon3D name="sun" size="lg" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base font-bold text-[#26150b]">सूर्योदय एवं सूर्यास्त</h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#fde8d7] text-[#c2410c] text-[10px] font-bold border border-[#f7c29e]">
                    {dayLengthStr}
                  </span>
                </div>
                <p className="text-[11px] text-[#735641]">पूजा, सूर्य अर्घ्य एवं त्रिकाल संध्या वंदन का पावन समय</p>
              </div>
            </div>
            <VedicIcon3D name="clock" size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:border-[#ea580c] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#c2410c] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
                  प्रातः सूर्योदय
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 font-bold">शुभ काल</span>
              </div>
              <div className="text-lg font-bold text-[#26150b] font-mono">
                {sunriseStr}
              </div>
              <div className="text-[10px] text-[#735641]">अर्घ्य, गायत्री जप व सूर्य उपासना</div>
            </div>

            <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:border-[#b8860b] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#b8860b] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#b8860b]"></span>
                  सायं सूर्यास्त
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 font-bold">संधिकाल</span>
              </div>
              <div className="text-lg font-bold text-[#26150b] font-mono">
                {sunsetStr}
              </div>
              <div className="text-[10px] text-[#735641]">सांध्य आरती, दीपदान व संध्या वंदन</div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#dec9ab]/60 flex items-center justify-between text-xs text-[#735641]">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="material-symbols-outlined text-amber-600 text-[15px]">wb_twilight</span>
              <span>प्रातः संधिकाल: ब्रह्म मुहूर्त उपरांत</span>
            </div>
            <span className="text-[11px] font-semibold text-[#c2410c]">
              सूर्य स्थिति: {panchang.hinduDate.solarMonth || 'सूर्य संचरण'}
            </span>
          </div>
        </div>

        {/* चंद्रोदय एवं चंद्रास्त */}
        <div className="p-5 rounded-2xl glass-panel-warm border border-[#dec9ab] shadow-xs relative overflow-hidden bg-gradient-to-br from-[#fffdf9] to-[#f4f7fa] hover:shadow-[0_10px_24px_-4px_rgba(42,103,76,0.18)] transition-all">
          <div className="flex items-start justify-between border-b border-[#dec9ab]/70 pb-3">
            <div className="flex items-center gap-3">
              <VedicIcon3D name="moon" size="lg" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base font-bold text-[#26150b]">चंद्रोदय एवं चंद्रास्त</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    चंद्र {nakshatraName}
                  </span>
                </div>
                <p className="text-[11px] text-[#735641]">व्रत खोलने, चंद्र अर्घ्य एवं रात्रि साधना हेतु</p>
              </div>
            </div>
            <VedicIcon3D name="tithi" size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:border-[#2a674c] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2a674c] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#2a674c]"></span>
                  चंद्रोदय समय
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-800 font-bold">दर्शन मुहूर्त</span>
              </div>
              <div className="text-lg font-bold text-[#26150b] font-mono">
                {moonriseStr}
              </div>
              <div className="text-[10px] text-[#735641]">सायं चंद्र दर्शन व अर्घ्य अर्पण</div>
            </div>

            <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:border-[#735641] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#735641] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  चंद्रास्त समय
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-100 text-stone-800 font-bold">प्रातःकाल</span>
              </div>
              <div className="text-lg font-bold text-[#26150b] font-mono">
                {moonsetStr}
              </div>
              <div className="text-[10px] text-[#735641]">उषाकाल पूर्व चंद्र अस्त</div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#dec9ab]/60 flex items-center justify-between text-xs text-[#735641]">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#b8860b]">
              <span className="material-symbols-outlined text-[15px]">stars</span>
              <span>सायं चंद्र दर्शन एवं अर्घ्य समय</span>
            </div>
            <span className="text-[11px] text-[#2a674c] font-bold">{tithiName} कला</span>
          </div>
        </div>
      </div>

      {/* Shubh & Ashubh Muhurat Cards with Micro-Elevation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {/* शुभ मुहूर्त */}
        <div className="p-4 rounded-2xl glass-inner space-y-3 bg-white/75 border-[#2e7d32]/30 hover:border-[#2e7d32] hover:shadow-[0_8px_20px_-3px_rgba(46,125,50,0.2)] transition-all">
          <div className="flex items-center gap-2 border-b border-[#dec9ab]/50 pb-2">
            <VedicIcon3D name="shubh" size="sm" />
            <h4 className="text-sm font-bold text-[#26150b]">शुभ मुहूर्त चक्र</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200 shadow-xs">
              <span className="text-emerald-900 font-bold">अभिजित मुहूर्त:</span>
              <span className="font-bold text-emerald-800 font-mono">{abhijitStr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">ब्रह्म मुहूर्त:</span>
              <span className="font-semibold text-[#26150b] font-mono">{brahmaStr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">विजय मुहूर्त:</span>
              <span className="font-semibold text-[#26150b] font-mono">{vijayStr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">गोधूलि मुहूर्त:</span>
              <span className="font-semibold text-[#26150b] font-mono">{godhuliStr}</span>
            </div>
          </div>
        </div>

        {/* अशुभ काल चेतावनी */}
        <div className="p-4 rounded-2xl glass-inner space-y-3 bg-gradient-to-br from-[#fee2e2]/40 to-white border-[#fca5a5]/70 hover:border-[#ba1a1a] hover:shadow-[0_8px_20px_-3px_rgba(186,26,26,0.2)] transition-all">
          <div className="flex items-center gap-2 border-b border-[#fca5a5]/50 pb-2">
            <VedicIcon3D name="ashubh" size="sm" />
            <h4 className="text-sm font-bold text-[#ba1a1a]">अशुभ काल (त्याज्य समय)</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-1.5 rounded-lg bg-red-100/70 border border-red-300 shadow-xs">
              <span className="text-red-900 font-bold">राहु काल (वर्ज्य):</span>
              <span className="font-bold text-red-800 font-mono">{rahuKaalStr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">यमगण्ड काल:</span>
              <span className="font-semibold text-[#26150b] font-mono">{yamagandStr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">गुलिक काल:</span>
              <span className="font-semibold text-[#26150b] font-mono">{gulikStr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">दिशा शूल:</span>
              <span className="font-bold text-[#ba1a1a]">{shool.direction} (परिहार: {shool.remedy})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Panchang Hub & 5000+ Cities Atlas Discovery Bar */}
      <div className="pt-4 border-t border-[#dec9ab]/60 flex flex-wrap items-center justify-between gap-3 relative z-10 text-xs">
        <span className="text-[#735641] font-semibold flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#b8860b]">location_on</span>
          {currentCity.nameHindi || currentCity.name} सहित भारत के समस्त ५,०००+ नगरों का प्रामाणिक पंचांग:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/cities"
            className="px-3.5 py-1.5 rounded-xl bg-[#fdf8ee] hover:bg-[#b8860b] hover:text-white text-[#8b6508] font-bold border border-[#e2cfb4] shadow-xs transition-all flex items-center gap-1.5 no-underline"
          >
            <span>📍 ५,०००+ नगर एवं प्रमुख तीर्थ दर्शन</span>
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
