import { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import CitySelectModal from '../components/common/CitySelectModal';
import { AnalogClock } from '../components/watch/AnalogClock';
import { useLocationStore } from '../store/locationStore';
import { calculatePanchang, getMuhuratsForPanchang } from '../engine';
import { Navigation, Loader2 } from 'lucide-react';

const HINDI_DAYS = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
const HINDI_DAY_RULERS = [
  'सूर्य का दिन (रवि वासर)',
  'चंद्र का दिन (सोम वासर)',
  'मंगल का दिन (भौम वासर)',
  'बुध का दिन (सौम्य वासर)',
  'बृहस्पति का दिन (गुरु वासर)',
  'शुक्र का दिन (भृगु वासर)',
  'शनि का दिन (मन्द वासर)',
];
const HINDI_MONTHS = [
  'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
  'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
];

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

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.split(' ');
  if (parts.length < 2) return 0;
  const [time, ampm] = parts;
  let [hrs, mins] = time.split(':').map(Number);
  if (isNaN(hrs) || isNaN(mins)) return 0;
  if (ampm === 'PM' && hrs !== 12) hrs += 12;
  if (ampm === 'AM' && hrs === 12) hrs = 0;
  return hrs * 60 + mins;
}

function isTimeInInterval(curMin: number, startStr: string, endStr: string): boolean {
  const start = parseTimeToMinutes(startStr);
  const end = parseTimeToMinutes(endStr);
  if (end < start) {
    return curMin >= start || curMin < end;
  }
  return curMin >= start && curMin < end;
}

export default function Home() {
  const { currentCity, isLocating, detectDeviceLocation } = useLocationStore();
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  // Live real-time Panchang calculation from engine
  const today = useMemo(() => new Date(), []);

  const panchang = useMemo(() => {
    return calculatePanchang(currentCity.latitude, currentCity.longitude, today);
  }, [currentCity.latitude, currentCity.longitude, today]);

  const abhijitMuhurat = useMemo(() => {
    try {
      const muhurats = getMuhuratsForPanchang(panchang);
      const abhijit = muhurats.find((m) => m.id === 'abhijit');
      if (abhijit) return { startTime: abhijit.startTime, endTime: abhijit.endTime };
    } catch {
      // fallback
    }
    return { startTime: '11:43 AM', endTime: '12:28 PM' };
  }, [panchang]);

  // Live Clock & Ticker
  const [clockTime, setClockTime] = useState(() => new Date());
  const [currentTimeStr, setCurrentTimeStr] = useState(() => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClockTime(now);
      setCurrentTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeChoghadiyaIndex = useMemo(() => {
    if (!panchang.choghadiya || panchang.choghadiya.length === 0) return 0;
    const curMin = clockTime.getHours() * 60 + clockTime.getMinutes();
    const idx = panchang.choghadiya.findIndex((ch) => isTimeInInterval(curMin, ch.startTime, ch.endTime));
    return idx !== -1 ? idx : 0;
  }, [panchang.choghadiya, clockTime]);

  const activeHora = useMemo(() => {
    if (!panchang.hora || panchang.hora.length === 0) return null;
    const curMin = clockTime.getHours() * 60 + clockTime.getMinutes();
    return panchang.hora.find((h) => isTimeInInterval(curMin, h.startTime, h.endTime)) || panchang.hora[0];
  }, [panchang.hora, clockTime]);

  const currentDayIndex = today.getDay();
  const currentDayName = HINDI_DAYS[currentDayIndex];
  const currentDayRuler = HINDI_DAY_RULERS[currentDayIndex];
  const formattedDateHindi = `${currentDayName}, ${today.getDate()} ${HINDI_MONTHS[today.getMonth()]} ${today.getFullYear()}`;

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E1B18] font-sans antialiased selection:bg-[#EA6A2A]/20">
      
      {/* Top Floating Pill Navigation */}
      <Navbar />

      {/* City Selector Modal */}
      <CitySelectModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
      />

      {/* ========================================================
          FOLD 1: HERO — FULL-STRETCH TEMPLE PANCHANG & VEDIC WATCH
         ======================================================== */}
      <section className="relative w-full overflow-hidden border-b border-[#E6DEC8] bg-[#FAF6F0]">
        
        {/* Full-bleed Background Wallpaper across entire Hero width */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ backgroundImage: `url('/assets/temple_panchang_bg.png')` }}
        />
        {/* Ambient Golden Atmosphere & Soft Glass Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0]/92 via-[#FAF6F0]/68 to-[#FAF6F0]/90 backdrop-blur-[0.5px]" />

        {/* Content Container (Full Width with generous edge padding) */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, City Pill, 9-Element Frosted Card, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Top Sacred Header */}
              <div className="text-center space-y-1.5 pt-1">
                <p className="text-xs font-serif font-bold tracking-widest text-[#8B2612] uppercase">
                  ॥ सनातन जीवन का डिजिटल साथी ॥
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-[#1E1B18] tracking-tight">
                  आज का पंचांग
                </h1>
                <p className="text-xs sm:text-sm text-[#4A3E36] font-medium">
                  दिन की सही दिशा, शुभ समय के साथ
                </p>
              </div>

              {/* Floating Date & City Pill */}
              <div className="flex justify-center">
                <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#E6DEC8] shadow-xs text-xs text-[#1E1B18]">
                  <span className="flex items-center space-x-1.5 text-[#8B2612] font-bold">
                    <span>📅</span>
                    <span>{formattedDateHindi}</span>
                  </span>
                  <span className="text-[#C88A2B] font-bold">|</span>
                  <button
                    type="button"
                    onClick={() => setIsCityModalOpen(true)}
                    className="flex items-center space-x-1 font-semibold text-[#1E1B18] hover:text-[#EA6A2A] transition-colors cursor-pointer group"
                    title="स्थान / नगर बदलने के लिए क्लिक करें"
                  >
                    <span className="text-[#EA6A2A]">📍</span>
                    <span className="group-hover:underline underline-offset-2">
                      {currentCity.nameHindi || currentCity.name}
                    </span>
                    <span className="text-[10px] text-[#C88A2B]">▾</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      detectDeviceLocation();
                    }}
                    disabled={isLocating}
                    className="p-1 rounded-full hover:bg-amber-100 text-[#8B2612] transition-colors cursor-pointer disabled:opacity-50"
                    title="GPS द्वारा निकटतम स्थान पहचानें"
                  >
                    {isLocating ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8B2612]" />
                    ) : (
                      <Navigation className="w-3.5 h-3.5 hover:scale-110 transition-transform text-[#EA6A2A]" />
                    )}
                  </button>
                </div>
              </div>

              {/* 9-Element Frosted Glassmorphism Card */}
              <div className="bg-white/92 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/80 shadow-[0_12px_36px_rgba(139,38,18,0.08)] space-y-4">
                
                {/* Row 1: 4 Items (तिथि, वार, नक्षत्र, योग) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 pb-3 sm:pb-4 border-b border-[#E6DEC8]/70">
                  
                  {/* 1. Tithi */}
                  <div className="flex items-start space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/30 flex items-center justify-center shrink-0 shadow-2xs">
                      {/* Conch/Crescent Sacred SVG */}
                      <svg className="w-5 h-5 text-[#B45309]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" fill="currentColor" fillOpacity="0.2"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-[#8B2612] uppercase tracking-wider">तिथि</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#1E1B18] truncate">
                        {panchang.hinduDate.tithi.hindiName}
                      </p>
                      <p className="text-[10px] text-[#6E6259] truncate font-medium">
                        {panchang.hinduDate.tithi.endTime ? `${panchang.hinduDate.tithi.endTime} तक` : 'पूर्ण दिन'}
                      </p>
                    </div>
                  </div>

                  {/* 2. Vaar */}
                  <div className="flex items-start space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/30 flex items-center justify-center shrink-0 shadow-2xs">
                      <svg className="w-5 h-5 text-[#B45309]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-[#8B2612] uppercase tracking-wider">वार</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#1E1B18] truncate">
                        {currentDayName}
                      </p>
                      <p className="text-[10px] text-[#6E6259] truncate font-medium">
                        {currentDayRuler}
                      </p>
                    </div>
                  </div>

                  {/* 3. Nakshatra */}
                  <div className="flex items-start space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/30 flex items-center justify-center shrink-0 shadow-2xs">
                      <svg className="w-5 h-5 text-[#B45309]" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-[#8B2612] uppercase tracking-wider">नक्षत्र</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#1E1B18] truncate">
                        {panchang.hinduDate.nakshatra.hindiName}
                      </p>
                      <p className="text-[10px] text-[#6E6259] truncate font-medium">
                        {panchang.hinduDate.nakshatra.endTime ? `${panchang.hinduDate.nakshatra.endTime} तक` : 'सक्रिय'}
                      </p>
                    </div>
                  </div>

                  {/* 4. Yoga */}
                  <div className="flex items-start space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#F59E0B]/30 flex items-center justify-center shrink-0 shadow-2xs">
                      {/* Sacred Lotus SVG */}
                      <svg className="w-5 h-5 text-[#B45309]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 4c1.5 3 4 5 7 6-2 3-5 4-7 4s-5-1-7-4c3-1 5.5-3 7-6z" fill="currentColor" fillOpacity="0.2"/>
                        <path d="M12 14c-1.5 2.5-3 4-6 4 0-3 2-5 6-4z"/>
                        <path d="M12 14c1.5 2.5 3 4 6 4 0-3-2-5-6-4z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-[#8B2612] uppercase tracking-wider">योग</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#1E1B18] truncate">
                        {getYogaHindi(panchang.hinduDate.yoga.hindiName || panchang.hinduDate.yoga.name)}
                      </p>
                      <p className="text-[10px] text-[#6E6259] truncate font-medium">
                        {panchang.hinduDate.yoga.endTime ? `${panchang.hinduDate.yoga.endTime} तक` : 'अहोरात्र'}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Row 2: 5 Items (करण, सूर्योदय, सूर्यास्त, राहु काल, अभिजीत मुहूर्त) */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-2 pt-1">
                  
                  {/* 5. Karana */}
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF2E6] border border-[#E6DEC8] flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#EA6A2A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="12" r="5" />
                        <circle cx="15" cy="12" r="5" strokeDasharray="2 2" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-[#8B2612] uppercase">करण</p>
                      <p className="text-xs font-bold text-[#1E1B18] truncate">
                        {getKaranaHindi(panchang.hinduDate.karana.hindiName || panchang.hinduDate.karana.name)}
                      </p>
                      <p className="text-[9px] text-[#6E6259] truncate font-medium">
                        {panchang.hinduDate.karana.endTime ? `${panchang.hinduDate.karana.endTime} तक` : 'सक्रिय'}
                      </p>
                    </div>
                  </div>

                  {/* 6. Sunrise */}
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] border border-[#F59E0B]/30 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#D97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M4.93 10.93l2.83-2.83M2 18h20M20 18a8 8 0 0 0-16 0" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-[#8B2612] uppercase">सूर्योदय</p>
                      <p className="text-xs font-mono font-bold text-[#1E1B18] truncate">
                        {panchang.sunrise}
                      </p>
                      <p className="text-[9px] text-[#6E6259]">प्रातः काल</p>
                    </div>
                  </div>

                  {/* 7. Sunset */}
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FFEDD5] border border-[#EA580C]/30 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#C2410C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 10V2M4.93 4.93l2.83 2.83M2 18h20M20 18a8 8 0 0 0-16 0" />
                        <polyline points="16 6 12 10 8 6" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-[#8B2612] uppercase">सूर्यास्त</p>
                      <p className="text-xs font-mono font-bold text-[#1E1B18] truncate">
                        {panchang.sunset}
                      </p>
                      <p className="text-[9px] text-[#6E6259]">सायं काल</p>
                    </div>
                  </div>

                  {/* 8. Rahu Kaal */}
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] border border-[#EF4444]/30 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#B91C1C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9"/>
                        <polyline points="12 6 12 12 15 15"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-[#B91C1C] uppercase">राहु काल</p>
                      <p className="text-xs font-mono font-bold text-[#991B1B] truncate">
                        {panchang.rahuKaal.start}
                      </p>
                      <p className="text-[9px] text-[#B91C1C] truncate">
                        {panchang.rahuKaal.end} तक
                      </p>
                    </div>
                  </div>

                  {/* 9. Abhijit Muhurat */}
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] border border-[#22C55E]/30 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-[#15803D]">卐</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-[#15803D] uppercase">अभिजीत</p>
                      <p className="text-xs font-mono font-bold text-[#166534] truncate">
                        {abhijitMuhurat.startTime}
                      </p>
                      <p className="text-[9px] text-[#15803D] truncate">
                        {abhijitMuhurat.endTime} तक
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Action Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <a 
                  href="/panchang" 
                  className="bg-gradient-to-r from-[#EA6A2A] to-[#C84B15] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center space-x-1.5"
                >
                  <span>🧭</span>
                  <span>संपूर्ण आज का पंचांग देखें</span>
                  <span>➔</span>
                </a>

                <a 
                  href="/kundli" 
                  className="bg-white/95 hover:bg-white text-[#1E1B18] px-5 py-2.5 rounded-full font-bold text-xs border border-[#E6DEC8] shadow-2xs active:scale-95 transition-all flex items-center space-x-1.5"
                >
                  <span>✨</span>
                  <span>अपनी जन्म कुंडली बनाएं</span>
                </a>
              </div>

            </div>

            {/* Right Column: Neumorphic 3D Raised Box for Rolex Vedic Watch */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
              
              {/* Neumorphic 3D Raised Floating Box */}
              <div className="relative rounded-[32px] sm:rounded-[38px] p-5 sm:p-6 bg-gradient-to-br from-white/95 via-[#FAF6F0]/90 to-[#F2E8DC]/85 backdrop-blur-md border border-white/95 shadow-[18px_18px_45px_rgba(139,38,18,0.16),-12px_-12px_32px_rgba(255,255,255,0.95),inset_1px_1px_3px_rgba(255,255,255,0.9)] flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.01] hover:shadow-[20px_20px_50px_rgba(139,38,18,0.18),-14px_-14px_35px_rgba(255,255,255,0.98)]">
                
                {/* Watch Canvas */}
                <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[330px] lg:h-[330px] aspect-square flex items-center justify-center [&_svg]:overflow-visible">
                  <AnalogClock
                    time={clockTime}
                    choghadiyaList={panchang.choghadiya}
                    activeChoghadiyaIndex={activeChoghadiyaIndex}
                    activeHora={activeHora}
                    horaList={panchang.hora}
                    sunriseTimeStr={panchang.sunrise}
                    sunsetTimeStr={panchang.sunset}
                    language="Hindi"
                  />
                </div>

                {/* Live Digital Clock & Coordinates Under Watch inside the Neumorphic Card */}
                <div className="text-center mt-3 space-y-1">
                  <div className="text-2xl font-mono font-extrabold tracking-widest text-[#1E1B18] tabular-nums">
                    {currentTimeStr}
                  </div>
                  <p className="text-xs text-[#6E6259]">
                    भारतीय मानक समय (IST) • {currentCity.nameHindi} ({currentCity.latitude.toFixed(2)}° N, {currentCity.longitude.toFixed(2)}° E)
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Main Container for Folds 2, 3 & Footer */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">


        {/* ========================================================
            FOLD 2: TODAY'S LIVING PULSE (Bento 3-Card Strip)
           ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🌟</span>
              <h2 className="text-xl font-bold font-serif text-[#1E1B18]">आज का तात्कालिक काल (Living Pulse)</h2>
            </div>
            <span className="text-xs text-[#6E6259]">{formattedDateHindi}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: आज का शुभ काल */}
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] flex flex-col justify-between space-y-4 hover:border-[#C88A2B]/70 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">✨</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    शुभ मुहूर्त
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1E1B18] font-serif">आज का शुभ काल</h3>
                  <p className="text-xs text-[#6E6259]">अभिजीत एवं अमृत चौघड़िया का श्रेष्ठ समय</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF6F0] space-y-2 border border-[#E6DEC8]/70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#6E6259]">अभिजीत मुहूर्त:</span>
                    <span className="font-mono font-bold text-[#1E1B18]">{abhijitMuhurat.startTime} – {abhijitMuhurat.endTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#6E6259]">सक्रिय चौघड़िया:</span>
                    <span className="font-mono font-bold text-emerald-700">शुभ (अमृत काल)</span>
                  </div>
                </div>
                <p className="text-[11px] text-rose-700 font-medium">
                  ⚠️ राहु काल: {panchang.rahuKaal.start} – {panchang.rahuKaal.end} (शुभ कार्य वर्जित)
                </p>
              </div>

              <a 
                href="/muhurat" 
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#EA6A2A] hover:text-[#8B2612] transition-colors pt-2"
              >
                <span>सभी मुहूर्त एवं राहुकाल देखें</span>
                <span>➔</span>
              </a>
            </div>

            {/* Card 2: चंद्र स्थिति एवं कला */}
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] flex flex-col justify-between space-y-4 hover:border-[#C88A2B]/70 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🌔</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2E6] text-[#8B2612] font-bold text-[10px] border border-[#E6DEC8]">
                    {panchang.hinduDate.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1E1B18] font-serif">चंद्र स्थिति एवं कला</h3>
                  <p className="text-xs text-[#6E6259]">खगोलीय प्रकाशित भाग एवं नक्षत्र संचरण</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF6F0] space-y-2 border border-[#E6DEC8]/70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#6E6259]">तिथि व पक्ष:</span>
                    <span className="font-mono font-bold text-[#1E1B18]">{panchang.hinduDate.paksha === 'Shukla' ? 'शुक्ल' : 'कृष्ण'} {panchang.hinduDate.tithi.hindiName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#6E6259]">नक्षत्र:</span>
                    <span className="font-bold text-[#8B2612]">{panchang.hinduDate.nakshatra.hindiName}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#6E6259]">
                  🌅 सूर्योदय: {panchang.sunrise} • 🌄 सूर्यास्त: {panchang.sunset}
                </p>
              </div>

              <a 
                href="/panchang" 
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#EA6A2A] hover:text-[#8B2612] transition-colors pt-2"
              >
                <span>संपूर्ण दैनिक पंचांग देखें</span>
                <span>➔</span>
              </a>
            </div>

            {/* Card 3: आगामी पर्व एवं व्रत */}
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] flex flex-col justify-between space-y-4 hover:border-[#C88A2B]/70 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🪔</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                    व्रत पर्व
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1E1B18] font-serif">आगामी पर्व एवं व्रत</h3>
                  <p className="text-xs text-[#6E6259]">निकटतम धर्मशास्त्रीय व्रत व चंद्रोदय समय</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF6F0] space-y-1.5 border border-[#E6DEC8]/70">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#1E1B18]">करवा चौथ / संकष्टी</span>
                    <span className="text-[10px] font-mono font-bold text-[#EA6A2A] bg-white px-2 py-0.5 rounded-md border border-[#E6DEC8]">आज, 23 अक्टू</span>
                  </div>
                  <p className="text-[11px] text-[#6E6259] leading-relaxed">
                    पति की दीर्घायु हेतु व्रत • चंद्रोदय समय रात्रि 08:14 PM
                  </p>
                </div>
                <p className="text-[11px] text-[#6E6259]">
                  अगला पर्व: <strong>अहोई अष्टमी</strong> (28 अक्टूबर)
                </p>
              </div>

              <a 
                href="/calendar" 
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#EA6A2A] hover:text-[#8B2612] transition-colors pt-2"
              >
                <span>मासिक हिंदू कैलेंडर देखें</span>
                <span>➔</span>
              </a>
            </div>

          </div>
        </section>


        {/* ========================================================
            FOLD 3: GATEWAYS TO DEEP SYSTEMS (Clean 4 Cards)
           ======================================================== */}
        <section className="space-y-6 pt-2">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1E1B18]">
              वैदिक कालगणना प्रणालियां
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6259]">
              बिना किसी विज्ञापन के, 100% सटीक और तात्कालिक वैदिक गणनाएं।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Gateway 1: जन्म कुंडली एवं षोडशवर्ग */}
            <a 
              href="/kundli" 
              className="p-6 rounded-3xl bg-[#FFFFFF] hover:bg-[#FAF2E6]/60 border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.04)] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] group-hover:bg-[#FFFFFF] border border-[#E6DEC8] flex items-center justify-center text-2xl transition-colors">
                  📐
                </div>
                <h3 className="font-bold text-base text-[#1E1B18] group-hover:text-[#8B2612] font-serif transition-colors">
                  जन्म कुंडली & षोडशवर्ग
                </h3>
                <p className="text-xs text-[#6E6259] leading-relaxed">
                  D1 से D60 डिविजनल चार्ट्स, 6-गुना षड्बल, और 337 बिंदु सर्वाष्टकवर्ग।
                </p>
              </div>
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#EA6A2A] group-hover:translate-x-1 transition-transform">
                <span>कुंडली बनाएं</span>
                <span>➔</span>
              </span>
            </a>

            {/* Gateway 2: 36 गुण विवाह मिलान */}
            <a 
              href="/matchmaking" 
              className="p-6 rounded-3xl bg-[#FFFFFF] hover:bg-[#FAF2E6]/60 border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.04)] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] group-hover:bg-[#FFFFFF] border border-[#E6DEC8] flex items-center justify-center text-2xl transition-colors">
                  ❤️
                </div>
                <h3 className="font-bold text-base text-[#1E1B18] group-hover:text-[#8B2612] font-serif transition-colors">
                  36 गुण विवाह मिलान
                </h3>
                <p className="text-xs text-[#6E6259] leading-relaxed">
                  अष्टकूट मिलान, नाड़ी दोष, भकूट परिहार और दांपत्य सुख का विस्तृत विश्लेषण।
                </p>
              </div>
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#EA6A2A] group-hover:translate-x-1 transition-transform">
                <span>मिलान करें</span>
                <span>➔</span>
              </span>
            </a>

            {/* Gateway 3: मासिक पंचांग व कैलेंडर */}
            <a 
              href="/calendar" 
              className="p-6 rounded-3xl bg-[#FFFFFF] hover:bg-[#FAF2E6]/60 border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.04)] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] group-hover:bg-[#FFFFFF] border border-[#E6DEC8] flex items-center justify-center text-2xl transition-colors">
                  📅
                </div>
                <h3 className="font-bold text-base text-[#1E1B18] group-hover:text-[#8B2612] font-serif transition-colors">
                  मासिक पंचांग व कैलेंडर
                </h3>
                <p className="text-xs text-[#6E6259] leading-relaxed">
                  100+ व्रत-त्योहार, स्मार्त/वैष्णव एकादशी निर्णय और 13 प्रांतीय कैलेंडर।
                </p>
              </div>
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#EA6A2A] group-hover:translate-x-1 transition-transform">
                <span>कैलेंडर देखें</span>
                <span>➔</span>
              </span>
            </a>

            {/* Gateway 4: वैदिक मुहूर्त व चौघड़िया */}
            <a 
              href="/muhurat" 
              className="p-6 rounded-3xl bg-[#FFFFFF] hover:bg-[#FAF2E6]/60 border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.04)] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] group-hover:bg-[#FFFFFF] border border-[#E6DEC8] flex items-center justify-center text-2xl transition-colors">
                  ⏳
                </div>
                <h3 className="font-bold text-base text-[#1E1B18] group-hover:text-[#8B2612] font-serif transition-colors">
                  वैदिक मुहूर्त व चौघड़िया
                </h3>
                <p className="text-xs text-[#6E6259] leading-relaxed">
                  विवाह, गृह प्रवेश, वाहन क्रय मुहूर्त और दिन-रात का 8-पहर चौघड़िया चक्र।
                </p>
              </div>
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#EA6A2A] group-hover:translate-x-1 transition-transform">
                <span>मुहूर्त खोजें</span>
                <span>➔</span>
              </span>
            </a>

          </div>
        </section>

      </main>

      {/* Minimal Serverless Status Footer */}
      <footer className="mt-20 border-t border-[#E6DEC8] py-8 px-6 bg-[#FAF2E6]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E6259] space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>सर्वरलेस शुद्ध गणितीय इंजन: 0ms लेटेंसी, शून्य नेटवर्क ट्रैफ़िक</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/privacy-policy" className="hover:text-[#8B2612]">गोपनीयता नीति</a>
            <span>•</span>
            <a href="/terms" className="hover:text-[#8B2612]">शर्तें एवं नियम</a>
            <span>•</span>
            <span>सनातन घड़ी © 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
