/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalRashifal
 * Vedic Moon Transit (चन्द्र गोचर फल) Daily Horoscope for 12 Rashis
 * Connected directly to Sanatan AstroEngine & JPL Ephemeris
 */

import React, { useState, useMemo } from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicRashiGoldIcon, type RashiKey } from './VedicRashiGoldIcon';
import { calculatePlanets } from '../../../engine';
import { toHindiDigits } from '../../../components/watch';

interface RashiItem {
  rashiKey: RashiKey;
  name: string;
  letters: string;
  percent: string;
  status: 'शुभ' | 'मध्यम' | 'उत्तम';
  desc: string;
  color: string;
  num: string;
  isHighlight?: boolean;
}

const BASE_RASHIS: { rashiKey: RashiKey; name: string; letters: string; color: string; num: string }[] = [
  { rashiKey: 'mesh', name: 'मेष', letters: 'चू, चे, चो, ला, ली, लू, ले, लो, अ', color: 'लाल', num: '९' },
  { rashiKey: 'vrishabh', name: 'वृषभ', letters: 'ई, ऊ, ए, ओ, वा, वी, वू, वे, वो', color: 'श्वेत', num: '६' },
  { rashiKey: 'mithun', name: 'मिथुन', letters: 'का, की, कू, घ, ङ, छ, के, को, हा', color: 'हरा', num: '५' },
  { rashiKey: 'kark', name: 'कर्क', letters: 'ही, हू, हे, हो, डा, डी, डू, डे, डो', color: 'दूधिया', num: '२' },
  { rashiKey: 'singh', name: 'सिंह', letters: 'मा, मी, मू, मे, मो, टा, टी, टू, टे', color: 'केसरिया', num: '१' },
  { rashiKey: 'kanya', name: 'कन्या', letters: 'टो, पा, पी, पू, ष, ण, ठ, पे, पो', color: 'पीतांबरी', num: '५' },
  { rashiKey: 'tula', name: 'तुला', letters: 'रा, री, रू, रे, रो, ता, ती, तू, ते', color: 'क्रीम', num: '७' },
  { rashiKey: 'vrishchik', name: 'वृश्चिक', letters: 'तो, ना, नी, नू, ने, नो, या, यी, यू', color: 'सिन्दूरी', num: '३' },
  { rashiKey: 'dhanu', name: 'धनु', letters: 'ये, यो, भा, भी, भू, धा, फा, ढा, भे', color: 'पीला', num: '३' },
  { rashiKey: 'makar', name: 'मकर', letters: 'भो, जा, जी, खी, खू, खे, खो, गा, गी', color: 'नीला', num: '८' },
  { rashiKey: 'kumbh', name: 'कुंभ', letters: 'गू, गे, गो, सा, सी, सू, से, सो, दा', color: 'जामुनी', num: '४' },
  { rashiKey: 'meen', name: 'मीन', letters: 'दी, दू, थ, झ, ञ, दे, दो, चा, ची', color: 'स्वर्णिम', num: '७' }
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
  const [searchLetter, setSearchLetter] = useState<string>('');

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
          letters: r.letters,
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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#dec9ab]/60 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#b8860b] shadow-[0_0_8px_#b8860b]"></span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#26150b]">आज का दैनिक राशिफल (चन्द्र गोचर फल)</h2>
        </div>

        {/* Name-to-Rashi Search & Navigation */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <input
              type="text"
              placeholder="नाम के पहले अक्षर से राशि खोजें (रा, सु, अ...)"
              value={searchLetter}
              onChange={(e) => setSearchLetter(e.target.value)}
              className="pl-8 pr-6 py-1.5 text-xs rounded-xl border border-[#dec9ab] bg-white/95 text-[#26150b] placeholder:text-[#a0826d] focus:ring-2 focus:ring-[#ea580c] focus:outline-hidden w-52 sm:w-64 shadow-xs"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#b8860b] text-[15px]">search</span>
            {searchLetter && (
              <button
                type="button"
                onClick={() => setSearchLetter('')}
                className="absolute right-2 top-1.5 text-stone-400 hover:text-stone-700 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <span className="text-xs text-[#735641] font-semibold hidden lg:inline">
            चन्द्रमा: <span className="text-[#c2410c]">{moonSignHindi}</span> में
          </span>

          <Link
            href="/rashifal"
            className="px-3 py-1.5 rounded-xl bg-[#fff2e8] hover:bg-[#ea580c] hover:text-white text-[#c2410c] text-xs font-bold border border-[#ffd8bf] shadow-xs transition-all no-underline shrink-0"
          >
            विस्तृत राशिफल देखें ➔
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
        {rashis.map((r) => {
          const isUttam = r.status === 'उत्तम';
          const isMadhyam = r.status === 'मध्यम';
          const isSearchMatched = searchLetter.trim()
            ? r.name.toLowerCase().includes(searchLetter.trim().toLowerCase()) ||
              r.letters.includes(searchLetter.trim())
            : false;

          return (
            <div
              key={r.name}
              className={`p-3.5 rounded-2xl glass-inner bg-white/85 border space-y-1.5 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_16px_32px_-6px_rgba(217,119,6,0.38)] hover:border-[#d4af37] hover:bg-[#fffdf8] relative group overflow-hidden ${
                isSearchMatched
                  ? 'border-[#ea580c] ring-3 ring-[#ea580c] bg-amber-50/95 shadow-md scale-[1.02]'
                  : r.isHighlight
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
                  <span className={`text-base font-bold ${r.isHighlight || isSearchMatched ? 'text-[#c2410c]' : 'text-[#26150b] group-hover:text-[#c2410c] transition-colors'}`}>
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

              {/* Name First-Letter Indicator */}
              <div className="text-[10px] text-[#735641] font-semibold bg-[#fcf8f0] px-1.5 py-0.5 rounded border border-[#dec9ab]/50 truncate" title={`नामाक्षर: ${r.letters}`}>
                अक्षर: {r.letters.split(', ').slice(0, 3).join(', ')}...
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
