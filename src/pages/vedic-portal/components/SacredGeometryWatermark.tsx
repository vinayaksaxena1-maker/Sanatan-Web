import React from 'react';

export interface SacredGeometryWatermarkProps {
  className?: string;
  variant?: 'yantra' | 'chakra';
}

export const SacredGeometryWatermark: React.FC<SacredGeometryWatermarkProps> = ({
  className = 'opacity-20',
  variant = 'yantra'
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full max-w-[480px] max-h-[480px] text-[#b8860b] stroke-current fill-none stroke-[1.8]"
        viewBox="0 0 400 400"
      >
        {/* Outer Square Bhupura Gates */}
        <rect x="25" y="25" width="350" height="350" strokeWidth="2" />
        <rect x="42" y="42" width="316" height="316" strokeWidth="1" strokeDasharray="4 2" />

        {/* Concentric Mekhala Circles */}
        <circle cx="200" cy="200" r="148" strokeWidth="1.6" />
        <circle cx="200" cy="200" r="136" strokeWidth="1" />
        <circle cx="200" cy="200" r="124" strokeWidth="1" />

        {/* 16 Petals Ring (Shodasha Dala Padma) */}
        {Array.from({ length: 16 }).map((_, i) => (
          <path
            key={`petal16-${i}`}
            d="M 200 75 Q 214 95 200 115 Q 186 95 200 75 Z"
            transform={`rotate(${i * 22.5} 200 200)`}
            strokeWidth="1.2"
          />
        ))}

        {/* 8 Petals Ring (Ashta Dala Padma) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`petal8-${i}`}
            d="M 200 95 Q 218 112 200 130 Q 182 112 200 95 Z"
            transform={`rotate(${i * 45} 200 200)`}
            strokeWidth="1.2"
          />
        ))}

        {variant === 'yantra' && (
          <>
            {/* 4 Shiva Triangles (Pointing Up) */}
            <polygon points="200,80 100,255 300,255" strokeWidth="1.8" />
            <polygon points="200,102 120,240 280,240" strokeWidth="1.5" />
            <polygon points="200,122 136,230 264,230" strokeWidth="1.4" />
            <polygon points="200,138 152,220 248,220" strokeWidth="1.2" />

            {/* 5 Shakti Triangles (Pointing Down) */}
            <polygon points="200,320 100,145 300,145" strokeWidth="1.8" />
            <polygon points="200,298 116,160 284,160" strokeWidth="1.5" />
            <polygon points="200,278 132,170 268,170" strokeWidth="1.4" />
            <polygon points="200,258 145,180 255,180" strokeWidth="1.2" />
            <polygon points="200,238 158,190 242,190" strokeWidth="1" />

            {/* Central Bindu (Center Point) */}
            <circle cx="200" cy="200" r="4.5" fill="currentColor" />
          </>
        )}
      </svg>
    </div>
  );
};
