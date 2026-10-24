/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangTopBar
 * Atmospheric Header, Location & Ayanamsha Chips, Date Selector & Samvat Strip
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { toDevanagariNumerals, type UsePanchangDataResult } from '../hooks/usePanchangData';

export interface PanchangTopBarProps {
  data: UsePanchangDataResult;
  onOpenCityModal: () => void;
  onOpenSocialModal: () => void;
}

export const PanchangTopBar: React.FC<PanchangTopBarProps> = ({
  data,
  onOpenCityModal,
  onOpenSocialModal,
}) => {
  const { currentCity, panchang, formattedDate, isToday, goToPreviousDay, goToNextDay, goToToday } = data;
  const hd = panchang.hinduDate;

  return (
    <div className="space-y-4">
      {/* 1. Header Banner & Location Strip with Frosted Glass */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#fffdfa] via-[#fdf7ee] to-[#fbf2e3] border border-[#dec9ab]/70 shadow-[0_8px_30px_rgb(180,120,40,0.06)]">
        <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

        <div className="relative z-10 space-y-5">
          {/* Top Row: Breadcrumb & Social Share Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#735641]">
            <div className="flex items-center gap-1.5">
              <a href="/" className="hover:text-[#c2410c] transition-colors flex items-center gap-1 font-semibold">
                <span>मुख्य पृष्ठ</span>
              </a>
              <span>/</span>
              <span className="text-[#c2410c] font-bold">दैनिक पंचांग हब</span>
            </div>

            <button
              onClick={onOpenSocialModal}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold shadow-xs hover:from-amber-600 hover:to-amber-700 transition-all cursor-pointer"
            >
              <span>📱</span>
              <span>आज का पंचांग सोशल कार्ड</span>
            </button>
          </div>

          {/* Main Title & Actionable Chips */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/60 text-[#c2410c] text-xs font-bold w-fit">
                <VedicIcon3D name="temple" size="sm" />
                <span>वैदिक काल-विधान एवं सूक्ष्म खगोलीय सारणी</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#26150b] tracking-tight">
                वैदिक दैनिक पंचांग एवं विस्तृत काल निर्णय
              </h1>
              <p className="text-xs sm:text-sm text-[#735641] leading-relaxed">
                सूर्य-सिद्धांत एवं नासा JPL द्रिक गणित पर आधारित शुद्ध सूक्ष्म पंचांग — किसी भी तिथि, संवत एवं नगर हेतु अचूक गणना
              </p>
            </div>

            {/* Location & Ayanamsha Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* City Selector */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 border border-[#dec9ab] shadow-xs">
                <span className="text-lg">📍</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#26150b]">
                    {currentCity.nameHindi || currentCity.name}
                  </span>
                  <span className="text-[10px] text-[#735641] tabular-nums font-mono">
                    {currentCity.latitude.toFixed(2)}° N, {currentCity.longitude.toFixed(2)}° E
                  </span>
                </div>
                <button
                  onClick={onOpenCityModal}
                  className="ml-1 px-2.5 py-1 rounded-lg bg-[#fef3c7] hover:bg-[#fde68a] text-[#b45309] text-[11px] font-bold transition-colors cursor-pointer"
                >
                  स्थान बदलें
                </button>
              </div>

              {/* Lahiri Ayanamsha */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 border border-[#dec9ab] shadow-xs">
                <span className="text-lg">🧭</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#735641]">लाहिड़ी अयनांश</span>
                  <span className="text-xs font-bold text-[#b45309] tabular-nums font-mono">
                    २४° ११' ३२"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Date Controller */}
      <section className="rounded-2xl p-4 bg-white/80 backdrop-blur-xl border border-[#dec9ab]/70 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousDay}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#fffaf0] hover:bg-[#fbeecc] border border-[#dec9ab] text-[#26150b] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <span>‹</span> पिछला दिन
          </button>
          <button
            onClick={goToToday}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              isToday
                ? 'bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white shadow-xs'
                : 'bg-[#fffaf0] hover:bg-[#fbeecc] border border-[#dec9ab] text-[#26150b]'
            }`}
          >
            आज (Today)
          </button>
          <button
            onClick={goToNextDay}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#fffaf0] hover:bg-[#fbeecc] border border-[#dec9ab] text-[#26150b] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            अगला दिन <span>›</span>
          </button>
        </div>

        {/* Selected Date Readout */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#fff9eb] to-[#fbeecc] border border-[#dec9ab]">
          <span className="text-sm">📅</span>
          <span className="text-xs sm:text-sm font-bold text-[#26150b] tracking-wide">
            {formattedDate}
          </span>
        </div>
      </section>

      {/* 3. 10-Item Samvat & Cosmic Metadata Strip */}
      <section className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center shadow-2xs">
          <span className="text-[10px] text-[#735641] block">विक्रम संवत</span>
          <span className="text-xs font-bold text-[#c2410c]">{toDevanagariNumerals(hd.samvatVikram)}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center shadow-2xs">
          <span className="text-[10px] text-[#735641] block">शक संवत</span>
          <span className="text-xs font-bold text-[#26150b]">{toDevanagariNumerals(hd.samvatShaka)}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center shadow-2xs">
          <span className="text-[10px] text-[#735641] block">कलि संवत</span>
          <span className="text-xs font-bold text-[#26150b]">५१२६</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center shadow-2xs">
          <span className="text-[10px] text-[#735641] block">मास (पूर्णिमान्त)</span>
          <span className="text-xs font-bold text-[#b45309]">{hd.monthPurnimantaHindi || hd.monthHindi}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center shadow-2xs">
          <span className="text-[10px] text-[#735641] block">मास (अमान्त)</span>
          <span className="text-xs font-bold text-[#26150b]">{hd.monthAmantaHindi || hd.monthHindi}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center shadow-2xs">
          <span className="text-[10px] text-[#735641] block">पक्ष</span>
          <span className="text-xs font-bold text-[#c2410c]">{hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center shadow-2xs">
          <span className="text-[10px] text-[#735641] block">ऋतु</span>
          <span className="text-xs font-bold text-[#26150b]">{hd.ritu || 'शरद ऋतु'}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center shadow-2xs">
          <span className="text-[10px] text-[#735641] block">अयन</span>
          <span className="text-xs font-bold text-[#26150b]">{hd.ayana || 'दक्षिणायन'}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center shadow-2xs">
          <span className="text-[10px] text-[#735641] block">सूर्य नक्षत्र</span>
          <span className="text-xs font-bold text-[#b45309]">{panchang.suryaNakshatra?.nameHindi || 'चित्रा'}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center shadow-2xs">
          <span className="text-[10px] text-[#735641] block">सूर्योदय</span>
          <span className="text-xs font-bold text-[#c2410c] font-mono">{panchang.sunrise}</span>
        </div>
      </section>
    </div>
  );
};

export default PanchangTopBar;
