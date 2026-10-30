/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalVedicToolsStrip
 * समस्त वैदिक टूल्स एवं कालगणना साधन (Vedic Utilities & Tools Quick Strip)
 * Pure Web Standards, Strict < 300 Lines Modular Architecture
 */

import React from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';

interface ToolStripItem {
  name: string;
  badge: string;
  subtitle: string;
  href: string;
  icon: string;
  tagColor: string;
}

const TOOLS_STRIP_ITEMS: ToolStripItem[] = [
  {
    name: 'शनि साढ़े साती',
    badge: 'ढैया व उपाय',
    subtitle: 'चरण, प्रभाव व निवारण',
    href: '/utilities',
    icon: '🪐',
    tagColor: 'bg-indigo-50 text-indigo-800 border-indigo-200'
  },
  {
    name: 'रत्न व रुद्राक्ष',
    badge: 'परामर्श',
    subtitle: 'राशि अनुसार शुभ रत्न',
    href: '/utilities',
    icon: '💎',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  {
    name: '३६ गुण मिलान',
    badge: 'विवाह निर्णय',
    subtitle: 'अष्टकूट व मांगलिक दोष',
    href: '/matchmaking',
    icon: '💍',
    tagColor: 'bg-rose-50 text-rose-800 border-rose-200'
  },
  {
    name: 'वैदिक वास्तु',
    badge: 'दिक् साधन',
    subtitle: '८ दिशा ऊर्जा चक्र',
    href: '/utilities',
    icon: '🧭',
    tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  {
    name: 'समय परिवर्तक',
    badge: 'कालगणना',
    subtitle: 'घटी-पल से घंटे-मिनट',
    href: '/utilities',
    icon: '⏳',
    tagColor: 'bg-orange-50 text-orange-800 border-orange-200'
  },
  {
    name: 'पंचांग PDF',
    badge: 'A4 प्रिंट',
    subtitle: 'दैनिक पंचांग सेव करें',
    href: '/download-panchang',
    icon: '🖨️',
    tagColor: 'bg-sky-50 text-sky-800 border-sky-200'
  },
  {
    name: 'नगर एटलस',
    badge: '५०००+ कस्बे',
    subtitle: 'अक्षांश-देशांतर व DST',
    href: '/cities',
    icon: '🗺️',
    tagColor: 'bg-teal-50 text-teal-800 border-teal-200'
  },
  {
    name: 'अयनांश सेटिंग्स',
    badge: 'सिस्टम',
    subtitle: 'लाहिड़ी, केपी व चक्र शैली',
    href: '/settings',
    icon: '⚙️',
    tagColor: 'bg-purple-50 text-purple-800 border-purple-200'
  }
];

export const PortalVedicToolsStrip: React.FC = () => {
  return (
    <section className="glass-panel rounded-3xl p-5 sm:p-7 space-y-5 font-serif relative overflow-hidden" id="vedic-tools-strip">
      <SacredGeometryWatermark variant="shree-yantra" className="opacity-[0.05]" />
      <GoldenCornerBrackets size="lg" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/70 pb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300 shadow-xs flex items-center justify-center shrink-0">
            <VedicIcon3D name="shubh-ashubh" size="md" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#26150b]">
                समस्त टूल्स एवं कालगणना साधन
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold shadow-xs shrink-0">
                ८ विशेष साधन
              </span>
            </div>
            <p className="text-xs text-[#735641]">
              शनि साढ़े साती, रत्न परामर्श, ३६ गुण मिलान, वास्तु कम्पास, अयनांश एवं पंचांग PDF
            </p>
          </div>
        </div>

        <Link
          href="/utilities"
          className="text-xs font-bold text-[#ea580c] hover:underline flex items-center gap-1 no-underline shrink-0"
        >
          <span>सम्पूर्ण टूल्स हब खोलें</span>
          <span>➔</span>
        </Link>
      </div>

      {/* 8-Item Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
        {TOOLS_STRIP_ITEMS.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="group p-3 sm:p-3.5 rounded-2xl bg-white/95 hover:bg-white border border-amber-200 hover:border-orange-400 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-2 text-left no-underline hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full border font-bold ${item.tagColor}`}>
                {item.badge}
              </span>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#26150b] group-hover:text-[#ea580c] transition-colors leading-tight">
                {item.name}
              </h4>
              <p className="text-[10px] text-[#735641] mt-0.5 leading-snug line-clamp-1">
                {item.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PortalVedicToolsStrip;
