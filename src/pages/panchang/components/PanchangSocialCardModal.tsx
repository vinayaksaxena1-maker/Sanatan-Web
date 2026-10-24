/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangSocialCardModal
 * 1:1 Square Social Media & WhatsApp Sharing Card
 * Based on Stitch Screen 5f90956d
 * Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

export interface PanchangSocialCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: UsePanchangDataResult;
}

export const PanchangSocialCardModal: React.FC<PanchangSocialCardModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const { currentCity, panchang, formattedDate, dayName } = data;
  const hd = panchang.hinduDate;

  const handleCopyText = () => {
    const text = `🕉️ **दैनिक वैदिक पंचांग** 🕉️\n📅 ${formattedDate}\n📍 ${currentCity.nameHindi || currentCity.name}\n\n✨ **तिथि**: ${hd.tithi.hindiName || hd.tithi.name} (${hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'})\n✨ **नक्षत्र**: ${hd.nakshatra.hindiName || hd.nakshatra.name}\n✨ **योग**: ${hd.yoga.hindiName || hd.yoga.name}\n✨ **वार**: ${dayName}\n\n🌅 **सूर्योदय**: ${panchang.sunrise} | 🌇 **सूर्यास्त**: ${panchang.sunset}\n⭐ **अभिजीत मुहूर्त**: ११:४८ - १२:३२\n🛑 **राहुकाल**: ${panchang.rahuKaal?.start || '१६:४८'} - ${panchang.rahuKaal?.end || '१८:२२'}\n\n🌐 सनातन वेब (Sanatan Web) • sanatanweb.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#fbf7ee] rounded-3xl p-6 sm:p-8 border border-[#dec9ab] shadow-2xl space-y-5 font-serif max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-rose-100 border border-[#dec9ab] text-stone-600 hover:text-rose-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-[#c2410c] uppercase tracking-wider">
            WhatsApp एवं सोशल मीडिया साझा पत्रक
          </span>
          <h2 className="text-xl font-bold text-[#26150b]">दैनिक पंचांग 1:1 स्क्वेयर कार्ड</h2>
        </div>

        {/* ================= 1:1 SQUARE CARD PREVIEW ================= */}
        <div
          id="social-panchang-card"
          className="aspect-square w-full rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#fffdfa] via-[#fff9eb] to-[#fbeecc] border-2 border-[#d4af37] shadow-xl relative overflow-hidden flex flex-col justify-between"
        >
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.08]" />
          <GoldenCornerBrackets size="lg" />

          {/* Card Top Strip */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#dec9ab]/80 pb-3">
            <div className="flex items-center gap-2">
              <VedicIcon3D name="om" size="sm" />
              <div>
                <span className="text-sm font-bold text-[#26150b] block leading-tight">वेद ज्योतिष केंद्र</span>
                <span className="text-[9px] text-[#735641]">दैनिक वैदिक पंचांग</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#c2410c] block">
                {currentCity.nameHindi || currentCity.name}
              </span>
              <span className="text-[9px] text-[#735641] font-mono">
                विक्रम संवत {hd.samvatVikram}
              </span>
            </div>
          </div>

          {/* Card Center: Auspicious Details */}
          <div className="relative z-10 my-auto text-center space-y-3 py-2">
            <div>
              <span className="text-xs font-bold text-[#735641] block">
                {formattedDate}
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-[#c2410c] tracking-wide pt-1">
                {hd.tithi.hindiName || hd.tithi.name}
              </div>
              <span className="text-xs text-[#b45309] font-semibold">
                {hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'} • {hd.monthPurnimantaHindi || hd.monthHindi} मास
              </span>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 gap-2 text-left pt-1">
              <div className="p-2 rounded-xl bg-white/85 border border-[#dec9ab]/70">
                <span className="text-[9px] text-[#735641] block">नक्षत्र</span>
                <span className="text-xs font-bold text-[#26150b]">
                  {hd.nakshatra.hindiName || hd.nakshatra.name}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white/85 border border-[#dec9ab]/70">
                <span className="text-[9px] text-[#735641] block">योग</span>
                <span className="text-xs font-bold text-[#26150b]">
                  {hd.yoga.hindiName || hd.yoga.name}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white/85 border border-emerald-300 bg-emerald-50/50">
                <span className="text-[9px] text-emerald-800 block">⭐ अभिजीत मुहूर्त</span>
                <span className="text-xs font-bold text-emerald-950 font-mono">११:४८ - १२:३२</span>
              </div>
              <div className="p-2 rounded-xl bg-white/85 border border-rose-300 bg-rose-50/50">
                <span className="text-[9px] text-rose-800 block">🛑 राहुकाल</span>
                <span className="text-xs font-bold text-rose-950 font-mono">
                  {panchang.rahuKaal?.start || '१६:४८'} - {panchang.rahuKaal?.end || '१८:२२'}
                </span>
              </div>
            </div>
          </div>

          {/* Card Bottom Strip */}
          <div className="relative z-10 flex items-center justify-between border-t border-[#dec9ab]/80 pt-2 text-[10px] text-[#735641]">
            <span>🌅 सूर्योदय: {panchang.sunrise}</span>
            <span className="font-bold text-[#b45309]">सनातन वेब • SanatanWeb.com</span>
            <span>🌇 सूर्यास्त: {panchang.sunset}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handleCopyText}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer text-center"
          >
            {copied ? '✅ टेक्स्ट कॉपी हो गया!' : '📋 पंचांग टेक्स्ट कॉपी करें'}
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanchangSocialCardModal;
