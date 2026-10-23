import Navbar from '../components/layout/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E1B18] font-sans antialiased selection:bg-[#EA6A2A]/20">
      
      {/* Top Floating Pill Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-16">

        {/* ========================================================
            FOLD 1: HERO — THE LIVING VEDIC WATCH (55% Left / 45% Right)
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2 sm:pt-6">
          
          {/* Left Column: Heading, CTAs, and 3 Micro Pills */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Micro-Badge Pill */}
            <div className="inline-flex items-center space-x-2 bg-[#FFFFFF] px-4 py-1.5 rounded-full border border-[#E6DEC8] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-[#6E6259]">
                शुद्ध वैदिक कालगणना • आधुनिक वेब पोर्टल | <span className="text-[#EA6A2A] font-semibold">0 विज्ञापन, 0 ट्रैकर</span>
              </span>
            </div>

            {/* Hero Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] font-serif">
                सनातन कालगणना, <br />
                <span className="bg-gradient-to-r from-[#EA6A2A] via-[#C84B15] to-[#8B2612] bg-clip-text text-transparent">
                  आधुनिक परिशुद्धता में।
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#6E6259] max-w-xl leading-relaxed">
                सूर्य-सिद्धांत एवं नासा JPL DE405 की गणितीय शुद्धता पर आधारित आधुनिक वैदिक पंचांग, लग्ज़री एनालॉग घड़ी एवं षोडशवर्ग कुंडली पोर्टल।
              </p>
            </div>

            {/* 2 Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a 
                href="/panchang" 
                className="bg-gradient-to-b from-[#EA6A2A] to-[#C84B15] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-[0_8px_20px_rgba(234,106,42,0.32)] hover:brightness-105 active:scale-95 transition-all flex items-center space-x-2"
              >
                <span>🧭</span>
                <span>दैनिक पंचांग एवं शुभ मुहूर्त</span>
              </a>

              <a 
                href="/kundli" 
                className="bg-[#FFFFFF] text-[#1E1B18] px-7 py-3.5 rounded-full font-bold text-sm border border-[#E6DEC8] shadow-xs hover:bg-[#FAF2E6] active:scale-95 transition-all flex items-center space-x-2"
              >
                <span>✨</span>
                <span>अपनी जन्म कुंडली बनाएं</span>
              </a>
            </div>

            {/* 3 Live Micro Pills (Instant Value Without Clutter) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              
              {/* Pill 1: Tithi */}
              <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[#FFFFFF] border border-[#E6DEC8]/80 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#FAF2E6] flex items-center justify-center text-lg shrink-0">
                  🌕
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#6E6259]">आज की तिथि</p>
                  <p className="text-xs font-bold text-[#1E1B18]">शुक्ल द्वादशी</p>
                  <p className="text-[10px] text-[#EA6A2A] font-mono">रात्रि 10:14 तक</p>
                </div>
              </div>

              {/* Pill 2: Active Choghadiya */}
              <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[#FFFFFF] border border-[#E6DEC8]/80 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-lg shrink-0">
                  ⏳
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#6E6259]">सक्रिय चौघड़िया</p>
                  <p className="text-xs font-bold text-emerald-800 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>शुभ (अमृत तुल्य)</span>
                  </p>
                  <p className="text-[10px] text-[#6E6259] font-mono">01:58 PM तक</p>
                </div>
              </div>

              {/* Pill 3: Key Muhurat */}
              <div className="flex items-center space-x-3 p-3 rounded-2xl bg-[#FFFFFF] border border-[#E6DEC8]/80 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-lg shrink-0">
                  卐
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#6E6259]">अभिजीत मुहूर्त</p>
                  <p className="text-xs font-bold text-[#1E1B18] font-mono">11:43 – 12:28</p>
                  <p className="text-[10px] text-amber-800 font-medium">परम सिद्ध मुहूर्त</p>
                </div>
              </div>

            </div>

            {/* Trust Micro-Footer */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#6E6259] pt-2">
              <span className="flex items-center space-x-1.5"><span>🛡️</span><span>1,902 टेस्ट्स प्रमाणित</span></span>
              <span className="flex items-center space-x-1.5"><span>⚡</span><span>सुपरफास्ट वेब इंजन</span></span>
              <span className="flex items-center space-x-1.5"><span>🗺️</span><span>5,000+ भारतीय नगर</span></span>
            </div>

          </div>

          {/* Right Column: Rolex-Class Luxury Vedic Watch */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#FAF6F0] to-[#EBDDC8] p-4 shadow-[0_24px_60px_rgba(124,29,29,0.12),inset_0_2px_8px_rgba(255,255,255,0.9)] border-2 border-[#D9A74A]/40 flex items-center justify-center">
              
              {/* Outer Golden Bezel Ring */}
              <div className="absolute inset-4 rounded-full border-4 border-[#C88A2B]/40 flex items-center justify-center shadow-inner">
                
                {/* Watch Dial Face */}
                <div className="w-full h-full rounded-full bg-[#FAF6F0] relative flex items-center justify-center shadow-inner">
                  
                  {/* Roman Numerals */}
                  <span className="absolute top-3 font-serif font-bold text-xs text-[#6E6259] tracking-wider">XII</span>
                  <span className="absolute right-3.5 font-serif font-bold text-xs text-[#6E6259] tracking-wider">III</span>
                  <span className="absolute bottom-3 font-serif font-bold text-xs text-[#6E6259] tracking-wider">VI</span>
                  <span className="absolute left-3.5 font-serif font-bold text-xs text-[#6E6259] tracking-wider">IX</span>

                  {/* Center Branding Crest */}
                  <div className="text-center z-10 bg-[#FFFFFF]/90 px-4 py-1.5 rounded-full border border-[#E6DEC8] shadow-xs">
                    <p className="text-[11px] uppercase font-bold tracking-widest text-[#8B2612]">सनातन</p>
                    <p className="text-[8px] text-[#6E6259] tracking-widest uppercase">VEDIC HOROLOGY</p>
                  </div>

                  {/* Watch Hands */}
                  <div className="absolute w-1 h-28 bg-[#8B2612] rounded-full origin-bottom bottom-1/2 transform rotate-45 shadow-md"></div>
                  <div className="absolute w-0.5 h-32 bg-[#EA6A2A] rounded-full origin-bottom bottom-1/2 transform -rotate-12"></div>
                  <div className="absolute w-3.5 h-3.5 rounded-full bg-[#8B2612] z-20 shadow-sm border-2 border-white"></div>

                  {/* Bottom Dial Status Pill */}
                  <div className="absolute bottom-10 bg-[#FAF2E6] px-3.5 py-0.5 rounded-full border border-[#C88A2B]/40 text-[10px] font-bold text-[#8B2612] shadow-2xs">
                    शुभ चौघड़िया • शुक्र होरा
                  </div>

                </div>
              </div>

            </div>

            {/* Live Digital Clock & Coordinates Under Watch */}
            <div className="text-center mt-5 space-y-1">
              <div className="text-2xl font-mono font-extrabold tracking-widest text-[#1E1B18] tabular-nums">
                01:22:34 PM
              </div>
              <p className="text-xs text-[#6E6259]">
                भारतीय मानक समय (IST) • नई दिल्ली (28.61° N, 77.23° E)
              </p>
            </div>
          </div>

        </section>


        {/* ========================================================
            FOLD 2: TODAY'S LIVING PULSE (Bento 3-Card Strip)
           ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🌟</span>
              <h2 className="text-xl font-bold font-serif text-[#1E1B18]">आज का तात्कालिक काल (Living Pulse)</h2>
            </div>
            <span className="text-xs text-[#6E6259]">शुक्रवार, 23 अक्टूबर 2026</span>
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
                    <span className="font-mono font-bold text-[#1E1B18]">11:43 AM – 12:28 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#6E6259]">सक्रिय चौघड़िया:</span>
                    <span className="font-mono font-bold text-emerald-700">शुभ (01:58 PM तक)</span>
                  </div>
                </div>
                <p className="text-[11px] text-rose-700 font-medium">
                  ⚠️ राहु काल: दोपहर 10:41 से 12:05 तक (शुभ कार्य वर्जित)
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
                    शुक्ल पक्ष
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1E1B18] font-serif">चंद्र स्थिति एवं कला</h3>
                  <p className="text-xs text-[#6E6259]">खगोलीय प्रकाशित भाग एवं नक्षत्र संचरण</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF6F0] space-y-2 border border-[#E6DEC8]/70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#6E6259]">चंद्र प्रदीप्ति:</span>
                    <span className="font-mono font-bold text-[#1E1B18]">88% प्रकाशित भाग</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#6E6259]">राशि व नक्षत्र:</span>
                    <span className="font-bold text-[#8B2612]">कुंभ • शतभिषा</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#6E6259]">
                  🌅 सूर्योदय: 06:18 AM • 🌄 सूर्यास्त: 05:47 PM
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
