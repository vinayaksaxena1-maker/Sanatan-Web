/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 13: Mission, Vedic Lineage & Calculation Methodology (हमारे बारे में एवं वैदिक परंपरा)
 * Pure Web, React 19, Strict < 300 lines modular Neo-Vedic luxury standard
 */

import React from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import { GoldenCornerBrackets } from '../vedic-portal/components/GoldenCornerBrackets';
import { 
  Flame, 
  Compass, 
  Sparkles, 
  Globe2, 
  ShieldCheck, 
  Printer, 
  WifiOff, 
  Cpu,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Content Viewport */}
      <main className="w-full pt-32 pb-20 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto space-y-8" id="about-us">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 font-sans" aria-label="Breadcrumb">
            <a href="/" className="hover:text-amber-800 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> मुख्य पृष्ठ
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-400">परिचय</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-amber-900 font-semibold">हमारे बारे में</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-sans font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" /> १,९०२ टेस्ट्स द्वारा गणितीय प्रमाणित
          </span>
        </div>

        {/* Hero Title Section */}
        <section className="relative bg-gradient-to-br from-amber-50/90 via-white/80 to-orange-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/15 shadow-sm text-center space-y-3">
          <GoldenCornerBrackets size="lg" />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-500 text-amber-50 shadow-md mx-auto mb-1">
            <Flame className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#26150b]">
            हमारा संकल्प, वैदिक परंपरा एवं खगोलीय शुद्धता
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-sans leading-relaxed">
            सनातन घड़ी (Sanatan Ghadi) आधुनिक युग में प्राचीन भारतीय कालगणना का प्रामाणिक पुनरुत्थान है — जहां सूर्य सिद्धांत की पवित्रता नासा JPL खगोल विज्ञान की सूक्ष्मता से मिलती है।
          </p>
          <div className="pt-2 text-xs text-stone-500 font-sans">
            स्थापित: विक्रम संवत २०८१ • उज्जयिनी मेरिडियन मानक
          </div>
        </section>

        {/* Story Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. The Sacred Mission */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-100 text-orange-800">
                <Globe2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                १. हमारा पावन उद्देश्य
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              वर्तमान में अधिकांश ऑनलाइन पंचांग विज्ञापनों, पॉप-अप्स और भ्रमित करने वाली सूचनाओं से भरे हैं। हमारा संकल्प प्रत्येक सनातन धर्मी, विद्वान दैवज्ञ और परिवार को एक <strong>पवित्र, विज्ञापनों से शत-प्रतिशत मुक्त, और अत्यंत सुंदर</strong> वैदिक कालगणना यंत्र प्रदान करना है।
            </p>
          </article>

          {/* 2. Ancient Meridian: Avantika */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                २. अवंतिका (उज्जैन) — विश्व की मध्याह्न रेखा
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              प्राचीन भारतीय खगोल शास्त्र में <strong>उज्जयिनी (23.1765° N, 75.7885° E)</strong> को पृथ्वी की प्रधान मध्याह्न रेखा (Prime Meridian) माना गया है। भगवान महाकाल की इस पावन नगरी को आधार मानकर सनातन घड़ी शून्य-जीपीएस स्थिति में भी उज्जयिनी मानक से स्वतः गणना करती है।
            </p>
          </article>

          {/* 3. Mathematical Rigour & JPL DE405 */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                ३. नासा JPL व सूर्य सिद्धांत का समन्वय
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              हमारा AstroEngine v2.0 नासा के <strong>JPL DE405</strong> एफिमेरिस ऑर्बिटल मॉडल और <strong>चित्रपक्षीय (लाहिड़ी) अयनांश</strong> का उपयोग करता है। सूर्योदय गणना में ऊपरी बिम्ब व वायुमंडलीय अपवर्तन का समावेश है, जिसे <strong>१,९०२ स्वचालित टेस्ट्स</strong> द्वारा प्रमाणित किया गया है।
            </p>
          </article>

          {/* 4. 4 Pillars of Excellence */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                ४. सनातन घड़ी के चार आधार स्तंभ
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans text-stone-700 pt-1">
              <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex items-center gap-1.5">
                <WifiOff className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>१००% ऑफ़लाइन PWA</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>A4 पारंपरिक मुद्रण</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>शून्य विज्ञापन व ट्रैकिंग</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>३३७-बिंदु अष्टकवर्ग</span>
              </div>
            </div>
          </article>
        </div>

        {/* Lineage & Gratitude Banner */}
        <section className="bg-white/90 rounded-2xl p-6 sm:p-8 border border-amber-900/15 shadow-xs space-y-3 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
          <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-800" />
            <span>ऋषि परंपरा एवं मनीषियों के प्रति कृतज्ञता</span>
          </h2>
          <p>
            हम महर्षि पराशर, आर्यभट, वराहमिहिर, भास्कराचार्य, तथा आधुनिक काल में पंचांग सुधार समिति के अध्यक्ष श्री एन. सी. लाहिड़ी एवं पं. केदार दत्त जोशी के चरणों में नतमस्तक हैं, जिनके शास्त्रीय अनुसंधान ने इस आधुनिक डिजिटल पंचांग की नींव रखी।
          </p>
        </section>

        {/* Bottom Back Button */}
        <div className="text-center pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-sans text-sm font-semibold shadow-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> मुख्य पंचांग पोर्टल पर लौटें
          </a>
        </div>
      </main>

      {/* Footer */}
      <PortalFooter />
    </div>
  );
};

export default AboutUs;