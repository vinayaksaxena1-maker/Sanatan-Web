/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 11: Privacy Policy & Google Compliance
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-2xl">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('nav.privacy')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          गोपनीयता नीति एवं व्यक्तिगत डेटा संप्रभुता वचनबद्धता
        </p>
      </header>

      <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-medium flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>शून्य डेटा संग्रह प्रतिज्ञा: आपका कोई भी व्यक्तिगत या जन्म विवरण हमारे सर्वर पर नहीं भेजा जाता।</span>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">1. डेटा संप्रभुता (Client-Side Storage)</h2>
          <p>
            सनातन घड़ी एक पूर्णतः क्लाइंट-साइड PWA (प्रोग्रेसिव वेब ऐप) है। आपकी सभी जन्म कुंडलियां, सहेजे गए स्थान और प्राथमिकताएं केवल और केवल आपके डिवाइस के इन-ब्राउज़र IndexedDB (Dexie) में सुरक्षित रहती हैं।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">2. जीपीएस एवं स्थान सेवा</h2>
          <p>
            स्थान की अनुमति का उपयोग केवल स्थानीय सूर्योदय, सूर्यास्त और लग्न की सटीक खगोलीय गणना हेतु आपके ब्राउज़र में ही किया जाता है।
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
