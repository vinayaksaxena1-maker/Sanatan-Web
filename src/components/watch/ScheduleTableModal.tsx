/**
 * Sanatan Web (सनातन घड़ी)
 * Component: ScheduleTableModal
 * Full 16-slot Choghadiya & 24-slot Hora Vedic Schedule Modal
 * Clean-room React 19, Tailwind CSS, Pure Web standard
 */

import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles } from 'lucide-react';
import type { ChoghadiyaInterval, HoraInterval } from '../../engine/types';
import { getChoghadiyaStatusInfo, getChoghadiyaAdvice, getHoraPracticalNuance } from './LiveMuhuratWatchCard';

export interface ScheduleTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'choghadiya' | 'hora';
  choghadiyaList: ChoghadiyaInterval[];
  activeChoghadiyaIndex: number;
  horaList: HoraInterval[];
  activeHora: HoraInterval | null;
}

export const ScheduleTableModal: React.FC<ScheduleTableModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'choghadiya',
  choghadiyaList,
  activeChoghadiyaIndex,
  horaList,
  activeHora,
}) => {
  const [activeTab, setActiveTab] = useState<'choghadiya' | 'hora'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog Card */}
      <div 
        className="w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-[#FFFDF9] via-[#FAF6F0] to-[#F5ECE0] border-2 border-[#D4AF37]/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden font-serif text-[#26150B]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-schedule-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#DEC9AB]/70 bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-[#C2410C] text-white flex items-center justify-center text-sm font-bold shadow-xs">
              ॐ
            </span>
            <div>
              <h3 id="modal-schedule-title" className="text-base sm:text-lg font-bold text-[#26150B]">
                वैदिक काल सारिणी (Vedic Muhurat Schedule)
              </h3>
              <p className="text-[11px] text-[#78350F]/80 font-sans">
                दैनिक १६ चौघड़िया एवं २४ होरा चक्र का पूर्ण विवरण
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-orange-100/70 hover:bg-orange-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer border border-[#DEC9AB]/60"
            title="बंद करें"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-2 bg-[#F2E8DC]/60 border-b border-[#DEC9AB]/60 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('choghadiya')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'choghadiya'
                ? 'bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white shadow-sm'
                : 'bg-white/60 text-[#78350F] hover:bg-white/90'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>चौघड़िया तालिका (१६ काल)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hora')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'hora'
                ? 'bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white shadow-sm'
                : 'bg-white/60 text-[#78350F] hover:bg-white/90'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>२४ होरा चक्र (ग्रह काल)</span>
          </button>
        </div>

        {/* Modal Body / Table Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'choghadiya' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#78350F] font-sans pb-1 border-b border-[#DEC9AB]/50">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  दिन एवं रात्रि के १६ चौघड़िया
                </span>
                <span className="text-[10px]">८ दिन + ८ रात्रि</span>
              </div>

              <div className="divide-y divide-[#DEC9AB]/40 rounded-2xl border border-[#DEC9AB]/60 bg-white/70 overflow-hidden text-xs">
                {choghadiyaList.map((slot, idx) => {
                  const isActive = idx === activeChoghadiyaIndex;
                  const status = getChoghadiyaStatusInfo(slot.type);
                  const isDay = slot.isDay;
                  return (
                    <div
                      key={`chog-slot-${idx}`}
                      className={`p-3 flex items-start sm:items-center justify-between gap-3 transition-colors ${
                        isActive ? 'bg-amber-100/70 border-l-4 border-l-[#C2410C]' : 'hover:bg-amber-50/40'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="text-base select-none mt-0.5">{status.dot}</span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-[#26150B]">
                              {slot.hindiName || slot.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200/50 text-[#78350F] font-bold">
                              {isDay ? '☀️ दिन' : '🌙 रात्रि'}
                            </span>
                            {isActive && (
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#EA580C] text-white font-bold animate-pulse">
                                सक्रिय अभी
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#735641] font-serif mt-0.5">
                            {getChoghadiyaAdvice(slot.type)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-mono text-xs font-bold text-[#C2410C]">
                          {slot.startTime} – {slot.endTime}
                        </div>
                        <span className={`inline-block mt-0.5 text-[9.5px] px-2 py-0.5 rounded-full border font-bold ${status.badgeBg}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#78350F] font-sans pb-1 border-b border-[#DEC9AB]/50">
                <span className="font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600" />
                  २४-घंटे होरा तालिका (प्रत्येक ग्रह का १-घंटे का काल)
                </span>
                <span className="text-[10px]">१२ दिन + १२ रात्रि</span>
              </div>

              <div className="divide-y divide-[#DEC9AB]/40 rounded-2xl border border-[#DEC9AB]/60 bg-white/70 overflow-hidden text-xs">
                {horaList.map((h, idx) => {
                  const isActive = activeHora && (activeHora.number === h.number || activeHora.startTime === h.startTime);
                  const isAuspicious = h.quality === 'Auspicious';
                  const isAshubh = h.quality === 'Inauspicious';
                  const dot = isAuspicious ? '🟢' : isAshubh ? '🔴' : '🟡';
                  const badgeClass = isAuspicious 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : isAshubh 
                      ? 'bg-rose-100 text-rose-800 border-rose-300' 
                      : 'bg-amber-100 text-amber-800 border-amber-300';

                  return (
                    <div
                      key={`hora-slot-${idx}`}
                      className={`p-3 flex items-start sm:items-center justify-between gap-3 transition-colors ${
                        isActive ? 'bg-amber-100/70 border-l-4 border-l-[#C2410C]' : 'hover:bg-amber-50/40'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="text-base select-none mt-0.5">{dot}</span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-[#26150B]">
                              {h.lordHindi || h.lord} होरा
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200/50 text-[#78350F] font-bold">
                              {h.isDay ? '☀️ दिन' : '🌙 रात्रि'} (#{h.number})
                            </span>
                            {isActive && (
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#EA580C] text-white font-bold animate-pulse">
                                सक्रिय अभी
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#735641] font-serif mt-0.5">
                            {getHoraPracticalNuance(h.lordHindi, h.lord)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-mono text-xs font-bold text-[#C2410C]">
                          {h.startTime} – {h.endTime}
                        </div>
                        <span className={`inline-block mt-0.5 text-[9.5px] px-2 py-0.5 rounded-full border font-bold ${badgeClass}`}>
                          {h.quality === 'Auspicious' ? 'शुभ' : h.quality === 'Inauspicious' ? 'अशुभ' : 'सामान्य'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[#DEC9AB]/70 bg-white/70 flex items-center justify-between text-xs text-[#78350F]">
          <span className="font-sans text-[11px]">
            * सूर्योदय एवं सूर्यास्त अनुसार स्थानीय अक्षांश पर आधारित सटीक कालमान।
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:brightness-110 text-white font-bold transition-all cursor-pointer shadow-xs"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
