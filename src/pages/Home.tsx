import React from 'react';
import Navbar from '../components/layout/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E1B18] font-sans antialiased selection:bg-[#EA6A2A]/20">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">

        {/* ========================================================
            HERO SECTION: 55% Left Info & CTAs | 45% Right Luxury Watch
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (Content & Quick Strip) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Micro-Badge Pill */}
            <div className="inline-flex items-center space-x-2 bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#E6DEC8] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-[#6E6259]">
                शुद्ध वैदिक कालगणना • 100% ऑफलाइन PWA | <span className="text-[#EA6A2A] font-semibold">0 विज्ञापन, 0 ट्रैकर</span>
              </span>
            </div>

            {/* Hero Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] font-serif">
                सनातन कालगणना, <br />
                <span className="bg-gradient-to-r from-[#EA6A2A] to-[#8B2612] bg-clip-text text-transparent">
                  आधुनिक परिशुद्धता में।
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#6E6259] max-w-xl leading-relaxed pt-2">
                विश्व का प्रथम विज्ञापन-मुक्त, 100% ऑफलाइन वैदिक पंचांग, लग्ज़री रोलेक्स-क्लास एनालॉग घड़ी एवं षोडशवर्ग कुंडली पोर्टल। सूर्य-सिद्धांत एवं नासा JPL DE405 की गणितीय शुद्धता पर आधारित।
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a 
                href="/panchang" 
                className="bg-gradient-to-b from-[#EA6A2A] to-[#C84B15] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-[0_8px_20px_rgba(234,106,42,0.35)] hover:brightness-105 active:scale-95 transition-all flex items-center space-x-2"
              >
                <span>🧭</span>
                <span>दैनिक पंचांग एवं शुभ मुहूर्त</span>
              </a>

              <a 
                href="/kundli" 
                className="bg-[#FFFFFF] text-[#1E1B18] px-7 py-3.5 rounded-full font-bold text-sm border border-[#E6DEC8] shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:bg-[#FAF2E6] active:scale-95 transition-all flex items-center space-x-2"
              >
                <span>✨</span>
                <span>अपनी जन्म कुंडली बनाएं</span>
              </a>
            </div>

            {/* Quick Panchang Bento Strip (4 columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FFFFFF] p-4 rounded-2xl border border-[#E6DEC8] shadow-[0_4px_20px_-4px_rgba(124,29,29,0.04)]">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#6E6259]">आज की तिथि</p>
                <p className="text-sm font-bold text-[#1E1B18] pt-0.5">प्रतिपदा (शुक्ल)</p>
                <p className="text-[11px] text-[#EA6A2A] font-medium">02:40 PM तक</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#6E6259]">आज का नक्षत्र</p>
                <p className="text-sm font-bold text-[#1E1B18] pt-0.5">रेवती (चरण 4)</p>
                <p className="text-[11px] text-[#6E6259]">04:18 PM तक</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#6E6259]">सक्रिय चौघड़िया</p>
                <p className="text-sm font-bold text-emerald-700 flex items-center space-x-1 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>अमृत (शुभ)</span>
                </p>
                <p className="text-[11px] text-[#6E6259]">11:45 AM तक</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#6E6259]">अभिजीत मुहूर्त</p>
                <p className="text-sm font-bold text-[#1E1B18] pt-0.5">11:55 – 12:45</p>
                <p className="text-[11px] text-amber-700 font-medium">परम सिद्ध योग</p>
              </div>
            </div>

            {/* Trust Footer Row */}
            <div className="flex items-center space-x-6 text-xs text-[#6E6259] pt-1">
              <span className="flex items-center space-x-1.5"><span>🛡️</span><span>1,902 टेस्ट्स प्रमाणित</span></span>
              <span className="flex items-center space-x-1.5"><span>✈️</span><span>फ्लाइट मोड में सक्रिय</span></span>
              <span className="flex items-center space-x-1.5"><span>🗺️</span><span>5,000+ भारतीय नगर</span></span>
            </div>

          </div>

          {/* Right Column (Luxury Vedic Watch Component) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-br from-[#FFFFFF] to-[#F3EDE2] p-4 shadow-[0_20px_50px_rgba(124,29,29,0.12),inset_0_2px_6px_rgba(255,255,255,0.8)] border border-[#E6DEC8] flex items-center justify-center">
              
              {/* Outer Bezel Ring with Choghadiya/Hora Segments */}
              <div className="absolute inset-4 rounded-full border-4 border-[#D9A74A]/40 flex items-center justify-center">
                
                {/* Watch Dial Face */}
                <div className="w-full h-full rounded-full bg-[#FAF6F0] relative flex items-center justify-center shadow-inner">
                  
                  {/* Roman Numerals / Markers */}
                  <span className="absolute top-3 font-serif font-bold text-xs text-[#6E6259]">XII</span>
                  <span className="absolute right-3 font-serif font-bold text-xs text-[#6E6259]">III</span>
                  <span className="absolute bottom-3 font-serif font-bold text-xs text-[#6E6259]">VI</span>
                  <span className="absolute left-3 font-serif font-bold text-xs text-[#6E6259]">IX</span>

                  {/* Center Branding */}
                  <div className="text-center z-10 bg-[#FFFFFF]/90 px-4 py-1.5 rounded-full border border-[#E6DEC8] shadow-sm">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#8B2612]">सनातन</p>
                    <p className="text-[9px] text-[#6E6259] tracking-tighter">SWISS ASTRONOMICAL</p>
                  </div>

                  {/* Watch Hands (Simulated Real-Time) */}
                  <div className="absolute w-1 h-28 bg-[#8B2612] rounded-full origin-bottom bottom-1/2 transform rotate-45 shadow-md"></div>
                  <div className="absolute w-0.5 h-32 bg-[#EA6A2A] rounded-full origin-bottom bottom-1/2 transform -rotate-12"></div>
                  <div className="absolute w-3 h-3 rounded-full bg-[#8B2612] z-20 shadow"></div>

                </div>
              </div>

            </div>

            {/* Live Digital Clock & Location Under Watch */}
            <div className="text-center mt-5 space-y-1">
              <div className="text-2xl font-mono font-extrabold tracking-widest text-[#1E1B18]">
                12:52:34
              </div>
              <p className="text-xs text-[#6E6259]">
                भारतीय मानक समय (IST) • उच्चारित अक्षांश 28° 36' उ.
              </p>
            </div>
          </div>

        </section>


        {/* ========================================================
            BENTO GRID ROW 1: Choghadiya Table & Daily Muhurat
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Bento: Choghadiya Table (60%) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl">⏳</span>
                <h2 className="text-lg font-bold font-serif text-[#1E1B18]">आज का चौघड़िया (दिन/रात)</h2>
              </div>
              <div className="inline-flex bg-[#FAF2E6] p-1 rounded-xl text-xs font-semibold text-[#8B2612]">
                <button className="px-3 py-1 rounded-lg bg-[#FFFFFF] shadow-sm">☀️ दिन</button>
                <button className="px-3 py-1 rounded-lg text-[#6E6259]">🌙 रात</button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E6DEC8] text-[#6E6259] uppercase tracking-wider">
                    <th className="py-2.5 font-semibold">समय अवधि</th>
                    <th className="py-2.5 font-semibold">चौघड़िया</th>
                    <th className="py-2.5 font-semibold">रात का चक्र</th>
                    <th className="py-2.5 font-semibold text-right">स्वामी</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6DEC8]/50 text-[#1E1B18]">
                  <tr>
                    <td className="py-2.5 font-mono">09:40 - 09:30</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold">शुभ</span></td>
                    <td className="py-2.5 text-[#6E6259]">अमृत</td>
                    <td className="py-2.5 text-right font-medium">स्वामी</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono">11:00 - 09:30</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold">लाभ</span></td>
                    <td className="py-2.5 text-[#6E6259]">अमृत</td>
                    <td className="py-2.5 text-right font-medium">विवाह</td>
                  </tr>
                  {/* Highlighted Current Running Row */}
                  <tr className="bg-[#FEF3C7]/60 border-l-4 border-amber-600">
                    <td className="py-3 font-mono font-bold text-amber-900">11:55 - 01:20</td>
                    <td className="py-3"><span className="px-2.5 py-1 rounded-md bg-amber-500 text-white font-bold shadow-sm">शुभ (अभी)</span></td>
                    <td className="py-3 text-amber-900 font-medium">लाभ</td>
                    <td className="py-3 text-right font-bold text-amber-900">शुक्रवर</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono">11:55 - 01:20</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold">लाभ</span></td>
                    <td className="py-2.5 text-[#6E6259]">अमृत</td>
                    <td className="py-2.5 text-right font-medium">सौंदूर</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono">11:55 - 03:20</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 font-semibold">रोग/काल</span></td>
                    <td className="py-2.5 text-[#6E6259]">अमृत</td>
                    <td className="py-2.5 text-right font-medium">स्वामी</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Bento: Shubh & Ashubh Muhurat (40%) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] space-y-5">
            <div className="flex items-center space-x-2">
              <span className="text-xl">⚖️</span>
              <h2 className="text-lg font-bold font-serif text-[#1E1B18]">आज के शुभ व अशुभ मुहूर्त</h2>
            </div>

            {/* Shubh Muhurat Box */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
                <span>✅</span>
                <span>शुभ समय (Shubh Timings)</span>
              </div>
              <ul className="space-y-2 text-xs text-[#6E6259] pl-6 list-disc">
                <li><strong className="text-[#1E1B18]">ब्रह्म मुहूर्त:</strong> 04:36 AM – 05:24 AM</li>
                <li><strong className="text-[#1E1B18]">अभिजीत मुहूर्त:</strong> 11:41 AM – 12:45 PM</li>
                <li><strong className="text-[#1E1B18]">अमृत काल:</strong> 03:12 PM – 04:48 PM</li>
              </ul>
            </div>

            <hr className="border-[#E6DEC8]/60" />

            {/* Ashubh Muhurat Box */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-red-700 font-bold text-sm">
                <span>❌</span>
                <span>अशुभ समय (Avoid New Work)</span>
              </div>
              <ul className="space-y-2 text-xs text-[#6E6259] pl-6 list-disc">
                <li><strong className="text-[#1E1B18]">राहु काल:</strong> 10:29 AM – 11:55 AM</li>
                <li><strong className="text-[#1E1B18]">यमगण्ड:</strong> 02:46 PM – 04:12 PM</li>
                <li><strong className="text-[#1E1B18]">दिशा शूल:</strong> पश्चिम (West) दिशा यात्रा वर्जित</li>
              </ul>
            </div>

          </div>

        </section>


        {/* ========================================================
            BENTO GRID ROW 2: Tools Directory & Quick Access
           ======================================================== */}
        <section className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold font-serif text-[#1E1B18]">संपूर्ण ज्योतिष एवं पंचांग टूल्स</h2>
            <p className="text-xs text-[#6E6259]">बिना किसी विज्ञापन के, 100% सटीक और तात्कालिक वैदिक गणनाएं।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <a href="/kundli" className="p-5 rounded-2xl bg-[#FAF6F0] hover:bg-[#FAF2E6] border border-[#E6DEC8] transition-all space-y-2 group">
              <span className="text-2xl">📐</span>
              <h3 className="font-bold text-sm text-[#1E1B18] group-hover:text-[#8B2612]">कुंडली एवं षोडशवर्ग</h3>
              <p className="text-xs text-[#6E6259] leading-relaxed">D1 से D60 डिविजनल चार्ट्स, षड्बल और 337 बिंदु सर्वाष्टकवर्ग।</p>
            </a>

            <a href="/utilities" className="p-5 rounded-2xl bg-[#FAF6F0] hover:bg-[#FAF2E6] border border-[#E6DEC8] transition-all space-y-2 group">
              <span className="text-2xl">🔮</span>
              <h3 className="font-bold text-sm text-[#1E1B18] group-hover:text-[#8B2612]">दोष एवं साढ़े साती</h3>
              <p className="text-xs text-[#6E6259] leading-relaxed">मांगलिक दोष (14 परिहार नियम), कालसर्प और शनि साढ़े साती कैलकुलेटर।</p>
            </a>

            <a href="/utilities" className="p-5 rounded-2xl bg-[#FAF6F0] hover:bg-[#FAF2E6] border border-[#E6DEC8] transition-all space-y-2 group">
              <span className="text-2xl">📿</span>
              <h3 className="font-bold text-sm text-[#1E1B18] group-hover:text-[#8B2612]">रत्न एवं रुद्राक्ष परामर्श</h3>
              <p className="text-xs text-[#6E6259] leading-relaxed">दुर्बल ग्रहों के आधार पर सटीक लाइफ/लकी स्टोन और 1-14 मुखी रुद्राक्ष।</p>
            </a>

            <a href="/matchmaking" className="p-5 rounded-2xl bg-[#FAF6F0] hover:bg-[#FAF2E6] border border-[#E6DEC8] transition-all space-y-2 group">
              <span className="text-2xl">❤️</span>
              <h3 className="font-bold text-sm text-[#1E1B18] group-hover:text-[#8B2612]">36 गुण विवाह मिलान</h3>
              <p className="text-xs text-[#6E6259] leading-relaxed">अष्टकूट मिलान, नाड़ी दोष और विवाह के लिए शुभ मुहूर्त तालिका।</p>
            </a>

          </div>
        </section>

      </main>

      {/* Minimal Footer */}
      <footer className="mt-16 border-t border-[#E6DEC8] py-6 px-6 bg-[#FAF2E6]/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E6259] space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>सर्वरलेस शुद्ध गणितीय इंजन: 0ms लेटेंसी, शून्य नेटवर्क ट्रैफ़िक</span>
          </div>
          <div>
            सनातन घड़ी © 2026 • सर्वाधिकार सुरक्षित
          </div>
        </div>
      </footer>

    </div>
  );
}
