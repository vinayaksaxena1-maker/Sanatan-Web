/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 03: Dynamic Choghadiya Matrix & Live Radial Countdown
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { Clock, Activity } from 'lucide-react';

export const ChoghadiyaHub: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('choghadiya.title')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          8 दिन + 8 रात के चौघड़िया कालखंड, लाइव रेडियल टाइमर व सरल कार्य मार्गदर्शन
        </p>
      </header>

      {/* Live Active Choghadiya Highlight Card */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>लाइव सक्रिय चौघड़िया</span>
          </div>
          <span className="text-xs bg-emerald-700/80 px-2.5 py-0.5 rounded-full font-bold">
            अमृत (सर्वोत्तम)
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">अमृत चौघड़िया</h2>
            <p className="text-xs text-amber-100 pt-1">स्वामी: चंद्र | सभी मांगलिक कार्यों के लिए श्रेष्ठ</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold tabular-nums">34:12</span>
            <span className="text-xs text-amber-100 block">मिनट शेष</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoghadiyaHub;
