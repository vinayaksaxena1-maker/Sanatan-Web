import React from 'react';

export type VedicIcon3DType =
  | 'sun'
  | 'moon'
  | 'temple'
  | 'clock'
  | 'kundli'
  | 'signal'
  | 'tithi'
  | 'nakshatra'
  | 'yoga'
  | 'karana'
  | 'shubh'
  | 'ashubh'
  | 'om'
  | 'upay'
  | 'vrat';

export interface VedicIcon3DProps {
  name: VedicIcon3DType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
}

export const VedicIcon3D: React.FC<VedicIcon3DProps> = ({
  name,
  size = 'md',
  className = '',
}) => {
  const isNumeric = typeof size === 'number';
  const sizeMap: Record<string, string> = {
    xs: 'w-4 h-4 min-w-[16px] max-w-[16px]',
    sm: 'w-7 h-7 min-w-[28px] max-w-[28px]',
    md: 'w-10 h-10 min-w-[40px] max-w-[40px]',
    lg: 'w-12 h-12 min-w-[48px] max-w-[48px]',
    xl: 'w-16 h-16 min-w-[64px] max-w-[64px]',
  };

  const dim = isNumeric ? '' : (sizeMap[size] || sizeMap.md);
  const inlineStyle: React.CSSProperties | undefined = isNumeric
    ? {
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        maxWidth: `${size}px`,
        minHeight: `${size}px`,
        maxHeight: `${size}px`,
      }
    : undefined;

  // Render authentic 3D Vector Objects with Lighting, Specular Highlights & Bevels
  const renderIconContent = () => {
    switch (name) {
      case 'sun':
        return (
          <svg className="w-full h-full drop-shadow-[0_4px_8px_rgba(234,88,12,0.4)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <radialGradient id="sunSphere" cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="25%" stopColor="#fbbf24" />
                <stop offset="65%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#9a3412" />
              </radialGradient>
              <linearGradient id="sunRay" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <filter id="sunGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            </defs>
            {/* 3D Solar Corona Flares */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <path
                key={idx}
                d="M 24 3 L 26 10 L 22 10 Z"
                fill="url(#sunRay)"
                filter="url(#sunGlow)"
                transform={`rotate(${angle} 24 24)`}
                opacity="0.9"
              />
            ))}
            {/* 3D Radiant Core Sphere */}
            <circle cx="24" cy="24" r="14" fill="url(#sunSphere)" />
            {/* Specular Glint Highlight */}
            <ellipse cx="20" cy="18" rx="4.5" ry="2.5" fill="#ffffff" opacity="0.65" transform="rotate(-25 20 18)" />
            {/* Outer Golden Rim */}
            <circle cx="24" cy="24" r="14" stroke="#fef3c7" strokeWidth="0.8" opacity="0.8" />
          </svg>
        );

      case 'moon':
        return (
          <svg className="w-full h-full drop-shadow-[0_4px_10px_rgba(30,58,138,0.25)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <radialGradient id="moonSphere" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#e2e8f0" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#334155" />
              </radialGradient>
              <radialGradient id="crescentGlint" cx="30%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* 3D Luminous Lunar Body */}
            <circle cx="24" cy="24" r="16" fill="url(#moonSphere)" />
            {/* Realistic Mare Craters (3D Inset Shading) */}
            <circle cx="18" cy="22" r="3" fill="#64748b" opacity="0.35" />
            <circle cx="28" cy="28" r="4.5" fill="#475569" opacity="0.25" />
            <circle cx="22" cy="31" r="2.2" fill="#64748b" opacity="0.3" />
            <circle cx="29" cy="18" r="2.5" fill="#64748b" opacity="0.28" />
            {/* 3D Luminous Crescent Highlight */}
            <path
              d="M 12 24 A 14 14 0 0 0 32 36 A 15 15 0 0 1 14 20 A 14 14 0 0 0 12 24 Z"
              fill="url(#crescentGlint)"
              opacity="0.8"
            />
            {/* Pearl Sheen Rim */}
            <circle cx="24" cy="24" r="16" stroke="#f8fafc" strokeWidth="0.9" opacity="0.6" />
          </svg>
        );

      case 'temple':
        return (
          <svg className="w-full h-full drop-shadow-[0_4px_8px_rgba(184,134,11,0.35)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="goldBrassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="35%" stopColor="#d4af37" />
                <stop offset="70%" stopColor="#b8860b" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              <linearGradient id="dhwajaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            {/* 3D Temple Shikhara Steps */}
            <path d="M 24 6 L 27 12 L 21 12 Z" fill="url(#goldBrassGrad)" />
            {/* Kalash on Apex */}
            <circle cx="24" cy="5" r="2" fill="#fef08a" stroke="#b8860b" strokeWidth="0.5" />
            {/* Saffron Temple Flag (Dhwaja) */}
            <path d="M 24 3 L 32 6 L 24 9 Z" fill="url(#dhwajaGrad)" />
            {/* Main Dome Body */}
            <path d="M 16 19 C 18 12 30 12 32 19 L 34 26 L 14 26 Z" fill="url(#goldBrassGrad)" />
            {/* Pillars / Mandapa with 3D Depth */}
            <rect x="15" y="27" width="4" height="11" rx="1" fill="url(#goldBrassGrad)" />
            <rect x="22" y="27" width="4" height="11" rx="1" fill="#fef08a" />
            <rect x="29" y="27" width="4" height="11" rx="1" fill="url(#goldBrassGrad)" />
            {/* Inner Garbhagriha Shadow Arch */}
            <path d="M 20 38 C 20 32 28 32 28 38 Z" fill="#451a03" />
            {/* Solid Temple Base */}
            <rect x="10" y="38" width="28" height="4" rx="1.5" fill="url(#goldBrassGrad)" />
            <rect x="8" y="42" width="32" height="3" rx="1" fill="#78350f" />
          </svg>
        );

      case 'clock':
        return (
          <svg className="w-full h-full drop-shadow-[0_4px_8px_rgba(184,134,11,0.3)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="brassBezel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="30%" stopColor="#eab308" />
                <stop offset="70%" stopColor="#a16207" />
                <stop offset="100%" stopColor="#713f12" />
              </linearGradient>
              <radialGradient id="clockDial" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="85%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fde68a" />
              </radialGradient>
            </defs>
            {/* Heavy Brass Outer Casing */}
            <circle cx="24" cy="24" r="21" fill="url(#brassBezel)" />
            {/* Dial Cavity */}
            <circle cx="24" cy="24" r="17" fill="url(#clockDial)" />
            {/* 3D Glass Bevel Reflection */}
            <path d="M 10 20 C 13 11 35 11 38 20 C 31 16 17 16 10 20 Z" fill="#ffffff" opacity="0.6" />
            {/* Hour Marks */}
            <circle cx="24" cy="10" r="1.2" fill="#78350f" />
            <circle cx="38" cy="24" r="1.2" fill="#78350f" />
            <circle cx="24" cy="38" r="1.2" fill="#78350f" />
            <circle cx="10" cy="24" r="1.2" fill="#78350f" />
            {/* Hands */}
            <line x1="24" y1="24" x2="24" y2="14" stroke="#991b1b" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="24" y1="24" x2="31" y2="24" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            {/* Center Golden Pin */}
            <circle cx="24" cy="24" r="2.5" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
          </svg>
        );

      case 'kundli':
        return (
          <svg className="w-full h-full drop-shadow-[0_4px_8px_rgba(234,88,12,0.3)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="parchmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="70%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
            </defs>
            {/* 3D Rolled Manuscript / Chart Diamond */}
            <rect x="7" y="7" width="34" height="34" rx="4" fill="url(#parchmentGrad)" stroke="#d97706" strokeWidth="1.6" />
            {/* Parashara Diamond Lines */}
            <polygon points="24,11 37,24 24,37 11,24" stroke="#ea580c" strokeWidth="1.8" fill="none" />
            <line x1="11" y1="11" x2="37" y2="37" stroke="#ea580c" strokeWidth="1.4" />
            <line x1="37" y1="11" x2="11" y2="37" stroke="#ea580c" strokeWidth="1.4" />
            {/* 3D Wax Seal Badge on Corner */}
            <circle cx="37" cy="37" r="6" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
            <text x="37" y="40" fontSize="7" fill="#ffffff" fontWeight="bold" textAnchor="middle">ॐ</text>
          </svg>
        );

      case 'signal':
        return (
          <svg className="w-full h-full drop-shadow-[0_4px_10px_rgba(16,185,129,0.4)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <radialGradient id="emeraldJewel" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="25%" stopColor="#34d399" />
                <stop offset="65%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064e3b" />
              </radialGradient>
            </defs>
            {/* 3D Faceted Emerald Gemstone */}
            <circle cx="24" cy="24" r="18" fill="url(#emeraldJewel)" />
            {/* Faceted Geometry Overlay */}
            <polygon points="24,8 36,16 36,32 24,40 12,32 12,16" stroke="#a7f3d0" strokeWidth="1.2" opacity="0.6" fill="none" />
            {/* Specular Glint */}
            <ellipse cx="19" cy="16" rx="4" ry="2" fill="#ffffff" opacity="0.75" transform="rotate(-30 19 16)" />
            {/* Center Check / Auspicious Mark */}
            <path d="M 18 24 L 22 28 L 30 18" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'tithi':
        return (
          <svg className="w-full h-full drop-shadow-[0_3px_6px_rgba(234,88,12,0.25)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="tithiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffedd5" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#9a3412" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="18" fill="url(#tithiGrad)" />
            {/* 3D Golden Phase Ring */}
            <path d="M 14 24 A 12 12 0 1 0 34 24 A 10 10 0 1 1 14 24 Z" fill="#ffffff" opacity="0.9" />
            <circle cx="24" cy="24" r="18" stroke="#fed7aa" strokeWidth="1.2" />
          </svg>
        );

      case 'nakshatra':
        return (
          <svg className="w-full h-full drop-shadow-[0_3px_6px_rgba(184,134,11,0.3)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#fef08a" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
            {/* 3D 8-Point Cosmic Star (Tara) */}
            <path
              d="M 24 4 L 27 18 L 41 18 L 30 26 L 34 40 L 24 31 L 14 40 L 18 26 L 7 18 L 21 18 Z"
              fill="url(#starGrad)"
              stroke="#ca8a04"
              strokeWidth="1"
            />
            <circle cx="24" cy="23" r="3.5" fill="#ffffff" opacity="0.9" />
          </svg>
        );

      case 'yoga':
        return (
          <svg className="w-full h-full drop-shadow-[0_3px_6px_rgba(42,103,76,0.3)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <radialGradient id="lotusGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#dcfce7" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#14532d" />
              </radialGradient>
            </defs>
            {/* 3D Ashta Dala Lotus Bloom */}
            <circle cx="24" cy="24" r="18" fill="url(#lotusGrad)" />
            <path d="M 24 10 C 26 16 30 18 24 28 C 18 18 22 16 24 10 Z" fill="#ffffff" opacity="0.85" />
            <path d="M 14 18 C 18 20 22 24 24 28 C 18 27 15 22 14 18 Z" fill="#bbf7d0" opacity="0.8" />
            <path d="M 34 18 C 30 20 26 24 24 28 C 30 27 33 22 34 18 Z" fill="#bbf7d0" opacity="0.8" />
            <circle cx="24" cy="28" r="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
          </svg>
        );

      case 'karana':
        return (
          <svg className="w-full h-full drop-shadow-[0_3px_6px_rgba(184,134,11,0.3)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="damruGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
            {/* 3D Shiva Damru / Hourglass */}
            <path d="M 13 10 L 35 10 L 24 24 L 35 38 L 13 38 L 24 24 Z" fill="url(#damruGrad)" stroke="#78350f" strokeWidth="1.2" />
            <circle cx="24" cy="24" r="2.5" fill="#ffffff" />
            <line x1="11" y1="10" x2="37" y2="10" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="11" y1="38" x2="37" y2="38" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'shubh':
        return (
          <svg className="w-full h-full drop-shadow-[0_3px_6px_rgba(34,197,94,0.35)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <radialGradient id="shubhShield" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ecfdf5" />
                <stop offset="40%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#047857" />
              </radialGradient>
            </defs>
            <path d="M 24 6 C 34 6 38 12 38 22 C 38 34 24 42 24 42 C 24 42 10 34 10 22 C 10 12 14 6 24 6 Z" fill="url(#shubhShield)" stroke="#a7f3d0" strokeWidth="1.2" />
            <path d="M 17 22 L 22 27 L 31 17" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'ashubh':
        return (
          <svg className="w-full h-full drop-shadow-[0_3px_6px_rgba(220,38,38,0.35)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <radialGradient id="ashubhPrism" cx="40%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#fee2e2" />
                <stop offset="45%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </radialGradient>
            </defs>
            <path d="M 24 6 L 42 38 L 6 38 Z" fill="url(#ashubhPrism)" stroke="#fecaca" strokeWidth="1.2" />
            <line x1="24" y1="17" x2="24" y2="27" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="32" r="1.8" fill="#ffffff" />
          </svg>
        );

      case 'om':
        return (
          <svg className="w-full h-full drop-shadow-[0_4px_10px_rgba(234,88,12,0.4)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="omGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#fef08a" />
                <stop offset="65%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#7c2d12" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="21" fill="url(#omGold)" />
            <circle cx="24" cy="24" r="18" fill="#7c2d12" opacity="0.35" />
            <circle cx="24" cy="24" r="18" stroke="#fef08a" strokeWidth="0.8" />
            <text x="24" y="32" fontSize="22" fill="#ffffff" fontWeight="bold" textAnchor="middle" fontFamily="'Noto Serif Devanagari', serif">
              ॐ
            </text>
          </svg>
        );

      case 'upay':
        return (
          <svg className="w-full h-full drop-shadow-[0_4px_8px_rgba(217,119,6,0.35)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="copperKalash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffedd5" />
                <stop offset="35%" stopColor="#ea580c" />
                <stop offset="80%" stopColor="#c2410c" />
                <stop offset="100%" stopColor="#7c2d12" />
              </linearGradient>
            </defs>
            {/* 3D Copper Kalash */}
            <path d="M 18 14 L 30 14 L 34 26 C 36 34 32 40 24 40 C 16 40 12 34 14 26 Z" fill="url(#copperKalash)" stroke="#fef08a" strokeWidth="1" />
            <ellipse cx="24" cy="14" rx="6" ry="2" fill="#fed7aa" />
            {/* Sacred Mango Leaves & Coconut */}
            <circle cx="24" cy="10" r="5" fill="#78350f" stroke="#ea580c" strokeWidth="0.8" />
            <path d="M 24 6 L 27 2 L 24 4 L 21 2 Z" fill="#15803d" />
          </svg>
        );

      case 'vrat':
        return (
          <svg className="w-full h-full drop-shadow-[0_4px_8px_rgba(234,88,12,0.35)]" viewBox="0 0 48 48" fill="none">
            <defs>
              <radialGradient id="diyaFlame" cx="50%" cy="70%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#fde047" />
                <stop offset="70%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#991b1b" />
              </radialGradient>
              <linearGradient id="brassDiya" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#713f12" />
              </linearGradient>
            </defs>
            {/* 3D Glowing Flame */}
            <path d="M 24 6 C 28 14 30 18 24 24 C 18 18 20 14 24 6 Z" fill="url(#diyaFlame)" />
            {/* Clay / Brass Diya Body */}
            <path d="M 12 24 C 12 32 36 32 36 24 C 33 28 15 28 12 24 Z" fill="url(#brassDiya)" stroke="#fef08a" strokeWidth="0.8" />
            <ellipse cx="24" cy="33" rx="7" ry="2" fill="#713f12" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={inlineStyle}
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-300 ease-out hover:scale-110 select-none ${dim} ${className}`}
      aria-hidden="true"
    >
      {renderIconContent()}
    </div>
  );
};
