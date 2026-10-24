import React from 'react';

interface GrahaItem {
  name: string;
  alias: string;
  degree: string;
  rashi: string;
  pada: string;
  statusBadge?: { label: string; bg: string; text: string };
  isHighlight?: boolean;
}

const GRAHAS: GrahaItem[] = [
  { name: 'सूर्य', alias: 'रवि', degree: "२८°४१'", rashi: 'मीन राशि', pada: 'रेवती • पद ४' },
  { name: 'चन्द्र', alias: 'सोम', degree: "१४°१२'", rashi: 'कन्या राशि', pada: 'हस्त • पद २' },
  { name: 'मंगल', alias: 'भौम', degree: "०६°२२'", rashi: 'कुंभ राशि', pada: 'धनिष्ठा • पद ४' },
  {
    name: 'बुध',
    alias: 'सौम्य',
    degree: "०२°१८'",
    rashi: 'मेष राशि',
    pada: 'अश्विनी • वक्री',
    statusBadge: { label: 'वक्री', bg: 'bg-red-100', text: 'text-red-700' },
    isHighlight: true
  },
  { name: 'गुरु', alias: 'बृहस्पति', degree: "२७°५४'", rashi: 'वृषभ राशि', pada: 'रोहिणी • पद ३' },
  {
    name: 'शुक्र',
    alias: 'भार्गव',
    degree: "१८°३०'",
    rashi: 'मीन राशि',
    pada: 'रेवती • परम उच्च',
    statusBadge: { label: 'उच्च', bg: 'bg-emerald-100', text: 'text-emerald-800' }
  },
  {
    name: 'शनि',
    alias: 'मंद',
    degree: "१९°०५'",
    rashi: 'कुंभ राशि',
    pada: 'शतभिषा • पद १',
    statusBadge: { label: 'स्वगृही', bg: 'bg-amber-100', text: 'text-amber-800' }
  },
  { name: 'राहु', alias: 'तम', degree: "१६°४२'", rashi: 'मीन राशि', pada: 'उ० भाद्रपद • पद ४' },
  { name: 'केतु', alias: 'ध्वज', degree: "१६°४२'", rashi: 'कन्या राशि', pada: 'हस्त • पद २' }
];

export const PortalNavagraha: React.FC = () => {
  return (
    <section className="glass-panel rounded-3xl p-6 space-y-4 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
          <div>
            <h3 className="text-lg font-bold text-[#26150b]">नवग्रह स्पष्ट स्थिति एवं संचरण (Navagraha Sthiti)</h3>
            <p className="text-xs text-[#735641]">नासा जेपीएल एवं द्रिक पंचांग आधारित वास्तविक खगोलीय अंश</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#735641] font-semibold">
          <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-[#dec9ab] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>उच्च ग्रह
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-[#dec9ab] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>स्वक्षेत्रीय
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-[#dec9ab] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>वक्री ग्रह
          </span>
        </div>
      </div>

      {/* 9 Graha Bento Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
        {GRAHAS.map((g) => (
          <div
            key={g.name}
            className={`glass-inner p-3 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all ${
              g.statusBadge?.label === 'वक्री'
                ? 'bg-red-50/50 border-red-200'
                : g.statusBadge?.label === 'उच्च'
                ? 'bg-emerald-50/50 border-emerald-200'
                : g.statusBadge?.label === 'स्वगृही'
                ? 'bg-amber-50/50 border-amber-200'
                : 'hover:border-[#ea580c]/50 bg-white/80 border-[#dec9ab]/60'
            }`}
          >
            {g.statusBadge && (
              <div
                className={`absolute top-0 right-0 px-1 py-0.2 rounded-bl text-[8px] font-bold ${g.statusBadge.bg} ${g.statusBadge.text}`}
              >
                {g.statusBadge.label}
              </div>
            )}
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-bold ${
                  g.name === 'सूर्य'
                    ? 'text-[#c2410c]'
                    : g.name === 'मंगल'
                    ? 'text-[#ea580c]'
                    : g.name === 'बुध'
                    ? 'text-red-700'
                    : g.name === 'गुरु'
                    ? 'text-[#b8860b]'
                    : g.name === 'शुक्र'
                    ? 'text-emerald-800'
                    : 'text-[#26150b]'
                }`}
              >
                {g.name}
              </span>
              <span className="text-[10px] text-[#735641]">{g.alias}</span>
            </div>
            <div className="my-1.5">
              <div className="text-base font-bold text-[#26150b] font-mono">{g.degree}</div>
              <div className="text-[11px] text-[#735641]">{g.rashi}</div>
            </div>
            <span className="text-[10px] text-[#9c806f]">{g.pada}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
