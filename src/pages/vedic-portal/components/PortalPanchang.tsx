import React from 'react';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';

export const PortalPanchang: React.FC = () => {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 font-serif relative overflow-hidden" id="panchang">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.07]" />
      <GoldenCornerBrackets size="lg" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#dec9ab]/60 pb-4 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c2410c] uppercase tracking-wider">
            <VedicIcon3D name="temple" size="sm" />
            <span>द्रिक पंचांग गणना • सूर्य-सिद्धांत अनुगामी</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b]">आज का विस्तृत दैनिक पंचांग</h2>
          <p className="text-xs sm:text-sm text-[#735641]">काशीस्थ सूर्योदय कालीन स्पष्ट पंचांग • शुद्ध काल निर्णय</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl glass-inner text-xs font-bold text-[#26150b] border border-[#dec9ab] shadow-xs">
            संवत्सर: क्रोधी (२०८१)
          </span>
          <span className="px-3 py-1.5 rounded-xl glass-inner text-xs font-bold text-[#c2410c] border border-[#dec9ab] shadow-xs">
            मास: चैत्र (शुक्ल पक्ष)
          </span>
        </div>
      </div>

      {/* 5 Key Limbs of Panchang with 3D Icons & Golden Hover Elevation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
        {/* 1. Tithi */}
        <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#c2410c]">१. तिथि</span>
            <VedicIcon3D name="tithi" size="sm" />
          </div>
          <div className="text-lg font-bold text-[#26150b]">शुक्ल त्रयोदशी</div>
          <div className="text-[11px] text-[#735641]">सायं ०७:१४ बजे तक, तदुपरांत चतुर्दशी</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold shadow-xs">शुभ तिथि</span>
        </div>

        {/* 2. Vaar */}
        <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#b8860b]">२. वार</span>
            <VedicIcon3D name="sun" size="sm" />
          </div>
          <div className="text-lg font-bold text-[#26150b]">गुरुवार (बृहस्पतिवार)</div>
          <div className="text-[11px] text-[#735641]">स्वामी: देवगुरु बृहस्पति</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold shadow-xs">विद्या व धर्म हेतु उत्तम</span>
        </div>

        {/* 3. Nakshatra */}
        <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#c2410c]">३. नक्षत्र</span>
            <VedicIcon3D name="nakshatra" size="sm" />
          </div>
          <div className="text-lg font-bold text-[#26150b]">उत्तर फाल्गुनी</div>
          <div className="text-[11px] text-[#735641]">द्वितीय पद (स्वामी: सूर्य) रात्रि ०३:२१ तक</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-bold shadow-xs">ध्रुव संज्ञक नक्षत्र</span>
        </div>

        {/* 4. Yoga */}
        <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2a674c]">४. योग</span>
            <VedicIcon3D name="yoga" size="sm" />
          </div>
          <div className="text-lg font-bold text-[#26150b]">हर्षण योग</div>
          <div className="text-[11px] text-[#735641]">दोपहर ०१:४५ तक, पश्चात वज्र</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold shadow-xs">हर्ष व सिद्धि प्रदाता</span>
        </div>

        {/* 5. Karana */}
        <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#735641]">५. करण</span>
            <VedicIcon3D name="karana" size="sm" />
          </div>
          <div className="text-lg font-bold text-[#26150b]">तैतिल करण</div>
          <div className="text-[11px] text-[#735641]">प्रातः ०८:२२ तक, तदुपरांत गर</div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-stone-100 text-stone-800 text-[10px] font-bold shadow-xs">चर करण</span>
        </div>
      </div>

      {/* Sun / Moon & Timings Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 relative z-10">
        {/* सूर्योदय एवं सूर्यास्त */}
        <div className="p-5 rounded-2xl glass-panel-warm border border-[#ea580c]/30 shadow-xs relative overflow-hidden bg-gradient-to-br from-[#fffdf9] to-[#fff3e5] hover:shadow-[0_10px_24px_-4px_rgba(234,88,12,0.18)] transition-all">
          <div className="flex items-start justify-between border-b border-[#dec9ab]/70 pb-3">
            <div className="flex items-center gap-3">
              <VedicIcon3D name="sun" size="lg" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base font-bold text-[#26150b]">सूर्योदय एवं सूर्यास्त</h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#fde8d7] text-[#c2410c] text-[10px] font-bold border border-[#f7c29e]">
                    दिनमान १२ घंटे २७ मिनट
                  </span>
                </div>
                <p className="text-[11px] text-[#735641]">पूजा, सूर्य अर्घ्य एवं त्रिकाल संध्या वंदन का पावन समय</p>
              </div>
            </div>
            <VedicIcon3D name="clock" size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:border-[#ea580c] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#c2410c] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
                  प्रातः सूर्योदय
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 font-bold">शुभ काल</span>
              </div>
              <div className="text-lg font-bold text-[#26150b] font-mono">
                ०६:१४ <span className="text-xs font-serif font-semibold text-[#735641]">पूर्वाह्न</span>
              </div>
              <div className="text-[10px] text-[#735641]">अर्घ्य, गायत्री जप व सूर्य उपासना</div>
            </div>

            <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:border-[#b8860b] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#b8860b] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#b8860b]"></span>
                  सायं सूर्यास्त
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 font-bold">संधिकाल</span>
              </div>
              <div className="text-lg font-bold text-[#26150b] font-mono">
                ०६:४१ <span className="text-xs font-serif font-semibold text-[#735641]">अपराह्न</span>
              </div>
              <div className="text-[10px] text-[#735641]">सांध्य आरती, दीपदान व संध्या वंदन</div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#dec9ab]/60 flex items-center justify-between text-xs text-[#735641]">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="material-symbols-outlined text-amber-600 text-[15px]">wb_twilight</span>
              <span>प्रातः संधिकाल: ०५:४८ – ०६:१४ पूर्वाह्न</span>
            </div>
            <span className="text-[11px] font-semibold text-[#c2410c]">सूर्य संक्रांति: मीन राशि</span>
          </div>
        </div>

        {/* चंद्रोदय एवं चंद्रास्त */}
        <div className="p-5 rounded-2xl glass-panel-warm border border-[#dec9ab] shadow-xs relative overflow-hidden bg-gradient-to-br from-[#fffdf9] to-[#f4f7fa] hover:shadow-[0_10px_24px_-4px_rgba(42,103,76,0.18)] transition-all">
          <div className="flex items-start justify-between border-b border-[#dec9ab]/70 pb-3">
            <div className="flex items-center gap-3">
              <VedicIcon3D name="moon" size="lg" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base font-bold text-[#26150b]">चंद्रोदय एवं चंद्रास्त</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    चंद्र कन्या राशि • हस्त
                  </span>
                </div>
                <p className="text-[11px] text-[#735641]">व्रत खोलने, चंद्र अर्घ्य एवं रात्रि साधना हेतु</p>
              </div>
            </div>
            <VedicIcon3D name="tithi" size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:border-[#2a674c] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2a674c] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#2a674c]"></span>
                  चंद्रोदय समय
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-800 font-bold">दर्शन मुहूर्त</span>
              </div>
              <div className="text-lg font-bold text-[#26150b] font-mono">
                ०५:२२ <span className="text-xs font-serif font-semibold text-[#735641]">अपराह्न</span>
              </div>
              <div className="text-[10px] text-[#735641]">सायं चंद्र दर्शन व अर्घ्य अर्पण</div>
            </div>

            <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:border-[#735641] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#735641] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  चंद्रास्त समय
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-100 text-stone-800 font-bold">अगले दिन</span>
              </div>
              <div className="text-lg font-bold text-[#26150b] font-mono">
                ०५:०२ <span className="text-xs font-serif font-semibold text-[#735641]">पूर्वाह्न</span>
              </div>
              <div className="text-[10px] text-[#735641]">उषाकाल पूर्व चंद्र अस्त</div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#dec9ab]/60 flex items-center justify-between text-xs text-[#735641]">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#b8860b]">
              <span className="material-symbols-outlined text-[15px]">stars</span>
              <span>प्रदोष व्रत पारणा एवं अर्घ्य समय</span>
            </div>
            <span className="text-[11px] text-[#2a674c] font-bold">शुक्ल त्रयोदशी कला</span>
          </div>
        </div>
      </div>

      {/* Shubh & Ashubh Muhurat Cards with Micro-Elevation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {/* शुभ मुहूर्त */}
        <div className="p-4 rounded-2xl glass-inner space-y-3 bg-white/75 border-[#2e7d32]/30 hover:border-[#2e7d32] hover:shadow-[0_8px_20px_-3px_rgba(46,125,50,0.2)] transition-all">
          <div className="flex items-center gap-2 border-b border-[#dec9ab]/50 pb-2">
            <VedicIcon3D name="shubh" size="sm" />
            <h4 className="text-sm font-bold text-[#26150b]">शुभ मुहूर्त चक्र</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200 shadow-xs">
              <span className="text-emerald-900 font-bold">अभिजित मुहूर्त:</span>
              <span className="font-bold text-emerald-800 font-mono">११:५८ – १२:४९ अपराह्न</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">ब्रह्म मुहूर्त:</span>
              <span className="font-semibold text-[#26150b]">०४:३८ – ०५:२६ पूर्वाह्न</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">विजय मुहूर्त:</span>
              <span className="font-semibold text-[#26150b]">०२:३० – ०३:२२ अपराह्न</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">गोधूलि मुहूर्त:</span>
              <span className="font-semibold text-[#26150b]">०६:३९ – ०७:०२ सायं</span>
            </div>
          </div>
        </div>

        {/* अशुभ काल चेतावनी */}
        <div className="p-4 rounded-2xl glass-inner space-y-3 bg-gradient-to-br from-[#fee2e2]/40 to-white border-[#fca5a5]/70 hover:border-[#ba1a1a] hover:shadow-[0_8px_20px_-3px_rgba(186,26,26,0.2)] transition-all">
          <div className="flex items-center gap-2 border-b border-[#fca5a5]/50 pb-2">
            <VedicIcon3D name="ashubh" size="sm" />
            <h4 className="text-sm font-bold text-[#ba1a1a]">अशुभ काल (त्याज्य समय)</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-1.5 rounded-lg bg-red-100/70 border border-red-300 shadow-xs">
              <span className="text-red-900 font-bold">राहु काल (वर्ज्य):</span>
              <span className="font-bold text-red-800 font-mono">०४:३० – ०६:०० अपराह्न</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">यमगण्ड काल:</span>
              <span className="font-semibold text-[#26150b]">०६:१४ – ०७:५१ पूर्वाह्न</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">गुलिक काल:</span>
              <span className="font-semibold text-[#26150b]">०९:२८ – ११:०५ पूर्वाह्न</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#735641]">दिशा शूल:</span>
              <span className="font-bold text-[#ba1a1a]">दक्षिण दिशा (परिहार: दही ग्रहण)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
