/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangLagnaShuddhi.tsx
 * Section: मुहूर्त व लग्न शुद्धि (Lagna & Muhurta Depth)
 * 12 उदय लग्न तालिका, पंचक रहित मुहूर्त स्थिति, चन्द्रबल एवं ताराबल
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangLagnaShuddhi: React.FC<Props> = ({ data }) => {
  const { deepAnalysis } = data;
  const { udayaLagnas, chandrabalamList, tarabalamSummary } = deepAnalysis;
  const [activeTab, setActiveTab] = useState<'lagna' | 'chandrabala' | 'tarabala'>('lagna');

  return (
    <section className="bg-gradient-to-br from-[#fffdf8] via-[#fefaf2] to-[#fbf5e6] rounded-3xl p-6 sm:p-8 border border-[#d97706]/25 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#d97706]/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#d97706] to-[#b45309] text-white flex items-center justify-center font-bold text-xl shadow-md">
            ⚖️
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#451a03] font-serif tracking-wide">
              मुहूर्त व लग्न शुद्धि (Lagna & Muhurta Depth)
            </h2>
            <p className="text-xs sm:text-sm text-[#78350f]/80">
              १२ उदय लग्न, पंचक रहित मुहूर्त, चन्द्रबल एवं ताराबल परीक्षण
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-[#f5e6cc]/60 rounded-xl border border-[#d97706]/20 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('lagna')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'lagna'
                ? 'bg-[#ea580c] text-white shadow-sm'
                : 'text-[#78350f] hover:bg-white/60'
            }`}
          >
            उदय लग्न व पंचक
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chandrabala')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'chandrabala'
                ? 'bg-[#ea580c] text-white shadow-sm'
                : 'text-[#78350f] hover:bg-white/60'
            }`}
          >
            चन्द्रबल (१२ राशि)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tarabala')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'tarabala'
                ? 'bg-[#ea580c] text-white shadow-sm'
                : 'text-[#78350f] hover:bg-white/60'
            }`}
          >
            ताराबल (२७ नक्षत्र)
          </button>
        </div>
      </div>

      {/* Tab 1: Udaya Lagna & Panchaka Rahita */}
      {activeTab === 'lagna' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#78350f]">
            <span>
              दैनिक १२ लग्नों का उदय काल एवं पंचक रहित शुद्धि स्थिति (शास्त्रीय सूत्र: तिथि + वार + नक्षत्र + लग्न % ९):
            </span>
            <span className="font-semibold text-emerald-800 hidden sm:inline">
              ✓ हरित: शुभ निष्पंचक | ⚠ लाल/पीत: दोष पंचक
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {udayaLagnas.map((lagna, idx) => {
              const isShubh = lagna.isPanchakaShubh;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isShubh
                      ? 'bg-emerald-50/60 border-emerald-500/25 hover:bg-emerald-50'
                      : 'bg-amber-50/50 border-amber-500/25 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold font-serif text-sm text-[#451a03]">
                      {lagna.rashiHindi} लग्न ({lagna.rashiEng})
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isShubh
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {lagna.panchakaType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#78350f] mt-1">
                    <span className="font-mono font-medium bg-white/80 px-2 py-0.5 rounded border border-[#d97706]/15">
                      {lagna.startTime} – {lagna.endTime}
                    </span>
                    <span className="text-[11px] text-right truncate max-w-[130px]" title={lagna.panchakaDesc}>
                      {lagna.panchakaDesc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Chandrabalam */}
      {activeTab === 'chandrabala' && (
        <div className="space-y-4">
          <p className="text-xs text-[#78350f]">
            वर्तमान चन्द्रमा के गोचर के अनुसार १२ राशियों के लिए चन्द्रबल (शुभ/अनिष्ट शुद्धि):
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {chandrabalamList.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  item.isShubh
                    ? 'bg-emerald-50/70 border-emerald-500/25 text-emerald-950'
                    : 'bg-rose-50/70 border-rose-500/25 text-rose-950'
                }`}
              >
                <div>
                  <span className="font-bold text-sm block text-[#451a03] font-serif">
                    {item.rashi} राशि
                  </span>
                  <span className="text-[11px] block mt-0.5 font-medium">
                    {item.status}
                  </span>
                </div>
                <span className={`text-base font-bold ${item.isShubh ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {item.isShubh ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Tarabalam */}
      {activeTab === 'tarabala' && (
        <div className="space-y-4">
          <p className="text-xs text-[#78350f]">
            आज के नक्षत्र के अनुसार जन्म नक्षत्रों के ९ तारा भेद (सम्पत्, क्षेम, साधक, मित्र, अति-मित्र शुभ हैं):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-500/30">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                शुभ ताराबल (Auspicious Taras)
              </h4>
              <div className="flex flex-wrap gap-2">
                {tarabalamSummary.shubhTaras.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-emerald-600/25 text-emerald-900 shadow-2xs"
                  >
                    ✓ {t}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-emerald-800/80 mt-3">
                इन ताराओं में जन्म लेने वाले जातकों के लिए आज का दिन कार्यसिद्धि, निवेश, व नवीन शुरुआत हेतु उत्तम है।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-500/30">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                सावधानी ताराबल (Inauspicious Taras)
              </h4>
              <div className="flex flex-wrap gap-2">
                {tarabalamSummary.ashubhTaras.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-amber-600/25 text-amber-900 shadow-2xs"
                  >
                    ⚠ {t}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-amber-800/80 mt-3">
                विपत्, प्रत्यरि एवं वध तारा में जोखिम भरे निर्णय, ऋण लेन-देन या विवाद से बचें।
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
