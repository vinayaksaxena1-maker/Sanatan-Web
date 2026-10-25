/**
 * Sanatan Web (सनातन घड़ी)
 * Component: SettingsTopBar
 * Heritage Scrim, Breadcrumb, Ephemeris Authority Ribbon & Factory Reset Trigger
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { Sparkles, RotateCcw, CheckCircle2, Info } from 'lucide-react';

interface SettingsTopBarProps {
  onResetAll: () => void;
  toastMessage: { text: string; type: 'success' | 'info' } | null;
}

export const SettingsTopBar: React.FC<SettingsTopBarProps> = ({
  onResetAll,
  toastMessage,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#fffdfa] via-[#fdf7ee] to-[#fbf2e3] border border-[#dec9ab]/70 shadow-[0_8px_30px_rgb(180,120,40,0.06)] space-y-5">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      <div className="relative z-10 space-y-5">
        {/* Breadcrumb & Authority Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#735641]">
          <div className="flex items-center gap-1.5 font-medium">
            <a href="/" className="hover:text-[#c2410c] transition-colors flex items-center gap-1">
              <span>मुख्य पृष्ठ</span>
            </a>
            <span>/</span>
            <span className="text-[#c2410c] font-bold">सिस्टम सेटिंग्स</span>
            <span>/</span>
            <span className="text-[#26150b] font-semibold">अयनांश एवं ज्योतिषीय मानक</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-950 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            <span>JPL Ephemeris शुद्ध दृश्य काल गणना • १,९०२ टेस्ट्स प्रमाणित</span>
          </div>
        </div>

        {/* Title & Reset Action */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-1">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider uppercase font-serif">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>।। सर्वसिद्धिप्रदायिनी व्यवस्था ।।</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#26150b] tracking-tight leading-tight">
              सिस्टम सेटिंग्स, अयनांश एवं खगोलीय मानक
            </h1>
            <p className="text-xs sm:text-sm text-[#735641] leading-relaxed">
              अयनांश प्रणाली (लाहिड़ी/KP/रमन), भाव गणना पद्धति (श्रीपति/प्लेसिडस), ५,०००+ भारतीय नगर, बहुभाषी प्राथमिकताएं एवं ऑफलाइन इंजन डायग्नोस्टिक्स का संपूर्ण नियंत्रण।
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onResetAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-rose-50 text-stone-700 hover:text-rose-700 text-xs font-bold border border-amber-200/80 shadow-xs cursor-pointer transition-all active:scale-95"
              title="सभी सेटिंग्स को फ़ैक्टरी डिफ़ॉल्ट पर रीसेट करें"
            >
              <RotateCcw className="w-4 h-4 text-amber-600" />
              <span>फ़ैक्टरी डिफ़ॉल्ट रीसेट</span>
            </button>
          </div>
        </div>

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-800 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-800 dark:text-amber-200'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        )}
      </div>
    </section>
  );
};
