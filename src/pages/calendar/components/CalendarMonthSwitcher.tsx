/**
 * Sanatan Web (सनातन घड़ी)
 * Component: CalendarMonthSwitcher
 * Interactive Month Switcher, Samvat Metadata Strip & 4 Metric Highlight Cards
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseCalendarDataResult } from '../hooks/useCalendarData';
import { toDevanagariNumerals } from '../hooks/useCalendarData';

export interface CalendarMonthSwitcherProps {
  data: UseCalendarDataResult;
}

export const CalendarMonthSwitcher: React.FC<CalendarMonthSwitcherProps> = ({ data }) => {
  const {
    currentYear,
    monthNameHindi,
    vedicMasaName,
    goToPreviousMonth,
    goToNextMonth,
  } = data;

  return (
    <section className="bg-gradient-to-br from-[#fff7ed] via-[#fef3c7]/20 to-[#fffbeb] rounded-3xl p-5 sm:p-6 border border-amber-900/10 shadow-[0_4px_20px_rgb(180,120,40,0.04)] space-y-4">
      {/* 1. Month Switcher & Astronomical Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-amber-900/10">
        {/* Month Pagination Buttons */}
        <div className="flex items-center gap-2 bg-white/90 p-1.5 rounded-2xl border border-amber-900/10 shadow-xs w-fit">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-amber-100 text-[#26150b] transition-colors cursor-pointer"
            title="पूर्ववर्ती मास"
          >
            <span className="text-lg font-bold">‹</span>
          </button>

          <div className="flex items-center gap-2 px-3">
            <VedicIcon3D name="clock" size={18} />
            <span className="text-base font-bold font-serif text-[#c2410c]">
              {vedicMasaName}
            </span>
            <span className="text-xs text-[#735641] font-medium hidden sm:inline">
              ({monthNameHindi} {toDevanagariNumerals(currentYear)})
            </span>
          </div>

          <button
            type="button"
            onClick={goToNextMonth}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-amber-100 text-[#26150b] transition-colors cursor-pointer"
            title="आगामी मास"
          >
            <span className="text-lg font-bold">›</span>
          </button>
        </div>

        {/* Astronomical / Vedic Metadata Strip */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-amber-900/10 text-[#26150b]">
            <span className="text-[#8c7166] font-medium">संवत:</span>
            <span className="font-bold text-[#c2410c] font-mono">विक्रमी २०८१</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-amber-900/10 text-[#26150b]">
            <span className="text-[#8c7166] font-medium">पक्ष:</span>
            <span className="font-semibold">शुक्ल ➔ कृष्ण</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-amber-900/10 text-[#26150b]">
            <span className="text-[#8c7166] font-medium">ऋतु:</span>
            <span className="font-semibold text-amber-900">शरद / हेमंत</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-amber-900/10 text-[#26150b]">
            <span className="text-[#8c7166] font-medium">सूर्य अयन:</span>
            <span className="font-semibold">दक्षिणायन</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-amber-900/10 text-[#26150b]">
            <span className="text-[#8c7166] font-medium">सौर मास:</span>
            <span className="font-semibold text-emerald-800">तुला ➔ वृश्चिक</span>
          </div>
        </div>
      </div>

      {/* 2. 4 Metric Highlight Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white/90 border border-[#dec9ab]/70 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-900 shrink-0">
            <VedicIcon3D name="shubh" size={20} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#8c7166] font-medium truncate">इस मास के कुल व्रत</span>
            <span className="text-sm sm:text-base font-bold text-[#26150b] font-serif">१४ मुख्य पर्व</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/90 border border-[#dec9ab]/70 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-900 shrink-0">
            <VedicIcon3D name="sun" size={20} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#8c7166] font-medium truncate">आगामी निकटतम व्रत</span>
            <span className="text-xs sm:text-sm font-bold text-[#c2410c] font-serif truncate">देवउठनी एकादशी (१२ नवं)</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/90 border border-[#dec9ab]/70 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-900 shrink-0">
            <VedicIcon3D name="moon" size={20} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#8c7166] font-medium truncate">कार्तिक पूर्णिमा (देव दिवाली)</span>
            <span className="text-xs sm:text-sm font-bold text-[#26150b] font-serif truncate">१५ नवंबर २०२६</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/90 border border-[#dec9ab]/70 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 shrink-0">
            <VedicIcon3D name="clock" size={20} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#8c7166] font-medium truncate">कार्तिक अमावस्या (दीपावली)</span>
            <span className="text-xs sm:text-sm font-bold text-[#26150b] font-serif truncate">०१ नवंबर २०२६</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarMonthSwitcher;
