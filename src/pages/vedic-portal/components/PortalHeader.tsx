import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useRouter } from '../../../routes/AppRoutes';
import { VedicIcon3D } from './VedicIcon3D';
import { HeaderSearchModal } from './HeaderSearchModal';
import { useLocationStore, majorCities } from '../../../store/locationStore';
import type { CityLocation } from '../../../types/location';
import { calculatePanchang } from '../../../engine';
import {
  formatTimeToHindi,
  formatTimeRangeToHindi,
  cleanHindiName,
  toHindiDigits
} from '../../../components/watch';

const POPULAR_VEDIC_CITIES = [
  { name: 'Ujjain (Avantika)', nameHindi: 'उज्जैन', id: 'ujjain' },
  { name: 'Varanasi (Kashi)', nameHindi: 'काशी / वाराणसी', id: 'varanasi' },
  { name: 'Ayodhya', nameHindi: 'अयोध्या', id: 'ayodhya' },
  { name: 'Mathura', nameHindi: 'मथुरा', id: 'mathura' },
  { name: 'Haridwar', nameHindi: 'हरिद्वार', id: 'haridwar' },
  { name: 'Prayagraj', nameHindi: 'प्रयागराज', id: 'prayagraj' },
  { name: 'New Delhi', nameHindi: 'नई दिल्ली', id: 'delhi' },
  { name: 'Mumbai', nameHindi: 'मुंबई', id: 'mumbai' },
  { name: 'Jaipur', nameHindi: 'जयपुर', id: 'jaipur' },
  { name: 'Kanpur', nameHindi: 'कानपुर', id: 'kanpur' },
];

export const PortalHeader: React.FC = () => {
  const { currentPath } = useRouter();
  const { currentCity, setCity, detectDeviceLocation, isLocating } = useLocationStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Global Ctrl+K / Cmd+K Search Hotkey & Esc Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to dismiss dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  // 1-Touch Outside Dismiss Listener for City Dropdown Popover
  useEffect(() => {
    if (!isCityDropdownOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCityDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isCityDropdownOpen]);

  // Fast In-Memory City Search Filtering
  const filteredCities = useMemo(() => {
    const q = citySearch.trim().toLowerCase();
    if (!q) {
      return majorCities.slice(0, 30);
    }
    return majorCities
      .filter((c) =>
        c.name.toLowerCase().includes(q) ||
        (c.nameHindi && c.nameHindi.includes(q)) ||
        (c.state && c.state.toLowerCase().includes(q)) ||
        (c.stateHindi && c.stateHindi.includes(q))
      )
      .slice(0, 40);
  }, [citySearch]);

  const handleSelectCity = (city: CityLocation) => {
    setCity(city);
    setIsCityDropdownOpen(false);
    setCitySearch('');
  };

  const handleGpsClick = async () => {
    try {
      await detectDeviceLocation();
      setIsCityDropdownOpen(false);
    } catch {
      // safe fallback
    }
  };

  const toolsDropdownItems = [
    { label: '३६ गुण कुण्डली मिलान', href: '/matchmaking', icon: '💍', desc: 'विवाह गुण मिलान व मांगलिक निर्णय', badge: 'विवाह' },
    { label: 'शनि साढ़े साती कैलकुलेटर', href: '/utilities', icon: '🪐', desc: 'साढ़े साती चरण, ढैया व निवारण', badge: 'उपाय' },
    { label: 'रत्न एवं रुद्राक्ष परामर्श', href: '/utilities', icon: '💎', desc: 'लग्न व राशि अनुसार शुभ रत्न', badge: 'परामर्श' },
    { label: 'नवग्रह गोचर व दृष्टियां', href: '/navagraha', icon: '☀️', desc: '९ ग्रहों का वास्तविक गोचर व बीज मंत्र', badge: 'गोचर' },
    { label: 'वैदिक वास्तु कम्पास', href: '/utilities', icon: '🧭', desc: '८ दिशाओं का वास्तु चक्र विश्लेषण', badge: 'वास्तु' },
    { label: 'वैदिक समय परिवर्तक', href: '/utilities', icon: '⏳', desc: 'घटी-पल से आधुनिक समय कनवर्टर', badge: 'कालगणना' },
    { label: 'पंचांग A4 PDF डाउनलोड', href: '/download-panchang', icon: '🖨️', desc: 'दैनिक पंचांग प्रिंटेबल दस्तावेज', badge: 'प्रिंट' },
    { label: '५०००+ नगर एटलस', href: '/cities', icon: '🗺️', desc: 'भारतीय कस्बों की अक्षांश-देशांतर सूची', badge: 'एटलस' },
    { label: 'अयनांश एवं सेटिंग्स', href: '/settings', icon: '⚙️', desc: 'लाहिड़ी/केपी अयनांश व कुंडली शैली', badge: 'सिस्टम' },
  ];

  const isToolsActive = ['/matchmaking', '/utilities', '/navagraha', '/gochar', '/download-panchang', '/cities', '/settings'].includes(currentPath);

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

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fbf7ee]/90 backdrop-blur-2xl border-b border-[#d95d0f]/15 shadow-[0_4px_24px_rgba(77,51,34,0.06)] font-serif">
      {/* Ephemeris Mini Strip (सूक्ष्म पंचांग पट्टी) */}
      <div className="w-full bg-[#f4ecd9]/85 backdrop-blur-md px-4 sm:px-8 lg:px-12 flex items-center justify-between h-8 border-b border-[#e5d5be]/60 text-xs">
        <div className="flex items-center gap-3 sm:gap-4 text-[#735641] overflow-x-auto whitespace-nowrap scrollbar-none py-1">
          <div className="flex items-center gap-1.5 text-[#b8860b] font-medium shrink-0 whitespace-nowrap">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            <span>{cityDisplay}</span>
          </div>
          <span className="text-[#d8c5ad] shrink-0">•</span>
          <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
            <span className="material-symbols-outlined text-[#ea580c] text-[14px]">wb_twilight</span>
            <span className="text-[#382012] font-semibold">सूर्योदय: {sunriseStr} | सूर्यास्त: {sunsetStr}</span>
          </div>
          <span className="text-[#d8c5ad] shrink-0">•</span>
          <div className="flex items-center gap-1 shrink-0 whitespace-nowrap">
            <span className="text-[#c2410c] font-bold">तिथि:</span>
            <span className="text-[#382012] font-semibold">{tithiName}</span>
          </div>
          <span className="text-[#d8c5ad] shrink-0">•</span>
          <div className="flex items-center gap-1 shrink-0 whitespace-nowrap">
            <span className="text-[#c2410c] font-bold">नक्षत्र:</span>
            <span className="text-[#382012] font-semibold whitespace-nowrap">{nakshatraName}</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1 text-[#735641] text-[11px] shrink-0 whitespace-nowrap pl-2">
          <span className="material-symbols-outlined text-[13px] text-[#b8860b]">auto_awesome</span>
          <span>अयनांश: लाहिड़ी २४°११'४२"</span>
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
              <span className="text-xl sm:text-2xl font-bold tracking-wide text-[#c2410c]">
                सनातन घड़ी वैदिक
              </span>
              <span className="text-[10px] tracking-widest text-[#735641] font-semibold">
                SANATAN GHADI VEDIC
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-[16px] font-semibold">
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

            {/* वैदिक टूल्स व अन्य सेवाएं ड्रॉपडाउन */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1 transition-colors font-semibold pb-1 border-b-2 cursor-pointer ${
                  isDropdownOpen || isToolsActive
                    ? 'text-[#c2410c] border-[#c2410c] font-bold'
                    : 'text-[#684d3b] hover:text-[#c2410c] border-transparent'
                }`}
                aria-expanded={isDropdownOpen}
              >
                <span>वैदिक टूल्स</span>
                <span className={`text-[9px] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl bg-white border border-[#dec9ab] shadow-[0_16px_40px_rgba(77,51,34,0.16)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-amber-100 flex items-center justify-between text-[11px] font-bold text-[#b8860b]">
                    <span>✨ समस्त वैदिक सेवाएं एवं टूल्स</span>
                    <span className="text-[10px] text-[#735641]">९ साधन</span>
                  </div>
                  <div className="max-h-[380px] overflow-y-auto divide-y divide-amber-50 py-1">
                    {toolsDropdownItems.map((tool) => (
                      <Link
                        key={tool.href + tool.label}
                        href={tool.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#fff8ed] transition-colors group no-underline text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 flex items-center justify-center text-sm shrink-0 group-hover:scale-105 transition-transform">
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#26150b] group-hover:text-[#ea580c] flex items-center justify-between">
                            <span className="truncate">{tool.label}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100/70 text-[#c2410c] font-bold shrink-0 ml-1">
                              {tool.badge}
                            </span>
                          </div>
                          <div className="text-[10px] text-[#735641] leading-tight mt-0.5 truncate">
                            {tool.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Universal Header Prominent Quick Search Bar */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-between gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 w-32 sm:w-48 md:w-56 lg:w-64 xl:w-72 rounded-2xl bg-white hover:bg-[#fffdfa] text-[#735641] hover:text-[#26150b] text-xs sm:text-[13px] font-medium border border-[#dec9ab] hover:border-[#ea580c]/60 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            title="त्वरित खोजें (Ctrl+K)"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-[19px] text-[#ea580c] group-hover:scale-110 transition-transform shrink-0">search</span>
              <span className="truncate text-[#8c7166] group-hover:text-[#26150b]">
                <span className="hidden sm:inline">पंचांग, मुहूर्त, कुण्डली खोजें...</span>
                <span className="sm:hidden">खोजें...</span>
              </span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-[#f5ecdd] text-[10px] font-mono text-[#735641] border border-[#dec9ab]/70 shadow-3xs shrink-0 group-hover:bg-[#ea580c] group-hover:text-white group-hover:border-[#ea580c] transition-colors">
              <span>Ctrl</span>
              <span>K</span>
            </kbd>
          </button>

          {/* Quick City Selector Anchor Container with Compact Dropdown Popover */}
          <div className="relative" ref={cityDropdownRef}>
            <button
              type="button"
              onClick={() => setIsCityDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-[13px] font-bold border shadow-2xs hover:shadow-xs transition-all cursor-pointer group shrink-0 ${
                isCityDropdownOpen
                  ? 'bg-amber-100/90 text-[#c2410c] border-[#ea580c] ring-2 ring-[#ea580c]/20'
                  : 'bg-white hover:bg-[#fff9f0] text-[#26150b] hover:text-[#ea580c] border-[#dec9ab] hover:border-[#ea580c]/60'
              }`}
              title="नगर या स्थान बदलें (५०००+ नगर व GPS)"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ea580c] group-hover:scale-110 transition-transform">location_on</span>
              <span className="truncate max-w-[85px] sm:max-w-[120px] md:max-w-[140px] font-serif">
                {currentCity.nameHindi || currentCity.name}
              </span>
              <span className={`material-symbols-outlined text-[16px] text-[#8c7166] transition-transform duration-200 ${isCityDropdownOpen ? 'rotate-180 text-[#ea580c]' : ''}`}>
                arrow_drop_down
              </span>
            </button>

            {/* Compact Header Popover Dropdown (Right-aligned under button) */}
            {isCityDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-76 sm:w-88 md:w-96 rounded-3xl bg-[#fffdfa] border border-[#dec9ab] shadow-[0_20px_50px_rgba(77,51,34,0.18)] p-3 sm:p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150 text-left font-serif">
                {/* 1. GPS Auto-Detect Button */}
                <button
                  type="button"
                  onClick={handleGpsClick}
                  disabled={isLocating}
                  className="w-full py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-[#ea580c]/12 to-[#b8860b]/15 border border-[#ea580c]/30 hover:border-[#ea580c] text-[#c2410c] text-xs font-bold flex items-center justify-between transition-all cursor-pointer hover:bg-[#ea580c]/20 shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[18px] text-[#ea580c] ${isLocating ? 'animate-spin' : 'animate-pulse'}`}>
                      {isLocating ? 'progress_activity' : 'my_location'}
                    </span>
                    <span>{isLocating ? 'GPS से स्थान खोजा जा रहा है...' : 'वर्तमान स्थान पहचानें (GPS Auto-Detect)'}</span>
                  </div>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#dec9ab] font-mono text-[#735641]">GPS</span>
                </button>

                {/* 2. Fast City Search Input */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-[#735641]">search</span>
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    placeholder="नगर का नाम खोजें (उदा. उज्जैन, काशी, Delhi)..."
                    className="w-full pl-9 pr-8 py-2 bg-white border border-[#dec9ab] rounded-xl text-xs text-[#26150b] placeholder-[#8c7166] focus:outline-hidden focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] font-sans"
                    autoFocus
                  />
                  {citySearch && (
                    <button
                      type="button"
                      onClick={() => setCitySearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 w-5 h-5 flex items-center justify-center rounded-full hover:bg-stone-100"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* 3. Popular Sacred Cities Quick Chips */}
                {!citySearch && (
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold text-[#735641] uppercase tracking-wider">
                      प्रमुख तीर्थ व नगर:
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto scrollbar-thin">
                      {POPULAR_VEDIC_CITIES.map((pc) => {
                        const isSelected = currentCity.id === pc.id || (currentCity.nameHindi && currentCity.nameHindi.includes(pc.nameHindi));
                        return (
                          <button
                            key={pc.id}
                            type="button"
                            onClick={() => {
                              const matchCity = majorCities.find((c) => c.id === pc.id || c.name.toLowerCase().includes(pc.id));
                              if (matchCity) handleSelectCity(matchCity);
                            }}
                            className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#c2410c] text-white border-[#c2410c] font-bold shadow-2xs'
                                : 'bg-white text-[#26150b] border-[#dec9ab] hover:border-[#ea580c] hover:bg-amber-50'
                            }`}
                          >
                            {pc.nameHindi}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. Cities List (Fast Scrollable) */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-[#735641] uppercase tracking-wider flex items-center justify-between">
                    <span>{citySearch ? `खोज परिणाम (${toHindiDigits(filteredCities.length)})` : 'सभी नगर (वर्णक्रमानुसार):'}</span>
                    <span className="text-[9px] text-[#b8860b]">५,०००+ नगर समर्थित</span>
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1 scrollbar-thin pr-1">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => {
                        const isSelected = currentCity.id === city.id || (currentCity.name === city.name && currentCity.state === city.state);
                        return (
                          <button
                            key={city.id || `${city.name}-${city.latitude}`}
                            type="button"
                            onClick={() => handleSelectCity(city)}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-amber-100/90 border border-amber-300 shadow-2xs'
                                : 'hover:bg-amber-50/80 border border-transparent hover:border-[#dec9ab]/50'
                            }`}
                          >
                            <div className="min-w-0 pr-2">
                              <div className="text-xs font-bold text-[#26150b] truncate">
                                {city.nameHindi || city.name}
                              </div>
                              <div className="text-[10.5px] text-[#735641] truncate">
                                {city.stateHindi || city.state} • {city.name}
                              </div>
                            </div>
                            {isSelected && (
                              <span className="material-symbols-outlined text-sm text-[#c2410c] shrink-0 font-bold">check</span>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="py-6 text-center text-xs text-[#735641]">
                        कोई नगर नहीं मिला। स्पेलिंग जांचें।
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Universal Spotlight Search Modal */}
      <HeaderSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
