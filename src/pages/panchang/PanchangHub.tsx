/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 02: 13 Regional Panchangs, Ekadashi Parana & Moonrise Hub
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { Calendar, Moon, ShieldCheck } from 'lucide-react';

export const PanchangHub: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('panchang.title')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          13 प्रांतीय पंचांग (दैनिक, मासिक, ओड़िया, तमिल, इस्कॉन, बांग्ला, गुजराती आदि)
        </p>
      </header>

      {/* Ekadashi Parana & Moonrise Preview Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h3>{t('panchang.ekadashiParana')}</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            स्मार्त एवं वैष्णव दोनों परंपराओं के अनुसार शुद्ध हरि वासर समाप्ति उपरांत पारणा समय।
          </p>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
            ✅ सूर्योदय: 06:24 AM | पारणा मुहूर्त: 06:24 AM - 08:35 AM
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-bold">
            <Moon className="w-5 h-5 text-indigo-600" />
            <h3>{t('panchang.moonriseTime')}</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            करवा चौथ, संकष्टी चतुर्थी एवं शरद पूर्णिमा अर्घ्य हेतु उच्च-सटीकता स्थानीय चंद्रोदय।
          </p>
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-xs text-indigo-950 font-medium">
            🌕 चंद्रोदय: 08:14 PM | चंद्र राशि: मिथुन | नक्षत्र: रोहिणी
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanchangHub;
