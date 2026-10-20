/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 12: Terms of Service & Ephemeris Disclaimers
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { FileText, AlertCircle } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-2xl">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('nav.terms')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          सेवा की शर्तें एवं खगोलीय पंचांग अस्वीकरण
        </p>
      </header>

      <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>NASA JPL DE405 एवं दृश्य पंचांग परंपरा के अनुरूप गणितीय गणना।</span>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">1. धार्मिक व ज्योतिषीय मार्गदर्शन</h2>
          <p>
            सनातन घड़ी द्वारा प्रस्तुत सभी तिथियां, नक्षत्र, मुहूर्त और चौघड़िया दृश्य गणित सिद्धांतों पर आधारित हैं। व्यक्तिगत संस्कारों हेतु अपने कुल पुरोहित अथवा स्थानीय विद्वान दैवज्ञ का परामर्श भी ग्राह्य है।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">2. बौद्धिक संपदा</h2>
          <p>
            इस ऐप्लिकेशन के सभी विजुअल घटक, ब्रांड पहचान और कोड कवच सुरक्षित हैं।
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
