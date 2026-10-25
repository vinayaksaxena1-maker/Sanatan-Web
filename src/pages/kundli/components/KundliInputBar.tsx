/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Component: KundliInputBar
 * Responsive Birth Data Inputs (Name, Date, 3-Dropdown Time, City, Gender)
 */

import React from 'react';
import { User, Calendar, Clock, MapPin, RefreshCw, Sparkles } from 'lucide-react';
import { KundliPersonInput } from '../hooks/kundliTypes';

interface KundliInputBarProps {
  input: KundliPersonInput;
  onChange: (field: keyof KundliPersonInput, value: any) => void;
  onOpenCityModal: () => void;
}

export const KundliInputBar: React.FC<KundliInputBarProps> = ({
  input,
  onChange,
  onOpenCityModal
}) => {
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const seconds = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <section className="w-full bg-white dark:bg-stone-900 rounded-2xl p-5 md:p-6 border border-amber-200/80 dark:border-amber-900/50 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800" />

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 flex-grow">
          {/* 1. Jatak Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>जातक का नाम</span>
            </label>
            <input
              type="text"
              value={input.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="नाम दर्ज करें..."
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium text-xs sm:text-sm rounded-xl border border-stone-300/80 dark:border-stone-700 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-inner"
            />
          </div>

          {/* 2. Date of Birth */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>जन्म दिनांक</span>
            </label>
            <input
              type="date"
              value={input.birthDate}
              onChange={(e) => onChange('birthDate', e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium text-xs sm:text-sm rounded-xl border border-stone-300/80 dark:border-stone-700 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-inner"
            />
          </div>

          {/* 3. 3-Dropdown Time (Foolproof) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>जन्म समय (HH:MM:SS)</span>
            </label>
            <div className="grid grid-cols-4 gap-1">
              {/* Hour */}
              <select
                value={input.birthHour}
                onChange={(e) => onChange('birthHour', e.target.value)}
                className="px-1.5 py-2 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-mono font-semibold rounded-lg border border-stone-300/80 dark:border-stone-700 focus:outline-none focus:border-amber-600"
              >
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>

              {/* Minute */}
              <select
                value={input.birthMinute}
                onChange={(e) => onChange('birthMinute', e.target.value)}
                className="px-1.5 py-2 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-mono font-semibold rounded-lg border border-stone-300/80 dark:border-stone-700 focus:outline-none focus:border-amber-600"
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              {/* Second */}
              <select
                value={input.birthSecond}
                onChange={(e) => onChange('birthSecond', e.target.value)}
                className="px-1.5 py-2 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-mono font-semibold rounded-lg border border-stone-300/80 dark:border-stone-700 focus:outline-none focus:border-amber-600"
              >
                {seconds.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* AM / PM */}
              <select
                value={input.birthAmPm}
                onChange={(e) => onChange('birthAmPm', e.target.value as 'AM' | 'PM')}
                className="px-1.5 py-2 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-xs font-bold rounded-lg border border-amber-300/80 dark:border-amber-800/60 focus:outline-none focus:border-amber-600"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* 4. Place of Birth (City Trigger) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>जन्म स्थान व निर्देशांक</span>
            </label>
            <button
              type="button"
              onClick={onOpenCityModal}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-750 text-left text-stone-900 dark:text-stone-100 font-medium text-xs rounded-xl border border-stone-300/80 dark:border-stone-700 flex items-center justify-between cursor-pointer transition-colors shadow-inner"
            >
              <span className="truncate">{input.cityName}</span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono font-semibold shrink-0 ml-1">
                {input.latitude.toFixed(1)}°N, {input.longitude.toFixed(1)}°E
              </span>
            </button>
          </div>

          {/* 5. Gender & Ayana */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>लिंग व अयन</span>
            </label>
            <div className="flex items-center gap-2 h-[38px] px-2 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-300/80 dark:border-stone-700">
              <button
                type="button"
                onClick={() => onChange('gender', 'male')}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  input.gender === 'male'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                पुरुष
              </button>
              <button
                type="button"
                onClick={() => onChange('gender', 'female')}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  input.gender === 'female'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                स्त्री
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 self-end lg:self-center">
          <button
            type="button"
            className="h-10 px-5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>कुण्डली गणना सक्रिय</span>
          </button>
        </div>
      </div>
    </section>
  );
};
