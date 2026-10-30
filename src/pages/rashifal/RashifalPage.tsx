/**
 * Sanatan Web (सनातन घड़ी)
 * Dedicated Page: RashifalPage (/rashifal)
 * Comprehensive Daily Vedic Horoscope & Chandra Gochar Insights for 12 Rashis
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useState, useMemo } from 'react';
import { Link } from '../../routes/AppRoutes';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import { GoldenCornerBrackets } from '../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../vedic-portal/components/SacredGeometryWatermark';
import { VedicRashiGoldIcon, type RashiKey } from '../vedic-portal/components/VedicRashiGoldIcon';
import { calculatePlanets } from '../../engine';
import { toHindiDigits } from '../../components/watch';
import { ArrowLeft, ChevronRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface RashiDetail {
  key: RashiKey;
  name: string;
  lord: string;
  tatva: string;
  color: string;
  num: string;
  direction: string;
  percent: number;
  status: 'शुभ' | 'मध्यम' | 'उत्तम';
  career: string;
  wealth: string;
  health: string;
  family: string;
  upay: string;
  shubhMuhurat: string;
}

const RASHIS_DATA: { key: RashiKey; name: string; lord: string; tatva: string; color: string; num: string; direction: string }[] = [
  { key: 'mesh', name: 'मेष', lord: 'मंगल देव', tatva: 'अग्नि', color: 'लाल व सिन्दूरी', num: '९', direction: 'पूर्व' },
  { key: 'vrishabh', name: 'वृषभ', lord: 'शुक्र देव', tatva: 'पृथ्वी', color: 'श्वेत व क्रीम', num: '६', direction: 'दक्षिण' },
  { key: 'mithun', name: 'मिथुन', lord: 'बुध देव', tatva: 'वायु', color: 'हरा व धानी', num: '५', direction: 'पश्चिम' },
  { key: 'kark', name: 'कर्क', lord: 'चन्द्र देव', tatva: 'जल', color: 'दूधिया व रजत', num: '२', direction: 'उत्तर' },
  { key: 'singh', name: 'सिंह', lord: 'सूर्य देव', tatva: 'अग्नि', color: 'केसरिया व स्वर्णिम', num: '१', direction: 'पूर्व' },
  { key: 'kanya', name: 'कन्या', lord: 'बुध देव', tatva: 'पृथ्वी', color: 'पीतांबरी व हरा', num: '५', direction: 'दक्षिण' },
  { key: 'tula', name: 'तुला', lord: 'शुक्र देव', tatva: 'वायु', color: 'गुलाबी व श्वेत', num: '७', direction: 'पश्चिम' },
  { key: 'vrishchik', name: 'वृश्चिक', lord: 'मंगल देव', tatva: 'जल', color: 'रक्त वर्ण व महरून', num: '३', direction: 'उत्तर' },
  { key: 'dhanu', name: 'धनु', lord: 'देवगुरु बृहस्पति', tatva: 'अग्नि', color: 'पीला व नारंगी', num: '३', direction: 'पूर्व' },
  { key: 'makar', name: 'मकर', lord: 'शनि देव', tatva: 'पृथ्वी', color: 'नीला व आसमानी', num: '८', direction: 'दक्षिण' },
  { key: 'kumbh', name: 'कुंभ', lord: 'शनि देव', tatva: 'वायु', color: 'जामुनी व गहरा नीला', num: '४', direction: 'पश्चिम' },
  { key: 'meen', name: 'मीन', lord: 'देवगुरु बृहस्पति', tatva: 'जल', color: 'हल्दी पीला व स्वर्णिम', num: '७', direction: 'उत्तर' }
];

const HOUSE_TRANSIT_EFFECTS: Record<number, { percent: number; status: 'शुभ' | 'मध्यम' | 'उत्तम'; career: string; wealth: string; health: string; family: string; upay: string }> = {
  1: { percent: 88, status: 'शुभ', career: 'मान-सम्मान में वृद्धि, कार्यक्षेत्र में आपके निर्णय सराहे जाएंगे।', wealth: 'अचानक धन लाभ एवं नवीन वित्तीय अनुबंध संभव।', health: 'आत्मबल उत्तम, स्फूर्ति और ऊर्जा का संचार रहेगा।', family: 'परिजनों का पूर्ण सहयोग, मांगलिक चर्चाएं सफल।', upay: 'प्रातः सूर्य नारायण को लाल पुष्प व जल अर्पण करें।' },
  2: { percent: 74, status: 'मध्यम', career: 'वाणी में मधुरता रखें, सहकर्मियों से तर्क-वितर्क से बचें।', wealth: 'धन संचय पर ध्यान दें, अनावश्यक व्यय पर नियंत्रण रखें।', health: 'नेत्र अथवा मुख संबंधी हल्का विकार संभव, संतुलित आहार लें।', family: 'पारिवारिक दायित्वों का निर्वहन धैर्यपूर्वक करें।', upay: 'गाय को गुड़ व रोटी अथवा हरी दूर्वा खिलाएं।' },
  3: { percent: 92, status: 'उत्तम', career: 'पराक्रम में अभूतपूर्व वृद्धि, नए प्रोजेक्ट्स में तीव्र सफलता।', wealth: 'व्यापारिक यात्रा से लाभ, रुका हुआ धन वापस मिलेगा।', health: 'उत्कृष्ट शारीरिक व मानसिक स्फूर्ति बनी रहेगी।', family: 'छोटे भाई-बहनों से सहयोग, मित्र मंडली में हर्षोल्लास।', upay: 'हनुमान चालीसा का पाठ करें व सिन्दूर का तिलक लगाएं।' },
  4: { percent: 68, status: 'मध्यम', career: 'कार्यस्थल पर धैर्य रखें, जल्दबाजी में कार्य न बदलें।', wealth: 'भूमि, भवन या वाहन संबंधी कार्यों में कागजी सतर्कता बरतें।', health: 'छाती अथवा कफ संबंधी सावधानी रखें, शीत पेय से बचें।', family: 'माताजी के स्वास्थ्य का विशेष ध्यान रखें, गृह शांति बनाएं।', upay: 'शिवलिंग पर कच्चा दूध एवं श्वेत चन्दन अर्पण करें।' },
  5: { percent: 78, status: 'मध्यम', career: 'रचनात्मक कार्यों में प्रगति, विद्यार्थियों हेतु एकाग्रता लाभ।', wealth: 'सट्टे या जोखिम भरे निवेश से दूर रहें, सोच-समझकर निर्णय लें।', health: 'पेट संबंधी हल्का विकार संभव, खानपान में सुपाच्य आहार लें।', family: 'संतान पक्ष से शुभ समाचार मिलेगा, प्रेम संबंधों में मिठास।', upay: 'भगवान श्री गणेश को २१ दूर्वा व मोदक अर्पित करें।' },
  6: { percent: 95, status: 'उत्तम', career: 'शत्रु परास्त होंगे, कानूनी अथवा प्रतिस्पर्धा में निर्णायक विजय।', wealth: 'ऋण मुक्ति के मार्ग खुलेंगे, व्यापार में अच्छा मुनाफा।', health: 'दीर्घकालिक व्याधियों से राहत, स्वास्थ्य में तीव्र सुधार।', family: 'मातृपक्ष से सहायता, घरेलू विवादों का स्थायी समाधान।', upay: 'भगवान कार्तिकेय अथवा भैरव जी का स्मरण करें।' },
  7: { percent: 86, status: 'शुभ', career: 'साझेदारी के कार्यों में प्रगति, नए अनुबंध हस्ताक्षर होंगे।', wealth: 'व्यापारिक गतिशीलता बढ़ेगी, आय के नवीन स्रोत सृजित होंगे।', health: 'स्वास्थ्य सामान्य व संतोषप्रद बना रहेगा।', family: 'दांपत्य जीवन में माधुर्य, जीवनसाथी के साथ सामंजस्य।', upay: 'माँ दुर्गा को लाल पुष्प व इत्र अर्पित करें।' },
  8: { percent: 65, status: 'मध्यम', career: 'चन्द्राष्टम प्रभाव: कार्यक्षेत्र में संयम रखें, विवाद टालें।', wealth: 'अपरिचित व्यक्तियों को धन उधार देने से बचें।', health: 'वाहन चालन में पूर्ण सावधानी बरतें, पर्याप्त विश्राम लें।', family: 'वाणी पर नियंत्रण रखें ताकि परिजनों से गलतफहमी न हो।', upay: 'महामृत्युंजय मन्त्र का ११ बार श्रद्धापूर्वक जप करें।' },
  9: { percent: 84, status: 'शुभ', career: 'उच्चाधिकारियों व मार्गदर्शकों का पूर्ण आशीर्वाद मिलेगा।', wealth: 'धार्मिक कार्यों में व्यय, दीर्घकालिक निवेश में अनुकूलता।', health: 'मानसिक प्रसन्नता व आध्यात्मिक चेतना का विकास।', family: 'तीर्थ यात्रा का योग, पिता व गुरुजनों का सानिध्य प्राप्त।', upay: 'केसर अथवा पीत चन्दन का तिलक लगाएं।' },
  10: { percent: 91, status: 'उत्तम', career: 'कर्मक्षेत्र में सर्वोच्च सफलता, पदोन्नति व ख्याति के योग।', wealth: 'व्यावसायिक विस्तार होगा, सरकारी कार्यों में सरलता।', health: 'कार्य की अधिकता के बाद भी शारीरिक ऊर्जा उच्च रहेगी।', family: 'समाज व कुटुंब में प्रतिष्ठा बढ़ेगी, शुभ आयोजनों का योग।', upay: 'पीपल वृक्ष की जड़ में जल चढ़ाएं व धूप दीप करें।' },
  11: { percent: 96, status: 'उत्तम', career: 'सर्वार्थ सिद्धि योग, प्रत्येक प्रयास में मनोनुकूल लाभ।', wealth: 'आय में भारी वृद्धि, लंबे समय से अटका कार्य पूरा होगा।', health: 'रोग प्रतिरोधक क्षमता मजबूत, मानसिक शांति का अनुभव।', family: 'वरिष्ठ बंधुओं का सहयोग, परिजनों के साथ सुखद समय।', upay: 'भगवान लक्ष्मीनारायण को खीर व तुलसी दल अर्पण करें।' },
  12: { percent: 70, status: 'मध्यम', career: 'दूरगामी योजनाओं पर कार्य करें, विदेश अथवा दूरस्थ कार्यों में लाभ।', wealth: 'मांगलिक कार्यों में व्यय होगा, बजट का संतुलन बनाए रखें।', health: 'अनिद्रा अथवा नेत्र विकार से बचें, ध्यान व योग अपनाएं।', family: 'अनावश्यक वाद-विवाद से दूर रहें, मौन का आश्रय लें।', upay: 'काले तिल व उड़द का किसी जरूरतमंद को दान करें।' }
};

export const RashifalPage: React.FC = () => {
  const [selectedRashi, setSelectedRashi] = useState<RashiKey>('mesh');

  // Real-time Moon Sign calculation from engine
  const { moonSignHindi, moonSignIdx } = useMemo(() => {
    try {
      const positions = calculatePlanets(new Date());
      const moon = positions.planets.find(p => p.name === 'Moon');
      const idx = Math.max(0, Math.min(11, Math.floor((moon?.longitude || 165) / 30)));
      return {
        moonSignHindi: moon?.signHindi || 'कन्या',
        moonSignIdx: idx
      };
    } catch {
      return { moonSignHindi: 'कन्या', moonSignIdx: 5 };
    }
  }, []);

  const activeRashiIndex = RASHIS_DATA.findIndex(r => r.key === selectedRashi);
  const activeRashiMeta = RASHIS_DATA[activeRashiIndex >= 0 ? activeRashiIndex : 0];

  // Bhav from natal rashi to transiting moon
  const house = ((moonSignIdx - activeRashiIndex + 12) % 12) + 1;
  const activeEffect = HOUSE_TRANSIT_EFFECTS[house] || HOUSE_TRANSIT_EFFECTS[1];

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      <PortalHeader />

      <main className="w-full pt-32 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8" id="rashifal-page">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 font-sans" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-amber-800 transition-colors flex items-center gap-1 no-underline">
              <ArrowLeft className="w-3.5 h-3.5" /> मुख्य पृष्ठ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-amber-900 font-semibold">दैनिक राशिफल (१२ राशियां)</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-sans font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            चन्द्रमा आज <strong>{moonSignHindi} राशि</strong> में गोचरस्थ हैं
          </span>
        </div>

        {/* Hero Title */}
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest inline-block">
            प्रामाणिक चन्द्र गोचर फल निर्णय
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#26150b]">
            आज का सम्पूर्ण दैनिक राशिफल
          </h1>
          <p className="text-sm text-[#735641]">
            वैदिक महर्षि पराशर पद्धति एवं नासा जेपीएल खगोलीय सूक्ष्म गणना पर आधारित १२ राशियों का स्पष्ट भविष्यकथन
          </p>
        </div>

        {/* 12 Rashi Selection Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-12 gap-2">
          {RASHIS_DATA.map((r, idx) => {
            const isSelected = r.key === selectedRashi;
            const rHouse = ((moonSignIdx - idx + 12) % 12) + 1;
            const isHighlight = rHouse === 3 || rHouse === 6 || rHouse === 10 || rHouse === 11;

            return (
              <button
                key={r.key}
                onClick={() => setSelectedRashi(r.key)}
                className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer border text-center ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-50 to-orange-100 border-[#ea580c] ring-2 ring-[#ea580c]/40 shadow-md scale-105'
                    : 'bg-white/80 border-[#dec9ab]/70 hover:border-[#ea580c] hover:bg-white'
                }`}
                type="button"
              >
                <VedicRashiGoldIcon rashi={r.key} size="sm" />
                <span className={`text-xs font-bold mt-1 ${isSelected ? 'text-[#c2410c]' : 'text-[#26150b]'}`}>
                  {r.name}
                </span>
                {isHighlight && (
                  <span className="text-[9px] font-bold text-emerald-700 mt-0.5">उत्तम</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Selected Rashi Comprehensive Deep-Dive Card */}
        <section className="glass-panel-warm rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />
          <GoldenCornerBrackets size="lg" />

          {/* Active Rashi Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#dec9ab]/60 pb-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/90 border border-[#d4af37] flex items-center justify-center shadow-md p-2">
                <VedicRashiGoldIcon rashi={activeRashiMeta.key} size="lg" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b]">{activeRashiMeta.name} राशि</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    स्वामी: {activeRashiMeta.lord}
                  </span>
                </div>
                <p className="text-xs text-[#735641] mt-1">
                  तत्व: {activeRashiMeta.tatva} • गोचर भाव: {toHindiDigits(house)}वां भाव ({activeEffect.status} फल)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-white/90 border border-[#dec9ab] text-center shadow-xs">
                <div className="text-[10px] text-[#735641] font-bold uppercase">भाग्य प्रतिशत</div>
                <div className="text-xl font-bold text-[#c2410c] font-mono">
                  {toHindiDigits(activeEffect.percent)}%
                </div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-white/90 border border-[#dec9ab] text-center shadow-xs">
                <div className="text-[10px] text-[#735641] font-bold uppercase">शुभ अंक</div>
                <div className="text-xl font-bold text-[#b8860b] font-mono">
                  {toHindiDigits(activeRashiMeta.num)}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Life Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c2410c]">
                <span className="w-2 h-2 rounded-full bg-[#ea580c]"></span>
                <span>१. कार्यक्षेत्र, आजीविका एवं व्यापार</span>
              </div>
              <p className="text-xs text-[#4a2e1b] leading-relaxed">{activeEffect.career}</p>
            </div>

            <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#b8860b]">
                <span className="w-2 h-2 rounded-full bg-[#b8860b]"></span>
                <span>२. धन, संपत्ति एवं वित्तीय स्थिति</span>
              </div>
              <p className="text-xs text-[#4a2e1b] leading-relaxed">{activeEffect.wealth}</p>
            </div>

            <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2a674c]">
                <span className="w-2 h-2 rounded-full bg-[#2a674c]"></span>
                <span>३. स्वास्थ्य, ऊर्जा एवं मनोबल</span>
              </div>
              <p className="text-xs text-[#4a2e1b] leading-relaxed">{activeEffect.health}</p>
            </div>

            <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/70 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#735641]">
                <span className="w-2 h-2 rounded-full bg-stone-600"></span>
                <span>४. परिवार, प्रेम एवं दांपत्य जीवन</span>
              </div>
              <p className="text-xs text-[#4a2e1b] leading-relaxed">{activeEffect.family}</p>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#dec9ab]/60 relative z-10 text-xs">
            <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/60 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-700" />
              <div>
                <span className="text-[#735641] block text-[10px]">शुभ दिशा व रंग</span>
                <span className="font-bold text-[#26150b]">{activeRashiMeta.direction} • {activeRashiMeta.color}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/60 flex items-center gap-2 sm:col-span-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="text-[#735641] block text-[10px]">आज का अचूक वैदिक उपाय</span>
                <span className="font-bold text-[#26150b]">{activeEffect.upay}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PortalFooter />
    </div>
  );
};

export default RashifalPage;
