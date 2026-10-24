import React from 'react';

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
    <section className="space-y-4 font-serif" id="rashifal">
      <div className="flex items-center justify-between border-b border-[#dec9ab]/60 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#b8860b]"></span>
          <h2 className="text-2xl font-bold text-[#26150b]">आज का राशिफल (चन्द्र गोचर फल)</h2>
        </div>
        <span className="text-xs text-[#735641]">चन्द्रमा: कन्या राशि में संचाररत</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {RASHIS.map((r) => {
          const isUttam = r.status === 'उत्तम';
          const isMadhyam = r.status === 'मध्यम';

          return (
            <div
              key={r.name}
              className={`p-3.5 rounded-2xl glass-inner bg-white/85 border space-y-1.5 transition-all ${
                r.isHighlight
                  ? 'border-[#ea580c] ring-1 ring-[#ea580c]/50'
                  : 'border-[#dec9ab]/60 hover:border-[#ea580c]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${r.isHighlight ? 'text-[#c2410c]' : 'text-[#26150b]'}`}>
                  {r.icon} {r.name}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isUttam
                      ? 'text-emerald-700 bg-emerald-50'
                      : isMadhyam
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-emerald-700 bg-emerald-50'
                  }`}
                >
                  {r.percent} {r.status}
                </span>
              </div>
              <p className="text-[11px] text-[#5a3822] leading-snug">{r.desc}</p>
              <div className="text-[10px] text-[#b8860b] font-semibold">
                शुभ रंग: {r.color} • अंक: {r.num}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
