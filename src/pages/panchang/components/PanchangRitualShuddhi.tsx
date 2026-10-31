/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangRitualShuddhi.tsx
 * Section: निवास, चक्र एवं अनुष्ठान विचार (Ritual Shuddhi)
 * शिववास, अग्निवास, भद्रा वास, दिशा शूल, चन्द्र वास, राहु वास, कुम्भ चक्र, होमाहुति
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangRitualShuddhi: React.FC<Props> = ({ data }) => {
  const { panchang, deepAnalysis } = data;
  const { shivaVaas, agniVaas, bhadra } = panchang;
  const { chandraVasa, rahuVasa, kumbhaChakra, netrama, jeevanama, homahuti } = deepAnalysis;

  // Day based Disha Shool
  const day = data.selectedDate.getDay();
  const dishaShoolMap = [
    { dir: 'पश्चिम (West)', parihar: 'पान खाकर प्रस्थान करें' },   // Sun
    { dir: 'पूर्व (East)', parihar: 'दर्पण देखकर प्रस्थान करें' },    // Mon
    { dir: 'उत्तर (North)', parihar: 'गुड़ खाकर प्रस्थान करें' },    // Tue
    { dir: 'उत्तर (North)', parihar: 'तिल या धनिया खाकर प्रस्थान करें' }, // Wed
    { dir: 'दक्षिण (South)', parihar: 'दही खाकर प्रस्थान करें' },   // Thu
    { dir: 'पश्चिम (West)', parihar: 'जौ खाकर प्रस्थान करें' },     // Fri
    { dir: 'पूर्व (East)', parihar: 'अदरक या उड़द खाकर प्रस्थान करें' }, // Sat
  ];
  const dishaShool = dishaShoolMap[day] || dishaShoolMap[0];

  return (
    <section className="bg-gradient-to-br from-[#fffbf4] via-[#fdf7ec] to-[#fbf3e2] rounded-3xl p-6 sm:p-8 border border-[#d97706]/25 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#d97706]/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ea580c] to-[#f59e0b] text-white flex items-center justify-center font-bold text-xl shadow-md">
            ॐ
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#451a03] font-serif tracking-wide">
              निवास, चक्र एवं अनुष्ठान विचार (Ritual Shuddhi)
            </h2>
            <p className="text-xs sm:text-sm text-[#78350f]/80">
              रुद्राभिषेक, हवन, भद्रा शुद्धि, दिशा शूल एवं दिशा वास का शास्त्रीय निर्णय
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-semibold bg-[#ea580c]/10 text-[#c2410c] border border-[#ea580c]/25">
          कर्मकाण्ड एवं पूजा विधान
        </span>
      </div>

      {/* Primary 3 Pillars: Shivavasa, Agnivasa, Bhadravasa */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* 1. Shivavasa */}
        <div className={`p-5 rounded-2xl border transition-all ${
          shivaVaas?.isAuspicious
            ? 'bg-emerald-50/70 border-emerald-500/30 text-emerald-950'
            : 'bg-amber-50/70 border-amber-500/30 text-amber-950'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#9a3412]">
              रुद्राभिषेक विचार
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              shivaVaas?.isAuspicious ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
            }`}>
              {shivaVaas?.isAuspicious ? '✓ अभिषेक शुभ' : '⚠ विचारणीय'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif mb-1 text-[#451a03]">
            शिववास: {shivaVaas?.residenceHindi || 'कैलाश पर'}
          </h3>
          <p className="text-xs text-[#78350f]/85 leading-relaxed">
            {shivaVaas?.description ||
              (shivaVaas?.isAuspicious
                ? 'आज भगवान शिव शुभ स्थान पर विराजमान हैं, रुद्राभिषेक व महामृत्युंजय अनुष्ठान अत्यंत फलदायी है।'
                : 'विशेष कामनापरक रुद्राभिषेक हेतु ज्योतिषी से परामर्श करें अथवा पार्थिव शिव पूजन करें।')}
          </p>
        </div>

        {/* 2. Agnivasa */}
        <div className={`p-5 rounded-2xl border transition-all ${
          agniVaas?.isAuspicious
            ? 'bg-emerald-50/70 border-emerald-500/30 text-emerald-950'
            : 'bg-rose-50/70 border-rose-500/30 text-rose-950'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#9a3412]">
              हवन / यज्ञ विचार
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              agniVaas?.isAuspicious ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}>
              {agniVaas?.isAuspicious ? '✓ हवन शुभ' : '✗ हवन वर्जित'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif mb-1 text-[#451a03]">
            अग्निवास: {agniVaas?.residenceHindi || 'पृथ्वी पर'}
          </h3>
          <p className="text-xs text-[#78350f]/85 leading-relaxed">
            {agniVaas?.description ||
              (agniVaas?.isAuspicious
                ? 'अग्नि देव पृथ्वी पर उपस्थित हैं, दैनिक अथवा विशेष हवन सुख-समृद्धि व फलदायक होगा।'
                : 'अग्नि का वास आकाश या पाताल में है; नित्य हवन को छोड़कर विशेष काम्य हवन में आहुति से बचें।')}
          </p>
        </div>

        {/* 3. Bhadra (Vishti) */}
        <div className={`p-5 rounded-2xl border transition-all ${
          bhadra?.active
            ? 'bg-red-50/80 border-red-500/30 text-red-950'
            : 'bg-emerald-50/70 border-emerald-500/30 text-emerald-950'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#9a3412]">
              भद्रा (विष्टि करण)
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              bhadra?.active ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-600 text-white'
            }`}>
              {bhadra?.active ? '⚠ भद्रा प्रभावी' : '✓ भद्रा रहित'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif mb-1 text-[#451a03]">
            {bhadra?.active ? `वास: ${bhadra.vasHindi || 'स्वर्ग / पाताल'}` : 'आज भद्रा का दोष नहीं है'}
          </h3>
          <p className="text-xs text-[#78350f]/85 leading-relaxed">
            {bhadra?.active
              ? `समाप्ति काल: ${bhadra.endTime || 'शीघ्र'} | मुख: ${bhadra.mukha || '--'}, पुच्छ: ${bhadra.puchha || '--'}। भद्रा काल में रक्षाबंधन, गृहप्रवेश, व मांगलिक कार्य वर्जित होते हैं।`
              : 'समस्त मांगलिक कार्यों, नवीन अनुष्ठान एवं शुभ यात्रा हेतु समय भद्रा दोष से पूर्णतः मुक्त है।'}
          </p>
        </div>
      </div>

      {/* Secondary Matrix: Disha Shool, Chandra Vasa, Rahu Vasa, Chakra & Netra */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-2">
        {/* Disha Shool */}
        <div className="bg-white/80 p-3.5 rounded-xl border border-[#d97706]/15 text-center">
          <span className="text-[11px] font-bold text-[#b45309] block uppercase">दिशा शूल</span>
          <span className="text-sm font-bold text-[#451a03] block mt-1">{dishaShool.dir}</span>
          <span className="text-[10px] text-[#78350f]/75 block mt-0.5">{dishaShool.parihar}</span>
        </div>

        {/* Chandra Vasa */}
        <div className="bg-white/80 p-3.5 rounded-xl border border-[#d97706]/15 text-center">
          <span className="text-[11px] font-bold text-[#b45309] block uppercase">चन्द्र वास</span>
          <span className="text-sm font-bold text-[#451a03] block mt-1">{chandraVasa.directionHindi}</span>
          <span className="text-[10px] text-emerald-700 block mt-0.5">{chandraVasa.suitability}</span>
        </div>

        {/* Rahu Vasa */}
        <div className="bg-white/80 p-3.5 rounded-xl border border-[#d97706]/15 text-center">
          <span className="text-[11px] font-bold text-[#b45309] block uppercase">राहु वास</span>
          <span className="text-sm font-bold text-[#451a03] block mt-1">{rahuVasa.directionHindi}</span>
          <span className="text-[10px] text-amber-700 block mt-0.5">यात्रा में सम्मुख न रखें</span>
        </div>

        {/* Homahuti */}
        <div className="bg-white/80 p-3.5 rounded-xl border border-[#d97706]/15 text-center">
          <span className="text-[11px] font-bold text-[#b45309] block uppercase">होमाहुति</span>
          <span className="text-sm font-bold text-[#451a03] block mt-1">{homahuti.planetHindi}</span>
          <span className="text-[10px] text-[#78350f]/75 block mt-0.5">हवन अधिष्ठाता ग्रह</span>
        </div>

        {/* Kumbha Chakra */}
        <div className="bg-white/80 p-3.5 rounded-xl border border-[#d97706]/15 text-center">
          <span className="text-[11px] font-bold text-[#b45309] block uppercase">कुम्भ चक्र</span>
          <span className="text-sm font-bold text-[#451a03] block mt-1">{kumbhaChakra}</span>
          <span className="text-[10px] text-emerald-700 block mt-0.5">शुभ संचय अनुकूल</span>
        </div>

        {/* Netrama & Jeevanama */}
        <div className="bg-white/80 p-3.5 rounded-xl border border-[#d97706]/15 text-center">
          <span className="text-[11px] font-bold text-[#b45309] block uppercase">नेत्र व जीवन</span>
          <span className="text-sm font-bold text-[#451a03] block mt-1">{netrama}</span>
          <span className="text-[10px] text-emerald-700 block mt-0.5">{jeevanama}</span>
        </div>
      </div>
    </section>
  );
};
