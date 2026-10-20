/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 04: 24-Hour Planetary Hora Watch & Guidance
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { Compass, Sun } from 'lucide-react';

export const HoraHub: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('hora.title')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          सूर्योदय से 24 ग्रहीय होरा सारणी, शुभाशुभ प्रकृति एवं त्वरित कार्य निर्णय
        </p>
      </header>

      {/* Current Hora Status */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-amber-100 pb-2">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-stone-900">{t('hora.currentHora')}</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
            सूर्य होरा
          </span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          राजकार्य, सरकारी नौकरी के आवेदन, औषधि निर्माण तथा उच्चाधिकारियों से भेंट हेतु अनुकूल समय।
        </p>
      </div>
    </div>
  );
};

export default HoraHub;
