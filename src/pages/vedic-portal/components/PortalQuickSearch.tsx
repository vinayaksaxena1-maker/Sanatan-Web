/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalQuickSearch
 * Smart Vedic Quick-Search Bar & Instant Jump Navigator
 * Fast Client-Side Auto-Suggest, Preset Pills & Zero-Latency Navigation
 * Pure Web Standards, Strict < 300 Lines Modular Architecture
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter, Link } from '../../../routes/AppRoutes';

interface SearchDestination {
  id: string;
  title: string;
  subtitle: string;
  keywords: string[];
  href: string;
  icon: string;
  badge: string;
}

const SEARCH_DESTINATIONS: SearchDestination[] = [
  {
    id: 'rahu-kaal',
    title: 'आज का राहु काल एवं वर्ज्य समय',
    subtitle: 'दैनिक पंचांग, दिशा शूल व अभिजित मुहूर्त',
    keywords: ['राहु काल', 'rahu kaal', 'अशुभ', 'वर्ज्य', 'दिशा शूल', 'अभिजित', 'पंचांग'],
    href: '/panchang',
    icon: 'warning',
    badge: 'पंचांग'
  },
  {
    id: 'ekadashi',
    title: 'पावन एकादशी व्रत एवं पारण समय',
    subtitle: 'वर्ष २०२६ के समस्त व्रत, त्योहार व पारण मुहूर्त',
    keywords: ['एकादशी', 'ekadashi', 'व्रत', 'vrat', 'त्योहार', 'पारण', 'प्रदोष', 'पूर्णिमा'],
    href: '/calendar',
    icon: 'calendar_month',
    badge: 'व्रत-पर्व'
  },
  {
    id: 'matchmaking',
    title: 'विवाह कुण्डली मिलान (३६ गुण)',
    subtitle: 'अष्टकूट मिलान, मांगलिक विचार व परिहार रिपोर्ट',
    keywords: ['विवाह', 'vivah', 'शादी', 'मिलान', 'milan', '३६ गुण', 'गुण मिलान', 'मांगलिक'],
    href: '/matchmaking',
    icon: 'favorite',
    badge: 'विवाह'
  },
  {
    id: 'kundli',
    title: 'विस्तृत जन्म कुण्डली (D1 से D60)',
    subtitle: 'लग्न चक्र, षड्बल, अष्टकवर्ग व विंशोत्तरी दशा',
    keywords: ['कुण्डली', 'kundli', 'जन्म पत्रिका', 'लग्न', 'दशा', 'षड्बल', 'D1', 'D9'],
    href: '/kundli',
    icon: 'psychology',
    badge: 'ज्योतिष'
  },
  {
    id: 'choghadiya',
    title: 'लाइव चौघड़िया एवं २४ होरा',
    subtitle: 'दिन-रात के १६ चौघड़िया और तात्कालिक शुभ काल',
    keywords: ['चौघड़िया', 'choghadiya', 'होरा', 'hora', 'शुभ समय', 'अमृत', 'लाभ', 'शुभ'],
    href: '/choghadiya',
    icon: 'schedule',
    badge: 'कालचक्र'
  },
  {
    id: 'muhurat',
    title: 'शुभ संस्कार मुहूर्त (१६ संस्कार)',
    subtitle: 'विवाह, गृह प्रवेश, वाहन क्रय, नामकरण व मुण्डन',
    keywords: ['मुहूर्त', 'muhurat', 'गृह प्रवेश', 'वाहन', 'नामकरण', 'मुण्डन', 'नींव पूजन'],
    href: '/muhurat',
    icon: 'temple_hindu',
    badge: 'मुहूर्त'
  },
  {
    id: 'rashifal',
    title: 'दैनिक राशिफल (१२ राशियां)',
    subtitle: 'चन्द्र गोचर फल, शुभ अंक, शुभ रंग व दैनिक सावधानी',
    keywords: ['राशिफल', 'rashifal', 'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'],
    href: '/rashifal',
    icon: 'stars',
    badge: 'राशिफल'
  },
  {
    id: 'utilities',
    title: 'शनि साढ़ेसाती, रत्न व वास्तु कम्पास',
    subtitle: 'शनि साढ़ेसाती जांच, भाग्यशाली रत्न व गृह वास्तु',
    keywords: ['साढ़ेसाती', 'sade sati', 'शनि', 'रत्न', 'ratna', 'वास्तु', 'compass', 'दिशा'],
    href: '/utilities',
    icon: 'diamond',
    badge: 'टूल्स'
  },
  {
    id: 'download-panchang',
    title: 'दैनिक पंचांग A4 PDF पत्रक',
    subtitle: '१-क्लिक में आज का सम्पूर्ण राजसी पंचांग प्रिंट करें',
    keywords: ['पंचांग pdf', 'download', 'प्रिंट', 'print', 'pdf', 'पत्रक', 'डाउनलोड'],
    href: '/download-panchang',
    icon: 'picture_as_pdf',
    badge: 'PDF प्रिंट'
  },
  {
    id: 'cities',
    title: '५,०००+ नगर व तीर्थ पंचांग',
    subtitle: 'स्थानीय सूर्योदय-सूर्यास्त अनुसार पंचांग सेट करें',
    keywords: ['नगर', 'city', 'काशी', 'वाराणसी', 'दिल्ली', 'अयोध्या', 'उज्जैन', 'स्थान'],
    href: '/cities',
    icon: 'location_on',
    badge: 'नगर'
  }
];

const PRESET_QUICK_PILLS = [
  { label: '🌟 कामदा एकादशी', query: 'एकादशी', href: '/calendar' },
  { label: '⚠️ आज राहु काल', query: 'राहु काल', href: '/panchang' },
  { label: '💍 विवाह ३६ गुण', query: 'विवाह मिलान', href: '/matchmaking' },
  { label: '🪐 जन्म कुण्डली', query: 'कुण्डली', href: '/kundli' },
  { label: '🕒 सक्रिय चौघड़िया', query: 'चौघड़िया', href: '/choghadiya' },
  { label: '♈ दैनिक राशिफल', query: 'राशिफल', href: '/rashifal' },
  { label: '📄 पंचांग PDF', query: 'पंचांग pdf', href: '/download-panchang' }
];

export const PortalQuickSearch: React.FC = () => {
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter matches based on search term
  const matches = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];

    return SEARCH_DESTINATIONS.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchKeyword = item.keywords.some(k => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()));
      return matchTitle || matchSubtitle || matchKeyword;
    }).slice(0, 5);
  }, [searchTerm]);

  // Click outside to close results dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setSearchTerm('');
    navigate(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && matches.length > 0) {
      handleSelect(matches[0].href);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="w-full relative z-30 font-serif">
      {/* Search Input Box */}
      <div className="relative w-full rounded-2xl bg-white/95 backdrop-blur-md border border-[#dec9ab] shadow-[0_8px_30px_rgba(77,51,34,0.06)] hover:border-[#ea580c] transition-all duration-300">
        <div className="flex items-center px-4 py-2.5 sm:py-3 gap-3">
          <span className="material-symbols-outlined text-[#ea580c] text-[22px] shrink-0">
            search
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="सनातन त्वरित खोज: 'आज का राहु काल', 'एकादशी व्रत', 'विवाह मुहूर्त', 'मेष राशि', 'साढ़ेसाती'..."
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#26150b] placeholder-[#735641]/70 focus:outline-none"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setIsOpen(false);
              }}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#fbf6ec] text-[10px] font-bold text-[#b8860b] border border-[#dec9ab]/60 shrink-0">
            <span>त्वरित जंप</span>
            <kbd className="px-1.5 py-0.2 rounded bg-white text-[9px] font-mono border border-stone-200">↵</kbd>
          </div>
        </div>

        {/* Instant Search Results Dropdown */}
        {isOpen && matches.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-white border border-[#dec9ab] shadow-xl space-y-1 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {matches.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.href)}
                className="w-full p-2.5 rounded-xl hover:bg-[#fff9ed] transition-colors flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs sm:text-[13px] font-bold text-[#26150b] group-hover:text-[#c2410c] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-[#735641] truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fbf6ec] text-[#b8860b] font-bold border border-[#dec9ab]/60">
                    {item.badge}
                  </span>
                  <span className="text-xs text-[#dec9ab] group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all">
                    ➔
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Preset Quick Pills Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-0.5 scrollbar-none text-xs">
        <span className="text-[10.5px] font-bold text-[#735641] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          लोकप्रिय:
        </span>
        {PRESET_QUICK_PILLS.map((pill, idx) => (
          <Link
            key={idx}
            href={pill.href}
            className="px-2.5 py-1 rounded-xl bg-white/80 hover:bg-white text-[#735641] hover:text-[#c2410c] text-[11px] font-semibold border border-[#dec9ab]/70 hover:border-[#ea580c] shadow-2xs transition-all whitespace-nowrap no-underline shrink-0 flex items-center gap-1"
          >
            {pill.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PortalQuickSearch;
