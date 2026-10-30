import React, { useState, useEffect, useMemo } from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';
import { useChoghadiyaData } from '../../choghadiya/hooks/useChoghadiyaData';
import {
  formatTimeToHindi,
  formatTimeRangeToHindi,
  toHindiDigits,
  cleanHindiName,
} from '../../../components/watch';
import {
  getChoghadiyaAdvice,
  getChoghadiyaUpyuktKarya,
} from '../../../components/watch/LiveMuhuratWatchCard';

function parseTimeToMinutes(tStr?: string): number {
  if (!tStr) return 0;
  const parts = tStr.trim().split(' ');
  const [time, ampm] = parts.length >= 2 ? parts : [tStr, ''];
  let [h, m] = (time || '').split(':').map(Number);
  if (isNaN(h)) h = 0;
  if (isNaN(m)) m = 0;
  if (ampm?.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (ampm?.toUpperCase() === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

export const PortalRightNow: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const choghadiyaData = useChoghadiyaData();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { panchang, activeChoghadiya } = choghadiyaData;

  // Real-time calculation of Rahu Kaal & Active Status
  const statusInfo = useMemo(() => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const rahuStart = parseTimeToMinutes(panchang?.rahuKaal?.start);
    const rahuEnd = parseTimeToMinutes(panchang?.rahuKaal?.end);
    const isRahuKaalActive = currentMinutes >= rahuStart && currentMinutes < rahuEnd;

    // Remaining time for current Choghadiya
    const choghadiyaEndMinutes = parseTimeToMinutes(activeChoghadiya?.endTime);
    let diff = choghadiyaEndMinutes - currentMinutes;
    if (diff < 0) diff += 1440;
    const remHours = Math.floor(diff / 60);
    const remMins = diff % 60;
    const remTimeStr = remHours > 0
      ? `${toHindiDigits(remHours)} घंटा ${toHindiDigits(remMins)} मिनट`
      : `${toHindiDigits(remMins)} मिनट`;

    // Rahu Kaal timing string
    const rahuKaalStr = panchang?.rahuKaal
      ? formatTimeRangeToHindi(panchang.rahuKaal.start, panchang.rahuKaal.end)
      : '१०:१७ – ११:४१ पूर्वाह्न';

    // Status of Rahu Kaal relative to now
    let rahuStatusBadge = `राहु काल ${panchang?.rahuKaal?.start ? formatTimeToHindi(panchang.rahuKaal.start) : '१०:१७'} से`;
    if (isRahuKaalActive) {
      rahuStatusBadge = 'राहु काल (सक्रिय)';
    } else if (currentMinutes >= rahuEnd) {
      rahuStatusBadge = 'राहु काल समाप्त';
    }

    const choghType = activeChoghadiya?.type || 'Amrit';
    const choghName = cleanHindiName(activeChoghadiya?.hindiName || activeChoghadiya?.name) || 'अमृत';
    const isNight = activeChoghadiya ? !activeChoghadiya.isDay : false;

    // Classification: Green (Auspicious), Yellow (Neutral), Red (Inauspicious)
    if (isRahuKaalActive) {
      return {
        level: 'red' as const,
        title: 'सावधान! वर्तमान में राहु काल प्रभावी है',
        badge: 'वर्ज्य काल',
        desc: `राहु काल (${rahuKaalStr}) प्रभावी है। इस अवधि में नवीन कार्य, दुकान उद्घाटन, रजिस्ट्री, नवीन अनुबंध या मांगलिक यात्रा पूर्णतः वर्जित है।`,
        advice: 'रुकें! शुभ कार्य टालें',
        adviceIcon: 'cancel',
        remTimeStr,
        rahuKaalStr,
        rahuStatusBadge,
        isRahuKaalActive,
      };
    }

    if (choghType === 'Rog' || choghType === 'Kaal' || choghType === 'Udveg') {
      return {
        level: 'red' as const,
        title: `अभी अशुभ काल है (${choghName} चौघड़िया)`,
        badge: 'अशुभ (त्याज्य)',
        desc: `${getChoghadiyaAdvice(choghType)} (${formatTimeToHindi(activeChoghadiya?.endTime)} तक प्रभावी) • ${getChoghadiyaUpyuktKarya(choghType, isNight)}`,
        advice: 'नवीन कार्य टालें',
        adviceIcon: 'warning',
        remTimeStr,
        rahuKaalStr,
        rahuStatusBadge,
        isRahuKaalActive,
      };
    }

    if (choghType === 'Chal' || choghType === 'Char') {
      return {
        level: 'yellow' as const,
        title: 'अभी सामान्य व गतिशील समय है (चर चौघड़िया)',
        badge: 'मध्यम फलप्रद',
        desc: `चर चौघड़िया (${formatTimeToHindi(activeChoghadiya?.endTime)} तक प्रभावी) • दैनिक सामान्य कार्य, यात्रा, वाहन चालन व नियमित लेन-देन हेतु अनुकूल।`,
        advice: 'सामान्य कार्य करें',
        adviceIcon: 'change_circle',
        remTimeStr,
        rahuKaalStr,
        rahuStatusBadge,
        isRahuKaalActive,
      };
    }

    // Default to Green (Amrit, Shubh, Labh)
    return {
      level: 'green' as const,
      title: `अभी शुभ समय चल रहा है (${choghName} काल)`,
      badge: 'अति उत्तम',
      desc: `${choghName} चौघड़िया (${formatTimeToHindi(activeChoghadiya?.endTime)} तक प्रभावी) • ${getChoghadiyaAdvice(choghType)}`,
      advice: 'हाँ! कार्य आरंभ करें',
      adviceIcon: 'verified',
      remTimeStr,
      rahuKaalStr,
      rahuStatusBadge,
      isRahuKaalActive,
    };
  }, [currentTime, panchang?.rahuKaal, activeChoghadiya]);

  // Color schemes based on active level
  const themeClasses = useMemo(() => {
    switch (statusInfo.level) {
      case 'red':
        return {
          sectionBorder: 'border-rose-400',
          sectionGlow: 'bg-rose-100/70',
          sectionBg: 'from-[#fffdfa] via-[#fff5f5] to-[#fef2f2]',
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
          pingBg: 'bg-rose-500',
          dotBg: 'bg-rose-600 shadow-[0_0_8px_#f43f5e]',
          bannerBorder: 'border-rose-400 hover:shadow-[0_12px_28px_-4px_rgba(244,63,94,0.25)]',
          bannerTitle: 'text-rose-950',
          bannerPill: 'bg-rose-600 text-white',
          bannerDesc: 'text-rose-900',
          adviceBox: 'bg-rose-50 border-rose-300',
          adviceCategory: 'text-rose-800',
          adviceTitle: 'text-rose-900',
          adviceIcon: 'text-rose-700',
          activeSignalCard: 'border-rose-400 bg-rose-50/95 shadow-[0_14px_28px_-4px_rgba(244,63,94,0.35)]',
        };
      case 'yellow':
        return {
          sectionBorder: 'border-amber-400',
          sectionGlow: 'bg-amber-100/70',
          sectionBg: 'from-[#fffdfa] via-[#fffdf0] to-[#fefce8]',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          pingBg: 'bg-amber-500',
          dotBg: 'bg-amber-600 shadow-[0_0_8px_#d97706]',
          bannerBorder: 'border-amber-400 hover:shadow-[0_12px_28px_-4px_rgba(245,158,11,0.25)]',
          bannerTitle: 'text-amber-950',
          bannerPill: 'bg-amber-600 text-white',
          bannerDesc: 'text-amber-900',
          adviceBox: 'bg-amber-50 border-amber-300',
          adviceCategory: 'text-amber-800',
          adviceTitle: 'text-amber-900',
          adviceIcon: 'text-amber-700',
          activeSignalCard: 'border-amber-400 bg-amber-50/95 shadow-[0_14px_28px_-4px_rgba(245,158,11,0.35)]',
        };
      case 'green':
      default:
        return {
          sectionBorder: 'border-emerald-400',
          sectionGlow: 'bg-emerald-100/70',
          sectionBg: 'from-[#fffdfa] via-[#f7fff9] to-[#edfcf2]',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          pingBg: 'bg-emerald-500',
          dotBg: 'bg-emerald-600 shadow-[0_0_8px_#10b981]',
          bannerBorder: 'border-emerald-400 hover:shadow-[0_12px_28px_-4px_rgba(16,185,129,0.25)]',
          bannerTitle: 'text-emerald-950',
          bannerPill: 'bg-emerald-600 text-white',
          bannerDesc: 'text-emerald-900',
          adviceBox: 'bg-emerald-50 border-emerald-300',
          adviceCategory: 'text-emerald-800',
          adviceTitle: 'text-emerald-900',
          adviceIcon: 'text-emerald-700',
          activeSignalCard: 'border-emerald-400 bg-emerald-50/95 shadow-[0_14px_28px_-4px_rgba(16,185,129,0.35)]',
        };
    }
  }, [statusInfo.level]);

  return (
    <section
      className={`glass-panel-warm rounded-3xl p-5 sm:p-7 border-2 ${themeClasses.sectionBorder} shadow-[0_12px_36px_-6px_rgba(77,51,34,0.12)] space-y-5 bg-gradient-to-br ${themeClasses.sectionBg} relative overflow-hidden font-serif`}
      id="right-now-status"
    >
      {/* Decorative Luminous Aura & Corner Brackets */}
      <div className={`absolute -right-16 -top-16 w-52 h-52 rounded-full ${themeClasses.sectionGlow} blur-2xl pointer-events-none -z-10`}></div>
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.07]" />
      <GoldenCornerBrackets size="lg" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/70 pb-3.5 relative z-10">
        <div className="flex items-center gap-3">
          <VedicIcon3D name="signal" size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#26150b]">राइट नाउ (Right Now) • तात्कालिक काल निर्णय</h2>
              <span className={`px-2.5 py-0.5 rounded-full ${themeClasses.badgeBg} text-[10px] font-bold border flex items-center gap-1.5 shadow-xs`}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${themeClasses.pingBg} opacity-90`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${themeClasses.dotBg}`}></span>
                </span>
                लाइव स्थिति
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#735641]">जटिल नक्षत्र-करण समझे बिना १ सेकंड में जानें: क्या अभी शुभ कार्य शुरू कर सकते हैं?</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3.5 py-1.5 rounded-xl bg-white/95 border border-[#dec9ab] text-xs font-bold text-[#26150b] shadow-xs flex items-center gap-1.5 hover:border-[#ea580c] transition-colors">
            <VedicIcon3D name="clock" size="sm" />
            शेष समय: <span className="text-[#c2410c] font-mono font-bold text-sm">{statusInfo.remTimeStr}</span>
          </span>
        </div>
      </div>

      {/* Active Live Traffic Signal Banner with Dynamic Real-Time Evaluation */}
      <div className={`p-4 sm:p-5 rounded-2xl bg-white/95 border-2 ${themeClasses.bannerBorder} shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden z-10 transition-shadow`}>
        <div className="flex items-start sm:items-center gap-3.5">
          <VedicIcon3D name={statusInfo.level === 'green' ? 'shubh' : 'temple'} size="lg" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="relative flex h-4 w-4 shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${themeClasses.pingBg} opacity-90`}></span>
                <span className={`relative inline-flex rounded-full h-4 w-4 ${themeClasses.dotBg}`}></span>
              </span>
              <span className={`text-lg sm:text-2xl font-bold ${themeClasses.bannerTitle}`}>{statusInfo.title}</span>
              <span className={`px-2.5 py-0.5 rounded ${themeClasses.bannerPill} text-[11px] font-bold tracking-wide shadow-xs`}>
                {statusInfo.badge}
              </span>
            </div>
            <p className={`text-xs sm:text-sm ${themeClasses.bannerDesc} leading-relaxed font-medium`}>
              {statusInfo.desc}
            </p>
          </div>
        </div>
        <div className={`shrink-0 flex items-center gap-2 ${themeClasses.adviceBox} px-4 py-2.5 rounded-xl border text-center shadow-xs`}>
          <div>
            <div className={`text-[10px] ${themeClasses.adviceCategory} font-semibold uppercase tracking-wider`}>१ सेकंड सलाह</div>
            <div className={`text-sm font-bold ${themeClasses.adviceTitle} flex items-center gap-1`}>
              <span className={`material-symbols-outlined text-[18px] ${themeClasses.adviceIcon}`}>{statusInfo.adviceIcon}</span>
              {statusInfo.advice}
            </div>
          </div>
        </div>
      </div>

      {/* 3-State Traffic Signal Comparison Strip (Green / Yellow / Red) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative z-10">
        
        {/* Green Signal Card */}
        <div className={`p-4 rounded-2xl border-2 space-y-1.5 relative shadow-sm transition-all duration-300 cursor-pointer ${
          statusInfo.level === 'green'
            ? 'bg-emerald-50/95 border-emerald-400 ring-2 ring-emerald-300/60 shadow-[0_10px_25px_-3px_rgba(16,185,129,0.3)]'
            : 'bg-emerald-50/60 border-emerald-200/80 hover:-translate-y-1 hover:border-emerald-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              {statusInfo.level === 'green' ? (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 shadow-[0_0_8px_#10b981]"></span>
                </span>
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              )}
              हरा संकेत {statusInfo.level === 'green' ? '(सक्रिय)' : '(श्रेष्ठ)'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 shadow-xs">
              शुभ, अमृत व लाभ
            </span>
          </div>
          <div className="text-sm font-bold text-emerald-900">नया काम निसंकोच करें</div>
          <p className="text-[11px] text-emerald-800 leading-snug">
            दुकान, रजिस्ट्री, नया निवेश, देव-पूजन एवं मांगलिक यात्रा हेतु सर्वोत्तम विजयप्रद काल।
          </p>
        </div>

        {/* Yellow Signal Card */}
        <div className={`p-4 rounded-2xl border space-y-1.5 transition-all duration-300 cursor-pointer ${
          statusInfo.level === 'yellow'
            ? 'bg-amber-50/95 border-2 border-amber-400 ring-2 ring-amber-300/60 shadow-[0_10px_25px_-3px_rgba(245,158,11,0.3)]'
            : 'bg-amber-50/60 border-amber-200/80 hover:-translate-y-1 hover:border-amber-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              {statusInfo.level === 'yellow' ? (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600 shadow-[0_0_8px_#d97706]"></span>
                </span>
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              )}
              पीला संकेत {statusInfo.level === 'yellow' ? '(सक्रिय)' : '(सामान्य)'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
              चर चौघड़िया
            </span>
          </div>
          <div className="text-sm font-bold text-amber-900">नित्य कार्य व सामान्य यात्रा</div>
          <p className="text-[11px] text-amber-800 leading-snug">
            दैनिक व्यापार, सामान्य लेन-देन, वाहन चालन व पूर्व-निर्धारित कार्यों के लिए मध्यम फलदायी।
          </p>
        </div>

        {/* Red Signal Warning Card */}
        <div className={`p-4 rounded-2xl border space-y-1.5 transition-all duration-300 cursor-pointer ${
          statusInfo.level === 'red'
            ? 'bg-red-50/95 border-2 border-red-400 ring-2 ring-red-300/60 shadow-[0_10px_25px_-3px_rgba(239,68,68,0.3)]'
            : 'bg-red-50/60 border-red-200/80 hover:-translate-y-1 hover:border-red-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-900 flex items-center gap-1.5">
              {statusInfo.level === 'red' ? (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 shadow-[0_0_8px_#ef4444]"></span>
                </span>
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              )}
              लाल संकेत {statusInfo.level === 'red' ? '(सक्रिय / सावधान)' : '(वर्ज्य)'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold border border-red-200">
              {statusInfo.rahuStatusBadge}
            </span>
          </div>
          <div className="text-sm font-bold text-red-900">नया काम व खरीदारी टालें</div>
          <p className="text-[11px] text-red-800 leading-snug">
            राहु काल {statusInfo.rahuKaalStr} रहेगा। रोग, काल या उद्वेग में भी मांगलिक संकल्प स्थगित रखें।
          </p>
        </div>

      </div>

      {/* Actionable Deep Links to Remaining Features (चौघड़िया, होरा चक्र, शुभ मुहूर्त) */}
      <div className="pt-3 border-t border-[#dec9ab]/60 flex flex-wrap items-center justify-between gap-3 relative z-10 text-xs">
        <span className="text-[#735641] font-semibold flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#b8860b]">schedule</span>
          दिन व रात के तात्कालिक काल चक्र:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/choghadiya"
            className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-[#ea580c] hover:text-white text-[#26150b] font-bold border border-[#dec9ab] shadow-xs transition-all flex items-center gap-1 no-underline"
          >
            <span>दिन-रात्रि चौघड़िया तालिका</span>
            <span className="text-[10px]">➔</span>
          </Link>
          <Link
            href="/hora"
            className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-[#16a34a] hover:text-white text-[#26150b] font-bold border border-[#dec9ab] shadow-xs transition-all flex items-center gap-1 no-underline"
          >
            <span>२४-होरा चक्र</span>
            <span className="text-[10px]">➔</span>
          </Link>
          <Link
            href="/muhurat"
            className="px-3 py-1.5 rounded-xl bg-[#fff2e8] hover:bg-[#c2410c] hover:text-white text-[#c2410c] font-bold border border-[#ffd8bf] shadow-xs transition-all flex items-center gap-1 no-underline"
          >
            <span>विवाह व गृहप्रवेश मुहूर्त</span>
            <span className="text-[10px]">➔</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
