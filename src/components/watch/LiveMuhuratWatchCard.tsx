/**
 * Sanatan Web (सनातन घड़ी)
 * Component: LiveMuhuratWatchCard
 * Central 4-Layer Vedic Analog Clock & Bottom Unified Smart Cards
 * Light Theme: Chandan Frosted Glass, Amber Accents & Deep Bronze Typography
 * Strict < 300 lines modular standard
 */

import React, { useState, useMemo } from 'react';
import { AnalogClock } from './AnalogClock';
import { ScheduleTableModal } from './ScheduleTableModal';
import { SlotDetailModal, SelectedSlotInfo } from './SlotDetailModal';
import { KaalChakraGuideModal } from './KaalChakraGuideModal';
import { formatTimeRangeToHindi, formatTimeToHindi, toHindiDigits } from './timeHindiFormat';
import type { ChoghadiyaInterval, HoraInterval } from '../../engine/types';

export interface LiveMuhuratWatchCardProps {
  clockTime: Date;
  currentTimeStr?: string;
  choghadiyaList: ChoghadiyaInterval[];
  activeChoghadiyaIndex: number;
  horaList: HoraInterval[];
  activeHora: HoraInterval | null;
  sunriseTimeStr: string;
  sunsetTimeStr: string;
}

export const getChoghadiyaStatusInfo = (type?: string) => {
  switch (type) {
    case 'Amrit':
    case 'Shubh':
      return { dot: '🟢', label: 'शुभ', badgeBg: 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30' };
    case 'Labh':
      return { dot: '🟢', label: 'शुभ (लाभ)', badgeBg: 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30' };
    case 'Chal':
    case 'Char':
      return { dot: '🟡', label: 'सामान्य', badgeBg: 'bg-amber-500/15 text-amber-800 border-amber-500/30' };
    case 'Rog':
    case 'Kaal':
    case 'Udveg':
      return { dot: '🔴', label: 'अशुभ', badgeBg: 'bg-rose-500/15 text-rose-800 border-rose-500/30' };
    default:
      return { dot: '🟡', label: 'सामान्य', badgeBg: 'bg-slate-500/15 text-slate-800 border-slate-500/30' };
  }
};

export const getChoghadiyaAdvice = (type: string) => {
  const map: Record<string, string> = {
    Amrit: 'अत्यंत शुभ और उन्नतिदायक समय। मांगलिक कार्य अत्यंत सफल सिद्ध होते हैं।',
    Labh: 'धन-लाभदायक समय। नए उद्यम, व्यापारिक सौदे या निवेश के लिए श्रेष्ठ काल।',
    Shubh: 'मंगलकारी समय। पारिवारिक मांगलिक कार्य, देव पूजन या नया संकल्प श्रेष्ठ।',
    Chal: 'गतिशील समय। यात्रा शुरू करने, वाहन क्रय करने या दैनिक कार्य हेतु अनुकूल।',
    Char: 'गतिशील समय। यात्रा शुरू करने, वाहन क्रय करने या दैनिक कार्य निपटाएं।',
    Kaal: 'राहु काल तुल्य अशुभ समय। नए कार्यों का आरंभ न करें, जोखिम से बचें।',
    Rog: 'अशुभ काल। मांगलिक कार्य या नए निवेश की शुरुआत वर्जित है।',
    Udveg: 'मानसिक अशांति कारक समय। विशेष प्रशासनिक कार्यों के अतिरिक्त शुभ कार्य टालें।'
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
  const [time, ampm] = parts.length >= 2 ? parts : [tStr, ''];
  let [h, m] = time.split(':').map(Number);
  if (isNaN(h)) h = 0;
  if (isNaN(m)) m = 0;
  if (ampm?.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (ampm?.toUpperCase() === 'AM' && h === 12) h = 0;
  return h * 60 + m;
};

export const LiveMuhuratWatchCard: React.FC<LiveMuhuratWatchCardProps> = ({
  clockTime,
  choghadiyaList,
  activeChoghadiyaIndex,
  horaList,
  activeHora,
  sunriseTimeStr,
  sunsetTimeStr,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlotInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'choghadiya' | 'hora'>('choghadiya');

  const handleSelectChoghadiya = (seg: ChoghadiyaInterval) => {
    const status = getChoghadiyaStatusInfo(seg.type);
    setSelectedSlot({
      type: 'choghadiya',
      name: `${seg.hindiName || seg.name} चौघड़िया`,
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
    setSelectedSlot({
      type: 'hora',
      name: `${h.lordHindi || h.lord} की होरा`,
      startTime: h.startTime,
      endTime: h.endTime,
      quality: isShubh ? 'शुभ' : isAshubh ? 'अशुभ' : 'सामान्य',
      desc: getHoraPracticalNuance(h.lordHindi, h.lord),
      dot: isShubh ? '🟢' : isAshubh ? '🔴' : '🟡',
    });
  };

  const currentChoghadiya = useMemo(() => {
    if (choghadiyaList && activeChoghadiyaIndex >= 0 && activeChoghadiyaIndex < choghadiyaList.length) {
      return choghadiyaList[activeChoghadiyaIndex];
    }
    return null;
  }, [choghadiyaList, activeChoghadiyaIndex]);

  const nextChoghadiya = useMemo(() => {
    if (choghadiyaList && activeChoghadiyaIndex >= 0 && choghadiyaList.length > 0) {
      return choghadiyaList[(activeChoghadiyaIndex + 1) % choghadiyaList.length];
    }
    return null;
  }, [choghadiyaList, activeChoghadiyaIndex]);

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

  const isCurrentShubh = currentChoghadiya?.type === 'Amrit' || currentChoghadiya?.type === 'Shubh' || currentChoghadiya?.type === 'Labh';
  const isCurrentAshubh = currentChoghadiya?.type === 'Rog' || currentChoghadiya?.type === 'Kaal' || currentChoghadiya?.type === 'Udveg';

  const nextShubhChoghadiya = useMemo(() => {
    if (!choghadiyaList || choghadiyaList.length === 0 || activeChoghadiyaIndex < 0) return null;
    for (let i = 1; i < choghadiyaList.length; i++) {
      const idx = (activeChoghadiyaIndex + i) % choghadiyaList.length;
      const item = choghadiyaList[idx];
      if (item && (item.type === 'Amrit' || item.type === 'Shubh' || item.type === 'Labh')) {
        return item;
      }
    }
    return null;
  }, [choghadiyaList, activeChoghadiyaIndex]);

  const currentTimingHindi = currentChoghadiya
    ? formatTimeRangeToHindi(currentChoghadiya.startTime, currentChoghadiya.endTime)
    : '—';

  return (
    <div className="w-full flex flex-col items-center select-none font-serif text-[#26150B]">
      
      {/* 1. TOP SECTION HEADER (शीर्षक + कैसे देखें गाइड बटन) */}
      <div className="w-full mb-3 p-2.5 sm:p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_4px_16px_rgba(212,175,55,0.15)] flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center gap-1.5 pl-3 sm:pl-6">
          <span className="text-amber-600 font-bold text-base select-none">ॐ</span>
          <h3 className="text-sm sm:text-base font-serif font-extrabold bg-gradient-to-r from-[#9A3412] via-[#C2410C] to-[#B45309] bg-clip-text text-transparent tracking-wide text-center">
            ।। चौघड़िया एवं होरा कालचक्र ।।
          </h3>
          <span className="text-amber-600 font-bold text-base select-none">ॐ</span>
        </div>

        {/* Guide Help Button */}
        <button
          type="button"
          onClick={() => setIsGuideOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-[#c2410c] hover:text-[#9a3412] border border-[#d4af37]/70 text-[11px] font-bold transition-all shadow-3xs cursor-pointer shrink-0 active:scale-95"
          title="कालचक्र को देखने व समझने का पूरा तरीका"
        >
          <span className="material-symbols-outlined text-[15px] text-[#ea580c]">help</span>
          <span className="hidden sm:inline">कैसे देखें?</span>
        </button>
      </div>

      {/* 2. CENTRAL ANALOG DIAL (4-Layer Vedic Analog Clock) */}
      <div className="w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] lg:w-[290px] lg:h-[290px] aspect-square flex items-center justify-center [&_svg]:overflow-visible drop-shadow-[0_6px_20px_rgba(180,83,9,0.2)]">
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

      {/* 3. BOTTOM ELEMENTS (Under the Dial) */}
      <div className="w-full space-y-2.5 mt-3">

        {/* 3-COLOR INTUITIVE LEGEND */}
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

        {/* UNIFIED SMART LIVE CARD (LIGHT CHANDAN THEME) */}
        <div className="w-full p-3.5 rounded-2xl border border-[#ff9933]/50 bg-white/90 backdrop-blur-md shadow-xs space-y-2 text-left text-[#26150b]">
          
          {/* 1. वर्तमान स्थिति & लाइव काउंटडाउन */}
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-orange-100/90 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-base select-none">{currentStatusInfo.dot}</span>
              <div>
                <h4 className="text-[13.5px] sm:text-[14px] font-black text-slate-900 font-serif leading-tight">
                  अभी: {currentChoghadiya ? (currentChoghadiya.hindiName || currentChoghadiya.name) : 'लाभ'} चौघड़िया ({currentStatusInfo.label})
                </h4>
                <div className="text-[10.5px] text-slate-500 font-mono mt-0.5">
                  समय: {currentTimingHindi}
                </div>
              </div>
            </div>

            {/* Live Countdown Badge */}
            <div className={`px-2.5 py-0.5 rounded-full border text-[10.5px] font-mono font-black shrink-0 ${currentStatusInfo.badgeBg}`}>
              ⏳ {choghadiyaRemainingMinutes > 0 ? `${toHindiDigits(choghadiyaRemainingMinutes)} मिनट शेष` : 'समय समाप्त'}
            </div>
          </div>

          {/* 2. अगला शुभ समय (Next Auspicious Window) */}
          <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-emerald-500/10 rounded-xl border border-emerald-300/60">
            <span className="font-bold text-emerald-900 flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              अगला शुभ समय:
            </span>
            <span className="font-bold font-serif text-emerald-950 text-[11.5px] leading-relaxed text-right pl-2">
              {isCurrentShubh
                ? `वर्तमान समय शुभ है (${currentChoghadiya ? (currentChoghadiya.hindiName || currentChoghadiya.name) : ''} काल)`
                : nextShubhChoghadiya
                  ? `${formatTimeToHindi(nextShubhChoghadiya.startTime)} से (${nextShubhChoghadiya.hindiName || nextShubhChoghadiya.name} चौघड़िया)`
                  : 'शीघ्र प्रारंभ'}
            </span>
          </div>

          {/* 3. सक्रिय होरा स्थिति पट्टी (Active Hora Status Bar) */}
          <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-orange-500/10 rounded-xl border border-orange-200/50">
            <span className="font-bold text-slate-700 whitespace-nowrap">सक्रिय होरा:</span>
            <span className="font-bold font-serif text-[#78350F] text-[11.5px] leading-relaxed text-right pl-2">
              {activeHora ? getHoraPracticalNuance(activeHora.lordHindi, activeHora.lord) : 'सूर्य होरा: प्रशासनिक व महत्वपूर्ण कार्यों हेतु श्रेष्ठ'}
            </span>
          </div>

          {/* 4. स्पष्ट निर्देश (क्या करें / क्या न करें) */}
          {currentChoghadiya && (
            <div className="text-xs space-y-1 pt-0.5 border-t border-orange-100/70">
              <div className="flex items-start gap-1.5">
                <span className="font-black text-emerald-800 whitespace-nowrap">✅ क्या करें:</span>
                <span className="text-slate-700 font-medium leading-relaxed">
                  {getChoghadiyaUpyuktKarya(currentChoghadiya.type, isNightTime)}
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="font-black text-rose-800 whitespace-nowrap">❌ क्या न करें:</span>
                <span className="text-slate-700 font-medium leading-relaxed">
                  {isCurrentAshubh
                    ? 'नया व्यापार, दुकान उद्घाटन, नवीन निवेश या मांगलिक यात्रा स्थगित रखें।'
                    : isCurrentShubh
                      ? 'कोई निषेध नहीं। सभी शुभ संकल्प व नवीन कार्य निर्विघ्न संपन्न करें।'
                      : 'अति-महत्वपूर्ण जोखिम भरे वित्तीय व मांगलिक निर्णय टालें।'}
                </span>
              </div>
            </div>
          )}

          {/* 5. ⏭️ अगला चौघड़िया (Next Upcoming Preview) */}
          {nextChoghadiya && (
            <div className="pt-1.5 border-t border-orange-100/90 flex items-center justify-between text-xs flex-wrap gap-1.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-slate-500">⏭️ आगामी चौघड़िया:</span>
                <span className="font-bold font-serif text-slate-900">
                  {nextStatusInfo.dot} {nextChoghadiya.hindiName || nextChoghadiya.name} ({formatTimeToHindi(nextChoghadiya.startTime)} से)
                </span>
              </div>
              <span className={`text-[9.5px] font-bold font-mono px-2 py-0.5 rounded-md border ${nextStatusInfo.badgeBg}`}>
                {nextStatusInfo.label}
              </span>
            </div>
          )}

        </div>

      </div>

      {/* A. Interactive Selected Slot Popup Modal */}
      <SlotDetailModal
        slot={selectedSlot}
        onClose={() => setSelectedSlot(null)}
        onOpenTable={(type) => {
          setModalTab(type);
          setIsModalOpen(true);
        }}
      />

      {/* Schedule Table Modal (16 Choghadiya & 24 Hora) */}
      <ScheduleTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalTab}
        choghadiyaList={choghadiyaList}
        activeChoghadiyaIndex={activeChoghadiyaIndex}
        horaList={horaList}
        activeHora={activeHora}
      />

      {/* Kaal Chakra How-to-Read Guide Modal */}
      <KaalChakraGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

    </div>
  );
};
