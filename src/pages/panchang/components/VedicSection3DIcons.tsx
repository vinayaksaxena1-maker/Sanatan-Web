/**
 * Sanatan Web (सनातन घड़ी)
 * Component: VedicSection3DIcons
 * Collection of authentic 3D Vector Icons for all 8 Panchang Sections:
 * - SuryaChandra3DIcon: १. सूर्योदय एवं चन्द्रोदय
 * - Brihaspati3DIcon & MantriMandala3DIcon: ३. संवत्सर व मन्त्री मण्डल
 * - DinaRatriMana3DIcon & KhagoliyaYuga3DIcon: ४. खगोलीय मान व अहर्गण
 * - ShubhMuhurta3DIcon & AshubhKaal3DIcon: ५. शुभ मुहूर्त एवं अशुभ काल
 * - AnandadiYoga3DIcon & SukshmaKala3DIcon: ६. अतिरिक्त योग व सूक्ष्म काल
 * - RitualShuddhi3DIcon & DishaChakra3DIcon: ७. निवास, चक्र एवं अनुष्ठान
 * - UdayaLagna3DIcon & ChandraTaraBalam3DIcon: ८. मुहूर्त व लग्न शुद्धि
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';

interface IconProps {
  className?: string;
}

/* ---------------- 1. सूर्योदय एवं चन्द्रोदय ---------------- */
export const SuryaChandra3DIcon: React.FC<IconProps> = ({ className = 'w-7 h-7 sm:w-8 sm:h-8' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(234,88,12,0.4)]">
      <defs>
        <linearGradient id="sc-rim" x1="10" y1="10" x2="90" y2="90">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <radialGradient id="sc-sun-half" cx="42" cy="42" r="30">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#7c2d12" />
        </radialGradient>
        <radialGradient id="sc-moon-half" cx="58" cy="58" r="28">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#sc-rim)" />
      <circle cx="50" cy="50" r="42" fill="#1e1b4b" />
      {/* Sun Golden Half */}
      <path d="M 50 12 A 38 38 0 0 1 50 88 Z" fill="url(#sc-sun-half)" />
      {/* Moon Silver Crescent Half */}
      <path d="M 50 12 A 38 38 0 0 0 50 88 C 65 72 65 28 50 12 Z" fill="url(#sc-moon-half)" />
      {/* Central 3D Pivot */}
      <circle cx="50" cy="50" r="6" fill="#fef08a" stroke="#78350f" strokeWidth="1.5" />
      <circle cx="48" cy="48" r="1.8" fill="#ffffff" />
    </svg>
  </div>
);

/* ---------------- 3. संवत्सर व मन्त्री मण्डल ---------------- */
export const Brihaspati3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(202,138,4,0.4)]">
      <defs>
        <linearGradient id="guru-crown" x1="20" y1="20" x2="80" y2="80">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#guru-crown)" />
      <circle cx="50" cy="50" r="41" fill="#78350f" />
      {/* 3-Pointed Imperial Guru Crown */}
      <path d="M 24 66 L 30 38 L 42 50 L 50 24 L 58 50 L 70 38 L 76 66 Z" fill="url(#guru-crown)" stroke="#fff" strokeWidth="0.8" />
      {/* Jewels on Crown */}
      <circle cx="50" cy="24" r="3.5" fill="#fde047" stroke="#854d0e" />
      <circle cx="30" cy="38" r="3" fill="#fb923c" />
      <circle cx="70" cy="38" r="3" fill="#fb923c" />
      <circle cx="50" cy="58" r="4" fill="#ffffff" />
    </svg>
  </div>
);

export const MantriMandala3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(67,56,202,0.4)]">
      <defs>
        <linearGradient id="mantri-rim" x1="15" y1="15" x2="85" y2="85">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#mantri-rim)" />
      <circle cx="50" cy="50" r="41" fill="#1e1b4b" />
      {/* Royal Scepter & Governance Shield */}
      <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="url(#mantri-rim)" stroke="#c7d2fe" strokeWidth="1" />
      <circle cx="50" cy="50" r="10" fill="#f59e0b" stroke="#fff" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="4" fill="#ffffff" />
    </svg>
  </div>
);

/* ---------------- 4. खगोलीय मान व अहर्गण ---------------- */
export const DinaRatriMana3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(217,119,6,0.4)]">
      <circle cx="50" cy="50" r="46" fill="url(#sc-rim)" />
      <circle cx="50" cy="50" r="41" fill="#451a03" />
      {/* Golden Rising Sun over Horizon */}
      <path d="M 20 54 Q 50 18 80 54 Z" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.2" />
      <line x1="16" y1="54" x2="84" y2="54" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
      {/* Night stars below horizon */}
      <circle cx="34" cy="68" r="2" fill="#93c5fd" />
      <circle cx="50" cy="74" r="2.5" fill="#ffffff" />
      <circle cx="66" cy="68" r="2" fill="#93c5fd" />
    </svg>
  </div>
);

export const KhagoliyaYuga3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(99,102,241,0.4)]">
      <circle cx="50" cy="50" r="46" fill="url(#mantri-rim)" />
      <circle cx="50" cy="50" r="41" fill="#0f172a" />
      {/* Orbital Ellipses & Epoch Marker */}
      <ellipse cx="50" cy="50" rx="34" ry="16" stroke="#818cf8" strokeWidth="1.5" transform="rotate(-25 50 50)" />
      <ellipse cx="50" cy="50" rx="34" ry="16" stroke="#f59e0b" strokeWidth="1.5" transform="rotate(25 50 50)" />
      <circle cx="50" cy="50" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
    </svg>
  </div>
);

/* ---------------- 5. शुभ मुहूर्त एवं अशुभ काल ---------------- */
export const ShubhMuhurta3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(16,185,129,0.4)]">
      <defs>
        <radialGradient id="emerald-jewel" cx="42" cy="42" r="36">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="45%" stopColor="#10b981" />
          <stop offset="85%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="41" fill="url(#emerald-jewel)" />
      {/* Sacred Swastika / Shubh Kalash */}
      <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="50" y1="26" x2="50" y2="74" />
        <line x1="26" y1="50" x2="74" y2="50" />
        <line x1="50" y1="26" x2="68" y2="26" />
        <line x1="50" y1="74" x2="32" y2="74" />
        <line x1="26" y1="50" x2="26" y2="32" />
        <line x1="74" y1="50" x2="74" y2="68" />
      </g>
      <circle cx="38" cy="38" r="2.5" fill="#fef08a" />
      <circle cx="62" cy="38" r="2.5" fill="#fef08a" />
      <circle cx="38" cy="62" r="2.5" fill="#fef08a" />
      <circle cx="62" cy="62" r="2.5" fill="#fef08a" />
    </svg>
  </div>
);

export const AshubhKaal3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(225,29,72,0.4)]">
      <defs>
        <radialGradient id="ruby-danger" cx="42" cy="42" r="36">
          <stop offset="0%" stopColor="#fecdd3" />
          <stop offset="45%" stopColor="#e11d48" />
          <stop offset="85%" stopColor="#9f1239" />
          <stop offset="100%" stopColor="#4c0519" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="#be123c" stroke="#fecdd3" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="41" fill="url(#ruby-danger)" />
      {/* Protective Shield / Warning Triangle */}
      <polygon points="50,22 80,74 20,74" fill="#881337" stroke="#fecdd3" strokeWidth="2" strokeLinejoin="round" />
      <line x1="50" y1="38" x2="50" y2="54" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="64" r="2.5" fill="#ffffff" />
    </svg>
  </div>
);

/* ---------------- 6. अतिरिक्त योग व सूक्ष्म काल ---------------- */
export const AnandadiYoga3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(234,179,8,0.4)]">
      <circle cx="50" cy="50" r="46" fill="url(#guru-crown)" />
      <circle cx="50" cy="50" r="41" fill="#451a03" />
      {/* 8-Pointed Golden Siddhi Star */}
      <g fill="#fde047" stroke="#b45309" strokeWidth="1">
        <polygon points="50,16 57,36 78,36 61,49 68,70 50,57 32,70 39,49 22,36 43,36" />
      </g>
      <circle cx="50" cy="47" r="5" fill="#ffffff" />
    </svg>
  </div>
);

export const SukshmaKala3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(147,51,234,0.4)]">
      <circle cx="50" cy="50" r="46" fill="url(#mantri-rim)" />
      <circle cx="50" cy="50" r="41" fill="#2e1065" />
      {/* Twin Sandhya Horizon & Twilight Star */}
      <path d="M 22 50 Q 50 24 78 50 Z" fill="#9333ea" opacity="0.6" />
      <line x1="18" y1="50" x2="82" y2="50" stroke="#c084fc" strokeWidth="1.5" />
      <circle cx="50" cy="34" r="5" fill="#fef08a" stroke="#fff" strokeWidth="1" />
    </svg>
  </div>
);

/* ---------------- 7. निवास, चक्र एवं अनुष्ठान विचार ---------------- */
export const RitualShuddhi3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(234,88,12,0.4)]">
      <circle cx="50" cy="50" r="46" fill="url(#guru-crown)" />
      <circle cx="50" cy="50" r="41" fill="#7c2d12" />
      {/* Sacred Agni Kund & Shiva Trishul */}
      <path d="M 50 18 L 50 78 M 34 32 Q 50 44 50 56 M 66 32 Q 50 44 50 56" stroke="#fef08a" strokeWidth="2.8" strokeLinecap="round" />
      <polygon points="50,16 46,26 54,26" fill="#fef08a" />
      <polygon points="34,30 30,40 38,40" fill="#fef08a" />
      <polygon points="66,30 62,40 70,40" fill="#fef08a" />
      <circle cx="50" cy="56" r="4" fill="#fb923c" />
    </svg>
  </div>
);

export const DishaChakra3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(79,70,229,0.4)]">
      <circle cx="50" cy="50" r="46" fill="url(#mantri-rim)" />
      <circle cx="50" cy="50" r="41" fill="#1e1b4b" />
      {/* 8-Direction Ashtadisha Compass Rose */}
      <polygon points="50,16 54,46 50,50 46,46" fill="#ef4444" />
      <polygon points="50,84 54,54 50,50 46,54" fill="#94a3b8" />
      <polygon points="84,50 54,54 50,50 54,46" fill="#94a3b8" />
      <polygon points="16,50 46,54 50,50 46,46" fill="#94a3b8" />
      <circle cx="50" cy="50" r="5" fill="#fef08a" stroke="#1e1b4b" strokeWidth="1" />
    </svg>
  </div>
);

/* ---------------- 8. मुहूर्त व लग्न शुद्धि ---------------- */
export const UdayaLagna3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(217,119,6,0.4)]">
      <circle cx="50" cy="50" r="46" fill="url(#guru-crown)" />
      <circle cx="50" cy="50" r="41" fill="#451a03" />
      {/* 12-Rashi Vedic Kundali Diamond Grid */}
      <rect x="26" y="26" width="48" height="48" fill="none" stroke="#fef08a" strokeWidth="1.5" />
      <line x1="26" y1="26" x2="74" y2="74" stroke="#fef08a" strokeWidth="1.2" />
      <line x1="26" y1="74" x2="74" y2="26" stroke="#fef08a" strokeWidth="1.2" />
      <polygon points="50,26 74,50 50,74 26,50" fill="none" stroke="#fbbf24" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="3" fill="#ffffff" />
    </svg>
  </div>
);

export const ChandraTaraBalam3DIcon: React.FC<IconProps> = ({ className = 'w-5 h-5 sm:w-6 sm:h-6' }) => (
  <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(99,102,241,0.4)]">
      <circle cx="50" cy="50" r="46" fill="url(#mantri-rim)" />
      <circle cx="50" cy="50" r="41" fill="#0f172a" />
      {/* 9-Tara Ring around Moon Crescent */}
      <path d="M 44 32 A 18 18 0 1 0 66 60 A 15 15 0 0 1 44 32 Z" fill="#e2e8f0" stroke="#f8fafc" strokeWidth="0.8" />
      {/* 9 Tara Bindus */}
      <circle cx="50" cy="18" r="2.2" fill="#fef08a" />
      <circle cx="70" cy="26" r="2.2" fill="#38bdf8" />
      <circle cx="82" cy="46" r="2.2" fill="#fef08a" />
      <circle cx="76" cy="70" r="2.2" fill="#38bdf8" />
      <circle cx="56" cy="82" r="2.2" fill="#fef08a" />
      <circle cx="34" cy="78" r="2.2" fill="#38bdf8" />
      <circle cx="20" cy="60" r="2.2" fill="#fef08a" />
      <circle cx="20" cy="38" r="2.2" fill="#38bdf8" />
      <circle cx="34" cy="22" r="2.2" fill="#fef08a" />
    </svg>
  </div>
);
