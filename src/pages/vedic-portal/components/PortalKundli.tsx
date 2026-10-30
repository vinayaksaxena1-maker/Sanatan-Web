/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalKundli
 * Interactive Vedic Birth Chart & Real-Time Astronomical Predictions
 * Connected directly to Sanatan AstroEngine (NASA JPL DE405 / Lahiri Ayanamsha)
 */

import React, { useState, useMemo } from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';
import {
  calculateCompleteHoroscope,
  CompleteHoroscopeResult
} from '../../../engine/facade/horoscopeFacade';
import {
  RASHI_NAMES_HINDI,
  PLANET_NAMES_HINDI
} from '../../kundli/hooks/kundliTypes';
import majorCitiesData from '../../../data/majorCities250.json';

const POPULAR_CITIES = [
  { name: 'वाराणसी (काशी)', lat: 25.3176, lon: 82.9739 },
  { name: 'नई दिल्ली', lat: 28.6139, lon: 77.2090 },
  { name: 'मुंबई', lat: 19.0760, lon: 72.8777 },
  { name: 'उज्जैन (अवन्तिका)', lat: 23.1765, lon: 75.7885 },
  { name: 'अयोध्या धाम', lat: 26.7922, lon: 82.1998 },
  { name: 'हरिद्वार', lat: 29.9457, lon: 78.1642 },
  { name: 'प्रयागराज', lat: 25.4358, lon: 81.8463 },
  { name: 'जयपुर', lat: 26.9124, lon: 75.7873 },
  { name: 'लखनऊ', lat: 26.8467, lon: 80.9462 },
  { name: 'पटना', lat: 25.5941, lon: 85.1376 },
  { name: 'कोलकाता', lat: 22.5726, lon: 88.3639 },
  { name: 'बेंगलुरु', lat: 12.9716, lon: 77.5946 },
  { name: 'अहमदाबाद', lat: 23.0225, lon: 72.5714 },
  { name: 'पुणे', lat: 18.5204, lon: 73.8567 },
];

const RASHI_TATVA: string[] = [
  'अग्नि तत्व प्रधान', 'पृथ्वी तत्व प्रधान', 'वायु तत्व प्रधान', 'जल तत्व प्रधान',
  'अग्नि तत्व प्रधान', 'पृथ्वी तत्व प्रधान', 'वायु तत्व प्रधान', 'जल तत्व प्रधान',
  'अग्नि तत्व प्रधान', 'पृथ्वी तत्व प्रधान', 'वायु तत्व प्रधान', 'जल तत्व प्रधान'
];

const LAGNA_PERSONALITY: Record<number, string> = {
  0: 'मेष लग्न के प्रभाव से आपमें अदम्य साहस, ऊर्जावान नेतृत्व, स्पष्टवादिता और स्वतंत्र विचार रहेंगे।',
  1: 'वृषभ लग्न के प्रभाव से आपमें धैर्य, स्थिरता, सौन्दर्य-कला के प्रति आकर्षण एवं व्यावहारिक कार्यकुशलता रहेगी।',
  2: 'मिथुन लग्न के प्रभाव से आपमें तीव्र मेधा, उत्कृष्ट वाक-कौशल, जिज्ञासु बुद्धि एवं बहुमुखी प्रतिभा रहेगी।',
  3: 'कर्क लग्न के प्रभाव से आपमें संवेदनशीलता, परिवार-प्रेम, प्रखर कल्पनाशक्ति व आध्यात्मिक चेतना प्रबल रहेगी।',
  4: 'सिंह लग्न के प्रभाव से आपमें स्वाभाविक नेतृत्व क्षमता, स्पष्टवादिता, दृढ़ संकल्प एवं समाज में उच्च मान-प्रतिष्ठा का योग है।',
  5: 'कन्या लग्न के प्रभाव से आपमें सूक्ष्म विश्लेषणात्मक दृष्टि, कर्तव्यनिष्ठा, व्यावहारिक चातुर्य व अनुशासन रहेगा।',
  6: 'तुला लग्न के प्रभाव से आपमें न्यायप्रियता, संतुलन, सुरुचिपूर्ण व्यक्तित्व एवं उत्कृष्ट सामाजिक संबंध रहेंगे।',
  7: 'वृश्चिक लग्न के प्रभाव से आपमें अगाध आत्मबल, रहस्यमयी सामर्थ्य, तीव्र अंतर्दृष्टि एवं अडिग संकल्प रहेगा।',
  8: 'धनु लग्न के प्रभाव से आपमें धार्मिक निष्ठा, उच्च जीवन दर्शन, आशावादी दृष्टिकोण व सत्यनिष्ठा का प्रभाव रहेगा।',
  9: 'मकर लग्न के प्रभाव से आपमें कठिन परिश्रम, धैर्य, दीर्घकालिक लक्ष्य सिद्धि एवं संगठनात्मक दक्षता रहेगी।',
  10: 'कुंभ लग्न के प्रभाव से आपमें दूरदर्शिता, नवीन अन्वेषण, समाजहित की भावना एवं स्वतंत्र चिंतन रहेगा।',
  11: 'मीन लग्न के प्रभाव से आपमें सहज करुणा, परोपकार, कलात्मक रुझान एवं तीव्र आध्यात्मिक रुचि रहेगी।'
};

function resolveCityCoords(query: string): { name: string; lat: number; lon: number } {
  const q = query.trim().toLowerCase();
  const pop = POPULAR_CITIES.find(c => c.name.toLowerCase().includes(q) || q.includes(c.name.split(' ')[0].toLowerCase()));
  if (pop) return { name: pop.name, lat: pop.lat, lon: pop.lon };

  const found = (majorCitiesData as any[]).find(c =>
    (c.name && c.name.toLowerCase().includes(q)) ||
    (c.nameHindi && c.nameHindi.includes(query.trim())) ||
    (c.state && c.state.toLowerCase().includes(q)) ||
    (c.stateHindi && c.stateHindi.includes(query.trim()))
  );
  if (found) {
    return { name: found.nameHindi || found.name, lat: found.latitude, lon: found.longitude };
  }
  return { name: 'वाराणसी (काशी)', lat: 25.3176, lon: 82.9739 };
}

export const PortalKundli: React.FC = () => {
  const [userName, setUserName] = useState<string>('राहुल शर्मा');
  const [dob, setDob] = useState<string>('1996-10-24');
  const [tob, setTob] = useState<string>('09:42');
  const [place, setPlace] = useState<string>('वाराणसी, उत्तर प्रदेश');
  const [gender, setGender] = useState<string>('पुरुष');

  const [activePerson, setActivePerson] = useState({
    name: 'राहुल शर्मा',
    dob: '1996-10-24',
    tob: '09:42',
    place: 'वाराणसी, उत्तर प्रदेश',
    gender: 'पुरुष',
    lat: 25.3176,
    lon: 82.9739
  });

  const [isCalculatedFlash, setIsCalculatedFlash] = useState(false);

  // Compute live Horoscope via pure Sanatan AstroEngine
  const horoscope: CompleteHoroscopeResult | null = useMemo(() => {
    try {
      const timeParts = activePerson.tob.split(':');
      const h = (parseInt(timeParts[0], 10) || 12).toString().padStart(2, '0');
      const m = (parseInt(timeParts[1], 10) || 0).toString().padStart(2, '0');
      const time24 = `${h}:${m}:00`;

      return calculateCompleteHoroscope({
        date: activePerson.dob || '1996-10-24',
        time: time24,
        latitude: activePerson.lat,
        longitude: activePerson.lon,
        timezoneOffset: 5.5,
        ayanamshaSystem: 'Lahiri',
        houseSystem: 'Sripati'
      });
    } catch (err) {
      console.error('Horoscope calculation failed:', err);
      return null;
    }
  }, [activePerson]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = resolveCityCoords(place);

    const updated = {
      name: userName.trim() || 'जातक',
      dob,
      tob,
      place,
      gender,
      lat: city.lat,
      lon: city.lon
    };
    setActivePerson(updated);

    // Sync seamlessly with full /kundli and /matchmaking suite
    try {
      const [hStr, mStr] = tob.split(':');
      const hNum = parseInt(hStr, 10) || 12;
      const amPm = hNum >= 12 ? 'PM' : 'AM';
      const h12 = (hNum % 12 || 12).toString().padStart(2, '0');

      localStorage.setItem('sanatan_active_kundli_input', JSON.stringify({
        name: updated.name,
        gender: gender === 'स्त्री' ? 'female' : 'male',
        birthDate: dob,
        birthHour: h12,
        birthMinute: (parseInt(mStr, 10) || 0).toString().padStart(2, '0'),
        birthSecond: '00',
        birthAmPm: amPm,
        cityName: place,
        latitude: city.lat,
        longitude: city.lon,
        timezoneOffset: 5.5,
        ayanamshaSystem: 'Lahiri',
        houseSystem: 'Sripati'
      }));
    } catch {
      // silent
    }

    setIsCalculatedFlash(true);
    setTimeout(() => setIsCalculatedFlash(false), 800);
  };

  // Planetary & Dasha Data from Engine
  const asc = horoscope?.ascendant;
  const lagnaIndex = asc ? asc.signIndex : 4;
  const lagnaHindi = RASHI_NAMES_HINDI[lagnaIndex] || 'सिंह';
  const lagnaDegree = asc ? asc.formatted : "०८° १९'";
  const lagnaTatva = RASHI_TATVA[lagnaIndex] || 'अग्नि तत्व प्रधान';

  const moon = horoscope?.planets?.find(p => p.name === 'Moon');
  const chandraRashiHindi = moon ? RASHI_NAMES_HINDI[moon.signIndex] : 'कर्क';
  const chandraNakshatra = moon ? `${moon.nakshatraName} • पद ${moon.nakshatraPada}` : 'पुष्य नक्षत्र • पद ३';

  const sun = horoscope?.planets?.find(p => p.name === 'Sun');
  const suryaRashiHindi = sun ? RASHI_NAMES_HINDI[sun.signIndex] : 'तुला';
  const suryaStatus = sun?.isExalted ? ' (उच्च)' : sun?.isDebilitated ? ' (नीच)' : '';
  const suryaNakshatra = sun ? `${sun.nakshatraName} • पद ${sun.nakshatraPada}` : 'स्वाति नक्षत्र • पद १';

  const vimCurrent = horoscope?.dashas?.vimshottari?.current;
  const mdLord = vimCurrent?.mahadasha ? (PLANET_NAMES_HINDI[vimCurrent.mahadasha]?.split(' ')[0] || vimCurrent.mahadasha) : 'गुरु';
  const adLord = vimCurrent?.antardasha ? (PLANET_NAMES_HINDI[vimCurrent.antardasha]?.split(' ')[0] || vimCurrent.antardasha) : 'शुक्र';
  const dashaEndYear = vimCurrent?.endDate ? new Date(vimCurrent.endDate).getFullYear() : 2027;

  const lifeGem = horoscope?.remedies?.gemstones?.lifeStone;
  const gemName = lifeGem?.hindiName || 'माणिक्य';
  const gemMetal = lifeGem?.metal || 'सुवर्ण';
  const gemFinger = lifeGem?.finger || 'अनामिका';

  const activeYogas = horoscope?.predictive?.yogas?.filter(y => y.isPresent) || [];
  const topYoga = activeYogas[0];

  const personalityText = `${LAGNA_PERSONALITY[lagnaIndex] || ''} ${chandraRashiHindi} राशि के चन्द्रमा के प्रभाव से आपकी कल्पनाशक्ति एवं मानसिक संवेदनशीलता प्रखर रहेगी।`;

  const elementKey = lagnaTatva.split(' ')[0].replace('तत्व', '');
  const careerText = topYoga
    ? `कुण्डली में '${topYoga.name}' का शुभ निर्माण हो रहा है। ${topYoga.description}`
    : (CAREER_BY_ELEMENT[elementKey] || 'दशम भाव पर शुभ ग्रहों की दृष्टि से व्यवसाय, राजकीय कार्य एवं स्वावलंबन में विशेष प्रगति होगी।');

  return (
    <section className="space-y-4 font-serif" id="kundli">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#dec9ab]/60 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ea580c] animate-pulse"></span>
          <h2 className="text-2xl font-bold text-[#26150b]">जन्म कुण्डली निर्माण एवं तात्कालिक फलादेश</h2>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-[#fff2e8] text-[#c2410c] font-bold border border-[#ffd8bf] shadow-xs">
          बृहत् पराशर होरा शास्त्र आधारित
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* BOX 1: कुण्डली निर्माण फॉर्म (5 Cols) */}
        <div className="lg:col-span-5 glass-panel-warm rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-[#dec9ab] shadow-xs relative overflow-hidden">
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.07]" />
          <GoldenCornerBrackets size="md" />

          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between border-b border-[#e5d5be]/70 pb-3">
              <div className="flex items-center gap-2.5">
                <VedicIcon3D name="kundli" size="md" />
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
                    placeholder="उदा. राहुल शर्मा"
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
                <label className="block text-xs font-bold text-[#382012] mb-1">जन्म स्थान (नगर / तीर्थ / राज्य)</label>
                <div className="relative">
                  <input
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#dec9ab] bg-white/90 text-[#26150b] focus:ring-2 focus:ring-[#ea580c] focus:outline-hidden"
                    required
                    type="text"
                    list="kundli-popular-cities"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="उदा. वाराणसी, दिल्ली, मुंबई"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#b8860b] text-[18px]">location_on</span>
                  <datalist id="kundli-popular-cities">
                    {POPULAR_CITIES.map(c => (
                      <option key={c.name} value={c.name} />
                    ))}
                  </datalist>
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
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ea580c] via-[#d95d0f] to-[#c2410c] hover:brightness-110 text-white font-bold text-base shadow-[0_4px_16px_rgba(217,93,15,0.35)] transition-all flex items-center justify-center gap-2 group mt-2 cursor-pointer active:scale-[0.99]"
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
              <span className="material-symbols-outlined text-[14px] text-emerald-700">lock</span> सुरक्षित एवं शत-प्रतिशत सटीक
            </span>
            <span>अयनांश: चित्रपक्षीय (लाहिड़ी)</span>
          </div>
        </div>

        {/* BOX 2: तात्कालिक कुण्डली फलादेश एवं लग्न विवरण (7 Cols) */}
        <div
          className={`lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-[#dec9ab] shadow-xs bg-gradient-to-br from-[#fffbf5] to-[#fbf2e3] relative overflow-hidden transition-all duration-300 ${
            isCalculatedFlash ? 'ring-4 ring-[#ea580c]/50 scale-[1.005]' : ''
          }`}
        >
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.08]" />
          <GoldenCornerBrackets size="lg" />

          <div className="space-y-5 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dec9ab]/70 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#c2410c] uppercase tracking-wider block">
                  खगोलीय लग्न एवं वास्तविक ग्रह स्थिति
                </span>
                <h3 className="text-xl font-bold text-[#26150b]">
                  जातक: {activePerson.name} ({lagnaHindi} लग्न)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#fde8d7] text-[#c2410c] text-xs font-bold border border-[#f7c29e] shadow-xs">
                  लग्न: {lagnaHindi} ({lagnaDegree})
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[#065f46] text-xs font-bold border border-emerald-300 shadow-xs">
                  {lagnaTatva}
                </span>
              </div>
            </div>

            {/* Coordinates Cards with Micro-Elevation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl glass-inner bg-white/85 border border-[#dec9ab]/60 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                <div className="text-[11px] text-[#735641]">चन्द्र राशि</div>
                <div className="text-sm font-bold text-[#26150b] mt-0.5">{chandraRashiHindi} राशि</div>
                <div className="text-[10px] text-[#b8860b] truncate">{chandraNakshatra}</div>
              </div>
              <div className="p-3 rounded-2xl glass-inner bg-white/85 border border-[#dec9ab]/60 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                <div className="text-[11px] text-[#735641]">सूर्य राशि</div>
                <div className="text-sm font-bold text-[#26150b] mt-0.5">{suryaRashiHindi}{suryaStatus}</div>
                <div className="text-[10px] text-[#c2410c] truncate">{suryaNakshatra}</div>
              </div>
              <div className="p-3 rounded-2xl glass-inner bg-white/85 border border-[#dec9ab]/60 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                <div className="text-[11px] text-[#735641]">वर्तमान महादशा</div>
                <div className="text-sm font-bold text-[#c2410c] mt-0.5">{mdLord} - {adLord}</div>
                <div className="text-[10px] text-[#735641]">{dashaEndYear} तक प्रभावी</div>
              </div>
              <div className="p-3 rounded-2xl glass-inner bg-white/85 border border-[#dec9ab]/60 hover:-translate-y-1 hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.25)] hover:border-[#d4af37] transition-all duration-300 cursor-pointer">
                <div className="text-[11px] text-[#735641]">शुभ रत्न / धातु</div>
                <div className="text-sm font-bold text-[#b8860b] mt-0.5">{gemName} / {gemMetal}</div>
                <div className="text-[10px] text-emerald-700">{gemFinger} अंगुली</div>
              </div>
            </div>

            {/* Authentic North Indian Kundli Chart & Predictions Side-by-Side */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Computed Diamond Lagna Kundali Chart */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-2 rounded-2xl bg-white/95 border border-[#dec9ab]/80 shadow-xs hover:border-[#ea580c] transition-colors">
                <div className="w-full max-w-[220px] aspect-square relative rounded-xl overflow-hidden border border-[#dec9ab]/60 shadow-inner bg-[#fffdfa] flex items-center justify-center">
                  {horoscope?.charts?.northIndianSvg ? (
                    <div
                      className="w-full h-full [&>svg]:w-full [&>svg]:h-full select-none"
                      dangerouslySetInnerHTML={{ __html: horoscope.charts.northIndianSvg }}
                    />
                  ) : (
                    <div className="text-xs text-[#735641]">गणना प्रगति पर है...</div>
                  )}
                </div>
                <span className="text-[10px] text-[#735641] font-bold mt-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#c2410c]">stars</span>
                  <span>D1 लग्न कुण्डली ({lagnaHindi} लग्न • {activePerson.place.split(',')[0]})</span>
                </span>
              </div>

              {/* Core Falam & Dynamic Guidance */}
              <div className="sm:col-span-7 space-y-2.5">
                <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/60 space-y-1 hover:border-[#ea580c] transition-colors">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#c2410c]">
                    <span className="material-symbols-outlined text-[16px]">psychology</span>
                    <span>व्यक्तित्व एवं मानसिक स्वभाव ({lagnaHindi} लग्न)</span>
                  </div>
                  <p className="text-xs text-[#5a3822] leading-relaxed">
                    {personalityText}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/85 border border-[#dec9ab]/60 space-y-1 hover:border-[#b8860b] transition-colors">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#b8860b]">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    <span>कार्यक्षेत्र एवं राजयोग फलादेश</span>
                  </div>
                  <p className="text-xs text-[#5a3822] leading-relaxed">
                    {careerText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Links & CTAs */}
          <div className="pt-3 border-t border-[#dec9ab]/60 flex flex-wrap items-center justify-between gap-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/matchmaking"
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-500 hover:to-pink-600 hover:text-white text-[#e11d48] text-xs font-bold border border-rose-300 shadow-xs transition-all flex items-center gap-1.5 no-underline"
              >
                <span>💑 विवाह कुण्डली मिलान (३६ गुण)</span>
                <span className="text-[10px]">➔</span>
              </Link>
              <Link
                href="/kundli"
                className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-[#c2410c] hover:text-white text-[#c2410c] text-xs font-bold border border-[#dec9ab] shadow-xs transition-all flex items-center gap-1 no-underline"
              >
                <span>D1-D60 षोडशवर्ग चक्र देखें</span>
                <span className="text-[10px]">➔</span>
              </Link>
            </div>
            <Link
              href="/kundli"
              className="px-4 py-2 rounded-xl bg-[#f0e5d1] hover:bg-[#ea580c] hover:text-white text-[#26150b] text-xs font-bold border border-[#dec9ab] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs no-underline"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>सम्पूर्ण कुण्डली सुइट खोलें</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalKundli;
