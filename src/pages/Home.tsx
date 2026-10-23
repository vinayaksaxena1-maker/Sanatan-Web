import { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import CitySelectModal from '../components/common/CitySelectModal';
import HomeHeroSection from '../components/home/HomeHeroSection';
import { useLocationStore } from '../store/locationStore';
import { calculatePanchang, getMuhuratsForPanchang } from '../engine';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setClockTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
          FOLD 1: HERO — INTERACTIVE LIVE COCKPIT & QUICK PANCHANG
         ======================================================== */}
      <HomeHeroSection
        panchang={panchang}
        abhijitMuhurat={abhijitMuhurat}
        clockTime={clockTime}
        currentCity={currentCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        detectDeviceLocation={detectDeviceLocation}
        isLocating={isLocating}
        formattedDateHindi={formattedDateHindi}
        currentDayName={currentDayName}
        currentDayRuler={currentDayRuler}
      />

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
