/**
 * Sanatan Web (सनातन घड़ी)
 * Dedicated Page: NavagrahaHub (/navagraha, /gochar)
 * Complete Vedic Planetary Ephemeris, Retrograde Motion & Drishti Engine
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useMemo } from 'react';
import { Link } from '../../routes/AppRoutes';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import { GoldenCornerBrackets } from '../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../vedic-portal/components/SacredGeometryWatermark';
import { calculatePlanets } from '../../engine';
import { toHindiDigits } from '../../components/watch';
import { ArrowLeft, ChevronRight, Sparkles, Orbit, Compass, Eye, ShieldAlert } from 'lucide-react';

interface GrahaExtendedInfo {
  name: string;
  alias: string;
  degreeStr: string;
  speedStr: string;
  rashi: string;
  pada: string;
  isRetrograde: boolean;
  statusBadge: { label: string; bg: string; text: string };
  drishti: string;
  mantra: string;
  gemstone: string;
  karaka: string;
}

const GRAHA_METAS: Record<string, { alias: string; drishti: string; mantra: string; gemstone: string; karaka: string }> = {
  'सूर्य': { alias: 'रवि', drishti: '७वीं पूर्ण दृष्टि', mantra: 'ॐ ह्रीं ह्रीं सूर्याय नमः', gemstone: 'माणिक्य (Ruby)', karaka: 'आत्मकारक, पितृ, प्रतिष्ठा' },
  'चन्द्र': { alias: 'सोम', drishti: '७वीं पूर्ण दृष्टि', mantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः', gemstone: 'मोती (Pearl)', karaka: 'मातृ, मन, भावना' },
  'मंगल': { alias: 'भौम', drishti: '४थी, ७वीं, ८वीं विशेष दृष्टि', mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः', gemstone: 'मूंगा (Red Coral)', karaka: 'पराक्रम, भूमि, भ्रातृ' },
  'बुध': { alias: 'सौम्य', drishti: '७वीं पूर्ण दृष्टि', mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः', gemstone: 'पन्ना (Emerald)', karaka: 'बुद्धि, वाणी, व्यापार' },
  'गुरु': { alias: 'बृहस्पति', drishti: '५वीं, ७वीं, ९वीं त्रिकोण दृष्टि', mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः', gemstone: 'पुखराज (Yellow Sapphire)', karaka: 'ज्ञान, धर्म, संतति, भाग्य' },
  'शुक्र': { alias: 'भार्गव', drishti: '७वीं पूर्ण दृष्टि', mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः', gemstone: 'हीरा अथवा ओपल', karaka: 'सुख, वाहन, कला, दांपत्य' },
  'शनि': { alias: 'मंद', drishti: '३री, ७वीं, १०वीं विशेष दृष्टि', mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः', gemstone: 'नीलम (Blue Sapphire)', karaka: 'कर्म, आयु, न्याय, वैराग्य' },
  'राहु': { alias: 'तम', drishti: '५वीं, ७वीं, ९वीं दृष्टि', mantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः', gemstone: 'गोमेद (Hessonite)', karaka: 'रहस्य, अन्वेषण, वैदेशिक' },
  'केतु': { alias: 'ध्वज', drishti: '५वीं, ७वीं, ९वीं दृष्टि', mantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः', gemstone: 'लहसुनिया (Cat’s Eye)', karaka: 'मोक्ष, आध्यात्मिकता, वैराग्य' }
};

const NAKSHATRAS = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा',
  'पुनर्वसु', 'पुष्य', 'अश्लेषा', 'मघा', 'पू० फाल्गुनी', 'उ० फाल्गुनी',
  'हस्त', 'चित्रा', 'स्वाति', 'विशाखा', 'अनुराधा', 'ज्येष्ठा',
  'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा',
  'पू० भाद्रपद', 'उ० भाद्रपद', 'रेवती'
];

const EXALTATION_SIGNS: Record<string, string> = {
  'सूर्य': 'मेष', 'चन्द्र': 'वृषभ', 'मंगल': 'मकर', 'बुध': 'कन्या',
  'गुरु': 'कर्क', 'शुक्र': 'मीन', 'शनि': 'तुला', 'राहु': 'वृषभ', 'केतु': 'वृश्चिक'
};

const DEBILITATION_SIGNS: Record<string, string> = {
  'सूर्य': 'तुला', 'चन्द्र': 'वृश्चिक', 'मंगल': 'कर्क', 'बुध': 'मीन',
  'गुरु': 'मकर', 'शुक्र': 'कन्या', 'शनि': 'मेष', 'राहु': 'वृश्चिक', 'केतु': 'वृषभ'
};

const OWN_SIGNS: Record<string, string[]> = {
  'सूर्य': ['सिंह'], 'चन्द्र': ['कर्क'], 'मंगल': ['मेष', 'वृश्चिक'],
  'बुध': ['मिथुन', 'कन्या'], 'गुरु': ['धनु', 'मीन'], 'शुक्र': ['वृषभ', 'तुला'],
  'शनि': ['मकर', 'कुम्भ'], 'राहु': [], 'केतु': []
};

export const NavagrahaHub: React.FC = () => {
  const grahas: GrahaExtendedInfo[] = useMemo(() => {
    try {
      const positions = calculatePlanets(new Date());
      const standardOrder = ['सूर्य', 'चन्द्र', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'राहु', 'केतु'];

      return standardOrder.map((name) => {
        const found = positions.planets.find(p => p.hindiName === name);
        const meta = GRAHA_METAS[name] || { alias: name, drishti: '७वीं दृष्टि', mantra: '', gemstone: '', karaka: '' };

        if (!found) {
          return {
            name,
            alias: meta.alias,
            degreeStr: '००°००\'००"',
            speedStr: '+०.००°/दिन',
            rashi: 'मेष राशि',
            pada: 'अश्विनी • पद १',
            isRetrograde: false,
            statusBadge: { label: 'सामान्य', bg: 'bg-stone-100', text: 'text-stone-800' },
            drishti: meta.drishti,
            mantra: meta.mantra,
            gemstone: meta.gemstone,
            karaka: meta.karaka
          };
        }

        const degInSign = found.longitude % 30;
        const deg = Math.floor(degInSign);
        const min = Math.floor((degInSign - deg) * 60);
        const sec = Math.floor((((degInSign - deg) * 60) - min) * 60);
        const degreeStr = `${toHindiDigits(String(deg).padStart(2, '0'))}°${toHindiDigits(String(min).padStart(2, '0'))}'${toHindiDigits(String(sec).padStart(2, '0'))}"`;

        const speedAbs = Math.abs(found.speed || 0).toFixed(2);
        const speedSign = (found.speed || 0) < 0 ? '-' : '+';
        const speedStr = `${speedSign}${toHindiDigits(speedAbs)}°/दिन`;

        const nakIdx = Math.floor(found.longitude / (360 / 27));
        const nakName = NAKSHATRAS[nakIdx % 27] || 'अश्विनी';
        const padaNum = Math.floor((found.longitude % (360 / 27)) / (360 / 108)) + 1;
        const padaStr = `${nakName} (पद ${toHindiDigits(padaNum)})`;

        let statusBadge = { label: 'सम क्षेत्र', bg: 'bg-amber-50', text: 'text-amber-900' };
        if (found.isRetrograde && name !== 'राहु' && name !== 'केतु') {
          statusBadge = { label: 'वक्री (चेष्टा बल)', bg: 'bg-red-100', text: 'text-red-700' };
        } else if (EXALTATION_SIGNS[name] === found.signHindi) {
          statusBadge = { label: 'परम उच्च', bg: 'bg-emerald-100', text: 'text-emerald-800' };
        } else if (DEBILITATION_SIGNS[name] === found.signHindi) {
          statusBadge = { label: 'नीच राशि', bg: 'bg-stone-200', text: 'text-stone-800' };
        } else if (OWN_SIGNS[name]?.includes(found.signHindi)) {
          statusBadge = { label: 'स्वगृही (बलवान)', bg: 'bg-amber-200', text: 'text-amber-900' };
        }

        return {
          name,
          alias: meta.alias,
          degreeStr,
          speedStr,
          rashi: `${found.signHindi} राशि`,
          pada: padaStr,
          isRetrograde: Boolean(found.isRetrograde),
          statusBadge,
          drishti: meta.drishti,
          mantra: meta.mantra,
          gemstone: meta.gemstone,
          karaka: meta.karaka
        };
      });
    } catch {
      return [];
    }
  }, []);

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      <PortalHeader />

      <main className="w-full pt-32 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8" id="navagraha-hub">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 font-sans" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-amber-800 transition-colors flex items-center gap-1 no-underline">
              <ArrowLeft className="w-3.5 h-3.5" /> मुख्य पृष्ठ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-amber-900 font-semibold">नवग्रह स्थिति एवं गोचर विचार</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-sans font-medium">
            <Orbit className="w-3.5 h-3.5 text-amber-700" />
            निरयण स्पष्ट ग्रह स्थिति (लाहिड़ी अयनांश २४°११'४२")
          </span>
        </div>

        {/* Hero Banner */}
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest inline-block">
            नासा जेपीएल एवं द्रिक गणितीय प्रत्यक्ष संचरण
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#26150b]">
            नवग्रह स्पष्ट स्थिति, गति एवं दृष्टि चक्र
          </h1>
          <p className="text-sm text-[#735641]">
            प्रत्येक ग्रह के स्पष्ट अंश, कला, विकला, वक्री/मार्गी अवस्था, नक्षत्र चरण एवं शास्त्रीय दृष्टि का संपूर्ण विवरण
          </p>
        </div>

        {/* 9 Grahas Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {grahas.map((g) => (
            <div
              key={g.name}
              className="glass-panel-warm rounded-3xl p-5 space-y-4 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-[#dec9ab]"
            >
              <GoldenCornerBrackets size="sm" />
              <SacredGeometryWatermark variant="swastik" className="opacity-[0.05]" />

              <div className="flex items-center justify-between border-b border-[#dec9ab]/60 pb-3 relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 ring-2 ring-white shadow-xs"></span>
                  <div>
                    <h3 className="text-lg font-bold text-[#26150b]">{g.name} ग्रह</h3>
                    <span className="text-[11px] text-[#735641] font-sans">उपनाम: {g.alias}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-xs ${g.statusBadge.bg} ${g.statusBadge.text}`}>
                  {g.statusBadge.label}
                </span>
              </div>

              {/* Position Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs relative z-10">
                <div className="p-2.5 rounded-xl bg-white/80 border border-[#dec9ab]/60">
                  <span className="text-[10px] text-[#735641] block">स्पष्ट अंश (भोगांश)</span>
                  <span className="font-bold text-[#26150b] font-mono text-sm">{g.degreeStr}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-[#dec9ab]/60">
                  <span className="text-[10px] text-[#735641] block">राशि संचरण</span>
                  <span className="font-bold text-[#c2410c] text-sm">{g.rashi}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-[#dec9ab]/60">
                  <span className="text-[10px] text-[#735641] block">नक्षत्र व चरण</span>
                  <span className="font-semibold text-[#26150b] text-xs">{g.pada}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-[#dec9ab]/60">
                  <span className="text-[10px] text-[#735641] block">दैनिक गति</span>
                  <span className="font-semibold text-[#26150b] font-mono text-xs">{g.speedStr}</span>
                </div>
              </div>

              {/* Drishti & Astrological Info */}
              <div className="space-y-1.5 text-xs pt-1 border-t border-[#dec9ab]/60 relative z-10">
                <div className="flex items-center gap-1.5 text-[#5a3822]">
                  <Eye className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span><strong>दृष्टि:</strong> {g.drishti}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#5a3822]">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span><strong>रत्न:</strong> {g.gemstone}</span>
                </div>
                <div className="text-[11px] text-[#735641]">
                  <strong>कारकत्व:</strong> {g.karaka}
                </div>
              </div>

              {/* Vedic Mantra */}
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-center relative z-10">
                <span className="text-[10px] text-amber-800 font-bold block">वैदिक तांत्रिक मन्त्र</span>
                <span className="text-xs font-bold text-[#c2410c]">{g.mantra}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <PortalFooter />
    </div>
  );
};

export default NavagrahaHub;
