/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalHero
 * Royal Vedic Hero Section with 4-Layer Analog Watch & Unified Smart Cards
 * Light Chandan Frosted Glass Theme on Sacred Temple Backdrop (No Black Overlay)
 * Pure Hindi Devanagari Localization
 */

import React, { useState, useEffect, useMemo } from 'react';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';
import {
  LiveMuhuratWatchCard,
  formatTimeToHindi,
  formatTimeRangeToHindi,
  cleanHindiName,
  toHindiDigits,
  toHindiYogaName
} from '../../../components/watch';
import { useChoghadiyaData } from '../../choghadiya/hooks/useChoghadiyaData';

export const PortalHero: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const choghadiyaData = useChoghadiyaData();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { panchang, dayName, dayRuler, activeChoghadiya } = choghadiyaData;

  // Real-time Hindi Time String (IST)
  const timeStr = useMemo(() => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const ampm = hours >= 12 ? 'अपराह्न' : 'पूर्वाह्न';
    const h12 = hours % 12 || 12;

    return `${toHindiDigits(String(h12).padStart(2, '0'))}:${toHindiDigits(String(minutes).padStart(2, '0'))}:${toHindiDigits(String(seconds).padStart(2, '0'))} ${ampm}`;
  }, [currentTime]);

  // Real-time Ghati calculation from Sunrise
  const ghatiStr = useMemo(() => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    
    let sunriseMinutes = 6 * 60 + 14;
    if (panchang?.sunrise) {
      const parts = panchang.sunrise.split(' ');
      const [t] = parts;
      if (t) {
        const [h, m] = t.split(':').map(Number);
        if (!isNaN(h) && !isNaN(m)) sunriseMinutes = h * 60 + m;
      }
    }

    const currentMinutes = hours * 60 + minutes;
    let diff = currentMinutes - sunriseMinutes;
    if (diff < 0) diff += 1440;
    const ghati = Math.floor(diff / 24);
    const pala = Math.floor((diff % 24) * 2.5);

    return `${toHindiDigits(ghati)} घटी ${toHindiDigits(pala)} पल`;
  }, [currentTime, panchang?.sunrise]);

  // Pure Hindi Devanagari Result Values
  const tithiName = panchang?.hinduDate?.tithi?.hindiName || panchang?.hinduDate?.tithi?.name || 'शुक्ल त्रयोदशी';
  const nakshatraName = panchang?.hinduDate?.nakshatra?.hindiName || panchang?.hinduDate?.nakshatra?.name || 'उत्तर फाल्गुनी';
  const yogaName = toHindiYogaName(panchang?.hinduDate?.yoga?.hindiName || panchang?.hinduDate?.yoga?.name);
  
  const sunriseTime = panchang?.sunrise ? formatTimeToHindi(panchang.sunrise, 'praatah_saayam') : '०६:१४ प्रातः';
  const sunsetTime = panchang?.sunset ? formatTimeToHindi(panchang.sunset, 'praatah_saayam') : '०६:४१ सायं';
  
  const rahuKaalStr = panchang?.rahuKaal
    ? formatTimeRangeToHindi(panchang.rahuKaal.start, panchang.rahuKaal.end)
    : '०४:३० – ०६:०० अपराह्न';

  const choghadiyaNameClean = cleanHindiName(activeChoghadiya?.hindiName || activeChoghadiya?.name) || 'अमृत';

  return (
    <section className="relative w-full overflow-hidden border-y border-[#d95d0f]/20 shadow-[0_20px_48px_-12px_rgba(194,65,12,0.14)] min-h-[480px] flex items-center font-serif text-[#26150b]">
      {/* Sacred Temple Background Image from public/assets */}
      <img
        alt="प्राचीन वैदिक मन्दिर भित्ति चित्र एवं श्री यंत्र"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
        src="/assets/temple_panchang_bg.jpg"
      />

      {/* Luminous Warm Chandan Frosted Glass Overlay (Zero Black Darkness) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff9f0]/95 via-[#fff8ed]/90 to-[#fbeecc]/85 backdrop-blur-[6px]"></div>
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full ambient-glow-gold pointer-events-none opacity-60"></div>
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.07]" />
      <GoldenCornerBrackets size="lg" />

      {/* Edge-to-Edge Content Container aligned with Navbar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Panchang Overview (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dec9ab]/70 pb-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 text-[#c2410c] text-xs font-bold tracking-wide border border-[#ea580c]/30 shadow-xs">
                    <VedicIcon3D name="temple" size="sm" />
                    <span>श्री गणेशाय नमः • आज का दैनिक पंचांग</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#26150b] tracking-tight">
                    दैनिक पंचांग एवं विशिष्ट मुहूर्त
                  </h1>
                  <p className="text-xs sm:text-sm text-[#735641] font-medium">
                    काशीस्थ सूर्योदय कालीन वैदिक काल गणना • विक्रम संवत २०८१ (क्रोधी संवत्सर)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-white/85 border border-[#dec9ab] shadow-xs text-right hover:border-[#ea580c] transition-colors">
                    <div className="text-[10px] text-[#735641] font-semibold">ऋतु एवं अयन</div>
                    <div className="text-xs font-bold text-[#b8860b]">वसन्त ऋतु • उत्तरायण</div>
                  </div>
                </div>
              </div>

              {/* 4 Quick Limb Cards with Micro-Elevation & 3D Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-[#c2410c]">
                    <span>१. तिथि</span>
                    <VedicIcon3D name="tithi" size="sm" />
                  </div>
                  <div className="text-sm font-bold text-[#26150b] truncate">{tithiName}</div>
                  <div className="text-[10px] text-[#735641]">सायं ०७:१४ तक</div>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[9px] font-bold">शुभ (जयदा)</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-[#b8860b]">
                    <span>२. वार</span>
                    <VedicIcon3D name="sun" size="sm" />
                  </div>
                  <div className="text-sm font-bold text-[#26150b] truncate">{dayName || 'गुरुवार'}</div>
                  <div className="text-[10px] text-[#735641] truncate">{dayRuler || 'देवगुरु बृहस्पति'} स्वामी</div>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[9px] font-bold">ज्ञान संवर्धक</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-[#c2410c]">
                    <span>३. नक्षत्र</span>
                    <VedicIcon3D name="nakshatra" size="sm" />
                  </div>
                  <div className="text-sm font-bold text-[#26150b] truncate">{nakshatraName}</div>
                  <div className="text-[10px] text-[#735641]">द्वितीय पद (सूर्य)</div>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 text-[9px] font-bold">ध्रुव संज्ञक</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-[#2a674c]">
                    <span>४. योग</span>
                    <VedicIcon3D name="yoga" size="sm" />
                  </div>
                  <div className="text-sm font-bold text-[#26150b] truncate">{yogaName}</div>
                  <div className="text-[10px] text-[#735641]">दोपहर ०१:४५ तक</div>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[9px] font-bold">सिद्धि प्रदाता</span>
                </div>
              </div>

              {/* 3 Quick Muhurat Cards with Micro-Elevation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-emerald-50/85 backdrop-blur-md border border-emerald-300 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(16,185,129,0.25)] transition-all duration-300 cursor-pointer shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-emerald-700">verified</span>
                      अभिजित मुहूर्त
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">शुभ</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-900 font-mono">११:५८ – १२:४९ अपराह्न</div>
                  <div className="text-[10px] text-emerald-800">सर्वोत्तम विजयप्रद समय</div>
                </div>

                <div className="p-3 rounded-2xl bg-red-50/85 backdrop-blur-md border border-red-300 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(220,38,38,0.25)] transition-all duration-300 cursor-pointer shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-red-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-red-700">warning</span>
                      राहु काल (वर्ज्य)
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-100 text-red-800 font-bold">अशुभ</span>
                  </div>
                  <div className="text-sm font-bold text-red-900 font-mono">{rahuKaalStr}</div>
                  <div className="text-[10px] text-red-800">नवीन कार्य त्याज्य</div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/85 backdrop-blur-md border border-amber-300 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(217,119,6,0.25)] transition-all duration-300 cursor-pointer shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-amber-700">schedule</span>
                      सक्रिय चौघड़िया
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                      {activeChoghadiya?.type === 'Rog' || activeChoghadiya?.type === 'Kaal' || activeChoghadiya?.type === 'Udveg' ? 'अशुभ' : 'शुभ'}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-amber-900">
                    {choghadiyaNameClean} चौघड़िया
                  </div>
                  <div className="text-[10px] text-amber-800">दिन का प्रशस्त काल</div>
                </div>
              </div>

              {/* Live IST & Ghati Readout Bar */}
              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 shadow-xs hover:border-[#ea580c] transition-colors">
                  <div className="text-[10px] text-[#735641] font-semibold">भारतीय मानक समय (IST)</div>
                  <div className="text-sm font-bold text-[#c2410c] font-mono">{timeStr}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 shadow-xs hover:border-[#ea580c] transition-colors">
                  <div className="text-[10px] text-[#735641] font-semibold">सनातन वैदिक कालमान</div>
                  <div className="text-sm font-bold text-[#26150b] font-mono">{ghatiStr}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#dec9ab]/60 flex items-center justify-between text-xs text-[#735641]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ea580c] text-[16px]">wb_twilight</span>
                <span>सूर्योदय: {sunriseTime} • सूर्यास्त: {sunsetTime}</span>
              </div>
              <span className="font-semibold text-[#b8860b]">काशी पंचांग संवत २०८१</span>
            </div>
          </div>

          {/* Right Column: Sanatan Ghadi Live Dial with Bottom Smart Cards (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl p-4 sm:p-5 border border-[#dec9ab] shadow-sm flex flex-col items-center justify-start bg-gradient-to-br from-[#fffbf5]/95 to-[#fbeecc]/85 relative overflow-hidden backdrop-blur-sm">
            <SacredGeometryWatermark variant="swastik" className="opacity-[0.08]" />
            <GoldenCornerBrackets size="md" />

            <div className="relative z-10 w-full">
              <LiveMuhuratWatchCard
                clockTime={currentTime}
                choghadiyaList={panchang.choghadiya}
                activeChoghadiyaIndex={choghadiyaData.activeChoghadiyaIndex}
                horaList={choghadiyaData.allHoras}
                activeHora={choghadiyaData.activeHora}
                sunriseTimeStr={sunriseTime}
                sunsetTimeStr={sunsetTime}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PortalHero;
