import React from 'react';

export interface SacredGeometryWatermarkProps {
  className?: string;
  variant?: 'yantra' | 'chakra';
}

export const SacredGeometryWatermark: React.FC<SacredGeometryWatermarkProps> = ({
  className = '',
  variant = 'yantra'
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full max-w-[440px] max-h-[440px] text-[#b8860b] opacity-[0.038] stroke-current fill-none stroke-[1.2]"
        viewBox="0 0 400 400"
      >
        {/* Outer Square Bhupura Gates */}
        <rect x="30" y="30" width="340" height="340" strokeWidth="1.5" />
        <rect x="45" y="45" width="310" height="310" strokeWidth="0.8" />

        {/* Concentric Mekhala Circles */}
        <circle cx="200" cy="200" r="145" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="135" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="125" strokeWidth="0.8" />

        {/* 16 Petals Ring */}
        {Array.from({ length: 16 }).map((_, i) => (
          <path
            key={`petal16-${i}`}
            d="M 200 75 Q 212 95 200 115 Q 188 95 200 75 Z"
            transform={`rotate(${i * 22.5} 200 200)`}
          />
        ))}

        {/* 8 Petals Ring */}
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`petal8-${i}`}
            d="M 200 95 Q 216 112 200 130 Q 184 112 200 95 Z"
            transform={`rotate(${i * 45} 200 200)`}
          />
        ))}

        {variant === 'yantra' && (
          <>
            {/* 4 Shiva Triangles (Pointing Up) */}
            <polygon points="200,85 105,250 295,250" />
            <polygon points="200,105 125,235 275,235" />
            <polygon points="200,125 140,225 260,225" />
            <polygon points="200,140 155,215 245,215" />

            {/* 5 Shakti Triangles (Pointing Down) */}
            <polygon points="200,315 105,150 295,150" />
            <polygon points="200,295 120,165 280,165" />
            <polygon points="200,275 135,175 265,175" />
            <polygon points="200,255 148,185 252,185" />
            <polygon points="200,235 160,195 240,195" />

            {/* Central Bindu */}
            <circle cx="200" cy="200" r="3.5" fill="currentColor" />
          </>
        )}
      </svg>
    </div>
  );
};
