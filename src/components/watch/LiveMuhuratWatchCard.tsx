import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { AnalogClock } from './AnalogClock';
import type { ChoghadiyaInterval, HoraInterval } from '../../engine/types';

interface CityInfo {
  nameHindi: string;
  latitude: number;
  longitude: number;
}

interface SelectedSlotInfo {
  type: 'choghadiya' | 'hora';
  name: string;
  startTime: string;
  endTime: string;
  quality: string;
  desc: string;
  dot: string;
}

interface LiveMuhuratWatchCardProps {
  clockTime: Date;
  currentTimeStr: string;
  choghadiyaList: ChoghadiyaInterval[];
  activeChoghadiyaIndex: number;
  horaList: HoraInterval[];
  activeHora: HoraInterval | null;
  sunriseTimeStr: string;
  sunsetTimeStr: string;
  currentCity: CityInfo;
}

// ---------------------------------------------------------------------------
// Astronomical & Astrological Interpretation Helpers
// ---------------------------------------------------------------------------

export const getChoghadiyaStatusInfo = (type?: string) => {
  switch (type) {
    case 'Amrit':
      return { dot: '🟢', label: 'सर्वोत्तम समय', badgeBg: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30' };
    case 'Shubh':
      return { dot: '🟢', label: 'शुभ समय', badgeBg: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30' };
    case 'Labh':
      return { dot: '🟢', label: 'शुभ समय (लाभकारी)', badgeBg: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30' };
    case 'Chal':
    case 'Char':
      return { dot: '🟡', label: 'सामान्य समय', badgeBg: 'bg-amber-500/15 text-amber-700 border-amber-500/30' };
    case 'Rog':
    case 'Kaal':
    case 'Udveg':
      return { dot: '🔴', label: 'अशुभ समय', badgeBg: 'bg-rose-500/15 text-rose-700 border-rose-500/30' };
    default:
      return { dot: '🟡', label: 'सामान्य समय', badgeBg: 'bg-slate-500/15 text-slate-700 border-slate-500/30' };
  }
};

export const getChoghadiyaAdvice = (type: string) => {
  const map: Record<string, string> = {
    Amrit: 'यह अत्यंत शुभ और उन्नतिदायक समय है। इस अवधि में किए गए मांगलिक कार्य अत्यंत सफल सिद्ध होते हैं।',
    Labh: 'यह अत्यंत शुभ और धन-लाभदायक समय है। नए उद्यम, व्यापारिक सौदे या निवेश के लिए श्रेष्ठ काल है।',
    Shubh: 'यह एक अत्यंत मंगलकारी समय है। कोई भी पारिवारिक मांगलिक कार्य, देव पूजन या नया संकल्प करने के लिए सर्वोत्तम है।',
    Chal: 'यह एक गतिशील और सामान्य समय है। यात्रा शुरू करने, वाहन क्रय करने या दैनिक कार्य निपटाने के लिए अनुकूल है।',
    Char: 'यह एक गतिशील और सामान्य समय है। यात्रा शुरू करने, वाहन क्रय करने या दैनिक कार्य निपटाने के लिए अनुकूल है।',
    Kaal: 'यह राहु के प्रभाव वाला अशुभ समय है। नए कार्यों का आरंभ न करें, विवाद और जोखिम से बचें।',
    Rog: 'यह अशुभ चौघड़िया माना जाता है। इस अवधि में मांगलिक कार्य या नए निवेश की शुरुआत वर्जित है।',
    Udveg: 'यह उद्वेग कारक समय मानसिक अशांति दे सकता है। विशेष प्रशासनिक कार्यों के अतिरिक्त शुभ कार्यों को टालें।'
  };
  return map[type] || 'सामान्य काल। नियमित दैनिक कार्य किए जा सकते हैं।';
};

export const getChoghadiyaUpyuktKarya = (type: string, isNight: boolean = false) => {
  if (isNight) {
    const nightMap: Record<string, string> = {
      Amrit: 'आध्यात्मिक साधना, भगवत्-स्मरण, गंभीर पठन-पाठन, मानसिक शांति व विश्राम।',
      Labh: 'डिजिटल कार्य, आगामी दिन की व्यावसायिक योजना, हिसाब-किताब व रचनात्मक चिंतन।',
      Shubh: 'पारिवारिक सौहार्द, अध्ययन, शुभ संकल्प, शांत निद्रा व विश्राम।',
      Chal: 'यात्रा या सफ़र, आगामी दिन की कार्ययोजना व सामान पैकिंग, सामान्य कार्य।',
      Char: 'यात्रा या सफ़र, आगामी दिन की कार्ययोजना व सामान पैकिंग, सामान्य कार्य।',
      Kaal: 'विश्राम व निद्रा। अनावश्यक सोच-विचार व देर रात तक जागने से बचें।',
      Rog: 'शारीरिक विश्राम व गहरी नींद। स्वास्थ्य लाभ हेतु समय पर शयन करें।',
      Udveg: 'मानसिक शांति हेतु ध्यान व शयन। देर रात वाद-विवाद या तनाव से बचें।'
    };
    return nightMap[type] || 'विश्राम व सामान्य कार्य।';
  }

  const dayMap: Record<string, string> = {
    Amrit: 'धार्मिक, मांगलिक व आध्यात्मिक कार्य, यज्ञ-अनुष्ठान, नया कार्य प्रारंभ।',
    Labh: 'व्यापारिक शुरुआत, नया निवेश, नौकरी प्रारंभ, आर्थिक लेन-देन।',
    Shubh: 'शुभ संस्कार, गृह प्रवेश, विवाह चर्चा, पारिवारिक मंगल कार्य, देव पूजन।',
    Chal: 'यात्रा की शुरुआत, वाहन या गैजेट क्रय, खेलकूद, दैनिक सामान्य कार्य।',
    Char: 'यात्रा की शुरुआत, वाहन या गैजेट क्रय, खेलकूद, दैनिक सामान्य कार्य।',
    Kaal: 'मशीनरी कार्य, विवाद निपटाना, कोर्ट-कचहरी (अन्य सभी शुभ कार्य वर्जित)।',
    Rog: 'शारीरिक विश्राम, शल्य चिकित्सा, बीमारी का उपचार (अन्य सभी शुभ कार्य वर्जित)।',
    Udveg: 'सरकारी या प्रशासनिक कार्य, दस्तावेजी काम, संपत्ति के मामले।'
  };
  return dayMap[type] || 'दैनिक सामान्य कार्य।';
};

export const getHoraPracticalNuance = (lordHindi?: string, lord?: string) => {
  const l = (lord || lordHindi || '').toLowerCase();
  if (l.includes('mangal') || l.includes('mars') || l.includes('मंगल')) {
    return 'मंगल होरा: साहसिक व तकनीकी कार्यों हेतु ठीक, वाद-विवाद से बचें';
  }
  if (l.includes('surya') || l.includes('sun') || l.includes('सूर्य')) {
    return 'सूर्य होरा: प्रशासनिक व महत्वपूर्ण कार्यों हेतु श्रेष्ठ, प्रतिष्ठा व नेतृत्व';
  }
  if (l.includes('chandra') || l.includes('moon') || l.includes('चंद्र')) {
    return 'चंद्र होरा: रचनात्मक कार्य, जल संबंधी, शांति व पारिवारिक सौहार्द';
  }
  if (l.includes('budh') || l.includes('mercury') || l.includes('बुध')) {
    return 'बुध होरा: व्यापार, हिसाब-किताब, संवाद, वाणिज्य व अध्ययन';
  }
  if (l.includes('guru') || l.includes('jupiter') || l.includes('बृहस्पति') || l.includes('गुरु')) {
    return 'गुरु होरा: अत्यंत शुभ • ज्ञानार्जन, आध्यात्मिक कार्य, निवेश व शुभ संकल्प';
  }
  if (l.includes('shukra') || l.includes('venus') || l.includes('शुक्र')) {
    return 'शुक्र होरा: सौंदर्य, कला, वस्त्र-आभूषण, सौंदर्य व सुख-सुविधा';
  }
  if (l.includes('shani') || l.includes('saturn') || l.includes('शनि')) {
    return 'शनि होरा: धैर्य, श्रम, भूमि-मशीनरी कार्य, जल्दबाजी से बचें';
  }
  return `${lordHindi || lord || 'ग्रह'} होरा: सामान्य कार्य संपन्न करें`;
};

const parseTimeToMinutes = (tStr: string): number => {
  if (!tStr) return 0;
  const parts = tStr.trim().split(' ');
  if (parts.length < 2) {
    const [h, m] = tStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  }
  const [time, ampm] = parts;
  let [h, m] = time.split(':').map(Number);
  if (isNaN(h)) h = 0;
  if (isNaN(m)) m = 0;
  if (ampm?.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (ampm?.toUpperCase() === 'AM' && h === 12) h = 0;
  return h * 60 + m;
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export const LiveMuhuratWatchCard: React.FC<LiveMuhuratWatchCardProps> = ({
  clockTime,
  currentTimeStr,
  choghadiyaList,
  activeChoghadiyaIndex,
  horaList,
  activeHora,
  sunriseTimeStr,
  sunsetTimeStr,
  currentCity,
}) => {
  // Selected slot state (Interactive Slot Card on tap/click/hover)
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlotInfo | null>(null);

  // Dial Interactions
  const handleSelectChoghadiya = (seg: ChoghadiyaInterval) => {
    const status = getChoghadiyaStatusInfo(seg.type);
    const chogName = seg.hindiName || seg.name;
    setSelectedSlot({
      type: 'choghadiya',
      name: `${chogName} चौघड़िया`,
      startTime: seg.startTime,
      endTime: seg.endTime,
      quality: status.label,
      desc: getChoghadiyaAdvice(seg.type),
      dot: status.dot,
    });
  };

  const handleSelectHora = (h: HoraInterval) => {
    const isShubh = h.quality === 'Auspicious';
    const isAshubh = h.quality === 'Inauspicious';
    const dot = isShubh ? '🟢' : isAshubh ? '🔴' : '🟡';
    const qualityLabel = isShubh ? 'शुभ होरा' : isAshubh ? 'अशुभ होरा' : 'सामान्य होरा';
    const lordName = h.lordHindi || h.lord;
    setSelectedSlot({
      type: 'hora',
      name: `${lordName} की होरा`,
      startTime: h.startTime,
      endTime: h.endTime,
      quality: qualityLabel,
      desc: getHoraPracticalNuance(h.lordHindi, h.lord),
      dot,
    });
  };

  // Current & Next Choghadiya Calculations
  const currentChoghadiya = useMemo(() => {
    if (choghadiyaList && activeChoghadiyaIndex >= 0 && activeChoghadiyaIndex < choghadiyaList.length) {
      return choghadiyaList[activeChoghadiyaIndex];
    }
    return null;
  }, [choghadiyaList, activeChoghadiyaIndex]);

  const nextChoghadiya = useMemo(() => {
    if (choghadiyaList && activeChoghadiyaIndex >= 0 && choghadiyaList.length > 0) {
      const nextIdx = (activeChoghadiyaIndex + 1) % choghadiyaList.length;
      return choghadiyaList[nextIdx];
    }
    return null;
  }, [choghadiyaList, activeChoghadiyaIndex]);

  // Live countdown in minutes
  const choghadiyaRemainingMinutes = useMemo(() => {
    if (!currentChoghadiya?.endTime) return 0;
    const currMin = clockTime.getHours() * 60 + clockTime.getMinutes();
    const endMin = parseTimeToMinutes(currentChoghadiya.endTime);
    let diff = endMin - currMin;
    if (diff < 0) diff += 1440;
    return Math.max(0, diff);
  }, [currentChoghadiya, clockTime]);

  const currentStatusInfo = getChoghadiyaStatusInfo(currentChoghadiya?.type);
  const nextStatusInfo = getChoghadiyaStatusInfo(nextChoghadiya?.type);
  const isNightTime = currentChoghadiya ? !currentChoghadiya.isDay : clockTime.getHours() >= 19 || clockTime.getHours() < 6;

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Neumorphic 3D Raised Floating Box with Smooth Hover Scaling */}
      <div className="relative rounded-[28px] sm:rounded-[34px] p-4 sm:p-5 bg-gradient-to-br from-white/95 via-[#FAF6F0]/92 to-[#F2E8DC]/90 backdrop-blur-md border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_1px_1px_3px_rgba(255,255,255,0.9)] flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_25px_60px_rgba(0,0,0,0.45)] w-full max-w-[460px]">

        {/* ========================================================
            1. TOP SECTION HEADER (सुंदर सी हेडिंग)
           ======================================================== */}
        <div className="text-center space-y-0.5 mb-2 border-b border-[#E6DEC8]/60 pb-2 w-full">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-500/10 border border-amber-500/30 shadow-2xs mb-0.5">
            <span className="text-xs text-amber-700">ॐ</span>
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#B45309] uppercase">
              Live Vedic Astrological Time & Muhurat Engine
            </span>
            <span className="text-xs text-amber-700">卐</span>
          </div>
          <h3 className="text-sm sm:text-base font-serif font-extrabold bg-gradient-to-r from-[#8B2612] via-[#B45309] to-[#78350F] bg-clip-text text-transparent tracking-wide">
            ।। सनातन वैदिक कालचक्र एवं चौघड़िया ।।
          </h3>
        </div>

        {/* ========================================================
            2. CENTRAL ANALOG DIAL (Interactive Segments)
           ======================================================== */}
        <div className="w-[230px] h-[230px] sm:w-[250px] sm:h-[250px] lg:w-[260px] lg:h-[260px] aspect-square flex items-center justify-center [&_svg]:overflow-visible">
          <AnalogClock
            time={clockTime}
            choghadiyaList={choghadiyaList}
            activeChoghadiyaIndex={activeChoghadiyaIndex}
            activeHora={activeHora}
            horaList={horaList}
            sunriseTimeStr={sunriseTimeStr}
            sunsetTimeStr={sunsetTimeStr}
            language="Hindi"
            onSelectChoghadiya={handleSelectChoghadiya}
            onSelectHora={handleSelectHora}
          />
        </div>

        {/* Live Digital Clock & Coordinates */}
        <div className="text-center mt-2 mb-1 space-y-0.5">
          <div className="text-xl sm:text-2xl font-mono font-extrabold tracking-widest text-[#1E1B18] tabular-nums">
            {currentTimeStr}
          </div>
          <p className="text-[10.5px] text-[#6E6259]">
            भारतीय मानक समय (IST) • {currentCity.nameHindi} ({currentCity.latitude.toFixed(2)}° N, {currentCity.longitude.toFixed(2)}° E)
          </p>
        </div>

        {/* ========================================================
            3. BOTTOM ELEMENTS
           ======================================================== */}
        <div className="w-full space-y-2.5 mt-1.5">

          {/* A. INTERACTIVE SELECTED SLOT CARD (ON TAP/CLICK/HOVER) */}
          {selectedSlot && (
            <div className="w-full p-3 bg-gradient-to-r from-amber-50/95 via-white/95 to-orange-50/95 border border-[#FF9933]/50 rounded-2xl shadow-sm flex items-start justify-between gap-2.5 animate-fadeIn transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-start gap-2.5 overflow-hidden text-left min-w-0 flex-1">
                <span className="text-2xl select-none shrink-0 mt-0.5">{selectedSlot.dot}</span>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono font-bold text-orange-700 flex items-center gap-1 mb-0.5">
                    🔍 {selectedSlot.type === 'choghadiya' ? 'चयनित चौघड़िया विवरण' : 'चयनित होरा विवरण'}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[13.5px] font-black font-serif text-slate-900">
                      {selectedSlot.name}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                      {selectedSlot.startTime} – {selectedSlot.endTime}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-serif mt-1 leading-snug">
                    <span className="font-bold">{selectedSlot.quality}</span> • {selectedSlot.desc}
                  </p>
                </div>
              </div>

              {/* Close Button Only */}
              <div className="shrink-0 self-start">
                <button
                  type="button"
                  onClick={() => setSelectedSlot(null)}
                  className="text-slate-500 hover:text-slate-900 text-sm w-6 h-6 rounded-full bg-orange-100/70 hover:bg-orange-200/80 flex items-center justify-center cursor-pointer transition-all border border-orange-200/60"
                  title="बंद करें"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* C. 3-COLOR INTUITIVE LEGEND */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] font-bold font-serif flex-wrap pt-0.5">
            <span className="flex items-center gap-1 text-emerald-700">
              🟢 शुभ (अमृत/शुभ/लाभ)
            </span>
            <span className="flex items-center gap-1 text-amber-700">
              🟡 सामान्य (चर)
            </span>
            <span className="flex items-center gap-1 text-rose-700">
              🔴 अशुभ (रोग/काल/उद्वेग)
            </span>
          </div>

          {/* D. UNIFIED SMART LIVE CARD (SINGLE POWERHOUSE GLASSMORPHIC CARD) */}
          <div className="w-full p-3 sm:p-3.5 rounded-2xl border border-[#ff9933]/50 bg-white/85 backdrop-blur-md shadow-xs space-y-1.5 text-left transition-all duration-300 hover:scale-[1.015]">
            
            {/* 1. Header Row: Current Choghadiya & Live Countdown */}
            <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-orange-100/80 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-base select-none">{currentStatusInfo.dot}</span>
                <div>
                  <h4 className="text-[13.5px] sm:text-[14px] font-black text-slate-900 font-serif leading-tight">
                    अभी: {currentChoghadiya ? (currentChoghadiya.hindiName || currentChoghadiya.name) : 'शुभ'} चौघड़िया ({currentStatusInfo.label})
                  </h4>
                  <div className="text-[10.5px] text-slate-500 font-mono mt-0.5">
                    समय: {currentChoghadiya ? `${currentChoghadiya.startTime} - ${currentChoghadiya.endTime}` : '—'}
                  </div>
                </div>
              </div>

              {/* Remaining Countdown Badge */}
              <div className={`px-2 py-0.5 rounded-full border text-[10.5px] font-mono font-black shrink-0 ${currentStatusInfo.badgeBg}`}>
                ⏳ {choghadiyaRemainingMinutes > 0 ? `${choghadiyaRemainingMinutes} मिनट शेष` : 'समय समाप्त'}
              </div>
            </div>

            {/* 2. Active Hora Status Bar */}
            <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-orange-500/10 rounded-xl border border-orange-200/40">
              <span className="font-bold text-slate-700 whitespace-nowrap">सक्रिय होरा:</span>
              <span className="font-bold font-serif text-[#78350F] text-[11.5px] leading-relaxed text-right pl-2">
                {activeHora ? getHoraPracticalNuance(activeHora.lordHindi, activeHora.lord) : 'सूर्य होरा: प्रशासनिक व महत्वपूर्ण कार्यों हेतु श्रेष्ठ'}
              </span>
            </div>

            {/* 3. Practical Vedic Advice: क्या करें */}
            {currentChoghadiya && (
              <div className="text-xs space-y-0.5 pt-0.5">
                <span className="font-black text-slate-900 block">
                  ✅ क्या करें (मार्गदर्शन):
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {getChoghadiyaUpyuktKarya(currentChoghadiya.type, isNightTime)}
                </p>
              </div>
            )}

            {/* 4. Next Upcoming Choghadiya Preview */}
            {nextChoghadiya && (
              <div className="pt-1.5 border-t border-orange-100/80 flex items-center justify-between text-xs flex-wrap gap-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-slate-500">⏭️ अगला चौघड़िया:</span>
                  <span className="font-bold font-serif text-slate-900">
                    {nextStatusInfo.dot} {nextChoghadiya.hindiName || nextChoghadiya.name} ({nextChoghadiya.startTime} से)
                  </span>
                </div>
                <span className={`text-[9.5px] font-bold font-mono px-2 py-0.5 rounded-md border ${nextStatusInfo.badgeBg}`}>
                  {nextStatusInfo.label}
                </span>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
