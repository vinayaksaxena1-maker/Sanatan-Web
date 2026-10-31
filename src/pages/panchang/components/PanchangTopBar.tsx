/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangTopBar
 * Atmospheric Header, Location & Ayanamsha Chips, Date Selector & Samvat Strip
 * Strict < 300 lines modular standard
 */

import React, { useRef } from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { Panchang5Angas3DIcon } from './Panchang5Angas3DIcon';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

export interface PanchangTopBarProps {
  data: UsePanchangDataResult;
  onOpenCityModal?: () => void;
  onOpenSocialModal?: () => void;
}

export const PanchangTopBar: React.FC<PanchangTopBarProps> = ({
  data,
  onOpenCityModal: _onOpenCityModal,
  onOpenSocialModal,
}) => {
  const { selectedDate, setSelectedDate, formattedDate, isToday, goToToday } = data;
  const inputRef = useRef<HTMLInputElement>(null);

  // Format date as YYYY-MM-DD for native date input
  const yyyy = selectedDate.getFullYear();
  const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const dd = String(selectedDate.getDate()).padStart(2, '0');
  const dateInputValue = `${yyyy}-${mm}-${dd}`;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [year, month, day] = e.target.value.split('-').map(Number);
    // Construct local date at noon to avoid any timezone midnight shift
    const nextDate = new Date(year, month - 1, day, 12, 0, 0);
    setSelectedDate(nextDate);
  };

  const handleOpenCalendar = () => {
    if (inputRef.current?.showPicker) {
      try {
        inputRef.current.showPicker();
      } catch {
        // Fallback for browsers that require user gesture on the input itself
        inputRef.current.focus();
      }
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs font-serif space-y-4">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Heading with 3D Medallion and Subtitle */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#26150b] flex items-center gap-2.5">
            <Panchang5Angas3DIcon className="w-7 h-7 sm:w-8 sm:h-8" />
            <span>दैनिक पंचांग एवं विस्तृत काल निर्णय</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#735641] mt-1">
            तिथि, नक्षत्र और शुभ मुहूर्तों का सम्पूर्ण विवरण — आपके अपने नगर अनुसार
          </p>
        </div>

        {/* Right: Compact Interactive Calendar Date Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            onClick={handleOpenCalendar}
            className="relative group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-[#fffbf0] border border-[#dec9ab] hover:border-amber-400 shadow-xs transition-all duration-150 cursor-pointer"
            title="कैलेंडर से दिनांक चुनें"
          >
            <span className="text-base select-none">📅</span>
            <span className="text-xs font-bold text-[#26150b] select-none whitespace-nowrap">
              {formattedDate}
            </span>
            <span className="text-[10px] text-[#b45309] font-bold group-hover:translate-y-0.5 transition-transform select-none">
              ▼
            </span>

            {/* Invisible native date input layered on top */}
            <input
              ref={inputRef}
              type="date"
              value={dateInputValue}
              onChange={handleDateChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="कैलेंडर से दिनांक चुनें"
            />
          </div>

          {/* Quick 'आज' (Today) Jump Button if different date is selected */}
          {!isToday && (
            <button
              onClick={goToToday}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold shadow-xs transition-all cursor-pointer shrink-0"
              title="वापस आज के पंचांग पर जाएं"
            >
              आज
            </button>
          )}

          {/* Compact Share / PDF Button */}
          {onOpenSocialModal && (
            <button
              onClick={onOpenSocialModal}
              className="px-2.5 py-1.5 rounded-xl bg-white/95 hover:bg-[#fffbf0] border border-[#dec9ab] hover:border-amber-400 text-[#b45309] hover:text-[#c2410c] text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1 shrink-0"
              title="WhatsApp पर साझा करें एवं PDF डाउनलोड करें"
              type="button"
            >
              <span>📤</span>
              <span className="hidden sm:inline">शेयर</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PanchangTopBar;
