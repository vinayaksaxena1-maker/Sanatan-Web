/**
 * Sanatan Web (सनातन घड़ी)
 * Component: SadeSatiCalculator
 * Shani Sade Sati & Dhaiya Calculator with Live Astrological Transit & Vedic Remedies
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseUtilitiesDataResult } from '../hooks/useUtilitiesData';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { Star, ShieldAlert, CheckCircle2, AlertTriangle, BookOpen, Flame } from 'lucide-react';

interface SadeSatiCalculatorProps {
  data: UseUtilitiesDataResult;
}

export const SadeSatiCalculator: React.FC<SadeSatiCalculatorProps> = ({ data }) => {
  const {
    selectedMoonSignIndex,
    setSelectedMoonSignIndex,
    sadeSatiResult,
    sadeSatiTone,
    currentSaturnSignIndex,
    rashiList,
  } = data;

  const currentRashi = rashiList[selectedMoonSignIndex];
  const saturnRashi = rashiList[currentSaturnSignIndex];

  return (
    <div className="space-y-6">
      {/* 1. Selector & Result Status Card */}
      <div className="bg-white/95 dark:bg-stone-900/95 rounded-2xl p-6 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-4">
          <div className="flex items-center gap-2">
            <VedicIcon3D name="kalash" size={20} className="text-amber-600" />
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                शनि साढ़े साती एवं ढैया खगोलीय गणक
              </h2>
              <p className="text-xs text-stone-500">
                वर्तमान में शनि देव <strong>{saturnRashi.hindi} ({saturnRashi.english})</strong> राशि में गोचर कर रहे हैं।
              </p>
            </div>
          </div>

          {/* Janma Moon Rashi Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 whitespace-nowrap">
              अपनी जन्म चंद्र राशि चुनें:
            </label>
            <select
              value={selectedMoonSignIndex}
              onChange={(e) => setSelectedMoonSignIndex(Number(e.target.value))}
              className="py-2 px-3 rounded-xl border border-amber-300 dark:border-stone-700 bg-amber-50/40 dark:bg-stone-800 text-xs font-bold text-amber-950 dark:text-amber-200 focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {rashiList.map((r) => (
                <option key={r.index} value={r.index}>
                  {r.hindi} ({r.english})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Sade Sati Status Showcase Card */}
        <div className={`p-5 rounded-2xl border ${sadeSatiTone.colorClass} space-y-3`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {sadeSatiResult.isSadeSatiActive ? (
                <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0" />
              ) : sadeSatiResult.isDhaiyaActive ? (
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              )}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                  {currentRashi.hindi} राशि हेतु वर्तमान स्थिति
                </span>
                <h3 className="text-lg font-extrabold font-serif text-stone-900 dark:text-stone-100">
                  {sadeSatiTone.title}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block">
                उपाय प्राथमिकता
              </span>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                {sadeSatiTone.remedyPriority}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-serif pt-1 border-t border-amber-200/50 dark:border-amber-900/30">
            {sadeSatiResult.description}
          </p>
        </div>
      </div>

      {/* 2. Three Phases of Sade Sati Infographic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Phase 1 */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-amber-200/60 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
              प्रथम चरण (२.५ वर्ष)
            </span>
            <span className="text-xs font-mono font-semibold text-stone-500">१२वां भाव</span>
          </div>
          <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
            उदय काल (मस्तक पर प्रभाव)
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            अनावश्यक व्यय, अनिद्रा, विदेश यात्रा, एवं मानसिक तनाव। कर्म की शुद्धि और अनुशासन की परीक्षा का समय।
          </p>
        </div>

        {/* Phase 2 */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-amber-200/60 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-900">
              द्वितीय चरण (२.५ वर्ष)
            </span>
            <span className="text-xs font-mono font-semibold text-stone-500">जन्म राशि</span>
          </div>
          <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
            शिखर काल (हृदय/उदर पर प्रभाव)
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            अत्यधिक शारीरिक व मानसिक श्रम। जीवन का महा-परिवर्तन, अहंकार का नाश और वास्तविक सामर्थ्य की जागृति।
          </p>
        </div>

        {/* Phase 3 */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-amber-200/60 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900">
              तृतीय चरण (२.५ वर्ष)
            </span>
            <span className="text-xs font-mono font-semibold text-stone-500">द्वितीय भाव</span>
          </div>
          <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
            अस्त काल (चरण/पैरों पर प्रभाव)
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            उतरती साढ़े साती। धन संचय में सुधार, पारिवारिक संतुलन और दीर्घकालिक अनुभव से स्थायी यश की प्राप्ति।
          </p>
        </div>
      </div>

      {/* 3. Classical Vedic Shani Shanti Remedies */}
      <div className="bg-gradient-to-br from-[#fff7ed] via-[#fef3c7]/20 to-[#fffbeb] rounded-2xl p-5 sm:p-6 border border-amber-900/10 space-y-4">
        <div className="flex items-center gap-2 border-b border-amber-900/10 pb-3">
          <Flame className="w-5 h-5 text-amber-700" />
          <h3 className="text-base font-bold font-serif text-[#26150b] dark:text-stone-100">
            शनि कृपा एवं पीड़ा शमन हेतु शास्त्रोक्त वैदिक उपाय
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white/90 dark:bg-stone-900/90 rounded-xl border border-amber-200/50 space-y-1">
            <span className="font-bold text-amber-950 dark:text-amber-200 block">१. दशरथ कृत शनि स्तोत्र</span>
            <p className="text-stone-600 dark:text-stone-400">
              राजा दशरथ द्वारा रचित स्तोत्र का शनिवार को पाठ करने से शनि देव अत्यंत प्रसन्न होकर पीड़ा हर लेते हैं।
            </p>
          </div>

          <div className="p-3 bg-white/90 dark:bg-stone-900/90 rounded-xl border border-amber-200/50 space-y-1">
            <span className="font-bold text-amber-950 dark:text-amber-200 block">२. छाया दान (कटोरी में तेल)</span>
            <p className="text-stone-600 dark:text-stone-400">
              शनिवार प्रातः लोहे या कांसे के पात्र में सरसों का तेल भरकर उसमें अपना मुख देखकर दान करें।
            </p>
          </div>

          <div className="p-3 bg-white/90 dark:bg-stone-900/90 rounded-xl border border-amber-200/50 space-y-1">
            <span className="font-bold text-amber-950 dark:text-amber-200 block">३. हनुमान चालीसा व सुंदरकांड</span>
            <p className="text-stone-600 dark:text-stone-400">
              शनि देव ने श्री हनुमान जी को वचन दिया था कि वे उनके भक्तों को कभी पीड़ा नहीं देंगे।
            </p>
          </div>

          <div className="p-3 bg-white/90 dark:bg-stone-900/90 rounded-xl border border-amber-200/50 space-y-1">
            <span className="font-bold text-amber-950 dark:text-amber-200 block">४. शमी वृक्ष व पीपल पूजन</span>
            <p className="text-stone-600 dark:text-stone-400">
              शनिवार सायंकाल शमी अथवा पीपल वृक्ष के नीचे सरसों या तिल के तेल का दीपक प्रज्वलित करें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
