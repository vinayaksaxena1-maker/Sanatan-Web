import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useRouter } from '../../routes/AppRoutes';
import type { PanchangInfo, ChoghadiyaInterval } from '../../engine/types';

interface HomeFourCardsRowProps {
  panchang: PanchangInfo;
  abhijitMuhurat: { startTime: string; endTime: string };
  clockTime: Date;
  className?: string;
}

export const HomeFourCardsRow: React.FC<HomeFourCardsRowProps> = ({
  panchang,
  abhijitMuhurat,
  clockTime: _clockTime,
  className = '',
}) => {
  const { navigate } = useRouter();

  // Card 1: Calendar State
  const [selectedDay, setSelectedDay] = useState(20);

  // Card 3: Choghadiya Day/Night Toggle
  const [isDayChoghadiya, setIsDayChoghadiya] = useState(true);

  // Filter day vs night Choghadiya
  const choghadiyaList = useMemo(() => {
    if (!panchang.choghadiya || panchang.choghadiya.length === 0) return [];
    if (isDayChoghadiya) {
      return panchang.choghadiya.filter((c: ChoghadiyaInterval) => c.isDay).slice(0, 6);
    } else {
      return panchang.choghadiya.filter((c: ChoghadiyaInterval) => !c.isDay).slice(0, 6);
    }
  }, [panchang.choghadiya, isDayChoghadiya]);

  // Status helper for Choghadiya
  const getChoghadiyaBadge = (type?: string, hindiName?: string) => {
    const name = hindiName || type || 'शुभ';
    switch (type) {
      case 'Amrit':
      case 'Shubh':
      case 'Labh':
        return {
          label: name,
          dotColor: 'bg-emerald-600',
          badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
        };
      case 'Rog':
      case 'Kaal':
        return {
          label: name,
          dotColor: 'bg-rose-600',
          badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
        };
      case 'Udveg':
      case 'Char':
      case 'Chal':
      default:
        return {
          label: name,
          dotColor: 'bg-amber-500',
          badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
        };
    }
  };

  return (
    <section className={`w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 my-6 sm:my-8 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* ========================================================
            CARD 1: HINDU CALENDAR (हिंदू कैलेंडर)
           ======================================================== */}
        <div className="bg-white dark:bg-[#121826] rounded-2xl sm:rounded-[24px] p-4 sm:p-5 border border-[#EADBCA] dark:border-white/10 shadow-[0_4px_22px_rgba(139,38,18,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8] dark:border-white/5">
            <span className="text-sm sm:text-[15px] font-extrabold text-[#1E1B18] dark:text-white font-serif flex items-center space-x-1">
              <span className="text-amber-600 font-black">+</span>
              <span>हिंदू कैलेंडर</span>
            </span>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-[#5C5046] transition-colors cursor-pointer"
                title="पिछला माह"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs sm:text-[13px] font-bold text-[#1E1B18] dark:text-gray-200 font-serif">
                अक्टूबर 2026
              </span>
              <button
                type="button"
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-[#5C5046] transition-colors cursor-pointer"
                title="अगला माह"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Row */}
          <div className="grid grid-cols-7 text-center py-2 text-[10.5px] font-bold text-[#6E6259] dark:text-gray-400">
            <span>रवि</span>
            <span>सोम</span>
            <span>मंगल</span>
            <span>बुध</span>
            <span>गुरु</span>
            <span>शुक</span>
            <span>शनि</span>
          </div>

          {/* Date Grid */}
          <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-medium">
            {/* Previous Month Overflow */}
            {['27', '28', '29', '30'].map((d) => (
              <div key={`prev-${d}`} className="h-7 sm:h-8 flex items-center justify-center text-gray-300 dark:text-gray-600 text-[11px]">
                {d}
              </div>
            ))}

            {/* Current Month October Dates */}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const isSelected = selectedDay === day;
              const hasFestivalDot = [13, 17, 20, 23, 28, 31].includes(day);

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className="h-7 sm:h-8 flex items-center justify-center cursor-pointer relative"
                >
                  <div
                    className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center text-xs transition-all ${
                      isSelected
                        ? 'bg-[#0F392B] text-white font-extrabold shadow-sm scale-105'
                        : 'text-[#1E1B18] dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-white/5 font-semibold'
                    }`}
                  >
                    {day}
                  </div>
                  {hasFestivalDot && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-0.5 right-1" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-right">
            <button
              type="button"
              onClick={() => navigate('/calendar')}
              className="text-[11px] font-bold text-[#8B2612] dark:text-amber-400 hover:underline cursor-pointer"
            >
              पूर्ण पंचांग कैलेंडर ➔
            </button>
          </div>
        </div>

        {/* ========================================================
            CARD 2: AAJ KE SHUBH MUHURAT (आज के शुभ मुहूर्त)
           ======================================================== */}
        <div className="bg-white dark:bg-[#121826] rounded-2xl sm:rounded-[24px] p-4 sm:p-5 border border-[#EADBCA] dark:border-white/10 shadow-[0_4px_22px_rgba(139,38,18,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8] dark:border-white/5">
            <span className="text-sm sm:text-[15px] font-extrabold text-[#1E1B18] dark:text-white font-serif flex items-center space-x-1">
              <span className="text-amber-600 font-black">+</span>
              <span>आज के शुभ मुहूर्त</span>
            </span>

            <button
              type="button"
              onClick={() => navigate('/muhurat')}
              className="text-[11px] font-bold text-[#8B2612] dark:text-amber-400 hover:text-[#C45E1A] flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <span>सभी मुहूर्त देखें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Muhurat List */}
          <div className="space-y-3 py-2">
            
            {/* 1. Abhijit Muhurat */}
            <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#FAF6F0] dark:hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FEF9C3] dark:bg-amber-950/40 flex items-center justify-center text-amber-700 font-bold shrink-0">
                  卐
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1B18] dark:text-white font-serif">अभिजीत मुहूर्त</p>
                  <p className="text-[10px] font-mono text-[#6E6259] dark:text-gray-400">
                    {abhijitMuhurat.startTime} – {abhijitMuhurat.endTime}
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                शुभ
              </span>
            </div>

            {/* 2. Vivah Muhurat */}
            <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#FAF6F0] dark:hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFE4E6] dark:bg-rose-950/40 flex items-center justify-center text-rose-600 font-bold shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1B18] dark:text-white font-serif">विवाह मुहूर्त</p>
                  <p className="text-[10px] font-mono text-[#6E6259] dark:text-gray-400">शाम 06:12 PM – 07:34 PM</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                शुभ
              </span>
            </div>

            {/* 3. Griha Pravesh */}
            <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#FAF6F0] dark:hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FEF3C7] dark:bg-amber-950/40 flex items-center justify-center text-amber-700 font-bold shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1B18] dark:text-white font-serif">गृह प्रवेश मुहूर्त</p>
                  <p className="text-[10px] font-mono text-[#6E6259] dark:text-gray-400">दोपहर 01:18 PM – 02:56 PM</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                शुभ
              </span>
            </div>

            {/* 4. Sarvartha Siddhi / Nayi Shuruat */}
            <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#FAF6F0] dark:hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFEDD5] dark:bg-orange-950/40 flex items-center justify-center text-orange-600 font-bold shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E1B18] dark:text-white font-serif">सर्वार्थ सिद्धि योग</p>
                  <p className="text-[10px] font-mono text-[#6E6259] dark:text-gray-400">सुबह 09:15 AM – 10:32 AM</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                शुभ
              </span>
            </div>

          </div>

          <div className="pt-2 text-center text-[10.5px] text-[#6E6259] dark:text-gray-400 border-t border-[#F0E6D8] dark:border-white/5">
            सभी मुहूर्त स्थानीय सूर्योदय अनुसार शुद्ध हैं
          </div>
        </div>

        {/* ========================================================
            CARD 3: AAJ KA CHOGHADIYA (आज का चौघड़िया)
           ======================================================== */}
        <div className="bg-white dark:bg-[#121826] rounded-2xl sm:rounded-[24px] p-4 sm:p-5 border border-[#EADBCA] dark:border-white/10 shadow-[0_4px_22px_rgba(139,38,18,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8] dark:border-white/5">
            <span className="text-sm sm:text-[15px] font-extrabold text-[#1E1B18] dark:text-white font-serif">
              आज का चौघड़िया
            </span>

            {/* Day / Night Toggle Pill */}
            <div className="flex items-center bg-[#FAF6F0] dark:bg-[#1A2234] p-0.5 rounded-lg border border-[#EADBCA] dark:border-white/10">
              <button
                type="button"
                onClick={() => setIsDayChoghadiya(true)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                  isDayChoghadiya
                    ? 'bg-[#0F392B] text-white shadow-xs'
                    : 'text-[#6E6259] dark:text-gray-400'
                }`}
              >
                दिन
              </button>
              <button
                type="button"
                onClick={() => setIsDayChoghadiya(false)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                  !isDayChoghadiya
                    ? 'bg-[#0F392B] text-white shadow-xs'
                    : 'text-[#6E6259] dark:text-gray-400'
                }`}
              >
                रात
              </button>
            </div>
          </div>

          {/* Timeline List of Choghadiya Slots */}
          <div className="relative pl-3.5 my-2.5 space-y-2 border-l-2 border-[#EADBCA] dark:border-white/10">
            {(choghadiyaList.length > 0
              ? choghadiyaList
              : [
                  { startTime: '06:18', endTime: '07:50', type: 'Shubh', hindiName: 'शुभ' },
                  { startTime: '07:50', endTime: '09:22', type: 'Rog', hindiName: 'रोग' },
                  { startTime: '09:22', endTime: '10:54', type: 'Udveg', hindiName: 'उद्वेग' },
                  { startTime: '10:54', endTime: '12:26', type: 'Labh', hindiName: 'लाभ' },
                  { startTime: '12:26', endTime: '01:58', type: 'Amrit', hindiName: 'अमृत' },
                  { startTime: '01:58', endTime: '03:30', type: 'Kaal', hindiName: 'काल' },
                ]
            ).map((slot: any, idx: number) => {
              const status = getChoghadiyaBadge(slot.type, slot.hindiName);

              return (
                <div key={`slot-${idx}`} className="relative flex items-center justify-between text-xs py-0.5">
                  {/* Timeline Dot */}
                  <span
                    className={`w-2 h-2 rounded-full absolute -left-[18px] top-1.5 ring-2 ring-white dark:ring-[#121826] ${status.dotColor}`}
                  />
                  {/* Time Range */}
                  <span className="font-mono text-[11px] text-[#5C5046] dark:text-gray-300 font-medium">
                    {slot.startTime} – {slot.endTime}
                  </span>
                  {/* Status Badge */}
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${status.badgeClass}`}>
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-center text-[10.5px] text-[#6E6259] dark:text-gray-400 border-t border-[#F0E6D8] dark:border-white/5">
            {isDayChoghadiya ? '☀️ दिवाकालीन ८ चौघड़िया' : '🌙 रात्रिकालीन ८ चौघड़िया'}
          </div>
        </div>

        {/* ========================================================
            CARD 4: AAGAMI VRAT & TYOHAR (आगामी व्रत एवं त्यौहार)
           ======================================================== */}
        <div className="bg-white dark:bg-[#121826] rounded-2xl sm:rounded-[24px] p-4 sm:p-5 border border-[#EADBCA] dark:border-white/10 shadow-[0_4px_22px_rgba(139,38,18,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8] dark:border-white/5">
            <span className="text-sm sm:text-[15px] font-extrabold text-[#1E1B18] dark:text-white font-serif">
              आगामी व्रत एवं त्यौहार
            </span>

            <button
              type="button"
              onClick={() => navigate('/calendar')}
              className="text-[11px] font-bold text-[#8B2612] dark:text-amber-400 hover:text-[#C45E1A] flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <span>सभी देखें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Festival Items List */}
          <div className="space-y-2.5 py-1">
            
            {/* 1. Karwa Chauth */}
            <div
              onClick={() => navigate('/calendar')}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#FAF6F0] dark:hover:bg-white/[0.03] transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1A2234] border border-[#EADBCA] dark:border-white/10 flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span className="text-sm font-black text-red-600 dark:text-red-400 leading-none">23</span>
                  <span className="text-[8px] font-bold text-[#6E6259] dark:text-gray-400 leading-tight mt-0.5">अक्टूबर</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-lg shrink-0">
                  🪔
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1E1B18] dark:text-white font-serif group-hover:text-[#C45E1A] transition-colors truncate">
                    करवा चौथ
                  </p>
                  <p className="text-[9.5px] text-[#6E6259] dark:text-gray-400 truncate">पति की दीर्घायु के लिए व्रत</p>
                </div>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-[#8B2612] transition-colors shrink-0" />
            </div>

            {/* 2. Ahoi Ashtami */}
            <div
              onClick={() => navigate('/calendar')}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#FAF6F0] dark:hover:bg-white/[0.03] transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1A2234] border border-[#EADBCA] dark:border-white/10 flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span className="text-sm font-black text-red-600 dark:text-red-400 leading-none">28</span>
                  <span className="text-[8px] font-bold text-[#6E6259] dark:text-gray-400 leading-tight mt-0.5">अक्टूबर</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-lg shrink-0">
                  🌺
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1E1B18] dark:text-white font-serif group-hover:text-[#C45E1A] transition-colors truncate">
                    अहोई अष्टमी
                  </p>
                  <p className="text-[9.5px] text-[#6E6259] dark:text-gray-400 truncate">संतान सुख के लिए व्रत</p>
                </div>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-[#8B2612] transition-colors shrink-0" />
            </div>

            {/* 3. Dhanteras */}
            <div
              onClick={() => navigate('/calendar')}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#FAF6F0] dark:hover:bg-white/[0.03] transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1A2234] border border-[#EADBCA] dark:border-white/10 flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span className="text-sm font-black text-red-600 dark:text-red-400 leading-none">12</span>
                  <span className="text-[8px] font-bold text-[#6E6259] dark:text-gray-400 leading-tight mt-0.5">नवंबर</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center text-lg shrink-0">
                  🏺
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1E1B18] dark:text-white font-serif group-hover:text-[#C45E1A] transition-colors truncate">
                    धनतेरस
                  </p>
                  <p className="text-[9.5px] text-[#6E6259] dark:text-gray-400 truncate">धन और स्वास्थ्य का पर्व</p>
                </div>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-[#8B2612] transition-colors shrink-0" />
            </div>

            {/* 4. Deepawali */}
            <div
              onClick={() => navigate('/calendar')}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#FAF6F0] dark:hover:bg-white/[0.03] transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1A2234] border border-[#EADBCA] dark:border-white/10 flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span className="text-sm font-black text-red-600 dark:text-red-400 leading-none">13</span>
                  <span className="text-[8px] font-bold text-[#6E6259] dark:text-gray-400 leading-tight mt-0.5">नवंबर</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-lg shrink-0">
                  ✨
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1E1B18] dark:text-white font-serif group-hover:text-[#C45E1A] transition-colors truncate">
                    दीपावली
                  </p>
                  <p className="text-[9.5px] text-[#6E6259] dark:text-gray-400 truncate">अंधकार पर प्रकाश की विजय</p>
                </div>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-[#8B2612] transition-colors shrink-0" />
            </div>

          </div>

          <div className="pt-2 text-center text-[10.5px] text-[#6E6259] dark:text-gray-400 border-t border-[#F0E6D8] dark:border-white/5">
            सनातन धर्म के सभी पर्व एवं व्रत तिथि
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeFourCardsRow;
