/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalRashifal
 * Vedic Moon Transit (चन्द्र गोचर फल) Daily Horoscope for 12 Rashis
 * Connected directly to Sanatan AstroEngine & JPL Ephemeris
 */

import React, { useMemo } from 'react';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicRashiGoldIcon, type RashiKey } from './VedicRashiGoldIcon';
import { calculatePlanets } from '../../../engine';
import { toHindiDigits } from '../../../components/watch';

interface RashiItem {
  rashiKey: RashiKey;
  name: string;
  percent: string;
  status: 'शुभ' | 'मध्यम' | 'उत्तम';
  desc: string;
  color: string;
  num: string;
  isHighlight?: boolean;
}

const BASE_RASHIS: { rashiKey: RashiKey; name: string; color: string; num: string }[] = [
  { rashiKey: 'mesh', name: 'मेष', color: 'लाल', num: '९' },
  { rashiKey: 'vrishabh', name: 'वृषभ', color: 'श्वेत', num: '६' },
  { rashiKey: 'mithun', name: 'मिथुन', color: 'हरा', num: '५' },
  { rashiKey: 'kark', name: 'कर्क', color: 'दूधिया', num: '२' },
  { rashiKey: 'singh', name: 'सिंह', color: 'केसरिया', num: '१' },
  { rashiKey: 'kanya', name: 'कन्या', color: 'पीतांबरी', num: '५' },
  { rashiKey: 'tula', name: 'तुला', color: 'क्रीम', num: '७' },
  { rashiKey: 'vrishchik', name: 'वृश्चिक', color: 'सिन्दूरी', num: '३' },
  { rashiKey: 'dhanu', name: 'धनु', color: 'पीला', num: '३' },
  { rashiKey: 'makar', name: 'मकर', color: 'नीला', num: '८' },
  { rashiKey: 'kumbh', name: 'कुंभ', color: 'जामुनी', num: '४' },
  { rashiKey: 'meen', name: 'मीन', color: 'स्वर्णिम', num: '७' }
];

// Classical Chandra Gochar Interpretations by House (भाव अनुसार गोचर फल)
const GOCHAR_HOUSE_EFFECTS: Record<number, { percent: number; status: 'शुभ' | 'मध्यम' | 'उत्तम'; desc: string; isHighlight?: boolean }> = {
  1: { percent: 88, status: 'शुभ', desc: 'मानसिक प्रसन्नता व आरोग्य वृद्धि। स्वप्रयासों में सफलता व आत्मविश्वास बढ़ेगा।' },
  2: { percent: 74, status: 'मध्यम', desc: 'वाणी में मधुरता रखें। आर्थिक लेन-देन में सतर्कता व पारिवारिक सुख मिलेगा।' },
  3: { percent: 92, status: 'उत्तम', desc: 'पराक्रम व साहस में वृद्धि। मित्रों का सहयोग व शुभ समाचार की प्राप्ति।', isHighlight: true },
  4: { percent: 68, status: 'मध्यम', desc: 'मातृ सुख व गृह शांति पर ध्यान दें। वाहन चालन में धैर्य व संयम बरतें।' },
  5: { percent: 78, status: 'मध्यम', desc: 'संतान व अध्ययन में एकाग्रता बढ़ेगी। नवीन रचनात्मक विचारों का उदय होगा।' },
  6: { percent: 95, status: 'उत्तम', desc: 'शत्रु परास्त होंगे। रोग व ऋण से राहत मिलेगी। कार्यक्षेत्र में विशिष्ट यश।', isHighlight: true },
  7: { percent: 86, status: 'शुभ', desc: 'दांपत्य जीवन मधुर रहेगा। व्यापारिक साझेदारी व यात्रा से लाभ का उत्तम योग।' },
  8: { percent: 65, status: 'मध्यम', desc: 'चन्द्राष्टम प्रभाव: खानपान व स्वास्थ्य पर विशेष ध्यान दें। शांति से कार्य करें।' },
  9: { percent: 84, status: 'शुभ', desc: 'भाग्य का साथ मिलेगा। धर्म, तीर्थ यात्रा व गुरुजनों के आशीर्वाद से शांति।' },
  10: { percent: 91, status: 'उत्तम', desc: 'उच्चाधिकारियों की कृपा से पद-प्रतिष्ठा में वृद्धि। कर्मक्षेत्र में विजय।', isHighlight: true },
  11: { percent: 96, status: 'उत्तम', desc: 'सर्वार्थ सिद्धि योग। रुका हुआ धन प्राप्त होगा व प्रियजनों से लाभ मिलेगा।', isHighlight: true },
  12: { percent: 70, status: 'मध्यम', desc: 'शुभ कार्यों में व्यय संभव। आध्यात्मिक चिंतन व ध्यान-साधना से आत्मशांति।' }
};

export const PortalRashifal: React.FC = () => {
  const { rashis, moonSignHindi } = useMemo(() => {
    try {
      const positions = calculatePlanets(new Date());
      const moon = positions.planets.find((p) => p.name === 'Moon');
      const currentMoonSignHindi = moon?.signHindi || 'कन्या';
      const moonSignIdx = Math.max(0, Math.min(11, Math.floor((moon?.longitude || 165) / 30)));

      const computedList: RashiItem[] = BASE_RASHIS.map((r, rashiIdx) => {
        // Calculate Bhav (house) from natal rashi to transiting moon
        const house = ((moonSignIdx - rashiIdx + 12) % 12) + 1;
        const effect = GOCHAR_HOUSE_EFFECTS[house] || GOCHAR_HOUSE_EFFECTS[1];

        return {
          rashiKey: r.rashiKey,
          name: r.name,
          percent: `${toHindiDigits(effect.percent)}%`,
          status: effect.status,
          desc: effect.desc,
          color: r.color,
          num: toHindiDigits(r.num),
          isHighlight: effect.isHighlight
        };
      });

      return {
        rashis: computedList,
        moonSignHindi: currentMoonSignHindi
      };
    } catch {
      return {
        rashis: [],
        moonSignHindi: 'कन्या'
      };
    }
  }, []);

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-7 space-y-4 font-serif relative overflow-hidden" id="rashifal">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.07]" />
      <GoldenCornerBrackets size="lg" />

      <div className="flex items-center justify-between border-b border-[#dec9ab]/60 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#b8860b] shadow-[0_0_8px_#b8860b]"></span>
          <h2 className="text-2xl font-bold text-[#26150b]">आज का राशिफल (चन्द्र गोचर फल)</h2>
        </div>
        <span className="text-xs text-[#735641] font-semibold">
          चन्द्रमा: {moonSignHindi} राशि में संचाररत
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
        {rashis.map((r) => {
          const isUttam = r.status === 'उत्तम';
          const isMadhyam = r.status === 'मध्यम';

          return (
            <div
              key={r.name}
              className={`p-3.5 rounded-2xl glass-inner bg-white/85 border space-y-1.5 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_16px_32px_-6px_rgba(217,119,6,0.38)] hover:border-[#d4af37] hover:bg-[#fffdf8] relative group overflow-hidden ${
                r.isHighlight
                  ? 'border-[#ea580c] ring-2 ring-[#ea580c]/50 shadow-sm'
                  : 'border-[#dec9ab]/70'
              }`}
            >
              {/* Luminous Golden Corner Accent on Hover */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl from-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <VedicRashiGoldIcon rashi={r.rashiKey} size="md" />
                  <span className={`text-base font-bold ${r.isHighlight ? 'text-[#c2410c]' : 'text-[#26150b] group-hover:text-[#c2410c] transition-colors'}`}>
                    {r.name}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs ${
                    isUttam
                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                      : isMadhyam
                      ? 'text-amber-700 bg-amber-50 border border-amber-200'
                      : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                  }`}
                >
                  {r.percent} {r.status}
                </span>
              </div>
              <p className="text-[11px] text-[#5a3822] leading-snug">{r.desc}</p>
              <div className="text-[10px] text-[#b8860b] font-semibold pt-0.5">
                शुभ रंग: {r.color} • अंक: {r.num}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
