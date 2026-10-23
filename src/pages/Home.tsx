import { useState } from 'react';
import Navbar from '../components/layout/Navbar';

export default function Home() {
  const [kundliTab, setKundliTab] = useState<'lagna' | 'navamsha' | 'chandra' | 'graha'>('lagna');
  const [choghadiyaMode, setChoghadiyaMode] = useState<'day' | 'night'>('day');

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E1B18] font-sans antialiased selection:bg-[#EA6A2A]/20">
      
      {/* Top Floating Pill Navigation */}
      <Navbar />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">

        {/* ========================================================
            SECTION 1: HERO SPLIT (55% Left Info & 8-Item Panchang | 45% Right Luxury Watch)
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Micro-Badge Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#E6DEC8] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-[#6E6259]">
                शुद्ध वैदिक कालगणना • आधुनिक वेब पोर्टल | <span className="text-[#EA6A2A] font-semibold">0 विज्ञापन, 0 ट्रैकर</span>
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
                विश्व का प्रथम विज्ञापन-मुक्त, आधुनिक वेब वैदिक पंचांग, लग्ज़री रोलेक्स-क्लास एनालॉग घड़ी एवं षोडशवर्ग कुंडली पोर्टल। सूर्य-सिद्धांत एवं नासा JPL DE405 की गणितीय शुद्धता पर आधारित।
              </p>
            </div>

            {/* Dual Neumorphic CTA Buttons */}
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

            {/* UPGRADED: 8-Item "Aaj Ka Panchang" Bento Card (2 Rows x 4 Columns) */}
            <div className="bg-[#FFFFFF] p-5 rounded-3xl border border-[#E6DEC8] shadow-[0_4px_20px_-4px_rgba(124,29,29,0.05)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6DEC8]/80 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-base">🔱</span>
                  <h2 className="text-sm font-bold font-serif text-[#1E1B18]">आज का पंचांग सारांश</h2>
                </div>
                <div className="flex items-center space-x-2 text-xs font-medium text-[#8B2612] bg-[#FAF2E6] px-3 py-1 rounded-full border border-[#E6DEC8]">
                  <span>📅 शुक्रवार, 23 अक्टूबर 2026</span>
                  <span>•</span>
                  <span>📍 कानपुर, उत्तर प्रदेश</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Tithi */}
                <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#E6DEC8]/80">
                  <p className="text-[11px] uppercase tracking-wider text-[#6E6259]">१. तिथि</p>
                  <p className="text-sm font-bold text-[#1E1B18] pt-0.5">शुक्ल द्वादशी</p>
                  <p className="text-[11px] text-[#EA6A2A] font-medium font-mono">रात्रि 10:14 तक</p>
                </div>
                {/* 2. Vara */}
                <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#E6DEC8]/80">
                  <p className="text-[11px] uppercase tracking-wider text-[#6E6259]">२. वार</p>
                  <p className="text-sm font-bold text-[#1E1B18] pt-0.5">शुक्रवार</p>
                  <p className="text-[11px] text-[#6E6259]">शुक्र का दिन</p>
                </div>
                {/* 3. Nakshatra */}
                <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#E6DEC8]/80">
                  <p className="text-[11px] uppercase tracking-wider text-[#6E6259]">३. नक्षत्र</p>
                  <p className="text-sm font-bold text-[#1E1B18] pt-0.5">शतभिषा (चरण 3)</p>
                  <p className="text-[11px] text-[#6E6259] font-mono">रात्रि 11:26 तक</p>
                </div>
                {/* 4. Yoga */}
                <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#E6DEC8]/80">
                  <p className="text-[11px] uppercase tracking-wider text-[#6E6259]">४. योग</p>
                  <p className="text-sm font-bold text-[#1E1B18] pt-0.5">ध्रुव (शुभ)</p>
                  <p className="text-[11px] text-[#6E6259] font-mono">दोपहर 02:18 तक</p>
                </div>
                {/* 5. Karana */}
                <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#E6DEC8]/80">
                  <p className="text-[11px] uppercase tracking-wider text-[#6E6259]">५. करण</p>
                  <p className="text-sm font-bold text-[#1E1B18] pt-0.5">वणिज करण</p>
                  <p className="text-[11px] text-[#6E6259] font-mono">रात्रि 08:14 तक</p>
                </div>
                {/* 6. Suryoday / Suryast */}
                <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#E6DEC8]/80">
                  <p className="text-[11px] uppercase tracking-wider text-[#6E6259]">☀️ सूर्योदय / अस्त</p>
                  <p className="text-sm font-bold font-mono text-[#1E1B18] pt-0.5">06:18 AM</p>
                  <p className="text-[11px] font-mono text-[#6E6259]">अस्त: 05:47 PM</p>
                </div>
                {/* 7. Active Choghadiya */}
                <div className="p-3 rounded-2xl bg-[#DCFCE7]/50 border border-emerald-300">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-900 font-semibold">सक्रिय चौघड़िया</p>
                  <p className="text-sm font-bold text-emerald-800 flex items-center space-x-1.5 pt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>शुभ (अमृत तुल्य)</span>
                  </p>
                  <p className="text-[11px] text-emerald-700 font-mono">01:58 PM तक</p>
                </div>
                {/* 8. Abhijit Muhurat */}
                <div className="p-3 rounded-2xl bg-[#FEF3C7]/60 border border-[#C88A2B]/60">
                  <p className="text-[11px] uppercase tracking-wider text-amber-900 font-semibold">अभिजीत मुहूर्त</p>
                  <p className="text-sm font-bold font-mono text-[#1E1B18] pt-0.5">11:43 – 12:28</p>
                  <p className="text-[11px] text-amber-800 font-medium">परम सिद्ध योग</p>
                </div>
              </div>
            </div>

            {/* Trust Micro-Footer Row */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#6E6259] pt-1">
              <span className="flex items-center space-x-1.5"><span>🛡️</span><span>1,902 टेस्ट्स प्रमाणित</span></span>
              <span className="flex items-center space-x-1.5"><span>⚡</span><span>सुपरफास्ट वेब इंजन</span></span>
              <span className="flex items-center space-x-1.5"><span>🗺️</span><span>5,000+ भारतीय नगर</span></span>
            </div>

          </div>

          {/* Right Column (5 Cols — Luxury Vedic Watch Component) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-br from-[#FFFFFF] to-[#F3EDE2] p-4 shadow-[0_20px_50px_rgba(124,29,29,0.12),inset_0_2px_6px_rgba(255,255,255,0.8)] border border-[#E6DEC8] flex items-center justify-center">
              
              {/* Outer Bezel Ring with Choghadiya/Hora Segments */}
              <div className="absolute inset-4 rounded-full border-4 border-[#C88A2B]/50 flex items-center justify-center">
                
                {/* Watch Dial Face */}
                <div className="w-full h-full rounded-full bg-[#FAF6F0] relative flex items-center justify-center shadow-inner">
                  
                  {/* Roman Numerals */}
                  <span className="absolute top-3 font-serif font-bold text-xs text-[#6E6259]">XII</span>
                  <span className="absolute right-3 font-serif font-bold text-xs text-[#6E6259]">III</span>
                  <span className="absolute bottom-3 font-serif font-bold text-xs text-[#6E6259]">VI</span>
                  <span className="absolute left-3 font-serif font-bold text-xs text-[#6E6259]">IX</span>

                  {/* Center Branding */}
                  <div className="text-center z-10 bg-[#FFFFFF]/95 px-4 py-1.5 rounded-full border border-[#E6DEC8] shadow-sm">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#8B2612]">सनातन</p>
                    <p className="text-[9px] text-[#6E6259] tracking-tighter">SWISS ASTRONOMICAL</p>
                  </div>

                  {/* Watch Hands */}
                  <div className="absolute w-1 h-28 bg-[#8B2612] rounded-full origin-bottom bottom-1/2 transform rotate-45 shadow-md"></div>
                  <div className="absolute w-0.5 h-32 bg-[#EA6A2A] rounded-full origin-bottom bottom-1/2 transform -rotate-12"></div>
                  <div className="absolute w-3 h-3 rounded-full bg-[#8B2612] z-20 shadow"></div>

                  {/* Bottom Dial Pill */}
                  <div className="absolute bottom-10 bg-[#FAF2E6] px-3 py-0.5 rounded-full border border-[#C88A2B]/40 text-[10px] font-bold text-[#8B2612]">
                    शुभ चौघड़िया • शुक्र होरा
                  </div>

                </div>
              </div>

            </div>

            {/* Live Digital Clock & Location Under Watch */}
            <div className="text-center mt-5 space-y-1">
              <div className="text-2xl font-mono font-extrabold tracking-widest text-[#1E1B18] tabular-nums">
                01:22:34 PM
              </div>
              <p className="text-xs text-[#6E6259]">
                भारतीय मानक समय (IST) • कानपुर अक्षांश 26° 26&apos; उ.
              </p>
            </div>
          </div>

        </section>


        {/* ========================================================
            SECTION 2 (BENTO ROW 1): "अपनी जन्म कुंडली बनाएँ" (Form + Live SVG Preview)
           ======================================================== */}
        <section className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 6 Cols: Instant Kundli Form */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 text-[11px] font-bold text-[#8B2612] bg-[#FAF2E6] px-3 py-1 rounded-full border border-[#E6DEC8]">
                  <span>⚡ 7.31ms गणना गति</span>
                  <span>•</span>
                  <span>100% लोकल प्राइवेसी (IndexedDB)</span>
                </div>
                <h2 className="text-2xl font-bold font-serif text-[#1E1B18] pt-1">अपनी जन्म कुंडली बनाएँ</h2>
                <p className="text-xs text-[#6E6259]">सटीक वैदिक गणना से अपनी षोडशवर्ग (D1-D60) कुंडली, दशा एवं उपाय प्राप्त करें</p>
              </div>

              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">जातक का नाम *</label>
                  <input
                    type="text"
                    defaultValue="आदित्य नारायण शर्मा"
                    placeholder="अपना नाम लिखें..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E6DEC8] text-xs font-medium text-[#1E1B18] focus:outline-none focus:border-[#C88A2B]"
                  />
                </div>

                {/* DOB & TOB Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">जन्म तिथि (Date of Birth) *</label>
                    <input
                      type="date"
                      defaultValue="1990-10-20"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E6DEC8] text-xs font-mono font-bold text-[#1E1B18] focus:outline-none focus:border-[#C88A2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B18] mb-1">जन्म समय (Time of Birth) *</label>
                    <input
                      type="time"
                      defaultValue="10:30"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E6DEC8] text-xs font-mono font-bold text-[#1E1B18] focus:outline-none focus:border-[#C88A2B]"
                    />
                  </div>
                </div>

                {/* Birth Place Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B18] mb-1">जन्म स्थान (5,000+ भारतीय नगर) *</label>
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E6DEC8] text-xs font-medium text-[#1E1B18]">
                    <span>📍 कानपुर, उत्तर प्रदेश, भारत (26.44° N, 80.33° E)</span>
                    <span className="text-[#EA6A2A] font-bold cursor-pointer">बदलें ▾</span>
                  </div>
                </div>

                {/* Primary Submit CTA */}
                <a
                  href="/kundli"
                  className="w-full bg-gradient-to-b from-[#EA6A2A] to-[#C84B15] text-white py-3.5 rounded-xl font-bold text-sm shadow-[0_6px_20px_rgba(217,83,30,0.3)] hover:brightness-105 transition-all flex items-center justify-center space-x-2"
                >
                  <span>🔯</span>
                  <span>कुंडली बनाएँ (7.31ms) ➔</span>
                </a>

                {/* Bottom Quick Actions */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href="/matchmaking"
                    className="py-2.5 px-4 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF2E6] border border-[#E6DEC8] text-xs font-bold text-[#1E1B18] flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>❤️</span>
                    <span>कुंडली मिलान (36 गुण)</span>
                  </a>
                  <a
                    href="/kundli"
                    className="py-2.5 px-4 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF2E6] border border-[#E6DEC8] text-xs font-bold text-[#1E1B18] flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>📄</span>
                    <span>विस्तृत कुंडली रिपोर्ट</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Live Interactive North Indian SVG Chart Preview */}
            <div className="lg:col-span-6 flex flex-col items-center space-y-4">
              
              {/* Top 4 Chart Tabs */}
              <div className="inline-flex flex-wrap bg-[#FAF2E6] p-1 rounded-xl border border-[#E6DEC8] gap-1">
                {[
                  { id: 'lagna', label: 'जन्म कुंडली' },
                  { id: 'navamsha', label: 'नवांश (D9)' },
                  { id: 'chandra', label: 'चंद्र कुंडली' },
                  { id: 'graha', label: 'ग्रह स्थिति' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setKundliTab(tab.id as 'lagna' | 'navamsha' | 'chandra' | 'graha')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      kundliTab === tab.id
                        ? 'bg-[#8B2612] text-white shadow-sm'
                        : 'text-[#6E6259] hover:text-[#1E1B18]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* North Indian Kundli SVG */}
              <div className="w-full max-w-[340px] aspect-square bg-[#FAF6F0] p-3 rounded-2xl border-2 border-[#C88A2B]/60 shadow-inner relative">
                <svg viewBox="0 0 300 300" className="w-full h-full stroke-[#C88A2B] stroke-[1.5] fill-none">
                  <rect x="2" y="2" width="296" height="296" rx="8" className="fill-[#FDFBF7]" />
                  <line x1="2" y1="2" x2="298" y2="298" />
                  <line x1="298" y1="2" x2="2" y2="298" />
                  <line x1="150" y1="2" x2="2" y2="150" />
                  <line x1="2" y1="150" x2="150" y2="298" />
                  <line x1="150" y1="298" x2="298" y2="150" />
                  <line x1="298" y1="150" x2="150" y2="2" />

                  {/* Center Om */}
                  <circle cx="150" cy="150" r="22" className="fill-[#FAF2E6] stroke-[#C88A2B]" />
                  <text x="150" y="157" textAnchor="middle" className="fill-[#C88A2B] stroke-none text-[20px] font-serif font-bold">ॐ</text>

                  {/* Houses & Planets */}
                  <text x="150" y="65" textAnchor="middle" className="fill-[#C88A2B] stroke-none text-[11px] font-bold">लग्न</text>
                  <text x="150" y="82" textAnchor="middle" className="fill-[#1E1B18] stroke-none text-[12px] font-mono font-bold">1</text>

                  <text x="75" y="38" textAnchor="middle" className="fill-[#EA6A2A] stroke-none text-[12px] font-bold">गुरु</text>
                  <text x="75" y="54" textAnchor="middle" className="fill-[#1E1B18] stroke-none text-[11px] font-mono">2</text>

                  <text x="32" y="75" textAnchor="middle" className="fill-[#1E1B18] stroke-none text-[12px] font-bold">शनि</text>
                  <text x="32" y="92" textAnchor="middle" className="fill-[#6E6259] stroke-none text-[11px] font-mono">3</text>

                  <text x="82" y="148" textAnchor="middle" className="fill-[#1E1B18] stroke-none text-[12px] font-bold">राहु</text>
                  <text x="82" y="165" textAnchor="middle" className="fill-[#6E6259] stroke-none text-[11px] font-mono">4</text>

                  <text x="35" y="218" textAnchor="middle" className="fill-[#EA6A2A] stroke-none text-[12px] font-bold">मंगल</text>
                  <text x="35" y="235" textAnchor="middle" className="fill-[#6E6259] stroke-none text-[11px] font-mono">5</text>

                  <text x="75" y="262" textAnchor="middle" className="fill-[#1E1B18] stroke-none text-[12px] font-bold">केतु</text>
                  <text x="75" y="278" textAnchor="middle" className="fill-[#6E6259] stroke-none text-[11px] font-mono">6</text>

                  <text x="150" y="230" textAnchor="middle" className="fill-[#6E6259] stroke-none text-[11px] font-mono">7</text>
                  <text x="225" y="272" textAnchor="middle" className="fill-[#6E6259] stroke-none text-[11px] font-mono">8</text>
                  <text x="268" y="225" textAnchor="middle" className="fill-[#6E6259] stroke-none text-[11px] font-mono">9</text>

                  <text x="218" y="148" textAnchor="middle" className="fill-[#EA6A2A] stroke-none text-[12px] font-bold">सूर्य बुध</text>
                  <text x="218" y="165" textAnchor="middle" className="fill-[#1E1B18] stroke-none text-[11px] font-mono">10</text>

                  <text x="265" y="75" textAnchor="middle" className="fill-[#1E1B18] stroke-none text-[12px] font-bold">शुक्र</text>
                  <text x="265" y="92" textAnchor="middle" className="fill-[#6E6259] stroke-none text-[11px] font-mono">11</text>

                  <text x="225" y="38" textAnchor="middle" className="fill-[#2563EB] stroke-none text-[12px] font-bold">चंद्र</text>
                  <text x="225" y="54" textAnchor="middle" className="fill-[#1E1B18] stroke-none text-[11px] font-mono">12</text>
                </svg>
              </div>

              <p className="text-[11px] text-[#6E6259]">
                ✨ मांगलिक दोष: <strong className="text-emerald-700">नहीं है (पूर्णतः सुरक्षित)</strong> • वर्तमान दशा: <strong className="text-[#8B2612]">राहु में गुरु</strong>
              </p>
            </div>

          </div>
        </section>


        {/* ========================================================
            SECTION 3 (BENTO ROW 2): "आज का चौघड़िया (Timeline)" & "आज के शुभ मुहूर्त"
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7 Cols: Choghadiya Timeline + Table Card */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] space-y-5">
            <div className="flex items-center justify-between border-b border-[#E6DEC8]/80 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl">⏳</span>
                <h2 className="text-lg font-bold font-serif text-[#1E1B18]">आज का चौघड़िया</h2>
              </div>
              <div className="inline-flex bg-[#FAF2E6] p-1 rounded-xl text-xs font-bold border border-[#E6DEC8]">
                <button
                  onClick={() => setChoghadiyaMode('day')}
                  className={`px-3.5 py-1 rounded-lg transition-all ${
                    choghadiyaMode === 'day' ? 'bg-[#8B2612] text-white shadow-sm' : 'text-[#6E6259]'
                  }`}
                >
                  ☀️ दिन
                </button>
                <button
                  onClick={() => setChoghadiyaMode('night')}
                  className={`px-3.5 py-1 rounded-lg transition-all ${
                    choghadiyaMode === 'night' ? 'bg-[#8B2612] text-white shadow-sm' : 'text-[#6E6259]'
                  }`}
                >
                  🌙 रात
                </button>
              </div>
            </div>

            {/* Vertical Timeline Rows */}
            <div className="space-y-2.5">
              {[
                { time: '06:18 – 07:50', name: 'चर (सामान्य)', dot: 'bg-amber-500', pill: 'bg-amber-100 text-amber-800', lord: 'शुक्र (यात्रा शुभ)', active: false },
                { time: '07:50 – 09:22', name: 'लाभ (शुभ)', dot: 'bg-emerald-500', pill: 'bg-emerald-100 text-emerald-800', lord: 'बुध (व्यापार व विद्या)', active: false },
                { time: '09:22 – 10:54', name: 'अमृत (सर्वश्रेष्ठ)', dot: 'bg-emerald-500', pill: 'bg-emerald-100 text-emerald-800', lord: 'चंद्र (सभी शुभ कार्य)', active: false },
                { time: '10:54 – 12:26', name: 'काल (अशुभ)', dot: 'bg-red-500', pill: 'bg-red-100 text-red-800', lord: 'शनि (नया कार्य वर्जित)', active: false },
                { time: '12:26 – 01:58', name: 'शुभ (अभी सक्रिय)', dot: 'bg-emerald-600', pill: 'bg-amber-500 text-white', lord: 'गुरु (मांगलिक व पूजा कार्य)', active: true },
                { time: '01:58 – 03:30', name: 'रोग (अशुभ)', dot: 'bg-red-500', pill: 'bg-red-100 text-red-800', lord: 'मंगल (वाद-विवाद से बचें)', active: false },
                { time: '03:30 – 05:02', name: 'उद्वेग (अशुभ)', dot: 'bg-amber-500', pill: 'bg-red-100 text-red-800', lord: 'सूर्य (सरकारी कार्य)', active: false },
              ].map((slot, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    slot.active
                      ? 'bg-[#FEF3C7]/70 border-[#C88A2B] shadow-sm'
                      : 'bg-[#FAF6F0]/70 border-[#E6DEC8]/70 hover:bg-[#FAF2E6]/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${slot.dot} ring-4 ring-white`}></span>
                    <span className="font-mono text-xs font-bold text-[#1E1B18] tabular-nums">{slot.time}</span>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${slot.pill}`}>
                      {slot.name}
                    </span>
                  </div>
                  <div className="hidden sm:block text-right text-xs text-[#6E6259] font-medium">
                    स्वामी: <strong className="text-[#1E1B18]">{slot.lord}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: "आज के शुभ मुहूर्त" + Rahu Kaal Card */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6DEC8]/80 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">✨</span>
                  <h2 className="text-lg font-bold font-serif text-[#1E1B18]">आज के शुभ मुहूर्त</h2>
                </div>
                <a href="/muhurat" className="text-xs font-bold text-[#EA6A2A] hover:underline">
                  सभी मुहूर्त देखें ➔
                </a>
              </div>

              {/* 4 Shubh Muhurat Items */}
              <div className="space-y-3">
                {[
                  { icon: '卐', title: 'अभिजीत मुहूर्त', time: '11:43 AM – 12:28 PM', badge: 'शुभ' },
                  { icon: '🔥', title: 'विवाह मुहूर्त', time: 'शाम 06:12 PM – 07:34 PM', badge: 'शुभ' },
                  { icon: '🔔', title: 'गृह प्रवेश मुहूर्त', time: 'दोपहर 01:18 PM – 02:56 PM', badge: 'शुभ' },
                  { icon: '🚗', title: 'वाहन व नई शुरुआत', time: 'सुबह 09:15 AM – 10:32 AM', badge: 'शुभ' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF6F0] border border-[#E6DEC8]">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-[#FAF2E6] border border-[#C88A2B]/40 flex items-center justify-center text-[#8B2612] font-bold text-sm">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1E1B18]">{item.title}</p>
                        <p className="text-[11px] font-mono text-[#6E6259]">{item.time}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-bold">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact Ashubh / Rahu Kaal Warning Box */}
            <div className="p-4 rounded-2xl bg-[#FEE2E2]/60 border border-red-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#991B1B]">
                <span>❌ आज का अशुभ समय (राहु काल व दिशा शूल)</span>
                <span className="px-2 py-0.5 rounded bg-red-200 text-[#991B1B] text-[10px]">त्याज्य</span>
              </div>
              <p className="text-xs text-[#6E6259] font-mono">
                <strong className="text-[#1E1B18]">राहु काल:</strong> 10:41 AM – 12:05 PM • <strong className="text-[#1E1B18]">यमगण्ड:</strong> 02:54 PM – 04:18 PM
              </p>
              <p className="text-[11px] text-[#991B1B] font-medium">
                🧭 <strong>दिशा शूल:</strong> आज पश्चिम (West) दिशा की यात्रा वर्जित है।
              </p>
            </div>
          </div>

        </section>


        {/* ========================================================
            SECTION 4 (BENTO ROW 3): "हिंदू कैलेंडर", "आगामी व्रत एवं त्यौहार", & "ग्रह गोचर"
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1 (4 Cols): Monthly Hindu Calendar Grid */}
          <div className="lg:col-span-4 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6DEC8]/80 pb-3">
              <div className="flex items-center space-x-1.5">
                <span className="text-[#EA6A2A]">✦</span>
                <h2 className="text-base font-bold font-serif text-[#1E1B18]">हिंदू कैलेंडर</h2>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-[#1E1B18] bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#E6DEC8]">
                <button className="text-[#6E6259] hover:text-[#1E1B18]">‹</button>
                <span>अक्टूबर 2026</span>
                <button className="text-[#6E6259] hover:text-[#1E1B18]">›</button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center text-[11px] font-bold text-[#6E6259] pb-1">
              <span>रवि</span><span>सोम</span><span>मंगल</span><span>बुध</span><span>गुरु</span><span>शुक्र</span><span>शनि</span>
            </div>

            {/* Calendar Dates Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-xs">
              {[
                { d: '27', muted: true }, { d: '28', muted: true }, { d: '29', muted: true }, { d: '30', muted: true },
                { d: '1' }, { d: '2', dot: true }, { d: '3' },
                { d: '4' }, { d: '5' }, { d: '6' }, { d: '7' }, { d: '8' }, { d: '9' }, { d: '10', dot: true },
                { d: '11' }, { d: '12' }, { d: '13', dot: true }, { d: '14' }, { d: '15' }, { d: '16' }, { d: '17', dot: true },
                { d: '18' }, { d: '19' }, { d: '20' }, { d: '21' }, { d: '22' }, { d: '23', active: true, dot: true }, { d: '24' },
                { d: '25' }, { d: '26' }, { d: '27' }, { d: '28', dot: true }, { d: '29' }, { d: '30' }, { d: '31', dot: true },
              ].map((cell, idx) => (
                <div
                  key={idx}
                  className={`relative py-2 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                    cell.active
                      ? 'bg-[#8B2612] text-white font-extrabold shadow-md'
                      : cell.muted
                      ? 'text-[#6E6259]/40'
                      : 'text-[#1E1B18] hover:bg-[#FAF2E6] font-semibold'
                  }`}
                >
                  <span>{cell.d}</span>
                  {cell.dot && (
                    <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${cell.active ? 'bg-amber-300' : 'bg-[#EA6A2A]'}`}></span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E6DEC8]/60 flex items-center justify-between text-[11px] text-[#6E6259]">
              <span>🔴 प्रमुख व्रत एवं एकादशी</span>
              <a href="/calendar" className="font-bold text-[#8B2612] hover:underline">पूरा पंचांग ➔</a>
            </div>
          </div>

          {/* Card 2 (4 Cols): Upcoming Festivals & Vrats */}
          <div className="lg:col-span-4 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6DEC8]/80 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🪔</span>
                <h2 className="text-base font-bold font-serif text-[#1E1B18]">आगामी व्रत एवं त्यौहार</h2>
              </div>
              <a href="/calendar" className="text-xs font-bold text-[#EA6A2A] hover:underline">
                सभी देखें ➔
              </a>
            </div>

            <div className="space-y-3">
              {[
                { day: '23', month: 'अक्टूबर', icon: '🌕', title: 'करवा चौथ / संकष्टी', desc: 'पति की दीर्घायु हेतु व्रत • चंद्रोदय 08:14 PM' },
                { day: '28', month: 'अक्टूबर', icon: '✨', title: 'अहोई अष्टमी व्रत', desc: 'संतान सुख एवं दीर्घायु के लिए तारा दर्शन व्रत' },
                { day: '06', month: 'नवंबर', icon: '🌿', title: 'रमा एकादशी (स्मार्त/वैष्णव)', desc: 'पारण समय: 07 नवंबर प्रातः 06:38 – 08:52 AM' },
                { day: '08', month: 'नवंबर', icon: '🪔', title: 'धनतेरस एवं दीपोत्सव आरंभ', desc: 'धन्वंतरि पूजन एवं स्वर्ण क्रय का परम शुभ मुहूर्त' },
              ].map((fest, i) => (
                <a
                  key={i}
                  href="/calendar"
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FAF6F0] hover:bg-[#FAF2E6] border border-[#E6DEC8] transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E6DEC8] text-center shadow-2xs">
                      <p className="text-sm font-mono font-extrabold text-[#EA6A2A] leading-none">{fest.day}</p>
                      <p className="text-[10px] font-bold text-[#6E6259] pt-0.5">{fest.month}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#FAF2E6] flex items-center justify-center text-base border border-[#C88A2B]/30">
                      {fest.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1E1B18] group-hover:text-[#8B2612]">{fest.title}</p>
                      <p className="text-[11px] text-[#6E6259] line-clamp-1">{fest.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#6E6259] group-hover:translate-x-0.5 transition-transform pr-1">›</span>
                </a>
              ))}
            </div>
          </div>

          {/* Card 3 (4 Cols): Live Planetary Gochar & Moon Phase */}
          <div className="lg:col-span-4 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E6DEC8] shadow-[0_4px_24px_-4px_rgba(124,29,29,0.05)] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6DEC8]/80 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🪐</span>
                <h2 className="text-base font-bold font-serif text-[#1E1B18]">ग्रह स्थिति (वर्तमान गोचर)</h2>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#8B2612] bg-[#FAF2E6] px-2.5 py-0.5 rounded-full border border-[#E6DEC8]">
                लहिरी: 24° 13&apos;
              </span>
            </div>

            {/* Moon Phase Strip */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF2E6]/70 border border-[#C88A2B]/40">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🌔</span>
                <div>
                  <p className="text-xs font-bold text-[#1E1B18]">चंद्र कला: ८८% प्रदीप्त (शुक्ल पक्ष)</p>
                  <p className="text-[11px] text-[#6E6259]">कुंभ राशि • शतभिषा नक्षत्र</p>
                </div>
              </div>
            </div>

            {/* Live Graha Degrees Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { g: '☀️ सूर्य', r: 'तुला', d: '05° 42\'' },
                { g: '🌙 चंद्र', r: 'कुंभ', d: '16° 18\'' },
                { g: '🔥 मंगल', r: 'कर्क', d: '22° 09\'' },
                { g: '🌿 बुध', r: 'तुला', d: '18° 50\'' },
                { g: '🔱 गुरु', r: 'मिथुन [व]', d: '11° 04\'' },
                { g: '💎 शुक्र', r: 'वृश्चिक', d: '09° 31\'' },
                { g: '⚖️ शनि', r: 'मीन [व]', d: '19° 14\'' },
                { g: '🐉 राहु', r: 'कुंभ [व]', d: '24° 11\'' },
              ].map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E6DEC8] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#1E1B18] text-[11px]">{p.g}</p>
                    <p className="text-[10px] text-[#6E6259]">{p.r}</p>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#8B2612]">{p.d}</span>
                </div>
              ))}
            </div>
          </div>

        </section>


        {/* ========================================================
            SECTION 5 (BENTO ROW 4): 4-Column Vedic Tools Directory
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

      {/* Minimal Status Bar Footer */}
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
