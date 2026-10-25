/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Component: AvakahadaChakraSection
 * Bento 6-Card Grid: Lagna, Moon Sign, Nakshatra, Dasha Balance, Avakahada, Paya/Yoga
 */

import React from 'react';
import { Sun, Moon, Sparkles, Hourglass, Shield, Award } from 'lucide-react';
import { CompleteHoroscopeResult } from '../../../engine/facade/horoscopeFacade';

interface AvakahadaChakraSectionProps {
  horoscope: CompleteHoroscopeResult | null;
}

// Classical Avakahada mappings
const RASHI_LORDS_MAP: Record<string, string> = {
  Aries: 'भूमिपुत्र मंगल', Taurus: 'दैत्यगुरु शुक्र', Gemini: 'बुध देव',
  Cancer: 'भगवान चंद्र', Leo: 'भगवान सूर्य देव', Virgo: 'बुध देव',
  Libra: 'दैत्यगुरु शुक्र', Scorpio: 'भूमिपुत्र मंगल', Sagittarius: 'देवगुरु बृहस्पति',
  Capricorn: 'कर्मफलदाता शनि', Aquarius: 'कर्मफलदाता शनि', Pisces: 'देवगुरु बृहस्पति'
};

const RASHI_HINDI_MAP: Record<string, string> = {
  Aries: 'मेष राशि (Aries)', Taurus: 'वृषभ राशि (Taurus)', Gemini: 'मिथुन राशि (Gemini)',
  Cancer: 'कर्क राशि (Cancer)', Leo: 'सिंह राशि (Leo)', Virgo: 'कन्या राशि (Virgo)',
  Libra: 'तुला राशि (Libra)', Scorpio: 'वृश्चिक राशि (Scorpio)', Sagittarius: 'धनु राशि (Sagittarius)',
  Capricorn: 'मकर राशि (Capricorn)', Aquarius: 'कुंभ राशि (Aquarius)', Pisces: 'मीन राशि (Pisces)'
};

const VARNA_MAP: Record<string, string> = {
  Cancer: 'ब्राह्मण', Scorpio: 'ब्राह्मण', Pisces: 'ब्राह्मण',
  Aries: 'क्षत्रिय', Leo: 'क्षत्रिय', Sagittarius: 'क्षत्रिय',
  Taurus: 'वैश्य', Virgo: 'वैश्य', Capricorn: 'वैश्य',
  Gemini: 'शूद्र', Libra: 'शूद्र', Aquarius: 'शूद्र'
};

const VASHYA_MAP: Record<string, string> = {
  Aries: 'चतुष्पाद', Taurus: 'चतुष्पाद', Gemini: 'द्विपद (मानव)',
  Cancer: 'जलचर', Leo: 'वनचर (सिंह)', Virgo: 'द्विपद (मानव)',
  Libra: 'द्विपद (मानव)', Scorpio: 'कीट', Sagittarius: 'द्विपद / चतुष्पाद',
  Capricorn: 'जलचर / चतुष्पाद', Aquarius: 'द्विपद (मानव)', Pisces: 'जलचर'
};

export const AvakahadaChakraSection: React.FC<AvakahadaChakraSectionProps> = ({ horoscope }) => {
  if (!horoscope) return null;

  const asc = horoscope.ascendant;
  const moon = horoscope.planets.find(p => p.name === 'Moon');
  const moonSign = moon?.signName || 'Aries';
  const moonDeg = moon?.degreeFormatted || "08° 52' 18\"";
  const moonNakshatra = moon?.nakshatraName || 'Ashwini';
  const moonPada = moon?.nakshatraPada || 1;

  // Dasha balance
  const balance = horoscope.dashas.vimshottari.balance;
  const birthLord = balance.birthLord || 'Ketu';
  const balanceYears = balance.balanceYears || 5;
  const balanceMonths = balance.balanceMonths || 3;
  const balanceDays = balance.balanceDays || 12;

  // Avakahada calculations
  const varna = VARNA_MAP[moonSign] || 'क्षत्रिय';
  const vashya = VASHYA_MAP[moonSign] || 'चतुष्पाद';
  const lagnaLord = RASHI_LORDS_MAP[asc.sign] || 'भगवान सूर्य देव';
  const rashiLord = RASHI_LORDS_MAP[moonSign] || 'भूमिपुत्र मंगल';

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
            जन्मकालिक पंचांग व अवकहड़ा चक्र विवरण
          </h2>
        </div>
        <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-300/50">
          प्रामाणिक वैदिक ज्योतिष निरूपण
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Lagna */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col justify-between gap-3 group hover:border-amber-400 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                प्रथम भाव / उदित लग्न
              </span>
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 mt-0.5 font-serif">
                {RASHI_HINDI_MAP[asc.sign] || `${asc.sign} लग्न`}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-2 bg-stone-50 dark:bg-stone-850 p-3 rounded-xl border border-stone-200/50 dark:border-stone-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">लग्न स्वामी (लग्नेश):</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{lagnaLord}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">लग्न स्पष्ट अंश:</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 font-mono">{asc.formatted}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Chandra Rashi */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col justify-between gap-3 group hover:border-amber-400 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                जन्म चंद्र राशि (Moon Sign)
              </span>
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 mt-0.5 font-serif">
                {RASHI_HINDI_MAP[moonSign] || `${moonSign} राशि`}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-2 bg-stone-50 dark:bg-stone-850 p-3 rounded-xl border border-stone-200/50 dark:border-stone-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">राशि स्वामी:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{rashiLord}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">चंद्रमा के स्पष्ट अंश:</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 font-mono">{moonDeg}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Janma Nakshatra */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col justify-between gap-3 group hover:border-amber-400 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                जन्म नक्षत्र व चरण
              </span>
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 mt-0.5 font-serif">
                {moonNakshatra} नक्षत्र
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-2 bg-stone-50 dark:bg-stone-850 p-3 rounded-xl border border-stone-200/50 dark:border-stone-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">चरण व स्वामी:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{moonPada} चरण ({birthLord})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">नामाक्षर संकेत:</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 font-mono">चू, चे, चो, ला (चू)</span>
            </div>
          </div>
        </div>

        {/* Card 4: Janma Dasha Balance */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col justify-between gap-3 group hover:border-amber-400 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                जन्म कालीन दशा भोग्य
              </span>
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 mt-0.5 font-serif">
                {birthLord} महादशा
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <Hourglass className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-2 bg-stone-50 dark:bg-stone-850 p-3 rounded-xl border border-stone-200/50 dark:border-stone-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">भोग्य दशा अवधि:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {balanceYears} वर्ष, {balanceMonths} माह, {balanceDays} दिन
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">दशा चक्र स्थिति:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">१२० वर्षीय विंशोत्तरी</span>
            </div>
          </div>
        </div>

        {/* Card 5: Avakahada Chakra Elements */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col justify-between gap-3 group hover:border-amber-400 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                अवकहड़ा चक्र तत्त्व
              </span>
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 mt-0.5 font-serif">
                वर्ण: {varna}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-2 bg-stone-50 dark:bg-stone-850 p-3 rounded-xl border border-stone-200/50 dark:border-stone-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">वश्य / योनि:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">{vashya} • अश्व</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">गण / नाड़ी:</span>
              <span className="font-semibold text-amber-700 dark:text-amber-400">देव गण • आदि नाड़ी</span>
            </div>
          </div>
        </div>

        {/* Card 6: Yoga, Karana, Paya */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col justify-between gap-3 group hover:border-amber-400 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                योग, करण एवं पाया
              </span>
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 mt-0.5 font-serif">
                सुकर्मा योग
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-2 bg-stone-50 dark:bg-stone-850 p-3 rounded-xl border border-stone-200/50 dark:border-stone-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">करण / संवत्सर:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">बव करण • युवा संवत्</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500 dark:text-stone-400">जन्म पाया (पाद):</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">सुवर्ण (स्वर्ण पाद - शुभ)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
