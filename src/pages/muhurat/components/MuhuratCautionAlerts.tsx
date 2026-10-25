/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratCautionAlerts
 * 4 Vedic Caution & Inauspicious Alert Cards (Panchak, Bhadra, Kharmas, Rahu Kaal)
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseMuhuratDataResult } from '../hooks/useMuhuratData';

export interface MuhuratCautionAlertsProps {
  data: UseMuhuratDataResult;
}

export const MuhuratCautionAlerts: React.FC<MuhuratCautionAlertsProps> = ({ data }) => {
  const { cautionAlerts } = data;

  return (
    <section className="bg-gradient-to-br from-[#fff7ed] via-[#fef3c7]/30 to-[#fffbeb] rounded-3xl p-5 sm:p-6 border border-amber-900/10 shadow-[0_4px_20px_rgb(180,120,40,0.04)] space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-900/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
            <VedicIcon3D name="ashubh" size={18} />
          </div>
          <h3 className="text-base sm:text-lg font-bold font-serif text-[#26150b]">
            सावधानी एवं वर्जित काल निर्देशिका (वर्तमान वेला स्थिति)
          </h3>
        </div>

        <span className="text-[11px] font-bold text-red-800 bg-red-100 border border-red-300 px-2.5 py-0.5 rounded-full">
          अति महत्वपूर्ण
        </span>
      </div>

      {/* 4 Inauspicious / Caution Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {cautionAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-2xl bg-white/90 border shadow-2xs flex flex-col justify-between transition-all duration-200 hover:border-amber-400 ${
              alert.id === 'rahukaal'
                ? 'border-red-200 bg-red-50/20'
                : 'border-[#dec9ab]/70'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-[#26150b] flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${alert.isWarning ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                  {alert.title}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${alert.statusBadgeColor}`}>
                  {alert.statusBadge}
                </span>
              </div>

              <p className="text-xs text-[#735641] leading-relaxed">
                {alert.description}
              </p>
            </div>

            <span className={`text-[11px] font-medium pt-2 mt-2 border-t border-amber-900/5 ${
              alert.isWarning ? 'text-amber-800 font-semibold' : 'text-emerald-800 font-semibold'
            }`}>
              {alert.remedy}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MuhuratCautionAlerts;
