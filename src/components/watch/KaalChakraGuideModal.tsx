/**
 * Sanatan Web (सनातन घड़ी)
 * Component: KaalChakraGuideModal
 * Interactive Step-by-Step Guide for Reading Kaal Chakra & Choghadiya Dial
 * Light Theme: Chandan Frosted Glass, Amber Accents & Deep Bronze Typography
 */

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface KaalChakraGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KaalChakraGuideModal: React.FC<KaalChakraGuideModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 transition-all animate-in fade-in duration-200 font-serif cursor-pointer"
      onClick={onClose}
      onTouchStart={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EA] to-[#F5ECE0] border-2 border-[#D4AF37] rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(77,51,34,0.35)] relative text-left text-[#26150b] space-y-4 cursor-default scrollbar-thin scrollbar-thumb-amber-200"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dec9ab]/70 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shadow-2xs">
              <span className="material-symbols-outlined text-[22px] text-[#c2410c]">watch_later</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#26150b] leading-tight">
                कालचक्र को कैसे समझें व देखें?
              </h3>
              <p className="text-[11px] text-[#735641]">
                एनालॉग वैदिक घड़ी व मुहूर्त चक्र समझने की सरल मार्गदर्शिका
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-rose-100 border border-[#dec9ab] flex items-center justify-center text-stone-600 hover:text-rose-700 transition-colors cursor-pointer shadow-3xs shrink-0"
            aria-label="बंद करें"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Explanatory Cards */}
        <div className="space-y-3 text-xs leading-relaxed">
          
          {/* Card 1: 3 Colors Choghadiya */}
          <div className="p-3.5 rounded-2xl bg-white/90 border border-amber-200/90 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#c2410c]">
              <span>🎨 १. रंगों का संकेत (चौघड़िया मुहूर्त)</span>
            </div>
            <p className="text-[#5c3e2b] text-[11.5px]">
              घड़ी की बाहरी रिंग दिन और रात के १६ चौघड़िया खंडों में बंटी है, जो ३ रंगों द्वारा तुरंत समझ आते हैं:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
                <span className="font-bold block text-emerald-800">🟢 हरा (अत्यंत शुभ)</span>
                अमृत, शुभ, लाभ — नवीन व्यापार, खरीदारी, यात्रा व निवेश।
              </div>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
                <span className="font-bold block text-amber-800">🟡 पीला (सामान्य)</span>
                चल / चर — नियमित दिनचर्या, सफ़र व सामान्य कार्य।
              </div>
              <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 font-medium">
                <span className="font-bold block text-rose-800">🔴 लाल (वर्ज्य काल)</span>
                रोग, काल, उद्वेग — नए मांगलिक व बड़े वित्तीय निर्णय टालें।
              </div>
            </div>
          </div>

          {/* Card 2: 24 Horas Ring */}
          <div className="p-3.5 rounded-2xl bg-white/90 border border-amber-200/90 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#b8860b]">
              <span>🪐 २. भीतरी रिंग (२४ ग्रह होरा चक्र)</span>
            </div>
            <p className="text-[#5c3e2b] text-[11.5px]">
              चौघड़िया के ठीक भीतर २४ घंटों का होरा चक्र है। प्रत्येक घंटे का अधिपति एक नवग्रह होता है (सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि)।
              वर्तमान में जिस ग्रह की होरा चल रही होती है, वह विशेष सुनहरी चमक के साथ सक्रिय रहती है।
            </p>
          </div>

          {/* Card 3: Clock Hands & Real-Time IST */}
          <div className="p-3.5 rounded-2xl bg-white/90 border border-amber-200/90 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#26150b]">
              <span>⏱️ ३. घड़ी की सुइयां (वर्तमान समय)</span>
            </div>
            <p className="text-[#5c3e2b] text-[11.5px]">
              घड़ी की स्वर्ण व कृष्ण सुइयां आपके स्थानीय भारतीय मानक समय (IST) को दर्शाती हैं। जिस रंग के खंड पर सुई इस समय है, अभी वही मुहूर्त सक्रिय है।
            </p>
          </div>

          {/* Card 4: 1-Tap Interactive Touch */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#c2410c]">
              <span>👆 ४. किसी भी खंड पर टैप करें (Interactive)</span>
            </div>
            <p className="text-[#5c3e2b] text-[11.5px]">
              घड़ी के किसी भी चौघड़िया या होरा खंड पर अपनी उंगली से स्पर्श (क्लिक) करें। उस समय क्या कार्य करना शुभ है और क्या वर्जित है, उसका विस्तृत विवरण तुरंत नीचे कार्ड में खुल जाएगा।
            </p>
          </div>

        </div>

        {/* Footer Note */}
        <div className="pt-2 border-t border-[#dec9ab]/70 flex items-center justify-between text-[11px] text-[#735641]">
          <span>💡 स्क्रीन पर कहीं भी छूने पर यह विंडो बंद हो जाएगी।</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-xl bg-[#c2410c] text-white font-bold hover:bg-[#9a3412] transition-colors cursor-pointer shadow-2xs"
          >
            समझ गए (ठीक है)
          </button>
        </div>

      </div>
    </div>
  );

  return createPortal(content, document.body);
};
