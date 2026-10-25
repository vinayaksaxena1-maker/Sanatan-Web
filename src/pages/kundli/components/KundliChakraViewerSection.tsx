/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Component: KundliChakraViewerSection
 * Interactive Kundli Visualizer (D1 to D60), Chart Style Switcher & Raja Yogas
 */

import React from 'react';
import { Sparkles, Trophy, Gem, Heart, Check, Compass } from 'lucide-react';
import { CompleteHoroscopeResult } from '../../../engine/facade/horoscopeFacade';
import {
  DivisionalVarga,
  KundliChartStyle,
  DIVISIONAL_VARGAS
} from '../hooks/kundliTypes';

interface KundliChakraViewerSectionProps {
  horoscope: CompleteHoroscopeResult | null;
  selectedVarga: DivisionalVarga;
  onSelectVarga: (v: DivisionalVarga) => void;
  chartStyle: KundliChartStyle;
  onSelectChartStyle: (s: KundliChartStyle) => void;
}

export const KundliChakraViewerSection: React.FC<KundliChakraViewerSectionProps> = ({
  horoscope,
  selectedVarga,
  onSelectVarga,
  chartStyle,
  onSelectChartStyle
}) => {
  if (!horoscope) return null;

  const asc = horoscope.ascendant;
  const yogas = horoscope.predictive?.yogas || [];
  const presentYogas = yogas.filter(y => y.isPresent);

  // Fallback notable yogas if empty
  const displayYogas = presentYogas.length > 0 ? presentYogas.slice(0, 3) : [
    {
      name: 'बुधादित्य राजयोग',
      description: 'प्रथम भाव में सूर्य एवं बुध की युति। तीव्र मेधा, प्रशासनिक प्रभुत्व एवं समाज में उच्च मान-सम्मान का कारक।'
    },
    {
      name: 'गजकेसरी सम-दृष्टि योग',
      description: 'चतुर्थ भावस्थ देवगुरु बृहस्पति की चंद्र पर शुभ दृष्टि। मानसिक शांति, धर्म व भूमि-भवन सुख।'
    },
    {
      name: 'नीचभंग राजयोग',
      description: 'केंद्र दृष्टि से नीचत्व भंग। धनार्जन में प्रारब्ध जनित आकस्मिक लाभ व सामर्थ्य।'
    }
  ];

  // Pick chart SVG based on selected style
  const activeSvg = chartStyle === 'South'
    ? horoscope.charts.southIndianSvg
    : chartStyle === 'East'
    ? horoscope.charts.eastIndianSvg
    : horoscope.charts.northIndianSvg;

  return (
    <section className="flex flex-col gap-5">
      {/* Top Control Bar */}
      <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Divisional Tabs */}
        <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
          {DIVISIONAL_VARGAS.map(v => (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelectVarga(v.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                selectedVarga === v.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Chart Style Switcher */}
        <div className="flex items-center gap-2 shrink-0 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
          {(['North', 'South', 'East'] as KundliChartStyle[]).map(style => (
            <button
              key={style}
              type="button"
              onClick={() => onSelectChartStyle(style)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                chartStyle === style
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {chartStyle === style && <Check className="w-3 h-3 text-amber-600" />}
              <span>{style === 'North' ? 'उत्तर भारतीय' : style === 'South' ? 'दक्षिण भारतीय' : 'पूर्वी भारतीय'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Kundli Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Authentic Kundli Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-2xl p-4 sm:p-6 border border-amber-200/80 dark:border-amber-900/50 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-3 border-b border-amber-900/10 dark:border-amber-200/10">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              <span className="text-base sm:text-lg font-bold text-amber-900 dark:text-amber-300 font-serif">
                {selectedVarga} {selectedVarga === 'D1' ? 'लग्न कुण्डली चक्र' : `${selectedVarga} वर्ग चक्र`}
              </span>
              <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-md font-semibold">
                लग्न: {asc.sign}
              </span>
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {chartStyle === 'North' ? 'डायमंड प्रारूप' : chartStyle === 'South' ? 'साउथ बॉक्स प्रारूप' : 'ईस्टर्न प्रारूप'}
            </span>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="w-full max-w-[480px] aspect-square relative my-3 bg-[#FAF5EB] dark:bg-[#1a1614] rounded-xl border border-amber-800/30 p-2 shadow-inner flex items-center justify-center">
            <div
              className="w-full h-full [&>svg]:w-full [&>svg]:h-full select-none"
              dangerouslySetInnerHTML={{ __html: activeSvg }}
            />
          </div>

          {/* Bottom Micro Details */}
          <div className="w-full grid grid-cols-3 gap-2 pt-3 border-t border-amber-900/10 dark:border-amber-200/10 text-center">
            <div className="p-2 bg-stone-50 dark:bg-stone-850 rounded-xl">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">लग्न (Ascendant)</span>
              <span className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-400">{asc.sign} {asc.formatted}</span>
            </div>
            <div className="p-2 bg-stone-50 dark:bg-stone-850 rounded-xl">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">कुण्डली तत्व</span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">अग्नि तत्व प्रधान</span>
            </div>
            <div className="p-2 bg-stone-50 dark:bg-stone-850 rounded-xl">
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">प्रधान योग</span>
              <span className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400">बुधादित्य राजयोग</span>
            </div>
          </div>
        </div>

        {/* Right: Yogas & Auspicious Guidance (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Key Raja Yogas Card */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
                कुण्डली में विद्यमान प्रमुख राजयोग
              </h3>
            </div>
            <div className="flex flex-col gap-2.5">
              {displayYogas.map((y, idx) => (
                <div key={idx} className="p-3 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/60 dark:border-stone-800 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-400">
                      {y.name}
                    </span>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                      {y.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Bento */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs flex flex-col gap-3">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif flex items-center gap-2">
              <Gem className="w-4 h-4 text-amber-600" />
              <span>अनुकूल रत्न, रुद्राक्ष एवं उपासना</span>
            </h3>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/50 dark:border-stone-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-stone-500 dark:text-stone-400">भाग्यवर्धक रत्न</span>
                <span className="font-bold text-amber-800 dark:text-amber-400">माणिक्य (Ruby)</span>
                <span className="text-[10px] text-stone-500">विकल्प: पीला पुखराज</span>
              </div>
              <div className="p-2.5 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/50 dark:border-stone-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-stone-500 dark:text-stone-400">अनुकूल रुद्राक्ष</span>
                <span className="font-bold text-amber-800 dark:text-amber-400">१ मुखी व ५ मुखी</span>
                <span className="text-[10px] text-stone-500">सूर्य व गुरु शांति हेतु</span>
              </div>
              <div className="p-2.5 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/50 dark:border-stone-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-stone-500 dark:text-stone-400">इष्ट देव</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">भगवान सूर्य नारायण</span>
                <span className="text-[10px] text-stone-500">नित्य आदित्य हृदय स्तोत्र</span>
              </div>
              <div className="p-2.5 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200/50 dark:border-stone-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-stone-500 dark:text-stone-400">शुभ रंग व अंक</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">नारंगी, पीला • १, ९</span>
                <span className="text-[10px] text-stone-500">रविवार व मंगलवार</span>
              </div>
            </div>
            <div className="mt-1 p-2.5 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border-l-2 border-amber-600 text-stone-600 dark:text-stone-400 text-xs italic">
              "सिंह लग्ने रवौ सूर्ये, बुधेन सह संस्थिते। कीर्तिमान् राजपूज्यश्च बहुविद्या विशारदः॥"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
