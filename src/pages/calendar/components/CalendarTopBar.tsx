/**
 * Sanatan Web (सनातन घड़ी)
 * Component: CalendarTopBar
 * Breadcrumb, Authority Badge, Header Banner & A4 Wall Calendar Trigger
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { Link } from '../../../routes/AppRoutes';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UseCalendarDataResult } from '../hooks/useCalendarData';
import { toDevanagariNumerals } from '../hooks/useCalendarData';

export interface CalendarTopBarProps {
  data: UseCalendarDataResult;
  onOpenA4Modal: () => void;
  onOpenCityModal: () => void;
}

export const CalendarTopBar: React.FC<CalendarTopBarProps> = ({
  data,
  onOpenA4Modal,
  onOpenCityModal,
}) => {
  const { currentCity, currentYear, monthNameHindi, vedicMasaName } = data;

  return (
    <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#fffdfa] via-[#fdf7ee] to-[#fbf2e3] border border-[#dec9ab]/70 shadow-[0_8px_30px_rgb(180,120,40,0.06)]">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      <div className="relative z-10 space-y-5">
        {/* Breadcrumb & Authority Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#735641]">
          <div className="flex items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-[#c2410c] transition-colors flex items-center gap-1 no-underline font-medium">
              <span>मुख्य पृष्ठ</span>
            </Link>
            <span>/</span>
            <span className="text-[#c2410c] font-bold">व्रत एवं त्योहार कैलेंडर</span>
            <span>/</span>
            <span className="text-[#26150b] font-semibold">{monthNameHindi} {toDevanagariNumerals(currentYear)}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-950 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            <span>निर्णयसिंधु व धर्मसिंधु शास्त्रोक्त अनुमोदित • संवत २०८१</span>
          </div>
        </div>

        {/* Title & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-1 text-[#c2410c] font-serif text-sm font-semibold">
              <span>॥</span>
              <span>पर्व-निर्णय एवं काल गणना पीठ</span>
              <span>॥</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#26150b] tracking-tight">
              सनातन व्रत, पर्व एवं हिन्दू त्योहार कैलेंडर
            </h1>
            <p className="text-xs sm:text-sm text-[#735641] leading-relaxed">
              काशी पंचांग परंपरा अनुसार संपूर्ण वर्ष के वैदिक व्रत, एकादशी सूक्ष्म पारण काल, प्रदोष वेला, पूर्णिमा-अमावस्या एवं सनातन पर्वों का धर्मशास्त्रीय प्रामाणिक निर्णय।
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenCityModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/90 hover:bg-white border border-[#dec9ab] text-xs font-semibold text-[#26150b] shadow-2xs transition-all cursor-pointer"
            >
              <VedicIcon3D name="temple" size={16} />
              <span>{currentCity.nameHindi || currentCity.name}</span>
            </button>

            <button
              type="button"
              onClick={onOpenA4Modal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-600/30 text-[#26150b] text-xs font-bold shadow-xs hover:border-amber-500 transition-all cursor-pointer"
            >
              <VedicIcon3D name="clock" size={16} />
              <span>वार्षिक A4 वॉल कैलेंडर</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-bold shadow-md shadow-orange-950/20 transition-all cursor-pointer"
            >
              <VedicIcon3D name="shubh" size={16} />
              <span>मुद्रण / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarTopBar;
