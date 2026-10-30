/**
 * Sanatan Web (सनातन घड़ी)
 * Component: SlotDetailModal
 * Elegant Vedic Popup Modal for Dial Slot Tap Details
 * Light Chandan Theme with createPortal Centering
 * Strictly zero alarm/reminder buttons as requested
 */

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CalendarDays } from 'lucide-react';
import { formatTimeRangeToHindi } from './timeHindiFormat';

export interface SelectedSlotInfo {
  type: 'choghadiya' | 'hora';
  name: string;
  startTime: string;
  endTime: string;
  quality: string;
  desc: string;
  dot: string;
}

interface SlotDetailModalProps {
  slot: SelectedSlotInfo | null;
  onClose: () => void;
  onOpenTable: (type: 'choghadiya' | 'hora') => void;
}

export const SlotDetailModal: React.FC<SlotDetailModalProps> = ({ slot, onClose, onOpenTable }) => {
  useEffect(() => {
    if (!slot) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [slot]);

  if (!slot) return null;

  const hindiTimeRange = formatTimeRangeToHindi(slot.startTime, slot.endTime);

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all animate-fadeIn font-serif"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EA] to-[#F5ECE0] border-2 border-[#D4AF37] rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(77,51,34,0.3)] relative text-left text-[#26150b] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#dec9ab]/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl select-none">{slot.dot}</span>
            <div>
              <span className="text-[10.5px] font-mono font-bold text-[#c2410c] tracking-wider uppercase block">
                {slot.type === 'choghadiya' ? '।। चयनित चौघड़िया मुहूर्त ।।' : '।। चयनित होरा काल ।।'}
              </span>
              <h3 className="text-lg font-serif font-black text-[#26150b] leading-tight">
                {slot.name}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-orange-100/70 hover:bg-orange-200/80 text-[#735641] hover:text-[#26150b] flex items-center justify-center transition-colors cursor-pointer border border-[#dec9ab]"
            title="बंद करें"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Time & Auspiciousness Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-amber-100/80 text-amber-900 border border-amber-300/60">
            ⏰ {hindiTimeRange || `${slot.startTime} – ${slot.endTime}`}
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
            slot.quality === 'शुभ' || slot.quality.includes('शुभ')
              ? 'bg-emerald-100/80 text-emerald-900 border-emerald-300'
              : slot.quality === 'अशुभ'
              ? 'bg-rose-100/80 text-rose-900 border-rose-300'
              : 'bg-amber-100/80 text-amber-900 border-amber-300'
          }`}>
            {slot.quality}
          </div>
        </div>

        {/* Description & Vedic Guidance Box */}
        <div className="p-3.5 rounded-2xl bg-white/80 border border-[#dec9ab]/70 space-y-1.5 shadow-xs">
          <span className="text-[11px] font-mono font-bold text-[#c2410c] block">
            📜 वैदिक फल एवं मार्गदर्शन:
          </span>
          <p className="text-sm font-serif text-[#382012] leading-relaxed">
            {slot.desc}
          </p>
        </div>

        {/* Bottom Actions: तालिका 📋 and बंद करें */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => {
              onOpenTable(slot.type);
              onClose();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer border border-amber-400/50"
          >
            <CalendarDays className="w-4 h-4" />
            <span>पूर्ण समय तालिका 📋</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-orange-100/60 hover:bg-orange-200/70 text-[#543b27] hover:text-[#26150b] font-bold text-xs sm:text-sm transition-all cursor-pointer border border-[#dec9ab]"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
