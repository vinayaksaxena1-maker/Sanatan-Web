import React from 'react';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';

export const PortalRightNow: React.FC = () => {
  return (
    <section
      className="glass-panel-warm rounded-3xl p-5 sm:p-7 border-2 border-emerald-400 shadow-[0_12px_36px_-6px_rgba(42,103,76,0.18)] space-y-5 bg-gradient-to-br from-[#fffdfa] via-[#f7fff9] to-[#edfcf2] relative overflow-hidden font-serif"
      id="right-now-status"
    >
      {/* Decorative Luminous Aura & Corner Brackets */}
      <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-emerald-100/70 blur-2xl pointer-events-none -z-10"></div>
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.07]" />
      <GoldenCornerBrackets size="lg" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/70 pb-3.5 relative z-10">
        <div className="flex items-center gap-3">
          <VedicIcon3D name="signal" size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#26150b]">राइट नाउ (Right Now) • तात्कालिक काल निर्णय</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 flex items-center gap-1.5 shadow-xs">
                {/* Luminous Pulsing Radar Wave */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 shadow-[0_0_8px_#10b981]"></span>
                </span>
                लाइव स्थिति
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#735641]">जटिल नक्षत्र-करण समझे बिना १ सेकंड में जानें: क्या अभी शुभ कार्य शुरू कर सकते हैं?</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3.5 py-1.5 rounded-xl bg-white/95 border border-[#dec9ab] text-xs font-bold text-[#26150b] shadow-xs flex items-center gap-1.5 hover:border-[#ea580c] transition-colors">
            <VedicIcon3D name="clock" size="sm" />
            शेष समय: <span className="text-[#c2410c] font-mono font-bold text-sm">१ घंटा ४२ मिनट</span>
          </span>
        </div>
      </div>

      {/* Active Live Traffic Signal Banner with Subtle Gold Rim Glow */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border-2 border-emerald-400 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden z-10 hover:shadow-[0_12px_28px_-4px_rgba(16,185,129,0.25)] transition-shadow">
        <div className="flex items-start sm:items-center gap-3.5">
          <VedicIcon3D name="shubh" size="lg" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="relative flex h-4 w-4 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 shadow-[0_0_12px_#10b981]"></span>
              </span>
              <span className="text-lg sm:text-2xl font-bold text-emerald-900">अभी शुभ समय चल रहा है (अमृत काल)</span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-bold tracking-wide shadow-xs">
                अति उत्तम
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed font-medium">
              अमृत चौघड़िया (शाम ०४:३० तक प्रभावी) • नया कार्य, दुकान उद्घाटन, नवीन अनुबंध, सोना-भूमि खरीदारी या मांगलिक निर्णय आरंभ करने हेतु प्रशस्त।
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-300 text-center shadow-xs">
          <div>
            <div className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">१ सेकंड सलाह</div>
            <div className="text-sm font-bold text-emerald-900 flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-emerald-700">verified</span>
              हाँ! कार्य आरंभ करें
            </div>
          </div>
        </div>
      </div>

      {/* 3-State Traffic Signal Comparison Strip with Visible Elevation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative z-10">
        {/* Green Signal */}
        <div className="p-4 rounded-2xl bg-emerald-50/95 border-2 border-emerald-400 space-y-1.5 relative shadow-sm hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_14px_28px_-4px_rgba(16,185,129,0.35)] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-90"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 shadow-[0_0_8px_#10b981]"></span>
              </span>
              हरा संकेत (सक्रिय)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 shadow-xs">शुभ व अमृत</span>
          </div>
          <div className="text-sm font-bold text-emerald-900">नया काम निसंकोच करें</div>
          <p className="text-[11px] text-emerald-800 leading-snug">दुकान, रजिस्ट्री, नया निवेश, पूजा अनुष्ठान एवं महत्वपूर्ण यात्रा हेतु सर्वोत्तम काल।</p>
        </div>

        {/* Yellow Signal */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-1.5 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_14px_28px_-4px_rgba(217,119,6,0.3)] hover:border-amber-400 transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              पीला संकेत (आगामी)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">सामान्य / चर</span>
          </div>
          <div className="text-sm font-bold text-amber-900">नित्य कार्य व सामान्य यात्रा</div>
          <p className="text-[11px] text-amber-800 leading-snug">दैनिक व्यापार, सामान्य लेन-देन व पूर्व निर्धारित कार्यों के लिए मध्यम फलदायी।</p>
        </div>

        {/* Red Signal Warning */}
        <div className="p-4 rounded-2xl bg-red-50/80 border border-red-300 space-y-1.5 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_14px_28px_-4px_rgba(220,38,38,0.3)] hover:border-red-400 transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              लाल संकेत (सावधान)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold border border-red-200">राहु काल ०४:३० से</span>
          </div>
          <div className="text-sm font-bold text-red-900">नया काम व खरीदारी टालें</div>
          <p className="text-[11px] text-red-800 leading-snug">सायं ०४:३० से ०६:०० बजे तक राहु काल रहेगा। इस अवधि में शुभ संकल्प स्थगित रखें।</p>
        </div>
      </div>
    </section>
  );
};
