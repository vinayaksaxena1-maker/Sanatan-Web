/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratSanskarTable
 * High-Density Responsive Table for All 16 Vedic Ceremonies (Shodash Sanskars)
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseMuhuratDataResult } from '../hooks/useMuhuratData';

export interface MuhuratSanskarTableProps {
  data: UseMuhuratDataResult;
}

export const MuhuratSanskarTable: React.FC<MuhuratSanskarTableProps> = ({ data }) => {
  const { ceremonyRows } = data;

  return (
    <section className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-[0_8px_30px_rgb(180,120,40,0.05)] space-y-5">
      {/* Table Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#c2410c] uppercase tracking-wider mb-1">
            <VedicIcon3D name="temple" size={16} />
            <span>षोडश संस्कार पंचांग तालिका</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#26150b]">
            अन्य प्रमुख संस्कारों एवं कार्यों के आगामी निकटतम मुहूर्त
          </h3>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-50 border border-[#dec9ab] rounded-xl text-xs font-bold text-[#26150b] transition-all shadow-2xs cursor-pointer w-fit"
        >
          <VedicIcon3D name="clock" size={16} />
          <span>समस्त संस्कार सारणी प्रिंट करें</span>
        </button>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto -mx-2 px-2 no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-amber-100/60 text-[#26150b] text-xs font-bold">
              <th className="py-3 px-4 rounded-l-xl">संस्कार / कार्य</th>
              <th className="py-3 px-4">आगामी निकटतम तिथि</th>
              <th className="py-3 px-4">शुभ नक्षत्र व वार</th>
              <th className="py-3 px-4">प्रशस्त लग्न</th>
              <th className="py-3 px-4">विशेष सावधानी / वर्जना</th>
              <th className="py-3 px-4 text-center rounded-r-xl">स्थिति</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-900/10 text-xs text-[#735641]">
            {ceremonyRows.map((row) => (
              <tr key={row.id} className="hover:bg-amber-50/50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#26150b]">
                  <div>
                    <span>{row.ceremony}</span>
                    <span className="block text-[11px] text-[#8c7166] font-normal">
                      {row.subType}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-[#26150b]">
                  {row.date}
                  <span className="block text-[11px] text-[#c2410c]">{row.tithi}</span>
                </td>
                <td className="py-3.5 px-4">
                  {row.nakshatraWar}
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-[#26150b] block">{row.lagna}</span>
                  <span className="text-[11px] text-emerald-800">{row.lagnaType}</span>
                </td>
                <td className="py-3.5 px-4 text-[11px]">
                  {row.caution}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${row.statusColor}`}>
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
