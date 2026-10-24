import React from 'react';

export const PortalRightNow: React.FC = () => {
  return (
    <section
      className="glass-panel-warm rounded-3xl p-5 sm:p-7 border-2 border-emerald-300 shadow-[0_12px_36px_-6px_rgba(42,103,76,0.14)] space-y-5 bg-gradient-to-br from-[#fffdfa] via-[#f7fff9] to-[#edfcf2] relative overflow-hidden font-serif"
      id="right-now-status"
    >
      {/* Decorative Luminous Aura */}
      <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-emerald-100/60 blur-2xl pointer-events-none -z-10"></div>
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/60 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[22px]">traffic</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#26150b]">राइट नाउ (Right Now) • तात्कालिक काल निर्णय</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                लाइव स्थिति
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#735641]">जटिल नक्षत्र-करण समझे बिना १ सेकंड में जानें: क्या अभी शुभ कार्य शुरू कर सकते हैं?</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3 py-1 rounded-xl bg-white/90 border border-[#dec9ab] text-xs font-bold text-[#26150b] shadow-xs flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ea580c] text-[16px]">timelapse</span>
            शेष समय: <span className="text-[#c2410c] font-mono font-bold">१ घंटा ४२ मिनट</span>
          </span>
        </div>
      </div>

      {/* Active Live Traffic Signal Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-emerald-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center shrink-0 text-emerald-700 shadow-inner">
            <span className="material-symbols-outlined text-[32px]">check_circle</span>
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg sm:text-2xl font-bold text-emerald-900">🟢 अभी शुभ समय चल रहा है (अमृत काल)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold tracking-wide">अति उत्तम</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed font-medium">
              अमृत चौघड़िया (शाम ०४:३० तक प्रभावी) • नया कार्य, दुकान उद्घाटन, नवीन अनुबंध, सोना-भूमि खरीदारी या मांगलिक निर्णय आरंभ करने हेतु प्रशस्त।
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-emerald-50/80 px-4 py-2.5 rounded-xl border border-emerald-200 text-center">
          <div>
            <div className="text-[10px] text-emerald-800 font-semibold">१ सेकंड सलाह</div>
            <div className="text-sm font-bold text-emerald-900 flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-emerald-700">verified</span>
              हाँ! कार्य आरंभ करें
            </div>
          </div>
        </div>
      </div>

      {/* 3-State Traffic Signal Comparison Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Green Signal */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/90 border-2 border-emerald-300 space-y-1 relative shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              हरा संकेत (सक्रिय)
            </span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">शुभ व अमृत</span>
          </div>
          <div className="text-sm font-bold text-emerald-900">नया काम निसंकोच करें</div>
          <p className="text-[11px] text-emerald-800 leading-snug">दुकान, रजिस्ट्री, नया निवेश, पूजा अनुष्ठान एवं महत्वपूर्ण यात्रा हेतु सर्वोत्तम काल।</p>
        </div>

        {/* Yellow Signal */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1 hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              पीला संकेत (आगामी)
            </span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 font-bold">सामान्य / चर</span>
          </div>
          <div className="text-sm font-bold text-amber-900">नित्य कार्य व सामान्य यात्रा</div>
          <p className="text-[11px] text-amber-800 leading-snug">दैनिक व्यापार, सामान्य लेन-देन व पूर्व निर्धारित कार्यों के लिए मध्यम फलदायी।</p>
        </div>

        {/* Red Signal Warning */}
        <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200 space-y-1 hover:border-red-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              लाल संकेत (सावधान)
            </span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-red-100 text-red-800 font-bold">राहु काल ०४:३० से</span>
          </div>
          <div className="text-sm font-bold text-red-900">नया काम व खरीदारी टालें</div>
          <p className="text-[11px] text-red-800 leading-snug">सायं ०४:३० से ०६:०० बजे तक राहु काल रहेगा। इस अवधि में शुभ संकल्प स्थगित रखें।</p>
        </div>
      </div>
    </section>
  );
};
