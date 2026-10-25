/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MatchmakingA4CertificateModal
 * Official Printable A4 Hindu Marriage Compatibility Certificate (विवाह प्रमाण पत्र)
 * Based on Stitch Screen b14c3990
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { X, Printer, Award, Sparkles } from 'lucide-react';
import type { UseMatchmakingDataResult } from '../hooks/useMatchmakingData';
import { toDevanagariNumerals } from '../hooks/useMatchmakingData';
import { VIVAH_BLESSING_MANTRA, VIVAH_BLESSING_MEANING } from '../hooks/matchmakingPresets';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';

interface MatchmakingA4CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: UseMatchmakingDataResult;
}

export const MatchmakingA4CertificateModal: React.FC<MatchmakingA4CertificateModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  const { groom, bride, groomRashi, groomNakshatra, brideRashi, brideNakshatra, milanReport, manglikHarmony, hindiVerdict } = data;
  const score = milanReport.totalScore;
  const maxScore = milanReport.maxScore;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-start justify-center p-2 sm:p-6 pt-12 pb-12 sm:pt-16"
    >
      {/* Floating Control Bar (Hidden during print) */}
      <div className="fixed top-4 right-4 sm:right-8 z-60 flex items-center gap-2 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-lg cursor-pointer transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>A4 प्रमाण पत्र प्रिंट / PDF सहेजें</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 shadow-lg cursor-pointer transition-all active:scale-95"
          aria-label="बंद करें"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* A4 Printable Certificate Container */}
      <div className="relative max-w-[850px] w-full bg-[#fdfbf7] dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-5 sm:p-8 rounded-2xl shadow-2xl border-2 border-amber-600/40 print:border-none print:shadow-none print:p-0 print:max-w-none print:bg-white print:text-black font-serif">
        {/* Dual Ornamental Borders */}
        <div className="border-2 border-amber-800/50 p-5 sm:p-6 rounded-xl relative">
          {/* 4 Corner Brass Swastik Ornaments */}
          <span className="absolute top-1.5 left-2 text-sm text-amber-700 select-none">卐</span>
          <span className="absolute top-1.5 right-2 text-sm text-amber-700 select-none">卐</span>
          <span className="absolute bottom-1.5 left-2 text-sm text-amber-700 select-none">卐</span>
          <span className="absolute bottom-1.5 right-2 text-sm text-amber-700 select-none">卐</span>

          {/* Invocation & Title */}
          <div className="text-center space-y-1 pb-4 border-b-2 border-amber-800/40">
            <p className="text-[11px] font-bold text-amber-800 tracking-widest uppercase">
              ।। ॐ श्री गणेशाय नमः ।। ॐ श्री लक्ष्मीनारायणाय नमः ।।
            </p>
            <h2
              id="certificate-title"
              className="text-xl sm:text-2xl font-bold text-amber-950 dark:text-amber-100 tracking-wide"
            >
              वैदिक विवाह अनुकूलता एवं ३६ गुण मिलान प्रमाण पत्र
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              महर्षि पराशर विरचित बृहत्पाराशर होराशास्त्र एवं निर्णयसिंधु शास्त्रोक्त अष्टकूट निर्णय
            </p>
          </div>

          {/* Couple Profiles Grid */}
          <div className="mt-4 grid grid-cols-2 gap-4 pb-4 border-b border-amber-200/80 text-xs">
            {/* Var (Groom) Profile */}
            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-stone-800/50 border border-amber-200/50 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                वर (आयुष्मान) विवरण
              </span>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {groom.name || 'आयुष्मान वर'}
              </div>
              <div className="space-y-0.5 text-[11px] text-stone-700 dark:text-stone-300">
                <div>चंद्र राशि: <strong>{groomRashi.hindi} ({groomRashi.lordHindi})</strong></div>
                <div>नक्षत्र: <strong>{groomNakshatra.hindi} (चरण {groom.nakshatraPada})</strong></div>
                <div>गण: <strong>{groomNakshatra.ganaHindi}</strong> • नाड़ी: <strong>{groomNakshatra.nadiHindi}</strong></div>
                <div>मांगलिक: <strong>{groom.isManglik ? 'हाँ (मांगलिक)' : 'नहीं (अमांगलिक)'}</strong></div>
              </div>
            </div>

            {/* Kanya (Bride) Profile */}
            <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-stone-800/50 border border-rose-200/50 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-900 block">
                कन्या (आयुष्मती) विवरण
              </span>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {bride.name || 'आयुष्मती कन्या'}
              </div>
              <div className="space-y-0.5 text-[11px] text-stone-700 dark:text-stone-300">
                <div>चंद्र राशि: <strong>{brideRashi.hindi} ({brideRashi.lordHindi})</strong></div>
                <div>नक्षत्र: <strong>{brideNakshatra.hindi} (चरण {bride.nakshatraPada})</strong></div>
                <div>गण: <strong>{brideNakshatra.ganaHindi}</strong> • नाड़ी: <strong>{brideNakshatra.nadiHindi}</strong></div>
                <div>मांगलिक: <strong>{bride.isManglik ? 'हाँ (मांगलिक)' : 'नहीं (अमांगलिक)'}</strong></div>
              </div>
            </div>
          </div>

          {/* 8 Kootas Table */}
          <div className="mt-3">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-amber-100/70 dark:bg-amber-950/70 text-amber-950 border-b border-amber-700/40">
                  <th className="py-1.5 px-2 font-bold w-[12%]">कूट क्र.</th>
                  <th className="py-1.5 px-2 font-bold w-[25%]">कूट नाम</th>
                  <th className="py-1.5 px-2 font-bold w-[15%]">अधिकतम गुण</th>
                  <th className="py-1.5 px-2 font-bold w-[18%]">प्राप्त गुण</th>
                  <th className="py-1.5 px-2 font-bold w-[30%]">शास्त्रीय निर्णय</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200/50 text-[11px]">
                {milanReport.kootas.map((k, idx) => {
                  const isFull = k.obtainedPoints === k.maxPoints;
                  const isZero = k.obtainedPoints === 0;
                  return (
                    <tr key={k.koota}>
                      <td className="py-1 px-2 font-mono">{idx + 1}</td>
                      <td className="py-1 px-2 font-semibold text-stone-900 dark:text-stone-100">{k.koota}</td>
                      <td className="py-1 px-2 font-mono">{k.maxPoints}</td>
                      <td className="py-1 px-2 font-mono font-bold text-amber-900 dark:text-amber-200">
                        {k.obtainedPoints}
                      </td>
                      <td className="py-1 px-2 text-[10px]">
                        {isFull ? 'शुभ व प्रशस्त' : isZero ? 'दोष विचारणीय' : 'मध्यम अनुकूल'}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-amber-50 dark:bg-stone-800 font-bold border-t-2 border-amber-800/50">
                  <td colSpan={2} className="py-2 px-2 text-sm text-stone-900 dark:text-stone-100">
                    सम्पूर्ण अष्टकूट महायोग
                  </td>
                  <td className="py-2 px-2 font-mono text-sm">{maxScore}</td>
                  <td className="py-2 px-2 font-mono text-base text-amber-900 dark:text-amber-300">
                    {score}
                  </td>
                  <td className="py-2 px-2 text-xs text-stone-800 dark:text-stone-200">
                    {hindiVerdict.grade}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Verdict Seal & Blessing Mantra */}
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 dark:bg-stone-800/80 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900 dark:text-stone-100">
                शास्त्रीय संस्तुति: <span className="text-amber-900">{hindiVerdict.grade}</span>
              </span>
              <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400">
                मांगलिक सामंजस्य: {manglikHarmony.status}
              </span>
            </div>

            <div className="text-center pt-2 border-t border-amber-200/60 space-y-1">
              <p className="text-xs font-serif italic text-amber-950 dark:text-amber-200 whitespace-pre-line leading-relaxed">
                "{VIVAH_BLESSING_MANTRA}"
              </p>
              <p className="text-[10px] text-stone-600 dark:text-stone-400">
                {VIVAH_BLESSING_MEANING}
              </p>
            </div>
          </div>

          {/* Seal & Verification Signature Footer */}
          <div className="mt-4 pt-3 border-t border-amber-700/40 flex items-center justify-between text-[10px] text-stone-500">
            <div>
              <p className="font-bold text-amber-950 dark:text-amber-200">सनातन ज्योतिष एवं पंचांग पीठ</p>
              <p>प्रमाणित वैदिक दृश्य काल गणना प्रणाली</p>
            </div>
            <div className="text-right">
              <p className="font-mono">sanatanghadi.org/matchmaking</p>
              <p>मुद्रण हेतु A4 अनुकूलित</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
