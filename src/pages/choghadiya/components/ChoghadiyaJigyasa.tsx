/**
 * Sanatan Web (सनातन घड़ी)
 * Component: ChoghadiyaJigyasa
 * Exactly matches Home Page Box UI (PortalJigyasa) & PanchangJigyasa
 * Choghadiya & Hora-specific questions
 * 2-Column Responsive Layout, Collapsed by Default, GoldenCornerBrackets & Shree Yantra
 * Pure Web Standards, Strict < 300 Lines Modular Standard
 */

import React, { useState } from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';

interface ChoghadiyaFaq {
  id: string;
  question: string;
  answer: string;
}

const FAQS_COL_LEFT: ChoghadiyaFaq[] = [
  {
    id: 'choghadiya-meaning',
    question: 'चौघड़िया क्या है और इसे "चौघड़िया" क्यों कहा जाता है?',
    answer:
      'प्राचीन काल गणना में १ पहर में लगभग ४ घटी (९६ मिनट) होती हैं। चार घटी की अवधि होने के कारण ही इसे "चौ-घड़िया" कहा गया। दिनमान (सूर्योदय से सूर्यास्त) को ८ समान भागों में और रात्रिमान (सूर्यास्त से सूर्योदय) को ८ समान भागों में विभाजित करके कुल १६ चौघड़िया चक्र बनते हैं।',
  },
  {
    id: 'auspicious-inauspicious',
    question: 'कौन-से चौघड़िया शुभ और कौन-से त्याज्य माने जाते हैं?',
    answer:
      'सात मूल चौघड़िया में चार शुभ और तीन अशुभ हैं। अमृत (अति शुभ), शुभ (मांगलिक), लाभ (उन्नतिकारक) और चर (मध्यम/गतिशील) ग्राह्य हैं। वहीं रोग (विवाद कारक), काल (हानिकारक) और उद्वेग (चिंता कारक) त्याज्य माने जाते हैं।',
  },
  {
    id: 'rahu-vs-choghadiya',
    question: 'क्या राहुकाल के समय शुभ चौघड़िया (जैसे अमृत या शुभ) मान्य होता है?',
    answer:
      'शास्त्रों के अनुसार राहुकाल चौघड़िया से अधिक बलवान माना जाता है। यदि राहुकाल के समय अमृत या शुभ चौघड़िया चल रहा हो, तो भी नवीन मांगलिक संकल्प (जैसे नया सौदा, विवाह वार्ता, गृहप्रवेश) टालना ही विवेकपूर्ण है। नित्य सामान्य कार्यों पर इसका दोष नहीं लगता।',
  },
  {
    id: 'day-night-order',
    question: 'दिन और रात्रि के चौघड़िया क्रम का निर्धारण कैसे होता है?',
    answer:
      'दिन का प्रथम चौघड़िया उस दिन के वार स्वामी ग्रह के आधार पर निर्धारित होता है (जैसे रविवार को उद्वेग, सोमवार को अमृत)। रात्रि का प्रथम चौघड़िया वार स्वामी से ५वें वार के स्वामी ग्रह के आधार पर प्रारंभ होता है और इसी क्रम में आगे बढ़ता है।',
  },
];

const FAQS_COL_RIGHT: ChoghadiyaFaq[] = [
  {
    id: 'hora-division',
    question: 'ग्रहीय होरा क्या है और यह २४ घंटों में कैसे विभाजित होती है?',
    answer:
      'अहोरात्र (सूर्योदय से अगले सूर्योदय) को २४ समान भागों में बांटा जाता है, जिसे "होरा" (Hour का वैदिक मूल) कहते हैं। प्रत्येक होरा लगभग ६० मिनट की होती है और उस पर क्रमशः मंद गति से तीव्र गति वाले ७ ग्रहों (शनि, गुरु, मंगल, सूर्य, शुक्र, बुध, चंद्र) का आधिपत्य चक्र निरंतर चलता है।',
  },
  {
    id: 'first-hora-rule',
    question: 'दिन की प्रथम होरा किस ग्रह की होती है?',
    answer:
      'दिन के ठीक सूर्योदय पर प्रारंभ होने वाली पहली होरा हमेशा उस दिन के वार स्वामी ग्रह की होती है। जैसे रविवार को पहली होरा सूर्य की, सोमवार को चंद्र की, मंगलवार को मंगल की, बुधवार को बुध की, गुरुवार को गुरु की, शुक्रवार को शुक्र की और शनिवार को शनि की होती है।',
  },
  {
    id: 'best-hora-purposes',
    question: 'विभिन्न कार्यों के लिए कौन-सी होरा सर्वोत्तम मानी गई है?',
    answer:
      'सूर्य होरा: प्रशासनिक व राजकीय कार्य; चंद्र होरा: यात्रा व शांति अनुष्ठान; मंगल होरा: साहस व भूमि कार्य; बुध होरा: व्यापार, लेखा व बैंकिंग; गुरु होरा: विवाह चर्चा, धर्म व विद्या; शुक्र होरा: कला, वाहन व वस्त्र; शनि होरा: स्थायी निर्माण, फैक्ट्री व तंत्र साधना।',
  },
  {
    id: 'choghadiya-vs-shuddhi',
    question: 'क्या केवल चौघड़िया देखकर विवाह या गृहप्रवेश किए जा सकते हैं?',
    answer:
      'कदापि नहीं। चौघड़िया केवल तात्कालिक दैनिक कार्यों (यात्रा, वाहन क्रय, दुकान खोलना, सामान्य क्रय-विक्रय) के लिए व्यावहारिक मार्गदर्शक है। विवाह, गृहप्रवेश, शिलान्यास जैसे स्थायी जीवन संस्कारों के लिए सूक्ष्म लग्न शुद्धि, नवांश और त्रिबल परीक्षण अनिवार्य होता है।',
  },
];

export const ChoghadiyaJigyasa: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderFaqLineItem = (faq: ChoghadiyaFaq) => {
    const isOpen = expandedId === faq.id;

    return (
      <div
        key={faq.id}
        className={`border-b border-[#dec9ab]/60 transition-colors duration-200 ${
          isOpen ? 'bg-[#fffaf0]/80 rounded-xl px-2 py-1 -mx-2 shadow-2xs' : 'hover:bg-black/[0.015]'
        }`}
      >
        <button
          type="button"
          onClick={() => toggleDropdown(faq.id)}
          className="w-full py-2.5 sm:py-3 flex items-center justify-between gap-3 text-left cursor-pointer group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                isOpen ? 'bg-[#ea580c]' : 'bg-[#b8860b] group-hover:bg-[#ea580c]'
              }`}
            />
            <span className="text-xs sm:text-sm font-bold text-[#26150b] group-hover:text-[#ea580c] transition-colors leading-snug">
              {faq.question}
            </span>
          </div>

          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
              isOpen
                ? 'rotate-180 bg-[#ea580c] text-white border-[#ea580c]'
                : 'bg-white/80 text-[#8c6d46] border-[#dec9ab] group-hover:border-[#ea580c]'
            }`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="pt-1 pb-3 pl-3.5 pr-2 animate-fadeIn">
            <p className="text-xs sm:text-sm text-[#5a3822] leading-relaxed border-l-2 border-[#ea580c]/50 pl-3">
              {faq.answer}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden glass-panel rounded-3xl p-6 sm:p-8 bg-[#fffcf7] border border-amber-300/80 shadow-xs font-serif space-y-5">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Shree Yantra Watermark */}
      <SacredGeometryWatermark variant="shree-yantra" className="opacity-[0.06]" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/70 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-pulse" />
            <span className="text-xs font-bold text-[#ea580c] tracking-widest uppercase">
              मार्गदर्शन एवं शास्त्रोक्त निर्णय
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#26150b] tracking-tight">
            सनातन जिज्ञासा एवं शंका समाधान
          </h2>
          <p className="text-xs text-[#735641] mt-0.5">
            चौघड़िया मुहूर्त एवं २४ ग्रहीय होरा से जुड़े व्यावहारिक प्रश्न व समाधान
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-xs font-semibold text-[#8c4a16] self-start sm:self-auto">
          <span>⚡</span>
          <span>त्वरित समाधान</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 pt-1">
        {/* Left Column (4 Items) */}
        <div className="space-y-1">
          {FAQS_COL_LEFT.map(renderFaqLineItem)}
        </div>

        {/* Right Column (4 Items) */}
        <div className="space-y-1">
          {FAQS_COL_RIGHT.map(renderFaqLineItem)}
        </div>
      </div>
    </section>
  );
};

export default ChoghadiyaJigyasa;
