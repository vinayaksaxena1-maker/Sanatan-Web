import React, { useState, useMemo } from 'react';
import { X, Sparkles, Compass } from 'lucide-react';
import { AnalogClock } from './AnalogClock';
import { VedicGhatiCounter } from '../home/VedicGhatiCounter';
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
  isHoverPreview?: boolean;
}

interface LiveMuhuratWatchCardProps {
  clockTime: Date;
  currentTimeStr?: string;
  choghadiyaList: ChoghadiyaInterval[];
  activeChoghadiyaIndex: number;
  horaList: HoraInterval[];
  activeHora: HoraInterval | null;
  sunriseTimeStr: string;
  sunsetTimeStr: string;
  currentCity?: CityInfo;
}

// ---------------------------------------------------------------------------
// Astronomical & Astrological Interpretation Helpers
// ---------------------------------------------------------------------------

export const getChoghadiyaStatusInfo = (type?: string) => {
  switch (type) {
    case 'Amrit':
      return { dot: '🟢', label: 'सर्वोत्तम समय', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    case 'Shubh':
      return { dot: '🟢', label: 'शुभ समय', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    case 'Labh':
      return { dot: '🟢', label: 'शुभ समय (लाभकारी)', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    case 'Chal':
    case 'Char':
      return { dot: '🟡', label: 'सामान्य समय', badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    case 'Rog':
    case 'Kaal':
    case 'Udveg':
      return { dot: '🔴', label: 'अशुभ समय', badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
    default:
      return { dot: '🟡', label: 'सामान्य समय', badgeBg: 'bg-slate-500/20 text-slate-300 border-slate-500/40' };
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
// Main Component: Interactive Live Cockpit Card
// ---------------------------------------------------------------------------

export const LiveMuhuratWatchCard: React.FC<LiveMuhuratWatchCardProps> = ({
  clockTime,
  choghadiyaList,
  activeChoghadiyaIndex,
  horaList,
  activeHora,
  sunriseTimeStr,
  sunsetTimeStr,
}) => {
  // Pinned slot on click/tap
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlotInfo | null>(null);
  // Real-time hover preview slot
  const [hoveredSlot, setHoveredSlot] = useState<SelectedSlotInfo | null>(null);

  // Dial Interactions
  const handleChoghadiyaSlot = (seg: ChoghadiyaInterval, isHover: boolean = false) => {
    const status = getChoghadiyaStatusInfo(seg.type);
    const chogName = seg.hindiName || seg.name;
    const slotInfo: SelectedSlotInfo = {
      type: 'choghadiya',
      name: `${chogName} चौघड़िया`,
      startTime: seg.startTime,
      endTime: seg.endTime,
      quality: status.label,
      desc: getChoghadiyaAdvice(seg.type),
      dot: status.dot,
      isHoverPreview: isHover,
    };
    if (isHover) {
      setHoveredSlot(slotInfo);
    } else {
      setSelectedSlot(slotInfo);
    }
  };

  const handleHoraSlot = (h: HoraInterval, isHover: boolean = false) => {
    const isShubh = h.quality === 'Auspicious';
    const isAshubh = h.quality === 'Inauspicious';
    const dot = isShubh ? '🟢' : isAshubh ? '🔴' : '🟡';
    const qualityLabel = isShubh ? 'शुभ होरा' : isAshubh ? 'अशुभ होरा' : 'सामान्य होरा';
    const lordName = h.lordHindi || h.lord;
    const slotInfo: SelectedSlotInfo = {
      type: 'hora',
      name: `${lordName} की होरा`,
      startTime: h.startTime,
      endTime: h.endTime,
      quality: qualityLabel,
      desc: getHoraPracticalNuance(h.lordHindi, h.lord),
      dot,
      isHoverPreview: isHover,
    };
    if (isHover) {
      setHoveredSlot(slotInfo);
    } else {
      setSelectedSlot(slotInfo);
    }
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

  // Active display slot: Hover takes immediate priority, then pinned selection, then live slot
  const displayedSlot = hoveredSlot || selectedSlot;

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Luxury Dark Frosted Glass Container (Cockpit Frame) */}
      <div className="relative rounded-[30px] sm:rounded-[36px] p-4 sm:p-5 lg:p-6 bg-[#0e1320]/85 hover:bg-[#0e1320]/92 backdrop-blur-2xl border border-amber-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.65)] flex flex-col items-center justify-center transition-all duration-300 hover:border-amber-500/40 w-full max-w-[480px]">

        {/* ========================================================
            1. COCKPIT HEADER WITH LIVE VEDIC GHATI COUNTER
           ======================================================== */}
        <div className="w-full flex flex-col items-center space-y-2.5 pb-2 border-b border-amber-500/20">
          <div className="flex items-center space-x-1.5 text-amber-300 font-serif text-xs sm:text-sm font-bold tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>सनातन वैदिक कालचक्र एवं चौघड़िया</span>
          </div>

          {/* Integrated Modern vs Vedic Ghati Counter */}
          <VedicGhatiCounter
            clockTime={clockTime}
            sunriseTimeStr={sunriseTimeStr}
            className="w-full"
          />
        </div>

        {/* ========================================================
            2. CENTRAL INTERACTIVE ANALOG DIAL
           ======================================================== */}
        <div className="relative w-[250px] h-[250px] sm:w-[270px] sm:h-[270px] lg:w-[285px] lg:h-[285px] aspect-square flex items-center justify-center [&_svg]:overflow-visible my-1">
          <AnalogClock
            time={clockTime}
            choghadiyaList={choghadiyaList}
            activeChoghadiyaIndex={activeChoghadiyaIndex}
            activeHora={activeHora}
            horaList={horaList}
            sunriseTimeStr={sunriseTimeStr}
            sunsetTimeStr={sunsetTimeStr}
            language="Hindi"
            onSelectChoghadiya={(seg) => handleChoghadiyaSlot(seg, false)}
            onSelectHora={(h) => handleHoraSlot(h, false)}
            onHoverChoghadiya={(seg) => {
              if (seg) handleChoghadiyaSlot(seg, true);
              else setHoveredSlot(null);
            }}
          />
        </div>

        {/* ========================================================
            3. INTERACTIVE SMART CARDS & LIVE GUIDANCE
           ======================================================== */}
        <div className="w-full space-y-2.5 mt-2">

          {/* A. INTERACTIVE HOVER / SELECTION PREVIEW CARD */}
          {displayedSlot ? (
            <div className="w-full p-3 sm:p-3.5 bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-black/60 border border-amber-400/50 rounded-2xl shadow-lg flex items-start justify-between gap-2.5 animate-fadeIn transition-all duration-300">
              <div className="flex items-start gap-2.5 overflow-hidden text-left min-w-0 flex-1">
                <span className="text-2xl select-none shrink-0 mt-0.5">{displayedSlot.dot}</span>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1 mb-0.5">
                    {displayedSlot.isHoverPreview ? '⚡ लाइव होवर प्रिव्यू' : '📌 चयनित विवरण'}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base font-black font-serif text-white">
                      {displayedSlot.name}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                      {displayedSlot.startTime} – {displayedSlot.endTime}
                    </span>
                  </div>
                  <p className="text-xs text-amber-100/90 font-serif mt-1 leading-snug">
                    <span className="font-bold text-amber-300">{displayedSlot.quality}</span> • {displayedSlot.desc}
                  </p>
                </div>
              </div>

              {selectedSlot && (
                <button
                  type="button"
                  onClick={() => setSelectedSlot(null)}
                  className="text-amber-300 hover:text-white text-xs w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-all border border-white/20 shrink-0"
                  title="बंद करें"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : null}

          {/* B. 3-COLOR INTUITIVE VEDIC LEGEND */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] font-bold font-serif flex-wrap pt-0.5">
            <span className="flex items-center gap-1 text-emerald-300">
              🟢 शुभ (अमृत/शुभ/लाभ)
            </span>
            <span className="flex items-center gap-1 text-amber-300">
              🟡 सामान्य (चर)
            </span>
            <span className="flex items-center gap-1 text-rose-300">
              🔴 अशुभ (रोग/काल/उद्वेग)
            </span>
          </div>

          {/* C. UNIFIED SMART LIVE COCKPIT STATUS CARD */}
          <div className="w-full p-3 sm:p-3.5 rounded-2xl border border-amber-500/25 bg-black/40 backdrop-blur-xl shadow-md space-y-2 text-left transition-all duration-300">
            
            {/* 1. Header Row: Active Choghadiya & Live Countdown */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-lg select-none">{currentStatusInfo.dot}</span>
                <div>
                  <h4 className="text-sm font-black text-white font-serif leading-tight">
                    अभी: {currentChoghadiya ? (currentChoghadiya.hindiName || currentChoghadiya.name) : 'शुभ'} चौघड़िया
                  </h4>
                  <div className="text-[11px] text-amber-300/80 font-mono mt-0.5">
                    समय: {currentChoghadiya ? `${currentChoghadiya.startTime} - ${currentChoghadiya.endTime}` : '—'}
                  </div>
                </div>
              </div>

              {/* Remaining Countdown Badge */}
              <div className={`px-2.5 py-1 rounded-full border text-[11px] font-mono font-black shrink-0 ${currentStatusInfo.badgeBg}`}>
                ⏳ {choghadiyaRemainingMinutes > 0 ? `${choghadiyaRemainingMinutes} मि. शेष` : 'समय समाप्त'}
              </div>
            </div>

            {/* 2. Active Hora Status Bar */}
            <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-white/5 rounded-xl border border-white/10">
              <span className="font-bold text-amber-300 whitespace-nowrap">सक्रिय होरा:</span>
              <span className="font-medium font-serif text-amber-100 text-[11.5px] leading-relaxed text-right pl-2">
                {activeHora ? getHoraPracticalNuance(activeHora.lordHindi, activeHora.lord) : 'सूर्य होरा: प्रशासनिक व महत्वपूर्ण कार्य'}
              </span>
            </div>

            {/* 3. Practical Vedic Guidance: क्या करें */}
            {currentChoghadiya && (
              <div className="text-xs space-y-0.5 pt-0.5">
                <span className="font-black text-amber-300 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>क्या करें (मार्गदर्शन):</span>
                </span>
                <p className="text-amber-100/90 font-medium leading-relaxed text-[11.5px]">
                  {getChoghadiyaUpyuktKarya(currentChoghadiya.type, isNightTime)}
                </p>
              </div>
            )}

            {/* 4. Next Upcoming Choghadiya Preview */}
            {nextChoghadiya && (
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs flex-wrap gap-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-white/60">⏭️ अगला चौघड़िया:</span>
                  <span className="font-bold font-serif text-white">
                    {nextStatusInfo.dot} {nextChoghadiya.hindiName || nextChoghadiya.name} ({nextChoghadiya.startTime} से)
                  </span>
                </div>
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md border ${nextStatusInfo.badgeBg}`}>
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

export default LiveMuhuratWatchCard;
