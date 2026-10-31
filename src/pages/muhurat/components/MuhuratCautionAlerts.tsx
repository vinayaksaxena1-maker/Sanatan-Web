/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MuhuratCautionAlerts
 * 4 Vedic Caution & Inauspicious Alert Cards (Panchak, Bhadra, Kharmas, Rahu Kaal)
 * Standardized Sacred Vedic Container with Golden Brackets & Watermark
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseMuhuratDataResult } from '../hooks/useMuhuratData';

export interface MuhuratCautionAlertsProps {
  data: UseMuhuratDataResult;
}

export const MuhuratCautionAlerts: React.FC<MuhuratCautionAlertsProps> = ({ data }) => {
  const { cautionAlerts } = data;

  return (
    <section className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#fffcf7] via-[#fdfaf3] to-[#fbf4e8] border border-amber-300/80 shadow-xs font-serif space-y-4">
      {/* Ornate Vedic Golden Corner Brackets */}
      <GoldenCornerBrackets size="lg" />

      {/* Vedic Background Swastika Watermark */}
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dec9ab]/60 pb-3">
        <div className="flex items-center gap-2.5">
          <VedicIcon3D name="ashubh" size="sm" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#26150b]">
              २. सावधानी एवं वर्जित काल निर्देशिका (वर्तमान वेला स्थिति)
            </h3>
            <p className="text-xs text-[#735641]">
              राहुकाल, भद्रा, पंचक एवं खरमास आदि त्याज्य कालों की स्थिति एवं शास्त्रोक्त परिहार
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-rose-800 bg-rose-100 border border-rose-300 px-3 py-1 rounded-full self-start sm:self-auto">
          अति महत्वपूर्ण निर्देश
        </span>
      </div>

      {/* 4 Inauspicious / Caution Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5 pt-1">
        {cautionAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border shadow-2xs flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
              alert.id === 'rahukaal'
                ? 'border-rose-300 bg-rose-50/30 hover:border-rose-400'
                : 'border-[#dec9ab]/80 bg-white/90 hover:border-amber-400'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-[#26150b] flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${alert.isWarning ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}
                  />
                  {alert.title}
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${alert.statusBadgeColor}`}
                >
                  {alert.statusBadge}
                </span>
              </div>

              <p className="text-xs text-[#735641] leading-relaxed">
                {alert.description}
              </p>
            </div>

            <div className="pt-2 mt-2 border-t border-[#dec9ab]/40">
              <span
                className={`text-[11px] block ${
                  alert.isWarning
                    ? 'text-amber-900 font-semibold'
                    : 'text-emerald-900 font-semibold'
                }`}
              >
                {alert.remedy}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MuhuratCautionAlerts;
