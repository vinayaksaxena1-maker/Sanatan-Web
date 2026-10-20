/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 06: Royal Dharmic Kundli Suite (D1-D60, 3-Dropdown Time Picker)
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { Shield } from 'lucide-react';

export const KundliHub: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('kundli.title')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          षोडशवर्ग (D1-D60), त्रि-शैली (उत्तर, दक्षिण, पूर्व) चार्ट, विंशोत्तरी दशा व लाल किताब उपाय
        </p>
      </header>

      {/* Birth Input Details Card Preview */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-stone-900 border-b border-amber-100 pb-2">
          जन्म विवरण प्रविष्टि (Foolproof 3-Dropdown Time Safe)
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t('kundli.name')}
            </label>
            <input
              type="text"
              placeholder="नाम दर्ज करें..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t('kundli.birthDate')}
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t('kundli.birthPlace')}
              </label>
              <input
                type="text"
                placeholder="शहर या नगर का नाम..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors cursor-pointer shadow-xs"
        >
          {t('kundli.generateKundli')}
        </button>
      </div>
    </div>
  );
};

export default KundliHub;
