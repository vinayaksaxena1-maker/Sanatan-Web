/**
 * Sanatan Web (सनातन घड़ी)
 * Component: CalendarDayDrawer
 * Right-column Deep Inspector for Selected Day Vrat, Parana & Panchang Details
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseCalendarDataResult } from '../hooks/useCalendarData';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { Sparkles, Clock, Compass, BookOpen, ChevronRight } from 'lucide-react';

interface CalendarDayDrawerProps {
  selectedDayDetails: UseCalendarDataResult['selectedDayDetails'];
  onSelectDay: (dayNumber: number) => void;
  onOpenA4Modal: () => void;
}

export const CalendarDayDrawer: React.FC<CalendarDayDrawerProps> = ({
  selectedDayDetails,
  onOpenA4Modal,
}) => {
  const panchang = selectedDayDetails.panchang;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 1. Selected Day Vrat Showcase Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white p-5 shadow-lg border border-amber-600/30">
        {/* Soft Background Swastik */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 pointer-events-none select-none">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-amber-300">
            <path d="M50 0 L50 40 L10 40 L10 20 L30 20 L30 0 Z M60 50 L100 50 L100 90 L80 90 L80 70 L60 70 Z M50 60 L50 100 L10 100 L10 60 Z M40 50 L0 50 L0 10 L20 10 L20 30 L40 30 Z" />
          </svg>
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>दिवस विशेष विवरण</span>
            </span>
            <span className="text-xs font-mono text-amber-200/80">
              {selectedDayDetails.formattedDate}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold font-serif text-amber-100 leading-snug">
              {selectedDayDetails.vratName}
            </h3>
            <p className="text-xs text-amber-200/70 mt-1">
              {selectedDayDetails.vratCategory}
            </p>
          </div>

          {/* Deity Attribution */}
          <div className="pt-2 border-t border-amber-500/20 flex items-center gap-2 text-xs text-amber-200/90">
            <span className="font-semibold text-amber-300">आराध्य देव:</span>
            <span>{selectedDayDetails.deity}</span>
          </div>
        </div>
      </div>

      {/* 2. Parana & Hari Vasara Window Card (Crucial for Vrat Sadhakas) */}
      <div className="rounded-2xl bg-white/95 dark:bg-stone-900/95 p-4 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-amber-100 dark:border-amber-900/30 pb-2">
          <VedicIcon3D name="kalash" size={20} className="text-amber-600" />
          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-serif">
            पारण मुहूर्त एवं नियम
          </h4>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-start justify-between bg-amber-50/70 dark:bg-stone-800/60 p-2.5 rounded-xl border border-amber-200/40">
            <div>
              <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block">
                पारण समय खिड़की (शुभ काल)
              </span>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200 font-serif">
                {selectedDayDetails.paranaTimeWindow}
              </span>
            </div>
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          </div>

          <div className="flex items-start justify-between bg-stone-50 dark:bg-stone-800/40 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-700/50">
            <div>
              <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block">
                हरि वासर समाप्ति
              </span>
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                {selectedDayDetails.hariVasaraEnd}
              </span>
            </div>
            <Compass className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          </div>

          {/* Parana Mantra Quote */}
          <div className="p-2.5 rounded-xl bg-amber-100/40 dark:bg-amber-950/30 border border-amber-200/50 space-y-1">
            <span className="text-[10px] font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
              पारण महामंत्र (निर्णय सिंधु)
            </span>
            <p className="text-[11px] font-serif text-stone-800 dark:text-stone-200 italic leading-relaxed">
              "{selectedDayDetails.paranaMantra}"
            </p>
          </div>
        </div>
      </div>

      {/* 3. Astronomical Panchang Snapshot for Selected Day */}
      {panchang && (
        <div className="rounded-2xl bg-white/95 dark:bg-stone-900/95 p-4 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/30 pb-2">
            <div className="flex items-center gap-2">
              <VedicIcon3D name="sun" size={20} className="text-amber-600" />
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-serif">
                दिनमान खगोलीय पंचांग
              </h4>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              {panchang.sunTimes ? `${panchang.sunTimes.sunrise} उदय` : ''}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800/50">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">तिथि</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {panchang.tithi?.name || 'शुक्ल एकादशी'}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800/50">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">नक्षत्र</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {panchang.nakshatra?.name || 'उत्तराभाद्रपद'}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800/50">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">करण</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {panchang.karana?.name || 'बव'}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800/50">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">योग</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {panchang.yoga?.name || 'हर्षण'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Upcoming Vrats Quick List */}
      <div className="rounded-2xl bg-white/95 dark:bg-stone-900/95 p-4 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/30 pb-2">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 font-serif uppercase tracking-wider">
              माह के आगामी मुख्य व्रत
            </h4>
          </div>
        </div>

        <div className="space-y-1.5">
          {selectedDayDetails.upcomingVrats.map((v, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-amber-50/70 dark:hover:bg-stone-800/60 transition-colors text-xs"
            >
              <span className="font-medium text-stone-800 dark:text-stone-200">
                {v.name}
              </span>
              <span className="font-mono text-[11px] text-amber-700 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-stone-800 px-1.5 py-0.5 rounded border border-amber-200/40">
                {v.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. A4 Wall Calendar Download / Print Callout */}
      <button
        type="button"
        onClick={onOpenA4Modal}
        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold text-xs shadow-md shadow-amber-900/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
      >
        <VedicIcon3D name="kalash" size={16} />
        <span>A4 वॉल कैलेंडर (सम्पूर्ण वर्ष सारणी) देखें</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
