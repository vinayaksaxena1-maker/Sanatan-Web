/**
 * Sanatan Web (सनातन घड़ी)
 * Component: VastuCompassSection
 * Interactive 8-Directional Vastu Energy Matrix & Daily Disha Shool Travel Remedies
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseUtilitiesDataResult } from '../hooks/useUtilitiesData';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { Compass, AlertTriangle, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

interface VastuCompassSectionProps {
  data: UseUtilitiesDataResult;
}

export const VastuCompassSection: React.FC<VastuCompassSectionProps> = ({ data }) => {
  const {
    selectedDirectionIndex,
    setSelectedDirectionIndex,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
    currentDishaShool,
    activeVastuDirection,
    vastuDirectionsList,
  } = data;

  const weekdays = [
    'रविवार (Sun)', 'सोमवार (Mon)', 'मंगलवार (Tue)', 'बुधवार (Wed)',
    'गुरुवार (Thu)', 'शुक्रवार (Fri)', 'शनिवार (Sat)'
  ];

  return (
    <div className="space-y-6">
      {/* 1. Daily Disha Shool Caution Banner */}
      <div className="bg-gradient-to-br from-[#fff7ed] via-[#fef3c7]/20 to-[#fffbeb] rounded-2xl p-5 sm:p-6 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-900/10 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-[#26150b] dark:text-stone-100">
                दैनिक यात्रा दिशाशूल एवं शमन उपाय
              </h2>
              <p className="text-xs text-[#735641]">
                दिन विशेष पर अमुक दिशा में यात्रा वर्जित मानी जाती है। अत्यावश्यक होने पर उपाय करके प्रस्थान करें।
              </p>
            </div>
          </div>

          {/* Weekday Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 whitespace-nowrap">
              वार चुनें:
            </label>
            <select
              value={selectedDayOfWeek}
              onChange={(e) => setSelectedDayOfWeek(Number(e.target.value))}
              className="py-1.5 px-3 rounded-xl border border-amber-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-bold text-amber-950 dark:text-amber-200 focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {weekdays.map((dayName, idx) => (
                <option key={idx} value={idx}>
                  {dayName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Disha Shool Verdict */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/90 dark:bg-stone-900/90 border border-amber-200/60 space-y-1">
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
              आज की वर्जित दिशा (दिशाशूल)
            </span>
            <div className="text-base font-bold font-serif text-rose-900 dark:text-rose-200">
              {currentDishaShool.inauspiciousDirection}
            </div>
            <p className="text-[11px] text-stone-500">
              {currentDishaShool.dayNameHindi} को इस दिशा में लंबी यात्रा यथासंभव टालें।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/90 dark:bg-stone-900/90 border border-emerald-200/60 space-y-1">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              शास्त्रीय यात्रा उपाय (निवारण)
            </span>
            <div className="text-sm font-bold font-serif text-emerald-900 dark:text-emerald-200">
              {currentDishaShool.remedyBeforeTravel}
            </div>
            <p className="text-[11px] text-stone-500">
              अत्यावश्यक यात्रा होने पर यह उपाय करके ही गृह से प्रस्थान करें।
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive 8 Vastu Directions Wheel & Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-amber-200/70 pb-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
              अष्टदिशा वास्तु ऊर्जा चक्र (8 Vastu Directions)
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            दिशा पर क्लिक करके वास्तु विवरण देखें
          </span>
        </div>

        {/* 8 Direction Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {vastuDirectionsList.map((dir, idx) => {
            const isSelected = selectedDirectionIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDirectionIndex(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-100/90 dark:bg-amber-950/70 border-2 border-amber-600 ring-2 ring-amber-400/30 shadow-md'
                    : 'bg-white/90 dark:bg-stone-900/90 border border-amber-200/60 dark:border-stone-800 hover:border-amber-400 hover:bg-amber-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-serif text-stone-900 dark:text-stone-100">
                      {dir.directionHindi}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">{dir.degrees}</span>
                  </div>
                  <div className="text-[11px] text-amber-800 dark:text-amber-400 font-medium mt-1">
                    देव: {dir.lordDeity}
                  </div>
                </div>
                <div className="text-[10px] text-stone-500 mt-2 border-t border-amber-100 dark:border-stone-800 pt-1">
                  ग्रह: {dir.rulingPlanet} • तत्व: {dir.elementHindi}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Direction Deep Inspection Card */}
      <div className="bg-white/95 dark:bg-stone-900/95 rounded-2xl p-6 border border-amber-200/70 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
              🧭
            </span>
            <div>
              <h4 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
                {activeVastuDirection.directionHindi} - वास्तु स्थापत्य एवं ऊर्जा प्रभाव
              </h4>
              <span className="text-xs text-stone-500 font-mono">
                दिक्पाल: {activeVastuDirection.lordDeity} • अधिपति ग्रह: {activeVastuDirection.rulingPlanet}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-stone-800 text-amber-900 dark:text-amber-300 font-semibold text-xs">
            {activeVastuDirection.elementHindi}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-stone-800/60 border border-amber-200/40 space-y-1">
            <span className="font-bold text-amber-950 dark:text-amber-200 block">
              सर्वोत्तम वास्तु निर्माण (Ideal Architecture):
            </span>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
              {activeVastuDirection.idealRooms}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 space-y-1">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">
              अनुकूल रंग संयोजन (Harmonious Colors):
            </span>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {activeVastuDirection.colorHindi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
