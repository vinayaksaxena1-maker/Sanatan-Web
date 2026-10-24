import React, { useState, useEffect } from 'react';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';

export const PortalHero: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('११:४२:०८');
  const [ghatiStr, setGhatiStr] = useState<string>('१३ घटी ४० पल');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format IST time into Hindi numerals
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'अपराह्न' : 'पूर्वाह्न';
      const h12 = hours % 12 || 12;

      const toHindi = (n: number) => {
        const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return String(n).padStart(2, '0').split('').map(d => hindiDigits[parseInt(d, 10)] || d).join('');
      };

      setTimeStr(`${toHindi(h12)}:${toHindi(minutes)}:${toHindi(seconds)} ${ampm}`);

      // Calculate Ghati from approx sunrise (06:14 AM)
      const sunriseMinutes = 6 * 60 + 14;
      const currentMinutes = hours * 60 + minutes;
      let diff = currentMinutes - sunriseMinutes;
      if (diff < 0) diff += 1440; // 24 hours in minutes
      const ghati = Math.floor(diff / 24);
      const pala = Math.floor((diff % 24) * 2.5);

      setGhatiStr(`${toHindi(ghati)} घटी ${toHindi(pala)} पल`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative rounded-3xl overflow-hidden border border-[#d95d0f]/25 shadow-[0_20px_48px_-12px_rgba(194,65,12,0.16)] min-h-[460px] flex items-center font-serif">
      {/* Sacred Temple Carvings & Sri Yantra Wallpaper */}
      <img
        alt="प्राचीन वैदिक मन्दिर भित्ति चित्र एवं श्री यंत्र"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4jouOIEefaLFyavANZmr7I1BwXGL7i3Uo4YLy_7lxqQ5JBGZAO99Om2jJR0l1suknoz2m7x3RknCne57p-oOw8OEfS76WovgaXYH0fnaAGBLY_os9o6WJaVLkxAzDYqhfVuUmWwd5gy4NvQLO_hUyve1mfq8_xORWZwhKLgRoitc7YBw_3oXAeyqsIvoaxRe0jUAonnNQrRf8Csw4IP_HQl4D7eBxppxcuIqrU600iN5YNqB4SenDHQ"
      />

      {/* Elegant Warm Chandan Frosted Glass Overlay for Contrast and Hindi Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff9f0]/95 via-[#fff8ed]/88 to-[#fbeecc]/82 backdrop-blur-[7px]"></div>
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full ambient-glow-gold pointer-events-none opacity-80"></div>
      <SacredGeometryWatermark className="opacity-20" />
      <GoldenCornerBrackets size="lg" />

      <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Panchang Overview */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dec9ab]/70 pb-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[#c2410c] text-xs font-bold tracking-wide border border-[#ea580c]/30 shadow-xs">
                    <span className="material-symbols-outlined text-[16px] text-[#ea580c]">temple_hindu</span>
                    <span>श्री गणेशाय नमः • आज का दैनिक पंचांग</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#26150b] tracking-tight">दैनिक पंचांग एवं विशिष्ट मुहूर्त</h1>
                  <p className="text-xs text-[#735641] font-medium">काशीस्थ सूर्योदय कालीन वैदिक काल गणना • विक्रम संवत २०८१ (क्रोधी संवत्सर)</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl glass-inner bg-white/85 border border-[#dec9ab] shadow-xs text-right hover:border-[#ea580c] transition-colors">
                    <div className="text-[10px] text-[#735641] font-semibold">ऋतु एवं अयन</div>
                    <div className="text-xs font-bold text-[#b8860b]">वसन्त ऋतु • उत्तरायण</div>
                  </div>
                </div>
              </div>

              {/* 4 Quick Limb Cards with Micro-Elevation */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-2xl glass-inner bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between text-xs font-bold text-[#c2410c]">
                    <span>१. तिथि</span>
                    <span className="material-symbols-outlined text-[15px]">brightness_medium</span>
                  </div>
                  <div className="text-sm font-bold text-[#26150b]">शुक्ल त्रयोदशी</div>
                  <div className="text-[10px] text-[#735641]">सायं ०७:१४ तक</div>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[9px] font-bold">शुभ (जयदा)</span>
                </div>

                <div className="p-3 rounded-2xl glass-inner bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between text-xs font-bold text-[#b8860b]">
                    <span>२. वार</span>
                    <span className="material-symbols-outlined text-[15px]">wb_sunny</span>
                  </div>
                  <div className="text-sm font-bold text-[#26150b]">गुरुवार</div>
                  <div className="text-[10px] text-[#735641]">देवगुरु बृहस्पति स्वामी</div>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[9px] font-bold">ज्ञान संवर्धक</span>
                </div>

                <div className="p-3 rounded-2xl glass-inner bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between text-xs font-bold text-[#c2410c]">
                    <span>३. नक्षत्र</span>
                    <span className="material-symbols-outlined text-[15px]">flare</span>
                  </div>
                  <div className="text-sm font-bold text-[#26150b]">उत्तर फाल्गुनी</div>
                  <div className="text-[10px] text-[#735641]">द्वितीय पद (सूर्य)</div>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 text-[9px] font-bold">ध्रुव संज्ञक</span>
                </div>

                <div className="p-3 rounded-2xl glass-inner bg-white/85 border border-[#dec9ab]/70 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between text-xs font-bold text-[#2a674c]">
                    <span>४. योग</span>
                    <span className="material-symbols-outlined text-[15px]">self_improvement</span>
                  </div>
                  <div className="text-sm font-bold text-[#26150b]">हर्षण योग</div>
                  <div className="text-[10px] text-[#735641]">दोपहर ०१:४५ तक</div>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[9px] font-bold">सिद्धि प्रदाता</span>
                </div>
              </div>

              {/* 3 Quick Muhurat Cards with Micro-Elevation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl glass-inner bg-emerald-50/80 border border-emerald-300 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(16,185,129,0.25)] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-emerald-700">verified</span>
                      अभिजित मुहूर्त
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">शुभ</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-900 font-mono">११:५८ – १२:४९ अपराह्न</div>
                  <div className="text-[10px] text-emerald-800">सर्वोत्तम विजयप्रद समय</div>
                </div>

                <div className="p-3 rounded-2xl glass-inner bg-red-50/80 border border-red-300 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(220,38,38,0.25)] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-red-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-red-700">warning</span>
                      राहु काल (वर्ज्य)
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-100 text-red-800 font-bold">अशुभ</span>
                  </div>
                  <div className="text-sm font-bold text-red-900 font-mono">०४:३० – ०६:०० अपराह्न</div>
                  <div className="text-[10px] text-red-800">नवीन कार्य त्याज्य</div>
                </div>

                <div className="p-3 rounded-2xl glass-inner bg-amber-50/80 border border-amber-200 space-y-1 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(217,119,6,0.25)] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-amber-700">schedule</span>
                      अमृत चौघड़िया
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">सक्रिय</span>
                  </div>
                  <div className="text-sm font-bold text-amber-900">अमृत (सर्वोत्तम फल)</div>
                  <div className="text-[10px] text-amber-800">दिन का प्रशस्त काल</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#dec9ab]/60 flex items-center justify-between text-xs text-[#735641]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ea580c] text-[16px]">wb_twilight</span>
                <span>सूर्योदय: ०६:१४ • सूर्यास्त: ०६:४१</span>
              </div>
              <span className="font-semibold text-[#b8860b]">काशी पंचांग संवत २०८१</span>
            </div>
          </div>

          {/* Right Column: Sanatan Ghadi Live Dial with Brackets & Watermark */}
          <div className="lg:col-span-5 glass-panel-warm rounded-3xl p-5 sm:p-6 border border-[#dec9ab] shadow-xs flex flex-col justify-between space-y-4 bg-gradient-to-br from-[#fffbf5] to-[#fbeecc]/82 relative overflow-hidden">
            <SacredGeometryWatermark className="opacity-25" />
            <GoldenCornerBrackets size="md" />

            <div className="flex items-center justify-between border-b border-[#dec9ab]/70 pb-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#ea580c]/15 text-[#ea580c] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#26150b]">सनातन घड़ी (Sanatan Ghadi)</h3>
                  <p className="text-[11px] text-[#735641]">वैदिक कालमान • घटी-पल-विपल गणना</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#fde8d7] text-[#c2410c] border border-[#f7c29e] flex items-center gap-1.5 shadow-xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ea580c]"></span>
                </span>
                लाईव काल चक्र
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 relative z-10">
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 aspect-square flex items-center justify-center">
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="96" fill="#fffbf5" stroke="#b8860b" strokeWidth="4" />
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="1 4" />
                  <circle cx="100" cy="100" r="84" fill="#fff8ed" stroke="#dec9ab" strokeWidth="1" />
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#ba1a1a" strokeWidth="6" strokeDasharray="35 500" strokeDashoffset="-310" opacity="0.6" />
                  <circle cx="100" cy="100" r="88" fill="none" stroke="#2e7d32" strokeWidth="6" strokeDasharray="28 500" strokeDashoffset="-190" opacity="0.75" />
                  <g fill="#26150b" fontFamily="'Noto Serif Devanagari', serif" fontSize="11" fontWeight="bold" textAnchor="middle">
                    <text x="100" y="28">१२</text>
                    <text x="139" y="38">१</text>
                    <text x="165" y="66">२</text>
                    <text x="175" y="104">३</text>
                    <text x="165" y="142">४</text>
                    <text x="138" y="170">५</text>
                    <text x="100" y="180">६</text>
                    <text x="62" y="170">७</text>
                    <text x="35" y="142">८</text>
                    <text x="25" y="104">९</text>
                    <text x="35" y="66">१०</text>
                    <text x="62" y="38">११</text>
                  </g>
                  <circle cx="100" cy="100" r="32" fill="none" stroke="#b8860b" strokeWidth="0.8" opacity="0.5" />
                  <polygon points="100,75 118,100 100,125 82,100" fill="none" stroke="#ea580c" strokeWidth="0.8" opacity="0.6" />
                  {/* Hands */}
                  <line x1="100" y1="100" x2="130" y2="75" stroke="#26150b" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="100" y1="100" x2="80" y2="38" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="100" y1="105" x2="100" y2="22" stroke="#b8860b" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="100" cy="100" r="4.5" fill="#c2410c" stroke="#ffffff" strokeWidth="1.5" />
                </svg>
                <div className="absolute bottom-2 inset-x-0 text-center">
                  <span className="text-[9px] font-bold text-[#b8860b] px-2 py-0.5 rounded-full bg-white/90 border border-[#dec9ab] shadow-xs">
                    ६० घटी = २४ होरा
                  </span>
                </div>
              </div>

              {/* Time Readout Box */}
              <div className="mt-3 w-full grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white/80 border border-[#dec9ab]/70 shadow-xs hover:border-[#ea580c] transition-colors">
                  <div className="text-[10px] text-[#735641] font-semibold">भारतीय मानक समय (IST)</div>
                  <div className="text-sm font-bold text-[#c2410c] font-mono">{timeStr}</div>
                </div>
                <div className="p-2 rounded-xl bg-white/80 border border-[#dec9ab]/70 shadow-xs hover:border-[#ea580c] transition-colors">
                  <div className="text-[10px] text-[#735641] font-semibold">सनातन वैदिक कालमान</div>
                  <div className="text-sm font-bold text-[#26150b] font-mono">{ghatiStr}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#dec9ab]/60 flex items-center justify-between text-[11px] text-[#735641] relative z-10">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                अभिजित स्पर्श काल
              </span>
              <span className="font-medium">सूर्य सिद्धांत वैदिक घटी</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
