/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangSocialCardModal
 * 1:1 Square Social Media & WhatsApp Sharing Card
 * Includes: १. सूर्योदय एवं चन्द्रोदय & २. पंचांग के ५ मुख्य अंग
 * Direct WhatsApp Share, Text Copy & PDF Link
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import { GoldenCornerBrackets } from '../../vedic-portal/components/GoldenCornerBrackets';
import { SacredGeometryWatermark } from '../../vedic-portal/components/SacredGeometryWatermark';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { generatePanchangImage } from '../services/panchangCanvasShare';
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
  const [isSharingImage, setIsSharingImage] = useState<boolean>(false);

  if (!isOpen) return null;

  const { currentCity, panchang, formattedDate, dayName, deepAnalysis, selectedDate } = data;
  const hd = panchang.hinduDate;

  // Format YYYY-MM-DD for PDF URL
  const yyyy = selectedDate.getFullYear();
  const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const dd = String(selectedDate.getDate()).padStart(2, '0');
  const dateQueryStr = `${yyyy}-${mm}-${dd}`;

  const whatsappText = `🕉️ *दैनिक पंचांग* 🕉️
📅 दिनांक: ${formattedDate}
📍 स्थान: ${currentCity.nameHindi || currentCity.name}
🚩 संवत: विक्रम संवत ${hd.samvatVikram} | शक संवत ${hd.samvatShaka}
🗓️ मास: ${hd.monthPurnimantaHindi || hd.monthHindi} (${hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'})

━━━━━━━━━━━━━━━━━━━━━
🌅 *१. सूर्योदय एवं चन्द्रोदय*
• प्रातः सूर्योदय: ${panchang.sunrise}
• सायं सूर्यास्त: ${panchang.sunset}
• चंद्रोदय काल: ${panchang.moonrise || '१०:३२ PM'}
• चन्द्रास्त काल: ${panchang.moonset || '०८:१५ AM'}
• दिवाकाल (दिनमान): ${deepAnalysis.dinamanaFormatted}
• रात्रिमान (निशाकाल): ${deepAnalysis.ratrimanaFormatted}

━━━━━━━━━━━━━━━━━━━━━
🚩 *२. पंचांग के ५ मुख्य अंग*
• १. तिथि: ${hd.tithi.hindiName || hd.tithi.name}
• २. वार: ${dayName}
• ३. नक्षत्र: ${hd.nakshatra.hindiName || hd.nakshatra.name} (पद ${hd.nakshatra.pada || 1})
• ४. योग: ${hd.yoga.hindiName || hd.yoga.name}
• ५. करण: ${hd.karana.hindiName || hd.karana.name}

━━━━━━━━━━━━━━━━━━━━━
📜 *३. संवत् एवं चांद्र मास*
• विक्रम संवत: ${hd.samvatVikram}
• शक संवत: ${hd.samvatShaka}
• कलि संवत: ${deepAnalysis.kaliyugaYear} वर्ष
• मास (पूर्णिमान्त): ${hd.monthPurnimantaHindi || hd.monthHindi}
• मास (अमान्त): ${hd.monthAmantaHindi || hd.monthHindi}
• पक्ष: ${hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'}
• प्रविष्टे / गते: ${deepAnalysis.pravishte.formatted}

━━━━━━━━━━━━━━━━━━━━━
⭐ *विशिष्ट मुहूर्त एवं काल*
• अभिजीत मुहूर्त: ११:४२ AM - १२:२७ PM
• राहुकाल (त्याज्य): ${panchang.rahuKaal?.start || '०९:१८ AM'} - ${panchang.rahuKaal?.end || '१०:४१ AM'}

🌐 सनातन वेब • sanatanweb.com`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(whatsappText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareAsImage = async () => {
    try {
      setIsSharingImage(true);
      const { share } = await generatePanchangImage(data);
      await share();
    } catch (err) {
      console.error('Error generating/sharing image:', err);
    } finally {
      setIsSharingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#fbf7ee] rounded-3xl p-5 sm:p-7 border border-[#dec9ab] shadow-2xl space-y-4 font-serif max-h-[94vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-rose-100 border border-[#dec9ab] text-stone-600 hover:text-rose-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-0.5">
          <span className="text-xs font-bold text-[#c2410c] uppercase tracking-wider">
            WhatsApp एवं सोशल मीडिया साझा पत्रक
          </span>
          <h2 className="text-xl font-bold text-[#26150b]">दैनिक पंचांग 1:1 कार्ड</h2>
        </div>

        {/* ================= 1:1 SQUARE CARD PREVIEW ================= */}
        <div
          id="social-panchang-card"
          className="w-full rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-[#fffdfa] via-[#fff9eb] to-[#fbeecc] border-2 border-[#d4af37] shadow-xl relative overflow-hidden flex flex-col justify-between space-y-3"
        >
          <SacredGeometryWatermark variant="swastik" className="opacity-[0.08]" />
          <GoldenCornerBrackets size="lg" />

          {/* Card Top Strip */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#dec9ab]/80 pb-2">
            <div className="flex items-center gap-1.5">
              <VedicIcon3D name="om" size="sm" />
              <div>
                <span className="text-xs font-bold text-[#26150b] block leading-tight">सनातन कालगणना</span>
                <span className="text-[9px] text-[#735641]">दैनिक पंचांग पत्रक</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#c2410c] block">
                {currentCity.nameHindi || currentCity.name}
              </span>
              <span className="text-[9px] text-[#735641] font-mono">
                संवत {hd.samvatVikram}
              </span>
            </div>
          </div>

          {/* Card Center: Date & Main Details */}
          <div className="relative z-10 text-center space-y-1">
            <span className="text-xs font-bold text-[#735641] block">
              {formattedDate}
            </span>
            <div className="text-xl sm:text-2xl font-bold text-[#c2410c] tracking-wide">
              {hd.tithi.hindiName || hd.tithi.name}
            </div>
            <span className="text-[11px] text-[#b45309] font-semibold block">
              {hd.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'} • {hd.monthPurnimantaHindi || hd.monthHindi} मास
            </span>
          </div>

          {/* 3 Main Sections Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-2 text-[11px]">
            {/* १. सूर्योदय एवं चन्द्रोदय */}
            <div className="p-2 rounded-xl bg-white/90 border border-amber-300/80 space-y-0.5">
              <span className="font-bold text-[#c2410c] text-[10px] block border-b border-amber-200 pb-0.5">
                🌅 १. सूर्योदय एवं चन्द्रोदय
              </span>
              <div className="flex justify-between text-[10px]">
                <span className="text-stone-600">सूर्योदय:</span>
                <span className="font-bold font-mono">{panchang.sunrise}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-stone-600">सूर्यास्त:</span>
                <span className="font-bold font-mono">{panchang.sunset}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-stone-600">दिनमान:</span>
                <span className="font-bold">{deepAnalysis.dinamanaFormatted}</span>
              </div>
            </div>

            {/* २. पंचांग के ५ मुख्य अंग */}
            <div className="p-2 rounded-xl bg-white/90 border border-amber-300/80 space-y-0.5">
              <span className="font-bold text-[#c2410c] text-[10px] block border-b border-amber-200 pb-0.5">
                🚩 २. पंचांग ५ अंग
              </span>
              <div className="flex justify-between text-[10px]">
                <span className="text-stone-600">वार:</span>
                <span className="font-bold">{dayName}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-stone-600">नक्षत्र:</span>
                <span className="font-bold truncate max-w-[80px]">{hd.nakshatra.hindiName || hd.nakshatra.name}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-stone-600">योग:</span>
                <span className="font-bold truncate max-w-[80px]">{hd.yoga.hindiName || hd.yoga.name}</span>
              </div>
            </div>

            {/* संवत् एवं चांद्र मास */}
            <div className="col-span-2 p-2 rounded-xl bg-white/90 border border-amber-300/80 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 font-bold text-[#451a03]">
                <span>📜 संवत् व मास:</span>
                <span className="font-mono text-[#c2410c]">विक्रम {hd.samvatVikram} | शक {hd.samvatShaka}</span>
              </div>
              <div className="text-stone-700">
                <span>{hd.monthPurnimantaHindi || hd.monthHindi} ({hd.paksha === 'Shukla' ? 'शुक्ल' : 'कृष्ण'})</span>
              </div>
            </div>
          </div>

          {/* Shubh & Ashubh Timing Strip */}
          <div className="relative z-10 grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-950 flex justify-between">
              <span>⭐ अभिजीत:</span>
              <span className="font-bold font-mono">११:४२ - १२:२७</span>
            </div>
            <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-950 flex justify-between">
              <span>🛑 राहुकाल:</span>
              <span className="font-bold font-mono">{panchang.rahuKaal?.start || '०९:१८'} - {panchang.rahuKaal?.end || '१०:४१'}</span>
            </div>
          </div>

          {/* Card Bottom Strip */}
          <div className="relative z-10 flex items-center justify-between border-t border-[#dec9ab]/80 pt-1.5 text-[9px] text-[#735641]">
            <span>सनातन वेब • SanatanWeb.com</span>
            <span>स्थान: {currentCity.nameHindi || currentCity.name}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {/* 1. Share as Image (High-Res 1080x1350 for WhatsApp) */}
          <button
            onClick={handleShareAsImage}
            disabled={isSharingImage}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ea580c] via-orange-600 to-[#c2410c] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            type="button"
          >
            <span>🖼️</span>
            <span>{isSharingImage ? 'इमेज तैयार हो रही है...' : 'पंचांग इमेज के रूप में शेयर / डाउनलोड करें'}</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* 2. Direct WhatsApp Text Share Button */}
            <button
              onClick={handleWhatsAppShare}
              className="w-full sm:flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              type="button"
            >
              <span>💬</span>
              <span>WhatsApp पर टेक्स्ट भेजें</span>
            </button>

            {/* 3. Text Copy Button */}
            <button
              onClick={handleCopyText}
              className="w-full sm:flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              type="button"
            >
              <span>📋</span>
              <span>{copied ? '✅ टेक्स्ट कॉपी हो गया!' : 'टेक्स्ट कॉपी करें'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* 4. Link to Complete Printable PDF Page */}
            <a
              href={`/download-panchang?date=${dateQueryStr}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-xl bg-[#fff8e8] hover:bg-[#fdeecb] border border-[#dec9ab] text-[#b45309] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 text-center no-underline"
            >
              <span>📄</span>
              <span>PDF पंचांग पत्रक (प्रिंट / सेव)</span>
            </a>

            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
              type="button"
            >
              बंद करें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanchangSocialCardModal;
