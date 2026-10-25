/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratCategoryTabs
 * 8 Major Vedic Ceremony Tabs & Filter Toolbar (Mas, Paksha, Weekend)
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseMuhuratDataResult, MuhuratCategory } from '../hooks/useMuhuratData';

export interface MuhuratCategoryTabsProps {
  data: UseMuhuratDataResult;
}

export const MuhuratCategoryTabs: React.FC<MuhuratCategoryTabsProps> = ({ data }) => {
  const {
    activeCategory,
    setActiveCategory,
    selectedMonthFilter,
    setSelectedMonthFilter,
    selectedPakshaFilter,
    setSelectedPakshaFilter,
    onlyWeekends,
    setOnlyWeekends,
  } = data;

  const categories: { id: MuhuratCategory; label: string; icon: 'kundli' | 'temple' | 'choghadiya' | 'clock' | 'shubh' | 'sun'; badge?: string }[] = [
    { id: 'vivah', label: 'विवाह मुहूर्त', icon: 'shubh', badge: '१४ लग्न' },
    { id: 'grihaPravesh', label: 'गृह प्रवेश', icon: 'temple', badge: 'स्थिर लग्न' },
    { id: 'vahan', label: 'वाहन क्रय', icon: 'choghadiya' },
    { id: 'vyapar', label: 'व्यापार एवं दुकान', icon: 'sun' },
    { id: 'bhumi', label: 'भूमि पूजन व नींव', icon: 'temple' },
    { id: 'mundan', label: 'मुंडन / चूड़ाकर्म', icon: 'clock' },
    { id: 'namkaran', label: 'नामकरण संस्कार', icon: 'kundli' },
    { id: 'gold', label: 'स्वर्ण / आभूषण क्रय', icon: 'shubh' },
  ];

  return (
    <section className="space-y-4">
      {/* Category Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-6 bg-[#c2410c] rounded-full"></span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#26150b]">
            संस्कार एवं कार्यवार मुहूर्त चयन
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#735641] bg-amber-500/10 px-3 py-1 rounded-full">
          ८ प्रमुख वैदिक श्रेणियां
        </span>
      </div>

      {/* Segmented Tab Navigation with Horizontal Scroll */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
        <div className="flex items-center gap-2 min-w-max bg-white/70 p-1.5 rounded-2xl border border-amber-900/10 shadow-xs">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c2410c] text-white shadow-md shadow-orange-950/20'
                    : 'text-[#735641] hover:text-[#26150b] hover:bg-amber-100/50'
                }`}
              >
                <VedicIcon3D name={cat.icon} size={16} />
                <span>{cat.label}</span>
                {cat.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Selection Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white/80 rounded-2xl border border-amber-900/10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-900">
            <VedicIcon3D name="clock" size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#26150b] leading-tight">
              आगामी कार्तिक एवं मार्गशीर्ष मास के श्रेष्ठ मुहूर्त
            </h3>
            <p className="text-xs text-[#735641]">
              विक्रम संवत २०८१ • शुद्ध त्रिबल, गोधूलि व निशीथ लग्न काल
            </p>
          </div>
        </div>

        {/* Quick Filter Selectors */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 bg-[#fbf7ee] border border-amber-900/10 px-3 py-1.5 rounded-xl">
            <span className="text-[#8c7166] text-[11px] font-medium">मास:</span>
            <select
              value={selectedMonthFilter}
              onChange={(e) => setSelectedMonthFilter(e.target.value)}
              className="bg-transparent text-[#26150b] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">कार्तिक - मार्गशीर्ष (२०८१)</option>
              <option value="pausha">पौष (संक्रांति उपरांत)</option>
              <option value="magha">माघ (बसंत ऋतु)</option>
              <option value="phalguna">फाल्गुन (होलाष्टक पूर्व)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#fbf7ee] border border-amber-900/10 px-3 py-1.5 rounded-xl">
            <span className="text-[#8c7166] text-[11px] font-medium">पक्ष:</span>
            <select
              value={selectedPakshaFilter}
              onChange={(e) => setSelectedPakshaFilter(e.target.value)}
              className="bg-transparent text-[#26150b] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">दोनों पक्ष (शुक्ल + कृष्ण)</option>
              <option value="shukla">केवल शुक्ल पक्ष</option>
              <option value="krishna">केवल कृष्ण पक्ष</option>
            </select>
          </div>

          <label className="flex items-center gap-2 bg-[#fbf7ee] border border-amber-900/10 px-3 py-1.5 rounded-xl cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyWeekends}
              onChange={(e) => setOnlyWeekends(e.target.checked)}
              className="accent-[#c2410c] w-3.5 h-3.5 rounded cursor-pointer"
            />
            <span className="text-[#26150b] font-semibold text-xs">केवल सप्ताहांत (शनि-रवि)</span>
          </label>
        </div>
      </div>
    </section>
  );
};

export default MuhuratCategoryTabs;
