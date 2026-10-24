import { useState } from 'react';

export interface NavbarProps {
  onOpenMegaDrawer?: () => void;
}

export default function Navbar({ onOpenMegaDrawer: _onOpenMegaDrawer }: NavbarProps = {}) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 bg-[#FAF6F0]/80 backdrop-blur-md border-b border-[#E6DEC8]/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo & Subtitle */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EA6A2A] to-[#8B2612] flex items-center justify-center shadow-[0_4px_12px_rgba(234,106,42,0.3)] text-white font-bold text-xl">
            ॐ
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#1E1B18] text-lg tracking-tight">SANATAN</span>
              <span className="text-[#8B2612] font-semibold text-sm">सनातन घड़ी</span>
            </div>
            <p className="text-[11px] text-[#6E6259] tracking-wider uppercase">खगोलीय कालगणना यंत्र • 2026</p>
          </div>
        </div>

        {/* Center: Floating Pill Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-1 bg-[#FFFFFF] px-3 py-1.5 rounded-full border border-[#E6DEC8] shadow-[0_4px_20px_-4px_rgba(124,29,29,0.05)]">
          <a 
            href="/" 
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'home' ? 'bg-[#FAF2E6] text-[#8B2612] shadow-inner' : 'text-[#6E6259] hover:text-[#1E1B18]'}`}
          >
            दैनिक पंचांग
          </a>
          <a 
            href="/kundli" 
            className="px-4 py-1.5 rounded-full text-sm font-medium text-[#6E6259] hover:text-[#1E1B18] hover:bg-[#FAF2E6]/50 transition-all"
          >
            जन्म कुंडली (D1-D60)
          </a>
          <a 
            href="/choghadiya-hora" 
            className="px-4 py-1.5 rounded-full text-sm font-medium text-[#6E6259] hover:text-[#1E1B18] hover:bg-[#FAF2E6]/50 transition-all"
          >
            चौघड़िया व होरा
          </a>
          <a 
            href="/muhurat" 
            className="px-4 py-1.5 rounded-full text-sm font-medium text-[#6E6259] hover:text-[#1E1B18] hover:bg-[#FAF2E6]/50 transition-all"
          >
            शुभ मुहूर्त
          </a>
          <a 
            href="/calendar" 
            className="px-4 py-1.5 rounded-full text-sm font-medium text-[#6E6259] hover:text-[#1E1B18] hover:bg-[#FAF2E6]/50 transition-all"
          >
            व्रत कैलेंडर
          </a>
          <a 
            href="/portal" 
            className="px-3.5 py-1.5 rounded-full text-sm font-bold text-[#c2410c] hover:bg-[#fde8d7]/60 transition-all"
          >
            वेद पोर्टल ✦
          </a>
        </nav>

        {/* Right: Location & CTA Button */}
        <div className="flex items-center space-x-3">
          <button className="hidden sm:flex items-center space-x-2 bg-[#FFFFFF] px-3 py-1.5 rounded-full border border-[#E6DEC8] text-xs font-medium text-[#6E6259] hover:border-[#C88A2B] transition-all shadow-sm">
            <span>📍 नई दिल्ली (28.61° उ.)</span>
            <span className="text-[#EA6A2A] underline font-semibold">बदलें</span>
          </button>

          <a 
            href="/panchang" 
            className="bg-gradient-to-b from-[#EA6A2A] to-[#C84B15] text-white px-5 py-2 rounded-full text-xs font-bold shadow-[0_6px_16px_rgba(234,106,42,0.3)] hover:brightness-105 active:scale-95 transition-all"
          >
            आज का पंचांग देखें ➔
          </a>
        </div>

      </div>
    </header>
  );
}

export { Navbar };
