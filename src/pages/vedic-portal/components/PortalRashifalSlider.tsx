/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalRashifalSlider
 * 1-Tap Zero-Friction Daily Horoscope (१-टैप त्वरित दैनिक राशिफल)
 * Pure Client-Side AstroEngine Planetary Moon Transit (चन्द्र गोचर फल)
 * Strict < 250 Lines Modular Standard
 */

import React, { useState, useMemo } from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicRashiGoldIcon, type RashiKey } from './VedicRashiGoldIcon';
import { calculatePlanets } from '../../../engine';
import { toHindiDigits } from '../../../components/watch';

interface RashiInfo {
  rashiKey: RashiKey;
  name: string;
  hindiName: string;
  letters: string;
  score: number;
  status: 'शुभ' | 'मध्यम' | 'उत्तम';
  color: string;
  luckyNum: string;
  prediction: string;
  caution: string;
}

const RASHI_DATA: { rashiKey: RashiKey; name: string; letters: string; color: string; num: string }[] = [
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

const HOUSE_EFFECTS: Record<number, { score: number; status: 'शुभ' | 'मध्यम' | 'उत्तम'; prediction: string; caution: string }> = {
  1: { score: 88, status: 'शुभ', prediction: 'मानसिक प्रसन्नता, आत्मबल व आरोग्य में वृद्धि। सोचे हुए कार्यों में अप्रत्याशित सफलता मिलेगी।', caution: 'क्रोध व जल्दबाजी में कोई निर्णय न लें।' },
  2: { score: 74, status: 'मध्यम', prediction: 'वाणी में मधुरता रखें। आर्थिक लाभ, पारिवारिक मांगलिक चर्चा व पुराने निवेश से लाभ होगा।', caution: 'अनावश्यक फिजूलखर्ची से बचें।' },
  3: { score: 92, status: 'उत्तम', prediction: 'पराक्रम, साहस व आत्मविश्वास में वृद्धि। बंधु-बांधवों का पूर्ण सहयोग व शुभ समाचार की प्राप्ति होगी।', caution: 'मित्रों से व्यर्थ वाद-विवाद टालें।' },
  4: { score: 68, status: 'मध्यम', prediction: 'मातृ सुख, गृह शांति एवं आध्यात्मिक चिंतन में मन लगेगा। अचल संपत्ति व वाहन संबंधी योजना बनेगी।', caution: 'वाहन चलाते समय सतर्कता बरतें।' },
  5: { score: 78, status: 'मध्यम', prediction: 'संतान पक्ष से हर्ष व अध्ययन में एकाग्रता बढ़ेगी। नवीन रचनात्मक विचारों से कार्यक्षेत्र में प्रशंसा मिलेगी।', caution: 'शेयर या सट्टेबाजी में जोखिम न लें।' },
  6: { score: 95, status: 'उत्तम', prediction: 'शत्रु परास्त होंगे, रोग व ऋण से मुक्ति मिलेगी। प्रतियोगी परीक्षाओं व कार्यक्षेत्र में बड़ी विजय का योग है।', caution: 'खान-पान में स्वच्छता का ध्यान रखें।' },
  7: { score: 86, status: 'शुभ', prediction: 'दांपत्य जीवन में मधुरता व साझेदारी के व्यापार में उत्तम लाभ। सुखद यात्रा एवं नए अनुबंध संभव हैं।', caution: 'जीवनसाथी की भावनाओं का आदर करें।' },
  8: { score: 65, status: 'मध्यम', prediction: 'चन्द्राष्टम का प्रभाव: धार्मिक साधना व ध्यान से आत्मशांति मिलेगी। आकस्मिक लाभ के अवसर बनेंगे।', caution: 'नया निवेश व जोखिम भरे कार्य टालें।' },
  9: { score: 84, status: 'शुभ', prediction: 'भाग्य का पूर्ण साथ मिलेगा। तीर्थ यात्रा, धर्म-कर्म व गुरुजनों के आशीर्वाद से बिगड़े काम बनेंगे।', caution: 'आलस्य का परित्याग करें।' },
  10: { score: 91, status: 'उत्तम', prediction: 'कार्यक्षेत्र में उच्चाधिकारियों की कृपा से पद-प्रतिष्ठा में वृद्धि। राजकीय व प्रशासनिक कार्यों में सफलता मिलेगी।', caution: 'अहंकार से दूर रहें।' },
  11: { score: 96, status: 'उत्तम', prediction: 'सर्वार्थ सिद्धि योग। रुका हुआ धन प्राप्त होगा, प्रियजनों से लाभ व जीवन में नए आय स्रोत बनेंगे।', caution: 'बड़े भाई-बहनों से संबंध मधुर रखें।' },
  12: { score: 70, status: 'मध्यम', prediction: 'शुभ व मांगलिक कार्यों में व्यय होगा। आध्यात्मिक चिंतन, एकांत साधना व परोपकार से आत्मसंतुष्टि मिलेगी।', caution: 'देर रात तक जागने से बचें।' }
};

export const PortalRashifalSlider: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const { rashiList, moonSignHindi } = useMemo(() => {
    try {
      const positions = calculatePlanets(new Date());
      const moon = positions.planets.find((p) => p.name === 'Moon');
      const currentMoonSign = moon?.signHindi || 'कन्या';
      const moonSignIdx = Math.max(0, Math.min(11, Math.floor((moon?.longitude || 165) / 30)));

      const computed: RashiInfo[] = RASHI_DATA.map((r, idx) => {
        const house = ((moonSignIdx - idx + 12) % 12) + 1;
        const effect = HOUSE_EFFECTS[house] || HOUSE_EFFECTS[1];
        return {
          rashiKey: r.rashiKey,
          name: r.name,
          hindiName: r.name,
          letters: r.letters,
          score: effect.score,
          status: effect.status,
          color: r.color,
          luckyNum: toHindiDigits(r.num),
          prediction: effect.prediction,
          caution: effect.caution
        };
      });

      return { rashiList: computed, moonSignHindi: currentMoonSign };
    } catch {
      return { rashiList: [], moonSignHindi: 'कन्या' };
    }
  }, []);

  const activeRashi = rashiList[selectedIdx] || rashiList[0];

  return (
    <section className="glass-panel rounded-3xl p-5 sm:p-7 space-y-4 font-serif relative overflow-hidden" id="quick-rashifal">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.05]" />
      <GoldenCornerBrackets size="lg" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/60 pb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
            <span className="material-symbols-outlined text-[20px]">stars</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#26150b]">दैनिक राशिफल</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                चन्द्र गोचर फल
              </span>
            </div>
            <p className="text-xs text-[#735641]">
              अपनी राशि चुनें — १ सेकंड में जानें भाग्य व शुभ रंग
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-semibold text-[#735641]">
            चन्द्र संचार: <span className="text-[#c2410c] font-bold">{moonSignHindi} राशि</span>
          </span>
          <Link
            href="/rashifal"
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#ea580c] hover:text-white text-[#c2410c] text-xs font-bold border border-[#dec9ab] shadow-xs transition-all no-underline"
          >
            विस्तृत राशिफल ➔
          </Link>
        </div>
      </div>

      {/* 12-Rashi Symmetrical Balanced Grid (Full Width on Desktop) */}
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 w-full pb-2 pt-1">
          {rashiList.map((r, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={r.rashiKey}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl border transition-all duration-300 w-full cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#ea580c] to-[#c2410c] text-white border-[#ea580c] shadow-[0_6px_18px_rgba(234,88,12,0.35)] scale-105'
                    : 'bg-white/90 text-[#26150b] border-[#dec9ab]/70 hover:border-[#ea580c] hover:bg-amber-50/60 shadow-2xs'
                }`}
              >
                <VedicRashiGoldIcon
                  rashi={r.rashiKey}
                  size="md"
                  className={isSelected ? 'brightness-0 invert' : ''}
                />
                <span className="text-xs font-bold mt-1 truncate">{r.name}</span>
                <span className={`text-[9.5px] font-mono mt-0.5 ${isSelected ? 'text-white/90' : 'text-[#735641]'}`}>
                  {toHindiDigits(r.score)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Selected Rashi Full Preview Card */}
      {activeRashi && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#dec9ab] shadow-sm relative overflow-hidden z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dec9ab]/60 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center shadow-xs">
                <VedicRashiGoldIcon rashi={activeRashi.rashiKey} size="lg" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#26150b]">
                    {activeRashi.name} राशि — भविष्यफल
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                    भाग्य: {toHindiDigits(activeRashi.score)}% ({activeRashi.status})
                  </span>
                </div>
                <div className="text-xs text-[#735641] font-medium mt-0.5">
                  नामाक्षर: <span className="font-semibold text-[#26150b]">{activeRashi.letters}</span>
                </div>
              </div>
            </div>

            {/* Lucky Color & Number Badges */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-[#fffaf0] border border-[#dec9ab] text-xs font-bold text-[#26150b] shadow-2xs">
                शुभ रंग: <span className="text-[#c2410c]">{activeRashi.color}</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-[#fffaf0] border border-[#dec9ab] text-xs font-bold text-[#26150b] shadow-2xs">
                शुभ अंक: <span className="text-[#b8860b]">{activeRashi.luckyNum}</span>
              </span>
            </div>
          </div>

          {/* Prediction & Practical Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
            <div className="md:col-span-8 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
              <span className="text-xs font-bold text-[#c2410c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                मुख्य फलादेश:
              </span>
              <p className="text-xs sm:text-[13px] text-[#3d2414] leading-relaxed font-medium">
                {activeRashi.prediction}
              </p>
            </div>

            <div className="md:col-span-4 p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1">
              <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                सावधानी:
              </span>
              <p className="text-xs sm:text-[13px] text-rose-950 leading-relaxed font-medium">
                {activeRashi.caution}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortalRashifalSlider;
