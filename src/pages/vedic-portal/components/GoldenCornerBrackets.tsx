import React from 'react';

export interface GoldenCornerBracketsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GoldenCornerBrackets: React.FC<GoldenCornerBracketsProps> = ({ className = '', size = 'md' }) => {
  const dim = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const posTL = size === 'sm' ? 'top-1.5 left-1.5' : size === 'lg' ? 'top-2 left-2' : 'top-2 left-2';
  const posTR = size === 'sm' ? 'top-1.5 right-1.5' : size === 'lg' ? 'top-2 right-2' : 'top-2 right-2';
  const posBL = size === 'sm' ? 'bottom-1.5 left-1.5' : size === 'lg' ? 'bottom-2 left-2' : 'bottom-2 left-2';
  const posBR = size === 'sm' ? 'bottom-1.5 right-1.5' : size === 'lg' ? 'bottom-2 right-2' : 'bottom-2 right-2';

  const CornerSVG = () => (
    <svg className="w-full h-full text-[#b8860b] filter drop-shadow-[0_1px_1.5px_rgba(184,134,11,0.35)]" viewBox="0 0 28 28" fill="none">
      {/* Outer L-Frame with Antique Brass stroke - nested inside curve */}
      <path d="M 4 22 L 4 7 C 4 5.34 5.34 4 7 4 L 22 4" stroke="#b8860b" strokeWidth="2.2" strokeLinecap="round" />
      {/* Inner Decorative Accent */}
      <path d="M 7 17 L 7 8.5 C 7 7.67 7.67 7 8.5 7 L 17 7" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
      {/* Ornate Corner Jewel / Bindu */}
      <circle cx="11" cy="11" r="2" fill="#d4af37" stroke="#92400e" strokeWidth="0.5" />
      <circle cx="4" cy="22" r="1.5" fill="#b8860b" />
      <circle cx="22" cy="4" r="1.5" fill="#b8860b" />
    </svg>
  );

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 select-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Top-Left */}
      <div className={`absolute ${posTL} ${dim}`}>
        <CornerSVG />
      </div>
      {/* Top-Right */}
      <div className={`absolute ${posTR} ${dim} scale-x-[-1]`}>
        <CornerSVG />
      </div>
      {/* Bottom-Left */}
      <div className={`absolute ${posBL} ${dim} scale-y-[-1]`}>
        <CornerSVG />
      </div>
      {/* Bottom-Right */}
      <div className={`absolute ${posBR} ${dim} scale-x-[-1] scale-y-[-1]`}>
        <CornerSVG />
      </div>
    </div>
  );
};

export default GoldenCornerBrackets;
