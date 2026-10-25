/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 11: Privacy Policy & Data Sovereignty Pledge (गोपनीयता नीति एवं डेटा संप्रभुता)
 * Pure Web, React 19, Strict < 300 lines modular Neo-Vedic luxury standard
 */

import React from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import { GoldenCornerBrackets } from '../vedic-portal/components/GoldenCornerBrackets';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  MapPin, 
  EyeOff, 
  Cpu, 
  Scale, 
  Mail,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Content Viewport */}
      <main className="w-full pt-32 pb-20 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto space-y-8" id="privacy-policy">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 font-sans" aria-label="Breadcrumb">
            <a href="/" className="hover:text-amber-800 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> मुख्य पृष्ठ
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-400">वैधानिक नीतियां</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-amber-900 font-semibold">गोपनीयता नीति</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-sans font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-700" /> 100% शून्य क्लाउड संग्रह
          </span>
        </div>

        {/* Hero Title Section */}
        <section className="relative bg-gradient-to-br from-amber-50/90 via-white/80 to-orange-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/15 shadow-sm text-center space-y-3">
          <GoldenCornerBrackets size="lg" />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-500 text-amber-50 shadow-md mx-auto mb-1">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#26150b]">
            गोपनीयता नीति एवं व्यक्तिगत डेटा संप्रभुता
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-sans leading-relaxed">
            सनातन घड़ी आपकी गोपनीयता को पवित्र मानती है। हमारा मूल सिद्धांत है — <strong className="text-amber-900">"आपका डेटा, आपका अधिकार"</strong>। शून्य ट्रैकिंग, शून्य विज्ञापन और 100% क्लाइंट-साइड सुरक्षा।
          </p>
          <div className="pt-2 text-xs text-stone-500 font-sans">
            अंतिम नवीनीकरण: विक्रम संवत २०८१ (अक्टूबर २०२६) • संस्करण: १.०
          </div>
        </section>

        {/* Core Privacy Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Zero Server Data Storage */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                १. शून्य सर्वर डेटा संग्रह प्रतिज्ञा
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              सनातन घड़ी एक <strong>100% शुद्ध Client-Side Progressive Web App</strong> है। आपकी जन्म कुण्डली, नाम, जन्म समय, और नगर निर्देशांक हमारे किसी भी रिमोट सर्वर पर कभी नहीं भेजे जाते। सभी खगोलीय और पंचांग गणनाएं सीधे आपके डिवाइस के ब्राउज़र में संपन्न होती हैं।
            </p>
          </article>

          {/* 2. In-Browser IndexedDB Storage */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                <Database className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                २. स्थानीय डेटा संप्रभुता (IndexedDB)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              सहेजी गई जन्म कुण्डलियाँ और उपयोगकर्ता प्राथमिकताएं आपके डिवाइस की इन-ब्राउज़र <strong>Dexie.js (IndexedDB)</strong> में एन्क्रिप्टेड रूप से सुरक्षित रहती हैं। <strong>1-क्लिक JSON बैकअप</strong> द्वारा आप अपना संपूर्ण डेटा स्वयं निर्यात (Export) या पुनर्स्थापित (Import) कर सकते हैं।
            </p>
          </article>

          {/* 3. Location & GPS Policy */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-100 text-orange-800">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                ३. जीपीएस एवं स्थान अनुमति
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              स्थान (GPS) अनुमति केवल स्थानीय सूर्योदय, सूर्यास्त और लग्न की सटीक खगोलीय गणना हेतु ली जाती है। यदि आप स्थान अनुमति अस्वीकार करते हैं, तो ऐप बिना किसी रुकावट के <strong>उज्जयिनी प्राइम मेरिडियन (23.17° N, 75.78° E)</strong> या आपके चयनित नगर पर कार्य करती है।
            </p>
          </article>

          {/* 4. Zero Ads & Zero Tracking */}
          <article className="relative bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-amber-900/15 shadow-xs space-y-3">
            <GoldenCornerBrackets size="sm" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800">
                <EyeOff className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                ४. विज्ञापन एवं कुकीज़ से पूर्ण मुक्ति
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              सनातन घड़ी में कोई तृतीय-पक्ष विज्ञापन नेटवर्क (Google AdSense या Facebook Pixel), ट्रैकिंग कुकीज़ या व्यवहारिक निगरानी (Behavioral Profiling) कोड शामिल नहीं है। आपका आध्यात्मिक और ज्योतिषीय अध्ययन पूर्णतः निजी और पवित्र रहता है।
            </p>
          </article>
        </div>

        {/* Legal Compliance & Grievance */}
        <section className="bg-white/90 rounded-2xl p-6 sm:p-8 border border-amber-900/15 shadow-xs space-y-4 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base sm:text-lg">
            <Scale className="w-5 h-5 text-amber-800" />
            <span>५. भारतीय डिजिटल डेटा संरक्षण अधिनियम (DPDPA 2023) अनुपालन</span>
          </div>
          <p>
            सनातन घड़ी भारतीय संसद द्वारा पारित <strong>Digital Personal Data Protection Act (DPDPA 2023)</strong> एवं यूरोपीय संघ के <strong>GDPR</strong> के "डेटा न्यूनीकरण" (Data Minimization) और "उद्देश्य सीमा" (Purpose Limitation) के उच्चतम सिद्धांतों का पालन करती है। चूंकि हम कोई डेटा संग्रहीत ही नहीं करते, अतः डेटा लीक या दुरुपयोग का जोखिम शून्य है।
          </p>

          <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-stone-800">
              <Mail className="w-4 h-4 text-amber-800 shrink-0" />
              <span>गोपनीयता या डेटा संप्रभुता संबंधी प्रश्न के लिए संपर्क करें:</span>
            </div>
            <a 
              href="mailto:privacy@sanatan.web" 
              className="text-amber-900 font-semibold hover:underline flex items-center gap-1"
            >
              privacy@sanatan.web <ChevronRight className="w-4 h-4" />
            </a>
          </div>
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

export default PrivacyPolicy;