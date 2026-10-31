/**
 * Sanatan Web (सनातन घड़ी)
 * Component: Panchang5Angas3DIcon
 * Custom 3D Vector Icon representing the 5 Sacred Angas of Vedic Panchang:
 * 1. तिथि (Tithi) • 2. वार (Vaar) • 3. नक्षत्र (Nakshatra) • 4. योग (Yoga) • 5. करण (Karana)
 * High-definition 3D celestial medallion with specular lighting, beveled gold, and Pancha-Ratna jewels.
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';

export interface Panchang5Angas3DIconProps {
  className?: string;
  size?: number | string;
}

export const Panchang5Angas3DIcon: React.FC<Panchang5Angas3DIconProps> = ({
  className = 'w-7 h-7 sm:w-8 sm:h-8',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      aria-label="पंचांग के ५ मुख्य अंग - ३D प्रतीक"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_6px_rgba(180,83,9,0.4)] transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* 3D Gold Bevel Gradient for Outer Medallion */}
          <linearGradient id="p5-gold-bezel" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff8db" />
            <stop offset="25%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Deep Velvet Saffron Enamel Center */}
          <radialGradient id="p5-enamel-bg" cx="50" cy="48" r="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="45%" stopColor="#c2410c" />
            <stop offset="80%" stopColor="#9a3412" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>

          {/* 3D Golden Star & Petals Gradient */}
          <linearGradient id="p5-petal-gold" x1="50" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Facet Light Highlight */}
          <linearGradient id="p5-facet-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0.2" />
          </linearGradient>

          {/* Central 3D Boss Dome */}
          <radialGradient id="p5-center-dome" cx="47" cy="46" r="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#fef08a" />
            <stop offset="55%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>

          {/* 3D Drop Shadow */}
          <filter id="p5-3d-shadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#451a03" floodOpacity="0.45" />
          </filter>

          {/* 3D Jewel Shading */}
          <radialGradient id="p5-jewel-ruby" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fecdd3" />
            <stop offset="40%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>
        </defs>

        {/* 1. Base 3D Medallion Rim (Outer Gold Ring) */}
        <circle cx="50" cy="50" r="46" fill="url(#p5-gold-bezel)" filter="url(#p5-3d-shadow)" />
        <circle cx="50" cy="50" r="44" stroke="#fef08a" strokeWidth="1" opacity="0.8" />
        <circle cx="50" cy="50" r="41.5" stroke="#78350f" strokeWidth="1.2" opacity="0.9" />

        {/* 2. Inner Imperial Saffron Velvet Disc */}
        <circle cx="50" cy="50" r="40" fill="url(#p5-enamel-bg)" />

        {/* Concentric Astronomical Alignment Rings */}
        <circle cx="50" cy="50" r="38" stroke="#fdba74" strokeWidth="0.6" strokeDasharray="1.5 2" opacity="0.45" />
        <circle cx="50" cy="50" r="28" stroke="#fef08a" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.5" />

        {/* 3. 5 Sacred Anga Petals / Faceted Star (Tithi, Vaar, Nakshatra, Yoga, Karana) */}
        {/* Five points: 0° (-90° from positive X), 72°, 144°, 216°, 288° */}
        <g id="p5-five-angas-star">
          {/* Anga 1: Tithi (Top - 12 o'clock) */}
          <path d="M 50 14 L 56 36 L 50 50 Z" fill="url(#p5-petal-gold)" />
          <path d="M 50 14 L 44 36 L 50 50 Z" fill="#b45309" />
          <path d="M 50 14 L 50 50" stroke="#fef08a" strokeWidth="0.8" />

          {/* Anga 2: Vaar (Top Right - 72°) */}
          <path d="M 84.2 38.9 L 63.8 45.5 L 50 50 Z" fill="url(#p5-petal-gold)" />
          <path d="M 84.2 38.9 L 60.1 34.2 L 50 50 Z" fill="#b45309" />
          <path d="M 84.2 38.9 L 50 50" stroke="#fef08a" strokeWidth="0.8" />

          {/* Anga 3: Nakshatra (Bottom Right - 144°) */}
          <path d="M 71.1 79.1 L 58.5 62.9 L 50 50 Z" fill="url(#p5-petal-gold)" />
          <path d="M 71.1 79.1 L 68.2 52.8 L 50 50 Z" fill="#b45309" />
          <path d="M 71.1 79.1 L 50 50" stroke="#fef08a" strokeWidth="0.8" />

          {/* Anga 4: Yoga (Bottom Left - 216°) */}
          <path d="M 28.9 79.1 L 31.8 52.8 L 50 50 Z" fill="url(#p5-petal-gold)" />
          <path d="M 28.9 79.1 L 41.5 62.9 L 50 50 Z" fill="#b45309" />
          <path d="M 28.9 79.1 L 50 50" stroke="#fef08a" strokeWidth="0.8" />

          {/* Anga 5: Karana (Top Left - 288°) */}
          <path d="M 15.8 38.9 L 39.9 34.2 L 50 50 Z" fill="url(#p5-petal-gold)" />
          <path d="M 15.8 38.9 L 36.2 45.5 L 50 50 Z" fill="#b45309" />
          <path d="M 15.8 38.9 L 50 50" stroke="#fef08a" strokeWidth="0.8" />
        </g>

        {/* 4. Pancha-Ratna (5 Auspicious Jewels at each Anga vertex) */}
        {/* Jewel 1: Tithi (Top) */}
        <circle cx="50" cy="14" r="3.2" fill="url(#p5-jewel-ruby)" stroke="#fef08a" strokeWidth="0.6" />
        <circle cx="49" cy="13" r="0.9" fill="#ffffff" opacity="0.9" />

        {/* Jewel 2: Vaar (Top-Right) */}
        <circle cx="84.2" cy="38.9" r="3.2" fill="url(#p5-jewel-ruby)" stroke="#fef08a" strokeWidth="0.6" />
        <circle cx="83.2" cy="37.9" r="0.9" fill="#ffffff" opacity="0.9" />

        {/* Jewel 3: Nakshatra (Bottom-Right) */}
        <circle cx="71.1" cy="79.1" r="3.2" fill="url(#p5-jewel-ruby)" stroke="#fef08a" strokeWidth="0.6" />
        <circle cx="70.1" cy="78.1" r="0.9" fill="#ffffff" opacity="0.9" />

        {/* Jewel 4: Yoga (Bottom-Left) */}
        <circle cx="28.9" cy="79.1" r="3.2" fill="url(#p5-jewel-ruby)" stroke="#fef08a" strokeWidth="0.6" />
        <circle cx="27.9" cy="78.1" r="0.9" fill="#ffffff" opacity="0.9" />

        {/* Jewel 5: Karana (Top-Left) */}
        <circle cx="15.8" cy="38.9" r="3.2" fill="url(#p5-jewel-ruby)" stroke="#fef08a" strokeWidth="0.6" />
        <circle cx="14.8" cy="37.9" r="0.9" fill="#ffffff" opacity="0.9" />

        {/* 5. Central Raised 3D Boss / Sun-Kalachakra Emblem */}
        <circle cx="50" cy="50" r="16.5" fill="url(#p5-center-dome)" filter="url(#p5-3d-shadow)" />
        <circle cx="50" cy="50" r="16" stroke="#fff8db" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="14" stroke="#78350f" strokeWidth="0.6" strokeDasharray="1.5 1.5" />

        {/* Sacred Vedic Kalachakra 12-Ray Solar Wheel inside Central Boss */}
        <g stroke="#9a3412" strokeWidth="1" strokeLinecap="round" opacity="0.85">
          <line x1="50" y1="38" x2="50" y2="41" />
          <line x1="50" y1="59" x2="50" y2="62" />
          <line x1="38" y1="50" x2="41" y2="50" />
          <line x1="59" y1="50" x2="62" y2="50" />
          <line x1="41.5" y1="41.5" x2="43.6" y2="43.6" />
          <line x1="56.4" y1="56.4" x2="58.5" y2="58.5" />
          <line x1="41.5" y1="58.5" x2="43.6" y2="56.4" />
          <line x1="56.4" y1="43.6" x2="58.5" y2="41.5" />
        </g>

        {/* Central 3D Sacred Golden Bindu */}
        <circle cx="50" cy="50" r="4.2" fill="#78350f" />
        <circle cx="50" cy="50" r="3.6" fill="#fef08a" />
        <circle cx="49" cy="49" r="1.2" fill="#ffffff" />

        {/* 6. Realistic 3D Specular Sheen (Curved Glass Reflection at Top) */}
        <path
          d="M 20 32 C 30 18, 70 18, 80 32 C 68 24, 32 24, 20 32 Z"
          fill="url(#p5-facet-light)"
          opacity="0.65"
        />
      </svg>
    </div>
  );
};

export default Panchang5Angas3DIcon;
