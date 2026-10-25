/**
 * Sanatan Web (सनातन घड़ी)
 * Component: UtilitiesTopBar
 * Heritage Scrim, Breadcrumb, Authority Ribbon & 4 Suite Switcher Navigation Pills
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UtilitySuiteTab } from '../hooks/useUtilitiesData';
import { Sparkles, Compass, Gem, Clock, Star } from 'lucide-react';

interface UtilitiesTopBarProps {
  activeTab: UtilitySuiteTab;
  onSelectTab: (tab: UtilitySuiteTab) => void;
}

interface TabOption {
  id: UtilitySuiteTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const TAB_OPTIONS: TabOption[] = [
  { id: 'sade_sati', label: 'शनि साढ़े साती एवं ढैया', icon: Star, tag: 'गोचर' },
  { id: 'time_converter', label: 'सनातन कालगणना कन्वर्टर', icon: Clock, tag: 'घटी/मुहूर्त' },
  { id: 'gemstone_rudraksha', label: 'रत्न एवं रुद्राक्ष परामर्श', icon: Gem, tag: 'लग्न' },
  { id: 'vastu_compass', label: 'अष्टदिशा वास्तु व दिशाशूल', icon: Compass, tag: 'दिशा' },
];

export const UtilitiesTopBar: React.FC<UtilitiesTopBarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#fffdfa] via-[#fdf7ee] to-[#fbf2e3] border border-[#dec9ab]/70 shadow-[0_8px_30px_rgb(180,120,40,0.06)] space-y-6">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      <div className="relative z-10 space-y-5">
        {/* Breadcrumb & Authority Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#735641]">
          <div className="flex items-center gap-1.5 font-medium">
            <a href="/" className="hover:text-[#c2410c] transition-colors flex items-center gap-1">
              <span>मुख्य पृष्ठ</span>
            </a>
            <span>/</span>
            <span className="text-[#c2410c] font-bold">वैदिक टूल्स</span>
            <span>/</span>
            <span className="text-[#26150b] font-semibold">सनातन कालगणना एवं ज्योतिषीय सुविधाएं</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-950 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            <span>सूर्यसिद्धांत एवं महर्षि पराशर शास्त्रोक्त अनुमोदित गणित</span>
          </div>
        </div>

        {/* Header Title Banner */}
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider uppercase font-serif">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>।। ॐ कालचक्राय नमः ।।</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#26150b] tracking-tight leading-tight">
            सनातन कालगणना एवं वैदिक ज्योतिषीय टूल्स हब
          </h1>
          <p className="text-xs sm:text-sm text-[#735641] leading-relaxed">
            शनि साढ़े साती एवं ढैया का प्रत्यक्ष खगोलीय गोचर, सूक्ष्म-महा कालगणना (त्रुटि से कल्प) कन्वर्टर, लग्न अनुसार व्यक्तिगत रत्न-रुद्राक्ष परामर्श एवं अष्टदिशा वास्तु कंपास।
          </p>
        </div>

        {/* 4 Suite Switcher Horizontal Navigation Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-2 no-scrollbar scroll-smooth">
          {TAB_OPTIONS.map((opt) => {
            const isActive = activeTab === opt.id;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectTab(opt.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white shadow-md shadow-amber-900/20 ring-1 ring-amber-500 scale-[1.02]'
                    : 'bg-white/90 dark:bg-stone-800/90 text-stone-700 dark:text-stone-300 border border-amber-200/70 dark:border-stone-700 hover:bg-amber-100/70 hover:border-amber-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-amber-600'}`} />
                <span>{opt.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? 'bg-amber-900/60 text-amber-200'
                      : 'bg-amber-100 dark:bg-stone-700 text-amber-800 dark:text-amber-300'
                  }`}
                >
                  {opt.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
