import React from 'react';
import { Link, useRouter } from '../../../routes/AppRoutes';
import { VedicIcon3D } from './VedicIcon3D';

export const PortalHeader: React.FC = () => {
  const { currentPath } = useRouter();

  const navItems = [
    { label: 'मुख्य पृष्ठ', href: '/' },
    { label: 'दैनिक पंचांग', href: '/panchang' },
    { label: 'जन्म कुण्डली', href: '/kundli' },
    { label: 'चौघड़िया व होरा', href: '/choghadiya', match: ['/choghadiya', '/choghadiya-hora', '/hora'] },
    { label: 'शुभ मुहूर्त', href: '/muhurat' },
    { label: 'व्रत कैलेंडर', href: '/calendar' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fbf7ee]/90 backdrop-blur-2xl border-b border-[#d95d0f]/15 shadow-[0_4px_24px_rgba(77,51,34,0.06)] font-serif">
      {/* Ephemeris Mini Strip (सूक्ष्म पंचांग पट्टी) */}
      <div className="w-full bg-[#f4ecd9]/85 backdrop-blur-md px-4 sm:px-8 lg:px-12 flex items-center justify-between h-8 border-b border-[#e5d5be]/60 text-xs">
        <div className="flex items-center gap-4 text-[#735641] overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-[#b8860b] font-medium">
            <span className="material-symbols-outlined text-[14px]">temple_hindu</span>
            <span>वाराणसी (काशी 25.31° उ, 82.97° पू)</span>
          </div>
          <span className="text-[#d8c5ad]">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ea580c] text-[14px]">wb_twilight</span>
            <span className="text-[#382012] font-semibold">सूर्योदय: ०६:१४ पूर्वाह्न | सूर्यास्त: ०६:४१ अपराह्न</span>
          </div>
          <span className="text-[#d8c5ad]">•</span>
          <div className="flex items-center gap-1">
            <span className="text-[#c2410c] font-bold">तिथि:</span>
            <span className="text-[#382012]">शुक्ल त्रयोदशी</span>
          </div>
          <span className="text-[#d8c5ad]">•</span>
          <div className="flex items-center gap-1">
            <span className="text-[#c2410c] font-bold">नक्षत्र:</span>
            <span className="text-[#382012]">उत्तर फाल्गुनी (द्वितीय पद)</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="px-2.5 py-0.5 rounded-full bg-[#ea580c]/12 text-[#c2410c] border border-[#ea580c]/25 flex items-center gap-1.5 font-bold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-pulse"></span>
            <span>राहु काल: ०४:३० – ०६:०० अपराह्न (वर्ज्य काल)</span>
          </div>
          <div className="hidden xl:flex items-center gap-1 text-[#735641] text-[11px]">
            <span className="material-symbols-outlined text-[13px] text-[#b8860b]">auto_awesome</span>
            <span>अयनांश: लाहिड़ी २४°११'४२"</span>
          </div>
        </div>
      </div>

      {/* Main Hindi Navigation Bar */}
      <div className="h-18 lg:h-20 w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 xl:gap-8">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group no-underline">
            <div className="p-1 rounded-xl bg-white/90 border border-[#dec9ab] shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center w-11 h-11">
              <VedicIcon3D name="om" size="sm" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-wide text-[#c2410c]">वेद ज्योतिष केंद्र</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-[#f3e6cf] border border-[#dfccb0] text-[#7b5800] font-bold">वैदिक</span>
              </div>
              <span className="text-[10px] tracking-widest text-[#735641] font-semibold">प्रामाणिक वैदिक ज्योतिष एवं काल गणना</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = item.match
                ? item.match.includes(currentPath)
                : currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors no-underline font-semibold pb-1 border-b-2 ${
                    isActive
                      ? 'text-[#c2410c] border-[#c2410c] font-bold'
                      : 'text-[#684d3b] hover:text-[#c2410c] border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-pill text-xs text-[#684d3b] border border-[#dec9ab]">
            <VedicIcon3D name="tithi" size="sm" />
            <span className="font-bold text-[#c2410c]">विक्रम संवत २०८१</span>
            <span className="text-[#8c7166]">• क्रोधी संवत्सर</span>
          </div>
          <Link
            href="/kundli"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 no-underline cursor-pointer"
          >
            <VedicIcon3D name="kundli" size="sm" />
            <span>निःशुल्क कुण्डली</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
