import React, { useState } from 'react';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';

const HINDI_NUMERALS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०', '११', '१२'];

export const PortalUpayVrat: React.FC = () => {
  const [japaCount, setJapaCount] = useState<number>(0);

  const handleJapaClick = () => {
    if (japaCount < 12) {
      setJapaCount(japaCount + 1);
    } else {
      setJapaCount(0); // Reset after 12
    }
  };

  const isCompleted = japaCount === 12;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch font-serif">
      {/* दैनिक वैदिक उपाय (7 Cols) with Golden Brackets */}
      <div className="lg:col-span-7 glass-panel-warm rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 relative overflow-hidden">
        <GoldenCornerBrackets size="md" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-[#c2410c] shadow-xs">
                <span className="material-symbols-outlined text-[18px]">light_mode</span>
              </div>
              <h3 className="text-lg font-bold text-[#26150b]">दैनिक वैदिक उपाय एवं सूर्य अर्घ्य विधि</h3>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full glass-pill text-[#b8860b] font-bold shadow-xs">आत्मकारक बल</span>
          </div>

          <p className="text-xs text-[#5a3822] leading-relaxed">
            आज के दिन तांबे के पात्र में शुद्ध जल, रक्तचन्दन व अक्षत मिलाकर भगवान सूर्य नारायण को अर्घ्य प्रदान करें। इससे पितृदोष की शांति एवं आरोग्यता की प्राप्ति होती है।
          </p>

          {/* Sacred Mantra Chant Display with Sri Yantra Watermark */}
          <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#ea580c]/30 text-center space-y-1 relative overflow-hidden shadow-xs hover:border-[#ea580c] transition-colors">
            <SacredGeometryWatermark className="opacity-[0.045]" />
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-[#c2410c] tracking-wider uppercase">मूल सूर्य बीज मन्त्र (१२ आवृत्ति जप)</span>
              <div className="text-2xl sm:text-3xl font-bold text-[#c2410c] py-1 tracking-wide">
                ॐ घृणिः सूर्याय नमः
              </div>
              <span className="text-xs text-[#735641] italic font-serif">"Om Ghrinih Suryaya Namah"</span>
            </div>
          </div>

          {/* Interactive Japa Counter in Hindi with Radar Pulse */}
          <div className="flex items-center justify-between glass-inner px-4 py-2.5 rounded-2xl bg-white/70 shadow-xs border-[#dec9ab]/60">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#735641] font-bold">जप संख्या:</span>
              <span className="text-xl font-bold text-[#c2410c] font-mono">
                {HINDI_NUMERALS[japaCount] || japaCount}
              </span>
              <span className="text-[#8c7166]">/ १२ मणके</span>
            </div>
            <button
              onClick={handleJapaClick}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
                isCompleted
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                  : 'bg-white border-[#dec9ab] hover:bg-[#ea580c] hover:text-white text-[#26150b]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isCompleted ? 'check_circle' : 'touch_app'}
              </span>
              <span>{isCompleted ? 'अर्घ्य संकल्प पूर्ण (पुनः प्रारंभ)' : 'मणका गिनें'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-[#5a3822] pt-2 border-t border-[#dec9ab]/50 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-amber-600 text-[16px]">water_drop</span>
            <span>ताम्र लोटा एवं लाल पुष्प अर्पण</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-rose-600 text-[16px]">volunteer_activism</span>
            <span>गाय को गुड़ व गेहूं खिलाएं</span>
          </div>
        </div>
      </div>

      {/* आगामी व्रत एवं पर्व (5 Cols) with Golden Brackets */}
      <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 relative overflow-hidden">
        <GoldenCornerBrackets size="md" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-[#b8860b] shadow-xs">
                <span className="material-symbols-outlined text-[18px]">event_upcoming</span>
              </div>
              <h3 className="text-lg font-bold text-[#26150b]">आगामी व्रत एवं पर्व सारणी</h3>
            </div>
            <span className="text-xs text-[#735641] font-semibold">शुक्ल पक्ष</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/60 space-y-1 hover:-translate-y-1 hover:border-[#ea580c] hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.22)] transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#c2410c]">कामदा एकादशी व्रत</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-[#c2410c] shadow-xs">कल</span>
              </div>
              <p className="text-[11px] text-[#735641]">समस्त पापों का नाश कर मनोकामना पूर्ण करने वाला परम पावन व्रत।</p>
              <div className="text-[10px] text-[#b8860b] font-bold">पारण समय: अगले दिन प्रातः ०६:१५ से ०८:३४</div>
            </div>

            <div className="p-3 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/60 space-y-1 hover:-translate-y-1 hover:border-[#ea580c] hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.22)] transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#26150b]">श्री हनुमान जयंती (चैत्र पूर्णिमा)</span>
                <span className="text-[10px] font-bold text-[#735641]">३ दिन पश्चात</span>
              </div>
              <p className="text-[11px] text-[#735641]">चित्रा नक्षत्र में पूर्णिमा का संयोग। शनि की साढ़ेसाती निवृत्ति हेतु सिद्ध काल।</p>
            </div>

            <div className="p-3 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/60 flex items-center justify-between hover:-translate-y-1 hover:border-[#ea580c] hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.22)] transition-all duration-300 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-[#26150b]">मेष संक्रांति (सौर नववर्ष)</div>
                <div className="text-[10px] text-[#735641]">सूर्य का मेष राशि में उच्च प्रवेश</div>
              </div>
              <span className="text-xs font-bold text-[#c2410c]">१४ अप्रैल</span>
            </div>
          </div>
        </div>

        <button
          className="w-full py-2.5 rounded-xl bg-[#f0e5d1] hover:bg-[#b8860b] hover:text-white text-[#26150b] text-xs font-bold border border-[#dec9ab] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs relative z-10"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">menu_book</span>
          <span>विक्रम संवत २०८१ हिन्दू पंचांग विवरण (PDF)</span>
        </button>
      </div>
    </div>
  );
};
