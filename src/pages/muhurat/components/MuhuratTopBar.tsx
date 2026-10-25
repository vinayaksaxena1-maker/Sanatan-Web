/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratTopBar
 * Top Heritage Hero, Breadcrumb, Header Banner & Sacred Astronomical Context Ribbon
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseMuhuratDataResult } from '../hooks/useMuhuratData';
import { toDevanagariNumerals } from '../hooks/useMuhuratData';

export interface MuhuratTopBarProps {
  data: UseMuhuratDataResult;
  onOpenCityModal: () => void;
}

export const MuhuratTopBar: React.FC<MuhuratTopBarProps> = ({
  data,
  onOpenCityModal,
}) => {
  const { currentCity, panchang } = data;
  const hindu = panchang.hinduDate;

  return (
    <div className="space-y-4">
      {/* 1. Top Header Banner with Frosted Glass & Gold Trim */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#fffdfa] via-[#fdf7ee] to-[#fbf2e3] border border-[#dec9ab]/70 shadow-[0_8px_30px_rgb(180,120,40,0.06)]">
        <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

        <div className="relative z-10 space-y-5">
          {/* Breadcrumb Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#735641]">
            <div className="flex items-center gap-1.5 font-medium">
              <a href="/" className="hover:text-[#c2410c] transition-colors flex items-center gap-1">
                <span>मुख्य पृष्ठ</span>
              </a>
              <span>/</span>
              <span className="text-[#c2410c] font-bold">शुभ मुहूर्त हब (Muhurat Hub)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
              <span>निर्णय सिन्धु एवं धर्मसिन्धु सम्मत प्रामाणिक काल विधान</span>
            </div>
          </div>

          {/* Main Title & Action Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#26150b] tracking-tight">
                शुभ मुहूर्त एवं संस्कार काल निर्णय
              </h1>
              <p className="text-sm sm:text-base text-[#735641] leading-relaxed">
                विवाह, गृह प्रवेश, व्यापार आरंभ, वाहन क्रय एवं षोडश संस्कारों हेतु शास्त्रसम्मत शुद्ध लग्न व नक्षत्र काल गणना
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={onOpenCityModal}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white border border-[#dec9ab] text-xs font-semibold text-[#26150b] shadow-xs hover:border-amber-500 transition-all cursor-pointer"
              >
                <VedicIcon3D name="temple" size={16} />
                <span>{currentCity.nameHindi || currentCity.name}</span>
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-md font-mono">
                  {toDevanagariNumerals(currentCity.latitude.toFixed(2))}° उ
                </span>
              </button>

              <a
                href="/calendar"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-bold shadow-md shadow-orange-950/20 transition-all"
              >
                <VedicIcon3D name="clock" size={16} />
                <span>संवत पंचांग कैलेंडर</span>
              </a>
            </div>
          </div>

          {/* 2. Sacred Astronomical Context Ribbon */}
          <div className="p-3.5 bg-white/80 backdrop-blur-md rounded-2xl border border-amber-900/10 shadow-xs flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-[#26150b]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-amber-950">स्थान:</span>
              <span className="text-[#735641]">
                {currentCity.nameHindi || currentCity.name} ({toDevanagariNumerals(currentCity.latitude.toFixed(2))}° उ, {toDevanagariNumerals(currentCity.longitude.toFixed(2))}° पू)
              </span>
            </div>

            <div className="h-3.5 w-px bg-amber-900/15 hidden md:block"></div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-950">संवत:</span>
              <span className="text-[#735641] font-mono">
                विक्रम संवत {toDevanagariNumerals(hindu.samvatVikram)} ({hindu.samvatShaka ? `शक ${toDevanagariNumerals(hindu.samvatShaka)}` : 'पिंगल'})
              </span>
            </div>

            <div className="h-3.5 w-px bg-amber-900/15 hidden md:block"></div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-950">मास/पक्ष:</span>
              <span className="text-[#735641]">
                {hindu.monthHindi || hindu.month} ({hindu.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'})
              </span>
            </div>

            <div className="h-3.5 w-px bg-amber-900/15 hidden md:block"></div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-950">ऋतु:</span>
              <span className="text-[#735641]">{hindu.ritu || 'शरद ऋतु'}</span>
            </div>

            <div className="h-3.5 w-px bg-amber-900/15 hidden lg:block"></div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-950">अयनांश:</span>
              <span className="text-[#735641] font-mono">लाहिड़ी (चित्रापक्ष)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MuhuratTopBar;
