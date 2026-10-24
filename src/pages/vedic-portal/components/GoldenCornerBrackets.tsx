import React from 'react';

export interface GoldenCornerBracketsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GoldenCornerBrackets: React.FC<GoldenCornerBracketsProps> = ({ className = '', size = 'md' }) => {
  const dim = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const borderTL = size === 'sm' ? 'border-t border-l' : 'border-t-2 border-l-2';
  const borderTR = size === 'sm' ? 'border-t border-r' : 'border-t-2 border-r-2';
  const borderBL = size === 'sm' ? 'border-b border-l' : 'border-b-2 border-l-2';
  const borderBR = size === 'sm' ? 'border-b border-r' : 'border-b-2 border-r-2';

  return (
    <div className={`pointer-events-none absolute inset-0 z-10 select-none ${className}`} aria-hidden="true">
      {/* Top-Left Ornate Bracket */}
      <div className={`absolute top-2.5 left-2.5 ${dim} ${borderTL} border-[#c29845] rounded-tl-xs`}>
        <div className="w-1 h-1 bg-[#c29845] rounded-full absolute -top-0.5 -left-0.5 shadow-xs"></div>
      </div>
      {/* Top-Right Ornate Bracket */}
      <div className={`absolute top-2.5 right-2.5 ${dim} ${borderTR} border-[#c29845] rounded-tr-xs`}>
        <div className="w-1 h-1 bg-[#c29845] rounded-full absolute -top-0.5 -right-0.5 shadow-xs"></div>
      </div>
      {/* Bottom-Left Ornate Bracket */}
      <div className={`absolute bottom-2.5 left-2.5 ${dim} ${borderBL} border-[#c29845] rounded-bl-xs`}>
        <div className="w-1 h-1 bg-[#c29845] rounded-full absolute -bottom-0.5 -left-0.5 shadow-xs"></div>
      </div>
      {/* Bottom-Right Ornate Bracket */}
      <div className={`absolute bottom-2.5 right-2.5 ${dim} ${borderBR} border-[#c29845] rounded-br-xs`}>
        <div className="w-1 h-1 bg-[#c29845] rounded-full absolute -bottom-0.5 -right-0.5 shadow-xs"></div>
      </div>
    </div>
  );
};
