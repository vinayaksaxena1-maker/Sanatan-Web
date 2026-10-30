import React, { useMemo } from 'react';
import { Link, useRouter } from '../../../routes/AppRoutes';
import { VedicIcon3D } from './VedicIcon3D';
import { useLocationStore } from '../../../store/locationStore';
import { calculatePanchang } from '../../../engine';
import {
  formatTimeToHindi,
  formatTimeRangeToHindi,
  cleanHindiName,
  toHindiDigits
} from '../../../components/watch';

export const PortalHeader: React.FC = () => {
  const { currentPath } = useRouter();
  const { currentCity } = useLocationStore();

  const panchang = useMemo(() => {
    return calculatePanchang(currentCity.latitude, currentCity.longitude, new Date());
  }, [currentCity.latitude, currentCity.longitude]);

  const navItems = [
    { label: 'मुख्य पृष्ठ', href: '/' },
    { label: 'दैनिक पंचांग', href: '/panchang' },
    { label: 'जन्म कुण्डली', href: '/kundli' },
    { label: 'चौघड़िया व होरा', href: '/choghadiya', match: ['/choghadiya', '/choghadiya-hora', '/hora'] },
    { label: 'शुभ मुहूर्त', href: '/muhurat' },
    { label: 'व्रत कैलेंडर', href: '/calendar' },
  ];

  const cityDisplay = `${currentCity.nameHindi || currentCity.name} (${Math.abs(currentCity.latitude).toFixed(2)}° ${currentCity.latitude >= 0 ? 'उ' : 'द'}, ${Math.abs(currentCity.longitude).toFixed(2)}° ${currentCity.longitude >= 0 ? 'पू' : 'प'})`;
  const sunriseStr = panchang?.sunrise ? formatTimeToHindi(panchang.sunrise) : '०६:०४ पूर्वाह्न';
  const sunsetStr = panchang?.sunset ? formatTimeToHindi(panchang.sunset) : '०५:४३ अपराह्न';
  const tithiName = panchang?.hinduDate?.tithi?.hindiName
    ? cleanHindiName(panchang.hinduDate.tithi.hindiName)
    : 'शुक्ल पक्ष';
  const nakshatraName = panchang?.hinduDate?.nakshatra?.hindiName
    ? `${cleanHindiName(panchang.hinduDate.nakshatra.hindiName)} (पद ${toHindiDigits(panchang.hinduDate.nakshatra.pada || 1)})`
    : 'नक्षत्र';
  const rahuKaalStr = panchang?.rahuKaal?.start && panchang?.rahuKaal?.end
    ? formatTimeRangeToHindi(panchang.rahuKaal.start, panchang.rahuKaal.end)
    : 'वर्ज्य काल';
  const samvatYear = panchang?.hinduDate?.samvatVikram
    ? toHindiDigits(panchang.hinduDate.samvatVikram)
    : '२०८१';

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fbf7ee]/90 backdrop-blur-2xl border-b border-[#d95d0f]/15 shadow-[0_4px_24px_rgba(77,51,34,0.06)] font-serif">
      {/* Ephemeris Mini Strip (सूक्ष्म पंचांग पट्टी) */}
      <div className="w-full bg-[#f4ecd9]/85 backdrop-blur-md px-4 sm:px-8 lg:px-12 flex items-center justify-between h-8 border-b border-[#e5d5be]/60 text-xs">
        <div className="flex items-center gap-4 text-[#735641] overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-[#b8860b] font-medium">
            <span className="material-symbols-outlined text-[14px]">temple_hindu</span>
            <span>{cityDisplay}</span>
          </div>
          <span className="text-[#d8c5ad]">•</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ea580c] text-[14px]">wb_twilight</span>
            <span className="text-[#382012] font-semibold">सूर्योदय: {sunriseStr} | सूर्यास्त: {sunsetStr}</span>
          </div>
          <span className="text-[#d8c5ad]">•</span>
          <div className="flex items-center gap-1">
            <span className="text-[#c2410c] font-bold">तिथि:</span>
            <span className="text-[#382012]">{tithiName}</span>
          </div>
          <span className="text-[#d8c5ad]">•</span>
          <div className="flex items-center gap-1">
            <span className="text-[#c2410c] font-bold">नक्षत्र:</span>
            <span className="text-[#382012]">{nakshatraName}</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="px-2.5 py-0.5 rounded-full bg-[#ea580c]/12 text-[#c2410c] border border-[#ea580c]/25 flex items-center gap-1.5 font-bold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-pulse"></span>
            <span>राहु काल: {rahuKaalStr} (वर्ज्य काल)</span>
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
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 border-2 border-[#d4af37]/80 shadow-[0_2px_12px_rgba(212,175,55,0.3)] group-hover:scale-105 group-hover:border-[#ea580c] transition-all duration-300 bg-white">
              <img src="/App1.png" alt="Sanatan Ghadi Vedic Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-wide text-[#c2410c]">सनातन घड़ी वैदिक</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-[#f3e6cf] border border-[#dfccb0] text-[#7b5800] font-bold">Vedic</span>
              </div>
              <span className="text-[10px] tracking-widest text-[#735641] font-semibold">SANATAN GHADI VEDIC • कालगणना यंत्र</span>
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
            <span className="font-bold text-[#c2410c]">विक्रम संवत {samvatYear}</span>
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
