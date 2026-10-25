/**
 * Sanatan Web (सनातन घड़ी)
 * Component: CalendarFilterChips
 * Horizontal scrollable filter pills for quick Vrat & Festival isolation
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { CalendarFilterType } from '../hooks/useCalendarData';

interface CalendarFilterChipsProps {
  selectedFilter: CalendarFilterType;
  onSelectFilter: (filter: CalendarFilterType) => void;
}

interface FilterOption {
  id: CalendarFilterType;
  label: string;
  badge?: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'सभी दिवस' },
  { id: 'ekadashi', label: 'एकादशी व्रत', badge: '२' },
  { id: 'pradosh', label: 'प्रदोष व्रत', badge: '२' },
  { id: 'purnima', label: 'पूर्णिमा', badge: '१' },
  { id: 'amavasya', label: 'अमावस्या', badge: '१' },
  { id: 'chaturthi', label: 'संकष्टी चतुर्थी', badge: '१' },
  { id: 'festival', label: 'प्रमुख सनातन पर्व' },
];

export const CalendarFilterChips: React.FC<CalendarFilterChipsProps> = ({
  selectedFilter,
  onSelectFilter,
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-3 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth">
      <div className="flex items-center gap-2 flex-nowrap">
        {FILTER_OPTIONS.map((opt) => {
          const isActive = selectedFilter === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectFilter(opt.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs shadow-amber-900/20 ring-1 ring-amber-500'
                  : 'bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-amber-200/70 dark:border-amber-900/40 hover:bg-amber-100/60 dark:hover:bg-stone-700/60 hover:border-amber-300'
              }`}
            >
              <span>{opt.label}</span>
              {opt.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-amber-800/60 text-amber-100'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                  }`}
                >
                  {opt.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="hidden lg:flex items-center gap-3 text-[11px] font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap pl-4">
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>एकादशी</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
          <span>पूर्णिमा / पर्व</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-stone-700 dark:bg-stone-400 inline-block"></span>
          <span>अमावस्या</span>
        </span>
      </div>
    </div>
  );
};
