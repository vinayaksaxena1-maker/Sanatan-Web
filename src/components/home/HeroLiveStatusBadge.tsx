import React, { useMemo } from 'react';
import type { ChoghadiyaInterval } from '../../engine/types';

interface HeroLiveStatusBadgeProps {
  clockTime: Date;
  rahuKaal?: { start?: string; end?: string; startTime?: string; endTime?: string };
  currentChoghadiya?: ChoghadiyaInterval | null;
  className?: string;
}

function parseTimeToMinutes(tStr?: string): number {
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
}

function isCurrentTimeInInterval(curMin: number, startStr?: string, endStr?: string): boolean {
  if (!startStr || !endStr) return false;
  const start = parseTimeToMinutes(startStr);
  const end = parseTimeToMinutes(endStr);
  if (end < start) {
    return curMin >= start || curMin < end;
  }
  return curMin >= start && curMin < end;
}

export const HeroLiveStatusBadge: React.FC<HeroLiveStatusBadgeProps> = ({
  clockTime,
  rahuKaal,
  currentChoghadiya,
  className = '',
}) => {
  const curMin = clockTime.getHours() * 60 + clockTime.getMinutes();

  const status = useMemo(() => {
    const rahuStart = rahuKaal?.start || rahuKaal?.startTime;
    const rahuEnd = rahuKaal?.end || rahuKaal?.endTime;

    // 1. Check if Rahukaal is active
    if (rahuStart && rahuEnd && isCurrentTimeInInterval(curMin, rahuStart, rahuEnd)) {
      return {
        type: 'rahukaal' as const,
        theme: 'red',
        dotColor: 'bg-rose-500',
        borderColor: 'border-rose-500/40',
        bgColor: 'bg-rose-950/40',
        textColor: 'text-rose-200',
        title: 'राहुकाल प्रभावी',
        timeWindow: `${rahuEnd} तक`,
        advice: 'नए मांगलिक कार्य टालें',
      };
    }

    // 2. Choghadiya status check
    if (currentChoghadiya) {
      const chogType = currentChoghadiya.type;
      const chogName = currentChoghadiya.hindiName || currentChoghadiya.name;
      const endTime = currentChoghadiya.endTime;

      if (chogType === 'Amrit' || chogType === 'Labh' || chogType === 'Shubh') {
        return {
          type: 'auspicious' as const,
          theme: 'green',
          dotColor: 'bg-emerald-400',
          borderColor: 'border-emerald-500/40',
          bgColor: 'bg-emerald-950/40',
          textColor: 'text-emerald-200',
          title: `अभी: ${chogName} चौघड़िया`,
          timeWindow: `${endTime} तक`,
          advice: 'शुभ व मांगलिक कार्यों हेतु उत्तम',
        };
      }

      if (chogType === 'Chal' || (chogType as string) === 'Char') {
        return {
          type: 'neutral' as const,
          theme: 'amber',
          dotColor: 'bg-amber-400',
          borderColor: 'border-amber-500/40',
          bgColor: 'bg-amber-950/40',
          textColor: 'text-amber-200',
          title: `अभी: ${chogName} चौघड़िया`,
          timeWindow: `${endTime} तक`,
          advice: 'यात्रा, गतिशीलता व सामान्य कार्य अनुकूल',
        };
      }

      // Inauspicious Choghadiyas (Rog, Kaal, Udveg)
      return {
        type: 'inauspicious' as const,
        theme: 'rose',
        dotColor: 'bg-rose-400',
        borderColor: 'border-rose-500/40',
        bgColor: 'bg-rose-950/40',
        textColor: 'text-rose-200',
        title: `अभी: ${chogName} चौघड़िया`,
        timeWindow: `${endTime} तक`,
        advice: 'महत्वपूर्ण नए कार्य टालें, नियमित कार्य करें',
      };
    }

    return null;
  }, [curMin, rahuKaal, currentChoghadiya]);

  if (!status) return null;

  return (
    <div
      className={`inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full backdrop-blur-xl border shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 ${status.bgColor} ${status.borderColor} ${className}`}
    >
      {/* Pulsing Luminous Indicator */}
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.dotColor}`}
        />
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 shadow-[0_0_8px_currentColor] ${status.dotColor}`}
        />
      </span>

      {/* Main Status Text */}
      <div className="flex items-center space-x-2 text-xs sm:text-[13px] font-medium leading-none">
        <span className={`font-bold ${status.textColor}`}>
          {status.title}
        </span>
        <span className="text-white/40">|</span>
        <span className="text-amber-300 font-mono text-[11px] sm:text-xs">
          {status.timeWindow}
        </span>
        <span className="hidden md:inline text-white/30">•</span>
        <span className="hidden md:inline text-white/80 text-[11px] sm:text-xs">
          {status.advice}
        </span>
      </div>
    </div>
  );
};

export default HeroLiveStatusBadge;
