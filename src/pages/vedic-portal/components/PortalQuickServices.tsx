/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalQuickServices
 * 8-Card Bento Grid for Instant 1-Click Access to All Major Vedic Hubs
 * Light Chandan Cream Theme, Golden Accents & Micro-Elevation
 * Pure Web Standards, Strict < 300 Lines Modular Architecture
 */

import React from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';

interface QuickServiceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconName: 'shubh' | 'temple' | 'kundli' | 'clock' | 'upay' | 'tithi' | 'sun' | 'moon';
  href: string;
  accentColor: string;
  bgGlow: string;
}

const QUICK_SERVICES: QuickServiceItem[] = [
  {
    id: 'matchmaking',
    title: 'विवाह कुण्डली मिलान',
    subtitle: '३६ गुण, अष्टकूट एवं मांगलिक दोष परिहार + PDF',
    badge: '३६ गुण मिलान',
    iconName: 'shubh',
    href: '/matchmaking',
    accentColor: '#c2410c',
    bgGlow: 'from-[#fff7ed] to-[#ffedd5]'
  },
  {
    id: 'muhurat',
    title: 'शुभ मुहूर्त एवं १६ संस्कार',
    subtitle: 'विवाह, गृहप्रवेश, वाहन खरीद व नामकरण मुहूर्त',
    badge: '१६ संस्कार',
    iconName: 'temple',
    href: '/muhurat',
    accentColor: '#b8860b',
    bgGlow: 'from-[#fffbeb] to-[#fef3c7]'
  },
  {
    id: 'kundli',
    title: 'विस्तृत जन्म कुण्डली',
    subtitle: 'लग्न से D60, षड्बल, अष्टकवर्ग व विंशोत्तरी दशा',
    badge: 'D1 से D60 चक्र',
    iconName: 'kundli',
    href: '/kundli',
    accentColor: '#7c2d12',
    bgGlow: 'from-[#fff7ed] to-[#fef2f2]'
  },
  {
    id: 'choghadiya',
    title: 'चौघड़िया एवं २४ होरा',
    subtitle: 'दिन-रात की १६ चौघड़िया और २४ घंटे के ग्रह होरा',
    badge: 'लाइव कालचक्र',
    iconName: 'clock',
    href: '/choghadiya',
    accentColor: '#d97706',
    bgGlow: 'from-[#fffdf0] to-[#fef9c3]'
  },
  {
    id: 'utilities',
    title: 'साढ़ेसाती, रत्न व वास्तु',
    subtitle: 'शनि साढ़ेसाती जांच, भाग्यशाली रत्न व वास्तु कम्पास',
    badge: 'वैदिक टूल्स',
    iconName: 'upay',
    href: '/utilities',
    accentColor: '#047857',
    bgGlow: 'from-[#f0fdf4] to-[#dcfce7]'
  },
  {
    id: 'calendar',
    title: 'व्रत व त्योहार कैलेंडर',
    subtitle: 'वर्ष २०२६ के १००+ पर्व, समस्त एकादशी व पारण',
    badge: '१००+ व्रत-पर्व',
    iconName: 'tithi',
    href: '/calendar',
    accentColor: '#4338ca',
    bgGlow: 'from-[#eef2ff] to-[#e0e7ff]'
  },
  {
    id: 'download-panchang',
    title: 'दैनिक पंचांग PDF पत्रक',
    subtitle: '१ क्लिक में आज का संपूर्ण राजसी पंचांग A4 प्रिंट करें',
    badge: 'A4 प्रिंट योग्य',
    iconName: 'sun',
    href: '/download-panchang',
    accentColor: '#9a3412',
    bgGlow: 'from-[#fff5f5] to-[#fed7aa]'
  },
  {
    id: 'cities',
    title: '५,०००+ नगर व तीर्थ',
    subtitle: 'अपने नगर/तीर्थ अनुसार स्थानीय सटीक पंचांग सेट करें',
    badge: 'स्थानीय समय',
    iconName: 'moon',
    href: '/cities',
    accentColor: '#0f766e',
    bgGlow: 'from-[#f0fdfa] to-[#ccfbf1]'
  }
];

export const PortalQuickServices: React.FC = () => {
  return (
    <section className="glass-panel rounded-3xl p-5 sm:p-7 space-y-5 font-serif relative overflow-hidden" id="quick-services">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.05]" />
      <GoldenCornerBrackets size="lg" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/70 pb-3 relative z-10">
        <div className="flex items-center gap-3">
          <VedicIcon3D name="temple" size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#26150b]">प्रमुख वैदिक सेवाएँ एवं टूल्स</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#dec9ab]/30 text-[#735641] text-[10px] font-bold border border-[#dec9ab] shadow-xs">
                १-क्लिक एक्सेस
              </span>
            </div>
            <p className="text-xs text-[#735641]">
              विवाह मिलान, संस्कार मुहूर्त, कुण्डली, चौघड़िया एवं पंचांग पत्रक की सीधी सेवाएँ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#b8860b] flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            संपूर्ण वैदिक सेवाएँ (१८ पृष्ठ)
          </span>
        </div>
      </div>

      {/* 8-Card Bento Grid - Full Width & Grand Visual Presence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10">
        {QUICK_SERVICES.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group relative p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#dec9ab]/70 hover:border-[#ea580c] shadow-xs hover:shadow-[0_14px_30px_-6px_rgba(212,175,55,0.32)] transition-all duration-300 flex flex-col justify-between min-h-[155px] hover:-translate-y-1.5 no-underline overflow-hidden"
          >
            {/* Ambient Background Gradient on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10`} />

            {/* Top Row: Icon + Badge */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="w-11 h-11 rounded-xl bg-[#fffdf8] shadow-xs border border-[#dec9ab]/60 flex items-center justify-center group-hover:scale-110 group-hover:border-[#ea580c]/50 transition-all duration-300">
                <VedicIcon3D name={item.iconName} size="md" />
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#fbf6ec] text-[#735641] font-bold border border-[#dec9ab]/80 group-hover:border-[#ea580c]/50 group-hover:text-[#c2410c] transition-colors shadow-2xs">
                {item.badge}
              </span>
            </div>

            {/* Middle: Title & Subtitle */}
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-[17px] font-bold text-[#26150b] group-hover:text-[#c2410c] transition-colors flex items-center justify-between">
                <span>{item.title}</span>
                <span className="text-sm text-[#dec9ab] group-hover:text-[#ea580c] group-hover:translate-x-1 transition-all duration-300">
                  ➔
                </span>
              </h3>
              <p className="text-xs text-[#735641] leading-relaxed line-clamp-2">
                {item.subtitle}
              </p>
            </div>

            {/* Bottom Accent Line */}
            <div className="w-full pt-2.5 mt-2.5 border-t border-[#dec9ab]/40 flex items-center justify-between text-[11px] text-[#b8860b] font-semibold">
              <span className="group-hover:text-[#ea580c] transition-colors">प्रवेश करें</span>
              <span className="material-symbols-outlined text-[14px] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                open_in_new
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PortalQuickServices;
