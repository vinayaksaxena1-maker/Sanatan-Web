/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 13: Mission, Vedic Lineage & Calculation Methodology
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { Flame, Award } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-2xl">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('nav.about')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          हमारा उद्देश्य, वैदिक परंपरा एवं खगोलीय गणना पद्धति
        </p>
      </header>

      <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-medium flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-700 shrink-0" />
          <span>चित्रपक्षीय लाहिड़ी अयनांश (Lahiri Ayanamsha) + दृश्य गणितीय मानक।</span>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">1. हमारा संकल्प</h2>
          <p>
            सनातन घड़ी का लक्ष्य आधुनिक सनातन धर्मावलंबियों, संतों एवं गृहस्थों को एक विज्ञापनों से मुक्त, अत्यंत सुंदर, शत-प्रतिशत ऑफलाइन सक्षम और प्रामाणिक वैदिक कालगणना यंत्र उपलब्ध कराना है।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">2. खगोलीय शुद्धता व परंपरा</h2>
          <p>
            हम सूर्य सिद्धांत के सनातन नियमों को आधुनिक NASA JPL DE405 एफिमेरिस के सूक्ष्म गणित के साथ समन्वित करते हैं। सूर्योदय गणना में ऊपरी अंग (Upper Limb) तथा 34 आर्कमिनट के वायुमंडलीय अपवर्तन का पूर्ण ध्यान रखा जाता है।
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
