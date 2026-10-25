/**
 * Sanatan Web (सनातन घड़ी)
 * Component: VedicTimeConverter
 * Bidirectional Vedic Kaalganana (Truti to Kalpa) vs Modern SI Time Units Converter
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseUtilitiesDataResult } from '../hooks/useUtilitiesData';
import { toDevanagariNumerals } from '../hooks/useUtilitiesData';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { Clock, Sparkles, Compass, Globe, Sunrise } from 'lucide-react';

interface VedicTimeConverterProps {
  data: UseUtilitiesDataResult;
}

export const VedicTimeConverter: React.FC<VedicTimeConverterProps> = ({ data }) => {
  const {
    modernSecondsInput,
    setModernSecondsInput,
    convertedTimeUnits,
    liveIshtakala,
  } = data;

  const setPresetSeconds = (secs: number) => {
    setModernSecondsInput(secs);
  };

  return (
    <div className="space-y-6">
      {/* 1. Modern Input & Quick Presets Section */}
      <div className="bg-white/95 dark:bg-stone-900/95 rounded-2xl p-6 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 dark:border-amber-900/40 pb-3">
          <div className="flex items-center gap-2">
            <VedicIcon3D name="clock" size={20} className="text-amber-600" />
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                सनातन कालगणना रूपांतरक (Vedic Cosmic Time Converter)
              </h2>
              <p className="text-xs text-stone-500">
                आधुनिक सेकंड/मिनट का प्राचीन सनातन समय इकाइयों (त्रुटि, घटी, मुहूर्त, प्रहर) में द्विदिशीय रूपांतरण।
              </p>
            </div>
          </div>
        </div>

        {/* Input & Quick Presets */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
            आधुनिक सेकंड्स अथवा मिनट्स दर्ज करें:
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="number"
                min="0.001"
                step="any"
                value={modernSecondsInput}
                onChange={(e) => setModernSecondsInput(Math.max(0.0001, Number(e.target.value)))}
                className="w-full py-2.5 px-3 rounded-xl border border-amber-300 dark:border-stone-700 bg-amber-50/40 dark:bg-stone-800 text-sm font-bold text-amber-950 dark:text-amber-200 focus:ring-2 focus:ring-amber-500 font-mono"
              />
              <span className="absolute right-3 top-3 text-xs text-stone-400 font-semibold">
                सेकंड (Seconds)
              </span>
            </div>

            {/* Quick Pill Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setPresetSeconds(1440)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
              >
                १ घटी (२४ मि.)
              </button>
              <button
                type="button"
                onClick={() => setPresetSeconds(2880)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
              >
                १ मुहूर्त (४८ मि.)
              </button>
              <button
                type="button"
                onClick={() => setPresetSeconds(10800)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
              >
                १ प्रहर (३ घंटे)
              </button>
              <button
                type="button"
                onClick={() => setPresetSeconds(86400)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
              >
                १ अहोरात्र (२४ घंटे)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Converted Time Units Display Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* घटी */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-amber-300/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
            घटी (Ghati)
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-serif text-stone-900 dark:text-stone-100">
            {convertedTimeUnits.ghati}
          </div>
          <p className="text-[10px] text-stone-500">१ घटी = २४ मिनट = ६० पल</p>
        </div>

        {/* पल / विघटी */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-amber-200/70 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
            पल / विघटी (Pala)
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-serif text-stone-900 dark:text-stone-100">
            {convertedTimeUnits.vighatiPala}
          </div>
          <p className="text-[10px] text-stone-500">१ पल = २४ सेकंड = ६० विपल</p>
        </div>

        {/* मुहूर्त */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-amber-200/70 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
            मुहूर्त (Muhurat)
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-serif text-stone-900 dark:text-stone-100">
            {convertedTimeUnits.muhurat}
          </div>
          <p className="text-[10px] text-stone-500">१ मुहूर्त = २ घटी = ४८ मिनट</p>
        </div>

        {/* प्रहर */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-amber-200/70 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
            प्रहर / याम (Prahar)
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-serif text-stone-900 dark:text-stone-100">
            {convertedTimeUnits.prahar}
          </div>
          <p className="text-[10px] text-stone-500">१ प्रहर = ७.५ घटी = ३ घंटे</p>
        </div>
      </div>

      {/* 3. Micro Units & Live Ishtakala Dual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Micro Cosmic Time Units */}
        <div className="bg-white/95 dark:bg-stone-900/95 rounded-2xl p-5 border border-amber-200/70 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2">
            <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
              अति-सूक्ष्म सनातन कालगणना (Micro Time Units)
            </h3>
            <span className="text-[10px] text-amber-800 font-mono">सूर्यसिद्धांत</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
              <span className="text-stone-600 dark:text-stone-400">त्रुटि (Truti):</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{convertedTimeUnits.truti.toLocaleString()} त्रुटि</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
              <span className="text-stone-600 dark:text-stone-400">निमेष (Nimesha - पलक झपकना):</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{convertedTimeUnits.nimesha.toLocaleString()} निमेष</span>
            </div>
            <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
              <span className="text-stone-600 dark:text-stone-400">काष्ठा (Kashtha):</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{convertedTimeUnits.kashtha} काष्ठा</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-stone-600 dark:text-stone-400">कला (Kala):</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{convertedTimeUnits.kala} कला</span>
            </div>
          </div>
        </div>

        {/* Live Ishtakala Card (Engine Coupling) */}
        <div className="bg-gradient-to-br from-[#fff7ed] via-[#fef3c7]/20 to-[#fffbeb] rounded-2xl p-5 border border-amber-900/10 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-amber-900/10 pb-2">
            <Sunrise className="w-5 h-5 text-amber-700" />
            <h3 className="text-sm font-bold font-serif text-[#26150b] dark:text-stone-100">
              दैनिक इष्टकाल (सूर्यसिद्धांत दृश्य गणना)
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-[#735641] leading-relaxed">
              सूर्योदय से वर्तमान क्षण तक बीता हुआ समय वैदिक परंपरा में 'इष्टकाल' कहलाता है।
            </p>
            <div className="p-3 bg-white/90 dark:bg-stone-900/90 rounded-xl border border-amber-200/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-bold block">
                  आज का वर्तमान इष्टकाल
                </span>
                <span className="text-lg font-bold font-serif text-amber-900 dark:text-amber-200">
                  {liveIshtakala.ghati} घटी, {liveIshtakala.vighati} पल
                </span>
              </div>
              <span className="px-2 py-1 rounded bg-amber-100 text-amber-900 text-xs font-mono font-bold">
                {liveIshtakala.formatted}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Cosmic Macro-Time Scale (युग, मन्वन्तर, कल्प) */}
      <div className="bg-white/90 dark:bg-stone-900/90 rounded-2xl p-5 border border-amber-200/70 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-amber-100 pb-2">
          <Globe className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
            विशाल ब्रह्मांडीय कालगणना (Macro Cosmic Time)
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-stone-800/50 space-y-0.5">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">सत्ययुग (कृतयुग)</span>
            <span className="text-[11px] text-stone-500 font-mono">१७,२८,००० वर्ष</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-stone-800/50 space-y-0.5">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">त्रेतायुग</span>
            <span className="text-[11px] text-stone-500 font-mono">१२,९६,००० वर्ष</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-stone-800/50 space-y-0.5">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">द्वापरयुग</span>
            <span className="text-[11px] text-stone-500 font-mono">८,६४,००० वर्ष</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-stone-800/50 space-y-0.5">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">कलियुग</span>
            <span className="text-[11px] text-stone-500 font-mono">४,३२,००० वर्ष</span>
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500">
          <span>१ चतुर्युगी (महायुग) = ४३,२०,००० वर्ष</span>
          <span>१ कल्प = १,००० चतुर्युगी = ब्रह्मा जी का १ दिन (४.३२ अरब वर्ष)</span>
        </div>
      </div>
    </div>
  );
};
