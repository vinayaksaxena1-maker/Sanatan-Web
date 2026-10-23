import React from 'react';

interface CosmicConstellationBackdropProps {
  className?: string;
}

export const CosmicConstellationBackdrop: React.FC<CosmicConstellationBackdropProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Deep Cosmic Foundation Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#070A11] via-[#0B0F19] to-[#171007]" />

      {/* 2. Golden Astrological Radial Light Glows */}
      <div
        className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.6) 0%, rgba(180, 83, 9, 0.2) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[5%] w-[450px] h-[450px] rounded-full opacity-15 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.5) 0%, rgba(146, 64, 14, 0.15) 50%, transparent 80%)',
        }}
      />

      {/* 3. Sacred Geometry & Constellation Celestial SVG Canvas */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="sacredCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#B45309" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="goldBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Concentric Celestial Coordinate Circles (Surya Chakra Geometry) */}
        <g stroke="#D4AF37" strokeWidth="0.75" opacity="0.3" fill="none">
          <circle cx="1080" cy="450" r="180" strokeDasharray="3 5" />
          <circle cx="1080" cy="450" r="260" strokeDasharray="6 8" />
          <circle cx="1080" cy="450" r="340" strokeOpacity="0.15" />
          <circle cx="1080" cy="450" r="420" strokeDasharray="2 10" strokeOpacity="0.12" />

          {/* Meridian & Diagonal Axis Lines */}
          <line x1="1080" y1="50" x2="1080" y2="850" strokeOpacity="0.1" />
          <line x1="680" y1="450" x2="1480" y2="450" strokeOpacity="0.1" />
          <line x1="797" y1="167" x2="1363" y2="733" strokeOpacity="0.08" strokeDasharray="4 6" />
          <line x1="797" y1="733" x2="1363" y2="167" strokeOpacity="0.08" strokeDasharray="4 6" />
        </g>

        {/* Left Side Subtle Nakshatra Constellation Lines */}
        <g stroke="#F59E0B" strokeWidth="1" opacity="0.25" fill="none">
          {/* Orion / Mrigashira Constellation Geometry */}
          <polyline points="120,240 180,210 240,230 260,310 210,340 140,300 120,240" />
          <line x1="180" y1="210" x2="210" y2="340" strokeDasharray="2 4" />
          <line x1="240" y1="230" x2="140" y2="300" strokeDasharray="2 4" />

          {/* Pleiades / Krittika Star Cluster */}
          <polyline points="320,160 360,140 400,150 430,170 390,190 350,180" />

          {/* Great Bear / Saptarishi subtle geometry */}
          <polyline points="460,380 520,360 580,390 640,430 720,410 740,470 660,490 640,430" />
        </g>

        {/* Constellation Star Nodes */}
        <g fill="#FEF3C7">
          <circle cx="120" cy="240" r="2.2" opacity="0.8" />
          <circle cx="180" cy="210" r="3.2" opacity="0.9" />
          <circle cx="240" cy="230" r="2.5" opacity="0.85" />
          <circle cx="260" cy="310" r="2.2" opacity="0.8" />
          <circle cx="210" cy="340" r="3" opacity="0.95" />
          <circle cx="140" cy="300" r="2" opacity="0.75" />

          <circle cx="320" cy="160" r="2" opacity="0.8" />
          <circle cx="360" cy="140" r="2.5" opacity="0.9" />
          <circle cx="400" cy="150" r="2.2" opacity="0.85" />
          <circle cx="430" cy="170" r="2" opacity="0.7" />

          <circle cx="460" cy="380" r="2.5" opacity="0.85" />
          <circle cx="520" cy="360" r="2.5" opacity="0.85" />
          <circle cx="580" cy="390" r="3" opacity="0.9" />
          <circle cx="640" cy="430" r="3" opacity="0.9" />
          <circle cx="720" cy="410" r="2.5" opacity="0.85" />
          <circle cx="740" cy="470" r="2.8" opacity="0.85" />
          <circle cx="660" cy="490" r="2.5" opacity="0.85" />

          {/* Random Ambient Star Dust Points */}
          <circle cx="250" cy="120" r="1.5" opacity="0.6" />
          <circle cx="580" cy="180" r="1.2" opacity="0.5" />
          <circle cx="820" cy="280" r="1.5" opacity="0.6" />
          <circle cx="950" cy="130" r="1.8" opacity="0.7" />
          <circle cx="1320" cy="240" r="1.4" opacity="0.5" />
          <circle cx="1200" cy="620" r="1.5" opacity="0.6" />
          <circle cx="340" cy="680" r="1.3" opacity="0.5" />
          <circle cx="180" cy="540" r="1.7" opacity="0.6" />
        </g>
      </svg>

      {/* 4. Fine Atmospheric Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070A11] via-transparent to-black/30" />
    </div>
  );
};

export default CosmicConstellationBackdrop;
