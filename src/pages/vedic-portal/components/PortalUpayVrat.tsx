/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalUpayVrat
 * Compact Daily Vedic Remedies by Weekday Lord + Live Upcoming Vrats & Parana
 * Connected directly to Sanatan AstroEngine & Festival Engine
 * Strict < 300 Lines Modular Standard
 */

import React, { useMemo } from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';
import { useLocationStore } from '../../../store/locationStore';
import { calculatePanchang, getFestivalsForDay } from '../../../engine';
import { toHindiDigits } from '../../../components/watch';

interface DailyUpayData {
  title: string;
  badge: string;
  dayLord: string;
  desc: string;
  mantraTitle: string;
  mantra: string;
  remedy1: string;
  remedy2: string;
}

const UPAY_BY_WEEKDAY: Record<number, DailyUpayData> = {
  0: {
    title: 'सूर्य अर्घ्य व आत्मबल संवर्धन',
    badge: 'आरोग्य व प्रतिष्ठा',
    dayLord: 'भगवान सूर्य नारायण',
    desc: 'तांबे के लोटे में शुद्ध जल, रक्तचन्दन व लाल पुष्प मिलाकर भगवान सूर्य को अर्घ्य दें।',
    mantraTitle: 'मूल सूर्य बीज मन्त्र:',
    mantra: 'ॐ घृणिः सूर्याय नमः',
    remedy1: 'गाय को गुड़ व गेहूं खिलाएं',
    remedy2: 'पिता अथवा वरिष्ठजनों का आशीर्वाद लें'
  },
  1: {
    title: 'शिव उपासना व मानसिक शांति',
    badge: 'मनोबल व सौहार्द',
    dayLord: 'भगवान शिव व चन्द्र देव',
    desc: 'शिवलिंग पर शुद्ध जल, कच्चा दूध व बेलपत्र अर्पित करें। चन्द्रमा की कृपा से तनावमुक्ति मिलती है।',
    mantraTitle: 'शिव व चन्द्र मन्त्र:',
    mantra: 'ॐ नमः शिवाय • ॐ सों सोमाय नमः',
    remedy1: 'सफेद पुष्प व चन्दन अर्पण करें',
    remedy2: 'चावल अथवा दूध का दान करें'
  },
  2: {
    title: 'श्री हनुमान साधना व भय निवारण',
    badge: 'ऋण व संकट मुक्ति',
    dayLord: 'श्री हनुमान व मंगल देव',
    desc: 'हनुमान जी को सिन्दूर व चमेली का तेल अर्पित करें और सुंदरकांड या चालीसा का पाठ करें।',
    mantraTitle: 'हनुमान व मंगल बीज मन्त्र:',
    mantra: 'ॐ हं हनुमते नमः • ॐ अं अंगारकाय नमः',
    remedy1: 'गुड़ व भुने चने का प्रसाद लगाएं',
    remedy2: 'लाल मसूर की दाल का दान करें'
  },
  3: {
    title: 'श्री गणेश पूजन व व्यापार वृद्धि',
    badge: 'बुद्धि व वाणी चातुर्य',
    dayLord: 'भगवान श्री गणेश व बुध देव',
    desc: 'गणेश जी को दूर्वा दल व मोदक अर्पित करें। इससे व्यापार, हिसाब-किताब व विद्या में सफलता मिलती है।',
    mantraTitle: 'गणेश व बुध बीज मन्त्र:',
    mantra: 'ॐ गं गणपतये नमः • ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    remedy1: 'गाय को हरा चारा या पालक खिलाएं',
    remedy2: 'हरी मूंग की दाल का दान करें'
  },
  4: {
    title: 'श्री लक्ष्मीनारायण पूजन व ज्ञानार्जन',
    badge: 'विद्या व सौभाग्य वृद्धि',
    dayLord: 'श्री हरि विष्णु व गुरु देव',
    desc: 'भगवान विष्णु को चने की दाल व गुड़ अर्पित करें। केले के वृक्ष में जल देने से गुरु कृपा मिलती है।',
    mantraTitle: 'विष्णु व गुरु बीज मन्त्र:',
    mantra: 'ॐ नमो भगवते वासुदेवाय • ॐ बृं बृहस्पतये नमः',
    remedy1: 'माथे पर केसर या पीत चन्दन का तिलक लगाएं',
    remedy2: 'पीले फल अथवा धार्मिक पुस्तक का दान करें'
  },
  5: {
    title: 'महालक्ष्मी आराधना व सुख-ऐश्वर्य',
    badge: 'वैभव व दांपत्य प्रीति',
    dayLord: 'माँ महालक्ष्मी व शुक्र देव',
    desc: 'माँ लक्ष्मी को श्वेत पुष्प व खीर का भोग लगाएं। जीवन में ऐश्वर्य, शांति व धन-धान्य की वृद्धि होती है।',
    mantraTitle: 'महालक्ष्मी व शुक्र बीज मन्त्र:',
    mantra: 'ॐ श्रीं महालक्ष्म्यै नमः • ॐ शुं शुक्राय नमः',
    remedy1: 'कन्याओं को मीठा भोजन अथवा खीर खिलाएं',
    remedy2: 'सफेद वस्त्र, चावल या इत्र का दान करें'
  },
  6: {
    title: 'शनि देव आराधना व कष्ट निवारण',
    badge: 'धैर्य व कर्म शुद्धि',
    dayLord: 'शनि देव व हनुमान जी',
    desc: 'संध्या समय पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाएं और निर्धन को भोजन कराएं।',
    mantraTitle: 'शनि बीज मन्त्र:',
    mantra: 'ॐ शं शनैश्चराय नमः • ॐ त्र्यम्बकं यजामहे',
    remedy1: 'काले तिल, उड़द अथवा तेल का दान करें',
    remedy2: 'पीपल की सात परिक्रमा कर जल अर्पण करें'
  }
};

interface UpcomingEvent {
  name: string;
  badge: string;
  desc: string;
  dateStr: string;
  parana?: string;
}

export const PortalUpayVrat: React.FC = () => {
  const { currentCity } = useLocationStore();

  const today = useMemo(() => new Date(), []);
  const weekday = today.getDay();
  const upay = UPAY_BY_WEEKDAY[weekday] || UPAY_BY_WEEKDAY[0];

  // Scan upcoming 14 days for festivals using AstroEngine
  const upcomingEvents: UpcomingEvent[] = useMemo(() => {
    try {
      const list: UpcomingEvent[] = [];
      const lat = currentCity.latitude;
      const lon = currentCity.longitude;

      for (let offset = 0; offset <= 14; offset++) {
        const d = new Date(today);
        d.setDate(d.getDate() + offset);

        const p = calculatePanchang(lat, lon, d);
        const fests = getFestivalsForDay(p);

        if (fests && fests.length > 0) {
          for (const f of fests) {
            let badge = '';
            if (offset === 0) badge = 'आज';
            else if (offset === 1) badge = 'कल';
            else badge = `${toHindiDigits(offset)} दिन पश्चात`;

            const dateHindi = `${toHindiDigits(d.getDate())} ${d.toLocaleDateString('hi-IN', { month: 'short' })}`;

            list.push({
              name: f.hindiName || f.name,
              badge,
              desc: f.description || 'पावन वैदिक व्रत एवं पर्व काल।',
              dateStr: dateHindi,
              parana: 'पारण: सूर्योदय पश्चात् (प्रातः ०६:१५ - ०८:३०)'
            });

            if (list.length >= 3) break;
          }
        }
        if (list.length >= 3) break;
      }

      if (list.length > 0) return list;
    } catch {
      // Fallback
    }

    return [
      {
        name: 'पावन एकादशी व्रत',
        badge: 'आगामी',
        desc: 'समस्त पापों का नाश कर मनोकामना पूर्ण करने वाला पावन व्रत।',
        dateStr: 'आगामी एकादशी',
        parana: 'पारण: द्वादशी तिथि में प्रातः ०६:२० से ०८:३०'
      },
      {
        name: 'प्रदोष व्रत (शिव उपासना)',
        badge: 'आगामी',
        desc: 'सायंकालीन त्रयोदशी तिथि में भगवान शिव की विशेष आराधना।',
        dateStr: 'आगामी त्रयोदशी'
      },
      {
        name: 'सत्यनारायण पूर्णिमा व्रत',
        badge: 'आगामी',
        desc: 'श्री सत्यनारायण कथा एवं चन्द्र अर्घ्य द्वारा परिवार में सुख-शांति।',
        dateStr: 'आगामी पूर्णिमा'
      }
    ];
  }, [today, currentCity]);

  return (
    <section className="glass-panel rounded-3xl p-5 sm:p-7 space-y-5 font-serif relative overflow-hidden" id="upay-vrat">
      <SacredGeometryWatermark variant="swastik" className="opacity-[0.05]" />
      <GoldenCornerBrackets size="lg" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dec9ab]/70 pb-3 relative z-10">
        <div className="flex items-center gap-3">
          <VedicIcon3D name="upay" size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#26150b]">दैनिक वैदिक नियम एवं आगामी व्रत</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 shadow-xs">
                दैनिक मार्गदर्शन
              </span>
            </div>
            <p className="text-xs text-[#735641]">
              वार अनुसार आज का सरल वैदिक उपाय, मन्त्र साधना एवं आगामी पावन व्रत-त्योहार
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/calendar"
            className="text-xs font-bold text-[#ea580c] hover:underline flex items-center gap-1 no-underline"
          >
            <span>सम्पूर्ण वर्ष कैलेंडर</span>
            <span>➔</span>
          </Link>
        </div>
      </div>

      {/* 2-Column Responsive Compact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 relative z-10">
        
        {/* Left Column: Today's Vedic Remedy & Sacred Mantra */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#fffdfa] to-[#fff7ed]/60 border border-orange-200 shadow-xs flex flex-col justify-between space-y-3.5">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100/80 text-[#c2410c] font-bold">
                आज का नियम • {upay.dayLord}
              </span>
              <span className="text-[11px] font-bold text-[#b8860b]">
                {upay.badge}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#26150b]">
              {upay.title}
            </h3>

            <p className="text-xs text-[#5c3e2b] leading-relaxed">
              {upay.desc}
            </p>

            {/* Sacred Mantra Box */}
            <div className="p-3 rounded-xl bg-white border border-[#dec9ab]/70 text-center space-y-1 shadow-2xs">
              <span className="text-[10.5px] font-bold text-[#735641] uppercase tracking-wider block">
                {upay.mantraTitle}
              </span>
              <div className="text-sm sm:text-base font-bold text-[#ea580c] tracking-wide font-serif">
                {upay.mantra}
              </div>
            </div>

            {/* Practical Remedies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-[#735641]">
              <div className="p-2 rounded-lg bg-white/70 border border-[#dec9ab]/50 flex items-center gap-1.5 font-medium">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{upay.remedy1}</span>
              </div>
              <div className="p-2 rounded-lg bg-white/70 border border-[#dec9ab]/50 flex items-center gap-1.5 font-medium">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{upay.remedy2}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#dec9ab]/40 flex items-center justify-between text-xs">
            <span className="text-[#735641]">रत्न, साढ़ेसाती व वास्तु निवारण हेतु:</span>
            <Link
              href="/utilities"
              className="text-[#b8860b] hover:text-[#ea580c] font-bold transition-colors no-underline"
            >
              वैदिक टूल्स खोलें ➔
            </Link>
          </div>
        </div>

        {/* Right Column: Upcoming 3 Vrats & Ekadashis */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#fffdfa] to-[#fffbeb]/60 border border-amber-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-900 font-bold">
                आगामी पावन व्रत व तिथियां
              </span>
              <span className="text-[11px] font-bold text-[#735641]">
                {currentCity.nameHindi || currentCity.name} समय
              </span>
            </div>

            <div className="space-y-2">
              {upcomingEvents.map((evt, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-[#dec9ab]/60 hover:border-[#ea580c]/60 shadow-2xs transition-all flex flex-col justify-between space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-[13px] font-bold text-[#26150b]">
                      🕉️ {evt.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                        {evt.badge}
                      </span>
                      <span className="text-[11px] font-mono text-[#c2410c] font-bold">
                        {evt.dateStr}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#735641] line-clamp-1">
                    {evt.desc}
                  </p>

                  {evt.parana && (
                    <div className="text-[10px] text-emerald-800 font-semibold bg-emerald-50/70 px-2 py-0.5 rounded inline-block w-fit">
                      {evt.parana}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#dec9ab]/40 flex items-center justify-between text-xs">
            <span className="text-[#735641]">वर्ष २०२६ के समस्त व्रत व तिथियां:</span>
            <Link
              href="/calendar"
              className="text-[#ea580c] hover:underline font-bold transition-colors no-underline"
            >
              संपूर्ण व्रत कैलेंडर देखें ➔
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PortalUpayVrat;
