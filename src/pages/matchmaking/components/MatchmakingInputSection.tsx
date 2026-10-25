/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MatchmakingInputSection
 * Dual Profile Input Card for Groom (वर) and Bride (कन्या)
 * Strict < 300 lines modular standard
 */

import React from 'react';
import type { UseMatchmakingDataResult, PersonProfile } from '../hooks/useMatchmakingData';
import { RASHI_LIST, NAKSHATRA_LIST } from '../hooks/matchmakingPresets';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { User, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';

interface MatchmakingInputSectionProps {
  data: UseMatchmakingDataResult;
}

export const MatchmakingInputSection: React.FC<MatchmakingInputSectionProps> = ({ data }) => {
  const {
    inputMode,
    setInputMode,
    groom,
    updateGroom,
    bride,
    updateBride,
    groomRashi,
    groomNakshatra,
    brideRashi,
    brideNakshatra,
  } = data;

  const renderProfileCard = (
    title: string,
    role: 'groom' | 'bride',
    profile: PersonProfile,
    updateProfile: (f: Partial<PersonProfile>) => void,
    rashi: (typeof RASHI_LIST)[0],
    nakshatra: (typeof NAKSHATRA_LIST)[0]
  ) => {
    const isGroom = role === 'groom';
    const accentBorder = isGroom ? 'border-amber-400/60' : 'border-rose-400/60';
    const tagBg = isGroom ? 'bg-amber-600 text-white' : 'bg-rose-600 text-white';

    return (
      <div className={`bg-white/95 dark:bg-stone-900/95 rounded-2xl p-5 border ${accentBorder} shadow-xs space-y-4`}>
        {/* Profile Card Header */}
        <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/40 pb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${tagBg}`}>
              {isGroom ? 'वर (Groom)' : 'कन्या (Bride)'}
            </span>
            <h3 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
              {title}
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            {rashi.elementHindi} तत्व • स्वामी: {rashi.lordHindi}
          </span>
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
            {isGroom ? 'वर का नाम' : 'कन्या का नाम'}
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/30 dark:bg-stone-800 text-xs font-medium text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder={isGroom ? 'उदा. आयुष्मान विनायक' : 'उदा. आयुष्मती वैष्णवी'}
            />
          </div>
        </div>

        {/* Mode A: Fast Rashi & Nakshatra Selector */}
        {inputMode === 'rashi_nakshatra' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Rashi Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                जन्म चंद्र राशि
              </label>
              <select
                value={profile.rashiIndex}
                onChange={(e) => updateProfile({ rashiIndex: Number(e.target.value) })}
                className="w-full py-2 px-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/30 dark:bg-stone-800 text-xs font-semibold text-amber-950 dark:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                {RASHI_LIST.map((r) => (
                  <option key={r.index} value={r.index}>
                    {r.hindi} ({r.english})
                  </option>
                ))}
              </select>
            </div>

            {/* Nakshatra Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                जन्म नक्षत्र
              </label>
              <select
                value={profile.nakshatraIndex}
                onChange={(e) => updateProfile({ nakshatraIndex: Number(e.target.value) })}
                className="w-full py-2 px-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/30 dark:bg-stone-800 text-xs font-semibold text-amber-950 dark:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                {NAKSHATRA_LIST.map((n) => (
                  <option key={n.index} value={n.index}>
                    {n.hindi} ({n.ganaHindi} गण, {n.nadiHindi} नाड़ी)
                  </option>
                ))}
              </select>
            </div>

            {/* Pada Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                नक्षत्र चरण
              </label>
              <select
                value={profile.nakshatraPada}
                onChange={(e) => updateProfile({ nakshatraPada: Number(e.target.value) })}
                className="w-full py-2 px-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/30 dark:bg-stone-800 text-xs font-semibold text-amber-950 dark:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value={1}>प्रथम चरण (१)</option>
                <option value={2}>द्वितीय चरण (२)</option>
                <option value={3}>तृतीय चरण (३)</option>
                <option value={4}>चतुर्थ चरण (४)</option>
              </select>
            </div>
          </div>
        ) : (
          /* Mode B: Detailed Birth Details */
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  जन्म तिथि
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    value={profile.birthDate}
                    onChange={(e) => updateProfile({ birthDate: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/30 dark:bg-stone-800 text-xs font-medium text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  जन्म समय
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="time"
                    value={profile.birthTime}
                    onChange={(e) => updateProfile({ birthTime: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/30 dark:bg-stone-800 text-xs font-medium text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                जन्म स्थान (नगर / शहर)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={profile.cityName}
                  onChange={(e) => updateProfile({ cityName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-amber-200 dark:border-stone-700 bg-amber-50/30 dark:bg-stone-800 text-xs font-medium text-stone-900 dark:text-stone-100"
                  placeholder="उदा. वाराणसी, दिल्ली, जयपुर"
                />
              </div>
            </div>
          </div>
        )}

        {/* Manglik Toggle & Attributes Ribbon */}
        <div className="pt-2 border-t border-amber-100 dark:border-amber-900/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={profile.isManglik}
              onChange={(e) => updateProfile({ isManglik: e.target.checked })}
              className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500 cursor-pointer"
            />
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              मांगलिक दोष उपस्थित है
            </span>
          </label>

          <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
            <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800">
              गण: <strong className="text-stone-800 dark:text-stone-200">{nakshatra.ganaHindi}</strong>
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800">
              नाड़ी: <strong className="text-stone-800 dark:text-stone-200">{nakshatra.nadiHindi}</strong>
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800">
              योनि: <strong className="text-stone-800 dark:text-stone-200">{nakshatra.yoniHindi}</strong>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="space-y-4">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1">
        <div className="inline-flex p-1 rounded-2xl bg-amber-100/70 dark:bg-stone-800 border border-amber-200/60 dark:border-stone-700">
          <button
            type="button"
            onClick={() => setInputMode('rashi_nakshatra')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              inputMode === 'rashi_nakshatra'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:text-amber-900'
            }`}
          >
            चंद्र राशि व नक्षत्र चयन (त्वरित मिलान)
          </button>
          <button
            type="button"
            onClick={() => setInputMode('birth_details')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              inputMode === 'birth_details'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:text-amber-900'
            }`}
          >
            विस्तृत जन्म विवरण (दिनांक, समय व स्थान)
          </button>
        </div>

        <span className="text-xs text-stone-500 font-medium">
          परिवर्तन करते ही ३६ गुण स्कोर तुरंत री-कैलकुलेट होगा
        </span>
      </div>

      {/* 2 Side-by-Side Dual Profile Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderProfileCard(
          groom.name || 'वर विवरण',
          'groom',
          groom,
          updateGroom,
          groomRashi,
          groomNakshatra
        )}
        {renderProfileCard(
          bride.name || 'कन्या विवरण',
          'bride',
          bride,
          updateBride,
          brideRashi,
          brideNakshatra
        )}
      </div>
    </section>
  );
};
