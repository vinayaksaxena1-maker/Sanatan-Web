import React from 'react';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';

interface RashiItem {
  icon: string;
  name: string;
  percent: string;
  status: 'शुभ' | 'मध्यम' | 'उत्तम';
  desc: string;
  color: string;
  num: string;
  isHighlight?: boolean;
}

const RASHIS: RashiItem[] = [
  { icon: '♈', name: 'मेष', percent: '८८%', status: 'शुभ', desc: 'कार्यक्षेत्र में प्रशंसा मिलेगी। धन लाभ के नवीन अवसर बनेंगे।', color: 'लाल', num: '९' },
  { icon: '♉', name: 'वृषभ', percent: '७२%', status: 'मध्यम', desc: 'पारिवारिक सामंजस्य बना रहेगा। स्वास्थ्य में हल्का सुधार संभव।', color: 'श्वेत', num: '६' },
  { icon: '♊', name: 'मिथुन', percent: '९१%', status: 'उत्तम', desc: 'रुके कार्य पूर्ण होंगे। व्यापारिक यात्रा अत्यंत लाभदायक सिद्ध होगी।', color: 'हरा', num: '५', isHighlight: true },
  { icon: '♋', name: 'कर्क', percent: '८४%', status: 'शुभ', desc: 'मानसिक शांति व आध्यात्मिक रुचि में वृद्धि। परिजनों का सहयोग मिलेगा।', color: 'दूधिया', num: '२' },
  { icon: '♌', name: 'सिंह', percent: '८९%', status: 'शुभ', desc: 'आत्मविश्वास चरम पर रहेगा। उच्चाधिकारियों से सम्मान प्राप्त होगा।', color: 'केसरिया', num: '१' },
  { icon: '♍', name: 'कन्या', percent: '८६%', status: 'शुभ', desc: 'चन्द्रमा का गोचर आपके आत्मबल को बढ़ाएगा। नवीन योजनाएं सफल होंगी।', color: 'पीतांबरी', num: '५' },
  { icon: '♎', name: 'तुला', percent: '७५%', status: 'मध्यम', desc: 'व्यय पर संयम रखें। साझेदारी के कार्यों में पारदर्शिता बरतना हितकर।', color: 'क्रीम', num: '७' },
  { icon: '♏', name: 'वृश्चिक', percent: '८२%', status: 'शुभ', desc: 'पराक्रम में वृद्धि होगी। मित्रों के सहयोग से जटिल समस्याएं सुलझेंगी।', color: 'सिन्दूरी', num: '३' },
  { icon: '♐', name: 'धनु', percent: '९०%', status: 'उत्तम', desc: 'गुरु की शुभ दृष्टि से अध्ययन व धार्मिक अनुष्ठानों में मन लगेगा।', color: 'पीला', num: '३' },
  { icon: '♑', name: 'मकर', percent: '७८%', status: 'मध्यम', desc: 'परिश्रम का उचित फल मिलेगा। भूमि या वाहन के मामलों में प्रगति होगी।', color: 'नीला', num: '८' },
  { icon: '♒', name: 'कुंभ', percent: '८५%', status: 'शुभ', desc: 'स्वक्षेत्रीय शनि का बल मिलेगा। नए निवेश के लिए शुभ दिन।', color: 'जामुनी', num: '४' },
  { icon: '♓', name: 'मीन', percent: '९२%', status: 'उत्तम', desc: 'उच्च के शुक्र से सुख-सुविधाओं में वृद्धि। दांपत्य जीवन मधुर रहेगा।', color: 'स्वर्णिम', num: '७' }
];

export const PortalRashifal: React.FC = () => {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-7 space-y-4 font-serif relative overflow-hidden" id="rashifal">
      <SacredGeometryWatermark variant="swastik" className="opacity-15" />
      <GoldenCornerBrackets size="lg" />

      <div className="flex items-center justify-between border-b border-[#dec9ab]/60 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#b8860b] shadow-[0_0_8px_#b8860b]"></span>
          <h2 className="text-2xl font-bold text-[#26150b]">आज का राशिफल (चन्द्र गोचर फल)</h2>
        </div>
        <span className="text-xs text-[#735641] font-semibold">चन्द्रमा: कन्या राशि में संचाररत</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
        {RASHIS.map((r) => {
          const isUttam = r.status === 'उत्तम';
          const isMadhyam = r.status === 'मध्यम';

          return (
            <div
              key={r.name}
              className={`p-3.5 rounded-2xl glass-inner bg-white/85 border space-y-1.5 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_16px_32px_-6px_rgba(217,119,6,0.38)] hover:border-[#d4af37] hover:bg-[#fffdf8] relative group overflow-hidden ${
                r.isHighlight
                  ? 'border-[#ea580c] ring-2 ring-[#ea580c]/50 shadow-sm'
                  : 'border-[#dec9ab]/70'
              }`}
            >
              {/* Luminous Golden Corner Accent on Hover */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl from-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#fef08a] via-[#f59e0b] to-[#b45309] text-white text-xs font-bold flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_4px_rgba(180,83,9,0.3)] shrink-0">
                    {r.icon}
                  </span>
                  <span className={`text-sm font-bold ${r.isHighlight ? 'text-[#c2410c]' : 'text-[#26150b] group-hover:text-[#c2410c] transition-colors'}`}>
                    {r.name}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs ${
                    isUttam
                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                      : isMadhyam
                      ? 'text-amber-700 bg-amber-50 border border-amber-200'
                      : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                  }`}
                >
                  {r.percent} {r.status}
                </span>
              </div>
              <p className="text-[11px] text-[#5a3822] leading-snug">{r.desc}</p>
              <div className="text-[10px] text-[#b8860b] font-semibold pt-0.5">
                शुभ रंग: {r.color} • अंक: {r.num}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
