/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratSanskarTable
 * High-Density Responsive Table for All 16 Vedic Ceremonies (Shodash Sanskars)
 * Standardized Sacred Vedic Container with Golden Brackets & Watermark
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseMuhuratDataResult } from '../hooks/useMuhuratData';

export interface MuhuratSanskarTableProps {
  data: UseMuhuratDataResult;
}

export const MuhuratSanskarTable: React.FC<MuhuratSanskarTableProps> = ({ data }) => {
  const { ceremonyRows } = data;

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs font-serif space-y-4">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      {/* Table Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dec9ab]/60 pb-3">
        <div className="flex items-center gap-2.5">
          <VedicIcon3D name="temple" size="sm" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#26150b]">
              ४. षोडश संस्कार एवं प्रमुख कार्यों की आगामी मुहूर्त तालिका
            </h3>
            <p className="text-xs text-[#735641]">
              नामकरण, मुंडन, विद्यारंभ, उपनयन, व्यापार व भूमि पूजन के शास्त्रसम्मत निकटतम लग्न
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-50 border border-[#dec9ab] hover:border-amber-400 rounded-xl text-xs font-bold text-[#26150b] transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <span>🖨️</span>
          <span>संस्कार सारणी प्रिंट करें</span>
        </button>
      </div>

      {/* Responsive Table Container */}
      <div className="relative z-10 w-full overflow-x-auto rounded-xl border border-amber-200/90 shadow-xs bg-white/95 backdrop-blur-md">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="bg-[#fff9eb] border-b border-amber-200/80 text-[#735641] text-xs font-bold uppercase tracking-wider">
              <th className="py-3 px-4">संस्कार / कार्य</th>
              <th className="py-3 px-4">आगामी निकटतम तिथि</th>
              <th className="py-3 px-4">शुभ नक्षत्र व वार</th>
              <th className="py-3 px-4">प्रशस्त लग्न</th>
              <th className="py-3 px-4">विशेष सावधानी / वर्जना</th>
              <th className="py-3 px-4 text-center">स्थिति</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100/80 text-xs text-[#26150b]">
            {ceremonyRows.map((row) => (
              <tr key={row.id} className="hover:bg-amber-50/60 transition-colors">
                <td className="py-3 px-4 font-bold text-[#26150b]">
                  <div>
                    <span>{row.ceremony}</span>
                    <span className="block text-[11px] text-[#8c7166] font-normal">
                      {row.subType}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-[#26150b]">
                  {row.date}
                  <span className="block text-[11px] text-[#c2410c]">{row.tithi}</span>
                </td>
                <td className="py-3 px-4 font-medium text-[#735641]">
                  {row.nakshatraWar}
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-[#26150b] block">{row.lagna}</span>
                  <span className="text-[11px] text-emerald-800 font-medium">{row.lagnaType}</span>
                </td>
                <td className="py-3 px-4 text-[11px] text-[#5a3822] max-w-xs">
                  {row.caution}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${row.statusColor}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MuhuratSanskarTable;
