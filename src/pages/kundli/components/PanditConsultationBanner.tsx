/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Component: PanditConsultationBanner
 * CTA Banner: Astrologer Consultation & A4 Janampatrika Trigger
 */

import React from 'react';
import { PhoneCall, Printer, Sparkles, BookOpen } from 'lucide-react';

interface PanditConsultationBannerProps {
  onOpenPrintModal: () => void;
}

export const PanditConsultationBanner: React.FC<PanditConsultationBannerProps> = ({
  onOpenPrintModal
}) => {
  return (
    <section className="w-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
      {/* Decorative Background Swastik / Glow */}
      <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none select-none text-9xl font-serif">
        卐
      </div>

      <div className="flex flex-col gap-2 max-w-2xl z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold w-fit text-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>काशी के प्रकांड ज्योतिर्विदों द्वारा शास्त्रीय विश्लेषण</span>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif leading-tight">
          क्या आप अपनी कुण्डली का संपूर्ण व्यक्तिगत फलादेश चाहते हैं?
        </h3>
        <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
          १००+ पृष्ठों की हस्तनिर्मित बृहत् जन्म पत्रिका रिपोर्ट प्राप्त करें अथवा श्री काशी विश्वनाथ ज्योतिर्विद परिषद के आचार्यों से सीधे फोन पर परामर्श लें।
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10 w-full sm:w-auto">
        <button
          type="button"
          onClick={onOpenPrintModal}
          className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-amber-50 text-amber-900 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-amber-700" />
          <span>पारंपरिक A4 जन्मपत्रिका प्रिंट</span>
        </button>

        <a
          href="tel:+919876543210"
          className="w-full sm:w-auto px-5 py-3 bg-amber-600/80 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400/30"
        >
          <PhoneCall className="w-4 h-4" />
          <span>आचार्य से बात करें</span>
        </a>
      </div>
    </section>
  );
};
