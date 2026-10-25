/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Component: PlanetaryTableSection
 * Ephemeris Longitudes Table with Graha, Sign, Degrees, Pada, Motion & Dignity
 */

import React from 'react';
import { Table, AlertCircle, Compass } from 'lucide-react';
import { CompleteHoroscopeResult } from '../../../engine/facade/horoscopeFacade';
import { PLANET_NAMES_HINDI, RASHI_NAMES_HINDI } from '../hooks/kundliTypes';

interface PlanetaryTableSectionProps {
  horoscope: CompleteHoroscopeResult | null;
}

const JAIMINI_KARAKAS = ['AK', 'AmK', 'BK', 'MK', 'PK', 'GK', 'DK'];

export const PlanetaryTableSection: React.FC<PlanetaryTableSectionProps> = ({ horoscope }) => {
  if (!horoscope) return null;

  const asc = horoscope.ascendant;
  const planets = horoscope.planets || [];

  return (
    <section className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
            ग्रह स्पष्ट एवं स्थिति सारणी (Planetary Longitudes)
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>(R) = वक्री (Retrograde)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>* = अस्त (Combust)</span>
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full bg-white dark:bg-stone-900 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-amber-100/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold border-b border-amber-200/80 dark:border-amber-900/40">
                <th className="py-3 px-4">ग्रह (Planet)</th>
                <th className="py-3 px-3">राशि (Sign)</th>
                <th className="py-3 px-4">स्पष्ट अंश (Degrees)</th>
                <th className="py-3 px-3">नक्षत्र (पद)</th>
                <th className="py-3 px-3">नक्षत्राधिपति</th>
                <th className="py-3 px-3">गति (Motion)</th>
                <th className="py-3 px-3">भाव (House)</th>
                <th className="py-3 px-4">जैमिनी कारक</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/60 dark:divide-stone-800 text-stone-800 dark:text-stone-200">
              {/* Ascendant Row */}
              <tr className="bg-amber-50/40 dark:bg-amber-950/20 font-semibold">
                <td className="py-3 px-4 text-amber-800 dark:text-amber-400 flex items-center gap-1.5 font-bold">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>लग्न (Ascendant)</span>
                </td>
                <td className="py-3 px-3">{asc.sign} ({RASHI_NAMES_HINDI[asc.signIndex] || ''})</td>
                <td className="py-3 px-4 font-mono font-bold text-amber-800 dark:text-amber-400">{asc.formatted}</td>
                <td className="py-3 px-3">{asc.nakshatra} ({asc.pada})</td>
                <td className="py-3 px-3 text-stone-500">केतु</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold">
                    उदय
                  </span>
                </td>
                <td className="py-3 px-3 font-mono font-bold">प्रथम (१)</td>
                <td className="py-3 px-4 text-stone-500">तनु लग्न</td>
              </tr>

              {/* 9 Planetary Rows */}
              {planets.map((p, idx) => {
                const karaka = JAIMINI_KARAKAS[idx] || '—';
                const isRetro = p.isRetrograde;
                const isComb = p.isCombust;
                const planetHindi = PLANET_NAMES_HINDI[p.name] || p.name;
                const signHindi = RASHI_NAMES_HINDI[p.signIndex] || p.signName;

                return (
                  <tr
                    key={p.name}
                    className="hover:bg-amber-50/50 dark:hover:bg-stone-850/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span>{planetHindi}</span>
                    </td>
                    <td className="py-3 px-3">{p.signName} ({signHindi})</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-800 dark:text-amber-400">
                      {p.degreeFormatted}
                    </td>
                    <td className="py-3 px-3">{p.nakshatraName} ({p.nakshatraPada})</td>
                    <td className="py-3 px-3 text-stone-500 dark:text-stone-400">{p.nakshatraLord || '—'}</td>
                    <td className="py-3 px-3">
                      {isRetro ? (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300 font-bold">
                          वक्री (R)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold">
                          मार्गी
                        </span>
                      )}
                      {isComb && (
                        <span className="ml-1 text-[11px] text-amber-600 font-bold">*अस्त</span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-stone-700 dark:text-stone-300">
                      {p.rashiHouse} भाव
                    </td>
                    <td className="py-3 px-4 font-semibold text-amber-700 dark:text-amber-400">
                      {karaka}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
