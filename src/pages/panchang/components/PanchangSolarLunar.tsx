/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangSolarLunar
 * Solar & Lunar Astronomical Ephemeris Dual Bento Cards
 * Dynamic Solar Arc, Lunar Illumination, and Vedic Rashi Gold Line Art
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { VedicRashiGoldIcon } from '../../vedic-portal/components/VedicRashiGoldIcon';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

export interface PanchangSolarLunarProps {
  data: UsePanchangDataResult;
}

export const PanchangSolarLunar: React.FC<PanchangSolarLunarProps> = ({ data }) => {
  const { panchang, solarProgressPercent } = data;

  // Compute Sun position along the 180° arc (from (20,95) to (280,95) with peak at y=20)
  const arcAngleRad = Math.PI - (solarProgressPercent / 100) * Math.PI;
  const sunX = Math.round(150 + 130 * Math.cos(arcAngleRad));
  const sunY = Math.round(95 - 75 * Math.sin(arcAngleRad));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-serif">
      {/* ================= CARD A: भगवान सूर्य देव ================= */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#fffdfa] via-[#fff9eb] to-[#fbeecc] border border-[#dec9ab]/80 shadow-[0_8px_30px_rgb(180,120,40,0.06)] flex flex-col justify-between space-y-5">
        <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
        <GoldenCornerBrackets size="lg" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between border-b border-[#dec9ab]/60 pb-3">
            <div className="flex items-center gap-3">
              <VedicIcon3D name="sun" size="md" />
              <div>
                <h3 className="text-lg font-bold text-[#26150b]">भगवान सूर्य देव खगोलीय गणना</h3>
                <p className="text-xs text-[#735641]">Solar Ephemeris & Transitions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <VedicRashiGoldIcon rashi="tula" size="sm" />
              <span className="text-xs font-bold text-[#b45309] px-2.5 py-1 rounded-full bg-white/90 border border-amber-300">
                तुला संक्रांति
              </span>
            </div>
          </div>

          {/* Dynamic Solar Arc SVG */}
          <div className="p-4 rounded-2xl bg-white/80 border border-[#dec9ab]/60 flex flex-col items-center">
            <svg className="w-full max-w-sm h-28" viewBox="0 0 300 115" fill="none">
              {/* Horizon Line */}
              <line x1="15" y1="95" x2="285" y2="95" stroke="#dec9ab" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Base Arc Path */}
              <path d="M 20 95 A 130 75 0 0 1 280 95" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />
              {/* Active Sun Progress Path */}
              <path
                d={`M 20 95 A 130 75 0 0 1 ${sunX} ${sunY}`}
                stroke="#ea580c"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Sun Marker with Glowing Aura */}
              <circle cx={sunX} cy={sunY} r="14" fill="#fef08a" fillOpacity="0.4" />
              <circle cx={sunX} cy={sunY} r="9" fill="#ea580c" />
              <circle cx={sunX} cy={sunY} r="4" fill="#ffffff" />

              {/* Sunrise & Sunset Text */}
              <text x="15" y="110" fill="#735641" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                सूर्योदय {panchang.sunrise}
              </text>
              <text x="125" y="30" fill="#c2410c" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                दोपहर मध्याह्न
              </text>
              <text x="225" y="110" fill="#735641" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                सूर्यास्त {panchang.sunset}
              </text>
            </svg>

            <div className="flex items-center justify-between w-full text-[11px] text-[#735641] mt-2 px-2 border-t border-[#dec9ab]/30 pt-2">
              <span>उषाकाल: ०५:२५</span>
              <span className="font-bold text-[#c2410c]">गोधूलि वेला: {panchang.sunset}</span>
              <span>दिनमान प्रगति: {solarProgressPercent}%</span>
            </div>
          </div>

          {/* 6 Metrics Grid for Sun */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center">
              <span className="text-[10px] text-[#735641] block">प्रातः सूर्योदय</span>
              <span className="text-xs sm:text-sm font-bold text-[#c2410c] font-mono">{panchang.sunrise} पूर्वाह्न</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center">
              <span className="text-[10px] text-[#735641] block">सायं सूर्यास्त</span>
              <span className="text-xs sm:text-sm font-bold text-[#c2410c] font-mono">{panchang.sunset} अपराह्न</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center">
              <span className="text-[10px] text-[#735641] block">दिनमान अवधि</span>
              <span className="text-xs sm:text-sm font-bold text-[#26150b] font-mono">११ घं. २७ मि.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center">
              <span className="text-[10px] text-[#735641] block">सूर्य राशि</span>
              <span className="text-xs sm:text-sm font-bold text-[#b45309]">तुला (स्वाति पद १)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center">
              <span className="text-[10px] text-[#735641] block">लोकल नून (मध्याह्न)</span>
              <span className="text-xs sm:text-sm font-bold text-[#26150b] font-mono">११:५८ पूर्वाह्न</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#dec9ab]/60 text-center">
              <span className="text-[10px] text-[#735641] block">अभिजीत संधि</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-700 font-mono">११:४८ - १२:३२</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CARD B: चंद्रमा खगोलीय स्थिति ================= */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#fffdfa] via-[#f7f8fb] to-[#eff4fc] border border-[#cbd5e1] shadow-[0_8px_30px_rgb(50,80,140,0.06)] flex flex-col justify-between space-y-5">
        <SacredGeometryWatermark variant="swastik" className="opacity-[0.05]" />
        <GoldenCornerBrackets size="lg" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between border-b border-[#cbd5e1]/70 pb-3">
            <div className="flex items-center gap-3">
              <VedicIcon3D name="moon" size="md" />
              <div>
                <h3 className="text-lg font-bold text-[#1e293b]">चंद्रमा खगोलीय स्थिति एवं चंद्रोदय</h3>
                <p className="text-xs text-[#64748b]">Lunar Motion & Phase Calculations</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <VedicRashiGoldIcon rashi="kanya" size="sm" />
              <span className="text-xs font-bold text-indigo-900 px-2.5 py-1 rounded-full bg-white/90 border border-indigo-200">
                कन्या राशि (बुध युति)
              </span>
            </div>
          </div>

          {/* Moon Phase & Illumination Display */}
          <div className="p-4 rounded-2xl bg-white/85 border border-[#cbd5e1]/70 flex items-center justify-around gap-4">
            {/* Luminous Moon Sphere Graphic */}
            <div className="flex flex-col items-center">
              <div className="relative w-18 h-18 rounded-full bg-[#1e293b] overflow-hidden shadow-inner flex items-center justify-center border-2 border-indigo-200">
                {/* 3D Glowing Crescent Moon */}
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#fef08a] via-[#fde047] to-transparent rounded-r-full"></div>
                <div className="relative z-10 text-white/30 text-2xl">🌙</div>
              </div>
              <span className="text-xs font-bold text-indigo-900 mt-2">
                प्रदीप्ति: ५८.४% (शुक्ल)
              </span>
            </div>

            {/* Chandra Times Details */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                <span className="text-[#64748b]">चंद्रोदय:</span>
                <span className="font-bold text-[#1e293b] font-mono text-sm">{panchang.moonrise || 'रात्रि १२:१२'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span className="text-[#64748b]">चंद्रास्त:</span>
                <span className="font-bold text-[#1e293b] font-mono text-sm">{panchang.moonset || 'अपराह्न ०१:४५'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-[#64748b]">चंद्र नक्षत्र:</span>
                <span className="font-bold text-[#1e293b]">चित्रा (मंगल स्वामी)</span>
              </div>
            </div>
          </div>

          {/* 6 Metrics Grid for Moon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#cbd5e1]/70 text-center">
              <span className="text-[10px] text-[#64748b] block">चंद्रोदय समय</span>
              <span className="text-xs sm:text-sm font-bold text-indigo-900 font-mono">{panchang.moonrise || '१२:१२ AM'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#cbd5e1]/70 text-center">
              <span className="text-[10px] text-[#64748b] block">चंद्रास्त समय</span>
              <span className="text-xs sm:text-sm font-bold text-[#1e293b] font-mono">{panchang.moonset || '०१:४५ PM'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#cbd5e1]/70 text-center">
              <span className="text-[10px] text-[#64748b] block">रात्रिमान अवधि</span>
              <span className="text-xs sm:text-sm font-bold text-[#1e293b] font-mono">१२ घं. ३३ मि.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#cbd5e1]/70 text-center">
              <span className="text-[10px] text-[#64748b] block">चंद्र राशि</span>
              <span className="text-xs sm:text-sm font-bold text-indigo-900">कन्या (स्वमित्र राशि)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#cbd5e1]/70 text-center">
              <span className="text-[10px] text-[#64748b] block">चंद्र अवस्था</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-700">प्रबल शुभ फलदायी</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#cbd5e1]/70 text-center">
              <span className="text-[10px] text-[#64748b] block">पाया (Paya)</span>
              <span className="text-xs sm:text-sm font-bold text-[#b45309]">रजत पाया (Silver)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanchangSolarLunar;
