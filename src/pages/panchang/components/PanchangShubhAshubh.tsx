/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangShubhAshubh
 * Auspicious (शुभ काल) and Inauspicious (अशुभ/राहुकाल) Timing Matrix & Disha Shool
 * Live pulsing beacon and 3D Shields
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

export interface PanchangShubhAshubhProps {
  data: UsePanchangDataResult;
}

export const PanchangShubhAshubh: React.FC<PanchangShubhAshubhProps> = ({ data }) => {
  const { panchang, dayName } = data;

  const rahuStart = panchang.rahuKaal?.start || '१६:४८';
  const rahuEnd = panchang.rahuKaal?.end || '१८:२२';
  const gulikStart = panchang.gulikKaal?.start || '०७:४५';
  const gulikEnd = panchang.gulikKaal?.end || '०९:१२';
  const yamaStart = panchang.yamagandam?.start || '०९:१२';
  const yamaEnd = panchang.yamagandam?.end || '१०:३८';

  // Determine Disha Shool based on day of week
  const getDishaShool = () => {
    switch (dayName) {
      case 'रविवार':
      case 'शुक्रवार':
        return { dir: 'पश्चिम', remedy: 'घी या पान खाकर यात्रा करें।' };
      case 'सोमवार':
      case 'शनिवार':
        return { dir: 'पूर्व', remedy: 'दर्पण देखकर या तिल खाकर प्रस्थान करें।' };
      case 'मंगलवार':
      case 'बुधवार':
        return { dir: 'उत्तर', remedy: 'गुड़ या धनिया खाकर निकलें।' };
      case 'गुरुवार':
        return { dir: 'दक्षिण', remedy: 'दही या जीरा खाकर यात्रा करें।' };
      default:
        return { dir: 'पश्चिम', remedy: 'दही खाकर यात्रा करें।' };
    }
  };

  const disha = getDishaShool();

  return (
    <div className="space-y-6 font-serif">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ================= SHUBH TIMINGS (शुभ मुहूर्त) ================= */}
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#fffdfa] via-[#f7fcf8] to-[#edf9f0] border border-emerald-300 shadow-[0_8px_30px_rgb(16,185,129,0.06)] flex flex-col justify-between space-y-4">
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
          <GoldenCornerBrackets size="lg" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3">
              <div className="flex items-center gap-2.5">
                <VedicIcon3D name="shubh" size="md" />
                <div>
                  <h3 className="text-lg font-bold text-emerald-950">शुभ मुहूर्त एवं अमृत वेला</h3>
                  <p className="text-xs text-emerald-800">Auspicious Intervals & Siddhi Kaal</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                {/* Live Pulsing Emerald Radar Wave */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span>सर्वकार्य सिद्धि</span>
              </span>
            </div>

            {/* Shubh Muhurats List */}
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-white/90 border border-emerald-200 flex items-center justify-between shadow-2xs hover:border-emerald-400 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-base">⭐</span>
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">अभिजीत मुहूर्त (सर्वश्रेष्ठ)</span>
                    <span className="text-[10px] text-emerald-700">भगवान श्रीहरि का प्रिय समय</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 font-mono bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  ११:४८ - १२:३२
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 border border-emerald-200 flex items-center justify-between shadow-2xs hover:border-emerald-400 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-base">🌅</span>
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">ब्रह्म मुहूर्त (साधना काल)</span>
                    <span className="text-[10px] text-emerald-700">विद्या व मंत्र जप हेतु</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 font-mono bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  ०४:३८ - ०५:२६
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 border border-emerald-200 flex items-center justify-between shadow-2xs hover:border-emerald-400 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-base">✨</span>
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">अमृत काल (Amrit Kaal)</span>
                    <span className="text-[10px] text-emerald-700">नवीन कार्य शुभारंभ</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 font-mono bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  ०२:१५ - ०३:४८
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 border border-emerald-200 flex items-center justify-between shadow-2xs hover:border-emerald-400 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-base">🚩</span>
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">विजय मुहूर्त (Vijay Kaal)</span>
                    <span className="text-[10px] text-emerald-700">विवाद व मुकदमे में विजय</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 font-mono bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  ०१:५८ - ०२:४४
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ASHUBH / RAHU KAAL (अशुभ काल) ================= */}
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#fffdfa] via-[#fdf5f5] to-[#fdeded] border border-rose-300 shadow-[0_8px_30px_rgb(225,29,72,0.06)] flex flex-col justify-between space-y-4">
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
          <GoldenCornerBrackets size="lg" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-200/80 pb-3">
              <div className="flex items-center gap-2.5">
                <VedicIcon3D name="ashubh" size="md" />
                <div>
                  <h3 className="text-lg font-bold text-rose-950">अशुभ काल एवं राहुकाल</h3>
                  <p className="text-xs text-rose-800">Prohibited & Inauspicious Intervals</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold border border-rose-300 flex items-center gap-1 shadow-2xs">
                <span>⚠️</span>
                <span>शुभ कार्य वर्जित</span>
              </span>
            </div>

            {/* Ashubh Kaal List */}
            <div className="space-y-2.5">
              {/* Highlighted Rahu Kaal Card */}
              <div className="p-3 rounded-2xl bg-white/95 border-2 border-rose-400 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base text-rose-600">🛑</span>
                  <div>
                    <span className="text-xs font-bold text-rose-950 block">राहुकाल (Rahu Kaal)</span>
                    <span className="text-[10px] text-rose-700">यात्रा व नवीन अनुबंध वर्जित</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-rose-800 font-mono bg-rose-100 px-3 py-1 rounded-lg border border-rose-300">
                  {rahuStart} - {rahuEnd}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 border border-rose-200 flex items-center justify-between shadow-2xs hover:border-rose-400 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-base">⏳</span>
                  <div>
                    <span className="text-xs font-bold text-rose-950 block">यमगण्ड काल (Yamaganda)</span>
                    <span className="text-[10px] text-rose-700">हानि कारक समय</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-rose-800 font-mono bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  {yamaStart} - {yamaEnd}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 border border-rose-200 flex items-center justify-between shadow-2xs hover:border-rose-400 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚔️</span>
                  <div>
                    <span className="text-xs font-bold text-rose-950 block">गुलिक काल (Gulika Kaal)</span>
                    <span className="text-[10px] text-rose-700">शनि का उपग्रह काल</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-rose-800 font-mono bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  {gulikStart} - {gulikEnd}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 border border-rose-200 flex items-center justify-between shadow-2xs hover:border-rose-400 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚡</span>
                  <div>
                    <span className="text-xs font-bold text-rose-950 block">दुर्मुहूर्त (Durmuhurat)</span>
                    <span className="text-[10px] text-rose-700">विघ्नकारी समय</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-rose-800 font-mono bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  १०:१२ - १०:५८
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DISHA SHOOL STRIP ================= */}
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#fff9eb] via-[#fff4dc] to-[#fbeecc] border border-[#dec9ab] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧭</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#c2410c] uppercase">आज का दिशाशूल</span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-xs">
                {disha.dir} दिशा
              </span>
            </div>
            <p className="text-xs text-[#735641] mt-0.5">
              आज {dayName} को {disha.dir} दिशा में यात्रा करने से बचें। यदि आवश्यक हो तो परिहार करें।
            </p>
          </div>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-white/90 border border-amber-300 text-xs font-semibold text-[#b45309] shrink-0">
          ✨ <span className="font-bold">परिहार / उपाय:</span> {disha.remedy}
        </div>
      </div>
    </div>
  );
};

export default PanchangShubhAshubh;
