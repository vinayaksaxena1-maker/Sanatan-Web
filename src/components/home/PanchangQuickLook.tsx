import React, { useMemo } from 'react';
import { Navigation, Loader2, Sparkles, ScrollText } from 'lucide-react';
import { useRouter } from '../../routes/AppRoutes';
import type { PanchangInfo } from '../../engine/types';

interface CityInfo {
  name: string;
  nameHindi: string;
  latitude: number;
  longitude: number;
}

interface PanchangQuickLookProps {
  panchang: PanchangInfo;
  abhijitMuhurat: { startTime: string; endTime: string };
  clockTime: Date;
  currentCity: CityInfo;
  onOpenCityModal: () => void;
  detectDeviceLocation: () => void;
  isLocating: boolean;
  formattedDateHindi: string;
  currentDayName: string;
  currentDayRuler: string;
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

const YOGA_HINDI_MAP: Record<string, string> = {
  Vishkumbha: 'विष्कम्भ',
  Preeti: 'प्रीति',
  Ayushman: 'आयुष्मान',
  Saubhagya: 'सौभाग्य',
  Shobhana: 'शोभन',
  Atiganda: 'अतिगण्ड',
  Sukarma: 'सुकर्मा',
  Dhriti: 'धृति',
  Shoola: 'शूल',
  Ganda: 'गण्ड',
  Vriddhi: 'वृद्धि',
  Dhruva: 'ध्रुव',
  Vyaghata: 'व्याघात',
  Harshana: 'हर्षण',
  Vajra: 'वज्र',
  Siddhi: 'सिद्धि',
  Vyatipata: 'व्यतीपात',
  Variyan: 'वरीयान्',
  Parigha: 'परिघ',
  Shiva: 'शिव',
  Siddha: 'सिद्ध',
  Sadhya: 'साध्य',
  Shubha: 'शुभ',
  Shukla: 'शुक्ल',
  Brahma: 'ब्रह्म',
  Indra: 'इन्द्र',
  Vaidhriti: 'वैधृति',
};

const KARANA_HINDI_MAP: Record<string, string> = {
  Bava: 'बव',
  Balava: 'बालव',
  Kaulava: 'कौलव',
  Taitila: 'तैतिल',
  Garija: 'गर',
  Vanija: 'वणिज',
  Vishti: 'विष्टि (भद्रा)',
  Shakuni: 'शकुनि',
  Chatuspada: 'चतुष्पद',
  Naga: 'नाग',
  Kimstughna: 'किंस्तुघ्न',
};

function getYogaHindi(str: string): string {
  if (!str) return 'शुभ';
  const clean = str.split(' ')[0].split('(')[0].trim();
  return YOGA_HINDI_MAP[clean] || str;
}

function getKaranaHindi(str: string): string {
  if (!str) return 'वणिज';
  const clean = str.split(' ')[0].split('(')[0].trim();
  return KARANA_HINDI_MAP[clean] || str;
}

export const PanchangQuickLook: React.FC<PanchangQuickLookProps> = ({
  panchang,
  abhijitMuhurat,
  clockTime,
  currentCity,
  onOpenCityModal,
  detectDeviceLocation,
  isLocating,
  formattedDateHindi,
  currentDayName,
  currentDayRuler,
}) => {
  const { navigate } = useRouter();

  // Timeline Progress Calculations
  const curMin = clockTime.getHours() * 60 + clockTime.getMinutes();
  const sunriseMin = parseTimeToMinutes(panchang.sunrise);
  const sunsetMin = parseTimeToMinutes(panchang.sunset);
  const totalDayMin = Math.max(1, sunsetMin - sunriseMin);

  // Position on Day Bar (0% to 100%)
  const dayProgressPct = useMemo(() => {
    if (curMin < sunriseMin) return 0;
    if (curMin > sunsetMin) return 100;
    return Math.min(100, Math.max(0, ((curMin - sunriseMin) / totalDayMin) * 100));
  }, [curMin, sunriseMin, sunsetMin, totalDayMin]);

  // Rahu Kaal position on timeline
  const rahuKaal = panchang.rahuKaal;
  const rahuRange = useMemo(() => {
    if (!rahuKaal?.start || !rahuKaal?.end) return null;
    const s = parseTimeToMinutes(rahuKaal.start);
    const e = parseTimeToMinutes(rahuKaal.end);
    const startPct = Math.min(100, Math.max(0, ((s - sunriseMin) / totalDayMin) * 100));
    const widthPct = Math.min(100 - startPct, Math.max(0, ((e - s) / totalDayMin) * 100));
    return { startPct, widthPct, label: `${rahuKaal.start} - ${rahuKaal.end}` };
  }, [rahuKaal, sunriseMin, totalDayMin]);

  // Abhijit Muhurat position on timeline
  const abhijitRange = useMemo(() => {
    if (!abhijitMuhurat?.startTime || !abhijitMuhurat?.endTime) return null;
    const s = parseTimeToMinutes(abhijitMuhurat.startTime);
    const e = parseTimeToMinutes(abhijitMuhurat.endTime);
    const startPct = Math.min(100, Math.max(0, ((s - sunriseMin) / totalDayMin) * 100));
    const widthPct = Math.min(100 - startPct, Math.max(0, ((e - s) / totalDayMin) * 100));
    return { startPct, widthPct, label: `${abhijitMuhurat.startTime} - ${abhijitMuhurat.endTime}` };
  }, [abhijitMuhurat, sunriseMin, totalDayMin]);

  const yogaHindi = getYogaHindi(panchang.hinduDate?.yoga?.hindiName || panchang.hinduDate?.yoga?.name || '');
  const karanaHindi = getKaranaHindi(panchang.hinduDate?.karana?.hindiName || panchang.hinduDate?.karana?.name || '');

  return (
    <div className="flex flex-col space-y-4 sm:space-y-5">
      {/* City & Date Pill */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/20 text-xs text-amber-100 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <span className="flex items-center space-x-1.5 text-amber-300 font-bold">
            <span>📅</span>
            <span>{formattedDateHindi}</span>
          </span>
          <span className="text-amber-500/60 font-bold">|</span>
          <button
            type="button"
            onClick={onOpenCityModal}
            className="flex items-center space-x-1 font-semibold text-white hover:text-amber-300 transition-colors cursor-pointer group"
            title="स्थान / नगर बदलने के लिए क्लिक करें"
          >
            <span className="text-amber-400">📍</span>
            <span className="group-hover:underline underline-offset-2">
              {currentCity.nameHindi || currentCity.name}
            </span>
            <span className="text-[10px] text-amber-400">▾</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              detectDeviceLocation();
            }}
            disabled={isLocating}
            className="p-1 rounded-full hover:bg-amber-500/20 text-amber-300 transition-colors cursor-pointer disabled:opacity-50"
            title="GPS द्वारा निकटतम स्थान पहचानें"
          >
            {isLocating ? (
              <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
            ) : (
              <Navigation className="w-3 h-3 hover:scale-110 transition-transform text-amber-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Container for Quick-Look Content */}
      <div className="bg-[#060913]/70 hover:bg-[#060913]/80 backdrop-blur-xl rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 lg:p-6 border border-[#1e1b4b]/80 hover:border-amber-500/35 shadow-[0_25px_60px_rgba(6,9,19,0.8)] space-y-4 transition-all duration-300">
        
        {/* ========================================================
            1. SLEEK 5-ANGA HORIZONTAL STRIP
           ======================================================== */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-amber-300 font-serif tracking-wider uppercase flex items-center space-x-1.5">
              <span>✦</span>
              <span>दैनिक पंचांग के मुख्य ५ अंग</span>
            </span>
            <span className="text-[10px] text-amber-200/60 font-serif">
              {currentDayRuler}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
            
            {/* 1. Tithi */}
            <div className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/10 hover:border-amber-400/40 shadow-sm transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">तिथि</span>
                <span className="text-xs">🌙</span>
              </div>
              <p className="text-xs sm:text-[13px] font-extrabold text-white leading-tight truncate">
                {panchang.hinduDate?.tithi?.hindiName || 'शुक्ल पक्ष'}
              </p>
              <p className="text-[9.5px] text-amber-200/60 truncate font-mono mt-0.5">
                {panchang.hinduDate?.tithi?.endTime ? `${panchang.hinduDate.tithi.endTime} तक` : 'पूर्ण दिन'}
              </p>
            </div>

            {/* 2. Vaar */}
            <div className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/10 hover:border-amber-400/40 shadow-sm transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">वार</span>
                <span className="text-xs">☀️</span>
              </div>
              <p className="text-xs sm:text-[13px] font-extrabold text-white leading-tight truncate">
                {currentDayName}
              </p>
              <p className="text-[9.5px] text-amber-200/60 truncate font-medium mt-0.5">
                {currentDayRuler.split(' ')[0]}
              </p>
            </div>

            {/* 3. Nakshatra */}
            <div className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/10 hover:border-amber-400/40 shadow-sm transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">नक्षत्र</span>
                <span className="text-xs">✨</span>
              </div>
              <p className="text-xs sm:text-[13px] font-extrabold text-white leading-tight truncate">
                {panchang.hinduDate?.nakshatra?.hindiName || 'रोहिणी'}
              </p>
              <p className="text-[9.5px] text-amber-200/60 truncate font-mono mt-0.5">
                {panchang.hinduDate?.nakshatra?.endTime ? `${panchang.hinduDate.nakshatra.endTime} तक` : 'सक्रिय'}
              </p>
            </div>

            {/* 4. Yoga */}
            <div className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/10 hover:border-amber-400/40 shadow-sm transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">योग</span>
                <span className="text-xs">🪷</span>
              </div>
              <p className="text-xs sm:text-[13px] font-extrabold text-white leading-tight truncate">
                {yogaHindi}
              </p>
              <p className="text-[9.5px] text-amber-200/60 truncate font-mono mt-0.5">
                {panchang.hinduDate?.yoga?.endTime ? `${panchang.hinduDate.yoga.endTime} तक` : 'अहोरात्र'}
              </p>
            </div>

            {/* 5. Karana */}
            <div className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/10 hover:border-amber-400/40 shadow-sm transition-all flex flex-col justify-between col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">करण</span>
                <span className="text-xs">⚡</span>
              </div>
              <p className="text-xs sm:text-[13px] font-extrabold text-white leading-tight truncate">
                {karanaHindi}
              </p>
              <p className="text-[9.5px] text-amber-200/60 truncate font-mono mt-0.5">
                {panchang.hinduDate?.karana?.endTime ? `${panchang.hinduDate.karana.endTime} तक` : 'सक्रिय'}
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================
            2. SOLAR TIMELINE BAR (Day Spectrum Progress)
           ======================================================== */}
        <div className="bg-black/30 rounded-2xl p-3 sm:p-3.5 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-medium text-amber-200/80">
            <span className="flex items-center space-x-1">
              <span>🌅 सूर्योदय:</span>
              <strong className="text-white font-mono">{panchang.sunrise}</strong>
            </span>
            <span className="text-[10px] text-amber-300 font-serif hidden sm:inline">
              दिन का समय चक्र
            </span>
            <span className="flex items-center space-x-1">
              <span>🌇 सूर्यास्त:</span>
              <strong className="text-white font-mono">{panchang.sunset}</strong>
            </span>
          </div>

          {/* Timeline Track */}
          <div className="relative h-2.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-white/10">
            {/* Sunrise to Sunset Base Progress */}
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 transition-all duration-500 rounded-full"
              style={{ width: `${dayProgressPct}%` }}
            />

            {/* Rahu Kaal Overlay Slice */}
            {rahuRange && (
              <div
                className="absolute top-0 bottom-0 bg-rose-500/70 border-x border-rose-400"
                style={{
                  left: `${rahuRange.startPct}%`,
                  width: `${rahuRange.widthPct}%`,
                }}
                title={`राहुकाल: ${rahuRange.label}`}
              />
            )}

            {/* Abhijit Muhurat Overlay Slice */}
            {abhijitRange && (
              <div
                className="absolute top-0 bottom-0 bg-emerald-400/80 border-x border-emerald-300"
                style={{
                  left: `${abhijitRange.startPct}%`,
                  width: `${abhijitRange.widthPct}%`,
                }}
                title={`अभिजीत मुहूर्त: ${abhijitRange.label}`}
              />
            )}
          </div>

          {/* Timeline Legend Labels */}
          <div className="flex items-center justify-between text-[10px] text-white/60 font-mono pt-0.5">
            <div className="flex items-center space-x-3">
              {rahuKaal && (
                <span className="flex items-center space-x-1 text-rose-300">
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500" />
                  <span>राहुकाल: {rahuKaal.start} - {rahuKaal.end}</span>
                </span>
              )}
              {abhijitMuhurat && (
                <span className="flex items-center space-x-1 text-emerald-300">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span>अभिजीत: {abhijitMuhurat.startTime} - {abhijitMuhurat.endTime}</span>
                </span>
              )}
            </div>
            <span className="text-amber-300/80 font-serif text-[10.5px]">
              {dayProgressPct > 0 && dayProgressPct < 100 ? 'दिन सक्रिय' : 'रात्रि काल'}
            </span>
          </div>
        </div>

        {/* ========================================================
            3. ACTION-ORIENTED CALL-TO-ACTION (CTA) BUTTONS
           ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Primary CTA: Kundli */}
          <button
            type="button"
            onClick={() => navigate('/kundli')}
            className="group relative px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-[0_8px_25px_rgba(217,119,6,0.35)] hover:shadow-[0_10px_30px_rgba(217,119,6,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer border border-amber-300/30"
          >
            <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
            <span>संपूर्ण कुंडली बनाएं (Free)</span>
            <span className="text-amber-200 group-hover:translate-x-1 transition-transform">→</span>
          </button>

          {/* Secondary CTA: Full Panchang */}
          <button
            type="button"
            onClick={() => navigate('/panchang')}
            className="group px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-amber-200 hover:text-white font-semibold text-sm sm:text-base border border-amber-400/40 hover:border-amber-400/80 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <ScrollText className="w-4 h-4 text-amber-400" />
            <span>आज का विस्तृत पंचांग देखें</span>
            <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PanchangQuickLook;
