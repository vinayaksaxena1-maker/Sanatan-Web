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
      <style>{`
        @keyframes celestialSpinCw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes celestialSpinCcw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes cosmicFloat3D {
          0%, 100% {
            transform: perspective(1000px) rotateX(4deg) rotateY(-3deg) translateY(0px);
          }
          50% {
            transform: perspective(1000px) rotateX(6deg) rotateY(-1deg) translateY(-8px);
          }
        }
        @keyframes starTwinkleSlow {
          0%, 100% { opacity: 0.65; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.28); }
        }
        @keyframes starTwinkleFast {
          0%, 100% { opacity: 0.5; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.35); }
        }
        @keyframes dhruvaHaloGlow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.9)); }
          50% { transform: scale(1.35) rotate(45deg); opacity: 1; filter: drop-shadow(0 0 20px rgba(251, 191, 36, 1)); }
        }

        .animate-spin-cw {
          transform-origin: 0px 0px;
          animation: celestialSpinCw 120s linear infinite;
        }
        .animate-spin-ccw {
          transform-origin: 0px 0px;
          animation: celestialSpinCcw 80s linear infinite;
        }
        .animate-cosmic-plane {
          transform-style: preserve-3d;
          animation: cosmicFloat3D 16s ease-in-out infinite;
        }
        .twinkle-1 {
          transform-origin: center;
          animation: starTwinkleSlow 4s ease-in-out infinite;
        }
        .twinkle-2 {
          transform-origin: center;
          animation: starTwinkleFast 2.8s ease-in-out infinite 0.7s;
        }
        .twinkle-3 {
          transform-origin: center;
          animation: starTwinkleSlow 5.2s ease-in-out infinite 1.8s;
        }
        .twinkle-dhruva-desktop {
          transform-origin: 930px 50px;
          animation: dhruvaHaloGlow 3.5s ease-in-out infinite;
        }
        .twinkle-dhruva-mobile {
          transform-origin: 720px 60px;
          animation: dhruvaHaloGlow 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Deep Cosmic Foundation Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#05070D] via-[#090D18] to-[#140D05]" />

      {/* 2. Radiant Golden & Amber Celestial Nebula Clouds */}
      <div
        className="absolute top-[-5%] right-[5%] w-[700px] h-[700px] rounded-full opacity-35 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.65) 0%, rgba(217, 119, 6, 0.35) 45%, transparent 75%)',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[2%] w-[650px] h-[650px] rounded-full opacity-30 blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.55) 0%, rgba(180, 83, 9, 0.3) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full opacity-20 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, transparent 70%)',
        }}
      />

      {/* 3. 3D Constellation & Sacred Geometry Canvas Container */}
      <div className="absolute inset-0 animate-cosmic-plane">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Luminous Gold Glow Filter for Constellation Lines */}
            <filter id="goldLineGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Intense Starburst Halo Filter */}
            <filter id="starHalo" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4.5" result="blur1" />
              <feGaussianBlur stdDeviation="1.8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Surya Center Yantra Glow */}
            <radialGradient id="suryaCenterAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#D97706" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#090D18" stopOpacity="0" />
            </radialGradient>

            {/* Betelgeuse (आर्द्रा सीमा) Supergiant Glow */}
            <radialGradient id="betelgeuseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF7ED" stopOpacity="1" />
              <stop offset="25%" stopColor="#F97316" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#EA580C" stopOpacity="0.45" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Rigel Diamond Brilliance */}
            <radialGradient id="rigelGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="35%" stopColor="#67E8F9" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#0284C7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Dhruva Golden Starlight */}
            <radialGradient id="dhruvaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="25%" stopColor="#FDE047" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* =============================================================== */}
          {/* DESKTOP LAYOUT (sm:block) - Panoramic Widescreen Constellations  */}
          {/* =============================================================== */}
          <g className="hidden sm:inline">
            
            {/* 1. SURYA CHAKRA (सूर्य चक्र) - Centered Behind the Watch Cockpit */}
            <g transform="translate(1110, 550)">
              <circle cx="0" cy="0" r="180" fill="url(#suryaCenterAura)" />

              {/* Outer Ring 1: Clockwise Rotating Sacred Coordinate Wheel (120s) */}
              <g className="animate-spin-cw">
                <circle cx="0" cy="0" r="160" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.5" fill="none" />
                <circle cx="0" cy="0" r="250" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.6" fill="none" />
                <circle cx="0" cy="0" r="340" stroke="#FBBF24" strokeWidth="1.8" opacity="0.65" fill="none" filter="url(#goldLineGlow)" />
                <circle cx="0" cy="0" r="420" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 10" opacity="0.5" fill="none" />
                <circle cx="0" cy="0" r="490" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 14" opacity="0.4" fill="none" />

                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const x1 = Math.cos(rad) * 160;
                  const y1 = Math.sin(rad) * 160;
                  const x2 = Math.cos(rad) * 420;
                  const y2 = Math.sin(rad) * 420;
                  const xDiamond = Math.cos(rad) * 340;
                  const yDiamond = Math.sin(rad) * 340;

                  return (
                    <g key={`spoke-desk-${deg}`}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#F59E0B"
                        strokeWidth="1.2"
                        strokeDasharray={deg % 90 === 0 ? undefined : '5 7'}
                        opacity={deg % 90 === 0 ? 0.7 : 0.45}
                      />
                      <polygon
                        points={`${xDiamond},${yDiamond - 5} ${xDiamond + 5},${yDiamond} ${xDiamond},${yDiamond + 5} ${xDiamond - 5},${yDiamond}`}
                        fill="#FDE68A"
                        opacity="0.85"
                      />
                    </g>
                  );
                })}
              </g>

              {/* Outer Ring 2: Counter-Clockwise Rotating Sacred Petals (80s) */}
              <g className="animate-spin-ccw">
                <circle cx="0" cy="0" r="200" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2 8" opacity="0.65" fill="none" />
                <circle cx="0" cy="0" r="380" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 16" opacity="0.5" fill="none" />

                {Array.from({ length: 24 }).map((_, i) => {
                  const deg = i * 15;
                  const rad = (deg * Math.PI) / 180;
                  const x = Math.cos(rad) * 250;
                  const y = Math.sin(rad) * 250;
                  return (
                    <circle
                      key={`subnode-desk-${i}`}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#FEF3C7"
                      opacity={i % 2 === 0 ? 0.9 : 0.55}
                    />
                  );
                })}
              </g>

              {/* Golden Cross Hairs & Center */}
              <line x1="0" y1="-490" x2="0" y2="490" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="6 8" />
              <line x1="-490" y1="0" x2="490" y2="0" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="6 8" />
              <circle cx="0" cy="0" r="10" fill="#FDE68A" filter="url(#starHalo)" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />

              <text
                x="0"
                y="445"
                textAnchor="middle"
                fill="#FDE68A"
                opacity="0.75"
                fontSize="13"
                letterSpacing="3"
                fontFamily="serif"
                fontWeight="bold"
              >
                ॥ सूर्य चक्र ॥
              </text>
            </g>

            {/* 2. SAPTARISHI MANDALA (सप्तर्षि मंडल) & DHRUVA TARA (ध्रुव तारा) */}
            <g id="saptarishi-constellation">
              <path
                d="M 980 170 L 1000 230 L 1080 235 L 1060 175 Z"
                stroke="#FBBF24"
                strokeWidth="2"
                fill="rgba(245, 158, 11, 0.08)"
                filter="url(#goldLineGlow)"
                opacity="0.9"
              />
              <path
                d="M 1060 175 L 1140 155 L 1220 135 L 1300 155"
                stroke="#FBBF24"
                strokeWidth="2"
                fill="none"
                filter="url(#goldLineGlow)"
                opacity="0.9"
              />

              {/* Pointer Ray leading straight to DHRUVA */}
              <line
                x1="1000"
                y1="230"
                x2="930"
                y2="50"
                stroke="#FDE68A"
                strokeWidth="1.8"
                strokeDasharray="4 5"
                opacity="0.85"
                filter="url(#goldLineGlow)"
              />

              {/* Saptarishi Stars */}
              <g className="twinkle-1">
                <circle cx="980" cy="170" r="7" fill="#F59E0B" opacity="0.45" />
                <circle cx="980" cy="170" r="4.2" fill="#FFFBEB" filter="url(#starHalo)" />
                <text x="965" y="160" fill="#FDE68A" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.9">क्रतु</text>
              </g>
              <g className="twinkle-2">
                <circle cx="1000" cy="230" r="6" fill="#F59E0B" opacity="0.4" />
                <circle cx="1000" cy="230" r="3.8" fill="#FFFBEB" filter="url(#starHalo)" />
                <text x="1012" y="240" fill="#FDE68A" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.9">पुलह</text>
              </g>
              <g className="twinkle-3">
                <circle cx="1080" cy="235" r="6" fill="#F59E0B" opacity="0.4" />
                <circle cx="1080" cy="235" r="3.6" fill="#FFFBEB" filter="url(#starHalo)" />
                <text x="1085" y="250" fill="#FDE68A" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.9">पुलस्त्य</text>
              </g>
              <g className="twinkle-1">
                <circle cx="1060" cy="175" r="5.5" fill="#F59E0B" opacity="0.35" />
                <circle cx="1060" cy="175" r="3.4" fill="#FFFBEB" filter="url(#starHalo)" />
                <text x="1065" y="165" fill="#FDE68A" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.9">अत्रि</text>
              </g>
              <g className="twinkle-2">
                <circle cx="1140" cy="155" r="7" fill="#F59E0B" opacity="0.45" />
                <circle cx="1140" cy="155" r="4.2" fill="#FFFBEB" filter="url(#starHalo)" />
                <text x="1135" y="142" fill="#FDE68A" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.9">अङ्गिरा</text>
              </g>
              <g className="twinkle-1">
                <circle cx="1220" cy="135" r="7" fill="#F59E0B" opacity="0.45" />
                <circle cx="1220" cy="135" r="4.5" fill="#FFFBEB" filter="url(#starHalo)" />
                <circle cx="1228" cy="127" r="2.5" fill="#67E8F9" filter="url(#starHalo)" />
                <text x="1210" y="118" fill="#FDE68A" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.9">वशिष्ठ-अरुन्धती</text>
              </g>
              <g className="twinkle-3">
                <circle cx="1300" cy="155" r="6.5" fill="#F59E0B" opacity="0.45" />
                <circle cx="1300" cy="155" r="4" fill="#FFFBEB" filter="url(#starHalo)" />
                <text x="1305" y="175" fill="#FDE68A" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.9">मरीचि</text>
              </g>

              <text
                x="1150"
                y="225"
                fill="#FBBF24"
                opacity="0.85"
                fontSize="13"
                letterSpacing="2"
                fontFamily="serif"
                fontWeight="bold"
                textAnchor="middle"
              >
                ॥ सप्तर्षि मंडल ॥
              </text>

              {/* DHRUVA TARA (ध्रुव तारा - Polaris) */}
              <g className="twinkle-dhruva-desktop">
                <circle cx="930" cy="50" r="24" fill="url(#dhruvaGlow)" opacity="0.85" />
                <line x1="930" y1="20" x2="930" y2="80" stroke="#FFFFFF" strokeWidth="2.2" filter="url(#starHalo)" />
                <line x1="900" y1="50" x2="960" y2="50" stroke="#FFFFFF" strokeWidth="2.2" filter="url(#starHalo)" />
                <line x1="908" y1="28" x2="952" y2="72" stroke="#FDE68A" strokeWidth="1.2" opacity="0.8" />
                <line x1="952" y1="28" x2="908" y2="72" stroke="#FDE68A" strokeWidth="1.2" opacity="0.8" />
                <circle cx="930" cy="50" r="5.5" fill="#FFFFFF" filter="url(#starHalo)" />
                <text
                  x="930"
                  y="15"
                  textAnchor="middle"
                  fill="#FEF08A"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="serif"
                  letterSpacing="1.5"
                  filter="url(#goldLineGlow)"
                >
                  ★ ध्रुव तारा (Polaris)
                </text>
              </g>
            </g>

            {/* 3. MRIGASHIRA NAKSHATRA (मृगशिरा - Orion) - Positioned safely in upper-left sky */}
            <g id="mrigashira-constellation">
              <path
                d="M 240 110 L 295 65 L 350 100 L 325 170 L 345 235 L 265 245 L 270 160 L 240 110 Z"
                stroke="#FBBF24"
                strokeWidth="2"
                fill="rgba(245, 158, 11, 0.06)"
                filter="url(#goldLineGlow)"
                opacity="0.85"
              />
              <line
                x1="270"
                y1="160"
                x2="325"
                y2="170"
                stroke="#FDE68A"
                strokeWidth="2.4"
                filter="url(#goldLineGlow)"
                opacity="0.95"
              />
              <line x1="295" y1="65" x2="298" y2="165" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.45" />
              <line x1="270" y1="160" x2="345" y2="235" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 4" opacity="0.35" />
              <line x1="325" y1="170" x2="265" y2="245" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 4" opacity="0.35" />

              <g className="twinkle-1">
                <circle cx="295" cy="65" r="5" fill="#FDE68A" opacity="0.45" />
                <circle cx="295" cy="65" r="3.4" fill="#FFFBEB" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-2">
                <circle cx="350" cy="100" r="18" fill="url(#betelgeuseGlow)" />
                <circle cx="350" cy="100" r="5.5" fill="#FFEDD5" filter="url(#starHalo)" />
                <line x1="350" y1="86" x2="350" y2="114" stroke="#F97316" strokeWidth="1.5" />
                <line x1="336" y1="100" x2="364" y2="100" stroke="#F97316" strokeWidth="1.5" />
                <text x="368" y="102" fill="#FDBA74" fontSize="10.5" fontFamily="serif" fontWeight="bold" opacity="0.95">आर्द्रा-सीमा</text>
              </g>
              <g className="twinkle-3">
                <circle cx="240" cy="110" r="5.5" fill="#67E8F9" opacity="0.4" />
                <circle cx="240" cy="110" r="3.6" fill="#FFFFFF" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-1">
                <circle cx="270" cy="160" r="5.5" fill="#FBBF24" opacity="0.55" />
                <circle cx="270" cy="160" r="3.8" fill="#FFFBEB" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-2">
                <circle cx="298" cy="165" r="6" fill="#FBBF24" opacity="0.65" />
                <circle cx="298" cy="165" r="4.2" fill="#FFFFFF" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-3">
                <circle cx="325" cy="170" r="5.5" fill="#FBBF24" opacity="0.55" />
                <circle cx="325" cy="170" r="3.8" fill="#FFFBEB" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-1">
                <circle cx="265" cy="245" r="4.5" fill="#F59E0B" opacity="0.4" />
                <circle cx="265" cy="245" r="3.4" fill="#FFFBEB" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-2">
                <circle cx="345" cy="235" r="17" fill="url(#rigelGlow)" />
                <circle cx="345" cy="235" r="5.5" fill="#FFFFFF" filter="url(#starHalo)" />
                <line x1="345" y1="223" x2="345" y2="247" stroke="#67E8F9" strokeWidth="1.5" />
                <line x1="333" y1="235" x2="357" y2="235" stroke="#67E8F9" strokeWidth="1.5" />
                <text x="360" y="240" fill="#BAE6FD" fontSize="10.5" fontFamily="serif" fontWeight="bold" opacity="0.95">बाण-पाद</text>
              </g>
              <text
                x="295"
                y="280"
                textAnchor="middle"
                fill="#FBBF24"
                opacity="0.9"
                fontSize="12.5"
                letterSpacing="2"
                fontFamily="serif"
                fontWeight="bold"
              >
                ॥ मृगशिरा नक्षत्र ॥
              </text>
            </g>

            {/* 4. KRITTIKA NAKSHATRA (कृत्तिका - Pleiades Cluster) */}
            <g id="krittika-cluster">
              <path
                d="M 440 135 L 470 115 L 510 130 L 545 145 L 530 165 L 488 158 L 440 135 Z"
                stroke="#67E8F9"
                strokeWidth="1.5"
                strokeDasharray="2 3"
                fill="rgba(103, 232, 249, 0.06)"
                opacity="0.8"
              />
              <line x1="470" y1="115" x2="488" y2="158" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="1 3" opacity="0.7" />
              <line x1="510" y1="130" x2="488" y2="158" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="1 3" opacity="0.7" />

              <g className="twinkle-1">
                <circle cx="510" cy="130" r="12" fill="url(#rigelGlow)" opacity="0.85" />
                <circle cx="510" cy="130" r="4.6" fill="#FFFFFF" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-2">
                <circle cx="545" cy="145" r="3.6" fill="#E0F2FE" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-3">
                <circle cx="440" cy="135" r="3.8" fill="#E0F2FE" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-1">
                <circle cx="470" cy="115" r="4" fill="#FFFFFF" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-2">
                <circle cx="488" cy="158" r="3.8" fill="#E0F2FE" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-3">
                <circle cx="460" cy="100" r="3" fill="#BAE6FD" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-1">
                <circle cx="552" cy="135" r="2.8" fill="#BAE6FD" filter="url(#starHalo)" />
              </g>

              <text
                x="495"
                y="188"
                textAnchor="middle"
                fill="#BAE6FD"
                opacity="0.9"
                fontSize="12"
                letterSpacing="2"
                fontFamily="serif"
                fontWeight="bold"
              >
                ॥ कृत्तिका ॥
              </text>
            </g>
          </g>

          {/* =============================================================== */}
          {/* MOBILE LAYOUT (sm:hidden) - Vertically Harmonized Constellations */}
          {/* =============================================================== */}
          <g className="sm:hidden">
            {/* Mobile Surya Chakra - Centered directly behind the mobile clock */}
            <g transform="translate(720, 680)">
              <circle cx="0" cy="0" r="160" fill="url(#suryaCenterAura)" />
              <g className="animate-spin-cw">
                <circle cx="0" cy="0" r="140" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.6" fill="none" />
                <circle cx="0" cy="0" r="220" stroke="#D4AF37" strokeWidth="1.4" strokeDasharray="6 8" opacity="0.6" fill="none" />
                <circle cx="0" cy="0" r="300" stroke="#FBBF24" strokeWidth="1.8" opacity="0.65" fill="none" filter="url(#goldLineGlow)" />
                <circle cx="0" cy="0" r="380" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 10" opacity="0.45" fill="none" />

                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const x1 = Math.cos(rad) * 140;
                  const y1 = Math.sin(rad) * 140;
                  const x2 = Math.cos(rad) * 380;
                  const y2 = Math.sin(rad) * 380;
                  return (
                    <line
                      key={`spoke-mob-${deg}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#F59E0B"
                      strokeWidth="1.2"
                      strokeDasharray={deg % 90 === 0 ? undefined : '4 6'}
                      opacity={deg % 90 === 0 ? 0.7 : 0.45}
                    />
                  );
                })}
              </g>

              <g className="animate-spin-ccw">
                <circle cx="0" cy="0" r="180" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="2 8" opacity="0.65" fill="none" />
                {Array.from({ length: 16 }).map((_, i) => {
                  const deg = i * 22.5;
                  const rad = (deg * Math.PI) / 180;
                  const x = Math.cos(rad) * 220;
                  const y = Math.sin(rad) * 220;
                  return (
                    <circle
                      key={`subnode-mob-${i}`}
                      cx={x}
                      cy={y}
                      r="2.8"
                      fill="#FEF3C7"
                      opacity="0.8"
                    />
                  );
                })}
              </g>

              <circle cx="0" cy="0" r="8" fill="#FDE68A" filter="url(#starHalo)" />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>

            {/* Mobile Dhruva Tara (Polaris) Centered in Header Sky */}
            <g className="twinkle-dhruva-mobile">
              <circle cx="720" cy="60" r="22" fill="url(#dhruvaGlow)" opacity="0.85" />
              <line x1="720" y1="30" x2="720" y2="90" stroke="#FFFFFF" strokeWidth="2.2" filter="url(#starHalo)" />
              <line x1="690" y1="60" x2="750" y2="60" stroke="#FFFFFF" strokeWidth="2.2" filter="url(#starHalo)" />
              <circle cx="720" cy="60" r="5" fill="#FFFFFF" filter="url(#starHalo)" />
              <text
                x="720"
                y="25"
                textAnchor="middle"
                fill="#FEF08A"
                fontSize="12"
                fontWeight="bold"
                fontFamily="serif"
                letterSpacing="1"
                filter="url(#goldLineGlow)"
              >
                ★ ध्रुव तारा (Polaris)
              </text>
            </g>

            {/* Mobile Saptarishi Ursa Major Pointer */}
            <path
              d="M 680 130 L 700 170 L 750 175 L 740 135 Z"
              stroke="#FBBF24"
              strokeWidth="1.8"
              fill="rgba(245, 158, 11, 0.08)"
              filter="url(#goldLineGlow)"
              opacity="0.9"
            />
            <line
              x1="700"
              y1="170"
              x2="720"
              y2="60"
              stroke="#FDE68A"
              strokeWidth="1.6"
              strokeDasharray="3 4"
              opacity="0.85"
              filter="url(#goldLineGlow)"
            />
            <circle cx="680" cy="130" r="4" fill="#FFFBEB" filter="url(#starHalo)" />
            <circle cx="700" cy="170" r="3.6" fill="#FFFBEB" filter="url(#starHalo)" />
            <circle cx="750" cy="175" r="3.6" fill="#FFFBEB" filter="url(#starHalo)" />
            <circle cx="740" cy="135" r="3.4" fill="#FFFBEB" filter="url(#starHalo)" />

            {/* Mobile Krittika & Mrigashira Accent Stars */}
            <circle cx="600" cy="110" r="4" fill="#67E8F9" filter="url(#starHalo)" />
            <circle cx="840" cy="110" r="4.5" fill="#FFEDD5" filter="url(#starHalo)" />
          </g>

          {/* =============================================================== */}
          {/* E. AMBIENT SACRED STARDUST FIELD                                 */}
          {/* =============================================================== */}
          <g id="ambient-stardust" fill="#FEF3C7">
            {[
              { cx: 70, cy: 70, r: 2.2, cls: 'twinkle-1' },
              { cx: 160, cy: 50, r: 2.5, cls: 'twinkle-2' },
              { cx: 620, cy: 60, r: 2.4, cls: 'twinkle-1' },
              { cx: 760, cy: 80, r: 2.0, cls: 'twinkle-2' },
              { cx: 860, cy: 110, r: 2.4, cls: 'twinkle-3' },
              { cx: 1380, cy: 80, r: 2.5, cls: 'twinkle-1' },
              { cx: 1410, cy: 160, r: 2.0, cls: 'twinkle-2' },

              { cx: 50, cy: 380, r: 2.2, cls: 'twinkle-2' },
              { cx: 90, cy: 520, r: 2.0, cls: 'twinkle-3' },
              { cx: 120, cy: 680, r: 2.4, cls: 'twinkle-1' },
              { cx: 310, cy: 760, r: 2.0, cls: 'twinkle-2' },
              { cx: 460, cy: 820, r: 2.5, cls: 'twinkle-3' },
              { cx: 640, cy: 780, r: 2.1, cls: 'twinkle-1' },
              { cx: 780, cy: 840, r: 2.3, cls: 'twinkle-2' },
              { cx: 920, cy: 790, r: 2.0, cls: 'twinkle-3' },
              { cx: 1340, cy: 680, r: 2.4, cls: 'twinkle-1' },
              { cx: 1400, cy: 760, r: 2.0, cls: 'twinkle-2' },
              { cx: 1420, cy: 430, r: 2.2, cls: 'twinkle-1' },
            ].map((star, idx) => (
              <circle
                key={`star-${idx}`}
                cx={star.cx}
                cy={star.cy}
                r={star.r}
                className={star.cls}
                opacity="0.8"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* 4. Bottom Soft Atmospheric Edge Blend */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#05070D] via-[#05070D]/50 to-transparent" />
    </div>
  );
};

export default CosmicConstellationBackdrop;
