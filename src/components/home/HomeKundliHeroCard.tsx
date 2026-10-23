import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronDown, Heart, FileText, Sparkles } from 'lucide-react';
import { useRouter } from '../../routes/AppRoutes';
import { useLocationStore } from '../../store/locationStore';

interface HomeKundliHeroCardProps {
  onOpenCityModal?: () => void;
  className?: string;
}

type KundliTab = 'lagna' | 'navamsha' | 'chandra' | 'graha';

export const HomeKundliHeroCard: React.FC<HomeKundliHeroCardProps> = ({
  onOpenCityModal,
  className = '',
}) => {
  const { navigate } = useRouter();
  const { currentCity } = useLocationStore();

  const [birthDate, setBirthDate] = useState('1990-10-20');
  const [birthTime, setBirthTime] = useState('10:30');
  const [activeTab, setActiveTab] = useState<KundliTab>('lagna');
  const [hoveredHouse, setHoveredHouse] = useState<number | null>(null);

  const handleCreateKundli = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/kundli?date=${birthDate}&time=${birthTime}&city=${encodeURIComponent(currentCity.name)}`);
  };

  return (
    <section className={`w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 my-6 sm:my-8 ${className}`}>
      {/* Main Luxury Parchment Container */}
      <div className="bg-[#FDFBF7] dark:bg-[#121826] rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 lg:p-9 border border-[#E8DCC8] dark:border-white/10 shadow-[0_8px_30px_rgba(139,38,18,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================
              LEFT COLUMN: KUNDLI GENERATION FORM
             ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6">
            
            {/* Header with Title & Subtitle */}
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black font-serif text-[#1E1B18] dark:text-white tracking-tight leading-tight">
                अपनी जन्म कुंडली बनाएं
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5046] dark:text-gray-400 font-sans font-medium">
                सटीक वैदिक गणना से अपनी कुंडली प्राप्त करें
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleCreateKundli} className="space-y-4">
              
              {/* Row 1: Birth Date & Birth Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* 1. Birth Date */}
                <div className="space-y-1">
                  <label className="text-xs sm:text-[12.5px] font-bold text-[#1E1B18] dark:text-gray-200 flex items-center space-x-1">
                    <span>जन्म तिथि</span>
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Calendar className="w-4 h-4 text-[#8B2612] absolute left-3 pointer-events-none" />
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-[#1A2234] border border-[#E2D8C9] dark:border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-medium text-[#1E1B18] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F392B]/30 shadow-inner"
                    />
                  </div>
                </div>

                {/* 2. Birth Time */}
                <div className="space-y-1">
                  <label className="text-xs sm:text-[12.5px] font-bold text-[#1E1B18] dark:text-gray-200 flex items-center space-x-1">
                    <span>जन्म समय</span>
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Clock className="w-4 h-4 text-[#8B2612] absolute left-3 pointer-events-none" />
                    <input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-[#1A2234] border border-[#E2D8C9] dark:border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-medium text-[#1E1B18] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F392B]/30 shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Birth Place / City Selector */}
              <div className="space-y-1">
                <label className="text-xs sm:text-[12.5px] font-bold text-[#1E1B18] dark:text-gray-200 flex items-center space-x-1">
                  <span>जन्म स्थान</span>
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <div
                  onClick={onOpenCityModal}
                  className="w-full bg-white dark:bg-[#1A2234] border border-[#E2D8C9] dark:border-white/10 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-sm font-medium text-[#1E1B18] dark:text-white cursor-pointer hover:border-[#C45E1A]/60 transition-colors shadow-inner"
                  title="स्थान बदलने के लिए क्लिक करें"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <MapPin className="w-4 h-4 text-[#8B2612] shrink-0" />
                    <span className="truncate">
                      {currentCity.nameHindi ? `${currentCity.nameHindi}, भारत` : `${currentCity.name}, India`}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#8B2612] shrink-0 ml-2" />
                </div>
              </div>

              {/* Row 3: Primary Emerald Green CTA Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0F392B] to-[#1B4D3E] hover:from-[#0B2C21] hover:to-[#143B2F] text-white py-3 sm:py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base shadow-[0_6px_20px_rgba(15,57,43,0.3)] flex items-center justify-center space-x-2.5 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                {/* Kundli Chakra Icon */}
                <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>कुंडली बनाएं</span>
                <span className="text-lg leading-none">➔</span>
              </button>

              {/* Row 4: Secondary Action Buttons (विवाह मिलान & विस्तृत रिपोर्ट) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/matchmaking')}
                  className="flex items-center justify-center space-x-2 py-2.5 px-3 bg-white dark:bg-[#1A2234] border border-[#E2D8C9] dark:border-white/10 rounded-xl text-xs sm:text-[13px] font-bold text-[#1E1B18] dark:text-gray-200 hover:border-rose-400 hover:bg-rose-50/40 transition-all cursor-pointer shadow-sm group"
                >
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20 group-hover:scale-110 transition-transform" />
                  <span>कुंडली मिलान</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/kundli')}
                  className="flex items-center justify-center space-x-2 py-2.5 px-3 bg-white dark:bg-[#1A2234] border border-[#E2D8C9] dark:border-white/10 rounded-xl text-xs sm:text-[13px] font-bold text-[#1E1B18] dark:text-gray-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all cursor-pointer shadow-sm group"
                >
                  <FileText className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                  <span>विस्तृत कुंडली रिपोर्ट</span>
                </button>
              </div>

            </form>
          </div>

          {/* ========================================================
              RIGHT COLUMN: INTERACTIVE VEDIC KUNDLI CHART (D1/D9)
             ======================================================== */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            <div className="w-full max-w-[460px] bg-white dark:bg-[#1A2234] rounded-2xl sm:rounded-[26px] p-3.5 sm:p-5 border border-[#E8DCC8] dark:border-white/10 shadow-[0_6px_24px_rgba(139,38,18,0.05)] space-y-3">
              
              {/* Top Navigation Tabs */}
              <div className="bg-[#FAF6F0] dark:bg-[#121826] p-1 rounded-xl flex items-center justify-between border border-[#EADBCA] dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('lagna')}
                  className={`flex-1 py-1.5 px-2 text-center text-xs sm:text-[12.5px] font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'lagna'
                      ? 'bg-[#0F392B] text-white shadow-sm'
                      : 'text-[#5C5046] dark:text-gray-400 hover:text-[#1E1B18]'
                  }`}
                >
                  जन्म कुंडली
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('navamsha')}
                  className={`flex-1 py-1.5 px-2 text-center text-xs sm:text-[12.5px] font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'navamsha'
                      ? 'bg-[#0F392B] text-white shadow-sm'
                      : 'text-[#5C5046] dark:text-gray-400 hover:text-[#1E1B18]'
                  }`}
                >
                  नवांश
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('chandra')}
                  className={`flex-1 py-1.5 px-2 text-center text-xs sm:text-[12.5px] font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'chandra'
                      ? 'bg-[#0F392B] text-white shadow-sm'
                      : 'text-[#5C5046] dark:text-gray-400 hover:text-[#1E1B18]'
                  }`}
                >
                  चंद्र कुंडली
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('graha')}
                  className={`flex-1 py-1.5 px-2 text-center text-xs sm:text-[12.5px] font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'graha'
                      ? 'bg-[#0F392B] text-white shadow-sm'
                      : 'text-[#5C5046] dark:text-gray-400 hover:text-[#1E1B18]'
                  }`}
                >
                  ग्रह स्थिति
                </button>
              </div>

              {/* The Traditional North Indian Kundli Chart with 12 Houses */}
              <div className="relative w-full aspect-square bg-[#FFFDF9] dark:bg-[#141C2B] rounded-xl border border-[#EADBCA] dark:border-white/10 overflow-hidden flex items-center justify-center p-1 sm:p-2">
                
                {activeTab === 'graha' ? (
                  /* Planetary Positions Quick Table */
                  <div className="w-full h-full p-2 overflow-y-auto no-scrollbar text-xs">
                    <p className="font-bold text-[#8B2612] mb-2 font-serif flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>तात्कालिक ग्रह गोचर स्थिति</span>
                    </p>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#EADBCA] text-[10px] text-[#6E6259] uppercase font-serif">
                          <th className="py-1">ग्रह</th>
                          <th>राशि</th>
                          <th>अंश</th>
                          <th>भाव</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1E8DC] text-[11px] font-medium">
                        <tr><td className="py-1 text-red-600 font-bold">सूर्य</td><td>मकर</td><td>10° 24'</td><td>10</td></tr>
                        <tr><td className="py-1 text-blue-600 font-bold">चंद्र</td><td>मीन</td><td>22° 15'</td><td>12</td></tr>
                        <tr><td className="py-1 text-red-600 font-bold">मंगल</td><td>सिंह</td><td>05° 40'</td><td>5</td></tr>
                        <tr><td className="py-1 font-bold">बुध</td><td>मकर</td><td>18° 12'</td><td>10</td></tr>
                        <tr><td className="py-1 text-red-600 font-bold">गुरु</td><td>वृषभ</td><td>14° 08'</td><td>2</td></tr>
                        <tr><td className="py-1 font-bold">शुक्र</td><td>कुम्भ</td><td>02° 50'</td><td>11</td></tr>
                        <tr><td className="py-1 font-bold">शनि</td><td>मिथुन</td><td>27° 19'</td><td>3</td></tr>
                        <tr><td className="py-1 font-bold">राहु</td><td>कर्क</td><td>11° 30'</td><td>4</td></tr>
                        <tr><td className="py-1 font-bold">केतु</td><td>कन्या</td><td>11° 30'</td><td>6</td></tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  /* Sacred North Indian Diamond SVG Chart */
                  <svg className="w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <radialGradient id="centerOmAura" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9" />
                        <stop offset="60%" stopColor="#FDE68A" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#FFFDF9" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Outer Chart Frame */}
                    <rect x="2" y="2" width="396" height="396" stroke="#D4AF37" strokeWidth="2" fill="none" rx="6" />

                    {/* Auspicious Corner Flourishes */}
                    <g stroke="#D4AF37" strokeWidth="1.2" fill="none">
                      {/* Top-Left */}
                      <path d="M 6 22 L 22 6 M 6 14 L 14 6 M 12 26 L 26 12" opacity="0.6" />
                      {/* Top-Right */}
                      <path d="M 394 22 L 378 6 M 394 14 L 386 6 M 388 26 L 374 12" opacity="0.6" />
                      {/* Bottom-Left */}
                      <path d="M 6 378 L 22 394 M 6 386 L 14 394 M 12 374 L 26 388" opacity="0.6" />
                      {/* Bottom-Right */}
                      <path d="M 394 378 L 378 394 M 394 386 L 386 394 M 388 374 L 374 388" opacity="0.6" />
                    </g>

                    {/* Two Main Cross Diagonals */}
                    <line x1="2" y1="2" x2="398" y2="398" stroke="#D4AF37" strokeWidth="1.5" />
                    <line x1="398" y1="2" x2="2" y2="398" stroke="#D4AF37" strokeWidth="1.5" />

                    {/* Inner Diamond Geometry */}
                    <polygon points="200,2 398,200 200,398 2,200" stroke="#D4AF37" strokeWidth="1.6" fill="none" />

                    {/* House Highlight Overlay */}
                    {hoveredHouse === 1 && <polygon points="200,2 300,100 200,200 100,100" fill="#FEF3C7" fillOpacity="0.4" />}
                    {hoveredHouse === 4 && <polygon points="2,200 100,100 200,200 100,300" fill="#FEF3C7" fillOpacity="0.4" />}
                    {hoveredHouse === 7 && <polygon points="200,200 300,300 200,398 100,300" fill="#FEF3C7" fillOpacity="0.4" />}
                    {hoveredHouse === 10 && <polygon points="200,200 300,100 398,200 300,300" fill="#FEF3C7" fillOpacity="0.4" />}

                    {/* Central Sacred Om (ॐ) Medallion */}
                    <g transform="translate(200, 200)">
                      <circle cx="0" cy="0" r="38" fill="url(#centerOmAura)" />
                      <circle cx="0" cy="0" r="32" stroke="#E6C875" strokeWidth="1.5" fill="#FFFDF9" />
                      <circle cx="0" cy="0" r="28" stroke="#E6C875" strokeWidth="0.8" strokeDasharray="3 2" fill="none" />
                      <text
                        x="0"
                        y="10"
                        textAnchor="middle"
                        fontSize="28"
                        fontFamily="serif"
                        fontWeight="bold"
                        fill="#D97706"
                        className="drop-shadow-sm select-none"
                      >
                        ॐ
                      </text>
                    </g>

                    {/* ===================================================
                        PLANETS & RASHI NUMBERS (Exactly as in Reference)
                       =================================================== */}
                    
                    {/* 1. House 1 (Top Center Diamond - Lagna / Tanu) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(1)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="200" y="68" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#D97706" fontFamily="serif">लग्न</text>
                      <text x="200" y="92" textAnchor="middle" fontSize="14" fontWeight="extrabold" fill="#1E1B18">1</text>
                    </g>

                    {/* 2. House 2 (Top Left Triangle - Dhana) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(2)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="145" y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#DC2626" fontFamily="serif">गुरु</text>
                      <text x="145" y="80" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E1B18">2</text>
                    </g>

                    {/* 3. House 3 (Far Left Top Triangle - Sahaja) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(3)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="75" y="145" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1E1B18" fontFamily="serif">शनि</text>
                      <text x="75" y="168" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E1B18">3</text>
                    </g>

                    {/* 4. House 4 (Left Center Diamond - Sukha) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(4)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="145" y="195" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1E1B18" fontFamily="serif">राहु</text>
                      <text x="145" y="220" textAnchor="middle" fontSize="14" fontWeight="extrabold" fill="#1E1B18">4</text>
                    </g>

                    {/* 5. House 5 (Far Left Bottom Triangle - Putra) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(5)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="75" y="260" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#DC2626" fontFamily="serif">मंगल</text>
                      <text x="75" y="282" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E1B18">5</text>
                    </g>

                    {/* 6. House 6 (Bottom Left Triangle - Ripu) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(6)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="150" y="325" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1E1B18" fontFamily="serif">केतु</text>
                      <text x="150" y="348" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E1B18">6</text>
                    </g>

                    {/* 7. House 7 (Bottom Center Diamond - Jaya / Vivaha) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(7)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="200" y="340" textAnchor="middle" fontSize="14" fontWeight="extrabold" fill="#1E1B18">7</text>
                    </g>

                    {/* 8. House 8 (Bottom Right Triangle - Ayu) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(8)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="250" y="345" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E1B18">8</text>
                    </g>

                    {/* 9. House 9 (Far Right Bottom Triangle - Dharma / Bhagya) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(9)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="325" y="275" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E1B18">9</text>
                    </g>

                    {/* 10. House 10 (Right Center Diamond - Karma) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(10)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="245" y="195" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#DC2626" fontFamily="serif">सूर्य</text>
                      <text x="280" y="195" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1E1B18" fontFamily="serif">बुध</text>
                      <text x="255" y="222" textAnchor="middle" fontSize="14" fontWeight="extrabold" fill="#1E1B18">10</text>
                    </g>

                    {/* 11. House 11 (Far Right Top Triangle - Labha) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(11)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="325" y="150" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1E1B18" fontFamily="serif">शुक्र</text>
                      <text x="325" y="172" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E1B18">11</text>
                    </g>

                    {/* 12. House 12 (Top Right Triangle - Vyaya / Moksha) */}
                    <g className="cursor-pointer" onMouseEnter={() => setHoveredHouse(12)} onMouseLeave={() => setHoveredHouse(null)}>
                      <text x="250" y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#2563EB" fontFamily="serif">चंद</text>
                      <text x="250" y="80" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E1B18">12</text>
                    </g>
                  </svg>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================
            BOTTOM BAR: 12 भाव (घर) SIGNIFICATORS STRIP
           ======================================================== */}
        <div className="mt-6 pt-5 border-t border-[#E8DCC8] dark:border-white/10">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs font-bold text-[#8B2612] dark:text-amber-400 font-serif flex items-center space-x-1.5">
              <span>✦</span>
              <span>कुंडली के १२ भाव (घर) एवं कारकत्व :</span>
            </span>
            <span className="text-[10px] text-[#6E6259] dark:text-gray-400">
              {hoveredHouse ? `सक्रिय भाव: ${hoveredHouse}` : 'भाव पर कर्सर ले जाएं'}
            </span>
          </div>

          <div className="flex items-center overflow-x-auto no-scrollbar gap-2 py-1 scroll-smooth">
            {[
              { num: 1, name: 'तनु (लग्न)', desc: 'शरीर, व्यक्तित्व, स्वास्थ्य' },
              { num: 2, name: 'धन भाव', desc: 'संपत्ति, वाणी, कुटुंब' },
              { num: 3, name: 'सहज भाव', desc: 'पराक्रम, भाई-बहन, साहस' },
              { num: 4, name: 'सुख भाव', desc: 'माता, भूमि, वाहन, गृह' },
              { num: 5, name: 'पुत्र भाव', desc: 'संतान, विद्या, बुद्धि' },
              { num: 6, name: 'रिपु भाव', desc: 'शत्रु, रोग, ऋण, सेवा' },
              { num: 7, name: 'जाया भाव', desc: 'विवाह, जीवनसाथी, साझेदारी' },
              { num: 8, name: 'आयु भाव', desc: 'आयु, मृत्यु, गूढ़ रहस्य' },
              { num: 9, name: 'धर्म भाव', desc: 'भाग्य, धर्म, तीर्थ, गुरु' },
              { num: 10, name: 'कर्म भाव', desc: 'व्यवसाय, पद, प्रतिष्ठा' },
              { num: 11, name: 'लाभ भाव', desc: 'आय, सिद्धि, इच्छापूर्ति' },
              { num: 12, name: 'व्यय भाव', desc: 'मोक्ष, विदेश यात्रा, व्यय' },
            ].map((bhava) => (
              <div
                key={bhava.num}
                onMouseEnter={() => setHoveredHouse(bhava.num)}
                onMouseLeave={() => setHoveredHouse(null)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                  hoveredHouse === bhava.num
                    ? 'bg-[#0F392B] text-white border-[#0F392B] shadow-sm scale-105'
                    : 'bg-white dark:bg-[#1A2234] border-[#E2D8C9] dark:border-white/10 hover:border-[#8B2612]/50 text-[#1E1B18] dark:text-gray-200'
                }`}
              >
                <p className="text-[11px] font-extrabold font-serif leading-tight">
                  {bhava.num}. {bhava.name}
                </p>
                <p className={`text-[9px] truncate mt-0.5 ${hoveredHouse === bhava.num ? 'text-amber-200' : 'text-[#6E6259] dark:text-gray-400'}`}>
                  {bhava.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeKundliHeroCard;
