/**
 * Sanatan Web (सनातन घड़ी)
 * Component: SamvatChandraMasa3DIcon
 * Custom 3D Vector Icon representing:
 * संवत् एवं चांद्र मास (Vedic Samvatsara Wheel & Lunar Month Phases)
 * Vikram Samvat, Shaka Samvat, Purnimanta & Amanta Lunar Cycle.
 * Multi-layer 3D Celestial Silver-Gold Astrolabe with Moon Phases and Era Wheel.
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';

export interface SamvatChandraMasa3DIconProps {
  className?: string;
}

export const SamvatChandraMasa3DIcon: React.FC<SamvatChandraMasa3DIconProps> = ({
  className = 'w-5 h-5 sm:w-5.5 sm:h-5.5',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      aria-label="संवत् एवं चांद्र मास - ३D प्रतीक"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_6px_rgba(49,46,129,0.38)] transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* 3D Celestial Silver-Indigo Bezel Gradient */}
          <linearGradient id="sc-bezel" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#c7d2fe" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="75%" stopColor="#4338ca" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>

          {/* Deep Midnight Blue Enamel Center */}
          <radialGradient id="sc-enamel-bg" cx="50" cy="46" r="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="45%" stopColor="#1e1b4b" />
            <stop offset="80%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Golden Samvat Era Ring */}
          <linearGradient id="sc-gold-ring" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* 3D Pearl-Silver Moon Sphere */}
          <radialGradient id="sc-moon-sphere" cx="42" cy="40" r="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f1f5f9" />
            <stop offset="65%" stopColor="#cbd5e1" />
            <stop offset="90%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>

          {/* 3D Crescent Shadow Overlay */}
          <linearGradient id="sc-crescent-gold" x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* 3D Drop Shadow */}
          <filter id="sc-shadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#1e1b4b" floodOpacity="0.45" />
          </filter>

          {/* Specular Light Reflection */}
          <linearGradient id="sc-glass-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* 1. Base 3D Astrolabe Rim (Outer Beveled Silver-Indigo Ring) */}
        <circle cx="50" cy="50" r="46" fill="url(#sc-bezel)" filter="url(#sc-shadow)" />
        <circle cx="50" cy="50" r="44" stroke="#ffffff" strokeWidth="1" opacity="0.85" />
        <circle cx="50" cy="50" r="41.5" stroke="#1e1b4b" strokeWidth="1.2" opacity="0.9" />

        {/* 2. Inner Midnight Blue Lunar Enamel Disc */}
        <circle cx="50" cy="50" r="40" fill="url(#sc-enamel-bg)" />

        {/* 12-Month / 60-Samvatsara Dial Ticks */}
        <g stroke="#818cf8" strokeWidth="0.8" opacity="0.7">
          <circle cx="50" cy="50" r="38" strokeDasharray="1.5 3" />
          <circle cx="50" cy="50" r="28" strokeDasharray="3 4.5" stroke="#fef08a" strokeWidth="0.6" opacity="0.5" />
        </g>

        {/* 3. Golden Samvatsara Chakra Gear / Sun Dial Wheel */}
        <g stroke="url(#sc-gold-ring)" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
          {/* 8 Cardinal & Ordinal Era Rays */}
          <line x1="50" y1="16" x2="50" y2="22" />
          <line x1="50" y1="78" x2="50" y2="84" />
          <line x1="16" y1="50" x2="22" y2="50" />
          <line x1="78" y1="50" x2="84" y2="50" />
          <line x1="26" y1="26" x2="30.5" y2="30.5" />
          <line x1="69.5" y1="69.5" x2="74" y2="74" />
          <line x1="26" y1="74" x2="30.5" y2="69.5" />
          <line x1="69.5" y1="30.5" x2="74" y2="26" />
        </g>

        {/* 4. चांद्र मास: 3D Radiant Moon Sphere with Lunar Waxing Crescent */}
        {/* Full Moon Base Sphere (पूर्णिमा) */}
        <circle cx="50" cy="50" r="18.5" fill="url(#sc-moon-sphere)" filter="url(#sc-shadow)" />

        {/* 3D Waxing Crescent Overlay (शुक्ल पक्ष कला) */}
        <path
          d="M 50 31.5 C 60 31.5, 68.5 40, 68.5 50 C 68.5 60, 60 68.5, 50 68.5 C 57 63, 60 55, 60 50 C 60 45, 57 37, 50 31.5 Z"
          fill="url(#sc-crescent-gold)"
        />

        {/* Soft Moon Craters (Mare Serenitatis & Crisium) */}
        <circle cx="43" cy="46" r="3.2" fill="#94a3b8" opacity="0.45" />
        <circle cx="47" cy="55" r="2.4" fill="#94a3b8" opacity="0.4" />
        <circle cx="39" cy="53" r="1.8" fill="#94a3b8" opacity="0.35" />

        {/* 5. Center Golden Era Bindu / Axis Pivot */}
        <circle cx="50" cy="50" r="4.5" fill="#1e1b4b" />
        <circle cx="50" cy="50" r="3.6" fill="#fef08a" />
        <circle cx="49" cy="49" r="1.2" fill="#ffffff" />

        {/* 6. Realistic 3D Specular Sheen (Curved Glass Reflection at Top) */}
        <path
          d="M 20 32 C 30 18, 70 18, 80 32 C 68 24, 32 24, 20 32 Z"
          fill="url(#sc-glass-sheen)"
          opacity="0.65"
        />
      </svg>
    </div>
  );
};

export default SamvatChandraMasa3DIcon;
