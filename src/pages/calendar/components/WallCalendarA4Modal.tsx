/**
 * Sanatan Web (सनातन घड़ी)
 * Component: WallCalendarA4Modal
 * A4 Printable Annual Hindu Vrat & Ekadashi Wall Calendar Matrix (विक्रम संवत २०८१-२०८२)
 * Strict < 300 lines modular standard
 */

import React from 'react';
import { X, Printer } from 'lucide-react';
import { ANNUAL_12_MONTHS_DATA } from '../hooks/calendarPresets';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';

interface WallCalendarA4ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WallCalendarA4Modal: React.FC<WallCalendarA4ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="a4-calendar-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-start justify-center p-2 sm:p-6 pt-14 pb-12 sm:pt-16"
    >
      {/* Top Floating Control Bar (Hidden during print) */}
      <div className="fixed top-4 right-4 sm:right-8 z-60 flex items-center gap-2 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-lg cursor-pointer transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>A4 मुद्रण / PDF सहेजें</span>
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

      {/* A4 Printable Sheet Container */}
      <div className="relative max-w-[920px] w-full bg-[#fdfbf7] dark:bg-stone-900 text-stone-900 dark:text-stone-100 p-5 sm:p-8 rounded-2xl shadow-2xl border-2 border-amber-600/30 print:border-none print:shadow-none print:p-0 print:max-w-none print:bg-white print:text-black">
        {/* Dual Ornamental Borders */}
        <div className="border border-amber-700/50 p-4 rounded-xl relative">
          {/* 4 Corner Brass Swastik Ornaments */}
          <span className="absolute top-1 left-1.5 text-xs text-amber-700 select-none">卐</span>
          <span className="absolute top-1 right-1.5 text-xs text-amber-700 select-none">卐</span>
          <span className="absolute bottom-1 left-1.5 text-xs text-amber-700 select-none">卐</span>
          <span className="absolute bottom-1 right-1.5 text-xs text-amber-700 select-none">卐</span>

          {/* Header Title Section */}
          <div className="text-center space-y-1 pb-3 border-b-2 border-amber-800/40">
            <p className="text-[11px] font-serif font-bold text-amber-800 dark:text-amber-400 tracking-widest uppercase">
              ।। श्री गणेशाय नमः ।। श्री लक्ष्मीनारायणाय नमः ।।
            </p>
            <div className="flex items-center justify-center gap-2">
              <VedicIcon3D name="kalash" size={24} className="print:hidden" />
              <h2
                id="a4-calendar-title"
                className="text-xl sm:text-2xl font-bold font-serif text-amber-950 dark:text-amber-100 tracking-wide"
              >
                सनातन दीवार पंचांग एवं सम्पूर्ण १२ मास व्रत निर्णय सारणी
              </h2>
            </div>
            <p className="text-xs font-serif text-stone-700 dark:text-stone-300">
              विक्रम संवत २०८१-२०८२ • शक संवत १९४६ • प्रमाण: धर्मसिंधु एवं निर्णयसिंधु
            </p>
          </div>

          {/* 12-Month Table */}
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-amber-100/70 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 border-b border-amber-700/40">
                  <th className="py-2 px-2 font-serif font-bold w-[16%]">मास (हिन्दू/अंग्रेजी)</th>
                  <th className="py-2 px-2 font-serif font-bold w-[28%]">एकादशी व्रत एवं पारण समय</th>
                  <th className="py-2 px-2 font-serif font-bold w-[34%]">प्रमुख पर्व व पावन त्योहार</th>
                  <th className="py-2 px-2 font-serif font-bold w-[11%]">प्रदोष / संकष्टी</th>
                  <th className="py-2 px-2 font-serif font-bold w-[11%]">पूर्ण./अमावस्या</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200/50 dark:divide-amber-900/40">
                {ANNUAL_12_MONTHS_DATA.map((row) => (
                  <tr
                    key={row.monthIndex}
                    className="hover:bg-amber-50/50 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    {/* Month Name */}
                    <td className="py-2 px-2 align-top">
                      <span className="font-bold text-amber-900 dark:text-amber-300 font-serif block">
                        {row.hindiMasa}
                      </span>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400">
                        ({row.englishMonths})
                      </span>
                    </td>

                    {/* Ekadashi & Parana */}
                    <td className="py-2 px-2 align-top space-y-1">
                      <div>
                        <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                          {row.ekadashi1.name}:
                        </span>{' '}
                        <span className="text-[10px] text-stone-600 dark:text-stone-400 font-mono">
                          पारण {row.ekadashi1.parana}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                          {row.ekadashi2.name}:
                        </span>{' '}
                        <span className="text-[10px] text-stone-600 dark:text-stone-400 font-mono">
                          पारण {row.ekadashi2.parana}
                        </span>
                      </div>
                    </td>

                    {/* Festivals */}
                    <td className="py-2 px-2 align-top text-stone-800 dark:text-stone-200 leading-relaxed text-[11px]">
                      {row.festivals}
                    </td>

                    {/* Pradosh & Sankashti */}
                    <td className="py-2 px-2 align-top text-[10px] text-stone-700 dark:text-stone-300">
                      <div>
                        <span className="font-medium text-orange-700 dark:text-orange-400">प्र:</span>{' '}
                        {row.pradosh}
                      </div>
                      <div>
                        <span className="font-medium text-amber-700 dark:text-amber-400">सं:</span>{' '}
                        {row.sankashti}
                      </div>
                    </td>

                    {/* Purnima & Amavasya */}
                    <td className="py-2 px-2 align-top text-[10px] text-stone-700 dark:text-stone-300">
                      <div>
                        <span className="font-medium text-amber-700 dark:text-amber-400">पूर्णि:</span>{' '}
                        {row.purnima}
                      </div>
                      <div>
                        <span className="font-medium text-stone-600 dark:text-stone-400">अमा:</span>{' '}
                        {row.amavasya}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Sanctity Note */}
          <div className="mt-4 pt-3 border-t border-amber-700/40 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600 dark:text-stone-400">
            <p className="font-serif italic text-amber-900 dark:text-amber-300">
              ।। सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ।।
            </p>
            <p className="font-mono text-[10px]">
              मुद्रण हेतु A4 Portrait अनुकूलित • सनातन घड़ी (sanatanghadi.org)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
