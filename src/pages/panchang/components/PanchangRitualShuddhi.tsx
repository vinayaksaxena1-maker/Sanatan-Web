/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangRitualShuddhi
 * Section: ७. निवास, चक्र एवं अनुष्ठान विचार (Ritual Shuddhi)
 * Box-free, pure typographic layout with clear Normal Headings
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangRitualShuddhi: React.FC<Props> = ({ data }) => {
  const { panchang, deepAnalysis, selectedDate } = data;
  const { shivaVaas, agniVaas, bhadra } = panchang;
  const { chandraVasa, rahuVasa, kumbhaChakra, netrama, jeevanama, homahuti, bhadraMicroBreakup } = deepAnalysis;

  const day = selectedDate.getDay();
  const dishaShoolMap = [
    { dir: 'पश्चिम', parihar: 'घी या पान खाकर प्रस्थान करें।' },
    { dir: 'पूर्व', parihar: 'दर्पण देखकर या तिल खाकर प्रस्थान करें।' },
    { dir: 'उत्तर', parihar: 'गुड़ खाकर प्रस्थान करें।' },
    { dir: 'उत्तर', parihar: 'तिल या धनिया खाकर प्रस्थान करें।' },
    { dir: 'दक्षिण', parihar: 'दही खाकर प्रस्थान करें।' },
    { dir: 'पश्चिम', parihar: 'जौ खाकर प्रस्थान करें।' },
    { dir: 'पूर्व', parihar: 'अदरक या उड़द खाकर प्रस्थान करें।' },
  ];
  const dishaShool = dishaShoolMap[day] || dishaShoolMap[0];

  const ritualItems = [
    {
      name: 'रुद्राभिषेक विचार (शिववास)',
      heading: `शिववास: ${shivaVaas?.residenceHindi || 'कैलाश पर'}`,
      status: shivaVaas?.isAuspicious ? '✓ अभिषेक शुभ' : '⚠ विचारणीय',
      statusColor: shivaVaas?.isAuspicious ? 'text-emerald-800' : 'text-amber-800',
      details: shivaVaas?.description || (shivaVaas?.isAuspicious
        ? 'आज भगवान शिव शुभ स्थान पर विराजमान हैं, रुद्राभिषेक व महामृत्युंजय अनुष्ठान अत्यंत फलदायी है।'
        : 'विशेष कामनापरक रुद्राभिषेक हेतु ज्योतिषी से परामर्श करें अथवा पार्थिव शिव पूजन करें।'),
    },
    {
      name: 'हवन / यज्ञ विचार (अग्निवास)',
      heading: `अग्निवास: ${agniVaas?.residenceHindi || 'पृथ्वी पर'}`,
      status: agniVaas?.isAuspicious ? '✓ हवन शुभ' : '✗ हवन वर्जित',
      statusColor: agniVaas?.isAuspicious ? 'text-emerald-800' : 'text-rose-800',
      details: agniVaas?.description || (agniVaas?.isAuspicious
        ? 'अग्नि देव पृथ्वी पर उपस्थित हैं, दैनिक अथवा विशेष हवन सुख-समृद्धि व फलदायक होगा।'
        : 'अग्नि का वास आकाश या पाताल में है; नित्य हवन को छोड़कर विशेष काम्य हवन में आहुति से बचें।'),
    },
    {
      name: 'भद्रा (विष्टि करण) स्थिति',
      heading: `भद्रा वास: ${bhadraMicroBreakup.vasHindi}`,
      status: bhadra?.active || bhadraMicroBreakup.active ? '⚠ भद्रा स्थिति' : '✓ भद्रा रहित',
      statusColor: bhadra?.active || bhadraMicroBreakup.active ? 'text-amber-800' : 'text-emerald-800',
      details: `भद्रा मुख (${bhadraMicroBreakup.mukhaWindow.start} – ${bhadraMicroBreakup.mukhaWindow.end}, २ घंटे: अत्यंत वर्जित) | भद्रा पुच्छ (${bhadraMicroBreakup.puchhaWindow.start} – ${bhadraMicroBreakup.puchhaWindow.end}, १ घंटा १२ मिनट: सर्वकार्य सिद्धिदायक)।`,
    },
    {
      name: 'दिशा शूल एवं परिहार',
      heading: `दिशाशूल: ${dishaShool.dir}`,
      status: 'यात्रा विचार',
      statusColor: 'text-[#b45309]',
      details: `आज ${dishaShool.dir} दिशा में यात्रा करने से बचें। परिहार / उपाय: ${dishaShool.parihar}`,
    },
    {
      name: 'चन्द्र वास एवं राहु वास',
      heading: `चन्द्र वास: ${chandraVasa.directionHindi} | राहु वास: ${rahuVasa.directionHindi}`,
      status: 'दिशा वास',
      statusColor: 'text-[#26150b]',
      details: `चन्द्रमा ${chandraVasa.directionHindi} में सम्मुख शुभ फलदायी हैं। राहु वास को यात्रा में सम्मुख रखने से बचें।`,
    },
    {
      name: 'होमाहुति, कुम्भ चक्र व नेत्र-जीवन',
      heading: `होमाहुति: ${homahuti.planetHindi} | कुम्भ चक्र: ${kumbhaChakra}`,
      status: 'अनुष्ठान चक्र',
      statusColor: 'text-emerald-800',
      details: `अधिष्ठाता: ${homahuti.planetHindi} | नेत्र: ${netrama} | जीवन: ${jeevanama}`,
    },
  ];

  return (
    <section className="font-serif py-4 border-b border-[#dec9ab]/70 space-y-4">
      {/* 1. Main Section Heading (No Box) */}
      <div className="border-b border-[#dec9ab]/50 pb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b]">
          ७. निवास, चक्र एवं अनुष्ठान विचार
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          रुद्राभिषेक, हवन, भद्रा शुद्धि, दिशा शूल एवं दिशा वास का शास्त्रीय निर्णय
        </p>
      </div>

      {/* 2. Clean Normal Headings & Rows (No Boxes) */}
      <div className="divide-y divide-[#dec9ab]/40">
        {ritualItems.map((item, idx) => (
          <div
            key={idx}
            className="py-3 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-4"
          >
            <div>
              <div className="text-xs font-semibold text-[#b45309] uppercase">
                {item.name}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#26150b] mt-0.5">
                {item.heading}
              </h3>
              <p className="text-xs text-[#735641] mt-0.5 leading-relaxed">
                {item.details}
              </p>
            </div>

            <div className="shrink-0 pt-1 md:pt-0">
              <span className={`text-xs font-bold ${item.statusColor}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PanchangRitualShuddhi;
