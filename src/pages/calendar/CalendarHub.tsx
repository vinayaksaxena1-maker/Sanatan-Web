/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 07: 15 Regional & Festival Calendars Hub
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { CalendarRange } from 'lucide-react';

export const CalendarHub: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <CalendarRange className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('nav.calendar')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          15 प्रमुख वैदिक व क्षेत्रीय कैलेंडर प्रणालियां (दिवाली, दुर्गा पूजा, नवरात्रि, तमिल, बंगाली आदि)
        </p>
      </header>

      {/* Month View Placeholder */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-amber-100 pb-2">
          <h3 className="font-bold text-stone-900">चैत्र शुक्ल पक्ष माह ग्रिड</h3>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium">
            विक्रम संवत 2083
          </span>
        </div>
        <p className="text-xs text-stone-600">
          माह के सभी एकादशी, पूर्णिमा, अमावस्या, प्रदोष व्रत व प्रमुख सनातन त्योहारों की संपूर्ण सूची।
        </p>
      </div>
    </div>
  );
};

export default CalendarHub;
