/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalJigyasa
 * Clean Line-Divider Accordion List (Zero Floating Boxes)
 * 2-Column Responsive Layout, All Collapsed by Default, Clean Clearance for Brackets
 * Pure Web Standards, Strict < 300 Lines Modular Standard
 */

import React, { useState } from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';

interface CompactFaq {
  id: string;
  question: string;
  answer: string;
  linkText: string;
  href: string;
}

const FAQS_COL_LEFT: CompactFaq[] = [
  {
    id: 'rahu-kaal',
    question: 'क्या राहु काल में भोजन, नौकरी या सामान्य यात्रा वर्जित है?',
    answer: 'कदापि नहीं! केवल नवीन शुभ संकल्प (नया व्यापार, गृहप्रवेश, विवाह, बड़ा निवेश) वर्जित हैं। नित्य दिनचर्या, नौकरी, अध्ययन, खान-पान व नियमित यात्रा में कोई दोष नहीं लगता।',
    linkText: 'राहु काल समय',
    href: '/panchang'
  },
  {
    id: 'manglik-dosha',
    question: 'क्या हर मांगलिक कुण्डली अशुभ होती है और विवाह में बाधक है?',
    answer: 'बिल्कुल नहीं! महर्षि पराशर अनुसार २८+ परिहार योगों से मंगल दोष निष्प्रभावी हो जाता है। स्वराशि/उच्च का मंगल, गुरु की दृष्टि या २८ वर्ष की आयु बाद कोई दोष नहीं रहता।',
    linkText: '३६ गुण व मांगलिक मिलान',
    href: '/matchmaking'
  },
  {
    id: 'sade-sati',
    question: 'शनि की साढ़ेसाती — क्या यह सदैव कष्टकारी होती है?',
    answer: 'यह बड़ा भ्रम है! शनि न्याय के देवता हैं। सत्य, परिश्रम व परोपकार करने वालों को शनि की साढ़ेसाती में ही अप्रत्याशित पद, संपत्ति, प्रतिष्ठा और आध्यात्मिक ऊंचाई मिलती है।',
    linkText: 'साढ़ेसाती व रत्न स्थिति',
    href: '/utilities'
  }
];

const FAQS_COL_RIGHT: CompactFaq[] = [
  {
    id: 'panchak-rules',
    question: 'पंचक लगने पर क्या सभी शुभ कार्य बंद हो जाते हैं?',
    answer: 'नहीं! पंचक में केवल ५ विशिष्ट कार्य (दक्षिण यात्रा, छत ढालना, चारपाई बुनना, तृण/काष्ठ संग्रह व दाह संस्कार) त्याज्य हैं। विवाह, मुण्डन, उपनयन व व्यापार निर्बाध किए जा सकते हैं।',
    linkText: 'पंचक विवरण',
    href: '/panchang'
  },
  {
    id: 'choghadiya-vs-lagna',
    question: 'चौघड़िया, होरा और लग्न मुहूर्त में किसे प्राथमिकता दें?',
    answer: 'विवाह, गृह प्रवेश जैसे स्थायी संस्कारों में "लग्न शुद्धि" सर्वोपरि है। दैनिक यात्रा व दुकान खोलने में "चौघड़िया" और तात्कालिक वित्तीय कार्यों में "ग्रह होरा" उत्तम है।',
    linkText: '२४ होरा व चौघड़िया चक्र',
    href: '/choghadiya'
  },
  {
    id: 'disha-shool',
    question: 'दिशा शूल वाले दिन यात्रा अपरिहार्य हो तो क्या परिहार करें?',
    answer: 'वार अनुसार सरल पदार्थ (रविवार: पान, सोमवार: दर्पण, मंगलवार: गुड़, बुधवार: तिल/धनिया, गुरुवार: दही, शुक्रवार: जौ, शनिवार: उड़द/अदरक) खाकर ५ कदम पीछे चलकर प्रस्थान करें।',
    linkText: 'दिशा शूल नियम',
    href: '/panchang'
  }
];

export const PortalJigyasa: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const renderFaqLineItem = (faq: CompactFaq) => {
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

            <div className="flex items-center justify-end text-[11px] pt-0.5">
              <Link
                href={faq.href}
                className="text-[#ea580c] font-bold hover:underline flex items-center gap-1 no-underline"
              >
                <span>{faq.linkText}</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="glass-panel rounded-3xl p-5 sm:p-7 pb-8 space-y-5 font-serif relative overflow-hidden" id="jigyasa">
      <SacredGeometryWatermark variant="shree-yantra" className="opacity-[0.05]" />
      <GoldenCornerBrackets size="lg" />

      {/* Compact Clean Header */}
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
          राहु काल, मांगलिक, साढ़ेसाती व पंचक के ६ मुख्य प्रश्नों के सीधे समाधान
        </p>
      </div>

      {/* 2-Column Clean Line Divider List (Zero Nested Floating Boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-0 relative z-10">
        <div>
          {FAQS_COL_LEFT.map(renderFaqLineItem)}
        </div>
        <div>
          {FAQS_COL_RIGHT.map(renderFaqLineItem)}
        </div>
      </div>

      {/* Slim 1-Line Anchor to Panchang Hub with Full Clearance for Bottom Golden Brackets */}
      <div className="relative z-10 pt-3 pb-1 px-3 sm:px-4 mt-1 border-t border-[#dec9ab]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#735641]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#ea580c] text-[16px]">verified</span>
          <span>
            <strong>सूक्ष्म पंचांग वेधशाला:</strong> भद्रा वास, अग्निवास, शिववास व संपूर्ण पंचांग पत्रक
          </span>
        </div>

        <Link
          href="/panchang"
          className="text-[#b8860b] hover:text-[#ea580c] font-bold shrink-0 no-underline flex items-center gap-1 transition-colors"
        >
          <span>विस्तृत पंचांग खोलें</span>
          <span>➔</span>
        </Link>
      </div>
    </section>
  );
};

export default PortalJigyasa;
