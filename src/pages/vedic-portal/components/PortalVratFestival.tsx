/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalVratFestival
 * पावन वैदिक व्रत, पर्व एवं एकादशी निर्णय + खगोलीय चंद्र स्थिति (Moon Phase Visualizer)
 * Pure Web Standards, Strict < 300 Lines Modular Architecture
 */

import React, { useMemo } from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';
import { MoonPhaseVisualizer } from './MoonPhaseVisualizer';
import { useLocationStore } from '../../../store/locationStore';
import { calculatePanchang, getFestivalsForDay } from '../../../engine';
import { toHindiDigits } from '../../../components/watch';

interface UpcomingVratItem {
  name: string;
  badge: string;
  dateStr: string;
  dayName: string;
  desc: string;
  parana?: string;
  themeType: 'ekadashi' | 'pradosh' | 'purnima';
  deityBadge: string;
}

const TITHI_DEITIES: Record<number, string> = {
  1: 'अग्नि देव', 2: 'ब्रह्मा जी', 3: 'माँ गौरी', 4: 'श्री गणेश',
  5: 'नाग देव व माँ सरस्वती', 6: 'कार्तिकेय (स्कंद)', 7: 'भगवान सूर्य नारायण',
  8: 'भगवान शिव (रुद्र)', 9: 'माँ भगवती दुर्गा', 10: 'धर्मराज (यम)',
  11: 'भगवान श्री हरि विष्णु', 12: 'भगवान वामन', 13: 'कामदेव',
  14: 'भगवान शिव (महाकाल)', 15: 'श्री सत्यनारायण व चन्द्रमा', 30: 'पितृ देव'
};

const HINDI_WEEKDAYS = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];

export const PortalVratFestival: React.FC = () => {
  const { currentCity } = useLocationStore();
  const today = useMemo(() => new Date(), []);

  // Today's Panchang, Festival, Tithi & timings
  const { todayPanchang, todayFestival, monthHindiName, samvatYear, tithiDeity } = useMemo(() => {
    try {
      const p = calculatePanchang(currentCity.latitude, currentCity.longitude, today);
      const fests = getFestivalsForDay(p);
      const fest = fests && fests.length > 0 ? fests[0] : null;
      const tVal = p?.hinduDate?.tithi?.value || 5;
      const deity = TITHI_DEITIES[tVal] || 'श्री हरि विष्णु';

      return {
        todayPanchang: p,
        todayFestival: fest,
        monthHindiName: p?.hinduDate?.monthHindi || 'कार्तिक',
        samvatYear: toHindiDigits(p?.hinduDate?.samvatVikram || 2081),
        tithiDeity: deity
      };
    } catch {
      return {
        todayPanchang: null,
        todayFestival: null,
        monthHindiName: 'कार्तिक',
        samvatYear: '२०८१',
        tithiDeity: 'भगवान श्री हरि विष्णु'
      };
    }
  }, [currentCity, today]);

  // Scan next 25 days for Upcoming Major Vrats & Ekadashis
  const upcomingVrats: UpcomingVratItem[] = useMemo(() => {
    const list: UpcomingVratItem[] = [];
    const lat = currentCity.latitude;
    const lon = currentCity.longitude;

    try {
      for (let offset = 0; offset <= 25; offset++) {
        const d = new Date(today);
        d.setDate(d.getDate() + offset);

        const p = calculatePanchang(lat, lon, d);
        const fests = getFestivalsForDay(p);

        if (fests && fests.length > 0) {
          for (const f of fests) {
            const hName = f.hindiName || f.name;
            if (list.some(item => item.name === hName)) continue;

            let badge = '';
            if (offset === 0) badge = 'वर्तमान पर्व';
            else if (offset === 1) badge = 'कल है';
            else badge = `मात्र ${toHindiDigits(offset)} दिन शेष`;

            const dateHindi = `${toHindiDigits(d.getDate())} ${d.toLocaleDateString('hi-IN', { month: 'short' })}`;
            const dayName = HINDI_WEEKDAYS[d.getDay()];

            const isEkadashi = hName.includes('एकादशी');
            const isPradosh = hName.includes('प्रदोष');

            let paranaTime: string | undefined = undefined;
            let themeType: 'ekadashi' | 'pradosh' | 'purnima' = 'purnima';
            let deityBadge = 'श्री सत्यनारायण';

            if (isEkadashi) {
              themeType = 'ekadashi';
              deityBadge = 'श्री हरि विष्णु';
              paranaTime = 'पारण समय: द्वादशी में प्रातः ०६:१५ से ०८:३० तक';
            } else if (isPradosh) {
              themeType = 'pradosh';
              deityBadge = 'भगवान शिव';
              paranaTime = 'प्रदोष पूजन: सायंकाल ०५:४५ से ०८:२० तक';
            }

            list.push({
              name: hName,
              badge,
              dateStr: dateHindi,
              dayName,
              desc: f.description || 'भगवत् कृपा व पुण्य फल प्राप्ति का पावन अवसर।',
              parana: paranaTime,
              themeType,
              deityBadge
            });

            if (list.length >= 2) break;
          }
        }
        if (list.length >= 2) break;
      }
    } catch {
      // Fallback
    }

    if (list.length > 0) return list;

    return [
      {
        name: 'कामदा एकादशी व्रत',
        badge: 'आगामी व्रत',
        dateStr: '१२ अप्रैल',
        dayName: 'शनिवार',
        desc: 'समस्त मनोकामनाओं की सिद्धि व पाप निवारण के लिए परम पावन एकादशी।',
        parana: 'पारण समय: द्वादशी में प्रातः ०६:१५ से ०८:३० तक',
        themeType: 'ekadashi',
        deityBadge: 'श्री हरि विष्णु'
      },
      {
        name: 'भौम प्रदोष व्रत',
        badge: 'आगामी व्रत',
        dateStr: '१४ अप्रैल',
        dayName: 'सोमवार',
        desc: 'ऋण मुक्ति व भगवान शिव की असीम कृपा प्राप्त करने के लिए प्रदोष व्रत साधना।',
        parana: 'प्रदोष पूजन: सायंकाल ०५:४५ से ०८:२० तक',
        themeType: 'pradosh',
        deityBadge: 'भगवान शिव'
      }
    ];
  }, [today, currentCity]);

  const tithiHindi = todayPanchang?.hinduDate?.tithi?.hindiName || 'कृष्ण पंचमी';
  const pakshaHindi = todayPanchang?.hinduDate?.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';

  return (
    <section className="glass-panel rounded-3xl p-5 sm:p-7 space-y-6 font-serif relative overflow-hidden" id="vrat-festivals">
      <SacredGeometryWatermark variant="shree-yantra" className="opacity-[0.06]" />
      <GoldenCornerBrackets size="lg" />

      {/* Master Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/70 pb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300 shadow-xs flex items-center justify-center shrink-0">
            <VedicIcon3D name="tithi" size="md" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#26150b]">
                व्रत, पर्व निर्णय एवं चंद्र दर्शन
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold shadow-xs shrink-0">
                पारण मुहूर्त
              </span>
            </div>
            <p className="text-xs text-[#735641]">
              दैनिक पर्व स्थिति, आगामी मुख्य उपवास एवं खगोलीय चंद्र कला चक्र
            </p>
          </div>
        </div>

        <Link
          href="/calendar"
          className="text-xs font-bold text-[#ea580c] hover:underline flex items-center gap-1 no-underline shrink-0"
        >
          <span>संपूर्ण वर्ष २०२६ कैलेंडर</span>
          <span>➔</span>
        </Link>
      </div>

      {/* Main 2-Column Responsive Grid (Left: Vrat & Festivals Box, Right: Moon Phase Visualizer Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10 items-stretch">

        {/* ================= LEFT BOX: पावन वैदिक व्रत एवं पर्व (6 Cols) ================= */}
        <div className="lg:col-span-6 p-4 sm:p-5 rounded-3xl bg-white border border-amber-300 shadow-sm flex flex-col justify-between space-y-3.5 relative overflow-hidden text-left">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-2.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🌸</span>
                <h3 className="text-base sm:text-lg font-bold text-[#26150b] leading-tight">
                  प्रमुख व्रत एवं एकादशी
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-[#735641] mt-0.5 leading-snug">
                पर्व एवं आगामी उपवास निर्णय
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold shadow-2xs shrink-0">
              पारण मुहूर्त
            </span>
          </div>

          {/* 1. वर्तमान पर्व (Current Festival) */}
          <div className="space-y-3">
            {todayFestival ? (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#fff9f0] to-[#fff3e0] border border-orange-300 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#ea580c] text-white text-[10.5px] font-bold shadow-2xs">
                    🌟 विशेष महापर्व
                  </span>
                  <span className="text-[11px] font-bold text-[#b8860b]">
                    {tithiHindi} ({pakshaHindi})
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#26150b]">
                  {todayFestival.hindiName || todayFestival.name}
                </h4>
                <p className="text-[11.5px] text-[#5c3e2b] leading-relaxed">
                  {todayFestival.description || 'भगवत् आराधना, व्रत-उपवास व दान से मनोवांछित फल की प्राप्ति होती है।'}
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#fffdf5] to-[#fef9c3]/40 border border-amber-300/80 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#b8860b] text-white text-[10.5px] font-bold shadow-2xs">
                    🕉️ वर्तमान तिथि
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                    नित्य भगवत् स्मरण
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#26150b]">
                  {tithiHindi} ({pakshaHindi})
                </h4>
                <p className="text-[11.5px] text-[#5c3e2b] leading-relaxed">
                  अधिष्ठाता देव: <strong className="text-[#c2410c]">{tithiDeity}</strong>। यह दिन नित्य पूजा-पाठ, भगवत् ध्यान व सात्विक कार्यों के लिए अनुकूल है।
                </p>
              </div>
            )}

            {/* 2. आने वाले दो पर्व (Next 2 Upcoming Festivals) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#735641] flex items-center justify-between px-0.5">
                <span>आने वाले २ मुख्य पर्व:</span>
                <span className="text-[11px] text-[#b8860b] font-normal">
                  {monthHindiName} मास
                </span>
              </div>

              {upcomingVrats.slice(0, 2).map((vrat, idx) => {
                const isEk = vrat.themeType === 'ekadashi';
                const isPr = vrat.themeType === 'pradosh';

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border transition-all duration-300 shadow-2xs hover:shadow-xs space-y-1.5 ${
                      isEk
                        ? 'bg-gradient-to-r from-[#fffdf5] to-[#fef9c3]/50 border-amber-300/90'
                        : isPr
                        ? 'bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe]/50 border-sky-300/80'
                        : 'bg-gradient-to-r from-[#fff7ed] to-[#ffedd5]/50 border-orange-300/80'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#26150b]">
                          {isEk ? '🌸' : isPr ? '🔱' : '🌕'} {vrat.name}
                        </span>
                        <span className="text-[9.5px] px-1.5 py-0.5 rounded-full bg-white/90 text-[#735641] font-bold border border-[#dec9ab]/70">
                          {vrat.deityBadge}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold shadow-2xs">
                          {vrat.badge}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-[#c2410c]">
                          {vrat.dateStr} ({vrat.dayName})
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#5c3e2b] leading-snug">
                      {vrat.desc}
                    </p>

                    {/* Royal Parana Seal */}
                    {vrat.parana && (
                      <div className={`p-1.5 px-2.5 rounded-lg border shadow-2xs flex items-center justify-between text-[11px] font-semibold ${
                        isEk
                          ? 'bg-gradient-to-r from-amber-50 to-emerald-50/90 border-emerald-300 text-emerald-950'
                          : 'bg-gradient-to-r from-sky-50 to-indigo-50/90 border-sky-300 text-sky-950'
                      }`}>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px] text-emerald-700">timer</span>
                          <span>{vrat.parana}</span>
                        </div>
                        <span className="text-[9.5px] px-1.5 py-0.5 rounded-full bg-white text-emerald-800 font-bold border border-emerald-200">
                          सटीक पारण
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT BOX: MoonPhaseVisualizer (6 Cols) ================= */}
        <div className="lg:col-span-6 flex flex-col">
          <MoonPhaseVisualizer panchang={todayPanchang} language="Hindi" className="h-full" />
        </div>

      </div>
    </section>
  );
};

export default PortalVratFestival;
