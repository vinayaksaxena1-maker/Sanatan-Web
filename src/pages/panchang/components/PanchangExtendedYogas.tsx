/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PanchangExtendedYogas
 * Section: ६. अतिरिक्त योग व सूक्ष्म काल (Special Yogas & Micro-Timings)
 * Box-free, pure typographic layout with clear Normal Headings
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import type { UsePanchangDataResult } from '../hooks/usePanchangData';

interface Props {
  data: UsePanchangDataResult;
}

export const PanchangExtendedYogas: React.FC<Props> = ({ data }) => {
  const { panchang, deepAnalysis } = data;
  const { anandadiYoga, shubhYogas, pushkarYog, varjyam, gandMool, dagdaTithi } = panchang;
  const { nishitaMuhurta, pratahSandhya, sayahnaSandhya, aadalVidaalList } = deepAnalysis;

  const yogaRows = [
    {
      name: 'आनन्दादि २८ महायोग',
      heading: anandadiYoga?.nameHindi || 'आनन्द योग',
      status: anandadiYoga?.isAuspicious ? '✓ शुभ योग' : '⚠ सामान्य / मध्यम',
      statusColor: anandadiYoga?.isAuspicious ? 'text-emerald-800' : 'text-amber-800',
      time: anandadiYoga?.endTime ? `समाप्ति: ${anandadiYoga.endTime}` : 'दिन पर्यन्त',
      details: anandadiYoga?.description || 'आनन्दादि चक्र का विशिष्ट योग जो दिन के कार्यों में सफलता या अवरोध दर्शाता है।',
    },
    {
      name: 'आडल व विडाल योग',
      heading: aadalVidaalList && aadalVidaalList.length > 0
        ? aadalVidaalList.map((av) => `${av.name} (${av.startTime} – ${av.endTime})`).join(' | ')
        : 'कोई विशेष आडल/विडाल योग नहीं',
      status: 'वार-नक्षत्र योग',
      statusColor: 'text-[#c2410c]',
      time: 'नक्षत्र चक्र काल',
      details: 'आडल योग शत्रु पराजय, आत्मबल व प्रतियोगिता में शुभ; विडाल योग में लेन-देन व यात्रा में सावधानी रखें।',
    },
    {
      name: 'सिद्धि व रवि योग',
      heading: shubhYogas && shubhYogas.length > 0
        ? shubhYogas.map((sy) => `${sy.hindiName} (${sy.start} – ${sy.end})`).join(' | ')
        : 'आज कोई विशेष सर्वार्थ सिद्धि या अमृत सिद्धि योग सक्रिय नहीं है',
      status: shubhYogas && shubhYogas.length > 0 ? '✓ सिद्धिप्रद काल' : 'सामान्य काल',
      statusColor: shubhYogas && shubhYogas.length > 0 ? 'text-emerald-800' : 'text-[#735641]',
      time: shubhYogas && shubhYogas.length > 0 ? shubhYogas[0].start : '--',
      details: 'सर्वार्थ सिद्धि एवं अमृत सिद्धि योग समस्त नए कार्यों, खरीदारी व निवेश में शत-प्रतिशत सफलता प्रदान करते हैं।',
    },
    {
      name: 'पुष्कर योग विचार',
      heading: pushkarYog?.active ? pushkarYog.hindiName : 'द्विपुष्कर / त्रिपुष्कर योग सक्रिय नहीं',
      status: pushkarYog?.active ? pushkarYog.hindiName : 'सक्रिय नहीं',
      statusColor: pushkarYog?.active ? 'text-purple-800 font-bold' : 'text-[#735641]',
      time: pushkarYog?.active ? 'विशेष तिथि-वार योग' : '--',
      details: pushkarYog?.description || 'पुष्कर योग में किए गए शुभ कार्य २ या ३ गुना फल प्रदान करते हैं, ऋण लेन-देन वर्जित है।',
    },
    {
      name: 'निशीथ मुहूर्त (मध्यरात्रि)',
      heading: `${nishitaMuhurta.start} – ${nishitaMuhurta.end}`,
      status: 'महानिशीथ काल',
      statusColor: 'text-indigo-900',
      time: `${nishitaMuhurta.start} से`,
      details: 'तांत्रिक साधना, महालक्ष्मी पूजन, निशा पूजा व कालरात्रि आराधना का मुख्य समय।',
    },
    {
      name: 'सन्ध्या काल (उभय सन्ध्या)',
      heading: `प्रातः: ${pratahSandhya.start} – ${pratahSandhya.end} | सायं: ${sayahnaSandhya.start} – ${sayahnaSandhya.end}`,
      status: 'सन्ध्योपासन काल',
      statusColor: 'text-[#b45309]',
      time: 'उभय संधिकाल',
      details: 'गायत्री जप, सूर्य तर्पण एवं दैनिक सन्ध्योपासन हेतु शास्त्रोक्त काल।',
    },
    {
      name: 'वर्ज्यम् काल (त्याज्य समय)',
      heading: varjyam && varjyam.length > 0 ? `${varjyam[0].start} – ${varjyam[0].end}` : 'आज कोई वर्ज्यम् काल नहीं है',
      status: varjyam && varjyam.length > 0 ? '⚠ त्याज्य काल' : '✓ निर्दोष',
      statusColor: varjyam && varjyam.length > 0 ? 'text-rose-800' : 'text-emerald-800',
      time: varjyam && varjyam.length > 0 ? varjyam[0].start : '--',
      details: 'नक्षत्र का विष घटी काल — इस अवधि में शुभ कार्य, शल्य चिकित्सा व नवीन शुरुआत न करें।',
    },
    {
      name: 'गंडमूल व दग्ध तिथि विचार',
      heading: `${gandMool?.isGandMool ? `गंडमूल नक्षत्र: ${gandMool.nakshatraHindiName}` : '✓ गंडमूल दोष नहीं'} | ${dagdaTithi?.isDagda ? '⚠ दग्ध तिथि' : '✓ तिथि निर्दोष'}`,
      status: gandMool?.isGandMool ? '⚠ गंडमूल' : '✓ निर्दोष',
      statusColor: gandMool?.isGandMool ? 'text-amber-800' : 'text-emerald-800',
      time: 'दैनिक शुद्धि',
      details: 'गंडमूल नक्षत्र में जन्म होने पर शांति आवश्यक होती है। दग्ध तिथि में विवाह आदि मांगलिक कार्य त्याज्य हैं।',
    },
  ];

  return (
    <section className="font-serif py-4 border-b border-[#dec9ab]/70 space-y-4">
      {/* 1. Main Section Heading (No Box) */}
      <div className="border-b border-[#dec9ab]/50 pb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26150b]">
          ६. अतिरिक्त योग व सूक्ष्म काल
        </h2>
        <p className="text-xs sm:text-sm text-[#735641] mt-1">
          आनन्दादि २८ महायोग, आडल-विडाल, सिद्धि व रवि योग, निशीथ एवं सन्ध्या काल
        </p>
      </div>

      {/* 2. Clean Normal Headings & Rows (No Boxes) */}
      <div className="divide-y divide-[#dec9ab]/40">
        {yogaRows.map((item, idx) => (
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

            <div className="flex items-center gap-4 text-xs shrink-0 pt-1 md:pt-0">
              {item.time !== '--' && (
                <div>
                  <span className="text-[#735641]">काल: </span>
                  <span className="font-bold font-mono text-[#c2410c]">{item.time}</span>
                </div>
              )}
              <div className="border-l border-[#dec9ab]/60 pl-3">
                <span className={`font-semibold ${item.statusColor}`}>{item.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PanchangExtendedYogas;
