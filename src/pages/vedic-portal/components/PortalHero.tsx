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
  toHindiYogaName,
  getRituHindi,
  getAyanaHindi,
  getTithiNatureHindi,
  getNakshatraNatureHindi,
  getPlanetLordHindi
} from '../../../components/watch';
import { useChoghadiyaData } from '../../choghadiya/hooks/useChoghadiyaData';

// Classical Vaar Significance Badges
const VAAR_NATURE_BADGE: Record<string, string> = {
  'रविवार': 'तेज संवर्धक',
  'सोमवार': 'शांति प्रदायक',
  'मंगलवार': 'साहस वर्धक',
  'बुधवार': 'बुद्धि प्रदाता',
  'गुरुवार': 'ज्ञान संवर्धक',
  'शुक्रवार': 'सौभाग्य कारक',
  'शनिवार': 'स्थिरता कारक',
};

const DISHA_SHOOL_HERO: Record<number, { direction: string; remedy: string }> = {
  0: { direction: 'पश्चिम दिशा', remedy: 'पान अथवा घी' },
  1: { direction: 'पूर्व दिशा', remedy: 'दर्पण देखकर या दूध पीकर' },
  2: { direction: 'उत्तर दिशा', remedy: 'गुड़ खाकर' },
  3: { direction: 'उत्तर दिशा', remedy: 'तिल अथवा धनिया' },
  4: { direction: 'दक्षिण दिशा', remedy: 'दही ग्रहण कर' },
  5: { direction: 'पश्चिम दिशा', remedy: 'जौ अथवा राई' },
  6: { direction: 'पूर्व दिशा', remedy: 'उड़द अथवा अदरक' }
};

export const PortalHero: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const choghadiyaData = useChoghadiyaData();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { panchang, dayName, dayRuler, activeChoghadiya, currentCity } = choghadiyaData;

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
    
    let sunriseMinutes = 6 * 60 + 4;
    if (panchang?.sunrise) {
      const parts = panchang.sunrise.split(' ');
      const [t, ampm] = parts;
      if (t) {
        let [h, m] = t.split(':').map(Number);
        if (!isNaN(h) && !isNaN(m)) {
          if (ampm?.toUpperCase() === 'PM' && h !== 12) h += 12;
          if (ampm?.toUpperCase() === 'AM' && h === 12) h = 0;
          sunriseMinutes = h * 60 + m;
        }
      }
    }

    const currentMinutes = hours * 60 + minutes;
    let diff = currentMinutes - sunriseMinutes;
    if (diff < 0) diff += 1440;
    const ghati = Math.floor(diff / 24);
    const pala = Math.floor((diff % 24) * 2.5);

    return `${toHindiDigits(ghati)} घटी ${toHindiDigits(pala)} पल`;
  }, [currentTime, panchang?.sunrise]);

  // Live Dynamic Engine Astronomical Calculations
  const tithiName = panchang?.hinduDate?.tithi?.hindiName || panchang?.hinduDate?.tithi?.name || 'कृष्ण पंचमी';
  const tithiEndTime = panchang?.hinduDate?.tithi?.endTime
    ? `${formatTimeToHindi(panchang.hinduDate.tithi.endTime, 'praatah_saayam')} तक`
    : 'अहोरात्र पर्यन्त';
  const tithiNature = getTithiNatureHindi(panchang?.hinduDate?.tithi?.value);

  const nakshatraName = panchang?.hinduDate?.nakshatra?.hindiName || panchang?.hinduDate?.nakshatra?.name || 'आर्द्रा';
  const nakshatraPada = panchang?.hinduDate?.nakshatra?.pada;
  const nakshatraLord = getPlanetLordHindi(panchang?.hinduDate?.nakshatra?.lord);
  const nakshatraSub = nakshatraPada
    ? `${toHindiDigits(nakshatraPada)} पद (${nakshatraLord})`
    : nakshatraLord;
  const nakshatraNature = getNakshatraNatureHindi(nakshatraName, panchang?.hinduDate?.nakshatra?.nature);

  const yogaName = toHindiYogaName(panchang?.hinduDate?.yoga?.hindiName || panchang?.hinduDate?.yoga?.name);
  const yogaEndTime = panchang?.hinduDate?.yoga?.endTime
    ? `${formatTimeToHindi(panchang.hinduDate.yoga.endTime, 'praatah_saayam')} तक`
    : 'सम्पूर्ण दिवस';
  const yogaNature = panchang?.hinduDate?.yoga?.isAuspicious ? 'शुभ (सिद्धिप्रद)' : 'सावधानी रखें';

  const sunriseTime = panchang?.sunrise ? formatTimeToHindi(panchang.sunrise, 'praatah_saayam') : '०६:०४ प्रातः';
  const sunsetTime = panchang?.sunset ? formatTimeToHindi(panchang.sunset, 'praatah_saayam') : '०५:१८ सायं';
  
  const rahuKaalStr = panchang?.rahuKaal
    ? formatTimeRangeToHindi(panchang.rahuKaal.start, panchang.rahuKaal.end)
    : '१०:१७ – ११:४१ पूर्वाह्न';

  const abhijitStr = panchang?.abhijit
    ? formatTimeRangeToHindi(panchang.abhijit.start, panchang.abhijit.end)
    : (dayName === 'बुधवार' ? 'बुधवार वर्ज्य' : '११:४२ – १२:२८ अपराह्न');

  const choghadiyaNameClean = cleanHindiName(activeChoghadiya?.hindiName || activeChoghadiya?.name) || 'लाभ';
  const rituText = getRituHindi(panchang?.hinduDate?.ritu);
  const ayanaText = getAyanaHindi(panchang?.hinduDate?.ayana);
  const cityName = currentCity?.nameHindi || currentCity?.name || 'काशी (वाराणसी)';
  const samvatVikram = toHindiDigits(panchang?.hinduDate?.samvatVikram || 2083);
  const samvatShaka = toHindiDigits(panchang?.hinduDate?.samvatShaka || 1948);

  const gregorianDateStr = useMemo(() => {
    const day = toHindiDigits(currentTime.getDate());
    const year = toHindiDigits(currentTime.getFullYear());
    const monthHindi = currentTime.toLocaleDateString('hi-IN', { month: 'long' });
    return `${day} ${monthHindi} ${year}`;
  }, [currentTime]);
  const vaarBadge = VAAR_NATURE_BADGE[dayName] || 'शुभ संज्ञक';

  const dayOfWeek = currentTime.getDay();
  const shool = DISHA_SHOOL_HERO[dayOfWeek] || { direction: 'पश्चिम दिशा', remedy: 'पान अथवा घी' };

  // Auspicious state check for immediate user answer
  const isCurrentTimeAuspicious = useMemo(() => {
    const type = activeChoghadiya?.type;
    return type === 'Amrit' || type === 'Shubh' || type === 'Labh' || type === 'Chal';
  }, [activeChoghadiya]);

  // Warm Dynamic Greeting based on time of day
  const greetingText = useMemo(() => {
    const hr = currentTime.getHours();
    let greet = 'सुप्रभात';
    if (hr >= 12 && hr < 16) greet = 'शुभ दोपहर';
    else if (hr >= 16 && hr < 20) greet = 'शुभ संध्या';
    else if (hr >= 20 || hr < 4) greet = 'शुभ रात्रि';
    return `${greet}! आज ${dayName} है`;
  }, [currentTime, dayName]);

  // Zero-Knowledge (आम आदमी) 5-Second Daily Summary
  const aamAadmiSummary = useMemo(() => {
    let dayNuance = 'दैनिक कार्य, आर्थिक योजना एवं भगवत्-स्मरण के लिए अनुकूल दिन।';
    if (dayName === 'रविवार') dayNuance = 'सूर्य देव उपासना, प्रशासनिक कार्य, स्वास्थ्य सुधार व मार्गदर्शन के लिए श्रेष्ठ दिन।';
    else if (dayName === 'सोमवार') dayNuance = 'शिव पूजन, मानसिक शांति, पारिवारिक सौहार्द व रचनात्मक कार्यों के लिए अनुकूल दिन।';
    else if (dayName === 'मंगलवार') dayNuance = 'श्री हनुमान साधना, साहस-पराक्रम, ऋण-मुक्ति प्रयास व तकनीकी कार्यों के लिए उत्तम दिन।';
    else if (dayName === 'बुधवार') dayNuance = 'गणेश जी की आराधना, व्यापारिक वार्ता, हिसाब-किताब व विद्या अध्ययन के लिए फलदायी दिन।';
    else if (dayName === 'गुरुवार') dayNuance = 'श्री हरि विष्णु व गुरु पूजन, ज्ञानार्जन, नए संकल्प व आर्थिक योजनाओं के लिए सर्वोत्तम दिन।';
    else if (dayName === 'शुक्रवार') dayNuance = 'माँ महालक्ष्मी पूजन, कला, वस्त्र-आभूषण क्रय व पारिवारिक सौहार्द के लिए उत्तम दिन।';
    else if (dayName === 'शनिवार') dayNuance = 'शनि देव आराधना, पीपल सेवा, दान-पुण्य व धैर्य से रुके हुए पुराने कार्य निपटाने का दिन।';

    return dayNuance;
  }, [dayName]);

  return (
    <section className="relative w-full overflow-hidden border-y border-[#d95d0f]/25 shadow-[0_20px_50px_-15px_rgba(77,51,34,0.16)] flex items-center font-serif text-[#26150b]">
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

      {/* Standardized 1320px Master Container - 100% Vertical Edge Alignment */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 xl:gap-7 items-stretch justify-center">
          
          {/* Left Column: Panchang Overview (7 Cols) - Centered Inside Box with Uniform Card Symmetry */}
          <div className="lg:col-span-7 rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#dec9ab] shadow-[0_8px_30px_rgba(77,51,34,0.08)] flex flex-col justify-between items-center bg-gradient-to-br from-[#fffbf5]/95 via-[#fffdfa]/92 to-[#fbeecc]/88 relative overflow-hidden backdrop-blur-md">
            <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
            <GoldenCornerBrackets size="md" />

            <div className="relative z-10 flex flex-col justify-between items-center h-full space-y-4 w-full my-auto text-center">
              <div className="space-y-3 w-full flex flex-col items-center">
                
                {/* Centered Top Title Area */}
                <div className="flex flex-col items-center justify-center gap-2 border-b border-[#dec9ab]/70 pb-3 w-full text-center">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 text-[#c2410c] text-xs font-bold tracking-wide border border-[#ea580c]/30 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <VedicIcon3D name="temple" size="sm" />
                    <span>{greetingText} • श्री गणेशाय नमः</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#26150b] tracking-tight">
                    दैनिक पंचांग एवं विशिष्ट मुहूर्त
                  </h1>
                  
                  {/* Gregorian Date, Vikram Samvat & Shak Samvat Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold pt-0.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[#c2410c] border border-amber-200/90 shadow-2xs">
                      📅 {gregorianDateStr}
                    </span>
                    <span className="text-[#dec9ab]">•</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[#b8860b] border border-amber-200/90 shadow-2xs">
                      विक्रम संवत {samvatVikram}
                    </span>
                    <span className="text-[#dec9ab]">•</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[#735641] border border-amber-200/90 shadow-2xs">
                      शक संवत {samvatShaka}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#735641] font-medium">
                    {cityName} • सूर्योदय कालीन काल गणना
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/85 border border-[#dec9ab] shadow-xs text-[11px] font-bold text-[#735641]">
                    <span>ऋतु एवं अयन:</span>
                    <span className="text-[#b8860b]">{rituText} • {ayanaText}</span>
                  </div>
                </div>

                {/* 3 Instant Actionable Q&A Pills for Zero-Knowledge Users */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
                  <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-50/95 to-emerald-100/70 border border-emerald-300 shadow-xs flex flex-col justify-between text-left hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span className="text-[11px] font-bold text-emerald-950 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isCurrentTimeAuspicious ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                        क्या अभी शुभ समय है?
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${isCurrentTimeAuspicious ? 'bg-emerald-200/80 text-emerald-900' : 'bg-amber-200/80 text-amber-900'}`}>
                        {isCurrentTimeAuspicious ? 'शुभ समय' : 'सावधानी'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-emerald-900 mt-1 truncate">
                      {isCurrentTimeAuspicious ? `हाँ, ${choghadiyaNameClean} मुहूर्त शुभ है` : `अभी ${choghadiyaNameClean} है, सतर्क रहें`}
                    </div>
                    <div className="text-[10px] text-emerald-800 mt-0.5 border-t border-emerald-200/60 pt-0.5 truncate">
                      अभिजित: {abhijitStr}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-gradient-to-br from-red-50/95 to-amber-50/70 border border-red-200 shadow-xs flex flex-col justify-between text-left hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span className="text-[11px] font-bold text-red-950 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-red-600 text-[14px]">warning</span>
                        आज राहु काल कब है?
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-200/80 text-red-900 font-bold">
                        वर्ज्य काल
                      </span>
                    </div>
                    <div className="text-xs font-bold text-red-900 font-mono mt-1 truncate">
                      {rahuKaalStr}
                    </div>
                    <div className="text-[10px] text-red-800 mt-0.5 border-t border-red-200/60 pt-0.5 truncate">
                      नया कार्य व क्रय-विक्रय टालें
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-50/95 to-orange-50/70 border border-amber-200 shadow-xs flex flex-col justify-between text-left hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span className="text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-amber-700 text-[14px]">explore</span>
                        आज यात्रा कहाँ न करें?
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-bold">
                        दिशा शूल
                      </span>
                    </div>
                    <div className="text-xs font-bold text-amber-900 mt-1 truncate">
                      {shool.direction} यात्रा वर्जित
                    </div>
                    <div className="text-[10px] text-amber-800 mt-0.5 border-t border-amber-200/60 pt-0.5 truncate">
                      परिहार: {shool.remedy}
                    </div>
                  </div>
                </div>

                {/* 4 Quick Limb Cards with Micro-Elevation & Uniform Centered Symmetrical Heights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 flex flex-col items-center justify-between text-center min-h-[110px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#c2410c] w-full">
                      <span>१. तिथि</span>
                      <VedicIcon3D name="tithi" size="sm" />
                    </div>
                    <div className="text-sm font-bold text-[#26150b] truncate w-full">{tithiName}</div>
                    <div className="text-[10px] text-[#735641] truncate w-full">{tithiEndTime}</div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[9px] font-bold">{tithiNature}</span>
                    <div className="text-[9.5px] text-stone-600 leading-tight border-t border-[#dec9ab]/50 pt-1 mt-0.5 w-full truncate">पूजा व नित्य कर्म उत्तम</div>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 flex flex-col items-center justify-between text-center min-h-[110px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#b8860b] w-full">
                      <span>२. वार</span>
                      <VedicIcon3D name="sun" size="sm" />
                    </div>
                    <div className="text-sm font-bold text-[#26150b] truncate w-full">{dayName}</div>
                    <div className="text-[10px] text-[#735641] truncate w-full">{dayRuler} स्वामी</div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[9px] font-bold">{vaarBadge}</span>
                    <div className="text-[9.5px] text-stone-600 leading-tight border-t border-[#dec9ab]/50 pt-1 mt-0.5 w-full truncate">सौभाग्य व उत्साह कारक</div>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 flex flex-col items-center justify-between text-center min-h-[110px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#c2410c] w-full">
                      <span>३. नक्षत्र</span>
                      <VedicIcon3D name="nakshatra" size="sm" />
                    </div>
                    <div className="text-sm font-bold text-[#26150b] truncate w-full">{nakshatraName}</div>
                    <div className="text-[10px] text-[#735641] truncate w-full">{nakshatraSub}</div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[9px] font-bold">{nakshatraNature}</span>
                    <div className="text-[9.5px] text-stone-600 leading-tight border-t border-[#dec9ab]/50 pt-1 mt-0.5 w-full truncate">शिव ध्यान व शांति रखें</div>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#dec9ab]/70 flex flex-col items-center justify-between text-center min-h-[110px] hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-xs">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#2a674c] w-full">
                      <span>४. योग</span>
                      <VedicIcon3D name="yoga" size="sm" />
                    </div>
                    <div className="text-sm font-bold text-[#26150b] truncate w-full">{yogaName}</div>
                    <div className="text-[10px] text-[#735641] truncate w-full">{yogaEndTime}</div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[9px] font-bold">{yogaNature}</span>
                    <div className="text-[9.5px] text-stone-600 leading-tight border-t border-[#dec9ab]/50 pt-1 mt-0.5 w-full truncate">सिद्धिप्रद मंगल कार्य</div>
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

                {/* आज का निष्कर्ष (Aam Aadmi 5-Second Summary Card) - Placed at the very bottom */}
                <div className="w-full p-3 rounded-2xl bg-[#fffaf0] border border-amber-300/80 shadow-xs flex items-start gap-2.5 text-left text-[#26150b]">
                  <span className="material-symbols-outlined text-[#ea580c] text-[20px] shrink-0 mt-0.5">lightbulb</span>
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-[#c2410c] uppercase tracking-wider block">
                      📌 आज का निष्कर्ष (दैनिक व्यावहारिक सार):
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#3d2414] leading-relaxed font-medium">
                      {aamAadmiSummary}
                    </p>
                  </div>
                </div>
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
