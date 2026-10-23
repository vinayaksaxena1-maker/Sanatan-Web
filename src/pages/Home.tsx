import { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import CitySelectModal from '../components/common/CitySelectModal';
import { LiveMuhuratWatchCard } from '../components/watch';
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
      <section className="relative w-full overflow-hidden border-b border-[#3D332A] bg-[#12100E]">
        
        {/* Full-bleed Background Wallpaper across entire Hero width */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ backgroundImage: `url('/assets/temple_panchang_bg.png')` }}
        />
        {/* Atmospheric Subtle Dark Black Overlay (Halke Black Colour) so content pops out vividly */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/70 backdrop-blur-[0.5px]" />

        {/* Content Container (Full Width with generous edge padding) */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Heading, City Pill, 9-Element Frosted Card, CTAs */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Top Sacred Header */}
              <div className="text-center space-y-1.5 pt-1">
                <p className="text-xs font-serif font-bold tracking-widest text-amber-400 uppercase drop-shadow-sm">
                  ॥ सनातन जीवन का डिजिटल साथी ॥
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  आज का पंचांग
                </h1>
                <p className="text-xs sm:text-sm text-amber-100/90 font-serif tracking-wide drop-shadow-sm">
                  दिन की सही दिशा, शुभ समय के साथ
                </p>
              </div>

              {/* Floating Date & City Pill */}
              <div className="flex justify-center">
                <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.35)] text-xs text-[#1E1B18]">
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

              {/* 9-Element Frosted Glassmorphism Grid: Row 1 = 4 Boxes, Row 2 = 5 Boxes */}
              <div className="bg-white/92 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-white/85 shadow-[0_20px_50px_rgba(0,0,0,0.35)] space-y-3 sm:space-y-3.5">
                
                {/* Row 1: 4 Boxes (तिथि, वार, नक्षत्र, योग) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  
                  {/* 1. Tithi (तिथि) */}
                  <div className="bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-103 transition-all duration-300 flex items-center space-x-2.5 group cursor-pointer">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-115">
                      {/* Standalone Colorful Moon & Star (No Circle) */}
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-[0_2px_8px_rgba(245,158,11,0.45)]" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" fill="url(#tithiMoonGrad)" />
                        <path d="M18.5 4.5l.8 1.6 1.7.8-1.7.8-.8 1.6-.8-1.6-1.7-.8 1.7-.8.8-1.6z" fill="#F59E0B" />
                        <defs>
                          <linearGradient id="tithiMoonGrad" x1="3" y1="3" x2="21" y2="21">
                            <stop stopColor="#F59E0B" />
                            <stop offset="1" stopColor="#D97706" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10.5px] font-bold text-[#8B2612] uppercase tracking-wider">तिथि</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#1E1B18] truncate">
                        {panchang.hinduDate.tithi.hindiName}
                      </p>
                      <p className="text-[10px] text-[#6E6259] truncate font-medium">
                        {panchang.hinduDate.tithi.endTime ? `${panchang.hinduDate.tithi.endTime} तक` : 'पूर्ण दिन'}
                      </p>
                    </div>
                  </div>

                  {/* 2. Vaar (वार) */}
                  <div className="bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-103 transition-all duration-300 flex items-center space-x-2.5 group cursor-pointer">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-115">
                      {/* Standalone Colorful Solar Calendar (No Circle) */}
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-[0_2px_8px_rgba(234,88,12,0.45)]" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="3" stroke="#EA580C" strokeWidth="2" fill="#FFEDD5" fillOpacity="0.4" />
                        <line x1="16" y1="2" x2="16" y2="6" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
                        <line x1="8" y1="2" x2="8" y2="6" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
                        <line x1="3" y1="10" x2="21" y2="10" stroke="#EA580C" strokeWidth="1.75" />
                        <circle cx="12" cy="15" r="2.5" fill="#F97316" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10.5px] font-bold text-[#8B2612] uppercase tracking-wider">वार</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#1E1B18] truncate">
                        {currentDayName}
                      </p>
                      <p className="text-[10px] text-[#6E6259] truncate font-medium">
                        {currentDayRuler}
                      </p>
                    </div>
                  </div>

                  {/* 3. Nakshatra (नक्षत्र) */}
                  <div className="bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-103 transition-all duration-300 flex items-center space-x-2.5 group cursor-pointer">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-115">
                      {/* Standalone Colorful Cosmic Constellation (No Circle) */}
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-[0_2px_8px_rgba(139,92,246,0.45)]" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" fill="url(#nakshatraGrad)" />
                        <circle cx="19" cy="5" r="1.5" fill="#C084FC" />
                        <circle cx="5" cy="19" r="1.2" fill="#818CF8" />
                        <defs>
                          <linearGradient id="nakshatraGrad" x1="3" y1="2" x2="21" y2="20">
                            <stop stopColor="#8B5CF6" />
                            <stop offset="1" stopColor="#6366F1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10.5px] font-bold text-[#8B2612] uppercase tracking-wider">नक्षत्र</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#1E1B18] truncate">
                        {panchang.hinduDate.nakshatra.hindiName}
                      </p>
                      <p className="text-[10px] text-[#6E6259] truncate font-medium">
                        {panchang.hinduDate.nakshatra.endTime ? `${panchang.hinduDate.nakshatra.endTime} तक` : 'सक्रिय'}
                      </p>
                    </div>
                  </div>

                  {/* 4. Yoga (योग) */}
                  <div className="bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-103 transition-all duration-300 flex items-center space-x-2.5 group cursor-pointer">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-115">
                      {/* Standalone Colorful Sacred Lotus (No Circle) */}
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-[0_2px_8px_rgba(225,29,72,0.45)]" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4c1.8 3 4.5 5 7.5 6-2 3-5 4-7.5 4s-5.5-1-7.5-4c3-1 5.7-3 7.5-6z" fill="#FB7185" fillOpacity="0.85" />
                        <path d="M12 14c-1.8 2.5-3.5 4-7 4 0-3.5 2.5-5.5 7-4z" fill="#E11D48" />
                        <path d="M12 14c1.8 2.5 3.5 4 7 4 0-3.5-2.5-5.5-7-4z" fill="#BE123C" />
                        <circle cx="12" cy="10" r="1.5" fill="#FFE4E6" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10.5px] font-bold text-[#8B2612] uppercase tracking-wider">योग</p>
                      <p className="text-xs sm:text-sm font-extrabold text-[#1E1B18] truncate">
                        {getYogaHindi(panchang.hinduDate.yoga.hindiName || panchang.hinduDate.yoga.name)}
                      </p>
                      <p className="text-[10px] text-[#6E6259] truncate font-medium">
                        {panchang.hinduDate.yoga.endTime ? `${panchang.hinduDate.yoga.endTime} तक` : 'अहोरात्र'}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Row 2: 5 Boxes (करण, सूर्योदय, सूर्यास्त, राहु काल, अभिजीत मुहूर्त) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
                  
                  {/* 5. Karana (करण) */}
                  <div className="bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-103 transition-all duration-300 flex items-center space-x-2 group cursor-pointer">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-115">
                      {/* Standalone Colorful Dual Moon Orbit (No Circle) */}
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_8px_rgba(13,148,136,0.45)]" viewBox="0 0 24 24" fill="none">
                        <circle cx="9" cy="12" r="6" stroke="#0D9488" strokeWidth="2" fill="#14B8A6" fillOpacity="0.3" />
                        <path d="M15 6a6 6 0 0 1 0 12c-2.5 0-4.5-2.7-4.5-6s2-6 4.5-6z" fill="#0D9488" />
                        <circle cx="9" cy="12" r="2" fill="#0F766E" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-[#8B2612] uppercase tracking-wider">करण</p>
                      <p className="text-xs font-extrabold text-[#1E1B18] truncate">
                        {getKaranaHindi(panchang.hinduDate.karana.hindiName || panchang.hinduDate.karana.name)}
                      </p>
                      <p className="text-[9.5px] text-[#6E6259] truncate font-medium">
                        {panchang.hinduDate.karana.endTime ? `${panchang.hinduDate.karana.endTime} तक` : 'सक्रिय'}
                      </p>
                    </div>
                  </div>

                  {/* 6. Sunrise (सूर्योदय) */}
                  <div className="bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-103 transition-all duration-300 flex items-center space-x-2 group cursor-pointer">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-115">
                      {/* Standalone Colorful Rising Sun (No Circle) */}
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_8px_rgba(234,179,8,0.5)]" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2v4M4.93 7.93l2.83 2.83M19.07 7.93l-2.83 2.83" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                        <path d="M2 18h20" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                        <path d="M6 18a6 6 0 0 1 12 0" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.6" />
                        <path d="M5 21h14" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-[#8B2612] uppercase tracking-wider">सूर्योदय</p>
                      <p className="text-xs font-mono font-extrabold text-[#1E1B18] truncate">
                        {panchang.sunrise}
                      </p>
                      <p className="text-[9.5px] text-[#6E6259] truncate font-medium">प्रातः काल</p>
                    </div>
                  </div>

                  {/* 7. Sunset (सूर्यास्त) */}
                  <div className="bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-103 transition-all duration-300 flex items-center space-x-2 group cursor-pointer">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-115">
                      {/* Standalone Colorful Setting Sun (No Circle) */}
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_8px_rgba(234,88,12,0.5)]" viewBox="0 0 24 24" fill="none">
                        <path d="M12 9V3M4.93 6.93l2.83 2.83M19.07 6.93l-2.83 2.83" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
                        <path d="M2 18h20" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
                        <path d="M6 18a6 6 0 0 1 12 0" fill="#FB923C" stroke="#EA580C" strokeWidth="1.6" />
                        <path d="M12 11l-2-2m4 0l-2 2" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-[#8B2612] uppercase tracking-wider">सूर्यास्त</p>
                      <p className="text-xs font-mono font-extrabold text-[#1E1B18] truncate">
                        {panchang.sunset}
                      </p>
                      <p className="text-[9.5px] text-[#6E6259] truncate font-medium">सायं काल</p>
                    </div>
                  </div>

                  {/* 8. Rahu Kaal (राहु काल) */}
                  <div className="bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-103 transition-all duration-300 flex items-center space-x-2 group cursor-pointer">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-115">
                      {/* Standalone Colorful Rahu Alert Dial (No Circle) */}
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_8px_rgba(220,38,38,0.45)]" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#DC2626" strokeWidth="2" fill="#FEE2E2" fillOpacity="0.45" />
                        <path d="M12 7v5l3 3" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="1.5" fill="#7F1D1D" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-[#B91C1C] uppercase tracking-wider">राहु काल</p>
                      <p className="text-xs font-mono font-extrabold text-[#991B1B] truncate">
                        {panchang.rahuKaal.start}
                      </p>
                      <p className="text-[9.5px] text-[#B91C1C] truncate font-medium">
                        {panchang.rahuKaal.end} तक
                      </p>
                    </div>
                  </div>

                  {/* 9. Abhijit Muhurat (अभिजीत मुहूर्त) */}
                  <div className="bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-103 transition-all duration-300 flex items-center space-x-2 group cursor-pointer col-span-2 sm:col-span-1">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-115">
                      {/* Standalone Colorful Auspicious Swastika (No Circle) */}
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_8px_rgba(22,163,74,0.45)]" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4v16M4 12h16M12 4h6M20 12v6M12 20H6M4 12V6" stroke="#16A34A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="8" cy="8" r="1.3" fill="#15803D" />
                        <circle cx="16" cy="8" r="1.3" fill="#15803D" />
                        <circle cx="16" cy="16" r="1.3" fill="#15803D" />
                        <circle cx="8" cy="16" r="1.3" fill="#15803D" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-[#15803D] uppercase tracking-wider">अभिजीत मुहूर्त</p>
                      <p className="text-xs font-mono font-extrabold text-[#166534] truncate">
                        {abhijitMuhurat.startTime}
                      </p>
                      <p className="text-[9.5px] text-[#15803D] truncate font-medium">
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

            {/* Right Column: Master Vedic Astronomical Watch & Bottom Smart Cards */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
              <LiveMuhuratWatchCard
                clockTime={clockTime}
                currentTimeStr={currentTimeStr}
                choghadiyaList={panchang.choghadiya}
                activeChoghadiyaIndex={activeChoghadiyaIndex}
                horaList={panchang.hora}
                activeHora={activeHora}
                sunriseTimeStr={panchang.sunrise}
                sunsetTimeStr={panchang.sunset}
                currentCity={currentCity}
              />
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
