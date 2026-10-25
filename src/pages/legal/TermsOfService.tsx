/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 12: Terms of Service & Ephemeris Disclaimers (सेवा की शर्तें एवं खगोलीय अस्वीकरण)
 * Pure Web, React 19, Strict < 300 lines modular Neo-Vedic luxury standard
 */

import React from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import { GoldenCornerBrackets } from '../vedic-portal/components/GoldenCornerBrackets';
import { 
  FileText, 
  Scale, 
  Compass, 
  AlertTriangle, 
  BookOpen, 
  Award, 
  ShieldAlert,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Content Viewport */}
      <main className="w-full pt-32 pb-20 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto space-y-8" id="terms-of-service">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 font-sans" aria-label="Breadcrumb">
            <a href="/" className="hover:text-amber-800 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> मुख्य पृष्ठ
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-400">वैधानिक नीतियां</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-amber-900 font-semibold">सेवा की शर्तें</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-sans font-medium">
            <Award className="w-3.5 h-3.5 text-amber-700" /> सार्वजनिक धर्मार्थ कालगणना यंत्र
          </span>
        </div>

        {/* Hero Title Section */}
        <section className="relative bg-gradient-to-br from-amber-50/90 via-white/80 to-orange-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/15 shadow-sm text-center space-y-3">
          <GoldenCornerBrackets size="lg" />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-500 text-amber-50 shadow-md mx-auto mb-1">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#26150b]">
            सेवा की शर्तें एवं खगोलीय पंचांग अस्वीकरण
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-sans leading-relaxed">
            सनातन घड़ी एक निःशुल्क, सार्वजनिक एवं वैज्ञानिक वैदिक कालगणना सेवा है। इसका उपयोग करते समय निम्नलिखित शास्त्रीय व वैधानिक शर्तों की सहमति अनिवार्य है।
          </p>
          <div className="pt-2 text-xs text-stone-500 font-sans">
            प्रभावी तिथि: विक्रम संवत २०८१ (अक्टूबर २०२६) • संस्करण: १.०
          </div>
        </section>

        {/* Core Terms Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Public Dharmic Utility */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                १. सेवा का स्वरूप एवं उद्देश्य
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              सनातन घड़ी (Sanatan Ghadi) का उद्देश्य विश्वभर के सनातन धर्मावलंबियों, शोधार्थियों और परिवारों को विज्ञापन-मुक्त, उच्च-परिशुद्धता वैदिक पंचांग, मुहूर्त, चौघड़िया और कुण्डली उपकरण उपलब्ध कराना है। यह सेवा गैर-व्यावसायिक व सार्वजनिक लोकहित में संचालित है।
            </p>
          </article>

          {/* 2. NASA JPL Ephemeris & Drik Standard */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-100 text-orange-800">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                २. खगोलीय गणना मानक (AstroEngine)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              सभी ग्रहों की स्थितियां, सूर्योदय, सूर्यास्त और तिथियां <strong>NASA JPL DE405</strong> एफिमेरिस एवं <strong>चित्रपक्षीय (लाहिड़ी) अयनांश (Lahiri Ayanamsha)</strong> पर आधारित हैं। सूर्योदय गणना में ऊपरी बिम्ब (Upper Limb) और ३४ आर्कमिनट का मानक वायुमंडलीय अपवर्तन सम्मिलित है।
            </p>
          </article>

          {/* 3. Astrological Guidance Disclaimer */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-100 text-red-800">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                ३. ज्योतिषीय परामर्श अस्वीकरण
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              प्रस्तुत जन्म कुण्डली, विंशोत्तरी दशा, ३६ गुण मिलान और साढ़े साती विश्लेषण महर्षि पराशर रचित 'बृहत्पाराशर होराशास्त्र' के गणितीय नियमों पर आधारित हैं। यह सांस्कृतिक व व्यक्तिगत मार्गदर्शन हेतु है। किसी भी मांगलिक संस्कार (विवाह, गृह प्रवेश) हेतु स्थानीय कुल पुरोहित का परामर्श भी मान्य है।
            </p>
          </article>

          {/* 4. Intellectual Property & Code Decoupling */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                ४. बौद्धिक संपदा एवं ओपन सोर्स इंजन
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              हमारा खगोलीय गणना इंजन (<code>src/engine/</code>) <strong>MIT License</strong> के अंतर्गत पूर्णतः क्लीन-रूम व कॉपीराइट-मुक्त है। 'सनातन घड़ी' ब्रांड पहचान, कस्टम 3D वैदिक आइकन्स और UI डिज़ाइन भारतीय कॉपीराइट कानून के अंतर्गत सुरक्षित हैं।
            </p>
          </article>
        </div>

        {/* Limitation of Liability & Jurisdiction */}
        <section className="bg-white/90 rounded-2xl p-6 sm:p-8 border border-amber-900/15 shadow-xs space-y-4 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base sm:text-lg">
            <ShieldAlert className="w-5 h-5 text-amber-800" />
            <span>५. दायित्व की सीमा एवं क्षेत्राधिकार (Limitation of Liability)</span>
          </div>
          <p>
            सनातन घड़ी सेवा "जैसी है" (AS IS) और "जैसी उपलब्ध है" (AS AVAILABLE) आधार पर प्रदान की जाती है। डेवलपर्स किसी भी अप्रत्यक्ष, आकस्मिक या परिणामी नुकसान के लिए उत्तरदायी नहीं होंगे। यह सेवा भारतीय गणराज्य के कानूनों के अधीन है और किसी भी कानूनी विवाद की स्थिति में न्यायालयीय क्षेत्राधिकार केवल भारत रहेगा।
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

export default TermsOfService;