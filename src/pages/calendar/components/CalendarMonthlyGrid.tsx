/**
 * Sanatan Web (सनातन घड़ी)
 * Component: CalendarMonthlyGrid
 * 7-column Vedic Calendar Grid with Tithi, Nakshatra, and Festival Badges
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { CalendarDayCell, CalendarFilterType } from '../hooks/useCalendarData';

interface CalendarMonthlyGridProps {
  gridCells: CalendarDayCell[];
  selectedDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
  selectedFilter: CalendarFilterType;
}

const WEEKDAY_HEADERS = [
  { label: 'रवि', full: 'रविवार', isSunday: true },
  { label: 'सोम', full: 'सोमवार' },
  { label: 'मंगल', full: 'मंगलवार' },
  { label: 'बुध', full: 'बुधवार' },
  { label: 'गुरु', full: 'गुरुवार' },
  { label: 'शुक्र', full: 'शुक्रवार' },
  { label: 'शनि', full: 'शनिवार' },
];

export const CalendarMonthlyGrid: React.FC<CalendarMonthlyGridProps> = ({
  gridCells,
  selectedDayNumber,
  onSelectDay,
  selectedFilter,
}) => {
  return (
    <div className="w-full bg-white/90 dark:bg-stone-900/90 rounded-2xl border border-amber-200/70 dark:border-amber-900/40 shadow-sm overflow-hidden flex flex-col">
      {/* 7 Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-amber-200/60 dark:border-amber-900/40 bg-amber-50/70 dark:bg-stone-800/80 text-center py-2.5 px-1 sm:px-2">
        {WEEKDAY_HEADERS.map((w, idx) => (
          <div
            key={idx}
            className={`text-xs sm:text-sm font-bold font-serif ${
              w.isSunday
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            <span className="hidden sm:inline">{w.full}</span>
            <span className="sm:hidden">{w.label}</span>
          </div>
        ))}
      </div>

      {/* Grid of 35 or 42 Days */}
      <div className="grid grid-cols-7 gap-px bg-amber-200/40 dark:bg-amber-950/40 p-px">
        {gridCells.map((cell) => {
          if (!cell.isCurrentMonth) {
            return (
              <div
                key={cell.id}
                className="min-h-[78px] sm:min-h-[105px] p-1 sm:p-2 bg-stone-50/70 dark:bg-stone-900/40 opacity-40 select-none flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-stone-400 font-serif">
                    {cell.dayNumber}
                  </span>
                  <span className="text-[10px] text-stone-400 font-devanagari">
                    {cell.dayNumberDevanagari}
                  </span>
                </div>
                {cell.festivalBadge && (
                  <span className="text-[9px] text-stone-400 line-clamp-1 truncate">
                    {cell.festivalBadge}
                  </span>
                )}
              </div>
            );
          }

          const isSelected = cell.dayNumber === selectedDayNumber;
          const isEkadashi = cell.badgeType === 'ekadashi';
          const isPradosh = cell.badgeType === 'pradosh';
          const isPurnima = cell.badgeType === 'purnima';
          const isAmavasya = cell.badgeType === 'amavasya';

          // Filter match check
          const matchesFilter =
            selectedFilter === 'all' ||
            (selectedFilter === 'ekadashi' && isEkadashi) ||
            (selectedFilter === 'pradosh' && isPradosh) ||
            (selectedFilter === 'purnima' && isPurnima) ||
            (selectedFilter === 'amavasya' && isAmavasya) ||
            (selectedFilter === 'festival' && cell.festivalBadge !== null);

          return (
            <button
              key={cell.id}
              type="button"
              onClick={() => onSelectDay(cell.dayNumber)}
              className={`min-h-[82px] sm:min-h-[112px] p-1.5 sm:p-2 text-left relative flex flex-col justify-between transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-amber-100/90 dark:bg-amber-950/60 ring-2 ring-inset ring-amber-500 z-10'
                  : 'bg-white dark:bg-stone-900 hover:bg-amber-50/60 dark:hover:bg-stone-800/80'
              } ${
                !matchesFilter ? 'opacity-30' : 'opacity-100'
              }`}
            >
              {/* Day Header: Gregorian Number & Devanagari */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1">
                  <span
                    className={`text-sm sm:text-base font-bold font-serif ${
                      cell.dayOfWeek === 0
                        ? 'text-rose-600 dark:text-rose-400'
                        : isSelected
                        ? 'text-amber-900 dark:text-amber-200'
                        : 'text-stone-800 dark:text-stone-100'
                    }`}
                  >
                    {cell.dayNumber}
                  </span>
                  <span className="text-[11px] font-devanagari text-amber-700/80 dark:text-amber-400/80 font-medium">
                    ({cell.dayNumberDevanagari})
                  </span>
                </div>

                {cell.isToday && (
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-amber-600 text-white font-bold tracking-wider">
                    आज
                  </span>
                )}
              </div>

              {/* Tithi & Nakshatra */}
              <div className="my-0.5">
                <span
                  className={`text-[10px] sm:text-[11px] block font-medium line-clamp-1 ${
                    isEkadashi
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                      : isPurnima
                      ? 'text-amber-600 dark:text-amber-400 font-semibold'
                      : isAmavasya
                      ? 'text-stone-700 dark:text-stone-300 font-semibold'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {cell.tithiName}
                </span>
                {cell.nakshatraName && (
                  <span className="hidden sm:block text-[9px] text-stone-400 dark:text-stone-500">
                    {cell.nakshatraName}
                  </span>
                )}
              </div>

              {/* Festival Badge */}
              {cell.festivalBadge ? (
                <div className="mt-auto">
                  <span
                    className={`inline-block w-full text-[9px] sm:text-[10px] px-1 py-0.5 rounded font-medium truncate ${
                      isEkadashi
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/50'
                        : isPurnima
                        ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-300/60'
                        : isPradosh
                        ? 'bg-orange-100 dark:bg-orange-950/70 text-orange-900 dark:text-orange-200 border border-orange-300/50'
                        : isAmavasya
                        ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300'
                        : 'bg-amber-50 dark:bg-stone-800 text-amber-900 dark:text-amber-300 border border-amber-200/50'
                    }`}
                  >
                    {cell.festivalBadge}
                  </span>
                </div>
              ) : (
                <div className="h-4" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
