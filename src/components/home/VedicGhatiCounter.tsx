import React, { useState, useMemo } from 'react';

interface VedicGhatiCounterProps {
  clockTime: Date;
  sunriseTimeStr: string;
  className?: string;
}

/**
 * Converts English digits to Devanagari numerals
 */
export function toHindiDigits(num: number | string): string {
  const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => hindiDigits[parseInt(digit, 10)]);
}

/**
 * Parses time string like "06:32 AM" or "18:45" to minutes from midnight
 */
function parseTimeToMinutes(tStr: string): number {
  if (!tStr) return 360; // default 6:00 AM
  const parts = tStr.trim().split(' ');
  if (parts.length >= 2) {
    const [time, ampm] = parts;
    let [h, m] = time.split(':').map(Number);
    if (isNaN(h)) h = 0;
    if (isNaN(m)) m = 0;
    if (ampm?.toUpperCase() === 'PM' && h !== 12) h += 12;
    if (ampm?.toUpperCase() === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  }
  const [h, m] = tStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export const VedicGhatiCounter: React.FC<VedicGhatiCounterProps> = ({
  clockTime,
  sunriseTimeStr,
  className = '',
}) => {
  const [mode, setMode] = useState<'modern' | 'vedic'>('modern');

  // Modern 12-hour formatted time with seconds
  const modernTime = useMemo(() => {
    let hours = clockTime.getHours();
    const minutes = clockTime.getMinutes();
    const seconds = clockTime.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const hStr = hours.toString().padStart(2, '0');
    const mStr = minutes.toString().padStart(2, '0');
    const sStr = seconds.toString().padStart(2, '0');
    return {
      timeStr: `${hStr}:${mStr}:${sStr}`,
      ampm,
    };
  }, [clockTime]);

  // Vedic Ishtakala calculation (Ghati - Pal - Vipal from Sunrise)
  // 1 Solar Day = 60 Ghatis (1440 mins = 86,400 secs)
  // 1 Ghati = 24 mins = 1440 secs
  // 1 Pal (Vighati) = 24 secs
  // 1 Vipal = 0.4 secs (2.5 Vipal = 1 sec)
  const vedicTime = useMemo(() => {
    const sunriseMin = parseTimeToMinutes(sunriseTimeStr);
    const sunriseSec = sunriseMin * 60;
    const currentSec =
      clockTime.getHours() * 3600 +
      clockTime.getMinutes() * 60 +
      clockTime.getSeconds();

    let elapsedSec = currentSec - sunriseSec;
    if (elapsedSec < 0) {
      elapsedSec += 86400; // Passed midnight, prior to next sunrise
    }

    const ghati = Math.floor(elapsedSec / 1440);
    const remSec = elapsedSec % 1440;
    const pal = Math.floor(remSec / 24);
    const vipal = Math.floor((remSec % 24) * 2.5);

    return {
      ghati,
      pal,
      vipal,
      formattedHindi: `${toHindiDigits(ghati)} घटी : ${toHindiDigits(pal)} पल : ${toHindiDigits(vipal)} विपल`,
      formattedEng: `${ghati.toString().padStart(2, '0')} Gh : ${pal.toString().padStart(2, '0')} Pl : ${vipal.toString().padStart(2, '0')} Vp`,
    };
  }, [clockTime, sunriseTimeStr]);

  return (
    <div
      className={`inline-flex flex-col items-center justify-center p-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-amber-500/25 shadow-[0_8px_24px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Mode Selector Toggle */}
      <div className="flex items-center space-x-1 p-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-medium mb-1.5">
        <button
          type="button"
          onClick={() => setMode('modern')}
          className={`px-2.5 py-0.5 rounded-full transition-all duration-300 cursor-pointer ${
            mode === 'modern'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-sm'
              : 'text-amber-200/70 hover:text-white'
          }`}
        >
          ⏱️ IST (समय)
        </button>
        <button
          type="button"
          onClick={() => setMode('vedic')}
          className={`px-2.5 py-0.5 rounded-full transition-all duration-300 cursor-pointer ${
            mode === 'vedic'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-sm'
              : 'text-amber-200/70 hover:text-white'
          }`}
          title="सूर्योदय से बीता हुआ काल (इष्टकाल)"
        >
          ⏳ वैदिक (घटी-पल)
        </button>
      </div>

      {/* Numerical Live Display */}
      {mode === 'modern' ? (
        <div className="flex items-baseline space-x-1.5 font-mono text-base sm:text-lg font-extrabold text-amber-200 tracking-wider">
          <span>{modernTime.timeStr}</span>
          <span className="text-[10px] font-bold text-amber-400">
            {modernTime.ampm} IST
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="font-mono text-xs sm:text-sm font-extrabold text-amber-200 tracking-wide text-center">
            {vedicTime.formattedHindi}
          </div>
          <span className="text-[9px] text-amber-300/70 font-serif">
            सूर्योदय से इष्टकाल (१ घटी = २४ मि.)
          </span>
        </div>
      )}
    </div>
  );
};

export default VedicGhatiCounter;
