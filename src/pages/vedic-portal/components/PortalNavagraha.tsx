/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalNavagraha
 * Navagraha Real-Time Planetary Positions & Motion
 * Connected directly to NASA JPL Bridge / Sanatan AstroEngine
 */

import React, { useMemo } from 'react';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { calculatePlanets } from '../../../engine';
import { toHindiDigits } from '../../../components/watch';

interface GrahaDisplay {
  name: string;
  alias: string;
  degree: string;
  rashi: string;
  pada: string;
  statusBadge?: { label: string; bg: string; text: string };
  isHighlight?: boolean;
}

const GRAHA_ALIASES: Record<string, string> = {
  'सूर्य': 'रवि',
  'चन्द्र': 'सोम',
  'मंगल': 'भौम',
  'बुध': 'सौम्य',
  'गुरु': 'बृहस्पति',
  'शुक्र': 'भार्गव',
  'शनि': 'मंद',
  'राहु': 'तम',
  'केतु': 'ध्वज'
};

const NAKSHATRAS = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा',
  'पुनर्वसु', 'पुष्य', 'अश्लेषा', 'मघा', 'पू० फाल्गुनी', 'उ० फाल्गुनी',
  'हस्त', 'चित्रा', 'स्वाति', 'विशाखा', 'अनुराधा', 'ज्येष्ठा',
  'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा',
  'पू० भाद्रपद', 'उ० भाद्रपद', 'रेवती'
];

const EXALTATION_SIGNS: Record<string, string> = {
  'सूर्य': 'मेष',
  'चन्द्र': 'वृषभ',
  'मंगल': 'मकर',
  'बुध': 'कन्या',
  'गुरु': 'कर्क',
  'शुक्र': 'मीन',
  'शनि': 'तुला',
  'राहु': 'वृषभ',
  'केतु': 'वृश्चिक'
};

const DEBILITATION_SIGNS: Record<string, string> = {
  'सूर्य': 'तुला',
  'चन्द्र': 'वृश्चिक',
  'मंगल': 'कर्क',
  'बुध': 'मीन',
  'गुरु': 'मकर',
  'शुक्र': 'कन्या',
  'शनि': 'मेष',
  'राहु': 'वृश्चिक',
  'केतु': 'वृषभ'
};

const OWN_SIGNS: Record<string, string[]> = {
  'सूर्य': ['सिंह'],
  'चन्द्र': ['कर्क'],
  'मंगल': ['मेष', 'वृश्चिक'],
  'बुध': ['मिथुन', 'कन्या'],
  'गुरु': ['धनु', 'मीन'],
  'शुक्र': ['वृषभ', 'तुला'],
  'शनि': ['मकर', 'कुम्भ'],
  'राहु': [],
  'केतु': []
};

const getGrahaOrbClass = (name: string) => {
  switch (name) {
    case 'सूर्य': return 'from-amber-200 via-orange-500 to-amber-900 shadow-[0_2px_6px_rgba(234,88,12,0.4)]';
    case 'चन्द्र': return 'from-white via-slate-200 to-slate-400 shadow-[0_2px_6px_rgba(100,116,139,0.3)]';
    case 'मंगल': return 'from-rose-300 via-red-600 to-red-950 shadow-[0_2px_6px_rgba(220,38,38,0.4)]';
    case 'बुध': return 'from-emerald-200 via-emerald-600 to-teal-950 shadow-[0_2px_6px_rgba(5,150,105,0.4)]';
    case 'गुरु': return 'from-yellow-100 via-amber-400 to-amber-800 shadow-[0_2px_6px_rgba(217,119,6,0.4)]';
    case 'शुक्र': return 'from-sky-100 via-indigo-200 to-purple-400 shadow-[0_2px_6px_rgba(99,102,241,0.3)]';
    case 'शनि': return 'from-blue-200 via-indigo-700 to-slate-900 shadow-[0_2px_6px_rgba(30,58,138,0.4)]';
    case 'राहु': return 'from-stone-300 via-amber-800 to-stone-900 shadow-[0_2px_6px_rgba(69,26,3,0.4)]';
    case 'केतु': return 'from-yellow-200 via-lime-700 to-stone-800 shadow-[0_2px_6px_rgba(77,124,15,0.4)]';
    default: return 'from-amber-100 to-amber-600';
  }
};

export const PortalNavagraha: React.FC = () => {
  const grahas: GrahaDisplay[] = useMemo(() => {
    try {
      const positions = calculatePlanets(new Date());
      const standardOrder = ['सूर्य', 'चन्द्र', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'राहु', 'केतु'];

      return standardOrder.map((name) => {
        const found = positions.planets.find((p) => p.hindiName === name);
        if (!found) {
          return {
            name,
            alias: GRAHA_ALIASES[name] || name,
            degree: '००°००\'',
            rashi: 'मेष राशि',
            pada: 'अश्विनी • पद १'
          };
        }

        const degInSign = found.longitude % 30;
        const deg = Math.floor(degInSign);
        const min = Math.floor((degInSign - deg) * 60);
        const degreeStr = `${toHindiDigits(String(deg).padStart(2, '0'))}°${toHindiDigits(String(min).padStart(2, '0'))}'`;

        const nakIdx = Math.floor(found.longitude / (360 / 27));
        const nakName = NAKSHATRAS[nakIdx % 27] || 'अश्विनी';
        const padaNum = Math.floor((found.longitude % (360 / 27)) / (360 / 108)) + 1;
        const padaStr = `${nakName} • पद ${toHindiDigits(padaNum)}`;

        const rashiName = `${found.signHindi} राशि`;

        // Determine Dignity / Retrograde
        let statusBadge: { label: string; bg: string; text: string } | undefined;
        let isHighlight = false;

        if (found.isRetrograde && name !== 'राहु' && name !== 'केतु') {
          statusBadge = { label: 'वक्री', bg: 'bg-red-100', text: 'text-red-700' };
          isHighlight = true;
        } else if (EXALTATION_SIGNS[name] === found.signHindi) {
          statusBadge = { label: 'उच्च', bg: 'bg-emerald-100', text: 'text-emerald-800' };
        } else if (DEBILITATION_SIGNS[name] === found.signHindi) {
          statusBadge = { label: 'नीच', bg: 'bg-stone-100', text: 'text-stone-700' };
        } else if (OWN_SIGNS[name]?.includes(found.signHindi)) {
          statusBadge = { label: 'स्वगृही', bg: 'bg-amber-100', text: 'text-amber-800' };
        }

        return {
          name,
          alias: GRAHA_ALIASES[name] || name,
          degree: degreeStr,
          rashi: rashiName,
          pada: padaStr,
          statusBadge,
          isHighlight
        };
      });
    } catch {
      // Clean fallback if error occurs
      return [];
    }
  }, []);

  return (
    <section className="glass-panel rounded-3xl p-6 space-y-4 font-serif relative overflow-hidden">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.07]" />
      <GoldenCornerBrackets size="lg" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
          <div>
            <h3 className="text-lg font-bold text-[#26150b]">नवग्रह स्पष्ट स्थिति एवं संचरण (Navagraha Sthiti)</h3>
            <p className="text-xs text-[#735641]">नासा जेपीएल एवं द्रिक पंचांग आधारित वास्तविक खगोलीय अंश</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#735641] font-semibold">
          <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-[#dec9ab] flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>उच्च ग्रह
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-[#dec9ab] flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>स्वक्षेत्रीय
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-[#dec9ab] flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>वक्री ग्रह
          </span>
        </div>
      </div>

      {/* 9 Graha Bento Strip with Golden Rim Elevation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5 relative z-10">
        {grahas.map((g) => (
          <div
            key={g.name}
            className={`glass-inner p-3 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(212,175,55,0.28)] hover:border-[#d4af37] ${
              g.statusBadge?.label === 'वक्री'
                ? 'bg-red-50/50 border-red-200'
                : g.statusBadge?.label === 'उच्च'
                ? 'bg-emerald-50/50 border-emerald-200'
                : g.statusBadge?.label === 'स्वगृही'
                ? 'bg-amber-50/50 border-amber-200'
                : 'bg-white/80 border-[#dec9ab]/60'
            }`}
          >
            {g.statusBadge && (
              <div
                className={`absolute top-0 right-0 px-1 py-0.2 rounded-bl text-[8px] font-bold shadow-xs ${g.statusBadge.bg} ${g.statusBadge.text}`}
              >
                {g.statusBadge.label}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${getGrahaOrbClass(g.name)} ring-1 ring-white/80 shrink-0`}></span>
                <span
                  className={`text-xs font-bold ${
                    g.name === 'सूर्य'
                      ? 'text-[#c2410c]'
                      : g.name === 'मंगल'
                      ? 'text-[#ba1a1a]'
                      : 'text-[#26150b]'
                  }`}
                >
                  {g.name}
                </span>
              </div>
              <span className="text-[10px] text-[#735641] font-serif">({g.alias})</span>
            </div>
            <div className="my-2">
              <div className="text-base font-bold text-[#26150b] font-mono tracking-tight">{g.degree}</div>
              <div className="text-[11px] font-semibold text-[#8b6508]">{g.rashi}</div>
            </div>
            <div className="text-[9px] text-[#735641] border-t border-[#dec9ab]/60 pt-1 font-serif">
              {g.pada}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
