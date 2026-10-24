/**
 * Sanatan Web (सनातन घड़ी)
 * 12 Vedic Rashi Golden Line Art Icons (भारतीय पारंपरिक राशि प्रतीक)
 * Authentic mythological iconography according to Indian Jyotish tradition
 * Pure SVG, 60 FPS, Zero external npm bloat (< 300 lines)
 */

import React from 'react';

export type RashiKey =
  | 'mesh'
  | 'vrishabh'
  | 'mithun'
  | 'kark'
  | 'singh'
  | 'kanya'
  | 'tula'
  | 'vrishchik'
  | 'dhanu'
  | 'makar'
  | 'kumbh'
  | 'meen';

export interface VedicRashiGoldIconProps {
  rashi: RashiKey | string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export const VedicRashiGoldIcon: React.FC<VedicRashiGoldIconProps> = ({
  rashi,
  size = 'md',
  className = '',
}) => {
  const normKey = (rashi || '').toLowerCase().trim();
  const dimensionClass = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <svg
      className={`${dimensionClass} shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_6px_rgba(217,119,6,0.35)] ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={rashi}
    >
      <defs>
        {/* Royal Metallic Gold Linear Gradient */}
        <linearGradient id={`rg-${normKey}`} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        {/* Soft Amber Glow Fill */}
        <radialGradient id={`rf-${normKey}`} cx="24" cy="24" r="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#fef3c7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0.15" />
        </radialGradient>
      </defs>

      {/* Decorative Outer Circle with Sacred Manuscript Filigree */}
      <circle cx="24" cy="24" r="21.5" fill={`url(#rf-${normKey})`} stroke={`url(#rg-${normKey})`} strokeWidth="1.2" />
      <circle cx="24" cy="24" r="19" stroke={`url(#rg-${normKey})`} strokeWidth="0.6" strokeDasharray="2.5 1.5" opacity="0.6" />

      {/* 4 Cardinal Sacred Bindus */}
      <circle cx="24" cy="4" r="1" fill="#d97706" />
      <circle cx="24" cy="44" r="1" fill="#d97706" />
      <circle cx="4" cy="24" r="1" fill="#d97706" />
      <circle cx="44" cy="24" r="1" fill="#d97706" />

      {/* 12 Traditional Indian Rashi Line Art Figures */}
      <g stroke={`url(#rg-${normKey})`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* १. मेष (Mesh - Aries): मुड़े हुए सींगों वाला शक्तिशाली मेढ़ा व मुकुट */}
        {(normKey === 'mesh' || normKey === 'aries' || normKey === 'मेष') && (
          <g>
            {/* Ram Face */}
            <path d="M24 16 L21 27 L24 33 L27 27 Z" strokeWidth="1.4" fill="#fef3c7" fillOpacity="0.5" />
            <circle cx="24" cy="18" r="1.2" fill="#d97706" stroke="none" />
            {/* Left Curled Ram Horn */}
            <path d="M22 17 C18 10, 10 11, 10 18 C10 24, 16 25, 18 21 C19 19, 18 16, 16 16" />
            {/* Right Curled Ram Horn */}
            <path d="M26 17 C30 10, 38 11, 38 18 C38 24, 32 25, 30 21 C29 19, 30 16, 32 16" />
            {/* Crown Jewel */}
            <path d="M22 13 L24 9 L26 13 Z" strokeWidth="1.2" fill="#f59e0b" />
          </g>
        )}

        {/* २. वृष (Vrishabh - Taurus): नंदी बैल, मजबूत सींग और कंठमाला */}
        {(normKey === 'vrishabh' || normKey === 'taurus' || normKey === 'वृषभ' || normKey === 'वृष') && (
          <g>
            {/* Bull Skull & Muzzle */}
            <path d="M19 21 Q24 23 29 21 L27 33 Q24 35 21 33 Z" strokeWidth="1.4" fill="#fef3c7" fillOpacity="0.4" />
            {/* Nostril Ring */}
            <circle cx="24" cy="33" r="2" strokeWidth="1.2" />
            {/* Horns curving outward and upward */}
            <path d="M19 21 C16 16, 12 12, 11 8 C15 10, 19 14, 21 18" />
            <path d="M29 21 C32 16, 36 12, 37 8 C33 10, 29 14, 27 18" />
            {/* Sacred Neck Mala / Bell */}
            <path d="M18 36 Q24 39 30 36" strokeWidth="1.8" strokeDasharray="1 2.5" />
            <circle cx="24" cy="39" r="1.5" fill="#f59e0b" stroke="none" />
          </g>
        )}

        {/* ३. मिथुन (Mithun - Gemini): पुरुष (गदा) व स्त्री (वीणा) युगल */}
        {(normKey === 'mithun' || normKey === 'gemini' || normKey === 'मिथुन') && (
          <g>
            {/* Male Profile & Gada (Left) */}
            <circle cx="18" cy="14" r="3.2" strokeWidth="1.3" />
            <path d="M14 26 C14 20, 21 20, 21 26 L20 36" strokeWidth="1.4" />
            <path d="M13 22 L10 32 M9 33 L12 30" strokeWidth="1.6" /> {/* Gada */}
            {/* Female Profile & Veena (Right) */}
            <circle cx="30" cy="15" r="3" strokeWidth="1.3" />
            <path d="M27 27 C27 21, 34 21, 34 27 L33 36" strokeWidth="1.4" />
            <path d="M26 25 C31 28, 35 30, 37 36" strokeWidth="1.4" /> {/* Veena neck */}
            <circle cx="37" cy="34" r="2" strokeWidth="1.2" /> {/* Veena resonator */}
          </g>
        )}

        {/* ४. कर्क (Kark - Cancer): वैदिक केंकड़ा, शंख व जल तरंगें */}
        {(normKey === 'kark' || normKey === 'cancer' || normKey === 'कर्क') && (
          <g>
            {/* Carapace Shell */}
            <ellipse cx="24" cy="24" rx="7.5" ry="5.5" strokeWidth="1.5" fill="#fef3c7" fillOpacity="0.4" />
            {/* Left Big Claw */}
            <path d="M18 21 C14 17, 12 11, 15 9 C18 11, 16 16, 20 19" strokeWidth="1.4" />
            {/* Right Big Claw */}
            <path d="M30 21 C34 17, 36 11, 33 9 C30 11, 32 16, 28 19" strokeWidth="1.4" />
            {/* Legs */}
            <path d="M17 25 C13 25, 11 29, 12 32 M18 27 C15 29, 14 33, 16 35" strokeWidth="1.2" />
            <path d="M31 25 C35 25, 37 29, 36 32 M30 27 C33 29, 34 33, 32 35" strokeWidth="1.2" />
            {/* Sacred Ocean Wave */}
            <path d="M14 39 Q19 37 24 39 Q29 41 34 39" strokeWidth="1.2" opacity="0.7" />
          </g>
        )}

        {/* ५. सिंह (Singh - Leo): राजसी शेर का मुखड़ा व सूर्य सदृश अयाल */}
        {(normKey === 'singh' || normKey === 'leo' || normKey === 'सिंह') && (
          <g>
            {/* Majestic Sunburst Mane */}
            <path d="M24 9 L24 13 M33 13 L30 16 M37 21 L33 22 M35 30 L31 28 M15 13 L18 16 M11 21 L15 22 M13 30 L17 28" strokeWidth="1.4" />
            {/* Lion Head & Muzzle */}
            <circle cx="24" cy="22" r="7.5" strokeWidth="1.4" fill="#fef3c7" fillOpacity="0.4" />
            <path d="M20 23 L24 26 L28 23" strokeWidth="1.3" />
            <path d="M24 26 L24 29" strokeWidth="1.3" />
            <path d="M21 29 Q24 32 27 29" strokeWidth="1.3" />
            {/* Forehead Sun Tilak */}
            <circle cx="24" cy="18" r="1.5" fill="#f59e0b" stroke="none" />
          </g>
        )}

        {/* ६. कन्या (Kanya - Virgo): नौका में बैठी कन्या, धान की बाली व जलता दीप */}
        {(normKey === 'kanya' || normKey === 'virgo' || normKey === 'कन्या') && (
          <g>
            {/* Traditional Boat (नौका) */}
            <path d="M11 36 C17 40, 31 40, 37 36 L39 33 L9 33 Z" strokeWidth="1.4" fill="#fef3c7" fillOpacity="0.3" />
            {/* Serene Maiden Figure */}
            <circle cx="23" cy="16" r="3" strokeWidth="1.3" />
            <path d="M20 28 C19 22, 27 22, 26 28 L27 33 L19 33 Z" strokeWidth="1.3" />
            {/* Left: Sheaf of Paddy Grain (धान की बाली) */}
            <path d="M17 23 C14 18, 13 14, 15 11" strokeWidth="1.4" />
            <path d="M14 12 L16 14 M12 15 L15 16 M14 18 L16 19" strokeWidth="1.2" />
            {/* Right: Burning Diya (प्रज्वलित दीपक) */}
            <path d="M29 25 L33 25 C33 27, 29 27, 29 25 Z" strokeWidth="1.2" fill="#f59e0b" />
            <path d="M31 24 C31 21, 33 21, 31 18 C29 21, 31 21, 31 24 Z" fill="#f59e0b" stroke="none" />
          </g>
        )}

        {/* ७. तुला (Tula - Libra): न्याय का तराजू संतुलित रूप में */}
        {(normKey === 'tula' || normKey === 'libra' || normKey === 'तुला') && (
          <g>
            {/* Main Central Pivot Pole */}
            <line x1="24" y1="10" x2="24" y2="38" strokeWidth="1.6" />
            <circle cx="24" cy="10" r="2" fill="#f59e0b" stroke="none" />
            {/* Horizontal Balance Beam */}
            <line x1="12" y1="16" x2="36" y2="16" strokeWidth="1.8" />
            {/* Left Scale Pan */}
            <line x1="12" y1="16" x2="8" y2="28" strokeWidth="1.1" />
            <line x1="12" y1="16" x2="16" y2="28" strokeWidth="1.1" />
            <path d="M7 28 Q12 32 17 28 Z" strokeWidth="1.4" fill="#fef3c7" fillOpacity="0.5" />
            {/* Right Scale Pan */}
            <line x1="36" y1="16" x2="32" y2="28" strokeWidth="1.1" />
            <line x1="36" y1="16" x2="40" y2="28" strokeWidth="1.1" />
            <path d="M31 28 Q36 32 41 28 Z" strokeWidth="1.4" fill="#fef3c7" fillOpacity="0.5" />
            {/* Base Pedestal */}
            <path d="M19 38 L29 38" strokeWidth="2" />
          </g>
        )}

        {/* ८. वृश्चिक (Vrishchik - Scorpio): तीखा डंक, कुण्डलिनी व तीरों जैसी रेखाएं */}
        {(normKey === 'vrishchik' || normKey === 'scorpio' || normKey === 'वृश्चिक') && (
          <g>
            {/* Pincers (अग्र पंजे) */}
            <path d="M19 22 C15 18, 14 13, 17 11 C19 13, 17 17, 21 19" strokeWidth="1.4" />
            <path d="M29 22 C33 18, 34 13, 31 11 C29 13, 31 17, 27 19" strokeWidth="1.4" />
            {/* Segmented Torso */}
            <ellipse cx="24" cy="24" rx="4.5" ry="6.5" strokeWidth="1.4" fill="#fef3c7" fillOpacity="0.4" />
            {/* Upcurled Kundalini Stinger (ऊर्ध्व डंक) */}
            <path d="M24 30 C24 35, 30 38, 33 34 C36 30, 33 24, 30 23" strokeWidth="1.6" />
            <path d="M30 23 L32 20 L27 21 Z" fill="#ea580c" strokeWidth="1" /> {/* Stinger Arrow */}
            {/* Legs */}
            <path d="M19 25 L14 26 M19 28 L15 30 M29 25 L34 26 M29 28 L33 30" strokeWidth="1.2" />
          </g>
        )}

        {/* ९. धनु (Dhanu - Sagittarius): अश्व-मानव धनुर्धारी, गगनचुंबी बाण */}
        {(normKey === 'dhanu' || normKey === 'sagittarius' || normKey === 'धनु') && (
          <g>
            {/* Human Torso & Archer */}
            <circle cx="18" cy="15" r="2.8" strokeWidth="1.3" />
            <path d="M18 18 L19 27" strokeWidth="1.5" />
            {/* Horse Body (अश्व धड़) */}
            <path d="M19 27 C19 29, 27 28, 32 30 C34 31, 35 37, 35 37 M23 30 L23 37 M30 31 L31 37" strokeWidth="1.4" />
            {/* Taut Bow (धनुष) & Upward Arrow (बाण) */}
            <path d="M23 10 C29 16, 32 21, 26 27" strokeWidth="1.6" />
            <line x1="16" y1="23" x2="33" y2="10" strokeWidth="1.8" />
            <path d="M30 10 L34 9 L33 13" fill="#f59e0b" strokeWidth="1.2" />
          </g>
        )}

        {/* १०. मकर (Makar - Capricorn): मत्स्य-मृग (हिरण मुख + मकर/मत्स्य पूँछ) */}
        {(normKey === 'makar' || normKey === 'capricorn' || normKey === 'मकर') && (
          <g>
            {/* Deer Head & Antelope Horn */}
            <path d="M15 19 C15 14, 21 16, 21 21 L18 26 Z" strokeWidth="1.4" fill="#fef3c7" fillOpacity="0.4" />
            <path d="M19 16 C20 11, 25 9, 27 8 C24 11, 22 13, 21 16" strokeWidth="1.5" /> {/* Swept Horn */}
            <circle cx="18" cy="19" r="0.9" fill="#d97706" stroke="none" />
            {/* Aquatic Fish/Crocodile Body & Swirling Tail (मत्स्य पूँछ) */}
            <path d="M18 26 C20 30, 27 29, 29 33 C31 37, 26 41, 22 39 C19 37, 21 33, 25 34" strokeWidth="1.6" />
            {/* Tail Fin */}
            <path d="M30 33 C34 31, 37 34, 38 37 C34 36, 31 37, 30 33 Z" strokeWidth="1.3" fill="#fef3c7" fillOpacity="0.5" />
          </g>
        )}

        {/* ११. कुंभ (Kumbh - Aquarius): कंधे पर अमृत कलश लिए ज्ञान जल बहाते पुरुष */}
        {(normKey === 'kumbh' || normKey === 'aquarius' || normKey === 'कुंभ') && (
          <g>
            {/* Reverent Figure Silhouette */}
            <circle cx="19" cy="18" r="2.8" strokeWidth="1.3" />
            <path d="M18 21 C18 25, 23 27, 23 35 L17 35" strokeWidth="1.4" />
            {/* Sacred Pitcher / Kalash (घड़ा) tilted on shoulder */}
            <ellipse cx="27" cy="16" rx="4" ry="5" transform="rotate(35 27 16)" strokeWidth="1.5" fill="#fef3c7" fillOpacity="0.5" />
            <path d="M29 13 L33 16" strokeWidth="1.5" />
            {/* Flowing Sacred Waters (अमृत ज्ञान धारा) */}
            <path d="M32 17 C35 20, 32 24, 35 28 C37 31, 34 35, 36 38" strokeWidth="1.6" strokeDasharray="3 1.5" />
            <path d="M30 20 C32 23, 30 26, 32 30" strokeWidth="1.2" opacity="0.7" />
          </g>
        )}

        {/* १२. मीन (Meen - Pisces): दो पवित्र मत्स्य परस्पर पूँछ की ओर चक्राकार */}
        {(normKey === 'meen' || normKey === 'pisces' || normKey === 'मीन') && (
          <g>
            {/* First Fish (Top swimming Right) */}
            <path d="M14 17 C19 13, 29 13, 34 17 C29 21, 19 21, 14 17 Z" strokeWidth="1.4" fill="#fef3c7" fillOpacity="0.4" />
            <path d="M14 17 L10 14 M14 17 L10 20" strokeWidth="1.3" /> {/* Tail */}
            <circle cx="30" cy="17" r="0.9" fill="#d97706" stroke="none" />
            {/* Second Fish (Bottom swimming Left) */}
            <path d="M34 31 C29 35, 19 35, 14 31 C19 27, 29 27, 34 31 Z" strokeWidth="1.4" fill="#fef3c7" fillOpacity="0.4" />
            <path d="M34 31 L38 28 M34 31 L38 34" strokeWidth="1.3" /> {/* Tail */}
            <circle cx="18" cy="31" r="0.9" fill="#d97706" stroke="none" />
            {/* Connecting Cosmic Flow Chord */}
            <path d="M24 19 Q26 24 24 29" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.8" />
          </g>
        )}
      </g>
    </svg>
  );
};

export default VedicRashiGoldIcon;
