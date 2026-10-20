/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 09: 5,000+ Indian Towns Atlas & Fuzzy Search Hub
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { MapPin, Search, Navigation } from 'lucide-react';

export const CitiesHub: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('nav.cities')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          5,000+ भारतीय नगरों का एटलस, त्वरित खोज तथा उज्जैन (अवन्तिका) मुख्य याम्योत्तर फॉलबैक
        </p>
      </header>

      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="नगर, तहसील या शहर खोजें (उदा: कन्नौज, उन्नाव, उज्जैन, काशी)..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-stone-300 focus:outline-none focus:border-amber-600 text-sm shadow-xs"
        />
      </div>

      {/* Ujjain Fallback Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
        <Navigation className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">प्राचीन सनातन याम्योत्तर (Prime Meridian of Avantika):</span>
          <span>
            जीपीएस अनुमति अस्वीकृत होने पर ऐप स्वतः शून्य-क्रैश सुरक्षा के साथ उज्जैन (23.1765° N, 75.7885° E) के अक्षांश-देशांतर पर सेट हो जाता है।
          </span>
        </div>
      </div>
    </div>
  );
};

export default CitiesHub;
