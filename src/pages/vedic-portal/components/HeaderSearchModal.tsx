/**
 * Sanatan Web (सनातन घड़ी)
 * Component: HeaderSearchModal
 * Universal Spotlight Quick-Search Modal with Keyboard Navigation (Ctrl+K / Cmd+K)
 * Accessible across all 18 pages of Sanatan Web
 * Pure Web Standards, Strict < 300 Lines Modular Standard
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
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

interface HeaderSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeaderSearchModal: React.FC<HeaderSearchModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close on Outside Click or Touch anywhere on screen
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('touchstart', handlePointerDown);
    }

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen, onClose]);

  // Filter matches based on search term
  const matches = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return SEARCH_DESTINATIONS.slice(0, 6);

    return SEARCH_DESTINATIONS.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchKeyword = item.keywords.some(k => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()));
      return matchTitle || matchSubtitle || matchKeyword;
    }).slice(0, 6);
  }, [searchTerm]);

  const handleSelect = (href: string) => {
    onClose();
    navigate(href);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && matches.length > 0) {
      handleSelect(matches[0].href);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 font-serif cursor-pointer"
      onClick={(e) => {
        if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-[#fffdfa] border border-[#dec9ab] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 cursor-default"
      >
        
        {/* Top Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#dec9ab]/70 bg-white flex items-center gap-3">
          <span className="material-symbols-outlined text-[#ea580c] text-[24px] shrink-0">
            search
          </span>

          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="खोजें: 'आज का राहु काल', 'एकादशी व्रत', 'विवाह मुहूर्त', 'मेष राशि', 'साढ़ेसाती'..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#26150b] placeholder-[#735641]/60 focus:outline-none"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 rounded-lg bg-[#fbf6ec] text-[11px] font-bold text-[#735641] hover:text-[#26150b] border border-[#dec9ab]/70 shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Popular Preset Pills */}
        <div className="px-4 sm:px-5 py-2.5 bg-[#fbf6ec]/80 border-b border-[#dec9ab]/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          <span className="text-[10.5px] font-bold text-[#735641] uppercase tracking-wider shrink-0 mr-1">
            त्वरित:
          </span>
          {PRESET_QUICK_PILLS.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(pill.href)}
              className="px-2.5 py-1 rounded-xl bg-white text-[#735641] hover:text-[#c2410c] text-[11px] font-semibold border border-[#dec9ab]/70 hover:border-[#ea580c] shadow-2xs transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-3 sm:p-4 max-h-[380px] overflow-y-auto space-y-1.5">
          {matches.length > 0 ? (
            matches.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.href)}
                className="w-full p-3 rounded-2xl hover:bg-[#fff9ed] transition-colors flex items-center justify-between text-left group cursor-pointer border border-transparent hover:border-[#dec9ab]/70"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#26150b] group-hover:text-[#c2410c] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#735641] truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#fbf6ec] text-[#b8860b] font-bold border border-[#dec9ab]/60">
                    {item.badge}
                  </span>
                  <span className="text-sm text-[#dec9ab] group-hover:text-[#ea580c] group-hover:translate-x-1 transition-all">
                    ➔
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="py-8 text-center space-y-1 text-[#735641]">
              <span className="material-symbols-outlined text-[32px] text-amber-500">search_off</span>
              <p className="text-xs font-semibold">कोई परिणाम नहीं मिला। कृपया अन्य शब्द लिखकर खोजें।</p>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-5 py-2.5 bg-[#f4ecd9]/60 border-t border-[#dec9ab]/60 flex items-center justify-between text-[11px] text-[#735641]">
          <span>नेविगेट करने हेतु `Enter` दबाएं या क्लिक करें</span>
          <span className="font-mono">सनातन घड़ी वैश्विक खोज</span>
        </div>

      </div>
    </div>
  );
};

export default HeaderSearchModal;
