/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangShubhAshubh
 * Section: ५. शुभ मुहूर्त एवं अशुभ काल मैट्रिक्स (Timing Matrix)
 * Box-free, pure typographic layout with clear Normal Headings (identical to Section 1)
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

export interface PanchangShubhAshubhProps {
  data: UsePanchangDataResult;
}

export const PanchangShubhAshubh: React.FC<PanchangShubhAshubhProps> = ({ data }) => {
  const { panchang, dayName } = data;

  const rahuStart = panchang.rahuKaal?.start || '०९:१८ AM';
  const rahuEnd = panchang.rahuKaal?.end || '१०:४१ AM';
  const gulikStart = panchang.gulikKaal?.start || '०६:३२ AM';
  const gulikEnd = panchang.gulikKaal?.end || '०७:५५ AM';
  const yamaStart = panchang.yamagandam?.start || '०१:२८ PM';
  const yamaEnd = panchang.yamagandam?.end || '०२:५१ PM';
  const durmuhuratStart = panchang.durmuhurat?.[0]?.start || '०६:३२ AM';
  const durmuhuratEnd = panchang.durmuhurat?.[0]?.end || '०७:१६ AM';

  // Determine Disha Shool based on day of week
  const getDishaShool = () => {
    switch (dayName) {
      case 'रविवार':
      case 'शुक्रवार':
        return { dir: 'पश्चिम', remedy: 'घी या पान खाकर यात्रा करें।' };
      case 'सोमवार':
      case 'शनिवार':
        return { dir: 'पूर्व', remedy: 'दर्पण देखकर या तिल/अदरक खाकर प्रस्थान करें।' };
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

  const shubhList = [
    {
      name: 'अभिजीत मुहूर्त',
      category: 'सर्वश्रेष्ठ मुहूर्त',
      time: '११:४२ AM - १२:२७ PM',
      details: 'भगवान श्रीहरि का प्रिय समय — समस्त शुभ एवं मांगलिक कार्यों हेतु निर्दोष व सर्वोत्तम',
      status: 'सर्वकार्य सिद्धि',
    },
    {
      name: 'ब्रह्म मुहूर्त',
      category: 'साधना काल',
      time: '०४:४९ AM - ०५:४१ AM',
      details: 'प्रातःकालीन दिव्य काल — ईश्वर आराधना, मंत्र जप, योग व ध्यान हेतु अति उत्तम',
      status: 'आत्मिक शुद्धि',
    },
    {
      name: 'अमृत काल',
      category: 'अमृत वेला',
      time: '०३:२४ AM - ०४:५४ AM',
      details: 'नवीन कार्य शुभारंभ, प्रतिष्ठान व पूजन हेतु शुभ व फलदायी',
      status: 'शुभ फलदायी',
    },
    {
      name: 'विजय मुहूर्त',
      category: 'विजय काल',
      time: '०१:५५ PM - ०२:४० PM',
      details: 'विवाद निस्तारण, व्यापारिक अनुबंध, यात्रा व विजय प्राप्ति हेतु उपयुक्त',
      status: 'सफलता दायक',
    },
    {
      name: 'गोधूलि मुहूर्त',
      category: 'सायं काल',
      time: '०५:३७ PM - ०६:०३ PM',
      details: 'सूर्यास्त कालीन पवित्र संधि — दीप प्रज्वलन व सायं आरती हेतु प्रशस्त',
      status: 'शांति व समृद्धि',
    },
  ];

  const ashubhList = [
    {
      name: 'राहुकाल',
      category: 'विशेष वर्जित',
      time: `${rahuStart} - ${rahuEnd}`,
      details: 'राहु का अनिष्ट काल — नवीन अनुबंध, यात्रा, गृहप्रवेश व शुभ कार्य सर्वथा वर्जित',
      status: 'त्याज्य काल',
      danger: true,
    },
    {
      name: 'यमगण्ड काल',
      category: 'हानि कारक',
      time: `${yamaStart} - ${yamaEnd}`,
      details: 'मृत्यु के देवता यम का काल — महत्वपूर्ण कार्यों में हानि व विघ्न की संभावना',
      status: 'सावधानी रखें',
    },
    {
      name: 'गुलिक काल',
      category: 'शनि उपग्रह काल',
      time: `${gulikStart} - ${gulikEnd}`,
      details: 'शनि देव के पुत्र गुलिक का समय — स्थायी कार्यों को छोड़कर नवीन कार्यों में सावधानी',
      status: 'मध्यम त्याज्य',
    },
    {
      name: 'दुर्मुहूर्त',
      category: 'विघ्नकारी समय',
      time: `${durmuhuratStart} - ${durmuhuratEnd}`,
      details: 'दिन का विषम मुहूर्त — नए काम शुरू करने से बचें',
      status: 'त्याज्य काल',
    },
  ];

  return (
    <section className="font-serif py-4 border-b border-[#dec9ab]/70 space-y-6">
      {/* 1. Main Section Heading (No Box) */}
      <div className="border-b border-[#dec9ab]/50 pb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b]">
          ५. शुभ मुहूर्त एवं अशुभ काल
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          अभिजित, ब्रह्म मुहूर्त एवं राहुकाल, यमगण्ड, गुलिक काल का दैनिक समय विभाजन
        </p>
      </div>

      {/* 2. Sub-Heading A: शुभ मुहूर्त */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-emerald-300/60 pb-1.5">
          <h3 className="text-lg sm:text-xl font-bold text-emerald-950 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>शुभ मुहूर्त एवं अमृत वेला</span>
          </h3>
          <span className="text-xs text-emerald-800 font-semibold">
            ✓ सर्वकार्य सिद्धि काल
          </span>
        </div>

        <div className="divide-y divide-[#dec9ab]/40">
          {shubhList.map((item, idx) => (
            <div
              key={idx}
              className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-4"
            >
              <div>
                <h4 className="text-base font-bold text-[#26150b]">
                  {item.name} <span className="text-xs font-normal text-emerald-800">({item.category})</span>
                </h4>
                <p className="text-xs text-[#735641] mt-0.5">
                  {item.details}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs shrink-0 pt-1 md:pt-0">
                <div>
                  <span className="text-[#735641]">समय: </span>
                  <span className="font-bold font-mono text-emerald-800">{item.time}</span>
                </div>
                <div className="border-l border-[#dec9ab]/60 pl-3">
                  <span className="text-[#735641]">प्रभाव: </span>
                  <span className="font-semibold text-emerald-800">✓ {item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Sub-Heading B: अशुभ काल एवं राहुकाल */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-rose-300/60 pb-1.5">
          <h3 className="text-lg sm:text-xl font-bold text-rose-950 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
            <span>अशुभ काल एवं राहुकाल</span>
          </h3>
          <span className="text-xs text-rose-800 font-semibold">
            ⚠ शुभ कार्य वर्जित काल
          </span>
        </div>

        <div className="divide-y divide-[#dec9ab]/40">
          {ashubhList.map((item, idx) => (
            <div
              key={idx}
              className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-4"
            >
              <div>
                <h4 className={`text-base font-bold ${item.danger ? 'text-rose-800' : 'text-[#26150b]'}`}>
                  {item.name} <span className="text-xs font-normal text-rose-700">({item.category})</span>
                </h4>
                <p className="text-xs text-[#735641] mt-0.5">
                  {item.details}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs shrink-0 pt-1 md:pt-0">
                <div>
                  <span className="text-[#735641]">समय: </span>
                  <span className="font-bold font-mono text-rose-800">{item.time}</span>
                </div>
                <div className="border-l border-[#dec9ab]/60 pl-3">
                  <span className="text-[#735641]">प्रभाव: </span>
                  <span className="font-semibold text-rose-800">⚠ {item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Sub-Heading C: दिशा शूल एवं परिहार (No Box) */}
      <div className="pt-2 border-t border-[#dec9ab]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div>
          <span className="font-bold text-[#c2410c] text-sm">दिशाशूल विचार: </span>
          <span className="text-[#26150b] font-medium">आज {dayName} को <strong className="text-rose-800">{disha.dir}</strong> दिशा में यात्रा करने से बचें।</span>
        </div>
        <div>
          <span className="text-[#735641]">परिहार / उपाय: </span>
          <span className="font-bold text-[#b45309]">{disha.remedy}</span>
        </div>
      </div>
    </section>
  );
};

export default PanchangShubhAshubh;
