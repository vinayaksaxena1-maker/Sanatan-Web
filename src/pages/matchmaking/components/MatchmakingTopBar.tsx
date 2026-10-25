/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MatchmakingTopBar
 * Heritage Scrim, Breadcrumb, Authority Ribbon & A4 Certificate Action Trigger
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { Link } from '../../../routes/AppRoutes';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { Sparkles, Printer, RotateCcw } from 'lucide-react';

interface MatchmakingTopBarProps {
  onOpenCertificate: () => void;
  onLoadPreset: (type: 'ideal' | 'average' | 'challenging') => void;
}

export const MatchmakingTopBar: React.FC<MatchmakingTopBarProps> = ({
  onOpenCertificate,
  onLoadPreset,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#fffdfa] via-[#fdf7ee] to-[#fbf2e3] border border-[#dec9ab]/70 shadow-[0_8px_30px_rgb(180,120,40,0.06)]">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.06]" />

      <div className="relative z-10 space-y-5">
        {/* Breadcrumb & Authority Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#735641]">
          <div className="flex items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-[#c2410c] transition-colors flex items-center gap-1 no-underline">
              <span>मुख्य पृष्ठ</span>
            </Link>
            <span>/</span>
            <span className="text-[#c2410c] font-bold">कुण्डली मिलान</span>
            <span>/</span>
            <span className="text-[#26150b] font-semibold">३६ गुण अष्टकूट विश्लेषण</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-950 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>बृहत्पाराशर होराशास्त्र अनुमोदित • ३६ गुण अष्टकूट गणित</span>
          </div>
        </div>

        {/* Title & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-1">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider uppercase font-serif">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>।। श्री लक्ष्मीनारायणाय नमः ।।</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#26150b] tracking-tight leading-tight">
              अष्टकूट ३६ गुण कुण्डली मिलान एवं विवाह निर्णय
            </h1>
            <p className="text-xs sm:text-sm text-[#735641] leading-relaxed">
              वर एवं कन्या के जन्म विवरण अथवा चंद्र राशि-नक्षत्र के आधार पर अष्टकूट (वर्ण, वश्य, तारा, योनि, ग्रहमैत्री, गण, भकूट, नाड़ी), दोष परिहार व मांगलिक सामंजस्य का संपूर्ण शास्त्रीय विश्लेषण।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Quick Preset Selector */}
            <button
              type="button"
              onClick={() => onLoadPreset('ideal')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/90 hover:bg-amber-100/70 text-amber-900 text-xs font-semibold border border-amber-300/70 shadow-xs cursor-pointer transition-all active:scale-95"
              title="३०+ गुण वाला आदर्श युगल लोड करें"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>आदर्श युगल (३२ गुण)</span>
            </button>

            {/* A4 Certificate Button */}
            <button
              type="button"
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold text-xs shadow-md shadow-amber-900/20 cursor-pointer transition-all active:scale-95"
            >
              <VedicIcon3D name="kalash" size={18} />
              <span>विवाह प्रमाण पत्र (A4 Certificate)</span>
              <Printer className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
