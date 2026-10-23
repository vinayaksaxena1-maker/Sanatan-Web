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
          0%, 100% { opacity: 0.6; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes starTwinkleFast {
          0%, 100% { opacity: 0.45; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.35); }
        }
        @keyframes dhruvaHaloGlow {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.85;
            filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.8)) drop-shadow(0 0 16px rgba(251, 191, 36, 0.7));
          }
          50% {
            transform: scale(1.35) rotate(45deg);
            opacity: 1;
            filter: drop-shadow(0 0 18px rgba(56, 189, 248, 1)) drop-shadow(0 0 24px rgba(251, 191, 36, 0.9));
          }
        }
        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.05); }
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
        .nebula-breath {
          animation: nebulaPulse 12s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Base Background: Deep Cosmic Void (#060913) */}
      <div className="absolute inset-0 bg-[#060913]" />

      {/* 2. Nebula Glow: Mystic Indigo / Purple (#1e1b4b) Clouds */}
      <div
        className="absolute top-[-8%] right-[2%] w-[750px] h-[750px] rounded-full blur-[130px] nebula-breath"
        style={{
          background: 'radial-gradient(circle, rgba(30, 27, 75, 0.85) 0%, rgba(30, 27, 75, 0.45) 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-2%] w-[700px] h-[700px] rounded-full blur-[120px] nebula-breath"
        style={{
          background: 'radial-gradient(circle, rgba(46, 16, 101, 0.7) 0%, rgba(30, 27, 75, 0.4) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-[18%] left-[25%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(30, 27, 75, 0.6) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 75%)',
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
            {/* Radiant Solar Gold Glow Filter for Constellation Lines & Dial */}
            <filter id="solarGoldGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Stellar Cyan Glow Filter for Krittika & Stardust */}
            <filter id="stellarCyanGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Star Halo Filter */}
            <filter id="starHalo" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4.5" result="blur1" />
              <feGaussianBlur stdDeviation="1.8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Surya Center Yantra Glow: Solar Gold + Mystic Purple transition into Deep Void */}
            <radialGradient id="suryaCenterAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="65%" stopColor="#1e1b4b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#060913" stopOpacity="0" />
            </radialGradient>

            {/* Betelgeuse (आर्द्रा सीमा) Supergiant Glow */}
            <radialGradient id="betelgeuseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="1" />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#ea580c" stopOpacity="0.45" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Rigel Stellar Cyan / White Diamond Brilliance */}
            <radialGradient id="rigelCyanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="1" />
              <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Dhruva Tara Golden + Cyan Starlight Aura */}
            <radialGradient id="dhruvaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="1" />
              <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#fbbf24" stopOpacity="0.65" />
              <stop offset="85%" stopColor="#1e1b4b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* =============================================================== */}
          {/* DESKTOP LAYOUT (sm:inline) - Panoramic Celestial Dome           */}
          {/* =============================================================== */}
          <g className="hidden sm:inline">
            
            {/* 1. SURYA CHAKRA (सूर्य चक्र) - Radiant Solar Gold (#f59e0b / #fbbf24) */}
            <g transform="translate(1110, 550)">
              {/* Solar Core with Mystic Indigo Aura Transition */}
              <circle cx="0" cy="0" r="185" fill="url(#suryaCenterAura)" />

              {/* Clockwise Outer Ring: 120s Celestial Rotation */}
              <g className="animate-spin-cw">
                <circle cx="0" cy="0" r="160" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.55" fill="none" />
                <circle cx="0" cy="0" r="250" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.65" fill="none" />
                <circle cx="0" cy="0" r="340" stroke="#fbbf24" strokeWidth="1.8" opacity="0.75" fill="none" filter="url(#solarGoldGlow)" />
                <circle cx="0" cy="0" r="420" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 10" opacity="0.55" fill="none" />
                <circle cx="0" cy="0" r="490" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 14" opacity="0.4" fill="none" />

                {/* 12 Radiant Rashi Spokes & Golden Diamond Markers */}
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
                        stroke="#f59e0b"
                        strokeWidth="1.3"
                        strokeDasharray={deg % 90 === 0 ? undefined : '5 7'}
                        opacity={deg % 90 === 0 ? 0.75 : 0.48}
                      />
                      <polygon
                        points={`${xDiamond},${yDiamond - 5} ${xDiamond + 5},${yDiamond} ${xDiamond},${yDiamond + 5} ${xDiamond - 5},${yDiamond}`}
                        fill="#fbbf24"
                        opacity="0.9"
                      />
                    </g>
                  );
                })}
              </g>

              {/* Counter-Clockwise Inner Ring: 80s Sacred Sub-divisions */}
              <g className="animate-spin-ccw">
                <circle cx="0" cy="0" r="200" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="2 8" opacity="0.7" fill="none" />
                <circle cx="0" cy="0" r="380" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 16" opacity="0.5" fill="none" />

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
                      fill={i % 2 === 0 ? '#f8fafc' : '#38bdf8'}
                      opacity={i % 2 === 0 ? 0.95 : 0.75}
                    />
                  );
                })}
              </g>

              {/* Cardinal Coordinate Cross Hairs */}
              <line x1="0" y1="-490" x2="0" y2="490" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="6 8" />
              <line x1="-490" y1="0" x2="490" y2="0" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="6 8" />
              <circle cx="0" cy="0" r="10" fill="#fbbf24" filter="url(#starHalo)" />
              <circle cx="0" cy="0" r="4" fill="#f8fafc" />

              <text
                x="0"
                y="445"
                textAnchor="middle"
                fill="#fbbf24"
                opacity="0.8"
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
                stroke="#fbbf24"
                strokeWidth="2"
                fill="rgba(245, 158, 11, 0.08)"
                filter="url(#solarGoldGlow)"
                opacity="0.9"
              />
              <path
                d="M 1060 175 L 1140 155 L 1220 135 L 1300 155"
                stroke="#fbbf24"
                strokeWidth="2"
                fill="none"
                filter="url(#solarGoldGlow)"
                opacity="0.9"
              />

              {/* Pointer Ray leading straight to DHRUVA */}
              <line
                x1="1000"
                y1="230"
                x2="930"
                y2="50"
                stroke="#38bdf8"
                strokeWidth="1.8"
                strokeDasharray="4 5"
                opacity="0.9"
                filter="url(#stellarCyanGlow)"
              />

              {/* Saptarishi Stars: Radiant Solar Gold + Stellar White Center */}
              <g className="twinkle-1">
                <circle cx="980" cy="170" r="7" fill="#f59e0b" opacity="0.5" />
                <circle cx="980" cy="170" r="4.2" fill="#f8fafc" filter="url(#starHalo)" />
                <text x="965" y="160" fill="#fbbf24" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.95">क्रतु</text>
              </g>
              <g className="twinkle-2">
                <circle cx="1000" cy="230" r="6" fill="#f59e0b" opacity="0.45" />
                <circle cx="1000" cy="230" r="3.8" fill="#f8fafc" filter="url(#starHalo)" />
                <text x="1012" y="240" fill="#fbbf24" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.95">पुलह</text>
              </g>
              <g className="twinkle-3">
                <circle cx="1080" cy="235" r="6" fill="#f59e0b" opacity="0.45" />
                <circle cx="1080" cy="235" r="3.6" fill="#f8fafc" filter="url(#starHalo)" />
                <text x="1085" y="250" fill="#fbbf24" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.95">पुलस्त्य</text>
              </g>
              <g className="twinkle-1">
                <circle cx="1060" cy="175" r="5.5" fill="#f59e0b" opacity="0.4" />
                <circle cx="1060" cy="175" r="3.4" fill="#f8fafc" filter="url(#starHalo)" />
                <text x="1065" y="165" fill="#fbbf24" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.95">अत्रि</text>
              </g>
              <g className="twinkle-2">
                <circle cx="1140" cy="155" r="7" fill="#f59e0b" opacity="0.5" />
                <circle cx="1140" cy="155" r="4.2" fill="#f8fafc" filter="url(#starHalo)" />
                <text x="1135" y="142" fill="#fbbf24" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.95">अङ्गिरा</text>
              </g>
              <g className="twinkle-1">
                <circle cx="1220" cy="135" r="7" fill="#f59e0b" opacity="0.5" />
                <circle cx="1220" cy="135" r="4.5" fill="#f8fafc" filter="url(#starHalo)" />
                {/* Arundhati Companion Star: Stellar Cyan */}
                <circle cx="1228" cy="127" r="2.6" fill="#38bdf8" filter="url(#starHalo)" />
                <text x="1210" y="118" fill="#fbbf24" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.95">वशिष्ठ-अरुन्धती</text>
              </g>
              <g className="twinkle-3">
                <circle cx="1300" cy="155" r="6.5" fill="#f59e0b" opacity="0.5" />
                <circle cx="1300" cy="155" r="4" fill="#f8fafc" filter="url(#starHalo)" />
                <text x="1305" y="175" fill="#fbbf24" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.95">मरीचि</text>
              </g>

              <text
                x="1150"
                y="225"
                fill="#fbbf24"
                opacity="0.9"
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
                <circle cx="930" cy="50" r="26" fill="url(#dhruvaGlow)" opacity="0.9" />
                <line x1="930" y1="18" x2="930" y2="82" stroke="#f8fafc" strokeWidth="2.2" filter="url(#starHalo)" />
                <line x1="898" y1="50" x2="962" y2="50" stroke="#f8fafc" strokeWidth="2.2" filter="url(#starHalo)" />
                <line x1="907" y1="27" x2="953" y2="73" stroke="#38bdf8" strokeWidth="1.3" opacity="0.85" />
                <line x1="953" y1="27" x2="907" y2="73" stroke="#38bdf8" strokeWidth="1.3" opacity="0.85" />
                <circle cx="930" cy="50" r="5.5" fill="#f8fafc" filter="url(#starHalo)" />
                <text
                  x="930"
                  y="15"
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="serif"
                  letterSpacing="1.5"
                  filter="url(#stellarCyanGlow)"
                >
                  ★ ध्रुव तारा (Polaris)
                </text>
              </g>
            </g>

            {/* 3. MRIGASHIRA NAKSHATRA (मृगशिरा - Orion) */}
            <g id="mrigashira-constellation">
              <path
                d="M 240 110 L 295 65 L 350 100 L 325 170 L 345 235 L 265 245 L 270 160 L 240 110 Z"
                stroke="#fbbf24"
                strokeWidth="2"
                fill="rgba(245, 158, 11, 0.06)"
                filter="url(#solarGoldGlow)"
                opacity="0.88"
              />
              {/* Belt Stars Line */}
              <line
                x1="270"
                y1="160"
                x2="325"
                y2="170"
                stroke="#fbbf24"
                strokeWidth="2.5"
                filter="url(#solarGoldGlow)"
                opacity="0.95"
              />
              <line x1="295" y1="65" x2="298" y2="165" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.48" />
              <line x1="270" y1="160" x2="345" y2="235" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 4" opacity="0.38" />
              <line x1="325" y1="170" x2="265" y2="245" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 4" opacity="0.38" />

              {/* Head */}
              <g className="twinkle-1">
                <circle cx="295" cy="65" r="5" fill="#fbbf24" opacity="0.5" />
                <circle cx="295" cy="65" r="3.4" fill="#f8fafc" filter="url(#starHalo)" />
              </g>
              {/* Betelgeuse (Red/Gold Supergiant) */}
              <g className="twinkle-2">
                <circle cx="350" cy="100" r="18" fill="url(#betelgeuseGlow)" />
                <circle cx="350" cy="100" r="5.5" fill="#f8fafc" filter="url(#starHalo)" />
                <line x1="350" y1="85" x2="350" y2="115" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="335" y1="100" x2="365" y2="100" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="368" y="102" fill="#fbbf24" fontSize="10.5" fontFamily="serif" fontWeight="bold" opacity="0.95">आर्द्रा-सीमा</text>
              </g>
              {/* Bellatrix */}
              <g className="twinkle-3">
                <circle cx="240" cy="110" r="5.5" fill="#38bdf8" opacity="0.45" />
                <circle cx="240" cy="110" r="3.6" fill="#f8fafc" filter="url(#starHalo)" />
              </g>
              {/* The Three Belt Stars */}
              <g className="twinkle-1">
                <circle cx="270" cy="160" r="5.5" fill="#fbbf24" opacity="0.6" />
                <circle cx="270" cy="160" r="3.8" fill="#f8fafc" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-2">
                <circle cx="298" cy="165" r="6" fill="#fbbf24" opacity="0.7" />
                <circle cx="298" cy="165" r="4.2" fill="#f8fafc" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-3">
                <circle cx="325" cy="170" r="5.5" fill="#fbbf24" opacity="0.6" />
                <circle cx="325" cy="170" r="3.8" fill="#f8fafc" filter="url(#starHalo)" />
              </g>
              {/* Saiph */}
              <g className="twinkle-1">
                <circle cx="265" cy="245" r="4.5" fill="#f59e0b" opacity="0.45" />
                <circle cx="265" cy="245" r="3.4" fill="#f8fafc" filter="url(#starHalo)" />
              </g>
              {/* Rigel (Stellar Cyan Diamond Star) */}
              <g className="twinkle-2">
                <circle cx="345" cy="235" r="18" fill="url(#rigelCyanGlow)" />
                <circle cx="345" cy="235" r="5.5" fill="#f8fafc" filter="url(#starHalo)" />
                <line x1="345" y1="222" x2="345" y2="248" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="332" y1="235" x2="358" y2="235" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="360" y="240" fill="#38bdf8" fontSize="10.5" fontFamily="serif" fontWeight="bold" opacity="0.95">बाण-पाद</text>
              </g>
              <text
                x="295"
                y="280"
                textAnchor="middle"
                fill="#fbbf24"
                opacity="0.92"
                fontSize="12.5"
                letterSpacing="2"
                fontFamily="serif"
                fontWeight="bold"
              >
                ॥ मृगशिरा नक्षत्र ॥
              </text>
            </g>

            {/* 4. KRITTIKA NAKSHATRA (कृत्तिका - Pleiades Cluster) - Stellar Cyan (#38bdf8) */}
            <g id="krittika-cluster">
              <path
                d="M 440 135 L 470 115 L 510 130 L 545 145 L 530 165 L 488 158 L 440 135 Z"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="2 3"
                fill="rgba(56, 189, 248, 0.08)"
                filter="url(#stellarCyanGlow)"
                opacity="0.85"
              />
              <line x1="470" y1="115" x2="488" y2="158" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="1 3" opacity="0.75" />
              <line x1="510" y1="130" x2="488" y2="158" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="1 3" opacity="0.75" />

              {/* Sister Stars in Stellar Cyan & Stellar White */}
              <g className="twinkle-1">
                <circle cx="510" cy="130" r="14" fill="url(#rigelCyanGlow)" opacity="0.9" />
                <circle cx="510" cy="130" r="4.8" fill="#f8fafc" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-2">
                <circle cx="545" cy="145" r="3.8" fill="#38bdf8" filter="url(#starHalo)" />
                <circle cx="545" cy="145" r="1.8" fill="#f8fafc" />
              </g>
              <g className="twinkle-3">
                <circle cx="440" cy="135" r="3.8" fill="#38bdf8" filter="url(#starHalo)" />
                <circle cx="440" cy="135" r="1.8" fill="#f8fafc" />
              </g>
              <g className="twinkle-1">
                <circle cx="470" cy="115" r="4.2" fill="#f8fafc" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-2">
                <circle cx="488" cy="158" r="3.8" fill="#38bdf8" filter="url(#starHalo)" />
                <circle cx="488" cy="158" r="1.8" fill="#f8fafc" />
              </g>
              <g className="twinkle-3">
                <circle cx="460" cy="100" r="3.2" fill="#38bdf8" filter="url(#starHalo)" />
              </g>
              <g className="twinkle-1">
                <circle cx="552" cy="135" r="3" fill="#38bdf8" filter="url(#starHalo)" />
              </g>

              <text
                x="495"
                y="188"
                textAnchor="middle"
                fill="#38bdf8"
                opacity="0.95"
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
            {/* Mobile Surya Chakra - Solar Gold with Mystic Indigo */}
            <g transform="translate(720, 680)">
              <circle cx="0" cy="0" r="160" fill="url(#suryaCenterAura)" />
              <g className="animate-spin-cw">
                <circle cx="0" cy="0" r="140" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.6" fill="none" />
                <circle cx="0" cy="0" r="220" stroke="#fbbf24" strokeWidth="1.4" strokeDasharray="6 8" opacity="0.65" fill="none" />
                <circle cx="0" cy="0" r="300" stroke="#fbbf24" strokeWidth="1.8" opacity="0.75" fill="none" filter="url(#solarGoldGlow)" />
                <circle cx="0" cy="0" r="380" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 10" opacity="0.45" fill="none" />

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
                      stroke="#f59e0b"
                      strokeWidth="1.3"
                      strokeDasharray={deg % 90 === 0 ? undefined : '4 6'}
                      opacity={deg % 90 === 0 ? 0.75 : 0.48}
                    />
                  );
                })}
              </g>

              <g className="animate-spin-ccw">
                <circle cx="0" cy="0" r="180" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="2 8" opacity="0.7" fill="none" />
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
                      fill={i % 2 === 0 ? '#f8fafc' : '#38bdf8'}
                      opacity="0.85"
                    />
                  );
                })}
              </g>

              <circle cx="0" cy="0" r="8" fill="#fbbf24" filter="url(#starHalo)" />
              <circle cx="0" cy="0" r="3" fill="#f8fafc" />
            </g>

            {/* Mobile Dhruva Tara (Polaris) */}
            <g className="twinkle-dhruva-mobile">
              <circle cx="720" cy="60" r="24" fill="url(#dhruvaGlow)" opacity="0.9" />
              <line x1="720" y1="28" x2="720" y2="92" stroke="#f8fafc" strokeWidth="2.2" filter="url(#starHalo)" />
              <line x1="688" y1="60" x2="752" y2="60" stroke="#f8fafc" strokeWidth="2.2" filter="url(#starHalo)" />
              <circle cx="720" cy="60" r="5" fill="#f8fafc" filter="url(#starHalo)" />
              <text
                x="720"
                y="24"
                textAnchor="middle"
                fill="#f8fafc"
                fontSize="12"
                fontWeight="bold"
                fontFamily="serif"
                letterSpacing="1"
                filter="url(#stellarCyanGlow)"
              >
                ★ ध्रुव तारा (Polaris)
              </text>
            </g>

            {/* Mobile Saptarishi Pointer */}
            <path
              d="M 680 130 L 700 170 L 750 175 L 740 135 Z"
              stroke="#fbbf24"
              strokeWidth="1.8"
              fill="rgba(245, 158, 11, 0.08)"
              filter="url(#solarGoldGlow)"
              opacity="0.9"
            />
            <line
              x1="700"
              y1="170"
              x2="720"
              y2="60"
              stroke="#38bdf8"
              strokeWidth="1.6"
              strokeDasharray="3 4"
              opacity="0.9"
              filter="url(#stellarCyanGlow)"
            />
            <circle cx="680" cy="130" r="4" fill="#f8fafc" filter="url(#starHalo)" />
            <circle cx="700" cy="170" r="3.6" fill="#f8fafc" filter="url(#starHalo)" />
            <circle cx="750" cy="175" r="3.6" fill="#f8fafc" filter="url(#starHalo)" />
            <circle cx="740" cy="135" r="3.4" fill="#f8fafc" filter="url(#starHalo)" />

            {/* Mobile Krittika & Mrigashira Accent Stars */}
            <circle cx="600" cy="110" r="4.2" fill="#38bdf8" filter="url(#starHalo)" />
            <circle cx="840" cy="110" r="4.5" fill="#fbbf24" filter="url(#starHalo)" />
          </g>

          {/* =============================================================== */}
          {/* E. STARDUST FIELD: Stellar Cyan (#38bdf8) & White (#f8fafc)    */}
          {/* =============================================================== */}
          <g id="ambient-stardust">
            {[
              { cx: 70, cy: 70, r: 2.2, fill: '#38bdf8', cls: 'twinkle-1' },
              { cx: 160, cy: 50, r: 2.5, fill: '#f8fafc', cls: 'twinkle-2' },
              { cx: 620, cy: 60, r: 2.4, fill: '#38bdf8', cls: 'twinkle-1' },
              { cx: 760, cy: 80, r: 2.0, fill: '#f8fafc', cls: 'twinkle-2' },
              { cx: 860, cy: 110, r: 2.4, fill: '#38bdf8', cls: 'twinkle-3' },
              { cx: 1380, cy: 80, r: 2.5, fill: '#f8fafc', cls: 'twinkle-1' },
              { cx: 1410, cy: 160, r: 2.0, fill: '#38bdf8', cls: 'twinkle-2' },

              { cx: 50, cy: 380, r: 2.2, fill: '#f8fafc', cls: 'twinkle-2' },
              { cx: 90, cy: 520, r: 2.0, fill: '#38bdf8', cls: 'twinkle-3' },
              { cx: 120, cy: 680, r: 2.4, fill: '#f8fafc', cls: 'twinkle-1' },
              { cx: 310, cy: 760, r: 2.0, fill: '#38bdf8', cls: 'twinkle-2' },
              { cx: 460, cy: 820, r: 2.5, fill: '#f8fafc', cls: 'twinkle-3' },
              { cx: 640, cy: 780, r: 2.1, fill: '#38bdf8', cls: 'twinkle-1' },
              { cx: 780, cy: 840, r: 2.3, fill: '#f8fafc', cls: 'twinkle-2' },
              { cx: 920, cy: 790, r: 2.0, fill: '#38bdf8', cls: 'twinkle-3' },
              { cx: 1340, cy: 680, r: 2.4, fill: '#f8fafc', cls: 'twinkle-1' },
              { cx: 1400, cy: 760, r: 2.0, fill: '#38bdf8', cls: 'twinkle-2' },
              { cx: 1420, cy: 430, r: 2.2, fill: '#f8fafc', cls: 'twinkle-1' },
            ].map((star, idx) => (
              <circle
                key={`star-${idx}`}
                cx={star.cx}
                cy={star.cy}
                r={star.r}
                fill={star.fill}
                className={star.cls}
                opacity="0.85"
                filter="url(#starHalo)"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* 4. Bottom Soft Atmospheric Edge Blend into Deep Cosmic Void (#060913) */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#060913] via-[#060913]/60 to-transparent" />
    </div>
  );
};

export default CosmicConstellationBackdrop;
