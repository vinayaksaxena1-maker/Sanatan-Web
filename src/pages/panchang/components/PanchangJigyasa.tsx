/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangJigyasa
 * Exactly matches Home Page Box UI (PortalJigyasa) with Panchang-specific questions
 * 2-Column Responsive Layout, Collapsed by Default, GoldenCornerBrackets & Shree Yantra
 * Pure Web Standards, Strict < 300 Lines Modular Standard
 */

import React, { useState } from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';

interface PanchangFaq {
  id: string;
  question: string;
  answer: string;
}

const FAQS_COL_LEFT: PanchangFaq[] = [
  {
    id: 'udaya-tithi',
    question: 'उदया तिथि क्या है और तिथि का क्षय या वृद्धि कैसे होती है?',
    answer:
      'प्रातः सूर्योदय के समय जो तिथि क्षितिज पर विद्यमान होती है, उसे "उदया तिथि" कहते हैं। समस्त शास्त्रोक्त पर्व, व्रत और दैनिक अनुष्ठानों में यही तिथि पूरे दिन मान्य मानी जाती है। जब कोई तिथि दो सूर्योदयों के मध्य ही समाप्त हो जाए तो "तिथि-क्षय" और जब लगातार दो सूर्योदयों को स्पर्श करे तो "तिथि-वृद्धि" होती है।',
  },
  {
    id: 'rahu-kaal-rules',
    question: 'क्या राहुकाल में सभी सामान्य दैनिक कार्य बंद कर देने चाहिए?',
    answer:
      'कदापि नहीं। केवल नवीन मांगलिक संकल्प (जैसे नया व्यापार, विवाह, गृहप्रवेश, बड़ा निवेश अथवा नवीन यात्रा) त्याज्य हैं। नित्य दिनचर्या, कार्यालयीन कार्य, अध्ययन, भोजन, सामान्य आवागमन व पूर्व से चल रहे कार्यों में कोई दोष नहीं लगता।',
  },
  {
    id: 'abhijit-significance',
    question: 'अभिजीत मुहूर्त क्या है और इसे सर्वकार्य सिद्धिदायक क्यों माना गया है?',
    answer:
      'दिनमान (सूर्योदय से सूर्यास्त) का ठीक मध्यवर्ती ८वां मुहूर्त "अभिजीत मुहूर्त" कहलाता है। भगवान श्रीहरि विष्णु के सुदर्शन चक्र के समान यह मुहूर्त समस्त सामान्य दोषों का शमन कर तत्काल सफलता प्रदान करता है। केवल बुधवार को इसका प्रभाव मध्यम माना जाता है।',
  },
  {
    id: 'bhadra-nirnaya',
    question: 'भद्रा (विष्टि करण) लगने पर क्या सभी शुभ कार्य रुक जाते हैं?',
    answer:
      'नहीं। भद्रा में केवल रक्षाबंधन, होलिका दहन, विवाह व गृहप्रवेश जैसे प्रमुख मांगलिक कर्म त्याज्य हैं। यदि भद्रा का वास स्वर्ग या पाताल में हो, तो वह पृथ्वीवासियों के लिए शुभ व कल्याणकारी मानी जाती है; केवल पृथ्वी लोक (मर्त्य लोक) की भद्रा त्याज्य होती है।',
  },
];

const FAQS_COL_RIGHT: PanchangFaq[] = [
  {
    id: 'purnimanta-vs-amanta',
    question: 'पूर्णिमान्त और अमान्त मास में क्या अंतर है और किसे मानना चाहिए?',
    answer:
      'उत्तर भारत में मास पूर्णिमा पर समाप्त होता है (पूर्णिमान्त), जबकि दक्षिण व पश्चिम भारत (महाराष्ट्र, गुजरात आदि) में मास अमावस्या पर समाप्त होता है (अमान्त)। दोनों में शुक्ल पक्ष की तिथियां एक ही दिन आती हैं, केवल कृष्ण पक्ष में मास का नाम बदलता है। आप अपनी क्षेत्रीय परंपरा अनुसार अनुसरण कर सकते हैं।',
  },
  {
    id: 'panchak-clarity',
    question: 'पंचक लगने पर क्या कोई भी शुभ कार्य नहीं किया जा सकता?',
    answer:
      'यह बड़ा भ्रम है। पंचक (धनिष्ठा से रेवती तक ५ नक्षत्र) में केवल ५ विशिष्ट कार्य (दक्षिण दिशा की यात्रा, घर की छत ढालना, चारपाई बुनना, तृण/काष्ठ संग्रह और दाह संस्कार) त्याज्य हैं। विवाह, मुंडन, विद्यारंभ व व्यापारिक कार्य पंचक में निर्बाध किए जा सकते हैं।',
  },
  {
    id: 'disha-shool-parihar',
    question: 'दिशाशूल वाले दिन यदि यात्रा अपरिहार्य हो तो क्या परिहार करें?',
    answer:
      'वार अनुसार सरल पदार्थ खाकर व ५ कदम पीछे चलकर यात्रा प्रारंभ करें: रविवार को पान/घी, सोमवार को दर्पण देखकर, मंगलवार को गुड़, बुधवार को तिल/धनिया, गुरुवार को दही, शुक्रवार को जौ, और शनिवार को अदरक/उड़द खाकर प्रस्थान करने से दिशाशूल निष्प्रभावी हो जाता है।',
  },
  {
    id: 'choghadiya-vs-lagna',
    question: 'दैनिक कार्यों में चौघड़िया मुहूर्त देखें या लग्न शुद्धि?',
    answer:
      'अल्पकालिक तात्कालिक कार्यों (जैसे यात्रा, वाहन क्रय, दुकान खोलना) के लिए "शुभ, लाभ, अमृत" चौघड़िया देखना सरल व व्यावहारिक है। परंतु विवाह, गृहप्रवेश, नींव पूजन जैसे स्थायी संस्कारों में लग्न शुद्धि और त्रिबल परीक्षण को ही सर्वोच्च प्राथमिकता दी जाती है।',
  },
];

export const PanchangJigyasa: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderFaqLineItem = (faq: PanchangFaq) => {
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
            ></span>
            <span
              className={`text-xs sm:text-[13px] font-bold transition-colors ${
                isOpen ? 'text-[#c2410c]' : 'text-[#26150b] group-hover:text-[#ea580c]'
              }`}
            >
              {faq.question}
            </span>
          </div>

          <span
            className={`material-symbols-outlined text-[18px] text-[#735641] shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#ea580c]' : 'group-hover:text-[#26150b]'
            }`}
          >
            expand_more
          </span>
        </button>

        {isOpen && (
          <div className="pb-3 pt-0.5 space-y-2 pl-3.5 sm:pl-4">
            <p className="text-xs text-[#5c3e2b] leading-relaxed bg-[#fffdf8] p-2.5 rounded-xl border border-amber-200/80 shadow-2xs">
              💡 {faq.answer}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      className="glass-panel rounded-3xl p-5 sm:p-7 pb-8 space-y-5 font-serif relative overflow-hidden"
      id="panchang-jigyasa"
    >
      <SacredGeometryWatermark variant="shree-yantra" className="opacity-[0.05]" />
      <GoldenCornerBrackets size="lg" />

      {/* Compact Clean Header exactly matching Home Page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dec9ab]/70 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
          <h2 className="text-lg sm:text-xl font-bold text-[#26150b]">
            सनातन जिज्ञासा एवं शंका समाधान
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
            त्वरित समाधान
          </span>
        </div>

        <p className="text-[11px] text-[#735641]">
          पंचांग, तिथि, मुहूर्त, भद्रा, पंचक व काल निर्णय के ८ मुख्य प्रश्नों के सीधे समाधान
        </p>
      </div>

      {/* 2-Column Clean Line Divider List (Zero Nested Floating Boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-0 relative z-10">
        <div>{FAQS_COL_LEFT.map(renderFaqLineItem)}</div>
        <div>{FAQS_COL_RIGHT.map(renderFaqLineItem)}</div>
      </div>
    </section>
  );
};

export default PanchangJigyasa;
