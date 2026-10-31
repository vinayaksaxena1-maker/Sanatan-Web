/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratJigyasa
 * Exactly matches Home Page Box UI (PortalJigyasa) & PanchangJigyasa
 * Muhurat & Sanskar-specific questions
 * 2-Column Responsive Layout, Collapsed by Default, GoldenCornerBrackets & Shree Yantra
 * Pure Web Standards, Strict < 300 Lines Modular Standard
 */

import React, { useState } from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';

interface MuhuratFaq {
  id: string;
  question: string;
  answer: string;
}

const FAQS_COL_LEFT: MuhuratFaq[] = [
  {
    id: 'tribala-shuddhi',
    question: 'विवाह में त्रिबल शुद्धि क्या है और यह क्यों अनिवार्य मानी जाती है?',
    answer:
      'वर के लिए सूर्य बल, वधू के लिए गुरु बल और दोनों के लिए चंद्र बल की शुद्धि को "त्रिबल शुद्धि" कहते हैं। सूर्य आत्मबल व प्रतिष्ठा, गुरु सौभाग्य व संतति सुख, और चंद्र मानसिक अनुकूलता का कारक है। इन तीनों ग्रहों का गोचर में अनुकूल होना ही विवाह संस्कार की पहली पूर्व-शर्त है।',
  },
  {
    id: 'mahadoshas-vivah',
    question: 'विवाह लग्न में १० प्रमुख महादोष कौन-से हैं जिनका परिहार आवश्यक है?',
    answer:
      'मुहूर्त चिंतामणि के अनुसार लता, पात, युति, वेध, जामित्र, बाण, एकार्गल, उपग्रह, क्रांतिसाम्य और दग्धा तिथि—ये १० महादोष विवाह में वर्जित हैं। इसके अतिरिक्त ज्येष्ठ मास में प्रथम ज्येष्ठ संतान का विवाह और त्रि-ज्येष्ठ योग भी शास्त्रोक्त रूप से त्याज्य माने जाते हैं।',
  },
  {
    id: 'choghadiya-vs-muhurat',
    question: 'चौघड़िया और शास्त्रीय मुहूर्त में क्या अंतर है?',
    answer:
      'चौघड़िया केवल तात्कालिक दैनिक कार्यों (यात्रा, दुकान खोलना, सामान्य क्रय-विक्रय) के लिए त्वरित व्यावहारिक मार्गदर्शक है। इसके विपरीत, शास्त्रीय मुहूर्त में तिथि, वार, नक्षत्र, योग, करण के साथ-साथ लग्न शुद्धि, नवांश बल और षडवर्ग का सूक्ष्म विचार होता है, जो विवाह, गृहप्रवेश और षोडश संस्कारों हेतु अनिवार्य है।',
  },
  {
    id: 'griha-pravesh-sthir',
    question: 'गृह प्रवेश के लिए स्थिर लग्न ही क्यों चुना जाता है?',
    answer:
      'गृह प्रवेश के समय स्थिर लग्न (वृष, सिंह, वृश्चिक, कुंभ) और स्थिर नवांश का चयन इसलिए किया जाता है ताकि उस गृह में निवास, सुख-शांति, लक्ष्मी और वंश की स्थिरता बनी रहे। चर लग्न में प्रवेश करने से निवास में अस्थिरता और बारंबार स्थानांतरण का भय रहता है।',
  },
];

const FAQS_COL_RIGHT: MuhuratFaq[] = [
  {
    id: 'panchak-restrictions',
    question: 'क्या पंचक में सभी प्रकार के मांगलिक संस्कार वर्जित होते हैं?',
    answer:
      'नहीं, पंचक के दौरान सभी शुभ कार्य वर्जित नहीं होते। केवल ५ विशिष्ट कार्य त्याज्य हैं: दक्षिण दिशा की यात्रा, घर की छत ढालना, चारपाई/पलंग बुनना, तृण/काष्ठ संग्रह और शव दाह (बिना पुत्तल विधान के)। नामकरण, विवाह, मुंडन, विद्यारंभ जैसे संस्कार पंचक में वर्जित नहीं माने जाते।',
  },
  {
    id: 'rahu-vs-bhadra',
    question: 'राहुकाल और भद्रा में क्या अंतर है, किसे अधिक त्याज्य माना जाए?',
    answer:
      'राहुकाल प्रतिदिन लगभग ९० मिनट का तमोगुणी काल खंड है, जो मुख्य रूप से यात्रा व नवीन भौतिक उपक्रमों में त्याज्य है। भद्रा (विष्टि करण) विशेष तिथियों पर आता है और यह मांगलिक संस्कारों (विवाह, मुंडन, गृहप्रवेश) के लिए अत्यंत घातक माना जाता है। भद्रा का वास स्वर्ग या पाताल में हो तो वह पृथ्वी पर शुभ फलदायी होती है।',
  },
  {
    id: 'tara-ast-malmas',
    question: 'गुरु या शुक्र का तारा अस्त होने पर विवाह व गृहप्रवेश क्यों रुकते हैं?',
    answer:
      'देवगुरु बृहस्पति ज्ञान, संतति और धर्म के कारक हैं तथा दैत्यगुरु शुक्र दांपत्य सुख, भोग व ऐश्वर्य के कारक हैं। जब ये ग्रह सूर्य के अत्यधिक निकट आकर अस्त (अदृश्य) हो जाते हैं, तो इनका शुभ प्रभाव शून्य हो जाता है। अतः उस काल को "तारा अस्त काल" कहकर विवाह व गृहप्रवेश वर्जित कर दिए जाते हैं।',
  },
  {
    id: 'godhuli-abhijit',
    question: 'गोधूलि और अभिजीत वेला को सर्वदोषनाशक क्यों कहा गया है?',
    answer:
      'अभिजीत मुहूर्त (दोपहर लगभग ११:४५ से १२:३५) भगवान विष्णु का चक्रवर्ती मुहूर्त है जो अनेक दोषों का शमन करता है (बुधवार को छोड़कर)। वहीं गोधूलि वेला सूर्यास्त के समय गायों के खुरों से उड़ने वाली धूल से पवित्र मानी जाती है, जो लग्न दोषों को दूर कर विवाह व तात्कालिक शुभ संकल्पों के लिए ग्राह्य होती है।',
  },
];

export const MuhuratJigyasa: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderFaqLineItem = (faq: MuhuratFaq) => {
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
            शुभ मुहूर्त, संस्कार काल निर्णय एवं त्रिबल शुद्धि से जुड़े शास्त्रीय प्रश्न व समाधान
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

export default MuhuratJigyasa;
