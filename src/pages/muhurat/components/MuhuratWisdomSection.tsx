/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratWisdomSection
 * 3 Vedic Scriptural Guidelines Cards (Tribala Shuddhi, 10 Mahadoshas, Choghadiya vs Muhurat)
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';

export const MuhuratWisdomSection: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-6 bg-[#c2410c] rounded-full"></span>
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#26150b]">
          शास्त्रोक्त मुहूर्त निर्णय एवं लग्न शुद्धि के नियम
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1: Tribala Shuddhi */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-amber-900/10 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-900">
              <VedicIcon3D name="sun" size={20} />
            </div>
            <h4 className="text-base font-bold font-serif text-[#26150b]">
              विवाह में त्रिबल शुद्धि क्या है?
            </h4>
            <p className="text-xs text-[#735641] leading-relaxed">
              वैदिक ज्योतिष शास्त्र के अनुसार विवाह संस्कार तभी शुभ होता है जब तीन प्रमुख ग्रहों का बल प्राप्त हो:
            </p>

            <ul className="space-y-2 text-xs text-[#735641] pt-1">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c2410c] mt-1 shrink-0"></span>
                <span><strong className="text-[#26150b]">सूर्य बल (वर हेतु):</strong> वर की राशि से सूर्य ३, ६, १० या ११वें भाव में शुभ।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] mt-1 shrink-0"></span>
                <span><strong className="text-[#26150b]">गुरु बल (कन्या हेतु):</strong> कन्या की राशि से गुरु २, ५, ७, ९ या ११वें भाव में अमृत फलदायी।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0"></span>
                <span><strong className="text-[#26150b]">चंद्र बल (उभय हेतु):</strong> वर व वधू दोनों की राशि से गोचरस्थ चंद्रमा अनिष्ट भावों में न हो।</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-amber-900/10 text-[11px] text-[#c2410c] font-semibold italic">
            श्लोक: 'गुरुरबले कन्या, सूर्यबले वरः, चंद्रबले द्वयोः'
          </div>
        </div>

        {/* Card 2: 10 Mahadoshas */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-amber-900/10 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-700">
              <VedicIcon3D name="ashubh" size={20} />
            </div>
            <h4 className="text-base font-bold font-serif text-[#26150b]">
              लक्ष्मण रेखा: १० प्रमुख महादोष
            </h4>
            <p className="text-xs text-[#735641] leading-relaxed">
              मुहूर्त चिंतामणि ग्रंथ के अनुसार विवाह लग्न चयन करते समय इन १० दोषों का परिहार अति आवश्यक माना गया है:
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-[#26150b] pt-1">
              {['लता दोष', 'पात दोष', 'युति दोष', 'वेध दोष', 'जामित्र दोष', 'बाण दोष', 'एकार्गल दोष', 'उपग्रह दोष'].map((dosh) => (
                <div key={dosh} className="p-2 bg-[#fbf7ee] rounded-xl flex items-center gap-1.5 border border-amber-900/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span className="font-semibold">{dosh}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-amber-900/10 text-[11px] text-red-800 font-semibold">
            इन दोषों के विद्यमान होने पर विवाह संस्कार त्याज्य माना गया है
          </div>
        </div>

        {/* Card 3: Choghadiya vs Muhurat */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-amber-900/10 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <VedicIcon3D name="shubh" size={20} />
            </div>
            <h4 className="text-base font-bold font-serif text-[#26150b]">
              चौघड़िया और मुहूर्त में क्या अंतर है?
            </h4>
            <p className="text-xs text-[#735641] leading-relaxed">
              अक्सर लोग चौघड़िया और मुहूर्त को एक समझ लेते हैं, जबकि दोनों में महत्वपूर्ण शास्त्रीय भेद है:
            </p>

            <div className="space-y-2 text-xs text-[#735641] pt-1">
              <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-900/10">
                <span className="font-bold text-[#c2410c] block">शुभ मुहूर्त (शाश्वत संस्कार):</span>
                <span>लग्न, नक्षत्र, तिथि और त्रिबल शुद्धि पर आधारित होता है। विवाह, गृह प्रवेश आदि में अनिवार्य।</span>
              </div>
              <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-900/10">
                <span className="font-bold text-emerald-900 block">चौघड़िया (तात्कालिक कार्य):</span>
                <span>दिनमान/रात्रिमान के ८ भागों पर आधारित है। त्वरित यात्रा, वाहन क्रय या आकस्मिक कार्य हेतु।</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-amber-900/10 text-[11px] text-emerald-900 font-semibold">
            विवाह व गृह प्रवेश हेतु केवल चौघड़िया देखना पर्याप्त नहीं है
          </div>
        </div>
      </div>
    </section>
  );
};

export default MuhuratWisdomSection;
