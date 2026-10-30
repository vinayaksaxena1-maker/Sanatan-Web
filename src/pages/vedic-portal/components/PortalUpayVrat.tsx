/**
 * Sanatan Web (सनातन घड़ी)
 * Component: PortalUpayVrat
 * Daily Vedic Upay & Mantra based on Day Lord + Real Upcoming Vrat Calendar
 * Connected directly to Sanatan AstroEngine & Festival Engine
 */

import React, { useState, useMemo } from 'react';
import { Link } from '../../../routes/AppRoutes';
import { GoldenCornerBrackets } from './GoldenCornerBrackets';
import { SacredGeometryWatermark } from './SacredGeometryWatermark';
import { VedicIcon3D } from './VedicIcon3D';
import { useLocationStore } from '../../../store/locationStore';
import { calculatePanchang, getFestivalsForDay } from '../../../engine';
import { toHindiDigits } from '../../../components/watch';

const HINDI_NUMERALS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०', '११', '१२'];

interface DailyUpayData {
  title: string;
  badge: string;
  desc: string;
  mantraTitle: string;
  mantra: string;
  mantraEng: string;
  remedy1: string;
  remedy2: string;
}

const UPAY_BY_WEEKDAY: Record<number, DailyUpayData> = {
  0: { // Sunday
    title: 'दैनिक वैदिक उपाय एवं सूर्य अर्घ्य विधि',
    badge: 'आत्मकारक बल',
    desc: 'आज के दिन तांबे के पात्र में शुद्ध जल, रक्तचन्दन व लाल पुष्प मिलाकर भगवान सूर्य नारायण को अर्घ्य प्रदान करें। इससे पितृदोष की शांति एवं आरोग्य प्राप्त होता है।',
    mantraTitle: 'मूल सूर्य बीज मन्त्र (१२ आवृत्ति जप)',
    mantra: 'ॐ घृणिः सूर्याय नमः',
    mantraEng: '"Om Ghrinih Suryaya Namah"',
    remedy1: 'ताम्र लोटा एवं लाल पुष्प अर्पण',
    remedy2: 'गाय को गुड़ व गेहूं खिलाएं'
  },
  1: { // Monday
    title: 'दैनिक वैदिक उपाय एवं चन्द्र-शिव उपासना',
    badge: 'मनोबल कारक',
    desc: 'आज शिवलिंग पर शुद्ध जल, कच्चा दूध एवं श्वेत चन्दन अर्पण करें। चन्द्रमा की कृपा से मानसिक शांति, तनावमुक्ति व एकाग्रता प्राप्त होती है।',
    mantraTitle: 'शिव पंचाक्षर व चन्द्र मन्त्र (१२ आवृत्ति जप)',
    mantra: 'ॐ नमः शिवाय • ॐ सों सोमाय नमः',
    mantraEng: '"Om Namah Shivaya • Om Som Somaya Namah"',
    remedy1: 'शिवलिंग पर कच्चा दूध व बेलपत्र',
    remedy2: 'श्वेत वस्त्र अथवा चावल का दान'
  },
  2: { // Tuesday
    title: 'दैनिक वैदिक उपाय एवं हनुमान साधना',
    badge: 'ऋण व भय मुक्ति',
    desc: 'आज श्री हनुमान जी को सिन्दूर व चमेली का तेल अर्पित करें। लाल मसूर की दाल अथवा गुड़ का दान करने से मंगल दोष शांत होता है व पराक्रम बढ़ता है।',
    mantraTitle: 'हनुमान व मंगल बीज मन्त्र (१२ आवृत्ति जप)',
    mantra: 'ॐ हं हनुमते नमः • ॐ अं अंगारकाय नमः',
    mantraEng: '"Om Hum Hanumate Namah • Om Angarakaya Namah"',
    remedy1: 'हनुमान चालीसा अथवा सुंदरकांड पाठ',
    remedy2: 'गुड़ व भुने चने का प्रसाद वितरण'
  },
  3: { // Wednesday
    title: 'दैनिक वैदिक उपाय एवं गणेश-बुध आराधना',
    badge: 'बुद्धि व व्यापार वृद्धि',
    desc: 'भगवान श्री गणेश को दूर्वा दल व मोदक अर्पित करें। हरी मूंग की दाल अथवा हरे वस्त्र का दान करने से व्यापार, वाणी व विद्या में उन्नति मिलती है।',
    mantraTitle: 'गणेश व बुध बीज मन्त्र (१२ आवृत्ति जप)',
    mantra: 'ॐ गं गणपतये नमः • ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    mantraEng: '"Om Gam Ganapataye Namah • Om Budhaya Namah"',
    remedy1: 'गणेश जी को २१ दूर्वा अर्पण',
    remedy2: 'गाय को हरा चारा अथवा पालक खिलाएं'
  },
  4: { // Thursday
    title: 'दैनिक वैदिक उपाय एवं गुरु-विष्णु पूजन',
    badge: 'विद्या व भाग्य वृद्धि',
    desc: 'भगवान लक्ष्मीनारायण को चने की दाल व गुड़ अर्पित करें। केले के वृक्ष का सिंचन एवं पीत चन्दन का तिलक करने से गुरु कृपा व सौभाग्य की प्राप्ति होती है।',
    mantraTitle: 'विष्णु व गुरु बीज मन्त्र (१२ आवृत्ति जप)',
    mantra: 'ॐ नमो भगवते वासुदेवाय • ॐ बृं बृहस्पतये नमः',
    mantraEng: '"Om Namo Bhagavate Vasudevaya • Om Brihaspataye Namah"',
    remedy1: 'केसर अथवा पीत चन्दन का तिलक',
    remedy2: 'चने की दाल, हल्दी व पीले फल दान'
  },
  5: { // Friday
    title: 'दैनिक वैदिक उपाय एवं महालक्ष्मी आराधना',
    badge: 'सुख व ऐश्वर्य प्रदाता',
    desc: 'माँ भगवती महालक्ष्मी को श्वेत पुष्प, खीर अथवा बताशे का भोग लगाएं। कन्याओं को मीठा भोजन कराने से जीवन में सुख, वैभव व दांपत्य प्रीति बढ़ती है।',
    mantraTitle: 'महालक्ष्मी व शुक्र बीज मन्त्र (१२ आवृत्ति जप)',
    mantra: 'ॐ श्रीं महालक्ष्म्यै नमः • ॐ शुं शुक्राय नमः',
    mantraEng: '"Om Shreem Mahalakshmyai Namah • Om Shukraya Namah"',
    remedy1: 'माँ लक्ष्मी को श्वेत पुष्प व इत्र अर्पण',
    remedy2: 'कन्याओं को खीर अथवा मिश्री का भोग'
  },
  6: { // Saturday
    title: 'दैनिक वैदिक उपाय एवं शनि शांति विधि',
    badge: 'कष्ट व व्याधि निवारण',
    desc: 'पीपल वृक्ष के नीचे संध्या समय सरसों के तेल का चौमुखा दीपक प्रज्वलित करें। काले तिल, उड़द अथवा नीले वस्त्र का दान करने से शनि की कृपा प्राप्त होती है।',
    mantraTitle: 'शनि बीज मन्त्र एवं महामृत्युंजय (१२ आवृत्ति जप)',
    mantra: 'ॐ शं शनैश्चराय नमः • ॐ त्र्यम्बकं यजामहे',
    mantraEng: '"Om Sham Shanaishcharaya Namah"',
    remedy1: 'पीपल के वृक्ष पर जल व दीपक',
    remedy2: 'काले तिल, उड़द अथवा तेल का दान'
  }
};

interface UpcomingEvent {
  name: string;
  badge: string;
  desc: string;
  dateStr: string;
}

export const PortalUpayVrat: React.FC = () => {
  const [japaCount, setJapaCount] = useState<number>(0);
  const { currentCity } = useLocationStore();

  const handleJapaClick = () => {
    if (japaCount < 12) {
      setJapaCount(japaCount + 1);
    } else {
      setJapaCount(0); // Reset after 12
    }
  };

  const isCompleted = japaCount === 12;

  const today = useMemo(() => new Date(), []);
  const weekday = today.getDay();
  const upay = UPAY_BY_WEEKDAY[weekday] || UPAY_BY_WEEKDAY[0];

  // Scan upcoming 14 days for festivals using engine
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
              dateStr: dateHindi
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
        name: 'कामदा एकादशी व्रत',
        badge: 'आगामी',
        desc: 'समस्त पापों का नाश कर मनोकामना पूर्ण करने वाला परम पावन व्रत।',
        dateStr: 'आगामी एकादशी'
      },
      {
        name: 'प्रदोष व्रत (त्रयोदशी)',
        badge: 'पावन',
        desc: 'शिव-पार्वती का पावन व्रत। सर्व मनोकामना पूर्ति व आरोग्य प्रदाता।',
        dateStr: 'आगामी त्रयोदशी'
      },
      {
        name: 'पूर्णिमा / अमावस्या पर्व',
        badge: 'पर्व',
        desc: 'पवित्र नदी स्नान, दान व दीपदान का विशेष महात्म्य।',
        dateStr: 'पर्व काल'
      }
    ];
  }, [currentCity.latitude, currentCity.longitude, today]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch font-serif">
      {/* दैनिक वैदिक उपाय (7 Cols) with Golden Brackets */}
      <div className="lg:col-span-7 glass-panel-warm rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 relative overflow-hidden">
        <GoldenCornerBrackets size="md" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <VedicIcon3D name="upay" size="md" />
              <h3 className="text-lg font-bold text-[#26150b]">{upay.title}</h3>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full glass-pill text-[#b8860b] font-bold shadow-xs">
              {upay.badge}
            </span>
          </div>

          <p className="text-xs text-[#5a3822] leading-relaxed">
            {upay.desc}
          </p>

          {/* Sacred Mantra Chant Display with Bold Vedic Swastika Watermark */}
          <div className="p-4 rounded-2xl glass-inner bg-white/80 border border-[#ea580c]/30 text-center space-y-1 relative overflow-hidden shadow-xs hover:border-[#ea580c] transition-colors">
            <SacredGeometryWatermark variant="swastik" className="opacity-[0.07]" />
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-[#c2410c] tracking-wider uppercase">
                {upay.mantraTitle}
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#c2410c] py-1 tracking-wide">
                {upay.mantra}
              </div>
              <span className="text-xs text-[#735641] italic font-serif">{upay.mantraEng}</span>
            </div>
          </div>

          {/* Interactive Japa Counter in Hindi with Radar Pulse */}
          <div className="flex items-center justify-between glass-inner px-4 py-2.5 rounded-2xl bg-white/70 shadow-xs border-[#dec9ab]/60">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#735641] font-bold">जप संख्या:</span>
              <span className="text-xl font-bold text-[#c2410c] font-mono">
                {HINDI_NUMERALS[japaCount] || japaCount}
              </span>
              <span className="text-[#8c7166]">/ १२ मणके</span>
            </div>
            <button
              onClick={handleJapaClick}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
                isCompleted
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                  : 'bg-white border-[#dec9ab] hover:bg-[#ea580c] hover:text-white text-[#26150b]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isCompleted ? 'check_circle' : 'touch_app'}
              </span>
              <span>{isCompleted ? 'संकल्प पूर्ण (पुनः प्रारंभ)' : 'मणका गिनें'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-[#5a3822] pt-2 border-t border-[#dec9ab]/50 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-amber-600 text-[16px]">water_drop</span>
            <span>{upay.remedy1}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-rose-600 text-[16px]">volunteer_activism</span>
            <span>{upay.remedy2}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#dec9ab]/60 relative z-10">
          <Link
            href="/utilities"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c2410c] hover:underline no-underline"
          >
            <span>🪔 सम्पूर्ण वैदिक साधना, स्तोत्र एवं मन्त्र संग्रह देखें</span>
            <span className="text-[10px]">➔</span>
          </Link>
        </div>
      </div>

      {/* आगामी व्रत एवं पर्व (5 Cols) with Golden Brackets */}
      <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 relative overflow-hidden">
        <SacredGeometryWatermark variant="swastik" className="opacity-[0.07]" />
        <GoldenCornerBrackets size="md" />

        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <VedicIcon3D name="vrat" size="md" />
              <h3 className="text-lg font-bold text-[#26150b]">आगामी व्रत एवं पर्व सारणी</h3>
            </div>
            <span className="text-xs text-[#735641] font-semibold">शुद्ध गणना</span>
          </div>

          <div className="space-y-2.5">
            {upcomingEvents.map((evt, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl glass-inner bg-white/80 border border-[#dec9ab]/60 space-y-1 hover:-translate-y-1 hover:border-[#ea580c] hover:shadow-[0_8px_20px_-3px_rgba(212,175,55,0.22)] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#c2410c]">{evt.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-[#c2410c] shadow-xs">
                      {evt.badge}
                    </span>
                    <span className="text-xs font-bold text-[#735641] font-mono">{evt.dateStr}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#735641] leading-snug">{evt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <Link
            href="/calendar"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:brightness-110 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md no-underline"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>सम्पूर्ण वार्षिक व्रत एवं एकादशी कैलेंडर देखें ➔</span>
          </Link>
          <Link
            href="/download-panchang"
            className="w-full py-2 rounded-xl bg-[#f0e5d1] hover:bg-[#b8860b] hover:text-white text-[#26150b] text-[11px] font-bold border border-[#dec9ab] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs no-underline"
          >
            <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
            <span>विक्रम संवत २०८१ हिन्दू पंचांग विवरण (PDF / प्रिंट)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
