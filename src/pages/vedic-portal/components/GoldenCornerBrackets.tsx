import React from 'react';

export interface GoldenCornerBracketsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GoldenCornerBrackets: React.FC<GoldenCornerBracketsProps> = ({ className = '', size = 'md' }) => {
  const dim = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-9 h-9' : 'w-7 h-7';
  const posTL = size === 'sm' ? 'top-1.5 left-1.5' : size === 'lg' ? 'top-3 left-3' : 'top-2 left-2';
  const posTR = size === 'sm' ? 'top-1.5 right-1.5' : size === 'lg' ? 'top-3 right-3' : 'top-2 right-2';
  const posBL = size === 'sm' ? 'bottom-1.5 left-1.5' : size === 'lg' ? 'bottom-3 left-3' : 'bottom-2 left-2';
  const posBR = size === 'sm' ? 'bottom-1.5 right-1.5' : size === 'lg' ? 'bottom-3 right-3' : 'bottom-2 right-2';

  const CornerSVG = () => (
    <svg className="w-full h-full text-[#b8860b] filter drop-shadow-[0_1.5px_2px_rgba(184,134,11,0.45)]" viewBox="0 0 28 28" fill="none">
      {/* Outer L-Frame with Antique Brass stroke */}
      <path d="M 2 24 L 2 5 C 2 3.34 3.34 2 5 2 L 24 2" stroke="#b8860b" strokeWidth="2.8" strokeLinecap="round" />
      {/* Inner Decorative Accent */}
      <path d="M 6 18 L 6 7 C 6 6.45 6.45 6 7 6 L 18 6" stroke="#d4af37" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
      {/* Ornate Corner Jewel / Bindu */}
      <circle cx="10" cy="10" r="2.4" fill="#d4af37" stroke="#92400e" strokeWidth="0.6" />
      <circle cx="2" cy="24" r="1.8" fill="#b8860b" />
      <circle cx="24" cy="2" r="1.8" fill="#b8860b" />
    </svg>
  );

  return (
    <div className={`pointer-events-none absolute inset-0 z-20 select-none ${className}`} aria-hidden="true">
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
