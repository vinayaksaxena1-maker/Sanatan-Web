import React from 'react';

export type WatermarkPattern = 'mandala' | 'kalash' | 'yantra';

export interface SacredGeometryWatermarkProps {
  className?: string;
  variant?: WatermarkPattern;
}

export const SacredGeometryWatermark: React.FC<SacredGeometryWatermarkProps> = ({
  className = 'opacity-20',
  variant = 'mandala',
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {variant === 'kalash' ? (
        /* ================= पारंपरिक मंगल कलश (Purna Mangal Kalash) ================= */
        <svg
          className="w-full h-full max-w-[460px] max-h-[460px] text-[#b8860b] stroke-current fill-none stroke-[1.6]"
          viewBox="0 0 400 400"
        >
          {/* Sacred Radiant Aura / Prabhamandala around Kalash */}
          <circle cx="200" cy="200" r="185" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="172" strokeWidth="1" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={`aura-${i}`}
              x1="200"
              y1="20"
              x2="200"
              y2="34"
              strokeWidth="1.4"
              transform={`rotate(${i * 15} 200 200)`}
            />
          ))}

          {/* Pedestal / Vedika (पीठिका) */}
          <rect x="135" y="335" width="130" height="12" rx="3" strokeWidth="1.8" />
          <path d="M 148 335 L 160 315 L 240 315 L 252 335 Z" strokeWidth="1.6" />
          <line x1="160" y1="325" x2="240" y2="325" strokeWidth="1" strokeDasharray="2 2" />

          {/* Main Kumbha Belly (घट / कुम्भ उदर) */}
          <path
            d="M 160 195 C 110 220 100 285 155 315 L 245 315 C 300 285 290 220 240 195 Z"
            strokeWidth="2.2"
          />
          {/* Belly Contour Bands */}
          <path d="M 125 255 Q 200 280 275 255" strokeWidth="1.2" strokeDasharray="4 2" />
          <path d="M 135 285 Q 200 305 265 285" strokeWidth="1" />

          {/* Auspicious Vedic Swastika on Belly with 4 Bindus */}
          <g strokeWidth="2" strokeLinecap="round">
            {/* Center Cross */}
            <line x1="200" y1="235" x2="200" y2="285" />
            <line x1="175" y1="260" x2="225" y2="260" />
            {/* 4 Auspicious Arms */}
            <line x1="200" y1="235" x2="220" y2="235" />
            <line x1="225" y1="260" x2="225" y2="280" />
            <line x1="200" y1="285" x2="180" y2="285" />
            <line x1="175" y1="260" x2="175" y2="240" />
            {/* 4 Sacred Bindus */}
            <circle cx="188" cy="248" r="2.2" fill="currentColor" />
            <circle cx="212" cy="248" r="2.2" fill="currentColor" />
            <circle cx="188" cy="272" r="2.2" fill="currentColor" />
            <circle cx="212" cy="272" r="2.2" fill="currentColor" />
          </g>

          {/* Neck of Kalash (गल) with Sacred Kalava Thread Rings */}
          <path d="M 165 195 L 160 170 L 240 170 L 235 195 Z" strokeWidth="1.8" />
          <line x1="162" y1="178" x2="238" y2="178" strokeWidth="1.4" />
          <line x1="164" y1="186" x2="236" y2="186" strokeWidth="1.4" />
          {/* Rim Flange */}
          <ellipse cx="200" cy="170" rx="44" ry="7" strokeWidth="2" />

          {/* 5 Sacred Mango Leaves (पञ्च आम्रपल्लव) */}
          {/* Center Leaf */}
          <path d="M 200 165 Q 186 110 200 70 Q 214 110 200 165 Z" strokeWidth="1.8" />
          <line x1="200" y1="165" x2="200" y2="75" strokeWidth="1" strokeDasharray="3 2" />
          {/* Inner Left Leaf */}
          <path d="M 185 165 Q 155 125 150 95 Q 180 120 192 165 Z" strokeWidth="1.6" />
          {/* Outer Left Leaf */}
          <path d="M 170 167 Q 125 140 110 125 Q 145 155 178 167 Z" strokeWidth="1.6" />
          {/* Inner Right Leaf */}
          <path d="M 215 165 Q 245 125 250 95 Q 220 120 208 165 Z" strokeWidth="1.6" />
          {/* Outer Right Leaf */}
          <path d="M 230 167 Q 275 140 290 125 Q 255 155 222 167 Z" strokeWidth="1.6" />

          {/* Sacred Coconut (श्रीफल) with Sacred Tilak & Fibers */}
          <ellipse cx="200" cy="130" rx="30" ry="38" strokeWidth="2" />
          <path d="M 175 110 Q 200 65 225 110" strokeWidth="1.8" />
          <circle cx="200" cy="120" r="3" fill="currentColor" />
          <line x1="192" y1="120" x2="208" y2="120" strokeWidth="1.5" />
          <line x1="194" y1="124" x2="206" y2="124" strokeWidth="1.2" />
        </svg>
      ) : variant === 'mandala' ? (
        /* ================= पारंपरिक वैदिक मण्डला (Traditional Vedic Temple Mandala) ================= */
        <svg
          className="w-full h-full max-w-[480px] max-h-[480px] text-[#b8860b] stroke-current fill-none stroke-[1.6]"
          viewBox="0 0 400 400"
        >
          {/* Outer Muktavali (Beaded Ring) */}
          <circle cx="200" cy="200" r="185" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="176" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="168" strokeWidth="1.5" />

          {/* 24-Outer Lotus Petals (चतुर्विंशति दल पद्म) */}
          {Array.from({ length: 24 }).map((_, i) => (
            <path
              key={`outer24-${i}`}
              d="M 200 32 Q 209 50 200 68 Q 191 50 200 32 Z"
              transform={`rotate(${i * 15} 200 200)`}
              strokeWidth="1.2"
            />
          ))}

          {/* Concentric Geometric Ring */}
          <circle cx="200" cy="200" r="132" strokeWidth="1.6" />
          <circle cx="200" cy="200" r="124" strokeWidth="1" strokeDasharray="4 2" />

          {/* 16-Middle Lotus Petals (षोडश दल कमल) */}
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={`mid16-${i}`}
              d="M 200 76 C 218 95 218 115 200 134 C 182 115 182 95 200 76 Z"
              transform={`rotate(${i * 22.5} 200 200)`}
              strokeWidth="1.4"
            />
          ))}

          {/* Decorative Floral Ring */}
          <circle cx="200" cy="200" r="88" strokeWidth="1.6" />
          <circle cx="200" cy="200" r="80" strokeWidth="1" />

          {/* 8-Inner Blooming Lotus Petals (अष्टदल पद्म) */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={`inner8-${i}`} transform={`rotate(${i * 45} 200 200)`}>
              <path
                d="M 200 120 C 220 138 220 162 200 180 C 180 162 180 138 200 120 Z"
                strokeWidth="1.6"
              />
              <line x1="200" y1="125" x2="200" y2="175" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          ))}

          {/* Inner Core Floral Bindu */}
          <circle cx="200" cy="200" r="32" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="22" strokeWidth="1" strokeDasharray="2 2" />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={`dot-${i}`}
              cx="200"
              cy="178"
              r="2"
              fill="currentColor"
              transform={`rotate(${i * 45} 200 200)`}
            />
          ))}
          <circle cx="200" cy="200" r="6" fill="currentColor" />
        </svg>
      ) : (
        /* ================= श्री यंत्र (Sacred Sri Yantra) ================= */
        <svg
          className="w-full h-full max-w-[480px] max-h-[480px] text-[#b8860b] stroke-current fill-none stroke-[1.8]"
          viewBox="0 0 400 400"
        >
          {/* Outer Square Bhupura Gates */}
          <rect x="25" y="25" width="350" height="350" strokeWidth="2.2" />
          <rect x="42" y="42" width="316" height="316" strokeWidth="1.2" strokeDasharray="4 2" />
          <circle cx="200" cy="200" r="148" strokeWidth="1.8" />
          <circle cx="200" cy="200" r="136" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="124" strokeWidth="1.2" />
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={`petal16-${i}`}
              d="M 200 75 Q 214 95 200 115 Q 186 95 200 75 Z"
              transform={`rotate(${i * 22.5} 200 200)`}
              strokeWidth="1.4"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={`petal8-${i}`}
              d="M 200 95 Q 218 112 200 130 Q 182 112 200 95 Z"
              transform={`rotate(${i * 45} 200 200)`}
              strokeWidth="1.4"
            />
          ))}
          <polygon points="200,80 100,255 300,255" strokeWidth="2" />
          <polygon points="200,102 120,240 280,240" strokeWidth="1.6" />
          <polygon points="200,122 136,230 264,230" strokeWidth="1.5" />
          <polygon points="200,138 152,220 248,220" strokeWidth="1.3" />
          <polygon points="200,320 100,145 300,145" strokeWidth="2" />
          <polygon points="200,298 116,160 284,160" strokeWidth="1.6" />
          <polygon points="200,278 132,170 268,170" strokeWidth="1.5" />
          <polygon points="200,258 145,180 255,180" strokeWidth="1.3" />
          <polygon points="200,238 158,190 242,190" strokeWidth="1.1" />
          <circle cx="200" cy="200" r="5" fill="currentColor" />
        </svg>
      )}
    </div>
  );
};
