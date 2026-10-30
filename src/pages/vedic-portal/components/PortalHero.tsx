/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalHero
 * Royal Vedic Hero Section with Symmetrical Twin Panels
 * 10% Opacity Cream Parda on Temple Background
 * Vertically & Horizontally Centered Matter inside both Twin Panels
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
    <section className="relative w-full overflow-hidden border-y border-[#d95d0f]/25 shadow-[0_25px_60px_-15px_rgba(77,51,34,0.18)] min-h-[500px] flex items-center font-serif text-[#26150b]">
      {/* Sacred Temple Background Image from public/assets */}
      <img
        alt="प्राचीन वैदिक मन्दिर भित्ति चित्र एवं श्री यंत्र"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.97] contrast-[1.03]"
        src="/assets/temple_panchang_bg.jpg"
      />

      {/* 30% Opacity Cream Parda (Overlay) as strictly requested */}
      <div className="absolute inset-0 bg-[#f7f2e6] opacity-30 pointer-events-none"></div>
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full ambient-glow-gold pointer-events-none opacity-30"></div>
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.05]" />
      <GoldenCornerBrackets size="lg" />

      {/* Wide Edge-Balanced Container (7:5 Ratio) - Eliminates Extra Right Margin */}
      <div className="relative z-10 w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-8 items-stretch justify-center">
          
          {/* Left Column: Panchang Overview (7 Cols) - Centered Inside Box with Uniform Card Symmetry */}
          <div className="lg:col-span-7 rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#dec9ab] shadow-[0_8px_30px_rgba(77,51,34,0.08)] flex flex-col justify-between items-center bg-gradient-to-br from-[#fffbf5]/95 via-[#fffdfa]/92 to-[#fbeecc]/88 relative overflow-hidden backdrop-blur-md">
            <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
            <GoldenCornerBrackets size="md" />

            <div className="relative z-10 flex flex-col justify-between items-center h-full space-y-4 w-full my-auto text-center">
              <div className="space-y-3 w-full flex flex-col items-center">
                
                {/* Centered Top Title Area */}
                <div className="flex flex-col items-center justify-center gap-2 border-b border-[#dec9ab]/70 pb-3 w-full text-center">
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 border border-[#dec9ab] shadow-xs text-xs font-bold text-[#735641]">
                    <span>ऋतु एवं अयन:</span>
                    <span className="text-[#b8860b]">वसन्त ऋतु • उत्तरायण</span>
                  </div>
                </div>

                {/* 4 Quick Limb Cards with Micro-Elevation & Uniform Centered Symmetrical Heights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
                  <div className="p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 flex flex-col items-center justify-between text-center min-h-[112px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#c2410c] w-full">
                      <span>१. तिथि</span>
                      <VedicIcon3D name="tithi" size="sm" />
                    </div>
                    <div className="text-sm font-bold text-[#26150b] truncate w-full">{tithiName}</div>
                    <div className="text-[10px] text-[#735641]">सायं ०७:१४ तक</div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[9px] font-bold">शुभ (जयदा)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 flex flex-col items-center justify-between text-center min-h-[112px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#b8860b] w-full">
                      <span>२. वार</span>
                      <VedicIcon3D name="sun" size="sm" />
                    </div>
                    <div className="text-sm font-bold text-[#26150b] truncate w-full">{dayName || 'गुरुवार'}</div>
                    <div className="text-[10px] text-[#735641] truncate w-full">{dayRuler || 'देवगुरु बृहस्पति'} स्वामी</div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[9px] font-bold">ज्ञान संवर्धक</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 flex flex-col items-center justify-between text-center min-h-[112px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#c2410c] w-full">
                      <span>३. नक्षत्र</span>
                      <VedicIcon3D name="nakshatra" size="sm" />
                    </div>
                    <div className="text-sm font-bold text-[#26150b] truncate w-full">{nakshatraName}</div>
                    <div className="text-[10px] text-[#735641]">द्वितीय पद (सूर्य)</div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[9px] font-bold">ध्रुव संज्ञक</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 flex flex-col items-center justify-between text-center min-h-[112px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#2a674c] w-full">
                      <span>४. योग</span>
                      <VedicIcon3D name="yoga" size="sm" />
                    </div>
                    <div className="text-sm font-bold text-[#26150b] truncate w-full">{yogaName}</div>
                    <div className="text-[10px] text-[#735641]">दोपहर ०१:४५ तक</div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[9px] font-bold">सिद्धि प्रदाता</span>
                  </div>
                </div>

                {/* 3 Quick Muhurat Cards with Micro-Elevation & Uniform Centered Symmetrical Heights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 w-full">
                  <div className="p-3 rounded-2xl bg-emerald-50/85 backdrop-blur-md border border-emerald-300 flex flex-col items-center justify-between text-center min-h-[96px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(16,185,129,0.25)] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1.5 w-full">
                      <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-emerald-700">verified</span>
                        अभिजित मुहूर्त
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">शुभ</span>
                    </div>
                    <div className="text-sm font-bold text-emerald-900 font-mono my-0.5">{panchang?.abhijit ? formatTimeRangeToHindi(panchang.abhijit.start, panchang.abhijit.end) : '११:५८ – १२:४९ अपराह्न'}</div>
                    <div className="text-[10px] text-emerald-800">सर्वोत्तम विजयप्रद समय</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-red-50/85 backdrop-blur-md border border-red-300 flex flex-col items-center justify-between text-center min-h-[96px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(220,38,38,0.25)] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1.5 w-full">
                      <span className="text-[11px] font-bold text-red-900 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-red-700">warning</span>
                        राहु काल (वर्ज्य)
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold">अशुभ</span>
                    </div>
                    <div className="text-sm font-bold text-red-900 font-mono my-0.5">{rahuKaalStr}</div>
                    <div className="text-[10px] text-red-800">नवीन कार्य त्याज्य</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-50/85 backdrop-blur-md border border-amber-300 flex flex-col items-center justify-between text-center min-h-[96px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(217,119,6,0.25)] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1.5 w-full">
                      <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-amber-700">schedule</span>
                        सक्रिय चौघड़िया
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                        {activeChoghadiya?.type === 'Rog' || activeChoghadiya?.type === 'Kaal' || activeChoghadiya?.type === 'Udveg' ? 'अशुभ' : 'शुभ'}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-amber-900 my-0.5">
                      {choghadiyaNameClean} चौघड़िया
                    </div>
                    <div className="text-[10px] text-amber-800">दिन का प्रशस्त काल</div>
                  </div>
                </div>

                {/* Live IST & Ghati Readout Bar - Centered */}
                <div className="grid grid-cols-2 gap-2 text-center pt-1 w-full">
                  <div className="p-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 shadow-xs hover:border-[#ea580c] transition-colors flex flex-col items-center justify-center min-h-[64px]">
                    <div className="text-[10px] text-[#735641] font-semibold">भारतीय मानक समय (IST)</div>
                    <div className="text-sm font-bold text-[#c2410c] font-mono mt-0.5">{timeStr}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 shadow-xs hover:border-[#ea580c] transition-colors flex flex-col items-center justify-center min-h-[64px]">
                    <div className="text-[10px] text-[#735641] font-semibold">सनातन वैदिक कालमान</div>
                    <div className="text-sm font-bold text-[#26150b] font-mono mt-0.5">{ghatiStr}</div>
                  </div>
                </div>
              </div>

              {/* Centered Footer Strip inside Box */}
              <div className="pt-2 border-t border-[#dec9ab]/60 flex flex-wrap items-center justify-center gap-4 text-xs text-[#735641] w-full text-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ea580c] text-[16px]">wb_twilight</span>
                  <span>सूर्योदय: {sunriseTime} • सूर्यास्त: {sunsetTime}</span>
                </div>
                <span className="text-[#dec9ab]">•</span>
                <span className="font-semibold text-[#b8860b]">काशी पंचांग संवत २०८१</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sanatan Ghadi Live Dial (5 Cols) - Centered Inside Box */}
          <div className="lg:col-span-5 rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#dec9ab] shadow-[0_8px_30px_rgba(77,51,34,0.08)] flex flex-col items-center justify-center bg-gradient-to-br from-[#fffbf5]/95 via-[#fffdfa]/92 to-[#fbeecc]/88 relative overflow-hidden backdrop-blur-md">
            <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
            <GoldenCornerBrackets size="md" />

            <div className="relative z-10 w-full flex flex-col items-center justify-center h-full space-y-3 my-auto">
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
