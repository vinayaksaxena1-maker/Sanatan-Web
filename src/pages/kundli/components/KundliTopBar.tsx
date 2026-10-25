/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Component: KundliTopBar
 * Breadcrumbs, ephemeris badge, and master actions
 */

import React from 'react';
import { Home, Sparkles, Printer, UserPlus, Compass } from 'lucide-react';
import { CompleteHoroscopeResult } from '../../../engine/facade/horoscopeFacade';

interface KundliTopBarProps {
  horoscope: CompleteHoroscopeResult | null;
  onOpenPrintModal: () => void;
  onReset: () => void;
}

export const KundliTopBar: React.FC<KundliTopBarProps> = ({
  horoscope,
  onOpenPrintModal,
  onReset
}) => {
  // Format live ayanamsha value
  const ayanamshaText = horoscope?.metadata
    ? `${horoscope.metadata.ayanamshaType} अयनांश (${Math.floor(horoscope.metadata.ayanamshaValue)}° ${Math.floor((horoscope.metadata.ayanamshaValue % 1) * 60)}' ${Math.round(((horoscope.metadata.ayanamshaValue * 60) % 1) * 60)}") | शुद्ध पराशरीय सिद्धांत`
    : 'चित्रपक्षीय लाहिड़ी अयनांश (२४° १३\' ५४") | शुद्ध पराशरीय सिद्धांत';

  return (
    <header className="flex flex-col gap-4">
      {/* Breadcrumb & Ayanamsha Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <a
            href="/"
            className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>मुख्य पृष्ठ</span>
          </a>
          <span className="text-stone-300 dark:text-stone-700">/</span>
          <span className="text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            जन्म कुण्डली हब (/kundli)
          </span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300/50 dark:border-amber-800/40 rounded-full text-amber-900 dark:text-amber-200 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{ayanamshaText}</span>
        </div>
      </div>

      {/* Main Title & Action Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-amber-900/10 dark:border-amber-200/10">
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
            <span>सटीक ग्रह गणित व वैदिक फलादेश • Brihat Parashara Compliant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 font-serif tracking-tight">
            विस्तृत जन्म कुण्डली एवं पराशरीय ग्रह विश्लेषण
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
            वैदिक लग्न, नवमांश, दशमांश चक्र, ग्रह स्पष्ट, विंशोत्तरी महादशा, भाव बल एवं अष्टकवर्ग का शास्त्रीय प्रामाणिक निरूपण।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenPrintModal}
            className="px-4 py-2.5 bg-white dark:bg-stone-900 hover:bg-amber-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-amber-300/80 dark:border-amber-800/60 font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-600" />
            <span>कुण्डली A4 प्रिंट / PDF</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>डिफ़ॉल्ट जातक (आदित्य)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
