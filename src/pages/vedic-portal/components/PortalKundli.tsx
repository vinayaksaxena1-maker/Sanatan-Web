/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalKundli
 * Express Vedic Kundli & Matchmaking Quick-Launch Portal
 * Clean, Compact, Zero-Dummy-Data Bloat, Seamless Redirection to /kundli & /matchmaking
 * Strict < 300 Lines Modular Standard
 */

import React, { useState } from 'react';
import { useRouter, Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';
import { DEFAULT_NATIVE_INPUT, type KundliPersonInput } from '../../kundli/hooks/kundliTypes';

const QUICK_CITIES = [
  { name: 'वाराणसी (काशी)', lat: 25.3176, lon: 82.9739 },
  { name: 'नई दिल्ली', lat: 28.6139, lon: 77.2090 },
  { name: 'मुंबई', lat: 19.0760, lon: 72.8777 },
  { name: 'उज्जैन', lat: 23.1765, lon: 75.7885 },
  { name: 'अयोध्या धाम', lat: 26.7922, lon: 82.1998 },
  { name: 'प्रयागराज', lat: 25.4358, lon: 81.8463 }
];

export const PortalKundli: React.FC = () => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'kundli' | 'matching'>('kundli');

  // Kundli Form State (Clean without fake bloated dummy records)
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthDate, setBirthDate] = useState<string>('1998-05-15');
  const [birthTime, setBirthTime] = useState<string>('08:30');
  const [cityName, setCityName] = useState<string>('वाराणसी (काशी)');
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lon: number }>({
    lat: 25.3176,
    lon: 82.9739
  });

  // Matchmaking Form State
  const [groomName, setGroomName] = useState<string>('');
  const [brideName, setBrideName] = useState<string>('');

  const handleLaunchKundli = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse 24-hr time into hour, minute, and AM/PM
    const [hStr, mStr] = birthTime.split(':');
    let hNum = parseInt(hStr || '8', 10);
    const mNum = parseInt(mStr || '30', 10);
    const amPm: 'AM' | 'PM' = hNum >= 12 ? 'PM' : 'AM';
    const h12 = hNum % 12 || 12;

    const payload: KundliPersonInput = {
      ...DEFAULT_NATIVE_INPUT,
      name: name.trim() || 'जातक',
      gender,
      birthDate,
      birthHour: String(h12).padStart(2, '0'),
      birthMinute: String(mNum).padStart(2, '0'),
      birthSecond: '00',
      birthAmPm: amPm,
      cityName,
      latitude: selectedCoords.lat,
      longitude: selectedCoords.lon
    };

    try {
      localStorage.setItem('sanatan_active_kundli_input', JSON.stringify(payload));
    } catch {
      // silent fallback
    }

    navigate('/kundli');
  };

  const handleLaunchMatching = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/matchmaking');
  };

  return (
    <section className="glass-panel rounded-3xl p-5 sm:p-7 space-y-5 font-serif relative overflow-hidden" id="kundli-portal">
      <SacredGeometryWatermark variant="shree-yantra" className="opacity-[0.05]" />
      <GoldenCornerBrackets size="lg" />

      {/* Header with Dual-Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/70 pb-3 relative z-10">
        <div className="flex items-center gap-3">
          <VedicIcon3D name={activeTab === 'kundli' ? 'kundli' : 'shubh'} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#26150b]">
                {activeTab === 'kundli' ? 'त्वरित जन्म कुण्डली निर्माण' : 'विवाह कुण्डली ३६ गुण मिलान'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#dec9ab]/30 text-[#735641] text-[10px] font-bold border border-[#dec9ab] shadow-xs">
                D1 से D60 षोडशवर्ग
              </span>
            </div>
            <p className="text-xs text-[#735641]">
              {activeTab === 'kundli'
                ? 'जन्म विवरण दर्ज करें और १-क्लिक में सम्पूर्ण D1 से D60 षोडशवर्ग, षड्बल व विंशोत्तरी दशा देखें'
                : 'वर एवं कन्या का अष्टकूट मिलान, ३६ गुण गणना, मांगलिक विचार व परिहार निर्णय'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-[#f5ecdd] border border-[#dec9ab] shadow-inner text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('kundli')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'kundli'
                ? 'bg-white text-[#c2410c] shadow-xs'
                : 'text-[#735641] hover:text-[#26150b]'
            }`}
          >
            🪐 जन्म कुण्डली
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matching')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'matching'
                ? 'bg-white text-[#c2410c] shadow-xs'
                : 'text-[#735641] hover:text-[#26150b]'
            }`}
          >
            💖 ३६ गुण मिलान
          </button>
        </div>
      </div>

      {/* Main Interactive Form Card */}
      <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[#dec9ab]/80 shadow-xs">
        {activeTab === 'kundli' ? (
          <form onSubmit={handleLaunchKundli} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* 1. Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#735641] block">
                  जातक का नाम
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="अपना नाम लिखें (उदा. राहुल)"
                  className="w-full px-3 py-2 rounded-xl bg-[#fffdfa] border border-[#dec9ab] focus:border-[#ea580c] focus:outline-none text-xs font-semibold text-[#26150b]"
                />
              </div>

              {/* 2. Gender */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#735641] block">
                  लिंग
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="w-full px-3 py-2 rounded-xl bg-[#fffdfa] border border-[#dec9ab] focus:border-[#ea580c] focus:outline-none text-xs font-semibold text-[#26150b]"
                >
                  <option value="male">पुरुष (Male)</option>
                  <option value="female">स्त्री (Female)</option>
                </select>
              </div>

              {/* 3. Birth Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#735641] block">
                  जन्म तिथि
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#fffdfa] border border-[#dec9ab] focus:border-[#ea580c] focus:outline-none text-xs font-semibold text-[#26150b]"
                />
              </div>

              {/* 4. Birth Time */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#735641] block">
                  जन्म समय
                </label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#fffdfa] border border-[#dec9ab] focus:border-[#ea580c] focus:outline-none text-xs font-semibold text-[#26150b]"
                />
              </div>
            </div>

            {/* City Selector with Quick Pills */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-[#735641] block">
                जन्म स्थान (नगर / तीर्थ)
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {QUICK_CITIES.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setCityName(c.name);
                      setSelectedCoords({ lat: c.lat, lon: c.lon });
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                      cityName === c.name
                        ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-2xs'
                        : 'bg-white text-[#735641] border-[#dec9ab] hover:border-[#ea580c]'
                    }`}
                  >
                    📍 {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Launch CTA */}
            <div className="pt-3 border-t border-[#dec9ab]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#735641]">
                <span className="flex items-center gap-1 font-semibold text-emerald-800">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  D1 से D60 षोडशवर्ग
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-[#b8860b]">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  विंशोत्तरी दशा
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-[#c2410c]">
                  <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span>
                  A4 कुण्डली पत्रक
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>सम्पूर्ण कुण्डली देखें</span>
                <span className="text-sm">➔</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLaunchMatching} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-[#fffdf8] border border-orange-200 space-y-2">
                <span className="text-xs font-bold text-[#c2410c] block">
                  🤵 वर का विवरण (Groom)
                </span>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  placeholder="वर का नाम दर्ज करें"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9ab] focus:border-[#ea580c] focus:outline-none text-xs font-semibold text-[#26150b]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#fffdf8] border border-pink-200 space-y-2">
                <span className="text-xs font-bold text-[#db2777] block">
                  👰 कन्या का विवरण (Bride)
                </span>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  placeholder="कन्या का नाम दर्ज करें"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#dec9ab] focus:border-[#db2777] focus:outline-none text-xs font-semibold text-[#26150b]"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#dec9ab]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#735641]">
                <span className="text-emerald-700 font-bold">✓ ३६ गुण विश्लेषण</span>
                <span>•</span>
                <span className="text-[#b8860b] font-bold">✓ नाड़ी व भकूट विचार</span>
                <span>•</span>
                <span className="text-[#c2410c] font-bold">✓ मांगलिक परिहार</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>३६ गुण मिलान करें</span>
                <span className="text-sm">➔</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 5 Quick Navigation Tools Ribbon */}
      <div className="relative z-10 pt-2 border-t border-[#dec9ab]/50 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-[11px] font-bold text-[#735641] uppercase tracking-wider flex items-center gap-1">
          <span className="material-symbols-outlined text-[#ea580c] text-[15px]">apps</span>
          त्वरित वैदिक टूल्स:
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <Link href="/choghadiya" className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-[#735641] hover:text-[#c2410c] text-[11px] font-semibold border border-[#dec9ab]/70 shadow-2xs no-underline">
            🕒 चौघड़िया व २४ होरा
          </Link>
          <Link href="/utilities" className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-[#735641] hover:text-[#c2410c] text-[11px] font-semibold border border-[#dec9ab]/70 shadow-2xs no-underline">
            🪐 साढ़ेसाती व रत्न
          </Link>
          <Link href="/calendar" className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-[#735641] hover:text-[#c2410c] text-[11px] font-semibold border border-[#dec9ab]/70 shadow-2xs no-underline">
            📅 व्रत-पर्व कैलेंडर
          </Link>
          <Link href="/download-panchang" className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-[#735641] hover:text-[#c2410c] text-[11px] font-semibold border border-[#dec9ab]/70 shadow-2xs no-underline">
            📄 A4 पंचांग PDF
          </Link>
          <Link href="/cities" className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-[#735641] hover:text-[#c2410c] text-[11px] font-semibold border border-[#dec9ab]/70 shadow-2xs no-underline">
            📍 ५,०००+ नगर
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortalKundli;
