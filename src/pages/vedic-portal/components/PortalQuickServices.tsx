/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalQuickServices
 * 3 Grand Storytelling Feature Banners + 5 Quick Navigation Pills
 * Light Chandan Cream Theme, Golden Accents & Micro-Elevation
 * Pure Web Standards, Strict < 300 Lines Modular Architecture
 */

import React from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';

interface FeatureBanner {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  tags: string[];
  ctaText: string;
  href: string;
  iconName: 'shubh' | 'kundli' | 'temple';
  themeBorder: string;
  themeGlow: string;
  ctaBg: string;
}

const FEATURE_BANNERS: FeatureBanner[] = [
  {
    id: 'matchmaking',
    title: 'विवाह कुण्डली मिलान',
    badge: '३६ गुण व अष्टकूट',
    subtitle: 'वर-कन्या की जन्म पत्रिकाओं का सम्पूर्ण मिलान',
    description: 'वर्ण, वश्य, तारा, योनि, ग्रहमैत्री, गण, भकूट एवं नाड़ी के ३६ गुणों का सूक्ष्म विश्लेषण, मांगलिक दोष विचार व अचूक परिहार।',
    tags: ['३६ गुण गणना', 'मांगलिक दोष परिहार', 'A4 PDF रिपोर्ट'],
    ctaText: 'गुण मिलान करें',
    href: '/matchmaking',
    iconName: 'shubh',
    themeBorder: 'border-orange-300 hover:border-[#ea580c]',
    themeGlow: 'from-[#fff7ed] via-[#fffbf5] to-[#fed7aa]/30',
    ctaBg: 'bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white hover:brightness-110 shadow-orange-900/20'
  },
  {
    id: 'kundli',
    title: 'विस्तृत जन्म कुण्डली',
    badge: 'D1 से D60 चक्र',
    subtitle: 'जीवन के भूत, वर्तमान व भविष्य का दर्पण',
    description: 'सटीक जन्म विवरण द्वारा लग्न, नवमांश (D9), षोडशवर्ग, षड्बल, अष्टकवर्ग व विंशोत्तरी महादशा-प्रत्यंतर दशा का प्रामाणिक गणित।',
    tags: ['१६ वर्ग चक्र', 'विंशोत्तरी महादशा', 'षड्बल बलवान ग्रह'],
    ctaText: 'कुण्डली देखें',
    href: '/kundli',
    iconName: 'kundli',
    themeBorder: 'border-amber-300 hover:border-[#b8860b]',
    themeGlow: 'from-[#fffbeb] via-[#fffdfa] to-[#fef3c7]/30',
    ctaBg: 'bg-gradient-to-r from-[#b8860b] to-[#92400e] text-white hover:brightness-110 shadow-amber-900/20'
  },
  {
    id: 'muhurat',
    title: 'शुभ संस्कार मुहूर्त',
    badge: '१६ वैदिक संस्कार',
    subtitle: 'मंगल कार्यों हेतु शास्त्रसम्मत शुद्ध लग्न',
    description: 'विवाह, गृह प्रवेश, नवीन वाहन क्रय, नामकरण, मुण्डन, भूमि पूजन व व्यापार आरम्भ हेतु त्रिबल शुद्धि एवं दोष रहित श्रेष्ठ मुहूर्त।',
    tags: ['विवाह व गृह प्रवेश', 'त्रिबल शुद्धि लग्न', 'सर्वार्थ सिद्धि'],
    ctaText: 'मुहूर्त खोजें',
    href: '/muhurat',
    iconName: 'temple',
    themeBorder: 'border-emerald-300 hover:border-emerald-600',
    themeGlow: 'from-[#f0fdf4] via-[#fafdfb] to-[#dcfce7]/30',
    ctaBg: 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white hover:brightness-110 shadow-emerald-900/20'
  }
];

interface QuickPillItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  href: string;
  badge: string;
}

const QUICK_PILLS: QuickPillItem[] = [
  {
    id: 'choghadiya',
    title: 'चौघड़िया व २४ होरा',
    subtitle: 'दिन-रात के १६ चौघड़िया व ग्रह काल',
    icon: 'schedule',
    href: '/choghadiya',
    badge: 'लाइव'
  },
  {
    id: 'utilities',
    title: 'साढ़ेसाती, रत्न व वास्तु',
    subtitle: 'शनि की साढ़ेसाती व भाग्यशाली रत्न',
    icon: 'diamond',
    href: '/utilities',
    badge: 'वैदिक टूल्स'
  },
  {
    id: 'calendar',
    title: 'व्रत व त्योहार कैलेंडर',
    subtitle: 'वर्ष २०२६ के १००+ पर्व व एकादशी',
    icon: 'calendar_month',
    href: '/calendar',
    badge: '१००+ पर्व'
  },
  {
    id: 'download-panchang',
    title: 'दैनिक पंचांग PDF पत्रक',
    subtitle: '१-क्लिक में आज का A4 पंचांग प्रिंट करें',
    icon: 'picture_as_pdf',
    href: '/download-panchang',
    badge: 'A4 प्रिंट'
  },
  {
    id: 'cities',
    title: '५,०००+ नगर व तीर्थ',
    subtitle: 'विश्व भर के नगरों हेतु स्थानीय समय',
    icon: 'location_on',
    href: '/cities',
    badge: 'स्थानीय'
  }
];

export const PortalQuickServices: React.FC = () => {
  return (
    <section className="glass-panel rounded-3xl p-5 sm:p-7 space-y-6 font-serif relative overflow-hidden" id="quick-services">
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
              विवाह ३६ गुण मिलान, विस्तृत जन्म कुण्डली, शुभ संस्कार मुहूर्त एवं त्वरित वैदिक टूल्स
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

      {/* 3 Grand Storytelling Feature Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
        {FEATURE_BANNERS.map((banner) => (
          <div
            key={banner.id}
            className={`group relative p-5 sm:p-6 rounded-3xl bg-gradient-to-br ${banner.themeGlow} border ${banner.themeBorder} shadow-sm hover:shadow-[0_16px_36px_-6px_rgba(77,51,34,0.18)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden`}
          >
            <div className="space-y-3.5">
              {/* Top Row: Icon + Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#dec9ab]/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <VedicIcon3D name={banner.iconName} size="md" />
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-white/90 text-[#735641] font-bold border border-[#dec9ab] shadow-2xs">
                  {banner.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#26150b] group-hover:text-[#c2410c] transition-colors">
                  {banner.title}
                </h3>
                <p className="text-xs font-semibold text-[#b8860b] mt-0.5">
                  {banner.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5c3e2b] leading-relaxed">
                {banner.description}
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {banner.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10.5px] px-2 py-0.5 rounded-md bg-white/80 border border-[#dec9ab]/60 text-[#735641] font-medium"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 mt-4 border-t border-[#dec9ab]/40">
              <Link
                href={banner.href}
                className={`w-full py-2.5 px-4 rounded-xl ${banner.ctaBg} font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all duration-200 no-underline`}
              >
                <span>{banner.ctaText}</span>
                <span className="text-sm font-bold group-hover:translate-x-1 transition-transform">➔</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 5 Quick Navigation Pills Row */}
      <div className="relative z-10 pt-2 border-t border-[#dec9ab]/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#735641] uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ea580c] text-[16px]">apps</span>
            त्वरित वैदिक टूल्स एवं पंचांग पत्रक
          </span>
          <span className="text-[11px] text-[#b8860b]">सीधे १-क्लिक में खोलें</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {QUICK_PILLS.map((pill) => (
            <Link
              key={pill.id}
              href={pill.href}
              className="group p-2.5 sm:p-3 rounded-2xl bg-white/85 hover:bg-white border border-[#dec9ab]/70 hover:border-[#ea580c] shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 no-underline"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="material-symbols-outlined text-[#ea580c] text-[18px] group-hover:scale-110 transition-transform">
                  {pill.icon}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#fbf6ec] text-[#735641] font-bold border border-[#dec9ab]/70">
                  {pill.badge}
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#26150b] group-hover:text-[#c2410c] transition-colors truncate">
                  {pill.title}
                </div>
                <div className="text-[10px] text-[#735641] truncate mt-0.5">
                  {pill.subtitle}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortalQuickServices;
