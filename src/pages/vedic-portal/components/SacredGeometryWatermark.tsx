import React from 'react';

export type WatermarkPattern = 'swastik' | 'mandala' | 'kalash' | 'yantra';

export interface SacredGeometryWatermarkProps {
  className?: string;
  variant?: WatermarkPattern;
}

export const SacredGeometryWatermark: React.FC<SacredGeometryWatermarkProps> = ({
  className = 'opacity-[0.07]',
  variant = 'swastik',
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {variant === 'swastik' ? (
        /* ================= प्रामाणिक वैदिक स्वास्तिक (Bold Vedic Swastika) ================= */
        <svg
          className="w-full h-full max-w-[440px] max-h-[440px] text-[#b8860b] stroke-current fill-none"
          viewBox="0 0 400 400"
        >
          {/* Outer Auspicious Framing Circle & Halo */}
          <circle cx="200" cy="200" r="175" strokeWidth="2" strokeDasharray="6 4" opacity="0.65" />
          <circle cx="200" cy="200" r="162" strokeWidth="1" opacity="0.4" />

          {/* Left Auspicious Riddhi-Siddhi Double Flank Bars (मांगलिक रेखाएं) */}
          <line x1="50" y1="85" x2="50" y2="315" strokeWidth="6" strokeLinecap="round" />
          <line x1="64" y1="105" x2="64" y2="295" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 3" opacity="0.8" />

          {/* Right Auspicious Shubh-Labh Double Flank Bars (मांगलिक रेखाएं) */}
          <line x1="350" y1="85" x2="350" y2="315" strokeWidth="6" strokeLinecap="round" />
          <line x1="336" y1="105" x2="336" y2="295" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 3" opacity="0.8" />

          {/* Core Bold Vedic Swastika Geometry (स्ट्रोक विड्थ १२ - शुद्ध वैदिक शैली) */}
          <g strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
            {/* Main Vertical Spine (ऊर्ध्व रेखा) */}
            <line x1="200" y1="95" x2="200" y2="305" />
            {/* Main Horizontal Arm (तिर्यक रेखा) */}
            <line x1="95" y1="200" x2="305" y2="200" />

            {/* 4 Auspicious Vedic Branches (चार मांगलिक भुजाएं) */}
            {/* 1. Top-Right Arm */}
            <line x1="200" y1="95" x2="280" y2="95" />
            {/* 2. Bottom-Left Arm */}
            <line x1="200" y1="305" x2="120" y2="305" />
            {/* 3. Top-Left Arm */}
            <line x1="95" y1="200" x2="95" y2="120" />
            {/* 4. Bottom-Right Arm */}
            <line x1="305" y1="200" x2="305" y2="280" />
          </g>

          {/* Inner Accent Line for 3D Inset Engraved Look */}
          <g strokeWidth="2.5" stroke="#fef08a" strokeLinecap="round" opacity="0.75">
            <line x1="200" y1="98" x2="200" y2="302" />
            <line x1="98" y1="200" x2="302" y2="200" />
            <line x1="200" y1="98" x2="277" y2="98" />
            <line x1="200" y1="302" x2="123" y2="302" />
            <line x1="98" y1="200" x2="98" y2="123" />
            <line x1="302" y1="200" x2="302" y2="277" />
          </g>

          {/* 4 Sacred Auspicious Bindus (धर्म, अर्थ, काम, मोक्ष - चतुर्बिन्दु) */}
          <g fill="currentColor">
            {/* Top-Left Quadrant */}
            <circle cx="150" cy="150" r="9" />
            <circle cx="150" cy="150" r="3.5" fill="#fef08a" />

            {/* Top-Right Quadrant */}
            <circle cx="250" cy="150" r="9" />
            <circle cx="250" cy="150" r="3.5" fill="#fef08a" />

            {/* Bottom-Left Quadrant */}
            <circle cx="150" cy="250" r="9" />
            <circle cx="150" cy="250" r="3.5" fill="#fef08a" />

            {/* Bottom-Right Quadrant */}
            <circle cx="250" cy="250" r="9" />
            <circle cx="250" cy="250" r="3.5" fill="#fef08a" />
          </g>

          {/* Center Auspicious Bindu */}
          <circle cx="200" cy="200" r="5" fill="#fef08a" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ) : variant === 'kalash' ? (
        /* ================= पारंपरिक मंगल कलश ================= */
        <svg
          className="w-full h-full max-w-[460px] max-h-[460px] text-[#b8860b] stroke-current fill-none stroke-[1.6]"
          viewBox="0 0 400 400"
        >
          <circle cx="200" cy="200" r="185" strokeWidth="1.2" strokeDasharray="3 3" />
          <rect x="135" y="335" width="130" height="12" rx="3" strokeWidth="1.8" />
          <path d="M 148 335 L 160 315 L 240 315 L 252 335 Z" strokeWidth="1.6" />
          <path
            d="M 160 195 C 110 220 100 285 155 315 L 245 315 C 300 285 290 220 240 195 Z"
            strokeWidth="2.2"
          />
          <g strokeWidth="2" strokeLinecap="round">
            <line x1="200" y1="235" x2="200" y2="285" />
            <line x1="175" y1="260" x2="225" y2="260" />
            <line x1="200" y1="235" x2="220" y2="235" />
            <line x1="225" y1="260" x2="225" y2="280" />
            <line x1="200" y1="285" x2="180" y2="285" />
            <line x1="175" y1="260" x2="175" y2="240" />
            <circle cx="188" cy="248" r="2.2" fill="currentColor" />
            <circle cx="212" cy="248" r="2.2" fill="currentColor" />
            <circle cx="188" cy="272" r="2.2" fill="currentColor" />
            <circle cx="212" cy="272" r="2.2" fill="currentColor" />
          </g>
          <path d="M 165 195 L 160 170 L 240 170 L 235 195 Z" strokeWidth="1.8" />
          <ellipse cx="200" cy="170" rx="44" ry="7" strokeWidth="2" />
          <path d="M 200 165 Q 186 110 200 70 Q 214 110 200 165 Z" strokeWidth="1.8" />
          <path d="M 185 165 Q 155 125 150 95 Q 180 120 192 165 Z" strokeWidth="1.6" />
          <path d="M 215 165 Q 245 125 250 95 Q 220 120 208 165 Z" strokeWidth="1.6" />
          <ellipse cx="200" cy="130" rx="30" ry="38" strokeWidth="2" />
        </svg>
      ) : (
        /* ================= पारंपरिक मण्डला ================= */
        <svg
          className="w-full h-full max-w-[480px] max-h-[480px] text-[#b8860b] stroke-current fill-none stroke-[1.6]"
          viewBox="0 0 400 400"
        >
          <circle cx="200" cy="200" r="185" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="168" strokeWidth="1.5" />
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={`mid16-${i}`}
              d="M 200 76 C 218 95 218 115 200 134 C 182 115 182 95 200 76 Z"
              transform={`rotate(${i * 22.5} 200 200)`}
              strokeWidth="1.4"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={`inner8-${i}`} transform={`rotate(${i * 45} 200 200)`}>
              <path
                d="M 200 120 C 220 138 220 162 200 180 C 180 162 180 138 200 120 Z"
                strokeWidth="1.6"
              />
            </g>
          ))}
          <circle cx="200" cy="200" r="6" fill="currentColor" />
        </svg>
      )}
    </div>
  );
};
