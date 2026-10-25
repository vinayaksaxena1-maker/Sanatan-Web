/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Mega-Drawer Navigation Sheet
 * Smooth mobile slide-up sheet displaying all hubs and utilities in large readable cards
 */

import React, { useEffect, useCallback } from 'react';
import { useRouter } from '../../routes/AppRoutes';
import { useTranslation } from '../../i18n/i18nContext';
import {
  X,
  Calendar,
  Shield,
  Sparkles,
  Heart,
  Clock,
  Compass,
  Wrench,
  CalendarRange,
  MapPin,
  Settings,
  Flame,
  ShieldCheck,
  FileText,
  ChevronRight,
} from 'lucide-react';

export interface MegaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HubItem {
  path: string;
  labelKey: string;
  hindiTitle: string;
  englishTitle: string;
  subtitleHindi: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  badge?: string;
}

export const MegaDrawer: React.FC<MegaDrawerProps> = ({ isOpen, onClose }) => {
  const { navigate, currentPath } = useRouter();
  const { t, isHindi } = useTranslation();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const hubItems: HubItem[] = [
    {
      path: '/panchang',
      labelKey: 'nav.panchang',
      hindiTitle: 'दैनिक पंचांग हब',
      englishTitle: 'Daily Panchang',
      subtitleHindi: 'तिथि, वार, नक्षत्र, योग, करण एवं सूर्य-चन्द्र स्थिति',
      icon: Calendar,
      colorClass: 'bg-amber-100 text-amber-800',
    },
    {
      path: '/kundli',
      labelKey: 'nav.kundli',
      hindiTitle: 'जन्म कुण्डली (D1-D60)',
      englishTitle: 'Kundli & Horoscope',
      subtitleHindi: 'षोडशवर्ग चक्र, अष्टकवर्ग, विंशोत्तरी महादशा व ग्रह स्पष्ट',
      icon: Shield,
      colorClass: 'bg-indigo-100 text-indigo-800',
    },
    {
      path: '/muhurat',
      labelKey: 'nav.muhurat',
      hindiTitle: 'शुभ मुहूर्त हब',
      englishTitle: 'Auspicious Timings',
      subtitleHindi: 'विवाह, मुंडन, गृह प्रवेश व सर्वार्थ सिद्धि मुहूर्त',
      icon: Sparkles,
      colorClass: 'bg-rose-100 text-rose-800',
    },
    {
      path: '/matchmaking',
      labelKey: 'nav.matchmaking',
      hindiTitle: '३६ गुण मिलान (विवाह)',
      englishTitle: 'Kundli Matchmaking',
      subtitleHindi: 'अष्टकूट मिलान, मांगलिक विचार व भकूट-नाड़ी दोष निवारण',
      icon: Heart,
      colorClass: 'bg-pink-100 text-pink-800',
    },
    {
      path: '/choghadiya',
      labelKey: 'nav.choghadiya',
      hindiTitle: 'चौघड़िया चक्र',
      englishTitle: 'Choghadiya Wheel',
      subtitleHindi: '8 दिन + 8 रात के चौघड़िया कालखंड व लाइव टाइमर',
      icon: Clock,
      colorClass: 'bg-amber-100 text-amber-800',
    },
    {
      path: '/hora',
      labelKey: 'nav.hora',
      hindiTitle: '24-घंटे होरा चक्र',
      englishTitle: 'Planetary Hora',
      subtitleHindi: 'सूर्योदय से 24 ग्रहीय होरा एवं कार्य निर्णय',
      icon: Compass,
      colorClass: 'bg-orange-100 text-orange-800',
    },
    {
      path: '/utilities',
      labelKey: 'nav.utilities',
      hindiTitle: '19 वैदिक सुविधाएं',
      englishTitle: '19 Vedic Utilities',
      subtitleHindi: 'साढ़े साती, 36 गुण मिलान, रत्न, वास्तु, मांगलिक',
      icon: Wrench,
      colorClass: 'bg-purple-100 text-purple-800',
      badge: '19 टूल्स',
    },
    {
      path: '/calendar',
      labelKey: 'nav.calendar',
      hindiTitle: '15 प्रांतीय कैलेंडर',
      englishTitle: 'Regional Calendars',
      subtitleHindi: 'दिवाली, दुर्गा पूजा, नवरात्रि, तमिल, बंगाली पंचांग',
      icon: CalendarRange,
      colorClass: 'bg-red-100 text-red-800',
    },
    {
      path: '/cities',
      labelKey: 'nav.cities',
      hindiTitle: 'नगर / शहर एटलस',
      englishTitle: '5,000+ Indian Towns',
      subtitleHindi: 'उज्जैन (अवन्तिका) मुख्य याम्योत्तर एवं त्वरित खोज',
      icon: MapPin,
      colorClass: 'bg-emerald-100 text-emerald-800',
    },
    {
      path: '/settings',
      labelKey: 'nav.settings',
      hindiTitle: 'सेटिंग्स व बैकअप',
      englishTitle: 'Settings & Backup',
      subtitleHindi: 'भाषा, थीम एवं 1-क्लिक Dexie JSON डेटा बैकअप',
      icon: Settings,
      colorClass: 'bg-stone-100 text-stone-800',
    },
    {
      path: '/about-us',
      labelKey: 'nav.about',
      hindiTitle: 'वैदिक परंपरा व पद्धति',
      englishTitle: 'About & Lineage',
      subtitleHindi: 'NASA JPL DE405 एवं दृश्य पंचांग गणना मानक',
      icon: Flame,
      colorClass: 'bg-amber-100 text-amber-900',
    },
    {
      path: '/privacy-policy',
      labelKey: 'nav.privacy',
      hindiTitle: 'गोपनीयता नीति',
      englishTitle: 'Privacy Policy',
      subtitleHindi: 'शून्य सर्वर डेटा संग्रह प्रतिज्ञा',
      icon: ShieldCheck,
      colorClass: 'bg-teal-100 text-teal-800',
    },
    {
      path: '/terms',
      labelKey: 'nav.terms',
      hindiTitle: 'नियम व शर्तें',
      englishTitle: 'Terms & Disclaimers',
      subtitleHindi: 'खगोलीय एफिमेरिस व सेवा शर्तें',
      icon: FileText,
      colorClass: 'bg-stone-100 text-stone-800',
    },
  ];

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="सनातन घड़ी संपूर्ण हब मेनू"
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Sheet Content Container */}
      <div className="relative w-full sm:max-w-xl max-h-[88vh] bg-[#faf7f2] dark:bg-[#1a1614] rounded-t-3xl sm:rounded-3xl border-t sm:border border-amber-200/80 dark:border-amber-900/50 shadow-2xl flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom duration-300">
        {/* Drag Handle Bar for Mobile */}
        <div className="w-full pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full" />
        </div>

        {/* Header Bar */}
        <div className="px-5 py-3 border-b border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕉️</span>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
                {isHindi ? 'सनातन घड़ी संपूर्ण हब' : 'Sanatan Ghadi All Hubs'}
              </h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {t('brand.subTitle')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="बंद करें"
            className="p-1.5 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Hub Cards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {hubItems.map((hub) => {
            const Icon = hub.icon;
            const isActive = currentPath === hub.path;

            return (
              <button
                key={hub.path}
                type="button"
                onClick={() => handleSelect(hub.path)}
                className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-amber-100/90 dark:bg-amber-950/40 border-amber-400 dark:border-amber-700 shadow-xs'
                    : 'bg-white dark:bg-[#26201b] border-stone-200/80 dark:border-stone-800/80 hover:border-amber-300 dark:hover:border-amber-800 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${hub.colorClass}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                        {isHindi ? hub.hindiTitle : hub.englishTitle}
                      </span>
                      {hub.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white">
                          {hub.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                      {hub.subtitleHindi}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0 ml-2" />
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-amber-50/50 dark:bg-stone-900/40 border-t border-amber-200/40 dark:border-amber-900/30 text-center text-[11px] text-stone-500 dark:text-stone-400">
          <span>100% विज्ञापन-मुक्त एवं पूर्णतः ऑफलाइन सक्षम वैदिक कालगणना</span>
        </div>
      </div>
    </div>
  );
};

export default MegaDrawer;
