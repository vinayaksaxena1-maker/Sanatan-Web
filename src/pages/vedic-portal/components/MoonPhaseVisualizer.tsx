/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MoonPhaseVisualizer
 * खगोलीय चंद्र स्थिति एवं पक्ष कला चक्र (Astronomical Moon Phase & Vedic Tithi Cycle)
 * D3-driven orbital arc, 15 Tithis Vedic energy & deity lore, SVG Moon illumination math.
 * Pure Web Standards, React 19, Zero External Bloat.
 */

import React, { useState, useMemo, useEffect } from 'react';
import * as d3 from 'd3';
import { Moon, RefreshCw, Info, ThumbsUp } from 'lucide-react';
import type { PanchangInfo, PakshaType } from '../../../engine/types';
import { useLocationStore } from '../../../store/locationStore';
import { calculatePanchang } from '../../../engine';
import { toHindiDigits } from '../../../components/watch';

export interface MoonPhaseVisualizerProps {
  panchang?: PanchangInfo | null;
  tithiValue?: number;
  paksha?: PakshaType;
  language?: 'English' | 'Hindi';
  className?: string;
}

interface TithiDetail {
  value: number;
  name: string;
  hindiName: string;
  energy: string;
  energyEng: string;
  deity: string;
  deityEng: string;
  spirituality: string;
  spiritualityEng: string;
}

// 15 Tithis within a single Paksha (Classical Vedic Lore)
const MOON_PAKSHA_DAYS: TithiDetail[] = [
  { value: 1, name: 'Pratipada', hindiName: 'प्रतिपदा (१)', energy: 'नया आरंभ', energyEng: 'New Beginnings', deity: 'अग्नि देव', deityEng: 'Lord Agni', spirituality: 'नए कार्यों व संकल्प के लिए श्रेष्ठ दिन।', spiritualityEng: 'Best for positive resolutions, fresh commitments, and commencing new work.' },
  { value: 2, name: 'Dwitiya', hindiName: 'द्वितीया (२)', energy: 'स्थिरता व संचय', energyEng: 'Stability & Wealth', deity: 'ब्रह्मा जी', deityEng: 'Lord Brahma', spirituality: 'गृह निर्माण, स्थिरता और स्थायी संपत्तियों के लिए लाभकारी।', spiritualityEng: 'Auspicious for construction, laying foundations, and long-term security.' },
  { value: 3, name: 'Tritiya', hindiName: 'तृतीया (३)', energy: 'समृद्धि व कला', energyEng: 'Prosperity & Arts', deity: 'माँ गौरी', deityEng: 'Goddess Gauri', spirituality: 'संगीत, कला और मांगलिक उत्सवों के लिए सर्वोत्तम दिन।', spiritualityEng: 'Best for creative arts, music, weddings, and celebration of prosperity.' },
  { value: 4, name: 'Chaturthi', hindiName: 'चतुर्थी (४)', energy: 'बाधा निवारण', energyEng: 'Obstacle Removal', deity: 'श्री गणेश', deityEng: 'Lord Ganesha', spirituality: 'श्री गणेश पूजा से विघ्न शांत होते हैं, साधना के लिए तीव्र दिन।', spiritualityEng: 'Worship of Lord Ganesha removes obstacles; powerful day for focused spiritual practice.' },
  { value: 5, name: 'Panchami', hindiName: 'पंचमी (५)', energy: 'ज्ञान व चेतना', energyEng: 'Wisdom & Healing', deity: 'नाग देवता', deityEng: 'Naga Devatas', spirituality: 'विद्या आरंभ, आध्यात्मिक प्रगति व नाग पूजा के लिए उत्तम।', spiritualityEng: 'Ideal for commencing education, intellectual study, and spiritual purification.' },
  { value: 6, name: 'Shashti', hindiName: 'षष्ठी (६)', energy: 'अनुशासन व ओज', energyEng: 'Discipline & Valor', deity: 'कार्तिकेय', deityEng: 'Lord Kartikeya', spirituality: 'यश, कीर्ति और शत्रुओं पर विजय प्राप्त करने की साधना।', spiritualityEng: 'Cultivates victory over obstacles, courage, and athletic pursuits.' },
  { value: 7, name: 'Saptami', hindiName: 'सप्तमी (७)', energy: 'आरोग्य व तेज', energyEng: 'Health & Radiance', deity: 'सूर्य देव', deityEng: 'Lord Surya', spirituality: 'आरोग्य लाभ और सूर्य उपासना के लिए विशेष रूप से ऊर्जावान।', spiritualityEng: 'Vibrant solar vitality; highly auspicious for health recovery and Surya worship.' },
  { value: 8, name: 'Ashtami', hindiName: 'अष्टमी (८)', energy: 'शक्ति संचय', energyEng: 'Inner Power', deity: 'माँ दुर्गा', deityEng: 'Goddess Durga', spirituality: 'मंत्र दीक्षा, ध्यान व दिव्य शक्ति पूजा के लिए पवित्र अर्धचंद्र।', spiritualityEng: 'Sacred half-moon day for mantra chanting, meditation, and invoking divine strength.' },
  { value: 9, name: 'Navami', hindiName: 'नवमी (९)', energy: 'आत्मबल व मर्यादा', energyEng: 'Strength & Righteousness', deity: 'माँ दुर्गा/राम', deityEng: 'Lord Rama / Durga', spirituality: 'कठिन संकल्पों और आंतरिक शत्रुओं पर विजय के लिए आत्मबल।', spiritualityEng: 'Inspires inner fortitude and mastery over negative thoughts and adversity.' },
  { value: 10, name: 'Dashami', hindiName: 'दशमी (१०)', energy: 'दिग्विजय', energyEng: 'Triumph & Success', deity: 'यमराज', deityEng: 'Lord Yamraj', spirituality: 'दशों दिशाओं में कीर्ति और धर्म कार्यों की स्थापना के लिए शुभ।', spiritualityEng: 'Favorable for righteous victories, new ventures, and social leadership.' },
  { value: 11, name: 'Ekadashi', hindiName: 'एकादशी (११)', energy: 'पूर्ण शुद्धि व व्रत', energyEng: 'Fasting & Purification', deity: 'श्री विष्णु', deityEng: 'Lord Vishnu', spirituality: 'परम मोक्षदायिनी एकादशी। उपवास और विशेष ध्यान के योग्य।', spiritualityEng: 'Highly sacred day for fasting, devotional contemplation, and mental detox.' },
  { value: 12, name: 'Dwadashi', hindiName: 'द्वादशी (१२)', energy: 'तप व सेवा', energyEng: 'Service & Charity', deity: 'सूर्य देव', deityEng: 'Lord Vishnu/Surya', spirituality: 'साधना के पूर्ण फल की प्राप्ति, दान और पवित्र अनुष्ठान।', spiritualityEng: 'Auspicious for charity, feeding others, and concluding devotional vrats.' },
  { value: 13, name: 'Trayodashi', hindiName: 'त्रयोदशी (१३)', energy: 'शिव शक्ति मिलन', energyEng: 'Divine Grace', deity: 'कामदेव / शिव', deityEng: 'Lord Shiva', spirituality: 'प्रदोष काल व्रत और भगवान शिव की असीम कृपा प्राप्त करने का योग।', spiritualityEng: 'Pradosh twilight fast; invites immense blessings and peace from Lord Shiva.' },
  { value: 14, name: 'Chaturdashi', hindiName: 'चतुर्दशी (१४)', energy: 'गहन अध्यात्म', energyEng: 'Deep Meditation', deity: 'भगवान शिव', deityEng: 'Lord Shiva', spirituality: 'शिव आराधना व ध्यान के द्वारा मानसिक विकारों की शुद्धि।', spiritualityEng: 'Powerful day for deep meditation, overcoming fear, and spiritual renewal.' },
  { value: 15, name: 'Purnima / Amavasya', hindiName: 'पूर्णिमा / अमावस्या (१५)', energy: 'पूर्णत्व / मौन', energyEng: 'Culmination / Reflection', deity: 'चंद्रमा / पितृ', deityEng: 'Chandra / Ancestors', spirituality: 'पूर्णिमा: पूर्ण ऊर्जा, ध्यान व संतोष; अमावस्या: मौन, ध्यान व पितृ तर्पण।', spiritualityEng: 'Full Moon: fullness of consciousness; New Moon: quiet introspection and ancestral blessings.' }
];

export const MoonPhaseVisualizer: React.FC<MoonPhaseVisualizerProps> = ({
  panchang: propPanchang,
  tithiValue: propTithiValue,
  paksha: propPaksha,
  language = 'Hindi',
  className = ''
}) => {
  const isHin = language === 'Hindi';
  const { currentCity } = useLocationStore();

  // Resolve Panchang and Tithi data autonomously
  const resolvedData = useMemo(() => {
    if (propPanchang?.hinduDate?.tithi) {
      return {
        tithiValue: propPanchang.hinduDate.tithi.value,
        paksha: propPanchang.hinduDate.paksha as PakshaType
      };
    }
    if (propTithiValue !== undefined) {
      const derivedPaksha: PakshaType = propPaksha || (propTithiValue <= 15 ? 'Shukla' : 'Krishna');
      return { tithiValue: propTithiValue, paksha: derivedPaksha };
    }
    try {
      const calculated = calculatePanchang(currentCity.latitude, currentCity.longitude, new Date());
      return {
        tithiValue: calculated.hinduDate.tithi.value,
        paksha: calculated.hinduDate.paksha as PakshaType
      };
    } catch {
      return { tithiValue: 5, paksha: 'Shukla' as PakshaType };
    }
  }, [propPanchang, propTithiValue, propPaksha, currentCity]);

  const currentTithiValue = resolvedData.tithiValue;
  const paksha = resolvedData.paksha;

  // Convert tithi value (1-30) to Paksha index (1-15)
  // 1-15 is Shukla, 16-30 is Krishna. Map 16 to 1, 30 to 15.
  const todayPakshaDay = useMemo(() => {
    const val = currentTithiValue;
    if (val <= 15) return Math.max(1, val);
    const diff = val - 15;
    return Math.max(1, Math.min(15, diff));
  }, [currentTithiValue]);

  // Selected/hovered Tithi for interactivity (defaults to today's Paksha day)
  const [selectedDay, setSelectedDay] = useState<number>(todayPakshaDay);

  // Sync state if today's paksha day changes
  useEffect(() => {
    setSelectedDay(todayPakshaDay);
  }, [todayPakshaDay]);

  const activeTithiInfo = useMemo(() => {
    return MOON_PAKSHA_DAYS.find(d => d.value === selectedDay) || MOON_PAKSHA_DAYS[0];
  }, [selectedDay]);

  // Dynamic label for Day 15 depending on current Paksha
  const activeTithiTitle = useMemo(() => {
    if (selectedDay === 15) {
      return isHin
        ? (paksha === 'Shukla' ? 'पूर्णिमा (१५)' : 'अमावस्या (१५)')
        : (paksha === 'Shukla' ? 'Purnima (15)' : 'Amavasya (15)');
    }
    return isHin ? activeTithiInfo.hindiName : activeTithiInfo.name;
  }, [selectedDay, paksha, isHin, activeTithiInfo]);

  // Calculated illumination based on selected day and paksha
  const calculatedIllumination = useMemo(() => {
    const fraction = selectedDay / 15;
    if (paksha === 'Shukla') {
      // Shukla: starts thin crescent, reaches full (100%) at 15
      return (1 - Math.cos(fraction * Math.PI)) / 2;
    } else {
      // Krishna: starts full-ish, reaches new moon (0%) at 15
      return (1 + Math.cos(fraction * Math.PI)) / 2;
    }
  }, [selectedDay, paksha]);

  // SVG drawing dimensions & coordinates
  const width = 300;
  const height = 210;
  const cx = width / 2;
  const cy = 120;
  const rOrbit = 98;
  const rMoon = 40;

  // D3 scale to map selection values (1 to 15) to angles (in degrees)
  const angleScale = useMemo(() => {
    return d3.scaleLinear()
      .domain([1, 15])
      .range([-165, -15]);
  }, []);

  // Compute coordinates for each day on the arc
  const orbitPoints = useMemo(() => {
    return MOON_PAKSHA_DAYS.map(day => {
      const angleDeg = angleScale(day.value);
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = cx + rOrbit * Math.cos(angleRad);
      const y = cy + rOrbit * Math.sin(angleRad);
      return {
        day: day.value,
        x,
        y,
        label: day.value.toString()
      };
    });
  }, [cx, cy, rOrbit, angleScale]);

  // Generate path string for the orbit arc using D3 line generator
  const orbitPathStr = useMemo(() => {
    const points: [number, number][] = orbitPoints.map(p => [p.x, p.y]);
    const lineGen = d3.line<[number, number]>()
      .x(d => d[0])
      .y(d => d[1])
      .curve(d3.curveBasis);
    return lineGen(points) || '';
  }, [orbitPoints]);

  // Dynamic SVG path for Moon phase illumination
  const moonPathStr = useMemo(() => {
    const R = rMoon;
    const I = calculatedIllumination;
    const rx = R * Math.abs(2 * I - 1);

    if (I <= 0.5) {
      return `M 0 -${R} A ${R} ${R} 0 0 1 0 ${R} A ${rx} ${R} 0 0 0 0 -${R} Z`;
    } else {
      return `M 0 -${R} A ${R} ${R} 0 0 1 0 ${R} A ${rx} ${R} 0 0 1 0 -${R} Z`;
    }
  }, [calculatedIllumination, rMoon]);

  const illuminationPct = Math.round(calculatedIllumination * 100);
  const systemColorAccent = paksha === 'Shukla' ? 'text-amber-700 dark:text-amber-400' : 'text-indigo-700 dark:text-indigo-400';

  return (
    <div
      id="moon_phase_visualizer_root"
      className={`p-4 sm:p-5 rounded-3xl bg-white border border-amber-300 shadow-sm flex flex-col justify-between space-y-3.5 relative overflow-hidden text-left font-serif ${className}`}
    >
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-amber-200/80 pb-2.5">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">✨</span>
            <h3 className="text-base sm:text-lg font-bold text-[#26150b] leading-tight">
              {isHin ? "खगोलीय चंद्र स्थिति एवं कला चक्र" : "Astronomical Moon Phase"}
            </h3>
          </div>
          <p className="text-[11px] sm:text-xs text-[#735641] mt-0.5 leading-snug">
            {isHin
              ? `चंद्रमा के ${paksha === 'Shukla' ? 'शुक्ल पक्ष (वैश्विक उदय)' : 'कृष्ण पक्ष (वैश्विक क्षय)'} की गति · चक्र स्पर्श कर देखें`
              : `Progression of the Moon during ${paksha === 'Shukla' ? 'Shukla Paksha (Waxing)' : 'Krishna Paksha (Waning)'}`}
          </p>
        </div>

        {selectedDay !== todayPakshaDay ? (
          <button
            type="button"
            onClick={() => setSelectedDay(todayPakshaDay)}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-amber-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 border border-amber-400 shadow-xs rounded-full transition-all shrink-0 cursor-pointer hover:scale-105 active:scale-95 animate-pulse"
          >
            <RefreshCw className="w-3 h-3 animate-spin text-black" style={{ animationDuration: '3s' }} />
            <span>{isHin ? `🔄 वर्तमान तिथि (${toHindiDigits(todayPakshaDay)})` : `🔄 Current Tithi (${todayPakshaDay})`}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-full shrink-0 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{isHin ? `वर्तमान तिथि (${toHindiDigits(todayPakshaDay)})` : `Current Tithi (${todayPakshaDay})`}</span>
          </div>
        )}
      </div>

      {/* Main Responsive Grid: SVG Arc + Info Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-stretch flex-1 mt-0.5">

        {/* Orbit Canvas Board (D3 Viewport) */}
        <div className="sm:col-span-5 flex justify-center items-center bg-white rounded-2xl p-2 border border-amber-200 shadow-2xs relative overflow-hidden h-full min-h-[220px]">
          {/* Subtle celestial golden starry background dots */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-4 left-6 w-1 h-1 bg-amber-400 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute top-12 right-8 w-0.5 h-0.5 bg-amber-500 rounded-full"></div>
            <div className="absolute bottom-8 left-1/4 w-1 h-1 bg-amber-400 rounded-full"></div>
            <div className="absolute bottom-12 right-6 w-0.5 h-0.5 bg-amber-500 rounded-full"></div>
            <div className="absolute top-20 left-3/4 w-0.5 h-0.5 bg-amber-400 rounded-full"></div>
          </div>

          <svg
            id="moon_d3_viewport"
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            className="select-none overflow-visible max-w-[270px]"
          >
            <defs>
              <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={paksha === 'Shukla' ? '#FEF3C7' : '#EEF2FF'} stopOpacity="0.8" />
                <stop offset="60%" stopColor={paksha === 'Shukla' ? '#FFFBEB' : '#F8FAFC'} stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="moon-surface-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient Celestial Glow behind Moon */}
            <circle
              cx={cx}
              cy={cy}
              r={rMoon + 24}
              fill="url(#sun-glow)"
              className="pointer-events-none transition-all duration-300"
            />

            {/* Orbit Arc Line generated by D3 */}
            <path
              d={orbitPathStr}
              fill="none"
              stroke="#dec9ab"
              strokeWidth="1.75"
              strokeDasharray="4,4"
              className="opacity-80"
            />

            {/* Orbit Endpoint Indicator Text */}
            <text
              x={cx - rOrbit - 12}
              y={cy - 10}
              textAnchor="middle"
              className="text-[11px] font-bold fill-[#735641] font-serif"
            >
              {isHin ? 'प्रारंभ' : 'Start'}
            </text>
            <text
              x={cx + rOrbit + 14}
              y={cy - 10}
              textAnchor="middle"
              className="text-[11px] font-bold fill-[#735641] font-serif"
            >
              {isHin
                ? (paksha === 'Shukla' ? 'पूर्णिमा' : 'अमावस्या')
                : (paksha === 'Shukla' ? 'Full Moon' : 'New Moon')}
            </text>

            <g transform={`translate(${cx}, ${cy})`}>
              {/* Moon Base Sphere */}
              <circle
                cx="0"
                cy="0"
                r={rMoon}
                fill="#26150b"
                stroke="#5c3e2b"
                strokeWidth="1.5"
                className="transition-all"
              />

              {/* Moon craters on background sphere */}
              <g opacity="0.4" className="fill-[#180e07] pointer-events-none">
                <circle cx="-16" cy="-10" r="4.5" />
                <circle cx="-8" cy="-22" r="3" />
                <circle cx="12" cy="-15" r="5" />
                <circle cx="22" cy="10" r="6" />
                <circle cx="2" cy="18" r="4" />
                <circle cx="-20" cy="14" r="3" />
                <circle cx="-14" cy="22" r="1.5" />
                <circle cx="8" cy="-28" r="1.5" />
                <circle cx="-28" cy="-8" r="1.5" />
              </g>

              {/* Dynamic Illuminated Phase Overlay (Horizontal flip for Krishna paksha) */}
              <g transform={paksha === 'Krishna' ? 'scale(-1, 1)' : undefined}>
                <path
                  d={moonPathStr}
                  fill={paksha === 'Shukla' ? '#FFF3D1' : '#E8EDFF'}
                  className="transition-all duration-300"
                  style={{
                    filter: `drop-shadow(0 0 10px ${paksha === 'Shukla' ? 'rgba(251,191,36,0.6)' : 'rgba(129,140,248,0.5)'})`
                  }}
                />
              </g>

              {/* Glow effects overlap on the crescent/gibbous line */}
              <circle
                cx="0"
                cy="0"
                r={rMoon}
                fill="url(#moon-surface-glow)"
                className="pointer-events-none"
              />
            </g>

            {/* Orbit interactive nodes mapped with D3 */}
            {orbitPoints.map((pt) => {
              const isToday = pt.day === todayPakshaDay;
              const isSelected = pt.day === selectedDay;

              const nodeFill = isSelected
                ? (paksha === 'Shukla' ? '#ea580c' : '#4F46E5')
                : isToday
                  ? (paksha === 'Shukla' ? '#FF9933' : '#6366F1')
                  : '#dec9ab';

              return (
                <g
                  key={pt.day}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedDay(pt.day)}
                  onMouseEnter={() => setSelectedDay(pt.day)}
                >
                  {/* Glowing Outer Indicator Ring for Today or Selected */}
                  {(isToday || isSelected) && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isToday ? 11 : 9}
                      fill="none"
                      stroke={isToday ? '#FF9933' : (paksha === 'Shukla' ? '#F59E0B' : '#6366F1')}
                      strokeWidth="1.5"
                      strokeDasharray={isToday && !isSelected ? "2,2" : "none"}
                    />
                  )}

                  {/* Hotspot Hover Target circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="14"
                    fill="transparent"
                  />

                  {/* Node Dot itself */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 6 : isToday ? 5 : 3.5}
                    fill={nodeFill}
                  />

                  {/* Floating Number Label above node */}
                  {isSelected && (
                    <g transform={`translate(${pt.x}, ${pt.y - 14})`}>
                      <rect
                        x="-9"
                        y="-8.5"
                        width="18"
                        height="15"
                        rx="3"
                        fill={paksha === 'Shukla' ? '#ea580c' : '#4F46E5'}
                      />
                      <text
                        x="0"
                        y="2.5"
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="bold"
                        fill="#FFF"
                        fontFamily="sans-serif"
                      >
                        {toHindiDigits(pt.label)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detailed Spiritual Translation Info Column */}
        <div className="sm:col-span-7 flex flex-col justify-between space-y-2 text-xs h-full">

          {/* Top Panel: Big Tithi Info Highlight */}
          <div className="p-3 rounded-2xl border border-amber-300 bg-white/95 shadow-2xs space-y-2">
            <div className="flex justify-between items-center text-[11px]">
              <span className={`font-bold ${systemColorAccent}`}>
                {isHin
                  ? `दिन ${toHindiDigits(selectedDay)} / १५ (${paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'})`
                  : `Day ${selectedDay} / 15 (${paksha === 'Shukla' ? 'Waxing' : 'Waning'})`}
              </span>
              <span className="font-bold text-[#b8860b]">
                {isHin ? `चंद्र कला: ${toHindiDigits(illuminationPct)}%` : `Illumination: ${illuminationPct}%`}
              </span>
            </div>

            <h4 className="text-lg font-bold text-[#26150b] flex items-center gap-1.5 leading-tight">
              <Moon className={`w-4 h-4 ${systemColorAccent} shrink-0 animate-pulse`} />
              <span>{activeTithiTitle}</span>
            </h4>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-100">
              <div>
                <span className="text-[10px] text-[#735641] block">
                  {isHin ? "ऊर्जा तत्त्व" : "Energy Element"}
                </span>
                <span className="text-xs font-bold text-[#26150b] block mt-0.5">
                  {isHin ? activeTithiInfo.energy : activeTithiInfo.energyEng}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#735641] block">
                  {isHin ? "अधिपति देवता" : "Presiding Deity"}
                </span>
                <span className="text-xs font-bold text-[#c2410c] block mt-0.5">
                  {isHin ? activeTithiInfo.deity : activeTithiInfo.deityEng}
                </span>
              </div>
            </div>
          </div>

          {/* Deep traditional lore text block */}
          <div className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-left flex gap-2">
            <Info className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#26150b] font-bold block mb-0.5 text-xs">
                {isHin ? "वैदिक प्रभाव व साधना निर्देश:" : "Vedic Guidance:"}
              </strong>
              <p className="leading-relaxed font-sans text-[11.5px] text-[#5c3e2b]">
                {isHin
                  ? activeTithiInfo.spirituality
                  : activeTithiInfo.spiritualityEng}
              </p>
            </div>
          </div>

          {/* Practical mental energy line */}
          <div className="text-[11.5px] font-sans font-medium text-[#26150b] leading-tight flex items-center gap-1.5 bg-amber-500/10 border border-amber-300/70 p-2 rounded-xl">
            <span className="text-sm shrink-0 select-none">🧠</span>
            <span>
              <strong className="font-bold text-[#c2410c]">
                {isHin ? `चंद्र बल ${toHindiDigits(illuminationPct)}%:` : `Lunar Energy ${illuminationPct}%:`}
              </strong>{' '}
              {isHin
                ? (paksha === 'Shukla'
                    ? 'मानसिक एकाग्रता, रचनात्मक संकल्प व नए सृजन के लिए अनुकूल।'
                    : 'मानसिक शांति, आत्मचिंतन, जप-ध्यान व विश्राम के लिए अनुकूल।')
                : (paksha === 'Shukla'
                    ? 'Fosters creative focus and new constructive resolutions.'
                    : 'Fosters inner reflection, peace, and restorative meditation.')}
            </span>
          </div>

          {/* Prompt action guidelines */}
          <div className="text-[11px] text-[#735641] font-sans leading-tight flex items-center gap-1.5 bg-white/70 border border-amber-100 p-1.5 rounded-lg">
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {isHin
                ? (paksha === 'Shukla'
                    ? 'शुक्ल पक्ष: वृद्धि काल (सृजन, मांगलिक कार्य व समृद्धि)।'
                    : 'कृष्ण पक्ष: शुद्धि काल (आंतरिक ध्यान, साधना व तनाव मुक्ति)।')
                : (paksha === 'Shukla'
                    ? 'Waxing Phase: auspicious for growth and prosperity.'
                    : 'Waning Phase: auspicious for purification and quiet reflection.')}
            </span>
          </div>

        </div>

      </div>

      {/* Bottom Status Bar matching Left Box baseline */}
      <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-xs text-[#735641]">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>{paksha === 'Shukla' ? 'शुक्ल पक्ष: चंद्र वृद्धि काल' : 'कृष्ण पक्ष: चंद्र शुद्धि काल'}</span>
        </div>
        <span className="font-bold text-[#c2410c]">
          {activeTithiTitle}
        </span>
      </div>

    </div>
  );
};

export default MoonPhaseVisualizer;
