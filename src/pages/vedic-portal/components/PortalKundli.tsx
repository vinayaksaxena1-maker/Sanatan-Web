import React, { useState } from 'react';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';

export const PortalKundli: React.FC = () => {
  const [userName, setUserName] = useState<string>('राहुल शर्मा');
  const [dob, setDob] = useState<string>('1996-10-24');
  const [tob, setTob] = useState<string>('09:42');
  const [place, setPlace] = useState<string>('वाराणसी, उत्तर प्रदेश');
  const [gender, setGender] = useState<string>('पुरुष');
  const [analyzedName, setAnalyzedName] = useState<string>('राहुल शर्मा');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzedName(userName.trim() || 'जातक');
  };

  return (
    <section className="space-y-4 font-serif" id="kundli">
      <div className="flex items-center justify-between border-b border-[#dec9ab]/60 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ea580c]"></span>
          <h2 className="text-2xl font-bold text-[#26150b]">जन्म कुण्डली निर्माण एवं तात्कालिक फलादेश</h2>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-[#fff2e8] text-[#c2410c] font-bold border border-[#ffd8bf] shadow-xs">
          बृहत् पराशर होरा शास्त्र आधारित
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* BOX 1: कुण्डली निर्माण फॉर्म (5 Cols) with Brackets */}
        <div className="lg:col-span-5 glass-panel-warm rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-[#dec9ab] shadow-xs relative overflow-hidden">
          <SacredGeometryWatermark className="opacity-15" />
          <GoldenCornerBrackets size="md" />

          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between border-b border-[#e5d5be]/70 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#ea580c]/15 text-[#ea580c] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#26150b]">मुफ्त जन्म कुण्डली निर्माण</h3>
                  <p className="text-[11px] text-[#735641]">सटीक जन्म विवरण अंकित करें</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 shadow-xs">१००% निःशुल्क</span>
            </div>

            <form className="space-y-3.5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-[#382012] mb-1">जातक का पूरा नाम</label>
                <div className="relative">
                  <input
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#dec9ab] bg-white/90 text-[#26150b] focus:ring-2 focus:ring-[#ea580c] focus:outline-hidden"
                    required
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#b8860b] text-[18px]">person</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#382012] mb-1">जन्म तिथि</label>
                  <input
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#dec9ab] bg-white/90 text-[#26150b] focus:ring-2 focus:ring-[#ea580c] focus:outline-hidden"
                    required
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#382012] mb-1">जन्म समय</label>
                  <input
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#dec9ab] bg-white/90 text-[#26150b] focus:ring-2 focus:ring-[#ea580c] focus:outline-hidden"
                    required
                    type="time"
                    value={tob}
                    onChange={(e) => setTob(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#382012] mb-1">जन्म स्थान (नगर / जिला / राज्य)</label>
                <div className="relative">
                  <input
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#dec9ab] bg-white/90 text-[#26150b] focus:ring-2 focus:ring-[#ea580c] focus:outline-hidden"
                    required
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#b8860b] text-[18px]">location_on</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#382012] mb-1">लिंग</label>
                <div className="grid grid-cols-3 gap-2">
                  {['पुरुष', 'स्त्री', 'अन्य'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-2 text-center rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        gender === g
                          ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-xs'
                          : 'border-[#dec9ab] bg-white/80 text-[#26150b] hover:border-[#ea580c]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ea580c] via-[#d95d0f] to-[#c2410c] hover:brightness-110 text-white font-bold text-base shadow-[0_4px_16px_rgba(217,93,15,0.35)] transition-all flex items-center justify-center gap-2 group mt-2 cursor-pointer"
                type="submit"
              >
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                <span>कुण्डली बनाएं व विश्लेषण देखें</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-[#dec9ab]/50 flex items-center justify-between text-[11px] text-[#735641] relative z-10">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-700">lock</span> सुरक्षित एवं गोपनीय
            </span>
            <span>आयनांश: चित्रपक्षीय (लाहिड़ी)</span>
          </div>
        </div>

        {/* BOX 2: तात्कालिक कुण्डली फलादेश एवं लग्न विवरण (7 Cols) with Sacred Watermark & Brackets */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-[#dec9ab] shadow-xs bg-gradient-to-br from-[#fffbf5] to-[#fbf2e3] relative overflow-hidden">
          <SacredGeometryWatermark className="opacity-25" />
          <GoldenCornerBrackets size="lg" />

          <div className="space-y-5 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dec9ab]/70 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#c2410c] uppercase tracking-wider block">तात्कालिक लग्न एवं ग्रह स्थिति</span>
                <h3 className="text-xl font-bold text-[#26150b]">जातक: {analyzedName} (सिंह लग्न)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#fde8d7] text-[#c2410c] text-xs font-bold border border-[#f7c29e] shadow-xs">
                  लग्न: सिंह (०८° १९')
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[#065f46] text-xs font-bold border border-emerald-300 shadow-xs">
                  शुभ वर्ग
                </span>
              </div>
            </div>

            {/* Coordinates Cards with Micro-Elevation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/60 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                <div className="text-[11px] text-[#735641]">चन्द्र राशि</div>
                <div className="text-sm font-bold text-[#26150b] mt-0.5">कर्क राशि</div>
                <div className="text-[10px] text-[#b8860b]">पुष्य नक्षत्र • पद ३</div>
              </div>
              <div className="p-3 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/60 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                <div className="text-[11px] text-[#735641]">सूर्य राशि</div>
                <div className="text-sm font-bold text-[#26150b] mt-0.5">तुला (नीच भंग)</div>
                <div className="text-[10px] text-[#c2410c]">स्वाति नक्षत्र • पद १</div>
              </div>
              <div className="p-3 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/60 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                <div className="text-[11px] text-[#735641]">वर्तमान महादशा</div>
                <div className="text-sm font-bold text-[#c2410c] mt-0.5">गुरु - शुक्र</div>
                <div className="text-[10px] text-[#735641]">२०२७ तक प्रभावी</div>
              </div>
              <div className="p-3 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/60 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                <div className="text-[11px] text-[#735641]">शुभ रत्न / धातु</div>
                <div className="text-sm font-bold text-[#b8860b] mt-0.5">माणिक्य / सुवर्ण</div>
                <div className="text-[10px] text-emerald-700">अनामिका अंगुली</div>
              </div>
            </div>

            {/* Vedic Kundli Diamond Visual & Predictions Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Diamond Lagna Kundali Chart */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-2 rounded-2xl bg-white/90 border border-[#dec9ab]/70 shadow-xs hover:border-[#ea580c] transition-colors">
                <div className="w-full max-w-[210px] aspect-square relative">
                  <svg className="w-full h-full text-[#c8b59b] fill-none stroke-current" strokeWidth="1.4" viewBox="0 0 300 300">
                    <rect className="stroke-[#b89b64]" height="280" width="280" x="10" y="10" />
                    <line className="stroke-[#b89b64]" x1="10" x2="290" y1="10" y2="290" />
                    <line className="stroke-[#b89b64]" x1="290" x2="10" y1="10" y2="290" />
                    <polygon className="stroke-[#ea580c]" points="150,10 290,150 150,290 10,150" />
                  </svg>
                  {/* House 1 (Lagna) */}
                  <div className="absolute top-[18%] left-[45%] text-center transform -translate-x-1/2">
                    <span className="font-bold text-[#c2410c] text-xs">५</span>
                    <div className="text-[9px] font-bold text-[#26150b]">लग्न (सिंह)</div>
                  </div>
                  {/* House 4 */}
                  <div className="absolute top-[45%] left-[20%] text-center">
                    <span className="font-bold text-[#735641] text-xs">८</span>
                    <div className="text-[8px] font-bold text-[#2a674c]">बुध गुरु</div>
                  </div>
                  {/* House 7 */}
                  <div className="absolute bottom-[20%] left-[45%] text-center transform -translate-x-1/2">
                    <span className="font-bold text-[#c2410c] text-xs">११</span>
                    <div className="text-[8px] font-bold text-[#b8860b]">शनि</div>
                  </div>
                  {/* House 10 */}
                  <div className="absolute top-[45%] right-[20%] text-center">
                    <span className="font-bold text-[#735641] text-xs">२</span>
                    <div className="text-[8px] font-bold text-[#c2410c]">शुक्र (उ)</div>
                  </div>
                  {/* House 12 */}
                  <div className="absolute top-[10%] right-[22%] text-center">
                    <span className="font-bold text-[#735641] text-[10px]">४</span>
                    <div className="text-[8px] font-bold text-[#26150b]">चन्द्र</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#735641] font-semibold mt-1">लग्न कुण्डली चक्र (D1 Lagna Chart)</span>
              </div>

              {/* Core Falam & Guidance */}
              <div className="sm:col-span-7 space-y-2.5">
                <div className="p-3 rounded-xl bg-white/70 border border-[#dec9ab]/60 space-y-1 hover:border-[#ea580c] transition-colors">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#c2410c]">
                    <span className="material-symbols-outlined text-[16px]">psychology</span>
                    <span>व्यक्तित्व एवं मानसिक स्वभाव</span>
                  </div>
                  <p className="text-xs text-[#5a3822] leading-relaxed">
                    सिंह लग्न के प्रभाव से आपमें स्वाभाविक नेतृत्व क्षमता, स्पष्टवादिता और दृढ़ संकल्प रहेगा। कर्क राशि के चंद्रमा से कल्पनाशक्ति व संवेदनशीलता प्रखर है।
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/70 border border-[#dec9ab]/60 space-y-1 hover:border-[#b8860b] transition-colors">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#b8860b]">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    <span>वर्तमान गोचर एवं कार्यक्षेत्र</span>
                  </div>
                  <p className="text-xs text-[#5a3822] leading-relaxed">
                    दशम भाव पर शुभ ग्रहों की दृष्टि से राजकीय कार्य, व्यवसाय व उच्च शिक्षा में विशेष लाभ। आगामी ३ मास में नवीन अनुबंध के प्रबल योग हैं।
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#dec9ab]/60 flex flex-wrap items-center justify-between gap-2 relative z-10">
            <div className="text-xs text-[#735641]">
              विस्तृत ३२ पृष्ठीय कुण्डली, नवमांश (D9) व वर्षफल उपलब्ध
            </div>
            <button
              className="px-4 py-2 rounded-xl bg-[#f0e5d1] hover:bg-[#ea580c] hover:text-white text-[#26150b] text-xs font-bold border border-[#dec9ab] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>सम्पूर्ण कुण्डली विवरण सुरक्षित करें (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
